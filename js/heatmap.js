/* globals document,HTMLElement,customElements,window,ShadyCSS,CustomEvent */
'use strict';

import { CondensedIupac, Sugar, SVGRenderer, Reaction, ReactionGroup } from 'glycan.js';

import { SugarFrame as sviewer } from 'sviewer';

const SugarFrame = sviewer.default;

const module_string='sviewer:heatmap';

const Iupac = CondensedIupac.IO;

const IupacSugar = Iupac(Sugar);

const canvas_tmpl = document.createElement('template');

canvas_tmpl.innerHTML = '<canvas style="width:100%; height:100%; top: 0; left:0; position: absolute;"></canvas>';

class HeatMap extends SugarFrame {

  static get SugarClass() {
    return IupacSugar;
  }

  static get observedAttributes() {
    return ['src'];
  }

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
    this.shadowRoot.appendChild(canvas_tmpl.content.cloneNode(true));
  }

}

customElements.define('x-heatmap',HeatMap);

export default HeatMap;