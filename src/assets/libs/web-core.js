var Ge = Object.defineProperty;
var Ke = (e, o, r) => o in e ? Ge(e, o, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[o] = r;
var _ = (e, o, r) => (Ke(e, typeof o != "symbol" ? o + "" : o, r), r);
var Ye = typeof global == "object" && global && global.Object === Object && global;
const Se = Ye;
var Xe = typeof self == "object" && self && self.Object === Object && self, Ze = Se || Xe || Function("return this")();
const O = Ze;
var Qe = O.Symbol;
const H = Qe;
var Ce = Object.prototype, et = Ce.hasOwnProperty, tt = Ce.toString, L = H ? H.toStringTag : void 0;
function rt(e) {
  var o = et.call(e, L), r = e[L];
  try {
    e[L] = void 0;
    var c = !0;
  } catch {
  }
  var f = tt.call(e);
  return c && (o ? e[L] = r : delete e[L]), f;
}
var nt = Object.prototype, ot = nt.toString;
function it(e) {
  return ot.call(e);
}
var at = "[object Null]", st = "[object Undefined]", ae = H ? H.toStringTag : void 0;
function U(e) {
  return e == null ? e === void 0 ? st : at : ae && ae in Object(e) ? rt(e) : it(e);
}
function W(e) {
  return e != null && typeof e == "object";
}
var ct = "[object Symbol]";
function ut(e) {
  return typeof e == "symbol" || W(e) && U(e) == ct;
}
var ft = Array.isArray;
const je = ft;
var pt = /\s/;
function lt(e) {
  for (var o = e.length; o-- && pt.test(e.charAt(o)); )
    ;
  return o;
}
var ht = /^\s+/;
function dt(e) {
  return e && e.slice(0, lt(e) + 1).replace(ht, "");
}
function $(e) {
  var o = typeof e;
  return e != null && (o == "object" || o == "function");
}
var se = 0 / 0, gt = /^[-+]0x[0-9a-f]+$/i, yt = /^0b[01]+$/i, mt = /^0o[0-7]+$/i, wt = parseInt;
function ce(e) {
  if (typeof e == "number")
    return e;
  if (ut(e))
    return se;
  if ($(e)) {
    var o = typeof e.valueOf == "function" ? e.valueOf() : e;
    e = $(o) ? o + "" : o;
  }
  if (typeof e != "string")
    return e === 0 ? e : +e;
  e = dt(e);
  var r = yt.test(e);
  return r || mt.test(e) ? wt(e.slice(2), r ? 2 : 8) : gt.test(e) ? se : +e;
}
var bt = "[object AsyncFunction]", vt = "[object Function]", _t = "[object GeneratorFunction]", Tt = "[object Proxy]";
function Ee(e) {
  if (!$(e))
    return !1;
  var o = U(e);
  return o == vt || o == _t || o == bt || o == Tt;
}
var At = O["__core-js_shared__"];
const k = At;
var ue = function() {
  var e = /[^.]+$/.exec(k && k.keys && k.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function St(e) {
  return !!ue && ue in e;
}
var Ct = Function.prototype, jt = Ct.toString;
function I(e) {
  if (e != null) {
    try {
      return jt.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var Et = /[\\^$.*+?()[\]{}|]/g, Pt = /^\[object .+?Constructor\]$/, Ot = Function.prototype, $t = Object.prototype, xt = Ot.toString, Ut = $t.hasOwnProperty, It = RegExp(
  "^" + xt.call(Ut).replace(Et, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function Rt(e) {
  if (!$(e) || St(e))
    return !1;
  var o = Ee(e) ? It : Pt;
  return o.test(I(e));
}
function Mt(e, o) {
  return e == null ? void 0 : e[o];
}
function N(e, o) {
  var r = Mt(e, o);
  return Rt(r) ? r : void 0;
}
var Bt = N(O, "WeakMap");
const K = Bt;
var Lt = 9007199254740991;
function Pe(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= Lt;
}
function Dt(e) {
  return e != null && Pe(e.length) && !Ee(e);
}
var Wt = Object.prototype;
function Oe(e) {
  var o = e && e.constructor, r = typeof o == "function" && o.prototype || Wt;
  return e === r;
}
var Nt = "[object Arguments]";
function fe(e) {
  return W(e) && U(e) == Nt;
}
var $e = Object.prototype, Ft = $e.hasOwnProperty, qt = $e.propertyIsEnumerable, Ht = fe(function() {
  return arguments;
}()) ? fe : function(e) {
  return W(e) && Ft.call(e, "callee") && !qt.call(e, "callee");
};
const Vt = Ht;
function kt() {
  return !1;
}
var xe = typeof exports == "object" && exports && !exports.nodeType && exports, pe = xe && typeof module == "object" && module && !module.nodeType && module, Jt = pe && pe.exports === xe, le = Jt ? O.Buffer : void 0, zt = le ? le.isBuffer : void 0, Gt = zt || kt;
const Kt = Gt;
var Yt = "[object Arguments]", Xt = "[object Array]", Zt = "[object Boolean]", Qt = "[object Date]", er = "[object Error]", tr = "[object Function]", rr = "[object Map]", nr = "[object Number]", or = "[object Object]", ir = "[object RegExp]", ar = "[object Set]", sr = "[object String]", cr = "[object WeakMap]", ur = "[object ArrayBuffer]", fr = "[object DataView]", pr = "[object Float32Array]", lr = "[object Float64Array]", hr = "[object Int8Array]", dr = "[object Int16Array]", gr = "[object Int32Array]", yr = "[object Uint8Array]", mr = "[object Uint8ClampedArray]", wr = "[object Uint16Array]", br = "[object Uint32Array]", S = {};
S[pr] = S[lr] = S[hr] = S[dr] = S[gr] = S[yr] = S[mr] = S[wr] = S[br] = !0;
S[Yt] = S[Xt] = S[ur] = S[Zt] = S[fr] = S[Qt] = S[er] = S[tr] = S[rr] = S[nr] = S[or] = S[ir] = S[ar] = S[sr] = S[cr] = !1;
function vr(e) {
  return W(e) && Pe(e.length) && !!S[U(e)];
}
function _r(e) {
  return function(o) {
    return e(o);
  };
}
var Ue = typeof exports == "object" && exports && !exports.nodeType && exports, D = Ue && typeof module == "object" && module && !module.nodeType && module, Tr = D && D.exports === Ue, J = Tr && Se.process, Ar = function() {
  try {
    var e = D && D.require && D.require("util").types;
    return e || J && J.binding && J.binding("util");
  } catch {
  }
}();
const he = Ar;
var de = he && he.isTypedArray, Sr = de ? _r(de) : vr;
const Cr = Sr;
function jr(e, o) {
  return function(r) {
    return e(o(r));
  };
}
var Er = jr(Object.keys, Object);
const Pr = Er;
var Or = Object.prototype, $r = Or.hasOwnProperty;
function xr(e) {
  if (!Oe(e))
    return Pr(e);
  var o = [];
  for (var r in Object(e))
    $r.call(e, r) && r != "constructor" && o.push(r);
  return o;
}
var Ur = N(O, "Map");
const Y = Ur;
var Ir = N(O, "DataView");
const X = Ir;
var Rr = N(O, "Promise");
const Z = Rr;
var Mr = N(O, "Set");
const Q = Mr;
var ge = "[object Map]", Br = "[object Object]", ye = "[object Promise]", me = "[object Set]", we = "[object WeakMap]", be = "[object DataView]", Lr = I(X), Dr = I(Y), Wr = I(Z), Nr = I(Q), Fr = I(K), x = U;
(X && x(new X(new ArrayBuffer(1))) != be || Y && x(new Y()) != ge || Z && x(Z.resolve()) != ye || Q && x(new Q()) != me || K && x(new K()) != we) && (x = function(e) {
  var o = U(e), r = o == Br ? e.constructor : void 0, c = r ? I(r) : "";
  if (c)
    switch (c) {
      case Lr:
        return be;
      case Dr:
        return ge;
      case Wr:
        return ye;
      case Nr:
        return me;
      case Fr:
        return we;
    }
  return o;
});
const qr = x;
var Hr = function() {
  return O.Date.now();
};
const z = Hr;
var Vr = "Expected a function", kr = Math.max, Jr = Math.min;
function Ie(e, o, r) {
  var c, f, m, d, w, g, p = 0, l = !1, y = !1, b = !0;
  if (typeof e != "function")
    throw new TypeError(Vr);
  o = ce(o) || 0, $(r) && (l = !!r.leading, y = "maxWait" in r, m = y ? kr(ce(r.maxWait) || 0, o) : m, b = "trailing" in r ? !!r.trailing : b);
  function v(i) {
    var A = c, j = f;
    return c = f = void 0, p = i, d = e.apply(j, A), d;
  }
  function T(i) {
    return p = i, w = setTimeout(u, o), l ? v(i) : d;
  }
  function C(i) {
    var A = i - g, j = i - p, E = o - A;
    return y ? Jr(E, m - j) : E;
  }
  function h(i) {
    var A = i - g, j = i - p;
    return g === void 0 || A >= o || A < 0 || y && j >= m;
  }
  function u() {
    var i = z();
    if (h(i))
      return s(i);
    w = setTimeout(u, C(i));
  }
  function s(i) {
    return w = void 0, b && c ? v(i) : (c = f = void 0, d);
  }
  function n() {
    w !== void 0 && clearTimeout(w), p = 0, c = g = f = w = void 0;
  }
  function t() {
    return w === void 0 ? d : s(z());
  }
  function a() {
    var i = z(), A = h(i);
    if (c = arguments, f = this, g = i, A) {
      if (w === void 0)
        return T(g);
      if (y)
        return clearTimeout(w), w = setTimeout(u, o), v(g);
    }
    return w === void 0 && (w = setTimeout(u, o)), d;
  }
  return a.cancel = n, a.flush = t, a;
}
var zr = "[object String]";
function ve(e) {
  return typeof e == "string" || !je(e) && W(e) && U(e) == zr;
}
var Gr = "[object Map]", Kr = "[object Set]", Yr = Object.prototype, Xr = Yr.hasOwnProperty;
function _e(e) {
  if (e == null)
    return !0;
  if (Dt(e) && (je(e) || typeof e == "string" || typeof e.splice == "function" || Kt(e) || Cr(e) || Vt(e)))
    return !e.length;
  var o = qr(e);
  if (o == Gr || o == Kr)
    return !e.size;
  if (Oe(e))
    return !xr(e).length;
  for (var r in e)
    if (Xr.call(e, r))
      return !1;
  return !0;
}
var Zr = "Expected a function";
function Qr(e, o, r) {
  var c = !0, f = !0;
  if (typeof e != "function")
    throw new TypeError(Zr);
  return $(r) && (c = "leading" in r ? !!r.leading : c, f = "trailing" in r ? !!r.trailing : f), Ie(e, o, {
    leading: c,
    maxWait: o,
    trailing: f
  });
}
function Re(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Me = { exports: {} };
(function(e, o) {
  (function(r) {
    e.exports = r();
  })(function(r) {
    var c = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
    function f(u, s) {
      var n = u[0], t = u[1], a = u[2], i = u[3];
      n += (t & a | ~t & i) + s[0] - 680876936 | 0, n = (n << 7 | n >>> 25) + t | 0, i += (n & t | ~n & a) + s[1] - 389564586 | 0, i = (i << 12 | i >>> 20) + n | 0, a += (i & n | ~i & t) + s[2] + 606105819 | 0, a = (a << 17 | a >>> 15) + i | 0, t += (a & i | ~a & n) + s[3] - 1044525330 | 0, t = (t << 22 | t >>> 10) + a | 0, n += (t & a | ~t & i) + s[4] - 176418897 | 0, n = (n << 7 | n >>> 25) + t | 0, i += (n & t | ~n & a) + s[5] + 1200080426 | 0, i = (i << 12 | i >>> 20) + n | 0, a += (i & n | ~i & t) + s[6] - 1473231341 | 0, a = (a << 17 | a >>> 15) + i | 0, t += (a & i | ~a & n) + s[7] - 45705983 | 0, t = (t << 22 | t >>> 10) + a | 0, n += (t & a | ~t & i) + s[8] + 1770035416 | 0, n = (n << 7 | n >>> 25) + t | 0, i += (n & t | ~n & a) + s[9] - 1958414417 | 0, i = (i << 12 | i >>> 20) + n | 0, a += (i & n | ~i & t) + s[10] - 42063 | 0, a = (a << 17 | a >>> 15) + i | 0, t += (a & i | ~a & n) + s[11] - 1990404162 | 0, t = (t << 22 | t >>> 10) + a | 0, n += (t & a | ~t & i) + s[12] + 1804603682 | 0, n = (n << 7 | n >>> 25) + t | 0, i += (n & t | ~n & a) + s[13] - 40341101 | 0, i = (i << 12 | i >>> 20) + n | 0, a += (i & n | ~i & t) + s[14] - 1502002290 | 0, a = (a << 17 | a >>> 15) + i | 0, t += (a & i | ~a & n) + s[15] + 1236535329 | 0, t = (t << 22 | t >>> 10) + a | 0, n += (t & i | a & ~i) + s[1] - 165796510 | 0, n = (n << 5 | n >>> 27) + t | 0, i += (n & a | t & ~a) + s[6] - 1069501632 | 0, i = (i << 9 | i >>> 23) + n | 0, a += (i & t | n & ~t) + s[11] + 643717713 | 0, a = (a << 14 | a >>> 18) + i | 0, t += (a & n | i & ~n) + s[0] - 373897302 | 0, t = (t << 20 | t >>> 12) + a | 0, n += (t & i | a & ~i) + s[5] - 701558691 | 0, n = (n << 5 | n >>> 27) + t | 0, i += (n & a | t & ~a) + s[10] + 38016083 | 0, i = (i << 9 | i >>> 23) + n | 0, a += (i & t | n & ~t) + s[15] - 660478335 | 0, a = (a << 14 | a >>> 18) + i | 0, t += (a & n | i & ~n) + s[4] - 405537848 | 0, t = (t << 20 | t >>> 12) + a | 0, n += (t & i | a & ~i) + s[9] + 568446438 | 0, n = (n << 5 | n >>> 27) + t | 0, i += (n & a | t & ~a) + s[14] - 1019803690 | 0, i = (i << 9 | i >>> 23) + n | 0, a += (i & t | n & ~t) + s[3] - 187363961 | 0, a = (a << 14 | a >>> 18) + i | 0, t += (a & n | i & ~n) + s[8] + 1163531501 | 0, t = (t << 20 | t >>> 12) + a | 0, n += (t & i | a & ~i) + s[13] - 1444681467 | 0, n = (n << 5 | n >>> 27) + t | 0, i += (n & a | t & ~a) + s[2] - 51403784 | 0, i = (i << 9 | i >>> 23) + n | 0, a += (i & t | n & ~t) + s[7] + 1735328473 | 0, a = (a << 14 | a >>> 18) + i | 0, t += (a & n | i & ~n) + s[12] - 1926607734 | 0, t = (t << 20 | t >>> 12) + a | 0, n += (t ^ a ^ i) + s[5] - 378558 | 0, n = (n << 4 | n >>> 28) + t | 0, i += (n ^ t ^ a) + s[8] - 2022574463 | 0, i = (i << 11 | i >>> 21) + n | 0, a += (i ^ n ^ t) + s[11] + 1839030562 | 0, a = (a << 16 | a >>> 16) + i | 0, t += (a ^ i ^ n) + s[14] - 35309556 | 0, t = (t << 23 | t >>> 9) + a | 0, n += (t ^ a ^ i) + s[1] - 1530992060 | 0, n = (n << 4 | n >>> 28) + t | 0, i += (n ^ t ^ a) + s[4] + 1272893353 | 0, i = (i << 11 | i >>> 21) + n | 0, a += (i ^ n ^ t) + s[7] - 155497632 | 0, a = (a << 16 | a >>> 16) + i | 0, t += (a ^ i ^ n) + s[10] - 1094730640 | 0, t = (t << 23 | t >>> 9) + a | 0, n += (t ^ a ^ i) + s[13] + 681279174 | 0, n = (n << 4 | n >>> 28) + t | 0, i += (n ^ t ^ a) + s[0] - 358537222 | 0, i = (i << 11 | i >>> 21) + n | 0, a += (i ^ n ^ t) + s[3] - 722521979 | 0, a = (a << 16 | a >>> 16) + i | 0, t += (a ^ i ^ n) + s[6] + 76029189 | 0, t = (t << 23 | t >>> 9) + a | 0, n += (t ^ a ^ i) + s[9] - 640364487 | 0, n = (n << 4 | n >>> 28) + t | 0, i += (n ^ t ^ a) + s[12] - 421815835 | 0, i = (i << 11 | i >>> 21) + n | 0, a += (i ^ n ^ t) + s[15] + 530742520 | 0, a = (a << 16 | a >>> 16) + i | 0, t += (a ^ i ^ n) + s[2] - 995338651 | 0, t = (t << 23 | t >>> 9) + a | 0, n += (a ^ (t | ~i)) + s[0] - 198630844 | 0, n = (n << 6 | n >>> 26) + t | 0, i += (t ^ (n | ~a)) + s[7] + 1126891415 | 0, i = (i << 10 | i >>> 22) + n | 0, a += (n ^ (i | ~t)) + s[14] - 1416354905 | 0, a = (a << 15 | a >>> 17) + i | 0, t += (i ^ (a | ~n)) + s[5] - 57434055 | 0, t = (t << 21 | t >>> 11) + a | 0, n += (a ^ (t | ~i)) + s[12] + 1700485571 | 0, n = (n << 6 | n >>> 26) + t | 0, i += (t ^ (n | ~a)) + s[3] - 1894986606 | 0, i = (i << 10 | i >>> 22) + n | 0, a += (n ^ (i | ~t)) + s[10] - 1051523 | 0, a = (a << 15 | a >>> 17) + i | 0, t += (i ^ (a | ~n)) + s[1] - 2054922799 | 0, t = (t << 21 | t >>> 11) + a | 0, n += (a ^ (t | ~i)) + s[8] + 1873313359 | 0, n = (n << 6 | n >>> 26) + t | 0, i += (t ^ (n | ~a)) + s[15] - 30611744 | 0, i = (i << 10 | i >>> 22) + n | 0, a += (n ^ (i | ~t)) + s[6] - 1560198380 | 0, a = (a << 15 | a >>> 17) + i | 0, t += (i ^ (a | ~n)) + s[13] + 1309151649 | 0, t = (t << 21 | t >>> 11) + a | 0, n += (a ^ (t | ~i)) + s[4] - 145523070 | 0, n = (n << 6 | n >>> 26) + t | 0, i += (t ^ (n | ~a)) + s[11] - 1120210379 | 0, i = (i << 10 | i >>> 22) + n | 0, a += (n ^ (i | ~t)) + s[2] + 718787259 | 0, a = (a << 15 | a >>> 17) + i | 0, t += (i ^ (a | ~n)) + s[9] - 343485551 | 0, t = (t << 21 | t >>> 11) + a | 0, u[0] = n + u[0] | 0, u[1] = t + u[1] | 0, u[2] = a + u[2] | 0, u[3] = i + u[3] | 0;
    }
    function m(u) {
      var s = [], n;
      for (n = 0; n < 64; n += 4)
        s[n >> 2] = u.charCodeAt(n) + (u.charCodeAt(n + 1) << 8) + (u.charCodeAt(n + 2) << 16) + (u.charCodeAt(n + 3) << 24);
      return s;
    }
    function d(u) {
      var s = [], n;
      for (n = 0; n < 64; n += 4)
        s[n >> 2] = u[n] + (u[n + 1] << 8) + (u[n + 2] << 16) + (u[n + 3] << 24);
      return s;
    }
    function w(u) {
      var s = u.length, n = [1732584193, -271733879, -1732584194, 271733878], t, a, i, A, j, E;
      for (t = 64; t <= s; t += 64)
        f(n, m(u.substring(t - 64, t)));
      for (u = u.substring(t - 64), a = u.length, i = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], t = 0; t < a; t += 1)
        i[t >> 2] |= u.charCodeAt(t) << (t % 4 << 3);
      if (i[t >> 2] |= 128 << (t % 4 << 3), t > 55)
        for (f(n, i), t = 0; t < 16; t += 1)
          i[t] = 0;
      return A = s * 8, A = A.toString(16).match(/(.*?)(.{0,8})$/), j = parseInt(A[2], 16), E = parseInt(A[1], 16) || 0, i[14] = j, i[15] = E, f(n, i), n;
    }
    function g(u) {
      var s = u.length, n = [1732584193, -271733879, -1732584194, 271733878], t, a, i, A, j, E;
      for (t = 64; t <= s; t += 64)
        f(n, d(u.subarray(t - 64, t)));
      for (u = t - 64 < s ? u.subarray(t - 64) : new Uint8Array(0), a = u.length, i = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], t = 0; t < a; t += 1)
        i[t >> 2] |= u[t] << (t % 4 << 3);
      if (i[t >> 2] |= 128 << (t % 4 << 3), t > 55)
        for (f(n, i), t = 0; t < 16; t += 1)
          i[t] = 0;
      return A = s * 8, A = A.toString(16).match(/(.*?)(.{0,8})$/), j = parseInt(A[2], 16), E = parseInt(A[1], 16) || 0, i[14] = j, i[15] = E, f(n, i), n;
    }
    function p(u) {
      var s = "", n;
      for (n = 0; n < 4; n += 1)
        s += c[u >> n * 8 + 4 & 15] + c[u >> n * 8 & 15];
      return s;
    }
    function l(u) {
      var s;
      for (s = 0; s < u.length; s += 1)
        u[s] = p(u[s]);
      return u.join("");
    }
    l(w("hello")), typeof ArrayBuffer < "u" && !ArrayBuffer.prototype.slice && function() {
      function u(s, n) {
        return s = s | 0 || 0, s < 0 ? Math.max(s + n, 0) : Math.min(s, n);
      }
      ArrayBuffer.prototype.slice = function(s, n) {
        var t = this.byteLength, a = u(s, t), i = t, A, j, E, R;
        return n !== r && (i = u(n, t)), a > i ? new ArrayBuffer(0) : (A = i - a, j = new ArrayBuffer(A), E = new Uint8Array(j), R = new Uint8Array(this, a, A), E.set(R), j);
      };
    }();
    function y(u) {
      return /[\u0080-\uFFFF]/.test(u) && (u = unescape(encodeURIComponent(u))), u;
    }
    function b(u, s) {
      var n = u.length, t = new ArrayBuffer(n), a = new Uint8Array(t), i;
      for (i = 0; i < n; i += 1)
        a[i] = u.charCodeAt(i);
      return s ? a : t;
    }
    function v(u) {
      return String.fromCharCode.apply(null, new Uint8Array(u));
    }
    function T(u, s, n) {
      var t = new Uint8Array(u.byteLength + s.byteLength);
      return t.set(new Uint8Array(u)), t.set(new Uint8Array(s), u.byteLength), n ? t : t.buffer;
    }
    function C(u) {
      var s = [], n = u.length, t;
      for (t = 0; t < n - 1; t += 2)
        s.push(parseInt(u.substr(t, 2), 16));
      return String.fromCharCode.apply(String, s);
    }
    function h() {
      this.reset();
    }
    return h.prototype.append = function(u) {
      return this.appendBinary(y(u)), this;
    }, h.prototype.appendBinary = function(u) {
      this._buff += u, this._length += u.length;
      var s = this._buff.length, n;
      for (n = 64; n <= s; n += 64)
        f(this._hash, m(this._buff.substring(n - 64, n)));
      return this._buff = this._buff.substring(n - 64), this;
    }, h.prototype.end = function(u) {
      var s = this._buff, n = s.length, t, a = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], i;
      for (t = 0; t < n; t += 1)
        a[t >> 2] |= s.charCodeAt(t) << (t % 4 << 3);
      return this._finish(a, n), i = l(this._hash), u && (i = C(i)), this.reset(), i;
    }, h.prototype.reset = function() {
      return this._buff = "", this._length = 0, this._hash = [1732584193, -271733879, -1732584194, 271733878], this;
    }, h.prototype.getState = function() {
      return {
        buff: this._buff,
        length: this._length,
        hash: this._hash.slice()
      };
    }, h.prototype.setState = function(u) {
      return this._buff = u.buff, this._length = u.length, this._hash = u.hash, this;
    }, h.prototype.destroy = function() {
      delete this._hash, delete this._buff, delete this._length;
    }, h.prototype._finish = function(u, s) {
      var n = s, t, a, i;
      if (u[n >> 2] |= 128 << (n % 4 << 3), n > 55)
        for (f(this._hash, u), n = 0; n < 16; n += 1)
          u[n] = 0;
      t = this._length * 8, t = t.toString(16).match(/(.*?)(.{0,8})$/), a = parseInt(t[2], 16), i = parseInt(t[1], 16) || 0, u[14] = a, u[15] = i, f(this._hash, u);
    }, h.hash = function(u, s) {
      return h.hashBinary(y(u), s);
    }, h.hashBinary = function(u, s) {
      var n = w(u), t = l(n);
      return s ? C(t) : t;
    }, h.ArrayBuffer = function() {
      this.reset();
    }, h.ArrayBuffer.prototype.append = function(u) {
      var s = T(this._buff.buffer, u, !0), n = s.length, t;
      for (this._length += u.byteLength, t = 64; t <= n; t += 64)
        f(this._hash, d(s.subarray(t - 64, t)));
      return this._buff = t - 64 < n ? new Uint8Array(s.buffer.slice(t - 64)) : new Uint8Array(0), this;
    }, h.ArrayBuffer.prototype.end = function(u) {
      var s = this._buff, n = s.length, t = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], a, i;
      for (a = 0; a < n; a += 1)
        t[a >> 2] |= s[a] << (a % 4 << 3);
      return this._finish(t, n), i = l(this._hash), u && (i = C(i)), this.reset(), i;
    }, h.ArrayBuffer.prototype.reset = function() {
      return this._buff = new Uint8Array(0), this._length = 0, this._hash = [1732584193, -271733879, -1732584194, 271733878], this;
    }, h.ArrayBuffer.prototype.getState = function() {
      var u = h.prototype.getState.call(this);
      return u.buff = v(u.buff), u;
    }, h.ArrayBuffer.prototype.setState = function(u) {
      return u.buff = b(u.buff, !0), h.prototype.setState.call(this, u);
    }, h.ArrayBuffer.prototype.destroy = h.prototype.destroy, h.ArrayBuffer.prototype._finish = h.prototype._finish, h.ArrayBuffer.hash = function(u, s) {
      var n = g(new Uint8Array(u)), t = l(n);
      return s ? C(t) : t;
    }, h;
  });
})(Me);
var en = Me.exports;
const tn = /* @__PURE__ */ Re(en), q = (e) => typeof e == "function" ? e() : e;
function B(e) {
  return !(e && (typeof e != "object" || (Array.isArray(e) ? e.length : Object.keys(e).length)));
}
function rn(e) {
  for (var o = [], r = 0; r < e.length; ) {
    var c = e[r];
    if (c === "*" || c === "+" || c === "?") {
      o.push({ type: "MODIFIER", index: r, value: e[r++] });
      continue;
    }
    if (c === "\\") {
      o.push({ type: "ESCAPED_CHAR", index: r++, value: e[r++] });
      continue;
    }
    if (c === "{") {
      o.push({ type: "OPEN", index: r, value: e[r++] });
      continue;
    }
    if (c === "}") {
      o.push({ type: "CLOSE", index: r, value: e[r++] });
      continue;
    }
    if (c === ":") {
      for (var f = "", m = r + 1; m < e.length; ) {
        var d = e.charCodeAt(m);
        if (
          // `0-9`
          d >= 48 && d <= 57 || // `A-Z`
          d >= 65 && d <= 90 || // `a-z`
          d >= 97 && d <= 122 || // `_`
          d === 95
        ) {
          f += e[m++];
          continue;
        }
        break;
      }
      if (!f)
        throw new TypeError("Missing parameter name at ".concat(r));
      o.push({ type: "NAME", index: r, value: f }), r = m;
      continue;
    }
    if (c === "(") {
      var w = 1, g = "", m = r + 1;
      if (e[m] === "?")
        throw new TypeError('Pattern cannot start with "?" at '.concat(m));
      for (; m < e.length; ) {
        if (e[m] === "\\") {
          g += e[m++] + e[m++];
          continue;
        }
        if (e[m] === ")") {
          if (w--, w === 0) {
            m++;
            break;
          }
        } else if (e[m] === "(" && (w++, e[m + 1] !== "?"))
          throw new TypeError("Capturing groups are not allowed at ".concat(m));
        g += e[m++];
      }
      if (w)
        throw new TypeError("Unbalanced pattern at ".concat(r));
      if (!g)
        throw new TypeError("Missing pattern at ".concat(r));
      o.push({ type: "PATTERN", index: r, value: g }), r = m;
      continue;
    }
    o.push({ type: "CHAR", index: r, value: e[r++] });
  }
  return o.push({ type: "END", index: r, value: "" }), o;
}
function nn(e, o) {
  o === void 0 && (o = {});
  for (var r = rn(e), c = o.prefixes, f = c === void 0 ? "./" : c, m = "[^".concat(M(o.delimiter || "/#?"), "]+?"), d = [], w = 0, g = 0, p = "", l = function(i) {
    if (g < r.length && r[g].type === i)
      return r[g++].value;
  }, y = function(i) {
    var A = l(i);
    if (A !== void 0)
      return A;
    var j = r[g], E = j.type, R = j.index;
    throw new TypeError("Unexpected ".concat(E, " at ").concat(R, ", expected ").concat(i));
  }, b = function() {
    for (var i = "", A; A = l("CHAR") || l("ESCAPED_CHAR"); )
      i += A;
    return i;
  }; g < r.length; ) {
    var v = l("CHAR"), T = l("NAME"), C = l("PATTERN");
    if (T || C) {
      var h = v || "";
      f.indexOf(h) === -1 && (p += h, h = ""), p && (d.push(p), p = ""), d.push({
        name: T || w++,
        prefix: h,
        suffix: "",
        pattern: C || m,
        modifier: l("MODIFIER") || ""
      });
      continue;
    }
    var u = v || l("ESCAPED_CHAR");
    if (u) {
      p += u;
      continue;
    }
    p && (d.push(p), p = "");
    var s = l("OPEN");
    if (s) {
      var h = b(), n = l("NAME") || "", t = l("PATTERN") || "", a = b();
      y("CLOSE"), d.push({
        name: n || (t ? w++ : ""),
        pattern: n && !t ? m : t,
        prefix: h,
        suffix: a,
        modifier: l("MODIFIER") || ""
      });
      continue;
    }
    y("END");
  }
  return d;
}
function M(e) {
  return e.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
function Be(e) {
  return e && e.sensitive ? "" : "i";
}
function on(e, o) {
  if (!o)
    return e;
  for (var r = /\((?:\?<(.*?)>)?(?!\?)/g, c = 0, f = r.exec(e.source); f; )
    o.push({
      // Use parenthesized substring match if available, index otherwise
      name: f[1] || c++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    }), f = r.exec(e.source);
  return e;
}
function an(e, o, r) {
  var c = e.map(function(f) {
    return Le(f, o, r).source;
  });
  return new RegExp("(?:".concat(c.join("|"), ")"), Be(r));
}
function sn(e, o, r) {
  return cn(nn(e, r), o, r);
}
function cn(e, o, r) {
  r === void 0 && (r = {});
  for (var c = r.strict, f = c === void 0 ? !1 : c, m = r.start, d = m === void 0 ? !0 : m, w = r.end, g = w === void 0 ? !0 : w, p = r.encode, l = p === void 0 ? function(R) {
    return R;
  } : p, y = r.delimiter, b = y === void 0 ? "/#?" : y, v = r.endsWith, T = v === void 0 ? "" : v, C = "[".concat(M(T), "]|$"), h = "[".concat(M(b), "]"), u = d ? "^" : "", s = 0, n = e; s < n.length; s++) {
    var t = n[s];
    if (typeof t == "string")
      u += M(l(t));
    else {
      var a = M(l(t.prefix)), i = M(l(t.suffix));
      if (t.pattern)
        if (o && o.push(t), a || i)
          if (t.modifier === "+" || t.modifier === "*") {
            var A = t.modifier === "*" ? "?" : "";
            u += "(?:".concat(a, "((?:").concat(t.pattern, ")(?:").concat(i).concat(a, "(?:").concat(t.pattern, "))*)").concat(i, ")").concat(A);
          } else
            u += "(?:".concat(a, "(").concat(t.pattern, ")").concat(i, ")").concat(t.modifier);
        else
          t.modifier === "+" || t.modifier === "*" ? u += "((?:".concat(t.pattern, ")").concat(t.modifier, ")") : u += "(".concat(t.pattern, ")").concat(t.modifier);
      else
        u += "(?:".concat(a).concat(i, ")").concat(t.modifier);
    }
  }
  if (g)
    f || (u += "".concat(h, "?")), u += r.endsWith ? "(?=".concat(C, ")") : "$";
  else {
    var j = e[e.length - 1], E = typeof j == "string" ? h.indexOf(j[j.length - 1]) > -1 : j === void 0;
    f || (u += "(?:".concat(h, "(?=").concat(C, "))?")), E || (u += "(?=".concat(h, "|").concat(C, ")"));
  }
  return new RegExp(u, Be(r));
}
function Le(e, o, r) {
  return e instanceof RegExp ? on(e, o) : Array.isArray(e) ? an(e, o, r) : sn(e, o, r);
}
const De = "_$mockHttp", We = typeof window < "u", Ne = We ? window.top || window : {}, Fe = () => Ne[De] || {
  isMock: !1,
  mockData: []
}, ne = (e) => {
  const o = Fe();
  Ne[De] = Object.assign(o, e);
}, un = (e) => {
  ne({ mockData: e });
}, fn = () => {
  ne({ isMock: !0 });
}, pn = () => {
  ne({ isMock: !0 });
};
if (We) {
  const e = window.fetch;
  window.fetch = async function(...o) {
    var c;
    const r = Fe();
    if (r.isMock && o[0] !== null) {
      let f, m = "";
      typeof o[0] == "object" ? (f = o[0], m = f.url) : (f = o[1], m = o[0]);
      const d = new URL(m, "http://localhost"), w = (c = r.mockData) == null ? void 0 : c.find((g) => {
        if (!g || !g.url || g.method && g.method.toUpperCase() !== (f == null ? void 0 : f.method))
          return !1;
        const p = new URL(g.url, "http://localhost"), l = new URLSearchParams(p.search), y = new URLSearchParams(d.search);
        for (const [b, v] of l)
          if (y.get(b) !== v)
            return !1;
        return Le(p.pathname).test(d.pathname);
      });
      if (w) {
        const { response: g, timeout: p, statusCode: l } = w;
        p && await new Promise((b) => setTimeout(b, p));
        const y = typeof g == "function" ? g(f) : g;
        return console.debug("mock success: " + m), console.debug(y), y instanceof Response ? Promise.resolve(y) : Promise.resolve(
          new Response(JSON.stringify(y), {
            status: l || 200,
            headers: { "Content-Type": "application/json" }
          })
        );
      }
    }
    return e.apply(this, o);
  };
}
var qe = /* @__PURE__ */ ((e) => (e.Json = "application/json;charset=UTF-8", e.FormURLEncoded = "application/x-www-form-urlencoded;charset=UTF-8", e.FormData = "multipart/form-data;charset=UTF-8", e))(qe || {});
class ln {
  constructor() {
    _(this, "key", "");
    _(this, "fetchPromise");
    /**
     * 服务基础路径
     */
    _(this, "baseURL", "");
    /**
     * 请求路径
     */
    _(this, "path", "");
    /**
     * 请求全路径
     */
    _(this, "url", "");
    _(this, "originUrl", "");
    /**
     * 请求结果
     */
    _(this, "result", null);
    /**
     * 请求参数
     */
    _(this, "requestOptions", {});
    /**
     * 请求信息
     */
    _(this, "request");
    /**
     * 请求体
     */
    _(this, "requestBody");
    /**
     * 请求返回信息
     */
    _(this, "response");
  }
}
class ee {
  constructor(o) {
    /**
     * 服务基础路径
     */
    _(this, "baseURL");
    /**
     * 指定请求超时的毫秒数（默认永不超时，Chrome中网络请求超时为300秒，Firefox中为90秒）
     */
    _(this, "timeout");
    /**
     * 服务中间件
     */
    _(this, "middlewares");
    this.baseURL = o || "", this.middlewares = [];
  }
  normalizeUrl(o) {
    return o.toString().replace(/(^\/+|\/+$)/g, "");
  }
  normalizeUrlParams(o, r) {
    if (B(r))
      return "";
    const c = ~o.indexOf("?") ? "&" : "?";
    return typeof r == "object" ? c + Object.entries(r).map(
      (f) => encodeURIComponent(f[0]) + "=" + encodeURIComponent(f[1] === void 0 || f[1] === null ? "" : f[1])
    ).join("&") : r !== "" ? c + q(r) : "";
  }
}
class hn {
  constructor(o) {
    _(this, "middlewares");
    _(this, "options");
    _(this, "pendingMap");
    _(this, "capture");
    _(this, "onceCapture");
    _(this, "history");
    _(this, "setMockData", un);
    _(this, "openMock", fn);
    _(this, "closeMock", pn);
    this.middlewares = [], this.pendingMap = /* @__PURE__ */ new Map(), this.history = [], o instanceof ee ? this.options = o : this.options = new ee(o);
  }
  /**
   * 新增中间件
   * @param middleware 中间件
   */
  use(o) {
    return this.middlewares.push(o), this;
  }
  getUrl(o, r, c = "") {
    let f = o ? new URL(r, new URL(o, window.location.href).toString()).toString() : r;
    return c && (f += this.options.normalizeUrlParams(f, c)), f;
  }
  createContext(o, r = {}) {
    const c = this.options, f = q(c.baseURL);
    let m = q(o);
    m = c.normalizeUrl(encodeURI(m));
    let d = new ln();
    d.baseURL = f, d.path = m, d.originUrl = this.getUrl(f, m), r.params ? d.url = d.originUrl + this.options.normalizeUrlParams(d.originUrl, r.params) : d.url = d.originUrl, d.requestOptions = {
      headers: {},
      timeout: c.timeout,
      ...r
    };
    const w = !B(r == null ? void 0 : r.body);
    let g = !1;
    const p = new tn();
    p.append(r.method || ""), p.append(d.url), w && (g = $(r.body), d.requestBody = r.body, r.body instanceof URLSearchParams ? p.append(r.body.toString()) : r.body instanceof FormData ? p.append(
      Array.from(r.body).map(([y, b]) => y.toString() + "=" + b.toString()).join("&")
    ) : g && p.append(JSON.stringify(r.body))), d.key = p.end();
    const l = this.pendingMap.get(d.key);
    if (l)
      console.info(
        "[WebCore Http]: The same request is being executed, and this request has been cancelled. url: " + d.url
      ), d = l;
    else if (this.pendingMap.set(d.key, d), w && g) {
      let y = !1;
      const b = new FormData();
      for (const v in r.body)
        if (Object.prototype.hasOwnProperty.call(r.body, v)) {
          const T = r.body[v];
          T instanceof Blob && (y = !0), b.append(v, T);
        }
      y && (d.requestBody = b, d.requestOptions.body = b);
    }
    return d;
  }
  createRequest(o, r = {}, c = []) {
    const f = this.createContext(o, r), m = this.options;
    let d = [];
    typeof m.middlewares == "function" && (d = d.concat(q(m.middlewares))), d = d.concat(this.middlewares), c && (typeof c == "function" ? (d.push(c), f.fetchPromise = void 0) : c instanceof Array && c.length > 0 && (d = d.concat(c), f.fetchPromise = void 0));
    const w = (g) => {
      const p = d[g];
      if (!p) {
        if (f.requestOptions.timeout && !f.requestOptions.signal) {
          const l = new AbortController();
          f.requestOptions.signal = l.signal, setTimeout(() => l.abort(), f.requestOptions.timeout);
        }
        return f.request = new Request(f.url, f.requestOptions), fetch(f.request).then((l) => (f.response = l, l)).finally(() => {
          this.pendingMap.has(f.key) && window.setTimeout(() => {
            this.pendingMap.delete(f.key);
          }, 600);
        });
      }
      try {
        return Promise.resolve(p(f, w.bind(null, g + 1)));
      } catch (l) {
        return Promise.reject(l);
      }
    };
    return f.fetchPromise || (f.fetchPromise = w(0).then((g) => {
      if (this.onceCapture || this.capture) {
        const p = !B(f.requestOptions.body), l = !B(f.requestOptions.params), y = {
          api: f.originUrl,
          method: f.requestOptions.method,
          headers: f.requestOptions.headers,
          data: p ? f.requestOptions.body : l ? JSON.stringify(f.requestOptions.params) : null,
          hasParams: l
        };
        this.history.push(y), this.onceCapture && (this.onceCapture(y), this.onceCapture = void 0);
      }
      return g;
    })), f.fetchPromise.then((g) => d.length > 0 ? f.result : g);
  }
  request(o, r = {}, c = []) {
    if (r.throttle !== void 0 && r.debounce !== void 0)
      throw new Error("throttle and debounce cannot be set at the same time");
    return r.throttle ? new Promise((f) => {
      Qr(() => f(this.createRequest(o, r, c)), r.throttle);
    }) : r.debounce ? new Promise((f) => {
      Ie(() => f(this.createRequest(o, r, c)), r.debounce);
    }) : this.createRequest(o, r, c);
  }
  get(o, r, c = {}, f = []) {
    return c.method = "GET", c.params = r, this.request(o, c, f);
  }
  post(o, r, c = {}, f = []) {
    return c.method = "POST", c.body = r, this.request(o, c, f);
  }
  patch(o, r = {}, c = []) {
    return r.method = "PATCH", this.request(o, r, c);
  }
  put(o, r = {}, c = []) {
    return r.method = "PUT", this.request(o, r, c);
  }
  delete(o, r = {}, c = []) {
    return r.method = "DELETE", this.request(o, r, c);
  }
  upload(o, r, c = {}, f = []) {
    return c.method = "POST", c.body = r, this.request(o, c, f);
  }
  openCapture() {
    this.capture = !0, this.history = [];
  }
  openOnceCapture(o) {
    this.capture = !0, this.onceCapture = o, this.history = [];
  }
  closeCapture() {
    this.capture = !1;
  }
}
class dn {
  constructor() {
    _(this, "items");
    this.items = {};
  }
  /**
   * 查找字典中的元素
   * @param key 关键字
   */
  has(o) {
    return this.items.hasOwnProperty(o);
  }
  /**
   * 向字典添加一个元素
   * @param key 关键字
   * @param val 值
   */
  add(o, r) {
    this.items[o] = r;
  }
  /**
   * 通过关键字删除字典项，返回是否删除成功
   * @param key 关键字
   */
  remove(o) {
    return this.has(o) ? (delete this.items[o], !0) : !1;
  }
  /**
   * 清空字典
   */
  clear() {
    this.items = {};
  }
  /**
   * 查找字典中的元素，没有则是undefined
   * @param key 关键字
   */
  get(o) {
    return this.has(o) ? this.items[o] : void 0;
  }
  /**
   * 返回一个包含所有value数组
   */
  values() {
    const o = [];
    for (const r in this.items)
      this.has(r) && o.push(this.items[r]);
    return o;
  }
  /**
   * 循环字典子元素
   * @param func 入参为key和value
   */
  map(o) {
    for (const r in this.items)
      if (this.has(r)) {
        const c = this.items[r];
        o(r, c);
      }
  }
  /**
   * 查看字典中元素的个数
   */
  count() {
    let o = 0;
    for (const r in this.items)
      this.has(r) && o++;
    return o;
  }
}
var He = { exports: {} };
(function(e) {
  var o = Object.prototype.hasOwnProperty, r = "~";
  function c() {
  }
  Object.create && (c.prototype = /* @__PURE__ */ Object.create(null), new c().__proto__ || (r = !1));
  function f(g, p, l) {
    this.fn = g, this.context = p, this.once = l || !1;
  }
  function m(g, p, l, y, b) {
    if (typeof l != "function")
      throw new TypeError("The listener must be a function");
    var v = new f(l, y || g, b), T = r ? r + p : p;
    return g._events[T] ? g._events[T].fn ? g._events[T] = [g._events[T], v] : g._events[T].push(v) : (g._events[T] = v, g._eventsCount++), g;
  }
  function d(g, p) {
    --g._eventsCount === 0 ? g._events = new c() : delete g._events[p];
  }
  function w() {
    this._events = new c(), this._eventsCount = 0;
  }
  w.prototype.eventNames = function() {
    var p = [], l, y;
    if (this._eventsCount === 0)
      return p;
    for (y in l = this._events)
      o.call(l, y) && p.push(r ? y.slice(1) : y);
    return Object.getOwnPropertySymbols ? p.concat(Object.getOwnPropertySymbols(l)) : p;
  }, w.prototype.listeners = function(p) {
    var l = r ? r + p : p, y = this._events[l];
    if (!y)
      return [];
    if (y.fn)
      return [y.fn];
    for (var b = 0, v = y.length, T = new Array(v); b < v; b++)
      T[b] = y[b].fn;
    return T;
  }, w.prototype.listenerCount = function(p) {
    var l = r ? r + p : p, y = this._events[l];
    return y ? y.fn ? 1 : y.length : 0;
  }, w.prototype.emit = function(p, l, y, b, v, T) {
    var C = r ? r + p : p;
    if (!this._events[C])
      return !1;
    var h = this._events[C], u = arguments.length, s, n;
    if (h.fn) {
      switch (h.once && this.removeListener(p, h.fn, void 0, !0), u) {
        case 1:
          return h.fn.call(h.context), !0;
        case 2:
          return h.fn.call(h.context, l), !0;
        case 3:
          return h.fn.call(h.context, l, y), !0;
        case 4:
          return h.fn.call(h.context, l, y, b), !0;
        case 5:
          return h.fn.call(h.context, l, y, b, v), !0;
        case 6:
          return h.fn.call(h.context, l, y, b, v, T), !0;
      }
      for (n = 1, s = new Array(u - 1); n < u; n++)
        s[n - 1] = arguments[n];
      h.fn.apply(h.context, s);
    } else {
      var t = h.length, a;
      for (n = 0; n < t; n++)
        switch (h[n].once && this.removeListener(p, h[n].fn, void 0, !0), u) {
          case 1:
            h[n].fn.call(h[n].context);
            break;
          case 2:
            h[n].fn.call(h[n].context, l);
            break;
          case 3:
            h[n].fn.call(h[n].context, l, y);
            break;
          case 4:
            h[n].fn.call(h[n].context, l, y, b);
            break;
          default:
            if (!s)
              for (a = 1, s = new Array(u - 1); a < u; a++)
                s[a - 1] = arguments[a];
            h[n].fn.apply(h[n].context, s);
        }
    }
    return !0;
  }, w.prototype.on = function(p, l, y) {
    return m(this, p, l, y, !1);
  }, w.prototype.once = function(p, l, y) {
    return m(this, p, l, y, !0);
  }, w.prototype.removeListener = function(p, l, y, b) {
    var v = r ? r + p : p;
    if (!this._events[v])
      return this;
    if (!l)
      return d(this, v), this;
    var T = this._events[v];
    if (T.fn)
      T.fn === l && (!b || T.once) && (!y || T.context === y) && d(this, v);
    else {
      for (var C = 0, h = [], u = T.length; C < u; C++)
        (T[C].fn !== l || b && !T[C].once || y && T[C].context !== y) && h.push(T[C]);
      h.length ? this._events[v] = h.length === 1 ? h[0] : h : d(this, v);
    }
    return this;
  }, w.prototype.removeAllListeners = function(p) {
    var l;
    return p ? (l = r ? r + p : p, this._events[l] && d(this, l)) : (this._events = new c(), this._eventsCount = 0), this;
  }, w.prototype.off = w.prototype.removeListener, w.prototype.addListener = w.prototype.on, w.prefixed = r, w.EventEmitter = w, e.exports = w;
})(He);
var gn = He.exports;
const yn = /* @__PURE__ */ Re(gn);
class mn extends yn {
}
const te = "_ipc";
class wn {
  constructor(o = null) {
    /**
     * 事件触发器
     */
    _(this, "emitter");
    /**
     * iframe窗口对象
     */
    _(this, "contentWindow", null);
    /**
     * 是否跨域
     */
    _(this, "isCrossOrigin", !1);
    if (this.emitter = new mn(), o) {
      try {
        o.document;
      } catch {
        this.isCrossOrigin = !0;
      }
      this.contentWindow = o;
    }
  }
  /**
   * 执行监听器
   * @param event 事件名
   * @param args 参数
   */
  send(o, r) {
    if (this.isCrossOrigin && this.contentWindow)
      this.contentWindow.postMessage(
        {
          event: o,
          args: r
        },
        "*"
      );
    else {
      if (this.contentWindow) {
        const c = this.contentWindow[te];
        if (c) {
          c.send(o, r);
          return;
        }
      }
      this.emitter.emit(o, r);
    }
  }
}
class oe {
  constructor() {
    /**
     * 目标监听器清单
     */
    _(this, "targets");
    _(this, "sendingEvents", /* @__PURE__ */ new Set());
    this.targets = new dn();
  }
  static init() {
    const o = new oe();
    if (typeof window < "u") {
      const r = window[te];
      if (r)
        return r;
      window[te] = o;
    }
    return o;
  }
  /**
   * 添加目标监听器
   * @param key 目标名称
   */
  addTarget(o, r = null) {
    const c = this.targets.items[o];
    if (c) {
      c.contentWindow = r;
      return;
    }
    this.targets.add(o, new wn(r));
  }
  /**
   * 删除目标监听器
   * @param key 目标名称
   */
  removeTarget(o) {
    this.targets.remove(o);
  }
  remove(o, r, c) {
    var f;
    return typeof r == "function" && (c = r, r = "*"), r && c ? (f = this.targets.get(r)) == null || f.emitter.removeListener(o, c) : this.targets.map((m, d) => {
      d.emitter.removeAllListeners(o);
    }), this;
  }
  on(o, r, c) {
    var f;
    return typeof r == "function" && (c = r, r = "*"), c && (this.addTarget(r), (f = this.targets.get(r)) == null || f.emitter.on(o, c)), this;
  }
  once(o, r, c) {
    var f;
    return typeof r == "function" && (c = r, r = "*"), c && (this.addTarget(r), (f = this.targets.get(r)) == null || f.emitter.once(o, c)), this;
  }
  /**
   * 执行所有监听器
   * @param event 事件名
   * @param args 参数
   */
  send(o, r) {
    this.sendingEvents.has(o) || (this.sendingEvents.add(o), this.targets.map((c, f) => {
      f.send(o, r);
    }), this.sendingEvents.delete(o));
  }
}
const bn = (e) => {
  const o = {
    quality: 70,
    // 默认图片质量为70
    type: "all"
    // 默认type为'all'
  };
  return new Promise((r, c) => {
    window._app.camera({ ...o, ...e }, (f) => {
      f ? r(f) : c("Failed to get image");
    });
  });
}, vn = () => new Promise((e, o) => {
  window._app.scan((r) => {
    r ? e(r) : o("Failed to scan");
  });
}), _n = () => new Promise((e) => {
  window._app.location((o, r) => {
    e({ latitude: o, longitude: r });
  });
}), Tn = () => {
  window._app.locationCancel();
}, An = (e, o = "url") => {
  window._app.pdfPreview(o, e);
}, Sn = (e, o) => {
  window._app.setStorage(e, o);
}, Cn = (e) => window._app.getStorage(e), jn = () => {
  window._app.back();
}, En = () => {
  window._app.close();
}, Pn = (e, o, r = "url") => {
  window._app.download(r, o, e);
}, On = (e, o = 200) => {
  window._app.vibratorCancel(e, o);
}, $n = () => {
  window._app.vibratorCancel();
}, xn = (e, o) => {
  window._app.playResult(e, o);
}, Un = (e) => {
  window._app.textToSpeech(e);
}, In = () => {
  window._app.playSystem();
}, Rn = {
  openCamera: bn,
  openScan: vn,
  openLocation: _n,
  closeLocation: Tn,
  openPdfPreview: An,
  setStorage: Sn,
  getStorage: Cn,
  pagePrevious: jn,
  pageClose: En,
  downloadFile: Pn,
  turnOnVibration: On,
  turnOffVibration: $n,
  playVoice: xn,
  playVoiceByText: Un,
  playSystemSound: In,
  getUserId() {
    return window._app.getUserId();
  },
  getUserName() {
    return window._app.getUserName();
  },
  getDisplayName() {
    return window._app.getDisplayName();
  },
  getOrgCode() {
    return window._app.getOrgCode();
  },
  getOrgName() {
    return window._app.getOrgName();
  },
  getWorkshopId() {
    return window._app.getWorkshopId();
  },
  getWorkshopCode() {
    return window._app.getWorkshopCode();
  },
  getWorkshopName() {
    return window._app.getWorkshopName();
  },
  getWorkCenterId() {
    return window._app.getWorkCenterId();
  },
  getWorkCenterCode() {
    return window._app.getWorkCenterCode();
  },
  getWorkCenterName() {
    return window._app.getWorkCenterName();
  },
  getWorkStationId() {
    return window._app.getWorkStationId();
  },
  getWorkStationCode() {
    return window._app.getWorkStationCode();
  },
  getWorkStationName() {
    return window._app.getWorkStationName();
  }
};
var Ve = /* @__PURE__ */ ((e) => (e.Mobile = "APP", e.Desktop = "WEB", e.NODE_JS = "NodeJs", e))(Ve || {});
const G = {
  ipc: null,
  config: {
    baseUrl: "",
    languageCodes: ["zh-CN", "en-US"]
  },
  platform: function() {
    return typeof window < "u" ? typeof window._app !== void 0 && typeof window._app < "u" ? "APP" : "WEB" : "NodeJs";
  }(),
  getLanguage() {
    let e = "zh-CN";
    switch (this.platform) {
      case "APP":
        e = window._app.getLanguage();
        break;
      default:
        e = localStorage.getItem("_language") || (this.config.languageCodes.includes(navigator.language) ? navigator.language : e);
        break;
    }
    return e;
  },
  setLanguage(e) {
    switch (this.platform) {
      case "APP":
        throw new Error("The operation is not supported");
      default:
        localStorage.setItem("_language", e);
    }
  },
  getToken() {
    switch (this.platform) {
      case "APP":
        return window._app.getAccessToken();
      default:
        return localStorage.getItem("_token");
    }
  },
  setToken(e) {
    switch (this.platform) {
      case "APP":
        throw new Error("The operation is not supported");
      default:
        localStorage.setItem("_token", e);
    }
  },
  getOrgId() {
    switch (this.platform) {
      case "APP":
        return window._app.getOrgId();
      default:
        return localStorage.getItem("_oid") || "0";
    }
  },
  setOrgId(e) {
    switch (this.platform) {
      case "APP":
        throw new Error("The operation is not supported");
      default:
        localStorage.setItem("_oid", e);
    }
  },
  getEnterpriseId() {
    switch (this.platform) {
      case "APP":
        return window._app.getEid();
      default:
        return localStorage.getItem("_eid") || "0";
    }
  },
  setEnterpriseId(e) {
    switch (this.platform) {
      case "APP":
        throw new Error("The operation is not supported");
      default:
        localStorage.setItem("_eid", e);
    }
  },
  utils: {
    isEmpty: B
  }
}, P = G.platform == "APP" ? {
  ...G,
  ...Rn
} : G;
class re extends Error {
  constructor(r, c, f, m = "") {
    var d;
    super();
    _(this, "code", -1);
    _(this, "status", "");
    _(this, "type", "");
    _(this, "description", "");
    this.message = r, this.name = "CustomError", this.code = c, this.status = f, this.type = "error", this.description = m, (d = P.ipc.targets.get("_self")) == null || d.send("custom_error", this);
  }
}
class Mn extends re {
  constructor(o, r, c, f = "") {
    super(o, r, c, f), this.name = "OperationError";
  }
}
const ke = typeof window < "u", Bn = ke ? null : require("node:path"), Ln = ke ? null : require("node:fs");
function Kn() {
  return {
    name: "auto-check-updates",
    enforce: "pre",
    apply: "build",
    async buildStart() {
      const e = {
        version: (/* @__PURE__ */ new Date()).toLocaleString("zh-CN", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: !1
        })
      }, o = Bn.resolve(process.cwd(), "public", "version.json");
      Ln.writeFileSync(o, JSON.stringify(e));
    }
  };
}
let V = "";
const Te = 2;
let F = 0;
const Dn = function() {
  F++, F >= Te && (console.error(`获取资源超过错误次数阈值[${Te}]，触发版本检查！`), F = -9999, Nn()), setTimeout(() => {
    F = 0;
  }, 1500);
}, Wn = () => {
  if (typeof window < "u") {
    if (window._version)
      return;
    fetch("/version.json?_t=" + (/* @__PURE__ */ new Date()).getTime()).then((o) => o.json()).then((o) => {
      V = o.version, window._version = V;
    }), window.addEventListener(
      "error",
      function(o) {
        const r = o.target;
        (r.tagName === "SCRIPT" || r.tagName === "LINK" || r.tagName === "IMG") && Dn();
      },
      !0
    );
  }
}, Nn = () => {
  typeof window < "u" && window._version && fetch("/version.json?_t=" + (/* @__PURE__ */ new Date()).getTime()).then((e) => e.json()).then((e) => {
    if (V && V !== e.version)
      throw new Mn(
        `[${e.version}] 有新的内容更新，请在保存页面数据后，刷新页面重新载入！`,
        404,
        404
      );
  });
}, Je = typeof window < "u", Ae = Je ? null : require("node:path"), Fn = Je ? null : require("swagger-typescript-api");
function Yn(e) {
  if (!e || !e.baseUrl || !e.inputs)
    return null;
  const o = e.inputs.split(",");
  return o.length === 0 ? (console.log("swagger-api-gen: No input modules found."), null) : {
    name: "swagger-api-gen",
    enforce: "pre",
    apply: "serve",
    async buildStart() {
      for await (const r of o) {
        const c = `/api/${r}`;
        await Fn.generateApi({
          name: r,
          url: `${e.baseUrl}${c}/v3/api-docs`,
          output: Ae.resolve(process.cwd(), (e == null ? void 0 : e.output) || "./src/api"),
          templates: Ae.resolve(process.cwd(), (e == null ? void 0 : e.templates) || "./plugins/swagger-templates"),
          singleHttpClient: !0,
          httpClientType: "fetch",
          // @ts-ignore
          apiClassName: `${r[0].toUpperCase() + r.slice(1)}Api`,
          apiPrefix: c,
          importModules: 'import { Http } from "@/types/web-core";',
          hooks: {
            onFormatRouteName: (f, m) => /\d/.test(m) && f.operationId.includes("_") ? f.operationId.split("_", 1)[0] : m
          }
        }).catch((f) => console.error(f));
      }
    }
  };
}
const qn = "YYYY-MM-DD HH:mm:ss";
function ze(e) {
  for (const o in e) {
    if (e[o] && e[o]._isAMomentObject && (e[o] = e[o].format(qn)), ve(o)) {
      const r = e[o];
      if (r)
        try {
          e[o] = ve(r) ? r.trim() : r;
        } catch (c) {
          throw new Error(c);
        }
    }
    $(e[o]) && ze(e[o]);
  }
}
const Hn = async (e, o) => {
  const r = e.requestOptions.body;
  r && Object.prototype.toString.call(r) === "[object Object]" && ze(r), await o();
}, Vn = async (e, o) => {
  var m, d, w, g;
  const r = e.requestOptions, c = r.body;
  if (!(c instanceof FormData) && !(c instanceof URLSearchParams)) {
    let p = !0;
    const l = r.headers, y = B(l) ? null : l == null ? void 0 : l["Content-Type"];
    y ? p = y.startsWith("application/json") : l["Content-Type"] = qe.Json, p && typeof c == "object" && (r.body = JSON.stringify(c));
  }
  if (await o(), e.result || (m = e.response) != null && m.bodyUsed)
    return;
  const f = ((d = e.response) == null ? void 0 : d.headers.get("Content-Type")) || "";
  (w = e.response) != null && w.ok && (f != null && f.startsWith("application/json")) && (e.result = await ((g = e.response) == null ? void 0 : g.json()));
}, kn = async (e, o) => {
  var m, d, w, g;
  const c = e.requestOptions.headers, f = P.getToken();
  if (f && _e(c.Authorization) && (c.Authorization = `Bearer ${f}`), f && _e(c.Authorization) && (c.Authorization = `Bearer ${f}`), c.eid = P.getEnterpriseId(), c.oid = P.getOrgId(), c["Accept-Language"] = P.getLanguage(), c["X-TZ-Offset"] = (/* @__PURE__ */ new Date()).getTimezoneOffset().toString(), await o(), !((m = e.response) != null && m.ok)) {
    const p = new Error("An error occurred while fetching the data.");
    throw p.message = `${(d = e.response) == null ? void 0 : d.status}|${await ((w = e.response) == null ? void 0 : w.text()) || ""}`, p;
  }
  if (((g = e.response) == null ? void 0 : g.status) !== 200)
    throw new re(JSON.stringify(e.result), 500, e.response.status);
  if (!e.requestOptions.returnNativeResponse && e.result) {
    const p = e.result;
    if (p.code === 0 || p.code === 200)
      e.result = p.data;
    else
      throw new re(p.message || "unknown", p.code, e.response.status, JSON.stringify(p));
  }
}, Jn = async (e, o) => {
  if (e.url.lastIndexOf("_t=") <= 0) {
    const r = (/* @__PURE__ */ new Date()).getTime();
    e.url += `${e.url.lastIndexOf("?") > 0 ? "&" : "?"}_t=${r}`;
  }
  await o();
}, ie = new ee();
ie.baseURL = () => {
  switch (P.platform) {
    case Ve.Mobile:
      return window._app.getUrl();
    default:
      return P.config.baseUrl || location.origin;
  }
};
ie.middlewares = () => [kn, Vn, Hn, Jn];
const zn = new hn(ie);
typeof window < "u" && (P.ipc = oe.init(), P.ipc.addTarget("_self", window), window.http = zn, window.fw = P, Wn());
export {
  re as CustomError,
  dn as Dictionary,
  oe as EventBus,
  hn as Http,
  Kn as autoCheckUpdates,
  Yn as swaggerApiGen
};
