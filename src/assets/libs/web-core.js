var Ct = Object.defineProperty;
var It = (t, e, r) => e in t ? Ct(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r;
var h = (t, e, r) => (It(t, typeof e != "symbol" ? e + "" : e, r), r);
var Ut = typeof global == "object" && global && global.Object === Object && global;
const yt = Ut;
var kt = typeof self == "object" && self && self.Object === Object && self, Rt = yt || kt || Function("return this")();
const $ = Rt;
var Lt = $.Symbol;
const M = Lt;
var mt = Object.prototype, Mt = mt.hasOwnProperty, Wt = mt.toString, I = M ? M.toStringTag : void 0;
function Ft(t) {
  var e = Mt.call(t, I), r = t[I];
  try {
    t[I] = void 0;
    var n = !0;
  } catch {
  }
  var o = Wt.call(t);
  return n && (e ? t[I] = r : delete t[I]), o;
}
var Bt = Object.prototype, Dt = Bt.toString;
function qt(t) {
  return Dt.call(t);
}
var Jt = "[object Null]", Nt = "[object Undefined]", Z = M ? M.toStringTag : void 0;
function _(t) {
  return t == null ? t === void 0 ? Nt : Jt : Z && Z in Object(t) ? Ft(t) : qt(t);
}
function k(t) {
  return t != null && typeof t == "object";
}
var Ht = "[object Symbol]";
function Vt(t) {
  return typeof t == "symbol" || k(t) && _(t) == Ht;
}
var zt = Array.isArray;
const bt = zt;
var Gt = /\s/;
function Kt(t) {
  for (var e = t.length; e-- && Gt.test(t.charAt(e)); )
    ;
  return e;
}
var Yt = /^\s+/;
function Xt(t) {
  return t && t.slice(0, Kt(t) + 1).replace(Yt, "");
}
function O(t) {
  var e = typeof t;
  return t != null && (e == "object" || e == "function");
}
var tt = 0 / 0, Qt = /^[-+]0x[0-9a-f]+$/i, Zt = /^0b[01]+$/i, te = /^0o[0-7]+$/i, ee = parseInt;
function et(t) {
  if (typeof t == "number")
    return t;
  if (Vt(t))
    return tt;
  if (O(t)) {
    var e = typeof t.valueOf == "function" ? t.valueOf() : t;
    t = O(e) ? e + "" : e;
  }
  if (typeof t != "string")
    return t === 0 ? t : +t;
  t = Xt(t);
  var r = Zt.test(t);
  return r || te.test(t) ? ee(t.slice(2), r ? 2 : 8) : Qt.test(t) ? tt : +t;
}
var re = "[object AsyncFunction]", ne = "[object Function]", oe = "[object GeneratorFunction]", ie = "[object Proxy]";
function wt(t) {
  if (!O(t))
    return !1;
  var e = _(t);
  return e == ne || e == oe || e == re || e == ie;
}
var se = $["__core-js_shared__"];
const F = se;
var rt = function() {
  var t = /[^.]+$/.exec(F && F.keys && F.keys.IE_PROTO || "");
  return t ? "Symbol(src)_1." + t : "";
}();
function ae(t) {
  return !!rt && rt in t;
}
var ce = Function.prototype, ue = ce.toString;
function x(t) {
  if (t != null) {
    try {
      return ue.call(t);
    } catch {
    }
    try {
      return t + "";
    } catch {
    }
  }
  return "";
}
var fe = /[\\^$.*+?()[\]{}|]/g, le = /^\[object .+?Constructor\]$/, pe = Function.prototype, ge = Object.prototype, de = pe.toString, he = ge.hasOwnProperty, ye = RegExp(
  "^" + de.call(he).replace(fe, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function me(t) {
  if (!O(t) || ae(t))
    return !1;
  var e = wt(t) ? ye : le;
  return e.test(x(t));
}
function be(t, e) {
  return t == null ? void 0 : t[e];
}
function R(t, e) {
  var r = be(t, e);
  return me(r) ? r : void 0;
}
var we = R($, "WeakMap");
const q = we;
var ve = 9007199254740991;
function vt(t) {
  return typeof t == "number" && t > -1 && t % 1 == 0 && t <= ve;
}
function Te(t) {
  return t != null && vt(t.length) && !wt(t);
}
var je = Object.prototype;
function Tt(t) {
  var e = t && t.constructor, r = typeof e == "function" && e.prototype || je;
  return t === r;
}
var Ae = "[object Arguments]";
function nt(t) {
  return k(t) && _(t) == Ae;
}
var jt = Object.prototype, $e = jt.hasOwnProperty, Ee = jt.propertyIsEnumerable, Pe = nt(function() {
  return arguments;
}()) ? nt : function(t) {
  return k(t) && $e.call(t, "callee") && !Ee.call(t, "callee");
};
const Se = Pe;
function Oe() {
  return !1;
}
var At = typeof exports == "object" && exports && !exports.nodeType && exports, ot = At && typeof module == "object" && module && !module.nodeType && module, _e = ot && ot.exports === At, it = _e ? $.Buffer : void 0, xe = it ? it.isBuffer : void 0, Ce = xe || Oe;
const Ie = Ce;
var Ue = "[object Arguments]", ke = "[object Array]", Re = "[object Boolean]", Le = "[object Date]", Me = "[object Error]", We = "[object Function]", Fe = "[object Map]", Be = "[object Number]", De = "[object Object]", qe = "[object RegExp]", Je = "[object Set]", Ne = "[object String]", He = "[object WeakMap]", Ve = "[object ArrayBuffer]", ze = "[object DataView]", Ge = "[object Float32Array]", Ke = "[object Float64Array]", Ye = "[object Int8Array]", Xe = "[object Int16Array]", Qe = "[object Int32Array]", Ze = "[object Uint8Array]", tr = "[object Uint8ClampedArray]", er = "[object Uint16Array]", rr = "[object Uint32Array]", g = {};
g[Ge] = g[Ke] = g[Ye] = g[Xe] = g[Qe] = g[Ze] = g[tr] = g[er] = g[rr] = !0;
g[Ue] = g[ke] = g[Ve] = g[Re] = g[ze] = g[Le] = g[Me] = g[We] = g[Fe] = g[Be] = g[De] = g[qe] = g[Je] = g[Ne] = g[He] = !1;
function nr(t) {
  return k(t) && vt(t.length) && !!g[_(t)];
}
function or(t) {
  return function(e) {
    return t(e);
  };
}
var $t = typeof exports == "object" && exports && !exports.nodeType && exports, U = $t && typeof module == "object" && module && !module.nodeType && module, ir = U && U.exports === $t, B = ir && yt.process, sr = function() {
  try {
    var t = U && U.require && U.require("util").types;
    return t || B && B.binding && B.binding("util");
  } catch {
  }
}();
const st = sr;
var at = st && st.isTypedArray, ar = at ? or(at) : nr;
const cr = ar;
function ur(t, e) {
  return function(r) {
    return t(e(r));
  };
}
var fr = ur(Object.keys, Object);
const lr = fr;
var pr = Object.prototype, gr = pr.hasOwnProperty;
function dr(t) {
  if (!Tt(t))
    return lr(t);
  var e = [];
  for (var r in Object(t))
    gr.call(t, r) && r != "constructor" && e.push(r);
  return e;
}
var hr = R($, "Map");
const J = hr;
var yr = R($, "DataView");
const N = yr;
var mr = R($, "Promise");
const H = mr;
var br = R($, "Set");
const V = br;
var ct = "[object Map]", wr = "[object Object]", ut = "[object Promise]", ft = "[object Set]", lt = "[object WeakMap]", pt = "[object DataView]", vr = x(N), Tr = x(J), jr = x(H), Ar = x(V), $r = x(q), P = _;
(N && P(new N(new ArrayBuffer(1))) != pt || J && P(new J()) != ct || H && P(H.resolve()) != ut || V && P(new V()) != ft || q && P(new q()) != lt) && (P = function(t) {
  var e = _(t), r = e == wr ? t.constructor : void 0, n = r ? x(r) : "";
  if (n)
    switch (n) {
      case vr:
        return pt;
      case Tr:
        return ct;
      case jr:
        return ut;
      case Ar:
        return ft;
      case $r:
        return lt;
    }
  return e;
});
const Er = P;
var Pr = function() {
  return $.Date.now();
};
const D = Pr;
var Sr = "Expected a function", Or = Math.max, _r = Math.min;
function Et(t, e, r) {
  var n, o, p, u, f, a, i = 0, s = !1, l = !1, w = !0;
  if (typeof t != "function")
    throw new TypeError(Sr);
  e = et(e) || 0, O(r) && (s = !!r.leading, l = "maxWait" in r, p = l ? Or(et(r.maxWait) || 0, e) : p, w = "trailing" in r ? !!r.trailing : w);
  function m(b) {
    var E = n, C = o;
    return n = o = void 0, i = b, u = t.apply(C, E), u;
  }
  function d(b) {
    return i = b, f = setTimeout(v, e), s ? m(b) : u;
  }
  function T(b) {
    var E = b - a, C = b - i, Q = e - E;
    return l ? _r(Q, p - C) : Q;
  }
  function c(b) {
    var E = b - a, C = b - i;
    return a === void 0 || E >= e || E < 0 || l && C >= p;
  }
  function v() {
    var b = D();
    if (c(b))
      return j(b);
    f = setTimeout(v, T(b));
  }
  function j(b) {
    return f = void 0, w && n ? m(b) : (n = o = void 0, u);
  }
  function y() {
    f !== void 0 && clearTimeout(f), i = 0, n = a = o = f = void 0;
  }
  function W() {
    return f === void 0 ? u : j(D());
  }
  function A() {
    var b = D(), E = c(b);
    if (n = arguments, o = this, a = b, E) {
      if (f === void 0)
        return d(a);
      if (l)
        return clearTimeout(f), f = setTimeout(v, e), m(a);
    }
    return f === void 0 && (f = setTimeout(v, e)), u;
  }
  return A.cancel = y, A.flush = W, A;
}
var xr = "[object String]";
function gt(t) {
  return typeof t == "string" || !bt(t) && k(t) && _(t) == xr;
}
var Cr = "[object Map]", Ir = "[object Set]", Ur = Object.prototype, kr = Ur.hasOwnProperty;
function Rr(t) {
  if (t == null)
    return !0;
  if (Te(t) && (bt(t) || typeof t == "string" || typeof t.splice == "function" || Ie(t) || cr(t) || Se(t)))
    return !t.length;
  var e = Er(t);
  if (e == Cr || e == Ir)
    return !t.size;
  if (Tt(t))
    return !dr(t).length;
  for (var r in t)
    if (kr.call(t, r))
      return !1;
  return !0;
}
var Lr = "Expected a function";
function Mr(t, e, r) {
  var n = !0, o = !0;
  if (typeof t != "function")
    throw new TypeError(Lr);
  return O(r) && (n = "leading" in r ? !!r.leading : n, o = "trailing" in r ? !!r.trailing : o), Et(t, e, {
    leading: n,
    maxWait: e,
    trailing: o
  });
}
const L = (t) => typeof t == "function" ? t() : t;
function K(t) {
  return !(t && (typeof t != "object" || (Array.isArray(t) ? t.length : Object.keys(t).length)));
}
var Pt = /* @__PURE__ */ ((t) => (t.Json = "application/json;charset=UTF-8", t.FormURLEncoded = "application/x-www-form-urlencoded;charset=UTF-8", t.FormData = "multipart/form-data;charset=UTF-8", t))(Pt || {});
class Wr {
  constructor() {
    /**
     * 服务基础路径
     */
    h(this, "baseURL", "");
    /**
     * 请求路径
     */
    h(this, "path", "");
    /**
     * 请求全路径
     */
    h(this, "url", "");
    /**
     * 请求结果
     */
    h(this, "result", null);
    /**
     * 请求参数
     */
    h(this, "requestOptions", {});
    /**
     * 请求信息
     */
    h(this, "request");
    /**
     * 请求返回信息
     */
    h(this, "response");
  }
}
class z {
  constructor(e) {
    /**
     * 服务基础路径
     */
    h(this, "baseURL");
    /**
     * 指定请求超时的毫秒数（默认永不超时，Chrome中网络请求超时为300秒，Firefox中为90秒）
     */
    h(this, "timeout");
    /**
     * 服务中间件
     */
    h(this, "middlewares");
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
class Fr {
  constructor(e) {
    h(this, "middlewares");
    h(this, "options");
    this.middlewares = [], e instanceof z ? this.options = e : this.options = new z(e);
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
    const u = new Wr();
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
      Mr(() => o(this.createRequest(e, r, n)), r.throttle);
    }) : r.debounce ? new Promise((o) => {
      Et(() => o(this.createRequest(e, r, n)), r.debounce);
    }) : this.createRequest(e, r, n);
  }
  get(e, r, n = {}, o = []) {
    return n.method = "GET", n.params = r, this.request(e, n, o);
  }
  post(e, r, n = {}, o = []) {
    return n.method = "POST", n.body = r, this.request(e, n, o);
  }
  patch(e, r = {}, n = []) {
    return r.method = "PATCH", this.request(e, r, n);
  }
  put(e, r = {}, n = []) {
    return r.method = "PUT", this.request(e, r, n);
  }
  delete(e, r = {}, n = []) {
    return r.method = "DELETE", this.request(e, r, n);
  }
  upload(e, r, n = {}, o = []) {
    return n.method = "POST", n.body = r, n.headers = {
      "Content-Type": "multipart/form-data;charset=UTF-8"
      /* FormData */
    }, this.request(e, n, o);
  }
}
class Br {
  constructor() {
    h(this, "items");
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
function Dr(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var St = { exports: {} };
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
    var m = new o(s, l || a, w), d = r ? r + i : i;
    return a._events[d] ? a._events[d].fn ? a._events[d] = [a._events[d], m] : a._events[d].push(m) : (a._events[d] = m, a._eventsCount++), a;
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
    for (var w = 0, m = l.length, d = new Array(m); w < m; w++)
      d[w] = l[w].fn;
    return d;
  }, f.prototype.listenerCount = function(i) {
    var s = r ? r + i : i, l = this._events[s];
    return l ? l.fn ? 1 : l.length : 0;
  }, f.prototype.emit = function(i, s, l, w, m, d) {
    var T = r ? r + i : i;
    if (!this._events[T])
      return !1;
    var c = this._events[T], v = arguments.length, j, y;
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
          return c.fn.call(c.context, s, l, w, m, d), !0;
      }
      for (y = 1, j = new Array(v - 1); y < v; y++)
        j[y - 1] = arguments[y];
      c.fn.apply(c.context, j);
    } else {
      var W = c.length, A;
      for (y = 0; y < W; y++)
        switch (c[y].once && this.removeListener(i, c[y].fn, void 0, !0), v) {
          case 1:
            c[y].fn.call(c[y].context);
            break;
          case 2:
            c[y].fn.call(c[y].context, s);
            break;
          case 3:
            c[y].fn.call(c[y].context, s, l);
            break;
          case 4:
            c[y].fn.call(c[y].context, s, l, w);
            break;
          default:
            if (!j)
              for (A = 1, j = new Array(v - 1); A < v; A++)
                j[A - 1] = arguments[A];
            c[y].fn.apply(c[y].context, j);
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
    var d = this._events[m];
    if (d.fn)
      d.fn === s && (!w || d.once) && (!l || d.context === l) && u(this, m);
    else {
      for (var T = 0, c = [], v = d.length; T < v; T++)
        (d[T].fn !== s || w && !d[T].once || l && d[T].context !== l) && c.push(d[T]);
      c.length ? this._events[m] = c.length === 1 ? c[0] : c : u(this, m);
    }
    return this;
  }, f.prototype.removeAllListeners = function(i) {
    var s;
    return i ? (s = r ? r + i : i, this._events[s] && u(this, s)) : (this._events = new n(), this._eventsCount = 0), this;
  }, f.prototype.off = f.prototype.removeListener, f.prototype.addListener = f.prototype.on, f.prefixed = r, f.EventEmitter = f, t.exports = f;
})(St);
var qr = St.exports;
const Jr = /* @__PURE__ */ Dr(qr);
class Nr extends Jr {
}
const G = "_ipc";
class Hr {
  constructor(e = null) {
    /**
     * 事件触发器
     */
    h(this, "emitter");
    /**
     * iframe窗口对象
     */
    h(this, "contentWindow", null);
    /**
     * 是否跨域
     */
    h(this, "isCrossOrigin", !1);
    if (this.emitter = new Nr(), e) {
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
        const n = this.contentWindow[G];
        if (n) {
          n.send(e, r);
          return;
        }
      }
      this.emitter.emit(e, r);
    }
  }
}
class Y {
  constructor() {
    /**
     * 目标监听器清单
     */
    h(this, "targets");
    h(this, "sendingEvents", /* @__PURE__ */ new Set());
    this.targets = new Br();
  }
  static init() {
    const e = new Y();
    if (typeof window < "u") {
      const r = window[G];
      if (r)
        return r;
      window[G] = e;
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
    this.targets.add(e, new Hr(r));
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
    this.sendingEvents.has(e) || (this.sendingEvents.add(e), this.targets.map((n, o) => {
      o.send(e, r);
    }), this.sendingEvents.delete(e));
  }
}
var Ot = /* @__PURE__ */ ((t) => (t.Mobile = "APP", t.Desktop = "WEB", t.NODE_JS = "NodeJs", t))(Ot || {});
const S = {
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
  setOrgId(t) {
    switch (this.platform) {
      case "APP":
        throw new Error("The operation is not supported");
      case "WEB":
        return localStorage.setItem("_orgId", t);
      default:
        return "";
    }
  },
  utils: {
    isEmpty: K
  }
};
class dt extends Error {
  constructor(r, n, o, p = "") {
    var u;
    super();
    h(this, "code", -1);
    h(this, "status", "");
    h(this, "type", "");
    h(this, "description", "");
    this.message = r, this.name = "CustomError", this.code = n, this.status = o, this.type = "error", this.description = p, (u = S.ipc.targets.get("_self")) == null || u.send("custom_error", this);
  }
}
const _t = typeof window < "u", ht = _t ? null : require("node:path"), Vr = _t ? null : require("swagger-typescript-api");
function tn(t) {
  return !t || !t.baseUrl || !t.inputs ? null : t.inputs.length === 0 ? (console.log("swagger-api-gen: No input files found."), null) : {
    name: "swagger-api-gen",
    enforce: "pre",
    apply: "serve",
    buildStart() {
      for (const e in t.inputs) {
        if (e === "index")
          continue;
        const r = `/api/${e}`;
        Vr.generateApi({
          name: e,
          url: `${t.baseUrl}${r}/v3/api-docs`,
          output: ht.resolve(process.cwd(), (t == null ? void 0 : t.output) || "./src/api"),
          templates: ht.resolve(process.cwd(), (t == null ? void 0 : t.templates) || "./plugins/swagger-templates"),
          singleHttpClient: !0,
          httpClientType: "fetch",
          // @ts-ignore
          apiClassName: `${e[0].toUpperCase() + e.slice(1)}Api`,
          apiPrefix: r,
          importModules: 'import { Http } from "@/types/web-core";',
          hooks: {
            onFormatRouteName: (n, o) => /\d/.test(o) && n.operationId.includes("_") ? n.operationId.split("_", 1)[0] : o
          }
        }).catch((n) => console.error(n));
      }
    }
  };
}
const zr = "YYYY-MM-DD HH:mm:ss";
function xt(t) {
  for (const e in t) {
    if (t[e] && t[e]._isAMomentObject && (t[e] = t[e].format(zr)), gt(e)) {
      const r = t[e];
      if (r)
        try {
          t[e] = gt(r) ? r.trim() : r;
        } catch (n) {
          throw new Error(n);
        }
    }
    O(t[e]) && xt(t[e]);
  }
}
const Gr = async (t, e) => {
  const r = t.requestOptions.body;
  r && Object.prototype.toString.call(r) === "[object Object]" && xt(r), await e();
}, Kr = async (t, e) => {
  var p, u, f;
  const r = t.requestOptions, n = r.body;
  if (!(n instanceof FormData) && !(n instanceof URLSearchParams)) {
    let a = !0;
    const i = r.headers, s = K(i) ? null : i == null ? void 0 : i["Content-Type"];
    s ? a = s.startsWith("application/json") : i["Content-Type"] = Pt.Json, a && typeof n == "object" && (r.body = JSON.stringify(n));
  }
  if (await e(), t.result)
    return;
  const o = ((p = t.response) == null ? void 0 : p.headers.get("Content-Type")) || "";
  (u = t.response) != null && u.ok && (o != null && o.startsWith("application/json")) && (t.result = await ((f = t.response) == null ? void 0 : f.json()));
}, Yr = async (t, e) => {
  var p, u, f, a;
  const n = t.requestOptions.headers, o = S.getToken();
  if (o && Rr(n.Authorization) && (n.Authorization = `Bearer ${o}`), await e(), !((p = t.response) != null && p.ok)) {
    const i = new Error("An error occurred while fetching the data.");
    throw i.message = `${(u = t.response) == null ? void 0 : u.status}|${await ((f = t.response) == null ? void 0 : f.text()) || ""}`, i;
  }
  if (((a = t.response) == null ? void 0 : a.status) !== 200)
    throw new dt(JSON.stringify(t.result), 500, t.response.status);
  if (!t.requestOptions.returnNativeResponse) {
    const i = t.result;
    if (i.code === 0 || i.code === 200)
      t.result = i.data;
    else if (i.message)
      throw new dt(i.message, i.code, t.response.status, JSON.stringify(i));
  }
}, Xr = async (t, e) => {
  const r = (/* @__PURE__ */ new Date()).getTime();
  t.url += `${t.url.indexOf("?") > 0 ? "&" : "?"}_t=${r}`, await e();
}, X = new z();
X.baseURL = () => {
  switch (S.platform) {
    case Ot.Mobile:
      return window.APP.getURL();
    default:
      return S.config.baseUrl || location.origin;
  }
};
X.middlewares = () => [Yr, Kr, Gr, Xr];
const Qr = new Fr(X);
typeof window < "u" && (S.ipc = Y.init(), S.ipc.addTarget("_self", window), window.http = Qr, window.fw = S);
export {
  dt as CustomError,
  Br as Dictionary,
  Y as EventBus,
  Fr as Http,
  tn as swaggerApiGen
};
