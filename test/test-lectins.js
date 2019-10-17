import Library from '../js/Library';

import assert from 'assert';

import fromEntries from 'object.fromentries';
 
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
  }
}


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