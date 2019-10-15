/* globals document,HTMLElement,customElements,window,ShadyCSS */
'use strict';

import { drawAxis, updateAxis } from './axis';

import canvasScale from './scale';

import { AXIS_HEIGHT, MARGINS, PLOT_AREA_WIDTH, PLOT_AREA_HEIGHT } from './dimensions';

const symbol_range = Symbol('range');
const symbol_data = Symbol('data');
const symbol_zoom = Symbol('zoom');

const tmpl = document.createElement('template');

tmpl.innerHTML = `
<style>
  :host {
    display: block;
    position: relative;
    overflow: hidden;
  }

  :host([resizeable]) {
    resize: both;
    overflow: auto;
  }

  #canvas, .widget_contents {
    width: 100%;
    height: 100%;
  }

  #canvas {

  }

  #axis_guides path{
    stroke-width: 0.5;
    stroke: #999;
  }

  @media only screen
    and (min-device-width: 320px)
    and (max-device-width: 480px)
    and (-webkit-min-device-pixel-ratio: 2) {

  }
</style>

<div class="widget_contents" >
<svg id="canvas" viewBox="0 0 ${PLOT_AREA_WIDTH} ${PLOT_AREA_HEIGHT}">
  <defs id="defs">
  </defs>
  <g id="axis" transform="translate(${MARGINS.LEFT+AXIS_HEIGHT},${MARGINS.TOP})"></g>
  <g id="axis_guides" transform="translate(${MARGINS.LEFT+AXIS_HEIGHT},${MARGINS.TOP})"></g>
</svg>
</div>
<div style="display: none">
<slot name="annotations"></slot>
</div>
`;

function WrapHTML() { return Reflect.construct(HTMLElement, [], Object.getPrototypeOf(this).constructor); }
Object.setPrototypeOf(WrapHTML.prototype, HTMLElement.prototype);
Object.setPrototypeOf(WrapHTML, HTMLElement);

if (window.ShadyCSS) {
  ShadyCSS.prepareTemplate(tmpl, 'x-radar');
}

const refresh = (viewer) => {
  if ( ! viewer.data || viewer.data.length === 0 ) {
    return;
  }
  updateAxis(viewer.shadowRoot.querySelector('svg'),viewer.range,viewer.data);
  drawAxis(viewer.shadowRoot.querySelector('svg'));
};

class Radarchart extends WrapHTML {

  static get observedAttributes() {
    return ['range'];
  }

  constructor() {
    super();
  }

  attributeChangedCallback(name) {
    if (name === 'range') {
      this[symbol_range] = this.getAttribute('range').split('-').map( val => parseFloat(val.trim()) );
      refresh(this);
    }
  }

  get range() {
    return this[symbol_range];
  }

  set data(data) {
    this[symbol_data] = data;
    let vals = data.map( d => d[0]);
    let maxrange = Math.ceil(Math.max(...vals));
    let minrange = Math.floor(Math.min(...vals));
    this.setAttribute('range',`${minrange}-${maxrange}`);
  }

  get data() {
    return this[symbol_data] || [];
  }

  connectedCallback() {
    if (window.ShadyCSS) {
      ShadyCSS.styleElement(this);
    }
    let shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.appendChild(tmpl.content.cloneNode(true));

    const canvas = this.shadowRoot.querySelector('svg');

    drawAxis(canvas);

  }

}

customElements.define('x-radar',Radarchart);

export default Radarchart;