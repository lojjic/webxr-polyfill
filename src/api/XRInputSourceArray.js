/*
 * TODO license header
 */

export const PRIVATE = Symbol('@@webxr-polyfill/XRInputSourceArray');
export const UPDATE = Symbol('@@webxr-polyfill/XRInputSourceArray#update');

export default class XRInputSourceArray {
  constructor() {
    const array = [];
    this[PRIVATE] = { array };
  }

  [Symbol.iterator]() {
    return this[PRIVATE].array[Symbol.iterator]();
  }

  get length() {
    return this[PRIVATE].array.length;
  }

  /**
   * @private update the list of input sources.
   * @param {Array<XRInputSource>} values
   */
  [UPDATE](values) {
    const array = this[PRIVATE].array;
    for (let i = 0; i < values.length; i++) {
      array[i] = values[i];
      // Expose this index as a readonly property
      Object.defineProperty(this, i, {
        configurable: true,
        enumerable: true,
        value: values[i],
        writable: false
      });
    }
    while (array.length > values.length) {
      delete this[--array.length];
    }
  }
}
