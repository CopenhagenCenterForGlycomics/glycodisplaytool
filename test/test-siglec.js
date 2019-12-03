import Library from '../js/Library';

import assert from 'assert';

import fromEntries from 'object.fromentries';
 
if (!Object.fromEntries) {
    fromEntries.shim();
}

function ok(expr, msg) {
  if (!expr) throw new Error(msg);
}


const SIGLEC_DATA = {
  SIGLEC4: {
    values: {
"CBGA1.0-HEK030":33411.79,
"CBGA1.0-HEK031":22273,
"CBGA1.0-HEK032":23730,
"CBGA1.0-HEK033":46059,
"CBGA1.0-HEK034":58059,
"CBGA1.0-HEK035":25697,
"CBGA1.0-HEK036":22020,
"CBGA1.0-HEK037":27913,
"CBGA1.0-HEK038":302,
"CBGA1.0-HEK039":456,
"CBGA1.0-HEK040":273
    },
    wt: 31804,
    remove: [],
    requires: ["ST3GAL3 OR ST3GAL1+ST3GAL2"]
  },
  SIGLEC7: {
    values: {
"CBGA1.0-HEK030":9617,
"CBGA1.0-HEK031":281,
"CBGA1.0-HEK032":266,
"CBGA1.0-HEK033":8157,
"CBGA1.0-HEK034":10223,
"CBGA1.0-HEK035":10430,
"CBGA1.0-HEK036":9185,
"CBGA1.0-HEK037":697,
"CBGA1.0-HEK038":634,
"CBGA1.0-HEK039":573,
"CBGA1.0-HEK040":1345
    },
    wt: 12225,
    remove: [],
    requires: ['ST3GAL1','ST3GAL2','ST3GAL3','ST3GAL4','ST3GAL5','ST3GAL6']
  },
  SIGLEC9: {
    values: {
"CBGA1.0-HEK030":45172.57,
"CBGA1.0-HEK031":1456,
"CBGA1.0-HEK032":1686,
"CBGA1.0-HEK033":81843,
"CBGA1.0-HEK034":102871,
"CBGA1.0-HEK035":7947,
"CBGA1.0-HEK036":9461,
"CBGA1.0-HEK037":48432,
"CBGA1.0-HEK038":45484,
"CBGA1.0-HEK039":1134,
"CBGA1.0-HEK040":1315
    },
    wt: 54636,
    remove: [],
    requires: ['ST3GAL5','ST3GAL4','ST3GAL6']
  },

};

suite('Siglec testing');

for (let lectin of Object.keys(SIGLEC_DATA)) {
  test(`Interprets results from ${lectin}`, function() {
    let { values, wt, remove, requires } = SIGLEC_DATA[lectin];
    let library = Library.fromIdentifiers(Object.keys(values));
    let { remove: removeres, requires: requireres } = library.interpret(values,wt);
    assert.deepEqual(removeres.sort(),remove.sort());
    assert.deepEqual(requireres.sort(),requires.sort());    
  });
}