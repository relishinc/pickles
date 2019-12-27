import Modal from '../ui/modal';
import FocusTrap from '../utils/focus-trap';

//=== 

console.log('Modal', Modal);
console.log('FocusTrap', FocusTrap);

// ===

let ft = new FocusTrap('#foo');
ft.stop();