/** vim: et:ts=4:sw=4:sts=4
 * @license RequireJS 2.0.4 Copyright (c) 2010-2012, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */
/*
 * Copyright (c) 2012 Brandon Jones
 *
 * This software is provided 'as-is', without any express or implied
 * warranty. In no event will the authors be held liable for any damages
 * arising from the use of this software.
 *
 * Permission is granted to anyone to use this software for any purpose,
 * including commercial applications, and to alter it and redistribute it
 * freely, subject to the following restrictions:
 *
 *    1. The origin of this software must not be misrepresented; you must not
 *    claim that you wrote the original software. If you use this software
 *    in a product, an acknowledgment in the product documentation would be
 *    appreciated but is not required.
 *
 *    2. Altered source versions must be plainly marked as such, and must not
 *    be misrepresented as being the original software.
 *
 *    3. This notice may not be removed or altered from any source
 *    distribution.
 */
/**
 * @license RequireJS text 2.0.14 Copyright (c) 2010-2014, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/requirejs/text for details
 */
/*
 ** Copyright (c) 2012 The Khronos Group Inc.
 **
 ** Permission is hereby granted, free of charge, to any person obtaining a
 ** copy of this software and/or associated documentation files (the
 ** "Materials"), to deal in the Materials without restriction, including
 ** without limitation the rights to use, copy, modify, merge, publish,
 ** distribute, sublicense, and/or sell copies of the Materials, and to
 ** permit persons to whom the Materials are furnished to do so, subject to
 ** the following conditions:
 **
 ** The above copyright notice and this permission notice shall be included
 ** in all copies or substantial portions of the Materials.
 **
 ** THE MATERIALS ARE PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 ** EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 ** MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 ** IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
 ** CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 ** TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 ** MATERIALS OR THE USE OR OTHER DEALINGS IN THE MATERIALS.
 */
/*
 * Copyright (c) 2012 Brandon Jones, Colin MacKenzie IV
 *
 * This software is provided 'as-is', without any express or implied
 * warranty. In no event will the authors be held liable for any damages
 * arising from the use of this software.
 *
 * Permission is granted to anyone to use this software for any purpose,
 * including commercial applications, and to alter it and redistribute it
 * freely, subject to the following restrictions:
 *
 *    1. The origin of this software must not be misrepresented; you must not
 *    claim that you wrote the original software. If you use this software
 *    in a product, an acknowledgment in the product documentation would be
 *    appreciated but is not required.
 *
 *    2. Altered source versions must be plainly marked as such, and must not
 *    be misrepresented as being the original software.
 *
 *    3. This notice may not be removed or altered from any source
 *    distribution.
 */
var requirejs, require, define;
(function (global) {
    "use strict";

    function isFunction (e) {
        return ostring.call(e) === "[object Function]"
    }

    function isArray(e) {
        return ostring.call(e) === "[object Array]"
    }

    function each(e, t) {
        if (e) {
            var n;
            for (n = 0; n < e.length; n += 1)
                if (e[n] && t(e[n], n, e)) break
        }
    }

    function eachReverse(e, t) {
        if (e) {
            var n;
            for (n = e.length - 1; n > -1; n -= 1)
                if (e[n] && t(e[n], n, e)) break
        }
    }

    function hasProp(e, t) {
        return e.hasOwnProperty(t)
    }

    function eachProp(e, t) {
        var n;
        for (n in e)
            if (e.hasOwnProperty(n) && t(e[n], n)) break
    }

    function mixin(e, t, n, r) {
        return t && eachProp(t, function (t, i) {
            if (n || !hasProp(e, i)) r && typeof t != "string" ? (e[i] || (e[i] = {}), mixin(e[i], t, n, r)) : e[i] = t
        }), e
    }

    function bind(e, t) {
        return function () {
            return t.apply(e, arguments)
        }
    }

    function scripts() {
        return document.getElementsByTagName("script")
    }

    function getGlobal(e) {
        if (!e) return e;
        var t = global;
        return each(e.split("."), function (e) {
            t = t[e]
        }), t
    }

    function makeContextModuleFunc(e, t, n) {
        return function () {
            var r = aps.call(arguments, 0),
                i;
            return n && isFunction (i = r[r.length - 1]) && (i.__requireJsBuild = !0), r.push(t), e.apply(null, r)
        }
    }

    function addRequireMethods(e, t, n) {
        each([
            ["toUrl"],
            ["undef"],
            ["defined", "requireDefined"],
            ["specified", "requireSpecified"]
        ], function (r) {
            var i = r[1] || r[0];
            e[r[0]] = t ? makeContextModuleFunc(t[i], n) : function () {
                var e = contexts[defContextName];
                return e[i].apply(e, arguments)
            }
        })
    }

    function makeError(e, t, n, r) {
        var i = new Error(t + "\nhttp://requirejs.org/docs/errors.html#" + e);
        return i.requireType = e, i.requireModules = r, n && (i.originalError = n), i
    }

    function newContext(e) {
        function v(e) {
            var t, n;
            for (t = 0; e[t]; t += 1) {
                n = e[t];
                if (n === ".") e.splice(t, 1), t -= 1;
                else if (n === "..") {
                    if (t === 1 && (e[2] === ".." || e[0] === "..")) break;
                    t > 0 && (e.splice(t - 1, 2), t -= 2)
                }
            }
        }

        function m(e, n, r) {
            var i = n && n.split("/"),
                s = i,
                o = t.map,
                u = o && o["*"],
                a, f, l, c, h, p, d, m;
            e && e.charAt(0) === "." && (n ? (t.pkgs[n] ? s = i = [n] : s = i.slice(0, i.length - 1), e = s.concat(e.split("/")), v(e), f = t.pkgs[a = e[0]], e = e.join("/"), f && e === a + "/" + f.main && (e = a)) : e.indexOf("./") === 0 && (e = e.substring(2)));
            if (r && (i || u) && o) {
                c = e.split("/");
                for (h = c.length; h > 0; h -= 1) {
                    d = c.slice(0, h).join("/");
                    if (i)
                        for (p = i.length; p > 0; p -= 1) {
                            l = o[i.slice(0, p).join("/")];
                            if (l) {
                                l = l[d];
                                if (l) {
                                    m = l;
                                    break
                                }
                            }
                        }!m && u && u[d] && (m = u[d]);
                    if (m) {
                        c.splice(0, h, m), e = c.join("/");
                        break
                    }
                }
            }
            return e
        }

        function g(e) {
            isBrowser && each(scripts(), function (t) {
                if (t.getAttribute("data-requiremodule") === e && t.getAttribute("data-requirecontext") === h.contextName) return t.parentNode.removeChild(t), !0
            })
        }

        function y(e) {
            var n = t.paths[e];
            if (n && isArray(n) && n.length > 1) return g(e), n.shift(), h.undef(e), h.require([e]), !0
        }

        function b(e, t, n, r) {
            var i = e ? e.indexOf("!") : -1,
                o = null,
                f = t ? t.name : null,
                l = e,
                c = !0,
                p = "",
                d, v, g;
            return e || (c = !1, e = "_@r" + (u += 1)), i !== -1 && (o = e.substring(0, i), e = e.substring(i + 1, e.length)), o && (o = m(o, f, r), v = s[o]), e && (o ? v && v.normalize ? p = v.normalize(e, function (e) {
                return m(e, f, r)
            }) : p = m(e, f, r) : (p = m(e, f, r), d = h.nameToUrl(p))), g = o && !v && !n ? "_unnormalized" + (a += 1) : "", {
                prefix: o,
                name: p,
                parentMap: t,
                unnormalized: !!g,
                url: d,
                originalName: l,
                isDefine: c,
                id: (o ? o + "!" + p : p) + g
            }
        }

        function w(e) {
            var t = e.id,
                r = n[t];
            return r || (r = n[t] = new h.Module(e)), r
        }

        function E(e, t, r) {
            var i = e.id,
                o = n[i];
            hasProp(s, i) && (!o || o.defineEmitComplete) ? t === "defined" && r(s[i]) : w(e).on(t, r)
        }

        function S(e, t) {
            var r = e.requireModules,
                i = !1;
            t ? t(e) : (each(r, function (t) {
                var r = n[t];
                r && (r.error = e, r.events.error && (i = !0, r.emit("error", e)))
            }), i || req.onError(e))
        }

        function x() {
            globalDefQueue.length && (apsp.apply(i, [i.length - 1, 0].concat(globalDefQueue)), globalDefQueue = [])
        }

        function T(e, t, n) {
            var r = e && e.map,
                i = makeContextModuleFunc(n || h.require, r, t);
            return addRequireMethods(i, h, r), i.isBrowser = isBrowser, i
        }

        function N(e) {
            delete n[e], each(f, function (t, n) {
                if (t.map.id === e) return f.splice(n, 1), t.defined || (h.waitCount -= 1), !0
            })
        }

        function C(e, t) {
            var r = e.map.id,
                i = e.depMaps,
                s;
            if (!e.inited) return;
            return t[r] ? e : (t[r] = !0, each(i, function (e) {
                var i = e.id,
                    o = n[i];
                if (!o) return;
                return !o.inited || !o.enabled ? (s = null, delete t[r], !0) : s = C(o, mixin({}, t))
            }), s)
        }

        function k(e, t, r) {
            var i = e.map.id,
                o = e.depMaps;
            if (!e.inited || !e.map.isDefine) return;
            return t[i] ? s[i] : (t[i] = e, each(o, function (s) {
                var o = s.id,
                    u = n[o],
                    a;
                if (p[o]) return;
                if (u) {
                    if (!u.inited || !u.enabled) {
                        r[i] = !0;
                        return
                    }
                    a = k(u, t, r), r[o] || e.defineDepById(o, a)
                }
            }), e.check(!0), s[i])
        }

        function L(e) {
            e.check()
        }

        function A() {
            var e = t.waitSeconds * 1e3,
                r = e && h.startTime + e < (new Date).getTime(),
                i = [],
                s = !1,
                o = !0,
                u, a, c, p;
            if (l) return;
            l = !0, eachProp(n, function (e) {
                u = e.map, a = u.id;
                if (!e.enabled) return;
                if (!e.error)
                    if (!e.inited && r) y(a) ? (p = !0, s = !0) : (i.push(a), g(a));
                    else if (!e.inited && e.fetched && u.isDefine) {
                    s = !0;
                    if (!u.prefix) return o = !1
                }
            });
            if (r && i.length) return c = makeError("timeout", "Load timeout for modules: " + i, null, i), c.contextName = h.contextName, S(c);
            o && (each(f, function (e) {
                if (e.defined) return;
                var t = C(e, {}),
                    n = {};
                t && (k(t, n, {}), eachProp(n, L))
            }), eachProp(n, L)), (!r || p) && s && (isBrowser || isWebWorker) && !d && (d = setTimeout(function () {
                d = 0, A()
            }, 50)), l = !1
        }

        function O(e) {
            w(b(e[0], null, !0)).init(e[1], e[2])
        }

        function M(e, t, n, r) {
            e.detachEvent && !isOpera ? r && e.detachEvent(r, t) : e.removeEventListener(n, t, !1)
        }

        function _(e) {
            var t = e.currentTarget || e.srcElement;
            return M(t, h.onScriptLoad, "load", "onreadystatechange"), M(t, h.onScriptError, "error"), {
                node: t,
                id: t && t.getAttribute("data-requiremodule")
            }
        }
        var t = {
                waitSeconds: 7,
                baseUrl: "./",
                paths: {},
                pkgs: {},
                shim: {}
            },
            n = {},
            r = {},
            i = [],
            s = {},
            o = {},
            u = 1,
            a = 1,
            f = [],
            l, c, h, p, d;
        return p = {
            require: function (e) {
                return T(e)
            },
            exports: function (e) {
                e.usingExports = !0;
                if (e.map.isDefine) return e.exports = s[e.map.id] = {}
            },
            module: function (e) {
                return e.module = {
                    id: e.map.id,
                    uri: e.map.url,
                    config: function () {
                        return t.config && t.config[e.map.id] || {}
                    },
                    exports: s[e.map.id]
                }
            }
        }, c = function (e) {
            this.events = r[e.id] || {}, this.map = e, this.shim = t.shim[e.id], this.depExports = [], this.depMaps = [], this.depMatched = [], this.pluginMaps = {}, this.depCount = 0
        }, c.prototype = {
            init: function (e, t, n, r) {
                r = r || {};
                if (this.inited) return;
                this.factory = t, n ? this.on("error", n) : this.events.error && (n = bind(this, function (e) {
                    this.emit("error", e)
                })), this.depMaps = e && e.slice(0), this.depMaps.rjsSkipMap = e.rjsSkipMap, this.errback = n, this.inited = !0, this.ignore = r.ignore, r.enabled || this.enabled ? this.enable() : this.check()
            },
            defineDepById: function (e, t) {
                var n;
                return each(this.depMaps, function (t, r) {
                    if (t.id === e) return n = r, !0
                }), this.defineDep(n, t)
            },
            defineDep: function (e, t) {
                this.depMatched[e] || (this.depMatched[e] = !0, this.depCount -= 1, this.depExports[e] = t)
            },
            fetch: function () {
                if (this.fetched) return;
                this.fetched = !0, h.startTime = (new Date).getTime();
                var e = this.map;
                if (!this.shim) return e.prefix ? this.callPlugin() : this.load();
                T(this, !0)(this.shim.deps || [], bind(this, function () {
                    return e.prefix ? this.callPlugin() : this.load()
                }))
            },
            load: function () {
                var e = this.map.url;
                o[e] || (o[e] = !0, h.load(this.map.id, e))
            },
            check: function (e) {
                if (!this.enabled || this.enabling) return;
                var t = this.map.id,
                    r = this.depExports,
                    i = this.exports,
                    o = this.factory,
                    u, a;
                if (!this.inited) this.fetch();
                else if (this.error) this.emit("error", this.error);
                else if (!this.defining) {
                    this.defining = !0;
                    if (this.depCount < 1 && !this.defined) {
                        if (isFunction (o)) {
                            if (this.events.error) try {
                                i = h.execCb(t, o, r, i)
                            } catch (l) {
                                u = l
                            } else i = h.execCb(t, o, r, i);
                            this.map.isDefine && (a = this.module, a && a.exports !== undefined && a.exports !== this.exports ? i = a.exports : i === undefined && this.usingExports && (i = this.exports));
                            if (u) return u.requireMap = this.map, u.requireModules = [this.map.id], u.requireType = "define", S(this.error = u)
                        } else i = o;
                        this.exports = i, this.map.isDefine && !this.ignore && (s[t] = i, req.onResourceLoad && req.onResourceLoad(h, this.map, this.depMaps)), delete n[t], this.defined = !0, h.waitCount -= 1, h.waitCount === 0 && (f = [])
                    }
                    this.defining = !1, e || this.defined && !this.defineEmitted && (this.defineEmitted = !0, this.emit("defined", this.exports), this.defineEmitComplete = !0)
                }
            },
            callPlugin: function () {
                var e = this.map,
                    r = e.id,
                    i = b(e.prefix, null, !1, !0);
                E(i, "defined", bind(this, function (i) {
                    var s = this.map.name,
                        o = this.map.parentMap ? this.map.parentMap.name : null,
                        u, a, f;
                    if (this.map.unnormalized) {
                        i.normalize && (s = i.normalize(s, function (e) {
                            return m(e, o, !0)
                        }) || ""), a = b(e.prefix + "!" + s, this.map.parentMap, !1, !0), E(a, "defined", bind(this, function (e) {
                            this.init([], function () {
                                return e
                            }, null, {
                                enabled: !0,
                                ignore: !0
                            })
                        })), f = n[a.id], f && (this.events.error && f.on("error", bind(this, function (e) {
                            this.emit("error", e)
                        })), f.enable());
                        return
                    }
                    u = bind(this, function (e) {
                        this.init([], function () {
                            return e
                        }, null, {
                            enabled: !0
                        })
                    }), u.error = bind(this, function (e) {
                        this.inited = !0, this.error = e, e.requireModules = [r], eachProp(n, function (e) {
                            e.map.id.indexOf(r + "_unnormalized") === 0 && N(e.map.id)
                        }), S(e)
                    }), u.fromText = function (e, t) {
                        var n = useInteractive;
                        n && (useInteractive = !1), w(b(e)), req.exec(t), n && (useInteractive = !0), h.completeLoad(e)
                    }, i.load(e.name, T(e.parentMap, !0, function (e, t) {
                        return e.rjsSkipMap = !0, h.require(e, t)
                    }), u, t)
                })), h.enable(i, this), this.pluginMaps[i.id] = i
            },
            enable: function () {
                this.enabled = !0, this.waitPushed || (f.push(this), h.waitCount += 1, this.waitPushed = !0), this.enabling = !0, each(this.depMaps, bind(this, function (e, t) {
                    var r, i, s;
                    if (typeof e == "string") {
                        e = b(e, this.map.isDefine ? this.map : this.map.parentMap, !1, !this.depMaps.rjsSkipMap), this.depMaps[t] = e, s = p[e.id];
                        if (s) {
                            this.depExports[t] = s(this);
                            return
                        }
                        this.depCount += 1, E(e, "defined", bind(this, function (e) {
                            this.defineDep(t, e), this.check()
                        })), this.errback && E(e, "error", this.errback)
                    }
                    r = e.id, i = n[r], !p[r] && i && !i.enabled && h.enable(e, this)
                })), eachProp(this.pluginMaps, bind(this, function (e) {
                    var t = n[e.id];
                    t && !t.enabled && h.enable(e, this)
                })), this.enabling = !1, this.check()
            },
            on: function (e, t) {
                var n = this.events[e];
                n || (n = this.events[e] = []), n.push(t)
            },
            emit: function (e, t) {
                each(this.events[e], function (e) {
                    e(t)
                }), e === "error" && delete this.events[e]
            }
        }, h = {
            config: t,
            contextName: e,
            registry: n,
            defined: s,
            urlFetched: o,
            waitCount: 0,
            defQueue: i,
            Module: c,
            makeModuleMap: b,
            configure: function (e) {
                e.baseUrl && e.baseUrl.charAt(e.baseUrl.length - 1) !== "/" && (e.baseUrl += "/");
                var r = t.pkgs,
                    i = t.shim,
                    s = t.paths,
                    o = t.map;
                mixin(t, e, !0), t.paths = mixin(s, e.paths, !0), e.map && (t.map = mixin(o || {}, e.map, !0, !0)), e.shim && (eachProp(e.shim, function (e, t) {
                    isArray(e) && (e = {
                        deps: e
                    }), e.exports && !e.exports.__buildReady && (e.exports = h.makeShimExports(e.exports)), i[t] = e
                }), t.shim = i), e.packages && (each(e.packages, function (e) {
                    var t;
                    e = typeof e == "string" ? {
                        name: e
                    } : e, t = e.location, r[e.name] = {
                        name: e.name,
                        location: t || e.name,
                        main: (e.main || "main").replace(currDirRegExp, "").replace(jsSuffixRegExp, "")
                    }
                }), t.pkgs = r), eachProp(n, function (e, t) {
                    e.map = b(t)
                }), (e.deps || e.callback) && h.require(e.deps || [], e.callback)
            },
            makeShimExports: function (e) {
                var t;
                return typeof e == "string" ? (t = function () {
                    return getGlobal(e)
                }, t.exports = e, t) : function () {
                    return e.apply(global, arguments)
                }
            },
            requireDefined: function (e, t) {
                return hasProp(s, b(e, t, !1, !0).id)
            },
            requireSpecified: function (e, t) {
                return e = b(e, t, !1, !0).id, hasProp(s, e) || hasProp(n, e)
            },
            require: function (t, n, r, o) {
                var u, a, f, l, c;
                if (typeof t == "string") return isFunction (n) ? S(makeError("requireargs", "Invalid require call"), r) : req.get ? req.get(h, t, n) : (u = t, o = n, f = b(u, o, !1, !0), a = f.id, hasProp(s, a) ? s[a] : S(makeError("notloaded", 'Module name "' + a + '" has not been loaded yet for context: ' + e)));
                r && !isFunction (r) && (o = r, r = undefined), n && !isFunction (n) && (o = n, n = undefined), x();
                while (i.length) {
                    c = i.shift();
                    if (c[0] === null) return S(makeError("mismatch", "Mismatched anonymous define() module: " + c[c.length - 1]));
                    O(c)
                }
                return l = w(b(null, o)), l.init(t, n, r, {
                    enabled: !0
                }), A(), h.require
            },
            undef: function (e) {
                var t = b(e, null, !0),
                    i = n[e];
                delete s[e], delete o[t.url], delete r[e], i && (i.events.defined && (r[e] = i.events), N(e))
            },
            enable: function (e, t) {
                var r = n[e.id];
                r && w(e).enable()
            },
            completeLoad: function (e) {
                var r = t.shim[e] || {},
                    o = r.exports && r.exports.exports,
                    u, a, f;
                x();
                while (i.length) {
                    a = i.shift();
                    if (a[0] === null) {
                        a[0] = e;
                        if (u) break;
                        u = !0
                    } else a[0] === e && (u = !0);
                    O(a)
                }
                f = n[e];
                if (!u && !s[e] && f && !f.inited) {
                    if (t.enforceDefine && (!o || !getGlobal(o))) {
                        if (y(e)) return;
                        return S(makeError("nodefine", "No define call for " + e, null, [e]))
                    }
                    O([e, r.deps || [], r.exports])
                }
                A()
            },
            toUrl: function (e, t) {
                var n = e.lastIndexOf("."),
                    r = null;
                return n !== -1 && (r = e.substring(n, e.length), e = e.substring(0, n)), h.nameToUrl(m(e, t && t.id, !0), r)
            },
            nameToUrl: function (e, n) {
                var r, i, s, o, u, a, f, l, c;
                if (req.jsExtRegExp.test(e)) l = e + (n || "");
                else {
                    r = t.paths, i = t.pkgs, u = e.split("/");
                    for (a = u.length; a > 0; a -= 1) {
                        f = u.slice(0, a).join("/"), s = i[f], c = r[f];
                        if (c) {
                            isArray(c) && (c = c[0]), u.splice(0, a, c);
                            break
                        }
                        if (s) {
                            e === s.name ? o = s.location + "/" + s.main : o = s.location, u.splice(0, a, o);
                            break
                        }
                    }
                    l = u.join("/") + (n || ".js"), l = (l.charAt(0) === "/" || l.match(/^[\w\+\.\-]+:/) ? "" : t.baseUrl) + l
                }
                return t.urlArgs ? l + ((l.indexOf("?") === -1 ? "?" : "&") + t.urlArgs) : l
            },
            load: function (e, t) {
                req.load(h, e, t)
            },
            execCb: function (e, t, n, r) {
                return t.apply(r, n)
            },
            onScriptLoad: function (e) {
                if (e.type === "load" || readyRegExp.test((e.currentTarget || e.srcElement).readyState)) {
                    interactiveScript = null;
                    var t = _(e);
                    h.completeLoad(t.id)
                }
            },
            onScriptError: function (e) {
                var t = _(e);
                if (!y(t.id)) return S(makeError("scripterror", "Script error", e, [t.id]))
            }
        }
    }

    function getInteractiveScript() {
        return interactiveScript && interactiveScript.readyState === "interactive" ? interactiveScript : (eachReverse(scripts(), function (e) {
            if (e.readyState === "interactive") return interactiveScript = e
        }), interactiveScript)
    }
    var version = "2.0.4",
        commentRegExp = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg,
        cjsRequireRegExp = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,
        jsSuffixRegExp = /\.js$/,
        currDirRegExp = /^\.\//,
        ostring = Object.prototype.toString,
        ap = Array.prototype,
        aps = ap.slice,
        apsp = ap.splice,
        isBrowser = typeof window != "undefined" && !!navigator && !!document,
        isWebWorker = !isBrowser && typeof importScripts != "undefined",
        readyRegExp = isBrowser && navigator.platform === "PLAYSTATION 3" ? /^complete$/ : /^(complete|loaded)$/,
        defContextName = "_",
        isOpera = typeof opera != "undefined" && opera.toString() === "[object Opera]",
        contexts = {},
        cfg = {},
        globalDefQueue = [],
        useInteractive = !1,
        req, s, head, baseElement, dataMain, src, interactiveScript, currentlyAddingScript, mainScript, subPath;
    if (typeof define != "undefined") return;
    if (typeof requirejs != "undefined") {
        if (isFunction (requirejs)) return;
        cfg = requirejs, requirejs = undefined
    }
    typeof require != "undefined" && !isFunction (require) && (cfg = require, require = undefined), req = requirejs = function (e, t, n, r) {
        var i = defContextName,
            s, o;
        return !isArray(e) && typeof e != "string" && (o = e, isArray(t) ? (e = t, t = n, n = r) : e = []), o && o.context && (i = o.context), s = contexts[i], s || (s = contexts[i] = req.s.newContext(i)), o && s.configure(o), s.require(e, t, n)
    }, req.config = function (e) {
        return req(e)
    }, require || (require = req), req.version = version, req.jsExtRegExp = /^\/|:|\?|\.js$/, req.isBrowser = isBrowser, s = req.s = {
        contexts: contexts,
        newContext: newContext
    }, req({}), addRequireMethods(req), isBrowser && (head = s.head = document.getElementsByTagName("head")[0], baseElement = document.getElementsByTagName("base")[0], baseElement && (head = s.head = baseElement.parentNode)), req.onError = function (e) {
        throw e
    }, req.load = function (e, t, n) {
        var r = e && e.config || {},
            i;
        if (isBrowser) return i = r.xhtml ? document.createElementNS("http://www.w3.org/1999/xhtml", "html:script") : document.createElement("script"), i.type = r.scriptType || "text/javascript", i.charset = "utf-8", i.async = !0, i.setAttribute("data-requirecontext", e.contextName), i.setAttribute("data-requiremodule", t), i.attachEvent && !(i.attachEvent.toString && i.attachEvent.toString().indexOf("[native code") < 0) && !isOpera ? (useInteractive = !0, i.attachEvent("onreadystatechange", e.onScriptLoad)) : (i.addEventListener("load", e.onScriptLoad, !1), i.addEventListener("error", e.onScriptError, !1)), i.src = n, currentlyAddingScript = i, baseElement ? head.insertBefore(i, baseElement) : head.appendChild(i), currentlyAddingScript = null, i;
        isWebWorker && (importScripts(n), e.completeLoad(t))
    }, isBrowser && eachReverse(scripts(), function (e) {
        head || (head = e.parentNode), dataMain = e.getAttribute("data-main");
        if (dataMain) return cfg.baseUrl || (src = dataMain.split("/"), mainScript = src.pop(), subPath = src.length ? src.join("/") + "/" : "./", cfg.baseUrl = subPath, dataMain = mainScript), dataMain = dataMain.replace(jsSuffixRegExp, ""), cfg.deps = cfg.deps ? cfg.deps.concat(dataMain) : [dataMain], !0
    }), define = function (e, t, n) {
        var r, i;
        typeof e != "string" && (n = t, t = e, e = null), isArray(t) || (n = t, t = []), !t.length && isFunction (n) && n.length && (n.toString().replace(commentRegExp, "").replace(cjsRequireRegExp, function (e, n) {
            t.push(n)
        }), t = (n.length === 1 ? ["require"] : ["require", "exports", "module"]).concat(t)), useInteractive && (r = currentlyAddingScript || getInteractiveScript(), r && (e || (e = r.getAttribute("data-requiremodule")), i = contexts[r.getAttribute("data-requirecontext")])), (i ? i.defQueue : globalDefQueue).push([e, t, n])
    }, define.amd = {
        jQuery: !0
    }, req.exec = function (text) {
        return eval(text)
    }, req(cfg)
})(this), define("../lib/require", function () {}),
    function (e) {
        function i(e) {
            var t = document.createEvent("CustomEvent");
            t.initCustomEvent("fullscreenchange", !0, !1, null), document.dispatchEvent(t)
        }

        function s(e) {
            var t = document.createEvent("CustomEvent");
            t.initCustomEvent("fullscreenerror", !0, !1, null), document.dispatchEvent(t)
        }

        function u(e) {
            var t = document.createEvent("CustomEvent");
            t.initCustomEvent("pointerlockchange", !0, !1, null), document.dispatchEvent(t)
        }

        function a(e) {
            var t = document.createEvent("CustomEvent");
            t.initCustomEvent("pointerlockerror", !0, !1, null), document.dispatchEvent(t)
        }
        var t = (e.HTMLElement || e.Element).prototype,
            n, r = e.GameShim = {
                supports: {
                    fullscreen: !0,
                    pointerLock: !0,
                    gamepad: !0,
                    highResTimer: !0
                }
            };
        (function () {
            var e = 0,
                t = ["webkit", "moz", "ms", "o"],
                r;
            for (r = 0; r < t.length && !window.requestAnimationFrame; ++r) window.requestAnimationFrame = window[t[r] + "RequestAnimationFrame"];
            window.cancelAnimationFrame = window.cancelAnimationFrame || window.cancelRequestAnimationFrame;
            for (r = 0; r < t.length && !window.cancelAnimationFrame; ++r) window.cancelAnimationFrame = window[t[r] + "CancelAnimationFrame"] || window[t[r] + "CancelRequestAnimationFrame"];
            window.requestAnimationFrame || (window.requestAnimationFrame = function (t, n) {
                var r = Date.now(),
                    i = Math.max(0, 16 - (r - e)),
                    s = window.setTimeout(function () {
                        t(r + i)
                    }, i);
                return e = r + i, s
            }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function (e) {
                clearTimeout(e)
            }), window.animationStartTime || (n = function () {
                for (r = 0; r < t.length; ++r)
                    if (window[t[r] + "AnimationStartTime"]) return function () {
                        return window[t[r] + "AnimationStartTime"]
                    };
                return function () {
                    return Date.now()
                }
            }(), Object.defineProperty(window, "animationStartTime", {
                enumerable: !0,
                configurable: !1,
                writeable: !1,
                get: n
            }))
        })(), document.hasOwnProperty("fullscreenEnabled") || (n = function () {
            return "webkitIsFullScreen" in document ? function () {
                return webkitRequestFullScreen in document
            } : "mozFullScreenEnabled" in document ? function () {
                return document.mozFullScreenEnabled
            } : (r.supports.fullscreen = !1, function () {
                return !1
            })
        }(), Object.defineProperty(document, "fullscreenEnabled", {
            enumerable: !0,
            configurable: !1,
            writeable: !1,
            get: n
        })), document.hasOwnProperty("fullscreenElement") || (n = function () {
            var e = 0,
                t = ["webkitCurrentFullScreenElement", "webkitFullscreenElement", "mozFullScreenElement"];
            for (; e < t.length; e++)
                if (t[e] in document) return function () {
                    return document[t[e]]
                };
            return function () {
                return null
            }
        }(), Object.defineProperty(document, "fullscreenElement", {
            enumerable: !0,
            configurable: !1,
            writeable: !1,
            get: n
        })), document.addEventListener("webkitfullscreenchange", i, !1), document.addEventListener("mozfullscreenchange", i, !1), document.addEventListener("webkitfullscreenerror", s, !1), document.addEventListener("mozfullscreenerror", s, !1), t.requestFullscreen || (t.requestFullscreen = function () {
            return t.webkitRequestFullScreen ? function () {
                this.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT)
            } : t.mozRequestFullScreen ? function () {
                this.mozRequestFullScreen()
            } : function () {}
        }()), document.exitFullscreen || (document.exitFullscreen = function () {
            return document.webkitExitFullscreen || document.mozCancelFullScreen || function () {}
        }());
        var o = e.MouseEvent.prototype;
        "movementX" in o || Object.defineProperty(o, "movementX", {
            enumerable: !0,
            configurable: !1,
            writeable: !1,
            get: function () {
                return this.webkitMovementX || this.mozMovementX || 0
            }
        }), "movementY" in o || Object.defineProperty(o, "movementY", {
            enumerable: !0,
            configurable: !1,
            writeable: !1,
            get: function () {
                return this.webkitMovementY || this.mozMovementY || 0
            }
        }), navigator.pointer || (navigator.pointer = navigator.webkitPointer || navigator.mozPointer), document.addEventListener("webkitpointerlockchange", u, !1), document.addEventListener("webkitpointerlocklost", u, !1), document.addEventListener("mozpointerlockchange", u, !1), document.addEventListener("mozpointerlocklost", u, !1), document.addEventListener("webkitpointerlockerror", a, !1), document.addEventListener("mozpointerlockerror", a, !1), document.hasOwnProperty("pointerLockElement") || (n = function () {
            return "webkitPointerLockElement" in document ? function () {
                return document.webkitPointerLockElement
            } : "mozPointerLockElement" in document ? function () {
                return document.mozPointerLockElement
            } : function () {
                return null
            }
        }(), Object.defineProperty(document, "pointerLockElement", {
            enumerable: !0,
            configurable: !1,
            writeable: !1,
            get: n
        })), t.requestPointerLock || (t.requestPointerLock = function () {
            return t.webkitRequestPointerLock ? function () {
                this.webkitRequestPointerLock()
            } : t.mozRequestPointerLock ? function () {
                this.mozRequestPointerLock()
            } : navigator.pointer ? function () {
                var e = this;
                navigator.pointer.lock(e, u, a)
            } : (r.supports.pointerLock = !1, function () {})
        }()), document.exitPointerLock || (document.exitPointerLock = function () {
            return document.webkitExitPointerLock || document.mozExitPointerLock || function () {
                if (navigator.pointer) {
                    var e = this;
                    navigator.pointer.unlock()
                }
            }
        }()), navigator.gamepads || (n = function () {
            if ("webkitGamepads" in navigator) return function () {
                return navigator.webkitGamepads
            };
            if ("mozGamepads" in navigator) return function () {
                return navigator.mozGamepads
            };
            r.supports.gamepad = !1;
            var e = [];
            return function () {
                return e
            }
        }(), Object.defineProperty(navigator, "gamepads", {
            enumerable: !0,
            configurable: !1,
            writeable: !1,
            get: n
        })), window.performance || (window.performance = {}), window.performance.timing || (window.performance.timing = {
            navigationStart: Date.now()
        }), window.performance.now || (window.performance.now = function () {
            return window.performance.webkitNow ? window.performance.webkitNow : (r.supports.highResTimer = !1, function () {
                return Date.now() - window.performance.timing.navigationStart
            })
        }())
    }(typeof exports != "undefined" ? global : window), define("game-shim", function () {}), define("text", ["module"], function (e) {
        "use strict";
        var t, n, r, i, s, o = ["Msxml2.XMLHTTP", "Microsoft.XMLHTTP", "Msxml2.XMLHTTP.4.0"],
            u = /^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,
            a = /<body[^>]*>\s*([\s\S]+)\s*<\/body>/im,
            f = typeof location != "undefined" && location.href,
            l = f && location.protocol && location.protocol.replace(/\:/, ""),
            c = f && location.hostname,
            h = f && (location.port || undefined),
            p = {},
            d = e.config && e.config() || {};
        t = {
            version: "2.0.14",
            strip: function (e) {
                if (e) {
                    e = e.replace(u, "");
                    var t = e.match(a);
                    t && (e = t[1])
                } else e = "";
                return e
            },
            jsEscape: function (e) {
                return e.replace(/(['\\])/g, "\\$1").replace(/[\f]/g, "\\f").replace(/[\b]/g, "\\b").replace(/[\n]/g, "\\n").replace(/[\t]/g, "\\t").replace(/[\r]/g, "\\r").replace(/[\u2028]/g, "\\u2028").replace(/[\u2029]/g, "\\u2029")
            },
            createXhr: d.createXhr || function () {
                var e, t, n;
                if (typeof XMLHttpRequest != "undefined") return new XMLHttpRequest;
                if (typeof ActiveXObject != "undefined")
                    for (t = 0; t < 3; t += 1) {
                        n = o[t];
                        try {
                            e = new ActiveXObject(n)
                        } catch (r) {}
                        if (e) {
                            o = [n];
                            break
                        }
                    }
                return e
            },
            parseName: function (e) {
                var t, n, r, i = !1,
                    s = e.lastIndexOf("."),
                    o = e.indexOf("./") === 0 || e.indexOf("../") === 0;
                return s !== -1 && (!o || s > 1) ? (t = e.substring(0, s), n = e.substring(s + 1)) : t = e, r = n || t, s = r.indexOf("!"), s !== -1 && (i = r.substring(s + 1) === "strip", r = r.substring(0, s), n ? n = r : t = r), {
                    moduleName: t,
                    ext: n,
                    strip: i
                }
            },
            xdRegExp: /^((\w+)\:)?\/\/([^\/\\]+)/,
            useXhr: function (e, n, r, i) {
                var s, o, u, a = t.xdRegExp.exec(e);
                return a ? (s = a[2], o = a[3], o = o.split(":"), u = o[1], o = o[0], (!s || s === n) && (!o || o.toLowerCase() === r.toLowerCase()) && (!u && !o || u === i)) : !0
            },
            finishLoad: function (e, n, r, i) {
                r = n ? t.strip(r) : r, d.isBuild && (p[e] = r), i(r)
            },
            load: function (e, n, r, i) {
                if (i && i.isBuild && !i.inlineText) {
                    r();
                    return
                }
                d.isBuild = i && i.isBuild;
                var s = t.parseName(e),
                    o = s.moduleName + (s.ext ? "." + s.ext : ""),
                    u = n.toUrl(o),
                    a = d.useXhr || t.useXhr;
                if (u.indexOf("empty:") === 0) {
                    r();
                    return
                }!f || a(u, l, c, h) ? t.get(u, function (n) {
                    t.finishLoad(e, s.strip, n, r)
                }, function (e) {
                    r.error && r.error(e)
                }) : n([o], function (e) {
                    t.finishLoad(s.moduleName + "." + s.ext, s.strip, e, r)
                })
            },
            write: function (e, n, r, i) {
                if (p.hasOwnProperty(n)) {
                    var s = t.jsEscape(p[n]);
                    r.asModule(e + "!" + n, "define(function () { return '" + s + "';});\n")
                }
            },
            writeFile: function (e, n, r, i, s) {
                var o = t.parseName(n),
                    u = o.ext ? "." + o.ext : "",
                    a = o.moduleName + u,
                    f = r.toUrl(o.moduleName + u) + ".js";
                t.load(a, r, function (n) {
                    var r = function (e) {
                        return i(f, e)
                    };
                    r.asModule = function (e, t) {
                        return i.asModule(e, f, t)
                    }, t.write(e, a, r, s)
                }, s)
            }
        };
        if (d.env === "node" || !d.env && typeof process != "undefined" && process.versions && !!process.versions.node && !process.versions["node-webkit"] && !process.versions["atom-shell"]) n = require.nodeRequire("fs"), t.get = function (e, t, r) {
            try {
                var i = n.readFileSync(e, "utf8");
                i[0] === "ï»¿" && (i = i.substring(1)), t(i)
            } catch (s) {
                r && r(s)
            }
        };
        else if (d.env === "xhr" || !d.env && t.createXhr()) t.get = function (e, n, r, i) {
            var s = t.createXhr(),
                o;
            s.open("GET", e, !0);
            if (i)
                for (o in i) i.hasOwnProperty(o) && s.setRequestHeader(o.toLowerCase(), i[o]);
            d.onXhr && d.onXhr(s, e), s.onreadystatechange = function (t) {
                var i, o;
                s.readyState === 4 && (i = s.status || 0, i > 399 && i < 600 ? (o = new Error(e + " HTTP status: " + i), o.xhr = s, r && r(o)) : n(s.responseText), d.onXhrComplete && d.onXhrComplete(s, e))
            }, s.send(null)
        };
        else if (d.env === "rhino" || !d.env && typeof Packages != "undefined" && typeof java != "undefined") t.get = function (e, t) {
            var n, r, i = "utf-8",
                s = new java.io.File(e),
                o = java.lang.System.getProperty("line.separator"),
                u = new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(s), i)),
                a = "";
            try {
                n = new java.lang.StringBuffer, r = u.readLine(), r && r.length() && r.charAt(0) === 65279 && (r = r.substring(1)), r !== null && n.append(r);
                while ((r = u.readLine()) !== null) n.append(o), n.append(r);
                a = String(n.toString())
            } finally {
                u.close()
            }
            t(a)
        };
        else if (d.env === "xpconnect" || !d.env && typeof Components != "undefined" && Components.classes && Components.interfaces) r = Components.classes, i = Components.interfaces, Components.utils["import"]("resource://gre/modules/FileUtils.jsm"), s = "@mozilla.org/windows-registry-key;1" in r, t.get = function (e, t) {
            var n, o, u, a = {};
            s && (e = e.replace(/\//g, "\\")), u = new FileUtils.File(e);
            try {
                n = r["@mozilla.org/network/file-input-stream;1"].createInstance(i.nsIFileInputStream), n.init(u, 1, 0, !1), o = r["@mozilla.org/intl/converter-input-stream;1"].createInstance(i.nsIConverterInputStream), o.init(n, "utf-8", n.available(), i.nsIConverterInputStream.DEFAULT_REPLACEMENT_CHARACTER), o.readString(n.available(), a), o.close(), n.close(), t(a.value)
            } catch (f) {
                throw new Error((u && u.path || "") + ": " + f)
            }
        };
        return t
    }), define("text!shaders/advect.frag", [], function () {
        return "precision highp float;\nuniform sampler2D source;\nuniform sampler2D velocity;\nuniform float dt;\nuniform float scale;\nuniform vec2 px1;\nvarying vec2 uv;\nuniform float tension;\n\nvoid main(){\n    gl_FragColor = texture2D(source, uv-texture2D(velocity, uv).xy*dt*px1)*scale*tension;\n}\n"
    }), define("text!shaders/addForce.frag", [], function () {
        return "precision highp float;\n\nuniform vec2 force;\nuniform vec2 center;\nuniform vec2 scale;\nuniform vec2 px;\nvarying vec2 uv;\n\nvoid main(){\n    float distance_ = 1.0-min(length((uv-center)/scale), 1.0);\n    gl_FragColor = vec4(force*distance_, 0, 1);\n}\n"
    }), define("text!shaders/divergence.frag", [], function () {
        return "precision highp float;\nuniform sampler2D velocity;\nuniform float dt;\nuniform vec2 px;\nvarying vec2 uv;\nuniform float divergenceMagnifier;\n\nvoid main(){\n    float x0 = texture2D(velocity, uv-vec2(px.x, 0)).x;\n    float x1 = texture2D(velocity, uv+vec2(px.x, 0)).x;\n    float y0 = texture2D(velocity, uv-vec2(0, px.y)).y;\n    float y1 = texture2D(velocity, uv+vec2(0, px.y)).y;\n    float divergence = (x1-x0 + y1-y0)*divergenceMagnifier;\n    gl_FragColor = vec4(divergence);\n}\n"
    }), define("text!shaders/jacobi.frag", [], function () {
        return "precision highp float;\nuniform sampler2D pressure;\nuniform sampler2D divergence;\nuniform float alpha;\nuniform float beta;\nuniform vec2 px;\nvarying vec2 uv;\n\nvoid main(){\n    float x0 = texture2D(pressure, uv-vec2(px.x, 0)).r;\n    float x1 = texture2D(pressure, uv+vec2(px.x, 0)).r;\n    float y0 = texture2D(pressure, uv-vec2(0, px.y)).r;\n    float y1 = texture2D(pressure, uv+vec2(0, px.y)).r;\n    float d = texture2D(divergence, uv).r;\n    float relaxed = (x0 + x1 + y0 + y1 + alpha * d) * beta;\n    gl_FragColor = vec4(relaxed);\n}\n"
    }), define("text!shaders/subtractPressureGradient.frag", [], function () {
        return "precision highp float;\nuniform sampler2D pressure;\nuniform sampler2D velocity;\nuniform float alpha;\nuniform float beta;\nuniform float scale;\nuniform vec2 px;\nvarying vec2 uv;\n\nvoid main(){\n    float x0 = texture2D(pressure, uv-vec2(px.x, 0)).r;\n    float x1 = texture2D(pressure, uv+vec2(px.x, 0)).r;\n    float y0 = texture2D(pressure, uv-vec2(0, px.y)).r;\n    float y1 = texture2D(pressure, uv+vec2(0, px.y)).r;\n    vec2 v = texture2D(velocity, uv).xy;\n    gl_FragColor = vec4((v-(vec2(x1, y1)-vec2(x0, y0))*0.5)*scale, 1.0, 1.0);\n}\n"
    }), define("text!shaders/visualize.frag", [], function () {
        return "precision lowp float;\nuniform sampler2D velocity;\nuniform float brightness;\nuniform float cursor_intensity;\n\n\nvarying vec2 uv;\n\nvoid main(){\n lowp float temp = (texture2D(velocity, uv)*cursor_intensity+brightness).x;\n  gl_FragColor = vec4(\n    temp,\n   temp,\n   temp,\n .5);\n}\n"
    }), define("text!shaders/cursor.vertex", [], function () {
        return "precision highp float;\n\nattribute vec3 position;\nuniform vec2 center;\nuniform vec2 px;\nvarying vec2 uv;\n\n\nvoid main(){\n    uv = clamp(position.xy+center, vec2(-1.0+px*2.0), vec2(1.0-px*2.0));\n    gl_Position = vec4(uv, 0.0, 1.0);\n}\n"
    }), define("text!shaders/boundary.vertex", [], function () {
        return "attribute vec3 position;\nattribute vec3 offset;\nvarying vec2 uv;\n\n//precision highp float;\n\nvoid main(){\n    uv = offset.xy*0.5+0.5;\n    gl_Position = vec4(position, 1.0);\n}\n"
    }), define("text!shaders/kernel.vertex", [], function () {
        return "precision highp float;\nattribute vec3 position;\nuniform vec2 px;\nvarying vec2 uv;\n\n\n\nvoid main(){\n    uv = vec2(0.5)+(position.xy)*0.5;\n    gl_Position = vec4(position, 1.0);\n}\n"
    }), define("engine/fragments", ["text!shaders/advect.frag", "text!shaders/addForce.frag", "text!shaders/divergence.frag", "text!shaders/jacobi.frag", "text!shaders/subtractPressureGradient.frag", "text!shaders/visualize.frag", "text!shaders/cursor.vertex", "text!shaders/boundary.vertex", "text!shaders/kernel.vertex"], function (e, t, n, r, i, s, o, u, a) {
        return {
            resources: {
                "shaders/addForce.frag": t,
                "shaders/advect.frag": e,
                "shaders/boundary.vertex": u,
                "shaders/cursor.vertex": o,
                "shaders/divergence.frag": n,
                "shaders/jacobi.frag": r,
                "shaders/kernel.vertex": a,
                "shaders/subtractPressureGradient.frag": i,
                "shaders/visualize.frag": s
            }
        }
    }), define("engine/clock", ["require", "exports", "module"], function (e, t, n) {
        var r = t,
            i = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame;
        r.Clock = function () {
            this.running = !1, this.interval = null, this.t0 = this.now(), this.t = 0, this.maxdt = .25
        }, r.Clock.prototype = {
            tick: function () {
                var e = this.now(),
                    t = (e - this.t0) / 1e3;
                this.t0 = e, this.t += t, t < this.maxdt && t > 0 && this.ontick(t)
            },
            start: function (e) {
                this.running = !0;
                var t = this,
                    n;
                i ? i(n = function () {
                    t.tick(), t.running && i(n, e)
                }, e) : this.interval = window.setInterval(function () {
                    t.tick()
                }, 1), this.t0 = this.now()
            },
            stop: function () {
                this.interval && (window.clearInterval(this.interval), this.interval = null), this.running = !1
            },
            now: function () {
                return window.performance.now()
            },
            ontick: function (e) {}
        }, r.fixedstep = function (e, t, n) {
            var r = 0,
                i = 0;
            return function (s) {
                r += s;
                while (r >= e) t(e, i), r -= e, s -= e, i += e;
                n(s, i)
            }
        }
    }), define("engine/utils", ["require", "exports", "module"], function (e, t, n) {
        var r = t;
        r.extend = function () {
            var t = arguments[0],
                n, r, i, s, o;
            for (n = 1; n < arguments.length; n++) {
                r = arguments[n];
                for (i in r) t[i] = r[i]
            }
            return t
        }, r.debounce = function (e, t) {
            function s() {
                e.apply(i, n)
            }
            var n, r, i;
            return function () {
                i = this, n = arguments, clearTimeout(r), r = setTimeout(s, t)
            }
        }, r.clamp = function (t, n, r) {
            return t < n ? n : t > r ? r : t
        }, r.getHashValue = function (e, t) {
            var n = window.location.hash.match("[#,]+" + e + "(=([^,]*))?");
            return n ? n.length == 3 && n[2] != null ? n[2] : !0 : t
        }
    }), define("engine/input", ["require", "exports", "module", "engine/utils"], function (e, t, n) {
        var r = t,
            i = e("engine/utils").clamp,
            s = {
                32: "SPACE",
                13: "ENTER",
                9: "TAB",
                8: "BACKSPACE",
                16: "SHIFT",
                17: "CTRL",
                18: "ALT",
                20: "CAPS_LOCK",
                144: "NUM_LOCK",
                145: "SCROLL_LOCK",
                37: "LEFT",
                38: "UP",
                39: "RIGHT",
                40: "DOWN",
                33: "PAGE_UP",
                34: "PAGE_DOWN",
                36: "HOME",
                35: "END",
                45: "INSERT",
                46: "DELETE",
                27: "ESCAPE",
                19: "PAUSE"
            };
        r.Handler = function (t) {
            this.bind(t), this.reset()
        }, r.Handler.prototype = {
            offset: {
                x: 0,
                y: 0
            },
            onClick: null,
            onKeyUp: null,
            onKeyDown: null,
            hasFocus: !0,
            bind: function (e) {
                var t = this;
                this.element = e, this.updateOffset(), document.addEventListener("keydown", function (e) {
                    !t.keyDown(e.keyCode)
                }), document.addEventListener("keyup", function (e) {
                    !t.keyUp(e.keyCode)
                }), window.addEventListener("click", function (n) {
                    n.target != e ? t.blur() : t.focus()
                }), window.addEventListener("blur", function (e) {
                    t.blur()
                }), document.addEventListener("mousemove", function (e) {
                    t.mouseMove(e.clientX, e.clientY)
                }), e.addEventListener("mousedown", function (e) {
                    t.mouseDown()
                }), e.addEventListener("mouseup", function (e) {
                    t.mouseUp()
                }), document.addEventListener("selectstart", function (e) {})
            },
            updateOffset: function () {
                var e = this.element.getBoundingClientRect();
                this.offset = {
                    x: e.left,
                    y: e.top
                }
            },
            blur: function () {
                this.hasFocus = !1, this.reset()
            },
            focus: function () {
                this.hasFocus || (this.hasFocus = !0, this.reset())
            },
            reset: function () {
                this.keys = {};
                for (var e = 65; e < 128; e++) this.keys[String.fromCharCode(e)] = !1;
                for (e in s) s.hasOwnProperty(e) && (this.keys[s[e]] = !1);
                this.mouse = {
                    down: !1,
                    x: 0,
                    y: 0
                }
            },
            keyDown: function (e) {
                var t = this._getKeyName(e),
                    n = this.keys[t];
                return this.keys[t] = !0, this.onKeyDown && !n && this.onKeyDown(t), this.hasFocus
            },
            keyUp: function (e) {
                var t = this._getKeyName(e);
                return this.keys[t] = !1, this.onKeyUp && this.onKeyUp(t), this.hasFocus
            },
            mouseDown: function () {
                this.mouse.down = !0
            },
            mouseUp: function () {
                this.mouse.down = !1, this.hasFocus && this.onClick && this.onClick(this.mouse.x, this.mouse.y)
            },
            mouseMove: function (e, t) {
                this.mouse.x = i(e - this.offset.x, 0, window.outerWidth), this.mouse.y = i(t - this.offset.y, 0, window.outerHeight)
            },
            _getKeyName: function (e) {
                return e in s ? s[e] : String.fromCharCode(e)
            }
        }
    }), define("engine/gl/shader", ["require", "exports", "module"], function (e, t, n) {
        function r(e) {
            var t = [];
            for (var n in e) t.push(n);
            return t
        }

        function i(e, t, n) {
            this.gl = e, this.program = this.makeProgram(t, n), this.uniformLocations = {}, this.uniformValues = {}, this.uniformNames = [], this.attributeLocations = {}
        }
        i.prototype = {
            use: function () {
                this.gl.useProgram(this.program)
            },
            prepareUniforms: function (e) {
                this.uniformNames = r(e);
                for (var t = 0; t < this.uniformNames.length; t++) {
                    var n = this.uniformNames[t];
                    this.uniformLocations[n] = this.gl.getUniformLocation(this.program, n)
                }
            },
            uniforms: function (e) {
                this.uniformNames.length === 0 && this.prepareUniforms(e);
                for (var t = 0; t < this.uniformNames.length; t++) {
                    var n = this.uniformNames[t],
                        r = this.uniformLocations[n],
                        i = e[n];
                    if (r === null) continue;
                    if (i.uniform) i.equals(this.uniformValues[n]) || (i.uniform(r), i.set(this.uniformValues, n));
                    else if (i.length) {
                        var s = this.uniformValues[n];
                        if (s !== undefined) {
                            for (var o = 0, u = i.length; o < u; o++)
                                if (i[o] != s[o]) break;
                            if (o != u)
                                for (o = 0, u = i.length; o < u; o++) s[o] = i[o]
                        } else this.uniformValues[n] = new Float32Array(i);
                        switch (i.length) {
                            case 2:
                                this.gl.uniform2fv(r, i);
                                break;
                            case 3:
                                this.gl.uniform3fv(r, i);
                                break;
                            case 4:
                                this.gl.uniform4fv(r, i);
                                break;
                            case 9:
                                this.gl.uniformMatrix3fv(r, !1, i);
                                break;
                            case 16:
                                this.gl.uniformMatrix4fv(r, !1, i)
                        }
                    } else i != this.uniformValues[n] && (this.gl.uniform1f(r, i), this.uniformValues[n] = i)
                }
            },
            getUniformLocation: function (e) {
                return this.uniformLocations[e] === undefined && (this.uniformLocations[e] = this.gl.getUniformLocation(this.program, e)), this.uniformLocations[e]
            },
            getAttribLocation: function (e) {
                if (!(e in this.attributeLocations)) {
                    var t = this.gl.getAttribLocation(this.program, e);
                    if (t < 0) throw "undefined attribute " + e;
                    this.attributeLocations[e] = t
                }
                return this.attributeLocations[e]
            },
            makeShader: function (e, t) {
                var n = this.gl.createShader(e);
                this.gl.shaderSource(n, t), this.gl.compileShader(n);
                if (!this.gl.getShaderParameter(n, this.gl.COMPILE_STATUS)) throw console.log(this.gl.getShaderInfoLog(n), e, t), 'Compiler exception: "' + this.gl.getShaderInfoLog(n) + '"';
                return n
            },
            makeProgram: function (e, t) {
                var n = this.makeShader(this.gl.VERTEX_SHADER, e),
                    r = this.makeShader(this.gl.FRAGMENT_SHADER, t),
                    i = this.gl.createProgram();
                this.gl.attachShader(i, n), this.gl.attachShader(i, r), this.gl.linkProgram(i);
                if (!this.gl.getProgramParameter(i, this.gl.LINK_STATUS)) throw "Linker exception: " + this.gl.getProgramInfoLog(i);
                return i
            }
        }, t.Shader = i, t.Manager = function (t, n, r) {
            this.gl = t, this.resources = n, this.shaders = [], r = r || {}, this.prefix = r.prefix || "shaders/"
        }, t.Manager.prototype = {
            includeExpression: /#include "([^"]+)"/g,
            preprocess: function (e, t) {
                return t.replace(this.includeExpression, function (e, t) {
                    return this.getSource(t)
                }.bind(this))
            },
            getSource: function (e) {
                var t = this.resources[this.prefix + e];
                if (t == null) throw "shader not found: " + e;
                return this.preprocess(e, t)
            },
            get: function (e, t) {
                t || (t = e), t += ".frag", e += ".vertex";
                var n = t + ";" + e;
                return n in this.shaders || (this.shaders[n] = new i(this.gl, this.getSource(e), this.getSource(t))), this.shaders[n]
            }
        }
    }), define("engine/gl/geometry", ["require", "exports", "module"], function (e, t, n) {
        t.grid = function (e) {
            var t = new Float32Array(e * e * 6 * 3),
                n = 0,
                r = e * .5;
            for (var i = 0; i < e; i++)
                for (var s = 0; s < e; s++) t[n++] = s / e, t[n++] = 0, t[n++] = i / e, t[n++] = s / e, t[n++] = 0, t[n++] = (i + 1) / e, t[n++] = (s + 1) / e, t[n++] = 0, t[n++] = (i + 1) / e, t[n++] = s / e, t[n++] = 0, t[n++] = i / e, t[n++] = (s + 1) / e, t[n++] = 0, t[n++] = (i + 1) / e, t[n++] = (s + 1) / e, t[n++] = 0, t[n++] = i / e;
            return t
        }, t.wireFrame = function (e) {
            var t = new Float32Array(e.length * 2),
                n = e.length / 9;
            for (var r = 0; r < n; r++)
                for (var i = 0; i < 3; i++) {
                    var s = (i + 1) % 3;
                    for (var o = 0; o < 3; o++) t[r * 18 + i * 3 + o] = e[r * 9 + i * 3 + o], t[r * 18 + i * 3 + 9 + o] = e[r * 9 + s * 3 + o]
                }
            return t
        }, t.screen_quad = function (t, n) {
            return t = t || 1, n = n || t, new Float32Array([-t, n, 0, -t, -n, 0, t, -n, 0, -t, n, 0, t, -n, 0, t, n, 0])
        }, t.cube = function (t) {
            return t = t || 1, new Float32Array([t, t, t, t, -t, t, -t, -t, t, t, t, t, -t, -t, t, -t, t, t, -t, t, -t, -t, -t, -t, t, t, -t, t, t, -t, -t, -t, -t, t, -t, -t, -t, t, t, -t, -t, -t, -t, t, -t, -t, t, t, -t, -t, t, -t, -t, -t, t, t, t, t, t, -t, t, -t, -t, t, t, t, t, -t, -t, t, -t, t, t, t, t, -t, t, t, -t, t, -t, t, t, -t, t, t, t, -t, t, -t, -t, -t, -t, -t, -t, t, t, -t, t, -t, -t, -t, t, -t, t, t, -t, -t])
        }
    }), define("engine/gl/texture", ["require", "exports", "module", "../utils"], function (e, t, n) {
        var r = e("../utils").extend;
        t.Texture2D = function (t, n, r) {
            this.gl = t, this.texture = t.createTexture(), this.unit = -1, this.bound = !1, this.bindTexture(), t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL, !1), t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !1), t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL, t.NONE), t.texImage2D(t.TEXTURE_2D, 0, r.internalformat || r.format || t.RGBA, r.format || t.RGBA, r.type || t.UNSIGNED_BYTE, n), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, r.mag_filter || t.LINEAR), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, r.min_filter || t.LINEAR_MIPMAP_LINEAR), t.texParameterf(t.TEXTURE_2D, t.TEXTURE_WRAP_S, r.wrap_s || t.REPEAT), t.texParameterf(t.TEXTURE_2D, t.TEXTURE_WRAP_T, r.wrap_t || t.REPEAT), r.mipmap !== !1 && t.generateMipmap(t.TEXTURE_2D)
        }, t.Texture2D.prototype = {
            bindTexture: function (e) {
                e !== undefined && (this.gl.activeTexture(this.gl.TEXTURE0 + e), this.unit = e), this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture), this.bound = !0
            },
            unbindTexture: function () {
                this.gl.activeTexture(this.gl.TEXTURE0 + this.unit), this.gl.bindTexture(this.gl.TEXTURE_2D, null), this.unit = -1, this.bound = !1
            },
            uniform: function (e) {
                this.gl.uniform1i(e, this.unit)
            },
            equals: function (e) {
                return this.unit === e
            },
            set: function (e, t) {
                e[t] = this.unit
            }
        }, t.FBO = function (t, n, r, i, s) {
            this.width = n, this.height = r, this.gl = t, this.framebuffer = t.createFramebuffer(), t.bindFramebuffer(t.FRAMEBUFFER, this.framebuffer), this.texture = t.createTexture(), t.bindTexture(t.TEXTURE_2D, this.texture), t.texImage2D(t.TEXTURE_2D, 0, s || t.RGBA, n, r, 0, s || t.RGBA, i || t.UNSIGNED_BYTE, null), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.LINEAR), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.LINEAR), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE), this.depth = t.createRenderbuffer(), t.bindRenderbuffer(t.RENDERBUFFER, this.depth), t.renderbufferStorage(t.RENDERBUFFER, t.DEPTH_COMPONENT16, n, r), t.framebufferTexture2D(t.FRAMEBUFFER, t.COLOR_ATTACHMENT0, t.TEXTURE_2D, this.texture, 0), t.framebufferRenderbuffer(t.FRAMEBUFFER, t.DEPTH_ATTACHMENT, t.RENDERBUFFER, this.depth), this.supported = t.checkFramebufferStatus(t.FRAMEBUFFER) === t.FRAMEBUFFER_COMPLETE, t.bindTexture(t.TEXTURE_2D, null), t.bindRenderbuffer(t.RENDERBUFFER, null), t.bindFramebuffer(t.FRAMEBUFFER, null), this.unit = -1
        }, t.FBO.prototype = r({}, t.Texture2D.prototype, {
            bind: function () {
                this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.framebuffer)
            },
            unbind: function () {
                this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null)
            }
        })
    }), define("engine/gl/mesh", ["require", "exports", "module"], function (e, t, n) {
        var r = function (e, t) {
            this.gl = e, this.ibo = t.ibo, this.vbo = t.vbo || new i(e, t.vertex), this.mode = t.mode || e.TRIANGLES;
            if (this.ibo) switch (this.ibo.byteLength / this.ibo.length) {
                case 1:
                    this.iboType = e.UNSIGNED_BYTE;
                    break;
                case 2:
                    this.iboType = e.UNSIGNED_SHORT;
                    break;
                case 4:
                    this.iboType = e.UNSIGNED_LONG;
                    break;
                default:
                    this.iboType = e.UNSIGNED_SHORT
            } else this.iboType = 0;
            this.setAttributes(t.attributes)
        };
        r.prototype = {
            setAttributes: function (e) {
                var t = Object.keys(e);
                this.attributes = [], this.vertexSize = 0;
                for (var n = 0; n < t.length; n++) {
                    var r = t[n],
                        i = e[r],
                        s = {
                            name: r,
                            size: i.size || 3,
                            type: i.type || this.gl.FLOAT,
                            stride: i.stride || 0,
                            offset: i.offset || 0,
                            normalized: !!i.normalized
                        };
                    this.vertexSize += s.size, this.attributes.push(s)
                }
            },
            bindAttributes: function (e) {
                for (var t = 0; t < this.attributes.length; t++) {
                    var n = this.attributes[t],
                        r = e.getAttribLocation(n.name);
                    this.gl.enableVertexAttribArray(r), this.gl.vertexAttribPointer(r, n.size, n.type, n.normalized, n.stride, n.offset)
                }
            },
            draw: function (e) {
                e.use(), this.vbo.bind(), this.bindAttributes(e), this.ibo ? (this.ibo.bind(), this.gl.drawElements(this.mode, this.ibo.length, this.iboType, 0)) : this.gl.drawArrays(this.mode, 0, this.vbo.length / this.vertexSize), this.vbo.unbind()
            }
        }, t.Mesh = r;
        var i = function (e, t, n, r) {
            this.gl = e, this.target = n || e.ARRAY_BUFFER, this.buffer = e.createBuffer(), this.bind(), e.bufferData(e.ARRAY_BUFFER, t, r || e.STATIC_DRAW), this.unbind(), this.length = t.length, this.btyeLength = t.byteLength
        };
        i.prototype = {
            bind: function () {
                this.gl.bindBuffer(this.target, this.buffer)
            },
            unbind: function () {
                this.gl.bindBuffer(this.target, null)
            },
            free: function (e) {
                this.gl.deleteBuffer(this.buffer), delete this.buffer
            }
        }, t.Buffer = i
    }), WebGLDebugUtils = function () {
        function i(e) {
            if (r == null) {
                r = {};
                for (var t in e) typeof e[t] == "number" && (r[e[t]] = t)
            }
        }

        function s() {
            if (r == null) throw "WebGLDebugUtils.init(ctx) not called"
        }

        function o(e) {
            return s(), r[e] !== undefined
        }

        function u(e) {
            s();
            var t = r[e];
            return t !== undefined ? t : "*UNKNOWN WebGL ENUM (0x" + e.toString(16) + ")"
        }

        function a(e, t, r) {
            var i = n[e];
            return i !== undefined && i[t] ? u(r) : r === null ? "null" : r === undefined ? "undefined" : r.toString()
        }

        function f(e, t) {
            var n = "";
            for (var r = 0; r < t.length; ++r) n += (r == 0 ? "" : ", ") + a(e, r, t[r]);
            return n
        }

        function l(e, t, n) {
            e.__defineGetter__(n, function () {
                return t[n]
            }), e.__defineSetter__(n, function (e) {
                t[n] = e
            })
        }

        function c(e, t) {
            var n = e[t];
            return function () {
                var t = n.apply(e, arguments);
                return t
            }
        }

        function h(e, n, r) {
            function o(e, t) {
                return function () {
                    r && r(t, arguments);
                    var i = e[t].apply(e, arguments),
                        o = e.getError();
                    return o != 0 && (s[o] = !0, n(o, t, arguments)), i
                }
            }
            i(e), n = n || function (e, n, r) {
                var i = "";
                for (var s = 0; s < r.length; ++s) i += (s == 0 ? "" : ", ") + a(n, s, r[s]);
                t("WebGL error " + u(e) + " in " + n + "(" + i + ")")
            };
            var s = {},
                f = {};
            for (var c in e) typeof e[c] == "function" ? f[c] = o(e, c) : l(f, e, c);
            return f.getError = function () {
                for (var t in s)
                    if (s.hasOwnProperty(t) && s[t]) return s[t] = !1, t;
                return e.NO_ERROR
            }, f
        }

        function p(e) {
            var t = e.getParameter(e.MAX_VERTEX_ATTRIBS),
                n = e.createBuffer();
            e.bindBuffer(e.ARRAY_BUFFER, n);
            for (var r = 0; r < t; ++r) e.disableVertexAttribArray(r), e.vertexAttribPointer(r, 4, e.FLOAT, !1, 0, 0), e.vertexAttrib1f(r, 0);
            e.deleteBuffer(n);
            var i = e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS);
            for (var r = 0; r < i; ++r) e.activeTexture(e.TEXTURE0 + r), e.bindTexture(e.TEXTURE_CUBE_MAP, null), e.bindTexture(e.TEXTURE_2D, null);
            e.activeTexture(e.TEXTURE0), e.useProgram(null), e.bindBuffer(e.ARRAY_BUFFER, null), e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, null), e.bindFramebuffer(e.FRAMEBUFFER, null), e.bindRenderbuffer(e.RENDERBUFFER, null), e.disable(e.BLEND), e.disable(e.CULL_FACE), e.disable(e.DEPTH_TEST), e.disable(e.DITHER), e.disable(e.SCISSOR_TEST), e.blendColor(0, 0, 0, 0), e.blendEquation(e.FUNC_ADD), e.blendFunc(e.ONE, e.ZERO), e.clearColor(0, 0, 0, 0), e.clearDepth(1), e.clearStencil(-1), e.colorMask(!0, !0, !0, !0), e.cullFace(e.BACK), e.depthFunc(e.LESS), e.depthMask(!0), e.depthRange(0, 1), e.frontFace(e.CCW), e.hint(e.GENERATE_MIPMAP_HINT, e.DONT_CARE), e.lineWidth(1), e.pixelStorei(e.PACK_ALIGNMENT, 4), e.pixelStorei(e.UNPACK_ALIGNMENT, 4), e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL, !1), e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !1), e.UNPACK_COLORSPACE_CONVERSION_WEBGL && e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL, e.BROWSER_DEFAULT_WEBGL), e.polygonOffset(0, 0), e.sampleCoverage(1, !1), e.scissor(0, 0, e.canvas.width, e.canvas.height), e.stencilFunc(e.ALWAYS, 0, 4294967295), e.stencilMask(4294967295), e.stencilOp(e.KEEP, e.KEEP, e.KEEP), e.viewport(0, 0, e.canvas.width, e.canvas.height), e.clear(e.COLOR_BUFFER_BIT | e.DEPTH_BUFFER_BIT | e.STENCIL_BUFFER_BIT);
            while (e.getError());
        }

        function d(e) {
            function m(e) {
                return typeof e == "function" ? e : function (t) {
                    e.handleEvent(t)
                }
            }

            function b(e) {
                var t = e.addEventListener;
                e.addEventListener = function (n, r, i) {
                    switch (n) {
                        case "webglcontextlost":
                            g(r);
                            break;
                        case "webglcontextrestored":
                            y(r);
                            break;
                        default:
                            t.apply(e, arguments)
                    }
                }
            }

            function w(e) {
                return e instanceof WebGLBuffer || e instanceof WebGLFramebuffer || e instanceof WebGLProgram || e instanceof WebGLRenderbuffer || e instanceof WebGLShader || e instanceof WebGLTexture
            }

            function E(e) {
                for (var t = 0; t < e.length; ++t) {
                    var n = e[t];
                    if (w(n)) return n.__webglDebugContextLostId__ == s
                }
                return !0
            }

            function S() {
                var e = Object.keys(v);
                for (var t = 0; t < e.length; ++t) delete v[e]
            }

            function x() {
                ++c, o || f == c && e.loseContext()
            }

            function T(e, t) {
                var n = e[t];
                return function () {
                    x();
                    if (!o) {
                        var t = n.apply(e, arguments);
                        return t
                    }
                }
            }

            function N() {
                for (var e = 0; e < a.length; ++e) {
                    var n = a[e];
                    n instanceof WebGLBuffer ? t.deleteBuffer(n) : n instanceof WebGLFramebuffer ? t.deleteFramebuffer(n) : n instanceof WebGLProgram ? t.deleteProgram(n) : n instanceof WebGLRenderbuffer ? t.deleteRenderbuffer(n) : n instanceof WebGLShader ? t.deleteShader(n) : n instanceof WebGLTexture && t.deleteTexture(n)
                }
            }

            function C(e) {
                return {
                    statusMessage: e,
                    preventDefault: function () {
                        h = !0
                    }
                }
            }

            function k(e) {
                for (var r in e) typeof e[r] == "function" ? n[r] = T(e, r) : l(n, e, r);
                n.getError = function () {
                    x();
                    if (!o) {
                        var e;
                        while (e = t.getError()) v[e] = !0
                    }
                    for (var e in v)
                        if (v[e]) return delete v[e], e;
                    return n.NO_ERROR
                };
                var i = ["createBuffer", "createFramebuffer", "createProgram", "createRenderbuffer", "createShader", "createTexture"];
                for (var u = 0; u < i.length; ++u) {
                    var f = i[u];
                    n[f] = function (t) {
                        return function () {
                            x();
                            if (o) return null;
                            var n = t.apply(e, arguments);
                            return n.__webglDebugContextLostId__ = s, a.push(n), n
                        }
                    }(e[f])
                }
                var c = ["getActiveAttrib", "getActiveUniform", "getBufferParameter", "getContextAttributes", "getAttachedShaders", "getFramebufferAttachmentParameter", "getParameter", "getProgramParameter", "getProgramInfoLog", "getRenderbufferParameter", "getShaderParameter", "getShaderInfoLog", "getShaderSource", "getTexParameter", "getUniform", "getUniformLocation", "getVertexAttrib"];
                for (var u = 0; u < c.length; ++u) {
                    var f = c[u];
                    n[f] = function (t) {
                        return function () {
                            return x(), o ? null : t.apply(e, arguments)
                        }
                    }(n[f])
                }
                var h = ["isBuffer", "isEnabled", "isFramebuffer", "isProgram", "isRenderbuffer", "isShader", "isTexture"];
                for (var u = 0; u < h.length; ++u) {
                    var f = h[u];
                    n[f] = function (t) {
                        return function () {
                            return x(), o ? !1 : t.apply(e, arguments)
                        }
                    }(n[f])
                }
                return n.checkFramebufferStatus = function (t) {
                    return function () {
                        return x(), o ? n.FRAMEBUFFER_UNSUPPORTED : t.apply(e, arguments)
                    }
                }(n.checkFramebufferStatus), n.getAttribLocation = function (t) {
                    return function () {
                        return x(), o ? -1 : t.apply(e, arguments)
                    }
                }(n.getAttribLocation), n.getVertexAttribOffset = function (t) {
                    return function () {
                        return x(), o ? 0 : t.apply(e, arguments)
                    }
                }(n.getVertexAttribOffset), n.isContextLost = function () {
                    return o
                }, n
            }
            var t, n, r = [],
                i = [],
                n = {},
                s = 1,
                o = !1,
                u = 0,
                a = [],
                f = 0,
                c = 0,
                h = !1,
                d = 0,
                v = {};
            e.getContext = function (r) {
                return function () {
                    var i = r.apply(e, arguments);
                    if (i instanceof WebGLRenderingContext) {
                        if (i != t) {
                            if (t) throw "got different context";
                            t = i, n = k(t)
                        }
                        return n
                    }
                    return i
                }
            }(e.getContext);
            var g = function (e) {
                    r.push(m(e))
                },
                y = function (e) {
                    i.push(m(e))
                };
            return b(e), e.loseContext = function () {
                if (!o) {
                    o = !0, f = 0, ++s;
                    while (t.getError());
                    S(), v[t.CONTEXT_LOST_WEBGL] = !0;
                    var n = C("context lost"),
                        i = r.slice();
                    setTimeout(function () {
                        for (var t = 0; t < i.length; ++t) i[t](n);
                        d >= 0 && setTimeout(function () {
                            e.restoreContext()
                        }, d)
                    }, 0)
                }
            }, e.restoreContext = function () {
                o && i.length && setTimeout(function () {
                    if (!h) throw "can not restore. webglcontestlost listener did not call event.preventDefault";
                    N(), p(t), o = !1, c = 0, h = !1;
                    var e = i.slice(),
                        n = C("context restored");
                    for (var r = 0; r < e.length; ++r) e[r](n)
                }, 0)
            }, e.loseContextInNCalls = function (e) {
                if (o) throw "You can not ask a lost contet to be lost";
                f = c + e
            }, e.getNumCalls = function () {
                return c
            }, e.setRestoreTimeout = function (e) {
                d = e
            }, e
        }
        var e = function (e) {
                window.console && window.console.log && window.console.log(e)
            },
            t = function (t) {
                window.console && window.console.error ? window.console.error(t) : e(t)
            },
            n = {
                enable: {
                    0: !0
                },
                disable: {
                    0: !0
                },
                getParameter: {
                    0: !0
                },
                drawArrays: {
                    0: !0
                },
                drawElements: {
                    0: !0,
                    2: !0
                },
                createShader: {
                    0: !0
                },
                getShaderParameter: {
                    1: !0
                },
                getProgramParameter: {
                    1: !0
                },
                getVertexAttrib: {
                    1: !0
                },
                vertexAttribPointer: {
                    2: !0
                },
                bindTexture: {
                    0: !0
                },
                activeTexture: {
                    0: !0
                },
                getTexParameter: {
                    0: !0,
                    1: !0
                },
                texParameterf: {
                    0: !0,
                    1: !0
                },
                texParameteri: {
                    0: !0,
                    1: !0,
                    2: !0
                },
                texImage2D: {
                    0: !0,
                    2: !0,
                    6: !0,
                    7: !0
                },
                texSubImage2D: {
                    0: !0,
                    6: !0,
                    7: !0
                },
                copyTexImage2D: {
                    0: !0,
                    2: !0
                },
                copyTexSubImage2D: {
                    0: !0
                },
                generateMipmap: {
                    0: !0
                },
                bindBuffer: {
                    0: !0
                },
                bufferData: {
                    0: !0,
                    2: !0
                },
                bufferSubData: {
                    0: !0
                },
                getBufferParameter: {
                    0: !0,
                    1: !0
                },
                pixelStorei: {
                    0: !0,
                    1: !0
                },
                readPixels: {
                    4: !0,
                    5: !0
                },
                bindRenderbuffer: {
                    0: !0
                },
                bindFramebuffer: {
                    0: !0
                },
                checkFramebufferStatus: {
                    0: !0
                },
                framebufferRenderbuffer: {
                    0: !0,
                    1: !0,
                    2: !0
                },
                framebufferTexture2D: {
                    0: !0,
                    1: !0,
                    2: !0
                },
                getFramebufferAttachmentParameter: {
                    0: !0,
                    1: !0,
                    2: !0
                },
                getRenderbufferParameter: {
                    0: !0,
                    1: !0
                },
                renderbufferStorage: {
                    0: !0,
                    1: !0
                },
                clear: {
                    0: !0
                },
                depthFunc: {
                    0: !0
                },
                blendFunc: {
                    0: !0,
                    1: !0
                },
                blendFuncSeparate: {
                    0: !0,
                    1: !0,
                    2: !0,
                    3: !0
                },
                blendEquation: {
                    0: !0
                },
                blendEquationSeparate: {
                    0: !0,
                    1: !0
                },
                stencilFunc: {
                    0: !0
                },
                stencilFuncSeparate: {
                    0: !0,
                    1: !0
                },
                stencilMaskSeparate: {
                    0: !0
                },
                stencilOp: {
                    0: !0,
                    1: !0,
                    2: !0
                },
                stencilOpSeparate: {
                    0: !0,
                    1: !0,
                    2: !0,
                    3: !0
                },
                cullFace: {
                    0: !0
                },
                frontFace: {
                    0: !0
                }
            },
            r = null;
        return {
            init: i,
            mightBeEnum: o,
            glEnumToString: u,
            glFunctionArgToString: a,
            glFunctionArgsToString: f,
            makeDebugContext: h,
            makeLostContextSimulatingCanvas: d,
            resetToInitialState: p
        }
    }(), define("engine/gl/_webgl-debug", function () {}), define("engine/gl/context", ["require", "exports", "module", "./mesh", "./texture", "../utils", "./shader", "./_webgl-debug"], function (e, t, n) {
        function u(e, t, n) {
            window.console && window.console.error && console.error(n, t)
        }
        var r = e("./mesh"),
            i = e("./texture"),
            s = e("../utils").extend,
            o = e("./shader");
        e("./_webgl-debug"), t.Context = function (e, t) {
            this.gl = e, this.resources = t, this.shaderManager = new o.Manager(t)
        }, t.Context.prototype = {
            getBuffer: function (e, t, n) {
                var i = this.resources[e];
                new r.Buffer(this.gl, i, t, n)
            },
            getFBO: function () {},
            getTexture: function (e, t) {
                var n = this.resources[e];
                return new i.Texture2D(this.gl, n, t)
            },
            getShader: function (e) {}
        }, t.initialize = function (e, t, n) {
            var r = "Try upgrading to the latest version of firefox or chrome.";
            n = n || u;
            if (!e.getContext) {
                n(e, "canvas is not supported by your browser. " + r, "no-canvas");
                return
            }
            var i = s({
                    alpha: !1,
                    depth: !0,
                    stencil: !1,
                    antialias: !0,
                    premultipliedAlpha: !1,
                    preserveDrawingBuffer: !1
                }, t.context),
                o = t.extensions || {},
                a = e.getContext("webgl", i);
            if (a == null) {
                a = e.getContext("experimental-webgl", i);
                if (a == null) {
                    n(e, "webgl is not supported by your browser. " + r, "no-webgl");
                    return
                }
            }
            if (t.vertex_texture_units && a.getParameter(a.MAX_VERTEX_TEXTURE_IMAGE_UNITS) < t.vertex_texture_units) {
                n(e, "This application needs at least two vertex texture units which are not supported by your browser. " + r, "no-vertext-texture-units");
                return
            }
            if (o.texture_float && a.getExtension("OES_texture_float") == null) {
                n(e, "This application needs float textures which is not supported by your browser. " + r, "no-OES_texture_float");
                return
            }
            return o.standard_derivatives && a.getExtension("OES_standard_derivatives") == null && n(e, "This application need the standard deriviates extensions for WebGL which is not supported by your Browser." + r, "no-OES_standard_derivatives"), window.WebGLDebugUtils && t.debug && (t.log_all ? a = WebGLDebugUtils.makeDebugContext(a, undefined, function () {
                console.log.apply(console, arguments)
            }) : a = WebGLDebugUtils.makeDebugContext(a), console.log("running in debug context")), i.depth ? a.enable(a.DEPTH_TEST) : a.disable(a.DEPTH_TEST), a.enable(a.CULL_FACE), a.lost = !1, e.addEventListener("webglcontextlost", function () {
                n(e, "Lost webgl context!", "context-lost"), a.lost = !0
            }, !1), a
        }
    }),
    function (e, t) {
        typeof exports == "object" ? module.exports = t(global) : typeof define == "function" && define.amd ? define("gl-matrix", [], function () {
            return t(e)
        }) : t(e)
    }(this, function (e) {
        function i(e) {
            return r = e, r
        }

        function s() {
            return r = typeof Float32Array != "undefined" ? Float32Array : Array, r
        }
        var t = 1e-6,
            n = {};
        (function () {
            if (typeof Float32Array != "undefined") {
                var e = new Float32Array(1),
                    t = new Int32Array(e.buffer);
                n.invsqrt = function (n) {
                    var r = n * .5;
                    e[0] = n;
                    var i = 1.5;
                    t[0] = 1597463007 - (t[0] >> 1);
                    var s = e[0];
                    return s * (i - r * s * s)
                }
            } else n.invsqrt = function (e) {
                return 1 / Math.sqrt(e)
            }
        })();
        var r = null;
        s();
        var o = {};
        o.create = function (e) {
            var t = new r(3);
            return e ? (t[0] = e[0], t[1] = e[1], t[2] = e[2]) : t[0] = t[1] = t[2] = 0, t
        }, o.createFrom = function (e, t, n) {
            var i = new r(3);
            return i[0] = e, i[1] = t, i[2] = n, i
        }, o.set = function (e, t) {
            return t[0] = e[0], t[1] = e[1], t[2] = e[2], t
        }, o.equal = function (e, n) {
            return e === n || Math.abs(e[0] - n[0]) < t && Math.abs(e[1] - n[1]) < t && Math.abs(e[2] - n[2]) < t
        }, o.add = function (e, t, n) {
            return !n || e === n ? (e[0] += t[0], e[1] += t[1], e[2] += t[2], e) : (n[0] = e[0] + t[0], n[1] = e[1] + t[1], n[2] = e[2] + t[2], n)
        }, o.subtract = function (e, t, n) {
            return !n || e === n ? (e[0] -= t[0], e[1] -= t[1], e[2] -= t[2], e) : (n[0] = e[0] - t[0], n[1] = e[1] - t[1], n[2] = e[2] - t[2], n)
        }, o.multiply = function (e, t, n) {
            return !n || e === n ? (e[0] *= t[0], e[1] *= t[1], e[2] *= t[2], e) : (n[0] = e[0] * t[0], n[1] = e[1] * t[1], n[2] = e[2] * t[2], n)
        }, o.negate = function (e, t) {
            return t || (t = e), t[0] = -e[0], t[1] = -e[1], t[2] = -e[2], t
        }, o.scale = function (e, t, n) {
            return !n || e === n ? (e[0] *= t, e[1] *= t, e[2] *= t, e) : (n[0] = e[0] * t, n[1] = e[1] * t, n[2] = e[2] * t, n)
        }, o.normalize = function (e, t) {
            t || (t = e);
            var n = e[0],
                r = e[1],
                i = e[2],
                s = Math.sqrt(n * n + r * r + i * i);
            return s ? s === 1 ? (t[0] = n, t[1] = r, t[2] = i, t) : (s = 1 / s, t[0] = n * s, t[1] = r * s, t[2] = i * s, t) : (t[0] = 0, t[1] = 0, t[2] = 0, t)
        }, o.cross = function (e, t, n) {
            n || (n = e);
            var r = e[0],
                i = e[1],
                s = e[2],
                o = t[0],
                u = t[1],
                a = t[2];
            return n[0] = i * a - s * u, n[1] = s * o - r * a, n[2] = r * u - i * o, n
        }, o.length = function (e) {
            var t = e[0],
                n = e[1],
                r = e[2];
            return Math.sqrt(t * t + n * n + r * r)
        }, o.squaredLength = function (e) {
            var t = e[0],
                n = e[1],
                r = e[2];
            return t * t + n * n + r * r
        }, o.dot = function (e, t) {
            return e[0] * t[0] + e[1] * t[1] + e[2] * t[2]
        }, o.direction = function (e, t, n) {
            n || (n = e);
            var r = e[0] - t[0],
                i = e[1] - t[1],
                s = e[2] - t[2],
                o = Math.sqrt(r * r + i * i + s * s);
            return o ? (o = 1 / o, n[0] = r * o, n[1] = i * o, n[2] = s * o, n) : (n[0] = 0, n[1] = 0, n[2] = 0, n)
        }, o.lerp = function (e, t, n, r) {
            return r || (r = e), r[0] = e[0] + n * (t[0] - e[0]), r[1] = e[1] + n * (t[1] - e[1]), r[2] = e[2] + n * (t[2] - e[2]), r
        }, o.dist = function (e, t) {
            var n = t[0] - e[0],
                r = t[1] - e[1],
                i = t[2] - e[2];
            return Math.sqrt(n * n + r * r + i * i)
        };
        var u = null,
            a = new r(4);
        o.unproject = function (e, t, n, r, i) {
            i || (i = e), u || (u = d.create());
            var s = u,
                o = a;
            return o[0] = (e[0] - r[0]) * 2 / r[2] - 1, o[1] = (e[1] - r[1]) * 2 / r[3] - 1, o[2] = 2 * e[2] - 1, o[3] = 1, d.multiply(n, t, s), d.inverse(s) ? (d.multiplyVec4(s, o), o[3] === 0 ? null : (i[0] = o[0] / o[3], i[1] = o[1] / o[3], i[2] = o[2] / o[3], i)) : null
        };
        var f = o.createFrom(1, 0, 0),
            l = o.createFrom(0, 1, 0),
            c = o.createFrom(0, 0, 1),
            h = o.create();
        o.rotationTo = function (e, t, n) {
            n || (n = v.create());
            var r = o.dot(e, t),
                i = h;
            if (r >= 1) v.set(m, n);
            else if (r < 1e-6 - 1) o.cross(f, e, i), o.length(i) < 1e-6 && o.cross(l, e, i), o.length(i) < 1e-6 && o.cross(c, e, i), o.normalize(i), v.fromAngleAxis(Math.PI, i, n);
            else {
                var s = Math.sqrt((1 + r) * 2),
                    u = 1 / s;
                o.cross(e, t, i), n[0] = i[0] * u, n[1] = i[1] * u, n[2] = i[2] * u, n[3] = s * .5, v.normalize(n)
            }
            return n[3] > 1 ? n[3] = 1 : n[3] < -1 && (n[3] = -1), n
        }, o.str = function (e) {
            return "[" + e[0] + ", " + e[1] + ", " + e[2] + "]"
        };
        var p = {};
        p.create = function (e) {
            var t = new r(9);
            return e ? (t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], t[6] = e[6], t[7] = e[7], t[8] = e[8]) : t[0] = t[1] = t[2] = t[3] = t[4] = t[5] = t[6] = t[7] = t[8] = 0, t
        }, p.createFrom = function (e, t, n, i, s, o, u, a, f) {
            var l = new r(9);
            return l[0] = e, l[1] = t, l[2] = n, l[3] = i, l[4] = s, l[5] = o, l[6] = u, l[7] = a, l[8] = f, l
        }, p.determinant = function (e) {
            var t = e[0],
                n = e[1],
                r = e[2],
                i = e[3],
                s = e[4],
                o = e[5],
                u = e[6],
                a = e[7],
                f = e[8];
            return t * (f * s - o * a) + n * (-f * i + o * u) + r * (a * i - s * u)
        }, p.inverse = function (e, t) {
            var n = e[0],
                r = e[1],
                i = e[2],
                s = e[3],
                o = e[4],
                u = e[5],
                a = e[6],
                f = e[7],
                l = e[8],
                c = l * o - u * f,
                h = -l * s + u * a,
                d = f * s - o * a,
                v = n * c + r * h + i * d,
                m;
            return v ? (m = 1 / v, t || (t = p.create()), t[0] = c * m, t[1] = (-l * r + i * f) * m, t[2] = (u * r - i * o) * m, t[3] = h * m, t[4] = (l * n - i * a) * m, t[5] = (-u * n + i * s) * m, t[6] = d * m, t[7] = (-f * n + r * a) * m, t[8] = (o * n - r * s) * m, t) : null
        }, p.multiply = function (e, t, n) {
            n || (n = e);
            var r = e[0],
                i = e[1],
                s = e[2],
                o = e[3],
                u = e[4],
                a = e[5],
                f = e[6],
                l = e[7],
                c = e[8],
                h = t[0],
                p = t[1],
                d = t[2],
                v = t[3],
                m = t[4],
                g = t[5],
                y = t[6],
                b = t[7],
                w = t[8];
            return n[0] = h * r + p * o + d * f, n[1] = h * i + p * u + d * l, n[2] = h * s + p * a + d * c, n[3] = v * r + m * o + g * f, n[4] = v * i + m * u + g * l, n[5] = v * s + m * a + g * c, n[6] = y * r + b * o + w * f, n[7] = y * i + b * u + w * l, n[8] = y * s + b * a + w * c, n
        }, p.multiplyVec2 = function (e, t, n) {
            n || (n = t);
            var r = t[0],
                i = t[1];
            return n[0] = r * e[0] + i * e[3] + e[6], n[1] = r * e[1] + i * e[4] + e[7], n
        }, p.multiplyVec3 = function (e, t, n) {
            n || (n = t);
            var r = t[0],
                i = t[1],
                s = t[2];
            return n[0] = r * e[0] + i * e[3] + s * e[6], n[1] = r * e[1] + i * e[4] + s * e[7], n[2] = r * e[2] + i * e[5] + s * e[8], n
        }, p.set = function (e, t) {
            return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], t[6] = e[6], t[7] = e[7], t[8] = e[8], t
        }, p.equal = function (e, n) {
            return e === n || Math.abs(e[0] - n[0]) < t && Math.abs(e[1] - n[1]) < t && Math.abs(e[2] - n[2]) < t && Math.abs(e[3] - n[3]) < t && Math.abs(e[4] - n[4]) < t && Math.abs(e[5] - n[5]) < t && Math.abs(e[6] - n[6]) < t && Math.abs(e[7] - n[7]) < t && Math.abs(e[8] - n[8]) < t
        }, p.identity = function (e) {
            return e || (e = p.create()), e[0] = 1, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 1, e[5] = 0, e[6] = 0, e[7] = 0, e[8] = 1, e
        }, p.transpose = function (e, t) {
            if (!t || e === t) {
                var n = e[1],
                    r = e[2],
                    i = e[5];
                return e[1] = e[3], e[2] = e[6], e[3] = n, e[5] = e[7], e[6] = r, e[7] = i, e
            }
            return t[0] = e[0], t[1] = e[3], t[2] = e[6], t[3] = e[1], t[4] = e[4], t[5] = e[7], t[6] = e[2], t[7] = e[5], t[8] = e[8], t
        }, p.toMat4 = function (e, t) {
            return t || (t = d.create()), t[15] = 1, t[14] = 0, t[13] = 0, t[12] = 0, t[11] = 0, t[10] = e[8], t[9] = e[7], t[8] = e[6], t[7] = 0, t[6] = e[5], t[5] = e[4], t[4] = e[3], t[3] = 0, t[2] = e[2], t[1] = e[1], t[0] = e[0], t
        }, p.str = function (e) {
            return "[" + e[0] + ", " + e[1] + ", " + e[2] + ", " + e[3] + ", " + e[4] + ", " + e[5] + ", " + e[6] + ", " + e[7] + ", " + e[8] + "]"
        };
        var d = {};
        d.create = function (e) {
            var t = new r(16);
            return e && (t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], t[6] = e[6], t[7] = e[7], t[8] = e[8], t[9] = e[9], t[10] = e[10], t[11] = e[11], t[12] = e[12], t[13] = e[13], t[14] = e[14], t[15] = e[15]), t
        }, d.createFrom = function (e, t, n, i, s, o, u, a, f, l, c, h, p, d, v, m) {
            var g = new r(16);
            return g[0] = e, g[1] = t, g[2] = n, g[3] = i, g[4] = s, g[5] = o, g[6] = u, g[7] = a, g[8] = f, g[9] = l, g[10] = c, g[11] = h, g[12] = p, g[13] = d, g[14] = v, g[15] = m, g
        }, d.set = function (e, t) {
            return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], t[6] = e[6], t[7] = e[7], t[8] = e[8], t[9] = e[9], t[10] = e[10], t[11] = e[11], t[12] = e[12], t[13] = e[13], t[14] = e[14], t[15] = e[15], t
        }, d.equal = function (e, n) {
            return e === n || Math.abs(e[0] - n[0]) < t && Math.abs(e[1] - n[1]) < t && Math.abs(e[2] - n[2]) < t && Math.abs(e[3] - n[3]) < t && Math.abs(e[4] - n[4]) < t && Math.abs(e[5] - n[5]) < t && Math.abs(e[6] - n[6]) < t && Math.abs(e[7] - n[7]) < t && Math.abs(e[8] - n[8]) < t && Math.abs(e[9] - n[9]) < t && Math.abs(e[10] - n[10]) < t && Math.abs(e[11] - n[11]) < t && Math.abs(e[12] - n[12]) < t && Math.abs(e[13] - n[13]) < t && Math.abs(e[14] - n[14]) < t && Math.abs(e[15] - n[15]) < t
        }, d.identity = function (e) {
            return e || (e = d.create()), e[0] = 1, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = 1, e[6] = 0, e[7] = 0, e[8] = 0, e[9] = 0, e[10] = 1, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, e
        }, d.transpose = function (e, t) {
            if (!t || e === t) {
                var n = e[1],
                    r = e[2],
                    i = e[3],
                    s = e[6],
                    o = e[7],
                    u = e[11];
                return e[1] = e[4], e[2] = e[8], e[3] = e[12], e[4] = n, e[6] = e[9], e[7] = e[13], e[8] = r, e[9] = s, e[11] = e[14], e[12] = i, e[13] = o, e[14] = u, e
            }
            return t[0] = e[0], t[1] = e[4], t[2] = e[8], t[3] = e[12], t[4] = e[1], t[5] = e[5], t[6] = e[9], t[7] = e[13], t[8] = e[2], t[9] = e[6], t[10] = e[10], t[11] = e[14], t[12] = e[3], t[13] = e[7], t[14] = e[11], t[15] = e[15], t
        }, d.determinant = function (e) {
            var t = e[0],
                n = e[1],
                r = e[2],
                i = e[3],
                s = e[4],
                o = e[5],
                u = e[6],
                a = e[7],
                f = e[8],
                l = e[9],
                c = e[10],
                h = e[11],
                p = e[12],
                d = e[13],
                v = e[14],
                m = e[15];
            return p * l * u * i - f * d * u * i - p * o * c * i + s * d * c * i + f * o * v * i - s * l * v * i - p * l * r * a + f * d * r * a + p * n * c * a - t * d * c * a - f * n * v * a + t * l * v * a + p * o * r * h - s * d * r * h - p * n * u * h + t * d * u * h + s * n * v * h - t * o * v * h - f * o * r * m + s * l * r * m + f * n * u * m - t * l * u * m - s * n * c * m + t * o * c * m
        }, d.inverse = function (e, t) {
            t || (t = e);
            var n = e[0],
                r = e[1],
                i = e[2],
                s = e[3],
                o = e[4],
                u = e[5],
                a = e[6],
                f = e[7],
                l = e[8],
                c = e[9],
                h = e[10],
                p = e[11],
                d = e[12],
                v = e[13],
                m = e[14],
                g = e[15],
                y = n * u - r * o,
                b = n * a - i * o,
                w = n * f - s * o,
                E = r * a - i * u,
                S = r * f - s * u,
                x = i * f - s * a,
                T = l * v - c * d,
                N = l * m - h * d,
                C = l * g - p * d,
                k = c * m - h * v,
                L = c * g - p * v,
                A = h * g - p * m,
                O = y * A - b * L + w * k + E * C - S * N + x * T,
                M;
            return O ? (M = 1 / O, t[0] = (u * A - a * L + f * k) * M, t[1] = (-r * A + i * L - s * k) * M, t[2] = (v * x - m * S + g * E) * M, t[3] = (-c * x + h * S - p * E) * M, t[4] = (-o * A + a * C - f * N) * M, t[5] = (n * A - i * C + s * N) * M, t[6] = (-d * x + m * w - g * b) * M, t[7] = (l * x - h * w + p * b) * M, t[8] = (o * L - u * C + f * T) * M, t[9] = (-n * L + r * C - s * T) * M, t[10] = (d * S - v * w + g * y) * M, t[11] = (-l * S + c * w - p * y) * M, t[12] = (-o * k + u * N - a * T) * M, t[13] = (n * k - r * N + i * T) * M, t[14] = (-d * E + v * b - m * y) * M, t[15] = (l * E - c * b + h * y) * M, t) : null
        }, d.toRotationMat = function (e, t) {
            return t || (t = d.create()), t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], t[6] = e[6], t[7] = e[7], t[8] = e[8], t[9] = e[9], t[10] = e[10], t[11] = e[11], t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t
        }, d.toMat3 = function (e, t) {
            return t || (t = p.create()), t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[4], t[4] = e[5], t[5] = e[6], t[6] = e[8], t[7] = e[9], t[8] = e[10], t
        }, d.toInverseMat3 = function (e, t) {
            var n = e[0],
                r = e[1],
                i = e[2],
                s = e[4],
                o = e[5],
                u = e[6],
                a = e[8],
                f = e[9],
                l = e[10],
                c = l * o - u * f,
                h = -l * s + u * a,
                d = f * s - o * a,
                v = n * c + r * h + i * d,
                m;
            return v ? (m = 1 / v, t || (t = p.create()), t[0] = c * m, t[1] = (-l * r + i * f) * m, t[2] = (u * r - i * o) * m, t[3] = h * m, t[4] = (l * n - i * a) * m, t[5] = (-u * n + i * s) * m, t[6] = d * m, t[7] = (-f * n + r * a) * m, t[8] = (o * n - r * s) * m, t) : null
        }, d.multiply = function (e, t, n) {
            n || (n = e);
            var r = e[0],
                i = e[1],
                s = e[2],
                o = e[3],
                u = e[4],
                a = e[5],
                f = e[6],
                l = e[7],
                c = e[8],
                h = e[9],
                p = e[10],
                d = e[11],
                v = e[12],
                m = e[13],
                g = e[14],
                y = e[15],
                b = t[0],
                w = t[1],
                E = t[2],
                S = t[3];
            return n[0] = b * r + w * u + E * c + S * v, n[1] = b * i + w * a + E * h + S * m, n[2] = b * s + w * f + E * p + S * g, n[3] = b * o + w * l + E * d + S * y, b = t[4], w = t[5], E = t[6], S = t[7], n[4] = b * r + w * u + E * c + S * v, n[5] = b * i + w * a + E * h + S * m, n[6] = b * s + w * f + E * p + S * g, n[7] = b * o + w * l + E * d + S * y, b = t[8], w = t[9], E = t[10], S = t[11], n[8] = b * r + w * u + E * c + S * v, n[9] = b * i + w * a + E * h + S * m, n[10] = b * s + w * f + E * p + S * g, n[11] = b * o + w * l + E * d + S * y, b = t[12], w = t[13], E = t[14], S = t[15], n[12] = b * r + w * u + E * c + S * v, n[13] = b * i + w * a + E * h + S * m, n[14] = b * s + w * f + E * p + S * g, n[15] = b * o + w * l + E * d + S * y, n
        }, d.multiplyVec3 = function (e, t, n) {
            n || (n = t);
            var r = t[0],
                i = t[1],
                s = t[2];
            return n[0] = e[0] * r + e[4] * i + e[8] * s + e[12], n[1] = e[1] * r + e[5] * i + e[9] * s + e[13], n[2] = e[2] * r + e[6] * i + e[10] * s + e[14], n
        }, d.multiplyVec4 = function (e, t, n) {
            n || (n = t);
            var r = t[0],
                i = t[1],
                s = t[2],
                o = t[3];
            return n[0] = e[0] * r + e[4] * i + e[8] * s + e[12] * o, n[1] = e[1] * r + e[5] * i + e[9] * s + e[13] * o, n[2] = e[2] * r + e[6] * i + e[10] * s + e[14] * o, n[3] = e[3] * r + e[7] * i + e[11] * s + e[15] * o, n
        }, d.translate = function (e, t, n) {
            var r = t[0],
                i = t[1],
                s = t[2],
                o, u, a, f, l, c, h, p, d, v, m, g;
            return !n || e === n ? (e[12] = e[0] * r + e[4] * i + e[8] * s + e[12], e[13] = e[1] * r + e[5] * i + e[9] * s + e[13], e[14] = e[2] * r + e[6] * i + e[10] * s + e[14], e[15] = e[3] * r + e[7] * i + e[11] * s + e[15], e) : (o = e[0], u = e[1], a = e[2], f = e[3], l = e[4], c = e[5], h = e[6], p = e[7], d = e[8], v = e[9], m = e[10], g = e[11], n[0] = o, n[1] = u, n[2] = a, n[3] = f, n[4] = l, n[5] = c, n[6] = h, n[7] = p, n[8] = d, n[9] = v, n[10] = m, n[11] = g, n[12] = o * r + l * i + d * s + e[12], n[13] = u * r + c * i + v * s + e[13], n[14] = a * r + h * i + m * s + e[14], n[15] = f * r + p * i + g * s + e[15], n)
        }, d.scale = function (e, t, n) {
            var r = t[0],
                i = t[1],
                s = t[2];
            return !n || e === n ? (e[0] *= r, e[1] *= r, e[2] *= r, e[3] *= r, e[4] *= i, e[5] *= i, e[6] *= i, e[7] *= i, e[8] *= s, e[9] *= s, e[10] *= s, e[11] *= s, e) : (n[0] = e[0] * r, n[1] = e[1] * r, n[2] = e[2] * r, n[3] = e[3] * r, n[4] = e[4] * i, n[5] = e[5] * i, n[6] = e[6] * i, n[7] = e[7] * i, n[8] = e[8] * s, n[9] = e[9] * s, n[10] = e[10] * s, n[11] = e[11] * s, n[12] = e[12], n[13] = e[13], n[14] = e[14], n[15] = e[15], n)
        }, d.rotate = function (e, t, n, r) {
            var i = n[0],
                s = n[1],
                o = n[2],
                u = Math.sqrt(i * i + s * s + o * o),
                a, f, l, c, h, p, d, v, m, g, y, b, w, E, S, x, T, N, C, k, L, A, O, M;
            return u ? (u !== 1 && (u = 1 / u, i *= u, s *= u, o *= u), a = Math.sin(t), f = Math.cos(t), l = 1 - f, c = e[0], h = e[1], p = e[2], d = e[3], v = e[4], m = e[5], g = e[6], y = e[7], b = e[8], w = e[9], E = e[10], S = e[11], x = i * i * l + f, T = s * i * l + o * a, N = o * i * l - s * a, C = i * s * l - o * a, k = s * s * l + f, L = o * s * l + i * a, A = i * o * l + s * a, O = s * o * l - i * a, M = o * o * l + f, r ? e !== r && (r[12] = e[12], r[13] = e[13], r[14] = e[14], r[15] = e[15]) : r = e, r[0] = c * x + v * T + b * N, r[1] = h * x + m * T + w * N, r[2] = p * x + g * T + E * N, r[3] = d * x + y * T + S * N, r[4] = c * C + v * k + b * L, r[5] = h * C + m * k + w * L, r[6] = p * C + g * k + E * L, r[7] = d * C + y * k + S * L, r[8] = c * A + v * O + b * M, r[9] = h * A + m * O + w * M, r[10] = p * A + g * O + E * M, r[11] = d * A + y * O + S * M, r) : null
        }, d.rotateX = function (e, t, n) {
            var r = Math.sin(t),
                i = Math.cos(t),
                s = e[4],
                o = e[5],
                u = e[6],
                a = e[7],
                f = e[8],
                l = e[9],
                c = e[10],
                h = e[11];
            return n ? e !== n && (n[0] = e[0], n[1] = e[1], n[2] = e[2], n[3] = e[3], n[12] = e[12], n[13] = e[13], n[14] = e[14], n[15] = e[15]) : n = e, n[4] = s * i + f * r, n[5] = o * i + l * r, n[6] = u * i + c * r, n[7] = a * i + h * r, n[8] = s * -r + f * i, n[9] = o * -r + l * i, n[10] = u * -r + c * i, n[11] = a * -r + h * i, n
        }, d.rotateY = function (e, t, n) {
            var r = Math.sin(t),
                i = Math.cos(t),
                s = e[0],
                o = e[1],
                u = e[2],
                a = e[3],
                f = e[8],
                l = e[9],
                c = e[10],
                h = e[11];
            return n ? e !== n && (n[4] = e[4], n[5] = e[5], n[6] = e[6], n[7] = e[7], n[12] = e[12], n[13] = e[13], n[14] = e[14], n[15] = e[15]) : n = e, n[0] = s * i + f * -r, n[1] = o * i + l * -r, n[2] = u * i + c * -r, n[3] = a * i + h * -r, n[8] = s * r + f * i, n[9] = o * r + l * i, n[10] = u * r + c * i, n[11] = a * r + h * i, n
        }, d.rotateZ = function (e, t, n) {
            var r = Math.sin(t),
                i = Math.cos(t),
                s = e[0],
                o = e[1],
                u = e[2],
                a = e[3],
                f = e[4],
                l = e[5],
                c = e[6],
                h = e[7];
            return n ? e !== n && (n[8] = e[8], n[9] = e[9], n[10] = e[10], n[11] = e[11], n[12] = e[12], n[13] = e[13], n[14] = e[14], n[15] = e[15]) : n = e, n[0] = s * i + f * r, n[1] = o * i + l * r, n[2] = u * i + c * r, n[3] = a * i + h * r, n[4] = s * -r + f * i, n[5] = o * -r + l * i, n[6] = u * -r + c * i, n[7] = a * -r + h * i, n
        }, d.frustum = function (e, t, n, r, i, s, o) {
            o || (o = d.create());
            var u = t - e,
                a = r - n,
                f = s - i;
            return o[0] = i * 2 / u, o[1] = 0, o[2] = 0, o[3] = 0, o[4] = 0, o[5] = i * 2 / a, o[6] = 0, o[7] = 0, o[8] = (t + e) / u, o[9] = (r + n) / a, o[10] = -(s + i) / f, o[11] = -1, o[12] = 0, o[13] = 0, o[14] = -(s * i * 2) / f, o[15] = 0, o
        }, d.perspective = function (e, t, n, r, i) {
            var s = n * Math.tan(e * Math.PI / 360),
                o = s * t;
            return d.frustum(-o, o, -s, s, n, r, i)
        }, d.ortho = function (e, t, n, r, i, s, o) {
            o || (o = d.create());
            var u = t - e,
                a = r - n,
                f = s - i;
            return o[0] = 2 / u, o[1] = 0, o[2] = 0, o[3] = 0, o[4] = 0, o[5] = 2 / a, o[6] = 0, o[7] = 0, o[8] = 0, o[9] = 0, o[10] = -2 / f, o[11] = 0, o[12] = -(e + t) / u, o[13] = -(r + n) / a, o[14] = -(s + i) / f, o[15] = 1, o
        }, d.lookAt = function (e, t, n, r) {
            r || (r = d.create());
            var i, s, o, u, a, f, l, c, h, p, v = e[0],
                m = e[1],
                g = e[2],
                y = n[0],
                b = n[1],
                w = n[2],
                E = t[0],
                S = t[1],
                x = t[2];
            return v === E && m === S && g === x ? d.identity(r) : (l = v - E, c = m - S, h = g - x, p = 1 / Math.sqrt(l * l + c * c + h * h), l *= p, c *= p, h *= p, i = b * h - w * c, s = w * l - y * h, o = y * c - b * l, p = Math.sqrt(i * i + s * s + o * o), p ? (p = 1 / p, i *= p, s *= p, o *= p) : (i = 0, s = 0, o = 0), u = c * o - h * s, a = h * i - l * o, f = l * s - c * i, p = Math.sqrt(u * u + a * a + f * f), p ? (p = 1 / p, u *= p, a *= p, f *= p) : (u = 0, a = 0, f = 0), r[0] = i, r[1] = u, r[2] = l, r[3] = 0, r[4] = s, r[5] = a, r[6] = c, r[7] = 0, r[8] = o, r[9] = f, r[10] = h, r[11] = 0, r[12] = -(i * v + s * m + o * g), r[13] = -(u * v + a * m + f * g), r[14] = -(l * v + c * m + h * g), r[15] = 1, r)
        }, d.fromRotationTranslation = function (e, t, n) {
            n || (n = d.create());
            var r = e[0],
                i = e[1],
                s = e[2],
                o = e[3],
                u = r + r,
                a = i + i,
                f = s + s,
                l = r * u,
                c = r * a,
                h = r * f,
                p = i * a,
                v = i * f,
                m = s * f,
                g = o * u,
                y = o * a,
                b = o * f;
            return n[0] = 1 - (p + m), n[1] = c + b, n[2] = h - y, n[3] = 0, n[4] = c - b, n[5] = 1 - (l + m), n[6] = v + g, n[7] = 0, n[8] = h + y, n[9] = v - g, n[10] = 1 - (l + p), n[11] = 0, n[12] = t[0], n[13] = t[1], n[14] = t[2], n[15] = 1, n
        }, d.str = function (e) {
            return "[" + e[0] + ", " + e[1] + ", " + e[2] + ", " + e[3] + ", " + e[4] + ", " + e[5] + ", " + e[6] + ", " + e[7] + ", " + e[8] + ", " + e[9] + ", " + e[10] + ", " + e[11] + ", " + e[12] + ", " + e[13] + ", " + e[14] + ", " + e[15] + "]"
        };
        var v = {};
        v.create = function (e) {
            var t = new r(4);
            return e ? (t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3]) : t[0] = t[1] = t[2] = t[3] = 0, t
        }, v.createFrom = function (e, t, n, i) {
            var s = new r(4);
            return s[0] = e, s[1] = t, s[2] = n, s[3] = i, s
        }, v.set = function (e, t) {
            return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t
        }, v.equal = function (e, n) {
            return e === n || Math.abs(e[0] - n[0]) < t && Math.abs(e[1] - n[1]) < t && Math.abs(e[2] - n[2]) < t && Math.abs(e[3] - n[3]) < t
        }, v.identity = function (e) {
            return e || (e = v.create()), e[0] = 0, e[1] = 0, e[2] = 0, e[3] = 1, e
        };
        var m = v.identity();
        v.calculateW = function (e, t) {
                var n = e[0],
                    r = e[1],
                    i = e[2];
                return !t || e === t ? (e[3] = -Math.sqrt(Math.abs(1 - n * n - r * r - i * i)), e) : (t[0] = n, t[1] = r, t[2] = i, t[3] = -Math.sqrt(Math.abs(1 - n * n - r * r - i * i)), t)
            }, v.dot = function (e, t) {
                return e[0] * t[0] + e[1] * t[1] + e[2] * t[2] + e[3] * t[3]
            }, v.inverse = function (e, t) {
                var n = e[0],
                    r = e[1],
                    i = e[2],
                    s = e[3],
                    o = n * n + r * r + i * i + s * s,
                    u = o ? 1 / o : 0;
                return !t || e === t ? (e[0] *= -u, e[1] *= -u, e[2] *= -u, e[3] *= u, e) : (t[0] = -e[0] * u, t[1] = -e[1] * u, t[2] = -e[2] * u, t[3] = e[3] * u, t)
            }, v.conjugate = function (e, t) {
                return !t || e === t ? (e[0] *= -1, e[1] *= -1, e[2] *= -1, e) : (t[0] = -e[0], t[1] = -e[1], t[2] = -e[2], t[3] = e[3], t)
            }, v.length = function (e) {
                var t = e[0],
                    n = e[1],
                    r = e[2],
                    i = e[3];
                return Math.sqrt(t * t + n * n + r * r + i * i)
            }, v.normalize = function (e, t) {
                t || (t = e);
                var n = e[0],
                    r = e[1],
                    i = e[2],
                    s = e[3],
                    o = Math.sqrt(n * n + r * r + i * i + s * s);
                return o === 0 ? (t[0] = 0, t[1] = 0, t[2] = 0, t[3] = 0, t) : (o = 1 / o, t[0] = n * o, t[1] = r * o, t[2] = i * o, t[3] = s * o, t)
            }, v.add = function (e, t, n) {
                return !n || e === n ? (e[0] += t[0], e[1] += t[1], e[2] += t[2], e[3] += t[3], e) : (n[0] = e[0] + t[0], n[1] = e[1] + t[1], n[2] = e[2] + t[2], n[3] = e[3] + t[3], n)
            }, v.multiply = function (e, t, n) {
                n || (n = e);
                var r = e[0],
                    i = e[1],
                    s = e[2],
                    o = e[3],
                    u = t[0],
                    a = t[1],
                    f = t[2],
                    l = t[3];
                return n[0] = r * l + o * u + i * f - s * a, n[1] = i * l + o * a + s * u - r * f, n[2] = s * l + o * f + r * a - i * u, n[3] = o * l - r * u - i * a - s * f, n
            }, v.multiplyVec3 = function (e, t, n) {
                n || (n = t);
                var r = t[0],
                    i = t[1],
                    s = t[2],
                    o = e[0],
                    u = e[1],
                    a = e[2],
                    f = e[3],
                    l = f * r + u * s - a * i,
                    c = f * i + a * r - o * s,
                    h = f * s + o * i - u * r,
                    p = -o * r - u * i - a * s;
                return n[0] = l * f + p * -o + c * -a - h * -u, n[1] = c * f + p * -u + h * -o - l * -a, n[2] = h * f + p * -a + l * -u - c * -o, n
            }, v.scale = function (e, t, n) {
                return !n || e === n ? (e[0] *= t, e[1] *= t, e[2] *= t, e[3] *= t, e) : (n[0] = e[0] * t, n[1] = e[1] * t, n[2] = e[2] * t, n[3] = e[3] * t, n)
            }, v.toMat3 = function (e, t) {
                t || (t = p.create());
                var n = e[0],
                    r = e[1],
                    i = e[2],
                    s = e[3],
                    o = n + n,
                    u = r + r,
                    a = i + i,
                    f = n * o,
                    l = n * u,
                    c = n * a,
                    h = r * u,
                    d = r * a,
                    v = i * a,
                    m = s * o,
                    g = s * u,
                    y = s * a;
                return t[0] = 1 - (h + v), t[1] = l + y, t[2] = c - g, t[3] = l - y, t[4] = 1 - (f + v), t[5] = d + m, t[6] = c + g, t[7] = d - m, t[8] = 1 - (f + h), t
            }, v.toMat4 = function (e, t) {
                t || (t = d.create());
                var n = e[0],
                    r = e[1],
                    i = e[2],
                    s = e[3],
                    o = n + n,
                    u = r + r,
                    a = i + i,
                    f = n * o,
                    l = n * u,
                    c = n * a,
                    h = r * u,
                    p = r * a,
                    v = i * a,
                    m = s * o,
                    g = s * u,
                    y = s * a;
                return t[0] = 1 - (h + v), t[1] = l + y, t[2] = c - g, t[3] = 0, t[4] = l - y, t[5] = 1 - (f + v), t[6] = p + m, t[7] = 0, t[8] = c + g, t[9] = p - m, t[10] = 1 - (f + h), t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t
            }, v.slerp = function (e, t, n, r) {
                r || (r = e);
                var i = e[0] * t[0] + e[1] * t[1] + e[2] * t[2] + e[3] * t[3],
                    s, o, u, a;
                return Math.abs(i) >= 1 ? (r !== e && (r[0] = e[0], r[1] = e[1], r[2] = e[2], r[3] = e[3]), r) : (s = Math.acos(i), o = Math.sqrt(1 - i * i), Math.abs(o) < .001 ? (r[0] = e[0] * .5 + t[0] * .5, r[1] = e[1] * .5 + t[1] * .5, r[2] = e[2] * .5 + t[2] * .5, r[3] = e[3] * .5 + t[3] * .5, r) : (u = Math.sin((1 - n) * s) / o, a = Math.sin(n * s) / o, r[0] = e[0] * u + t[0] * a, r[1] = e[1] * u + t[1] * a, r[2] = e[2] * u + t[2] * a, r[3] = e[3] * u + t[3] * a, r))
            }, v.fromRotationMatrix = function (e, t) {
                t || (t = v.create());
                var n = e[0] + e[4] + e[8],
                    r;
                if (n > 0) r = Math.sqrt(n + 1), t[3] = .5 * r, r = .5 / r, t[0] = (e[7] - e[5]) * r, t[1] = (e[2] - e[6]) * r, t[2] = (e[3] - e[1]) * r;
                else {
                    var i = v.fromRotationMatrix.s_iNext = v.fromRotationMatrix.s_iNext || [1, 2, 0],
                        s = 0;
                    e[4] > e[0] && (s = 1), e[8] > e[s * 3 + s] && (s = 2);
                    var o = i[s],
                        u = i[o];
                    r = Math.sqrt(e[s * 3 + s] - e[o * 3 + o] - e[u * 3 + u] + 1), t[s] = .5 * r, r = .5 / r, t[3] = (e[u * 3 + o] - e[o * 3 + u]) * r, t[o] = (e[o * 3 + s] + e[s * 3 + o]) * r, t[u] = (e[u * 3 + s] + e[s * 3 + u]) * r
                }
                return t
            }, p.toQuat4 = v.fromRotationMatrix,
            function () {
                var e = p.create();
                v.fromAxes = function (t, n, r, i) {
                    return e[0] = n[0], e[3] = n[1], e[6] = n[2], e[1] = r[0], e[4] = r[1], e[7] = r[2], e[2] = t[0], e[5] = t[1], e[8] = t[2], v.fromRotationMatrix(e, i)
                }
            }(), v.identity = function (e) {
                return e || (e = v.create()), e[0] = 0, e[1] = 0, e[2] = 0, e[3] = 1, e
            }, v.fromAngleAxis = function (e, t, n) {
                n || (n = v.create());
                var r = e * .5,
                    i = Math.sin(r);
                return n[3] = Math.cos(r), n[0] = i * t[0], n[1] = i * t[1], n[2] = i * t[2], n
            }, v.toAngleAxis = function (e, t) {
                t || (t = e);
                var r = e[0] * e[0] + e[1] * e[1] + e[2] * e[2];
                if (r > 0) {
                    t[3] = 2 * Math.acos(e[3]);
                    var i = n.invsqrt(r);
                    t[0] = e[0] * i, t[1] = e[1] * i, t[2] = e[2] * i
                } else t[3] = 0, t[0] = 1, t[1] = 0, t[2] = 0;
                return t
            }, v.str = function (e) {
                return "[" + e[0] + ", " + e[1] + ", " + e[2] + ", " + e[3] + "]"
            };
        var g = {};
        g.create = function (e) {
            var t = new r(2);
            return e ? (t[0] = e[0], t[1] = e[1]) : (t[0] = 0, t[1] = 0), t
        }, g.createFrom = function (e, t) {
            var n = new r(2);
            return n[0] = e, n[1] = t, n
        }, g.add = function (e, t, n) {
            return n || (n = t), n[0] = e[0] + t[0], n[1] = e[1] + t[1], n
        }, g.subtract = function (e, t, n) {
            return n || (n = t), n[0] = e[0] - t[0], n[1] = e[1] - t[1], n
        }, g.multiply = function (e, t, n) {
            return n || (n = t), n[0] = e[0] * t[0], n[1] = e[1] * t[1], n
        }, g.divide = function (e, t, n) {
            return n || (n = t), n[0] = e[0] / t[0], n[1] = e[1] / t[1], n
        }, g.scale = function (e, t, n) {
            return n || (n = e), n[0] = e[0] * t, n[1] = e[1] * t, n
        }, g.dist = function (e, t) {
            var n = t[0] - e[0],
                r = t[1] - e[1];
            return Math.sqrt(n * n + r * r)
        }, g.set = function (e, t) {
            return t[0] = e[0], t[1] = e[1], t
        }, g.equal = function (e, n) {
            return e === n || Math.abs(e[0] - n[0]) < t && Math.abs(e[1] - n[1]) < t
        }, g.negate = function (e, t) {
            return t || (t = e), t[0] = -e[0], t[1] = -e[1], t
        }, g.normalize = function (e, t) {
            t || (t = e);
            var n = e[0] * e[0] + e[1] * e[1];
            return n > 0 ? (n = Math.sqrt(n), t[0] = e[0] / n, t[1] = e[1] / n) : t[0] = t[1] = 0, t
        }, g.cross = function (e, t, n) {
            var r = e[0] * t[1] - e[1] * t[0];
            return n ? (n[0] = n[1] = 0, n[2] = r, n) : r
        }, g.length = function (e) {
            var t = e[0],
                n = e[1];
            return Math.sqrt(t * t + n * n)
        }, g.squaredLength = function (e) {
            var t = e[0],
                n = e[1];
            return t * t + n * n
        }, g.dot = function (e, t) {
            return e[0] * t[0] + e[1] * t[1]
        }, g.direction = function (e, t, n) {
            n || (n = e);
            var r = e[0] - t[0],
                i = e[1] - t[1],
                s = r * r + i * i;
            return s ? (s = 1 / Math.sqrt(s), n[0] = r * s, n[1] = i * s, n) : (n[0] = 0, n[1] = 0, n[2] = 0, n)
        }, g.lerp = function (e, t, n, r) {
            return r || (r = e), r[0] = e[0] + n * (t[0] - e[0]), r[1] = e[1] + n * (t[1] - e[1]), r
        }, g.str = function (e) {
            return "[" + e[0] + ", " + e[1] + "]"
        };
        var y = {};
        y.create = function (e) {
            var t = new r(4);
            return e ? (t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3]) : t[0] = t[1] = t[2] = t[3] = 0, t
        }, y.createFrom = function (e, t, n, i) {
            var s = new r(4);
            return s[0] = e, s[1] = t, s[2] = n, s[3] = i, s
        }, y.set = function (e, t) {
            return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t
        }, y.equal = function (e, n) {
            return e === n || Math.abs(e[0] - n[0]) < t && Math.abs(e[1] - n[1]) < t && Math.abs(e[2] - n[2]) < t && Math.abs(e[3] - n[3]) < t
        }, y.identity = function (e) {
            return e || (e = y.create()), e[0] = 1, e[1] = 0, e[2] = 0, e[3] = 1, e
        }, y.transpose = function (e, t) {
            if (!t || e === t) {
                var n = e[1];
                return e[1] = e[2], e[2] = n, e
            }
            return t[0] = e[0], t[1] = e[2], t[2] = e[1], t[3] = e[3], t
        }, y.determinant = function (e) {
            return e[0] * e[3] - e[2] * e[1]
        }, y.inverse = function (e, t) {
            t || (t = e);
            var n = e[0],
                r = e[1],
                i = e[2],
                s = e[3],
                o = n * s - i * r;
            return o ? (o = 1 / o, t[0] = s * o, t[1] = -r * o, t[2] = -i * o, t[3] = n * o, t) : null
        }, y.multiply = function (e, t, n) {
            n || (n = e);
            var r = e[0],
                i = e[1],
                s = e[2],
                o = e[3];
            return n[0] = r * t[0] + i * t[2], n[1] = r * t[1] + i * t[3], n[2] = s * t[0] + o * t[2], n[3] = s * t[1] + o * t[3], n
        }, y.rotate = function (e, t, n) {
            n || (n = e);
            var r = e[0],
                i = e[1],
                s = e[2],
                o = e[3],
                u = Math.sin(t),
                a = Math.cos(t);
            return n[0] = r * a + i * u, n[1] = r * -u + i * a, n[2] = s * a + o * u, n[3] = s * -u + o * a, n
        }, y.multiplyVec2 = function (e, t, n) {
            n || (n = t);
            var r = t[0],
                i = t[1];
            return n[0] = r * e[0] + i * e[1], n[1] = r * e[2] + i * e[3], n
        }, y.scale = function (e, t, n) {
            n || (n = e);
            var r = e[0],
                i = e[1],
                s = e[2],
                o = e[3],
                u = t[0],
                a = t[1];
            return n[0] = r * u, n[1] = i * a, n[2] = s * u, n[3] = o * a, n
        }, y.str = function (e) {
            return "[" + e[0] + ", " + e[1] + ", " + e[2] + ", " + e[3] + "]"
        };
        var b = {};
        return b.create = function (e) {
            var t = new r(4);
            return e ? (t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3]) : (t[0] = 0, t[1] = 0, t[2] = 0, t[3] = 0), t
        }, b.createFrom = function (e, t, n, i) {
            var s = new r(4);
            return s[0] = e, s[1] = t, s[2] = n, s[3] = i, s
        }, b.add = function (e, t, n) {
            return n || (n = t), n[0] = e[0] + t[0], n[1] = e[1] + t[1], n[2] = e[2] + t[2], n[3] = e[3] + t[3], n
        }, b.subtract = function (e, t, n) {
            return n || (n = t), n[0] = e[0] - t[0], n[1] = e[1] - t[1], n[2] = e[2] - t[2], n[3] = e[3] - t[3], n
        }, b.multiply = function (e, t, n) {
            return n || (n = t), n[0] = e[0] * t[0], n[1] = e[1] * t[1], n[2] = e[2] * t[2], n[3] = e[3] * t[3], n
        }, b.divide = function (e, t, n) {
            return n || (n = t), n[0] = e[0] / t[0], n[1] = e[1] / t[1], n[2] = e[2] / t[2], n[3] = e[3] / t[3], n
        }, b.scale = function (e, t, n) {
            return n || (n = e), n[0] = e[0] * t, n[1] = e[1] * t, n[2] = e[2] * t, n[3] = e[3] * t, n
        }, b.set = function (e, t) {
            return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t
        }, b.equal = function (e, n) {
            return e === n || Math.abs(e[0] - n[0]) < t && Math.abs(e[1] - n[1]) < t && Math.abs(e[2] - n[2]) < t && Math.abs(e[3] - n[3]) < t
        }, b.negate = function (e, t) {
            return t || (t = e), t[0] = -e[0], t[1] = -e[1], t[2] = -e[2], t[3] = -e[3], t
        }, b.length = function (e) {
            var t = e[0],
                n = e[1],
                r = e[2],
                i = e[3];
            return Math.sqrt(t * t + n * n + r * r + i * i)
        }, b.squaredLength = function (e) {
            var t = e[0],
                n = e[1],
                r = e[2],
                i = e[3];
            return t * t + n * n + r * r + i * i
        }, b.lerp = function (e, t, n, r) {
            return r || (r = e), r[0] = e[0] + n * (t[0] - e[0]), r[1] = e[1] + n * (t[1] - e[1]), r[2] = e[2] + n * (t[2] - e[2]), r[3] = e[3] + n * (t[3] - e[3]), r
        }, b.str = function (e) {
            return "[" + e[0] + ", " + e[1] + ", " + e[2] + ", " + e[3] + "]"
        }, e && (e.glMatrixArrayType = r, e.MatrixArray = r, e.setMatrixArrayType = i, e.determineMatrixArrayType = s, e.glMath = n, e.vec2 = g, e.vec3 = o, e.vec4 = b, e.mat2 = y, e.mat3 = p, e.mat4 = d, e.quat4 = v), {
            glMatrixArrayType: r,
            MatrixArray: r,
            setMatrixArrayType: i,
            determineMatrixArrayType: s,
            glMath: n,
            vec2: g,
            vec3: o,
            vec4: b,
            mat2: y,
            mat3: p,
            mat4: d,
            quat4: v
        }
    }), define("compute", ["require", "exports", "module"], function (e, t, n) {
        function r(e, t) {
            this.gl = e, this.shader = t.shader, this.mesh = t.mesh, this.uniforms = t.uniforms, this.outputFBO = t.output, this.blend = t.blend, this.nobind = t.nobind, this.nounbind = t.nounbind
        }
        r.prototype.run = function () {
            this.outputFBO && !this.nobind && this.outputFBO.bind();
            var e = 0,
                t;
            for (var n in this.uniforms) this.uniforms.hasOwnProperty(n) && (t = this.uniforms[n], t.bindTexture && !t.bound && t.bindTexture(e++));
            this.shader.use(), this.shader.uniforms(this.uniforms), this.blend === "add" ? (this.gl.blendFunc(gl.SRC_ALPHA, gl.ONE), this.gl.enable(gl.BLEND)) : this.gl.disable(gl.BLEND), this.mesh.draw(this.shader), this.outputFBO && !this.nounbind && this.outputFBO.unbind();
            for (n in this.uniforms) this.uniforms.hasOwnProperty(n) && (t = this.uniforms[n], t.bindTexture && t.bound && t.unbindTexture())
        }, t.Kernel = r
    }), define("main", ["require", "exports", "module", "game-shim", "engine/fragments", "engine/clock", "engine/input", "engine/utils", "engine/gl/shader", "engine/gl/geometry", "engine/gl/texture", "engine/gl/mesh", "engine/gl/context", "gl-matrix", "compute"], function (e, t, n) {
        function T(e, t, n) {
            document.getElementById("video").style.display = "block"
        }

        function N() {
            var e = new h(b, 32, 32, b.FLOAT, b.LUMINANCE);
            return e.supported
        }

        function C() {
            console.log("INITING SMOKE"), y = document.getElementById("smoke-container"), b = d.initialize(y, {
                context: {
                    depth: !1
                },
                debug: !1,
                extensions: {
                    texture_float: !0
                }
            }, T), E = new u(y), w = new a(y), S = new l(b, resources), window.gl = b, w.mouseUp = function (e, t) {
                console.log("CLICKING SMOKE..."), A(e, t)
            }, b.getExtension("OES_texture_float_linear"), i = N() ? b.LUMINANCE : b.RGBA, onresize, window.addEventListener("resize", f(s, 250)), typeof SMOKE_DEBUG != "undefined" && SMOKE_DEBUG == 1 && L(), s()
        }

        function k() {
            var e = document.querySelectorAll(".glass");
            x.divColor[0] = Math.round(x.divColor[0]), x.divColor[1] = Math.round(x.divColor[1]), x.divColor[2] = Math.round(x.divColor[2]), x.divColor[3] = Math.round(x.divColor[3] * 100) / 100;
            for (var t = 0; t < e.length; t++) {
                var n = e[t];
                n.style.backgroundColor = "rgba(" + x.divColor.join(",") + ")", console.log(x.divColor)
            }
            e = document.querySelectorAll(".grit");
            for (var t = 0; t < e.length; t++) {
                var n = e[t];
                n.style.opacity = x.divColor[3], console.log(x.divColor)
            }
        }

        function L() {
            r = new Stats, r.setMode(0), r.domElement.style.position = "absolute", r.domElement.style.left = "0px", r.domElement.style.top = "0px", document.body.appendChild(r.domElement)
        }

        function A(e, t) {
            advectVelocityKernel.uniforms.dt = x.step, advectVelocityKernel.run(), g.set([10, 10], addForceKernel.uniforms.force), addForceKernel.run(), velocityBoundaryKernel.run(), divergenceKernel.run();
            var n = pressureFBO0,
                r = pressureFBO1,
                i = n;
            for (var s = 0; s < x.iterations * 2; s++) jacobiKernel.uniforms.pressure = pressureBoundaryKernel.uniforms.pressure = n, jacobiKernel.outputFBO = pressureBoundaryKernel.outputFBO = r, jacobiKernel.run(), pressureBoundaryKernel.run(), i = n, n = r, r = i;
            subtractPressureGradientBoundaryKernel.run()
        }

        function O(e, t, n) {
            y.width = e, y.height = t, b.viewport(0, 0, e, t), b.lineWidth(1);
            var i = 1 / y.width,
                s = 1 / y.height,
                o = g.create([i, s]);
            px1 = g.create([1, y.width / y.height]), inside = new p(b, {
                vertex: c.screen_quad(1 - i * 2, 1 - s * 2),
                attributes: {
                    position: {}
                }
            }), all = new p(b, {
                vertex: c.screen_quad(1, 1),
                attributes: {
                    position: {}
                }
            }), boundary = new p(b, {
                mode: b.LINES,
                vertex: new Float32Array([-1 + i * 0, -1 + s * 0, -1 + i * 0, -1 + s * 2, 1 - i * 0, -1 + s * 0, 1 - i * 0, -1 + s * 2, -1 + i * 0, 1 - s * 0, -1 + i * 0, 1 - s * 2, 1 - i * 0, 1 - s * 0, 1 - i * 0, 1 - s * 2, -1 + i * 0, 1 - s * 0, -1 + i * 2, 1 - s * 0, -1 + i * 0, -1 + s * 0, -1 + i * 2, -1 + s * 0, 1 - i * 0, 1 - s * 0, 1 - i * 2, 1 - s * 0, 1 - i * 0, -1 + s * 0, 1 - i * 2, -1 + s * 0]),
                attributes: {
                    position: {
                        size: 2,
                        stride: 16,
                        offset: 0
                    },
                    offset: {
                        size: 2,
                        stride: 16,
                        offset: 8
                    }
                }
            }), velocityFBO0 = new h(b, e, t, b.FLOAT), velocityFBO1 = new h(b, e, t, b.FLOAT), divergenceFBO = new h(b, e, t, b.FLOAT, n), pressureFBO0 = new h(b, e, t, b.FLOAT, n), pressureFBO1 = new h(b, e, t, b.FLOAT, n), advectVelocityKernel = new m(b, {
                shader: S.get("kernel", "advect"),
                mesh: inside,
                uniforms: {
                    px: o,
                    px1: px1,
                    scale: 1,
                    velocity: velocityFBO0,
                    source: velocityFBO0,
                    dt: x.step,
                    tension: x.tension
                },
                output: velocityFBO1
            }), velocityBoundaryKernel = new m(b, {
                shader: S.get("boundary", "advect"),
                mesh: boundary,
                uniforms: {
                    px: o,
                    scale: -1,
                    velocity: velocityFBO0,
                    source: velocityFBO0,
                    dt: 1 / 60,
                    tension: x.tension
                },
                output: velocityFBO1
            }), cursor = new p(b, {
                vertex: c.screen_quad(i * x.cursor_size * 2, s * x.cursor_size * 2),
                attributes: {
                    position: {}
                }
            }), addForceKernel = new m(b, {
                shader: S.get("cursor", "addForce"),
                mesh: cursor,
                blend: "add",
                uniforms: {
                    px: o,
                    force: g.create([.5, .2]),
                    center: g.create([.1, .4]),
                    scale: g.create([x.cursor_size * i, x.cursor_size * s])
                },
                output: velocityFBO1
            }), divergenceKernel = new m(b, {
                shader: S.get("kernel", "divergence"),
                mesh: all,
                uniforms: {
                    velocity: velocityFBO1,
                    px: o,
                    divergenceMagnifier: x.divergenceMagnifier
                },
                output: divergenceFBO
            }), jacobiKernel = new m(b, {
                shader: S.get("kernel", "jacobi"),
                mesh: all,
                nounbind: !0,
                uniforms: {
                    pressure: pressureFBO0,
                    divergence: divergenceFBO,
                    alpha: -1,
                    beta: .25,
                    px: o
                },
                output: pressureFBO1
            }), pressureBoundaryKernel = new m(b, {
                shader: S.get("boundary", "jacobi"),
                mesh: boundary,
                nounbind: !0,
                nobind: !0,
                uniforms: {
                    pressure: pressureFBO0,
                    divergence: divergenceFBO,
                    alpha: -1,
                    beta: .25,
                    px: o
                },
                output: pressureFBO1
            }), subtractPressureGradientKernel = new m(b, {
                shader: S.get("kernel", "subtractPressureGradient"),
                mesh: all,
                uniforms: {
                    scale: 1,
                    pressure: pressureFBO0,
                    velocity: velocityFBO1,
                    px: o
                },
                output: velocityFBO0
            }), subtractPressureGradientBoundaryKernel = new m(b, {
                shader: S.get("boundary", "subtractPressureGradient"),
                mesh: boundary,
                uniforms: {
                    scale: -1,
                    pressure: pressureFBO0,
                    velocity: velocityFBO1,
                    px: o
                },
                output: velocityFBO0
            }), drawKernel = new m(b, {
                shader: S.get("kernel", "visualize"),
                mesh: all,
                uniforms: {
                    velocity: velocityFBO0,
                    brightness: x.brightness,
                    cursor_intensity: x.cursor_intensity
                },
                output: null
            });
            var u = w.mouse.x,
                a = w.mouse.y;
            E.ontick = function (e) {
                typeof SMOKE_DEBUG != "undefined" && SMOKE_DEBUG == 1 && r.begin();
                var t = w.mouse.x * x.resolution,
                    n = w.mouse.y * x.resolution,
                    o = t - u,
                    f = n - a;
                u = t, a = n, u === 0 && a === 0 && (o = f = 0), advectVelocityKernel.uniforms.dt = x.step * 1, advectVelocityKernel.run(), g.set([o * i * x.cursor_size * x.cursor_force, -f * s * x.cursor_size * x.cursor_force], addForceKernel.uniforms.force), g.set([u * i * 2 - 1, (a * s * 2 - 1) * -1], addForceKernel.uniforms.center), addForceKernel.run(), velocityBoundaryKernel.run(), divergenceKernel.run();
                var l = pressureFBO0,
                    c = pressureFBO1,
                    h = l;
                for (var p = 0; p < x.iterations; p++) jacobiKernel.uniforms.pressure = pressureBoundaryKernel.uniforms.pressure = l, jacobiKernel.outputFBO = pressureBoundaryKernel.outputFBO = c, jacobiKernel.run(), pressureBoundaryKernel.run(), h = l, l = c, c = h;
                subtractPressureGradientKernel.run(), subtractPressureGradientBoundaryKernel.run(), drawKernel.run(), typeof SMOKE_DEBUG != "undefined" && SMOKE_DEBUG == 1 && r.end()
            }
        }
        e("game-shim");

        var r, i, s = function () {
            var e = y.getBoundingClientRect(),
                t = e.width * x.resolution,
                n = e.height * x.resolution;
            n = window.innerHeight * x.resolution, w.updateOffset(), O(t, n, i)
        },
        o = e("engine/fragments"),
        u = e("engine/clock").Clock,
        a = e("engine/input").Handler,
        f = e("engine/utils").debounce,
        l = e("engine/gl/shader").Manager,
        c = e("engine/gl/geometry"),
        h = e("engine/gl/texture").FBO,
        p = e("engine/gl/mesh").Mesh,
        d = e("engine/gl/context"),
        v = e("gl-matrix"),
        m = e("compute").Kernel,
        g = v.vec2,
        y, b, w, E, S, x = {
            iterations: 8,
            resolution: 0.25,
            step: 1 / 150,
            cursor_force: 2,
            cursor_intensity: 0.3,
            cursor_size: 30,
            brightness: 1,
            divergenceMagnifier: 0.5,
            tension: .975,
            divColor: [200, 200, 200, 0.5]
        };

        resources = o.resources,
        window.gl = b,
        t.updateSize = s,
        this.init = C,
        this.start = function () {
          console.log("STARTING SMOKE"), E.start()
        },
        this.stop = function () {
          console.log("STOPPING SMOKE"), E.stop()
        },
        this.restart = function () {
          console.log("RESTARTING SMOKE"), s(), E.start()
        },
        window.SmokeEffect = this
    });

(function () {

  // Vroom
  if (!isMobile()) {
    require(['main']);
    window.SmokeEffect.init();
    window.SmokeEffect.restart();
  }

  function isMobile() {
    return (/Android|iPhone|iPad|iPod|BlackBerry/i).test(navigator.userAgent || navigator.vendor || window.opera);
  }

})()

/*! jQuery v3.1.0 | (c) jQuery Foundation | jquery.org/license */
!function(a,b){"use strict";"object"==typeof module&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){"use strict";var c=[],d=a.document,e=Object.getPrototypeOf,f=c.slice,g=c.concat,h=c.push,i=c.indexOf,j={},k=j.toString,l=j.hasOwnProperty,m=l.toString,n=m.call(Object),o={};function p(a,b){b=b||d;var c=b.createElement("script");c.text=a,b.head.appendChild(c).parentNode.removeChild(c)}var q="3.1.0",r=function(a,b){return new r.fn.init(a,b)},s=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,t=/^-ms-/,u=/-([a-z])/g,v=function(a,b){return b.toUpperCase()};r.fn=r.prototype={jquery:q,constructor:r,length:0,toArray:function(){return f.call(this)},get:function(a){return null!=a?a<0?this[a+this.length]:this[a]:f.call(this)},pushStack:function(a){var b=r.merge(this.constructor(),a);return b.prevObject=this,b},each:function(a){return r.each(this,a)},map:function(a){return this.pushStack(r.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(f.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(a<0?b:0);return this.pushStack(c>=0&&c<b?[this[c]]:[])},end:function(){return this.prevObject||this.constructor()},push:h,sort:c.sort,splice:c.splice},r.extend=r.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||r.isFunction(g)||(g={}),h===i&&(g=this,h--);h<i;h++)if(null!=(a=arguments[h]))for(b in a)c=g[b],d=a[b],g!==d&&(j&&d&&(r.isPlainObject(d)||(e=r.isArray(d)))?(e?(e=!1,f=c&&r.isArray(c)?c:[]):f=c&&r.isPlainObject(c)?c:{},g[b]=r.extend(j,f,d)):void 0!==d&&(g[b]=d));return g},r.extend({expando:"jQuery"+(q+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===r.type(a)},isArray:Array.isArray,isWindow:function(a){return null!=a&&a===a.window},isNumeric:function(a){var b=r.type(a);return("number"===b||"string"===b)&&!isNaN(a-parseFloat(a))},isPlainObject:function(a){var b,c;return!(!a||"[object Object]"!==k.call(a))&&(!(b=e(a))||(c=l.call(b,"constructor")&&b.constructor,"function"==typeof c&&m.call(c)===n))},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?j[k.call(a)]||"object":typeof a},globalEval:function(a){p(a)},camelCase:function(a){return a.replace(t,"ms-").replace(u,v)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,b){var c,d=0;if(w(a)){for(c=a.length;d<c;d++)if(b.call(a[d],d,a[d])===!1)break}else for(d in a)if(b.call(a[d],d,a[d])===!1)break;return a},trim:function(a){return null==a?"":(a+"").replace(s,"")},makeArray:function(a,b){var c=b||[];return null!=a&&(w(Object(a))?r.merge(c,"string"==typeof a?[a]:a):h.call(c,a)),c},inArray:function(a,b,c){return null==b?-1:i.call(b,a,c)},merge:function(a,b){for(var c=+b.length,d=0,e=a.length;d<c;d++)a[e++]=b[d];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;f<g;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,c){var d,e,f=0,h=[];if(w(a))for(d=a.length;f<d;f++)e=b(a[f],f,c),null!=e&&h.push(e);else for(f in a)e=b(a[f],f,c),null!=e&&h.push(e);return g.apply([],h)},guid:1,proxy:function(a,b){var c,d,e;if("string"==typeof b&&(c=a[b],b=a,a=c),r.isFunction(a))return d=f.call(arguments,2),e=function(){return a.apply(b||this,d.concat(f.call(arguments)))},e.guid=a.guid=a.guid||r.guid++,e},now:Date.now,support:o}),"function"==typeof Symbol&&(r.fn[Symbol.iterator]=c[Symbol.iterator]),r.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),function(a,b){j["[object "+b+"]"]=b.toLowerCase()});function w(a){var b=!!a&&"length"in a&&a.length,c=r.type(a);return"function"!==c&&!r.isWindow(a)&&("array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a)}var x=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u="sizzle"+1*new Date,v=a.document,w=0,x=0,y=ha(),z=ha(),A=ha(),B=function(a,b){return a===b&&(l=!0),0},C={}.hasOwnProperty,D=[],E=D.pop,F=D.push,G=D.push,H=D.slice,I=function(a,b){for(var c=0,d=a.length;c<d;c++)if(a[c]===b)return c;return-1},J="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",K="[\\x20\\t\\r\\n\\f]",L="(?:\\\\.|[\\w-]|[^\0-\\xa0])+",M="\\["+K+"*("+L+")(?:"+K+"*([*^$|!~]?=)"+K+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+L+"))|)"+K+"*\\]",N=":("+L+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+M+")*)|.*)\\)|)",O=new RegExp(K+"+","g"),P=new RegExp("^"+K+"+|((?:^|[^\\\\])(?:\\\\.)*)"+K+"+$","g"),Q=new RegExp("^"+K+"*,"+K+"*"),R=new RegExp("^"+K+"*([>+~]|"+K+")"+K+"*"),S=new RegExp("="+K+"*([^\\]'\"]*?)"+K+"*\\]","g"),T=new RegExp(N),U=new RegExp("^"+L+"$"),V={ID:new RegExp("^#("+L+")"),CLASS:new RegExp("^\\.("+L+")"),TAG:new RegExp("^("+L+"|[*])"),ATTR:new RegExp("^"+M),PSEUDO:new RegExp("^"+N),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+K+"*(even|odd|(([+-]|)(\\d*)n|)"+K+"*(?:([+-]|)"+K+"*(\\d+)|))"+K+"*\\)|)","i"),bool:new RegExp("^(?:"+J+")$","i"),needsContext:new RegExp("^"+K+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+K+"*((?:-\\d)?\\d*)"+K+"*\\)|)(?=[^-]|$)","i")},W=/^(?:input|select|textarea|button)$/i,X=/^h\d$/i,Y=/^[^{]+\{\s*\[native \w/,Z=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,$=/[+~]/,_=new RegExp("\\\\([\\da-f]{1,6}"+K+"?|("+K+")|.)","ig"),aa=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:d<0?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)},ba=/([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g,ca=function(a,b){return b?"\0"===a?"\ufffd":a.slice(0,-1)+"\\"+a.charCodeAt(a.length-1).toString(16)+" ":"\\"+a},da=function(){m()},ea=ta(function(a){return a.disabled===!0},{dir:"parentNode",next:"legend"});try{G.apply(D=H.call(v.childNodes),v.childNodes),D[v.childNodes.length].nodeType}catch(fa){G={apply:D.length?function(a,b){F.apply(a,H.call(b))}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1}}}function ga(a,b,d,e){var f,h,j,k,l,o,r,s=b&&b.ownerDocument,w=b?b.nodeType:9;if(d=d||[],"string"!=typeof a||!a||1!==w&&9!==w&&11!==w)return d;if(!e&&((b?b.ownerDocument||b:v)!==n&&m(b),b=b||n,p)){if(11!==w&&(l=Z.exec(a)))if(f=l[1]){if(9===w){if(!(j=b.getElementById(f)))return d;if(j.id===f)return d.push(j),d}else if(s&&(j=s.getElementById(f))&&t(b,j)&&j.id===f)return d.push(j),d}else{if(l[2])return G.apply(d,b.getElementsByTagName(a)),d;if((f=l[3])&&c.getElementsByClassName&&b.getElementsByClassName)return G.apply(d,b.getElementsByClassName(f)),d}if(c.qsa&&!A[a+" "]&&(!q||!q.test(a))){if(1!==w)s=b,r=a;else if("object"!==b.nodeName.toLowerCase()){(k=b.getAttribute("id"))?k=k.replace(ba,ca):b.setAttribute("id",k=u),o=g(a),h=o.length;while(h--)o[h]="#"+k+" "+sa(o[h]);r=o.join(","),s=$.test(a)&&qa(b.parentNode)||b}if(r)try{return G.apply(d,s.querySelectorAll(r)),d}catch(x){}finally{k===u&&b.removeAttribute("id")}}}return i(a.replace(P,"$1"),b,d,e)}function ha(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function ia(a){return a[u]=!0,a}function ja(a){var b=n.createElement("fieldset");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function ka(a,b){var c=a.split("|"),e=c.length;while(e--)d.attrHandle[c[e]]=b}function la(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&a.sourceIndex-b.sourceIndex;if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return-1;return a?1:-1}function ma(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function na(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function oa(a){return function(b){return"label"in b&&b.disabled===a||"form"in b&&b.disabled===a||"form"in b&&b.disabled===!1&&(b.isDisabled===a||b.isDisabled!==!a&&("label"in b||!ea(b))!==a)}}function pa(a){return ia(function(b){return b=+b,ia(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function qa(a){return a&&"undefined"!=typeof a.getElementsByTagName&&a}c=ga.support={},f=ga.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return!!b&&"HTML"!==b.nodeName},m=ga.setDocument=function(a){var b,e,g=a?a.ownerDocument||a:v;return g!==n&&9===g.nodeType&&g.documentElement?(n=g,o=n.documentElement,p=!f(n),v!==n&&(e=n.defaultView)&&e.top!==e&&(e.addEventListener?e.addEventListener("unload",da,!1):e.attachEvent&&e.attachEvent("onunload",da)),c.attributes=ja(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=ja(function(a){return a.appendChild(n.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=Y.test(n.getElementsByClassName),c.getById=ja(function(a){return o.appendChild(a).id=u,!n.getElementsByName||!n.getElementsByName(u).length}),c.getById?(d.find.ID=function(a,b){if("undefined"!=typeof b.getElementById&&p){var c=b.getElementById(a);return c?[c]:[]}},d.filter.ID=function(a){var b=a.replace(_,aa);return function(a){return a.getAttribute("id")===b}}):(delete d.find.ID,d.filter.ID=function(a){var b=a.replace(_,aa);return function(a){var c="undefined"!=typeof a.getAttributeNode&&a.getAttributeNode("id");return c&&c.value===b}}),d.find.TAG=c.getElementsByTagName?function(a,b){return"undefined"!=typeof b.getElementsByTagName?b.getElementsByTagName(a):c.qsa?b.querySelectorAll(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){if("undefined"!=typeof b.getElementsByClassName&&p)return b.getElementsByClassName(a)},r=[],q=[],(c.qsa=Y.test(n.querySelectorAll))&&(ja(function(a){o.appendChild(a).innerHTML="<a id='"+u+"'></a><select id='"+u+"-\r\\' msallowcapture=''><option selected=''></option></select>",a.querySelectorAll("[msallowcapture^='']").length&&q.push("[*^$]="+K+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||q.push("\\["+K+"*(?:value|"+J+")"),a.querySelectorAll("[id~="+u+"-]").length||q.push("~="),a.querySelectorAll(":checked").length||q.push(":checked"),a.querySelectorAll("a#"+u+"+*").length||q.push(".#.+[+~]")}),ja(function(a){a.innerHTML="<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";var b=n.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&q.push("name"+K+"*[*^$|!~]?="),2!==a.querySelectorAll(":enabled").length&&q.push(":enabled",":disabled"),o.appendChild(a).disabled=!0,2!==a.querySelectorAll(":disabled").length&&q.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),q.push(",.*:")})),(c.matchesSelector=Y.test(s=o.matches||o.webkitMatchesSelector||o.mozMatchesSelector||o.oMatchesSelector||o.msMatchesSelector))&&ja(function(a){c.disconnectedMatch=s.call(a,"*"),s.call(a,"[s!='']:x"),r.push("!=",N)}),q=q.length&&new RegExp(q.join("|")),r=r.length&&new RegExp(r.join("|")),b=Y.test(o.compareDocumentPosition),t=b||Y.test(o.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return!0;return!1},B=b?function(a,b){if(a===b)return l=!0,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===n||a.ownerDocument===v&&t(v,a)?-1:b===n||b.ownerDocument===v&&t(v,b)?1:k?I(k,a)-I(k,b):0:4&d?-1:1)}:function(a,b){if(a===b)return l=!0,0;var c,d=0,e=a.parentNode,f=b.parentNode,g=[a],h=[b];if(!e||!f)return a===n?-1:b===n?1:e?-1:f?1:k?I(k,a)-I(k,b):0;if(e===f)return la(a,b);c=a;while(c=c.parentNode)g.unshift(c);c=b;while(c=c.parentNode)h.unshift(c);while(g[d]===h[d])d++;return d?la(g[d],h[d]):g[d]===v?-1:h[d]===v?1:0},n):n},ga.matches=function(a,b){return ga(a,null,null,b)},ga.matchesSelector=function(a,b){if((a.ownerDocument||a)!==n&&m(a),b=b.replace(S,"='$1']"),c.matchesSelector&&p&&!A[b+" "]&&(!r||!r.test(b))&&(!q||!q.test(b)))try{var d=s.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return ga(b,n,null,[a]).length>0},ga.contains=function(a,b){return(a.ownerDocument||a)!==n&&m(a),t(a,b)},ga.attr=function(a,b){(a.ownerDocument||a)!==n&&m(a);var e=d.attrHandle[b.toLowerCase()],f=e&&C.call(d.attrHandle,b.toLowerCase())?e(a,b,!p):void 0;return void 0!==f?f:c.attributes||!p?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},ga.escape=function(a){return(a+"").replace(ba,ca)},ga.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},ga.uniqueSort=function(a){var b,d=[],e=0,f=0;if(l=!c.detectDuplicates,k=!c.sortStable&&a.slice(0),a.sort(B),l){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1)}return k=null,a},e=ga.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=ga.selectors={cacheLength:50,createPseudo:ia,match:V,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(_,aa),a[3]=(a[3]||a[4]||a[5]||"").replace(_,aa),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||ga.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&ga.error(a[0]),a},PSEUDO:function(a){var b,c=!a[6]&&a[2];return V.CHILD.test(a[0])?null:(a[3]?a[2]=a[4]||a[5]||"":c&&T.test(c)&&(b=g(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(_,aa).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=y[a+" "];return b||(b=new RegExp("(^|"+K+")"+a+"("+K+"|$)"))&&y(a,function(a){return b.test("string"==typeof a.className&&a.className||"undefined"!=typeof a.getAttribute&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=ga.attr(d,a);return null==e?"!="===b:!b||(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e.replace(O," ")+" ").indexOf(c)>-1:"|="===b&&(e===c||e.slice(0,c.length+1)===c+"-"))}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),s=!i&&!h,t=!1;if(q){if(f){while(p){m=b;while(m=m[p])if(h?m.nodeName.toLowerCase()===r:1===m.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&s){m=q,l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),j=k[a]||[],n=j[0]===w&&j[1],t=n&&j[2],m=n&&q.childNodes[n];while(m=++n&&m&&m[p]||(t=n=0)||o.pop())if(1===m.nodeType&&++t&&m===b){k[a]=[w,n,t];break}}else if(s&&(m=b,l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),j=k[a]||[],n=j[0]===w&&j[1],t=n),t===!1)while(m=++n&&m&&m[p]||(t=n=0)||o.pop())if((h?m.nodeName.toLowerCase()===r:1===m.nodeType)&&++t&&(s&&(l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),k[a]=[w,t]),m===b))break;return t-=e,t===d||t%d===0&&t/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||ga.error("unsupported pseudo: "+a);return e[u]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?ia(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=I(a,f[g]),a[d]=!(c[d]=f[g])}):function(a){return e(a,0,c)}):e}},pseudos:{not:ia(function(a){var b=[],c=[],d=h(a.replace(P,"$1"));return d[u]?ia(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,e,f){return b[0]=a,d(b,null,f,c),b[0]=null,!c.pop()}}),has:ia(function(a){return function(b){return ga(a,b).length>0}}),contains:ia(function(a){return a=a.replace(_,aa),function(b){return(b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:ia(function(a){return U.test(a||"")||ga.error("unsupported lang: "+a),a=a.replace(_,aa).toLowerCase(),function(b){var c;do if(c=p?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===o},focus:function(a){return a===n.activeElement&&(!n.hasFocus||n.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:oa(!1),disabled:oa(!0),checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!d.pseudos.empty(a)},header:function(a){return X.test(a.nodeName)},input:function(a){return W.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:pa(function(){return[0]}),last:pa(function(a,b){return[b-1]}),eq:pa(function(a,b,c){return[c<0?c+b:c]}),even:pa(function(a,b){for(var c=0;c<b;c+=2)a.push(c);return a}),odd:pa(function(a,b){for(var c=1;c<b;c+=2)a.push(c);return a}),lt:pa(function(a,b,c){for(var d=c<0?c+b:c;--d>=0;)a.push(d);return a}),gt:pa(function(a,b,c){for(var d=c<0?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})d.pseudos[b]=ma(b);for(b in{submit:!0,reset:!0})d.pseudos[b]=na(b);function ra(){}ra.prototype=d.filters=d.pseudos,d.setFilters=new ra,g=ga.tokenize=function(a,b){var c,e,f,g,h,i,j,k=z[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){c&&!(e=Q.exec(h))||(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=!1,(e=R.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(P," ")}),h=h.slice(c.length));for(g in d.filter)!(e=V[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?ga.error(a):z(a,i).slice(0)};function sa(a){for(var b=0,c=a.length,d="";b<c;b++)d+=a[b].value;return d}function ta(a,b,c){var d=b.dir,e=b.next,f=e||d,g=c&&"parentNode"===f,h=x++;return b.first?function(b,c,e){while(b=b[d])if(1===b.nodeType||g)return a(b,c,e)}:function(b,c,i){var j,k,l,m=[w,h];if(i){while(b=b[d])if((1===b.nodeType||g)&&a(b,c,i))return!0}else while(b=b[d])if(1===b.nodeType||g)if(l=b[u]||(b[u]={}),k=l[b.uniqueID]||(l[b.uniqueID]={}),e&&e===b.nodeName.toLowerCase())b=b[d]||b;else{if((j=k[f])&&j[0]===w&&j[1]===h)return m[2]=j[2];if(k[f]=m,m[2]=a(b,c,i))return!0}}}function ua(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function va(a,b,c){for(var d=0,e=b.length;d<e;d++)ga(a,b[d],c);return c}function wa(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;h<i;h++)(f=a[h])&&(c&&!c(f,d,e)||(g.push(f),j&&b.push(h)));return g}function xa(a,b,c,d,e,f){return d&&!d[u]&&(d=xa(d)),e&&!e[u]&&(e=xa(e,f)),ia(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||va(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:wa(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=wa(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l))}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i)}k=r.length;while(k--)(l=r[k])&&(j=e?I(f,l):m[k])>-1&&(f[j]=!(g[j]=l))}}else r=wa(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):G.apply(g,r)})}function ya(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],h=g||d.relative[" "],i=g?1:0,k=ta(function(a){return a===b},h,!0),l=ta(function(a){return I(b,a)>-1},h,!0),m=[function(a,c,d){var e=!g&&(d||c!==j)||((b=c).nodeType?k(a,c,d):l(a,c,d));return b=null,e}];i<f;i++)if(c=d.relative[a[i].type])m=[ta(ua(m),c)];else{if(c=d.filter[a[i].type].apply(null,a[i].matches),c[u]){for(e=++i;e<f;e++)if(d.relative[a[e].type])break;return xa(i>1&&ua(m),i>1&&sa(a.slice(0,i-1).concat({value:" "===a[i-2].type?"*":""})).replace(P,"$1"),c,i<e&&ya(a.slice(i,e)),e<f&&ya(a=a.slice(e)),e<f&&sa(a))}m.push(c)}return ua(m)}function za(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,h,i,k){var l,o,q,r=0,s="0",t=f&&[],u=[],v=j,x=f||e&&d.find.TAG("*",k),y=w+=null==v?1:Math.random()||.1,z=x.length;for(k&&(j=g===n||g||k);s!==z&&null!=(l=x[s]);s++){if(e&&l){o=0,g||l.ownerDocument===n||(m(l),h=!p);while(q=a[o++])if(q(l,g||n,h)){i.push(l);break}k&&(w=y)}c&&((l=!q&&l)&&r--,f&&t.push(l))}if(r+=s,c&&s!==r){o=0;while(q=b[o++])q(t,u,g,h);if(f){if(r>0)while(s--)t[s]||u[s]||(u[s]=E.call(i));u=wa(u)}G.apply(i,u),k&&!f&&u.length>0&&r+b.length>1&&ga.uniqueSort(i)}return k&&(w=y,j=v),t};return c?ia(f):f}return h=ga.compile=function(a,b){var c,d=[],e=[],f=A[a+" "];if(!f){b||(b=g(a)),c=b.length;while(c--)f=ya(b[c]),f[u]?d.push(f):e.push(f);f=A(a,za(e,d)),f.selector=a}return f},i=ga.select=function(a,b,e,f){var i,j,k,l,m,n="function"==typeof a&&a,o=!f&&g(a=n.selector||a);if(e=e||[],1===o.length){if(j=o[0]=o[0].slice(0),j.length>2&&"ID"===(k=j[0]).type&&c.getById&&9===b.nodeType&&p&&d.relative[j[1].type]){if(b=(d.find.ID(k.matches[0].replace(_,aa),b)||[])[0],!b)return e;n&&(b=b.parentNode),a=a.slice(j.shift().value.length)}i=V.needsContext.test(a)?0:j.length;while(i--){if(k=j[i],d.relative[l=k.type])break;if((m=d.find[l])&&(f=m(k.matches[0].replace(_,aa),$.test(j[0].type)&&qa(b.parentNode)||b))){if(j.splice(i,1),a=f.length&&sa(j),!a)return G.apply(e,f),e;break}}}return(n||h(a,o))(f,b,!p,e,!b||$.test(a)&&qa(b.parentNode)||b),e},c.sortStable=u.split("").sort(B).join("")===u,c.detectDuplicates=!!l,m(),c.sortDetached=ja(function(a){return 1&a.compareDocumentPosition(n.createElement("fieldset"))}),ja(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||ka("type|href|height|width",function(a,b,c){if(!c)return a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&ja(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||ka("value",function(a,b,c){if(!c&&"input"===a.nodeName.toLowerCase())return a.defaultValue}),ja(function(a){return null==a.getAttribute("disabled")})||ka(J,function(a,b,c){var d;if(!c)return a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),ga}(a);r.find=x,r.expr=x.selectors,r.expr[":"]=r.expr.pseudos,r.uniqueSort=r.unique=x.uniqueSort,r.text=x.getText,r.isXMLDoc=x.isXML,r.contains=x.contains,r.escapeSelector=x.escape;var y=function(a,b,c){var d=[],e=void 0!==c;while((a=a[b])&&9!==a.nodeType)if(1===a.nodeType){if(e&&r(a).is(c))break;d.push(a)}return d},z=function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c},A=r.expr.match.needsContext,B=/^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i,C=/^.[^:#\[\.,]*$/;function D(a,b,c){if(r.isFunction(b))return r.grep(a,function(a,d){return!!b.call(a,d,a)!==c});if(b.nodeType)return r.grep(a,function(a){return a===b!==c});if("string"==typeof b){if(C.test(b))return r.filter(b,a,c);b=r.filter(b,a)}return r.grep(a,function(a){return i.call(b,a)>-1!==c&&1===a.nodeType})}r.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?r.find.matchesSelector(d,a)?[d]:[]:r.find.matches(a,r.grep(b,function(a){return 1===a.nodeType}))},r.fn.extend({find:function(a){var b,c,d=this.length,e=this;if("string"!=typeof a)return this.pushStack(r(a).filter(function(){for(b=0;b<d;b++)if(r.contains(e[b],this))return!0}));for(c=this.pushStack([]),b=0;b<d;b++)r.find(a,e[b],c);return d>1?r.uniqueSort(c):c},filter:function(a){return this.pushStack(D(this,a||[],!1))},not:function(a){return this.pushStack(D(this,a||[],!0))},is:function(a){return!!D(this,"string"==typeof a&&A.test(a)?r(a):a||[],!1).length}});var E,F=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,G=r.fn.init=function(a,b,c){var e,f;if(!a)return this;if(c=c||E,"string"==typeof a){if(e="<"===a[0]&&">"===a[a.length-1]&&a.length>=3?[null,a,null]:F.exec(a),!e||!e[1]&&b)return!b||b.jquery?(b||c).find(a):this.constructor(b).find(a);if(e[1]){if(b=b instanceof r?b[0]:b,r.merge(this,r.parseHTML(e[1],b&&b.nodeType?b.ownerDocument||b:d,!0)),B.test(e[1])&&r.isPlainObject(b))for(e in b)r.isFunction(this[e])?this[e](b[e]):this.attr(e,b[e]);return this}return f=d.getElementById(e[2]),f&&(this[0]=f,this.length=1),this}return a.nodeType?(this[0]=a,this.length=1,this):r.isFunction(a)?void 0!==c.ready?c.ready(a):a(r):r.makeArray(a,this)};G.prototype=r.fn,E=r(d);var H=/^(?:parents|prev(?:Until|All))/,I={children:!0,contents:!0,next:!0,prev:!0};r.fn.extend({has:function(a){var b=r(a,this),c=b.length;return this.filter(function(){for(var a=0;a<c;a++)if(r.contains(this,b[a]))return!0})},closest:function(a,b){var c,d=0,e=this.length,f=[],g="string"!=typeof a&&r(a);if(!A.test(a))for(;d<e;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&r.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?r.uniqueSort(f):f)},index:function(a){return a?"string"==typeof a?i.call(r(a),this[0]):i.call(this,a.jquery?a[0]:a):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(r.uniqueSort(r.merge(this.get(),r(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}});function J(a,b){while((a=a[b])&&1!==a.nodeType);return a}r.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return y(a,"parentNode")},parentsUntil:function(a,b,c){return y(a,"parentNode",c)},next:function(a){return J(a,"nextSibling")},prev:function(a){return J(a,"previousSibling")},nextAll:function(a){return y(a,"nextSibling")},prevAll:function(a){return y(a,"previousSibling")},nextUntil:function(a,b,c){return y(a,"nextSibling",c)},prevUntil:function(a,b,c){return y(a,"previousSibling",c)},siblings:function(a){return z((a.parentNode||{}).firstChild,a)},children:function(a){return z(a.firstChild)},contents:function(a){return a.contentDocument||r.merge([],a.childNodes)}},function(a,b){r.fn[a]=function(c,d){var e=r.map(this,b,c);return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=r.filter(d,e)),this.length>1&&(I[a]||r.uniqueSort(e),H.test(a)&&e.reverse()),this.pushStack(e)}});var K=/\S+/g;function L(a){var b={};return r.each(a.match(K)||[],function(a,c){b[c]=!0}),b}r.Callbacks=function(a){a="string"==typeof a?L(a):r.extend({},a);var b,c,d,e,f=[],g=[],h=-1,i=function(){for(e=a.once,d=b=!0;g.length;h=-1){c=g.shift();while(++h<f.length)f[h].apply(c[0],c[1])===!1&&a.stopOnFalse&&(h=f.length,c=!1)}a.memory||(c=!1),b=!1,e&&(f=c?[]:"")},j={add:function(){return f&&(c&&!b&&(h=f.length-1,g.push(c)),function d(b){r.each(b,function(b,c){r.isFunction(c)?a.unique&&j.has(c)||f.push(c):c&&c.length&&"string"!==r.type(c)&&d(c)})}(arguments),c&&!b&&i()),this},remove:function(){return r.each(arguments,function(a,b){var c;while((c=r.inArray(b,f,c))>-1)f.splice(c,1),c<=h&&h--}),this},has:function(a){return a?r.inArray(a,f)>-1:f.length>0},empty:function(){return f&&(f=[]),this},disable:function(){return e=g=[],f=c="",this},disabled:function(){return!f},lock:function(){return e=g=[],c||b||(f=c=""),this},locked:function(){return!!e},fireWith:function(a,c){return e||(c=c||[],c=[a,c.slice?c.slice():c],g.push(c),b||i()),this},fire:function(){return j.fireWith(this,arguments),this},fired:function(){return!!d}};return j};function M(a){return a}function N(a){throw a}function O(a,b,c){var d;try{a&&r.isFunction(d=a.promise)?d.call(a).done(b).fail(c):a&&r.isFunction(d=a.then)?d.call(a,b,c):b.call(void 0,a)}catch(a){c.call(void 0,a)}}r.extend({Deferred:function(b){var c=[["notify","progress",r.Callbacks("memory"),r.Callbacks("memory"),2],["resolve","done",r.Callbacks("once memory"),r.Callbacks("once memory"),0,"resolved"],["reject","fail",r.Callbacks("once memory"),r.Callbacks("once memory"),1,"rejected"]],d="pending",e={state:function(){return d},always:function(){return f.done(arguments).fail(arguments),this},"catch":function(a){return e.then(null,a)},pipe:function(){var a=arguments;return r.Deferred(function(b){r.each(c,function(c,d){var e=r.isFunction(a[d[4]])&&a[d[4]];f[d[1]](function(){var a=e&&e.apply(this,arguments);a&&r.isFunction(a.promise)?a.promise().progress(b.notify).done(b.resolve).fail(b.reject):b[d[0]+"With"](this,e?[a]:arguments)})}),a=null}).promise()},then:function(b,d,e){var f=0;function g(b,c,d,e){return function(){var h=this,i=arguments,j=function(){var a,j;if(!(b<f)){if(a=d.apply(h,i),a===c.promise())throw new TypeError("Thenable self-resolution");j=a&&("object"==typeof a||"function"==typeof a)&&a.then,r.isFunction(j)?e?j.call(a,g(f,c,M,e),g(f,c,N,e)):(f++,j.call(a,g(f,c,M,e),g(f,c,N,e),g(f,c,M,c.notifyWith))):(d!==M&&(h=void 0,i=[a]),(e||c.resolveWith)(h,i))}},k=e?j:function(){try{j()}catch(a){r.Deferred.exceptionHook&&r.Deferred.exceptionHook(a,k.stackTrace),b+1>=f&&(d!==N&&(h=void 0,i=[a]),c.rejectWith(h,i))}};b?k():(r.Deferred.getStackHook&&(k.stackTrace=r.Deferred.getStackHook()),a.setTimeout(k))}}return r.Deferred(function(a){c[0][3].add(g(0,a,r.isFunction(e)?e:M,a.notifyWith)),c[1][3].add(g(0,a,r.isFunction(b)?b:M)),c[2][3].add(g(0,a,r.isFunction(d)?d:N))}).promise()},promise:function(a){return null!=a?r.extend(a,e):e}},f={};return r.each(c,function(a,b){var g=b[2],h=b[5];e[b[1]]=g.add,h&&g.add(function(){d=h},c[3-a][2].disable,c[0][2].lock),g.add(b[3].fire),f[b[0]]=function(){return f[b[0]+"With"](this===f?void 0:this,arguments),this},f[b[0]+"With"]=g.fireWith}),e.promise(f),b&&b.call(f,f),f},when:function(a){var b=arguments.length,c=b,d=Array(c),e=f.call(arguments),g=r.Deferred(),h=function(a){return function(c){d[a]=this,e[a]=arguments.length>1?f.call(arguments):c,--b||g.resolveWith(d,e)}};if(b<=1&&(O(a,g.done(h(c)).resolve,g.reject),"pending"===g.state()||r.isFunction(e[c]&&e[c].then)))return g.then();while(c--)O(e[c],h(c),g.reject);return g.promise()}});var P=/^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;r.Deferred.exceptionHook=function(b,c){a.console&&a.console.warn&&b&&P.test(b.name)&&a.console.warn("jQuery.Deferred exception: "+b.message,b.stack,c)},r.readyException=function(b){a.setTimeout(function(){throw b})};var Q=r.Deferred();r.fn.ready=function(a){return Q.then(a)["catch"](function(a){r.readyException(a)}),this},r.extend({isReady:!1,readyWait:1,holdReady:function(a){a?r.readyWait++:r.ready(!0)},ready:function(a){(a===!0?--r.readyWait:r.isReady)||(r.isReady=!0,a!==!0&&--r.readyWait>0||Q.resolveWith(d,[r]))}}),r.ready.then=Q.then;function R(){d.removeEventListener("DOMContentLoaded",R),a.removeEventListener("load",R),r.ready()}"complete"===d.readyState||"loading"!==d.readyState&&!d.documentElement.doScroll?a.setTimeout(r.ready):(d.addEventListener("DOMContentLoaded",R),a.addEventListener("load",R));var S=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===r.type(c)){e=!0;for(h in c)S(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,
r.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(r(a),c)})),b))for(;h<i;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f},T=function(a){return 1===a.nodeType||9===a.nodeType||!+a.nodeType};function U(){this.expando=r.expando+U.uid++}U.uid=1,U.prototype={cache:function(a){var b=a[this.expando];return b||(b={},T(a)&&(a.nodeType?a[this.expando]=b:Object.defineProperty(a,this.expando,{value:b,configurable:!0}))),b},set:function(a,b,c){var d,e=this.cache(a);if("string"==typeof b)e[r.camelCase(b)]=c;else for(d in b)e[r.camelCase(d)]=b[d];return e},get:function(a,b){return void 0===b?this.cache(a):a[this.expando]&&a[this.expando][r.camelCase(b)]},access:function(a,b,c){return void 0===b||b&&"string"==typeof b&&void 0===c?this.get(a,b):(this.set(a,b,c),void 0!==c?c:b)},remove:function(a,b){var c,d=a[this.expando];if(void 0!==d){if(void 0!==b){r.isArray(b)?b=b.map(r.camelCase):(b=r.camelCase(b),b=b in d?[b]:b.match(K)||[]),c=b.length;while(c--)delete d[b[c]]}(void 0===b||r.isEmptyObject(d))&&(a.nodeType?a[this.expando]=void 0:delete a[this.expando])}},hasData:function(a){var b=a[this.expando];return void 0!==b&&!r.isEmptyObject(b)}};var V=new U,W=new U,X=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,Y=/[A-Z]/g;function Z(a,b,c){var d;if(void 0===c&&1===a.nodeType)if(d="data-"+b.replace(Y,"-$&").toLowerCase(),c=a.getAttribute(d),"string"==typeof c){try{c="true"===c||"false"!==c&&("null"===c?null:+c+""===c?+c:X.test(c)?JSON.parse(c):c)}catch(e){}W.set(a,b,c)}else c=void 0;return c}r.extend({hasData:function(a){return W.hasData(a)||V.hasData(a)},data:function(a,b,c){return W.access(a,b,c)},removeData:function(a,b){W.remove(a,b)},_data:function(a,b,c){return V.access(a,b,c)},_removeData:function(a,b){V.remove(a,b)}}),r.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=W.get(f),1===f.nodeType&&!V.get(f,"hasDataAttrs"))){c=g.length;while(c--)g[c]&&(d=g[c].name,0===d.indexOf("data-")&&(d=r.camelCase(d.slice(5)),Z(f,d,e[d])));V.set(f,"hasDataAttrs",!0)}return e}return"object"==typeof a?this.each(function(){W.set(this,a)}):S(this,function(b){var c;if(f&&void 0===b){if(c=W.get(f,a),void 0!==c)return c;if(c=Z(f,a),void 0!==c)return c}else this.each(function(){W.set(this,a,b)})},null,b,arguments.length>1,null,!0)},removeData:function(a){return this.each(function(){W.remove(this,a)})}}),r.extend({queue:function(a,b,c){var d;if(a)return b=(b||"fx")+"queue",d=V.get(a,b),c&&(!d||r.isArray(c)?d=V.access(a,b,r.makeArray(c)):d.push(c)),d||[]},dequeue:function(a,b){b=b||"fx";var c=r.queue(a,b),d=c.length,e=c.shift(),f=r._queueHooks(a,b),g=function(){r.dequeue(a,b)};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return V.get(a,c)||V.access(a,c,{empty:r.Callbacks("once memory").add(function(){V.remove(a,[b+"queue",c])})})}}),r.fn.extend({queue:function(a,b){var c=2;return"string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?r.queue(this[0],a):void 0===b?this:this.each(function(){var c=r.queue(this,a,b);r._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&r.dequeue(this,a)})},dequeue:function(a){return this.each(function(){r.dequeue(this,a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){var c,d=1,e=r.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f])};"string"!=typeof a&&(b=a,a=void 0),a=a||"fx";while(g--)c=V.get(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}});var $=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,_=new RegExp("^(?:([+-])=|)("+$+")([a-z%]*)$","i"),aa=["Top","Right","Bottom","Left"],ba=function(a,b){return a=b||a,"none"===a.style.display||""===a.style.display&&r.contains(a.ownerDocument,a)&&"none"===r.css(a,"display")},ca=function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e};function da(a,b,c,d){var e,f=1,g=20,h=d?function(){return d.cur()}:function(){return r.css(a,b,"")},i=h(),j=c&&c[3]||(r.cssNumber[b]?"":"px"),k=(r.cssNumber[b]||"px"!==j&&+i)&&_.exec(r.css(a,b));if(k&&k[3]!==j){j=j||k[3],c=c||[],k=+i||1;do f=f||".5",k/=f,r.style(a,b,k+j);while(f!==(f=h()/i)&&1!==f&&--g)}return c&&(k=+k||+i||0,e=c[1]?k+(c[1]+1)*c[2]:+c[2],d&&(d.unit=j,d.start=k,d.end=e)),e}var ea={};function fa(a){var b,c=a.ownerDocument,d=a.nodeName,e=ea[d];return e?e:(b=c.body.appendChild(c.createElement(d)),e=r.css(b,"display"),b.parentNode.removeChild(b),"none"===e&&(e="block"),ea[d]=e,e)}function ga(a,b){for(var c,d,e=[],f=0,g=a.length;f<g;f++)d=a[f],d.style&&(c=d.style.display,b?("none"===c&&(e[f]=V.get(d,"display")||null,e[f]||(d.style.display="")),""===d.style.display&&ba(d)&&(e[f]=fa(d))):"none"!==c&&(e[f]="none",V.set(d,"display",c)));for(f=0;f<g;f++)null!=e[f]&&(a[f].style.display=e[f]);return a}r.fn.extend({show:function(){return ga(this,!0)},hide:function(){return ga(this)},toggle:function(a){return"boolean"==typeof a?a?this.show():this.hide():this.each(function(){ba(this)?r(this).show():r(this).hide()})}});var ha=/^(?:checkbox|radio)$/i,ia=/<([a-z][^\/\0>\x20\t\r\n\f]+)/i,ja=/^$|\/(?:java|ecma)script/i,ka={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};ka.optgroup=ka.option,ka.tbody=ka.tfoot=ka.colgroup=ka.caption=ka.thead,ka.th=ka.td;function la(a,b){var c="undefined"!=typeof a.getElementsByTagName?a.getElementsByTagName(b||"*"):"undefined"!=typeof a.querySelectorAll?a.querySelectorAll(b||"*"):[];return void 0===b||b&&r.nodeName(a,b)?r.merge([a],c):c}function ma(a,b){for(var c=0,d=a.length;c<d;c++)V.set(a[c],"globalEval",!b||V.get(b[c],"globalEval"))}var na=/<|&#?\w+;/;function oa(a,b,c,d,e){for(var f,g,h,i,j,k,l=b.createDocumentFragment(),m=[],n=0,o=a.length;n<o;n++)if(f=a[n],f||0===f)if("object"===r.type(f))r.merge(m,f.nodeType?[f]:f);else if(na.test(f)){g=g||l.appendChild(b.createElement("div")),h=(ia.exec(f)||["",""])[1].toLowerCase(),i=ka[h]||ka._default,g.innerHTML=i[1]+r.htmlPrefilter(f)+i[2],k=i[0];while(k--)g=g.lastChild;r.merge(m,g.childNodes),g=l.firstChild,g.textContent=""}else m.push(b.createTextNode(f));l.textContent="",n=0;while(f=m[n++])if(d&&r.inArray(f,d)>-1)e&&e.push(f);else if(j=r.contains(f.ownerDocument,f),g=la(l.appendChild(f),"script"),j&&ma(g),c){k=0;while(f=g[k++])ja.test(f.type||"")&&c.push(f)}return l}!function(){var a=d.createDocumentFragment(),b=a.appendChild(d.createElement("div")),c=d.createElement("input");c.setAttribute("type","radio"),c.setAttribute("checked","checked"),c.setAttribute("name","t"),b.appendChild(c),o.checkClone=b.cloneNode(!0).cloneNode(!0).lastChild.checked,b.innerHTML="<textarea>x</textarea>",o.noCloneChecked=!!b.cloneNode(!0).lastChild.defaultValue}();var pa=d.documentElement,qa=/^key/,ra=/^(?:mouse|pointer|contextmenu|drag|drop)|click/,sa=/^([^.]*)(?:\.(.+)|)/;function ta(){return!0}function ua(){return!1}function va(){try{return d.activeElement}catch(a){}}function wa(a,b,c,d,e,f){var g,h;if("object"==typeof b){"string"!=typeof c&&(d=d||c,c=void 0);for(h in b)wa(a,h,c,d,b[h],f);return a}if(null==d&&null==e?(e=c,d=c=void 0):null==e&&("string"==typeof c?(e=d,d=void 0):(e=d,d=c,c=void 0)),e===!1)e=ua;else if(!e)return a;return 1===f&&(g=e,e=function(a){return r().off(a),g.apply(this,arguments)},e.guid=g.guid||(g.guid=r.guid++)),a.each(function(){r.event.add(this,b,e,d,c)})}r.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,n,o,p,q=V.get(a);if(q){c.handler&&(f=c,c=f.handler,e=f.selector),e&&r.find.matchesSelector(pa,e),c.guid||(c.guid=r.guid++),(i=q.events)||(i=q.events={}),(g=q.handle)||(g=q.handle=function(b){return"undefined"!=typeof r&&r.event.triggered!==b.type?r.event.dispatch.apply(a,arguments):void 0}),b=(b||"").match(K)||[""],j=b.length;while(j--)h=sa.exec(b[j])||[],n=p=h[1],o=(h[2]||"").split(".").sort(),n&&(l=r.event.special[n]||{},n=(e?l.delegateType:l.bindType)||n,l=r.event.special[n]||{},k=r.extend({type:n,origType:p,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&r.expr.match.needsContext.test(e),namespace:o.join(".")},f),(m=i[n])||(m=i[n]=[],m.delegateCount=0,l.setup&&l.setup.call(a,d,o,g)!==!1||a.addEventListener&&a.addEventListener(n,g)),l.add&&(l.add.call(a,k),k.handler.guid||(k.handler.guid=c.guid)),e?m.splice(m.delegateCount++,0,k):m.push(k),r.event.global[n]=!0)}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,n,o,p,q=V.hasData(a)&&V.get(a);if(q&&(i=q.events)){b=(b||"").match(K)||[""],j=b.length;while(j--)if(h=sa.exec(b[j])||[],n=p=h[1],o=(h[2]||"").split(".").sort(),n){l=r.event.special[n]||{},n=(d?l.delegateType:l.bindType)||n,m=i[n]||[],h=h[2]&&new RegExp("(^|\\.)"+o.join("\\.(?:.*\\.|)")+"(\\.|$)"),g=f=m.length;while(f--)k=m[f],!e&&p!==k.origType||c&&c.guid!==k.guid||h&&!h.test(k.namespace)||d&&d!==k.selector&&("**"!==d||!k.selector)||(m.splice(f,1),k.selector&&m.delegateCount--,l.remove&&l.remove.call(a,k));g&&!m.length&&(l.teardown&&l.teardown.call(a,o,q.handle)!==!1||r.removeEvent(a,n,q.handle),delete i[n])}else for(n in i)r.event.remove(a,n+b[j],c,d,!0);r.isEmptyObject(i)&&V.remove(a,"handle events")}},dispatch:function(a){var b=r.event.fix(a),c,d,e,f,g,h,i=new Array(arguments.length),j=(V.get(this,"events")||{})[b.type]||[],k=r.event.special[b.type]||{};for(i[0]=b,c=1;c<arguments.length;c++)i[c]=arguments[c];if(b.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,b)!==!1){h=r.event.handlers.call(this,b,j),c=0;while((f=h[c++])&&!b.isPropagationStopped()){b.currentTarget=f.elem,d=0;while((g=f.handlers[d++])&&!b.isImmediatePropagationStopped())b.rnamespace&&!b.rnamespace.test(g.namespace)||(b.handleObj=g,b.data=g.data,e=((r.event.special[g.origType]||{}).handle||g.handler).apply(f.elem,i),void 0!==e&&(b.result=e)===!1&&(b.preventDefault(),b.stopPropagation()))}return k.postDispatch&&k.postDispatch.call(this,b),b.result}},handlers:function(a,b){var c,d,e,f,g=[],h=b.delegateCount,i=a.target;if(h&&i.nodeType&&("click"!==a.type||isNaN(a.button)||a.button<1))for(;i!==this;i=i.parentNode||this)if(1===i.nodeType&&(i.disabled!==!0||"click"!==a.type)){for(d=[],c=0;c<h;c++)f=b[c],e=f.selector+" ",void 0===d[e]&&(d[e]=f.needsContext?r(e,this).index(i)>-1:r.find(e,this,null,[i]).length),d[e]&&d.push(f);d.length&&g.push({elem:i,handlers:d})}return h<b.length&&g.push({elem:this,handlers:b.slice(h)}),g},addProp:function(a,b){Object.defineProperty(r.Event.prototype,a,{enumerable:!0,configurable:!0,get:r.isFunction(b)?function(){if(this.originalEvent)return b(this.originalEvent)}:function(){if(this.originalEvent)return this.originalEvent[a]},set:function(b){Object.defineProperty(this,a,{enumerable:!0,configurable:!0,writable:!0,value:b})}})},fix:function(a){return a[r.expando]?a:new r.Event(a)},special:{load:{noBubble:!0},focus:{trigger:function(){if(this!==va()&&this.focus)return this.focus(),!1},delegateType:"focusin"},blur:{trigger:function(){if(this===va()&&this.blur)return this.blur(),!1},delegateType:"focusout"},click:{trigger:function(){if("checkbox"===this.type&&this.click&&r.nodeName(this,"input"))return this.click(),!1},_default:function(a){return r.nodeName(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&a.originalEvent&&(a.originalEvent.returnValue=a.result)}}}},r.removeEvent=function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c)},r.Event=function(a,b){return this instanceof r.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&a.returnValue===!1?ta:ua,this.target=a.target&&3===a.target.nodeType?a.target.parentNode:a.target,this.currentTarget=a.currentTarget,this.relatedTarget=a.relatedTarget):this.type=a,b&&r.extend(this,b),this.timeStamp=a&&a.timeStamp||r.now(),void(this[r.expando]=!0)):new r.Event(a,b)},r.Event.prototype={constructor:r.Event,isDefaultPrevented:ua,isPropagationStopped:ua,isImmediatePropagationStopped:ua,isSimulated:!1,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=ta,a&&!this.isSimulated&&a.preventDefault()},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=ta,a&&!this.isSimulated&&a.stopPropagation()},stopImmediatePropagation:function(){var a=this.originalEvent;this.isImmediatePropagationStopped=ta,a&&!this.isSimulated&&a.stopImmediatePropagation(),this.stopPropagation()}},r.each({altKey:!0,bubbles:!0,cancelable:!0,changedTouches:!0,ctrlKey:!0,detail:!0,eventPhase:!0,metaKey:!0,pageX:!0,pageY:!0,shiftKey:!0,view:!0,"char":!0,charCode:!0,key:!0,keyCode:!0,button:!0,buttons:!0,clientX:!0,clientY:!0,offsetX:!0,offsetY:!0,pointerId:!0,pointerType:!0,screenX:!0,screenY:!0,targetTouches:!0,toElement:!0,touches:!0,which:function(a){var b=a.button;return null==a.which&&qa.test(a.type)?null!=a.charCode?a.charCode:a.keyCode:!a.which&&void 0!==b&&ra.test(a.type)?1&b?1:2&b?3:4&b?2:0:a.which}},r.event.addProp),r.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(a,b){r.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return e&&(e===d||r.contains(d,e))||(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),r.fn.extend({on:function(a,b,c,d){return wa(this,a,b,c,d)},one:function(a,b,c,d){return wa(this,a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,r(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return b!==!1&&"function"!=typeof b||(c=b,b=void 0),c===!1&&(c=ua),this.each(function(){r.event.remove(this,a,c,b)})}});var xa=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,ya=/<script|<style|<link/i,za=/checked\s*(?:[^=]|=\s*.checked.)/i,Aa=/^true\/(.*)/,Ba=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;function Ca(a,b){return r.nodeName(a,"table")&&r.nodeName(11!==b.nodeType?b:b.firstChild,"tr")?a.getElementsByTagName("tbody")[0]||a:a}function Da(a){return a.type=(null!==a.getAttribute("type"))+"/"+a.type,a}function Ea(a){var b=Aa.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function Fa(a,b){var c,d,e,f,g,h,i,j;if(1===b.nodeType){if(V.hasData(a)&&(f=V.access(a),g=V.set(b,f),j=f.events)){delete g.handle,g.events={};for(e in j)for(c=0,d=j[e].length;c<d;c++)r.event.add(b,e,j[e][c])}W.hasData(a)&&(h=W.access(a),i=r.extend({},h),W.set(b,i))}}function Ga(a,b){var c=b.nodeName.toLowerCase();"input"===c&&ha.test(a.type)?b.checked=a.checked:"input"!==c&&"textarea"!==c||(b.defaultValue=a.defaultValue)}function Ha(a,b,c,d){b=g.apply([],b);var e,f,h,i,j,k,l=0,m=a.length,n=m-1,q=b[0],s=r.isFunction(q);if(s||m>1&&"string"==typeof q&&!o.checkClone&&za.test(q))return a.each(function(e){var f=a.eq(e);s&&(b[0]=q.call(this,e,f.html())),Ha(f,b,c,d)});if(m&&(e=oa(b,a[0].ownerDocument,!1,a,d),f=e.firstChild,1===e.childNodes.length&&(e=f),f||d)){for(h=r.map(la(e,"script"),Da),i=h.length;l<m;l++)j=e,l!==n&&(j=r.clone(j,!0,!0),i&&r.merge(h,la(j,"script"))),c.call(a[l],j,l);if(i)for(k=h[h.length-1].ownerDocument,r.map(h,Ea),l=0;l<i;l++)j=h[l],ja.test(j.type||"")&&!V.access(j,"globalEval")&&r.contains(k,j)&&(j.src?r._evalUrl&&r._evalUrl(j.src):p(j.textContent.replace(Ba,""),k))}return a}function Ia(a,b,c){for(var d,e=b?r.filter(b,a):a,f=0;null!=(d=e[f]);f++)c||1!==d.nodeType||r.cleanData(la(d)),d.parentNode&&(c&&r.contains(d.ownerDocument,d)&&ma(la(d,"script")),d.parentNode.removeChild(d));return a}r.extend({htmlPrefilter:function(a){return a.replace(xa,"<$1></$2>")},clone:function(a,b,c){var d,e,f,g,h=a.cloneNode(!0),i=r.contains(a.ownerDocument,a);if(!(o.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||r.isXMLDoc(a)))for(g=la(h),f=la(a),d=0,e=f.length;d<e;d++)Ga(f[d],g[d]);if(b)if(c)for(f=f||la(a),g=g||la(h),d=0,e=f.length;d<e;d++)Fa(f[d],g[d]);else Fa(a,h);return g=la(h,"script"),g.length>0&&ma(g,!i&&la(a,"script")),h},cleanData:function(a){for(var b,c,d,e=r.event.special,f=0;void 0!==(c=a[f]);f++)if(T(c)){if(b=c[V.expando]){if(b.events)for(d in b.events)e[d]?r.event.remove(c,d):r.removeEvent(c,d,b.handle);c[V.expando]=void 0}c[W.expando]&&(c[W.expando]=void 0)}}}),r.fn.extend({detach:function(a){return Ia(this,a,!0)},remove:function(a){return Ia(this,a)},text:function(a){return S(this,function(a){return void 0===a?r.text(this):this.empty().each(function(){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||(this.textContent=a)})},null,a,arguments.length)},append:function(){return Ha(this,arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=Ca(this,a);b.appendChild(a)}})},prepend:function(){return Ha(this,arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=Ca(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return Ha(this,arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return Ha(this,arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},empty:function(){for(var a,b=0;null!=(a=this[b]);b++)1===a.nodeType&&(r.cleanData(la(a,!1)),a.textContent="");return this},clone:function(a,b){return a=null!=a&&a,b=null==b?a:b,this.map(function(){return r.clone(this,a,b)})},html:function(a){return S(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a&&1===b.nodeType)return b.innerHTML;if("string"==typeof a&&!ya.test(a)&&!ka[(ia.exec(a)||["",""])[1].toLowerCase()]){a=r.htmlPrefilter(a);try{for(;c<d;c++)b=this[c]||{},1===b.nodeType&&(r.cleanData(la(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=[];return Ha(this,arguments,function(b){var c=this.parentNode;r.inArray(this,a)<0&&(r.cleanData(la(this)),c&&c.replaceChild(b,this))},a)}}),r.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){r.fn[a]=function(a){for(var c,d=[],e=r(a),f=e.length-1,g=0;g<=f;g++)c=g===f?this:this.clone(!0),r(e[g])[b](c),h.apply(d,c.get());return this.pushStack(d)}});var Ja=/^margin/,Ka=new RegExp("^("+$+")(?!px)[a-z%]+$","i"),La=function(b){var c=b.ownerDocument.defaultView;return c&&c.opener||(c=a),c.getComputedStyle(b)};!function(){function b(){if(i){i.style.cssText="box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%",i.innerHTML="",pa.appendChild(h);var b=a.getComputedStyle(i);c="1%"!==b.top,g="2px"===b.marginLeft,e="4px"===b.width,i.style.marginRight="50%",f="4px"===b.marginRight,pa.removeChild(h),i=null}}var c,e,f,g,h=d.createElement("div"),i=d.createElement("div");i.style&&(i.style.backgroundClip="content-box",i.cloneNode(!0).style.backgroundClip="",o.clearCloneStyle="content-box"===i.style.backgroundClip,h.style.cssText="border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute",h.appendChild(i),r.extend(o,{pixelPosition:function(){return b(),c},boxSizingReliable:function(){return b(),e},pixelMarginRight:function(){return b(),f},reliableMarginLeft:function(){return b(),g}}))}();function Ma(a,b,c){var d,e,f,g,h=a.style;return c=c||La(a),c&&(g=c.getPropertyValue(b)||c[b],""!==g||r.contains(a.ownerDocument,a)||(g=r.style(a,b)),!o.pixelMarginRight()&&Ka.test(g)&&Ja.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f)),void 0!==g?g+"":g}function Na(a,b){return{get:function(){return a()?void delete this.get:(this.get=b).apply(this,arguments)}}}var Oa=/^(none|table(?!-c[ea]).+)/,Pa={position:"absolute",visibility:"hidden",display:"block"},Qa={letterSpacing:"0",fontWeight:"400"},Ra=["Webkit","Moz","ms"],Sa=d.createElement("div").style;function Ta(a){if(a in Sa)return a;var b=a[0].toUpperCase()+a.slice(1),c=Ra.length;while(c--)if(a=Ra[c]+b,a in Sa)return a}function Ua(a,b,c){var d=_.exec(b);return d?Math.max(0,d[2]-(c||0))+(d[3]||"px"):b}function Va(a,b,c,d,e){for(var f=c===(d?"border":"content")?4:"width"===b?1:0,g=0;f<4;f+=2)"margin"===c&&(g+=r.css(a,c+aa[f],!0,e)),d?("content"===c&&(g-=r.css(a,"padding"+aa[f],!0,e)),"margin"!==c&&(g-=r.css(a,"border"+aa[f]+"Width",!0,e))):(g+=r.css(a,"padding"+aa[f],!0,e),"padding"!==c&&(g+=r.css(a,"border"+aa[f]+"Width",!0,e)));return g}function Wa(a,b,c){var d,e=!0,f=La(a),g="border-box"===r.css(a,"boxSizing",!1,f);if(a.getClientRects().length&&(d=a.getBoundingClientRect()[b]),d<=0||null==d){if(d=Ma(a,b,f),(d<0||null==d)&&(d=a.style[b]),Ka.test(d))return d;e=g&&(o.boxSizingReliable()||d===a.style[b]),d=parseFloat(d)||0}return d+Va(a,b,c||(g?"border":"content"),e,f)+"px"}r.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=Ma(a,"opacity");return""===c?"1":c}}}},cssNumber:{animationIterationCount:!0,columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":"cssFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=r.camelCase(b),i=a.style;return b=r.cssProps[h]||(r.cssProps[h]=Ta(h)||h),g=r.cssHooks[b]||r.cssHooks[h],void 0===c?g&&"get"in g&&void 0!==(e=g.get(a,!1,d))?e:i[b]:(f=typeof c,"string"===f&&(e=_.exec(c))&&e[1]&&(c=da(a,b,e),f="number"),null!=c&&c===c&&("number"===f&&(c+=e&&e[3]||(r.cssNumber[h]?"":"px")),o.clearCloneStyle||""!==c||0!==b.indexOf("background")||(i[b]="inherit"),g&&"set"in g&&void 0===(c=g.set(a,c,d))||(i[b]=c)),void 0)}},css:function(a,b,c,d){var e,f,g,h=r.camelCase(b);return b=r.cssProps[h]||(r.cssProps[h]=Ta(h)||h),g=r.cssHooks[b]||r.cssHooks[h],g&&"get"in g&&(e=g.get(a,!0,c)),void 0===e&&(e=Ma(a,b,d)),"normal"===e&&b in Qa&&(e=Qa[b]),""===c||c?(f=parseFloat(e),c===!0||isFinite(f)?f||0:e):e}}),r.each(["height","width"],function(a,b){r.cssHooks[b]={get:function(a,c,d){if(c)return!Oa.test(r.css(a,"display"))||a.getClientRects().length&&a.getBoundingClientRect().width?Wa(a,b,d):ca(a,Pa,function(){return Wa(a,b,d)})},set:function(a,c,d){var e,f=d&&La(a),g=d&&Va(a,b,d,"border-box"===r.css(a,"boxSizing",!1,f),f);return g&&(e=_.exec(c))&&"px"!==(e[3]||"px")&&(a.style[b]=c,c=r.css(a,b)),Ua(a,c,g)}}}),r.cssHooks.marginLeft=Na(o.reliableMarginLeft,function(a,b){if(b)return(parseFloat(Ma(a,"marginLeft"))||a.getBoundingClientRect().left-ca(a,{marginLeft:0},function(){return a.getBoundingClientRect().left}))+"px"}),r.each({margin:"",padding:"",border:"Width"},function(a,b){r.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];d<4;d++)e[a+aa[d]+b]=f[d]||f[d-2]||f[0];return e}},Ja.test(a)||(r.cssHooks[a+b].set=Ua)}),r.fn.extend({css:function(a,b){return S(this,function(a,b,c){var d,e,f={},g=0;if(r.isArray(b)){for(d=La(a),e=b.length;g<e;g++)f[b[g]]=r.css(a,b[g],!1,d);return f}return void 0!==c?r.style(a,b,c):r.css(a,b)},a,b,arguments.length>1)}});function Xa(a,b,c,d,e){return new Xa.prototype.init(a,b,c,d,e)}r.Tween=Xa,Xa.prototype={constructor:Xa,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||r.easing._default,this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(r.cssNumber[c]?"":"px")},cur:function(){var a=Xa.propHooks[this.prop];return a&&a.get?a.get(this):Xa.propHooks._default.get(this)},run:function(a){var b,c=Xa.propHooks[this.prop];return this.options.duration?this.pos=b=r.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):this.pos=b=a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):Xa.propHooks._default.set(this),this}},Xa.prototype.init.prototype=Xa.prototype,Xa.propHooks={_default:{get:function(a){var b;return 1!==a.elem.nodeType||null!=a.elem[a.prop]&&null==a.elem.style[a.prop]?a.elem[a.prop]:(b=r.css(a.elem,a.prop,""),b&&"auto"!==b?b:0)},set:function(a){r.fx.step[a.prop]?r.fx.step[a.prop](a):1!==a.elem.nodeType||null==a.elem.style[r.cssProps[a.prop]]&&!r.cssHooks[a.prop]?a.elem[a.prop]=a.now:r.style(a.elem,a.prop,a.now+a.unit)}}},Xa.propHooks.scrollTop=Xa.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},r.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2},_default:"swing"},r.fx=Xa.prototype.init,r.fx.step={};var Ya,Za,$a=/^(?:toggle|show|hide)$/,_a=/queueHooks$/;function ab(){Za&&(a.requestAnimationFrame(ab),r.fx.tick())}function bb(){return a.setTimeout(function(){Ya=void 0}),Ya=r.now()}function cb(a,b){var c,d=0,e={height:a};for(b=b?1:0;d<4;d+=2-b)c=aa[d],e["margin"+c]=e["padding"+c]=a;return b&&(e.opacity=e.width=a),e}function db(a,b,c){for(var d,e=(gb.tweeners[b]||[]).concat(gb.tweeners["*"]),f=0,g=e.length;f<g;f++)if(d=e[f].call(c,b,a))return d}function eb(a,b,c){var d,e,f,g,h,i,j,k,l="width"in b||"height"in b,m=this,n={},o=a.style,p=a.nodeType&&ba(a),q=V.get(a,"fxshow");c.queue||(g=r._queueHooks(a,"fx"),null==g.unqueued&&(g.unqueued=0,h=g.empty.fire,g.empty.fire=function(){g.unqueued||h()}),g.unqueued++,m.always(function(){m.always(function(){g.unqueued--,r.queue(a,"fx").length||g.empty.fire()})}));for(d in b)if(e=b[d],$a.test(e)){if(delete b[d],f=f||"toggle"===e,e===(p?"hide":"show")){if("show"!==e||!q||void 0===q[d])continue;p=!0}n[d]=q&&q[d]||r.style(a,d)}if(i=!r.isEmptyObject(b),i||!r.isEmptyObject(n)){l&&1===a.nodeType&&(c.overflow=[o.overflow,o.overflowX,o.overflowY],j=q&&q.display,null==j&&(j=V.get(a,"display")),k=r.css(a,"display"),"none"===k&&(j?k=j:(ga([a],!0),j=a.style.display||j,k=r.css(a,"display"),ga([a]))),("inline"===k||"inline-block"===k&&null!=j)&&"none"===r.css(a,"float")&&(i||(m.done(function(){o.display=j}),null==j&&(k=o.display,j="none"===k?"":k)),o.display="inline-block")),c.overflow&&(o.overflow="hidden",m.always(function(){o.overflow=c.overflow[0],o.overflowX=c.overflow[1],o.overflowY=c.overflow[2]})),i=!1;for(d in n)i||(q?"hidden"in q&&(p=q.hidden):q=V.access(a,"fxshow",{display:j}),f&&(q.hidden=!p),p&&ga([a],!0),m.done(function(){p||ga([a]),V.remove(a,"fxshow");for(d in n)r.style(a,d,n[d])})),i=db(p?q[d]:0,d,m),d in q||(q[d]=i.start,p&&(i.end=i.start,i.start=0))}}function fb(a,b){var c,d,e,f,g;for(c in a)if(d=r.camelCase(c),e=b[d],f=a[c],r.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=r.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}function gb(a,b,c){var d,e,f=0,g=gb.prefilters.length,h=r.Deferred().always(function(){delete i.elem}),i=function(){if(e)return!1;for(var b=Ya||bb(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;g<i;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),f<1&&i?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:r.extend({},b),opts:r.extend(!0,{specialEasing:{},easing:r.easing._default},c),originalProperties:b,originalOptions:c,startTime:Ya||bb(),duration:c.duration,tweens:[],createTween:function(b,c){var d=r.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,d=b?j.tweens.length:0;if(e)return this;for(e=!0;c<d;c++)j.tweens[c].run(1);return b?(h.notifyWith(a,[j,1,0]),h.resolveWith(a,[j,b])):h.rejectWith(a,[j,b]),this}}),k=j.props;for(fb(k,j.opts.specialEasing);f<g;f++)if(d=gb.prefilters[f].call(j,a,k,j.opts))return r.isFunction(d.stop)&&(r._queueHooks(j.elem,j.opts.queue).stop=r.proxy(d.stop,d)),d;return r.map(k,db,j),r.isFunction(j.opts.start)&&j.opts.start.call(a,j),r.fx.timer(r.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}r.Animation=r.extend(gb,{tweeners:{"*":[function(a,b){var c=this.createTween(a,b);return da(c.elem,a,_.exec(b),c),c}]},tweener:function(a,b){r.isFunction(a)?(b=a,a=["*"]):a=a.match(K);for(var c,d=0,e=a.length;d<e;d++)c=a[d],gb.tweeners[c]=gb.tweeners[c]||[],gb.tweeners[c].unshift(b)},prefilters:[eb],prefilter:function(a,b){b?gb.prefilters.unshift(a):gb.prefilters.push(a)}}),r.speed=function(a,b,c){var e=a&&"object"==typeof a?r.extend({},a):{complete:c||!c&&b||r.isFunction(a)&&a,duration:a,easing:c&&b||b&&!r.isFunction(b)&&b};return r.fx.off||d.hidden?e.duration=0:e.duration="number"==typeof e.duration?e.duration:e.duration in r.fx.speeds?r.fx.speeds[e.duration]:r.fx.speeds._default,null!=e.queue&&e.queue!==!0||(e.queue="fx"),e.old=e.complete,e.complete=function(){r.isFunction(e.old)&&e.old.call(this),e.queue&&r.dequeue(this,e.queue)},e},r.fn.extend({fadeTo:function(a,b,c,d){return this.filter(ba).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=r.isEmptyObject(a),f=r.speed(b,c,d),g=function(){var b=gb(this,r.extend({},a),f);(e||V.get(this,"finish"))&&b.stop(!0)};return g.finish=g,e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c)};return"string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,e=null!=a&&a+"queueHooks",f=r.timers,g=V.get(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&_a.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=!1,f.splice(e,1));!b&&c||r.dequeue(this,a)})},finish:function(a){return a!==!1&&(a=a||"fx"),this.each(function(){var b,c=V.get(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=r.timers,g=d?d.length:0;for(c.finish=!0,r.queue(this,a,[]),e&&e.stop&&e.stop.call(this,!0),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(!0),f.splice(b,1));for(b=0;b<g;b++)d[b]&&d[b].finish&&d[b].finish.call(this);delete c.finish})}}),r.each(["toggle","show","hide"],function(a,b){var c=r.fn[b];r.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(cb(b,!0),a,d,e)}}),r.each({slideDown:cb("show"),slideUp:cb("hide"),slideToggle:cb("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){r.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),r.timers=[],r.fx.tick=function(){var a,b=0,c=r.timers;for(Ya=r.now();b<c.length;b++)a=c[b],a()||c[b]!==a||c.splice(b--,1);c.length||r.fx.stop(),Ya=void 0},r.fx.timer=function(a){r.timers.push(a),a()?r.fx.start():r.timers.pop()},r.fx.interval=13,r.fx.start=function(){Za||(Za=a.requestAnimationFrame?a.requestAnimationFrame(ab):a.setInterval(r.fx.tick,r.fx.interval))},r.fx.stop=function(){a.cancelAnimationFrame?a.cancelAnimationFrame(Za):a.clearInterval(Za),Za=null},r.fx.speeds={slow:600,fast:200,_default:400},r.fn.delay=function(b,c){return b=r.fx?r.fx.speeds[b]||b:b,c=c||"fx",this.queue(c,function(c,d){var e=a.setTimeout(c,b);d.stop=function(){a.clearTimeout(e)}})},function(){var a=d.createElement("input"),b=d.createElement("select"),c=b.appendChild(d.createElement("option"));a.type="checkbox",o.checkOn=""!==a.value,o.optSelected=c.selected,a=d.createElement("input"),a.value="t",a.type="radio",o.radioValue="t"===a.value}();var hb,ib=r.expr.attrHandle;r.fn.extend({attr:function(a,b){return S(this,r.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){r.removeAttr(this,a)})}}),r.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(3!==f&&8!==f&&2!==f)return"undefined"==typeof a.getAttribute?r.prop(a,b,c):(1===f&&r.isXMLDoc(a)||(e=r.attrHooks[b.toLowerCase()]||(r.expr.match.bool.test(b)?hb:void 0)),void 0!==c?null===c?void r.removeAttr(a,b):e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:(a.setAttribute(b,c+""),c):e&&"get"in e&&null!==(d=e.get(a,b))?d:(d=r.find.attr(a,b),null==d?void 0:d))},attrHooks:{type:{set:function(a,b){if(!o.radioValue&&"radio"===b&&r.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}},removeAttr:function(a,b){var c,d=0,e=b&&b.match(K);
if(e&&1===a.nodeType)while(c=e[d++])a.removeAttribute(c)}}),hb={set:function(a,b,c){return b===!1?r.removeAttr(a,c):a.setAttribute(c,c),c}},r.each(r.expr.match.bool.source.match(/\w+/g),function(a,b){var c=ib[b]||r.find.attr;ib[b]=function(a,b,d){var e,f,g=b.toLowerCase();return d||(f=ib[g],ib[g]=e,e=null!=c(a,b,d)?g:null,ib[g]=f),e}});var jb=/^(?:input|select|textarea|button)$/i,kb=/^(?:a|area)$/i;r.fn.extend({prop:function(a,b){return S(this,r.prop,a,b,arguments.length>1)},removeProp:function(a){return this.each(function(){delete this[r.propFix[a]||a]})}}),r.extend({prop:function(a,b,c){var d,e,f=a.nodeType;if(3!==f&&8!==f&&2!==f)return 1===f&&r.isXMLDoc(a)||(b=r.propFix[b]||b,e=r.propHooks[b]),void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){var b=r.find.attr(a,"tabindex");return b?parseInt(b,10):jb.test(a.nodeName)||kb.test(a.nodeName)&&a.href?0:-1}}},propFix:{"for":"htmlFor","class":"className"}}),o.optSelected||(r.propHooks.selected={get:function(a){var b=a.parentNode;return b&&b.parentNode&&b.parentNode.selectedIndex,null},set:function(a){var b=a.parentNode;b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex)}}),r.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){r.propFix[this.toLowerCase()]=this});var lb=/[\t\r\n\f]/g;function mb(a){return a.getAttribute&&a.getAttribute("class")||""}r.fn.extend({addClass:function(a){var b,c,d,e,f,g,h,i=0;if(r.isFunction(a))return this.each(function(b){r(this).addClass(a.call(this,b,mb(this)))});if("string"==typeof a&&a){b=a.match(K)||[];while(c=this[i++])if(e=mb(c),d=1===c.nodeType&&(" "+e+" ").replace(lb," ")){g=0;while(f=b[g++])d.indexOf(" "+f+" ")<0&&(d+=f+" ");h=r.trim(d),e!==h&&c.setAttribute("class",h)}}return this},removeClass:function(a){var b,c,d,e,f,g,h,i=0;if(r.isFunction(a))return this.each(function(b){r(this).removeClass(a.call(this,b,mb(this)))});if(!arguments.length)return this.attr("class","");if("string"==typeof a&&a){b=a.match(K)||[];while(c=this[i++])if(e=mb(c),d=1===c.nodeType&&(" "+e+" ").replace(lb," ")){g=0;while(f=b[g++])while(d.indexOf(" "+f+" ")>-1)d=d.replace(" "+f+" "," ");h=r.trim(d),e!==h&&c.setAttribute("class",h)}}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):r.isFunction(a)?this.each(function(c){r(this).toggleClass(a.call(this,c,mb(this),b),b)}):this.each(function(){var b,d,e,f;if("string"===c){d=0,e=r(this),f=a.match(K)||[];while(b=f[d++])e.hasClass(b)?e.removeClass(b):e.addClass(b)}else void 0!==a&&"boolean"!==c||(b=mb(this),b&&V.set(this,"__className__",b),this.setAttribute&&this.setAttribute("class",b||a===!1?"":V.get(this,"__className__")||""))})},hasClass:function(a){var b,c,d=0;b=" "+a+" ";while(c=this[d++])if(1===c.nodeType&&(" "+mb(c)+" ").replace(lb," ").indexOf(b)>-1)return!0;return!1}});var nb=/\r/g,ob=/[\x20\t\r\n\f]+/g;r.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=r.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,r(this).val()):a,null==e?e="":"number"==typeof e?e+="":r.isArray(e)&&(e=r.map(e,function(a){return null==a?"":a+""})),b=r.valHooks[this.type]||r.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)return b=r.valHooks[e.type]||r.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(nb,""):null==c?"":c)}}}),r.extend({valHooks:{option:{get:function(a){var b=r.find.attr(a,"value");return null!=b?b:r.trim(r.text(a)).replace(ob," ")}},select:{get:function(a){for(var b,c,d=a.options,e=a.selectedIndex,f="select-one"===a.type,g=f?null:[],h=f?e+1:d.length,i=e<0?h:f?e:0;i<h;i++)if(c=d[i],(c.selected||i===e)&&!c.disabled&&(!c.parentNode.disabled||!r.nodeName(c.parentNode,"optgroup"))){if(b=r(c).val(),f)return b;g.push(b)}return g},set:function(a,b){var c,d,e=a.options,f=r.makeArray(b),g=e.length;while(g--)d=e[g],(d.selected=r.inArray(r.valHooks.option.get(d),f)>-1)&&(c=!0);return c||(a.selectedIndex=-1),f}}}}),r.each(["radio","checkbox"],function(){r.valHooks[this]={set:function(a,b){if(r.isArray(b))return a.checked=r.inArray(r(a).val(),b)>-1}},o.checkOn||(r.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value})});var pb=/^(?:focusinfocus|focusoutblur)$/;r.extend(r.event,{trigger:function(b,c,e,f){var g,h,i,j,k,m,n,o=[e||d],p=l.call(b,"type")?b.type:b,q=l.call(b,"namespace")?b.namespace.split("."):[];if(h=i=e=e||d,3!==e.nodeType&&8!==e.nodeType&&!pb.test(p+r.event.triggered)&&(p.indexOf(".")>-1&&(q=p.split("."),p=q.shift(),q.sort()),k=p.indexOf(":")<0&&"on"+p,b=b[r.expando]?b:new r.Event(p,"object"==typeof b&&b),b.isTrigger=f?2:3,b.namespace=q.join("."),b.rnamespace=b.namespace?new RegExp("(^|\\.)"+q.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=e),c=null==c?[b]:r.makeArray(c,[b]),n=r.event.special[p]||{},f||!n.trigger||n.trigger.apply(e,c)!==!1)){if(!f&&!n.noBubble&&!r.isWindow(e)){for(j=n.delegateType||p,pb.test(j+p)||(h=h.parentNode);h;h=h.parentNode)o.push(h),i=h;i===(e.ownerDocument||d)&&o.push(i.defaultView||i.parentWindow||a)}g=0;while((h=o[g++])&&!b.isPropagationStopped())b.type=g>1?j:n.bindType||p,m=(V.get(h,"events")||{})[b.type]&&V.get(h,"handle"),m&&m.apply(h,c),m=k&&h[k],m&&m.apply&&T(h)&&(b.result=m.apply(h,c),b.result===!1&&b.preventDefault());return b.type=p,f||b.isDefaultPrevented()||n._default&&n._default.apply(o.pop(),c)!==!1||!T(e)||k&&r.isFunction(e[p])&&!r.isWindow(e)&&(i=e[k],i&&(e[k]=null),r.event.triggered=p,e[p](),r.event.triggered=void 0,i&&(e[k]=i)),b.result}},simulate:function(a,b,c){var d=r.extend(new r.Event,c,{type:a,isSimulated:!0});r.event.trigger(d,null,b)}}),r.fn.extend({trigger:function(a,b){return this.each(function(){r.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];if(c)return r.event.trigger(a,b,c,!0)}}),r.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "),function(a,b){r.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),r.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}}),o.focusin="onfocusin"in a,o.focusin||r.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){r.event.simulate(b,a.target,r.event.fix(a))};r.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=V.access(d,b);e||d.addEventListener(a,c,!0),V.access(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=V.access(d,b)-1;e?V.access(d,b,e):(d.removeEventListener(a,c,!0),V.remove(d,b))}}});var qb=a.location,rb=r.now(),sb=/\?/;r.parseXML=function(b){var c;if(!b||"string"!=typeof b)return null;try{c=(new a.DOMParser).parseFromString(b,"text/xml")}catch(d){c=void 0}return c&&!c.getElementsByTagName("parsererror").length||r.error("Invalid XML: "+b),c};var tb=/\[\]$/,ub=/\r?\n/g,vb=/^(?:submit|button|image|reset|file)$/i,wb=/^(?:input|select|textarea|keygen)/i;function xb(a,b,c,d){var e;if(r.isArray(b))r.each(b,function(b,e){c||tb.test(a)?d(a,e):xb(a+"["+("object"==typeof e&&null!=e?b:"")+"]",e,c,d)});else if(c||"object"!==r.type(b))d(a,b);else for(e in b)xb(a+"["+e+"]",b[e],c,d)}r.param=function(a,b){var c,d=[],e=function(a,b){var c=r.isFunction(b)?b():b;d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(null==c?"":c)};if(r.isArray(a)||a.jquery&&!r.isPlainObject(a))r.each(a,function(){e(this.name,this.value)});else for(c in a)xb(c,a[c],b,e);return d.join("&")},r.fn.extend({serialize:function(){return r.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=r.prop(this,"elements");return a?r.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!r(this).is(":disabled")&&wb.test(this.nodeName)&&!vb.test(a)&&(this.checked||!ha.test(a))}).map(function(a,b){var c=r(this).val();return null==c?null:r.isArray(c)?r.map(c,function(a){return{name:b.name,value:a.replace(ub,"\r\n")}}):{name:b.name,value:c.replace(ub,"\r\n")}}).get()}});var yb=/%20/g,zb=/#.*$/,Ab=/([?&])_=[^&]*/,Bb=/^(.*?):[ \t]*([^\r\n]*)$/gm,Cb=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Db=/^(?:GET|HEAD)$/,Eb=/^\/\//,Fb={},Gb={},Hb="*/".concat("*"),Ib=d.createElement("a");Ib.href=qb.href;function Jb(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(K)||[];if(r.isFunction(c))while(d=f[e++])"+"===d[0]?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)}}function Kb(a,b,c,d){var e={},f=a===Gb;function g(h){var i;return e[h]=!0,r.each(a[h]||[],function(a,h){var j=h(b,c,d);return"string"!=typeof j||f||e[j]?f?!(i=j):void 0:(b.dataTypes.unshift(j),g(j),!1)}),i}return g(b.dataTypes[0])||!e["*"]&&g("*")}function Lb(a,b){var c,d,e=r.ajaxSettings.flatOptions||{};for(c in b)void 0!==b[c]&&((e[c]?a:d||(d={}))[c]=b[c]);return d&&r.extend(!0,a,d),a}function Mb(a,b,c){var d,e,f,g,h=a.contents,i=a.dataTypes;while("*"===i[0])i.shift(),void 0===d&&(d=a.mimeType||b.getResponseHeader("Content-Type"));if(d)for(e in h)if(h[e]&&h[e].test(d)){i.unshift(e);break}if(i[0]in c)f=i[0];else{for(e in c){if(!i[0]||a.converters[e+" "+i[0]]){f=e;break}g||(g=e)}f=f||g}if(f)return f!==i[0]&&i.unshift(f),c[f]}function Nb(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];f=k.shift();while(f)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));break}if(g!==!0)if(g&&a["throws"])b=g(b);else try{b=g(b)}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return{state:"success",data:b}}r.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:qb.href,type:"GET",isLocal:Cb.test(qb.protocol),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":Hb,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/\bxml\b/,html:/\bhtml/,json:/\bjson\b/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":JSON.parse,"text xml":r.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(a,b){return b?Lb(Lb(a,r.ajaxSettings),b):Lb(r.ajaxSettings,a)},ajaxPrefilter:Jb(Fb),ajaxTransport:Jb(Gb),ajax:function(b,c){"object"==typeof b&&(c=b,b=void 0),c=c||{};var e,f,g,h,i,j,k,l,m,n,o=r.ajaxSetup({},c),p=o.context||o,q=o.context&&(p.nodeType||p.jquery)?r(p):r.event,s=r.Deferred(),t=r.Callbacks("once memory"),u=o.statusCode||{},v={},w={},x="canceled",y={readyState:0,getResponseHeader:function(a){var b;if(k){if(!h){h={};while(b=Bb.exec(g))h[b[1].toLowerCase()]=b[2]}b=h[a.toLowerCase()]}return null==b?null:b},getAllResponseHeaders:function(){return k?g:null},setRequestHeader:function(a,b){return null==k&&(a=w[a.toLowerCase()]=w[a.toLowerCase()]||a,v[a]=b),this},overrideMimeType:function(a){return null==k&&(o.mimeType=a),this},statusCode:function(a){var b;if(a)if(k)y.always(a[y.status]);else for(b in a)u[b]=[u[b],a[b]];return this},abort:function(a){var b=a||x;return e&&e.abort(b),A(0,b),this}};if(s.promise(y),o.url=((b||o.url||qb.href)+"").replace(Eb,qb.protocol+"//"),o.type=c.method||c.type||o.method||o.type,o.dataTypes=(o.dataType||"*").toLowerCase().match(K)||[""],null==o.crossDomain){j=d.createElement("a");try{j.href=o.url,j.href=j.href,o.crossDomain=Ib.protocol+"//"+Ib.host!=j.protocol+"//"+j.host}catch(z){o.crossDomain=!0}}if(o.data&&o.processData&&"string"!=typeof o.data&&(o.data=r.param(o.data,o.traditional)),Kb(Fb,o,c,y),k)return y;l=r.event&&o.global,l&&0===r.active++&&r.event.trigger("ajaxStart"),o.type=o.type.toUpperCase(),o.hasContent=!Db.test(o.type),f=o.url.replace(zb,""),o.hasContent?o.data&&o.processData&&0===(o.contentType||"").indexOf("application/x-www-form-urlencoded")&&(o.data=o.data.replace(yb,"+")):(n=o.url.slice(f.length),o.data&&(f+=(sb.test(f)?"&":"?")+o.data,delete o.data),o.cache===!1&&(f=f.replace(Ab,""),n=(sb.test(f)?"&":"?")+"_="+rb++ +n),o.url=f+n),o.ifModified&&(r.lastModified[f]&&y.setRequestHeader("If-Modified-Since",r.lastModified[f]),r.etag[f]&&y.setRequestHeader("If-None-Match",r.etag[f])),(o.data&&o.hasContent&&o.contentType!==!1||c.contentType)&&y.setRequestHeader("Content-Type",o.contentType),y.setRequestHeader("Accept",o.dataTypes[0]&&o.accepts[o.dataTypes[0]]?o.accepts[o.dataTypes[0]]+("*"!==o.dataTypes[0]?", "+Hb+"; q=0.01":""):o.accepts["*"]);for(m in o.headers)y.setRequestHeader(m,o.headers[m]);if(o.beforeSend&&(o.beforeSend.call(p,y,o)===!1||k))return y.abort();if(x="abort",t.add(o.complete),y.done(o.success),y.fail(o.error),e=Kb(Gb,o,c,y)){if(y.readyState=1,l&&q.trigger("ajaxSend",[y,o]),k)return y;o.async&&o.timeout>0&&(i=a.setTimeout(function(){y.abort("timeout")},o.timeout));try{k=!1,e.send(v,A)}catch(z){if(k)throw z;A(-1,z)}}else A(-1,"No Transport");function A(b,c,d,h){var j,m,n,v,w,x=c;k||(k=!0,i&&a.clearTimeout(i),e=void 0,g=h||"",y.readyState=b>0?4:0,j=b>=200&&b<300||304===b,d&&(v=Mb(o,y,d)),v=Nb(o,v,y,j),j?(o.ifModified&&(w=y.getResponseHeader("Last-Modified"),w&&(r.lastModified[f]=w),w=y.getResponseHeader("etag"),w&&(r.etag[f]=w)),204===b||"HEAD"===o.type?x="nocontent":304===b?x="notmodified":(x=v.state,m=v.data,n=v.error,j=!n)):(n=x,!b&&x||(x="error",b<0&&(b=0))),y.status=b,y.statusText=(c||x)+"",j?s.resolveWith(p,[m,x,y]):s.rejectWith(p,[y,x,n]),y.statusCode(u),u=void 0,l&&q.trigger(j?"ajaxSuccess":"ajaxError",[y,o,j?m:n]),t.fireWith(p,[y,x]),l&&(q.trigger("ajaxComplete",[y,o]),--r.active||r.event.trigger("ajaxStop")))}return y},getJSON:function(a,b,c){return r.get(a,b,c,"json")},getScript:function(a,b){return r.get(a,void 0,b,"script")}}),r.each(["get","post"],function(a,b){r[b]=function(a,c,d,e){return r.isFunction(c)&&(e=e||d,d=c,c=void 0),r.ajax(r.extend({url:a,type:b,dataType:e,data:c,success:d},r.isPlainObject(a)&&a))}}),r._evalUrl=function(a){return r.ajax({url:a,type:"GET",dataType:"script",cache:!0,async:!1,global:!1,"throws":!0})},r.fn.extend({wrapAll:function(a){var b;return this[0]&&(r.isFunction(a)&&(a=a.call(this[0])),b=r(a,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstElementChild)a=a.firstElementChild;return a}).append(this)),this},wrapInner:function(a){return r.isFunction(a)?this.each(function(b){r(this).wrapInner(a.call(this,b))}):this.each(function(){var b=r(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=r.isFunction(a);return this.each(function(c){r(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(a){return this.parent(a).not("body").each(function(){r(this).replaceWith(this.childNodes)}),this}}),r.expr.pseudos.hidden=function(a){return!r.expr.pseudos.visible(a)},r.expr.pseudos.visible=function(a){return!!(a.offsetWidth||a.offsetHeight||a.getClientRects().length)},r.ajaxSettings.xhr=function(){try{return new a.XMLHttpRequest}catch(b){}};var Ob={0:200,1223:204},Pb=r.ajaxSettings.xhr();o.cors=!!Pb&&"withCredentials"in Pb,o.ajax=Pb=!!Pb,r.ajaxTransport(function(b){var c,d;if(o.cors||Pb&&!b.crossDomain)return{send:function(e,f){var g,h=b.xhr();if(h.open(b.type,b.url,b.async,b.username,b.password),b.xhrFields)for(g in b.xhrFields)h[g]=b.xhrFields[g];b.mimeType&&h.overrideMimeType&&h.overrideMimeType(b.mimeType),b.crossDomain||e["X-Requested-With"]||(e["X-Requested-With"]="XMLHttpRequest");for(g in e)h.setRequestHeader(g,e[g]);c=function(a){return function(){c&&(c=d=h.onload=h.onerror=h.onabort=h.onreadystatechange=null,"abort"===a?h.abort():"error"===a?"number"!=typeof h.status?f(0,"error"):f(h.status,h.statusText):f(Ob[h.status]||h.status,h.statusText,"text"!==(h.responseType||"text")||"string"!=typeof h.responseText?{binary:h.response}:{text:h.responseText},h.getAllResponseHeaders()))}},h.onload=c(),d=h.onerror=c("error"),void 0!==h.onabort?h.onabort=d:h.onreadystatechange=function(){4===h.readyState&&a.setTimeout(function(){c&&d()})},c=c("abort");try{h.send(b.hasContent&&b.data||null)}catch(i){if(c)throw i}},abort:function(){c&&c()}}}),r.ajaxPrefilter(function(a){a.crossDomain&&(a.contents.script=!1)}),r.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/\b(?:java|ecma)script\b/},converters:{"text script":function(a){return r.globalEval(a),a}}}),r.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET")}),r.ajaxTransport("script",function(a){if(a.crossDomain){var b,c;return{send:function(e,f){b=r("<script>").prop({charset:a.scriptCharset,src:a.url}).on("load error",c=function(a){b.remove(),c=null,a&&f("error"===a.type?404:200,a.type)}),d.head.appendChild(b[0])},abort:function(){c&&c()}}}});var Qb=[],Rb=/(=)\?(?=&|$)|\?\?/;r.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=Qb.pop()||r.expando+"_"+rb++;return this[a]=!0,a}}),r.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(Rb.test(b.url)?"url":"string"==typeof b.data&&0===(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&Rb.test(b.data)&&"data");if(h||"jsonp"===b.dataTypes[0])return e=b.jsonpCallback=r.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(Rb,"$1"+e):b.jsonp!==!1&&(b.url+=(sb.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||r.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments},d.always(function(){void 0===f?r(a).removeProp(e):a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,Qb.push(e)),g&&r.isFunction(f)&&f(g[0]),g=f=void 0}),"script"}),o.createHTMLDocument=function(){var a=d.implementation.createHTMLDocument("").body;return a.innerHTML="<form></form><form></form>",2===a.childNodes.length}(),r.parseHTML=function(a,b,c){if("string"!=typeof a)return[];"boolean"==typeof b&&(c=b,b=!1);var e,f,g;return b||(o.createHTMLDocument?(b=d.implementation.createHTMLDocument(""),e=b.createElement("base"),e.href=d.location.href,b.head.appendChild(e)):b=d),f=B.exec(a),g=!c&&[],f?[b.createElement(f[1])]:(f=oa([a],b,g),g&&g.length&&r(g).remove(),r.merge([],f.childNodes))},r.fn.load=function(a,b,c){var d,e,f,g=this,h=a.indexOf(" ");return h>-1&&(d=r.trim(a.slice(h)),a=a.slice(0,h)),r.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(e="POST"),g.length>0&&r.ajax({url:a,type:e||"GET",dataType:"html",data:b}).done(function(a){f=arguments,g.html(d?r("<div>").append(r.parseHTML(a)).find(d):a)}).always(c&&function(a,b){g.each(function(){c.apply(this,f||[a.responseText,b,a])})}),this},r.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){r.fn[b]=function(a){return this.on(b,a)}}),r.expr.pseudos.animated=function(a){return r.grep(r.timers,function(b){return a===b.elem}).length};function Sb(a){return r.isWindow(a)?a:9===a.nodeType&&a.defaultView}r.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=r.css(a,"position"),l=r(a),m={};"static"===k&&(a.style.position="relative"),h=l.offset(),f=r.css(a,"top"),i=r.css(a,"left"),j=("absolute"===k||"fixed"===k)&&(f+i).indexOf("auto")>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),r.isFunction(b)&&(b=b.call(a,c,r.extend({},h))),null!=b.top&&(m.top=b.top-h.top+g),null!=b.left&&(m.left=b.left-h.left+e),"using"in b?b.using.call(a,m):l.css(m)}},r.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){r.offset.setOffset(this,a,b)});var b,c,d,e,f=this[0];if(f)return f.getClientRects().length?(d=f.getBoundingClientRect(),d.width||d.height?(e=f.ownerDocument,c=Sb(e),b=e.documentElement,{top:d.top+c.pageYOffset-b.clientTop,left:d.left+c.pageXOffset-b.clientLeft}):d):{top:0,left:0}},position:function(){if(this[0]){var a,b,c=this[0],d={top:0,left:0};return"fixed"===r.css(c,"position")?b=c.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),r.nodeName(a[0],"html")||(d=a.offset()),d={top:d.top+r.css(a[0],"borderTopWidth",!0),left:d.left+r.css(a[0],"borderLeftWidth",!0)}),{top:b.top-d.top-r.css(c,"marginTop",!0),left:b.left-d.left-r.css(c,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var a=this.offsetParent;while(a&&"static"===r.css(a,"position"))a=a.offsetParent;return a||pa})}}),r.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(a,b){var c="pageYOffset"===b;r.fn[a]=function(d){return S(this,function(a,d,e){var f=Sb(a);return void 0===e?f?f[b]:a[d]:void(f?f.scrollTo(c?f.pageXOffset:e,c?e:f.pageYOffset):a[d]=e)},a,d,arguments.length)}}),r.each(["top","left"],function(a,b){r.cssHooks[b]=Na(o.pixelPosition,function(a,c){if(c)return c=Ma(a,b),Ka.test(c)?r(a).position()[b]+"px":c})}),r.each({Height:"height",Width:"width"},function(a,b){r.each({padding:"inner"+a,content:b,"":"outer"+a},function(c,d){r.fn[d]=function(e,f){var g=arguments.length&&(c||"boolean"!=typeof e),h=c||(e===!0||f===!0?"margin":"border");return S(this,function(b,c,e){var f;return r.isWindow(b)?0===d.indexOf("outer")?b["inner"+a]:b.document.documentElement["client"+a]:9===b.nodeType?(f=b.documentElement,Math.max(b.body["scroll"+a],f["scroll"+a],b.body["offset"+a],f["offset"+a],f["client"+a])):void 0===e?r.css(b,c,h):r.style(b,c,e,h)},b,g?e:void 0,g)}})}),r.fn.extend({bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)}}),r.parseJSON=JSON.parse,"function"==typeof define&&define.amd&&define("jquery",[],function(){return r});var Tb=a.jQuery,Ub=a.$;return r.noConflict=function(b){return a.$===r&&(a.$=Ub),b&&a.jQuery===r&&(a.jQuery=Tb),r},b||(a.jQuery=a.$=r),r});

$(function() {

  /* Build new ShopifyBuy client
  ============================================================ */
  var client = ShopifyBuy.buildClient({
        apiKey: '55988a7ac04af3947689465a42241c02',
        myShopifyDomain: 'cander-paris',
        appId: '6'
  });

  var product;
  var cart;
  var cartLineItemCount;
  if(localStorage.getItem('lastCartId')) {
    client.fetchCart(localStorage.getItem('lastCartId')).then(function(remoteCart) {
      cart = remoteCart;
      cartLineItemCount = cart.lineItems.length;
      renderCartItems();
    });
  } else {
    client.createCart().then(function (newCart) {
      cart = newCart;
      localStorage.setItem('lastCartId', cart.id);
      cartLineItemCount = 0;
    });
  }

  var previousFocusItem;


  /* Fetch product and init
  ============================================================ */
  client.fetchProduct('9078182663').then(function (fetchedProduct) {
    product = fetchedProduct;
    var selectedVariant = product.selectedVariant;
    var selectedVariantImage = product.selectedVariantImage;
    var currentOptions = product.options;

    var variantSelectors = generateSelectors(product);
    $('.variant-selectors').html(variantSelectors);

    updateProductTitle(product.title);
    updateVariantImage(selectedVariantImage);
    updateVariantTitle(selectedVariant);
    updateVariantPrice(selectedVariant);
    attachOnVariantSelectListeners(product);
    updateCartTabButton();
    bindEventListeners();
  });

  /* Generate DOM elements for variant selectors
  ============================================================ */
  function generateSelectors(product) {
    var elements = product.options.map(function(option) {
      var optionsHtml = option.values.map(function(value) {
        return '<option value="' + value + '">' + value + '</option>';
      });

      return '<div class="shopify-select">\
                <select class="select" name="' + option.name + '">' + optionsHtml + '</select>\
                <svg class="shopify-select-icon" viewBox="0 0 24 24"><path d="M21 5.176l-9.086 9.353L3 5.176.686 7.647 12 19.382 23.314 7.647 21 5.176z"></path></svg>\
              </div>'
    });

    return elements;
  }


  /* Bind Event Listeners
  ============================================================ */
  function bindEventListeners() {
    /* cart close button listener */
    $('.cart .btn--close').on('click', closeCart);

    /* click away listener to close cart */
    $(document).on('click', function(evt) {
      if((!$(evt.target).closest('.cart').length) && (!$(evt.target).closest('.js-prevent-cart-listener').length)) {
        closeCart();
      }
    });

    /* escape key handler */
    var ESCAPE_KEYCODE = 27;
    $(document).on('keydown', function (evt) {
      if (evt.which === ESCAPE_KEYCODE) {
        if (previousFocusItem) {
          $(previousFocusItem).focus();
          previousFocusItem = ''
        }
        closeCart();
      }
    });

    /* checkout button click listener */
    $('.btn--cart-checkout').on('click', function () {
      window.open(cart.checkoutUrl);
    });

    /* buy button click listener */
    $('.buy-button').on('click', buyButtonClickHandler);

    /* increment quantity click listener */
    $('.cart').on('click', '.quantity-increment', function () {
      var variantId = $(this).data('variant-id');
      incrementQuantity(variantId);
    });

    /* decrement quantity click listener */
    $('.cart').on('click', '.quantity-decrement', function() {
      var variantId = $(this).data('variant-id');
      decrementQuantity(variantId);
    });

    /* update quantity field listener */
    $('.cart').on('keyup', '.cart-item__quantity', debounce(fieldQuantityHandler, 250));

    /* cart tab click listener */
    $('.btn--cart-tab').click(function() {
      setPreviousFocusItem(this);
      openCart();
    });
  }


  /* Variant option change handler
  ============================================================ */
  function attachOnVariantSelectListeners(product) {
    $('.variant-selectors').on('change', 'select', function(event) {
      var $element = $(event.target);
      var name = $element.attr('name');
      var value = $element.val();
      product.options.filter(function(option) {
        return option.name === name;
      })[0].selected = value;

      var selectedVariant = product.selectedVariant;
      var selectedVariantImage = product.selectedVariantImage;
      updateProductTitle(product.title);
      updateVariantImage(selectedVariantImage);
      updateVariantTitle(selectedVariant);
      updateVariantPrice(selectedVariant);
    });
  }

  /* Update product title
  ============================================================ */
  function updateProductTitle(title) {
    $('#buy-button-1 .product-title').text(title);
  }

  /* Update product image based on selected variant
  ============================================================ */
  function updateVariantImage(image) {
    var src = (image) ? image.src : ShopifyBuy.NO_IMAGE_URI;

    $('#buy-button-1 .variant-image').attr('src', src);
  }

  /* Update product variant title based on selected variant
  ============================================================ */
  function updateVariantTitle(variant) {
    $('#buy-button-1 .variant-title').text(variant.title);
  }

  /* Update product variant price based on selected variant
  ============================================================ */
  function updateVariantPrice(variant) {
    $('#buy-button-1 .variant-price').text('$' + variant.price);
  }

  /* Attach and control listeners onto buy button
  ============================================================ */
  function buyButtonClickHandler(evt) {
    evt.preventDefault();
    var id = product.selectedVariant.id;
    var quantity;
    var cartLineItem = findCartItemByVariantId(id);

    quantity = cartLineItem ? cartLineItem.quantity + 1 : 1;

    addOrUpdateVariant(product.selectedVariant, quantity);
    setPreviousFocusItem(evt.target);
    $('#checkout').focus();
  }

  /* Update product variant quantity in cart
  ============================================================ */
  function updateQuantity(fn, variantId) {
    var variant = product.variants.filter(function (variant) {
      return (variant.id === variantId);
    })[0];
    var quantity;
    var cartLineItem = findCartItemByVariantId(variant.id);
    if (cartLineItem) {
      quantity = fn(cartLineItem.quantity);
      updateVariantInCart(cartLineItem, quantity);
    }
  }

  /* Decrease quantity amount by 1
  ============================================================ */
  function decrementQuantity(variantId) {
    updateQuantity(function(quantity) {
      return quantity - 1;
    }, variantId);
  }

  /* Increase quantity amount by 1
  ============================================================ */
  function incrementQuantity(variantId) {
    updateQuantity(function(quantity) {
      return quantity + 1;
    }, variantId);
  }

  /* Update producrt variant quantity in cart through input field
  ============================================================ */
  function fieldQuantityHandler(evt) {
    var variantId = parseInt($(this).closest('.cart-item').attr('data-variant-id'), 10);
    var variant = product.variants.filter(function (variant) {
      return (variant.id === variantId);
    })[0];
    var cartLineItem = findCartItemByVariantId(variant.id);
    var quantity = evt.target.value;
    if (cartLineItem) {
      updateVariantInCart(cartLineItem, quantity);
    }
  }

  /* Debounce taken from _.js
  ============================================================ */
  function debounce(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    }
  }

  /* Open Cart
  ============================================================ */
  function openCart() {
    $('.cart').addClass('js-active');
  }

  /* Close Cart
  ============================================================ */
  function closeCart() {
    $('.cart').removeClass('js-active');
    $('.overlay').removeClass('js-active');
  }

  /* Find Cart Line Item By Variant Id
  ============================================================ */
  function findCartItemByVariantId(variantId) {
    return cart.lineItems.filter(function (item) {
      return (item.variant_id === variantId);
    })[0];
  }

  /* Determine action for variant adding/updating/removing
  ============================================================ */
  function addOrUpdateVariant(variant, quantity) {
    openCart();
    var cartLineItem = findCartItemByVariantId(variant.id);

    if (cartLineItem) {
      updateVariantInCart(cartLineItem, quantity);
    } else {
      addVariantToCart(variant, quantity);
    }

    updateCartTabButton();
  }

  /* Update details for item already in cart. Remove if necessary
  ============================================================ */
  function updateVariantInCart(cartLineItem, quantity) {
    var variantId = cartLineItem.variant_id;
    var cartLength = cart.lineItems.length;
    cart.updateLineItem(cartLineItem.id, quantity).then(function(updatedCart) {
      var $cartItem = $('.cart').find('.cart-item[data-variant-id="' + variantId + '"]');
      if (updatedCart.lineItems.length >= cartLength) {
        $cartItem.find('.cart-item__quantity').val(cartLineItem.quantity);
        $cartItem.find('.cart-item__price').text(formatAsMoney(cartLineItem.line_price));
      } else {
        $cartItem.addClass('js-hidden').bind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function() {
           $cartItem.remove();
        });
      }

      updateCartTabButton();
      updateTotalCartPricing();
      if (updatedCart.lineItems.length < 1) {
        closeCart();
      }
    }).catch(function (errors) {
      console.log('Fail');
      console.error(errors);
    });
  }

  /* Add 'quantity' amount of product 'variant' to cart
  ============================================================ */
  function addVariantToCart(variant, quantity) {
    openCart();

    cart.addVariants({ variant: variant, quantity: quantity }).then(function() {
      var cartItem = cart.lineItems.filter(function (item) {
        return (item.variant_id === variant.id);
      })[0];
      var $cartItem = renderCartItem(cartItem);
      var $cartItemContainer = $('.cart-item-container');
      $cartItemContainer.append($cartItem);
      setTimeout(function () {
        $cartItemContainer.find('.js-hidden').removeClass('js-hidden');
      }, 0)

    }).catch(function (errors) {
      console.log('Fail');
      console.error(errors);
    });

    updateTotalCartPricing();
    updateCartTabButton();
  }

  /* Return required markup for single item rendering
  ============================================================ */
  function renderCartItem(lineItem) {
    var lineItemEmptyTemplate = $('#CartItemTemplate').html();
    var $lineItemTemplate = $(lineItemEmptyTemplate);
    var itemImage = lineItem.image.src;
    $lineItemTemplate.attr('data-variant-id', lineItem.variant_id);
    $lineItemTemplate.addClass('js-hidden');
    $lineItemTemplate.find('.cart-item__img').css('background-image', 'url(' + itemImage + ')');
    $lineItemTemplate.find('.cart-item__title').text(lineItem.title);
    $lineItemTemplate.find('.cart-item__variant-title').text(lineItem.variant_title);
    $lineItemTemplate.find('.cart-item__price').text(formatAsMoney(lineItem.line_price));
    $lineItemTemplate.find('.cart-item__quantity').attr('value', lineItem.quantity);
    $lineItemTemplate.find('.quantity-decrement').attr('data-variant-id', lineItem.variant_id);
    $lineItemTemplate.find('.quantity-increment').attr('data-variant-id', lineItem.variant_id);

    return $lineItemTemplate;
  }

  /* Render the line items currently in the cart
  ============================================================ */
  function renderCartItems() {
    var $cartItemContainer = $('.cart-item-container');
    $cartItemContainer.empty();
    var lineItemEmptyTemplate = $('#CartItemTemplate').html();
    var $cartLineItems = cart.lineItems.map(function (lineItem, index) {
      return renderCartItem(lineItem);
    });
    $cartItemContainer.append($cartLineItems);

    setTimeout(function () {
      $cartItemContainer.find('.js-hidden').removeClass('js-hidden');
    }, 0)
    updateTotalCartPricing();
  }

  /* Update Total Cart Pricing
  ============================================================ */
  function updateTotalCartPricing() {
    $('.cart .pricing').text(formatAsMoney(cart.subtotal));
  }

  /* Format amount as currency
  ============================================================ */
  function formatAsMoney(amount, currency, thousandSeparator, decimalSeparator, localeDecimalSeparator) {
    currency = currency || '$';
    thousandSeparator = thousandSeparator || ',';
    decimalSeparator = decimalSeparator || '.';
    localeDecimalSeparator = localeDecimalSeparator || '.';
    var regex = new RegExp('(\\d)(?=(\\d{3})+\\.)', 'g');

    return currency + parseFloat(amount, 10).toFixed(2)
      .replace(localeDecimalSeparator, decimalSeparator)
      .replace(regex, '$1' + thousandSeparator)
      .toString();
  }

  /* Update cart tab button
  ============================================================ */
  function updateCartTabButton() {
    if (cart.lineItems.length > 0) {
      $('.btn--cart-tab .btn__counter').html(cart.lineItemCount);
      $('.btn--cart-tab').addClass('js-active');
    } else {
      $('.btn--cart-tab').removeClass('js-active');
      $('.cart').removeClass('js-active');
    }
  }

  /* Set previously focused item for escape handler
  ============================================================ */
  function setPreviousFocusItem(item) {
    previousFocusItem = item;
  }

});
