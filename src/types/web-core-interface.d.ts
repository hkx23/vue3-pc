// import { EventBus, Http } from '../assets/libs/web-core';
import { EventBus, Http } from './web-core';

declare interface Config {
  baseUrl: string;
  languageCodes: Array<string>;
}

declare interface Utils {
  isEmpty: Function;
}

declare interface Framework {
  ipc: EventBus;
  config: Config;
  platform: string;
  utils: Utils;
  getLanguage: () => string;
  setLanguage: (language: string) => void;
  getToken: () => string;
  setToken: (token: string) => void;
  getOrgId: () => string;
  setOrgId: (orgId: string) => void;
  getEnterpriseId: () => string;
  setEnterpriseId: (enterpriseId: string) => void;
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
