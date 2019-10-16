import 'pastemapper'

import Library from './Library';

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

let channel_count = 1;

const guess_library = (experimental_data) => {
  let entry_ids = experimental_data.map( row => row.libraryid ).filter( id => id );
  if (entry_ids.length < 1) {
    return;
  }
  console.log(entry_ids);
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
  let mapper = document.querySelector('x-pastemapper');
  mapper.header = true;
  mapper.template = mapper_columns;
  mapper.addEventListener('change',() => {
    let data = mapper.mappedData;
    let library = guess_library(data);
    if ( ! library ) {
      return;
    }
    console.log(library);
    document.querySelector('x-radar').seriesOrder = library.cells.map( cell => { return { id: cell.cellid } });
    let all_series = [];
    for (let channel = 1; channel <= channel_count; channel++ ) {
      let series = {};
      library.cells.map( cell => {
        let val = data.filter( row => row.libraryid === cell.cellid )[0][`binding${channel}`];
        series[cell.cellid] = val;
      });
      all_series.push(series);
    }
    console.log(all_series);
    document.querySelector('x-radar').data = all_series;
  });
  document.querySelector('#addchannel').addEventListener('click', add_channel);
};


window.addEventListener('load', () => {
  wire_pastemapper();
});