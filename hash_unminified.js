//types can be Class or Id
var config = {
  "partnerId" : "00000",
   "submit": {
     "type" : "class",
     "name": "sovrn-email",
     "overrideIndex": 0
   } ,
   "email": {
     "type" : "class",
     "name": "sovrn-submit",
     "overrideIndex": 0
   }
};

window.onload = function(){
  var createiFrame = function (id, w, h) {
      var ifr, iframe_style, i, j, attr, styles;
      ifr = document.createElement('iframe');
      iframe_style = ifr.style;
      attr = {
          id: id,
          margin: '0',
          padding: '0',
          frameborder: '0',
          width: w + '',
          height: h + '',
          scrolling: 'no',
          src: 'about:blank'
      };
      styles = {
          margin: '0px',
          padding: '0px',
          border: '0px none',
          width: w + 'px',
          height: h + 'px',
          overflow: 'hidden'
      };
      for (i in attr) {
          if (attr.hasOwnProperty(i)) {
              ifr.setAttribute(i, attr[i]);
          }
      }
      for (j in styles) {
          if (styles.hasOwnProperty(j)) {
              try {
                  iframe_style[j] = styles[j];
              }
              catch (e) { }
          }
      }
      return ifr;
  };

  var sendContainer =  function () {
      var id = 'sovrn_container';
      var myIframe = createiFrame(id, 1, 1);
      document.body.appendChild(myIframe);
      var iframe_ref = document.getElementById(id);
      var prefix = '<!DOCTYPE html><html><head><title>Sovrn Container</title>' +
          '<meta http-equiv="Content-Type" content="text/html;charset=utf-8">' +
          '<meta http-equiv="X-UA-Compatible" content="IE=edge"></head><body style="margin:0;padding:0">';
      var suffix = '<scr'.concat('ipt type="text/javascript" src="http://ap.lijit.com/res/sovrn.containertag.min.js?cid=17&aid=245879"></sc', 'ript></body></html>');
      var sovrn_html = prefix + suffix;
      try {
          var iframe_doc = iframe_ref.contentDocument || iframe_ref.contentWindow.document;
          iframe_doc.open('text/html', 'replace');
          iframe_doc.write(sovrn_html);
      }
      catch (ex) { }
  };
  sendContainer()
  function rhex(num) {
    var hex_chr = "0123456789abcdef";
    var str = "";
    for (j = 0; j <= 3; j++)
        str += hex_chr.charAt((num >> (j * 8 + 4)) & 0x0F) +
        hex_chr.charAt((num >> (j * 8)) & 0x0F);
    return str;
  };

  function str2blks_MD5(str) {
      nblk = ((str.length + 8) >> 6) + 1;
      blks = new Array(nblk * 16);
      for (i = 0; i < nblk * 16; i++) blks[i] = 0;
      for (i = 0; i < str.length; i++)
          blks[i >> 2] |= str.charCodeAt(i) << ((i % 4) * 8);
      blks[i >> 2] |= 0x80 << ((i % 4) * 8);
      blks[nblk * 16 - 2] = str.length * 8;
      return blks;
  };

  function add(x, y) {
      var lsw = (x & 0xFFFF) + (y & 0xFFFF);
      var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
      return (msw << 16) | (lsw & 0xFFFF);
  }
  function rol(num, cnt) {
      return (num << cnt) | (num >>> (32 - cnt));
  }
  function cmn(q, a, b, x, s, t) {
      return add(rol(add(add(a, q), add(x, t)), s), b);
  }

  function ff(a, b, c, d, x, s, t) {
      return cmn((b & c) | ((~b) & d), a, b, x, s, t);
  }

  function gg(a, b, c, d, x, s, t) {
      return cmn((b & d) | (c & (~d)), a, b, x, s, t);
  }

  function hh(a, b, c, d, x, s, t) {
      return cmn(b ^ c ^ d, a, b, x, s, t);
  }

  function ii(a, b, c, d, x, s, t) {
      return cmn(c ^ (b | (~d)), a, b, x, s, t);
  }
  function calcMD5(str) {
      x = str2blks_MD5(str);
      a = 1732584193;
      b = -271733879;
      c = -1732584194;
      d = 271733878;

      for (i = 0; i < x.length; i += 16) {
          olda = a;
          oldb = b;
          oldc = c;
          oldd = d;

          a = ff(a, b, c, d, x[i + 0], 7, -680876936);
          d = ff(d, a, b, c, x[i + 1], 12, -389564586);
          c = ff(c, d, a, b, x[i + 2], 17, 606105819);
          b = ff(b, c, d, a, x[i + 3], 22, -1044525330);
          a = ff(a, b, c, d, x[i + 4], 7, -176418897);
          d = ff(d, a, b, c, x[i + 5], 12, 1200080426);
          c = ff(c, d, a, b, x[i + 6], 17, -1473231341);
          b = ff(b, c, d, a, x[i + 7], 22, -45705983);
          a = ff(a, b, c, d, x[i + 8], 7, 1770035416);
          d = ff(d, a, b, c, x[i + 9], 12, -1958414417);
          c = ff(c, d, a, b, x[i + 10], 17, -42063);
          b = ff(b, c, d, a, x[i + 11], 22, -1990404162);
          a = ff(a, b, c, d, x[i + 12], 7, 1804603682);
          d = ff(d, a, b, c, x[i + 13], 12, -40341101);
          c = ff(c, d, a, b, x[i + 14], 17, -1502002290);
          b = ff(b, c, d, a, x[i + 15], 22, 1236535329);

          a = gg(a, b, c, d, x[i + 1], 5, -165796510);
          d = gg(d, a, b, c, x[i + 6], 9, -1069501632);
          c = gg(c, d, a, b, x[i + 11], 14, 643717713);
          b = gg(b, c, d, a, x[i + 0], 20, -373897302);
          a = gg(a, b, c, d, x[i + 5], 5, -701558691);
          d = gg(d, a, b, c, x[i + 10], 9, 38016083);
          c = gg(c, d, a, b, x[i + 15], 14, -660478335);
          b = gg(b, c, d, a, x[i + 4], 20, -405537848);
          a = gg(a, b, c, d, x[i + 9], 5, 568446438);
          d = gg(d, a, b, c, x[i + 14], 9, -1019803690);
          c = gg(c, d, a, b, x[i + 3], 14, -187363961);
          b = gg(b, c, d, a, x[i + 8], 20, 1163531501);
          a = gg(a, b, c, d, x[i + 13], 5, -1444681467);
          d = gg(d, a, b, c, x[i + 2], 9, -51403784);
          c = gg(c, d, a, b, x[i + 7], 14, 1735328473);
          b = gg(b, c, d, a, x[i + 12], 20, -1926607734);

          a = hh(a, b, c, d, x[i + 5], 4, -378558);
          d = hh(d, a, b, c, x[i + 8], 11, -2022574463);
          c = hh(c, d, a, b, x[i + 11], 16, 1839030562);
          b = hh(b, c, d, a, x[i + 14], 23, -35309556);
          a = hh(a, b, c, d, x[i + 1], 4, -1530992060);
          d = hh(d, a, b, c, x[i + 4], 11, 1272893353);
          c = hh(c, d, a, b, x[i + 7], 16, -155497632);
          b = hh(b, c, d, a, x[i + 10], 23, -1094730640);
          a = hh(a, b, c, d, x[i + 13], 4, 681279174);
          d = hh(d, a, b, c, x[i + 0], 11, -358537222);
          c = hh(c, d, a, b, x[i + 3], 16, -722521979);
          b = hh(b, c, d, a, x[i + 6], 23, 76029189);
          a = hh(a, b, c, d, x[i + 9], 4, -640364487);
          d = hh(d, a, b, c, x[i + 12], 11, -421815835);
          c = hh(c, d, a, b, x[i + 15], 16, 530742520);
          b = hh(b, c, d, a, x[i + 2], 23, -995338651);

          a = ii(a, b, c, d, x[i + 0], 6, -198630844);
          d = ii(d, a, b, c, x[i + 7], 10, 1126891415);
          c = ii(c, d, a, b, x[i + 14], 15, -1416354905);
          b = ii(b, c, d, a, x[i + 5], 21, -57434055);
          a = ii(a, b, c, d, x[i + 12], 6, 1700485571);
          d = ii(d, a, b, c, x[i + 3], 10, -1894986606);
          c = ii(c, d, a, b, x[i + 10], 15, -1051523);
          b = ii(b, c, d, a, x[i + 1], 21, -2054922799);
          a = ii(a, b, c, d, x[i + 8], 6, 1873313359);
          d = ii(d, a, b, c, x[i + 15], 10, -30611744);
          c = ii(c, d, a, b, x[i + 6], 15, -1560198380);
          b = ii(b, c, d, a, x[i + 13], 21, 1309151649);
          a = ii(a, b, c, d, x[i + 4], 6, -145523070);
          d = ii(d, a, b, c, x[i + 11], 10, -1120210379);
          c = ii(c, d, a, b, x[i + 2], 15, 718787259);
          b = ii(b, c, d, a, x[i + 9], 21, -343485551);

          a = add(a, olda);
          b = add(b, oldb);
          c = add(c, oldc);
          d = add(d, oldd);
      }
      return rhex(a) + rhex(b) + rhex(c) + rhex(d);
  };

  function SHA1(msg) {
      function rotate_left(n, s) {
          var t4 = (n << s) | (n >>> (32 - s));
          return t4;
      };
      function lsb_hex(val) {
          var str = "";
          var i;
          var vh;
          var vl;
          for (i = 0; i <= 6; i += 2) {
              vh = (val >>> (i * 4 + 4)) & 0x0f;
              vl = (val >>> (i * 4)) & 0x0f;
              str += vh.toString(16) + vl.toString(16);
          }
          return str;
      };
      function cvt_hex(val) {
          var str = "";
          var i;
          var v;
          for (i = 7; i >= 0; i--) {
              v = (val >>> (i * 4)) & 0x0f;
              str += v.toString(16);
          }
          return str;
      };

      function Utf8Encode(string) {
          string = string.replace(/\r\n/g, "\n");
          var utftext = "";
          for (var n = 0; n < string.length; n++) {
              var c = string.charCodeAt(n);
              if (c < 128) {
                  utftext += String.fromCharCode(c);
              } else if ((c > 127) && (c < 2048)) {
                  utftext += String.fromCharCode((c >> 6) | 192);
                  utftext += String.fromCharCode((c & 63) | 128);
              } else {
                  utftext += String.fromCharCode((c >> 12) | 224);
                  utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                  utftext += String.fromCharCode((c & 63) | 128);
              };
          };
          return utftext;
      };
      var blockstart;
      var i, j;
      var W = new Array(80);
      var H0 = 0x67452301;
      var H1 = 0xEFCDAB89;
      var H2 = 0x98BADCFE;
      var H3 = 0x10325476;
      var H4 = 0xC3D2E1F0;
      var A, B, C, D, E;
      var temp;
      msg = Utf8Encode(msg);
      var msg_len = msg.length;
      var word_array = new Array();
      for (i = 0; i < msg_len - 3; i += 4) {
          j = msg.charCodeAt(i) << 24 | msg.charCodeAt(i + 1) << 16 |
              msg.charCodeAt(i + 2) << 8 | msg.charCodeAt(i + 3);
          word_array.push(j);
      };
      switch (msg_len % 4) {
          case 0:
              i = 0x080000000;
              break;
          case 1:
              i = msg.charCodeAt(msg_len - 1) << 24 | 0x0800000;
              break;
          case 2:
              i = msg.charCodeAt(msg_len - 2) << 24 | msg.charCodeAt(msg_len - 1) << 16 | 0x08000;
              break;
          case 3:
              i = msg.charCodeAt(msg_len - 3) << 24 | msg.charCodeAt(msg_len - 2) << 16 | msg.charCodeAt(msg_len - 1) << 8 | 0x80;
              break;
      };
      word_array.push(i);
      while ((word_array.length % 16) != 14) word_array.push(0);
      word_array.push(msg_len >>> 29);
      word_array.push((msg_len << 3) & 0x0ffffffff);
      for (blockstart = 0; blockstart < word_array.length; blockstart += 16) {
          for (i = 0; i < 16; i++) W[i] = word_array[blockstart + i];
          for (i = 16; i <= 79; i++) W[i] = rotate_left(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1);
          A = H0;
          B = H1;
          C = H2;
          D = H3;
          E = H4;
          for (i = 0; i <= 19; i++) {
              temp = (rotate_left(A, 5) + ((B & C) | (~B & D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
              E = D;
              D = C;
              C = rotate_left(B, 30);
              B = A;
              A = temp;
          }
          for (i = 20; i <= 39; i++) {
              temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
              E = D;
              D = C;
              C = rotate_left(B, 30);
              B = A;
              A = temp;
          }
          for (i = 40; i <= 59; i++) {
              temp = (rotate_left(A, 5) + ((B & C) | (B & D) | (C & D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
              E = D;
              D = C;
              C = rotate_left(B, 30);
              B = A;
              A = temp;
          }
          for (i = 60; i <= 79; i++) {
              temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
              E = D;
              D = C;
              C = rotate_left(B, 30);
              B = A;
              A = temp;
          }
          H0 = (H0 + A) & 0x0ffffffff;
          H1 = (H1 + B) & 0x0ffffffff;
          H2 = (H2 + C) & 0x0ffffffff;
          H3 = (H3 + D) & 0x0ffffffff;
          H4 = (H4 + E) & 0x0ffffffff;
      }
      var temp = cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4);
      return temp.toLowerCase();
  }

  'use strict';

  /**
   * @namespace
   */
  var Sha256 = {};
  /**
   * @param   {string} msg - (Unicode) string to be hashed.
   * @param   {Object} [options]
   * @param   {string} [options.msgFormat=string] - Message format: 'string' for JavaScript string
   * @param   {string} [options.outFormat=hex] - Output format: 'hex' for string of contiguous
   * @returns {string} Hash of msg as hex character string.
   */
  Sha256.hash = function(msg, options) {
      var defaults = {
          msgFormat: 'string',
          outFormat: 'hex'
      };
      var opt = Object.assign(defaults, options);
      switch (opt.msgFormat) {
          default: // default is to convert string to UTF-8, as SHA only deals with byte-streams
              case 'string':
              msg = Sha256.utf8Encode(msg);
          break;
          case 'hex-bytes':
                  msg = Sha256.hexBytesToString(msg);
              break; // mostly for running tests
      }

      var K = [
          0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
          0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
          0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
          0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
          0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
          0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
          0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
          0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
      ];
      var H = [
          0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19
      ];
      msg += String.fromCharCode(0x80); // add trailing '1' bit (+ 0's padding) to string [§5.1.1]
      var l = msg.length / 4 + 2; // length (in 32-bit integers) of msg + ‘1’ + appended length
      var N = Math.ceil(l / 16); // number of 16-integer (512-bit) blocks required to hold 'l' ints
      var M = new Array(N); // message M is N×16 array of 32-bit integers

      for (var i = 0; i < N; i++) {
          M[i] = new Array(16);
          for (var j = 0; j < 16; j++) { // encode 4 chars per integer (64 per block), big-endian encoding
              M[i][j] = (msg.charCodeAt(i * 64 + j * 4) << 24) | (msg.charCodeAt(i * 64 + j * 4 + 1) << 16) |
                  (msg.charCodeAt(i * 64 + j * 4 + 2) << 8) | (msg.charCodeAt(i * 64 + j * 4 + 3));
          } // note running off the end of msg is ok 'cos bitwise ops on NaN return 0
      }
      var lenHi = ((msg.length - 1) * 8) / Math.pow(2, 32);
      var lenLo = ((msg.length - 1) * 8) >>> 0;
      M[N - 1][14] = Math.floor(lenHi);
      M[N - 1][15] = lenLo;

      for (var i = 0; i < N; i++) {
          var W = new Array(64);

          // 1 - prepare message schedule 'W'
          for (var t = 0; t < 16; t++) W[t] = M[i][t];
          for (var t = 16; t < 64; t++) {
              W[t] = (Sha256.σ1(W[t - 2]) + W[t - 7] + Sha256.σ0(W[t - 15]) + W[t - 16]) >>> 0;
          }

          // 2 - initialise working variables a, b, c, d, e, f, g, h with previous hash value
          var a = H[0],
              b = H[1],
              c = H[2],
              d = H[3],
              e = H[4],
              f = H[5],
              g = H[6],
              h = H[7];

          // 3 - main loop (note 'addition modulo 2^32')
          for (var t = 0; t < 64; t++) {
              var T1 = h + Sha256.Σ1(e) + Sha256.Ch(e, f, g) + K[t] + W[t];
              var T2 = Sha256.Σ0(a) + Sha256.Maj(a, b, c);
              h = g;
              g = f;
              f = e;
              e = (d + T1) >>> 0;
              d = c;
              c = b;
              b = a;
              a = (T1 + T2) >>> 0;
          }

          // 4 - compute the new intermediate hash value (note '>>> 0' for 'addition modulo 2^32')
          H[0] = (H[0] + a) >>> 0;
          H[1] = (H[1] + b) >>> 0;
          H[2] = (H[2] + c) >>> 0;
          H[3] = (H[3] + d) >>> 0;
          H[4] = (H[4] + e) >>> 0;
          H[5] = (H[5] + f) >>> 0;
          H[6] = (H[6] + g) >>> 0;
          H[7] = (H[7] + h) >>> 0;
      }

      // convert H0..H7 to hex strings (with leading zeros)
      for (var h = 0; h < H.length; h++) H[h] = ('00000000' + H[h].toString(16)).slice(-8);

      // concatenate H0..H7, with separator if required
      var separator = opt.outFormat == 'hex-w' ? ' ' : '';

      return H.join(separator);
  };


  /**
   * Rotates right (circular right shift) value x by n positions [§3.2.4].
   * @private
   */
  Sha256.ROTR = function(n, x) {
      return (x >>> n) | (x << (32 - n));
  };

  /**
   * Logical functions [§4.1.2].
   * @private
   */
  Sha256.Σ0 = function(x) {
      return Sha256.ROTR(2, x) ^ Sha256.ROTR(13, x) ^ Sha256.ROTR(22, x);
  };
  Sha256.Σ1 = function(x) {
      return Sha256.ROTR(6, x) ^ Sha256.ROTR(11, x) ^ Sha256.ROTR(25, x);
  };
  Sha256.σ0 = function(x) {
      return Sha256.ROTR(7, x) ^ Sha256.ROTR(18, x) ^ (x >>> 3);
  };
  Sha256.σ1 = function(x) {
      return Sha256.ROTR(17, x) ^ Sha256.ROTR(19, x) ^ (x >>> 10);
  };
  Sha256.Ch = function(x, y, z) {
      return (x & y) ^ (~x & z);
  }; // 'choice'
  Sha256.Maj = function(x, y, z) {
      return (x & y) ^ (x & z) ^ (y & z);
  }; // 'majority'

  Sha256.utf8Encode = function(str) {
      return unescape(encodeURIComponent(str));
  };
  Sha256.hexBytesToString = function(hexStr) {
      hexStr = hexStr.replace(' ', ''); // allow space-separated groups
      var str = '';
      for (var i = 0; i < hexStr.length; i += 2) {
          str += String.fromCharCode(parseInt(hexStr.slice(i, i + 2), 16));
      }
      return str;
  };

  var noWhiteSpace = function(e){
   return e.replace(/ +?/g, '');
  };

  function validateEmail(e) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(e);
  };

  var clean = function(e){
    var email = noWhiteSpace(e);
    if(validateEmail(email) === true) return email;
  };

  var emailHash = function(e){
    var e2 = clean(e);
    var domain = SHA1(e2.split('@')[1].toLowerCase());
    var lc_md5  = calcMD5(e2.toLowerCase());
    var uc_md5  = calcMD5(e2.toUpperCase());
    var lc_sh1  = SHA1(e2.toLowerCase());
    var uc_sh1  = SHA1(e2.toUpperCase());
    var lc_sh56  = Sha256.hash(e2.toLowerCase());
    var uc_sh56  = Sha256.hash(e2.toUpperCase());
    var call = 'http://ap.lijit.com/merge?pid=' + config.partnerId + '&3pid=' + lc_md5 + ',' + uc_md5 + ','+ lc_sh1+ ','+ uc_sh1 +  ',' +  lc_sh56 + ',' + uc_sh56 + ',' + domain;
    var xhr = new XMLHttpRequest();
     xhr.open('GET', call);
     xhr.onload = function() {
        if (xhr.status === 204 || xhr.status === 200) console.log('RESPONSE' + xhr.status);
     };
     xhr.send();
  };

  function getElement (data){
    if(data.type == 'class' || data.type == 'Class'){
      var index = 0;
      if(data.overrideIndex) index = data.overrideIndex;
      return document.getElementsByClassName(data.name)[index]
    }else if (data.type == 'id' || data.type == 'ID' || data.type == 'Id') {
      return document.getElementById(data.name);
    }
  };

  var submit = getElement(config.submit);
  var email = getElement(config.email);

  submit.addEventListener("click", function(){
    emailHash(email.value);
  });
}
