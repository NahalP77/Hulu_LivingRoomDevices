import './slideOut.css';
class slideOut extends HTMLElement {
    slideOutFn() {
        this.textContent = 'slide';
    }
}
customElements.define('slideOut', slideOut);
