import Logic from 'logic-solver';

const or_geneset = (genes) => {
  let geneset = [].concat(genes);
  while (geneset.length > 1) {
    let statement = Logic.or(...geneset.splice(0,2));
    geneset.splice(0,0,statement);
  }
  return geneset[0];
};

const and_geneset = (genes) => {
  let geneset = [].concat(genes);
  while (geneset.length > 1) {
    let statement = Logic.and(...geneset.splice(0,2));
    geneset.splice(0,0,statement);
  }
  return geneset[0];
};

const flatten_genes = (genes) => {
  let kos = [].concat.apply([], genes.filter( gene => gene.indexOf('+') !== 0 ).map( gene => gene.split('+') ));
  let kis = genes.filter( gene => gene.indexOf('+') === 0 );
  return kos.concat(kis);
};

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
  ],
  "SUBLIBRARY4" : [
    {
      "id" : "CBGA1.0-HEK030",
      "genes" : "ST6GAL1+ST6GAL2",
      "deltas" : [
      {
        "base" : "NeuAc(a2-3)Gal",
        "removed" : []
      },
      {
        "base" : "NeuAc(a2-6)Gal",
        "removed" : ["y1a"]
      }
      ]
    },
    {
      "id" : "CBGA1.0-HEK031",
      "genes" : "ST3GAL3+ST3GAL4+ST3GAL6",
      "deltas" : [
      {
        "base" : "NeuAc(a2-3)Gal",
        "removed" : ["y1a"]
      },
      {
        "base" : "NeuAc(a2-6)Gal",
        "removed" : []
      }
      ]
    },
    {
      "id" : "CBGA1.0-HEK032",
      "genes" : "ST3GAL3+ST3GAL4+ST3GAL6,ST6GAL1+ST6GAL2",
      "deltas" : [
      {
        "base" : "NeuAc(a2-3)Gal",
        "removed" : ["y1a"]
      },
      {
        "base" : "NeuAc(a2-6)Gal",
        "removed" : ["y1a"]
      }
      ]
    },
    {
      "id" : "CBGA1.0-HEK033",
      "genes" : "ST6GAL1+ST6GAL2,ST3GAL3+ST3GAL4+ST3GAL6,+ST3GAL4",
      "rescues" : "CBGA1.0-HEK032",
      "deltas" : [
      {
        "base" : "NeuAc(a2-3)Gal",
        "removed" : []
      },
      {
        "base" : "NeuAc(a2-6)Gal",
        "removed" : ["y1a"]
      }
      ]
    },
    {
      "id" : "CBGA1.0-HEK034",
      "genes" : "ST6GAL1+ST6GAL2,ST3GAL3+ST3GAL4+ST3GAL6,+ST3GAL4",
      "rescues" : "CBGA1.0-HEK032",
      "deltas" : [
      {
        "base" : "NeuAc(a2-3)Gal",
        "removed" : []
      },
      {
        "base" : "NeuAc(a2-6)Gal",
        "removed" : ["y1a"]
      }
      ]
    },
    {
      "id" : "CBGA1.0-HEK035",
      "genes" : "ST6GAL1+ST6GAL2,ST3GAL3+ST3GAL4+ST3GAL6,+ST6GAL1",
      "rescues" : "CBGA1.0-HEK032",
      "deltas" : [
      {
        "base" : "NeuAc(a2-3)Gal",
        "removed" : ["y1a"]
      },
      {
        "base" : "NeuAc(a2-6)Gal",
        "removed" : []
      }
      ]

    },
    {
      "id" : "CBGA1.0-HEK036",
      "genes" : "ST6GAL1+ST6GAL2,ST3GAL3+ST3GAL4+ST3GAL6,+ST6GAL1",
      "rescues" : "CBGA1.0-HEK032",
      "deltas" : [
      {
        "base" : "NeuAc(a2-3)Gal",
        "removed" : ["y1a"]
      },
      {
        "base" : "NeuAc(a2-6)Gal",
        "removed" : []
      }
      ]
    },
    {
      "id" : "CBGA1.0-HEK037",
      "genes" : "ST3GAL1+ST3GAL2",
      "deltas" : [
      {
        "base" : "NeuAc(a2-3)Gal",
        "removed" : ["y1a"]
      },
      {
        "base" : "NeuAc(a2-6)Gal",
        "removed" : []
      }
      ]
    },
    {
      "id" : "CBGA1.0-HEK038",
      "genes" : "ST3GAL1+ST3GAL2+ST3GAL3",
      "deltas" : [
      {
        "base" : "NeuAc(a2-3)Gal",
        "removed" : ["y1a"]
      },
      {
        "base" : "NeuAc(a2-6)Gal",
        "removed" : []
      }
      ]
    },
    {
      "id" : "CBGA1.0-HEK039",
      "genes" : "ST3GAL1+ST3GAL2+ST3GAL3+ST3GAL4+ST3GAL5+ST3GAL6",
      "deltas" : [
      {
        "base" : "NeuAc(a2-3)Gal",
        "removed" : ["y1a"]
      },
      {
        "base" : "NeuAc(a2-6)Gal",
        "removed" : []
      }
      ]
    },
    {
      "id" : "CBGA1.0-HEK040",
      "genes" : "ST3GAL1+ST3GAL2+ST3GAL3+ST3GAL4+ST3GAL5+ST3GAL6,ST6GAL1+ST6GAL2",
      "deltas" : [
      {
        "base" : "NeuAc(a2-3)Gal",
        "removed" : ["y1a"]
      },
      {
        "base" : "NeuAc(a2-6)Gal",
        "removed" : ["y1a"]
      }
      ]
    }
  ],
  "SUBLIBRARY5" : [
    {
      "id" : "TEST-CAPPING-001",
      "genes" : "ST6GAL1+ST6GAL2"
    },
    {
      "id" : "TEST-CAPPING-002",
      "genes" : "ST6GAL1+ST6GAL2,ST3GAL1+ST3GAL2+ST3GAL5"
    },
    {
      "id" : "TEST-CAPPING-003",
      "genes" : "ST6GAL1+ST6GAL2,ST3GAL3+ST3GAL4+ST3GAL6"
    },
    {
      "id" : "TEST-CAPPING-004",
      "genes" : "ST6GAL1+ST6GAL2,ST3GAL1+ST3GAL2+ST3GAL3+ST3GAL4+ST3GAL5+ST3GAL6"
    },
    {
      "id" : "TEST-CAPPING-005",
      "rescues":"TEST-CAPPING-004",
      "genes" : "ST6GAL1+ST6GAL2,ST3GAL1+ST3GAL2+ST3GAL3+ST3GAL4+ST3GAL5+ST3GAL6,+ST3GAL1"
    },
    {
      "id" : "TEST-CAPPING-006",
      "rescues":"TEST-CAPPING-004",
      "genes" : "ST6GAL1+ST6GAL2,ST3GAL1+ST3GAL2+ST3GAL3+ST3GAL4+ST3GAL5+ST3GAL6,+ST3GAL2"
    },
    {
      "id" : "TEST-CAPPING-007",
      "rescues":"TEST-CAPPING-004",
      "genes" : "ST6GAL1+ST6GAL2,ST3GAL1+ST3GAL2+ST3GAL3+ST3GAL4+ST3GAL5+ST3GAL6,+ST3GAL3"
    },
    {
      "id" : "TEST-CAPPING-008",
      "rescues":"TEST-CAPPING-004",
      "genes" : "ST6GAL1+ST6GAL2,ST3GAL1+ST3GAL2+ST3GAL3+ST3GAL4+ST3GAL5+ST3GAL6,+ST3GAL4"
    },
    {
      "id" : "TEST-CAPPING-009",
      "rescues":"TEST-CAPPING-004",
      "genes" : "ST6GAL1+ST6GAL2,ST3GAL1+ST3GAL2+ST3GAL3+ST3GAL4+ST3GAL5+ST3GAL6,+ST3GAL5"
    },
    {
      "id" : "TEST-CAPPING-010",
      "rescues":"TEST-CAPPING-004",
      "genes" : "ST6GAL1+ST6GAL2,ST3GAL1+ST3GAL2+ST3GAL3+ST3GAL4+ST3GAL5+ST3GAL6,+ST3GAL6"
    },
    {
      "id" : "TEST-CAPPING-011",
      "rescues":"TEST-CAPPING-004",
      "genes" : "ST6GAL1+ST6GAL2,ST3GAL1+ST3GAL2+ST3GAL3+ST3GAL4+ST3GAL5+ST3GAL6,+ST6GAL1"
    },
    {
      "id" : "TEST-CAPPING-012",
      "rescues":"TEST-CAPPING-004",
      "genes" : "ST6GAL1+ST6GAL2,ST3GAL1+ST3GAL2+ST3GAL3+ST3GAL4+ST3GAL5+ST3GAL6,+ST6GAL2"
    }
  ],
  "SUBLIBRARY6" : [
    {
      "id" : "TEST-ELONGATION-001",
      "genes" : "B4GALT1+B4GALT2+B4GALT3+B4GALT4",
    },
    {
      "id" : "TEST-ELONGATION-002",
      "genes" : "B4GALT1+B4GALT2+B4GALT3+B4GALT4,B4GALNT3+B4GALNT4",
    },
    {
      "id" : "TEST-ELONGATION-003",
      "genes" : "B4GALNT3+B4GALNT4",
    },
    {
      "id" : "TEST-ELONGATION-004",
      "genes" : "MGAT3+MGAT4A+MGAT4B+MGAT5,B3GNT2,FUT4",
    },
    {
      "id" : "TEST-ELONGATION-005",
      "genes" : "B4GALT1+B4GALT2+B4GALT3+B4GALT4,MGAT3+MGAT4A+MGAT4B+MGAT5,B3GNT2,FUT4",
    },
    {
      "id" : "TEST-ELONGATION-006",
      "genes" : "B4GALT1,B4GALT2,B4GALT3,B4GALT4,MGAT3+MGAT4A+MGAT4B+MGAT5,B3GNT2,FUT4,B4GALNT3+B4GALNT4",
    },
    {
      "id" : "TEST-ELONGATION-007",
      "genes" : "ST3GAL1+ST3GAL2+ST3GAL3+ST3GAL4+ST3GAL5+ST3GAL6",
    }
  ]
};




class Library {
  constructor(identifier) {
    this.id = identifier;
    this.cells = [];
  }
  addCell(cellid,genes,deltas,rescues) {
    this.cells.push({cellid,genes,deltas,rescues});
  }
  interpret(values,cutoff) {
    let log_values = Object.fromEntries( Object.entries(values).map( ([cellid,value]) => [cellid,Math.log2(value+1e-10)]) );

    let log_cutoff = Math.log2(cutoff+1e-10);
    const LOG_DIFF = 1.5;

    let test_results = Object.fromEntries( Object.entries(log_values).map( ([cellid,value]) => {
      let diff = log_values[cellid] - log_cutoff;
      let over_wt = diff >= LOG_DIFF;
      let under_wt = diff <= -1*LOG_DIFF;
      let no_change = (! over_wt && ! under_wt);
      let no_data = log_values[cellid] === Math.log2(0+1e-10);
      return [cellid,{ over_wt, under_wt, no_change, no_data }];
    }));
    let over_solver = new Logic.Solver();
    let under_solver = new Logic.Solver();

    for (let cell of this.cells) {
      if ( ! test_results[cell.cellid]) {
        continue;
      }
      let { over_wt, under_wt, no_change, no_data } = test_results[cell.cellid];

      if (no_data) {
        continue;
      }

      let genes = cell.genes;

      if (genes.length === 1) {
        if (! over_wt && ! under_wt ) {
          let genes_to_forbid = [];
          if (genes[0].indexOf('+') !== 0) {
            genes_to_forbid = genes[0].split('+');
          } else {
            genes_to_forbid = genes;
          }
          for (let gene of genes_to_forbid) {
            // console.log('Forbidding ',gene);
            over_solver.forbid(gene);
            under_solver.forbid(gene);
          }
        }
      }

      if (cell.rescues) {
        if (over_wt && test_results[cell.rescues].over_wt ) {
          // Skip this cell
          continue;
        }
        if (under_wt && test_results[cell.rescues].under_wt ) {
          // console.log('Forbidding rescue',genes.filter(gene => gene.indexOf('+') === 0));
          for (let gene of genes.filter(gene => gene.indexOf('+') === 0)) {
            under_solver.forbid(gene.replace('+',''));
          }
          // Skip this cell result
          continue;
        }
      }


      let genes_for_solver = flatten_genes(genes);

      if (over_wt) {
        // console.log('Over OR ',genes_for_solver);
        if (cell.rescues) {
          over_solver.require(or_geneset(genes_for_solver.filter( gene => gene.indexOf('+') === 0 )));
          continue;
        }
        over_solver.require(genes_for_solver.length > 1 ? or_geneset(genes_for_solver) : genes_for_solver[0]);
      }
      if (under_wt) {
        // console.log('Under OR ',genes_for_solver);
        under_solver.require(genes_for_solver.length > 1 ? or_geneset(genes_for_solver) : genes_for_solver[0]);
      }
      if ( ! over_wt && ! under_wt ) {
        if ( cell.rescues && test_results[cell.rescues].under_wt ) {
          // console.log('Rescued to WT ',genes_for_solver,'requiring',genes_for_solver.filter(gene => gene.indexOf('+') === 0));
          // under_solver.require(or_geneset([Logic.FALSE].concat(genes_for_solver.filter(gene => gene.indexOf('+') === 0).map( gene => gene.replace('+','')))));
        } else {
          // console.log('No effect ',genes_for_solver);
          under_solver.require(Logic.not(and_geneset(genes_for_solver)));
          // over_solver.require(Logic.not(and_geneset(genes_for_solver)));
        }
      }
    }
    let requires = [];
    let under_soln = null;
    while ((under_soln = under_solver.solve())) {
      requires = requires.concat(under_soln.getTrueVars()).filter( (o,i,a) => a.indexOf(o) === i );
      under_solver.forbid(under_soln.getFormula());
    }

    let remove = [];
    let over_soln = null;
    while ((over_soln = over_solver.solve())) {
      remove = remove.concat(over_soln.getTrueVars()).filter( (o,i,a) => a.indexOf(o) === i );
      over_solver.forbid(over_soln.getFormula());
    }
    // let requires = under_soln ? under_soln.getTrueVars() : [];
    let outcompetes = [];
    return { remove, requires, outcompetes };
  }
  static fromObject(identifier,library_definition) {
    let library = new this(identifier);
    for (let { id, genes, deltas, rescues } of library_definition) {
      library.addCell(id,genes.split(','),deltas,rescues);
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
    return this.fromObject(target_set,LIBRARIES[target_set]);
  }
}

export default Library;
