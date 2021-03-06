goog.provide('qr.BitBuffer');



/**
 @constructor
 */
qr.BitBuffer = function() {
  this.buffer = {
    length: 0
  };
  this.length = 0;
};

qr.BitBuffer.prototype = {

  get: function(index) {
    var bufIndex = Math.floor(index / 8);
    return ((this.buffer[bufIndex] >>> (7 - index % 8)) & 1) == 1;
  },

  /**
   * @param {number} num
   * @param {number} length
   */
  put: function(num, length) {
    for (var i = 0; i < length; i++) {
      this.putBit(((num >>> (length - i - 1)) & 1) == 1);
    }
  },

  getLengthInBits: function() {
    return this.length;
  },

  putBit: function(bit) {

    var bufIndex = Math.floor(this.length / 8);
    if (this.buffer.length <= bufIndex) {
      this.buffer[this.buffer.length++] = 0;
    }

    if (bit) {
      this.buffer[bufIndex] |= (0x80 >>> (this.length % 8));
    }

    this.length++;
  }
};
