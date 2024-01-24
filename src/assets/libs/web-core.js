var ze = Object.defineProperty;
var Ge = (e, o, r) => o in e ? ze(e, o, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[o] = r;
var _ = (e, o, r) => (Ge(e, typeof o != "symbol" ? o + "" : o, r), r);
var Ke = typeof global == "object" && global && global.Object === Object && global;
const Ae = Ke;
var Ye = typeof self == "object" && self && self.Object === Object && self, Xe = Ae || Ye || Function("return this")();
const O = Xe;
var Ze = O.Symbol;
const H = Ze;
var Se = Object.prototype, Qe = Se.hasOwnProperty, et = Se.toString, L = H ? H.toStringTag : void 0;
function tt(e) {
  var o = Qe.call(e, L), r = e[L];
  try {
    e[L] = void 0;
    var u = !0;
  } catch {
  }
  var f = et.call(e);
  return u && (o ? e[L] = r : delete e[L]), f;
}
var rt = Object.prototype, nt = rt.toString;
function ot(e) {
  return nt.call(e);
}
var it = "[object Null]", st = "[object Undefined]", se = H ? H.toStringTag : void 0;
function U(e) {
  return e == null ? e === void 0 ? st : it : se && se in Object(e) ? tt(e) : ot(e);
}
function N(e) {
  return e != null && typeof e == "object";
}
var at = "[object Symbol]";
function ct(e) {
  return typeof e == "symbol" || N(e) && U(e) == at;
}
var ut = Array.isArray;
const Ce = ut;
var ft = /\s/;
function pt(e) {
  for (var o = e.length; o-- && ft.test(e.charAt(o)); )
    ;
  return o;
}
var lt = /^\s+/;
function ht(e) {
  return e && e.slice(0, pt(e) + 1).replace(lt, "");
}
function $(e) {
  var o = typeof e;
  return e != null && (o == "object" || o == "function");
}
var ae = 0 / 0, dt = /^[-+]0x[0-9a-f]+$/i, gt = /^0b[01]+$/i, yt = /^0o[0-7]+$/i, wt = parseInt;
function ce(e) {
  if (typeof e == "number")
    return e;
  if (ct(e))
    return ae;
  if ($(e)) {
    var o = typeof e.valueOf == "function" ? e.valueOf() : e;
    e = $(o) ? o + "" : o;
  }
  if (typeof e != "string")
    return e === 0 ? e : +e;
  e = ht(e);
  var r = gt.test(e);
  return r || yt.test(e) ? wt(e.slice(2), r ? 2 : 8) : dt.test(e) ? ae : +e;
}
var mt = "[object AsyncFunction]", bt = "[object Function]", vt = "[object GeneratorFunction]", _t = "[object Proxy]";
function je(e) {
  if (!$(e))
    return !1;
  var o = U(e);
  return o == bt || o == vt || o == mt || o == _t;
}
var Tt = O["__core-js_shared__"];
const k = Tt;
var ue = function() {
  var e = /[^.]+$/.exec(k && k.keys && k.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function At(e) {
  return !!ue && ue in e;
}
var St = Function.prototype, Ct = St.toString;
function I(e) {
  if (e != null) {
    try {
      return Ct.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var jt = /[\\^$.*+?()[\]{}|]/g, Et = /^\[object .+?Constructor\]$/, Pt = Function.prototype, Ot = Object.prototype, $t = Pt.toString, xt = Ot.hasOwnProperty, Ut = RegExp(
  "^" + $t.call(xt).replace(jt, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function It(e) {
  if (!$(e) || At(e))
    return !1;
  var o = je(e) ? Ut : Et;
  return o.test(I(e));
}
function Rt(e, o) {
  return e == null ? void 0 : e[o];
}
function W(e, o) {
  var r = Rt(e, o);
  return It(r) ? r : void 0;
}
var Mt = W(O, "WeakMap");
const K = Mt;
var Bt = 9007199254740991;
function Ee(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= Bt;
}
function Lt(e) {
  return e != null && Ee(e.length) && !je(e);
}
var Dt = Object.prototype;
function Pe(e) {
  var o = e && e.constructor, r = typeof o == "function" && o.prototype || Dt;
  return e === r;
}
var Nt = "[object Arguments]";
function fe(e) {
  return N(e) && U(e) == Nt;
}
var Oe = Object.prototype, Wt = Oe.hasOwnProperty, Ft = Oe.propertyIsEnumerable, qt = fe(function() {
  return arguments;
}()) ? fe : function(e) {
  return N(e) && Wt.call(e, "callee") && !Ft.call(e, "callee");
};
const Ht = qt;
function Vt() {
  return !1;
}
var $e = typeof exports == "object" && exports && !exports.nodeType && exports, pe = $e && typeof module == "object" && module && !module.nodeType && module, kt = pe && pe.exports === $e, le = kt ? O.Buffer : void 0, Jt = le ? le.isBuffer : void 0, zt = Jt || Vt;
const Gt = zt;
var Kt = "[object Arguments]", Yt = "[object Array]", Xt = "[object Boolean]", Zt = "[object Date]", Qt = "[object Error]", er = "[object Function]", tr = "[object Map]", rr = "[object Number]", nr = "[object Object]", or = "[object RegExp]", ir = "[object Set]", sr = "[object String]", ar = "[object WeakMap]", cr = "[object ArrayBuffer]", ur = "[object DataView]", fr = "[object Float32Array]", pr = "[object Float64Array]", lr = "[object Int8Array]", hr = "[object Int16Array]", dr = "[object Int32Array]", gr = "[object Uint8Array]", yr = "[object Uint8ClampedArray]", wr = "[object Uint16Array]", mr = "[object Uint32Array]", S = {};
S[fr] = S[pr] = S[lr] = S[hr] = S[dr] = S[gr] = S[yr] = S[wr] = S[mr] = !0;
S[Kt] = S[Yt] = S[cr] = S[Xt] = S[ur] = S[Zt] = S[Qt] = S[er] = S[tr] = S[rr] = S[nr] = S[or] = S[ir] = S[sr] = S[ar] = !1;
function br(e) {
  return N(e) && Ee(e.length) && !!S[U(e)];
}
function vr(e) {
  return function(o) {
    return e(o);
  };
}
var xe = typeof exports == "object" && exports && !exports.nodeType && exports, D = xe && typeof module == "object" && module && !module.nodeType && module, _r = D && D.exports === xe, J = _r && Ae.process, Tr = function() {
  try {
    var e = D && D.require && D.require("util").types;
    return e || J && J.binding && J.binding("util");
  } catch {
  }
}();
const he = Tr;
var de = he && he.isTypedArray, Ar = de ? vr(de) : br;
const Sr = Ar;
function Cr(e, o) {
  return function(r) {
    return e(o(r));
  };
}
var jr = Cr(Object.keys, Object);
const Er = jr;
var Pr = Object.prototype, Or = Pr.hasOwnProperty;
function $r(e) {
  if (!Pe(e))
    return Er(e);
  var o = [];
  for (var r in Object(e))
    Or.call(e, r) && r != "constructor" && o.push(r);
  return o;
}
var xr = W(O, "Map");
const Y = xr;
var Ur = W(O, "DataView");
const X = Ur;
var Ir = W(O, "Promise");
const Z = Ir;
var Rr = W(O, "Set");
const Q = Rr;
var ge = "[object Map]", Mr = "[object Object]", ye = "[object Promise]", we = "[object Set]", me = "[object WeakMap]", be = "[object DataView]", Br = I(X), Lr = I(Y), Dr = I(Z), Nr = I(Q), Wr = I(K), x = U;
(X && x(new X(new ArrayBuffer(1))) != be || Y && x(new Y()) != ge || Z && x(Z.resolve()) != ye || Q && x(new Q()) != we || K && x(new K()) != me) && (x = function(e) {
  var o = U(e), r = o == Mr ? e.constructor : void 0, u = r ? I(r) : "";
  if (u)
    switch (u) {
      case Br:
        return be;
      case Lr:
        return ge;
      case Dr:
        return ye;
      case Nr:
        return we;
      case Wr:
        return me;
    }
  return o;
});
const Fr = x;
var qr = function() {
  return O.Date.now();
};
const z = qr;
var Hr = "Expected a function", Vr = Math.max, kr = Math.min;
function Ue(e, o, r) {
  var u, f, w, d, m, g, p = 0, l = !1, y = !1, b = !0;
  if (typeof e != "function")
    throw new TypeError(Hr);
  o = ce(o) || 0, $(r) && (l = !!r.leading, y = "maxWait" in r, w = y ? Vr(ce(r.maxWait) || 0, o) : w, b = "trailing" in r ? !!r.trailing : b);
  function v(i) {
    var A = u, j = f;
    return u = f = void 0, p = i, d = e.apply(j, A), d;
  }
  function T(i) {
    return p = i, m = setTimeout(c, o), l ? v(i) : d;
  }
  function C(i) {
    var A = i - g, j = i - p, E = o - A;
    return y ? kr(E, w - j) : E;
  }
  function h(i) {
    var A = i - g, j = i - p;
    return g === void 0 || A >= o || A < 0 || y && j >= w;
  }
  function c() {
    var i = z();
    if (h(i))
      return a(i);
    m = setTimeout(c, C(i));
  }
  function a(i) {
    return m = void 0, b && u ? v(i) : (u = f = void 0, d);
  }
  function n() {
    m !== void 0 && clearTimeout(m), p = 0, u = g = f = m = void 0;
  }
  function t() {
    return m === void 0 ? d : a(z());
  }
  function s() {
    var i = z(), A = h(i);
    if (u = arguments, f = this, g = i, A) {
      if (m === void 0)
        return T(g);
      if (y)
        return clearTimeout(m), m = setTimeout(c, o), v(g);
    }
    return m === void 0 && (m = setTimeout(c, o)), d;
  }
  return s.cancel = n, s.flush = t, s;
}
var Jr = "[object String]";
function ve(e) {
  return typeof e == "string" || !Ce(e) && N(e) && U(e) == Jr;
}
var zr = "[object Map]", Gr = "[object Set]", Kr = Object.prototype, Yr = Kr.hasOwnProperty;
function Xr(e) {
  if (e == null)
    return !0;
  if (Lt(e) && (Ce(e) || typeof e == "string" || typeof e.splice == "function" || Gt(e) || Sr(e) || Ht(e)))
    return !e.length;
  var o = Fr(e);
  if (o == zr || o == Gr)
    return !e.size;
  if (Pe(e))
    return !$r(e).length;
  for (var r in e)
    if (Yr.call(e, r))
      return !1;
  return !0;
}
var Zr = "Expected a function";
function Qr(e, o, r) {
  var u = !0, f = !0;
  if (typeof e != "function")
    throw new TypeError(Zr);
  return $(r) && (u = "leading" in r ? !!r.leading : u, f = "trailing" in r ? !!r.trailing : f), Ue(e, o, {
    leading: u,
    maxWait: o,
    trailing: f
  });
}
function Ie(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Re = { exports: {} };
(function(e, o) {
  (function(r) {
    e.exports = r();
  })(function(r) {
    var u = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
    function f(c, a) {
      var n = c[0], t = c[1], s = c[2], i = c[3];
      n += (t & s | ~t & i) + a[0] - 680876936 | 0, n = (n << 7 | n >>> 25) + t | 0, i += (n & t | ~n & s) + a[1] - 389564586 | 0, i = (i << 12 | i >>> 20) + n | 0, s += (i & n | ~i & t) + a[2] + 606105819 | 0, s = (s << 17 | s >>> 15) + i | 0, t += (s & i | ~s & n) + a[3] - 1044525330 | 0, t = (t << 22 | t >>> 10) + s | 0, n += (t & s | ~t & i) + a[4] - 176418897 | 0, n = (n << 7 | n >>> 25) + t | 0, i += (n & t | ~n & s) + a[5] + 1200080426 | 0, i = (i << 12 | i >>> 20) + n | 0, s += (i & n | ~i & t) + a[6] - 1473231341 | 0, s = (s << 17 | s >>> 15) + i | 0, t += (s & i | ~s & n) + a[7] - 45705983 | 0, t = (t << 22 | t >>> 10) + s | 0, n += (t & s | ~t & i) + a[8] + 1770035416 | 0, n = (n << 7 | n >>> 25) + t | 0, i += (n & t | ~n & s) + a[9] - 1958414417 | 0, i = (i << 12 | i >>> 20) + n | 0, s += (i & n | ~i & t) + a[10] - 42063 | 0, s = (s << 17 | s >>> 15) + i | 0, t += (s & i | ~s & n) + a[11] - 1990404162 | 0, t = (t << 22 | t >>> 10) + s | 0, n += (t & s | ~t & i) + a[12] + 1804603682 | 0, n = (n << 7 | n >>> 25) + t | 0, i += (n & t | ~n & s) + a[13] - 40341101 | 0, i = (i << 12 | i >>> 20) + n | 0, s += (i & n | ~i & t) + a[14] - 1502002290 | 0, s = (s << 17 | s >>> 15) + i | 0, t += (s & i | ~s & n) + a[15] + 1236535329 | 0, t = (t << 22 | t >>> 10) + s | 0, n += (t & i | s & ~i) + a[1] - 165796510 | 0, n = (n << 5 | n >>> 27) + t | 0, i += (n & s | t & ~s) + a[6] - 1069501632 | 0, i = (i << 9 | i >>> 23) + n | 0, s += (i & t | n & ~t) + a[11] + 643717713 | 0, s = (s << 14 | s >>> 18) + i | 0, t += (s & n | i & ~n) + a[0] - 373897302 | 0, t = (t << 20 | t >>> 12) + s | 0, n += (t & i | s & ~i) + a[5] - 701558691 | 0, n = (n << 5 | n >>> 27) + t | 0, i += (n & s | t & ~s) + a[10] + 38016083 | 0, i = (i << 9 | i >>> 23) + n | 0, s += (i & t | n & ~t) + a[15] - 660478335 | 0, s = (s << 14 | s >>> 18) + i | 0, t += (s & n | i & ~n) + a[4] - 405537848 | 0, t = (t << 20 | t >>> 12) + s | 0, n += (t & i | s & ~i) + a[9] + 568446438 | 0, n = (n << 5 | n >>> 27) + t | 0, i += (n & s | t & ~s) + a[14] - 1019803690 | 0, i = (i << 9 | i >>> 23) + n | 0, s += (i & t | n & ~t) + a[3] - 187363961 | 0, s = (s << 14 | s >>> 18) + i | 0, t += (s & n | i & ~n) + a[8] + 1163531501 | 0, t = (t << 20 | t >>> 12) + s | 0, n += (t & i | s & ~i) + a[13] - 1444681467 | 0, n = (n << 5 | n >>> 27) + t | 0, i += (n & s | t & ~s) + a[2] - 51403784 | 0, i = (i << 9 | i >>> 23) + n | 0, s += (i & t | n & ~t) + a[7] + 1735328473 | 0, s = (s << 14 | s >>> 18) + i | 0, t += (s & n | i & ~n) + a[12] - 1926607734 | 0, t = (t << 20 | t >>> 12) + s | 0, n += (t ^ s ^ i) + a[5] - 378558 | 0, n = (n << 4 | n >>> 28) + t | 0, i += (n ^ t ^ s) + a[8] - 2022574463 | 0, i = (i << 11 | i >>> 21) + n | 0, s += (i ^ n ^ t) + a[11] + 1839030562 | 0, s = (s << 16 | s >>> 16) + i | 0, t += (s ^ i ^ n) + a[14] - 35309556 | 0, t = (t << 23 | t >>> 9) + s | 0, n += (t ^ s ^ i) + a[1] - 1530992060 | 0, n = (n << 4 | n >>> 28) + t | 0, i += (n ^ t ^ s) + a[4] + 1272893353 | 0, i = (i << 11 | i >>> 21) + n | 0, s += (i ^ n ^ t) + a[7] - 155497632 | 0, s = (s << 16 | s >>> 16) + i | 0, t += (s ^ i ^ n) + a[10] - 1094730640 | 0, t = (t << 23 | t >>> 9) + s | 0, n += (t ^ s ^ i) + a[13] + 681279174 | 0, n = (n << 4 | n >>> 28) + t | 0, i += (n ^ t ^ s) + a[0] - 358537222 | 0, i = (i << 11 | i >>> 21) + n | 0, s += (i ^ n ^ t) + a[3] - 722521979 | 0, s = (s << 16 | s >>> 16) + i | 0, t += (s ^ i ^ n) + a[6] + 76029189 | 0, t = (t << 23 | t >>> 9) + s | 0, n += (t ^ s ^ i) + a[9] - 640364487 | 0, n = (n << 4 | n >>> 28) + t | 0, i += (n ^ t ^ s) + a[12] - 421815835 | 0, i = (i << 11 | i >>> 21) + n | 0, s += (i ^ n ^ t) + a[15] + 530742520 | 0, s = (s << 16 | s >>> 16) + i | 0, t += (s ^ i ^ n) + a[2] - 995338651 | 0, t = (t << 23 | t >>> 9) + s | 0, n += (s ^ (t | ~i)) + a[0] - 198630844 | 0, n = (n << 6 | n >>> 26) + t | 0, i += (t ^ (n | ~s)) + a[7] + 1126891415 | 0, i = (i << 10 | i >>> 22) + n | 0, s += (n ^ (i | ~t)) + a[14] - 1416354905 | 0, s = (s << 15 | s >>> 17) + i | 0, t += (i ^ (s | ~n)) + a[5] - 57434055 | 0, t = (t << 21 | t >>> 11) + s | 0, n += (s ^ (t | ~i)) + a[12] + 1700485571 | 0, n = (n << 6 | n >>> 26) + t | 0, i += (t ^ (n | ~s)) + a[3] - 1894986606 | 0, i = (i << 10 | i >>> 22) + n | 0, s += (n ^ (i | ~t)) + a[10] - 1051523 | 0, s = (s << 15 | s >>> 17) + i | 0, t += (i ^ (s | ~n)) + a[1] - 2054922799 | 0, t = (t << 21 | t >>> 11) + s | 0, n += (s ^ (t | ~i)) + a[8] + 1873313359 | 0, n = (n << 6 | n >>> 26) + t | 0, i += (t ^ (n | ~s)) + a[15] - 30611744 | 0, i = (i << 10 | i >>> 22) + n | 0, s += (n ^ (i | ~t)) + a[6] - 1560198380 | 0, s = (s << 15 | s >>> 17) + i | 0, t += (i ^ (s | ~n)) + a[13] + 1309151649 | 0, t = (t << 21 | t >>> 11) + s | 0, n += (s ^ (t | ~i)) + a[4] - 145523070 | 0, n = (n << 6 | n >>> 26) + t | 0, i += (t ^ (n | ~s)) + a[11] - 1120210379 | 0, i = (i << 10 | i >>> 22) + n | 0, s += (n ^ (i | ~t)) + a[2] + 718787259 | 0, s = (s << 15 | s >>> 17) + i | 0, t += (i ^ (s | ~n)) + a[9] - 343485551 | 0, t = (t << 21 | t >>> 11) + s | 0, c[0] = n + c[0] | 0, c[1] = t + c[1] | 0, c[2] = s + c[2] | 0, c[3] = i + c[3] | 0;
    }
    function w(c) {
      var a = [], n;
      for (n = 0; n < 64; n += 4)
        a[n >> 2] = c.charCodeAt(n) + (c.charCodeAt(n + 1) << 8) + (c.charCodeAt(n + 2) << 16) + (c.charCodeAt(n + 3) << 24);
      return a;
    }
    function d(c) {
      var a = [], n;
      for (n = 0; n < 64; n += 4)
        a[n >> 2] = c[n] + (c[n + 1] << 8) + (c[n + 2] << 16) + (c[n + 3] << 24);
      return a;
    }
    function m(c) {
      var a = c.length, n = [1732584193, -271733879, -1732584194, 271733878], t, s, i, A, j, E;
      for (t = 64; t <= a; t += 64)
        f(n, w(c.substring(t - 64, t)));
      for (c = c.substring(t - 64), s = c.length, i = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], t = 0; t < s; t += 1)
        i[t >> 2] |= c.charCodeAt(t) << (t % 4 << 3);
      if (i[t >> 2] |= 128 << (t % 4 << 3), t > 55)
        for (f(n, i), t = 0; t < 16; t += 1)
          i[t] = 0;
      return A = a * 8, A = A.toString(16).match(/(.*?)(.{0,8})$/), j = parseInt(A[2], 16), E = parseInt(A[1], 16) || 0, i[14] = j, i[15] = E, f(n, i), n;
    }
    function g(c) {
      var a = c.length, n = [1732584193, -271733879, -1732584194, 271733878], t, s, i, A, j, E;
      for (t = 64; t <= a; t += 64)
        f(n, d(c.subarray(t - 64, t)));
      for (c = t - 64 < a ? c.subarray(t - 64) : new Uint8Array(0), s = c.length, i = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], t = 0; t < s; t += 1)
        i[t >> 2] |= c[t] << (t % 4 << 3);
      if (i[t >> 2] |= 128 << (t % 4 << 3), t > 55)
        for (f(n, i), t = 0; t < 16; t += 1)
          i[t] = 0;
      return A = a * 8, A = A.toString(16).match(/(.*?)(.{0,8})$/), j = parseInt(A[2], 16), E = parseInt(A[1], 16) || 0, i[14] = j, i[15] = E, f(n, i), n;
    }
    function p(c) {
      var a = "", n;
      for (n = 0; n < 4; n += 1)
        a += u[c >> n * 8 + 4 & 15] + u[c >> n * 8 & 15];
      return a;
    }
    function l(c) {
      var a;
      for (a = 0; a < c.length; a += 1)
        c[a] = p(c[a]);
      return c.join("");
    }
    l(m("hello")), typeof ArrayBuffer < "u" && !ArrayBuffer.prototype.slice && function() {
      function c(a, n) {
        return a = a | 0 || 0, a < 0 ? Math.max(a + n, 0) : Math.min(a, n);
      }
      ArrayBuffer.prototype.slice = function(a, n) {
        var t = this.byteLength, s = c(a, t), i = t, A, j, E, R;
        return n !== r && (i = c(n, t)), s > i ? new ArrayBuffer(0) : (A = i - s, j = new ArrayBuffer(A), E = new Uint8Array(j), R = new Uint8Array(this, s, A), E.set(R), j);
      };
    }();
    function y(c) {
      return /[\u0080-\uFFFF]/.test(c) && (c = unescape(encodeURIComponent(c))), c;
    }
    function b(c, a) {
      var n = c.length, t = new ArrayBuffer(n), s = new Uint8Array(t), i;
      for (i = 0; i < n; i += 1)
        s[i] = c.charCodeAt(i);
      return a ? s : t;
    }
    function v(c) {
      return String.fromCharCode.apply(null, new Uint8Array(c));
    }
    function T(c, a, n) {
      var t = new Uint8Array(c.byteLength + a.byteLength);
      return t.set(new Uint8Array(c)), t.set(new Uint8Array(a), c.byteLength), n ? t : t.buffer;
    }
    function C(c) {
      var a = [], n = c.length, t;
      for (t = 0; t < n - 1; t += 2)
        a.push(parseInt(c.substr(t, 2), 16));
      return String.fromCharCode.apply(String, a);
    }
    function h() {
      this.reset();
    }
    return h.prototype.append = function(c) {
      return this.appendBinary(y(c)), this;
    }, h.prototype.appendBinary = function(c) {
      this._buff += c, this._length += c.length;
      var a = this._buff.length, n;
      for (n = 64; n <= a; n += 64)
        f(this._hash, w(this._buff.substring(n - 64, n)));
      return this._buff = this._buff.substring(n - 64), this;
    }, h.prototype.end = function(c) {
      var a = this._buff, n = a.length, t, s = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], i;
      for (t = 0; t < n; t += 1)
        s[t >> 2] |= a.charCodeAt(t) << (t % 4 << 3);
      return this._finish(s, n), i = l(this._hash), c && (i = C(i)), this.reset(), i;
    }, h.prototype.reset = function() {
      return this._buff = "", this._length = 0, this._hash = [1732584193, -271733879, -1732584194, 271733878], this;
    }, h.prototype.getState = function() {
      return {
        buff: this._buff,
        length: this._length,
        hash: this._hash.slice()
      };
    }, h.prototype.setState = function(c) {
      return this._buff = c.buff, this._length = c.length, this._hash = c.hash, this;
    }, h.prototype.destroy = function() {
      delete this._hash, delete this._buff, delete this._length;
    }, h.prototype._finish = function(c, a) {
      var n = a, t, s, i;
      if (c[n >> 2] |= 128 << (n % 4 << 3), n > 55)
        for (f(this._hash, c), n = 0; n < 16; n += 1)
          c[n] = 0;
      t = this._length * 8, t = t.toString(16).match(/(.*?)(.{0,8})$/), s = parseInt(t[2], 16), i = parseInt(t[1], 16) || 0, c[14] = s, c[15] = i, f(this._hash, c);
    }, h.hash = function(c, a) {
      return h.hashBinary(y(c), a);
    }, h.hashBinary = function(c, a) {
      var n = m(c), t = l(n);
      return a ? C(t) : t;
    }, h.ArrayBuffer = function() {
      this.reset();
    }, h.ArrayBuffer.prototype.append = function(c) {
      var a = T(this._buff.buffer, c, !0), n = a.length, t;
      for (this._length += c.byteLength, t = 64; t <= n; t += 64)
        f(this._hash, d(a.subarray(t - 64, t)));
      return this._buff = t - 64 < n ? new Uint8Array(a.buffer.slice(t - 64)) : new Uint8Array(0), this;
    }, h.ArrayBuffer.prototype.end = function(c) {
      var a = this._buff, n = a.length, t = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], s, i;
      for (s = 0; s < n; s += 1)
        t[s >> 2] |= a[s] << (s % 4 << 3);
      return this._finish(t, n), i = l(this._hash), c && (i = C(i)), this.reset(), i;
    }, h.ArrayBuffer.prototype.reset = function() {
      return this._buff = new Uint8Array(0), this._length = 0, this._hash = [1732584193, -271733879, -1732584194, 271733878], this;
    }, h.ArrayBuffer.prototype.getState = function() {
      var c = h.prototype.getState.call(this);
      return c.buff = v(c.buff), c;
    }, h.ArrayBuffer.prototype.setState = function(c) {
      return c.buff = b(c.buff, !0), h.prototype.setState.call(this, c);
    }, h.ArrayBuffer.prototype.destroy = h.prototype.destroy, h.ArrayBuffer.prototype._finish = h.prototype._finish, h.ArrayBuffer.hash = function(c, a) {
      var n = g(new Uint8Array(c)), t = l(n);
      return a ? C(t) : t;
    }, h;
  });
})(Re);
var en = Re.exports;
const tn = /* @__PURE__ */ Ie(en), q = (e) => typeof e == "function" ? e() : e;
function B(e) {
  return !(e && (typeof e != "object" || (Array.isArray(e) ? e.length : Object.keys(e).length)));
}
function rn(e) {
  for (var o = [], r = 0; r < e.length; ) {
    var u = e[r];
    if (u === "*" || u === "+" || u === "?") {
      o.push({ type: "MODIFIER", index: r, value: e[r++] });
      continue;
    }
    if (u === "\\") {
      o.push({ type: "ESCAPED_CHAR", index: r++, value: e[r++] });
      continue;
    }
    if (u === "{") {
      o.push({ type: "OPEN", index: r, value: e[r++] });
      continue;
    }
    if (u === "}") {
      o.push({ type: "CLOSE", index: r, value: e[r++] });
      continue;
    }
    if (u === ":") {
      for (var f = "", w = r + 1; w < e.length; ) {
        var d = e.charCodeAt(w);
        if (
          // `0-9`
          d >= 48 && d <= 57 || // `A-Z`
          d >= 65 && d <= 90 || // `a-z`
          d >= 97 && d <= 122 || // `_`
          d === 95
        ) {
          f += e[w++];
          continue;
        }
        break;
      }
      if (!f)
        throw new TypeError("Missing parameter name at ".concat(r));
      o.push({ type: "NAME", index: r, value: f }), r = w;
      continue;
    }
    if (u === "(") {
      var m = 1, g = "", w = r + 1;
      if (e[w] === "?")
        throw new TypeError('Pattern cannot start with "?" at '.concat(w));
      for (; w < e.length; ) {
        if (e[w] === "\\") {
          g += e[w++] + e[w++];
          continue;
        }
        if (e[w] === ")") {
          if (m--, m === 0) {
            w++;
            break;
          }
        } else if (e[w] === "(" && (m++, e[w + 1] !== "?"))
          throw new TypeError("Capturing groups are not allowed at ".concat(w));
        g += e[w++];
      }
      if (m)
        throw new TypeError("Unbalanced pattern at ".concat(r));
      if (!g)
        throw new TypeError("Missing pattern at ".concat(r));
      o.push({ type: "PATTERN", index: r, value: g }), r = w;
      continue;
    }
    o.push({ type: "CHAR", index: r, value: e[r++] });
  }
  return o.push({ type: "END", index: r, value: "" }), o;
}
function nn(e, o) {
  o === void 0 && (o = {});
  for (var r = rn(e), u = o.prefixes, f = u === void 0 ? "./" : u, w = "[^".concat(M(o.delimiter || "/#?"), "]+?"), d = [], m = 0, g = 0, p = "", l = function(i) {
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
        name: T || m++,
        prefix: h,
        suffix: "",
        pattern: C || w,
        modifier: l("MODIFIER") || ""
      });
      continue;
    }
    var c = v || l("ESCAPED_CHAR");
    if (c) {
      p += c;
      continue;
    }
    p && (d.push(p), p = "");
    var a = l("OPEN");
    if (a) {
      var h = b(), n = l("NAME") || "", t = l("PATTERN") || "", s = b();
      y("CLOSE"), d.push({
        name: n || (t ? m++ : ""),
        pattern: n && !t ? w : t,
        prefix: h,
        suffix: s,
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
function Me(e) {
  return e && e.sensitive ? "" : "i";
}
function on(e, o) {
  if (!o)
    return e;
  for (var r = /\((?:\?<(.*?)>)?(?!\?)/g, u = 0, f = r.exec(e.source); f; )
    o.push({
      // Use parenthesized substring match if available, index otherwise
      name: f[1] || u++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    }), f = r.exec(e.source);
  return e;
}
function sn(e, o, r) {
  var u = e.map(function(f) {
    return Be(f, o, r).source;
  });
  return new RegExp("(?:".concat(u.join("|"), ")"), Me(r));
}
function an(e, o, r) {
  return cn(nn(e, r), o, r);
}
function cn(e, o, r) {
  r === void 0 && (r = {});
  for (var u = r.strict, f = u === void 0 ? !1 : u, w = r.start, d = w === void 0 ? !0 : w, m = r.end, g = m === void 0 ? !0 : m, p = r.encode, l = p === void 0 ? function(R) {
    return R;
  } : p, y = r.delimiter, b = y === void 0 ? "/#?" : y, v = r.endsWith, T = v === void 0 ? "" : v, C = "[".concat(M(T), "]|$"), h = "[".concat(M(b), "]"), c = d ? "^" : "", a = 0, n = e; a < n.length; a++) {
    var t = n[a];
    if (typeof t == "string")
      c += M(l(t));
    else {
      var s = M(l(t.prefix)), i = M(l(t.suffix));
      if (t.pattern)
        if (o && o.push(t), s || i)
          if (t.modifier === "+" || t.modifier === "*") {
            var A = t.modifier === "*" ? "?" : "";
            c += "(?:".concat(s, "((?:").concat(t.pattern, ")(?:").concat(i).concat(s, "(?:").concat(t.pattern, "))*)").concat(i, ")").concat(A);
          } else
            c += "(?:".concat(s, "(").concat(t.pattern, ")").concat(i, ")").concat(t.modifier);
        else
          t.modifier === "+" || t.modifier === "*" ? c += "((?:".concat(t.pattern, ")").concat(t.modifier, ")") : c += "(".concat(t.pattern, ")").concat(t.modifier);
      else
        c += "(?:".concat(s).concat(i, ")").concat(t.modifier);
    }
  }
  if (g)
    f || (c += "".concat(h, "?")), c += r.endsWith ? "(?=".concat(C, ")") : "$";
  else {
    var j = e[e.length - 1], E = typeof j == "string" ? h.indexOf(j[j.length - 1]) > -1 : j === void 0;
    f || (c += "(?:".concat(h, "(?=").concat(C, "))?")), E || (c += "(?=".concat(h, "|").concat(C, ")"));
  }
  return new RegExp(c, Me(r));
}
function Be(e, o, r) {
  return e instanceof RegExp ? on(e, o) : Array.isArray(e) ? sn(e, o, r) : an(e, o, r);
}
const Le = "_$mockHttp", De = typeof window < "u", Ne = De ? window.top || window : {}, We = () => Ne[Le] || {
  isMock: !1,
  mockData: []
}, ne = (e) => {
  const o = We();
  Ne[Le] = Object.assign(o, e);
}, un = (e) => {
  ne({ mockData: e });
}, fn = () => {
  ne({ isMock: !0 });
}, pn = () => {
  ne({ isMock: !0 });
};
if (De) {
  const e = window.fetch;
  window.fetch = async function(...o) {
    var u;
    const r = We();
    if (r.isMock && o[0] !== null) {
      let f, w = "";
      typeof o[0] == "object" ? (f = o[0], w = f.url) : (f = o[1], w = o[0]);
      const d = new URL(w, "http://localhost"), m = (u = r.mockData) == null ? void 0 : u.find((g) => {
        if (!g || !g.url || g.method && g.method.toUpperCase() !== (f == null ? void 0 : f.method))
          return !1;
        const p = new URL(g.url, "http://localhost"), l = new URLSearchParams(p.search), y = new URLSearchParams(d.search);
        for (const [b, v] of l)
          if (y.get(b) !== v)
            return !1;
        return Be(p.pathname).test(d.pathname);
      });
      if (m) {
        const { response: g, timeout: p, statusCode: l } = m;
        p && await new Promise((b) => setTimeout(b, p));
        const y = typeof g == "function" ? g(f) : g;
        return console.debug("mock success: " + w), console.debug(y), y instanceof Response ? Promise.resolve(y) : Promise.resolve(
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
var Fe = /* @__PURE__ */ ((e) => (e.Json = "application/json;charset=UTF-8", e.FormURLEncoded = "application/x-www-form-urlencoded;charset=UTF-8", e.FormData = "multipart/form-data;charset=UTF-8", e))(Fe || {});
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
    const u = ~o.indexOf("?") ? "&" : "?";
    return typeof r == "object" ? u + Object.entries(r).map(
      (f) => encodeURIComponent(f[0]) + "=" + encodeURIComponent(f[1] === void 0 || f[1] === null ? "" : f[1])
    ).join("&") : r !== "" ? u + q(r) : "";
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
  getUrl(o, r, u = "") {
    let f = o ? new URL(r, new URL(o, window.location.href).toString()).toString() : r;
    return u && (f += this.options.normalizeUrlParams(f, u)), f;
  }
  createContext(o, r = {}) {
    const u = this.options, f = q(u.baseURL);
    let w = q(o);
    w = u.normalizeUrl(encodeURI(w));
    let d = new ln();
    d.baseURL = f, d.path = w, d.originUrl = this.getUrl(f, w), r.params ? d.url = d.originUrl + this.options.normalizeUrlParams(d.originUrl, r.params) : d.url = d.originUrl, d.requestOptions = {
      headers: {},
      timeout: u.timeout,
      ...r
    };
    const m = !B(r == null ? void 0 : r.body);
    let g = !1;
    const p = new tn();
    p.append(r.method || ""), p.append(d.url), m && (g = $(r.body), d.requestBody = r.body, r.body instanceof URLSearchParams ? p.append(r.body.toString()) : r.body instanceof FormData ? p.append(
      Array.from(r.body).map(([y, b]) => y.toString() + "=" + b.toString()).join("&")
    ) : g && p.append(JSON.stringify(r.body))), d.key = p.end();
    const l = this.pendingMap.get(d.key);
    if (l)
      console.info(
        "[WebCore Http]: The same request is being executed, and this request has been cancelled. url: " + d.url
      ), d = l;
    else if (this.pendingMap.set(d.key, d), m && g) {
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
  createRequest(o, r = {}, u = []) {
    const f = this.createContext(o, r), w = this.options;
    let d = [];
    typeof w.middlewares == "function" && (d = d.concat(q(w.middlewares))), d = d.concat(this.middlewares), u && (typeof u == "function" ? (d.push(u), f.fetchPromise = void 0) : u instanceof Array && u.length > 0 && (d = d.concat(u), f.fetchPromise = void 0));
    const m = (g) => {
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
        return Promise.resolve(p(f, m.bind(null, g + 1)));
      } catch (l) {
        return Promise.reject(l);
      }
    };
    return f.fetchPromise || (f.fetchPromise = m(0).then((g) => {
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
  request(o, r = {}, u = []) {
    if (r.throttle !== void 0 && r.debounce !== void 0)
      throw new Error("throttle and debounce cannot be set at the same time");
    return r.throttle ? new Promise((f) => {
      Qr(() => f(this.createRequest(o, r, u)), r.throttle);
    }) : r.debounce ? new Promise((f) => {
      Ue(() => f(this.createRequest(o, r, u)), r.debounce);
    }) : this.createRequest(o, r, u);
  }
  get(o, r, u = {}, f = []) {
    return u.method = "GET", u.params = r, this.request(o, u, f);
  }
  post(o, r, u = {}, f = []) {
    return u.method = "POST", u.body = r, this.request(o, u, f);
  }
  patch(o, r = {}, u = []) {
    return r.method = "PATCH", this.request(o, r, u);
  }
  put(o, r = {}, u = []) {
    return r.method = "PUT", this.request(o, r, u);
  }
  delete(o, r = {}, u = []) {
    return r.method = "DELETE", this.request(o, r, u);
  }
  upload(o, r, u = {}, f = []) {
    return u.method = "POST", u.body = r, this.request(o, u, f);
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
        const u = this.items[r];
        o(r, u);
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
var qe = { exports: {} };
(function(e) {
  var o = Object.prototype.hasOwnProperty, r = "~";
  function u() {
  }
  Object.create && (u.prototype = /* @__PURE__ */ Object.create(null), new u().__proto__ || (r = !1));
  function f(g, p, l) {
    this.fn = g, this.context = p, this.once = l || !1;
  }
  function w(g, p, l, y, b) {
    if (typeof l != "function")
      throw new TypeError("The listener must be a function");
    var v = new f(l, y || g, b), T = r ? r + p : p;
    return g._events[T] ? g._events[T].fn ? g._events[T] = [g._events[T], v] : g._events[T].push(v) : (g._events[T] = v, g._eventsCount++), g;
  }
  function d(g, p) {
    --g._eventsCount === 0 ? g._events = new u() : delete g._events[p];
  }
  function m() {
    this._events = new u(), this._eventsCount = 0;
  }
  m.prototype.eventNames = function() {
    var p = [], l, y;
    if (this._eventsCount === 0)
      return p;
    for (y in l = this._events)
      o.call(l, y) && p.push(r ? y.slice(1) : y);
    return Object.getOwnPropertySymbols ? p.concat(Object.getOwnPropertySymbols(l)) : p;
  }, m.prototype.listeners = function(p) {
    var l = r ? r + p : p, y = this._events[l];
    if (!y)
      return [];
    if (y.fn)
      return [y.fn];
    for (var b = 0, v = y.length, T = new Array(v); b < v; b++)
      T[b] = y[b].fn;
    return T;
  }, m.prototype.listenerCount = function(p) {
    var l = r ? r + p : p, y = this._events[l];
    return y ? y.fn ? 1 : y.length : 0;
  }, m.prototype.emit = function(p, l, y, b, v, T) {
    var C = r ? r + p : p;
    if (!this._events[C])
      return !1;
    var h = this._events[C], c = arguments.length, a, n;
    if (h.fn) {
      switch (h.once && this.removeListener(p, h.fn, void 0, !0), c) {
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
      for (n = 1, a = new Array(c - 1); n < c; n++)
        a[n - 1] = arguments[n];
      h.fn.apply(h.context, a);
    } else {
      var t = h.length, s;
      for (n = 0; n < t; n++)
        switch (h[n].once && this.removeListener(p, h[n].fn, void 0, !0), c) {
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
            if (!a)
              for (s = 1, a = new Array(c - 1); s < c; s++)
                a[s - 1] = arguments[s];
            h[n].fn.apply(h[n].context, a);
        }
    }
    return !0;
  }, m.prototype.on = function(p, l, y) {
    return w(this, p, l, y, !1);
  }, m.prototype.once = function(p, l, y) {
    return w(this, p, l, y, !0);
  }, m.prototype.removeListener = function(p, l, y, b) {
    var v = r ? r + p : p;
    if (!this._events[v])
      return this;
    if (!l)
      return d(this, v), this;
    var T = this._events[v];
    if (T.fn)
      T.fn === l && (!b || T.once) && (!y || T.context === y) && d(this, v);
    else {
      for (var C = 0, h = [], c = T.length; C < c; C++)
        (T[C].fn !== l || b && !T[C].once || y && T[C].context !== y) && h.push(T[C]);
      h.length ? this._events[v] = h.length === 1 ? h[0] : h : d(this, v);
    }
    return this;
  }, m.prototype.removeAllListeners = function(p) {
    var l;
    return p ? (l = r ? r + p : p, this._events[l] && d(this, l)) : (this._events = new u(), this._eventsCount = 0), this;
  }, m.prototype.off = m.prototype.removeListener, m.prototype.addListener = m.prototype.on, m.prefixed = r, m.EventEmitter = m, e.exports = m;
})(qe);
var gn = qe.exports;
const yn = /* @__PURE__ */ Ie(gn);
class wn extends yn {
}
const te = "_ipc";
class mn {
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
    if (this.emitter = new wn(), o) {
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
        const u = this.contentWindow[te];
        if (u) {
          u.send(o, r);
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
    const u = this.targets.items[o];
    if (u) {
      u.contentWindow = r;
      return;
    }
    this.targets.add(o, new mn(r));
  }
  /**
   * 删除目标监听器
   * @param key 目标名称
   */
  removeTarget(o) {
    this.targets.remove(o);
  }
  remove(o, r, u) {
    var f;
    return typeof r == "function" && (u = r, r = "*"), r && u ? (f = this.targets.get(r)) == null || f.emitter.removeListener(o, u) : this.targets.map((w, d) => {
      d.emitter.removeAllListeners(o);
    }), this;
  }
  on(o, r, u) {
    var f;
    return typeof r == "function" && (u = r, r = "*"), u && (this.addTarget(r), (f = this.targets.get(r)) == null || f.emitter.on(o, u)), this;
  }
  once(o, r, u) {
    var f;
    return typeof r == "function" && (u = r, r = "*"), u && (this.addTarget(r), (f = this.targets.get(r)) == null || f.emitter.once(o, u)), this;
  }
  /**
   * 执行所有监听器
   * @param event 事件名
   * @param args 参数
   */
  send(o, r) {
    this.sendingEvents.has(o) || (this.sendingEvents.add(o), this.targets.map((u, f) => {
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
  return new Promise((r, u) => {
    window._app.camera({ ...o, ...e }, (f) => {
      f ? r(f) : u("Failed to get image");
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
  },
  getProcessId() {
    return window._app.getProcessId();
  },
  getProcessCode() {
    return window._app.getProcessCode();
  },
  getProcessName() {
    return window._app.getProcessName();
  }
};
var He = /* @__PURE__ */ ((e) => (e.Mobile = "APP", e.Desktop = "WEB", e.NODE_JS = "NodeJs", e))(He || {});
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
  constructor(r, u, f, w = "") {
    var d;
    super();
    _(this, "code", -1);
    _(this, "status", "");
    _(this, "type", "");
    _(this, "description", "");
    this.message = r, this.name = "CustomError", this.code = u, this.status = f, this.type = "error", this.description = w, (d = P.ipc.targets.get("_self")) == null || d.send("custom_error", this);
  }
}
class Mn extends re {
  constructor(o, r, u, f = "") {
    super(o, r, u, f), this.name = "OperationError";
  }
}
const Ve = typeof window < "u", Bn = Ve ? null : require("node:path"), Ln = Ve ? null : require("node:fs");
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
const _e = 2;
let F = 0;
const Dn = function() {
  F++, F >= _e && (console.error(`获取资源超过错误次数阈值[${_e}]，触发版本检查！`), F = -9999, Wn()), setTimeout(() => {
    F = 0;
  }, 1500);
}, Nn = () => {
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
}, Wn = () => {
  typeof window < "u" && window._version && fetch("/version.json?_t=" + (/* @__PURE__ */ new Date()).getTime()).then((e) => e.json()).then((e) => {
    if (V && V !== e.version)
      throw new Mn(
        `[${e.version}] 有新的内容更新，请在保存页面数据后，刷新页面重新载入！`,
        404,
        404
      );
  });
}, ke = typeof window < "u", Te = ke ? null : require("node:path"), Fn = ke ? null : require("swagger-typescript-api");
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
        const u = `/api/${r}`;
        await Fn.generateApi({
          name: r,
          url: `${e.baseUrl}${u}/v3/api-docs`,
          output: Te.resolve(process.cwd(), (e == null ? void 0 : e.output) || "./src/api"),
          templates: Te.resolve(process.cwd(), (e == null ? void 0 : e.templates) || "./plugins/swagger-templates"),
          singleHttpClient: !0,
          httpClientType: "fetch",
          // @ts-ignore
          apiClassName: `${r[0].toUpperCase() + r.slice(1)}Api`,
          apiPrefix: u,
          importModules: 'import { Http } from "@/types/web-core";',
          hooks: {
            onFormatRouteName: (f, w) => /\d/.test(w) && f.operationId.includes("_") ? f.operationId.split("_", 1)[0] : w
          }
        }).catch((f) => console.error(f));
      }
    }
  };
}
const qn = "YYYY-MM-DD HH:mm:ss";
function Je(e) {
  for (const o in e) {
    if (e[o] && e[o]._isAMomentObject && (e[o] = e[o].format(qn)), ve(o)) {
      const r = e[o];
      if (r)
        try {
          e[o] = ve(r) ? r.trim() : r;
        } catch (u) {
          throw new Error(u);
        }
    }
    $(e[o]) && Je(e[o]);
  }
}
const Hn = async (e, o) => {
  const r = e.requestOptions.body;
  r && Object.prototype.toString.call(r) === "[object Object]" && Je(r), await o();
}, Vn = async (e, o) => {
  var w, d, m, g;
  const r = e.requestOptions, u = r.body;
  if (!(u instanceof FormData) && !(u instanceof URLSearchParams)) {
    let p = !0;
    const l = r.headers, y = B(l) ? null : l == null ? void 0 : l["Content-Type"];
    y ? p = y.startsWith("application/json") : l["Content-Type"] = Fe.Json, p && typeof u == "object" && (r.body = JSON.stringify(u));
  }
  if (await o(), e.result || (w = e.response) != null && w.bodyUsed)
    return;
  const f = ((d = e.response) == null ? void 0 : d.headers.get("Content-Type")) || "";
  (m = e.response) != null && m.ok && (f != null && f.startsWith("application/json")) && (e.result = await ((g = e.response) == null ? void 0 : g.json()));
}, kn = async (e, o) => {
  var w, d, m, g;
  const u = e.requestOptions.headers, f = P.getToken();
  if (f && Xr(u.Authorization) && (u.Authorization = `Bearer ${f}`), u.eid = P.getEnterpriseId(), u.oid = P.getOrgId(), u["Accept-Language"] = P.getLanguage(), u["X-TZ-Offset"] = (/* @__PURE__ */ new Date()).getTimezoneOffset().toString(), await o(), !((w = e.response) != null && w.ok)) {
    const p = new Error("An error occurred while fetching the data.");
    throw p.message = `${(d = e.response) == null ? void 0 : d.status}|${await ((m = e.response) == null ? void 0 : m.text()) || ""}`, p;
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
    case He.Mobile:
      return window._app.getUrl();
    default:
      return P.config.baseUrl || location.origin;
  }
};
ie.middlewares = () => [kn, Vn, Hn, Jn];
const zn = new hn(ie);
typeof window < "u" && (P.ipc = oe.init(), P.ipc.addTarget("_self", window), window.http = zn, window.fw = P, Nn());
export {
  re as CustomError,
  dn as Dictionary,
  oe as EventBus,
  hn as Http,
  Kn as autoCheckUpdates,
  Yn as swaggerApiGen
};
