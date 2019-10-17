
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
      "genes" : "B4GALT5+B4GALT6",
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
      "genes" : "MGAT1,B4GALT5+B4GALT6",
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
      "genes" : "COSMC,B4GALT5+B4GALT6",
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
      "genes" : "MGAT1,COSMC,B4GALT5+B4GALT6",
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
  interpret(values,cutoff) {
    let log_values = Object.fromEntries( Object.entries(values).map( ([cellid,value]) => [cellid,Math.log2(value+1e-10)]) );
    let log_cutoff = Math.log2(cutoff+1e-10);
    let unaffected_genes = [];
    for (let cell of this.cells.filter( cell => cell.genes.length === 1)) {
      let diff = log_values[cell.cellid] - log_cutoff;
      let over_wt = diff >= 1;
      let under_wt = diff <= -1;
      if (! over_wt && ! under_wt) {
        unaffected_genes.push(cell.genes[0]);
      }
    }
    let gene_matrix = {};
    for (let cell of this.cells.filter( cell => cell.genes.length > 1)) {
      let diff = log_values[cell.cellid] - log_cutoff;
      let over_wt = diff >= 1;
      let under_wt = diff <= -1;
      for (let gene of cell.genes.filter( gene => unaffected_genes.indexOf(gene) < 0 )) {
        if ( ! gene_matrix[gene]) {
          gene_matrix[gene] = { over: true, under: true };
        }
        gene_matrix[gene].over = gene_matrix[gene].over && over_wt;
        gene_matrix[gene].under = gene_matrix[gene].under && under_wt;
      }
    }
    let remove = [];
    let requires = [];
    for (let [gene,matrix] of Object.entries(gene_matrix)) {
      if (matrix.over) {
        remove.push(gene);
      }
      if (matrix.under) {
        requires.push(gene);
      }
    }
    return { remove, requires };
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
