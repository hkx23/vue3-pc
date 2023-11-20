var Fe = Object.defineProperty;
var Be = (e, r, t) => r in e ? Fe(e, r, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[r] = t;
var b = (e, r, t) => (Be(e, typeof r != "symbol" ? r + "" : r, t), t);
var Ne = typeof global == "object" && global && global.Object === Object && global;
const we = Ne;
var qe = typeof self == "object" && self && self.Object === Object && self, He = we || qe || Function("return this")();
const O = He;
var Je = O.Symbol;
const F = Je;
var be = Object.prototype, Ve = be.hasOwnProperty, ze = be.toString, U = F ? F.toStringTag : void 0;
function Ge(e) {
  var r = Ve.call(e, U), t = e[U];
  try {
    e[U] = void 0;
    var n = !0;
  } catch {
  }
  var o = ze.call(e);
  return n && (r ? e[U] = t : delete e[U]), o;
}
var Ke = Object.prototype, Ye = Ke.toString;
function Xe(e) {
  return Ye.call(e);
}
var Qe = "[object Null]", Ze = "[object Undefined]", re = F ? F.toStringTag : void 0;
function R(e) {
  return e == null ? e === void 0 ? Ze : Qe : re && re in Object(e) ? Ge(e) : Xe(e);
}
function k(e) {
  return e != null && typeof e == "object";
}
var et = "[object Symbol]";
function tt(e) {
  return typeof e == "symbol" || k(e) && R(e) == et;
}
var rt = Array.isArray;
const Te = rt;
var nt = /\s/;
function ot(e) {
  for (var r = e.length; r-- && nt.test(e.charAt(r)); )
    ;
  return r;
}
var it = /^\s+/;
function st(e) {
  return e && e.slice(0, ot(e) + 1).replace(it, "");
}
function _(e) {
  var r = typeof e;
  return e != null && (r == "object" || r == "function");
}
var ne = 0 / 0, at = /^[-+]0x[0-9a-f]+$/i, ct = /^0b[01]+$/i, ut = /^0o[0-7]+$/i, ft = parseInt;
function oe(e) {
  if (typeof e == "number")
    return e;
  if (tt(e))
    return ne;
  if (_(e)) {
    var r = typeof e.valueOf == "function" ? e.valueOf() : e;
    e = _(r) ? r + "" : r;
  }
  if (typeof e != "string")
    return e === 0 ? e : +e;
  e = st(e);
  var t = ct.test(e);
  return t || ut.test(e) ? ft(e.slice(2), t ? 2 : 8) : at.test(e) ? ne : +e;
}
var lt = "[object AsyncFunction]", pt = "[object Function]", dt = "[object GeneratorFunction]", gt = "[object Proxy]";
function je(e) {
  if (!_(e))
    return !1;
  var r = R(e);
  return r == pt || r == dt || r == lt || r == gt;
}
var ht = O["__core-js_shared__"];
const N = ht;
var ie = function() {
  var e = /[^.]+$/.exec(N && N.keys && N.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function mt(e) {
  return !!ie && ie in e;
}
var yt = Function.prototype, vt = yt.toString;
function C(e) {
  if (e != null) {
    try {
      return vt.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var wt = /[\\^$.*+?()[\]{}|]/g, bt = /^\[object .+?Constructor\]$/, Tt = Function.prototype, jt = Object.prototype, Et = Tt.toString, At = jt.hasOwnProperty, Pt = RegExp(
  "^" + Et.call(At).replace(wt, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function xt(e) {
  if (!_(e) || mt(e))
    return !1;
  var r = je(e) ? Pt : bt;
  return r.test(C(e));
}
function Ot(e, r) {
  return e == null ? void 0 : e[r];
}
function D(e, r) {
  var t = Ot(e, r);
  return xt(t) ? t : void 0;
}
var St = D(O, "WeakMap");
const J = St;
var $t = 9007199254740991;
function Ee(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= $t;
}
function _t(e) {
  return e != null && Ee(e.length) && !je(e);
}
var Rt = Object.prototype;
function Ae(e) {
  var r = e && e.constructor, t = typeof r == "function" && r.prototype || Rt;
  return e === t;
}
var Ct = "[object Arguments]";
function se(e) {
  return k(e) && R(e) == Ct;
}
var Pe = Object.prototype, Mt = Pe.hasOwnProperty, It = Pe.propertyIsEnumerable, Ut = se(function() {
  return arguments;
}()) ? se : function(e) {
  return k(e) && Mt.call(e, "callee") && !It.call(e, "callee");
};
const Lt = Ut;
function kt() {
  return !1;
}
var xe = typeof exports == "object" && exports && !exports.nodeType && exports, ae = xe && typeof module == "object" && module && !module.nodeType && module, Dt = ae && ae.exports === xe, ce = Dt ? O.Buffer : void 0, Wt = ce ? ce.isBuffer : void 0, Ft = Wt || kt;
const Bt = Ft;
var Nt = "[object Arguments]", qt = "[object Array]", Ht = "[object Boolean]", Jt = "[object Date]", Vt = "[object Error]", zt = "[object Function]", Gt = "[object Map]", Kt = "[object Number]", Yt = "[object Object]", Xt = "[object RegExp]", Qt = "[object Set]", Zt = "[object String]", er = "[object WeakMap]", tr = "[object ArrayBuffer]", rr = "[object DataView]", nr = "[object Float32Array]", or = "[object Float64Array]", ir = "[object Int8Array]", sr = "[object Int16Array]", ar = "[object Int32Array]", cr = "[object Uint8Array]", ur = "[object Uint8ClampedArray]", fr = "[object Uint16Array]", lr = "[object Uint32Array]", T = {};
T[nr] = T[or] = T[ir] = T[sr] = T[ar] = T[cr] = T[ur] = T[fr] = T[lr] = !0;
T[Nt] = T[qt] = T[tr] = T[Ht] = T[rr] = T[Jt] = T[Vt] = T[zt] = T[Gt] = T[Kt] = T[Yt] = T[Xt] = T[Qt] = T[Zt] = T[er] = !1;
function pr(e) {
  return k(e) && Ee(e.length) && !!T[R(e)];
}
function dr(e) {
  return function(r) {
    return e(r);
  };
}
var Oe = typeof exports == "object" && exports && !exports.nodeType && exports, L = Oe && typeof module == "object" && module && !module.nodeType && module, gr = L && L.exports === Oe, q = gr && we.process, hr = function() {
  try {
    var e = L && L.require && L.require("util").types;
    return e || q && q.binding && q.binding("util");
  } catch {
  }
}();
const ue = hr;
var fe = ue && ue.isTypedArray, mr = fe ? dr(fe) : pr;
const yr = mr;
function vr(e, r) {
  return function(t) {
    return e(r(t));
  };
}
var wr = vr(Object.keys, Object);
const br = wr;
var Tr = Object.prototype, jr = Tr.hasOwnProperty;
function Er(e) {
  if (!Ae(e))
    return br(e);
  var r = [];
  for (var t in Object(e))
    jr.call(e, t) && t != "constructor" && r.push(t);
  return r;
}
var Ar = D(O, "Map");
const V = Ar;
var Pr = D(O, "DataView");
const z = Pr;
var xr = D(O, "Promise");
const G = xr;
var Or = D(O, "Set");
const K = Or;
var le = "[object Map]", Sr = "[object Object]", pe = "[object Promise]", de = "[object Set]", ge = "[object WeakMap]", he = "[object DataView]", $r = C(z), _r = C(V), Rr = C(G), Cr = C(K), Mr = C(J), S = R;
(z && S(new z(new ArrayBuffer(1))) != he || V && S(new V()) != le || G && S(G.resolve()) != pe || K && S(new K()) != de || J && S(new J()) != ge) && (S = function(e) {
  var r = R(e), t = r == Sr ? e.constructor : void 0, n = t ? C(t) : "";
  if (n)
    switch (n) {
      case $r:
        return he;
      case _r:
        return le;
      case Rr:
        return pe;
      case Cr:
        return de;
      case Mr:
        return ge;
    }
  return r;
});
const Ir = S;
var Ur = function() {
  return O.Date.now();
};
const H = Ur;
var Lr = "Expected a function", kr = Math.max, Dr = Math.min;
function Se(e, r, t) {
  var n, o, u, c, f, a, i = 0, s = !1, l = !1, w = !0;
  if (typeof e != "function")
    throw new TypeError(Lr);
  r = oe(r) || 0, _(t) && (s = !!t.leading, l = "maxWait" in t, u = l ? kr(oe(t.maxWait) || 0, r) : u, w = "trailing" in t ? !!t.trailing : w);
  function g(d) {
    var P = n, x = o;
    return n = o = void 0, i = d, c = e.apply(x, P), c;
  }
  function h(d) {
    return i = d, f = setTimeout(m, r), s ? g(d) : c;
  }
  function j(d) {
    var P = d - a, x = d - i, M = r - P;
    return l ? Dr(M, u - x) : M;
  }
  function p(d) {
    var P = d - a, x = d - i;
    return a === void 0 || P >= r || P < 0 || l && x >= u;
  }
  function m() {
    var d = H();
    if (p(d))
      return A(d);
    f = setTimeout(m, j(d));
  }
  function A(d) {
    return f = void 0, w && n ? g(d) : (n = o = void 0, c);
  }
  function y() {
    f !== void 0 && clearTimeout(f), i = 0, n = a = o = f = void 0;
  }
  function v() {
    return f === void 0 ? c : A(H());
  }
  function E() {
    var d = H(), P = p(d);
    if (n = arguments, o = this, a = d, P) {
      if (f === void 0)
        return h(a);
      if (l)
        return clearTimeout(f), f = setTimeout(m, r), g(a);
    }
    return f === void 0 && (f = setTimeout(m, r)), c;
  }
  return E.cancel = y, E.flush = v, E;
}
var Wr = "[object String]";
function me(e) {
  return typeof e == "string" || !Te(e) && k(e) && R(e) == Wr;
}
var Fr = "[object Map]", Br = "[object Set]", Nr = Object.prototype, qr = Nr.hasOwnProperty;
function Hr(e) {
  if (e == null)
    return !0;
  if (_t(e) && (Te(e) || typeof e == "string" || typeof e.splice == "function" || Bt(e) || yr(e) || Lt(e)))
    return !e.length;
  var r = Ir(e);
  if (r == Fr || r == Br)
    return !e.size;
  if (Ae(e))
    return !Er(e).length;
  for (var t in e)
    if (qr.call(e, t))
      return !1;
  return !0;
}
var Jr = "Expected a function";
function Vr(e, r, t) {
  var n = !0, o = !0;
  if (typeof e != "function")
    throw new TypeError(Jr);
  return _(t) && (n = "leading" in t ? !!t.leading : n, o = "trailing" in t ? !!t.trailing : o), Se(e, r, {
    leading: n,
    maxWait: r,
    trailing: o
  });
}
const W = (e) => typeof e == "function" ? e() : e;
function Q(e) {
  return !(e && (typeof e != "object" || (Array.isArray(e) ? e.length : Object.keys(e).length)));
}
function zr(e) {
  for (var r = [], t = 0; t < e.length; ) {
    var n = e[t];
    if (n === "*" || n === "+" || n === "?") {
      r.push({ type: "MODIFIER", index: t, value: e[t++] });
      continue;
    }
    if (n === "\\") {
      r.push({ type: "ESCAPED_CHAR", index: t++, value: e[t++] });
      continue;
    }
    if (n === "{") {
      r.push({ type: "OPEN", index: t, value: e[t++] });
      continue;
    }
    if (n === "}") {
      r.push({ type: "CLOSE", index: t, value: e[t++] });
      continue;
    }
    if (n === ":") {
      for (var o = "", u = t + 1; u < e.length; ) {
        var c = e.charCodeAt(u);
        if (
          // `0-9`
          c >= 48 && c <= 57 || // `A-Z`
          c >= 65 && c <= 90 || // `a-z`
          c >= 97 && c <= 122 || // `_`
          c === 95
        ) {
          o += e[u++];
          continue;
        }
        break;
      }
      if (!o)
        throw new TypeError("Missing parameter name at ".concat(t));
      r.push({ type: "NAME", index: t, value: o }), t = u;
      continue;
    }
    if (n === "(") {
      var f = 1, a = "", u = t + 1;
      if (e[u] === "?")
        throw new TypeError('Pattern cannot start with "?" at '.concat(u));
      for (; u < e.length; ) {
        if (e[u] === "\\") {
          a += e[u++] + e[u++];
          continue;
        }
        if (e[u] === ")") {
          if (f--, f === 0) {
            u++;
            break;
          }
        } else if (e[u] === "(" && (f++, e[u + 1] !== "?"))
          throw new TypeError("Capturing groups are not allowed at ".concat(u));
        a += e[u++];
      }
      if (f)
        throw new TypeError("Unbalanced pattern at ".concat(t));
      if (!a)
        throw new TypeError("Missing pattern at ".concat(t));
      r.push({ type: "PATTERN", index: t, value: a }), t = u;
      continue;
    }
    r.push({ type: "CHAR", index: t, value: e[t++] });
  }
  return r.push({ type: "END", index: t, value: "" }), r;
}
function Gr(e, r) {
  r === void 0 && (r = {});
  for (var t = zr(e), n = r.prefixes, o = n === void 0 ? "./" : n, u = "[^".concat(I(r.delimiter || "/#?"), "]+?"), c = [], f = 0, a = 0, i = "", s = function(d) {
    if (a < t.length && t[a].type === d)
      return t[a++].value;
  }, l = function(d) {
    var P = s(d);
    if (P !== void 0)
      return P;
    var x = t[a], M = x.type, B = x.index;
    throw new TypeError("Unexpected ".concat(M, " at ").concat(B, ", expected ").concat(d));
  }, w = function() {
    for (var d = "", P; P = s("CHAR") || s("ESCAPED_CHAR"); )
      d += P;
    return d;
  }; a < t.length; ) {
    var g = s("CHAR"), h = s("NAME"), j = s("PATTERN");
    if (h || j) {
      var p = g || "";
      o.indexOf(p) === -1 && (i += p, p = ""), i && (c.push(i), i = ""), c.push({
        name: h || f++,
        prefix: p,
        suffix: "",
        pattern: j || u,
        modifier: s("MODIFIER") || ""
      });
      continue;
    }
    var m = g || s("ESCAPED_CHAR");
    if (m) {
      i += m;
      continue;
    }
    i && (c.push(i), i = "");
    var A = s("OPEN");
    if (A) {
      var p = w(), y = s("NAME") || "", v = s("PATTERN") || "", E = w();
      l("CLOSE"), c.push({
        name: y || (v ? f++ : ""),
        pattern: y && !v ? u : v,
        prefix: p,
        suffix: E,
        modifier: s("MODIFIER") || ""
      });
      continue;
    }
    l("END");
  }
  return c;
}
function I(e) {
  return e.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
function $e(e) {
  return e && e.sensitive ? "" : "i";
}
function Kr(e, r) {
  if (!r)
    return e;
  for (var t = /\((?:\?<(.*?)>)?(?!\?)/g, n = 0, o = t.exec(e.source); o; )
    r.push({
      // Use parenthesized substring match if available, index otherwise
      name: o[1] || n++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    }), o = t.exec(e.source);
  return e;
}
function Yr(e, r, t) {
  var n = e.map(function(o) {
    return _e(o, r, t).source;
  });
  return new RegExp("(?:".concat(n.join("|"), ")"), $e(t));
}
function Xr(e, r, t) {
  return Qr(Gr(e, t), r, t);
}
function Qr(e, r, t) {
  t === void 0 && (t = {});
  for (var n = t.strict, o = n === void 0 ? !1 : n, u = t.start, c = u === void 0 ? !0 : u, f = t.end, a = f === void 0 ? !0 : f, i = t.encode, s = i === void 0 ? function(B) {
    return B;
  } : i, l = t.delimiter, w = l === void 0 ? "/#?" : l, g = t.endsWith, h = g === void 0 ? "" : g, j = "[".concat(I(h), "]|$"), p = "[".concat(I(w), "]"), m = c ? "^" : "", A = 0, y = e; A < y.length; A++) {
    var v = y[A];
    if (typeof v == "string")
      m += I(s(v));
    else {
      var E = I(s(v.prefix)), d = I(s(v.suffix));
      if (v.pattern)
        if (r && r.push(v), E || d)
          if (v.modifier === "+" || v.modifier === "*") {
            var P = v.modifier === "*" ? "?" : "";
            m += "(?:".concat(E, "((?:").concat(v.pattern, ")(?:").concat(d).concat(E, "(?:").concat(v.pattern, "))*)").concat(d, ")").concat(P);
          } else
            m += "(?:".concat(E, "(").concat(v.pattern, ")").concat(d, ")").concat(v.modifier);
        else
          v.modifier === "+" || v.modifier === "*" ? m += "((?:".concat(v.pattern, ")").concat(v.modifier, ")") : m += "(".concat(v.pattern, ")").concat(v.modifier);
      else
        m += "(?:".concat(E).concat(d, ")").concat(v.modifier);
    }
  }
  if (a)
    o || (m += "".concat(p, "?")), m += t.endsWith ? "(?=".concat(j, ")") : "$";
  else {
    var x = e[e.length - 1], M = typeof x == "string" ? p.indexOf(x[x.length - 1]) > -1 : x === void 0;
    o || (m += "(?:".concat(p, "(?=").concat(j, "))?")), M || (m += "(?=".concat(p, "|").concat(j, ")"));
  }
  return new RegExp(m, $e(t));
}
function _e(e, r, t) {
  return e instanceof RegExp ? Kr(e, r) : Array.isArray(e) ? Yr(e, r, t) : Xr(e, r, t);
}
const Re = "_$mockHttp", Ce = typeof window < "u", Me = Ce ? window.top || window : {}, Ie = () => Me[Re] || {
  isMock: !1,
  mockData: []
}, Z = (e) => {
  const r = Ie();
  Me[Re] = Object.assign(r, e);
}, Zr = (e) => {
  Z({ mockData: e });
}, en = () => {
  Z({ isMock: !0 });
}, tn = () => {
  Z({ isMock: !0 });
};
if (Ce) {
  const e = window.fetch;
  window.fetch = async function(...r) {
    var n;
    const t = Ie();
    if (t.isMock && r[0] !== null) {
      let o, u = "";
      typeof r[0] == "object" ? (o = r[0], u = o.url) : (o = r[1], u = r[0]);
      const c = new URL(u, "http://localhost"), f = (n = t.mockData) == null ? void 0 : n.find((a) => {
        if (!a || !a.url || a.method && a.method.toUpperCase() !== (o == null ? void 0 : o.method))
          return !1;
        const i = new URL(a.url, "http://localhost"), s = new URLSearchParams(i.search), l = new URLSearchParams(c.search);
        for (const [w, g] of s)
          if (l.get(w) !== g)
            return !1;
        return _e(i.pathname).test(c.pathname);
      });
      if (f) {
        const { response: a, timeout: i, statusCode: s } = f;
        i && await new Promise((w) => setTimeout(w, i));
        const l = typeof a == "function" ? a(o) : a;
        return console.debug("mock success: " + u), console.debug(l), l instanceof Response ? Promise.resolve(l) : Promise.resolve(
          new Response(JSON.stringify(l), {
            status: s || 200,
            headers: { "Content-Type": "application/json" }
          })
        );
      }
    }
    return e.apply(this, r);
  };
}
var Ue = /* @__PURE__ */ ((e) => (e.Json = "application/json;charset=UTF-8", e.FormURLEncoded = "application/x-www-form-urlencoded;charset=UTF-8", e.FormData = "multipart/form-data;charset=UTF-8", e))(Ue || {});
class rn {
  constructor() {
    /**
     * 服务基础路径
     */
    b(this, "baseURL", "");
    /**
     * 请求路径
     */
    b(this, "path", "");
    /**
     * 请求全路径
     */
    b(this, "url", "");
    /**
     * 请求结果
     */
    b(this, "result", null);
    /**
     * 请求参数
     */
    b(this, "requestOptions", {});
    /**
     * 请求信息
     */
    b(this, "request");
    /**
     * 请求返回信息
     */
    b(this, "response");
  }
}
class Y {
  constructor(r) {
    /**
     * 服务基础路径
     */
    b(this, "baseURL");
    /**
     * 指定请求超时的毫秒数（默认永不超时，Chrome中网络请求超时为300秒，Firefox中为90秒）
     */
    b(this, "timeout");
    /**
     * 服务中间件
     */
    b(this, "middlewares");
    this.baseURL = r || "", this.middlewares = [];
  }
  normalizeUrl(r) {
    return r.toString().replace(/(^\/+|\/+$)/g, "");
  }
  normalizeUrlParams(r, t) {
    if (Q(t))
      return "";
    const n = ~r.indexOf("?") ? "&" : "?";
    return typeof t == "object" ? n + Object.entries(t).map((o) => encodeURIComponent(o[0]) + "=" + encodeURIComponent(o[1] || "")).join("&") : t !== "" ? n + W(t) : "";
  }
}
class nn {
  constructor(r) {
    b(this, "middlewares");
    b(this, "options");
    b(this, "setMockData", Zr);
    b(this, "openMock", en);
    b(this, "closeMock", tn);
    this.middlewares = [], r instanceof Y ? this.options = r : this.options = new Y(r);
  }
  /**
   * 新增中间件
   * @param middleware 中间件
   */
  use(r) {
    return this.middlewares.push(r), this;
  }
  getUrl(r, t, n = "") {
    let o = r ? new URL(t, new URL(r, window.location.href).toString()).toString() : t;
    return n && (o += this.options.normalizeUrlParams(o, n)), o;
  }
  createContext(r, t = {}) {
    const n = this.options, o = W(n.baseURL);
    let u = W(r);
    u = n.normalizeUrl(encodeURI(u));
    const c = new rn();
    return c.baseURL = o, c.path = u, c.url = this.getUrl(o, u, t.params), c.requestOptions = {
      headers: {},
      timeout: n.timeout,
      ...t
    }, c;
  }
  createRequest(r, t = {}, n = []) {
    const o = this.createContext(r, t), u = this.options;
    let c = [];
    typeof u.middlewares == "function" && (c = c.concat(W(u.middlewares))), c = c.concat(this.middlewares), n && (typeof n == "function" ? c.push(n) : n instanceof Array && n.length > 0 && (c = c.concat(n)));
    const f = (a) => {
      const i = c[a];
      if (!i) {
        if (o.requestOptions.timeout && !o.requestOptions.signal) {
          const s = new AbortController();
          o.requestOptions.signal = s.signal, setTimeout(() => s.abort(), o.requestOptions.timeout);
        }
        return o.request = new Request(o.url, o.requestOptions), fetch(o.request).then((s) => (o.response = s, s));
      }
      try {
        return Promise.resolve(i(o, f.bind(null, a + 1)));
      } catch (s) {
        return Promise.reject(s);
      }
    };
    return f(0).then((a) => c.length > 0 ? o.result : a);
  }
  request(r, t = {}, n = []) {
    if (t.throttle !== void 0 && t.debounce !== void 0)
      throw new Error("throttle and debounce cannot be set at the same time");
    return t.throttle ? new Promise((o) => {
      Vr(() => o(this.createRequest(r, t, n)), t.throttle);
    }) : t.debounce ? new Promise((o) => {
      Se(() => o(this.createRequest(r, t, n)), t.debounce);
    }) : this.createRequest(r, t, n);
  }
  get(r, t, n = {}, o = []) {
    return n.method = "GET", n.params = t, this.request(r, n, o);
  }
  post(r, t, n = {}, o = []) {
    return n.method = "POST", n.body = t, this.request(r, n, o);
  }
  patch(r, t = {}, n = []) {
    return t.method = "PATCH", this.request(r, t, n);
  }
  put(r, t = {}, n = []) {
    return t.method = "PUT", this.request(r, t, n);
  }
  delete(r, t = {}, n = []) {
    return t.method = "DELETE", this.request(r, t, n);
  }
  upload(r, t, n = {}, o = []) {
    return n.method = "POST", n.body = t, n.headers = {
      "Content-Type": "multipart/form-data;charset=UTF-8"
      /* FormData */
    }, this.request(r, n, o);
  }
}
class on {
  constructor() {
    b(this, "items");
    this.items = {};
  }
  /**
   * 查找字典中的元素
   * @param key 关键字
   */
  has(r) {
    return this.items.hasOwnProperty(r);
  }
  /**
   * 向字典添加一个元素
   * @param key 关键字
   * @param val 值
   */
  add(r, t) {
    this.items[r] = t;
  }
  /**
   * 通过关键字删除字典项，返回是否删除成功
   * @param key 关键字
   */
  remove(r) {
    return this.has(r) ? (delete this.items[r], !0) : !1;
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
  get(r) {
    return this.has(r) ? this.items[r] : void 0;
  }
  /**
   * 返回一个包含所有value数组
   */
  values() {
    const r = [];
    for (const t in this.items)
      this.has(t) && r.push(this.items[t]);
    return r;
  }
  /**
   * 循环字典子元素
   * @param func 入参为key和value
   */
  map(r) {
    for (const t in this.items)
      if (this.has(t)) {
        const n = this.items[t];
        r(t, n);
      }
  }
  /**
   * 查看字典中元素的个数
   */
  count() {
    let r = 0;
    for (const t in this.items)
      this.has(t) && r++;
    return r;
  }
}
function sn(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Le = { exports: {} };
(function(e) {
  var r = Object.prototype.hasOwnProperty, t = "~";
  function n() {
  }
  Object.create && (n.prototype = /* @__PURE__ */ Object.create(null), new n().__proto__ || (t = !1));
  function o(a, i, s) {
    this.fn = a, this.context = i, this.once = s || !1;
  }
  function u(a, i, s, l, w) {
    if (typeof s != "function")
      throw new TypeError("The listener must be a function");
    var g = new o(s, l || a, w), h = t ? t + i : i;
    return a._events[h] ? a._events[h].fn ? a._events[h] = [a._events[h], g] : a._events[h].push(g) : (a._events[h] = g, a._eventsCount++), a;
  }
  function c(a, i) {
    --a._eventsCount === 0 ? a._events = new n() : delete a._events[i];
  }
  function f() {
    this._events = new n(), this._eventsCount = 0;
  }
  f.prototype.eventNames = function() {
    var i = [], s, l;
    if (this._eventsCount === 0)
      return i;
    for (l in s = this._events)
      r.call(s, l) && i.push(t ? l.slice(1) : l);
    return Object.getOwnPropertySymbols ? i.concat(Object.getOwnPropertySymbols(s)) : i;
  }, f.prototype.listeners = function(i) {
    var s = t ? t + i : i, l = this._events[s];
    if (!l)
      return [];
    if (l.fn)
      return [l.fn];
    for (var w = 0, g = l.length, h = new Array(g); w < g; w++)
      h[w] = l[w].fn;
    return h;
  }, f.prototype.listenerCount = function(i) {
    var s = t ? t + i : i, l = this._events[s];
    return l ? l.fn ? 1 : l.length : 0;
  }, f.prototype.emit = function(i, s, l, w, g, h) {
    var j = t ? t + i : i;
    if (!this._events[j])
      return !1;
    var p = this._events[j], m = arguments.length, A, y;
    if (p.fn) {
      switch (p.once && this.removeListener(i, p.fn, void 0, !0), m) {
        case 1:
          return p.fn.call(p.context), !0;
        case 2:
          return p.fn.call(p.context, s), !0;
        case 3:
          return p.fn.call(p.context, s, l), !0;
        case 4:
          return p.fn.call(p.context, s, l, w), !0;
        case 5:
          return p.fn.call(p.context, s, l, w, g), !0;
        case 6:
          return p.fn.call(p.context, s, l, w, g, h), !0;
      }
      for (y = 1, A = new Array(m - 1); y < m; y++)
        A[y - 1] = arguments[y];
      p.fn.apply(p.context, A);
    } else {
      var v = p.length, E;
      for (y = 0; y < v; y++)
        switch (p[y].once && this.removeListener(i, p[y].fn, void 0, !0), m) {
          case 1:
            p[y].fn.call(p[y].context);
            break;
          case 2:
            p[y].fn.call(p[y].context, s);
            break;
          case 3:
            p[y].fn.call(p[y].context, s, l);
            break;
          case 4:
            p[y].fn.call(p[y].context, s, l, w);
            break;
          default:
            if (!A)
              for (E = 1, A = new Array(m - 1); E < m; E++)
                A[E - 1] = arguments[E];
            p[y].fn.apply(p[y].context, A);
        }
    }
    return !0;
  }, f.prototype.on = function(i, s, l) {
    return u(this, i, s, l, !1);
  }, f.prototype.once = function(i, s, l) {
    return u(this, i, s, l, !0);
  }, f.prototype.removeListener = function(i, s, l, w) {
    var g = t ? t + i : i;
    if (!this._events[g])
      return this;
    if (!s)
      return c(this, g), this;
    var h = this._events[g];
    if (h.fn)
      h.fn === s && (!w || h.once) && (!l || h.context === l) && c(this, g);
    else {
      for (var j = 0, p = [], m = h.length; j < m; j++)
        (h[j].fn !== s || w && !h[j].once || l && h[j].context !== l) && p.push(h[j]);
      p.length ? this._events[g] = p.length === 1 ? p[0] : p : c(this, g);
    }
    return this;
  }, f.prototype.removeAllListeners = function(i) {
    var s;
    return i ? (s = t ? t + i : i, this._events[s] && c(this, s)) : (this._events = new n(), this._eventsCount = 0), this;
  }, f.prototype.off = f.prototype.removeListener, f.prototype.addListener = f.prototype.on, f.prefixed = t, f.EventEmitter = f, e.exports = f;
})(Le);
var an = Le.exports;
const cn = /* @__PURE__ */ sn(an);
class un extends cn {
}
const X = "_ipc";
class fn {
  constructor(r = null) {
    /**
     * 事件触发器
     */
    b(this, "emitter");
    /**
     * iframe窗口对象
     */
    b(this, "contentWindow", null);
    /**
     * 是否跨域
     */
    b(this, "isCrossOrigin", !1);
    if (this.emitter = new un(), r) {
      try {
        r.document;
      } catch {
        this.isCrossOrigin = !0;
      }
      this.contentWindow = r;
    }
  }
  /**
   * 执行监听器
   * @param event 事件名
   * @param args 参数
   */
  send(r, t) {
    if (this.isCrossOrigin && this.contentWindow)
      this.contentWindow.postMessage(
        {
          event: r,
          args: t
        },
        "*"
      );
    else {
      if (this.contentWindow) {
        const n = this.contentWindow[X];
        if (n) {
          n.send(r, t);
          return;
        }
      }
      this.emitter.emit(r, t);
    }
  }
}
class ee {
  constructor() {
    /**
     * 目标监听器清单
     */
    b(this, "targets");
    b(this, "sendingEvents", /* @__PURE__ */ new Set());
    this.targets = new on();
  }
  static init() {
    const r = new ee();
    if (typeof window < "u") {
      const t = window[X];
      if (t)
        return t;
      window[X] = r;
    }
    return r;
  }
  /**
   * 添加目标监听器
   * @param key 目标名称
   */
  addTarget(r, t = null) {
    const n = this.targets.items[r];
    if (n) {
      n.contentWindow = t;
      return;
    }
    this.targets.add(r, new fn(t));
  }
  /**
   * 删除目标监听器
   * @param key 目标名称
   */
  removeTarget(r) {
    this.targets.remove(r);
  }
  remove(r, t, n) {
    var o;
    return typeof t == "function" && (n = t, t = "*"), t && n ? (o = this.targets.get(t)) == null || o.emitter.removeListener(r, n) : this.targets.map((u, c) => {
      c.emitter.removeAllListeners(r);
    }), this;
  }
  on(r, t, n) {
    var o;
    return typeof t == "function" && (n = t, t = "*"), n && (this.addTarget(t), (o = this.targets.get(t)) == null || o.emitter.on(r, n)), this;
  }
  once(r, t, n) {
    var o;
    return typeof t == "function" && (n = t, t = "*"), n && (this.addTarget(t), (o = this.targets.get(t)) == null || o.emitter.once(r, n)), this;
  }
  /**
   * 执行所有监听器
   * @param event 事件名
   * @param args 参数
   */
  send(r, t) {
    this.sendingEvents.has(r) || (this.sendingEvents.add(r), this.targets.map((n, o) => {
      o.send(r, t);
    }), this.sendingEvents.delete(r));
  }
}
var ke = /* @__PURE__ */ ((e) => (e.Mobile = "APP", e.Desktop = "WEB", e.NODE_JS = "NodeJs", e))(ke || {});
const $ = {
  ipc: null,
  config: {
    language: "zh-CN",
    baseUrl: ""
  },
  platform: function() {
    return typeof window < "u" ? typeof window.APP !== void 0 && typeof window.APP < "u" ? "APP" : "WEB" : "NodeJs";
  }(),
  getLanguage() {
    switch (this.platform) {
      case "APP":
        return window.APP.getLanguage();
      default:
        return this.config.language || navigator.language;
    }
  },
  getToken() {
    switch (this.platform) {
      case "APP":
        return window.APP.getToken();
      case "WEB":
        return localStorage.getItem("_token");
      default:
        return "";
    }
  },
  setToken(e) {
    switch (this.platform) {
      case "APP":
        throw new Error("The operation is not supported");
      case "WEB":
        return localStorage.setItem("_token", e);
      default:
        return "";
    }
  },
  getOrgId() {
    switch (this.platform) {
      case "APP":
        return window.APP.getOrgId();
      case "WEB":
        return localStorage.getItem("_orgId");
      default:
        return "";
    }
  },
  setOrgId(e) {
    switch (this.platform) {
      case "APP":
        throw new Error("The operation is not supported");
      case "WEB":
        return localStorage.setItem("_orgId", e);
      default:
        return "";
    }
  },
  utils: {
    isEmpty: Q
  }
};
class ye extends Error {
  constructor(t, n, o, u = "") {
    var c;
    super();
    b(this, "code", -1);
    b(this, "status", "");
    b(this, "type", "");
    b(this, "description", "");
    this.message = t, this.name = "CustomError", this.code = n, this.status = o, this.type = "error", this.description = u, (c = $.ipc.targets.get("_self")) == null || c.send("custom_error", this);
  }
}
const De = typeof window < "u", ve = De ? null : require("node:path"), ln = De ? null : require("swagger-typescript-api");
function wn(e) {
  return !e || !e.baseUrl || !e.inputs ? null : e.inputs.length === 0 ? (console.log("swagger-api-gen: No input files found."), null) : {
    name: "swagger-api-gen",
    enforce: "pre",
    apply: "serve",
    buildStart() {
      for (const r in e.inputs) {
        if (r === "index")
          continue;
        const t = `/api/${r}`;
        ln.generateApi({
          name: r,
          url: `${e.baseUrl}${t}/v3/api-docs`,
          output: ve.resolve(process.cwd(), (e == null ? void 0 : e.output) || "./src/api"),
          templates: ve.resolve(process.cwd(), (e == null ? void 0 : e.templates) || "./plugins/swagger-templates"),
          singleHttpClient: !0,
          httpClientType: "fetch",
          // @ts-ignore
          apiClassName: `${r[0].toUpperCase() + r.slice(1)}Api`,
          apiPrefix: t,
          importModules: 'import { Http } from "@/types/web-core";',
          hooks: {
            onFormatRouteName: (n, o) => /\d/.test(o) && n.operationId.includes("_") ? n.operationId.split("_", 1)[0] : o
          }
        }).catch((n) => console.error(n));
      }
    }
  };
}
const pn = "YYYY-MM-DD HH:mm:ss";
function We(e) {
  for (const r in e) {
    if (e[r] && e[r]._isAMomentObject && (e[r] = e[r].format(pn)), me(r)) {
      const t = e[r];
      if (t)
        try {
          e[r] = me(t) ? t.trim() : t;
        } catch (n) {
          throw new Error(n);
        }
    }
    _(e[r]) && We(e[r]);
  }
}
const dn = async (e, r) => {
  const t = e.requestOptions.body;
  t && Object.prototype.toString.call(t) === "[object Object]" && We(t), await r();
}, gn = async (e, r) => {
  var u, c, f;
  const t = e.requestOptions, n = t.body;
  if (!(n instanceof FormData) && !(n instanceof URLSearchParams)) {
    let a = !0;
    const i = t.headers, s = Q(i) ? null : i == null ? void 0 : i["Content-Type"];
    s ? a = s.startsWith("application/json") : i["Content-Type"] = Ue.Json, a && typeof n == "object" && (t.body = JSON.stringify(n));
  }
  if (await r(), e.result)
    return;
  const o = ((u = e.response) == null ? void 0 : u.headers.get("Content-Type")) || "";
  (c = e.response) != null && c.ok && (o != null && o.startsWith("application/json")) && (e.result = await ((f = e.response) == null ? void 0 : f.json()));
}, hn = async (e, r) => {
  var u, c, f, a;
  const n = e.requestOptions.headers, o = $.getToken();
  if (o && Hr(n.Authorization) && (n.Authorization = `Bearer ${o}`), await r(), !((u = e.response) != null && u.ok)) {
    const i = new Error("An error occurred while fetching the data.");
    throw i.message = `${(c = e.response) == null ? void 0 : c.status}|${await ((f = e.response) == null ? void 0 : f.text()) || ""}`, i;
  }
  if (((a = e.response) == null ? void 0 : a.status) !== 200)
    throw new ye(JSON.stringify(e.result), 500, e.response.status);
  if (!e.requestOptions.returnNativeResponse) {
    const i = e.result;
    if (i.code === 0 || i.code === 200)
      e.result = i.data;
    else if (i.message)
      throw new ye(i.message, i.code, e.response.status, JSON.stringify(i));
  }
}, mn = async (e, r) => {
  const t = (/* @__PURE__ */ new Date()).getTime();
  e.url += `${e.url.indexOf("?") > 0 ? "&" : "?"}_t=${t}`, await r();
}, te = new Y();
te.baseURL = () => {
  switch ($.platform) {
    case ke.Mobile:
      return window.APP.getURL();
    default:
      return $.config.baseUrl || location.origin;
  }
};
te.middlewares = () => [hn, gn, dn, mn];
const yn = new nn(te);
typeof window < "u" && ($.ipc = ee.init(), $.ipc.addTarget("_self", window), window.http = yn, window.fw = $);
export {
  ye as CustomError,
  on as Dictionary,
  ee as EventBus,
  nn as Http,
  wn as swaggerApiGen
};
