'use strict';

/**
 * `isPublicApi` policy.
 */

module.exports = async (ctx, next) => {
  console.log('In isPublicApi policy.');

  await next();
};
