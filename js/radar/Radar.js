/* globals document,HTMLElement,customElements,window,ShadyCSS */
'use strict';

import { drawAxis, updateAxis } from './axis';

import canvasScale from './scale';

import { AXIS_HEIGHT, MARGINS, PLOT_AREA_WIDTH, PLOT_AREA_HEIGHT } from './dimensions';

const symbol_range = Symbol('range');
const symbol_data = Symbol('data');
const symbol_series = Symbol('series');

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
  <g id="data" transform="translate(${MARGINS.LEFT+AXIS_HEIGHT},${MARGINS.TOP})"></g>
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
  let categories = viewer.seriesOrder.map( series => series.id );
  updateAxis(viewer.shadowRoot.querySelector('svg'),viewer.range,viewer.data);
  drawAxis(viewer.shadowRoot.querySelector('svg'),categories.length);
};

class Radarchart extends WrapHTML {

  static get observedAttributes() {
    return [];
  }

  constructor() {
    super();
  }

  set range(values) {
    let [min,max] = values;
    this[symbol_range] = [min,max];
  }

  get range() {
    return this[symbol_range];
  }

  set seriesOrder(series) {
    this[symbol_series] = series;
  }

  get seriesOrder() {
    return this[symbol_series];
  }


  set data(data) {
    this[symbol_data] = data;
    /*
    Array of data series
    [
    [{ 'cat1' : val1, 'cat2' : val2 },
     { 'cat1' : val3, 'cat2' : val4 }
    ]
    */
    let vals = [].concat.apply([],data.map( series => Object.values(series) ));
    let maxrange = Math.ceil(Math.max(...vals));
    let minrange = Math.floor(Math.min(...vals));
    this.range = [minrange,maxrange];
    refresh(this);
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