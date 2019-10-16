import { cached_render as render_sugar } from './rendersugar';

const LIBRARIES = {
  "SUBLIBRARY1": [
    {
      "id" : "CBGA1.0-HEK001",
      "genes" : "MGAT1",
      "deltas" : [{
        "base" : "NeuAc(a2-3)Gal(b1-3)GlcNAc(b1-2)Man(a1-3)[NeuAc(a2-3)Gal(b1-3)GlcNAc(b1-2)[NeuAc(a2-3)Gal(b1-3)GlcNAc(b1-6)]Man(a1-6)]Man(b1-4)GlcNAc(b1-4)[Fuc(a1-6)]GlcNAc(b1-N)Asn",
        "removed" : ["y6a","y6b","y6c"]
      }]
    },
    {
      "id" : "CBGA1.0-HEK002",
      "genes" : "COSMC",
      "deltas" : [{
        "base" : "NeuAc(a2-3)Gal(b1-3)[NeuAc(a2-3)Gal(b1-3)GlcNAc(b1-3)Gal(b1-3)GlcNAc(b1-6)]GalNAc(a1-O)Ser",
        "removed" : ["y4a","y3b"]
      }]
    },
    {
      "id" : "CBGA1.0-HEK003",
      "genes" : "B4GALT5,B4GALT6",
      "deltas" : [{
        "base" : "NeuAc(b2-3)[Gal(b1-3)GalNAc(b1-4)]Gal(b1-4)Glc(b1-?)Cer",
        "removed" : ["y3a"]
      }]
    },
    {
      "id" : "CBGA1.0-HEK004",
      "genes" : "MGAT1,COSMC",
      "deltas" : [
      {
        "base" : "NeuAc(a2-3)Gal(b1-3)GlcNAc(b1-2)Man(a1-3)[NeuAc(a2-3)Gal(b1-3)GlcNAc(b1-2)[NeuAc(a2-3)Gal(b1-3)GlcNAc(b1-6)]Man(a1-6)]Man(b1-4)GlcNAc(b1-4)[Fuc(a1-6)]GlcNAc(b1-N)Asn",
        "removed" : ["y6a","y6b","y6c"]
      },
      {
        "base" : "NeuAc(a2-3)Gal(b1-3)[NeuAc(a2-3)Gal(b1-3)GlcNAc(b1-3)Gal(b1-3)GlcNAc(b1-6)]GalNAc(a1-O)Ser",
        "removed" : ["y4a","y3b"]
      }
      ]

    },
    {
      "id" : "CBGA1.0-HEK005",
      "genes" : "MGAT1,B4GALT5,B4GALT6",
      "deltas" : [
      {
        "base" : "NeuAc(a2-3)Gal(b1-3)GlcNAc(b1-2)Man(a1-3)[NeuAc(a2-3)Gal(b1-3)GlcNAc(b1-2)[NeuAc(a2-3)Gal(b1-3)GlcNAc(b1-6)]Man(a1-6)]Man(b1-4)GlcNAc(b1-4)[Fuc(a1-6)]GlcNAc(b1-N)Asn",
        "removed" : ["y6a","y6b","y6c"]
      },
      {
        "base" : "NeuAc(b2-3)[Gal(b1-3)GalNAc(b1-4)]Gal(b1-4)Glc(b1-?)Cer",
        "removed" : ["y3a"]
      }
      ]
    },
    {
      "id" : "CBGA1.0-HEK006",
      "genes" : "COSMC,B4GALT5,B4GALT6",
      "deltas" : [
      {
        "base" : "NeuAc(b2-3)[Gal(b1-3)GalNAc(b1-4)]Gal(b1-4)Glc(b1-?)Cer",
        "removed" : ["y3a"]
      },
      {
        "base" : "NeuAc(a2-3)Gal(b1-3)[NeuAc(a2-3)Gal(b1-3)GlcNAc(b1-3)Gal(b1-3)GlcNAc(b1-6)]GalNAc(a1-O)Ser",
        "removed" : ["y4a","y3b"]
      }
      ]
    },
    {
      "id" : "CBGA1.0-HEK007",
      "genes" : "MGAT1,COSMC,B4GALT5,B4GALT6",
      "deltas" : [
      {
        "base" : "NeuAc(a2-3)Gal(b1-3)GlcNAc(b1-2)Man(a1-3)[NeuAc(a2-3)Gal(b1-3)GlcNAc(b1-2)[NeuAc(a2-3)Gal(b1-3)GlcNAc(b1-6)]Man(a1-6)]Man(b1-4)GlcNAc(b1-4)[Fuc(a1-6)]GlcNAc(b1-N)Asn",
        "removed" : ["y6a","y6b","y6c"]
      },
      {
        "base" : "NeuAc(a2-3)Gal(b1-3)[NeuAc(a2-3)Gal(b1-3)GlcNAc(b1-3)Gal(b1-3)GlcNAc(b1-6)]GalNAc(a1-O)Ser",
        "removed" : ["y4a","y3b"]
      },
      {
        "base" : "NeuAc(b2-3)[Gal(b1-3)GalNAc(b1-4)]Gal(b1-4)Glc(b1-?)Cer",
        "removed" : ["y3a"]
      }
      ]
    },
    {
      "id" : "CBGA1.0-HEK008",
      "genes" : "B4GALT7",
      "deltas" : [
      {
        "base" : "GlcA(b1-3)Gal(b1-3)Gal(b1-4)Xyl(b1-O)Ser",
        "removed" : ["y3a"]
      }
      ]
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
  addCell(cellid,genes,deltas) {
    this.cells.push({cellid,genes,deltas});
  }
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
  static fromObject(identifier,library_definition) {
    let library = new Library(identifier);
    for (let { id, genes, deltas } of library_definition) {
      library.addCell(id,genes.split(','),deltas);
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
