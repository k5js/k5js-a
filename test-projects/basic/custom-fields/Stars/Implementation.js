const { Integer } = require('@k5js/fields');

class Stars extends Integer.implementation {
  extendAdminMeta(meta) {
    return { ...meta, starCount: this.config.starCount || 5 };
  }
}

module.exports = {
  Stars,
  MongoIntegerInterface: Integer.adapters.mongoose,
  KnexIntegerInterface: Integer.adapters.knex,
};
