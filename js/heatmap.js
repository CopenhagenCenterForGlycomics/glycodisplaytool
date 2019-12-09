/* globals document,HTMLElement,customElements,window,ShadyCSS,CustomEvent */
'use strict';

import { CondensedIupac, Sugar, SVGRenderer, Reaction, ReactionGroup } from 'glycan.js';

import { SugarFrame as sviewer } from 'sviewer';

const SugarFrame = sviewer.default;

const module_string='sviewer:heatmap';

const Iupac = CondensedIupac.IO;

const IupacSugar = Iupac(Sugar);

const canvas_tmpl = document.createElement('template');

canvas_tmpl.innerHTML = '<canvas id="highlights" style="width:100%; height:100%; top: 0; left:0; position: absolute;"></canvas>';

const SCALE=10;

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

  clearHeatmap() {
    let canv = this.shadowRoot.querySelector('#highlights');
    const ctx = canv.getContext('2d');
    ctx.clearRect(0, 0, canv.width, canv.height);
  }

  overlayPatterns(colour='rgba(0,255,0,0.2)',patterns=['*(u?-?)*']) {
    let test_sugars = patterns.map( pattern => {
      let test_sugar = new IupacSugar();
      test_sugar.sequence = `${pattern}`;
      return test_sugar;
    });

    let matcher = (sugar) => {
      return test_sugars.map( test_sugar => sugar.match_sugar_pattern(test_sugar,Reaction.Comparator) )
             .flat() 
             .map( match => [...match.composition()] ).flat()
             .map( res => res.original )
             .filter( (o,i,a) => a.indexOf(o) === i )
             .filter( res => this.renderer.rendered.get(res) );
    };
    this.overlayHeatmap(colour,matcher);
  }

  overlayHeatmap(colour='rgba(0,255,0,0.2)',matcher=(sugar) => [...sugar.composition()]) {
    let canv = this.shadowRoot.querySelector('#highlights');
    let offscreen = document.createElement('canvas');
    let boundingrect = canv.getBoundingClientRect();

    if ( canv.width !== SCALE*boundingrect.width && canv.height !== SCALE*boundingrect.height ) {
      canv.width = SCALE*boundingrect.width;
      canv.height = SCALE*boundingrect.height;
    }

    offscreen.width = SCALE*boundingrect.width;
    offscreen.height = SCALE*boundingrect.height;

    const ctx = offscreen.getContext('2d');


    const opacity = 0.2;
    const angle = 2*Math.PI;

    let residues = this.renderer.sugars.map( matcher ).flat();
    for (let residue of residues) {
      let layout = this.renderer.layoutFor(residue);
      let {x,y,width,height} = this.renderer.screenCoordinatesFromLayout(layout);
      width = height = Math.max(width,height);
      ctx.beginPath();
      ctx.lineWidth = 1*SCALE;
      ctx.fillStyle = '#000';
      ctx.arc( SCALE*(x+0.5*width),SCALE*(y+0.5*height), 1*SCALE*width,0, angle, false );
      ctx.fill();
    }
    ctx.globalCompositeOperation='source-in';
    ctx.fillStyle=colour;
    ctx.fillRect(0,0,offscreen.width,offscreen.height);

    canv.getContext('2d').drawImage(offscreen,0,0);
  }

}

customElements.define('x-heatmap',HeatMap);

export default HeatMap;