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


const SIALIC_DATA = {
  UKRAINE1963: {
    values: {
"CBGA1.0-HEK030":106244,
"CBGA1.0-HEK031":8056,
"CBGA1.0-HEK032":8056,
"CBGA1.0-HEK033":299784,
"CBGA1.0-HEK034":263445,
"CBGA1.0-HEK035":13027,
"CBGA1.0-HEK036":20319
    },
    wt: 227977,
    remove: [],
    requires: ['ST3GAL3','ST3GAL4','ST3GAL6']
  },
  HONGKONG1968: {
    values: {
"CBGA1.0-HEK030":2540,
"CBGA1.0-HEK031":986,
"CBGA1.0-HEK032":986,
"CBGA1.0-HEK033":28633,
"CBGA1.0-HEK034":26707,
"CBGA1.0-HEK035":63426,
"CBGA1.0-HEK036":100948
    },
    wt: 13825,
    remove: ['+ST6GAL1'],
    requires: ['ST3GAL3','ST3GAL4','ST3GAL6','ST6GAL1','ST6GAL2']
  },
  VIETNAM2004: {
    values: {
"CBGA1.0-HEK030":26018,
"CBGA1.0-HEK031":650,
"CBGA1.0-HEK032":595,
"CBGA1.0-HEK033":32593,
"CBGA1.0-HEK034":38155,
"CBGA1.0-HEK035":1064,
"CBGA1.0-HEK036":1049
    },
    wt: 33365,
    remove: [],
    requires: ['ST3GAL3','ST3GAL4','ST3GAL6']
  },
  TEXAS2010: {
    values: {
"CBGA1.0-HEK030":1877,
"CBGA1.0-HEK031":4219,
"CBGA1.0-HEK032":1131,
"CBGA1.0-HEK033":1007,
"CBGA1.0-HEK034":1353,
"CBGA1.0-HEK035":46470,
"CBGA1.0-HEK036":99167
    },
    wt: 6667,
    remove: ['+ST6GAL1'],
    requires: ['ST6GAL2','ST6GAL1']
  },
  SNA: {
    values: {
"CBGA1.0-HEK030":202,
"CBGA1.0-HEK031":2977,
"CBGA1.0-HEK032":226,
"CBGA1.0-HEK033":194,
"CBGA1.0-HEK034":226,
"CBGA1.0-HEK035":6829,
"CBGA1.0-HEK036":8530
    },
    wt: 1917,
    remove: ['+ST6GAL1'],
    requires: ['ST6GAL2','ST6GAL1']
  },
  MAL: {
    values: {
"CBGA1.0-HEK030":3484,
"CBGA1.0-HEK031":3749,
"CBGA1.0-HEK032":3863,
"CBGA1.0-HEK033":3989,
"CBGA1.0-HEK034":4571,
"CBGA1.0-HEK035":917,
"CBGA1.0-HEK036":441
    },
    wt: 4576,
    remove: [],
    requires: ['+ST6GAL1','+ST3GAL4']
  }
};

suite('Viral Sialic acid testing');

for (let [probe,definition] of Object.entries(SIALIC_DATA)) {
  test(`Interprets results from ${probe}`, function() {
    let { values, wt, remove, requires, outcompete } = definition;
    if ( ! outcompete ) {
      outcompete = [];
    }
    let library = Library.fromIdentifiers(Object.keys(values));
    let { remove: removeres, requires: requireres, outcompetes : outcompeteres } = library.interpret(values,wt);
    it('Suggests the correct genes to remove for activity');
    assert.deepEqual(removeres.sort(),remove.sort());
    it('Suggests the correct genes that are required for activity');
    assert.deepEqual(requireres.sort(),requires.sort());
    it('Suggests the correct genes that outcompete');
    assert.deepEqual(outcompeteres.sort(),outcompete.sort());
  });
}