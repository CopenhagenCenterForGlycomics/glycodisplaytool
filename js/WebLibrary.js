import Library from './Library';

import { cached_render as render_sugar } from './rendersugar';


class WebLibrary extends Library {
  async getPicture(cellid) {
    let [cell] = this.cells.filter( cell => cell.cellid === cellid );
    let all_bases = this.cells.map( cell => cell.deltas.map( delta => delta.base ) ).flat().filter( (o,i,a) => a.indexOf(o) === i );
    let cell_bases = cell.deltas.map( delta => delta.base );
    let bases_to_render = [];
    for (let base of all_bases) {
      if (cell_bases.indexOf(base) < 0) {
        bases_to_render.push({ base, removed: [] });
      } else {
        bases_to_render = bases_to_render.concat( cell.deltas.filter( delta => delta.base === base ));
      }
    }
    let canvases = await Promise.all(bases_to_render.map( delta => {
      return render_sugar(delta.base,delta.removed);
    }));
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    let max_height = Math.max(...canvases.map( canvas => canvas.height ));
    canvas.width = canvases.reduce( (sum,canvas) => sum + canvas.width, 0 );
    canvas.height = max_height;
    let offset = 0;
    for (let canv of canvases) {
      ctx.drawImage(canv,offset,max_height - canv.height);
      offset += canv.width;
    }
    return canvas.toDataURL('image/png');
  }
}