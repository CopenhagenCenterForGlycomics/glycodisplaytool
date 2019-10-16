/* globals document,HTMLElement,customElements,window,ShadyCSS */
'use strict';

import { drawAxis, updateAxis } from './axis';
import { drawData } from './data';

import canvasScale from './scale';

import { AXIS_HEIGHT, MARGINS, PLOT_AREA_WIDTH, PLOT_AREA_HEIGHT } from './dimensions';

const symbol_range = Symbol('range');
const symbol_data = Symbol('data');
const symbol_series = Symbol('series');

import { rotate_point } from './axis';

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
  <g id="annotations" transform="translate(${MARGINS.LEFT+AXIS_HEIGHT},${MARGINS.TOP})"></g>
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

const change_watcher = (slotted,chart) => {
  const config = { attributes: true, childList: true, subtree: true };

  const callback = (mutationsList, observer) => {
    importSlot(slotted,chart.shadowRoot.querySelector('svg'),chart);
  };

  const observer = new MutationObserver(callback);
  observer.observe(slotted, config);

}

let imported_slot_elements = new WeakMap();

const importSlot = (slotted,canvas,chart) => {
  let placed = false;
  if (imported_slot_elements.get(slotted)) {
    placed = true;
    for (let el of imported_slot_elements.get(slotted)) {
      if (el.parentNode) {
        el.parentNode.removeChild(el);
      }
    }
  }

  let imported = [];
  for (let annot of slotted.querySelectorAll('*[cellid]')) {
    annot = annot.cloneNode(true);
    canvas.querySelector('#annotations').appendChild(annot);
    annot.setAttribute('width','100');
    annot.setAttribute('height','100');
    annot.style.visibility = 'hidden';
    imported.push(annot);
    if (placed) {
      placeAnnotation(annot,chart.seriesOrder);
    }
  }
  for (let symbol of slotted.querySelectorAll('symbol')) {
    canvas.querySelector('#defs').appendChild(symbol.cloneNode(true));
    imported.push(canvas.querySelector('#defs').lastChild);
  }
  imported_slot_elements.set(slotted,imported);
};

const importAnnotations = (chart,annotations) => {
  const canvas = chart.shadowRoot.querySelector('svg');
  // We could use the MutationObserver to copy
  // across the SVG each time it changes

  for (let slotted of annotations) {
    importSlot(slotted,canvas,chart);
    change_watcher(slotted,chart);
  }
  refresh(chart);
};

const placeAnnotation = (annotation,seriesOrder) => {
  if ( ! seriesOrder ) {
    return;
  }
  const canvas = annotation.ownerSVGElement;
  let cellid = annotation.getAttribute('cellid');
  let identifiers = seriesOrder.map( series => series.id );
  let delta = parseFloat((360 / identifiers.length).toFixed(2));
  let {x,y} = rotate_point(0,200,identifiers.indexOf(cellid)*delta,{x:0,y:0})
  annotation.setAttribute('x',x-50);
  annotation.setAttribute('y',y-50);
  annotation.style.visibility = 'visible';
};

const refresh = (chart) => {
  if ( ! chart.data || chart.data.length === 0 ) {
    return;
  }
  let categories = chart.seriesOrder.map( series => series.id );
  updateAxis(chart.shadowRoot.querySelector('svg'),chart.range,chart.data);
  drawAxis(chart.shadowRoot.querySelector('svg'),categories.length);
  drawData(chart.shadowRoot.querySelector('svg'),chart.seriesOrder,chart.data);
  for (let annotation of chart.shadowRoot.querySelectorAll('#annotations *')) {
    placeAnnotation(annotation,chart.seriesOrder);
  }
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
    this[symbol_range] = [0,max];
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

    let annotations_slot = this.shadowRoot.querySelector('slot[name="annotations"]');
    annotations_slot.addEventListener('slotchange',() => importAnnotations(this,annotations_slot.assignedElements({flatten: true})));

    drawAxis(canvas);

    importAnnotations(this,annotations_slot.assignedElements({flatten: true}));

  }

}

customElements.define('x-radar',Radarchart);

export default Radarchart;