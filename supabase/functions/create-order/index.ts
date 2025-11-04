import { createClient } from 'npm:@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const orderData = await req.json();

    const { customer_name, customer_email, customer_phone, shipping_address, notes, items, total_amount } = orderData;

    if (!customer_name || !customer_email || !customer_phone || !shipping_address || !items || items.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    for (const item of items) {
      const { data: product } = await supabase
        .from('products')
        .select('stock_quantity')
        .eq('id', item.product_id)
        .single();

      if (!product || product.stock_quantity < item.quantity) {
        return new Response(
          JSON.stringify({ error: 'Insufficient stock for one or more items' }),
          {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }
    }

    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        customer_name,
        customer_email,
        customer_phone,
        shipping_address,
        total_amount,
        status: 'pending',
        notes: notes || '',
      })
      .select()
      .single();

    if (orderError) {
      throw orderError;
    }

    const orderItems = items.map((item: any) => ({
      order_id: order.id,
      product_id: item.product_id,
      quantity: item.quantity,
      price_at_time: item.price,
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) {
      throw itemsError;
    }

    for (const item of items) {
      const { error: updateError } = await supabase
        .from('products')
        .update({ stock_quantity: supabase.raw('stock_quantity - ' + item.quantity) })
        .eq('id', item.product_id);

      if (updateError) {
        throw updateError;
      }
    }

    return new Response(
      JSON.stringify({ success: true, order_id: order.id }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error creating order:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to create order' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});