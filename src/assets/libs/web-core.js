var Ne = Object.defineProperty;
var Be = (e, r, t) => r in e ? Ne(e, r, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[r] = t;
var b = (e, r, t) => (Be(e, typeof r != "symbol" ? r + "" : r, t), t);
var He = typeof global == "object" && global && global.Object === Object && global;
const be = He;
var ze = typeof self == "object" && self && self.Object === Object && self, Je = be || ze || Function("return this")();
const $ = Je;
var qe = $.Symbol;
const W = qe;
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
function C(e) {
  return e == null ? e === void 0 ? et : Qe : re && re in Object(e) ? Ke(e) : Ze(e);
}
function k(e) {
  return e != null && typeof e == "object";
}
var tt = "[object Symbol]";
function rt(e) {
  return typeof e == "symbol" || k(e) && C(e) == tt;
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
  var r = C(e);
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
function R(e) {
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
  return r.test(R(e));
}
function $t(e, r) {
  return e == null ? void 0 : e[r];
}
function D(e, r) {
  var t = $t(e, r);
  return xt(t) ? t : void 0;
}
var Ot = D($, "WeakMap");
const q = Ot;
var _t = 9007199254740991;
function Ae(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= _t;
}
function Ct(e) {
  return e != null && Ae(e.length) && !je(e);
}
var Rt = Object.prototype;
function Pe(e) {
  var r = e && e.constructor, t = typeof r == "function" && r.prototype || Rt;
  return e === t;
}
var It = "[object Arguments]";
function se(e) {
  return k(e) && C(e) == It;
}
var Se = Object.prototype, Mt = Se.hasOwnProperty, Ut = Se.propertyIsEnumerable, Lt = se(function() {
  return arguments;
}()) ? se : function(e) {
  return k(e) && Mt.call(e, "callee") && !Ut.call(e, "callee");
};
const kt = Lt;
function Dt() {
  return !1;
}
var xe = typeof exports == "object" && exports && !exports.nodeType && exports, ae = xe && typeof module == "object" && module && !module.nodeType && module, Ft = ae && ae.exports === xe, ce = Ft ? $.Buffer : void 0, Wt = ce ? ce.isBuffer : void 0, Nt = Wt || Dt;
const Bt = Nt;
var Ht = "[object Arguments]", zt = "[object Array]", Jt = "[object Boolean]", qt = "[object Date]", Vt = "[object Error]", Gt = "[object Function]", Kt = "[object Map]", Yt = "[object Number]", Xt = "[object Object]", Zt = "[object RegExp]", Qt = "[object Set]", er = "[object String]", tr = "[object WeakMap]", rr = "[object ArrayBuffer]", nr = "[object DataView]", or = "[object Float32Array]", ir = "[object Float64Array]", sr = "[object Int8Array]", ar = "[object Int16Array]", cr = "[object Int32Array]", ur = "[object Uint8Array]", fr = "[object Uint8ClampedArray]", lr = "[object Uint16Array]", pr = "[object Uint32Array]", T = {};
T[or] = T[ir] = T[sr] = T[ar] = T[cr] = T[ur] = T[fr] = T[lr] = T[pr] = !0;
T[Ht] = T[zt] = T[rr] = T[Jt] = T[nr] = T[qt] = T[Vt] = T[Gt] = T[Kt] = T[Yt] = T[Xt] = T[Zt] = T[Qt] = T[er] = T[tr] = !1;
function dr(e) {
  return k(e) && Ae(e.length) && !!T[C(e)];
}
function gr(e) {
  return function(r) {
    return e(r);
  };
}
var $e = typeof exports == "object" && exports && !exports.nodeType && exports, L = $e && typeof module == "object" && module && !module.nodeType && module, hr = L && L.exports === $e, z = hr && be.process, mr = function() {
  try {
    var e = L && L.require && L.require("util").types;
    return e || z && z.binding && z.binding("util");
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
var le = "[object Map]", Or = "[object Object]", pe = "[object Promise]", de = "[object Set]", ge = "[object WeakMap]", he = "[object DataView]", _r = R(G), Cr = R(V), Rr = R(K), Ir = R(Y), Mr = R(q), _ = C;
(G && _(new G(new ArrayBuffer(1))) != he || V && _(new V()) != le || K && _(K.resolve()) != pe || Y && _(new Y()) != de || q && _(new q()) != ge) && (_ = function(e) {
  var r = C(e), t = r == Or ? e.constructor : void 0, n = t ? R(t) : "";
  if (n)
    switch (n) {
      case _r:
        return he;
      case Cr:
        return le;
      case Rr:
        return pe;
      case Ir:
        return de;
      case Mr:
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
  var n, o, c, u, f, a, i = 0, s = !1, l = !1, v = !0;
  if (typeof e != "function")
    throw new TypeError(kr);
  r = oe(r) || 0, O(t) && (s = !!t.leading, l = "maxWait" in t, c = l ? Dr(oe(t.maxWait) || 0, r) : c, v = "trailing" in t ? !!t.trailing : v);
  function g(d) {
    var P = n, S = o;
    return n = o = void 0, i = d, u = e.apply(S, P), u;
  }
  function h(d) {
    return i = d, f = setTimeout(m, r), s ? g(d) : u;
  }
  function E(d) {
    var P = d - a, S = d - i, I = r - P;
    return l ? Fr(I, c - S) : I;
  }
  function p(d) {
    var P = d - a, S = d - i;
    return a === void 0 || P >= r || P < 0 || l && S >= c;
  }
  function m() {
    var d = J();
    if (p(d))
      return A(d);
    f = setTimeout(m, E(d));
  }
  function A(d) {
    return f = void 0, v && n ? g(d) : (n = o = void 0, u);
  }
  function y() {
    f !== void 0 && clearTimeout(f), i = 0, n = a = o = f = void 0;
  }
  function w() {
    return f === void 0 ? u : A(J());
  }
  function j() {
    var d = J(), P = p(d);
    if (n = arguments, o = this, a = d, P) {
      if (f === void 0)
        return h(a);
      if (l)
        return clearTimeout(f), f = setTimeout(m, r), g(a);
    }
    return f === void 0 && (f = setTimeout(m, r)), u;
  }
  return j.cancel = y, j.flush = w, j;
}
var Wr = "[object String]";
function me(e) {
  return typeof e == "string" || !Ee(e) && k(e) && C(e) == Wr;
}
var Nr = "[object Map]", Br = "[object Set]", Hr = Object.prototype, zr = Hr.hasOwnProperty;
function ye(e) {
  if (e == null)
    return !0;
  if (Ct(e) && (Ee(e) || typeof e == "string" || typeof e.splice == "function" || Bt(e) || wr(e) || kt(e)))
    return !e.length;
  var r = Ur(e);
  if (r == Nr || r == Br)
    return !e.size;
  if (Pe(e))
    return !Ar(e).length;
  for (var t in e)
    if (zr.call(e, t))
      return !1;
  return !0;
}
var Jr = "Expected a function";
function qr(e, r, t) {
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
function N(e) {
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
      for (var o = "", c = t + 1; c < e.length; ) {
        var u = e.charCodeAt(c);
        if (
          // `0-9`
          u >= 48 && u <= 57 || // `A-Z`
          u >= 65 && u <= 90 || // `a-z`
          u >= 97 && u <= 122 || // `_`
          u === 95
        ) {
          o += e[c++];
          continue;
        }
        break;
      }
      if (!o)
        throw new TypeError("Missing parameter name at ".concat(t));
      r.push({ type: "NAME", index: t, value: o }), t = c;
      continue;
    }
    if (n === "(") {
      var f = 1, a = "", c = t + 1;
      if (e[c] === "?")
        throw new TypeError('Pattern cannot start with "?" at '.concat(c));
      for (; c < e.length; ) {
        if (e[c] === "\\") {
          a += e[c++] + e[c++];
          continue;
        }
        if (e[c] === ")") {
          if (f--, f === 0) {
            c++;
            break;
          }
        } else if (e[c] === "(" && (f++, e[c + 1] !== "?"))
          throw new TypeError("Capturing groups are not allowed at ".concat(c));
        a += e[c++];
      }
      if (f)
        throw new TypeError("Unbalanced pattern at ".concat(t));
      if (!a)
        throw new TypeError("Missing pattern at ".concat(t));
      r.push({ type: "PATTERN", index: t, value: a }), t = c;
      continue;
    }
    r.push({ type: "CHAR", index: t, value: e[t++] });
  }
  return r.push({ type: "END", index: t, value: "" }), r;
}
function Gr(e, r) {
  r === void 0 && (r = {});
  for (var t = Vr(e), n = r.prefixes, o = n === void 0 ? "./" : n, c = "[^".concat(M(r.delimiter || "/#?"), "]+?"), u = [], f = 0, a = 0, i = "", s = function(d) {
    if (a < t.length && t[a].type === d)
      return t[a++].value;
  }, l = function(d) {
    var P = s(d);
    if (P !== void 0)
      return P;
    var S = t[a], I = S.type, B = S.index;
    throw new TypeError("Unexpected ".concat(I, " at ").concat(B, ", expected ").concat(d));
  }, v = function() {
    for (var d = "", P; P = s("CHAR") || s("ESCAPED_CHAR"); )
      d += P;
    return d;
  }; a < t.length; ) {
    var g = s("CHAR"), h = s("NAME"), E = s("PATTERN");
    if (h || E) {
      var p = g || "";
      o.indexOf(p) === -1 && (i += p, p = ""), i && (u.push(i), i = ""), u.push({
        name: h || f++,
        prefix: p,
        suffix: "",
        pattern: E || c,
        modifier: s("MODIFIER") || ""
      });
      continue;
    }
    var m = g || s("ESCAPED_CHAR");
    if (m) {
      i += m;
      continue;
    }
    i && (u.push(i), i = "");
    var A = s("OPEN");
    if (A) {
      var p = v(), y = s("NAME") || "", w = s("PATTERN") || "", j = v();
      l("CLOSE"), u.push({
        name: y || (w ? f++ : ""),
        pattern: y && !w ? c : w,
        prefix: p,
        suffix: j,
        modifier: s("MODIFIER") || ""
      });
      continue;
    }
    l("END");
  }
  return u;
}
function M(e) {
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
    return Ce(o, r, t).source;
  });
  return new RegExp("(?:".concat(n.join("|"), ")"), _e(t));
}
function Xr(e, r, t) {
  return Zr(Gr(e, t), r, t);
}
function Zr(e, r, t) {
  t === void 0 && (t = {});
  for (var n = t.strict, o = n === void 0 ? !1 : n, c = t.start, u = c === void 0 ? !0 : c, f = t.end, a = f === void 0 ? !0 : f, i = t.encode, s = i === void 0 ? function(B) {
    return B;
  } : i, l = t.delimiter, v = l === void 0 ? "/#?" : l, g = t.endsWith, h = g === void 0 ? "" : g, E = "[".concat(M(h), "]|$"), p = "[".concat(M(v), "]"), m = u ? "^" : "", A = 0, y = e; A < y.length; A++) {
    var w = y[A];
    if (typeof w == "string")
      m += M(s(w));
    else {
      var j = M(s(w.prefix)), d = M(s(w.suffix));
      if (w.pattern)
        if (r && r.push(w), j || d)
          if (w.modifier === "+" || w.modifier === "*") {
            var P = w.modifier === "*" ? "?" : "";
            m += "(?:".concat(j, "((?:").concat(w.pattern, ")(?:").concat(d).concat(j, "(?:").concat(w.pattern, "))*)").concat(d, ")").concat(P);
          } else
            m += "(?:".concat(j, "(").concat(w.pattern, ")").concat(d, ")").concat(w.modifier);
        else
          w.modifier === "+" || w.modifier === "*" ? m += "((?:".concat(w.pattern, ")").concat(w.modifier, ")") : m += "(".concat(w.pattern, ")").concat(w.modifier);
      else
        m += "(?:".concat(j).concat(d, ")").concat(w.modifier);
    }
  }
  if (a)
    o || (m += "".concat(p, "?")), m += t.endsWith ? "(?=".concat(E, ")") : "$";
  else {
    var S = e[e.length - 1], I = typeof S == "string" ? p.indexOf(S[S.length - 1]) > -1 : S === void 0;
    o || (m += "(?:".concat(p, "(?=").concat(E, "))?")), I || (m += "(?=".concat(p, "|").concat(E, ")"));
  }
  return new RegExp(m, _e(t));
}
function Ce(e, r, t) {
  return e instanceof RegExp ? Kr(e, r) : Array.isArray(e) ? Yr(e, r, t) : Xr(e, r, t);
}
const Re = "_$mockHttp", Ie = typeof window < "u", Me = Ie ? window.top || window : {}, Ue = () => Me[Re] || {
  isMock: !1,
  mockData: []
}, Q = (e) => {
  const r = Ue();
  Me[Re] = Object.assign(r, e);
}, Qr = (e) => {
  Q({ mockData: e });
}, en = () => {
  Q({ isMock: !0 });
}, tn = () => {
  Q({ isMock: !0 });
};
if (Ie) {
  const e = window.fetch;
  window.fetch = async function(...r) {
    var n;
    const t = Ue();
    if (t.isMock && r[0] !== null) {
      let o, c = "";
      typeof r[0] == "object" ? (o = r[0], c = o.url) : (o = r[1], c = r[0]);
      const u = new URL(c, "http://localhost"), f = (n = t.mockData) == null ? void 0 : n.find((a) => {
        if (!a || !a.url || a.method && a.method.toUpperCase() !== (o == null ? void 0 : o.method))
          return !1;
        const i = new URL(a.url, "http://localhost"), s = new URLSearchParams(i.search), l = new URLSearchParams(u.search);
        for (const [v, g] of s)
          if (l.get(v) !== g)
            return !1;
        return Ce(i.pathname).test(u.pathname);
      });
      if (f) {
        const { response: a, timeout: i, statusCode: s } = f;
        i && await new Promise((v) => setTimeout(v, i));
        const l = typeof a == "function" ? a(o) : a;
        return console.debug("mock success: " + c), console.debug(l), l instanceof Response ? Promise.resolve(l) : Promise.resolve(
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
class X {
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
    if (N(t))
      return "";
    const n = ~r.indexOf("?") ? "&" : "?";
    return typeof t == "object" ? n + Object.entries(t).map(
      (o) => encodeURIComponent(o[0]) + "=" + encodeURIComponent(o[1] === void 0 || o[1] === null ? "" : o[1])
    ).join("&") : t !== "" ? n + F(t) : "";
  }
}
class nn {
  constructor(r) {
    b(this, "middlewares");
    b(this, "options");
    b(this, "setMockData", Qr);
    b(this, "openMock", en);
    b(this, "closeMock", tn);
    this.middlewares = [], r instanceof X ? this.options = r : this.options = new X(r);
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
    let c = F(r);
    c = n.normalizeUrl(encodeURI(c));
    const u = new rn();
    return u.baseURL = o, u.path = c, u.url = this.getUrl(o, c, t.params), u.requestOptions = {
      headers: {},
      timeout: n.timeout,
      ...t
    }, u;
  }
  createRequest(r, t = {}, n = []) {
    const o = this.createContext(r, t), c = this.options;
    let u = [];
    typeof c.middlewares == "function" && (u = u.concat(F(c.middlewares))), u = u.concat(this.middlewares), n && (typeof n == "function" ? u.push(n) : n instanceof Array && n.length > 0 && (u = u.concat(n)));
    const f = (a) => {
      const i = u[a];
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
    return f(0).then((a) => u.length > 0 ? o.result : a);
  }
  request(r, t = {}, n = []) {
    if (!N(t == null ? void 0 : t.body) && O(t.body)) {
      const o = new FormData();
      let c = !1;
      for (const u in t.body)
        if (Object.prototype.hasOwnProperty.call(t.body, u)) {
          const f = t.body[u];
          f instanceof Blob && (c = !0), o.append(u, f);
        }
      c && (t.body = o);
    }
    if (t.throttle !== void 0 && t.debounce !== void 0)
      throw new Error("throttle and debounce cannot be set at the same time");
    return t.throttle ? new Promise((o) => {
      qr(() => o(this.createRequest(r, t, n)), t.throttle);
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
var ke = { exports: {} };
(function(e) {
  var r = Object.prototype.hasOwnProperty, t = "~";
  function n() {
  }
  Object.create && (n.prototype = /* @__PURE__ */ Object.create(null), new n().__proto__ || (t = !1));
  function o(a, i, s) {
    this.fn = a, this.context = i, this.once = s || !1;
  }
  function c(a, i, s, l, v) {
    if (typeof s != "function")
      throw new TypeError("The listener must be a function");
    var g = new o(s, l || a, v), h = t ? t + i : i;
    return a._events[h] ? a._events[h].fn ? a._events[h] = [a._events[h], g] : a._events[h].push(g) : (a._events[h] = g, a._eventsCount++), a;
  }
  function u(a, i) {
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
    for (var v = 0, g = l.length, h = new Array(g); v < g; v++)
      h[v] = l[v].fn;
    return h;
  }, f.prototype.listenerCount = function(i) {
    var s = t ? t + i : i, l = this._events[s];
    return l ? l.fn ? 1 : l.length : 0;
  }, f.prototype.emit = function(i, s, l, v, g, h) {
    var E = t ? t + i : i;
    if (!this._events[E])
      return !1;
    var p = this._events[E], m = arguments.length, A, y;
    if (p.fn) {
      switch (p.once && this.removeListener(i, p.fn, void 0, !0), m) {
        case 1:
          return p.fn.call(p.context), !0;
        case 2:
          return p.fn.call(p.context, s), !0;
        case 3:
          return p.fn.call(p.context, s, l), !0;
        case 4:
          return p.fn.call(p.context, s, l, v), !0;
        case 5:
          return p.fn.call(p.context, s, l, v, g), !0;
        case 6:
          return p.fn.call(p.context, s, l, v, g, h), !0;
      }
      for (y = 1, A = new Array(m - 1); y < m; y++)
        A[y - 1] = arguments[y];
      p.fn.apply(p.context, A);
    } else {
      var w = p.length, j;
      for (y = 0; y < w; y++)
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
            p[y].fn.call(p[y].context, s, l, v);
            break;
          default:
            if (!A)
              for (j = 1, A = new Array(m - 1); j < m; j++)
                A[j - 1] = arguments[j];
            p[y].fn.apply(p[y].context, A);
        }
    }
    return !0;
  }, f.prototype.on = function(i, s, l) {
    return c(this, i, s, l, !1);
  }, f.prototype.once = function(i, s, l) {
    return c(this, i, s, l, !0);
  }, f.prototype.removeListener = function(i, s, l, v) {
    var g = t ? t + i : i;
    if (!this._events[g])
      return this;
    if (!s)
      return u(this, g), this;
    var h = this._events[g];
    if (h.fn)
      h.fn === s && (!v || h.once) && (!l || h.context === l) && u(this, g);
    else {
      for (var E = 0, p = [], m = h.length; E < m; E++)
        (h[E].fn !== s || v && !h[E].once || l && h[E].context !== l) && p.push(h[E]);
      p.length ? this._events[g] = p.length === 1 ? p[0] : p : u(this, g);
    }
    return this;
  }, f.prototype.removeAllListeners = function(i) {
    var s;
    return i ? (s = t ? t + i : i, this._events[s] && u(this, s)) : (this._events = new n(), this._eventsCount = 0), this;
  }, f.prototype.off = f.prototype.removeListener, f.prototype.addListener = f.prototype.on, f.prefixed = t, f.EventEmitter = f, e.exports = f;
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
    b(this, "targets");
    b(this, "sendingEvents", /* @__PURE__ */ new Set());
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
    return typeof t == "function" && (n = t, t = "*"), t && n ? (o = this.targets.get(t)) == null || o.emitter.removeListener(r, n) : this.targets.map((c, u) => {
      u.emitter.removeAllListeners(r);
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
    isEmpty: N
  }
};
class we extends Error {
  constructor(t, n, o, c = "") {
    var u;
    super();
    b(this, "code", -1);
    b(this, "status", "");
    b(this, "type", "");
    b(this, "description", "");
    this.message = t, this.name = "CustomError", this.code = n, this.status = o, this.type = "error", this.description = c, (u = x.ipc.targets.get("_self")) == null || u.send("custom_error", this);
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
            onFormatRouteName: (o, c) => /\d/.test(c) && o.operationId.includes("_") ? o.operationId.split("_", 1)[0] : c
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
  var c, u, f;
  const t = e.requestOptions, n = t.body;
  if (!(n instanceof FormData) && !(n instanceof URLSearchParams)) {
    let a = !0;
    const i = t.headers, s = N(i) ? null : i == null ? void 0 : i["Content-Type"];
    s ? a = s.startsWith("application/json") : i["Content-Type"] = Le.Json, a && typeof n == "object" && (t.body = JSON.stringify(n));
  }
  if (await r(), e.result)
    return;
  const o = ((c = e.response) == null ? void 0 : c.headers.get("Content-Type")) || "";
  (u = e.response) != null && u.ok && (o != null && o.startsWith("application/json")) && (e.result = await ((f = e.response) == null ? void 0 : f.json()));
}, hn = async (e, r) => {
  var c, u, f, a;
  const n = e.requestOptions.headers, o = x.getToken();
  if (o && ye(n.Authorization) && (n.Authorization = `Bearer ${o}`), o && ye(n.Authorization) && (n.Authorization = `Bearer ${o}`), n.eid = x.getEnterpriseId(), n.oid = x.getOrgId(), n["Accept-Language"] = x.getLanguage(), n["X-TZ-Offset"] = (/* @__PURE__ */ new Date()).getTimezoneOffset().toString(), await r(), !((c = e.response) != null && c.ok)) {
    const i = new Error("An error occurred while fetching the data.");
    throw i.message = `${(u = e.response) == null ? void 0 : u.status}|${await ((f = e.response) == null ? void 0 : f.text()) || ""}`, i;
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
  const t = (/* @__PURE__ */ new Date()).getTime();
  e.url += `${e.url.indexOf("?") > 0 ? "&" : "?"}_t=${t}`, await r();
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
