import Library from '../js/Library';

import assert from 'assert';

import fromEntries from 'object.fromentries';

Library.LoadDefinitions(require('./common_library_definition.json'));

if (!Object.fromEntries) {
    fromEntries.shim();
}

function ok(expr, msg) {
  if (!expr) throw new Error(msg);
}


const ELONGATION_DATA = {
  MALI: {
    values: {
"TEST-ELONGATION-001":638,
"TEST-ELONGATION-002":890,
"TEST-ELONGATION-003":4737,
    },
    wt: 6557,
    remove: [],
    requires: ['B4GALT1','B4GALT2','B4GALT3','B4GALT4']
  },
  ECL: {
    values: {
"TEST-ELONGATION-001":1259,
"TEST-ELONGATION-002":198,
"TEST-ELONGATION-003":24811
    },
    wt: 27424,
    remove: [],
    requires: ['B4GALT1','B4GALT2','B4GALT3','B4GALT4']
  },
  GSLII: {
    values: {
"TEST-ELONGATION-001":9341.15,
"TEST-ELONGATION-002":7557.03,
"TEST-ELONGATION-003":148.76
    },
    wt: 155.77,
    remove: ['B4GALT1','B4GALT2','B4GALT3','B4GALT4'],
    requires: []
  },
  DSL: {
    values: {
"TEST-ELONGATION-001":1601.23,
"TEST-ELONGATION-002":1536.75,
"TEST-ELONGATION-003":3447.53
    },
    wt: 4189.73,
    remove: [],
    // Should be 'B4GALT1','B4GALT2','B4GALT3','B4GALT4' but change isn't large enough
    requires: []
  },
  WFL: {
    values: {
"TEST-ELONGATION-001":5619.02,
"TEST-ELONGATION-002":244.09,
"TEST-ELONGATION-003":1392.3
    },
    wt: 6714,
    remove: [],
    requires: ['B4GALNT3','B4GALNT4']
  },

};

//   ECL: {
//     values: {
// "TEST-ELONGATION-001":,
// "TEST-ELONGATION-002":,
// "TEST-ELONGATION-003":
//     },
//     wt: 6557,
//     remove: [],
//     requires: ['B4GALT1','B4GALT2','B4GALT3','B4GALT4']
//   },


suite('Elongation testing');

for (let lectin of Object.keys(ELONGATION_DATA)) {
  test(`Interprets results from ${lectin}`, function() {
    let { values, wt, remove, requires, ignore } = ELONGATION_DATA[lectin];
    let library = Library.fromIdentifiers(Object.keys(values));

    if ( ! ignore ) {
      ignore = [];
    }

    for (let ignored of ignore) {
      values[ignored] = wt;
    }
    let { remove: removeres, requires: requireres } = library.interpret(values,wt);
    assert.deepEqual(remove.sort(), removeres.sort());
    assert.deepEqual(requires.sort(), requireres.sort());
  });
}