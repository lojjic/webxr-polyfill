/*
 * TODO license header
 */


import mocha from 'mocha';
import { assert } from 'chai';

import XRInputSourceArray, {UPDATE} from '../../src/api/XRInputSourceArray'
import XRInputSource from '../../src/api/XRInputSource'



describe('API - XRInputSourceArray', () => {
  function create(size) {
    const obj = new XRInputSourceArray();
    const sources = [];
    for (let i = 0; i < size; i++) {
      sources.push(new XRInputSource(null));
    }
    obj[UPDATE](sources);
    return obj;
  }

  it('has a numeric `length` property', function() {
    let obj = create(0);
    assert.equal(obj.length, 0);
    obj = create(2);
    assert.equal(obj.length, 2);
  });

  it('is iterable', function() {
    const obj = create(2);
    assert.isFunction(obj[Symbol.iterator]);
    assert.doesNotThrow(() => {
      let count = 0;
      for (let inputSource of obj) {
        assert.instanceOf(inputSource, XRInputSource);
        count++;
      }
      assert.equal(count, 2);
    })
  });

  it('can access members by numeric index', function() {
    const obj = create(2);
    assert.instanceOf(obj[0], XRInputSource);
    assert.instanceOf(obj[1], XRInputSource);
    assert.isUndefined(obj[2]);
  });
});
