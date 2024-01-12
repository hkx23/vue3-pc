var Ge = Object.defineProperty;
var Ke = (e, o, n) => o in e ? Ge(e, o, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[o] = n;
var T = (e, o, n) => (Ke(e, typeof o != "symbol" ? o + "" : o, n), n);
var Ye = typeof global == "object" && global && global.Object === Object && global;
const _e = Ye;
var Xe = typeof self == "object" && self && self.Object === Object && self, Ze = _e || Xe || Function("return this")();
const $ = Ze;
var Qe = $.Symbol;
const H = Qe;
var Se = Object.prototype, ke = Se.hasOwnProperty, et = Se.toString, L = H ? H.toStringTag : void 0;
function tt(e) {
  var o = ke.call(e, L), n = e[L];
  try {
    e[L] = void 0;
    var f = !0;
  } catch {
  }
  var u = et.call(e);
  return f && (o ? e[L] = n : delete e[L]), u;
}
var rt = Object.prototype, nt = rt.toString;
function ot(e) {
  return nt.call(e);
}
var it = "[object Null]", st = "[object Undefined]", ie = H ? H.toStringTag : void 0;
function U(e) {
  return e == null ? e === void 0 ? st : it : ie && ie in Object(e) ? tt(e) : ot(e);
}
function F(e) {
  return e != null && typeof e == "object";
}
var at = "[object Symbol]";
function ct(e) {
  return typeof e == "symbol" || F(e) && U(e) == at;
}
var ft = Array.isArray;
const je = ft;
var ut = /\s/;
function lt(e) {
  for (var o = e.length; o-- && ut.test(e.charAt(o)); )
    ;
  return o;
}
var ht = /^\s+/;
function pt(e) {
  return e && e.slice(0, lt(e) + 1).replace(ht, "");
}
function O(e) {
  var o = typeof e;
  return e != null && (o == "object" || o == "function");
}
var se = 0 / 0, dt = /^[-+]0x[0-9a-f]+$/i, gt = /^0b[01]+$/i, yt = /^0o[0-7]+$/i, mt = parseInt;
function ae(e) {
  if (typeof e == "number")
    return e;
  if (ct(e))
    return se;
  if (O(e)) {
    var o = typeof e.valueOf == "function" ? e.valueOf() : e;
    e = O(o) ? o + "" : o;
  }
  if (typeof e != "string")
    return e === 0 ? e : +e;
  e = pt(e);
  var n = gt.test(e);
  return n || yt.test(e) ? mt(e.slice(2), n ? 2 : 8) : dt.test(e) ? se : +e;
}
var bt = "[object AsyncFunction]", wt = "[object Function]", vt = "[object GeneratorFunction]", Tt = "[object Proxy]";
function Ee(e) {
  if (!O(e))
    return !1;
  var o = U(e);
  return o == wt || o == vt || o == bt || o == Tt;
}
var At = $["__core-js_shared__"];
const z = At;
var ce = function() {
  var e = /[^.]+$/.exec(z && z.keys && z.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function _t(e) {
  return !!ce && ce in e;
}
var St = Function.prototype, jt = St.toString;
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
var Et = /[\\^$.*+?()[\]{}|]/g, Pt = /^\[object .+?Constructor\]$/, Ct = Function.prototype, $t = Object.prototype, Ot = Ct.toString, xt = $t.hasOwnProperty, Ut = RegExp(
  "^" + Ot.call(xt).replace(Et, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function It(e) {
  if (!O(e) || _t(e))
    return !1;
  var o = Ee(e) ? Ut : Pt;
  return o.test(I(e));
}
function Rt(e, o) {
  return e == null ? void 0 : e[o];
}
function N(e, o) {
  var n = Rt(e, o);
  return It(n) ? n : void 0;
}
var Mt = N($, "WeakMap");
const K = Mt;
var Bt = 9007199254740991;
function Pe(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= Bt;
}
function Lt(e) {
  return e != null && Pe(e.length) && !Ee(e);
}
var Dt = Object.prototype;
function Ce(e) {
  var o = e && e.constructor, n = typeof o == "function" && o.prototype || Dt;
  return e === n;
}
var Ft = "[object Arguments]";
function fe(e) {
  return F(e) && U(e) == Ft;
}
var $e = Object.prototype, Nt = $e.hasOwnProperty, Wt = $e.propertyIsEnumerable, qt = fe(function() {
  return arguments;
}()) ? fe : function(e) {
  return F(e) && Nt.call(e, "callee") && !Wt.call(e, "callee");
};
const Ht = qt;
function Jt() {
  return !1;
}
var Oe = typeof exports == "object" && exports && !exports.nodeType && exports, ue = Oe && typeof module == "object" && module && !module.nodeType && module, zt = ue && ue.exports === Oe, le = zt ? $.Buffer : void 0, Vt = le ? le.isBuffer : void 0, Gt = Vt || Jt;
const Kt = Gt;
var Yt = "[object Arguments]", Xt = "[object Array]", Zt = "[object Boolean]", Qt = "[object Date]", kt = "[object Error]", er = "[object Function]", tr = "[object Map]", rr = "[object Number]", nr = "[object Object]", or = "[object RegExp]", ir = "[object Set]", sr = "[object String]", ar = "[object WeakMap]", cr = "[object ArrayBuffer]", fr = "[object DataView]", ur = "[object Float32Array]", lr = "[object Float64Array]", hr = "[object Int8Array]", pr = "[object Int16Array]", dr = "[object Int32Array]", gr = "[object Uint8Array]", yr = "[object Uint8ClampedArray]", mr = "[object Uint16Array]", br = "[object Uint32Array]", S = {};
S[ur] = S[lr] = S[hr] = S[pr] = S[dr] = S[gr] = S[yr] = S[mr] = S[br] = !0;
S[Yt] = S[Xt] = S[cr] = S[Zt] = S[fr] = S[Qt] = S[kt] = S[er] = S[tr] = S[rr] = S[nr] = S[or] = S[ir] = S[sr] = S[ar] = !1;
function wr(e) {
  return F(e) && Pe(e.length) && !!S[U(e)];
}
function vr(e) {
  return function(o) {
    return e(o);
  };
}
var xe = typeof exports == "object" && exports && !exports.nodeType && exports, D = xe && typeof module == "object" && module && !module.nodeType && module, Tr = D && D.exports === xe, V = Tr && _e.process, Ar = function() {
  try {
    var e = D && D.require && D.require("util").types;
    return e || V && V.binding && V.binding("util");
  } catch {
  }
}();
const he = Ar;
var pe = he && he.isTypedArray, _r = pe ? vr(pe) : wr;
const Sr = _r;
function jr(e, o) {
  return function(n) {
    return e(o(n));
  };
}
var Er = jr(Object.keys, Object);
const Pr = Er;
var Cr = Object.prototype, $r = Cr.hasOwnProperty;
function Or(e) {
  if (!Ce(e))
    return Pr(e);
  var o = [];
  for (var n in Object(e))
    $r.call(e, n) && n != "constructor" && o.push(n);
  return o;
}
var xr = N($, "Map");
const Y = xr;
var Ur = N($, "DataView");
const X = Ur;
var Ir = N($, "Promise");
const Z = Ir;
var Rr = N($, "Set");
const Q = Rr;
var de = "[object Map]", Mr = "[object Object]", ge = "[object Promise]", ye = "[object Set]", me = "[object WeakMap]", be = "[object DataView]", Br = I(X), Lr = I(Y), Dr = I(Z), Fr = I(Q), Nr = I(K), x = U;
(X && x(new X(new ArrayBuffer(1))) != be || Y && x(new Y()) != de || Z && x(Z.resolve()) != ge || Q && x(new Q()) != ye || K && x(new K()) != me) && (x = function(e) {
  var o = U(e), n = o == Mr ? e.constructor : void 0, f = n ? I(n) : "";
  if (f)
    switch (f) {
      case Br:
        return be;
      case Lr:
        return de;
      case Dr:
        return ge;
      case Fr:
        return ye;
      case Nr:
        return me;
    }
  return o;
});
const Wr = x;
var qr = function() {
  return $.Date.now();
};
const G = qr;
var Hr = "Expected a function", Jr = Math.max, zr = Math.min;
function Ue(e, o, n) {
  var f, u, m, d, b, g, l = 0, h = !1, y = !1, w = !0;
  if (typeof e != "function")
    throw new TypeError(Hr);
  o = ae(o) || 0, O(n) && (h = !!n.leading, y = "maxWait" in n, m = y ? Jr(ae(n.maxWait) || 0, o) : m, w = "trailing" in n ? !!n.trailing : w);
  function v(i) {
    var _ = f, E = u;
    return f = u = void 0, l = i, d = e.apply(E, _), d;
  }
  function A(i) {
    return l = i, b = setTimeout(c, o), h ? v(i) : d;
  }
  function j(i) {
    var _ = i - g, E = i - l, P = o - _;
    return y ? zr(P, m - E) : P;
  }
  function p(i) {
    var _ = i - g, E = i - l;
    return g === void 0 || _ >= o || _ < 0 || y && E >= m;
  }
  function c() {
    var i = G();
    if (p(i))
      return a(i);
    b = setTimeout(c, j(i));
  }
  function a(i) {
    return b = void 0, w && f ? v(i) : (f = u = void 0, d);
  }
  function r() {
    b !== void 0 && clearTimeout(b), l = 0, f = g = u = b = void 0;
  }
  function t() {
    return b === void 0 ? d : a(G());
  }
  function s() {
    var i = G(), _ = p(i);
    if (f = arguments, u = this, g = i, _) {
      if (b === void 0)
        return A(g);
      if (y)
        return clearTimeout(b), b = setTimeout(c, o), v(g);
    }
    return b === void 0 && (b = setTimeout(c, o)), d;
  }
  return s.cancel = r, s.flush = t, s;
}
var Vr = "[object String]";
function we(e) {
  return typeof e == "string" || !je(e) && F(e) && U(e) == Vr;
}
var Gr = "[object Map]", Kr = "[object Set]", Yr = Object.prototype, Xr = Yr.hasOwnProperty;
function ve(e) {
  if (e == null)
    return !0;
  if (Lt(e) && (je(e) || typeof e == "string" || typeof e.splice == "function" || Kt(e) || Sr(e) || Ht(e)))
    return !e.length;
  var o = Wr(e);
  if (o == Gr || o == Kr)
    return !e.size;
  if (Ce(e))
    return !Or(e).length;
  for (var n in e)
    if (Xr.call(e, n))
      return !1;
  return !0;
}
var Zr = "Expected a function";
function Qr(e, o, n) {
  var f = !0, u = !0;
  if (typeof e != "function")
    throw new TypeError(Zr);
  return O(n) && (f = "leading" in n ? !!n.leading : f, u = "trailing" in n ? !!n.trailing : u), Ue(e, o, {
    leading: f,
    maxWait: o,
    trailing: u
  });
}
function Ie(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Re = { exports: {} };
(function(e, o) {
  (function(n) {
    e.exports = n();
  })(function(n) {
    var f = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
    function u(c, a) {
      var r = c[0], t = c[1], s = c[2], i = c[3];
      r += (t & s | ~t & i) + a[0] - 680876936 | 0, r = (r << 7 | r >>> 25) + t | 0, i += (r & t | ~r & s) + a[1] - 389564586 | 0, i = (i << 12 | i >>> 20) + r | 0, s += (i & r | ~i & t) + a[2] + 606105819 | 0, s = (s << 17 | s >>> 15) + i | 0, t += (s & i | ~s & r) + a[3] - 1044525330 | 0, t = (t << 22 | t >>> 10) + s | 0, r += (t & s | ~t & i) + a[4] - 176418897 | 0, r = (r << 7 | r >>> 25) + t | 0, i += (r & t | ~r & s) + a[5] + 1200080426 | 0, i = (i << 12 | i >>> 20) + r | 0, s += (i & r | ~i & t) + a[6] - 1473231341 | 0, s = (s << 17 | s >>> 15) + i | 0, t += (s & i | ~s & r) + a[7] - 45705983 | 0, t = (t << 22 | t >>> 10) + s | 0, r += (t & s | ~t & i) + a[8] + 1770035416 | 0, r = (r << 7 | r >>> 25) + t | 0, i += (r & t | ~r & s) + a[9] - 1958414417 | 0, i = (i << 12 | i >>> 20) + r | 0, s += (i & r | ~i & t) + a[10] - 42063 | 0, s = (s << 17 | s >>> 15) + i | 0, t += (s & i | ~s & r) + a[11] - 1990404162 | 0, t = (t << 22 | t >>> 10) + s | 0, r += (t & s | ~t & i) + a[12] + 1804603682 | 0, r = (r << 7 | r >>> 25) + t | 0, i += (r & t | ~r & s) + a[13] - 40341101 | 0, i = (i << 12 | i >>> 20) + r | 0, s += (i & r | ~i & t) + a[14] - 1502002290 | 0, s = (s << 17 | s >>> 15) + i | 0, t += (s & i | ~s & r) + a[15] + 1236535329 | 0, t = (t << 22 | t >>> 10) + s | 0, r += (t & i | s & ~i) + a[1] - 165796510 | 0, r = (r << 5 | r >>> 27) + t | 0, i += (r & s | t & ~s) + a[6] - 1069501632 | 0, i = (i << 9 | i >>> 23) + r | 0, s += (i & t | r & ~t) + a[11] + 643717713 | 0, s = (s << 14 | s >>> 18) + i | 0, t += (s & r | i & ~r) + a[0] - 373897302 | 0, t = (t << 20 | t >>> 12) + s | 0, r += (t & i | s & ~i) + a[5] - 701558691 | 0, r = (r << 5 | r >>> 27) + t | 0, i += (r & s | t & ~s) + a[10] + 38016083 | 0, i = (i << 9 | i >>> 23) + r | 0, s += (i & t | r & ~t) + a[15] - 660478335 | 0, s = (s << 14 | s >>> 18) + i | 0, t += (s & r | i & ~r) + a[4] - 405537848 | 0, t = (t << 20 | t >>> 12) + s | 0, r += (t & i | s & ~i) + a[9] + 568446438 | 0, r = (r << 5 | r >>> 27) + t | 0, i += (r & s | t & ~s) + a[14] - 1019803690 | 0, i = (i << 9 | i >>> 23) + r | 0, s += (i & t | r & ~t) + a[3] - 187363961 | 0, s = (s << 14 | s >>> 18) + i | 0, t += (s & r | i & ~r) + a[8] + 1163531501 | 0, t = (t << 20 | t >>> 12) + s | 0, r += (t & i | s & ~i) + a[13] - 1444681467 | 0, r = (r << 5 | r >>> 27) + t | 0, i += (r & s | t & ~s) + a[2] - 51403784 | 0, i = (i << 9 | i >>> 23) + r | 0, s += (i & t | r & ~t) + a[7] + 1735328473 | 0, s = (s << 14 | s >>> 18) + i | 0, t += (s & r | i & ~r) + a[12] - 1926607734 | 0, t = (t << 20 | t >>> 12) + s | 0, r += (t ^ s ^ i) + a[5] - 378558 | 0, r = (r << 4 | r >>> 28) + t | 0, i += (r ^ t ^ s) + a[8] - 2022574463 | 0, i = (i << 11 | i >>> 21) + r | 0, s += (i ^ r ^ t) + a[11] + 1839030562 | 0, s = (s << 16 | s >>> 16) + i | 0, t += (s ^ i ^ r) + a[14] - 35309556 | 0, t = (t << 23 | t >>> 9) + s | 0, r += (t ^ s ^ i) + a[1] - 1530992060 | 0, r = (r << 4 | r >>> 28) + t | 0, i += (r ^ t ^ s) + a[4] + 1272893353 | 0, i = (i << 11 | i >>> 21) + r | 0, s += (i ^ r ^ t) + a[7] - 155497632 | 0, s = (s << 16 | s >>> 16) + i | 0, t += (s ^ i ^ r) + a[10] - 1094730640 | 0, t = (t << 23 | t >>> 9) + s | 0, r += (t ^ s ^ i) + a[13] + 681279174 | 0, r = (r << 4 | r >>> 28) + t | 0, i += (r ^ t ^ s) + a[0] - 358537222 | 0, i = (i << 11 | i >>> 21) + r | 0, s += (i ^ r ^ t) + a[3] - 722521979 | 0, s = (s << 16 | s >>> 16) + i | 0, t += (s ^ i ^ r) + a[6] + 76029189 | 0, t = (t << 23 | t >>> 9) + s | 0, r += (t ^ s ^ i) + a[9] - 640364487 | 0, r = (r << 4 | r >>> 28) + t | 0, i += (r ^ t ^ s) + a[12] - 421815835 | 0, i = (i << 11 | i >>> 21) + r | 0, s += (i ^ r ^ t) + a[15] + 530742520 | 0, s = (s << 16 | s >>> 16) + i | 0, t += (s ^ i ^ r) + a[2] - 995338651 | 0, t = (t << 23 | t >>> 9) + s | 0, r += (s ^ (t | ~i)) + a[0] - 198630844 | 0, r = (r << 6 | r >>> 26) + t | 0, i += (t ^ (r | ~s)) + a[7] + 1126891415 | 0, i = (i << 10 | i >>> 22) + r | 0, s += (r ^ (i | ~t)) + a[14] - 1416354905 | 0, s = (s << 15 | s >>> 17) + i | 0, t += (i ^ (s | ~r)) + a[5] - 57434055 | 0, t = (t << 21 | t >>> 11) + s | 0, r += (s ^ (t | ~i)) + a[12] + 1700485571 | 0, r = (r << 6 | r >>> 26) + t | 0, i += (t ^ (r | ~s)) + a[3] - 1894986606 | 0, i = (i << 10 | i >>> 22) + r | 0, s += (r ^ (i | ~t)) + a[10] - 1051523 | 0, s = (s << 15 | s >>> 17) + i | 0, t += (i ^ (s | ~r)) + a[1] - 2054922799 | 0, t = (t << 21 | t >>> 11) + s | 0, r += (s ^ (t | ~i)) + a[8] + 1873313359 | 0, r = (r << 6 | r >>> 26) + t | 0, i += (t ^ (r | ~s)) + a[15] - 30611744 | 0, i = (i << 10 | i >>> 22) + r | 0, s += (r ^ (i | ~t)) + a[6] - 1560198380 | 0, s = (s << 15 | s >>> 17) + i | 0, t += (i ^ (s | ~r)) + a[13] + 1309151649 | 0, t = (t << 21 | t >>> 11) + s | 0, r += (s ^ (t | ~i)) + a[4] - 145523070 | 0, r = (r << 6 | r >>> 26) + t | 0, i += (t ^ (r | ~s)) + a[11] - 1120210379 | 0, i = (i << 10 | i >>> 22) + r | 0, s += (r ^ (i | ~t)) + a[2] + 718787259 | 0, s = (s << 15 | s >>> 17) + i | 0, t += (i ^ (s | ~r)) + a[9] - 343485551 | 0, t = (t << 21 | t >>> 11) + s | 0, c[0] = r + c[0] | 0, c[1] = t + c[1] | 0, c[2] = s + c[2] | 0, c[3] = i + c[3] | 0;
    }
    function m(c) {
      var a = [], r;
      for (r = 0; r < 64; r += 4)
        a[r >> 2] = c.charCodeAt(r) + (c.charCodeAt(r + 1) << 8) + (c.charCodeAt(r + 2) << 16) + (c.charCodeAt(r + 3) << 24);
      return a;
    }
    function d(c) {
      var a = [], r;
      for (r = 0; r < 64; r += 4)
        a[r >> 2] = c[r] + (c[r + 1] << 8) + (c[r + 2] << 16) + (c[r + 3] << 24);
      return a;
    }
    function b(c) {
      var a = c.length, r = [1732584193, -271733879, -1732584194, 271733878], t, s, i, _, E, P;
      for (t = 64; t <= a; t += 64)
        u(r, m(c.substring(t - 64, t)));
      for (c = c.substring(t - 64), s = c.length, i = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], t = 0; t < s; t += 1)
        i[t >> 2] |= c.charCodeAt(t) << (t % 4 << 3);
      if (i[t >> 2] |= 128 << (t % 4 << 3), t > 55)
        for (u(r, i), t = 0; t < 16; t += 1)
          i[t] = 0;
      return _ = a * 8, _ = _.toString(16).match(/(.*?)(.{0,8})$/), E = parseInt(_[2], 16), P = parseInt(_[1], 16) || 0, i[14] = E, i[15] = P, u(r, i), r;
    }
    function g(c) {
      var a = c.length, r = [1732584193, -271733879, -1732584194, 271733878], t, s, i, _, E, P;
      for (t = 64; t <= a; t += 64)
        u(r, d(c.subarray(t - 64, t)));
      for (c = t - 64 < a ? c.subarray(t - 64) : new Uint8Array(0), s = c.length, i = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], t = 0; t < s; t += 1)
        i[t >> 2] |= c[t] << (t % 4 << 3);
      if (i[t >> 2] |= 128 << (t % 4 << 3), t > 55)
        for (u(r, i), t = 0; t < 16; t += 1)
          i[t] = 0;
      return _ = a * 8, _ = _.toString(16).match(/(.*?)(.{0,8})$/), E = parseInt(_[2], 16), P = parseInt(_[1], 16) || 0, i[14] = E, i[15] = P, u(r, i), r;
    }
    function l(c) {
      var a = "", r;
      for (r = 0; r < 4; r += 1)
        a += f[c >> r * 8 + 4 & 15] + f[c >> r * 8 & 15];
      return a;
    }
    function h(c) {
      var a;
      for (a = 0; a < c.length; a += 1)
        c[a] = l(c[a]);
      return c.join("");
    }
    h(b("hello")), typeof ArrayBuffer < "u" && !ArrayBuffer.prototype.slice && function() {
      function c(a, r) {
        return a = a | 0 || 0, a < 0 ? Math.max(a + r, 0) : Math.min(a, r);
      }
      ArrayBuffer.prototype.slice = function(a, r) {
        var t = this.byteLength, s = c(a, t), i = t, _, E, P, R;
        return r !== n && (i = c(r, t)), s > i ? new ArrayBuffer(0) : (_ = i - s, E = new ArrayBuffer(_), P = new Uint8Array(E), R = new Uint8Array(this, s, _), P.set(R), E);
      };
    }();
    function y(c) {
      return /[\u0080-\uFFFF]/.test(c) && (c = unescape(encodeURIComponent(c))), c;
    }
    function w(c, a) {
      var r = c.length, t = new ArrayBuffer(r), s = new Uint8Array(t), i;
      for (i = 0; i < r; i += 1)
        s[i] = c.charCodeAt(i);
      return a ? s : t;
    }
    function v(c) {
      return String.fromCharCode.apply(null, new Uint8Array(c));
    }
    function A(c, a, r) {
      var t = new Uint8Array(c.byteLength + a.byteLength);
      return t.set(new Uint8Array(c)), t.set(new Uint8Array(a), c.byteLength), r ? t : t.buffer;
    }
    function j(c) {
      var a = [], r = c.length, t;
      for (t = 0; t < r - 1; t += 2)
        a.push(parseInt(c.substr(t, 2), 16));
      return String.fromCharCode.apply(String, a);
    }
    function p() {
      this.reset();
    }
    return p.prototype.append = function(c) {
      return this.appendBinary(y(c)), this;
    }, p.prototype.appendBinary = function(c) {
      this._buff += c, this._length += c.length;
      var a = this._buff.length, r;
      for (r = 64; r <= a; r += 64)
        u(this._hash, m(this._buff.substring(r - 64, r)));
      return this._buff = this._buff.substring(r - 64), this;
    }, p.prototype.end = function(c) {
      var a = this._buff, r = a.length, t, s = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], i;
      for (t = 0; t < r; t += 1)
        s[t >> 2] |= a.charCodeAt(t) << (t % 4 << 3);
      return this._finish(s, r), i = h(this._hash), c && (i = j(i)), this.reset(), i;
    }, p.prototype.reset = function() {
      return this._buff = "", this._length = 0, this._hash = [1732584193, -271733879, -1732584194, 271733878], this;
    }, p.prototype.getState = function() {
      return {
        buff: this._buff,
        length: this._length,
        hash: this._hash.slice()
      };
    }, p.prototype.setState = function(c) {
      return this._buff = c.buff, this._length = c.length, this._hash = c.hash, this;
    }, p.prototype.destroy = function() {
      delete this._hash, delete this._buff, delete this._length;
    }, p.prototype._finish = function(c, a) {
      var r = a, t, s, i;
      if (c[r >> 2] |= 128 << (r % 4 << 3), r > 55)
        for (u(this._hash, c), r = 0; r < 16; r += 1)
          c[r] = 0;
      t = this._length * 8, t = t.toString(16).match(/(.*?)(.{0,8})$/), s = parseInt(t[2], 16), i = parseInt(t[1], 16) || 0, c[14] = s, c[15] = i, u(this._hash, c);
    }, p.hash = function(c, a) {
      return p.hashBinary(y(c), a);
    }, p.hashBinary = function(c, a) {
      var r = b(c), t = h(r);
      return a ? j(t) : t;
    }, p.ArrayBuffer = function() {
      this.reset();
    }, p.ArrayBuffer.prototype.append = function(c) {
      var a = A(this._buff.buffer, c, !0), r = a.length, t;
      for (this._length += c.byteLength, t = 64; t <= r; t += 64)
        u(this._hash, d(a.subarray(t - 64, t)));
      return this._buff = t - 64 < r ? new Uint8Array(a.buffer.slice(t - 64)) : new Uint8Array(0), this;
    }, p.ArrayBuffer.prototype.end = function(c) {
      var a = this._buff, r = a.length, t = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], s, i;
      for (s = 0; s < r; s += 1)
        t[s >> 2] |= a[s] << (s % 4 << 3);
      return this._finish(t, r), i = h(this._hash), c && (i = j(i)), this.reset(), i;
    }, p.ArrayBuffer.prototype.reset = function() {
      return this._buff = new Uint8Array(0), this._length = 0, this._hash = [1732584193, -271733879, -1732584194, 271733878], this;
    }, p.ArrayBuffer.prototype.getState = function() {
      var c = p.prototype.getState.call(this);
      return c.buff = v(c.buff), c;
    }, p.ArrayBuffer.prototype.setState = function(c) {
      return c.buff = w(c.buff, !0), p.prototype.setState.call(this, c);
    }, p.ArrayBuffer.prototype.destroy = p.prototype.destroy, p.ArrayBuffer.prototype._finish = p.prototype._finish, p.ArrayBuffer.hash = function(c, a) {
      var r = g(new Uint8Array(c)), t = h(r);
      return a ? j(t) : t;
    }, p;
  });
})(Re);
var kr = Re.exports;
const en = /* @__PURE__ */ Ie(kr), q = (e) => typeof e == "function" ? e() : e;
function B(e) {
  return !(e && (typeof e != "object" || (Array.isArray(e) ? e.length : Object.keys(e).length)));
}
function tn(e) {
  for (var o = [], n = 0; n < e.length; ) {
    var f = e[n];
    if (f === "*" || f === "+" || f === "?") {
      o.push({ type: "MODIFIER", index: n, value: e[n++] });
      continue;
    }
    if (f === "\\") {
      o.push({ type: "ESCAPED_CHAR", index: n++, value: e[n++] });
      continue;
    }
    if (f === "{") {
      o.push({ type: "OPEN", index: n, value: e[n++] });
      continue;
    }
    if (f === "}") {
      o.push({ type: "CLOSE", index: n, value: e[n++] });
      continue;
    }
    if (f === ":") {
      for (var u = "", m = n + 1; m < e.length; ) {
        var d = e.charCodeAt(m);
        if (
          // `0-9`
          d >= 48 && d <= 57 || // `A-Z`
          d >= 65 && d <= 90 || // `a-z`
          d >= 97 && d <= 122 || // `_`
          d === 95
        ) {
          u += e[m++];
          continue;
        }
        break;
      }
      if (!u)
        throw new TypeError("Missing parameter name at ".concat(n));
      o.push({ type: "NAME", index: n, value: u }), n = m;
      continue;
    }
    if (f === "(") {
      var b = 1, g = "", m = n + 1;
      if (e[m] === "?")
        throw new TypeError('Pattern cannot start with "?" at '.concat(m));
      for (; m < e.length; ) {
        if (e[m] === "\\") {
          g += e[m++] + e[m++];
          continue;
        }
        if (e[m] === ")") {
          if (b--, b === 0) {
            m++;
            break;
          }
        } else if (e[m] === "(" && (b++, e[m + 1] !== "?"))
          throw new TypeError("Capturing groups are not allowed at ".concat(m));
        g += e[m++];
      }
      if (b)
        throw new TypeError("Unbalanced pattern at ".concat(n));
      if (!g)
        throw new TypeError("Missing pattern at ".concat(n));
      o.push({ type: "PATTERN", index: n, value: g }), n = m;
      continue;
    }
    o.push({ type: "CHAR", index: n, value: e[n++] });
  }
  return o.push({ type: "END", index: n, value: "" }), o;
}
function rn(e, o) {
  o === void 0 && (o = {});
  for (var n = tn(e), f = o.prefixes, u = f === void 0 ? "./" : f, m = "[^".concat(M(o.delimiter || "/#?"), "]+?"), d = [], b = 0, g = 0, l = "", h = function(i) {
    if (g < n.length && n[g].type === i)
      return n[g++].value;
  }, y = function(i) {
    var _ = h(i);
    if (_ !== void 0)
      return _;
    var E = n[g], P = E.type, R = E.index;
    throw new TypeError("Unexpected ".concat(P, " at ").concat(R, ", expected ").concat(i));
  }, w = function() {
    for (var i = "", _; _ = h("CHAR") || h("ESCAPED_CHAR"); )
      i += _;
    return i;
  }; g < n.length; ) {
    var v = h("CHAR"), A = h("NAME"), j = h("PATTERN");
    if (A || j) {
      var p = v || "";
      u.indexOf(p) === -1 && (l += p, p = ""), l && (d.push(l), l = ""), d.push({
        name: A || b++,
        prefix: p,
        suffix: "",
        pattern: j || m,
        modifier: h("MODIFIER") || ""
      });
      continue;
    }
    var c = v || h("ESCAPED_CHAR");
    if (c) {
      l += c;
      continue;
    }
    l && (d.push(l), l = "");
    var a = h("OPEN");
    if (a) {
      var p = w(), r = h("NAME") || "", t = h("PATTERN") || "", s = w();
      y("CLOSE"), d.push({
        name: r || (t ? b++ : ""),
        pattern: r && !t ? m : t,
        prefix: p,
        suffix: s,
        modifier: h("MODIFIER") || ""
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
function nn(e, o) {
  if (!o)
    return e;
  for (var n = /\((?:\?<(.*?)>)?(?!\?)/g, f = 0, u = n.exec(e.source); u; )
    o.push({
      // Use parenthesized substring match if available, index otherwise
      name: u[1] || f++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    }), u = n.exec(e.source);
  return e;
}
function on(e, o, n) {
  var f = e.map(function(u) {
    return Be(u, o, n).source;
  });
  return new RegExp("(?:".concat(f.join("|"), ")"), Me(n));
}
function sn(e, o, n) {
  return an(rn(e, n), o, n);
}
function an(e, o, n) {
  n === void 0 && (n = {});
  for (var f = n.strict, u = f === void 0 ? !1 : f, m = n.start, d = m === void 0 ? !0 : m, b = n.end, g = b === void 0 ? !0 : b, l = n.encode, h = l === void 0 ? function(R) {
    return R;
  } : l, y = n.delimiter, w = y === void 0 ? "/#?" : y, v = n.endsWith, A = v === void 0 ? "" : v, j = "[".concat(M(A), "]|$"), p = "[".concat(M(w), "]"), c = d ? "^" : "", a = 0, r = e; a < r.length; a++) {
    var t = r[a];
    if (typeof t == "string")
      c += M(h(t));
    else {
      var s = M(h(t.prefix)), i = M(h(t.suffix));
      if (t.pattern)
        if (o && o.push(t), s || i)
          if (t.modifier === "+" || t.modifier === "*") {
            var _ = t.modifier === "*" ? "?" : "";
            c += "(?:".concat(s, "((?:").concat(t.pattern, ")(?:").concat(i).concat(s, "(?:").concat(t.pattern, "))*)").concat(i, ")").concat(_);
          } else
            c += "(?:".concat(s, "(").concat(t.pattern, ")").concat(i, ")").concat(t.modifier);
        else
          t.modifier === "+" || t.modifier === "*" ? c += "((?:".concat(t.pattern, ")").concat(t.modifier, ")") : c += "(".concat(t.pattern, ")").concat(t.modifier);
      else
        c += "(?:".concat(s).concat(i, ")").concat(t.modifier);
    }
  }
  if (g)
    u || (c += "".concat(p, "?")), c += n.endsWith ? "(?=".concat(j, ")") : "$";
  else {
    var E = e[e.length - 1], P = typeof E == "string" ? p.indexOf(E[E.length - 1]) > -1 : E === void 0;
    u || (c += "(?:".concat(p, "(?=").concat(j, "))?")), P || (c += "(?=".concat(p, "|").concat(j, ")"));
  }
  return new RegExp(c, Me(n));
}
function Be(e, o, n) {
  return e instanceof RegExp ? nn(e, o) : Array.isArray(e) ? on(e, o, n) : sn(e, o, n);
}
const Le = "_$mockHttp", De = typeof window < "u", Fe = De ? window.top || window : {}, Ne = () => Fe[Le] || {
  isMock: !1,
  mockData: []
}, re = (e) => {
  const o = Ne();
  Fe[Le] = Object.assign(o, e);
}, cn = (e) => {
  re({ mockData: e });
}, fn = () => {
  re({ isMock: !0 });
}, un = () => {
  re({ isMock: !0 });
};
if (De) {
  const e = window.fetch;
  window.fetch = async function(...o) {
    var f;
    const n = Ne();
    if (n.isMock && o[0] !== null) {
      let u, m = "";
      typeof o[0] == "object" ? (u = o[0], m = u.url) : (u = o[1], m = o[0]);
      const d = new URL(m, "http://localhost"), b = (f = n.mockData) == null ? void 0 : f.find((g) => {
        if (!g || !g.url || g.method && g.method.toUpperCase() !== (u == null ? void 0 : u.method))
          return !1;
        const l = new URL(g.url, "http://localhost"), h = new URLSearchParams(l.search), y = new URLSearchParams(d.search);
        for (const [w, v] of h)
          if (y.get(w) !== v)
            return !1;
        return Be(l.pathname).test(d.pathname);
      });
      if (b) {
        const { response: g, timeout: l, statusCode: h } = b;
        l && await new Promise((w) => setTimeout(w, l));
        const y = typeof g == "function" ? g(u) : g;
        return console.debug("mock success: " + m), console.debug(y), y instanceof Response ? Promise.resolve(y) : Promise.resolve(
          new Response(JSON.stringify(y), {
            status: h || 200,
            headers: { "Content-Type": "application/json" }
          })
        );
      }
    }
    return e.apply(this, o);
  };
}
var We = /* @__PURE__ */ ((e) => (e.Json = "application/json;charset=UTF-8", e.FormURLEncoded = "application/x-www-form-urlencoded;charset=UTF-8", e.FormData = "multipart/form-data;charset=UTF-8", e))(We || {});
class ln {
  constructor() {
    T(this, "key", "");
    T(this, "fetchPromise");
    /**
     * 服务基础路径
     */
    T(this, "baseURL", "");
    /**
     * 请求路径
     */
    T(this, "path", "");
    /**
     * 请求全路径
     */
    T(this, "url", "");
    T(this, "originUrl", "");
    /**
     * 请求结果
     */
    T(this, "result", null);
    /**
     * 请求参数
     */
    T(this, "requestOptions", {});
    /**
     * 请求信息
     */
    T(this, "request");
    /**
     * 请求体
     */
    T(this, "requestBody");
    /**
     * 请求返回信息
     */
    T(this, "response");
  }
}
class k {
  constructor(o) {
    /**
     * 服务基础路径
     */
    T(this, "baseURL");
    /**
     * 指定请求超时的毫秒数（默认永不超时，Chrome中网络请求超时为300秒，Firefox中为90秒）
     */
    T(this, "timeout");
    /**
     * 服务中间件
     */
    T(this, "middlewares");
    this.baseURL = o || "", this.middlewares = [];
  }
  normalizeUrl(o) {
    return o.toString().replace(/(^\/+|\/+$)/g, "");
  }
  normalizeUrlParams(o, n) {
    if (B(n))
      return "";
    const f = ~o.indexOf("?") ? "&" : "?";
    return typeof n == "object" ? f + Object.entries(n).map(
      (u) => encodeURIComponent(u[0]) + "=" + encodeURIComponent(u[1] === void 0 || u[1] === null ? "" : u[1])
    ).join("&") : n !== "" ? f + q(n) : "";
  }
}
class hn {
  constructor(o) {
    T(this, "middlewares");
    T(this, "options");
    T(this, "pendingMap");
    T(this, "capture");
    T(this, "onceCapture");
    T(this, "history");
    T(this, "setMockData", cn);
    T(this, "openMock", fn);
    T(this, "closeMock", un);
    this.middlewares = [], this.pendingMap = /* @__PURE__ */ new Map(), this.history = [], o instanceof k ? this.options = o : this.options = new k(o);
  }
  /**
   * 新增中间件
   * @param middleware 中间件
   */
  use(o) {
    return this.middlewares.push(o), this;
  }
  getUrl(o, n, f = "") {
    let u = o ? new URL(n, new URL(o, window.location.href).toString()).toString() : n;
    return f && (u += this.options.normalizeUrlParams(u, f)), u;
  }
  createContext(o, n = {}) {
    const f = this.options, u = q(f.baseURL);
    let m = q(o);
    m = f.normalizeUrl(encodeURI(m));
    let d = new ln();
    d.baseURL = u, d.path = m, d.originUrl = this.getUrl(u, m), n.params ? d.url = d.originUrl + this.options.normalizeUrlParams(d.originUrl, n.params) : d.url = d.originUrl, d.requestOptions = {
      headers: {},
      timeout: f.timeout,
      ...n
    };
    const b = !B(n == null ? void 0 : n.body);
    let g = !1;
    const l = new en();
    l.append(n.method || ""), l.append(d.url), b && (g = O(n.body), d.requestBody = n.body, n.body instanceof URLSearchParams ? l.append(n.body.toString()) : n.body instanceof FormData ? l.append(
      Array.from(n.body).map(([y, w]) => y.toString() + "=" + w.toString()).join("&")
    ) : g && l.append(JSON.stringify(n.body))), d.key = l.end();
    const h = this.pendingMap.get(d.key);
    if (h)
      console.info(
        "[WebCore Http]: The same request is being executed, and this request has been cancelled. url: " + d.url
      ), d = h;
    else if (this.pendingMap.set(d.key, d), b && g) {
      let y = !1;
      const w = new FormData();
      for (const v in n.body)
        if (Object.prototype.hasOwnProperty.call(n.body, v)) {
          const A = n.body[v];
          A instanceof Blob && (y = !0), w.append(v, A);
        }
      y && (d.requestBody = w, d.requestOptions.body = w);
    }
    return d;
  }
  createRequest(o, n = {}, f = []) {
    const u = this.createContext(o, n), m = this.options;
    let d = [];
    typeof m.middlewares == "function" && (d = d.concat(q(m.middlewares))), d = d.concat(this.middlewares), f && (typeof f == "function" ? (d.push(f), u.fetchPromise = void 0) : f instanceof Array && f.length > 0 && (d = d.concat(f), u.fetchPromise = void 0));
    const b = (g) => {
      const l = d[g];
      if (!l) {
        if (u.requestOptions.timeout && !u.requestOptions.signal) {
          const h = new AbortController();
          u.requestOptions.signal = h.signal, setTimeout(() => h.abort(), u.requestOptions.timeout);
        }
        return u.request = new Request(u.url, u.requestOptions), fetch(u.request).then((h) => (u.response = h, h)).finally(() => {
          this.pendingMap.has(u.key) && window.setTimeout(() => {
            this.pendingMap.delete(u.key);
          }, 600);
        });
      }
      try {
        return Promise.resolve(l(u, b.bind(null, g + 1)));
      } catch (h) {
        return Promise.reject(h);
      }
    };
    return u.fetchPromise || (u.fetchPromise = b(0).then((g) => {
      if (this.capture) {
        const l = !B(u.requestOptions.body), h = !B(u.requestOptions.params), y = {
          api: u.originUrl,
          method: u.requestOptions.method,
          headers: u.requestOptions.headers,
          data: l ? u.requestOptions.body : h ? JSON.stringify(u.requestOptions.params) : null,
          hasParams: h
        };
        this.history.push(y), this.onceCapture && (this.capture = !1, this.onceCapture(y), this.onceCapture = void 0);
      }
      return g;
    })), u.fetchPromise.then((g) => d.length > 0 ? u.result : g);
  }
  request(o, n = {}, f = []) {
    if (n.throttle !== void 0 && n.debounce !== void 0)
      throw new Error("throttle and debounce cannot be set at the same time");
    return n.throttle ? new Promise((u) => {
      Qr(() => u(this.createRequest(o, n, f)), n.throttle);
    }) : n.debounce ? new Promise((u) => {
      Ue(() => u(this.createRequest(o, n, f)), n.debounce);
    }) : this.createRequest(o, n, f);
  }
  get(o, n, f = {}, u = []) {
    return f.method = "GET", f.params = n, this.request(o, f, u);
  }
  post(o, n, f = {}, u = []) {
    return f.method = "POST", f.body = n, this.request(o, f, u);
  }
  patch(o, n = {}, f = []) {
    return n.method = "PATCH", this.request(o, n, f);
  }
  put(o, n = {}, f = []) {
    return n.method = "PUT", this.request(o, n, f);
  }
  delete(o, n = {}, f = []) {
    return n.method = "DELETE", this.request(o, n, f);
  }
  upload(o, n, f = {}, u = []) {
    return f.method = "POST", f.body = n, this.request(o, f, u);
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
class pn {
  constructor() {
    T(this, "items");
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
  add(o, n) {
    this.items[o] = n;
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
    for (const n in this.items)
      this.has(n) && o.push(this.items[n]);
    return o;
  }
  /**
   * 循环字典子元素
   * @param func 入参为key和value
   */
  map(o) {
    for (const n in this.items)
      if (this.has(n)) {
        const f = this.items[n];
        o(n, f);
      }
  }
  /**
   * 查看字典中元素的个数
   */
  count() {
    let o = 0;
    for (const n in this.items)
      this.has(n) && o++;
    return o;
  }
}
var qe = { exports: {} };
(function(e) {
  var o = Object.prototype.hasOwnProperty, n = "~";
  function f() {
  }
  Object.create && (f.prototype = /* @__PURE__ */ Object.create(null), new f().__proto__ || (n = !1));
  function u(g, l, h) {
    this.fn = g, this.context = l, this.once = h || !1;
  }
  function m(g, l, h, y, w) {
    if (typeof h != "function")
      throw new TypeError("The listener must be a function");
    var v = new u(h, y || g, w), A = n ? n + l : l;
    return g._events[A] ? g._events[A].fn ? g._events[A] = [g._events[A], v] : g._events[A].push(v) : (g._events[A] = v, g._eventsCount++), g;
  }
  function d(g, l) {
    --g._eventsCount === 0 ? g._events = new f() : delete g._events[l];
  }
  function b() {
    this._events = new f(), this._eventsCount = 0;
  }
  b.prototype.eventNames = function() {
    var l = [], h, y;
    if (this._eventsCount === 0)
      return l;
    for (y in h = this._events)
      o.call(h, y) && l.push(n ? y.slice(1) : y);
    return Object.getOwnPropertySymbols ? l.concat(Object.getOwnPropertySymbols(h)) : l;
  }, b.prototype.listeners = function(l) {
    var h = n ? n + l : l, y = this._events[h];
    if (!y)
      return [];
    if (y.fn)
      return [y.fn];
    for (var w = 0, v = y.length, A = new Array(v); w < v; w++)
      A[w] = y[w].fn;
    return A;
  }, b.prototype.listenerCount = function(l) {
    var h = n ? n + l : l, y = this._events[h];
    return y ? y.fn ? 1 : y.length : 0;
  }, b.prototype.emit = function(l, h, y, w, v, A) {
    var j = n ? n + l : l;
    if (!this._events[j])
      return !1;
    var p = this._events[j], c = arguments.length, a, r;
    if (p.fn) {
      switch (p.once && this.removeListener(l, p.fn, void 0, !0), c) {
        case 1:
          return p.fn.call(p.context), !0;
        case 2:
          return p.fn.call(p.context, h), !0;
        case 3:
          return p.fn.call(p.context, h, y), !0;
        case 4:
          return p.fn.call(p.context, h, y, w), !0;
        case 5:
          return p.fn.call(p.context, h, y, w, v), !0;
        case 6:
          return p.fn.call(p.context, h, y, w, v, A), !0;
      }
      for (r = 1, a = new Array(c - 1); r < c; r++)
        a[r - 1] = arguments[r];
      p.fn.apply(p.context, a);
    } else {
      var t = p.length, s;
      for (r = 0; r < t; r++)
        switch (p[r].once && this.removeListener(l, p[r].fn, void 0, !0), c) {
          case 1:
            p[r].fn.call(p[r].context);
            break;
          case 2:
            p[r].fn.call(p[r].context, h);
            break;
          case 3:
            p[r].fn.call(p[r].context, h, y);
            break;
          case 4:
            p[r].fn.call(p[r].context, h, y, w);
            break;
          default:
            if (!a)
              for (s = 1, a = new Array(c - 1); s < c; s++)
                a[s - 1] = arguments[s];
            p[r].fn.apply(p[r].context, a);
        }
    }
    return !0;
  }, b.prototype.on = function(l, h, y) {
    return m(this, l, h, y, !1);
  }, b.prototype.once = function(l, h, y) {
    return m(this, l, h, y, !0);
  }, b.prototype.removeListener = function(l, h, y, w) {
    var v = n ? n + l : l;
    if (!this._events[v])
      return this;
    if (!h)
      return d(this, v), this;
    var A = this._events[v];
    if (A.fn)
      A.fn === h && (!w || A.once) && (!y || A.context === y) && d(this, v);
    else {
      for (var j = 0, p = [], c = A.length; j < c; j++)
        (A[j].fn !== h || w && !A[j].once || y && A[j].context !== y) && p.push(A[j]);
      p.length ? this._events[v] = p.length === 1 ? p[0] : p : d(this, v);
    }
    return this;
  }, b.prototype.removeAllListeners = function(l) {
    var h;
    return l ? (h = n ? n + l : l, this._events[h] && d(this, h)) : (this._events = new f(), this._eventsCount = 0), this;
  }, b.prototype.off = b.prototype.removeListener, b.prototype.addListener = b.prototype.on, b.prefixed = n, b.EventEmitter = b, e.exports = b;
})(qe);
var dn = qe.exports;
const gn = /* @__PURE__ */ Ie(dn);
class yn extends gn {
}
const ee = "_ipc";
class mn {
  constructor(o = null) {
    /**
     * 事件触发器
     */
    T(this, "emitter");
    /**
     * iframe窗口对象
     */
    T(this, "contentWindow", null);
    /**
     * 是否跨域
     */
    T(this, "isCrossOrigin", !1);
    if (this.emitter = new yn(), o) {
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
  send(o, n) {
    if (this.isCrossOrigin && this.contentWindow)
      this.contentWindow.postMessage(
        {
          event: o,
          args: n
        },
        "*"
      );
    else {
      if (this.contentWindow) {
        const f = this.contentWindow[ee];
        if (f) {
          f.send(o, n);
          return;
        }
      }
      this.emitter.emit(o, n);
    }
  }
}
class ne {
  constructor() {
    /**
     * 目标监听器清单
     */
    T(this, "targets");
    T(this, "sendingEvents", /* @__PURE__ */ new Set());
    this.targets = new pn();
  }
  static init() {
    const o = new ne();
    if (typeof window < "u") {
      const n = window[ee];
      if (n)
        return n;
      window[ee] = o;
    }
    return o;
  }
  /**
   * 添加目标监听器
   * @param key 目标名称
   */
  addTarget(o, n = null) {
    const f = this.targets.items[o];
    if (f) {
      f.contentWindow = n;
      return;
    }
    this.targets.add(o, new mn(n));
  }
  /**
   * 删除目标监听器
   * @param key 目标名称
   */
  removeTarget(o) {
    this.targets.remove(o);
  }
  remove(o, n, f) {
    var u;
    return typeof n == "function" && (f = n, n = "*"), n && f ? (u = this.targets.get(n)) == null || u.emitter.removeListener(o, f) : this.targets.map((m, d) => {
      d.emitter.removeAllListeners(o);
    }), this;
  }
  on(o, n, f) {
    var u;
    return typeof n == "function" && (f = n, n = "*"), f && (this.addTarget(n), (u = this.targets.get(n)) == null || u.emitter.on(o, f)), this;
  }
  once(o, n, f) {
    var u;
    return typeof n == "function" && (f = n, n = "*"), f && (this.addTarget(n), (u = this.targets.get(n)) == null || u.emitter.once(o, f)), this;
  }
  /**
   * 执行所有监听器
   * @param event 事件名
   * @param args 参数
   */
  send(o, n) {
    this.sendingEvents.has(o) || (this.sendingEvents.add(o), this.targets.map((f, u) => {
      u.send(o, n);
    }), this.sendingEvents.delete(o));
  }
}
var He = /* @__PURE__ */ ((e) => (e.Mobile = "APP", e.Desktop = "WEB", e.NODE_JS = "NodeJs", e))(He || {});
const C = {
  ipc: null,
  config: {
    baseUrl: "",
    languageCodes: ["zh-CN", "en-US"]
  },
  platform: function() {
    return typeof window < "u" ? typeof window.APP !== void 0 && typeof window.APP < "u" ? "APP" : "WEB" : "NodeJs";
  }(),
  getLanguage() {
    let e = "zh-CN";
    switch (this.platform) {
      case "APP":
        e = window.APP.getLanguage();
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
        return window.APP.getToken();
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
        return window.APP.getOrgId();
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
        return window.APP.getEnterpriseId();
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
};
class te extends Error {
  constructor(n, f, u, m = "") {
    var d;
    super();
    T(this, "code", -1);
    T(this, "status", "");
    T(this, "type", "");
    T(this, "description", "");
    this.message = n, this.name = "CustomError", this.code = f, this.status = u, this.type = "error", this.description = m, (d = C.ipc.targets.get("_self")) == null || d.send("custom_error", this);
  }
}
class bn extends te {
  constructor(o, n, f, u = "") {
    super(o, n, f, u), this.name = "OperationError";
  }
}
const Je = typeof window < "u", wn = Je ? null : require("node:path"), vn = Je ? null : require("node:fs");
function Un() {
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
      }, o = wn.resolve(process.cwd(), "public", "version.json");
      vn.writeFileSync(o, JSON.stringify(e));
    }
  };
}
let J = "";
const Te = 2;
let W = 0;
const Tn = function() {
  W++, W >= Te && (console.error(`获取资源超过错误次数阈值[${Te}]，触发版本检查！`), W = -9999, _n()), setTimeout(() => {
    W = 0;
  }, 1500);
}, An = () => {
  if (typeof window < "u") {
    if (window._version)
      return;
    fetch("/version.json?_t=" + (/* @__PURE__ */ new Date()).getTime()).then((o) => o.json()).then((o) => {
      J = o.version, window._version = J;
    }), window.addEventListener(
      "error",
      function(o) {
        const n = o.target;
        (n.tagName === "SCRIPT" || n.tagName === "LINK" || n.tagName === "IMG") && Tn();
      },
      !0
    );
  }
}, _n = () => {
  typeof window < "u" && window._version && fetch("/version.json?_t=" + (/* @__PURE__ */ new Date()).getTime()).then((e) => e.json()).then((e) => {
    if (J && J !== e.version)
      throw new bn(
        `[${e.version}] 有新的内容更新，请在保存页面数据后，刷新页面重新载入！`,
        404,
        404
      );
  });
}, ze = typeof window < "u", Ae = ze ? null : require("node:path"), Sn = ze ? null : require("swagger-typescript-api");
function In(e) {
  if (!e || !e.baseUrl || !e.inputs)
    return null;
  const o = e.inputs.split(",");
  return o.length === 0 ? (console.log("swagger-api-gen: No input modules found."), null) : {
    name: "swagger-api-gen",
    enforce: "pre",
    apply: "serve",
    async buildStart() {
      for await (const n of o) {
        const f = `/api/${n}`;
        await Sn.generateApi({
          name: n,
          url: `${e.baseUrl}${f}/v3/api-docs`,
          output: Ae.resolve(process.cwd(), (e == null ? void 0 : e.output) || "./src/api"),
          templates: Ae.resolve(process.cwd(), (e == null ? void 0 : e.templates) || "./plugins/swagger-templates"),
          singleHttpClient: !0,
          httpClientType: "fetch",
          // @ts-ignore
          apiClassName: `${n[0].toUpperCase() + n.slice(1)}Api`,
          apiPrefix: f,
          importModules: 'import { Http } from "@/types/web-core";',
          hooks: {
            onFormatRouteName: (u, m) => /\d/.test(m) && u.operationId.includes("_") ? u.operationId.split("_", 1)[0] : m
          }
        }).catch((u) => console.error(u));
      }
    }
  };
}
const jn = "YYYY-MM-DD HH:mm:ss";
function Ve(e) {
  for (const o in e) {
    if (e[o] && e[o]._isAMomentObject && (e[o] = e[o].format(jn)), we(o)) {
      const n = e[o];
      if (n)
        try {
          e[o] = we(n) ? n.trim() : n;
        } catch (f) {
          throw new Error(f);
        }
    }
    O(e[o]) && Ve(e[o]);
  }
}
const En = async (e, o) => {
  const n = e.requestOptions.body;
  n && Object.prototype.toString.call(n) === "[object Object]" && Ve(n), await o();
}, Pn = async (e, o) => {
  var m, d, b, g;
  const n = e.requestOptions, f = n.body;
  if (!(f instanceof FormData) && !(f instanceof URLSearchParams)) {
    let l = !0;
    const h = n.headers, y = B(h) ? null : h == null ? void 0 : h["Content-Type"];
    y ? l = y.startsWith("application/json") : h["Content-Type"] = We.Json, l && typeof f == "object" && (n.body = JSON.stringify(f));
  }
  if (await o(), e.result || (m = e.response) != null && m.bodyUsed)
    return;
  const u = ((d = e.response) == null ? void 0 : d.headers.get("Content-Type")) || "";
  (b = e.response) != null && b.ok && (u != null && u.startsWith("application/json")) && (e.result = await ((g = e.response) == null ? void 0 : g.json()));
}, Cn = async (e, o) => {
  var m, d, b, g;
  const f = e.requestOptions.headers, u = C.getToken();
  if (u && ve(f.Authorization) && (f.Authorization = `Bearer ${u}`), u && ve(f.Authorization) && (f.Authorization = `Bearer ${u}`), f.eid = C.getEnterpriseId(), f.oid = C.getOrgId(), f["Accept-Language"] = C.getLanguage(), f["X-TZ-Offset"] = (/* @__PURE__ */ new Date()).getTimezoneOffset().toString(), await o(), !((m = e.response) != null && m.ok)) {
    const l = new Error("An error occurred while fetching the data.");
    throw l.message = `${(d = e.response) == null ? void 0 : d.status}|${await ((b = e.response) == null ? void 0 : b.text()) || ""}`, l;
  }
  if (((g = e.response) == null ? void 0 : g.status) !== 200)
    throw new te(JSON.stringify(e.result), 500, e.response.status);
  if (!e.requestOptions.returnNativeResponse && e.result) {
    const l = e.result;
    if (l.code === 0 || l.code === 200)
      e.result = l.data;
    else if (l.message)
      throw new te(l.message, l.code, e.response.status, JSON.stringify(l));
  }
}, $n = async (e, o) => {
  if (e.url.lastIndexOf("_t=") <= 0) {
    const n = (/* @__PURE__ */ new Date()).getTime();
    e.url += `${e.url.lastIndexOf("?") > 0 ? "&" : "?"}_t=${n}`;
  }
  await o();
}, oe = new k();
oe.baseURL = () => {
  switch (C.platform) {
    case He.Mobile:
      return window.APP.getURL();
    default:
      return C.config.baseUrl || location.origin;
  }
};
oe.middlewares = () => [Cn, Pn, En, $n];
const On = new hn(oe);
typeof window < "u" && (C.ipc = ne.init(), C.ipc.addTarget("_self", window), window.http = On, window.fw = C, An());
export {
  te as CustomError,
  pn as Dictionary,
  ne as EventBus,
  hn as Http,
  Un as autoCheckUpdates,
  In as swaggerApiGen
};
