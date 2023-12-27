var Be = Object.defineProperty;
var Ne = (e, r, t) => r in e ? Be(e, r, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[r] = t;
var m = (e, r, t) => (Ne(e, typeof r != "symbol" ? r + "" : r, t), t);
var He = typeof global == "object" && global && global.Object === Object && global;
const be = He;
var qe = typeof self == "object" && self && self.Object === Object && self, Je = be || qe || Function("return this")();
const $ = Je;
var ze = $.Symbol;
const W = ze;
var Te = Object.prototype, Ve = Te.hasOwnProperty, Ge = Te.toString, U = W ? W.toStringTag : void 0;
function Ke(e) {
  var r = Ve.call(e, U), t = e[U];
  try {
    e[U] = void 0;
    var n = !0;
  } catch {
  }
  var o = Ge.call(e);
  return n && (r ? e[U] = t : delete e[U]), o;
}
var Ye = Object.prototype, Xe = Ye.toString;
function Ze(e) {
  return Xe.call(e);
}
var Qe = "[object Null]", et = "[object Undefined]", re = W ? W.toStringTag : void 0;
function M(e) {
  return e == null ? e === void 0 ? et : Qe : re && re in Object(e) ? Ke(e) : Ze(e);
}
function k(e) {
  return e != null && typeof e == "object";
}
var tt = "[object Symbol]";
function rt(e) {
  return typeof e == "symbol" || k(e) && M(e) == tt;
}
var nt = Array.isArray;
const Ee = nt;
var ot = /\s/;
function it(e) {
  for (var r = e.length; r-- && ot.test(e.charAt(r)); )
    ;
  return r;
}
var st = /^\s+/;
function at(e) {
  return e && e.slice(0, it(e) + 1).replace(st, "");
}
function O(e) {
  var r = typeof e;
  return e != null && (r == "object" || r == "function");
}
var ne = 0 / 0, ct = /^[-+]0x[0-9a-f]+$/i, ut = /^0b[01]+$/i, ft = /^0o[0-7]+$/i, lt = parseInt;
function oe(e) {
  if (typeof e == "number")
    return e;
  if (rt(e))
    return ne;
  if (O(e)) {
    var r = typeof e.valueOf == "function" ? e.valueOf() : e;
    e = O(r) ? r + "" : r;
  }
  if (typeof e != "string")
    return e === 0 ? e : +e;
  e = at(e);
  var t = ut.test(e);
  return t || ft.test(e) ? lt(e.slice(2), t ? 2 : 8) : ct.test(e) ? ne : +e;
}
var pt = "[object AsyncFunction]", dt = "[object Function]", gt = "[object GeneratorFunction]", ht = "[object Proxy]";
function je(e) {
  if (!O(e))
    return !1;
  var r = M(e);
  return r == dt || r == gt || r == pt || r == ht;
}
var mt = $["__core-js_shared__"];
const H = mt;
var ie = function() {
  var e = /[^.]+$/.exec(H && H.keys && H.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function yt(e) {
  return !!ie && ie in e;
}
var wt = Function.prototype, vt = wt.toString;
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
var bt = /[\\^$.*+?()[\]{}|]/g, Tt = /^\[object .+?Constructor\]$/, Et = Function.prototype, jt = Object.prototype, At = Et.toString, Pt = jt.hasOwnProperty, St = RegExp(
  "^" + At.call(Pt).replace(bt, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function xt(e) {
  if (!O(e) || yt(e))
    return !1;
  var r = je(e) ? St : Tt;
  return r.test(C(e));
}
function $t(e, r) {
  return e == null ? void 0 : e[r];
}
function D(e, r) {
  var t = $t(e, r);
  return xt(t) ? t : void 0;
}
var Ot = D($, "WeakMap");
const z = Ot;
var _t = 9007199254740991;
function Ae(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= _t;
}
function Mt(e) {
  return e != null && Ae(e.length) && !je(e);
}
var Ct = Object.prototype;
function Pe(e) {
  var r = e && e.constructor, t = typeof r == "function" && r.prototype || Ct;
  return e === t;
}
var Rt = "[object Arguments]";
function se(e) {
  return k(e) && M(e) == Rt;
}
var Se = Object.prototype, It = Se.hasOwnProperty, Ut = Se.propertyIsEnumerable, Lt = se(function() {
  return arguments;
}()) ? se : function(e) {
  return k(e) && It.call(e, "callee") && !Ut.call(e, "callee");
};
const kt = Lt;
function Dt() {
  return !1;
}
var xe = typeof exports == "object" && exports && !exports.nodeType && exports, ae = xe && typeof module == "object" && module && !module.nodeType && module, Ft = ae && ae.exports === xe, ce = Ft ? $.Buffer : void 0, Wt = ce ? ce.isBuffer : void 0, Bt = Wt || Dt;
const Nt = Bt;
var Ht = "[object Arguments]", qt = "[object Array]", Jt = "[object Boolean]", zt = "[object Date]", Vt = "[object Error]", Gt = "[object Function]", Kt = "[object Map]", Yt = "[object Number]", Xt = "[object Object]", Zt = "[object RegExp]", Qt = "[object Set]", er = "[object String]", tr = "[object WeakMap]", rr = "[object ArrayBuffer]", nr = "[object DataView]", or = "[object Float32Array]", ir = "[object Float64Array]", sr = "[object Int8Array]", ar = "[object Int16Array]", cr = "[object Int32Array]", ur = "[object Uint8Array]", fr = "[object Uint8ClampedArray]", lr = "[object Uint16Array]", pr = "[object Uint32Array]", T = {};
T[or] = T[ir] = T[sr] = T[ar] = T[cr] = T[ur] = T[fr] = T[lr] = T[pr] = !0;
T[Ht] = T[qt] = T[rr] = T[Jt] = T[nr] = T[zt] = T[Vt] = T[Gt] = T[Kt] = T[Yt] = T[Xt] = T[Zt] = T[Qt] = T[er] = T[tr] = !1;
function dr(e) {
  return k(e) && Ae(e.length) && !!T[M(e)];
}
function gr(e) {
  return function(r) {
    return e(r);
  };
}
var $e = typeof exports == "object" && exports && !exports.nodeType && exports, L = $e && typeof module == "object" && module && !module.nodeType && module, hr = L && L.exports === $e, q = hr && be.process, mr = function() {
  try {
    var e = L && L.require && L.require("util").types;
    return e || q && q.binding && q.binding("util");
  } catch {
  }
}();
const ue = mr;
var fe = ue && ue.isTypedArray, yr = fe ? gr(fe) : dr;
const wr = yr;
function vr(e, r) {
  return function(t) {
    return e(r(t));
  };
}
var br = vr(Object.keys, Object);
const Tr = br;
var Er = Object.prototype, jr = Er.hasOwnProperty;
function Ar(e) {
  if (!Pe(e))
    return Tr(e);
  var r = [];
  for (var t in Object(e))
    jr.call(e, t) && t != "constructor" && r.push(t);
  return r;
}
var Pr = D($, "Map");
const V = Pr;
var Sr = D($, "DataView");
const G = Sr;
var xr = D($, "Promise");
const K = xr;
var $r = D($, "Set");
const Y = $r;
var le = "[object Map]", Or = "[object Object]", pe = "[object Promise]", de = "[object Set]", ge = "[object WeakMap]", he = "[object DataView]", _r = C(G), Mr = C(V), Cr = C(K), Rr = C(Y), Ir = C(z), _ = M;
(G && _(new G(new ArrayBuffer(1))) != he || V && _(new V()) != le || K && _(K.resolve()) != pe || Y && _(new Y()) != de || z && _(new z()) != ge) && (_ = function(e) {
  var r = M(e), t = r == Or ? e.constructor : void 0, n = t ? C(t) : "";
  if (n)
    switch (n) {
      case _r:
        return he;
      case Mr:
        return le;
      case Cr:
        return pe;
      case Rr:
        return de;
      case Ir:
        return ge;
    }
  return r;
});
const Ur = _;
var Lr = function() {
  return $.Date.now();
};
const J = Lr;
var kr = "Expected a function", Dr = Math.max, Fr = Math.min;
function Oe(e, r, t) {
  var n, o, f, c, u, a, i = 0, s = !1, l = !1, d = !0;
  if (typeof e != "function")
    throw new TypeError(kr);
  r = oe(r) || 0, O(t) && (s = !!t.leading, l = "maxWait" in t, f = l ? Dr(oe(t.maxWait) || 0, r) : f, d = "trailing" in t ? !!t.trailing : d);
  function g(h) {
    var P = n, S = o;
    return n = o = void 0, i = h, c = e.apply(S, P), c;
  }
  function y(h) {
    return i = h, u = setTimeout(w, r), s ? g(h) : c;
  }
  function E(h) {
    var P = h - a, S = h - i, R = r - P;
    return l ? Fr(R, f - S) : R;
  }
  function p(h) {
    var P = h - a, S = h - i;
    return a === void 0 || P >= r || P < 0 || l && S >= f;
  }
  function w() {
    var h = J();
    if (p(h))
      return A(h);
    u = setTimeout(w, E(h));
  }
  function A(h) {
    return u = void 0, d && n ? g(h) : (n = o = void 0, c);
  }
  function v() {
    u !== void 0 && clearTimeout(u), i = 0, n = a = o = u = void 0;
  }
  function b() {
    return u === void 0 ? c : A(J());
  }
  function j() {
    var h = J(), P = p(h);
    if (n = arguments, o = this, a = h, P) {
      if (u === void 0)
        return y(a);
      if (l)
        return clearTimeout(u), u = setTimeout(w, r), g(a);
    }
    return u === void 0 && (u = setTimeout(w, r)), c;
  }
  return j.cancel = v, j.flush = b, j;
}
var Wr = "[object String]";
function me(e) {
  return typeof e == "string" || !Ee(e) && k(e) && M(e) == Wr;
}
var Br = "[object Map]", Nr = "[object Set]", Hr = Object.prototype, qr = Hr.hasOwnProperty;
function ye(e) {
  if (e == null)
    return !0;
  if (Mt(e) && (Ee(e) || typeof e == "string" || typeof e.splice == "function" || Nt(e) || wr(e) || kt(e)))
    return !e.length;
  var r = Ur(e);
  if (r == Br || r == Nr)
    return !e.size;
  if (Pe(e))
    return !Ar(e).length;
  for (var t in e)
    if (qr.call(e, t))
      return !1;
  return !0;
}
var Jr = "Expected a function";
function zr(e, r, t) {
  var n = !0, o = !0;
  if (typeof e != "function")
    throw new TypeError(Jr);
  return O(t) && (n = "leading" in t ? !!t.leading : n, o = "trailing" in t ? !!t.trailing : o), Oe(e, r, {
    leading: n,
    maxWait: r,
    trailing: o
  });
}
const F = (e) => typeof e == "function" ? e() : e;
function B(e) {
  return !(e && (typeof e != "object" || (Array.isArray(e) ? e.length : Object.keys(e).length)));
}
function Vr(e) {
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
      for (var o = "", f = t + 1; f < e.length; ) {
        var c = e.charCodeAt(f);
        if (
          // `0-9`
          c >= 48 && c <= 57 || // `A-Z`
          c >= 65 && c <= 90 || // `a-z`
          c >= 97 && c <= 122 || // `_`
          c === 95
        ) {
          o += e[f++];
          continue;
        }
        break;
      }
      if (!o)
        throw new TypeError("Missing parameter name at ".concat(t));
      r.push({ type: "NAME", index: t, value: o }), t = f;
      continue;
    }
    if (n === "(") {
      var u = 1, a = "", f = t + 1;
      if (e[f] === "?")
        throw new TypeError('Pattern cannot start with "?" at '.concat(f));
      for (; f < e.length; ) {
        if (e[f] === "\\") {
          a += e[f++] + e[f++];
          continue;
        }
        if (e[f] === ")") {
          if (u--, u === 0) {
            f++;
            break;
          }
        } else if (e[f] === "(" && (u++, e[f + 1] !== "?"))
          throw new TypeError("Capturing groups are not allowed at ".concat(f));
        a += e[f++];
      }
      if (u)
        throw new TypeError("Unbalanced pattern at ".concat(t));
      if (!a)
        throw new TypeError("Missing pattern at ".concat(t));
      r.push({ type: "PATTERN", index: t, value: a }), t = f;
      continue;
    }
    r.push({ type: "CHAR", index: t, value: e[t++] });
  }
  return r.push({ type: "END", index: t, value: "" }), r;
}
function Gr(e, r) {
  r === void 0 && (r = {});
  for (var t = Vr(e), n = r.prefixes, o = n === void 0 ? "./" : n, f = "[^".concat(I(r.delimiter || "/#?"), "]+?"), c = [], u = 0, a = 0, i = "", s = function(h) {
    if (a < t.length && t[a].type === h)
      return t[a++].value;
  }, l = function(h) {
    var P = s(h);
    if (P !== void 0)
      return P;
    var S = t[a], R = S.type, N = S.index;
    throw new TypeError("Unexpected ".concat(R, " at ").concat(N, ", expected ").concat(h));
  }, d = function() {
    for (var h = "", P; P = s("CHAR") || s("ESCAPED_CHAR"); )
      h += P;
    return h;
  }; a < t.length; ) {
    var g = s("CHAR"), y = s("NAME"), E = s("PATTERN");
    if (y || E) {
      var p = g || "";
      o.indexOf(p) === -1 && (i += p, p = ""), i && (c.push(i), i = ""), c.push({
        name: y || u++,
        prefix: p,
        suffix: "",
        pattern: E || f,
        modifier: s("MODIFIER") || ""
      });
      continue;
    }
    var w = g || s("ESCAPED_CHAR");
    if (w) {
      i += w;
      continue;
    }
    i && (c.push(i), i = "");
    var A = s("OPEN");
    if (A) {
      var p = d(), v = s("NAME") || "", b = s("PATTERN") || "", j = d();
      l("CLOSE"), c.push({
        name: v || (b ? u++ : ""),
        pattern: v && !b ? f : b,
        prefix: p,
        suffix: j,
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
function _e(e) {
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
    return Me(o, r, t).source;
  });
  return new RegExp("(?:".concat(n.join("|"), ")"), _e(t));
}
function Xr(e, r, t) {
  return Zr(Gr(e, t), r, t);
}
function Zr(e, r, t) {
  t === void 0 && (t = {});
  for (var n = t.strict, o = n === void 0 ? !1 : n, f = t.start, c = f === void 0 ? !0 : f, u = t.end, a = u === void 0 ? !0 : u, i = t.encode, s = i === void 0 ? function(N) {
    return N;
  } : i, l = t.delimiter, d = l === void 0 ? "/#?" : l, g = t.endsWith, y = g === void 0 ? "" : g, E = "[".concat(I(y), "]|$"), p = "[".concat(I(d), "]"), w = c ? "^" : "", A = 0, v = e; A < v.length; A++) {
    var b = v[A];
    if (typeof b == "string")
      w += I(s(b));
    else {
      var j = I(s(b.prefix)), h = I(s(b.suffix));
      if (b.pattern)
        if (r && r.push(b), j || h)
          if (b.modifier === "+" || b.modifier === "*") {
            var P = b.modifier === "*" ? "?" : "";
            w += "(?:".concat(j, "((?:").concat(b.pattern, ")(?:").concat(h).concat(j, "(?:").concat(b.pattern, "))*)").concat(h, ")").concat(P);
          } else
            w += "(?:".concat(j, "(").concat(b.pattern, ")").concat(h, ")").concat(b.modifier);
        else
          b.modifier === "+" || b.modifier === "*" ? w += "((?:".concat(b.pattern, ")").concat(b.modifier, ")") : w += "(".concat(b.pattern, ")").concat(b.modifier);
      else
        w += "(?:".concat(j).concat(h, ")").concat(b.modifier);
    }
  }
  if (a)
    o || (w += "".concat(p, "?")), w += t.endsWith ? "(?=".concat(E, ")") : "$";
  else {
    var S = e[e.length - 1], R = typeof S == "string" ? p.indexOf(S[S.length - 1]) > -1 : S === void 0;
    o || (w += "(?:".concat(p, "(?=").concat(E, "))?")), R || (w += "(?=".concat(p, "|").concat(E, ")"));
  }
  return new RegExp(w, _e(t));
}
function Me(e, r, t) {
  return e instanceof RegExp ? Kr(e, r) : Array.isArray(e) ? Yr(e, r, t) : Xr(e, r, t);
}
const Ce = "_$mockHttp", Re = typeof window < "u", Ie = Re ? window.top || window : {}, Ue = () => Ie[Ce] || {
  isMock: !1,
  mockData: []
}, Q = (e) => {
  const r = Ue();
  Ie[Ce] = Object.assign(r, e);
}, Qr = (e) => {
  Q({ mockData: e });
}, en = () => {
  Q({ isMock: !0 });
}, tn = () => {
  Q({ isMock: !0 });
};
if (Re) {
  const e = window.fetch;
  window.fetch = async function(...r) {
    var n;
    const t = Ue();
    if (t.isMock && r[0] !== null) {
      let o, f = "";
      typeof r[0] == "object" ? (o = r[0], f = o.url) : (o = r[1], f = r[0]);
      const c = new URL(f, "http://localhost"), u = (n = t.mockData) == null ? void 0 : n.find((a) => {
        if (!a || !a.url || a.method && a.method.toUpperCase() !== (o == null ? void 0 : o.method))
          return !1;
        const i = new URL(a.url, "http://localhost"), s = new URLSearchParams(i.search), l = new URLSearchParams(c.search);
        for (const [d, g] of s)
          if (l.get(d) !== g)
            return !1;
        return Me(i.pathname).test(c.pathname);
      });
      if (u) {
        const { response: a, timeout: i, statusCode: s } = u;
        i && await new Promise((d) => setTimeout(d, i));
        const l = typeof a == "function" ? a(o) : a;
        return console.debug("mock success: " + f), console.debug(l), l instanceof Response ? Promise.resolve(l) : Promise.resolve(
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
var Le = /* @__PURE__ */ ((e) => (e.Json = "application/json;charset=UTF-8", e.FormURLEncoded = "application/x-www-form-urlencoded;charset=UTF-8", e.FormData = "multipart/form-data;charset=UTF-8", e))(Le || {});
class rn {
  constructor() {
    /**
     * 服务基础路径
     */
    m(this, "baseURL", "");
    /**
     * 请求路径
     */
    m(this, "path", "");
    /**
     * 请求全路径
     */
    m(this, "url", "");
    /**
     * 请求结果
     */
    m(this, "result", null);
    /**
     * 请求参数
     */
    m(this, "requestOptions", {});
    /**
     * 请求信息
     */
    m(this, "request");
    /**
     * 请求体
     */
    m(this, "requestBody");
    /**
     * 请求返回信息
     */
    m(this, "response");
  }
}
class X {
  constructor(r) {
    /**
     * 服务基础路径
     */
    m(this, "baseURL");
    /**
     * 指定请求超时的毫秒数（默认永不超时，Chrome中网络请求超时为300秒，Firefox中为90秒）
     */
    m(this, "timeout");
    /**
     * 服务中间件
     */
    m(this, "middlewares");
    this.baseURL = r || "", this.middlewares = [];
  }
  normalizeUrl(r) {
    return r.toString().replace(/(^\/+|\/+$)/g, "");
  }
  normalizeUrlParams(r, t) {
    if (B(t))
      return "";
    const n = ~r.indexOf("?") ? "&" : "?";
    return typeof t == "object" ? n + Object.entries(t).map(
      (o) => encodeURIComponent(o[0]) + "=" + encodeURIComponent(o[1] === void 0 || o[1] === null ? "" : o[1])
    ).join("&") : t !== "" ? n + F(t) : "";
  }
}
class nn {
  constructor(r) {
    m(this, "middlewares");
    m(this, "options");
    m(this, "pendingMap");
    m(this, "cacheMap");
    m(this, "setMockData", Qr);
    m(this, "openMock", en);
    m(this, "closeMock", tn);
    this.middlewares = [], this.pendingMap = /* @__PURE__ */ new Map(), this.cacheMap = /* @__PURE__ */ new Map(), r instanceof X ? this.options = r : this.options = new X(r);
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
    const n = this.options, o = F(n.baseURL);
    let f = F(r);
    f = n.normalizeUrl(encodeURI(f));
    const c = new rn();
    return c.baseURL = o, c.path = f, c.url = this.getUrl(o, f, t.params), c.requestOptions = {
      headers: {},
      timeout: n.timeout,
      ...t
    }, t.body && (c.requestBody = t.body), c;
  }
  createRequest(r, t = {}, n = []) {
    let o = this.createContext(r, t);
    const f = this.options;
    let c = [];
    typeof f.middlewares == "function" && (c = c.concat(F(f.middlewares))), c = c.concat(this.middlewares), n && (typeof n == "function" ? c.push(n) : n instanceof Array && n.length > 0 && (c = c.concat(n)));
    const u = o.requestOptions.method + "_" + o.url;
    let a = !1;
    if (this.pendingMap.has(u)) {
      a = !0;
      const s = this.pendingMap.get(u);
      o.requestBody && JSON.stringify(o.requestBody) !== JSON.stringify(s == null ? void 0 : s.requestBody) && (a = !1), a && (s && (o = s), console.info(
        "[WebCore Http]: The same request is being executed, and this request has been cancelled. url: " + u
      ));
    } else
      this.pendingMap.set(u, o);
    const i = (s) => {
      const l = c[s];
      if (!l) {
        if (o.requestOptions.timeout && !o.requestOptions.signal) {
          const g = new AbortController();
          o.requestOptions.signal = g.signal, setTimeout(() => g.abort(), o.requestOptions.timeout);
        }
        let d;
        return a && (d = this.cacheMap.get(u)), d || (o.request = new Request(o.url, o.requestOptions), d = fetch(o.request).then((g) => (o.response = g, g)).finally(() => {
          this.pendingMap.has(u) && window.setTimeout(() => {
            this.pendingMap.delete(u), this.cacheMap.delete(u);
          }, 1e3);
        })), a || this.cacheMap.set(u, d), d;
      }
      try {
        return Promise.resolve(l(o, i.bind(null, s + 1)));
      } catch (d) {
        return Promise.reject(d);
      }
    };
    return i(0).then((s) => c.length > 0 ? o.result : s);
  }
  request(r, t = {}, n = []) {
    if (!B(t == null ? void 0 : t.body) && O(t.body)) {
      const o = new FormData();
      let f = !1;
      for (const c in t.body)
        if (Object.prototype.hasOwnProperty.call(t.body, c)) {
          const u = t.body[c];
          u instanceof Blob && (f = !0), o.append(c, u);
        }
      f && (t.body = o);
    }
    if (t.throttle !== void 0 && t.debounce !== void 0)
      throw new Error("throttle and debounce cannot be set at the same time");
    return t.throttle ? new Promise((o) => {
      zr(() => o(this.createRequest(r, t, n)), t.throttle);
    }) : t.debounce ? new Promise((o) => {
      Oe(() => o(this.createRequest(r, t, n)), t.debounce);
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
    return n.method = "POST", n.body = t, this.request(r, n, o);
  }
}
class on {
  constructor() {
    m(this, "items");
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
var ke = { exports: {} };
(function(e) {
  var r = Object.prototype.hasOwnProperty, t = "~";
  function n() {
  }
  Object.create && (n.prototype = /* @__PURE__ */ Object.create(null), new n().__proto__ || (t = !1));
  function o(a, i, s) {
    this.fn = a, this.context = i, this.once = s || !1;
  }
  function f(a, i, s, l, d) {
    if (typeof s != "function")
      throw new TypeError("The listener must be a function");
    var g = new o(s, l || a, d), y = t ? t + i : i;
    return a._events[y] ? a._events[y].fn ? a._events[y] = [a._events[y], g] : a._events[y].push(g) : (a._events[y] = g, a._eventsCount++), a;
  }
  function c(a, i) {
    --a._eventsCount === 0 ? a._events = new n() : delete a._events[i];
  }
  function u() {
    this._events = new n(), this._eventsCount = 0;
  }
  u.prototype.eventNames = function() {
    var i = [], s, l;
    if (this._eventsCount === 0)
      return i;
    for (l in s = this._events)
      r.call(s, l) && i.push(t ? l.slice(1) : l);
    return Object.getOwnPropertySymbols ? i.concat(Object.getOwnPropertySymbols(s)) : i;
  }, u.prototype.listeners = function(i) {
    var s = t ? t + i : i, l = this._events[s];
    if (!l)
      return [];
    if (l.fn)
      return [l.fn];
    for (var d = 0, g = l.length, y = new Array(g); d < g; d++)
      y[d] = l[d].fn;
    return y;
  }, u.prototype.listenerCount = function(i) {
    var s = t ? t + i : i, l = this._events[s];
    return l ? l.fn ? 1 : l.length : 0;
  }, u.prototype.emit = function(i, s, l, d, g, y) {
    var E = t ? t + i : i;
    if (!this._events[E])
      return !1;
    var p = this._events[E], w = arguments.length, A, v;
    if (p.fn) {
      switch (p.once && this.removeListener(i, p.fn, void 0, !0), w) {
        case 1:
          return p.fn.call(p.context), !0;
        case 2:
          return p.fn.call(p.context, s), !0;
        case 3:
          return p.fn.call(p.context, s, l), !0;
        case 4:
          return p.fn.call(p.context, s, l, d), !0;
        case 5:
          return p.fn.call(p.context, s, l, d, g), !0;
        case 6:
          return p.fn.call(p.context, s, l, d, g, y), !0;
      }
      for (v = 1, A = new Array(w - 1); v < w; v++)
        A[v - 1] = arguments[v];
      p.fn.apply(p.context, A);
    } else {
      var b = p.length, j;
      for (v = 0; v < b; v++)
        switch (p[v].once && this.removeListener(i, p[v].fn, void 0, !0), w) {
          case 1:
            p[v].fn.call(p[v].context);
            break;
          case 2:
            p[v].fn.call(p[v].context, s);
            break;
          case 3:
            p[v].fn.call(p[v].context, s, l);
            break;
          case 4:
            p[v].fn.call(p[v].context, s, l, d);
            break;
          default:
            if (!A)
              for (j = 1, A = new Array(w - 1); j < w; j++)
                A[j - 1] = arguments[j];
            p[v].fn.apply(p[v].context, A);
        }
    }
    return !0;
  }, u.prototype.on = function(i, s, l) {
    return f(this, i, s, l, !1);
  }, u.prototype.once = function(i, s, l) {
    return f(this, i, s, l, !0);
  }, u.prototype.removeListener = function(i, s, l, d) {
    var g = t ? t + i : i;
    if (!this._events[g])
      return this;
    if (!s)
      return c(this, g), this;
    var y = this._events[g];
    if (y.fn)
      y.fn === s && (!d || y.once) && (!l || y.context === l) && c(this, g);
    else {
      for (var E = 0, p = [], w = y.length; E < w; E++)
        (y[E].fn !== s || d && !y[E].once || l && y[E].context !== l) && p.push(y[E]);
      p.length ? this._events[g] = p.length === 1 ? p[0] : p : c(this, g);
    }
    return this;
  }, u.prototype.removeAllListeners = function(i) {
    var s;
    return i ? (s = t ? t + i : i, this._events[s] && c(this, s)) : (this._events = new n(), this._eventsCount = 0), this;
  }, u.prototype.off = u.prototype.removeListener, u.prototype.addListener = u.prototype.on, u.prefixed = t, u.EventEmitter = u, e.exports = u;
})(ke);
var an = ke.exports;
const cn = /* @__PURE__ */ sn(an);
class un extends cn {
}
const Z = "_ipc";
class fn {
  constructor(r = null) {
    /**
     * 事件触发器
     */
    m(this, "emitter");
    /**
     * iframe窗口对象
     */
    m(this, "contentWindow", null);
    /**
     * 是否跨域
     */
    m(this, "isCrossOrigin", !1);
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
        const n = this.contentWindow[Z];
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
    m(this, "targets");
    m(this, "sendingEvents", /* @__PURE__ */ new Set());
    this.targets = new on();
  }
  static init() {
    const r = new ee();
    if (typeof window < "u") {
      const t = window[Z];
      if (t)
        return t;
      window[Z] = r;
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
    return typeof t == "function" && (n = t, t = "*"), t && n ? (o = this.targets.get(t)) == null || o.emitter.removeListener(r, n) : this.targets.map((f, c) => {
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
var De = /* @__PURE__ */ ((e) => (e.Mobile = "APP", e.Desktop = "WEB", e.NODE_JS = "NodeJs", e))(De || {});
const x = {
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
class we extends Error {
  constructor(t, n, o, f = "") {
    var c;
    super();
    m(this, "code", -1);
    m(this, "status", "");
    m(this, "type", "");
    m(this, "description", "");
    this.message = t, this.name = "CustomError", this.code = n, this.status = o, this.type = "error", this.description = f, (c = x.ipc.targets.get("_self")) == null || c.send("custom_error", this);
  }
}
const Fe = typeof window < "u", ve = Fe ? null : require("node:path"), ln = Fe ? null : require("swagger-typescript-api");
function vn(e) {
  if (!e || !e.baseUrl || !e.inputs)
    return null;
  const r = e.inputs.split(",");
  return r.length === 0 ? (console.log("swagger-api-gen: No input modules found."), null) : {
    name: "swagger-api-gen",
    enforce: "pre",
    apply: "serve",
    async buildStart() {
      for await (const t of r) {
        const n = `/api/${t}`;
        await ln.generateApi({
          name: t,
          url: `${e.baseUrl}${n}/v3/api-docs`,
          output: ve.resolve(process.cwd(), (e == null ? void 0 : e.output) || "./src/api"),
          templates: ve.resolve(process.cwd(), (e == null ? void 0 : e.templates) || "./plugins/swagger-templates"),
          singleHttpClient: !0,
          httpClientType: "fetch",
          // @ts-ignore
          apiClassName: `${t[0].toUpperCase() + t.slice(1)}Api`,
          apiPrefix: n,
          importModules: 'import { Http } from "@/types/web-core";',
          hooks: {
            onFormatRouteName: (o, f) => /\d/.test(f) && o.operationId.includes("_") ? o.operationId.split("_", 1)[0] : f
          }
        }).catch((o) => console.error(o));
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
    O(e[r]) && We(e[r]);
  }
}
const dn = async (e, r) => {
  const t = e.requestOptions.body;
  t && Object.prototype.toString.call(t) === "[object Object]" && We(t), await r();
}, gn = async (e, r) => {
  var f, c, u;
  const t = e.requestOptions, n = t.body;
  if (!(n instanceof FormData) && !(n instanceof URLSearchParams)) {
    let a = !0;
    const i = t.headers, s = B(i) ? null : i == null ? void 0 : i["Content-Type"];
    s ? a = s.startsWith("application/json") : i["Content-Type"] = Le.Json, a && typeof n == "object" && (t.body = JSON.stringify(n));
  }
  if (await r(), e.result)
    return;
  const o = ((f = e.response) == null ? void 0 : f.headers.get("Content-Type")) || "";
  (c = e.response) != null && c.ok && (o != null && o.startsWith("application/json")) && (e.result = await ((u = e.response) == null ? void 0 : u.json()));
}, hn = async (e, r) => {
  var f, c, u, a;
  const n = e.requestOptions.headers, o = x.getToken();
  if (o && ye(n.Authorization) && (n.Authorization = `Bearer ${o}`), o && ye(n.Authorization) && (n.Authorization = `Bearer ${o}`), n.eid = x.getEnterpriseId(), n.oid = x.getOrgId(), n["Accept-Language"] = x.getLanguage(), n["X-TZ-Offset"] = (/* @__PURE__ */ new Date()).getTimezoneOffset().toString(), await r(), !((f = e.response) != null && f.ok)) {
    const i = new Error("An error occurred while fetching the data.");
    throw i.message = `${(c = e.response) == null ? void 0 : c.status}|${await ((u = e.response) == null ? void 0 : u.text()) || ""}`, i;
  }
  if (((a = e.response) == null ? void 0 : a.status) !== 200)
    throw new we(JSON.stringify(e.result), 500, e.response.status);
  if (!e.requestOptions.returnNativeResponse) {
    const i = e.result;
    if (i.code === 0 || i.code === 200)
      e.result = i.data;
    else if (i.message)
      throw new we(i.message, i.code, e.response.status, JSON.stringify(i));
  }
}, mn = async (e, r) => {
  if (e.url.lastIndexOf("_t=") <= 0) {
    const t = (/* @__PURE__ */ new Date()).getTime();
    e.url += `${e.url.indexOf("?") > 0 ? "&" : "?"}_t=${t}`;
  }
  await r();
}, te = new X();
te.baseURL = () => {
  switch (x.platform) {
    case De.Mobile:
      return window.APP.getURL();
    default:
      return x.config.baseUrl || location.origin;
  }
};
te.middlewares = () => [hn, gn, dn, mn];
const yn = new nn(te);
typeof window < "u" && (x.ipc = ee.init(), x.ipc.addTarget("_self", window), window.http = yn, window.fw = x);
export {
  we as CustomError,
  on as Dictionary,
  ee as EventBus,
  nn as Http,
  vn as swaggerApiGen
};
