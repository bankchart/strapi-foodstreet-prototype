'use strict';

/**
 * Lifecycle callbacks for the `order` model.
 */

module.exports = {
  // Before saving a value.
  // Fired before an `insert` or `update` query.
  beforeSave: async (model, attrs, options) => {
    if (attrs.restaurant) {
      const p = new Promise(async (resolve, reject) => {
        await options.transacting(async (trx) => {
          try {
            const restaurant_name = await trx.select('name').from('restaurants').where('id', attrs.restaurant);
            resolve(restaurant_name[0].name);
          } catch (e) {
            console.error(e);
            reject(new Error(e.message));
          }
        });
      });
      console.log('in beforeSave restaurant_name', p);
      attrs.restaurant_name = await p;
    }
  },

  // After saving a value.
  // Fired after an `insert` or `update` query.
  // afterSave: async (model, response, options) => {},

  // Before fetching a value.
  // Fired before a `fetch` operation.
  // beforeFetch: async (model, columns, options) => {},

  // After fetching a value.
  // Fired after a `fetch` operation.
  // afterFetch: async (model, response, options) => {},

  // Before fetching all values.
  // Fired before a `fetchAll` operation.
  // beforeFetchAll: async (model, columns, options) => {},

  // After fetching all values.
  // Fired after a `fetchAll` operation.
  // afterFetchAll: async (model, response, options) => {},

  // Before creating a value.
  // Fired before an `insert` query.
  // beforeCreate: async (model, attrs, options) => {},

  // After creating a value.
  // Fired after an `insert` query.
  // afterCreate: async (model, attrs, options) => {},

  // Before updating a value.
  // Fired before an `update` query.
  // beforeUpdate: async (model, attrs, options) => {},

  // After updating a value.
  // Fired after an `update` query.
  // afterUpdate: async (model, attrs, options) => {},

  // Before destroying a value.
  // Fired before a `delete` query.
  // beforeDestroy: async (model, attrs, options) => {},

  // After destroying a value.
  // Fired after a `delete` query.
  // afterDestroy: async (model, attrs, options) => {}
};
