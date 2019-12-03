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

// Solution should be ['ST3GAL3','ST3GAL1' ,'ST3GAL2']

// ST3GAL1/2/3/4/5/6 down
solver.require(Logic.or('ST3GAL1','ST3GAL2','ST3GAL3','ST3GAL4','ST3GAL5','ST3GAL6'));

// ST3GAL1/2/3 down

solver.require(Logic.or('ST3GAL1','ST3GAL2','ST3GAL3'));


console.log(solver.solve().getTrueVars());


// ST6GAL1/2 no effect
// IGNORED..

// ST3GAL1/2 no effect

solver.require(Logic.implies(Logic.not(Logic.and('ST3GAL1','ST3GAL2')),Logic.or('ST3GAL3','ST3GAL4','ST3GAL5')));

// ST3GAL3/4/6 no effect

solver.require(Logic.implies(Logic.not(Logic.and('ST3GAL3','ST3GAL4','ST3GAL6')), Logic.or('ST3GAL2','ST3GAL1','ST3GAL5') ) );

solver.require(Logic.not(Logic.or('ST3GAL4' ,'ST3GAL6','ST3GAL3')));

// ST3GAL3/4/6 ST6GAL1/2 no effect
// IGNORED..


console.log(solver.solve().getTrueVars());

let soln = solver.solve();
var allSolutions = [];
var curSolution = null;
while ((curSolution = solver.solve())) {
  allSolutions.push(curSolution.getTrueVars());
  solver.forbid(curSolution.getFormula());
}
console.log(allSolutions);


solver.require(Logic.and( Logic.not(Logic.or('ST3GAL3','ST3GAL4','ST3GAL6')), Logic.or('ST3GAL1','ST3GAL2','ST3GAL5','ST6GAL1','ST6GAL2')) );

console.log(solver.solve().getTrueVars());


solver.require(Logic.and( Logic.not(Logic.and('ST3GAL3','ST3GAL4','ST3GAL6','ST6GAL1','ST6GAL2')), Logic.and('ST3GAL1','ST3GAL2','ST3GAL5')) );


console.log(solver.solve().getTrueVars());



solver.require(Logic.and( Logic.not(Logic.or('ST3GAL1','ST3GAL2')), Logic.and('ST3GAL3','ST3GAL4','ST3GAL5','ST3GAL6','ST6GAL1','ST6GAL2')) );

console.log(solver.solve().getTrueVars());



// let soln = solver.solve();
// var allSolutions = [];
// var curSolution = null;
// while ((curSolution = solver.solve())) {
//   allSolutions.push(curSolution.getTrueVars());
//   solver.forbid(curSolution.getFormula());
// }
// console.log(allSolutions);