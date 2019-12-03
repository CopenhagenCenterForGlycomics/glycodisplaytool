let Logic = require('logic-solver');

let solver = new Logic.Solver();

const and_geneset = (genes) => {
  let geneset = [].concat(genes);
  while (geneset.length > 1) {
    let statement = Logic.and(...geneset.splice(0,2));
    geneset.splice(0,0,statement);
  }
  return geneset[0];
};

const or_geneset = (genes) => {
  let geneset = [].concat(genes);
  while (geneset.length > 1) {
    let statement = Logic.or(...geneset.splice(0,2));
    geneset.splice(0,0,statement);
  }
  return geneset[0];
};

// Solution should be ['ST3GAL1','ST3GAL2','ST3GAL3','ST3GAL4','ST3GAL6']


solver.forbid('ST6GAL1');
solver.forbid('ST6GAL2');
solver.require(Logic.not(and_geneset(['ST6GAL1','ST6GAL2'])));
solver.require(Logic.not(and_geneset([ 'ST6GAL1', 'ST6GAL2', 'ST3GAL1', 'ST3GAL2', 'ST3GAL5' ])));
solver.require(Logic.not(and_geneset([ 'ST6GAL1', 'ST6GAL2', 'ST3GAL3', 'ST3GAL4', 'ST3GAL6' ])));
solver.require(or_geneset([ 'ST6GAL1',
  'ST6GAL2',
  'ST3GAL1',
  'ST3GAL2',
  'ST3GAL3',
  'ST3GAL4',
  'ST3GAL5',
  'ST3GAL6' ]));
let soln = solver.solve();
var allSolutions = [];
var curSolution = null;
while ((curSolution = solver.solve())) {
  allSolutions.push(curSolution.getTrueVars());
  solver.forbid(curSolution.getFormula());
}
console.log(allSolutions);