import { importView } from '@k5js/build-field-types';

export let MyCoolFieldType = {
  views: {
    Field: importView('./views/Field'),
  },
};
