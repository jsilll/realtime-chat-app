!(function (e) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = e())
    : "function" == typeof define && define.amd
    ? define([], e)
    : (("undefined" != typeof window
        ? window
        : "undefined" != typeof global
        ? global
        : "undefined" != typeof self
        ? self
        : this
      ).Qs = e());
})(function () {
  return (function i(a, l, c) {
    function s(t, e) {
      if (!l[t]) {
        if (!a[t]) {
          var r = "function" == typeof require && require;
          if (!e && r) return r(t, !0);
          if (f) return f(t, !0);
          var o = new Error("Cannot find module '" + t + "'");
          throw ((o.code = "MODULE_NOT_FOUND"), o);
        }
        var n = (l[t] = { exports: {} });
        a[t][0].call(
          n.exports,
          function (e) {
            return s(a[t][1][e] || e);
          },
          n,
          n.exports,
          i,
          a,
          l,
          c
        );
      }
      return l[t].exports;
    }
    for (
      var f = "function" == typeof require && require, e = 0;
      e < c.length;
      e++
    )
      s(c[e]);
    return s;
  })(
    {
      1: [
        function (e, t, r) {
          "use strict";
          var o = String.prototype.replace,
            n = /%20/g,
            i = e("./utils"),
            a = { RFC1738: "RFC1738", RFC3986: "RFC3986" };
          t.exports = i.assign(
            {
              default: a.RFC3986,
              formatters: {
                RFC1738: function (e) {
                  return o.call(e, n, "+");
                },
                RFC3986: function (e) {
                  return String(e);
                },
              },
            },
            a
          );
        },
        { "./utils": 5 },
      ],
      2: [
        function (e, t, r) {
          "use strict";
          var o = e("./stringify"),
            n = e("./parse"),
            i = e("./formats");
          t.exports = { formats: i, parse: n, stringify: o };
        },
        { "./formats": 1, "./parse": 3, "./stringify": 4 },
      ],
      3: [
        function (e, t, r) {
          "use strict";
          function y(e, t) {
            return e && "string" == typeof e && t.comma && -1 < e.indexOf(",")
              ? e.split(",")
              : e;
          }
          function s(e, t) {
            var r,
              o,
              n,
              i,
              a,
              l,
              c = {},
              s = t.ignoreQueryPrefix ? e.replace(/^\?/, "") : e,
              f = t.parameterLimit === 1 / 0 ? void 0 : t.parameterLimit,
              u = s.split(t.delimiter, f),
              p = -1,
              d = t.charset;
            if (t.charsetSentinel)
              for (r = 0; r < u.length; ++r)
                0 === u[r].indexOf("utf8=") &&
                  ("utf8=%E2%9C%93" === u[r]
                    ? (d = "utf-8")
                    : "utf8=%26%2310003%3B" === u[r] && (d = "iso-8859-1"),
                  (p = r),
                  (r = u.length));
            for (r = 0; r < u.length; ++r) {
              r !== p &&
                ((l =
                  -1 ===
                  (i =
                    -1 === (n = (o = u[r]).indexOf("]="))
                      ? o.indexOf("=")
                      : n + 1)
                    ? ((a = t.decoder(o, g.decoder, d, "key")),
                      t.strictNullHandling ? null : "")
                    : ((a = t.decoder(o.slice(0, i), g.decoder, d, "key")),
                      m.maybeMap(y(o.slice(i + 1), t), function (e) {
                        return t.decoder(e, g.decoder, d, "value");
                      }))) &&
                  t.interpretNumericEntities &&
                  "iso-8859-1" === d &&
                  (l = l.replace(/&#(\d+);/g, function (e, t) {
                    return String.fromCharCode(parseInt(t, 10));
                  })),
                -1 < o.indexOf("[]=") && (l = b(l) ? [l] : l),
                h.call(c, a) ? (c[a] = m.combine(c[a], l)) : (c[a] = l));
            }
            return c;
          }
          function f(e, t, r, o) {
            if (e) {
              var n = r.allowDots ? e.replace(/\.([^.[]+)/g, "[$1]") : e,
                i = /(\[[^[\]]*])/g,
                a = 0 < r.depth && /(\[[^[\]]*])/.exec(n),
                l = a ? n.slice(0, a.index) : n,
                c = [];
              if (l) {
                if (
                  !r.plainObjects &&
                  h.call(Object.prototype, l) &&
                  !r.allowPrototypes
                )
                  return;
                c.push(l);
              }
              for (
                var s = 0;
                0 < r.depth && null !== (a = i.exec(n)) && s < r.depth;

              ) {
                if (
                  ((s += 1),
                  !r.plainObjects &&
                    h.call(Object.prototype, a[1].slice(1, -1)) &&
                    !r.allowPrototypes)
                )
                  return;
                c.push(a[1]);
              }
              return (
                a && c.push("[" + n.slice(a.index) + "]"),
                (function (e, t, r, o) {
                  for (var n = o ? t : y(t, r), i = e.length - 1; 0 <= i; --i) {
                    var a,
                      l,
                      c,
                      s = e[i];
                    "[]" === s && r.parseArrays
                      ? (a = [].concat(n))
                      : ((a = r.plainObjects ? Object.create(null) : {}),
                        (l =
                          "[" === s.charAt(0) && "]" === s.charAt(s.length - 1)
                            ? s.slice(1, -1)
                            : s),
                        (c = parseInt(l, 10)),
                        r.parseArrays || "" !== l
                          ? !isNaN(c) &&
                            s !== l &&
                            String(c) === l &&
                            0 <= c &&
                            r.parseArrays &&
                            c <= r.arrayLimit
                            ? ((a = [])[c] = n)
                            : (a[l] = n)
                          : (a = { 0: n })),
                      (n = a);
                  }
                  return n;
                })(c, t, r, o)
              );
            }
          }
          var m = e("./utils"),
            h = Object.prototype.hasOwnProperty,
            b = Array.isArray,
            g = {
              allowDots: !1,
              allowPrototypes: !1,
              arrayLimit: 20,
              charset: "utf-8",
              charsetSentinel: !1,
              comma: !1,
              decoder: m.decode,
              delimiter: "&",
              depth: 5,
              ignoreQueryPrefix: !1,
              interpretNumericEntities: !1,
              parameterLimit: 1e3,
              parseArrays: !0,
              plainObjects: !1,
              strictNullHandling: !1,
            };
          t.exports = function (e, t) {
            var r = (function (e) {
              if (!e) return g;
              if (
                null !== e.decoder &&
                void 0 !== e.decoder &&
                "function" != typeof e.decoder
              )
                throw new TypeError("Decoder has to be a function.");
              if (
                void 0 !== e.charset &&
                "utf-8" !== e.charset &&
                "iso-8859-1" !== e.charset
              )
                throw new TypeError(
                  "The charset option must be either utf-8, iso-8859-1, or undefined"
                );
              var t = void 0 === e.charset ? g.charset : e.charset;
              return {
                allowDots: void 0 === e.allowDots ? g.allowDots : !!e.allowDots,
                allowPrototypes:
                  "boolean" == typeof e.allowPrototypes
                    ? e.allowPrototypes
                    : g.allowPrototypes,
                arrayLimit:
                  "number" == typeof e.arrayLimit ? e.arrayLimit : g.arrayLimit,
                charset: t,
                charsetSentinel:
                  "boolean" == typeof e.charsetSentinel
                    ? e.charsetSentinel
                    : g.charsetSentinel,
                comma: "boolean" == typeof e.comma ? e.comma : g.comma,
                decoder: "function" == typeof e.decoder ? e.decoder : g.decoder,
                delimiter:
                  "string" == typeof e.delimiter || m.isRegExp(e.delimiter)
                    ? e.delimiter
                    : g.delimiter,
                depth:
                  "number" == typeof e.depth || !1 === e.depth
                    ? +e.depth
                    : g.depth,
                ignoreQueryPrefix: !0 === e.ignoreQueryPrefix,
                interpretNumericEntities:
                  "boolean" == typeof e.interpretNumericEntities
                    ? e.interpretNumericEntities
                    : g.interpretNumericEntities,
                parameterLimit:
                  "number" == typeof e.parameterLimit
                    ? e.parameterLimit
                    : g.parameterLimit,
                parseArrays: !1 !== e.parseArrays,
                plainObjects:
                  "boolean" == typeof e.plainObjects
                    ? e.plainObjects
                    : g.plainObjects,
                strictNullHandling:
                  "boolean" == typeof e.strictNullHandling
                    ? e.strictNullHandling
                    : g.strictNullHandling,
              };
            })(t);
            if ("" === e || null == e)
              return r.plainObjects ? Object.create(null) : {};
            for (
              var o = "string" == typeof e ? s(e, r) : e,
                n = r.plainObjects ? Object.create(null) : {},
                i = Object.keys(o),
                a = 0;
              a < i.length;
              ++a
            )
              var l = i[a],
                c = f(l, o[l], r, "string" == typeof e),
                n = m.merge(n, c, r);
            return m.compact(n);
          };
        },
        { "./utils": 5 },
      ],
      4: [
        function (e, t, r) {
          "use strict";
          function w(e, t) {
            o.apply(e, D(t) ? t : [t]);
          }
          function x(e, t, r, o, n, i, a, l, c, s, f, u, p) {
            var d,
              y = e;
            if (
              ("function" == typeof a
                ? (y = a(t, y))
                : y instanceof Date
                ? (y = s(y))
                : "comma" === r &&
                  D(y) &&
                  (y = N.maybeMap(y, function (e) {
                    return e instanceof Date ? s(e) : e;
                  }).join(",")),
              null === y)
            ) {
              if (o) return i && !u ? i(t, S.encoder, p, "key") : t;
              y = "";
            }
            if (
              "string" == typeof (d = y) ||
              "number" == typeof d ||
              "boolean" == typeof d ||
              "symbol" == typeof d ||
              "bigint" == typeof d ||
              N.isBuffer(y)
            )
              return i
                ? [
                    f(u ? t : i(t, S.encoder, p, "key")) +
                      "=" +
                      f(i(y, S.encoder, p, "value")),
                  ]
                : [f(t) + "=" + f(String(y))];
            var m,
              h,
              b = [];
            if (void 0 === y) return b;
            h = D(a) ? a : ((m = Object.keys(y)), l ? m.sort(l) : m);
            for (var g = 0; g < h.length; ++g) {
              var v,
                O = h[g],
                j = y[O];
              (n && null === j) ||
                ((v = D(y)
                  ? "function" == typeof r
                    ? r(t, O)
                    : t
                  : t + (c ? "." + O : "[" + O + "]")),
                w(b, x(j, v, r, o, n, i, a, l, c, s, f, u, p)));
            }
            return b;
          }
          var N = e("./utils"),
            p = e("./formats"),
            d = Object.prototype.hasOwnProperty,
            y = {
              brackets: function (e) {
                return e + "[]";
              },
              comma: "comma",
              indices: function (e, t) {
                return e + "[" + t + "]";
              },
              repeat: function (e) {
                return e;
              },
            },
            D = Array.isArray,
            o = Array.prototype.push,
            n = Date.prototype.toISOString,
            i = p.default,
            S = {
              addQueryPrefix: !1,
              allowDots: !1,
              charset: "utf-8",
              charsetSentinel: !1,
              delimiter: "&",
              encode: !0,
              encoder: N.encode,
              encodeValuesOnly: !1,
              format: i,
              formatter: p.formatters[i],
              indices: !1,
              serializeDate: function (e) {
                return n.call(e);
              },
              skipNulls: !1,
              strictNullHandling: !1,
            };
          t.exports = function (e, t) {
            var r = e,
              o = (function (e) {
                if (!e) return S;
                if (
                  null !== e.encoder &&
                  void 0 !== e.encoder &&
                  "function" != typeof e.encoder
                )
                  throw new TypeError("Encoder has to be a function.");
                var t = e.charset || S.charset;
                if (
                  void 0 !== e.charset &&
                  "utf-8" !== e.charset &&
                  "iso-8859-1" !== e.charset
                )
                  throw new TypeError(
                    "The charset option must be either utf-8, iso-8859-1, or undefined"
                  );
                var r = p.default;
                if (void 0 !== e.format) {
                  if (!d.call(p.formatters, e.format))
                    throw new TypeError("Unknown format option provided.");
                  r = e.format;
                }
                var o = p.formatters[r],
                  n = S.filter;
                return (
                  ("function" != typeof e.filter && !D(e.filter)) ||
                    (n = e.filter),
                  {
                    addQueryPrefix:
                      "boolean" == typeof e.addQueryPrefix
                        ? e.addQueryPrefix
                        : S.addQueryPrefix,
                    allowDots:
                      void 0 === e.allowDots ? S.allowDots : !!e.allowDots,
                    charset: t,
                    charsetSentinel:
                      "boolean" == typeof e.charsetSentinel
                        ? e.charsetSentinel
                        : S.charsetSentinel,
                    delimiter:
                      void 0 === e.delimiter ? S.delimiter : e.delimiter,
                    encode: "boolean" == typeof e.encode ? e.encode : S.encode,
                    encoder:
                      "function" == typeof e.encoder ? e.encoder : S.encoder,
                    encodeValuesOnly:
                      "boolean" == typeof e.encodeValuesOnly
                        ? e.encodeValuesOnly
                        : S.encodeValuesOnly,
                    filter: n,
                    formatter: o,
                    serializeDate:
                      "function" == typeof e.serializeDate
                        ? e.serializeDate
                        : S.serializeDate,
                    skipNulls:
                      "boolean" == typeof e.skipNulls
                        ? e.skipNulls
                        : S.skipNulls,
                    sort: "function" == typeof e.sort ? e.sort : null,
                    strictNullHandling:
                      "boolean" == typeof e.strictNullHandling
                        ? e.strictNullHandling
                        : S.strictNullHandling,
                  }
                );
              })(t);
            "function" == typeof o.filter
              ? (r = (0, o.filter)("", r))
              : D(o.filter) && (l = o.filter);
            var n,
              i = [];
            if ("object" != typeof r || null === r) return "";
            n =
              t && t.arrayFormat in y
                ? t.arrayFormat
                : !(t && "indices" in t) || t.indices
                ? "indices"
                : "repeat";
            var a = y[n],
              l = l || Object.keys(r);
            o.sort && l.sort(o.sort);
            for (var c = 0; c < l.length; ++c) {
              var s = l[c];
              (o.skipNulls && null === r[s]) ||
                w(
                  i,
                  x(
                    r[s],
                    s,
                    a,
                    o.strictNullHandling,
                    o.skipNulls,
                    o.encode ? o.encoder : null,
                    o.filter,
                    o.sort,
                    o.allowDots,
                    o.serializeDate,
                    o.formatter,
                    o.encodeValuesOnly,
                    o.charset
                  )
                );
            }
            var f = i.join(o.delimiter),
              u = !0 === o.addQueryPrefix ? "?" : "";
            return (
              o.charsetSentinel &&
                ("iso-8859-1" === o.charset
                  ? (u += "utf8=%26%2310003%3B&")
                  : (u += "utf8=%E2%9C%93&")),
              0 < f.length ? u + f : ""
            );
          };
        },
        { "./formats": 1, "./utils": 5 },
      ],
      5: [
        function (e, t, r) {
          "use strict";
          function l(e, t) {
            for (
              var r = t && t.plainObjects ? Object.create(null) : {}, o = 0;
              o < e.length;
              ++o
            )
              void 0 !== e[o] && (r[o] = e[o]);
            return r;
          }
          var c = Object.prototype.hasOwnProperty,
            f = Array.isArray,
            s = (function () {
              for (var e = [], t = 0; t < 256; ++t)
                e.push(
                  "%" + ((t < 16 ? "0" : "") + t.toString(16)).toUpperCase()
                );
              return e;
            })();
          t.exports = {
            arrayToObject: l,
            assign: function (e, r) {
              return Object.keys(r).reduce(function (e, t) {
                return (e[t] = r[t]), e;
              }, e);
            },
            combine: function (e, t) {
              return [].concat(e, t);
            },
            compact: function (e) {
              for (
                var t = [{ obj: { o: e }, prop: "o" }], r = [], o = 0;
                o < t.length;
                ++o
              )
                for (
                  var n = t[o], i = n.obj[n.prop], a = Object.keys(i), l = 0;
                  l < a.length;
                  ++l
                ) {
                  var c = a[l],
                    s = i[c];
                  "object" == typeof s &&
                    null !== s &&
                    -1 === r.indexOf(s) &&
                    (t.push({ obj: i, prop: c }), r.push(s));
                }
              return (
                (function (e) {
                  for (; 1 < e.length; ) {
                    var t = e.pop(),
                      r = t.obj[t.prop];
                    if (f(r)) {
                      for (var o = [], n = 0; n < r.length; ++n)
                        void 0 !== r[n] && o.push(r[n]);
                      t.obj[t.prop] = o;
                    }
                  }
                })(t),
                e
              );
            },
            decode: function (e, t, r) {
              var o = e.replace(/\+/g, " ");
              if ("iso-8859-1" === r)
                return o.replace(/%[0-9a-f]{2}/gi, unescape);
              try {
                return decodeURIComponent(o);
              } catch (e) {
                return o;
              }
            },
            encode: function (e, t, r) {
              if (0 === e.length) return e;
              var o = e;
              if (
                ("symbol" == typeof e
                  ? (o = Symbol.prototype.toString.call(e))
                  : "string" != typeof e && (o = String(e)),
                "iso-8859-1" === r)
              )
                return escape(o).replace(/%u[0-9a-f]{4}/gi, function (e) {
                  return "%26%23" + parseInt(e.slice(2), 16) + "%3B";
                });
              for (var n = "", i = 0; i < o.length; ++i) {
                var a = o.charCodeAt(i);
                45 === a ||
                46 === a ||
                95 === a ||
                126 === a ||
                (48 <= a && a <= 57) ||
                (65 <= a && a <= 90) ||
                (97 <= a && a <= 122)
                  ? (n += o.charAt(i))
                  : a < 128
                  ? (n += s[a])
                  : a < 2048
                  ? (n += s[192 | (a >> 6)] + s[128 | (63 & a)])
                  : a < 55296 || 57344 <= a
                  ? (n +=
                      s[224 | (a >> 12)] +
                      s[128 | ((a >> 6) & 63)] +
                      s[128 | (63 & a)])
                  : ((i += 1),
                    (a =
                      65536 + (((1023 & a) << 10) | (1023 & o.charCodeAt(i)))),
                    (n +=
                      s[240 | (a >> 18)] +
                      s[128 | ((a >> 12) & 63)] +
                      s[128 | ((a >> 6) & 63)] +
                      s[128 | (63 & a)]));
              }
              return n;
            },
            isBuffer: function (e) {
              return (
                !(!e || "object" != typeof e) &&
                !!(
                  e.constructor &&
                  e.constructor.isBuffer &&
                  e.constructor.isBuffer(e)
                )
              );
            },
            isRegExp: function (e) {
              return "[object RegExp]" === Object.prototype.toString.call(e);
            },
            maybeMap: function (e, t) {
              if (f(e)) {
                for (var r = [], o = 0; o < e.length; o += 1) r.push(t(e[o]));
                return r;
              }
              return t(e);
            },
            merge: function o(n, i, a) {
              if (!i) return n;
              if ("object" != typeof i) {
                if (f(n)) n.push(i);
                else {
                  if (!n || "object" != typeof n) return [n, i];
                  ((a && (a.plainObjects || a.allowPrototypes)) ||
                    !c.call(Object.prototype, i)) &&
                    (n[i] = !0);
                }
                return n;
              }
              if (!n || "object" != typeof n) return [n].concat(i);
              var e = n;
              return (
                f(n) && !f(i) && (e = l(n, a)),
                f(n) && f(i)
                  ? (i.forEach(function (e, t) {
                      var r;
                      c.call(n, t)
                        ? (r = n[t]) &&
                          "object" == typeof r &&
                          e &&
                          "object" == typeof e
                          ? (n[t] = o(r, e, a))
                          : n.push(e)
                        : (n[t] = e);
                    }),
                    n)
                  : Object.keys(i).reduce(function (e, t) {
                      var r = i[t];
                      return (
                        c.call(e, t) ? (e[t] = o(e[t], r, a)) : (e[t] = r), e
                      );
                    }, e)
              );
            },
          };
        },
        {},
      ],
    },
    {},
    [2]
  )(2);
});
