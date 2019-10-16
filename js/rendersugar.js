import {CondensedIupac, Sugar, Monosaccharide, SugarAwareLayoutFishEye, SVGRenderer as Renderer} from 'glycan.js';

const Iupac = CondensedIupac.IO;

const IupacSugar = Iupac(Sugar);

let svg_to_canvas = (svg) => {
  let new_svg = svg.cloneNode(true);
  let [,,width,height] = new_svg.getAttribute('viewBox').split(' ').map( x => parseInt(x) );
  new_svg.setAttribute('preserveAspectRatio','xMidYMid meet');
  let data = (new XMLSerializer()).serializeToString(new_svg);
  let canvas = document.createElement('canvas');
  canvas.width=width;
  canvas.height=height;
  let ctx = canvas.getContext('2d');
  var img = new Image();
  var svgBlob = new Blob([data], {type: 'image/svg+xml;charset=utf-8'});
  var url = window.URL.createObjectURL(svgBlob);
  let result = new Promise( resolve => {
    img.onload = function () {
      ctx.drawImage(img, 0, 0);
      window.URL.revokeObjectURL(url);
      console.log(canvas);
      resolve(canvas);
    };
  });

  img.src = url;

  return result;
};

const icons_elements = Promise.resolve(Renderer.SYMBOLS).then( SYMBOLS_DEF => {
  return (new DOMParser()).parseFromString(SYMBOLS_DEF, "image/svg+xml");
}).then( el => {
  return el.querySelector('svg defs');
})

const render = (sequence,removed=[]) => {
  SugarAwareLayoutFishEye.LINKS = false;
  let fragment = document.createDocumentFragment();
  let canvas = document.createElement('div');
  canvas.style.opacity = 0;
  canvas.style.position = 'fixed';
  canvas.style.width = '0px';
  canvas.style.height = '0px';
  document.body.appendChild(canvas);
  icons_elements.then( defs => {
    canvas.firstChild.appendChild(defs.cloneNode(true));
  });

  let renderer = new Renderer(canvas,SugarAwareLayoutFishEye);
  let sug = new IupacSugar();
  sug.sequence = sequence;
  renderer.addSugar(sug);
  return renderer.refresh().then( () => {
  }).then( () => {
    for (let position of removed) {
      let start = sug.locate_monosaccharide(position);
      for (let res of sug.composition(start)) {
        let rendered = renderer.rendered.get(res);
        if (rendered.linkage) {
          rendered.linkage.element.style.opacity=0;
        }
        if (rendered.residue) {
          rendered.residue.element.style.opacity=0.1;
        }
      }
    }
    return renderer.scaleToFit();
  }).then( () => {
    let target = canvas.firstChild.cloneNode(true);
    canvas.parentNode.removeChild(canvas);
    return svg_to_canvas(target);
  });
};

const RENDERED_SUGARS = new Map();

const cached_render = async (sequence,removed=[]) => {
  let key = sequence+removed.join('-');
  if (RENDERED_SUGARS.get(key)) {
    return RENDERED_SUGARS.get(key);
  }
  RENDERED_SUGARS.set(key,await render(sequence,removed));
  return RENDERED_SUGARS.get(key);
};


export { render, cached_render };