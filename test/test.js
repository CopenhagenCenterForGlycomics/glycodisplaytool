

function ok(expr, msg) {
  if (!expr) throw new Error(msg);
}

suite('Basic functionality');

test('Test Promise works', function(done) {
  let waiting = new Promise( (resolve) => {
    setTimeout(resolve,100);
  });
  Promise.resolve(true).then( () => waiting ).then(function() {
    ok(true, 'Cannot resolve promises');
    done();
  });
});