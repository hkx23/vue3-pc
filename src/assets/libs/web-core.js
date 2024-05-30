var St = Object.defineProperty;
var Tt = (e, o, r) => o in e ? St(e, o, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[o] = r;
var E = (e, o, r) => (Tt(e, typeof o != "symbol" ? o + "" : o, r), r);
var It = typeof global == "object" && global && global.Object === Object && global;
const Xe = It;
var At = typeof self == "object" && self && self.Object === Object && self, Ct = Xe || At || Function("return this")();
const N = Ct;
var Pt = N.Symbol;
const oe = Pt;
var Ke = Object.prototype, xt = Ke.hasOwnProperty, Et = Ke.toString, G = oe ? oe.toStringTag : void 0;
function Ot(e) {
  var o = xt.call(e, G), r = e[G];
  try {
    e[G] = void 0;
    var f = !0;
  } catch {
  }
  var l = Et.call(e);
  return f && (o ? e[G] = r : delete e[G]), l;
}
var Mt = Object.prototype, jt = Mt.toString;
function kt(e) {
  return jt.call(e);
}
var Ut = "[object Null]", Rt = "[object Undefined]", Me = oe ? oe.toStringTag : void 0;
function J(e) {
  return e == null ? e === void 0 ? Rt : Ut : Me && Me in Object(e) ? Ot(e) : kt(e);
}
function K(e) {
  return e != null && typeof e == "object";
}
var Wt = "[object Symbol]";
function Bt(e) {
  return typeof e == "symbol" || K(e) && J(e) == Wt;
}
var Lt = Array.isArray;
const Ye = Lt;
var $t = /\s/;
function Nt(e) {
  for (var o = e.length; o-- && $t.test(e.charAt(o)); )
    ;
  return o;
}
var Dt = /^\s+/;
function Vt(e) {
  return e && e.slice(0, Nt(e) + 1).replace(Dt, "");
}
function V(e) {
  var o = typeof e;
  return e != null && (o == "object" || o == "function");
}
var je = 0 / 0, Ft = /^[-+]0x[0-9a-f]+$/i, Jt = /^0b[01]+$/i, qt = /^0o[0-7]+$/i, Ht = parseInt;
function ke(e) {
  if (typeof e == "number")
    return e;
  if (Bt(e))
    return je;
  if (V(e)) {
    var o = typeof e.valueOf == "function" ? e.valueOf() : e;
    e = V(o) ? o + "" : o;
  }
  if (typeof e != "string")
    return e === 0 ? e : +e;
  e = Vt(e);
  var r = Jt.test(e);
  return r || qt.test(e) ? Ht(e.slice(2), r ? 2 : 8) : Ft.test(e) ? je : +e;
}
var Qt = "[object AsyncFunction]", zt = "[object Function]", Gt = "[object GeneratorFunction]", Xt = "[object Proxy]";
function Ze(e) {
  if (!V(e))
    return !1;
  var o = J(e);
  return o == zt || o == Gt || o == Qt || o == Xt;
}
var Kt = N["__core-js_shared__"];
const ce = Kt;
var Ue = function() {
  var e = /[^.]+$/.exec(ce && ce.keys && ce.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function Yt(e) {
  return !!Ue && Ue in e;
}
var Zt = Function.prototype, er = Zt.toString;
function q(e) {
  if (e != null) {
    try {
      return er.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var tr = /[\\^$.*+?()[\]{}|]/g, rr = /^\[object .+?Constructor\]$/, nr = Function.prototype, or = Object.prototype, ir = nr.toString, ar = or.hasOwnProperty, sr = RegExp(
  "^" + ir.call(ar).replace(tr, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function cr(e) {
  if (!V(e) || Yt(e))
    return !1;
  var o = Ze(e) ? sr : rr;
  return o.test(q(e));
}
function ur(e, o) {
  return e == null ? void 0 : e[o];
}
function Y(e, o) {
  var r = ur(e, o);
  return cr(r) ? r : void 0;
}
var fr = Y(N, "WeakMap");
const me = fr;
var lr = 9007199254740991;
function et(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= lr;
}
function pr(e) {
  return e != null && et(e.length) && !Ze(e);
}
var dr = Object.prototype;
function tt(e) {
  var o = e && e.constructor, r = typeof o == "function" && o.prototype || dr;
  return e === r;
}
var gr = "[object Arguments]";
function Re(e) {
  return K(e) && J(e) == gr;
}
var rt = Object.prototype, hr = rt.hasOwnProperty, mr = rt.propertyIsEnumerable, yr = Re(function() {
  return arguments;
}()) ? Re : function(e) {
  return K(e) && hr.call(e, "callee") && !mr.call(e, "callee");
};
const wr = yr;
function vr() {
  return !1;
}
var nt = typeof exports == "object" && exports && !exports.nodeType && exports, We = nt && typeof module == "object" && module && !module.nodeType && module, br = We && We.exports === nt, Be = br ? N.Buffer : void 0, _r = Be ? Be.isBuffer : void 0, Sr = _r || vr;
const Tr = Sr;
var Ir = "[object Arguments]", Ar = "[object Array]", Cr = "[object Boolean]", Pr = "[object Date]", xr = "[object Error]", Er = "[object Function]", Or = "[object Map]", Mr = "[object Number]", jr = "[object Object]", kr = "[object RegExp]", Ur = "[object Set]", Rr = "[object String]", Wr = "[object WeakMap]", Br = "[object ArrayBuffer]", Lr = "[object DataView]", $r = "[object Float32Array]", Nr = "[object Float64Array]", Dr = "[object Int8Array]", Vr = "[object Int16Array]", Fr = "[object Int32Array]", Jr = "[object Uint8Array]", qr = "[object Uint8ClampedArray]", Hr = "[object Uint16Array]", Qr = "[object Uint32Array]", j = {};
j[$r] = j[Nr] = j[Dr] = j[Vr] = j[Fr] = j[Jr] = j[qr] = j[Hr] = j[Qr] = !0;
j[Ir] = j[Ar] = j[Br] = j[Cr] = j[Lr] = j[Pr] = j[xr] = j[Er] = j[Or] = j[Mr] = j[jr] = j[kr] = j[Ur] = j[Rr] = j[Wr] = !1;
function zr(e) {
  return K(e) && et(e.length) && !!j[J(e)];
}
function Gr(e) {
  return function(o) {
    return e(o);
  };
}
var ot = typeof exports == "object" && exports && !exports.nodeType && exports, X = ot && typeof module == "object" && module && !module.nodeType && module, Xr = X && X.exports === ot, ue = Xr && Xe.process, Kr = function() {
  try {
    var e = X && X.require && X.require("util").types;
    return e || ue && ue.binding && ue.binding("util");
  } catch {
  }
}();
const Le = Kr;
var $e = Le && Le.isTypedArray, Yr = $e ? Gr($e) : zr;
const Zr = Yr;
function en(e, o) {
  return function(r) {
    return e(o(r));
  };
}
var tn = en(Object.keys, Object);
const rn = tn;
var nn = Object.prototype, on = nn.hasOwnProperty;
function an(e) {
  if (!tt(e))
    return rn(e);
  var o = [];
  for (var r in Object(e))
    on.call(e, r) && r != "constructor" && o.push(r);
  return o;
}
var sn = Y(N, "Map");
const ye = sn;
var cn = Y(N, "DataView");
const we = cn;
var un = Y(N, "Promise");
const ve = un;
var fn = Y(N, "Set");
const be = fn;
var Ne = "[object Map]", ln = "[object Object]", De = "[object Promise]", Ve = "[object Set]", Fe = "[object WeakMap]", Je = "[object DataView]", pn = q(we), dn = q(ye), gn = q(ve), hn = q(be), mn = q(me), F = J;
(we && F(new we(new ArrayBuffer(1))) != Je || ye && F(new ye()) != Ne || ve && F(ve.resolve()) != De || be && F(new be()) != Ve || me && F(new me()) != Fe) && (F = function(e) {
  var o = J(e), r = o == ln ? e.constructor : void 0, f = r ? q(r) : "";
  if (f)
    switch (f) {
      case pn:
        return Je;
      case dn:
        return Ne;
      case gn:
        return De;
      case hn:
        return Ve;
      case mn:
        return Fe;
    }
  return o;
});
const yn = F;
var wn = function() {
  return N.Date.now();
};
const fe = wn;
var vn = "Expected a function", bn = Math.max, _n = Math.min;
function it(e, o, r) {
  var f, l, b, h, S, w, m = 0, g = !1, _ = !1, A = !0;
  if (typeof e != "function")
    throw new TypeError(vn);
  o = ke(o) || 0, V(r) && (g = !!r.leading, _ = "maxWait" in r, b = _ ? bn(ke(r.maxWait) || 0, o) : b, A = "trailing" in r ? !!r.trailing : A);
  function C(a) {
    var x = f, v = l;
    return f = l = void 0, m = a, h = e.apply(v, x), h;
  }
  function I(a) {
    return m = a, S = setTimeout(u, o), g ? C(a) : h;
  }
  function P(a) {
    var x = a - w, v = a - m, k = o - x;
    return _ ? _n(k, b - v) : k;
  }
  function d(a) {
    var x = a - w, v = a - m;
    return w === void 0 || x >= o || x < 0 || _ && v >= b;
  }
  function u() {
    var a = fe();
    if (d(a))
      return c(a);
    S = setTimeout(u, P(a));
  }
  function c(a) {
    return S = void 0, A && f ? C(a) : (f = l = void 0, h);
  }
  function i() {
    S !== void 0 && clearTimeout(S), m = 0, f = w = l = S = void 0;
  }
  function n() {
    return S === void 0 ? h : c(fe());
  }
  function s() {
    var a = fe(), x = d(a);
    if (f = arguments, l = this, w = a, x) {
      if (S === void 0)
        return I(w);
      if (_)
        return clearTimeout(S), S = setTimeout(u, o), C(w);
    }
    return S === void 0 && (S = setTimeout(u, o)), h;
  }
  return s.cancel = i, s.flush = n, s;
}
var Sn = "[object String]";
function qe(e) {
  return typeof e == "string" || !Ye(e) && K(e) && J(e) == Sn;
}
var Tn = "[object Map]", In = "[object Set]", An = Object.prototype, Cn = An.hasOwnProperty;
function Pn(e) {
  if (e == null)
    return !0;
  if (pr(e) && (Ye(e) || typeof e == "string" || typeof e.splice == "function" || Tr(e) || Zr(e) || wr(e)))
    return !e.length;
  var o = yn(e);
  if (o == Tn || o == In)
    return !e.size;
  if (tt(e))
    return !an(e).length;
  for (var r in e)
    if (Cn.call(e, r))
      return !1;
  return !0;
}
var xn = "Expected a function";
function En(e, o, r) {
  var f = !0, l = !0;
  if (typeof e != "function")
    throw new TypeError(xn);
  return V(r) && (f = "leading" in r ? !!r.leading : f, l = "trailing" in r ? !!r.trailing : l), it(e, o, {
    leading: f,
    maxWait: o,
    trailing: l
  });
}
function Ie(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var at = { exports: {} };
(function(e, o) {
  (function(r) {
    e.exports = r();
  })(function(r) {
    var f = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
    function l(u, c) {
      var i = u[0], n = u[1], s = u[2], a = u[3];
      i += (n & s | ~n & a) + c[0] - 680876936 | 0, i = (i << 7 | i >>> 25) + n | 0, a += (i & n | ~i & s) + c[1] - 389564586 | 0, a = (a << 12 | a >>> 20) + i | 0, s += (a & i | ~a & n) + c[2] + 606105819 | 0, s = (s << 17 | s >>> 15) + a | 0, n += (s & a | ~s & i) + c[3] - 1044525330 | 0, n = (n << 22 | n >>> 10) + s | 0, i += (n & s | ~n & a) + c[4] - 176418897 | 0, i = (i << 7 | i >>> 25) + n | 0, a += (i & n | ~i & s) + c[5] + 1200080426 | 0, a = (a << 12 | a >>> 20) + i | 0, s += (a & i | ~a & n) + c[6] - 1473231341 | 0, s = (s << 17 | s >>> 15) + a | 0, n += (s & a | ~s & i) + c[7] - 45705983 | 0, n = (n << 22 | n >>> 10) + s | 0, i += (n & s | ~n & a) + c[8] + 1770035416 | 0, i = (i << 7 | i >>> 25) + n | 0, a += (i & n | ~i & s) + c[9] - 1958414417 | 0, a = (a << 12 | a >>> 20) + i | 0, s += (a & i | ~a & n) + c[10] - 42063 | 0, s = (s << 17 | s >>> 15) + a | 0, n += (s & a | ~s & i) + c[11] - 1990404162 | 0, n = (n << 22 | n >>> 10) + s | 0, i += (n & s | ~n & a) + c[12] + 1804603682 | 0, i = (i << 7 | i >>> 25) + n | 0, a += (i & n | ~i & s) + c[13] - 40341101 | 0, a = (a << 12 | a >>> 20) + i | 0, s += (a & i | ~a & n) + c[14] - 1502002290 | 0, s = (s << 17 | s >>> 15) + a | 0, n += (s & a | ~s & i) + c[15] + 1236535329 | 0, n = (n << 22 | n >>> 10) + s | 0, i += (n & a | s & ~a) + c[1] - 165796510 | 0, i = (i << 5 | i >>> 27) + n | 0, a += (i & s | n & ~s) + c[6] - 1069501632 | 0, a = (a << 9 | a >>> 23) + i | 0, s += (a & n | i & ~n) + c[11] + 643717713 | 0, s = (s << 14 | s >>> 18) + a | 0, n += (s & i | a & ~i) + c[0] - 373897302 | 0, n = (n << 20 | n >>> 12) + s | 0, i += (n & a | s & ~a) + c[5] - 701558691 | 0, i = (i << 5 | i >>> 27) + n | 0, a += (i & s | n & ~s) + c[10] + 38016083 | 0, a = (a << 9 | a >>> 23) + i | 0, s += (a & n | i & ~n) + c[15] - 660478335 | 0, s = (s << 14 | s >>> 18) + a | 0, n += (s & i | a & ~i) + c[4] - 405537848 | 0, n = (n << 20 | n >>> 12) + s | 0, i += (n & a | s & ~a) + c[9] + 568446438 | 0, i = (i << 5 | i >>> 27) + n | 0, a += (i & s | n & ~s) + c[14] - 1019803690 | 0, a = (a << 9 | a >>> 23) + i | 0, s += (a & n | i & ~n) + c[3] - 187363961 | 0, s = (s << 14 | s >>> 18) + a | 0, n += (s & i | a & ~i) + c[8] + 1163531501 | 0, n = (n << 20 | n >>> 12) + s | 0, i += (n & a | s & ~a) + c[13] - 1444681467 | 0, i = (i << 5 | i >>> 27) + n | 0, a += (i & s | n & ~s) + c[2] - 51403784 | 0, a = (a << 9 | a >>> 23) + i | 0, s += (a & n | i & ~n) + c[7] + 1735328473 | 0, s = (s << 14 | s >>> 18) + a | 0, n += (s & i | a & ~i) + c[12] - 1926607734 | 0, n = (n << 20 | n >>> 12) + s | 0, i += (n ^ s ^ a) + c[5] - 378558 | 0, i = (i << 4 | i >>> 28) + n | 0, a += (i ^ n ^ s) + c[8] - 2022574463 | 0, a = (a << 11 | a >>> 21) + i | 0, s += (a ^ i ^ n) + c[11] + 1839030562 | 0, s = (s << 16 | s >>> 16) + a | 0, n += (s ^ a ^ i) + c[14] - 35309556 | 0, n = (n << 23 | n >>> 9) + s | 0, i += (n ^ s ^ a) + c[1] - 1530992060 | 0, i = (i << 4 | i >>> 28) + n | 0, a += (i ^ n ^ s) + c[4] + 1272893353 | 0, a = (a << 11 | a >>> 21) + i | 0, s += (a ^ i ^ n) + c[7] - 155497632 | 0, s = (s << 16 | s >>> 16) + a | 0, n += (s ^ a ^ i) + c[10] - 1094730640 | 0, n = (n << 23 | n >>> 9) + s | 0, i += (n ^ s ^ a) + c[13] + 681279174 | 0, i = (i << 4 | i >>> 28) + n | 0, a += (i ^ n ^ s) + c[0] - 358537222 | 0, a = (a << 11 | a >>> 21) + i | 0, s += (a ^ i ^ n) + c[3] - 722521979 | 0, s = (s << 16 | s >>> 16) + a | 0, n += (s ^ a ^ i) + c[6] + 76029189 | 0, n = (n << 23 | n >>> 9) + s | 0, i += (n ^ s ^ a) + c[9] - 640364487 | 0, i = (i << 4 | i >>> 28) + n | 0, a += (i ^ n ^ s) + c[12] - 421815835 | 0, a = (a << 11 | a >>> 21) + i | 0, s += (a ^ i ^ n) + c[15] + 530742520 | 0, s = (s << 16 | s >>> 16) + a | 0, n += (s ^ a ^ i) + c[2] - 995338651 | 0, n = (n << 23 | n >>> 9) + s | 0, i += (s ^ (n | ~a)) + c[0] - 198630844 | 0, i = (i << 6 | i >>> 26) + n | 0, a += (n ^ (i | ~s)) + c[7] + 1126891415 | 0, a = (a << 10 | a >>> 22) + i | 0, s += (i ^ (a | ~n)) + c[14] - 1416354905 | 0, s = (s << 15 | s >>> 17) + a | 0, n += (a ^ (s | ~i)) + c[5] - 57434055 | 0, n = (n << 21 | n >>> 11) + s | 0, i += (s ^ (n | ~a)) + c[12] + 1700485571 | 0, i = (i << 6 | i >>> 26) + n | 0, a += (n ^ (i | ~s)) + c[3] - 1894986606 | 0, a = (a << 10 | a >>> 22) + i | 0, s += (i ^ (a | ~n)) + c[10] - 1051523 | 0, s = (s << 15 | s >>> 17) + a | 0, n += (a ^ (s | ~i)) + c[1] - 2054922799 | 0, n = (n << 21 | n >>> 11) + s | 0, i += (s ^ (n | ~a)) + c[8] + 1873313359 | 0, i = (i << 6 | i >>> 26) + n | 0, a += (n ^ (i | ~s)) + c[15] - 30611744 | 0, a = (a << 10 | a >>> 22) + i | 0, s += (i ^ (a | ~n)) + c[6] - 1560198380 | 0, s = (s << 15 | s >>> 17) + a | 0, n += (a ^ (s | ~i)) + c[13] + 1309151649 | 0, n = (n << 21 | n >>> 11) + s | 0, i += (s ^ (n | ~a)) + c[4] - 145523070 | 0, i = (i << 6 | i >>> 26) + n | 0, a += (n ^ (i | ~s)) + c[11] - 1120210379 | 0, a = (a << 10 | a >>> 22) + i | 0, s += (i ^ (a | ~n)) + c[2] + 718787259 | 0, s = (s << 15 | s >>> 17) + a | 0, n += (a ^ (s | ~i)) + c[9] - 343485551 | 0, n = (n << 21 | n >>> 11) + s | 0, u[0] = i + u[0] | 0, u[1] = n + u[1] | 0, u[2] = s + u[2] | 0, u[3] = a + u[3] | 0;
    }
    function b(u) {
      var c = [], i;
      for (i = 0; i < 64; i += 4)
        c[i >> 2] = u.charCodeAt(i) + (u.charCodeAt(i + 1) << 8) + (u.charCodeAt(i + 2) << 16) + (u.charCodeAt(i + 3) << 24);
      return c;
    }
    function h(u) {
      var c = [], i;
      for (i = 0; i < 64; i += 4)
        c[i >> 2] = u[i] + (u[i + 1] << 8) + (u[i + 2] << 16) + (u[i + 3] << 24);
      return c;
    }
    function S(u) {
      var c = u.length, i = [1732584193, -271733879, -1732584194, 271733878], n, s, a, x, v, k;
      for (n = 64; n <= c; n += 64)
        l(i, b(u.substring(n - 64, n)));
      for (u = u.substring(n - 64), s = u.length, a = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], n = 0; n < s; n += 1)
        a[n >> 2] |= u.charCodeAt(n) << (n % 4 << 3);
      if (a[n >> 2] |= 128 << (n % 4 << 3), n > 55)
        for (l(i, a), n = 0; n < 16; n += 1)
          a[n] = 0;
      return x = c * 8, x = x.toString(16).match(/(.*?)(.{0,8})$/), v = parseInt(x[2], 16), k = parseInt(x[1], 16) || 0, a[14] = v, a[15] = k, l(i, a), i;
    }
    function w(u) {
      var c = u.length, i = [1732584193, -271733879, -1732584194, 271733878], n, s, a, x, v, k;
      for (n = 64; n <= c; n += 64)
        l(i, h(u.subarray(n - 64, n)));
      for (u = n - 64 < c ? u.subarray(n - 64) : new Uint8Array(0), s = u.length, a = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], n = 0; n < s; n += 1)
        a[n >> 2] |= u[n] << (n % 4 << 3);
      if (a[n >> 2] |= 128 << (n % 4 << 3), n > 55)
        for (l(i, a), n = 0; n < 16; n += 1)
          a[n] = 0;
      return x = c * 8, x = x.toString(16).match(/(.*?)(.{0,8})$/), v = parseInt(x[2], 16), k = parseInt(x[1], 16) || 0, a[14] = v, a[15] = k, l(i, a), i;
    }
    function m(u) {
      var c = "", i;
      for (i = 0; i < 4; i += 1)
        c += f[u >> i * 8 + 4 & 15] + f[u >> i * 8 & 15];
      return c;
    }
    function g(u) {
      var c;
      for (c = 0; c < u.length; c += 1)
        u[c] = m(u[c]);
      return u.join("");
    }
    g(S("hello")), typeof ArrayBuffer < "u" && !ArrayBuffer.prototype.slice && function() {
      function u(c, i) {
        return c = c | 0 || 0, c < 0 ? Math.max(c + i, 0) : Math.min(c, i);
      }
      ArrayBuffer.prototype.slice = function(c, i) {
        var n = this.byteLength, s = u(c, n), a = n, x, v, k, B;
        return i !== r && (a = u(i, n)), s > a ? new ArrayBuffer(0) : (x = a - s, v = new ArrayBuffer(x), k = new Uint8Array(v), B = new Uint8Array(this, s, x), k.set(B), v);
      };
    }();
    function _(u) {
      return /[\u0080-\uFFFF]/.test(u) && (u = unescape(encodeURIComponent(u))), u;
    }
    function A(u, c) {
      var i = u.length, n = new ArrayBuffer(i), s = new Uint8Array(n), a;
      for (a = 0; a < i; a += 1)
        s[a] = u.charCodeAt(a);
      return c ? s : n;
    }
    function C(u) {
      return String.fromCharCode.apply(null, new Uint8Array(u));
    }
    function I(u, c, i) {
      var n = new Uint8Array(u.byteLength + c.byteLength);
      return n.set(new Uint8Array(u)), n.set(new Uint8Array(c), u.byteLength), i ? n : n.buffer;
    }
    function P(u) {
      var c = [], i = u.length, n;
      for (n = 0; n < i - 1; n += 2)
        c.push(parseInt(u.substr(n, 2), 16));
      return String.fromCharCode.apply(String, c);
    }
    function d() {
      this.reset();
    }
    return d.prototype.append = function(u) {
      return this.appendBinary(_(u)), this;
    }, d.prototype.appendBinary = function(u) {
      this._buff += u, this._length += u.length;
      var c = this._buff.length, i;
      for (i = 64; i <= c; i += 64)
        l(this._hash, b(this._buff.substring(i - 64, i)));
      return this._buff = this._buff.substring(i - 64), this;
    }, d.prototype.end = function(u) {
      var c = this._buff, i = c.length, n, s = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], a;
      for (n = 0; n < i; n += 1)
        s[n >> 2] |= c.charCodeAt(n) << (n % 4 << 3);
      return this._finish(s, i), a = g(this._hash), u && (a = P(a)), this.reset(), a;
    }, d.prototype.reset = function() {
      return this._buff = "", this._length = 0, this._hash = [1732584193, -271733879, -1732584194, 271733878], this;
    }, d.prototype.getState = function() {
      return {
        buff: this._buff,
        length: this._length,
        hash: this._hash.slice()
      };
    }, d.prototype.setState = function(u) {
      return this._buff = u.buff, this._length = u.length, this._hash = u.hash, this;
    }, d.prototype.destroy = function() {
      delete this._hash, delete this._buff, delete this._length;
    }, d.prototype._finish = function(u, c) {
      var i = c, n, s, a;
      if (u[i >> 2] |= 128 << (i % 4 << 3), i > 55)
        for (l(this._hash, u), i = 0; i < 16; i += 1)
          u[i] = 0;
      n = this._length * 8, n = n.toString(16).match(/(.*?)(.{0,8})$/), s = parseInt(n[2], 16), a = parseInt(n[1], 16) || 0, u[14] = s, u[15] = a, l(this._hash, u);
    }, d.hash = function(u, c) {
      return d.hashBinary(_(u), c);
    }, d.hashBinary = function(u, c) {
      var i = S(u), n = g(i);
      return c ? P(n) : n;
    }, d.ArrayBuffer = function() {
      this.reset();
    }, d.ArrayBuffer.prototype.append = function(u) {
      var c = I(this._buff.buffer, u, !0), i = c.length, n;
      for (this._length += u.byteLength, n = 64; n <= i; n += 64)
        l(this._hash, h(c.subarray(n - 64, n)));
      return this._buff = n - 64 < i ? new Uint8Array(c.buffer.slice(n - 64)) : new Uint8Array(0), this;
    }, d.ArrayBuffer.prototype.end = function(u) {
      var c = this._buff, i = c.length, n = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], s, a;
      for (s = 0; s < i; s += 1)
        n[s >> 2] |= c[s] << (s % 4 << 3);
      return this._finish(n, i), a = g(this._hash), u && (a = P(a)), this.reset(), a;
    }, d.ArrayBuffer.prototype.reset = function() {
      return this._buff = new Uint8Array(0), this._length = 0, this._hash = [1732584193, -271733879, -1732584194, 271733878], this;
    }, d.ArrayBuffer.prototype.getState = function() {
      var u = d.prototype.getState.call(this);
      return u.buff = C(u.buff), u;
    }, d.ArrayBuffer.prototype.setState = function(u) {
      return u.buff = A(u.buff, !0), d.prototype.setState.call(this, u);
    }, d.ArrayBuffer.prototype.destroy = d.prototype.destroy, d.ArrayBuffer.prototype._finish = d.prototype._finish, d.ArrayBuffer.hash = function(u, c) {
      var i = w(new Uint8Array(u)), n = g(i);
      return c ? P(n) : n;
    }, d;
  });
})(at);
var On = at.exports;
const Mn = /* @__PURE__ */ Ie(On), re = (e) => typeof e == "function" ? e() : e;
function z(e) {
  return !(e && (typeof e != "object" || (Array.isArray(e) ? e.length : Object.keys(e).length)));
}
function jn(e) {
  const o = new RegExp(`(^|&)${e}=([^&]*)(&|$)`), r = window.location.search.substring(1).match(o) || window.location.hash.substring(window.location.hash.search(/\?/) + 1).match(o);
  return r !== null ? decodeURIComponent(r[2]) : null;
}
function kn(e) {
  for (var o = [], r = 0; r < e.length; ) {
    var f = e[r];
    if (f === "*" || f === "+" || f === "?") {
      o.push({ type: "MODIFIER", index: r, value: e[r++] });
      continue;
    }
    if (f === "\\") {
      o.push({ type: "ESCAPED_CHAR", index: r++, value: e[r++] });
      continue;
    }
    if (f === "{") {
      o.push({ type: "OPEN", index: r, value: e[r++] });
      continue;
    }
    if (f === "}") {
      o.push({ type: "CLOSE", index: r, value: e[r++] });
      continue;
    }
    if (f === ":") {
      for (var l = "", b = r + 1; b < e.length; ) {
        var h = e.charCodeAt(b);
        if (
          // `0-9`
          h >= 48 && h <= 57 || // `A-Z`
          h >= 65 && h <= 90 || // `a-z`
          h >= 97 && h <= 122 || // `_`
          h === 95
        ) {
          l += e[b++];
          continue;
        }
        break;
      }
      if (!l)
        throw new TypeError("Missing parameter name at ".concat(r));
      o.push({ type: "NAME", index: r, value: l }), r = b;
      continue;
    }
    if (f === "(") {
      var S = 1, w = "", b = r + 1;
      if (e[b] === "?")
        throw new TypeError('Pattern cannot start with "?" at '.concat(b));
      for (; b < e.length; ) {
        if (e[b] === "\\") {
          w += e[b++] + e[b++];
          continue;
        }
        if (e[b] === ")") {
          if (S--, S === 0) {
            b++;
            break;
          }
        } else if (e[b] === "(" && (S++, e[b + 1] !== "?"))
          throw new TypeError("Capturing groups are not allowed at ".concat(b));
        w += e[b++];
      }
      if (S)
        throw new TypeError("Unbalanced pattern at ".concat(r));
      if (!w)
        throw new TypeError("Missing pattern at ".concat(r));
      o.push({ type: "PATTERN", index: r, value: w }), r = b;
      continue;
    }
    o.push({ type: "CHAR", index: r, value: e[r++] });
  }
  return o.push({ type: "END", index: r, value: "" }), o;
}
function Un(e, o) {
  o === void 0 && (o = {});
  for (var r = kn(e), f = o.prefixes, l = f === void 0 ? "./" : f, b = "[^".concat(Q(o.delimiter || "/#?"), "]+?"), h = [], S = 0, w = 0, m = "", g = function(a) {
    if (w < r.length && r[w].type === a)
      return r[w++].value;
  }, _ = function(a) {
    var x = g(a);
    if (x !== void 0)
      return x;
    var v = r[w], k = v.type, B = v.index;
    throw new TypeError("Unexpected ".concat(k, " at ").concat(B, ", expected ").concat(a));
  }, A = function() {
    for (var a = "", x; x = g("CHAR") || g("ESCAPED_CHAR"); )
      a += x;
    return a;
  }; w < r.length; ) {
    var C = g("CHAR"), I = g("NAME"), P = g("PATTERN");
    if (I || P) {
      var d = C || "";
      l.indexOf(d) === -1 && (m += d, d = ""), m && (h.push(m), m = ""), h.push({
        name: I || S++,
        prefix: d,
        suffix: "",
        pattern: P || b,
        modifier: g("MODIFIER") || ""
      });
      continue;
    }
    var u = C || g("ESCAPED_CHAR");
    if (u) {
      m += u;
      continue;
    }
    m && (h.push(m), m = "");
    var c = g("OPEN");
    if (c) {
      var d = A(), i = g("NAME") || "", n = g("PATTERN") || "", s = A();
      _("CLOSE"), h.push({
        name: i || (n ? S++ : ""),
        pattern: i && !n ? b : n,
        prefix: d,
        suffix: s,
        modifier: g("MODIFIER") || ""
      });
      continue;
    }
    _("END");
  }
  return h;
}
function Q(e) {
  return e.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
function st(e) {
  return e && e.sensitive ? "" : "i";
}
function Rn(e, o) {
  if (!o)
    return e;
  for (var r = /\((?:\?<(.*?)>)?(?!\?)/g, f = 0, l = r.exec(e.source); l; )
    o.push({
      // Use parenthesized substring match if available, index otherwise
      name: l[1] || f++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    }), l = r.exec(e.source);
  return e;
}
function Wn(e, o, r) {
  var f = e.map(function(l) {
    return ct(l, o, r).source;
  });
  return new RegExp("(?:".concat(f.join("|"), ")"), st(r));
}
function Bn(e, o, r) {
  return Ln(Un(e, r), o, r);
}
function Ln(e, o, r) {
  r === void 0 && (r = {});
  for (var f = r.strict, l = f === void 0 ? !1 : f, b = r.start, h = b === void 0 ? !0 : b, S = r.end, w = S === void 0 ? !0 : S, m = r.encode, g = m === void 0 ? function(B) {
    return B;
  } : m, _ = r.delimiter, A = _ === void 0 ? "/#?" : _, C = r.endsWith, I = C === void 0 ? "" : C, P = "[".concat(Q(I), "]|$"), d = "[".concat(Q(A), "]"), u = h ? "^" : "", c = 0, i = e; c < i.length; c++) {
    var n = i[c];
    if (typeof n == "string")
      u += Q(g(n));
    else {
      var s = Q(g(n.prefix)), a = Q(g(n.suffix));
      if (n.pattern)
        if (o && o.push(n), s || a)
          if (n.modifier === "+" || n.modifier === "*") {
            var x = n.modifier === "*" ? "?" : "";
            u += "(?:".concat(s, "((?:").concat(n.pattern, ")(?:").concat(a).concat(s, "(?:").concat(n.pattern, "))*)").concat(a, ")").concat(x);
          } else
            u += "(?:".concat(s, "(").concat(n.pattern, ")").concat(a, ")").concat(n.modifier);
        else
          n.modifier === "+" || n.modifier === "*" ? u += "((?:".concat(n.pattern, ")").concat(n.modifier, ")") : u += "(".concat(n.pattern, ")").concat(n.modifier);
      else
        u += "(?:".concat(s).concat(a, ")").concat(n.modifier);
    }
  }
  if (w)
    l || (u += "".concat(d, "?")), u += r.endsWith ? "(?=".concat(P, ")") : "$";
  else {
    var v = e[e.length - 1], k = typeof v == "string" ? d.indexOf(v[v.length - 1]) > -1 : v === void 0;
    l || (u += "(?:".concat(d, "(?=").concat(P, "))?")), k || (u += "(?=".concat(d, "|").concat(P, ")"));
  }
  return new RegExp(u, st(r));
}
function ct(e, o, r) {
  return e instanceof RegExp ? Rn(e, o) : Array.isArray(e) ? Wn(e, o, r) : Bn(e, o, r);
}
const ut = "_$mockHttp", ft = typeof window < "u", lt = ft ? window.top || window : {}, pt = () => lt[ut] || {
  isMock: !1,
  mockData: []
}, Ae = (e) => {
  const o = pt();
  lt[ut] = Object.assign(o, e);
}, $n = (e) => {
  Ae({ mockData: e });
}, Nn = () => {
  Ae({ isMock: !0 });
}, Dn = () => {
  Ae({ isMock: !0 });
};
if (ft) {
  const e = window.fetch;
  window.fetch = async function(...o) {
    var f;
    const r = pt();
    if (r.isMock && o[0] !== null) {
      let l, b = "";
      typeof o[0] == "object" ? (l = o[0], b = l.url) : (l = o[1], b = o[0]);
      const h = new URL(b, "http://localhost"), S = (f = r.mockData) == null ? void 0 : f.find((w) => {
        if (!w || !w.url || w.method && w.method.toUpperCase() !== (l == null ? void 0 : l.method))
          return !1;
        const m = new URL(w.url, "http://localhost"), g = new URLSearchParams(m.search), _ = new URLSearchParams(h.search);
        for (const [A, C] of g)
          if (_.get(A) !== C)
            return !1;
        return ct(m.pathname).test(h.pathname);
      });
      if (S) {
        const { response: w, timeout: m, statusCode: g } = S;
        m && await new Promise((A) => setTimeout(A, m));
        const _ = typeof w == "function" ? w(l) : w;
        return console.debug("mock success: " + b), console.debug(_), _ instanceof Response ? Promise.resolve(_) : Promise.resolve(
          new Response(JSON.stringify(_), {
            status: g || 200,
            headers: { "Content-Type": "application/json" }
          })
        );
      }
    }
    return e.apply(this, o);
  };
}
var dt = /* @__PURE__ */ ((e) => (e.Json = "application/json;charset=UTF-8", e.FormURLEncoded = "application/x-www-form-urlencoded;charset=UTF-8", e.FormData = "multipart/form-data;charset=UTF-8", e))(dt || {});
class Vn {
  constructor() {
    E(this, "key", "");
    E(this, "fetchPromise");
    /**
     * 服务基础路径
     */
    E(this, "baseURL", "");
    /**
     * 请求路径
     */
    E(this, "path", "");
    /**
     * 请求全路径
     */
    E(this, "url", "");
    E(this, "originUrl", "");
    /**
     * 请求结果
     */
    E(this, "result", null);
    /**
     * 请求参数
     */
    E(this, "requestOptions", {});
    /**
     * 请求信息
     */
    E(this, "request");
    /**
     * 请求体
     */
    E(this, "requestBody");
    /**
     * 请求返回信息
     */
    E(this, "response");
  }
}
class ne {
  constructor(o) {
    /**
     * 服务基础路径
     */
    E(this, "baseURL");
    /**
     * 指定请求超时的毫秒数（默认永不超时，Chrome中网络请求超时为300秒，Firefox中为90秒）
     */
    E(this, "timeout");
    /**
     * 服务中间件
     */
    E(this, "middlewares");
    this.baseURL = o || "", this.middlewares = [];
  }
  normalizeUrl(o) {
    return o.toString().replace(/(^\/+|\/+$)/g, "");
  }
  normalizeUrlParams(o, r) {
    if (z(r))
      return "";
    const f = ~o.indexOf("?") ? "&" : "?";
    return typeof r == "object" ? f + Object.entries(r).map(
      (l) => encodeURIComponent(l[0]) + "=" + encodeURIComponent(l[1] === void 0 || l[1] === null ? "" : l[1])
    ).join("&") : r !== "" ? f + re(r) : "";
  }
}
class Fn {
  constructor(o) {
    E(this, "middlewares");
    E(this, "options");
    E(this, "pendingMap");
    E(this, "capture");
    E(this, "onceCapture");
    E(this, "history");
    E(this, "setMockData", $n);
    E(this, "openMock", Nn);
    E(this, "closeMock", Dn);
    if (this.middlewares = [], this.pendingMap = /* @__PURE__ */ new Map(), this.history = [], o instanceof ne) {
      const r = new ne();
      r.baseURL = o.baseURL, r.middlewares = o.middlewares, r.timeout = o.timeout, this.options = r;
    } else
      this.options = new ne(o);
  }
  /**
   * 新增中间件
   * @param middleware 中间件
   */
  use(o) {
    return this.middlewares.push(o), this;
  }
  getUrl(o, r, f = "") {
    let l = o ? new URL(r, new URL(o, window.location.href).toString()).toString() : r;
    return f && (l += this.options.normalizeUrlParams(l, f)), l;
  }
  createContext(o, r = {}) {
    const f = this.options, l = re(f.baseURL);
    let b = re(o);
    b = f.normalizeUrl(encodeURI(b));
    let h = new Vn();
    h.baseURL = l, h.path = b, h.originUrl = this.getUrl(l, b), r.params ? h.url = h.originUrl + this.options.normalizeUrlParams(h.originUrl, r.params) : h.url = h.originUrl, h.requestOptions = {
      headers: {},
      timeout: f.timeout,
      ...r
    };
    const S = !z(r == null ? void 0 : r.body);
    let w = !1;
    const m = new Mn();
    m.append(r.method || ""), m.append(h.url), S && (w = V(r.body), h.requestBody = r.body, r.body instanceof URLSearchParams ? m.append(r.body.toString()) : r.body instanceof FormData ? m.append(
      Array.from(r.body).map(([_, A]) => _.toString() + "=" + A.toString()).join("&")
    ) : w && m.append(JSON.stringify(r.body))), h.key = m.end();
    const g = this.pendingMap.get(h.key);
    if (g)
      console.debug(
        "[WebCore Http]: The same request is being executed, and this request has been cancelled. url: " + h.url
      ), h = g;
    else if (this.pendingMap.set(h.key, h), S && w) {
      let _ = !1;
      const A = new FormData();
      for (const C in r.body)
        if (Object.prototype.hasOwnProperty.call(r.body, C)) {
          const I = r.body[C];
          I instanceof Blob && (_ = !0), A.append(C, I);
        }
      _ && (h.requestBody = A, h.requestOptions.body = A);
    }
    return h;
  }
  createRequest(o, r = {}, f = []) {
    const l = this.createContext(o, r), b = this.options;
    let h = [];
    typeof b.middlewares == "function" && (h = h.concat(re(b.middlewares))), h = h.concat(this.middlewares), f && (typeof f == "function" ? (h.push(f), l.fetchPromise = void 0) : f instanceof Array && f.length > 0 && (h = h.concat(f), l.fetchPromise = void 0));
    const S = (w) => {
      const m = h[w];
      if (!m) {
        if (l.requestOptions.timeout && !l.requestOptions.signal) {
          const g = new AbortController();
          l.requestOptions.signal = g.signal, setTimeout(() => g.abort(), l.requestOptions.timeout);
        }
        return l.request = new Request(l.url, l.requestOptions), fetch(l.request).then((g) => (l.response = g, g)).finally(() => {
          this.pendingMap.has(l.key) && window.setTimeout(() => {
            this.pendingMap.delete(l.key);
          }, 600);
        });
      }
      try {
        return Promise.resolve(m(l, S.bind(null, w + 1)));
      } catch (g) {
        return Promise.reject(g);
      }
    };
    return l.fetchPromise || (l.fetchPromise = S(0).then((w) => {
      if (this.onceCapture || this.capture) {
        const m = !z(l.requestOptions.body), g = !z(l.requestOptions.params), _ = {
          api: l.originUrl,
          method: l.requestOptions.method,
          headers: l.requestOptions.headers,
          data: m ? l.requestOptions.body : g ? JSON.stringify(l.requestOptions.params) : null,
          hasParams: g
        };
        this.history.push(_), this.onceCapture && (this.onceCapture(_), this.onceCapture = void 0);
      }
      return w;
    })), l.fetchPromise.then((w) => h.length > 0 ? l.result : w);
  }
  request(o, r = {}, f = []) {
    if (r.throttle !== void 0 && r.debounce !== void 0)
      throw new Error("throttle and debounce cannot be set at the same time");
    return r.throttle ? new Promise((l) => {
      En(() => l(this.createRequest(o, r, f)), r.throttle);
    }) : r.debounce ? new Promise((l) => {
      it(() => l(this.createRequest(o, r, f)), r.debounce);
    }) : this.createRequest(o, r, f);
  }
  get(o, r, f = {}, l = []) {
    return f.method = "GET", f.params = r, this.request(o, f, l);
  }
  post(o, r, f = {}, l = []) {
    return f.method = "POST", f.body = r, this.request(o, f, l);
  }
  patch(o, r = {}, f = []) {
    return r.method = "PATCH", this.request(o, r, f);
  }
  put(o, r = {}, f = []) {
    return r.method = "PUT", this.request(o, r, f);
  }
  delete(o, r = {}, f = []) {
    return r.method = "DELETE", this.request(o, r, f);
  }
  upload(o, r, f = {}, l = []) {
    return f.method = "POST", f.body = r, this.request(o, f, l);
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
class Jn {
  constructor() {
    E(this, "items");
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
        const f = this.items[r];
        o(r, f);
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
var gt = { exports: {} };
(function(e) {
  var o = Object.prototype.hasOwnProperty, r = "~";
  function f() {
  }
  Object.create && (f.prototype = /* @__PURE__ */ Object.create(null), new f().__proto__ || (r = !1));
  function l(w, m, g) {
    this.fn = w, this.context = m, this.once = g || !1;
  }
  function b(w, m, g, _, A) {
    if (typeof g != "function")
      throw new TypeError("The listener must be a function");
    var C = new l(g, _ || w, A), I = r ? r + m : m;
    return w._events[I] ? w._events[I].fn ? w._events[I] = [w._events[I], C] : w._events[I].push(C) : (w._events[I] = C, w._eventsCount++), w;
  }
  function h(w, m) {
    --w._eventsCount === 0 ? w._events = new f() : delete w._events[m];
  }
  function S() {
    this._events = new f(), this._eventsCount = 0;
  }
  S.prototype.eventNames = function() {
    var m = [], g, _;
    if (this._eventsCount === 0)
      return m;
    for (_ in g = this._events)
      o.call(g, _) && m.push(r ? _.slice(1) : _);
    return Object.getOwnPropertySymbols ? m.concat(Object.getOwnPropertySymbols(g)) : m;
  }, S.prototype.listeners = function(m) {
    var g = r ? r + m : m, _ = this._events[g];
    if (!_)
      return [];
    if (_.fn)
      return [_.fn];
    for (var A = 0, C = _.length, I = new Array(C); A < C; A++)
      I[A] = _[A].fn;
    return I;
  }, S.prototype.listenerCount = function(m) {
    var g = r ? r + m : m, _ = this._events[g];
    return _ ? _.fn ? 1 : _.length : 0;
  }, S.prototype.emit = function(m, g, _, A, C, I) {
    var P = r ? r + m : m;
    if (!this._events[P])
      return !1;
    var d = this._events[P], u = arguments.length, c, i;
    if (d.fn) {
      switch (d.once && this.removeListener(m, d.fn, void 0, !0), u) {
        case 1:
          return d.fn.call(d.context), !0;
        case 2:
          return d.fn.call(d.context, g), !0;
        case 3:
          return d.fn.call(d.context, g, _), !0;
        case 4:
          return d.fn.call(d.context, g, _, A), !0;
        case 5:
          return d.fn.call(d.context, g, _, A, C), !0;
        case 6:
          return d.fn.call(d.context, g, _, A, C, I), !0;
      }
      for (i = 1, c = new Array(u - 1); i < u; i++)
        c[i - 1] = arguments[i];
      d.fn.apply(d.context, c);
    } else {
      var n = d.length, s;
      for (i = 0; i < n; i++)
        switch (d[i].once && this.removeListener(m, d[i].fn, void 0, !0), u) {
          case 1:
            d[i].fn.call(d[i].context);
            break;
          case 2:
            d[i].fn.call(d[i].context, g);
            break;
          case 3:
            d[i].fn.call(d[i].context, g, _);
            break;
          case 4:
            d[i].fn.call(d[i].context, g, _, A);
            break;
          default:
            if (!c)
              for (s = 1, c = new Array(u - 1); s < u; s++)
                c[s - 1] = arguments[s];
            d[i].fn.apply(d[i].context, c);
        }
    }
    return !0;
  }, S.prototype.on = function(m, g, _) {
    return b(this, m, g, _, !1);
  }, S.prototype.once = function(m, g, _) {
    return b(this, m, g, _, !0);
  }, S.prototype.removeListener = function(m, g, _, A) {
    var C = r ? r + m : m;
    if (!this._events[C])
      return this;
    if (!g)
      return h(this, C), this;
    var I = this._events[C];
    if (I.fn)
      I.fn === g && (!A || I.once) && (!_ || I.context === _) && h(this, C);
    else {
      for (var P = 0, d = [], u = I.length; P < u; P++)
        (I[P].fn !== g || A && !I[P].once || _ && I[P].context !== _) && d.push(I[P]);
      d.length ? this._events[C] = d.length === 1 ? d[0] : d : h(this, C);
    }
    return this;
  }, S.prototype.removeAllListeners = function(m) {
    var g;
    return m ? (g = r ? r + m : m, this._events[g] && h(this, g)) : (this._events = new f(), this._eventsCount = 0), this;
  }, S.prototype.off = S.prototype.removeListener, S.prototype.addListener = S.prototype.on, S.prefixed = r, S.EventEmitter = S, e.exports = S;
})(gt);
var qn = gt.exports;
const Hn = /* @__PURE__ */ Ie(qn);
class Qn extends Hn {
}
const _e = "_ipc";
class zn {
  constructor(o = null) {
    /**
     * 事件触发器
     */
    E(this, "emitter");
    /**
     * iframe窗口对象
     */
    E(this, "contentWindow", null);
    /**
     * 是否跨域
     */
    E(this, "isCrossOrigin", !1);
    if (this.emitter = new Qn(), o) {
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
        const f = this.contentWindow[_e];
        if (f) {
          f.send(o, r);
          return;
        }
      }
      this.emitter.emit(o, r);
    }
  }
}
class Ce {
  constructor() {
    /**
     * 目标监听器清单
     */
    E(this, "targets");
    E(this, "sendingEvents", /* @__PURE__ */ new Set());
    this.targets = new Jn();
  }
  static init() {
    const o = new Ce();
    if (typeof window < "u") {
      const r = window[_e];
      if (r)
        return r;
      window[_e] = o;
    }
    return o;
  }
  /**
   * 添加目标监听器
   * @param key 目标名称
   */
  addTarget(o, r = null) {
    const f = this.targets.items[o];
    if (f) {
      f.contentWindow = r;
      return;
    }
    this.targets.add(o, new zn(r));
  }
  /**
   * 删除目标监听器
   * @param key 目标名称
   */
  removeTarget(o) {
    this.targets.remove(o);
  }
  remove(o, r, f) {
    var l;
    return typeof r == "function" && (f = r, r = "*"), r && f ? (l = this.targets.get(r)) == null || l.emitter.removeListener(o, f) : this.targets.map((b, h) => {
      h.emitter.removeAllListeners(o);
    }), this;
  }
  on(o, r, f) {
    var l;
    return typeof r == "function" && (f = r, r = "*"), f && (this.addTarget(r), (l = this.targets.get(r)) == null || l.emitter.on(o, f)), this;
  }
  once(o, r, f) {
    var l;
    return typeof r == "function" && (f = r, r = "*"), f && (this.addTarget(r), (l = this.targets.get(r)) == null || l.emitter.once(o, f)), this;
  }
  /**
   * 执行所有监听器
   * @param event 事件名
   * @param args 参数
   */
  send(o, r) {
    this.sendingEvents.has(o) || (this.sendingEvents.add(o), this.targets.map((f, l) => {
      l.send(o, r);
    }), this.sendingEvents.delete(o));
  }
}
const Gn = (e) => {
  const o = {
    quality: 70,
    // 默认图片质量为70
    type: "all"
    // 默认type为'all'
  };
  return new Promise((r, f) => {
    window._app.camera({ ...o, ...e }, (l) => {
      l ? r(l) : f("Failed to get image");
    });
  });
}, Xn = () => new Promise((e, o) => {
  window._app.scan((r) => {
    r ? e(r) : o("Failed to scan");
  });
}), Kn = () => new Promise((e) => {
  window._app.location((o, r) => {
    e({ latitude: o, longitude: r });
  });
}), Yn = () => {
  window._app.locationCancel();
}, Zn = (e, o = "url") => {
  window._app.pdfPreview(o, e);
}, eo = (e, o) => {
  window._app.setStorage(e, o);
}, to = (e) => window._app.getStorage(e), ro = () => {
  window._app.back();
}, no = () => {
  window._app.close();
}, oo = (e, o, r = "url") => {
  window._app.download(r, o, e);
}, io = (e, o = 200) => {
  window._app.vibratorInit(e, o);
}, ao = () => {
  window._app.vibratorCancel();
}, so = (e, o) => {
  window._app.playResult(e, o);
}, co = (e) => {
  window._app.textToSpeech(e);
}, uo = () => {
  window._app.playSystem();
}, fo = () => {
  window._app.logout();
}, lo = (e) => {
  window._app.onBackPressed = e;
}, po = () => {
  window._app.onBackPressed = void 0;
}, go = (e) => new Promise((o) => {
  window._app.openWebWindow(e, (r) => {
    o(r);
  });
}), ho = (e) => {
  window._app.closeWithResult(e);
}, He = {
  logout: fo,
  openCamera: Gn,
  openScan: Xn,
  openLocation: Kn,
  closeLocation: Yn,
  openPdfPreview: Zn,
  setStorage: eo,
  getStorage: to,
  pagePrevious: ro,
  pageClose: no,
  downloadFile: oo,
  turnOnVibration: io,
  turnOffVibration: ao,
  playVoice: so,
  playVoiceByText: co,
  playSystemSound: uo,
  registerBackPressedListener: lo,
  unregisterBackPressedListener: po,
  openWebWindow: go,
  closeWithResult: ho,
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
var ht = { exports: {} };
(function(e, o) {
  ht.exports = o(e);
})(typeof window == "object" && window, function(e, o) {
  if (!e) {
    console.warn("can't use weixin-js-sdk in server side");
    return;
  }
  var r, f, l, b, h, S, w, m, g, _, A, C, I, P, d, u, c, i, n, s, a, x;
  if (e.jWeixin)
    return e.jWeixin;
  return r = {
    config: "preVerifyJSAPI",
    onMenuShareTimeline: "menu:share:timeline",
    onMenuShareAppMessage: "menu:share:appmessage",
    onMenuShareQQ: "menu:share:qq",
    onMenuShareWeibo: "menu:share:weiboApp",
    onMenuShareQZone: "menu:share:QZone",
    previewImage: "imagePreview",
    getLocation: "geoLocation",
    openProductSpecificView: "openProductViewWithPid",
    addCard: "batchAddCard",
    openCard: "batchViewCard",
    chooseWXPay: "getBrandWCPayRequest",
    openEnterpriseRedPacket: "getRecevieBizHongBaoRequest",
    startSearchBeacons: "startMonitoringBeacons",
    stopSearchBeacons: "stopMonitoringBeacons",
    onSearchBeacons: "onBeaconsInRange",
    consumeAndShareCard: "consumedShareCard",
    openAddress: "editAddress"
  }, f = function() {
    var t, p = {};
    for (t in r)
      p[r[t]] = t;
    return p;
  }(), l = e.document, b = l.title, h = navigator.userAgent.toLowerCase(), C = navigator.platform.toLowerCase(), S = !(!C.match("mac") && !C.match("win")), w = h.indexOf("wxdebugger") != -1, m = h.indexOf("micromessenger") != -1, g = h.indexOf("android") != -1, _ = h.indexOf("iphone") != -1 || h.indexOf("ipad") != -1, A = (C = h.match(/micromessenger\/(\d+\.\d+\.\d+)/) || h.match(/micromessenger\/(\d+\.\d+)/)) ? C[1] : "", I = {
    initStartTime: ee(),
    initEndTime: 0,
    preVerifyStartTime: 0,
    preVerifyEndTime: 0
  }, P = {
    version: 1,
    appId: "",
    initTime: 0,
    preVerifyTime: 0,
    networkType: "",
    isPreVerifyOk: 1,
    systemType: _ ? 1 : g ? 2 : -1,
    clientVersion: A,
    url: encodeURIComponent(location.href)
  }, d = {}, u = { _completes: [] }, c = { state: 0, data: {} }, L(function() {
    I.initEndTime = ee();
  }), i = !1, n = [], s = {
    config: function(t) {
      se("config", d = t);
      var p = d.check !== !1;
      L(function() {
        if (p)
          v(
            r.config,
            {
              verifyJsApiList: ae(d.jsApiList),
              verifyOpenTagList: ae(d.openTagList)
            },
            (u._complete = function(R) {
              I.preVerifyEndTime = ee(), c.state = 1, c.data = R;
            }, u.success = function(R) {
              P.isPreVerifyOk = 0;
            }, u.fail = function(R) {
              u._fail ? u._fail(R) : c.state = -1;
            }, (U = u._completes).push(function() {
              Oe();
            }), u.complete = function(R) {
              for (var O = 0, D = U.length; O < D; ++O)
                U[O]();
              u._completes = [];
            }, u)
          ), I.preVerifyStartTime = ee();
        else {
          c.state = 1;
          for (var y = u._completes, T = 0, M = y.length; T < M; ++T)
            y[T]();
          u._completes = [];
        }
        var U;
      }), s.invoke || (s.invoke = function(y, T, M) {
        e.WeixinJSBridge && WeixinJSBridge.invoke(y, B(T), M);
      }, s.on = function(y, T) {
        e.WeixinJSBridge && WeixinJSBridge.on(y, T);
      });
    },
    ready: function(t) {
      (c.state != 0 || (u._completes.push(t), !m && d.debug)) && t();
    },
    error: function(t) {
      A < "6.0.2" || (c.state == -1 ? t(c.data) : u._fail = t);
    },
    checkJsApi: function(t) {
      v(
        "checkJsApi",
        { jsApiList: ae(t.jsApiList) },
        (t._complete = function(p) {
          g && (T = p.checkResult) && (p.checkResult = JSON.parse(T));
          var y, T = p, M = T.checkResult;
          for (y in M) {
            var U = f[y];
            U && (M[U] = M[y], delete M[y]);
          }
        }, t)
      );
    },
    onMenuShareTimeline: function(t) {
      k(
        r.onMenuShareTimeline,
        {
          complete: function() {
            v(
              "shareTimeline",
              {
                title: t.title || b,
                desc: t.title || b,
                img_url: t.imgUrl || "",
                link: t.link || location.href,
                type: t.type || "link",
                data_url: t.dataUrl || ""
              },
              t
            );
          }
        },
        t
      );
    },
    onMenuShareAppMessage: function(t) {
      k(
        r.onMenuShareAppMessage,
        {
          complete: function(p) {
            p.scene === "favorite" ? v("sendAppMessage", {
              title: t.title || b,
              desc: t.desc || "",
              link: t.link || location.href,
              img_url: t.imgUrl || "",
              type: t.type || "link",
              data_url: t.dataUrl || ""
            }) : v(
              "sendAppMessage",
              {
                title: t.title || b,
                desc: t.desc || "",
                link: t.link || location.href,
                img_url: t.imgUrl || "",
                type: t.type || "link",
                data_url: t.dataUrl || ""
              },
              t
            );
          }
        },
        t
      );
    },
    onMenuShareQQ: function(t) {
      k(
        r.onMenuShareQQ,
        {
          complete: function() {
            v(
              "shareQQ",
              {
                title: t.title || b,
                desc: t.desc || "",
                img_url: t.imgUrl || "",
                link: t.link || location.href
              },
              t
            );
          }
        },
        t
      );
    },
    onMenuShareWeibo: function(t) {
      k(
        r.onMenuShareWeibo,
        {
          complete: function() {
            v(
              "shareWeiboApp",
              {
                title: t.title || b,
                desc: t.desc || "",
                img_url: t.imgUrl || "",
                link: t.link || location.href
              },
              t
            );
          }
        },
        t
      );
    },
    onMenuShareQZone: function(t) {
      k(
        r.onMenuShareQZone,
        {
          complete: function() {
            v(
              "shareQZone",
              {
                title: t.title || b,
                desc: t.desc || "",
                img_url: t.imgUrl || "",
                link: t.link || location.href
              },
              t
            );
          }
        },
        t
      );
    },
    updateTimelineShareData: function(t) {
      v(
        "updateTimelineShareData",
        { title: t.title, link: t.link, imgUrl: t.imgUrl },
        t
      );
    },
    updateAppMessageShareData: function(t) {
      v(
        "updateAppMessageShareData",
        { title: t.title, desc: t.desc, link: t.link, imgUrl: t.imgUrl },
        t
      );
    },
    startRecord: function(t) {
      v("startRecord", {}, t);
    },
    stopRecord: function(t) {
      v("stopRecord", {}, t);
    },
    onVoiceRecordEnd: function(t) {
      k("onVoiceRecordEnd", t);
    },
    playVoice: function(t) {
      v("playVoice", { localId: t.localId }, t);
    },
    pauseVoice: function(t) {
      v("pauseVoice", { localId: t.localId }, t);
    },
    stopVoice: function(t) {
      v("stopVoice", { localId: t.localId }, t);
    },
    onVoicePlayEnd: function(t) {
      k("onVoicePlayEnd", t);
    },
    uploadVoice: function(t) {
      v(
        "uploadVoice",
        {
          localId: t.localId,
          isShowProgressTips: t.isShowProgressTips == 0 ? 0 : 1
        },
        t
      );
    },
    downloadVoice: function(t) {
      v(
        "downloadVoice",
        {
          serverId: t.serverId,
          isShowProgressTips: t.isShowProgressTips == 0 ? 0 : 1
        },
        t
      );
    },
    translateVoice: function(t) {
      v(
        "translateVoice",
        {
          localId: t.localId,
          isShowProgressTips: t.isShowProgressTips == 0 ? 0 : 1
        },
        t
      );
    },
    chooseImage: function(t) {
      v(
        "chooseImage",
        {
          scene: "1|2",
          count: t.count || 9,
          sizeType: t.sizeType || ["original", "compressed"],
          sourceType: t.sourceType || ["album", "camera"]
        },
        (t._complete = function(p) {
          if (g) {
            var y = p.localIds;
            try {
              y && (p.localIds = JSON.parse(y));
            } catch {
            }
          }
        }, t)
      );
    },
    getLocation: function(t) {
      t = t || {}, v(
        r.getLocation,
        { type: t.type || "wgs84" },
        (t._complete = function(p) {
          delete p.type;
        }, t)
      );
    },
    previewImage: function(t) {
      v(r.previewImage, { current: t.current, urls: t.urls }, t);
    },
    uploadImage: function(t) {
      v(
        "uploadImage",
        {
          localId: t.localId,
          isShowProgressTips: t.isShowProgressTips == 0 ? 0 : 1
        },
        t
      );
    },
    downloadImage: function(t) {
      v(
        "downloadImage",
        {
          serverId: t.serverId,
          isShowProgressTips: t.isShowProgressTips == 0 ? 0 : 1
        },
        t
      );
    },
    getLocalImgData: function(t) {
      i === !1 ? (i = !0, v(
        "getLocalImgData",
        { localId: t.localId },
        (t._complete = function(p) {
          var y;
          i = !1, 0 < n.length && (y = n.shift(), wx.getLocalImgData(y));
        }, t)
      )) : n.push(t);
    },
    getNetworkType: function(t) {
      v(
        "getNetworkType",
        {},
        (t._complete = function(T) {
          var y = T, T = y.errMsg, M = (y.errMsg = "getNetworkType:ok", y.subtype);
          if (delete y.subtype, M)
            y.networkType = M;
          else {
            var M = T.indexOf(":"), U = T.substring(M + 1);
            switch (U) {
              case "wifi":
              case "edge":
              case "wwan":
                y.networkType = U;
                break;
              default:
                y.errMsg = "getNetworkType:fail";
            }
          }
        }, t)
      );
    },
    openLocation: function(t) {
      v(
        "openLocation",
        {
          latitude: t.latitude,
          longitude: t.longitude,
          name: t.name || "",
          address: t.address || "",
          scale: t.scale || 28,
          infoUrl: t.infoUrl || ""
        },
        t
      );
    },
    hideOptionMenu: function(t) {
      v("hideOptionMenu", {}, t);
    },
    showOptionMenu: function(t) {
      v("showOptionMenu", {}, t);
    },
    closeWindow: function(t) {
      v("closeWindow", {}, t = t || {});
    },
    hideMenuItems: function(t) {
      v("hideMenuItems", { menuList: t.menuList }, t);
    },
    showMenuItems: function(t) {
      v("showMenuItems", { menuList: t.menuList }, t);
    },
    hideAllNonBaseMenuItem: function(t) {
      v("hideAllNonBaseMenuItem", {}, t);
    },
    showAllNonBaseMenuItem: function(t) {
      v("showAllNonBaseMenuItem", {}, t);
    },
    scanQRCode: function(t) {
      v(
        "scanQRCode",
        {
          needResult: (t = t || {}).needResult || 0,
          scanType: t.scanType || ["qrCode", "barCode"]
        },
        (t._complete = function(p) {
          var y;
          _ && (y = p.resultStr) && (y = JSON.parse(y), p.resultStr = y && y.scan_code && y.scan_code.scan_result);
        }, t)
      );
    },
    openAddress: function(t) {
      v(
        r.openAddress,
        {},
        (t._complete = function(p) {
          (p = p).postalCode = p.addressPostalCode, delete p.addressPostalCode, p.provinceName = p.proviceFirstStageName, delete p.proviceFirstStageName, p.cityName = p.addressCitySecondStageName, delete p.addressCitySecondStageName, p.countryName = p.addressCountiesThirdStageName, delete p.addressCountiesThirdStageName, p.detailInfo = p.addressDetailInfo, delete p.addressDetailInfo;
        }, t)
      );
    },
    openProductSpecificView: function(t) {
      v(
        r.openProductSpecificView,
        {
          pid: t.productId,
          view_type: t.viewType || 0,
          ext_info: t.extInfo
        },
        t
      );
    },
    addCard: function(t) {
      for (var p = t.cardList, y = [], T = 0, M = p.length; T < M; ++T) {
        var U = p[T], U = { card_id: U.cardId, card_ext: U.cardExt };
        y.push(U);
      }
      v(
        r.addCard,
        { card_list: y },
        (t._complete = function(R) {
          if (O = R.card_list) {
            for (var O, D = 0, _t = (O = JSON.parse(O)).length; D < _t; ++D) {
              var $ = O[D];
              $.cardId = $.card_id, $.cardExt = $.card_ext, $.isSuccess = !!$.is_succ, delete $.card_id, delete $.card_ext, delete $.is_succ;
            }
            R.cardList = O, delete R.card_list;
          }
        }, t)
      );
    },
    chooseCard: function(t) {
      v(
        "chooseCard",
        {
          app_id: d.appId,
          location_id: t.shopId || "",
          sign_type: t.signType || "SHA1",
          card_id: t.cardId || "",
          card_type: t.cardType || "",
          card_sign: t.cardSign,
          time_stamp: t.timestamp + "",
          nonce_str: t.nonceStr
        },
        (t._complete = function(p) {
          p.cardList = p.choose_card_info, delete p.choose_card_info;
        }, t)
      );
    },
    openCard: function(t) {
      for (var p = t.cardList, y = [], T = 0, M = p.length; T < M; ++T) {
        var U = p[T], U = { card_id: U.cardId, code: U.code };
        y.push(U);
      }
      v(r.openCard, { card_list: y }, t);
    },
    consumeAndShareCard: function(t) {
      v(
        r.consumeAndShareCard,
        { consumedCardId: t.cardId, consumedCode: t.code },
        t
      );
    },
    chooseWXPay: function(t) {
      v(r.chooseWXPay, xe(t), t), Oe({ jsApiName: "chooseWXPay" });
    },
    openEnterpriseRedPacket: function(t) {
      v(r.openEnterpriseRedPacket, xe(t), t);
    },
    startSearchBeacons: function(t) {
      v(r.startSearchBeacons, { ticket: t.ticket }, t);
    },
    stopSearchBeacons: function(t) {
      v(r.stopSearchBeacons, {}, t);
    },
    onSearchBeacons: function(t) {
      k(r.onSearchBeacons, t);
    },
    openEnterpriseChat: function(t) {
      v(
        "openEnterpriseChat",
        { useridlist: t.userIds, chatname: t.groupName },
        t
      );
    },
    launchMiniProgram: function(t) {
      v(
        "launchMiniProgram",
        {
          targetAppId: t.targetAppId,
          path: function(p) {
            var y;
            if (typeof p == "string" && 0 < p.length)
              return y = p.split("?")[0], y += ".html", (p = p.split("?")[1]) !== void 0 ? y + "?" + p : y;
          }(t.path),
          envVersion: t.envVersion
        },
        t
      );
    },
    openBusinessView: function(t) {
      v(
        "openBusinessView",
        {
          businessType: t.businessType,
          queryString: t.queryString || "",
          envVersion: t.envVersion
        },
        (t._complete = function(p) {
          if (g) {
            var y = p.extraData;
            if (y)
              try {
                p.extraData = JSON.parse(y);
              } catch {
                p.extraData = {};
              }
          }
        }, t)
      );
    },
    miniProgram: {
      navigateBack: function(t) {
        t = t || {}, L(function() {
          v(
            "invokeMiniProgramAPI",
            { name: "navigateBack", arg: { delta: t.delta || 1 } },
            t
          );
        });
      },
      navigateTo: function(t) {
        L(function() {
          v(
            "invokeMiniProgramAPI",
            { name: "navigateTo", arg: { url: t.url } },
            t
          );
        });
      },
      redirectTo: function(t) {
        L(function() {
          v(
            "invokeMiniProgramAPI",
            { name: "redirectTo", arg: { url: t.url } },
            t
          );
        });
      },
      switchTab: function(t) {
        L(function() {
          v(
            "invokeMiniProgramAPI",
            { name: "switchTab", arg: { url: t.url } },
            t
          );
        });
      },
      reLaunch: function(t) {
        L(function() {
          v(
            "invokeMiniProgramAPI",
            { name: "reLaunch", arg: { url: t.url } },
            t
          );
        });
      },
      postMessage: function(t) {
        L(function() {
          v(
            "invokeMiniProgramAPI",
            { name: "postMessage", arg: t.data || {} },
            t
          );
        });
      },
      getEnv: function(t) {
        L(function() {
          t({ miniprogram: e.__wxjs_environment === "miniprogram" });
        });
      }
    }
  }, a = 1, x = {}, l.addEventListener(
    "error",
    function(t) {
      var p, y, T;
      g || (T = (p = t.target).tagName, y = p.src, T != "IMG" && T != "VIDEO" && T != "AUDIO" && T != "SOURCE") || y.indexOf("wxlocalresource://") != -1 && (t.preventDefault(), t.stopPropagation(), (T = p["wx-id"]) || (T = a++, p["wx-id"] = T), x[T] || (x[T] = !0, wx.ready(function() {
        wx.getLocalImgData({
          localId: y,
          success: function(M) {
            p.src = M.localData;
          }
        });
      })));
    },
    !0
  ), l.addEventListener(
    "load",
    function(t) {
      var p;
      g || (p = (t = t.target).tagName, t.src, p != "IMG" && p != "VIDEO" && p != "AUDIO" && p != "SOURCE") || (p = t["wx-id"]) && (x[p] = !1);
    },
    !0
  ), o && (e.wx = e.jWeixin = s), s;
  function v(t, p, y) {
    e.WeixinJSBridge ? WeixinJSBridge.invoke(t, B(p), function(T) {
      Ee(t, T, y);
    }) : se(t, y);
  }
  function k(t, p, y) {
    e.WeixinJSBridge ? WeixinJSBridge.on(t, function(T) {
      y && y.trigger && y.trigger(T), Ee(t, T, p);
    }) : se(t, y || p);
  }
  function B(t) {
    return (t = t || {}).appId = d.appId, t.verifyAppId = d.appId, t.verifySignType = "sha1", t.verifyTimestamp = d.timestamp + "", t.verifyNonceStr = d.nonceStr, t.verifySignature = d.signature, t;
  }
  function xe(t) {
    return {
      timeStamp: t.timestamp + "",
      nonceStr: t.nonceStr,
      package: t.package,
      paySign: t.paySign,
      signType: t.signType || "SHA1"
    };
  }
  function Ee(M, p, y) {
    M != "openEnterpriseChat" && M !== "openBusinessView" || (p.errCode = p.err_code), delete p.err_code, delete p.err_desc, delete p.err_detail;
    var T = p.errMsg, M = (T || (T = p.err_msg, delete p.err_msg, T = function(U, R) {
      var O = f[U];
      O && (U = O), O = "ok";
      {
        var D;
        R && (D = R.indexOf(":"), (O = (O = (O = (O = (O = (O = (O = R.substring(D + 1)) == "confirm" ? "ok" : O) == "failed" ? "fail" : O).indexOf("failed_") != -1 ? O.substring(7) : O).indexOf("fail_") != -1 ? O.substring(5) : O).replace(/_/g, " ")).toLowerCase()) != "access denied" && O != "no permission to execute" || (O = "permission denied"), (O = U == "config" && O == "function not exist" ? "ok" : O) == "") && (O = "fail");
      }
      return R = U + ":" + O;
    }(M, T), p.errMsg = T), (y = y || {})._complete && (y._complete(p), delete y._complete), T = p.errMsg || "", d.debug && !y.isInnerInvoke && alert(JSON.stringify(p)), T.indexOf(":"));
    switch (T.substring(M + 1)) {
      case "ok":
        y.success && y.success(p);
        break;
      case "cancel":
        y.cancel && y.cancel(p);
        break;
      default:
        y.fail && y.fail(p);
    }
    y.complete && y.complete(p);
  }
  function ae(t) {
    if (t) {
      for (var p = 0, y = t.length; p < y; ++p) {
        var T = t[p], T = r[T];
        T && (t[p] = T);
      }
      return t;
    }
  }
  function se(t, p) {
    var y;
    !d.debug || p && p.isInnerInvoke || ((y = f[t]) && (t = y), p && p._complete && delete p._complete, console.log('"' + t + '",', p || ""));
  }
  function Oe(t) {
    var p;
    S || w || d.debug || A < "6.0.2" || P.systemType < 0 || (p = new Image(), P.appId = d.appId, P.initTime = I.initEndTime - I.initStartTime, P.preVerifyTime = I.preVerifyEndTime - I.preVerifyStartTime, s.getNetworkType({
      isInnerInvoke: !0,
      success: function(y) {
        P.networkType = y.networkType, y = "https://open.weixin.qq.com/sdk/report?v=" + P.version + "&o=" + P.isPreVerifyOk + "&s=" + P.systemType + "&c=" + P.clientVersion + "&a=" + P.appId + "&n=" + P.networkType + "&i=" + P.initTime + "&p=" + P.preVerifyTime + "&u=" + P.url + "&jsapi_name=" + (t ? t.jsApiName : ""), p.src = y;
      }
    }));
  }
  function ee() {
    return (/* @__PURE__ */ new Date()).getTime();
  }
  function L(t) {
    m && (e.WeixinJSBridge ? t() : l.addEventListener && l.addEventListener("WeixinJSBridgeReady", t, !1));
  }
});
var mo = ht.exports;
const Se = /* @__PURE__ */ Ie(mo), mt = () => {
  const e = localStorage.getItem("user");
  return e === null ? null : JSON.parse(e);
}, le = () => {
  const e = mt();
  return e === null ? null : e.userInfo;
}, Z = () => {
  const e = mt();
  return e === null ? null : e.orgInfo;
}, Qe = () => {
  const e = Z();
  return e === null ? null : e.org;
}, pe = () => {
  const e = Z();
  return e === null ? null : e.workshop;
}, de = () => {
  const e = Z();
  return e === null ? null : e.workcenter;
}, ge = () => {
  const e = Z();
  return e === null ? null : e.workstation;
}, he = () => {
  const e = Z();
  return e === null ? null : e.process;
}, yo = (e) => {
  const r = { ...{
    quality: 70,
    // 默认图片质量为70
    type: "all"
    // 默认type为'all'
  }, ...e }, f = r.type === "gallery" ? ["album"] : r.type === "camera" ? ["camera"] : ["album", "camera"];
  return new Promise((l, b) => {
    Se.chooseImage({
      count: 1,
      sizeType: ["original", "compressed"],
      sourceType: f,
      success: (h) => {
        const S = h.localIds;
        Se.getLocalImgData({
          localId: S[0],
          success: (w) => {
            l(w.localData);
          },
          fail: (w) => {
            b(w);
          }
        });
      },
      fail: (h) => {
        b(h);
      },
      cancel: () => {
        b();
      }
    });
  });
}, wo = () => new Promise((e, o) => {
  Se.scanQRCode({
    needResult: 1,
    scanType: ["qrCode", "barCode"],
    success: (r) => {
      e(r.resultStr);
    },
    fail: (r) => {
      o(r);
    }
  });
}), vo = {
  openCamera: yo,
  openScan: wo,
  getUserId() {
    const e = le();
    return e ? e.id : null;
  },
  getUserName() {
    const e = le();
    return e ? e.code : null;
  },
  getDisplayName() {
    const e = le();
    return e ? e.name : null;
  },
  getOrgCode() {
    const e = Qe();
    return e ? e.code : null;
  },
  getOrgName() {
    const e = Qe();
    return e ? e.name : null;
  },
  getWorkshopId() {
    const e = pe();
    return e ? e.id : null;
  },
  getWorkshopCode() {
    const e = pe();
    return e ? e.code : null;
  },
  getWorkshopName() {
    const e = pe();
    return e ? e.name : null;
  },
  getWorkCenterId() {
    const e = de();
    return e ? e.id : null;
  },
  getWorkCenterCode() {
    const e = de();
    return e ? e.code : null;
  },
  getWorkCenterName() {
    const e = de();
    return e ? e.name : null;
  },
  getWorkStationId() {
    const e = ge();
    return e ? e.id : null;
  },
  getWorkStationCode() {
    const e = ge();
    return e ? e.code : null;
  },
  getWorkStationName() {
    const e = ge();
    return e ? e.name : null;
  },
  getProcessId() {
    const e = he();
    return e ? e.id : null;
  },
  getProcessCode() {
    const e = he();
    return e ? e.code : null;
  },
  getProcessName() {
    const e = he();
    return e ? e.name : null;
  }
};
var yt = /* @__PURE__ */ ((e) => (e.Mobile = "APP", e.Desktop = "WEB", e.NODE_JS = "NodeJs", e.Wechat = "wechat", e))(yt || {});
const H = {
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
    isEmpty: z,
    getQueryString: jn
  }
}, W = H.platform == "APP" ? {
  ...H,
  ...He,
  pagePrevious: () => {
    switch (H.platform) {
      case "APP":
        He.pagePrevious();
        break;
      default:
        window.history.back();
        break;
    }
  }
} : H.platform == "wechat" ? {
  ...H,
  ...vo
} : H;
class Te extends Error {
  constructor(r, f, l, b = "") {
    var h;
    super();
    E(this, "code", -1);
    E(this, "status", "");
    E(this, "type", "");
    E(this, "description", "");
    this.message = r, this.name = "CustomError", this.code = f, this.status = l, this.type = "error", this.description = b, (h = W.ipc.targets.get("_self")) == null || h.send("custom_error", this);
  }
}
class bo extends Te {
  constructor(o, r, f, l = "") {
    super(o, r, f, l), this.name = "OperationError";
  }
}
const wt = typeof window < "u", _o = wt ? null : require("node:path"), So = wt ? null : require("node:fs");
function Uo() {
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
      }, o = _o.resolve(process.cwd(), "public", "version.json");
      So.writeFileSync(o, JSON.stringify(e));
    }
  };
}
let ie = "";
const ze = 2;
let te = 0;
const To = function() {
  te++, te >= ze && (console.error(`获取资源超过错误次数阈值[${ze}]，触发版本检查！`), te = -9999, Ao()), setTimeout(() => {
    te = 0;
  }, 1500);
}, Io = () => {
  if (typeof window < "u") {
    if (window._version)
      return;
    fetch("/version.json?_t=" + (/* @__PURE__ */ new Date()).getTime()).then((o) => o.json()).then((o) => {
      ie = o.version, window._version = ie;
    }), window.addEventListener(
      "error",
      function(o) {
        const r = o.target;
        (r.tagName === "SCRIPT" || r.tagName === "LINK" || r.tagName === "IMG") && To();
      },
      !0
    );
  }
}, Ao = () => {
  typeof window < "u" && window._version && fetch("/version.json?_t=" + (/* @__PURE__ */ new Date()).getTime()).then((e) => e.json()).then((e) => {
    if (ie && ie !== e.version)
      throw new bo(
        `[${e.version}] 有新的内容更新，请在保存页面数据后，刷新页面重新载入！`,
        404,
        404
      );
  });
}, vt = typeof window < "u", Ge = vt ? null : require("node:path"), Co = vt ? null : require("swagger-typescript-api");
function Ro(e) {
  if (!e || !e.baseUrl || !e.inputs)
    return null;
  const o = e.inputs.split(",");
  return o.length === 0 ? (console.log("swagger-api-gen: No input modules found."), null) : {
    name: "swagger-api-gen",
    enforce: "pre",
    apply: "serve",
    async buildStart() {
      for await (const r of o) {
        const f = `/api/${r}`;
        await Co.generateApi({
          name: r,
          url: `${e.baseUrl}${f}/v3/api-docs`,
          output: Ge.resolve(process.cwd(), (e == null ? void 0 : e.output) || "./src/api"),
          templates: Ge.resolve(process.cwd(), (e == null ? void 0 : e.templates) || "./plugins/swagger-templates"),
          singleHttpClient: !0,
          httpClientType: "fetch",
          // @ts-ignore
          apiClassName: `${r[0].toUpperCase() + r.slice(1)}Api`,
          apiPrefix: f,
          importModules: 'import { Http } from "@/types/web-core";',
          hooks: {
            onFormatRouteName: (l, b) => /\d/.test(b) && l.operationId.includes("_") ? l.operationId.split("_", 1)[0] : b
          }
        }).catch((l) => console.error(l));
      }
    }
  };
}
const Po = "YYYY-MM-DD HH:mm:ss";
function bt(e) {
  for (const o in e) {
    if (e[o] && e[o]._isAMomentObject && (e[o] = e[o].format(Po)), qe(o)) {
      const r = e[o];
      if (r)
        try {
          e[o] = qe(r) ? r.trim() : r;
        } catch (f) {
          throw new Error(f);
        }
    }
    V(e[o]) && bt(e[o]);
  }
}
const xo = async (e, o) => {
  const r = e.requestOptions.body;
  r && Object.prototype.toString.call(r) === "[object Object]" && bt(r), await o();
}, Eo = async (e, o) => {
  var b, h, S, w;
  const r = e.requestOptions, f = r.body;
  if (!(f instanceof FormData) && !(f instanceof URLSearchParams)) {
    let m = !0;
    const g = r.headers, _ = z(g) ? null : g == null ? void 0 : g["Content-Type"];
    _ ? m = _.startsWith("application/json") : g["Content-Type"] = dt.Json, m && typeof f == "object" && (r.body = JSON.stringify(f));
  }
  if (await o(), e.result || (b = e.response) != null && b.bodyUsed)
    return;
  const l = ((h = e.response) == null ? void 0 : h.headers.get("Content-Type")) || "";
  (S = e.response) != null && S.ok && (l != null && l.startsWith("application/json")) && (e.result = await ((w = e.response) == null ? void 0 : w.json()));
}, Oo = async (e, o) => {
  var b, h, S, w;
  const f = e.requestOptions.headers, l = W.getToken();
  if (l && Pn(f.Authorization) && (f.Authorization = `Bearer ${l}`), f.eid = W.getEnterpriseId(), f.oid = W.getOrgId(), f["Accept-Language"] = W.getLanguage(), f["X-TZ-Offset"] = (/* @__PURE__ */ new Date()).getTimezoneOffset().toString(), await o(), !((b = e.response) != null && b.ok)) {
    const m = new Error("An error occurred while fetching the data.");
    throw m.message = `${(h = e.response) == null ? void 0 : h.status}|${await ((S = e.response) == null ? void 0 : S.text()) || ""}`, m;
  }
  if (((w = e.response) == null ? void 0 : w.status) !== 200)
    throw new Te(JSON.stringify(e.result), 500, e.response.status);
  if (!e.requestOptions.returnNativeResponse && e.result) {
    const m = e.result;
    if (m.code === 0 || m.code === 200)
      e.result = m.data;
    else
      throw new Te(m.message || "unknown", m.code, e.response.status, JSON.stringify(m));
  }
}, Mo = async (e, o) => {
  if (e.url.lastIndexOf("_t=") <= 0) {
    const r = (/* @__PURE__ */ new Date()).getTime();
    e.url += `${e.url.lastIndexOf("?") > 0 ? "&" : "?"}_t=${r}`;
  }
  await o();
}, Pe = new ne();
Pe.baseURL = () => {
  switch (W.platform) {
    case yt.Mobile:
      return window._app.getUrl();
    default:
      return W.config.baseUrl || location.origin;
  }
};
Pe.middlewares = () => [Oo, Eo, xo, Mo];
const jo = new Fn(Pe);
typeof window < "u" && (W.ipc = Ce.init(), W.ipc.addTarget("_self", window), window.http = jo, window.fw = W, Io());
export {
  Te as CustomError,
  Jn as Dictionary,
  Ce as EventBus,
  Fn as Http,
  Uo as autoCheckUpdates,
  Ro as swaggerApiGen
};
