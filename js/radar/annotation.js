import { rotate_point } from './axis';

import { AXIS_HEIGHT, MARGINS } from './dimensions';

const ANNOTATION_SIZE = 100;

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
    annot.setAttribute('width',`${ANNOTATION_SIZE}`);
    annot.setAttribute('height',`${ANNOTATION_SIZE}`);
    annot.style.visibility = 'hidden';
    imported.push(annot);
    placeAnnotation(annot,chart.seriesOrder);
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
};

const placeAnnotation = (annotation,seriesOrder) => {
  if ( ! seriesOrder ) {
    return;
  }
  const canvas = annotation.ownerSVGElement;
  let cellid = annotation.getAttribute('cellid');
  let identifiers = seriesOrder.map( series => series.id );
  let delta = parseFloat((360 / identifiers.length).toFixed(2));
  let {x,y} = rotate_point(0,AXIS_HEIGHT+(0.5*ANNOTATION_SIZE),identifiers.indexOf(cellid)*delta,{x:0,y:0})
  annotation.setAttribute('x',x-(0.5*ANNOTATION_SIZE));
  annotation.setAttribute('y',y-ANNOTATION_SIZE);
  annotation.style.visibility = 'visible';
};

export { placeAnnotation, importAnnotations };