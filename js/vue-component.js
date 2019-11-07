/* globals document,HTMLElement,customElements,window,ShadyCSS */
'use strict';

import Vue from 'vue';

const tmpl = document.createElement('template');

tmpl.innerHTML = `
<style>
  :host {
  }

  @media only screen
    and (min-device-width: 320px)
    and (max-device-width: 480px)
    and (-webkit-min-device-pixel-ratio: 2) {

  }
</style>

<div id="parent">
<h1>Foo</h1>
<slot></slot>
</div>
`;

function WrapHTML() { return Reflect.construct(HTMLElement, [], Object.getPrototypeOf(this).constructor); }
Object.setPrototypeOf(WrapHTML.prototype, HTMLElement.prototype);
Object.setPrototypeOf(WrapHTML, HTMLElement);

if (window.ShadyCSS) {
  ShadyCSS.prepareTemplate(tmpl, 'x-vue');
}

class VueComponentElement extends WrapHTML {

  constructor() {
    super();
  }

  get data() {
    return this.component.$data;
  }

  connectedCallback() {
    if (window.ShadyCSS) {
      ShadyCSS.styleElement(this);
    }
    let shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.appendChild(tmpl.content.cloneNode(true));

    const parent = this.shadowRoot.querySelector('div');
    const slot = this.shadowRoot.querySelector('slot');
    slot.addEventListener('slotchange', (ev) => {
      if ( this.component ) {
        return;
      }
      parent.innerHTML = ev.target.assignedNodes().map( el => el.outerHTML ).join('\n');
      let default_data = {};
      for (let key of (this.getAttribute('props') || '').split(' ')) {
        default_data[key] = null;
      }
      this.component = new Vue({
          el: parent,
          data: default_data,
          components: {
          },
      });
    });
  }

}

customElements.define('x-vue',VueComponentElement);

export default VueComponentElement;
