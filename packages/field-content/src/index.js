import { importView } from '@k5js/build-field-types';
import { Text } from '@k5js/fields';
import {
  Content as ContentType,
  MongoContentInterface,
  KnexContentInterface,
} from './Implementation';
import {
  blockquote,
  heading,
  imageContainer as image,
  link,
  orderedList,
  unorderedList,
} from './blocks';

export const Content = {
  type: 'Content',
  implementation: ContentType,
  views: {
    Controller: importView('./views/Controller'),
    Field: importView('./views/Field'),
    Cell: importView('./views/Cell'),
    Filter: Text.views.Filter,
  },
  adapters: {
    mongoose: MongoContentInterface,
    knex: KnexContentInterface,
  },
  blocks: {
    blockquote,
    heading,
    image,
    link,
    orderedList,
    unorderedList,
    // not exposing list-item since it's only used internally by the other blocks
    // not exposing paragraph since it's included by default
  },
};
