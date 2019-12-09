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

const LIBRARIES = new Map();

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
    for (let libraryid of LIBRARIES.keys()) {
      let idset = new Set(LIBRARIES.get(libraryid).map( cell => cell.id ));
      let intersection = new Set([...idset].filter(x => inputset.has(x)));
      if (intersection.size > max_size) {
        target_set = libraryid;
        max_size = intersection.size;
      }
    }
    return this.fromObject(target_set,LIBRARIES.get(target_set));
  }
  static LoadDefinitions(definitions) {
    LIBRARIES.clear();
    for (let libraryid of Object.keys(definitions)) {
      LIBRARIES.set(libraryid, definitions[libraryid]);
    }
  }
}

export default Library;
