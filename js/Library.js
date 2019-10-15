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
};

class Library {
  constructor(identifier) {
    this.id = identifier;
    this.cells = [];
  }
  addCell(cellid,genes) {
    this.cells.push({cellid,genes});
  }
  static fromObject(identifier,library_definition) {
    let library = new Library(identifier);
    for (let { id, genes } of library_definition) {
      library.addCell(id,genes.split(','));
    }
    return library;
  }
  static fromIdentifiers(identifiers=[]) {
    const all_idsets = [];
    let inputset = new Set(identifiers);
    let target_set;
    let max_size = 0;
    for (let libraryid of Object.keys(LIBRARIES)) {
      let idset = new Set(LIBRARIES[libraryid].map( cell => cell.id ));
      let intersection = new Set([...idset].filter(x => inputset.has(x)));
      if (intersection.size > max_size) {
        target_set = libraryid;
        max_size = intersection.size;
      }
    }
    return Library.fromObject(target_set,LIBRARIES[target_set]);
  }
}

export default Library;
