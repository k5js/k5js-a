import { Decimal, MongoDecimalInterface, KnexDecimalInterface } from './Implementation';
import { importView } from '@k5js/build-field-types';

export default {
  type: 'Decimal',
  implementation: Decimal,
  views: {
    Controller: importView('./views/Controller'),
    Field: importView('./views/Field'),
    Filter: importView('./views/Filter'),
  },
  adapters: {
    mongoose: MongoDecimalInterface,
    knex: KnexDecimalInterface,
  },
};
