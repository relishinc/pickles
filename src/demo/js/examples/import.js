import Modal from '../../../js/ui/modal';
import FocusTrap from '../../../js/utils/focus-trap';

//=== 

console.log('Modal', Modal);
console.log('FocusTrap', FocusTrap);

// ===

let ft = new FocusTrap('#foo');
ft.stop();