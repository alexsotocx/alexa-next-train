"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpService = void 0;
const axios_1 = __importDefault(require("axios"));
const rxjs_1 = require("rxjs");
class HttpService {
    constructor(instance = axios_1.default) {
        this.instance = instance;
    }
    request(config) {
        return this.makeObservable(this.instance.request, config);
    }
    get(url, config) {
        return this.makeObservable(this.instance.get, url, config);
    }
    delete(url, config) {
        return this.makeObservable(this.instance.delete, url, config);
    }
    head(url, config) {
        return this.makeObservable(this.instance.head, url, config);
    }
    post(url, data, config) {
        return this.makeObservable(this.instance.post, url, data, config);
    }
    put(url, data, config) {
        return this.makeObservable(this.instance.put, url, data, config);
    }
    patch(url, data, config) {
        return this.makeObservable(this.instance.patch, url, data, config);
    }
    get axiosRef() {
        return this.instance;
    }
    makeObservable(axios, ...args) {
        return new rxjs_1.Observable(subscriber => {
            const config = Object.assign({}, (args[args.length - 1] || {}));
            let cancelSource;
            if (!config.cancelToken) {
                cancelSource = axios_1.default.CancelToken.source();
                config.cancelToken = cancelSource.token;
            }
            axios(...args)
                .then(res => {
                subscriber.next(res);
                subscriber.complete();
            })
                .catch(err => {
                subscriber.error(err);
            });
            return () => {
                if (config.responseType === 'stream') {
                    return;
                }
                if (cancelSource) {
                    cancelSource.cancel();
                }
            };
        });
    }
}
exports.HttpService = HttpService;
