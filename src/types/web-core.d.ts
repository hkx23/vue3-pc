import EventEmitter from 'eventemitter3';

export declare class CustomError extends Error {
  protected code: number;

  protected status: string | number;

  protected type: string;

  protected description: string;

  constructor(message: string, code: number, status: string | number, description?: string);
}

/**
 * 自定义字典
 */
export declare class Dictionary<TValue> {
  items: {
    [key: string]: TValue;
  };

  constructor();

  /**
   * 查找字典中的元素
   * @param key 关键字
   */
  has(key: string): boolean;

  /**
   * 向字典添加一个元素
   * @param key 关键字
   * @param val 值
   */
  add(key: string, val: TValue): void;

  /**
   * 通过关键字删除字典项，返回是否删除成功
   * @param key 关键字
   */
  remove(key: string): boolean;

  /**
   * 清空字典
   */
  clear(): void;

  /**
   * 查找字典中的元素，没有则是undefined
   * @param key 关键字
   */
  get(key: string): TValue | undefined;

  /**
   * 返回一个包含所有value数组
   */
  values(): TValue[];

  /**
   * 循环字典子元素
   * @param func 入参为key和value
   */
  map(func: (key: string, value: TValue) => void): void;

  /**
   * 查看字典中元素的个数
   */
  count(): number;
}

/**
 * 事件总线（支持Nodejs和浏览器）
 */
export declare class EventBus {
  /**
   * 目标监听器清单
   */
  targets: Dictionary<EventTarget_2>;

  constructor();

  static init(): EventBus;

  /**
   * 添加目标监听器
   * @param key 目标名称
   */
  addTarget(key: string, win?: Window | null): void;

  /**
   * 删除目标监听器
   * @param key 目标名称
   */
  removeTarget(key: string): void;

  /**
   * 删除指定事件所有监听器
   * @param event 事件名
   */
  remove(event: string): this;

  /**
   * 删除指定事件注册监听器
   * @param event 事件名
   * @param listener 监听器函数
   */
  remove(event: string, listener: (args: any) => void): this;

  /**
   * 删除指定事件注册监听器
   * @param event 事件名
   * @param sourceName 来源名
   * @param listener 监听器函数
   */
  remove(event: string, sourceName: string, listener: (args: any) => void): this;

  /**
   * 指定事件注册监听器
   * @param event 事件名
   * @param listener 监听器函数
   */
  on(event: string, listener: (args: any) => void): this;

  /**
   * 指定事件注册监听器
   * @param event 事件名
   * @param sourceName 来源名
   * @param listener 监听器函数
   */
  on(event: string, sourceName: string, listener: (args: any) => void): this;

  /**
   * 指定事件注册一个单次监听器，触发后立即解除
   * @param event 事件名
   * @param listener 监听器函数
   */
  once(event: string, listener: (args: any) => void): this;

  /**
   * 指定事件注册一个单次监听器，触发后立即解除
   * @param event 事件名
   * @param sourceName 来源名
   * @param listener 监听器函数
   */
  once(event: string, sourceName: string, listener: (args: any) => void): this;

  /**
   * 执行所有监听器
   * @param event 事件名
   * @param args 参数
   */
  send(event: string | symbol, args: any | null): void;
}

/**
 * 目标事件实例
 */
declare class EventTarget_2 {
  /**
   * 事件触发器
   */
  emitter: TargetEmitter;

  /**
   * iframe窗口对象
   */
  contentWindow: Window | null;

  /**
   * 是否跨域
   */
  isCrossOrigin: boolean;

  constructor(win?: Window | null);

  /**
   * 执行监听器
   * @param event 事件名
   * @param args 参数
   */
  send(event: string | symbol, args: any): void;
}

/**
 * HTTP 基础请求库（基于原生Fetch封装，支持Nodejs）
 */
export declare class Http {
  middlewares: HttpMiddleware[];

  options: HttpOptions;

  constructor(options?: HttpOptions | string);

  /**
   * 新增中间件
   * @param middleware 中间件
   */
  use(middleware: HttpMiddleware): this;

  private getUrl;

  private createContext;

  private createRequest;

  request<T = any>(
    url: HttpPath,
    requestOptions?: RequestOptions,
    middleware?: HttpMiddleware | HttpMiddleware[],
  ): Promise<T>;

  get<T = any>(
    url: HttpPath,
    params?: HttpUrlParams,
    requestOptions?: RequestOptions,
    middleware?: HttpMiddleware | HttpMiddleware[],
  ): Promise<T>;

  post<T = any>(
    url: HttpPath,
    data: any,
    requestOptions?: RequestOptions,
    middleware?: HttpMiddleware | HttpMiddleware[],
  ): Promise<T>;

  patch<T = any>(
    url: HttpPath,
    requestOptions?: RequestOptions,
    middleware?: HttpMiddleware | HttpMiddleware[],
  ): Promise<T>;

  put<T = any>(
    url: HttpPath,
    requestOptions?: RequestOptions,
    middleware?: HttpMiddleware | HttpMiddleware[],
  ): Promise<T>;

  del<T = any>(
    url: HttpPath,
    requestOptions?: RequestOptions,
    middleware?: HttpMiddleware | HttpMiddleware[],
  ): Promise<T>;

  upload<T = any>(
    url: HttpPath,
    data: FormData,
    requestOptions?: RequestOptions,
    middleware?: HttpMiddleware | HttpMiddleware[],
  ): Promise<T>;
}

/**
 * HTTP上下文
 */
declare class HttpContext {
  /**
   * 服务基础路径
   */
  baseURL: string | (() => string);

  /**
   * 请求路径
   */
  path: string;

  /**
   * 请求全路径
   */
  url: string;

  /**
   * 请求结果
   */
  result: any;

  /**
   * 请求参数
   */
  requestOptions: RequestOptions;

  /**
   * 请求信息
   */
  request?: Request;

  /**
   * 请求返回信息
   */
  response?: Response;
}

/**
 * HTTP中间件
 */
declare type HttpMiddleware = (ctx: HttpContext, next: () => any) => any;

/**
 * HTTP配置项
 */
declare class HttpOptions {
  /**
   * 服务基础路径
   */
  baseURL?: string | (() => string);

  /**
   * 指定请求超时的毫秒数（默认永不超时，Chrome中网络请求超时为300秒，Firefox中为90秒）
   */
  timeout?: number;

  /**
   * 服务中间件
   */
  middlewares: HttpMiddleware[] | (() => HttpMiddleware[]);

  constructor(url?: string);

  normalizeUrl(url: string): string;

  normalizeUrlParams(url: string, urlParams: HttpUrlParams): string;
}

/**
 * HTTP服务路径（前面自动加上`baseURL`，除非是绝对URL）
 */
declare type HttpPath = string | (() => string);

/**
 * HTTP URL 参数
 */
declare type HttpUrlParams =
  | string
  | {
      [key: string]: string | number | boolean;
    }
  | (() => string);

declare interface RequestOptions extends RequestInit {
  /**
   * 指定请求超时的毫秒数（默认永不超时，Chrome中网络请求超时为300秒，Firefox中为90秒）
   */
  timeout?: number;
  /**
   * URL 参数
   */
  params?: HttpUrlParams;
  /**
   * 是否返回原生输出，不做转换和处理
   */
  returnNativeResponse?: boolean;
  /**
   * 接口级节流
   *
   * 单位: 毫秒
   */
  throttle?: number;
  /**
   * 接口级防抖
   *
   * 单位: 毫秒
   */
  debounce?: number;
}

declare class TargetEmitter extends EventEmitter {}

export {};
