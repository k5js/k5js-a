import { importView } from '@k5js/build-field-types';
import { Block } from '../Block';

export default class ImageBlock extends Block {
  get type() {
    return 'image';
  }
  getAdminViews() {
    return [importView('../views/editor/blocks/image')];
  }
}
