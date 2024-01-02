var Je = Object.defineProperty;
var ze = (e, r, t) => r in e ? Je(e, r, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[r] = t;
var m = (e, r, t) => (ze(e, typeof r != "symbol" ? r + "" : r, t), t);
var Ve = typeof global == "object" && global && global.Object === Object && global;
const Ee = Ve;
var Ge = typeof self == "object" && self && self.Object === Object && self, Ke = Ee || Ge || Function("return this")();
const $ = Ke;
var Ye = $.Symbol;
const W = Ye;
var Ae = Object.prototype, Xe = Ae.hasOwnProperty, Ze = Ae.toString, U = W ? W.toStringTag : void 0;
function Qe(e) {
  var r = Xe.call(e, U), t = e[U];
  try {
    e[U] = void 0;
    var n = !0;
  } catch {
  }
  var o = Ze.call(e);
  return n && (r ? e[U] = t : delete e[U]), o;
}
var et = Object.prototype, tt = et.toString;
function rt(e) {
  return tt.call(e);
}
var nt = "[object Null]", ot = "[object Undefined]", ie = W ? W.toStringTag : void 0;
function C(e) {
  return e == null ? e === void 0 ? ot : nt : ie && ie in Object(e) ? Qe(e) : rt(e);
}
function k(e) {
  return e != null && typeof e == "object";
}
var it = "[object Symbol]";
function st(e) {
  return typeof e == "symbol" || k(e) && C(e) == it;
}
var at = Array.isArray;
const Pe = at;
var ct = /\s/;
function ut(e) {
  for (var r = e.length; r-- && ct.test(e.charAt(r)); )
    ;
  return r;
}
var ft = /^\s+/;
function lt(e) {
  return e && e.slice(0, ut(e) + 1).replace(ft, "");
}
function O(e) {
  var r = typeof e;
  return e != null && (r == "object" || r == "function");
}
var se = 0 / 0, pt = /^[-+]0x[0-9a-f]+$/i, dt = /^0b[01]+$/i, gt = /^0o[0-7]+$/i, ht = parseInt;
function ae(e) {
  if (typeof e == "number")
    return e;
  if (st(e))
    return se;
  if (O(e)) {
    var r = typeof e.valueOf == "function" ? e.valueOf() : e;
    e = O(r) ? r + "" : r;
  }
  if (typeof e != "string")
    return e === 0 ? e : +e;
  e = lt(e);
  var t = dt.test(e);
  return t || gt.test(e) ? ht(e.slice(2), t ? 2 : 8) : pt.test(e) ? se : +e;
}
var mt = "[object AsyncFunction]", yt = "[object Function]", wt = "[object GeneratorFunction]", vt = "[object Proxy]";
function Se(e) {
  if (!O(e))
    return !1;
  var r = C(e);
  return r == yt || r == wt || r == mt || r == vt;
}
var bt = $["__core-js_shared__"];
const J = bt;
var ce = function() {
  var e = /[^.]+$/.exec(J && J.keys && J.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function Tt(e) {
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
var At = /[\\^$.*+?()[\]{}|]/g, Pt = /^\[object .+?Constructor\]$/, St = Function.prototype, _t = Object.prototype, $t = St.toString, Ot = _t.hasOwnProperty, xt = RegExp(
  "^" + $t.call(Ot).replace(At, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function Ct(e) {
  if (!O(e) || Tt(e))
    return !1;
  var r = Se(e) ? xt : Pt;
  return r.test(M(e));
}
function Mt(e, r) {
  return e == null ? void 0 : e[r];
}
function D(e, r) {
  var t = Mt(e, r);
  return Ct(t) ? t : void 0;
}
var Rt = D($, "WeakMap");
const G = Rt;
var It = 9007199254740991;
function _e(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= It;
}
function Ut(e) {
  return e != null && _e(e.length) && !Se(e);
}
var Lt = Object.prototype;
function $e(e) {
  var r = e && e.constructor, t = typeof r == "function" && r.prototype || Lt;
  return e === t;
}
var kt = "[object Arguments]";
function ue(e) {
  return k(e) && C(e) == kt;
}
var Oe = Object.prototype, Dt = Oe.hasOwnProperty, Nt = Oe.propertyIsEnumerable, Ft = ue(function() {
  return arguments;
}()) ? ue : function(e) {
  return k(e) && Dt.call(e, "callee") && !Nt.call(e, "callee");
};
const Wt = Ft;
function Bt() {
  return !1;
}
var xe = typeof exports == "object" && exports && !exports.nodeType && exports, fe = xe && typeof module == "object" && module && !module.nodeType && module, qt = fe && fe.exports === xe, le = qt ? $.Buffer : void 0, Ht = le ? le.isBuffer : void 0, Jt = Ht || Bt;
const zt = Jt;
var Vt = "[object Arguments]", Gt = "[object Array]", Kt = "[object Boolean]", Yt = "[object Date]", Xt = "[object Error]", Zt = "[object Function]", Qt = "[object Map]", er = "[object Number]", tr = "[object Object]", rr = "[object RegExp]", nr = "[object Set]", or = "[object String]", ir = "[object WeakMap]", sr = "[object ArrayBuffer]", ar = "[object DataView]", cr = "[object Float32Array]", ur = "[object Float64Array]", fr = "[object Int8Array]", lr = "[object Int16Array]", pr = "[object Int32Array]", dr = "[object Uint8Array]", gr = "[object Uint8ClampedArray]", hr = "[object Uint16Array]", mr = "[object Uint32Array]", T = {};
T[cr] = T[ur] = T[fr] = T[lr] = T[pr] = T[dr] = T[gr] = T[hr] = T[mr] = !0;
T[Vt] = T[Gt] = T[sr] = T[Kt] = T[ar] = T[Yt] = T[Xt] = T[Zt] = T[Qt] = T[er] = T[tr] = T[rr] = T[nr] = T[or] = T[ir] = !1;
function yr(e) {
  return k(e) && _e(e.length) && !!T[C(e)];
}
function wr(e) {
  return function(r) {
    return e(r);
  };
}
var Ce = typeof exports == "object" && exports && !exports.nodeType && exports, L = Ce && typeof module == "object" && module && !module.nodeType && module, vr = L && L.exports === Ce, z = vr && Ee.process, br = function() {
  try {
    var e = L && L.require && L.require("util").types;
    return e || z && z.binding && z.binding("util");
  } catch {
  }
}();
const pe = br;
var de = pe && pe.isTypedArray, Tr = de ? wr(de) : yr;
const jr = Tr;
function Er(e, r) {
  return function(t) {
    return e(r(t));
  };
}
var Ar = Er(Object.keys, Object);
const Pr = Ar;
var Sr = Object.prototype, _r = Sr.hasOwnProperty;
function $r(e) {
  if (!$e(e))
    return Pr(e);
  var r = [];
  for (var t in Object(e))
    _r.call(e, t) && t != "constructor" && r.push(t);
  return r;
}
var Or = D($, "Map");
const K = Or;
var xr = D($, "DataView");
const Y = xr;
var Cr = D($, "Promise");
const X = Cr;
var Mr = D($, "Set");
const Z = Mr;
var ge = "[object Map]", Rr = "[object Object]", he = "[object Promise]", me = "[object Set]", ye = "[object WeakMap]", we = "[object DataView]", Ir = M(Y), Ur = M(K), Lr = M(X), kr = M(Z), Dr = M(G), x = C;
(Y && x(new Y(new ArrayBuffer(1))) != we || K && x(new K()) != ge || X && x(X.resolve()) != he || Z && x(new Z()) != me || G && x(new G()) != ye) && (x = function(e) {
  var r = C(e), t = r == Rr ? e.constructor : void 0, n = t ? M(t) : "";
  if (n)
    switch (n) {
      case Ir:
        return we;
      case Ur:
        return ge;
      case Lr:
        return he;
      case kr:
        return me;
      case Dr:
        return ye;
    }
  return r;
});
const Nr = x;
var Fr = function() {
  return $.Date.now();
};
const V = Fr;
var Wr = "Expected a function", Br = Math.max, qr = Math.min;
function Me(e, r, t) {
  var n, o, f, c, u, a, i = 0, s = !1, l = !1, d = !0;
  if (typeof e != "function")
    throw new TypeError(Wr);
  r = ae(r) || 0, O(t) && (s = !!t.leading, l = "maxWait" in t, f = l ? Br(ae(t.maxWait) || 0, r) : f, d = "trailing" in t ? !!t.trailing : d);
  function g(h) {
    var P = n, S = o;
    return n = o = void 0, i = h, c = e.apply(S, P), c;
  }
  function y(h) {
    return i = h, u = setTimeout(w, r), s ? g(h) : c;
  }
  function j(h) {
    var P = h - a, S = h - i, R = r - P;
    return l ? qr(R, f - S) : R;
  }
  function p(h) {
    var P = h - a, S = h - i;
    return a === void 0 || P >= r || P < 0 || l && S >= f;
  }
  function w() {
    var h = V();
    if (p(h))
      return A(h);
    u = setTimeout(w, j(h));
  }
  function A(h) {
    return u = void 0, d && n ? g(h) : (n = o = void 0, c);
  }
  function v() {
    u !== void 0 && clearTimeout(u), i = 0, n = a = o = u = void 0;
  }
  function b() {
    return u === void 0 ? c : A(V());
  }
  function E() {
    var h = V(), P = p(h);
    if (n = arguments, o = this, a = h, P) {
      if (u === void 0)
        return y(a);
      if (l)
        return clearTimeout(u), u = setTimeout(w, r), g(a);
    }
    return u === void 0 && (u = setTimeout(w, r)), c;
  }
  return E.cancel = v, E.flush = b, E;
}
var Hr = "[object String]";
function ve(e) {
  return typeof e == "string" || !Pe(e) && k(e) && C(e) == Hr;
}
var Jr = "[object Map]", zr = "[object Set]", Vr = Object.prototype, Gr = Vr.hasOwnProperty;
function be(e) {
  if (e == null)
    return !0;
  if (Ut(e) && (Pe(e) || typeof e == "string" || typeof e.splice == "function" || zt(e) || jr(e) || Wt(e)))
    return !e.length;
  var r = Nr(e);
  if (r == Jr || r == zr)
    return !e.size;
  if ($e(e))
    return !$r(e).length;
  for (var t in e)
    if (Gr.call(e, t))
      return !1;
  return !0;
}
var Kr = "Expected a function";
function Yr(e, r, t) {
  var n = !0, o = !0;
  if (typeof e != "function")
    throw new TypeError(Kr);
  return O(t) && (n = "leading" in t ? !!t.leading : n, o = "trailing" in t ? !!t.trailing : o), Me(e, r, {
    leading: n,
    maxWait: r,
    trailing: o
  });
}
const F = (e) => typeof e == "function" ? e() : e;
function q(e) {
  return !(e && (typeof e != "object" || (Array.isArray(e) ? e.length : Object.keys(e).length)));
}
function Xr(e) {
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
function Zr(e, r) {
  r === void 0 && (r = {});
  for (var t = Xr(e), n = r.prefixes, o = n === void 0 ? "./" : n, f = "[^".concat(I(r.delimiter || "/#?"), "]+?"), c = [], u = 0, a = 0, i = "", s = function(h) {
    if (a < t.length && t[a].type === h)
      return t[a++].value;
  }, l = function(h) {
    var P = s(h);
    if (P !== void 0)
      return P;
    var S = t[a], R = S.type, H = S.index;
    throw new TypeError("Unexpected ".concat(R, " at ").concat(H, ", expected ").concat(h));
  }, d = function() {
    for (var h = "", P; P = s("CHAR") || s("ESCAPED_CHAR"); )
      h += P;
    return h;
  }; a < t.length; ) {
    var g = s("CHAR"), y = s("NAME"), j = s("PATTERN");
    if (y || j) {
      var p = g || "";
      o.indexOf(p) === -1 && (i += p, p = ""), i && (c.push(i), i = ""), c.push({
        name: y || u++,
        prefix: p,
        suffix: "",
        pattern: j || f,
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
      var p = d(), v = s("NAME") || "", b = s("PATTERN") || "", E = d();
      l("CLOSE"), c.push({
        name: v || (b ? u++ : ""),
        pattern: v && !b ? f : b,
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
function Re(e) {
  return e && e.sensitive ? "" : "i";
}
function Qr(e, r) {
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
function en(e, r, t) {
  var n = e.map(function(o) {
    return Ie(o, r, t).source;
  });
  return new RegExp("(?:".concat(n.join("|"), ")"), Re(t));
}
function tn(e, r, t) {
  return rn(Zr(e, t), r, t);
}
function rn(e, r, t) {
  t === void 0 && (t = {});
  for (var n = t.strict, o = n === void 0 ? !1 : n, f = t.start, c = f === void 0 ? !0 : f, u = t.end, a = u === void 0 ? !0 : u, i = t.encode, s = i === void 0 ? function(H) {
    return H;
  } : i, l = t.delimiter, d = l === void 0 ? "/#?" : l, g = t.endsWith, y = g === void 0 ? "" : g, j = "[".concat(I(y), "]|$"), p = "[".concat(I(d), "]"), w = c ? "^" : "", A = 0, v = e; A < v.length; A++) {
    var b = v[A];
    if (typeof b == "string")
      w += I(s(b));
    else {
      var E = I(s(b.prefix)), h = I(s(b.suffix));
      if (b.pattern)
        if (r && r.push(b), E || h)
          if (b.modifier === "+" || b.modifier === "*") {
            var P = b.modifier === "*" ? "?" : "";
            w += "(?:".concat(E, "((?:").concat(b.pattern, ")(?:").concat(h).concat(E, "(?:").concat(b.pattern, "))*)").concat(h, ")").concat(P);
          } else
            w += "(?:".concat(E, "(").concat(b.pattern, ")").concat(h, ")").concat(b.modifier);
        else
          b.modifier === "+" || b.modifier === "*" ? w += "((?:".concat(b.pattern, ")").concat(b.modifier, ")") : w += "(".concat(b.pattern, ")").concat(b.modifier);
      else
        w += "(?:".concat(E).concat(h, ")").concat(b.modifier);
    }
  }
  if (a)
    o || (w += "".concat(p, "?")), w += t.endsWith ? "(?=".concat(j, ")") : "$";
  else {
    var S = e[e.length - 1], R = typeof S == "string" ? p.indexOf(S[S.length - 1]) > -1 : S === void 0;
    o || (w += "(?:".concat(p, "(?=").concat(j, "))?")), R || (w += "(?=".concat(p, "|").concat(j, ")"));
  }
  return new RegExp(w, Re(t));
}
function Ie(e, r, t) {
  return e instanceof RegExp ? Qr(e, r) : Array.isArray(e) ? en(e, r, t) : tn(e, r, t);
}
const Ue = "_$mockHttp", Le = typeof window < "u", ke = Le ? window.top || window : {}, De = () => ke[Ue] || {
  isMock: !1,
  mockData: []
}, re = (e) => {
  const r = De();
  ke[Ue] = Object.assign(r, e);
}, nn = (e) => {
  re({ mockData: e });
}, on = () => {
  re({ isMock: !0 });
}, sn = () => {
  re({ isMock: !0 });
};
if (Le) {
  const e = window.fetch;
  window.fetch = async function(...r) {
    var n;
    const t = De();
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
        return Ie(i.pathname).test(c.pathname);
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
var Ne = /* @__PURE__ */ ((e) => (e.Json = "application/json;charset=UTF-8", e.FormURLEncoded = "application/x-www-form-urlencoded;charset=UTF-8", e.FormData = "multipart/form-data;charset=UTF-8", e))(Ne || {});
class an {
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
class Q {
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
    if (q(t))
      return "";
    const n = ~r.indexOf("?") ? "&" : "?";
    return typeof t == "object" ? n + Object.entries(t).map(
      (o) => encodeURIComponent(o[0]) + "=" + encodeURIComponent(o[1] === void 0 || o[1] === null ? "" : o[1])
    ).join("&") : t !== "" ? n + F(t) : "";
  }
}
class cn {
  constructor(r) {
    m(this, "middlewares");
    m(this, "options");
    m(this, "pendingMap");
    m(this, "cacheMap");
    m(this, "setMockData", nn);
    m(this, "openMock", on);
    m(this, "closeMock", sn);
    this.middlewares = [], this.pendingMap = /* @__PURE__ */ new Map(), this.cacheMap = /* @__PURE__ */ new Map(), r instanceof Q ? this.options = r : this.options = new Q(r);
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
    const c = new an();
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
          }, 300);
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
    if (!q(t == null ? void 0 : t.body) && O(t.body)) {
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
      Yr(() => o(this.createRequest(r, t, n)), t.throttle);
    }) : t.debounce ? new Promise((o) => {
      Me(() => o(this.createRequest(r, t, n)), t.debounce);
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
class un {
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
function fn(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Fe = { exports: {} };
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
    var j = t ? t + i : i;
    if (!this._events[j])
      return !1;
    var p = this._events[j], w = arguments.length, A, v;
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
      var b = p.length, E;
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
              for (E = 1, A = new Array(w - 1); E < w; E++)
                A[E - 1] = arguments[E];
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
      for (var j = 0, p = [], w = y.length; j < w; j++)
        (y[j].fn !== s || d && !y[j].once || l && y[j].context !== l) && p.push(y[j]);
      p.length ? this._events[g] = p.length === 1 ? p[0] : p : c(this, g);
    }
    return this;
  }, u.prototype.removeAllListeners = function(i) {
    var s;
    return i ? (s = t ? t + i : i, this._events[s] && c(this, s)) : (this._events = new n(), this._eventsCount = 0), this;
  }, u.prototype.off = u.prototype.removeListener, u.prototype.addListener = u.prototype.on, u.prefixed = t, u.EventEmitter = u, e.exports = u;
})(Fe);
var ln = Fe.exports;
const pn = /* @__PURE__ */ fn(ln);
class dn extends pn {
}
const ee = "_ipc";
class gn {
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
    if (this.emitter = new dn(), r) {
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
        const n = this.contentWindow[ee];
        if (n) {
          n.send(r, t);
          return;
        }
      }
      this.emitter.emit(r, t);
    }
  }
}
class ne {
  constructor() {
    /**
     * 目标监听器清单
     */
    m(this, "targets");
    m(this, "sendingEvents", /* @__PURE__ */ new Set());
    this.targets = new un();
  }
  static init() {
    const r = new ne();
    if (typeof window < "u") {
      const t = window[ee];
      if (t)
        return t;
      window[ee] = r;
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
    this.targets.add(r, new gn(t));
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
var We = /* @__PURE__ */ ((e) => (e.Mobile = "APP", e.Desktop = "WEB", e.NODE_JS = "NodeJs", e))(We || {});
const _ = {
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
    isEmpty: q
  }
};
class te extends Error {
  constructor(t, n, o, f = "") {
    var c;
    super();
    m(this, "code", -1);
    m(this, "status", "");
    m(this, "type", "");
    m(this, "description", "");
    this.message = t, this.name = "CustomError", this.code = n, this.status = o, this.type = "error", this.description = f, (c = _.ipc.targets.get("_self")) == null || c.send("custom_error", this);
  }
}
class hn extends te {
  constructor(r, t, n, o = "") {
    super(r, t, n, o), this.name = "OperationError";
  }
}
const Be = typeof window < "u", mn = Be ? null : require("node:path"), yn = Be ? null : require("node:fs");
function On() {
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
      }, r = mn.resolve(process.cwd(), "public", "version.json");
      yn.writeFileSync(r, JSON.stringify(e));
    }
  };
}
let B = "";
const Te = 2;
let N = 0;
const wn = function() {
  N++, N >= Te && (console.error(`获取资源超过错误次数阈值[${Te}]，触发版本检查！`), N = -9999, bn()), setTimeout(() => {
    N = 0;
  }, 1500);
}, vn = () => {
  if (typeof window < "u") {
    if (window._version)
      return;
    fetch("/version.json?_t=" + (/* @__PURE__ */ new Date()).getTime()).then((r) => r.json()).then((r) => {
      B = r.version, window._version = B;
    }), window.addEventListener(
      "error",
      function(r) {
        const t = r.target;
        (t.tagName === "SCRIPT" || t.tagName === "LINK" || t.tagName === "IMG") && wn();
      },
      !0
    );
  }
}, bn = () => {
  typeof window < "u" && window._version && fetch("/version.json?_t=" + (/* @__PURE__ */ new Date()).getTime()).then((e) => e.json()).then((e) => {
    if (B && B !== e.version)
      throw new hn(
        `[${e.version}] 有新的内容更新，请在保存页面数据后，刷新页面重新载入！`,
        404,
        404
      );
  });
}, qe = typeof window < "u", je = qe ? null : require("node:path"), Tn = qe ? null : require("swagger-typescript-api");
function xn(e) {
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
        await Tn.generateApi({
          name: t,
          url: `${e.baseUrl}${n}/v3/api-docs`,
          output: je.resolve(process.cwd(), (e == null ? void 0 : e.output) || "./src/api"),
          templates: je.resolve(process.cwd(), (e == null ? void 0 : e.templates) || "./plugins/swagger-templates"),
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
const jn = "YYYY-MM-DD HH:mm:ss";
function He(e) {
  for (const r in e) {
    if (e[r] && e[r]._isAMomentObject && (e[r] = e[r].format(jn)), ve(r)) {
      const t = e[r];
      if (t)
        try {
          e[r] = ve(t) ? t.trim() : t;
        } catch (n) {
          throw new Error(n);
        }
    }
    O(e[r]) && He(e[r]);
  }
}
const En = async (e, r) => {
  const t = e.requestOptions.body;
  t && Object.prototype.toString.call(t) === "[object Object]" && He(t), await r();
}, An = async (e, r) => {
  var f, c, u;
  const t = e.requestOptions, n = t.body;
  if (!(n instanceof FormData) && !(n instanceof URLSearchParams)) {
    let a = !0;
    const i = t.headers, s = q(i) ? null : i == null ? void 0 : i["Content-Type"];
    s ? a = s.startsWith("application/json") : i["Content-Type"] = Ne.Json, a && typeof n == "object" && (t.body = JSON.stringify(n));
  }
  if (await r(), e.result)
    return;
  const o = ((f = e.response) == null ? void 0 : f.headers.get("Content-Type")) || "";
  (c = e.response) != null && c.ok && (o != null && o.startsWith("application/json")) && (e.result = await ((u = e.response) == null ? void 0 : u.json()));
}, Pn = async (e, r) => {
  var f, c, u, a;
  const n = e.requestOptions.headers, o = _.getToken();
  if (o && be(n.Authorization) && (n.Authorization = `Bearer ${o}`), o && be(n.Authorization) && (n.Authorization = `Bearer ${o}`), n.eid = _.getEnterpriseId(), n.oid = _.getOrgId(), n["Accept-Language"] = _.getLanguage(), n["X-TZ-Offset"] = (/* @__PURE__ */ new Date()).getTimezoneOffset().toString(), await r(), !((f = e.response) != null && f.ok)) {
    const i = new Error("An error occurred while fetching the data.");
    throw i.message = `${(c = e.response) == null ? void 0 : c.status}|${await ((u = e.response) == null ? void 0 : u.text()) || ""}`, i;
  }
  if (((a = e.response) == null ? void 0 : a.status) !== 200)
    throw new te(JSON.stringify(e.result), 500, e.response.status);
  if (!e.requestOptions.returnNativeResponse) {
    const i = e.result;
    if (i.code === 0 || i.code === 200)
      e.result = i.data;
    else if (i.message)
      throw new te(i.message, i.code, e.response.status, JSON.stringify(i));
  }
}, Sn = async (e, r) => {
  if (e.url.lastIndexOf("_t=") <= 0) {
    const t = (/* @__PURE__ */ new Date()).getTime();
    e.url += `${e.url.indexOf("?") > 0 ? "&" : "?"}_t=${t}`;
  }
  await r();
}, oe = new Q();
oe.baseURL = () => {
  switch (_.platform) {
    case We.Mobile:
      return window.APP.getURL();
    default:
      return _.config.baseUrl || location.origin;
  }
};
oe.middlewares = () => [Pn, An, En, Sn];
const _n = new cn(oe);
typeof window < "u" && (_.ipc = ne.init(), _.ipc.addTarget("_self", window), window.http = _n, window.fw = _, vn());
export {
  te as CustomError,
  un as Dictionary,
  ne as EventBus,
  cn as Http,
  On as autoCheckUpdates,
  xn as swaggerApiGen
};
