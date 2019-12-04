import Library from '../js/Library';

import assert from 'assert';

import fromEntries from 'object.fromentries';

if (!Object.fromEntries) {
    fromEntries.shim();
}

function ok(expr, msg) {
  if (!expr) throw new Error(msg);
}


const CAPPING_DATA = {
  MALII: {
    values: {
"TEST-CAPPING-001":6348,
"TEST-CAPPING-002":6999,
"TEST-CAPPING-003":5390,
"TEST-CAPPING-004":2183,
"TEST-CAPPING-005":4482,
"TEST-CAPPING-006":7160,
"TEST-CAPPING-007":5790,
"TEST-CAPPING-008":5888,
"TEST-CAPPING-009":2024,
"TEST-CAPPING-010":5501,
"TEST-CAPPING-011":2880,
"TEST-CAPPING-012":1773
    },
    wt: 7153,
    remove: [],
    requires: ['ST3GAL1','ST3GAL2','ST3GAL3','ST3GAL4','ST3GAL6']
  },
  SNAI: {
    values: {
"TEST-CAPPING-001":232,
"TEST-CAPPING-002":214,
"TEST-CAPPING-003":204,
"TEST-CAPPING-004":395,
"TEST-CAPPING-005":271,
"TEST-CAPPING-006":331,
"TEST-CAPPING-007":601,
"TEST-CAPPING-008":1232,
"TEST-CAPPING-009":468,
"TEST-CAPPING-010":277,
"TEST-CAPPING-011":18647,
"TEST-CAPPING-012":15648
    },
    wt: 7433,
    remove: [],
    requires: ['ST6GAL1','ST6GAL2']
  },
  SIGLEC7: {
    values: {
"TEST-CAPPING-001":6980,
"TEST-CAPPING-002":672,
"TEST-CAPPING-003":6283,
"TEST-CAPPING-004":365,
"TEST-CAPPING-005":12938,
"TEST-CAPPING-006":22051,
"TEST-CAPPING-007":1625,
"TEST-CAPPING-008":1328,
"TEST-CAPPING-009":681,
"TEST-CAPPING-010":566,
"TEST-CAPPING-011":828,
"TEST-CAPPING-012":640
    },
    wt: 21372,
    remove: [],
    // The ST6GAL1 & ST6GAL2 knockin dont restore binding, resulting
    // in undefined behaviour
    ignore: ['TEST-CAPPING-011','TEST-CAPPING-012'],
    requires: ['ST3GAL1','ST3GAL2','ST6GAL1','ST6GAL2']
  },
  SIGLEC9: {
    values: {
"TEST-CAPPING-001":20087,
"TEST-CAPPING-002":19231,
"TEST-CAPPING-003":794,
"TEST-CAPPING-004":794,
"TEST-CAPPING-005":821,
"TEST-CAPPING-006":726,
"TEST-CAPPING-007":2637,
"TEST-CAPPING-008":60846,
"TEST-CAPPING-009":933,
"TEST-CAPPING-010":18072,
"TEST-CAPPING-011":3095,
"TEST-CAPPING-012":546
    },
    wt: 21646,
    remove: [],
    requires: ['ST3GAL4','ST3GAL6']
  },
  a23lectenz: {
    values: {
"TEST-CAPPING-001":7471,
"TEST-CAPPING-002":7375,
"TEST-CAPPING-003":500,
"TEST-CAPPING-004":411,
"TEST-CAPPING-005":395,
"TEST-CAPPING-006":303,
"TEST-CAPPING-007":1579,
"TEST-CAPPING-008":15622,
"TEST-CAPPING-009":259,
"TEST-CAPPING-010":6735,
"TEST-CAPPING-011":133,
"TEST-CAPPING-012":163
    },
    wt: 3873,
    remove: ['+ST3GAL4'],
    requires: ['ST3GAL3','ST3GAL4','ST3GAL6']
  },
};

suite('Capping test library testing');

for (let [probe,definition] of Object.entries(CAPPING_DATA)) {
  test(`Interprets results from ${probe}`, function() {
    let { values, wt, remove, requires, outcompete, ignore } = definition;
    if ( ! outcompete ) {
      outcompete = [];
    }
    if ( ! ignore ) {
      ignore = [];
    }
    let library = Library.fromIdentifiers(Object.keys(values));
    for (let ignored of ignore) {
      values[ignored] = wt;
    }
    let { remove: removeres, requires: requireres, outcompetes : outcompeteres } = library.interpret(values,wt);
    it('Suggests the correct genes to remove for activity');
    assert.deepEqual(removeres.sort(),remove.sort());
    it('Suggests the correct genes that are required for activity');
    assert.deepEqual(requireres.sort(),requires.sort());
    it('Suggests the correct genes that outcompete');
    assert.deepEqual(outcompeteres.sort(),outcompete.sort());
  });
}