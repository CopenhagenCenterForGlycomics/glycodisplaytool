
import { select } from 'd3-selection';

import canvasScale from './scale';
import { rotate_point } from './axis';

import { AXIS_HEIGHT } from './dimensions';

const drawData = (canvas,seriesOrder,data) => {

  const { y : yScale } = canvasScale(canvas);

  let data_group = canvas.querySelector(`g#data`);
  let node;
  while (node = data_group.firstChild) {
    node.parentNode.removeChild(node);
  }

  let identifiers = seriesOrder.map( series => series.id );

  let delta = parseFloat((360 / identifiers.length).toFixed(2));


  for (let [idx,series] of data.entries()) {
    try {
      let path_def = identifiers.map( (identifier,idx) => {
        let datapoint = series[identifier] || 0;
        let {x,y} = rotate_point(0,AXIS_HEIGHT,delta*idx,{x:0,y:yScale(datapoint)});
        if (isNaN(x)) {
          throw new Error('Bad data');
        }
        return `L${x} ${y}`;
      }).join(' ').replace(/^L/,'M').replace(/$/,' Z');
      select(data_group).append('path').attr('d',path_def).attr('style',`stroke: var(--stroke-series${idx},red); stroke-width: var(--stroke-width-series${idx},red); fill: var(--fill-series${idx},none);`);
    } catch (err) {
      console.error(err);
    }
  }


};

export { drawData };