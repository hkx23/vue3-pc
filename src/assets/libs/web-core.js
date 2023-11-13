var St = Object.defineProperty;
var _t = (t, e, r) => e in t ? St(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r;
var y = (t, e, r) => (_t(t, typeof e != "symbol" ? e + "" : e, r), r);
var xt = typeof global == "object" && global && global.Object === Object && global;
const ht = xt;
var Ct = typeof self == "object" && self && self.Object === Object && self, kt = ht || Ct || Function("return this")();
const $ = kt;
var Ut = $.Symbol;
const M = Ut;
var dt = Object.prototype, Rt = dt.hasOwnProperty, It = dt.toString, C = M ? M.toStringTag : void 0;
function Lt(t) {
  var e = Rt.call(t, C), r = t[C];
  try {
    t[C] = void 0;
    var n = !0;
  } catch {
  }
  var o = It.call(t);
  return n && (e ? t[C] = r : delete t[C]), o;
}
var Mt = Object.prototype, Wt = Mt.toString;
function Ft(t) {
  return Wt.call(t);
}
var Dt = "[object Null]", Bt = "[object Undefined]", Q = M ? M.toStringTag : void 0;
function S(t) {
  return t == null ? t === void 0 ? Bt : Dt : Q && Q in Object(t) ? Lt(t) : Ft(t);
}
function R(t) {
  return t != null && typeof t == "object";
}
var qt = "[object Symbol]";
function Vt(t) {
  return typeof t == "symbol" || R(t) && S(t) == qt;
}
var zt = Array.isArray;
const yt = zt;
var Ht = /\s/;
function Jt(t) {
  for (var e = t.length; e-- && Ht.test(t.charAt(e)); )
    ;
  return e;
}
var Gt = /^\s+/;
function Nt(t) {
  return t && t.slice(0, Jt(t) + 1).replace(Gt, "");
}
function P(t) {
  var e = typeof t;
  return t != null && (e == "object" || e == "function");
}
var Z = 0 / 0, Kt = /^[-+]0x[0-9a-f]+$/i, Yt = /^0b[01]+$/i, Xt = /^0o[0-7]+$/i, Qt = parseInt;
function tt(t) {
  if (typeof t == "number")
    return t;
  if (Vt(t))
    return Z;
  if (P(t)) {
    var e = typeof t.valueOf == "function" ? t.valueOf() : t;
    t = P(e) ? e + "" : e;
  }
  if (typeof t != "string")
    return t === 0 ? t : +t;
  t = Nt(t);
  var r = Yt.test(t);
  return r || Xt.test(t) ? Qt(t.slice(2), r ? 2 : 8) : Kt.test(t) ? Z : +t;
}
var Zt = "[object AsyncFunction]", te = "[object Function]", ee = "[object GeneratorFunction]", re = "[object Proxy]";
function mt(t) {
  if (!P(t))
    return !1;
  var e = S(t);
  return e == te || e == ee || e == Zt || e == re;
}
var ne = $["__core-js_shared__"];
const D = ne;
var et = function() {
  var t = /[^.]+$/.exec(D && D.keys && D.keys.IE_PROTO || "");
  return t ? "Symbol(src)_1." + t : "";
}();
function oe(t) {
  return !!et && et in t;
}
var ie = Function.prototype, se = ie.toString;
function _(t) {
  if (t != null) {
    try {
      return se.call(t);
    } catch {
    }
    try {
      return t + "";
    } catch {
    }
  }
  return "";
}
var ae = /[\\^$.*+?()[\]{}|]/g, ce = /^\[object .+?Constructor\]$/, ue = Function.prototype, fe = Object.prototype, le = ue.toString, pe = fe.hasOwnProperty, ge = RegExp(
  "^" + le.call(pe).replace(ae, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function he(t) {
  if (!P(t) || oe(t))
    return !1;
  var e = mt(t) ? ge : ce;
  return e.test(_(t));
}
function de(t, e) {
  return t == null ? void 0 : t[e];
}
function I(t, e) {
  var r = de(t, e);
  return he(r) ? r : void 0;
}
var ye = I($, "WeakMap");
const V = ye;
var me = 9007199254740991;
function bt(t) {
  return typeof t == "number" && t > -1 && t % 1 == 0 && t <= me;
}
function be(t) {
  return t != null && bt(t.length) && !mt(t);
}
var we = Object.prototype;
function wt(t) {
  var e = t && t.constructor, r = typeof e == "function" && e.prototype || we;
  return t === r;
}
var ve = "[object Arguments]";
function rt(t) {
  return R(t) && S(t) == ve;
}
var vt = Object.prototype, Te = vt.hasOwnProperty, je = vt.propertyIsEnumerable, Ae = rt(function() {
  return arguments;
}()) ? rt : function(t) {
  return R(t) && Te.call(t, "callee") && !je.call(t, "callee");
};
const $e = Ae;
function Oe() {
  return !1;
}
var Tt = typeof exports == "object" && exports && !exports.nodeType && exports, nt = Tt && typeof module == "object" && module && !module.nodeType && module, Ee = nt && nt.exports === Tt, ot = Ee ? $.Buffer : void 0, Pe = ot ? ot.isBuffer : void 0, Se = Pe || Oe;
const _e = Se;
var xe = "[object Arguments]", Ce = "[object Array]", ke = "[object Boolean]", Ue = "[object Date]", Re = "[object Error]", Ie = "[object Function]", Le = "[object Map]", Me = "[object Number]", We = "[object Object]", Fe = "[object RegExp]", De = "[object Set]", Be = "[object String]", qe = "[object WeakMap]", Ve = "[object ArrayBuffer]", ze = "[object DataView]", He = "[object Float32Array]", Je = "[object Float64Array]", Ge = "[object Int8Array]", Ne = "[object Int16Array]", Ke = "[object Int32Array]", Ye = "[object Uint8Array]", Xe = "[object Uint8ClampedArray]", Qe = "[object Uint16Array]", Ze = "[object Uint32Array]", g = {};
g[He] = g[Je] = g[Ge] = g[Ne] = g[Ke] = g[Ye] = g[Xe] = g[Qe] = g[Ze] = !0;
g[xe] = g[Ce] = g[Ve] = g[ke] = g[ze] = g[Ue] = g[Re] = g[Ie] = g[Le] = g[Me] = g[We] = g[Fe] = g[De] = g[Be] = g[qe] = !1;
function tr(t) {
  return R(t) && bt(t.length) && !!g[S(t)];
}
function er(t) {
  return function(e) {
    return t(e);
  };
}
var jt = typeof exports == "object" && exports && !exports.nodeType && exports, k = jt && typeof module == "object" && module && !module.nodeType && module, rr = k && k.exports === jt, B = rr && ht.process, nr = function() {
  try {
    var t = k && k.require && k.require("util").types;
    return t || B && B.binding && B.binding("util");
  } catch {
  }
}();
const it = nr;
var st = it && it.isTypedArray, or = st ? er(st) : tr;
const ir = or;
function sr(t, e) {
  return function(r) {
    return t(e(r));
  };
}
var ar = sr(Object.keys, Object);
const cr = ar;
var ur = Object.prototype, fr = ur.hasOwnProperty;
function lr(t) {
  if (!wt(t))
    return cr(t);
  var e = [];
  for (var r in Object(t))
    fr.call(t, r) && r != "constructor" && e.push(r);
  return e;
}
var pr = I($, "Map");
const z = pr;
var gr = I($, "DataView");
const H = gr;
var hr = I($, "Promise");
const J = hr;
var dr = I($, "Set");
const G = dr;
var at = "[object Map]", yr = "[object Object]", ct = "[object Promise]", ut = "[object Set]", ft = "[object WeakMap]", lt = "[object DataView]", mr = _(H), br = _(z), wr = _(J), vr = _(G), Tr = _(V), E = S;
(H && E(new H(new ArrayBuffer(1))) != lt || z && E(new z()) != at || J && E(J.resolve()) != ct || G && E(new G()) != ut || V && E(new V()) != ft) && (E = function(t) {
  var e = S(t), r = e == yr ? t.constructor : void 0, n = r ? _(r) : "";
  if (n)
    switch (n) {
      case mr:
        return lt;
      case br:
        return at;
      case wr:
        return ct;
      case vr:
        return ut;
      case Tr:
        return ft;
    }
  return e;
});
const jr = E;
var Ar = function() {
  return $.Date.now();
};
const q = Ar;
var $r = "Expected a function", Or = Math.max, Er = Math.min;
function At(t, e, r) {
  var n, o, p, u, f, a, i = 0, s = !1, l = !1, w = !0;
  if (typeof t != "function")
    throw new TypeError($r);
  e = tt(e) || 0, P(r) && (s = !!r.leading, l = "maxWait" in r, p = l ? Or(tt(r.maxWait) || 0, e) : p, w = "trailing" in r ? !!r.trailing : w);
  function m(b) {
    var O = n, x = o;
    return n = o = void 0, i = b, u = t.apply(x, O), u;
  }
  function h(b) {
    return i = b, f = setTimeout(v, e), s ? m(b) : u;
  }
  function T(b) {
    var O = b - a, x = b - i, X = e - O;
    return l ? Er(X, p - x) : X;
  }
  function c(b) {
    var O = b - a, x = b - i;
    return a === void 0 || O >= e || O < 0 || l && x >= p;
  }
  function v() {
    var b = q();
    if (c(b))
      return j(b);
    f = setTimeout(v, T(b));
  }
  function j(b) {
    return f = void 0, w && n ? m(b) : (n = o = void 0, u);
  }
  function d() {
    f !== void 0 && clearTimeout(f), i = 0, n = a = o = f = void 0;
  }
  function F() {
    return f === void 0 ? u : j(q());
  }
  function A() {
    var b = q(), O = c(b);
    if (n = arguments, o = this, a = b, O) {
      if (f === void 0)
        return h(a);
      if (l)
        return clearTimeout(f), f = setTimeout(v, e), m(a);
    }
    return f === void 0 && (f = setTimeout(v, e)), u;
  }
  return A.cancel = d, A.flush = F, A;
}
var Pr = "[object String]";
function pt(t) {
  return typeof t == "string" || !yt(t) && R(t) && S(t) == Pr;
}
var Sr = "[object Map]", _r = "[object Set]", xr = Object.prototype, Cr = xr.hasOwnProperty;
function kr(t) {
  if (t == null)
    return !0;
  if (be(t) && (yt(t) || typeof t == "string" || typeof t.splice == "function" || _e(t) || ir(t) || $e(t)))
    return !t.length;
  var e = jr(t);
  if (e == Sr || e == _r)
    return !t.size;
  if (wt(t))
    return !lr(t).length;
  for (var r in t)
    if (Cr.call(t, r))
      return !1;
  return !0;
}
var Ur = "Expected a function";
function Rr(t, e, r) {
  var n = !0, o = !0;
  if (typeof t != "function")
    throw new TypeError(Ur);
  return P(r) && (n = "leading" in r ? !!r.leading : n, o = "trailing" in r ? !!r.trailing : o), At(t, e, {
    leading: n,
    maxWait: e,
    trailing: o
  });
}
const L = (t) => typeof t == "function" ? t() : t;
function K(t) {
  return !(t && (typeof t != "object" || (Array.isArray(t) ? t.length : Object.keys(t).length)));
}
var $t = /* @__PURE__ */ ((t) => (t.Json = "application/json;charset=UTF-8", t.FormURLEncoded = "application/x-www-form-urlencoded;charset=UTF-8", t.FormData = "multipart/form-data;charset=UTF-8", t))($t || {});
class Ir {
  constructor() {
    /**
     * 服务基础路径
     */
    y(this, "baseURL", "");
    /**
     * 请求路径
     */
    y(this, "path", "");
    /**
     * 请求全路径
     */
    y(this, "url", "");
    /**
     * 请求结果
     */
    y(this, "result", null);
    /**
     * 请求参数
     */
    y(this, "requestOptions", {});
    /**
     * 请求信息
     */
    y(this, "request");
    /**
     * 请求返回信息
     */
    y(this, "response");
  }
}
class N {
  constructor(e) {
    /**
     * 服务基础路径
     */
    y(this, "baseURL");
    /**
     * 指定请求超时的毫秒数（默认永不超时，Chrome中网络请求超时为300秒，Firefox中为90秒）
     */
    y(this, "timeout");
    /**
     * 服务中间件
     */
    y(this, "middlewares");
    this.baseURL = e || "", this.middlewares = [];
  }
  normalizeUrl(e) {
    return e.toString().replace(/(^\/+|\/+$)/g, "");
  }
  normalizeUrlParams(e, r) {
    if (K(r))
      return "";
    const n = ~e.indexOf("?") ? "&" : "?";
    return typeof r == "object" ? n + Object.entries(r).map((o) => encodeURIComponent(o[0]) + "=" + encodeURIComponent(o[1] || "")).join("&") : r !== "" ? n + L(r) : "";
  }
}
class Lr {
  constructor(e) {
    y(this, "middlewares");
    y(this, "options");
    this.middlewares = [], e instanceof N ? this.options = e : this.options = new N(e);
  }
  /**
   * 新增中间件
   * @param middleware 中间件
   */
  use(e) {
    return this.middlewares.push(e), this;
  }
  getUrl(e, r, n = "") {
    let o = e ? new URL(r, new URL(e, window.location.href).toString()).toString() : r;
    return n && (o += this.options.normalizeUrlParams(o, n)), o;
  }
  createContext(e, r = {}) {
    const n = this.options, o = L(n.baseURL);
    let p = L(e);
    p = n.normalizeUrl(encodeURI(p));
    const u = new Ir();
    return u.baseURL = o, u.path = p, u.url = this.getUrl(o, p, r.params), u.requestOptions = {
      headers: {},
      timeout: n.timeout,
      ...r
    }, u;
  }
  createRequest(e, r = {}, n = []) {
    const o = this.createContext(e, r), p = this.options;
    let u = [];
    typeof p.middlewares == "function" && (u = u.concat(L(p.middlewares))), u = u.concat(this.middlewares), n && (typeof n == "function" ? u.push(n) : n instanceof Array && n.length > 0 && (u = u.concat(n)));
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
  request(e, r = {}, n = []) {
    if (r.throttle !== void 0 && r.debounce !== void 0)
      throw new Error("throttle and debounce cannot be set at the same time");
    return r.throttle ? new Promise((o) => {
      Rr(() => o(this.createRequest(e, r, n)), r.throttle);
    }) : r.debounce ? new Promise((o) => {
      At(() => o(this.createRequest(e, r, n)), r.debounce);
    }) : this.createRequest(e, r, n);
  }
  get(e, r, n = {}, o = []) {
    return n.method = "GET", n.params = r, this.request(e, n, o);
  }
  post(e, r, n = {}, o = []) {
    return n.method = "POST", n.body = r, this.request(e, n, o);
  }
  // get(
  //   url: HttpPath,
  //   options: RequestOptions = {},
  //   middleware: HttpMiddleware | HttpMiddleware[] = []
  // ) {
  //   options.method = "GET";
  //   return this.request(url, options, middleware);
  // }
  // post(
  //   url: HttpPath,
  //   options: RequestOptions = {},
  //   middleware: HttpMiddleware | HttpMiddleware[] = []
  // ) {
  //   options.method = "POST";
  //   return this.request(url, options, middleware);
  // }
  patch(e, r = {}, n = []) {
    return r.method = "PATCH", this.request(e, r, n);
  }
  put(e, r = {}, n = []) {
    return r.method = "PUT", this.request(e, r, n);
  }
  del(e, r = {}, n = []) {
    return r.method = "DELETE", this.request(e, r, n);
  }
  upload(e, r, n = {}, o = []) {
    return n.method = "POST", n.body = r, n.headers = {
      "Content-Type": "multipart/form-data;charset=UTF-8"
      /* FormData */
    }, this.request(e, n, o);
  }
}
class Mr {
  constructor() {
    y(this, "items");
    this.items = {};
  }
  /**
   * 查找字典中的元素
   * @param key 关键字
   */
  has(e) {
    return this.items.hasOwnProperty(e);
  }
  /**
   * 向字典添加一个元素
   * @param key 关键字
   * @param val 值
   */
  add(e, r) {
    this.items[e] = r;
  }
  /**
   * 通过关键字删除字典项，返回是否删除成功
   * @param key 关键字
   */
  remove(e) {
    return this.has(e) ? (delete this.items[e], !0) : !1;
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
  get(e) {
    return this.has(e) ? this.items[e] : void 0;
  }
  /**
   * 返回一个包含所有value数组
   */
  values() {
    const e = [];
    for (const r in this.items)
      this.has(r) && e.push(this.items[r]);
    return e;
  }
  /**
   * 循环字典子元素
   * @param func 入参为key和value
   */
  map(e) {
    for (const r in this.items)
      if (this.has(r)) {
        const n = this.items[r];
        e(r, n);
      }
  }
  /**
   * 查看字典中元素的个数
   */
  count() {
    let e = 0;
    for (const r in this.items)
      this.has(r) && e++;
    return e;
  }
}
function Wr(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var Ot = { exports: {} };
(function(t) {
  var e = Object.prototype.hasOwnProperty, r = "~";
  function n() {
  }
  Object.create && (n.prototype = /* @__PURE__ */ Object.create(null), new n().__proto__ || (r = !1));
  function o(a, i, s) {
    this.fn = a, this.context = i, this.once = s || !1;
  }
  function p(a, i, s, l, w) {
    if (typeof s != "function")
      throw new TypeError("The listener must be a function");
    var m = new o(s, l || a, w), h = r ? r + i : i;
    return a._events[h] ? a._events[h].fn ? a._events[h] = [a._events[h], m] : a._events[h].push(m) : (a._events[h] = m, a._eventsCount++), a;
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
      e.call(s, l) && i.push(r ? l.slice(1) : l);
    return Object.getOwnPropertySymbols ? i.concat(Object.getOwnPropertySymbols(s)) : i;
  }, f.prototype.listeners = function(i) {
    var s = r ? r + i : i, l = this._events[s];
    if (!l)
      return [];
    if (l.fn)
      return [l.fn];
    for (var w = 0, m = l.length, h = new Array(m); w < m; w++)
      h[w] = l[w].fn;
    return h;
  }, f.prototype.listenerCount = function(i) {
    var s = r ? r + i : i, l = this._events[s];
    return l ? l.fn ? 1 : l.length : 0;
  }, f.prototype.emit = function(i, s, l, w, m, h) {
    var T = r ? r + i : i;
    if (!this._events[T])
      return !1;
    var c = this._events[T], v = arguments.length, j, d;
    if (c.fn) {
      switch (c.once && this.removeListener(i, c.fn, void 0, !0), v) {
        case 1:
          return c.fn.call(c.context), !0;
        case 2:
          return c.fn.call(c.context, s), !0;
        case 3:
          return c.fn.call(c.context, s, l), !0;
        case 4:
          return c.fn.call(c.context, s, l, w), !0;
        case 5:
          return c.fn.call(c.context, s, l, w, m), !0;
        case 6:
          return c.fn.call(c.context, s, l, w, m, h), !0;
      }
      for (d = 1, j = new Array(v - 1); d < v; d++)
        j[d - 1] = arguments[d];
      c.fn.apply(c.context, j);
    } else {
      var F = c.length, A;
      for (d = 0; d < F; d++)
        switch (c[d].once && this.removeListener(i, c[d].fn, void 0, !0), v) {
          case 1:
            c[d].fn.call(c[d].context);
            break;
          case 2:
            c[d].fn.call(c[d].context, s);
            break;
          case 3:
            c[d].fn.call(c[d].context, s, l);
            break;
          case 4:
            c[d].fn.call(c[d].context, s, l, w);
            break;
          default:
            if (!j)
              for (A = 1, j = new Array(v - 1); A < v; A++)
                j[A - 1] = arguments[A];
            c[d].fn.apply(c[d].context, j);
        }
    }
    return !0;
  }, f.prototype.on = function(i, s, l) {
    return p(this, i, s, l, !1);
  }, f.prototype.once = function(i, s, l) {
    return p(this, i, s, l, !0);
  }, f.prototype.removeListener = function(i, s, l, w) {
    var m = r ? r + i : i;
    if (!this._events[m])
      return this;
    if (!s)
      return u(this, m), this;
    var h = this._events[m];
    if (h.fn)
      h.fn === s && (!w || h.once) && (!l || h.context === l) && u(this, m);
    else {
      for (var T = 0, c = [], v = h.length; T < v; T++)
        (h[T].fn !== s || w && !h[T].once || l && h[T].context !== l) && c.push(h[T]);
      c.length ? this._events[m] = c.length === 1 ? c[0] : c : u(this, m);
    }
    return this;
  }, f.prototype.removeAllListeners = function(i) {
    var s;
    return i ? (s = r ? r + i : i, this._events[s] && u(this, s)) : (this._events = new n(), this._eventsCount = 0), this;
  }, f.prototype.off = f.prototype.removeListener, f.prototype.addListener = f.prototype.on, f.prefixed = r, f.EventEmitter = f, t.exports = f;
})(Ot);
var Fr = Ot.exports;
const Dr = /* @__PURE__ */ Wr(Fr);
class Br extends Dr {
}
class qr {
  constructor(e = null) {
    /**
     * 事件触发器
     */
    y(this, "emitter");
    /**
     * iframe窗口对象
     */
    y(this, "contentWindow", null);
    /**
     * 是否跨域
     */
    y(this, "isCrossOrigin", !1);
    if (this.emitter = new Br(), e) {
      try {
        e.document;
      } catch {
        this.isCrossOrigin = !0;
      }
      this.contentWindow = e;
    }
  }
  /**
   * 执行监听器
   * @param event 事件名
   * @param args 参数
   */
  send(e, r) {
    if (this.isCrossOrigin && this.contentWindow)
      this.contentWindow.postMessage(
        {
          event: e,
          args: r
        },
        "*"
      );
    else {
      if (this.contentWindow) {
        const n = this.contentWindow.ipc_;
        if (n) {
          n.send(e, r);
          return;
        }
      }
      this.emitter.emit(e, r);
    }
  }
}
class W {
  constructor() {
    /**
     * 目标监听器清单
     */
    y(this, "targets");
    this.targets = new Mr();
  }
  static init() {
    const e = new W();
    if (window) {
      const r = window.ipc_;
      if (r)
        return r;
      window.ipc_ = e;
    }
    return e;
  }
  /**
   * 添加目标监听器
   * @param key 目标名称
   */
  addTarget(e, r = null) {
    const n = this.targets.items[e];
    if (n) {
      n.contentWindow = r;
      return;
    }
    this.targets.add(e, new qr(r));
  }
  /**
   * 删除目标监听器
   * @param key 目标名称
   */
  removeTarget(e) {
    this.targets.remove(e);
  }
  remove(e, r, n) {
    var o;
    return typeof r == "function" && (n = r, r = "*"), r && n ? (o = this.targets.get(r)) == null || o.emitter.removeListener(e, n) : this.targets.map((p, u) => {
      u.emitter.removeAllListeners(e);
    }), this;
  }
  on(e, r, n) {
    var o;
    return typeof r == "function" && (n = r, r = "*"), n && (this.addTarget(r), (o = this.targets.get(r)) == null || o.emitter.on(e, n)), this;
  }
  once(e, r, n) {
    var o;
    return typeof r == "function" && (n = r, r = "*"), n && (this.addTarget(r), (o = this.targets.get(r)) == null || o.emitter.once(e, n)), this;
  }
  /**
   * 执行所有监听器
   * @param event 事件名
   * @param args 参数
   */
  send(e, r) {
    this.targets.map((n, o) => {
      o.send(e, r);
    });
  }
}
var Et = /* @__PURE__ */ ((t) => (t.Mobile = "APP", t.Desktop = "WEB", t))(Et || {});
const U = {
  ipc: W.init(),
  config: {
    language: "zh-CN",
    baseUrl: ""
  },
  platform: function() {
    return typeof window.APP !== void 0 && typeof window.APP < "u" ? "APP" : "WEB";
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
        return window.APP.getLanguage();
      case "WEB":
        return localStorage.getItem("_token");
      default:
        return "";
    }
  },
  setToken(t) {
    switch (this.platform) {
      case "APP":
        throw new Error("The operation is not supported");
      case "WEB":
        return localStorage.setItem("_token", t);
      default:
        return "";
    }
  },
  utils: {
    isEmpty: K
  }
}, Vr = W.init();
class gt extends Error {
  constructor(r, n, o, p = "") {
    var u;
    super();
    y(this, "code", -1);
    y(this, "status", "");
    y(this, "type", "");
    y(this, "description", "");
    this.message = r, this.name = "CustomError", this.code = n, this.status = o, this.type = "error", this.description = p, (u = Vr.targets.get("self")) == null || u.send("custom_error", this);
  }
}
const zr = "YYYY-MM-DD HH:mm:ss";
function Pt(t) {
  for (const e in t) {
    if (t[e] && t[e]._isAMomentObject && (t[e] = t[e].format(zr)), pt(e)) {
      const r = t[e];
      if (r)
        try {
          t[e] = pt(r) ? r.trim() : r;
        } catch (n) {
          throw new Error(n);
        }
    }
    P(t[e]) && Pt(t[e]);
  }
}
const Hr = async (t, e) => {
  const r = t.requestOptions.body;
  r && Object.prototype.toString.call(r) === "[object Object]" && Pt(r), await e();
}, Jr = async (t, e) => {
  var f, a, i;
  const r = t.requestOptions;
  let n = !0;
  const o = r.headers, p = K(o) ? null : o["Content-Type"];
  if (p ? n = p.startsWith("application/json") : o["Content-Type"] = $t.Json, n) {
    const s = r.body;
    typeof s == "object" && (r.body = JSON.stringify(s));
  }
  await e();
  const u = ((f = t.response) == null ? void 0 : f.headers.get("Content-Type")) || "";
  (a = t.response) != null && a.ok && u && u.startsWith("application/json") && !t.result && (t.result = await ((i = t.response) == null ? void 0 : i.json()));
}, Gr = async (t, e) => {
  var p, u, f, a;
  const n = t.requestOptions.headers, o = U.getToken();
  if (o && kr(n.Authorization) && (n.Authorization = `Bearer ${o}`), await e(), !((p = t.response) != null && p.ok)) {
    const i = new Error("An error occurred while fetching the data.");
    throw i.message = `${(u = t.response) == null ? void 0 : u.status}|${await ((f = t.response) == null ? void 0 : f.text()) || ""}`, i;
  }
  if (((a = t.response) == null ? void 0 : a.status) !== 200)
    throw new gt(JSON.stringify(t.result), 500, t.response.status);
  if (!t.requestOptions.returnNativeResponse) {
    const i = t.result;
    if (i.code === 0 || i.code === 200)
      t.result = i.data;
    else if (i.message)
      throw new gt(i.message, i.code, t.response.status, JSON.stringify(i));
  }
}, Nr = async (t, e) => {
  const r = (/* @__PURE__ */ new Date()).getTime();
  t.url += `${t.url.indexOf("?") > 0 ? "&" : "?"}_t=${r}`, await e();
}, Y = new N();
Y.baseURL = () => {
  switch (U.platform) {
    case Et.Mobile:
      return window.APP.getURL();
    default:
      return U.config.baseUrl || location.origin;
  }
};
Y.middlewares = () => [Gr, Jr, Hr, Nr];
const Kr = new Lr(Y);
U.ipc.addTarget("_self", window);
window.http = Kr;
window.fw = U;
export {
  gt as CustomError,
  Mr as Dictionary,
  W as EventBus,
  Lr as Http
};
