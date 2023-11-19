import moment from "moment";
import NProgress from 'nprogress';
import {objectHasOwn, range} from "./collection";
import {API_CODE} from "@/define";
import config from "@/config";
// import {accessToken} from "@/lib/auth";
// import Viewer from 'viewerjs';
// const AccessTokenKey = 'AppAccessToken';
// const accessToken = localStorage.getItem(AccessTokenKey);
import {getAccessToken, removeAccessToken, setAccessToken} from "@/lib/auth";
import {getDeviceId} from "@/lib/device";


const IN_BROWSER = typeof window !== 'undefined';
export const REPORT_MODULE_EWALLET = 'REPORT_MODULE_EWALLET';
export const REPORT_MODULE_PGW = 'REPORT_MODULE_PGW';
export const REPORT_MODULE_BANKGW = 'REPORT_MODULE_BANKGW';
export const Q_FILE_ACTION = {
    ADD_FOLDER: 'ADD_FOLDER',
    SELECT_FILE: 'SELECT_FILE',
    LOAD: 'LOAD',
    SHOW_PHOTO: 'SHOW_PHOTO'
}

const quarterGenFunctions = {
    '1': () => [1, 2, 3],
    '2': () => [4, 5, 6],
    '3': () => [7, 8, 9],
    '4': () => [10, 11, 12],
}

/**
 * @return {Array<number>}
 */
export function getQuarterMonths(quarterId) {
    if (!quarterGenFunctions[quarterId]) {
        return quarterGenFunctions['1']();
    }

    return quarterGenFunctions[quarterId]();
}


export function getDefaultQuarter() {
    const d = new Date;
    if (d <= 3) {
        return 1;
    }

    if (d <= 6) {
        return 2;
    }

    if (d <= 9) {
        return 3;
    }

    return 4;
}

export function getYearMonths(year) {

    const d = new Date;
    const currentYear = d.getFullYear();
    if (!year) {
        year = currentYear;
    } else {
        year -= 0;
    }

    if (year < currentYear) {
        return range(12, 1, 1);
    } else if (year === currentYear) {
        return range(d.getMonth() + 1, 1, 1);
    }

    return [];
}

export function zeroPad(value) {

}

export function getDatesInMonth(year, month) {
    return getDaysInMonth(year, month).map(d => {
        return year.toString() + '-' + month.toString().padStart(2, '0') + '-' + d.toString().padStart(2, '0')
    })
}


export function getDaysInMonth(year, month) {
    const cd = new Date;
    if (!year) {
        year = cd.getFullYear();
    } else {
        year = parseInt(year);
    }

    if (!month) {
        month = cd.getMonth() + 1;
    } else {
        month = parseInt(month);
    }

    const currentYear = cd.getFullYear();
    const currentMonth = cd.getMonth() + 1;
    if (currentYear === year && currentMonth === month) {
        return range(cd.getDate(), 1, 1);
    }

    const d = new Date(year, month - 1);
    return range(moment(d).daysInMonth(), 1, 1);
}

export function isEmpty(obj) {
    if (!obj) {
        return true;
    }

    for (const k in obj) {
        return false;
    }

    return true;
}

export function isStringNullOrWhiteSpace(value) {
    if (value == null) {
        return true;
    }

    if (typeof value !== 'string') {
        value = value.toString();
    }

    return value.replace(/\s/g, '').length === 0;
}

export function parseQuery(queryString) {
    const query = {};
    const pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
    for (let i = 0; i < pairs.length; i++) {
        const pair = pairs[i].split('=');
        query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }
    return query;
}

function refreshToken(params: any, progress = true) {
    fetch(config.BASE_API_URL + '/ew-web/user/auth/v1/refresh-token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getAccessToken() || '',

            },
            body: JSON.stringify(params),
        }
    )
        .then(async (response) => {
            if (IN_BROWSER && progress) {
                NProgress.done();
            }

            if (response.status !== 200) {
                response.text().then(v => {
                    console.error(v);
                })
                return Promise.reject('Error from server. HTTP code: ' + response.status)
            }

            const resData = await response.json();
            return resData;
        })
}

/**
 * Performs Http GET request
 * @param uri
 * @param params
 * @param progress
 * @returns {Promise<TResult>}
 */
export async function $get(uri: string, params: any = {}, progress = true) {
    if (IN_BROWSER && progress) {
        NProgress.start();
    }

    if (!params) {
        params = {};
    }

    let url;
    if (uri.indexOf('?') >= 0) {
        url = config.BASE_API_URL + uri + '&' + buildQuery(params);
    } else {
        url = config.BASE_API_URL + uri + '?' + buildQuery(params);
    }
    // console.log('THANG E<', token)
    return fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getAccessToken() || ''
            },
        }
    ).then(async (response) => {
        if (IN_BROWSER && progress) {
            NProgress.done();
        }

        if (response.status !== 200) {
            response.text().then(v => {
                console.error(v);
            })
            return Promise.reject('Error from server. HTTP code: ' + response.status)
        }

        const resData = await response.json();

        if (resData.code === API_CODE.TOKEN_EXPIRED) {
            // location.href = '/logout';
            // location.href ='/login'
            // return Promise.reject('Token expired');

            const paramsRefreshToken = {
                refreshToken: config.refreshToken,
                deviceId: getDeviceId()
            }

            // const resRefreshToken: any = await refreshToken(paramsRefreshToken);
            // if (resRefreshToken.code === API_CODE.SUCCESS) {
            //     setAccessToken(resRefreshToken?.body?.accessToken)
            //     $get(uri, params, progress)
            // } else {
            //     config.refreshToken = ''
            //     removeAccessToken()
            //     location.href = '/login'
            //     return Promise.reject('Token expired');
            // }

            fetch(config.BASE_API_URL + '/ew-web/user/auth/v1/refresh-token', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': getAccessToken() || '',
                    },
                    body: JSON.stringify(paramsRefreshToken),
                }
            )
                .then(async (response) => {
                    if (IN_BROWSER && progress) {
                        NProgress.done();
                    }

                    if (response.status !== 200) {
                        response.text().then(v => {
                            console.error(v);
                        })
                        return Promise.reject('Error from server. HTTP code: ' + response.status)
                    }

                    const resDataRF = await response.json();
                    console.log('resDataRF get', resDataRF, resDataRF?.body?.accessToken,)
                    if (resDataRF.code === API_CODE.SUCCESS) {
                    setAccessToken(resDataRF?.body?.accessToken)
                    console.log(' resDataRF getAccessToken()',  getAccessToken())
                    setTimeout(() => {
                        $get(uri, params, progress)
                    }, 500)
                    } else {
                        config.refreshToken = ''
                        removeAccessToken()
                        location.href = '/login'
                        return Promise.reject('Token expired');
                    }
                    // return resData;
                })
        }

        return resData;
    })
}

export async function $downloadAsBlob(filename, uri, params = {}) {
    const blobData = await $postAsBlob(uri, params, false);
    downloadBlob(blobData, filename);
}

/**
 * Performs Http POST request
 * @param {string} uri
 * @param {object} params
 * @param {boolean} progress
 * @returns {Promise<any>}
 */
export async function $postAsBlob(uri: string, params = {}, progress = true) {

    if (IN_BROWSER && progress) {
        NProgress.start();
    }

    if (!params) {
        params = {};
    }

    return fetch(config.BASE_API_URL + uri, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getAccessToken() || ''
        },
        body: JSON.stringify(params),
    })
        .then(async (response) => {
            if (IN_BROWSER && progress) {
                NProgress.done();
            }

            if (response.status !== 200) {
                response.text().then(v => {
                    console.error(v);
                })
                return Promise.reject('Error from server. HTTP code: ' + response.status)
            }
            return response.blob();
        })
}

// console.log('accessToken',accessToken)
/**
 * Performs Http POST request
 * @param {string} uri
 * @param {object} params
 * @param {boolean} progress
 * @returns {Promise<any>}
 */
export async function $post(uri: string, params: any = {}, progress = true) {

    if (IN_BROWSER && progress) {
        NProgress.start();
    }

    if (!params) {
        params = {};
    }

    return fetch(config.BASE_API_URL + uri, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getAccessToken() || ''
        },
        body: JSON.stringify(params),
    })
        .then(async (response) => {

            if (IN_BROWSER && progress) {
                NProgress.done();
            }

            if (response.status !== 200) {
                response.text().then(v => {
                    console.error(v);
                })
                return Promise.reject('Error from server. HTTP code: ' + response.status)
            }

            const resData = await response.json();

            if (resData.code === API_CODE.TOKEN_EXPIRED) {
                const paramsRefreshToken = {
                    refreshToken: config.refreshToken,
                    deviceId: getDeviceId()
                }
                // const resRefreshToken: any = await refreshToken(paramsRefreshToken);
                // if (resRefreshToken.code === API_CODE.SUCCESS) {
                //     setAccessToken(resRefreshToken?.body?.accessToken)
                //     // location.reload()
                //     $post(uri, params, progress)
                // } else {
                //     config.refreshToken = ''
                //     removeAccessToken()
                //     location.href = '/login'
                //     return Promise.reject('Token expired');
                // }

                fetch(config.BASE_API_URL + '/ew-web/user/auth/v1/refresh-token', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': getAccessToken() || '',
                        },
                        body: JSON.stringify(paramsRefreshToken),
                    }
                )
                    .then(async (response) => {
                        if (IN_BROWSER && progress) {
                            NProgress.done();
                        }

                        if (response.status !== 200) {
                            response.text().then(v => {
                                console.error(v);
                            })
                            return Promise.reject('Error from server. HTTP code: ' + response.status)
                        }

                        const resDataRF = await response.json();
                        console.log('resDataRF post', resDataRF)
                        if (resDataRF.code === API_CODE.SUCCESS) {
                        setAccessToken(resDataRF?.body?.accessToken)
                        setTimeout(() => {
                            $post(uri, params, progress)
                        }, 500)
                        } else {
                            config.refreshToken = ''
                            removeAccessToken()
                            location.href = '/login'
                            return Promise.reject('Token expired');
                        }
                        // return resData;
                    })
            }

            return resData;
        })
}

export function $postForRegister(uri: string, files: Array<any>, params = {}) {
    const formData = new FormData();

    forEach(params, (v, k) => {
        if (v) {
            if (Array.isArray(v)) {
                v.forEach((e, i) => {
                    formData.append(`${k}[${i}]`, e);
                });
            } else {
                formData.append(k, v);
            }
        } else {
            formData.append(k, '');
        }
    });

    for (let i = 0; i < files.length; i++) {
        // formData.append('file_' + i, files[i]);
        formData.append('files[' + i + ']', files[i]);
    }

    console.log('formData111:', formData)

    return fetch(config.BASE_API_URL + uri, {
        method: 'POST',
        body: formData
    })
        .then((response) => response.json())
        .catch((error) => {
            console.error('Error:', error);
        });
}

export function uploadObjectUsingPresignedURL() {
}

export function $upload(uri, files, params = {}) {
    const formData = new FormData();
    /// const fileField = document.querySelector('input[type="file"]');
    //formData.append('_token', window.X_CSRF_TOKEN)
    forEach(params, (v, k) => {
        if (v) {
            if (Array.isArray(v)) {
                v.forEach((e, i) => {
                    formData.append(`${k}[${i}]`, e);
                });
            } else {
                formData.append(k, v);
            }
        } else {
            formData.append(k, '');
        }
    });

    for (let i = 0; i < files.length; i++) {
        formData.append('file_' + i, files[i]);
    }

    return fetch(uri, {
        method: 'POST',
        body: formData
    })
        .then((response) => response.json())
        .catch((error) => {
            console.error('Error:', error);
        });
}


export function inIframe() {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}


export function parseHashQuery() {
    const hash = location.hash.substr(1);
    const tmp = hash.split('&');
    const result = {};
    tmp.forEach(t => {
        const t2 = t.split('=');
        result[decodeURIComponent(t2[0])] = decodeURIComponent(t2[1]);
    });

    return result;
}

/**
 * Encode object to x-www-form-urlencoded
 * @param data
 */
export function buildQuery(data) {
    if (typeof data !== 'object') {
        return '';
    }

    const queries = [];
    for (const k in data) {
        queries.push(k + '=' + encodeURIComponent(data[k]));
    }
    return queries.join('&');
}

export function validatePhone(phone) {
    if (typeof phone !== 'string') {
        return false;
    }

    return /^0\d{9}$/.test(phone);
}

export function $dispatch(el, cb) {
    if (!document.querySelector(el)) {
        return;
    }
    cb();
}

export function numberFormat(v, n, x = 3, s = ',', c = null) {
    if (!v) {
        return '0';
    }
    v = Number(v);
    const re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
        num = v.toFixed(Math.max(0, ~~n));

    const r = (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
    return r;
}

export function getTimeRange(day = 30) {
    const start = moment().subtract(day - 1, 'days').format('YYYY-MM-DD');
    const end = moment().format('YYYY-MM-DD');
    return start + '_' + end;
}

export function getTimeRangeAll() {
    const start = moment('2023-09-01').format('YYYY-MM-DD');
    const end = moment().format('YYYY-MM-DD');
    return start + '_' + end;
}

export function cloneObject(obj) {
    return JSON.parse(JSON.stringify(obj));
}

export function clone(item) {
    if (!item) {
        return item;
    } // null, undefined values check

    const types = [Number, String, Boolean];
    let result;

    // normalizing primitives if someone did new String('aaa'), or new Number('444');
    types.forEach(function (type) {
        if (item instanceof type) {
            result = type(item);
        }
    });

    if (typeof result == "undefined") {
        if (Object.prototype.toString.call(item) === "[object Array]") {
            result = [];
            item.forEach(function (child, index, array) {
                result[index] = clone(child);
            });
        } else if (typeof item == "object") {
            // testing that this is DOM
            if (item.nodeType && typeof item.cloneNode == "function") {
                result = item.cloneNode(true);
            } else if (!item.prototype) { // check that this is a literal
                if (item instanceof Date) {
                    result = new Date(item);
                } else {
                    // it is an object literal
                    result = {};
                    for (const i in item) {
                        result[i] = clone(item[i]);
                    }
                }
            } else {
                result = item;
            }
        } else {
            result = item;
        }
    }

    return result;
}

export function parseIntEx(value) {
    if (!value) {
        return 0;
    }

    let ret = 0;
    if (typeof value === 'string') {
        value = value.replace(/,/g, '');
        ret = parseInt(value);
    } else {
        ret = parseInt(value);
    }

    return ret ? ret : 0;
}

export function findIndexBy(field, value, entries) {
    for (let i = 0; i < entries.length; i++) {
        if (entries[i][field] === value) {
            return i;
        }
    }

    return -1;
}

export function flip(array, fillValue = null) {
    if (!Array.isArray(array)) {
        throw new Error("flip failed. Input is not an Array");
    }

    const n = array.length;
    const obj = {};
    if (fillValue) {
        for (let i = 0; i < n; i++) {
            obj[array[i]] = fillValue;
        }
    } else {
        for (let i = 0; i < n; i++) {
            obj[array[i]] = i;
        }
    }

    return obj;
}


export function forEach(obj, cb) {
    if (Array.isArray(obj)) {
        obj.forEach(cb);
        return;
    }

    for (const k in obj) {
        if (objectHasOwn(obj, k)) {
            cb(obj[k], k);
        }
    }
}

/**
 *
 * @param arr Array
 * @param key string
 * @param value string | null
 * @returns {{}}
 */
export function pluck(arr, key = 'id', value = null) {
    if (!Array.isArray(arr)) {
        return {};
    }

    const map = {};
    const len = arr.length;
    for (let i = 0; i < len; i++) {
        map[arr[i][key]] = value === null ? arr[i] : arr[i][value];
    }

    return map;
}

export function ucfirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


export function enqueue(cb) {

}

export function debounce(func, wait = 500, immediate = false) {

}

export function copy(src, target) {
    if (!target) {
        target = Array.isArray(src) ? [] : {};
    }


    // Object.assign() simulate
    for (const k in src) {
        if (objectHasOwn(src, k)) {
            target[k] = src[k];
        }
    }

    return target;
}

export function logWarn(str) {
    console.log('%c[WARNING] ' + str, 'color:purple;font-weight:bold');
}


export function parseJSON(str, defaultValue = {}) {
    try {
        if (!str) {
            return defaultValue;
        }

        if (typeof str !== 'string') {
            return str;
        }

        const obj = JSON.parse(str);
        if (!obj) {
            return defaultValue;
        }
        return obj;
    } catch (e) {
        console.error(e, str);
    }

    return defaultValue;
}

export function stringTruncate(str, length = 100) {
    const dots = str.length > length ? '..' : '';
    return str.substring(0, length) + dots;
}

export function humanFileSize(bytes, si = false, dp = 1) {
    bytes = parseInt(bytes);
    const thresh = si ? 1000 : 1024;

    if (Math.abs(bytes) < thresh) {
        return bytes + ' B';
    }

    const units = si
        ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
        : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
    let u = -1;
    const r = 10 ** dp;

    do {
        bytes /= thresh;
        ++u;
    } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);


    return bytes.toFixed(dp) + ' ' + units[u];
}

export function getFileInfo(filename) {
    const tmp = filename.split('.');
    return {
        basename: tmp[0],
        extension: (tmp[1] || '').toLowerCase()
    };
}


export function equals(obj1, obj2) {
    if (obj1 === obj2) {
        return true;
    }

    const toString = Object.prototype.toString;
    const allowed = {
        '[object Array]': true,
        '[object Object]': true,
    };

    const o1Type = toString.call(obj1);
    const o2Type = toString.call(obj2);

    if (!allowed[o1Type] || !allowed[o2Type]) {
        return false;
    }

    if (o1Type === o2Type) {
        const keys1 = Object.keys(obj1);
        const keys2 = Object.keys(obj2);
        if (keys1.length !== keys2.length) {
            return false;
        }

        const l1 = keys1.length;
        for (let i = 0; i < l1; i++) {
            const k = keys1[i];
            if (!equals(obj1[k], obj2[k])) {
                return false;
            }
        }
        return true;
    }

    return false;
}

export function merge(src, target, keys = null) {
    if (keys === null) {
        keys = Object.keys(src);
    }

    const len = keys.length;
    const diff = {};

    for (let i = 0; i < len; i++) {
        const k = keys[i];
        if (!equals(src[k], target[k])) {
            target[k] = src[k];
            console.log(target);
            diff[k] = src[k];
        }
    }
    if (Object.keys(diff).length) {
        console.log({diff});
    }
    return diff;
}

export function isVueTreeObject(o) {
    if (!o) {
        return false;
    }

    return o.id && o.label;
}

export function isPlainObject(o) {
    return Object.prototype.toString.call(o) === '[object Object]';
}

/**
 * @source https://gist.github.com/hu2di/e80d99051529dbaa7252922baafd40e3
 * @param str
 * @returns {string}
 */
export function removeVietnameseTones(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    // Remove extra spaces
    // Bỏ các khoảng trắng liền nhau
    str = str.replace(/ + /g, " ");
    str = str.trim();
    // Remove punctuations
    // Bỏ dấu câu, kí tự đặc biệt
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|=|<|>|\?|\/|,|\.|:|;|'|"|&|#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ");
    return str;
}


export function intVal(n) {
    return parseInt(n) || 0;
}


export function rtrim(str, charlist) {
    //  discuss at: https://locutus.io/php/rtrim/
    // original by: Kevin van Zonneveld (https://kvz.io)
    //    input by: Erkekjetter
    //    input by: rem
    // improved by: Kevin van Zonneveld (https://kvz.io)
    // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
    // bugfixed by: Brett Zamir (https://brett-zamir.me)
    //   example 1: rtrim('    Kevin van Zonneveld    ')
    //   returns 1: '    Kevin van Zonneveld'

    charlist = !charlist ? ' \\s\u00A0' : (charlist + '')
        .replace(/([[\]().?/*{}+$^:])/g, '\\$1')

    const re = new RegExp('[' + charlist + ']+$', 'g')

    return (str + '').replace(re, '')
}

export function ltrim(str, charlist) {
    //  discuss at: https://locutus.io/php/ltrim/
    // original by: Kevin van Zonneveld (https://kvz.io)
    //    input by: Erkekjetter
    // improved by: Kevin van Zonneveld (https://kvz.io)
    // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
    //   example 1: ltrim('    Kevin van Zonneveld    ')
    //   returns 1: 'Kevin van Zonneveld    '

    charlist = !charlist ? ' \\s\u00A0' : (charlist + '')
        .replace(/([[\]().?/*{}+$^:])/g, '$1')

    const re = new RegExp('^[' + charlist + ']+', 'g')

    return (str + '')
        .replace(re, '')
}

export function trim(str, charlist) {
    //  discuss at: https://locutus.io/php/trim/
    // original by: Kevin van Zonneveld (https://kvz.io)
    // improved by: mdsjack (https://www.mdsjack.bo.it)
    // improved by: Alexander Ermolaev (https://snippets.dzone.com/user/AlexanderErmolaev)
    // improved by: Kevin van Zonneveld (https://kvz.io)
    // improved by: Steven Levithan (https://blog.stevenlevithan.com)
    // improved by: Jack
    //    input by: Erkekjetter
    //    input by: DxGx
    // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
    //   example 1: trim('    Kevin van Zonneveld    ')
    //   returns 1: 'Kevin van Zonneveld'
    //   example 2: trim('Hello World', 'Hdle')
    //   returns 2: 'o Wor'
    //   example 3: trim(16, 1)
    //   returns 3: '6'

    let whitespace = [
        ' ',
        '\n',
        '\r',
        '\t',
        '\f',
        '\x0b',
        '\xa0',
        '\u2000',
        '\u2001',
        '\u2002',
        '\u2003',
        '\u2004',
        '\u2005',
        '\u2006',
        '\u2007',
        '\u2008',
        '\u2009',
        '\u200a',
        '\u200b',
        '\u2028',
        '\u2029',
        '\u3000'
    ].join('')
    let l = 0
    let i = 0
    str += ''

    if (charlist) {
        whitespace = (charlist + '').replace(/([[\]().?/*{}+$^:])/g, '$1')
    }

    l = str.length
    for (i = 0; i < l; i++) {
        if (whitespace.indexOf(str.charAt(i)) === -1) {
            str = str.substring(i)
            break
        }
    }

    l = str.length
    for (i = l - 1; i >= 0; i--) {
        if (whitespace.indexOf(str.charAt(i)) === -1) {
            str = str.substring(0, i + 1)
            break
        }
    }

    return whitespace.indexOf(str.charAt(0)) === -1 ? str : ''
}

export function mb_strlen(str) {
    if (typeof str === 'string') {
        return str.length;
    }

    return 0;
}

export function is_numeric(mixedVar) {
    const whitespace = [
        ' ',
        '\n',
        '\r',
        '\t',
        '\f',
        '\x0b',
        '\xa0',
        '\u2000',
        '\u2001',
        '\u2002',
        '\u2003',
        '\u2004',
        '\u2005',
        '\u2006',
        '\u2007',
        '\u2008',
        '\u2009',
        '\u200a',
        '\u200b',
        '\u2028',
        '\u2029',
        '\u3000'
    ].join('')

    // @todo: Break this up using many single conditions with early returns
    return (typeof mixedVar === 'number' ||
            (typeof mixedVar === 'string' &&
                whitespace.indexOf(mixedVar.slice(-1)) === -1)) &&
        mixedVar !== '' &&
        !isNaN(mixedVar)
}

export function arr(value) {
    if (value == null) {
        return [];
    }

    if (Array.isArray(value)) {
        return value;
    }

    return [value];
}

export function botWarn(message) {
    const d = new Date;
    const time = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
    console.log('%c🤖' + '[' + time + '] ' + message, 'background:#fe9f10;color:#fff;font-size:14px;')
}

export function botInfo(message) {
    const d = new Date;
    const time = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
    console.log('%c🤖' + '[' + time + '] ' + message, 'background:rgb(0, 128, 129);color:#fff;font-size:14px;')
}

/**
 *
 * @param {any} obj
 * @param {Array<string>} paths
 * @param defaultValue
 */
export function getObjectValueByPath(obj, paths, defaultValue) {
    const v = _getObjectValueByPath(obj, paths);
    if (v === undefined) {
        return defaultValue;
    }

    return v;
}

/**
 *
 * @param {any} obj
 * @param {Array<string>} paths
 */
export function _getObjectValueByPath(obj, paths) {
    try {
        if (!Array.isArray(paths)) {
            console.error('GetObjectValueByPath: paths must be an array');
            return undefined;
        }

        return paths.reduce((o, i) => {
            const typeofO = typeof o;
            if (typeofO == null) {
                return null;
            }

            if (typeofO === 'string' || typeofO === 'number') {
                return o;
            }

            if (o instanceof Date) {
                return o.toISOString();
            }

            if (typeofO === 'object') {
                return o[i];
            }

            return o;
        }, obj)
    } catch (err) {

        console.error(err);
    }

    return undefined;
}


export function downloadBlob(blob, filename) {
    const a = document.createElement('a');
    document.body.appendChild(a);

    const url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = filename;
    a.click();

    setTimeout(() => {
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    }, 0)
}
