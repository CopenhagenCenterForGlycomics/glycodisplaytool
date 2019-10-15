
import { scaleLinear } from 'd3-scale';

import { AXIS_HEIGHT } from './dimensions';


const all_scales = new WeakMap();

const canvasScale = (canvas) => {
  if ( ! all_scales.has(canvas) ) {
    let y = scaleLinear().clamp(true).range([AXIS_HEIGHT,0]);

    all_scales.set(canvas, { y });
  }
  return all_scales.get(canvas);
};

export default canvasScale;