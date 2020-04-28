'use strict';

const { v4: uuidv4 } = require('uuid');

/**
 * A set of functions called "actions" for `test`
 */

module.exports = {
  findOrderByTransId: async (ctx, next) => {
    const transId = ctx.params.transid;
    console.log('transactionid', transId);
    const result = await strapi
      .query('order-detail').find({ 'order': 25 });
    console.log('result=', result);

    ctx.body = 'find order by transaction id';
  },
  create: async (ctx, next) => {
    try {
      let  response = null;
      const knex = strapi.connections.default;
      const { order, menus } = ctx.request.body;
      const restaurant = await strapi.query('restaurant')
        .findOne({
          id: order.restaurantId
        });

      Object.assign(order, {
        trans_id: uuidv4(),
        status: 'order_incoming',
        order_incoming_datetime: new Date().toISOString(),
        restaurant: order.restaurant,
        restaurant_name: restaurant.name,
        customer_id: ctx.state.user.id,
        created_by: ctx.state.user.id,
        updated_by: ctx.state.user.id,
      });

      await knex.transaction(async (trx) => {
        try {
          const ids = await trx.insert(order, 'id')
          .into('orders');
          
          const orderDetails = [];
          for (let menu of menus) {
            orderDetails.push({
              order: ids[0],
              menu: menu.id,
              menu_name: menu.name,
              menu_price: menu.price,
              menu_amount: menu.qty,
              created_by: ctx.state.user.id,
              updated_by: ctx.state.user.id
            });
          }

          await trx.insert(orderDetails)
            .into('order_details');
          
          response = ids[0];
        } catch (e) {
          trx.rollback();
          console.error(e);
        }
      });
      ctx.body = response || 'ok';
    } catch (e) {
      console.error(e);
      ctx.body = e;
    }
  }
};
