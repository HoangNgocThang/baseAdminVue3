/**
 * @author quantm.tb@gmail.com
 * @date 11/16/2018.
 */
/**
 * Call middleware recursively
 * @param arr
 * @param index
 * @param param
 * @param done
 * @private
 */
function _middlewareCall(arr, index, param, done) {
    if (index <= arr.length - 1) {
        arr[index](param, function () {
            index++;
            _middlewareCall(arr, index, param, done)
        });
    } else {
        done(param);
    }
}

function SimpleRouter() {

    this.routeCollections = [];
    this.notFounds = [];
    this.middleware = [];

    this.onNotFound = function (cb) {
        this.notFounds.push(cb);
    }

    this.addMiddleware = function (cb) {
        this.middleware.push(cb);
    }

    /**
     * Setting router
     * @param path
     * @param callback
     */
    this.on = function (path, callback) {
        if (Array.isArray(path)) {
            for (var i = 0; i < path.length; i++) {
                this.on(path[i], callback);
            }
            return;
        }
        var routeKeys = [];
        var keyExists = {};

        var regExp = path.replace(/\{\w+\}/g, function (match, contents, s, offset) {
            var key = match.replace(/^\{/, '').replace(/\}$/, '');
            if (keyExists.hasOwnProperty(key)) {
                keyExists[key] = true;
                throw new Error("Duplicate router key: {" + key + "}")
            }
            routeKeys.push(key);
            return '([^/]+)';
        });

        this.routeCollections.push({
            path: path,
            regExp: new RegExp('^' + regExp + '$'),
            callback: callback,
            routeKeys: routeKeys
        });
        return this;
    }

    /**
     * Dispatch router
     * @param uri
     */
    this.dispatch = function (uri) {
        var query = this.getQuery();
        for (var i = 0; i < this.routeCollections.length; i++) {
            var e = this.routeCollections[i];
            var match = uri.match(e.regExp);
            if (match) {
                var routeParams = {};
                for (var k = 0; k < e.routeKeys.length; k++) {
                    routeParams[e.routeKeys[k]] = match[k + 1];
                }

                if (this.middleware.length > 0) {
                    _middlewareCall(this.middleware, 0, routeParams, function () {
                        e.callback(routeParams, query);
                    });

                } else {
                    e.callback(routeParams, query);
                }

                return;
            }
        }

        this.notFounds.forEach(function (cb) {
            cb();
        });
    }

    this.getQuery = function () {
        const  uriParts = location.hash.substr(1).split('?');

        if (uriParts.length === 1) {
            return {};
        }

        const a = uriParts[1].split('&');

        if (a.length === 0) {
            return {};
        }

        const b = {};
        for (let i = 0; i < a.length; ++i) {
            const p = a[i].split('=', 2);
            if (p.length === 1) {
                b[p[0]] = "";
            }
            else {
                b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
            }
        }
        
        return b;
    }

    function buildQuery(data) {
        if (typeof data !== 'object') {
            return '';
        }
        let queries = [];
        for (let k in data) {
            if (data.hasOwnProperty(k)) {
                queries.push(k + '=' + encodeURIComponent(data[k]));
            }
        }
        return queries.join('&');
    }

    this.setQuery = function (data, overwrite) {
        return this.path(this.path().split('?')[0] + '?' + buildQuery(data));
    }

    this.updateQuery = function (data) {
        var currentQuery = this.getQuery();
        var queries = [];
        for (var k in data) {
            if (data.hasOwnProperty(k)) {
                currentQuery[k] = data[k];
            }
        }

        return this.path(this.path().split('?')[0] + '?' + buildQuery(currentQuery));
    }

    this.init = function () {
        var uriParts = location.hash.substr(1).split('?');
        var uri = uriParts[0];
        if (!uri) {
            uri = '/';
        }

        this.dispatch(uri);
        var self = this;

        window.addEventListener('hashchange', function () {
            var uriParts = location.hash.substr(1).split('?');
            var uri = uriParts[0];
            if (!uri) {
                uri = '/';
            }
            self.dispatch(uri);
        });
        // self.dispatch(uri);
    };

    this.path = function (path) {
        if (!path) {
            return location.hash.substr(1);
        }
        location.hash = path;
    }
}

const $router = new SimpleRouter();

export default $router;
