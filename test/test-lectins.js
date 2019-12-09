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


const LECTIN_DATA = {
  GNA: {
    values: {
"CBGA1.0-HEK001":17692.34,
"CBGA1.0-HEK002":775.68,
"CBGA1.0-HEK003":721.21,
"CBGA1.0-HEK004":19637.68,
"CBGA1.0-HEK005":17433.11,
"CBGA1.0-HEK006":1181.66,
"CBGA1.0-HEK007":22194.12,
"CBGA1.0-HEK008":0
    },
    wt: 470.9,
    remove: ['MGAT1'],
    requires: []
  },
  'GSL-1': {
    values: {
"CBGA1.0-HEK001":305.36,
"CBGA1.0-HEK002":1653.83,
"CBGA1.0-HEK003":239.23,
"CBGA1.0-HEK004":942.355,
"CBGA1.0-HEK005":334.89,
"CBGA1.0-HEK006":1804.2,
"CBGA1.0-HEK007":1766.87,
"CBGA1.0-HEK008":0
    },
    wt: 188,
    remove: ['COSMC'],
    requires: []
  },
  DSL: {
    values: {
"CBGA1.0-HEK001":710.28,
"CBGA1.0-HEK002":6745.595,
"CBGA1.0-HEK003":6690.01,
"CBGA1.0-HEK004":866.285,
"CBGA1.0-HEK005":201.015,
"CBGA1.0-HEK006":8899.84,
"CBGA1.0-HEK007":358.56,
"CBGA1.0-HEK008":0
    },
    wt: 7434.825,
    remove: [],
    requires: ['MGAT1']
  },
  'RCA-1': {
    values: {
"CBGA1.0-HEK001":21416.165,
"CBGA1.0-HEK002":70036.015,
"CBGA1.0-HEK003":55845.41,
"CBGA1.0-HEK004":20020.745,
"CBGA1.0-HEK005":3150.575,
"CBGA1.0-HEK006":60951.61,
"CBGA1.0-HEK007":3991.26,
"CBGA1.0-HEK008":0
    },
    wt: 66354.555,
    remove: [],
    requires: ['MGAT1']
  },
  ECL: {
    values: {
"CBGA1.0-HEK001":10414.52,
"CBGA1.0-HEK002":30589.27,
"CBGA1.0-HEK003":37217.9,
"CBGA1.0-HEK004":9190.135,
"CBGA1.0-HEK005":898.415,
"CBGA1.0-HEK006":37079.585,
"CBGA1.0-HEK007":832.875,
"CBGA1.0-HEK008":0
    },
    wt: 43932.875,
    remove: [],
    requires: ['MGAT1']
  },
  'PHA-E': {
    values: {
"CBGA1.0-HEK001":241.355,
"CBGA1.0-HEK002":40359.47,
"CBGA1.0-HEK003":38158.385,
"CBGA1.0-HEK004":268.135,
"CBGA1.0-HEK005":216.53,
"CBGA1.0-HEK006":39877.08,
"CBGA1.0-HEK007":248.965,
"CBGA1.0-HEK008":0
    },
    wt: 35214.345,
    remove: [],
    requires: ['MGAT1']
  },
  'PHA-L': {
    values: {
"CBGA1.0-HEK001":151,
"CBGA1.0-HEK002":20418.79,
"CBGA1.0-HEK003":19382.43,
"CBGA1.0-HEK004":168.87,
"CBGA1.0-HEK005":131.56,
"CBGA1.0-HEK006":19436.51,
"CBGA1.0-HEK007":197.28,
"CBGA1.0-HEK008":0
    },
    wt: 18319.75,
    remove: [],
    requires: ['MGAT1']
  }
};

suite('Lectin testing');

for (let lectin of Object.keys(LECTIN_DATA)) {
  test(`Interprets results from ${lectin}`, function() {
    let { values, wt, remove, requires } = LECTIN_DATA[lectin];
    let library = Library.fromIdentifiers(Object.keys(values));
    let { remove: removeres, requires: requireres } = library.interpret(values,wt);
    assert.deepEqual(remove, removeres);
    assert.deepEqual(requires, requireres);    
  });
}