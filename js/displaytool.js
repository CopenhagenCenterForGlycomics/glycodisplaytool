import 'pastemapper'

const LIBRARIES = {
  "SUBLIBRARY1": [
    {
      "id" : "CBGA1.0-HEK001",
      "genes" : "MGAT1"
    },
    {
      "id" : "CBGA1.0-HEK002",
      "genes" : "COSMC"
    },
    {
      "id" : "CBGA1.0-HEK003",
      "genes" : "B4GALT5,B4GALT6"
    },
    {
      "id" : "CBGA1.0-HEK004",
      "genes" : "MGAT1,COSMC"
    },
    {
      "id" : "CBGA1.0-HEK005",
      "genes" : "MGAT1,B4GALT5,B4GALT6"
    },
    {
      "id" : "CBGA1.0-HEK006",
      "genes" : "MGAT1,COSMC,B4GALT5,B4GALT6"
    },
    {
      "id" : "CBGA1.0-HEK007",
      "genes" : "MGAT1,COSMC,B4GALT5,B4GALT6"
    },
    {
      "id" : "CBGA1.0-HEK008",
      "genes" : "B4GALT7"
    }
  ],
  "SUBLIBRARY2" : [
    {
      "id" : "CBGA1.0-HEK058",
      "genes" : "A4GALT"
    },
    {
      "id" : "CBGA1.0-HEK059",
      "genes" : "B3GNT5",
    },
    {
      "id" : "CBGA1.0-HEK060",
      "genes" : "ST3GAL5,B4GALNT1",
    }
  ],
  "SUBLIBRARY3" : [
    {
      "id" : "CBGA1.0-HEK016",
      "genes" : "MGAT2"
    },
    {
      "id" : "CBGA1.0-HEK017",
      "genes" : "MGAT3",
    },
    {
      "id" : "CBGA1.0-HEK018",
      "genes" : "MGAT4A",
    },
    {
      "id" : "CBGA1.0-HEK019",
      "genes" : "MGAT4B",
    },
    {
      "id" : "CBGA1.0-HEK020",
      "genes" : "MGAT4A,MGAT4B",
    },
    {
      "id" : "CBGA1.0-HEK021",
      "genes" : "MGAT5",
    }
  ]
}


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