import $ from 'jquery';
import Modal from './ui/modal';

import FocusTrap from './utils/focus-trap';
import ScrollListener from './utils/scroll-listener';

const modal = new Modal();
const focusTrap = new FocusTrap();
const scrollListener = new ScrollListener();

export default { 
  modal,
  focusTrap,
  scrollListener
};