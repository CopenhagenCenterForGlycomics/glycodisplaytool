/* globals document,HTMLElement,customElements,window,ShadyCSS */
'use strict';

import Vue from 'vue';

import HeatMapComponent from '../components/heatmap.vue';

const COMPONENTS = {
  heatmap: HeatMapComponent
};

const tmpl = document.createElement('template');

tmpl.innerHTML = `
<style>
  :host {
    display: contents;
  }
  :host > div#output {
    display: contents;
  }

  @media only screen
    and (min-device-width: 320px)
    and (max-device-width: 480px)
    and (-webkit-min-device-pixel-ratio: 2) {

  }
</style>
<div style="display: none;">
<slot></slot>
</div>
<slot name="output"></slot>
<div id="output">
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

  get update() {
    return new Promise( resolve => {
      this.component.$nextTick(resolve);
    });
  }

  connectedCallback() {
    if (window.ShadyCSS) {
      ShadyCSS.styleElement(this);
    }
    let shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.appendChild(tmpl.content.cloneNode(true));

    const parent = this.shadowRoot.querySelector('div#output');
    this.shadowRoot.querySelector('slot[name="output"]').addEventListener('slotchange', (ev) => {
      if (this.output_el) {
        return;
      }

      let new_output = ev.target.assignedNodes()[0];
      this.output_el = new_output;
      this.output_el.style.display = 'contents';

      this.shadowRoot.querySelector('div#output').innerHTML = '';

      new_output.innerHTML = this.template_text;

      let default_data = {};
      for (let key of (this.getAttribute('props') || '').split(' ')) {
        default_data[key] = null;
      }
      this.component = new Vue({
          el: new_output,
          data: default_data,
          components: COMPONENTS,
      });
    });
    const slot = this.shadowRoot.querySelector('slot');
    slot.addEventListener('slotchange', (ev) => {
      if ( this.component ) {
        return;
      }
      let style_elements = ev.target.assignedNodes().filter( el => el instanceof HTMLStyleElement );
      let other_elements = ev.target.assignedNodes().filter( el => style_elements.indexOf(el) < 0 );
      this.template_text = other_elements.map( el => el instanceof HTMLElement ? el.outerHTML : el.textContent ).join('\n');
      parent.innerHTML = this.template_text;
      for (let style of style_elements) {
        this.shadowRoot.appendChild(style);
      }
      let default_data = {};
      for (let key of (this.getAttribute('props') || '').split(' ')) {
        default_data[key] = null;
      }
      this.component = new Vue({
          el: parent,
          data: default_data,
          components: COMPONENTS,
      });
    });
  }

}

customElements.define('x-vue',VueComponentElement);

export default VueComponentElement;
