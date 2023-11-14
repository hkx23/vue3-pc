// import { EventBus, Http } from '../assets/libs/web-core';
import { EventBus, Http } from './web-core';

declare interface Config {
  language: string;
  baseUrl: string;
}

declare interface Utils {
  isEmpty: Function;
}

declare interface Framework {
  ipc: EventBus;
  config: Config;
  platform: string;
  getLanguage: Function;
  getToken: Function;
  setToken: Function;
  utils: Utils;
}

// declare interface Window {
//   fw: Framework;
//   http: Http;
//   APP: any;
// }

declare global {
  const fw: Framework;
  const http: Http;
  interface Window {
    fw: Framework;
    http: Http;
    APP: any;
  }
}
