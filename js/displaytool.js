import 'pastemapper'

import Library from './Library';

import Radarchart from './radar/Radar';

const mapper_columns = {
  libraryid : {
    type: 'string',
    description : 'LibraryID'
  },
  value : {
    type: 'number',
    description : 'Value'
  },
  overwt : {
    type: 'boolean',
    description : '>WT'
  },
  underwt : {
    type: 'boolean',
    description : '<WT'
  }
};

const guess_library = (experimental_data) => {
  let entry_ids = experimental_data.map( row => row.libraryid ).filter( id => id );
  if (entry_ids.length < 1) {
    return;
  }
  console.log(entry_ids);
  let target_library = Library.fromIdentifiers(entry_ids);
  console.log(target_library);
};


const wire_pastemapper = () => {
  let mapper = document.querySelector('x-pastemapper');
  mapper.header = true;
  mapper.template = mapper_columns;
  mapper.addEventListener('change',() => {
    let data = mapper.mappedData;
    guess_library(data);
  });
};


window.addEventListener('load', () => {
  wire_pastemapper();
});