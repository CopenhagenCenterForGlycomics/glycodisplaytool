import 'pastemapper'

import { default as Library } from './WebLibrary';

import Radarchart from './radar/Radar';

const mapper_columns = {
  libraryid : {
    type: 'string',
    description : 'LibraryID'
  },
  binding1 : {
    type: 'number',
    description : 'Level1 binding'
  },
};

const LIBRARY_SYMBOL_TEMPLATE = document.createElement('template');

LIBRARY_SYMBOL_TEMPLATE.innerHTML = `
<svg slot="annotations">
<symbol id="symbid" viewBox="0 0 100 100">
  <image href="" width="100" height="75" />
  <text x="50" y="75" text-anchor="middle" font-size="7"></text>
</symbol>
<use href="#symbid" cellid="cellid" />
</svg>
`;

let channel_count = 1;

const update_radar_icons = async (radar,library) => {
  let master;
  for (let cell of library.cells) {
    let picture = await library.getPicture(cell.cellid);
    let symbol = LIBRARY_SYMBOL_TEMPLATE.content.cloneNode(true);
    let clean_cell_id = cell.cellid.replace(/\./g,'_');
    symbol.querySelector('[href="#symbid"]').setAttribute('href',`#${clean_cell_id}`);
    symbol.querySelector('[id="symbid"]').setAttribute('id',`${clean_cell_id}`);
    symbol.querySelector('[cellid]').setAttribute('cellid',`${cell.cellid}`);
    symbol.querySelector('image').setAttribute('href',picture);
    symbol.querySelector('text').textContent = cell.genes.map( gene => `Δ${gene}`).join('/');
    if (! master) {
      master = symbol.firstElementChild;
    } else {
      for (let child of [...symbol.firstElementChild.children]) {
        master.appendChild(child);
      }
    }
  }

  for (let child of [...radar.children]) {
    radar.removeChild(child);
  }

  if (master) {
    radar.appendChild(master);
  }
};

const data_to_series = (data,library) => {
  let all_series = [];
  for (let channel = 1; channel <= channel_count; channel++ ) {
    let series = {};
    library.cells.map( cell => {
      let val = data.filter( row => row.libraryid === cell.cellid )[0][`binding${channel}`];
      series[cell.cellid] = val;
    });
    all_series.push(series);
  }
  return all_series;
};

const connect_cutoffs = (series,library) => {
  const radar = document.querySelector('x-radar');

  const cutoff_series = {};

  const cutoff = document.querySelector('input#cutoff');
  cutoff.value = 0;

  let update_cutoffs = () => {
    if (radar.data.indexOf(cutoff_series) < 0) {
      return;
    }
    library.cells.forEach( (cell) => {
      cutoff_series[cell.cellid] = cutoff.value;
    });
    radar.data = series;
    for (let a_series of series.slice(1)) {
      console.log(library.interpret(a_series,parseFloat(document.querySelector('input#cutoff').value)));
    }
  };

  update_cutoffs();

  series.splice(0,0,cutoff_series);

  radar.data = series;

  cutoff.setAttribute('min',radar.range[0]);
  cutoff.setAttribute('max',radar.range[1]);
  cutoff.addEventListener('change',update_cutoffs);
  cutoff.value = Math.floor(0.5*(radar.range[0]+radar.range[1]));
  update_cutoffs();

}

const accept_data = (data) => {
  const radar = document.querySelector('x-radar');

  let library = guess_library(data);
  if ( ! library ) {
    return;
  }

  update_radar_icons(radar,library);

  radar.seriesOrder = library.cells.map( cell => { return { id: cell.cellid } });

  const all_series = data_to_series(data,library);

  radar.data = all_series;

  connect_cutoffs(all_series,library);
  for (let series of all_series.slice(1)) {
    console.log(library.interpret(series,parseFloat(document.querySelector('input#cutoff').value)));
  }
};

const guess_library = (experimental_data) => {
  let entry_ids = experimental_data.map( row => row.libraryid ).filter( id => id );
  if (entry_ids.length < 1) {
    return;
  }
  let target_library = Library.fromIdentifiers(entry_ids);
  return target_library;
};


const add_channel = () => {
  channel_count +=1;
  mapper_columns[`binding${channel_count}`] = {
    type: 'number',
    description: `Level${channel_count} binding`
  }
  let mapper = document.querySelector('x-pastemapper');
  mapper.template = mapper_columns;
};

const wire_pastemapper = () => {
  const mapper = document.querySelector('x-pastemapper');
  mapper.header = true;
  mapper.template = mapper_columns;
  mapper.addEventListener('change',async () => {
    let data = mapper.mappedData;
    accept_data(data);
  });
  document.querySelector('#addchannel').addEventListener('click', add_channel);
};


window.addEventListener('load', () => {
  wire_pastemapper();
});