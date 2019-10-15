
import { axisRight } from 'd3-axis';
import { select } from 'd3-selection';

const d3 = { select, axisRight };

import canvasScale from './scale';

const AXIS_HEIGHT = 200;

const MARGIN_LEFT = 25;
const MARGIN_TOP = 25;

const updateAxis = (canvas,range,data) => {

  const { y : yRange } = canvasScale(canvas);

  yRange.domain(range);

};

const rotate_point = (cx,cy,angle,p) => {
  let s = Math.sin((Math.PI * angle) / 180);
  let c = Math.cos((Math.PI * angle) / 180);

  let result = { x: p.x, y: p.y };

  // translate point back to origin:
  result.x -= cx;
  result.y -= cy;

  // rotate point
  let xnew = result.x * c - result.y * s;
  let ynew = result.x * s + result.y * c;

  // translate point back:
  result.x = parseFloat((xnew + cx).toFixed(2));
  result.y = parseFloat((ynew + cy).toFixed(2));
  return result;
};

const drawAxis = (canvas) => {

  const { y : yRange } = canvasScale(canvas);

  const axis = d3.axisRight().scale( yRange );

  axis(d3.select(canvas.querySelector('g#axis')));

  let degrees = [0,45,90,135,180,225,270,315];

  let y_without_ticks = yRange.copy();

  y_without_ticks.tickFormat = () => "";
  y_without_ticks.ticks = () => {
    return yRange.ticks().slice(1);
  };

  let all_ticks = y_without_ticks.ticks();
  let tick_values = all_ticks.map( tick => { return  {x: 0, y: y_without_ticks(tick) } } );

  let guides_group = canvas.querySelector(`g#axis_guides`);

  for (let tick of tick_values ) {
    let path_def = degrees.map( degree => {
      let {x,y} = rotate_point(0,AXIS_HEIGHT,degree,tick);
      return `L${x} ${y}`;
    }).concat([`L ${tick.x} ${tick.y}`]).join(' ').replace(/^L/,'M');
    d3.select(guides_group).append('path').attr('d',path_def).attr('fill','none');
  }

  for (let degree of degrees.slice(1)) {

    let subaxis = d3.axisRight().scale( y_without_ticks );
    let target_group = canvas.querySelector(`g#axis${degree}`);
    if ( ! target_group) {
      target_group = canvas.ownerDocument.createElementNS('http://www.w3.org/2000/svg','g');
      target_group.setAttribute('id',`axis${degree}`);
      canvas.appendChild(target_group);
    }
    target_group.setAttribute('transform',`translate(${AXIS_HEIGHT+MARGIN_TOP},${MARGIN_LEFT}) rotate(${degree},0,${AXIS_HEIGHT})`);

    subaxis(d3.select(target_group));

  }

};

export { drawAxis, updateAxis };