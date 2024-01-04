var Ge = Object.defineProperty;
var Ke = (e, o, n) => o in e ? Ge(e, o, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[o] = n;
var A = (e, o, n) => (Ke(e, typeof o != "symbol" ? o + "" : o, n), n);
var Ye = typeof global == "object" && global && global.Object === Object && global;
const _e = Ye;
var Xe = typeof self == "object" && self && self.Object === Object && self, Ze = _e || Xe || Function("return this")();
const $ = Ze;
var Qe = $.Symbol;
const H = Qe;
var je = Object.prototype, ke = je.hasOwnProperty, et = je.toString, B = H ? H.toStringTag : void 0;
function tt(e) {
  var o = ke.call(e, B), n = e[B];
  try {
    e[B] = void 0;
    var f = !0;
  } catch {
  }
  var u = et.call(e);
  return f && (o ? e[B] = n : delete e[B]), u;
}
var rt = Object.prototype, nt = rt.toString;
function ot(e) {
  return nt.call(e);
}
var it = "[object Null]", st = "[object Undefined]", ie = H ? H.toStringTag : void 0;
function I(e) {
  return e == null ? e === void 0 ? st : it : ie && ie in Object(e) ? tt(e) : ot(e);
}
function D(e) {
  return e != null && typeof e == "object";
}
var at = "[object Symbol]";
function ct(e) {
  return typeof e == "symbol" || D(e) && I(e) == at;
}
var ft = Array.isArray;
const Ee = ft;
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
function x(e) {
  var o = typeof e;
  return e != null && (o == "object" || o == "function");
}
var se = 0 / 0, dt = /^[-+]0x[0-9a-f]+$/i, gt = /^0b[01]+$/i, yt = /^0o[0-7]+$/i, mt = parseInt;
function ae(e) {
  if (typeof e == "number")
    return e;
  if (ct(e))
    return se;
  if (x(e)) {
    var o = typeof e.valueOf == "function" ? e.valueOf() : e;
    e = x(o) ? o + "" : o;
  }
  if (typeof e != "string")
    return e === 0 ? e : +e;
  e = pt(e);
  var n = gt.test(e);
  return n || yt.test(e) ? mt(e.slice(2), n ? 2 : 8) : dt.test(e) ? se : +e;
}
var bt = "[object AsyncFunction]", wt = "[object Function]", vt = "[object GeneratorFunction]", Tt = "[object Proxy]";
function Se(e) {
  if (!x(e))
    return !1;
  var o = I(e);
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
var jt = Function.prototype, Et = jt.toString;
function M(e) {
  if (e != null) {
    try {
      return Et.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var St = /[\\^$.*+?()[\]{}|]/g, Pt = /^\[object .+?Constructor\]$/, Ct = Function.prototype, $t = Object.prototype, xt = Ct.toString, Ot = $t.hasOwnProperty, It = RegExp(
  "^" + xt.call(Ot).replace(St, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function Mt(e) {
  if (!x(e) || _t(e))
    return !1;
  var o = Se(e) ? It : Pt;
  return o.test(M(e));
}
function Rt(e, o) {
  return e == null ? void 0 : e[o];
}
function F(e, o) {
  var n = Rt(e, o);
  return Mt(n) ? n : void 0;
}
var Ut = F($, "WeakMap");
const K = Ut;
var Bt = 9007199254740991;
function Pe(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= Bt;
}
function Lt(e) {
  return e != null && Pe(e.length) && !Se(e);
}
var Dt = Object.prototype;
function Ce(e) {
  var o = e && e.constructor, n = typeof o == "function" && o.prototype || Dt;
  return e === n;
}
var Ft = "[object Arguments]";
function fe(e) {
  return D(e) && I(e) == Ft;
}
var $e = Object.prototype, Nt = $e.hasOwnProperty, Wt = $e.propertyIsEnumerable, Ht = fe(function() {
  return arguments;
}()) ? fe : function(e) {
  return D(e) && Nt.call(e, "callee") && !Wt.call(e, "callee");
};
const qt = Ht;
function Jt() {
  return !1;
}
var xe = typeof exports == "object" && exports && !exports.nodeType && exports, ue = xe && typeof module == "object" && module && !module.nodeType && module, zt = ue && ue.exports === xe, le = zt ? $.Buffer : void 0, Vt = le ? le.isBuffer : void 0, Gt = Vt || Jt;
const Kt = Gt;
var Yt = "[object Arguments]", Xt = "[object Array]", Zt = "[object Boolean]", Qt = "[object Date]", kt = "[object Error]", er = "[object Function]", tr = "[object Map]", rr = "[object Number]", nr = "[object Object]", or = "[object RegExp]", ir = "[object Set]", sr = "[object String]", ar = "[object WeakMap]", cr = "[object ArrayBuffer]", fr = "[object DataView]", ur = "[object Float32Array]", lr = "[object Float64Array]", hr = "[object Int8Array]", pr = "[object Int16Array]", dr = "[object Int32Array]", gr = "[object Uint8Array]", yr = "[object Uint8ClampedArray]", mr = "[object Uint16Array]", br = "[object Uint32Array]", j = {};
j[ur] = j[lr] = j[hr] = j[pr] = j[dr] = j[gr] = j[yr] = j[mr] = j[br] = !0;
j[Yt] = j[Xt] = j[cr] = j[Zt] = j[fr] = j[Qt] = j[kt] = j[er] = j[tr] = j[rr] = j[nr] = j[or] = j[ir] = j[sr] = j[ar] = !1;
function wr(e) {
  return D(e) && Pe(e.length) && !!j[I(e)];
}
function vr(e) {
  return function(o) {
    return e(o);
  };
}
var Oe = typeof exports == "object" && exports && !exports.nodeType && exports, L = Oe && typeof module == "object" && module && !module.nodeType && module, Tr = L && L.exports === Oe, V = Tr && _e.process, Ar = function() {
  try {
    var e = L && L.require && L.require("util").types;
    return e || V && V.binding && V.binding("util");
  } catch {
  }
}();
const he = Ar;
var pe = he && he.isTypedArray, _r = pe ? vr(pe) : wr;
const jr = _r;
function Er(e, o) {
  return function(n) {
    return e(o(n));
  };
}
var Sr = Er(Object.keys, Object);
const Pr = Sr;
var Cr = Object.prototype, $r = Cr.hasOwnProperty;
function xr(e) {
  if (!Ce(e))
    return Pr(e);
  var o = [];
  for (var n in Object(e))
    $r.call(e, n) && n != "constructor" && o.push(n);
  return o;
}
var Or = F($, "Map");
const Y = Or;
var Ir = F($, "DataView");
const X = Ir;
var Mr = F($, "Promise");
const Z = Mr;
var Rr = F($, "Set");
const Q = Rr;
var de = "[object Map]", Ur = "[object Object]", ge = "[object Promise]", ye = "[object Set]", me = "[object WeakMap]", be = "[object DataView]", Br = M(X), Lr = M(Y), Dr = M(Z), Fr = M(Q), Nr = M(K), O = I;
(X && O(new X(new ArrayBuffer(1))) != be || Y && O(new Y()) != de || Z && O(Z.resolve()) != ge || Q && O(new Q()) != ye || K && O(new K()) != me) && (O = function(e) {
  var o = I(e), n = o == Ur ? e.constructor : void 0, f = n ? M(n) : "";
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
const Wr = O;
var Hr = function() {
  return $.Date.now();
};
const G = Hr;
var qr = "Expected a function", Jr = Math.max, zr = Math.min;
function Ie(e, o, n) {
  var f, u, y, d, m, g, p = 0, l = !1, b = !1, _ = !0;
  if (typeof e != "function")
    throw new TypeError(qr);
  o = ae(o) || 0, x(n) && (l = !!n.leading, b = "maxWait" in n, y = b ? Jr(ae(n.maxWait) || 0, o) : y, _ = "trailing" in n ? !!n.trailing : _);
  function v(i) {
    var w = f, S = u;
    return f = u = void 0, p = i, d = e.apply(S, w), d;
  }
  function T(i) {
    return p = i, m = setTimeout(c, o), l ? v(i) : d;
  }
  function E(i) {
    var w = i - g, S = i - p, P = o - w;
    return b ? zr(P, y - S) : P;
  }
  function h(i) {
    var w = i - g, S = i - p;
    return g === void 0 || w >= o || w < 0 || b && S >= y;
  }
  function c() {
    var i = G();
    if (h(i))
      return a(i);
    m = setTimeout(c, E(i));
  }
  function a(i) {
    return m = void 0, _ && f ? v(i) : (f = u = void 0, d);
  }
  function r() {
    m !== void 0 && clearTimeout(m), p = 0, f = g = u = m = void 0;
  }
  function t() {
    return m === void 0 ? d : a(G());
  }
  function s() {
    var i = G(), w = h(i);
    if (f = arguments, u = this, g = i, w) {
      if (m === void 0)
        return T(g);
      if (b)
        return clearTimeout(m), m = setTimeout(c, o), v(g);
    }
    return m === void 0 && (m = setTimeout(c, o)), d;
  }
  return s.cancel = r, s.flush = t, s;
}
var Vr = "[object String]";
function we(e) {
  return typeof e == "string" || !Ee(e) && D(e) && I(e) == Vr;
}
var Gr = "[object Map]", Kr = "[object Set]", Yr = Object.prototype, Xr = Yr.hasOwnProperty;
function ve(e) {
  if (e == null)
    return !0;
  if (Lt(e) && (Ee(e) || typeof e == "string" || typeof e.splice == "function" || Kt(e) || jr(e) || qt(e)))
    return !e.length;
  var o = Wr(e);
  if (o == Gr || o == Kr)
    return !e.size;
  if (Ce(e))
    return !xr(e).length;
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
  return x(n) && (f = "leading" in n ? !!n.leading : f, u = "trailing" in n ? !!n.trailing : u), Ie(e, o, {
    leading: f,
    maxWait: o,
    trailing: u
  });
}
function Me(e) {
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
    function y(c) {
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
    function m(c) {
      var a = c.length, r = [1732584193, -271733879, -1732584194, 271733878], t, s, i, w, S, P;
      for (t = 64; t <= a; t += 64)
        u(r, y(c.substring(t - 64, t)));
      for (c = c.substring(t - 64), s = c.length, i = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], t = 0; t < s; t += 1)
        i[t >> 2] |= c.charCodeAt(t) << (t % 4 << 3);
      if (i[t >> 2] |= 128 << (t % 4 << 3), t > 55)
        for (u(r, i), t = 0; t < 16; t += 1)
          i[t] = 0;
      return w = a * 8, w = w.toString(16).match(/(.*?)(.{0,8})$/), S = parseInt(w[2], 16), P = parseInt(w[1], 16) || 0, i[14] = S, i[15] = P, u(r, i), r;
    }
    function g(c) {
      var a = c.length, r = [1732584193, -271733879, -1732584194, 271733878], t, s, i, w, S, P;
      for (t = 64; t <= a; t += 64)
        u(r, d(c.subarray(t - 64, t)));
      for (c = t - 64 < a ? c.subarray(t - 64) : new Uint8Array(0), s = c.length, i = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], t = 0; t < s; t += 1)
        i[t >> 2] |= c[t] << (t % 4 << 3);
      if (i[t >> 2] |= 128 << (t % 4 << 3), t > 55)
        for (u(r, i), t = 0; t < 16; t += 1)
          i[t] = 0;
      return w = a * 8, w = w.toString(16).match(/(.*?)(.{0,8})$/), S = parseInt(w[2], 16), P = parseInt(w[1], 16) || 0, i[14] = S, i[15] = P, u(r, i), r;
    }
    function p(c) {
      var a = "", r;
      for (r = 0; r < 4; r += 1)
        a += f[c >> r * 8 + 4 & 15] + f[c >> r * 8 & 15];
      return a;
    }
    function l(c) {
      var a;
      for (a = 0; a < c.length; a += 1)
        c[a] = p(c[a]);
      return c.join("");
    }
    l(m("hello")), typeof ArrayBuffer < "u" && !ArrayBuffer.prototype.slice && function() {
      function c(a, r) {
        return a = a | 0 || 0, a < 0 ? Math.max(a + r, 0) : Math.min(a, r);
      }
      ArrayBuffer.prototype.slice = function(a, r) {
        var t = this.byteLength, s = c(a, t), i = t, w, S, P, R;
        return r !== n && (i = c(r, t)), s > i ? new ArrayBuffer(0) : (w = i - s, S = new ArrayBuffer(w), P = new Uint8Array(S), R = new Uint8Array(this, s, w), P.set(R), S);
      };
    }();
    function b(c) {
      return /[\u0080-\uFFFF]/.test(c) && (c = unescape(encodeURIComponent(c))), c;
    }
    function _(c, a) {
      var r = c.length, t = new ArrayBuffer(r), s = new Uint8Array(t), i;
      for (i = 0; i < r; i += 1)
        s[i] = c.charCodeAt(i);
      return a ? s : t;
    }
    function v(c) {
      return String.fromCharCode.apply(null, new Uint8Array(c));
    }
    function T(c, a, r) {
      var t = new Uint8Array(c.byteLength + a.byteLength);
      return t.set(new Uint8Array(c)), t.set(new Uint8Array(a), c.byteLength), r ? t : t.buffer;
    }
    function E(c) {
      var a = [], r = c.length, t;
      for (t = 0; t < r - 1; t += 2)
        a.push(parseInt(c.substr(t, 2), 16));
      return String.fromCharCode.apply(String, a);
    }
    function h() {
      this.reset();
    }
    return h.prototype.append = function(c) {
      return this.appendBinary(b(c)), this;
    }, h.prototype.appendBinary = function(c) {
      this._buff += c, this._length += c.length;
      var a = this._buff.length, r;
      for (r = 64; r <= a; r += 64)
        u(this._hash, y(this._buff.substring(r - 64, r)));
      return this._buff = this._buff.substring(r - 64), this;
    }, h.prototype.end = function(c) {
      var a = this._buff, r = a.length, t, s = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], i;
      for (t = 0; t < r; t += 1)
        s[t >> 2] |= a.charCodeAt(t) << (t % 4 << 3);
      return this._finish(s, r), i = l(this._hash), c && (i = E(i)), this.reset(), i;
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
      var r = a, t, s, i;
      if (c[r >> 2] |= 128 << (r % 4 << 3), r > 55)
        for (u(this._hash, c), r = 0; r < 16; r += 1)
          c[r] = 0;
      t = this._length * 8, t = t.toString(16).match(/(.*?)(.{0,8})$/), s = parseInt(t[2], 16), i = parseInt(t[1], 16) || 0, c[14] = s, c[15] = i, u(this._hash, c);
    }, h.hash = function(c, a) {
      return h.hashBinary(b(c), a);
    }, h.hashBinary = function(c, a) {
      var r = m(c), t = l(r);
      return a ? E(t) : t;
    }, h.ArrayBuffer = function() {
      this.reset();
    }, h.ArrayBuffer.prototype.append = function(c) {
      var a = T(this._buff.buffer, c, !0), r = a.length, t;
      for (this._length += c.byteLength, t = 64; t <= r; t += 64)
        u(this._hash, d(a.subarray(t - 64, t)));
      return this._buff = t - 64 < r ? new Uint8Array(a.buffer.slice(t - 64)) : new Uint8Array(0), this;
    }, h.ArrayBuffer.prototype.end = function(c) {
      var a = this._buff, r = a.length, t = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], s, i;
      for (s = 0; s < r; s += 1)
        t[s >> 2] |= a[s] << (s % 4 << 3);
      return this._finish(t, r), i = l(this._hash), c && (i = E(i)), this.reset(), i;
    }, h.ArrayBuffer.prototype.reset = function() {
      return this._buff = new Uint8Array(0), this._length = 0, this._hash = [1732584193, -271733879, -1732584194, 271733878], this;
    }, h.ArrayBuffer.prototype.getState = function() {
      var c = h.prototype.getState.call(this);
      return c.buff = v(c.buff), c;
    }, h.ArrayBuffer.prototype.setState = function(c) {
      return c.buff = _(c.buff, !0), h.prototype.setState.call(this, c);
    }, h.ArrayBuffer.prototype.destroy = h.prototype.destroy, h.ArrayBuffer.prototype._finish = h.prototype._finish, h.ArrayBuffer.hash = function(c, a) {
      var r = g(new Uint8Array(c)), t = l(r);
      return a ? E(t) : t;
    }, h;
  });
})(Re);
var kr = Re.exports;
const en = /* @__PURE__ */ Me(kr), W = (e) => typeof e == "function" ? e() : e;
function J(e) {
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
      for (var u = "", y = n + 1; y < e.length; ) {
        var d = e.charCodeAt(y);
        if (
          // `0-9`
          d >= 48 && d <= 57 || // `A-Z`
          d >= 65 && d <= 90 || // `a-z`
          d >= 97 && d <= 122 || // `_`
          d === 95
        ) {
          u += e[y++];
          continue;
        }
        break;
      }
      if (!u)
        throw new TypeError("Missing parameter name at ".concat(n));
      o.push({ type: "NAME", index: n, value: u }), n = y;
      continue;
    }
    if (f === "(") {
      var m = 1, g = "", y = n + 1;
      if (e[y] === "?")
        throw new TypeError('Pattern cannot start with "?" at '.concat(y));
      for (; y < e.length; ) {
        if (e[y] === "\\") {
          g += e[y++] + e[y++];
          continue;
        }
        if (e[y] === ")") {
          if (m--, m === 0) {
            y++;
            break;
          }
        } else if (e[y] === "(" && (m++, e[y + 1] !== "?"))
          throw new TypeError("Capturing groups are not allowed at ".concat(y));
        g += e[y++];
      }
      if (m)
        throw new TypeError("Unbalanced pattern at ".concat(n));
      if (!g)
        throw new TypeError("Missing pattern at ".concat(n));
      o.push({ type: "PATTERN", index: n, value: g }), n = y;
      continue;
    }
    o.push({ type: "CHAR", index: n, value: e[n++] });
  }
  return o.push({ type: "END", index: n, value: "" }), o;
}
function rn(e, o) {
  o === void 0 && (o = {});
  for (var n = tn(e), f = o.prefixes, u = f === void 0 ? "./" : f, y = "[^".concat(U(o.delimiter || "/#?"), "]+?"), d = [], m = 0, g = 0, p = "", l = function(i) {
    if (g < n.length && n[g].type === i)
      return n[g++].value;
  }, b = function(i) {
    var w = l(i);
    if (w !== void 0)
      return w;
    var S = n[g], P = S.type, R = S.index;
    throw new TypeError("Unexpected ".concat(P, " at ").concat(R, ", expected ").concat(i));
  }, _ = function() {
    for (var i = "", w; w = l("CHAR") || l("ESCAPED_CHAR"); )
      i += w;
    return i;
  }; g < n.length; ) {
    var v = l("CHAR"), T = l("NAME"), E = l("PATTERN");
    if (T || E) {
      var h = v || "";
      u.indexOf(h) === -1 && (p += h, h = ""), p && (d.push(p), p = ""), d.push({
        name: T || m++,
        prefix: h,
        suffix: "",
        pattern: E || y,
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
      var h = _(), r = l("NAME") || "", t = l("PATTERN") || "", s = _();
      b("CLOSE"), d.push({
        name: r || (t ? m++ : ""),
        pattern: r && !t ? y : t,
        prefix: h,
        suffix: s,
        modifier: l("MODIFIER") || ""
      });
      continue;
    }
    b("END");
  }
  return d;
}
function U(e) {
  return e.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
function Ue(e) {
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
  return new RegExp("(?:".concat(f.join("|"), ")"), Ue(n));
}
function sn(e, o, n) {
  return an(rn(e, n), o, n);
}
function an(e, o, n) {
  n === void 0 && (n = {});
  for (var f = n.strict, u = f === void 0 ? !1 : f, y = n.start, d = y === void 0 ? !0 : y, m = n.end, g = m === void 0 ? !0 : m, p = n.encode, l = p === void 0 ? function(R) {
    return R;
  } : p, b = n.delimiter, _ = b === void 0 ? "/#?" : b, v = n.endsWith, T = v === void 0 ? "" : v, E = "[".concat(U(T), "]|$"), h = "[".concat(U(_), "]"), c = d ? "^" : "", a = 0, r = e; a < r.length; a++) {
    var t = r[a];
    if (typeof t == "string")
      c += U(l(t));
    else {
      var s = U(l(t.prefix)), i = U(l(t.suffix));
      if (t.pattern)
        if (o && o.push(t), s || i)
          if (t.modifier === "+" || t.modifier === "*") {
            var w = t.modifier === "*" ? "?" : "";
            c += "(?:".concat(s, "((?:").concat(t.pattern, ")(?:").concat(i).concat(s, "(?:").concat(t.pattern, "))*)").concat(i, ")").concat(w);
          } else
            c += "(?:".concat(s, "(").concat(t.pattern, ")").concat(i, ")").concat(t.modifier);
        else
          t.modifier === "+" || t.modifier === "*" ? c += "((?:".concat(t.pattern, ")").concat(t.modifier, ")") : c += "(".concat(t.pattern, ")").concat(t.modifier);
      else
        c += "(?:".concat(s).concat(i, ")").concat(t.modifier);
    }
  }
  if (g)
    u || (c += "".concat(h, "?")), c += n.endsWith ? "(?=".concat(E, ")") : "$";
  else {
    var S = e[e.length - 1], P = typeof S == "string" ? h.indexOf(S[S.length - 1]) > -1 : S === void 0;
    u || (c += "(?:".concat(h, "(?=").concat(E, "))?")), P || (c += "(?=".concat(h, "|").concat(E, ")"));
  }
  return new RegExp(c, Ue(n));
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
      let u, y = "";
      typeof o[0] == "object" ? (u = o[0], y = u.url) : (u = o[1], y = o[0]);
      const d = new URL(y, "http://localhost"), m = (f = n.mockData) == null ? void 0 : f.find((g) => {
        if (!g || !g.url || g.method && g.method.toUpperCase() !== (u == null ? void 0 : u.method))
          return !1;
        const p = new URL(g.url, "http://localhost"), l = new URLSearchParams(p.search), b = new URLSearchParams(d.search);
        for (const [_, v] of l)
          if (b.get(_) !== v)
            return !1;
        return Be(p.pathname).test(d.pathname);
      });
      if (m) {
        const { response: g, timeout: p, statusCode: l } = m;
        p && await new Promise((_) => setTimeout(_, p));
        const b = typeof g == "function" ? g(u) : g;
        return console.debug("mock success: " + y), console.debug(b), b instanceof Response ? Promise.resolve(b) : Promise.resolve(
          new Response(JSON.stringify(b), {
            status: l || 200,
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
    A(this, "key", "");
    A(this, "fetchPromise");
    /**
     * 服务基础路径
     */
    A(this, "baseURL", "");
    /**
     * 请求路径
     */
    A(this, "path", "");
    /**
     * 请求全路径
     */
    A(this, "url", "");
    /**
     * 请求结果
     */
    A(this, "result", null);
    /**
     * 请求参数
     */
    A(this, "requestOptions", {});
    /**
     * 请求信息
     */
    A(this, "request");
    /**
     * 请求体
     */
    A(this, "requestBody");
    /**
     * 请求返回信息
     */
    A(this, "response");
  }
}
class k {
  constructor(o) {
    /**
     * 服务基础路径
     */
    A(this, "baseURL");
    /**
     * 指定请求超时的毫秒数（默认永不超时，Chrome中网络请求超时为300秒，Firefox中为90秒）
     */
    A(this, "timeout");
    /**
     * 服务中间件
     */
    A(this, "middlewares");
    this.baseURL = o || "", this.middlewares = [];
  }
  normalizeUrl(o) {
    return o.toString().replace(/(^\/+|\/+$)/g, "");
  }
  normalizeUrlParams(o, n) {
    if (J(n))
      return "";
    const f = ~o.indexOf("?") ? "&" : "?";
    return typeof n == "object" ? f + Object.entries(n).map(
      (u) => encodeURIComponent(u[0]) + "=" + encodeURIComponent(u[1] === void 0 || u[1] === null ? "" : u[1])
    ).join("&") : n !== "" ? f + W(n) : "";
  }
}
class hn {
  constructor(o) {
    A(this, "middlewares");
    A(this, "options");
    A(this, "pendingMap");
    A(this, "setMockData", cn);
    A(this, "openMock", fn);
    A(this, "closeMock", un);
    this.middlewares = [], this.pendingMap = /* @__PURE__ */ new Map(), o instanceof k ? this.options = o : this.options = new k(o);
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
    const f = this.options, u = W(f.baseURL);
    let y = W(o);
    y = f.normalizeUrl(encodeURI(y));
    let d = new ln();
    d.baseURL = u, d.path = y, d.url = this.getUrl(u, y, n.params), d.requestOptions = {
      headers: {},
      timeout: f.timeout,
      ...n
    };
    const m = new en();
    m.append(n.method || ""), m.append(d.url), n.body && (d.requestBody = n.body, d.requestBody instanceof FormData || m.append(JSON.stringify(d.requestBody))), d.key = m.end();
    const g = this.pendingMap.get(d.key);
    return g ? (d = g, console.info(
      "[WebCore Http]: The same request is being executed, and this request has been cancelled. url: " + d.url
    )) : this.pendingMap.set(d.key, d), d;
  }
  createRequest(o, n = {}, f = []) {
    const u = this.createContext(o, n), y = this.options;
    let d = [];
    typeof y.middlewares == "function" && (d = d.concat(W(y.middlewares))), d = d.concat(this.middlewares), f && (typeof f == "function" ? (d.push(f), u.fetchPromise = void 0) : f instanceof Array && f.length > 0 && (d = d.concat(f), u.fetchPromise = void 0));
    const m = (g) => {
      const p = d[g];
      if (!p) {
        if (u.requestOptions.timeout && !u.requestOptions.signal) {
          const l = new AbortController();
          u.requestOptions.signal = l.signal, setTimeout(() => l.abort(), u.requestOptions.timeout);
        }
        return u.request = new Request(u.url, u.requestOptions), fetch(u.request).then((l) => (u.response = l, l)).finally(() => {
          this.pendingMap.has(u.key) && window.setTimeout(() => {
            this.pendingMap.delete(u.key);
          }, 600);
        });
      }
      try {
        return Promise.resolve(p(u, m.bind(null, g + 1)));
      } catch (l) {
        return Promise.reject(l);
      }
    };
    return u.fetchPromise || (u.fetchPromise = m(0)), u.fetchPromise.then((g) => d.length > 0 ? u.result : g);
  }
  request(o, n = {}, f = []) {
    if (!J(n == null ? void 0 : n.body) && x(n.body)) {
      const u = new FormData();
      let y = !1;
      for (const d in n.body)
        if (Object.prototype.hasOwnProperty.call(n.body, d)) {
          const m = n.body[d];
          m instanceof Blob && (y = !0), u.append(d, m);
        }
      y && (n.body = u);
    }
    if (n.throttle !== void 0 && n.debounce !== void 0)
      throw new Error("throttle and debounce cannot be set at the same time");
    return n.throttle ? new Promise((u) => {
      Qr(() => u(this.createRequest(o, n, f)), n.throttle);
    }) : n.debounce ? new Promise((u) => {
      Ie(() => u(this.createRequest(o, n, f)), n.debounce);
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
}
class pn {
  constructor() {
    A(this, "items");
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
var He = { exports: {} };
(function(e) {
  var o = Object.prototype.hasOwnProperty, n = "~";
  function f() {
  }
  Object.create && (f.prototype = /* @__PURE__ */ Object.create(null), new f().__proto__ || (n = !1));
  function u(g, p, l) {
    this.fn = g, this.context = p, this.once = l || !1;
  }
  function y(g, p, l, b, _) {
    if (typeof l != "function")
      throw new TypeError("The listener must be a function");
    var v = new u(l, b || g, _), T = n ? n + p : p;
    return g._events[T] ? g._events[T].fn ? g._events[T] = [g._events[T], v] : g._events[T].push(v) : (g._events[T] = v, g._eventsCount++), g;
  }
  function d(g, p) {
    --g._eventsCount === 0 ? g._events = new f() : delete g._events[p];
  }
  function m() {
    this._events = new f(), this._eventsCount = 0;
  }
  m.prototype.eventNames = function() {
    var p = [], l, b;
    if (this._eventsCount === 0)
      return p;
    for (b in l = this._events)
      o.call(l, b) && p.push(n ? b.slice(1) : b);
    return Object.getOwnPropertySymbols ? p.concat(Object.getOwnPropertySymbols(l)) : p;
  }, m.prototype.listeners = function(p) {
    var l = n ? n + p : p, b = this._events[l];
    if (!b)
      return [];
    if (b.fn)
      return [b.fn];
    for (var _ = 0, v = b.length, T = new Array(v); _ < v; _++)
      T[_] = b[_].fn;
    return T;
  }, m.prototype.listenerCount = function(p) {
    var l = n ? n + p : p, b = this._events[l];
    return b ? b.fn ? 1 : b.length : 0;
  }, m.prototype.emit = function(p, l, b, _, v, T) {
    var E = n ? n + p : p;
    if (!this._events[E])
      return !1;
    var h = this._events[E], c = arguments.length, a, r;
    if (h.fn) {
      switch (h.once && this.removeListener(p, h.fn, void 0, !0), c) {
        case 1:
          return h.fn.call(h.context), !0;
        case 2:
          return h.fn.call(h.context, l), !0;
        case 3:
          return h.fn.call(h.context, l, b), !0;
        case 4:
          return h.fn.call(h.context, l, b, _), !0;
        case 5:
          return h.fn.call(h.context, l, b, _, v), !0;
        case 6:
          return h.fn.call(h.context, l, b, _, v, T), !0;
      }
      for (r = 1, a = new Array(c - 1); r < c; r++)
        a[r - 1] = arguments[r];
      h.fn.apply(h.context, a);
    } else {
      var t = h.length, s;
      for (r = 0; r < t; r++)
        switch (h[r].once && this.removeListener(p, h[r].fn, void 0, !0), c) {
          case 1:
            h[r].fn.call(h[r].context);
            break;
          case 2:
            h[r].fn.call(h[r].context, l);
            break;
          case 3:
            h[r].fn.call(h[r].context, l, b);
            break;
          case 4:
            h[r].fn.call(h[r].context, l, b, _);
            break;
          default:
            if (!a)
              for (s = 1, a = new Array(c - 1); s < c; s++)
                a[s - 1] = arguments[s];
            h[r].fn.apply(h[r].context, a);
        }
    }
    return !0;
  }, m.prototype.on = function(p, l, b) {
    return y(this, p, l, b, !1);
  }, m.prototype.once = function(p, l, b) {
    return y(this, p, l, b, !0);
  }, m.prototype.removeListener = function(p, l, b, _) {
    var v = n ? n + p : p;
    if (!this._events[v])
      return this;
    if (!l)
      return d(this, v), this;
    var T = this._events[v];
    if (T.fn)
      T.fn === l && (!_ || T.once) && (!b || T.context === b) && d(this, v);
    else {
      for (var E = 0, h = [], c = T.length; E < c; E++)
        (T[E].fn !== l || _ && !T[E].once || b && T[E].context !== b) && h.push(T[E]);
      h.length ? this._events[v] = h.length === 1 ? h[0] : h : d(this, v);
    }
    return this;
  }, m.prototype.removeAllListeners = function(p) {
    var l;
    return p ? (l = n ? n + p : p, this._events[l] && d(this, l)) : (this._events = new f(), this._eventsCount = 0), this;
  }, m.prototype.off = m.prototype.removeListener, m.prototype.addListener = m.prototype.on, m.prefixed = n, m.EventEmitter = m, e.exports = m;
})(He);
var dn = He.exports;
const gn = /* @__PURE__ */ Me(dn);
class yn extends gn {
}
const ee = "_ipc";
class mn {
  constructor(o = null) {
    /**
     * 事件触发器
     */
    A(this, "emitter");
    /**
     * iframe窗口对象
     */
    A(this, "contentWindow", null);
    /**
     * 是否跨域
     */
    A(this, "isCrossOrigin", !1);
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
    A(this, "targets");
    A(this, "sendingEvents", /* @__PURE__ */ new Set());
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
    return typeof n == "function" && (f = n, n = "*"), n && f ? (u = this.targets.get(n)) == null || u.emitter.removeListener(o, f) : this.targets.map((y, d) => {
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
var qe = /* @__PURE__ */ ((e) => (e.Mobile = "APP", e.Desktop = "WEB", e.NODE_JS = "NodeJs", e))(qe || {});
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
    isEmpty: J
  }
};
class te extends Error {
  constructor(n, f, u, y = "") {
    var d;
    super();
    A(this, "code", -1);
    A(this, "status", "");
    A(this, "type", "");
    A(this, "description", "");
    this.message = n, this.name = "CustomError", this.code = f, this.status = u, this.type = "error", this.description = y, (d = C.ipc.targets.get("_self")) == null || d.send("custom_error", this);
  }
}
class bn extends te {
  constructor(o, n, f, u = "") {
    super(o, n, f, u), this.name = "OperationError";
  }
}
const Je = typeof window < "u", wn = Je ? null : require("node:path"), vn = Je ? null : require("node:fs");
function In() {
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
let q = "";
const Te = 2;
let N = 0;
const Tn = function() {
  N++, N >= Te && (console.error(`获取资源超过错误次数阈值[${Te}]，触发版本检查！`), N = -9999, _n()), setTimeout(() => {
    N = 0;
  }, 1500);
}, An = () => {
  if (typeof window < "u") {
    if (window._version)
      return;
    fetch("/version.json?_t=" + (/* @__PURE__ */ new Date()).getTime()).then((o) => o.json()).then((o) => {
      q = o.version, window._version = q;
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
    if (q && q !== e.version)
      throw new bn(
        `[${e.version}] 有新的内容更新，请在保存页面数据后，刷新页面重新载入！`,
        404,
        404
      );
  });
}, ze = typeof window < "u", Ae = ze ? null : require("node:path"), jn = ze ? null : require("swagger-typescript-api");
function Mn(e) {
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
        await jn.generateApi({
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
            onFormatRouteName: (u, y) => /\d/.test(y) && u.operationId.includes("_") ? u.operationId.split("_", 1)[0] : y
          }
        }).catch((u) => console.error(u));
      }
    }
  };
}
const En = "YYYY-MM-DD HH:mm:ss";
function Ve(e) {
  for (const o in e) {
    if (e[o] && e[o]._isAMomentObject && (e[o] = e[o].format(En)), we(o)) {
      const n = e[o];
      if (n)
        try {
          e[o] = we(n) ? n.trim() : n;
        } catch (f) {
          throw new Error(f);
        }
    }
    x(e[o]) && Ve(e[o]);
  }
}
const Sn = async (e, o) => {
  const n = e.requestOptions.body;
  n && Object.prototype.toString.call(n) === "[object Object]" && Ve(n), await o();
}, Pn = async (e, o) => {
  var y, d, m, g;
  const n = e.requestOptions, f = n.body;
  if (!(f instanceof FormData) && !(f instanceof URLSearchParams)) {
    let p = !0;
    const l = n.headers, b = J(l) ? null : l == null ? void 0 : l["Content-Type"];
    b ? p = b.startsWith("application/json") : l["Content-Type"] = We.Json, p && typeof f == "object" && (n.body = JSON.stringify(f));
  }
  if (await o(), e.result || (y = e.response) != null && y.bodyUsed)
    return;
  const u = ((d = e.response) == null ? void 0 : d.headers.get("Content-Type")) || "";
  (m = e.response) != null && m.ok && (u != null && u.startsWith("application/json")) && (e.result = await ((g = e.response) == null ? void 0 : g.json()));
}, Cn = async (e, o) => {
  var y, d, m, g;
  const f = e.requestOptions.headers, u = C.getToken();
  if (u && ve(f.Authorization) && (f.Authorization = `Bearer ${u}`), u && ve(f.Authorization) && (f.Authorization = `Bearer ${u}`), f.eid = C.getEnterpriseId(), f.oid = C.getOrgId(), f["Accept-Language"] = C.getLanguage(), f["X-TZ-Offset"] = (/* @__PURE__ */ new Date()).getTimezoneOffset().toString(), await o(), !((y = e.response) != null && y.ok)) {
    const p = new Error("An error occurred while fetching the data.");
    throw p.message = `${(d = e.response) == null ? void 0 : d.status}|${await ((m = e.response) == null ? void 0 : m.text()) || ""}`, p;
  }
  if (((g = e.response) == null ? void 0 : g.status) !== 200)
    throw new te(JSON.stringify(e.result), 500, e.response.status);
  if (!e.requestOptions.returnNativeResponse && e.result) {
    const p = e.result;
    if (p.code === 0 || p.code === 200)
      e.result = p.data;
    else if (p.message)
      throw new te(p.message, p.code, e.response.status, JSON.stringify(p));
  }
}, $n = async (e, o) => {
  if (e.url.lastIndexOf("_t=") <= 0) {
    const n = (/* @__PURE__ */ new Date()).getTime();
    e.url += `${e.url.indexOf("?") > 0 ? "&" : "?"}_t=${n}`;
  }
  await o();
}, oe = new k();
oe.baseURL = () => {
  switch (C.platform) {
    case qe.Mobile:
      return window.APP.getURL();
    default:
      return C.config.baseUrl || location.origin;
  }
};
oe.middlewares = () => [Cn, Pn, Sn, $n];
const xn = new hn(oe);
typeof window < "u" && (C.ipc = ne.init(), C.ipc.addTarget("_self", window), window.http = xn, window.fw = C, An());
export {
  te as CustomError,
  pn as Dictionary,
  ne as EventBus,
  hn as Http,
  In as autoCheckUpdates,
  Mn as swaggerApiGen
};
