/*! For license information please see jioPush-sdk.js.LICENSE.txt */
;(() => {
    'use strict'
    var e = {
        LOG_LEVEL: {
            debug: 1,
            log: 2,
            info: 3,
            trace: 4,
            warn: 5,
            error: 6,
            none: 7,
        },
        consoleStyleOne:
            'color: white; background-color: #095aac; padding:1px 3px; border-radius: 3px; margin-right: 7px',
        logCache: [],
    }
    ;(e.logLevel = e.LOG_LEVEL.debug),
        (e.logCacheEnable = !1),
        (e.maxCacheSize = 1024),
        (e.loggingURL = null),
        (e.setLogLevel = function (t) {
            e.logLevel = t
        }),
        (e.debug = function (t) {
            e.logLevel <= e.LOG_LEVEL.debug &&
                console.debug('%cPushsdk log%c' + t, e.consoleStyleOne, '')
        }),
        (e.log = function (t) {
            e.logLevel <= e.LOG_LEVEL.log &&
                console.log('%cPushsdk log%c' + t, e.consoleStyleOne, '')
        }),
        (e.info = function (t) {
            e.logLevel <= e.LOG_LEVEL.info &&
                console.info('%cPushsdk log%c' + t, e.consoleStyleOne, '')
        }),
        (e.trace = function (t) {
            e.logLevel <= e.LOG_LEVEL.trace &&
                console.trace('%cPushsdk log%c' + t, e.consoleStyleOne, '')
        }),
        (e.warn = function (t) {
            e.logLevel <= e.LOG_LEVEL.warn &&
                console.warn('%cPushsdk log%c' + t, e.consoleStyleOne, '')
        }),
        (e.error = function (t) {
            e.logLevel <= e.LOG_LEVEL.error &&
                console.error('%cPushsdk log%c' + t, e.consoleStyleOne, '')
        }),
        (e.setLogCacheing = function (t, r, n) {
            ;(e.logCacheEnable = t), (e.maxCacheSize = r), (e.loggingURL = n)
        })
    const t = e
    var r = {
        meta: {
            pushVer: '1.24.1',
            appVer: '1.0',
            deviceSubType: 'Webclient',
            osVer: '1.0',
            deviceType: 'Jio',
        },
        pushParams: {
            token: '',
            aid: '',
            an: '',
            pn: '',
            sid: '',
            dt: 'web',
            tn: '',
            env: 'preprod',
            logLevel: 'log',
        },
        fcm: null,
        firebaseMessagingObj: null,
        hostPath: '',
        options: null,
        valkeys: ['aid', 'an', 'token'],
        analytics: {
            compressFormat: !0,
            batchSize: { SYSTEM: 30, APP: 15, CUSTOM: 10 },
            enableBatching: !1,
            enableAnalytics: !0,
        },
        retryConfig: {
            perAPIcallTimeout: 1e4,
            maxRetryAllowed: 3,
            timeBtw2RetryRequest: 1e4,
        },
        cacheConfig: {
            inApp: { invalidationTime: 15 },
            nativeDisplay: { invalidationTime: 15 },
        },
        cdn: {
            analytics: '',
            register: '',
            topicregister: '',
            topicunregister: '',
            tagregistration: '',
            getInAppSegments: '',
            getNativeDisplaySegments: '',
        },
    }
    const n = JSON.parse(
        '{"Andorra":"Andorra","Dubai":"United Arab Emirates","Kabul":"Afghanistan","Tirane":"Albania","Yerevan":"Armenia","Casey":"Antarctica","Davis":"Antarctica","Mawson":"Antarctica","Palmer":"Antarctica","Rothera":"Antarctica","Troll":"Antarctica","Vostok":"Antarctica","Buenos_Aires":"Argentina","Cordoba":"Argentina","Salta":"Argentina","Jujuy":"Argentina","Tucuman":"Argentina","Catamarca":"Argentina","La_Rioja":"Argentina","San_Juan":"Argentina","Mendoza":"Argentina","San_Luis":"Argentina","Rio_Gallegos":"Argentina","Ushuaia":"Argentina","Pago_Pago":"Samoa (American)","Vienna":"Austria","Lord_Howe":"Australia","Macquarie":"Australia","Hobart":"Australia","Melbourne":"Australia","Sydney":"Australia","Broken_Hill":"Australia","Brisbane":"Australia","Lindeman":"Australia","Adelaide":"Australia","Darwin":"Australia","Perth":"Australia","Eucla":"Australia","Baku":"Azerbaijan","Barbados":"Barbados","Dhaka":"Bangladesh","Brussels":"Belgium","Sofia":"Bulgaria","Bermuda":"Bermuda","Brunei":"Brunei","La_Paz":"Bolivia","Noronha":"Brazil","Belem":"Brazil","Fortaleza":"Brazil","Recife":"Brazil","Araguaina":"Brazil","Maceio":"Brazil","Bahia":"Brazil","Sao_Paulo":"Brazil","Campo_Grande":"Brazil","Cuiaba":"Brazil","Santarem":"Brazil","Porto_Velho":"Brazil","Boa_Vista":"Brazil","Manaus":"Brazil","Eirunepe":"Brazil","Rio_Branco":"Brazil","Thimphu":"Bhutan","Minsk":"Belarus","Belize":"Belize","St_Johns":"Canada","Halifax":"Canada","Glace_Bay":"Canada","Moncton":"Canada","Goose_Bay":"Canada","Toronto":"Canada","Nipigon":"Canada","Thunder_Bay":"Canada","Iqaluit":"Canada","Pangnirtung":"Canada","Winnipeg":"Canada","Rainy_River":"Canada","Resolute":"Canada","Rankin_Inlet":"Canada","Regina":"Canada","Swift_Current":"Canada","Edmonton":"Canada","Cambridge_Bay":"Canada","Yellowknife":"Canada","Inuvik":"Canada","Dawson_Creek":"Canada","Fort_Nelson":"Canada","Whitehorse":"Canada","Dawson":"Canada","Vancouver":"Canada","Cocos":"Cocos (Keeling) Islands","Zurich":"Switzerland","Abidjan":"CÃ´te d\'Ivoire","Rarotonga":"Cook Islands","Santiago":"Chile","Punta_Arenas":"Chile","Easter":"Chile","Shanghai":"China","Urumqi":"China","Bogota":"Colombia","Costa_Rica":"Costa Rica","Havana":"Cuba","Cape_Verde":"Cape Verde","Christmas":"Christmas Island","Nicosia":"Cyprus","Famagusta":"Cyprus","Prague":"Czech Republic","Berlin":"Germany","Copenhagen":"Denmark","Santo_Domingo":"Dominican Republic","Algiers":"Algeria","Guayaquil":"Ecuador","Galapagos":"Ecuador","Tallinn":"Estonia","Cairo":"Egypt","El_Aaiun":"Western Sahara","Madrid":"Spain","Ceuta":"Spain","Canary":"Spain","Helsinki":"Finland","Fiji":"Fiji","Stanley":"Falkland Islands","Chuuk":"Micronesia","Pohnpei":"Micronesia","Kosrae":"Micronesia","Faroe":"Faroe Islands","Paris":"France","London":"Britain (UK)","Tbilisi":"Georgia","Cayenne":"French Guiana","Gibraltar":"Gibraltar","Nuuk":"Greenland","Danmarkshavn":"Greenland","Scoresbysund":"Greenland","Thule":"Greenland","Athens":"Greece","South_Georgia":"South Georgia & the South Sandwich Islands","Guatemala":"Guatemala","Guam":"Guam","Bissau":"Guinea-Bissau","Guyana":"Guyana","Hong_Kong":"Hong Kong","Tegucigalpa":"Honduras","Port-au-Prince":"Haiti","Budapest":"Hungary","Jakarta":"Indonesia","Pontianak":"Indonesia","Makassar":"Indonesia","Jayapura":"Indonesia","Dublin":"Ireland","Jerusalem":"Israel","Kolkata":"India","Calcutta":"India","Chagos":"British Indian Ocean Territory","Baghdad":"Iraq","Tehran":"Iran","Reykjavik":"Iceland","Rome":"Italy","Jamaica":"Jamaica","Amman":"Jordan","Tokyo":"Japan","Nairobi":"Kenya","Bishkek":"Kyrgyzstan","Tarawa":"Kiribati","Kanton":"Kiribati","Kiritimati":"Kiribati","Pyongyang":"Korea (North)","Seoul":"Korea (South)","Almaty":"Kazakhstan","Qyzylorda":"Kazakhstan","Qostanay":"Kazakhstan","Aqtobe":"Kazakhstan","Aqtau":"Kazakhstan","Atyrau":"Kazakhstan","Oral":"Kazakhstan","Beirut":"Lebanon","Colombo":"Sri Lanka","Monrovia":"Liberia","Vilnius":"Lithuania","Luxembourg":"Luxembourg","Riga":"Latvia","Tripoli":"Libya","Casablanca":"Morocco","Monaco":"Monaco","Chisinau":"Moldova","Majuro":"Marshall Islands","Kwajalein":"Marshall Islands","Yangon":"Myanmar (Burma)","Ulaanbaatar":"Mongolia","Hovd":"Mongolia","Choibalsan":"Mongolia","Macau":"Macau","Martinique":"Martinique","Malta":"Malta","Mauritius":"Mauritius","Maldives":"Maldives","Mexico_City":"Mexico","Cancun":"Mexico","Merida":"Mexico","Monterrey":"Mexico","Matamoros":"Mexico","Mazatlan":"Mexico","Chihuahua":"Mexico","Ojinaga":"Mexico","Hermosillo":"Mexico","Tijuana":"Mexico","Bahia_Banderas":"Mexico","Kuala_Lumpur":"Malaysia","Kuching":"Malaysia","Maputo":"Mozambique","Windhoek":"Namibia","Noumea":"New Caledonia","Norfolk":"Norfolk Island","Lagos":"Nigeria","Managua":"Nicaragua","Amsterdam":"Netherlands","Oslo":"Norway","Kathmandu":"Nepal","Nauru":"Nauru","Niue":"Niue","Auckland":"New Zealand","Chatham":"New Zealand","Panama":"Panama","Lima":"Peru","Tahiti":"French Polynesia","Marquesas":"French Polynesia","Gambier":"French Polynesia","Port_Moresby":"Papua New Guinea","Bougainville":"Papua New Guinea","Manila":"Philippines","Karachi":"Pakistan","Warsaw":"Poland","Miquelon":"St Pierre & Miquelon","Pitcairn":"Pitcairn","Puerto_Rico":"Puerto Rico","Gaza":"Palestine","Hebron":"Palestine","Lisbon":"Portugal","Madeira":"Portugal","Azores":"Portugal","Palau":"Palau","Asuncion":"Paraguay","Qatar":"Qatar","Reunion":"RÃ©union","Bucharest":"Romania","Belgrade":"Serbia","Kaliningrad":"Russia","Moscow":"Russia","Simferopol":"Russia","Kirov":"Russia","Volgograd":"Russia","Astrakhan":"Russia","Saratov":"Russia","Ulyanovsk":"Russia","Samara":"Russia","Yekaterinburg":"Russia","Omsk":"Russia","Novosibirsk":"Russia","Barnaul":"Russia","Tomsk":"Russia","Novokuznetsk":"Russia","Krasnoyarsk":"Russia","Irkutsk":"Russia","Chita":"Russia","Yakutsk":"Russia","Khandyga":"Russia","Vladivostok":"Russia","Ust-Nera":"Russia","Magadan":"Russia","Sakhalin":"Russia","Srednekolymsk":"Russia","Kamchatka":"Russia","Anadyr":"Russia","Riyadh":"Saudi Arabia","Guadalcanal":"Solomon Islands","Mahe":"Seychelles","Khartoum":"Sudan","Stockholm":"Sweden","Singapore":"Singapore","Paramaribo":"Suriname","Juba":"South Sudan","Sao_Tome":"Sao Tome & Principe","El_Salvador":"El Salvador","Damascus":"Syria","Grand_Turk":"Turks & Caicos Is","Ndjamena":"Chad","Kerguelen":"French Southern & Antarctic Lands","Bangkok":"Thailand","Dushanbe":"Tajikistan","Fakaofo":"Tokelau","Dili":"East Timor","Ashgabat":"Turkmenistan","Tunis":"Tunisia","Tongatapu":"Tonga","Istanbul":"Turkey","Funafuti":"Tuvalu","Taipei":"Taiwan","Kiev":"Ukraine","Uzhgorod":"Ukraine","Zaporozhye":"Ukraine","Wake":"US minor outlying islands","New_York":"United States","Detroit":"United States","Louisville":"United States","Monticello":"United States","Indianapolis":"United States","Vincennes":"United States","Winamac":"United States","Marengo":"United States","Petersburg":"United States","Vevay":"United States","Chicago":"United States","Tell_City":"United States","Knox":"United States","Menominee":"United States","Center":"United States","New_Salem":"United States","Beulah":"United States","Denver":"United States","Boise":"United States","Phoenix":"United States","Los_Angeles":"United States","Anchorage":"United States","Juneau":"United States","Sitka":"United States","Metlakatla":"United States","Yakutat":"United States","Nome":"United States","Adak":"United States","Honolulu":"United States","Montevideo":"Uruguay","Samarkand":"Uzbekistan","Tashkent":"Uzbekistan","Caracas":"Venezuela","Ho_Chi_Minh":"Vietnam","Efate":"Vanuatu","Wallis":"Wallis & Futuna","Apia":"Samoa (western)","Johannesburg":"South Africa","Antigua":"Antigua & Barbuda","Anguilla":"Anguilla","Luanda":"Angola","McMurdo":"Antarctica","DumontDUrville":"Antarctica","Syowa":"Antarctica","Aruba":"Aruba","Mariehamn":"Ã…land Islands","Sarajevo":"Bosnia & Herzegovina","Ouagadougou":"Burkina Faso","Bahrain":"Bahrain","Bujumbura":"Burundi","Porto-Novo":"Benin","St_Barthelemy":"St Barthelemy","Kralendijk":"Caribbean NL","Nassau":"Bahamas","Gaborone":"Botswana","Blanc-Sablon":"Canada","Atikokan":"Canada","Creston":"Canada","Kinshasa":"Congo (Dem. Rep.)","Lubumbashi":"Congo (Dem. Rep.)","Bangui":"Central African Rep.","Brazzaville":"Congo (Rep.)","Douala":"Cameroon","Curacao":"CuraÃ§ao","Busingen":"Germany","Djibouti":"Djibouti","Dominica":"Dominica","Asmara":"Eritrea","Addis_Ababa":"Ethiopia","Libreville":"Gabon","Grenada":"Grenada","Guernsey":"Guernsey","Accra":"Ghana","Banjul":"Gambia","Conakry":"Guinea","Guadeloupe":"Guadeloupe","Malabo":"Equatorial Guinea","Zagreb":"Croatia","Isle_of_Man":"Isle of Man","Jersey":"Jersey","Phnom_Penh":"Cambodia","Comoro":"Comoros","St_Kitts":"St Kitts & Nevis","Kuwait":"Kuwait","Cayman":"Cayman Islands","Vientiane":"Laos","St_Lucia":"St Lucia","Vaduz":"Liechtenstein","Maseru":"Lesotho","Podgorica":"Montenegro","Marigot":"St Martin (French)","Antananarivo":"Madagascar","Skopje":"North Macedonia","Bamako":"Mali","Saipan":"Northern Mariana Islands","Nouakchott":"Mauritania","Montserrat":"Montserrat","Blantyre":"Malawi","Niamey":"Niger","Muscat":"Oman","Kigali":"Rwanda","St_Helena":"St Helena","Ljubljana":"Slovenia","Longyearbyen":"Svalbard & Jan Mayen","Bratislava":"Slovakia","Freetown":"Sierra Leone","San_Marino":"San Marino","Dakar":"Senegal","Mogadishu":"Somalia","Lower_Princes":"St Maarten (Dutch)","Mbabane":"Eswatini (Swaziland)","Lome":"Togo","Port_of_Spain":"Trinidad & Tobago","Dar_es_Salaam":"Tanzania","Kampala":"Uganda","Midway":"US minor outlying islands","Vatican":"Vatican City","St_Vincent":"St Vincent","Tortola":"Virgin Islands (UK)","St_Thomas":"Virgin Islands (US)","Aden":"Yemen","Mayotte":"Mayotte","Lusaka":"Zambia","Harare":"Zimbabwe"}'
    )
    function o(e) {
        return (
            (o =
                'function' == typeof Symbol &&
                'symbol' == typeof Symbol.iterator
                    ? function (e) {
                          return typeof e
                      }
                    : function (e) {
                          return e &&
                              'function' == typeof Symbol &&
                              e.constructor === Symbol &&
                              e !== Symbol.prototype
                              ? 'symbol'
                              : typeof e
                      }),
            o(e)
        )
    }
    function a() {
        a = function () {
            return e
        }
        var e = {},
            t = Object.prototype,
            r = t.hasOwnProperty,
            n =
                Object.defineProperty ||
                function (e, t, r) {
                    e[t] = r.value
                },
            i = 'function' == typeof Symbol ? Symbol : {},
            s = i.iterator || '@@iterator',
            c = i.asyncIterator || '@@asyncIterator',
            u = i.toStringTag || '@@toStringTag'
        function l(e, t, r) {
            return (
                Object.defineProperty(e, t, {
                    value: r,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                }),
                e[t]
            )
        }
        try {
            l({}, '')
        } catch (e) {
            l = function (e, t, r) {
                return (e[t] = r)
            }
        }
        function f(e, t, r, o) {
            var a = t && t.prototype instanceof d ? t : d,
                i = Object.create(a.prototype),
                s = new P(o || [])
            return n(i, '_invoke', { value: E(e, r, s) }), i
        }
        function p(e, t, r) {
            try {
                return { type: 'normal', arg: e.call(t, r) }
            } catch (e) {
                return { type: 'throw', arg: e }
            }
        }
        e.wrap = f
        var h = {}
        function d() {}
        function v() {}
        function y() {}
        var g = {}
        l(g, s, function () {
            return this
        })
        var m = Object.getPrototypeOf,
            w = m && m(m(C([])))
        w && w !== t && r.call(w, s) && (g = w)
        var b = (y.prototype = d.prototype = Object.create(g))
        function x(e) {
            ;['next', 'throw', 'return'].forEach(function (t) {
                l(e, t, function (e) {
                    return this._invoke(t, e)
                })
            })
        }
        function k(e, t) {
            function a(n, i, s, c) {
                var u = p(e[n], e, i)
                if ('throw' !== u.type) {
                    var l = u.arg,
                        f = l.value
                    return f && 'object' == o(f) && r.call(f, '__await')
                        ? t.resolve(f.__await).then(
                              function (e) {
                                  a('next', e, s, c)
                              },
                              function (e) {
                                  a('throw', e, s, c)
                              }
                          )
                        : t.resolve(f).then(
                              function (e) {
                                  ;(l.value = e), s(l)
                              },
                              function (e) {
                                  return a('throw', e, s, c)
                              }
                          )
                }
                c(u.arg)
            }
            var i
            n(this, '_invoke', {
                value: function (e, r) {
                    function n() {
                        return new t(function (t, n) {
                            a(e, r, t, n)
                        })
                    }
                    return (i = i ? i.then(n, n) : n())
                },
            })
        }
        function E(e, t, r) {
            var n = 'suspendedStart'
            return function (o, a) {
                if ('executing' === n)
                    throw new Error('Generator is already running')
                if ('completed' === n) {
                    if ('throw' === o) throw a
                    return { value: void 0, done: !0 }
                }
                for (r.method = o, r.arg = a; ; ) {
                    var i = r.delegate
                    if (i) {
                        var s = S(i, r)
                        if (s) {
                            if (s === h) continue
                            return s
                        }
                    }
                    if ('next' === r.method) r.sent = r._sent = r.arg
                    else if ('throw' === r.method) {
                        if ('suspendedStart' === n)
                            throw ((n = 'completed'), r.arg)
                        r.dispatchException(r.arg)
                    } else 'return' === r.method && r.abrupt('return', r.arg)
                    n = 'executing'
                    var c = p(e, t, r)
                    if ('normal' === c.type) {
                        if (
                            ((n = r.done ? 'completed' : 'suspendedYield'),
                            c.arg === h)
                        )
                            continue
                        return { value: c.arg, done: r.done }
                    }
                    'throw' === c.type &&
                        ((n = 'completed'),
                        (r.method = 'throw'),
                        (r.arg = c.arg))
                }
            }
        }
        function S(e, t) {
            var r = t.method,
                n = e.iterator[r]
            if (void 0 === n)
                return (
                    (t.delegate = null),
                    ('throw' === r &&
                        e.iterator.return &&
                        ((t.method = 'return'),
                        (t.arg = void 0),
                        S(e, t),
                        'throw' === t.method)) ||
                        ('return' !== r &&
                            ((t.method = 'throw'),
                            (t.arg = new TypeError(
                                "The iterator does not provide a '" +
                                    r +
                                    "' method"
                            )))),
                    h
                )
            var o = p(n, e.iterator, t.arg)
            if ('throw' === o.type)
                return (
                    (t.method = 'throw'),
                    (t.arg = o.arg),
                    (t.delegate = null),
                    h
                )
            var a = o.arg
            return a
                ? a.done
                    ? ((t[e.resultName] = a.value),
                      (t.next = e.nextLoc),
                      'return' !== t.method &&
                          ((t.method = 'next'), (t.arg = void 0)),
                      (t.delegate = null),
                      h)
                    : a
                : ((t.method = 'throw'),
                  (t.arg = new TypeError('iterator result is not an object')),
                  (t.delegate = null),
                  h)
        }
        function L(e) {
            var t = { tryLoc: e[0] }
            1 in e && (t.catchLoc = e[1]),
                2 in e && ((t.finallyLoc = e[2]), (t.afterLoc = e[3])),
                this.tryEntries.push(t)
        }
        function O(e) {
            var t = e.completion || {}
            ;(t.type = 'normal'), delete t.arg, (e.completion = t)
        }
        function P(e) {
            ;(this.tryEntries = [{ tryLoc: 'root' }]),
                e.forEach(L, this),
                this.reset(!0)
        }
        function C(e) {
            if (e) {
                var t = e[s]
                if (t) return t.call(e)
                if ('function' == typeof e.next) return e
                if (!isNaN(e.length)) {
                    var n = -1,
                        o = function t() {
                            for (; ++n < e.length; )
                                if (r.call(e, n))
                                    return (t.value = e[n]), (t.done = !1), t
                            return (t.value = void 0), (t.done = !0), t
                        }
                    return (o.next = o)
                }
            }
            return { next: T }
        }
        function T() {
            return { value: void 0, done: !0 }
        }
        return (
            (v.prototype = y),
            n(b, 'constructor', { value: y, configurable: !0 }),
            n(y, 'constructor', { value: v, configurable: !0 }),
            (v.displayName = l(y, u, 'GeneratorFunction')),
            (e.isGeneratorFunction = function (e) {
                var t = 'function' == typeof e && e.constructor
                return (
                    !!t &&
                    (t === v ||
                        'GeneratorFunction' === (t.displayName || t.name))
                )
            }),
            (e.mark = function (e) {
                return (
                    Object.setPrototypeOf
                        ? Object.setPrototypeOf(e, y)
                        : ((e.__proto__ = y), l(e, u, 'GeneratorFunction')),
                    (e.prototype = Object.create(b)),
                    e
                )
            }),
            (e.awrap = function (e) {
                return { __await: e }
            }),
            x(k.prototype),
            l(k.prototype, c, function () {
                return this
            }),
            (e.AsyncIterator = k),
            (e.async = function (t, r, n, o, a) {
                void 0 === a && (a = Promise)
                var i = new k(f(t, r, n, o), a)
                return e.isGeneratorFunction(r)
                    ? i
                    : i.next().then(function (e) {
                          return e.done ? e.value : i.next()
                      })
            }),
            x(b),
            l(b, u, 'Generator'),
            l(b, s, function () {
                return this
            }),
            l(b, 'toString', function () {
                return '[object Generator]'
            }),
            (e.keys = function (e) {
                var t = Object(e),
                    r = []
                for (var n in t) r.push(n)
                return (
                    r.reverse(),
                    function e() {
                        for (; r.length; ) {
                            var n = r.pop()
                            if (n in t) return (e.value = n), (e.done = !1), e
                        }
                        return (e.done = !0), e
                    }
                )
            }),
            (e.values = C),
            (P.prototype = {
                constructor: P,
                reset: function (e) {
                    if (
                        ((this.prev = 0),
                        (this.next = 0),
                        (this.sent = this._sent = void 0),
                        (this.done = !1),
                        (this.delegate = null),
                        (this.method = 'next'),
                        (this.arg = void 0),
                        this.tryEntries.forEach(O),
                        !e)
                    )
                        for (var t in this)
                            't' === t.charAt(0) &&
                                r.call(this, t) &&
                                !isNaN(+t.slice(1)) &&
                                (this[t] = void 0)
                },
                stop: function () {
                    this.done = !0
                    var e = this.tryEntries[0].completion
                    if ('throw' === e.type) throw e.arg
                    return this.rval
                },
                dispatchException: function (e) {
                    if (this.done) throw e
                    var t = this
                    function n(r, n) {
                        return (
                            (i.type = 'throw'),
                            (i.arg = e),
                            (t.next = r),
                            n && ((t.method = 'next'), (t.arg = void 0)),
                            !!n
                        )
                    }
                    for (var o = this.tryEntries.length - 1; o >= 0; --o) {
                        var a = this.tryEntries[o],
                            i = a.completion
                        if ('root' === a.tryLoc) return n('end')
                        if (a.tryLoc <= this.prev) {
                            var s = r.call(a, 'catchLoc'),
                                c = r.call(a, 'finallyLoc')
                            if (s && c) {
                                if (this.prev < a.catchLoc)
                                    return n(a.catchLoc, !0)
                                if (this.prev < a.finallyLoc)
                                    return n(a.finallyLoc)
                            } else if (s) {
                                if (this.prev < a.catchLoc)
                                    return n(a.catchLoc, !0)
                            } else {
                                if (!c)
                                    throw new Error(
                                        'try statement without catch or finally'
                                    )
                                if (this.prev < a.finallyLoc)
                                    return n(a.finallyLoc)
                            }
                        }
                    }
                },
                abrupt: function (e, t) {
                    for (var n = this.tryEntries.length - 1; n >= 0; --n) {
                        var o = this.tryEntries[n]
                        if (
                            o.tryLoc <= this.prev &&
                            r.call(o, 'finallyLoc') &&
                            this.prev < o.finallyLoc
                        ) {
                            var a = o
                            break
                        }
                    }
                    a &&
                        ('break' === e || 'continue' === e) &&
                        a.tryLoc <= t &&
                        t <= a.finallyLoc &&
                        (a = null)
                    var i = a ? a.completion : {}
                    return (
                        (i.type = e),
                        (i.arg = t),
                        a
                            ? ((this.method = 'next'),
                              (this.next = a.finallyLoc),
                              h)
                            : this.complete(i)
                    )
                },
                complete: function (e, t) {
                    if ('throw' === e.type) throw e.arg
                    return (
                        'break' === e.type || 'continue' === e.type
                            ? (this.next = e.arg)
                            : 'return' === e.type
                              ? ((this.rval = this.arg = e.arg),
                                (this.method = 'return'),
                                (this.next = 'end'))
                              : 'normal' === e.type && t && (this.next = t),
                        h
                    )
                },
                finish: function (e) {
                    for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                        var r = this.tryEntries[t]
                        if (r.finallyLoc === e)
                            return (
                                this.complete(r.completion, r.afterLoc), O(r), h
                            )
                    }
                },
                catch: function (e) {
                    for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                        var r = this.tryEntries[t]
                        if (r.tryLoc === e) {
                            var n = r.completion
                            if ('throw' === n.type) {
                                var o = n.arg
                                O(r)
                            }
                            return o
                        }
                    }
                    throw new Error('illegal catch attempt')
                },
                delegateYield: function (e, t, r) {
                    return (
                        (this.delegate = {
                            iterator: C(e),
                            resultName: t,
                            nextLoc: r,
                        }),
                        'next' === this.method && (this.arg = void 0),
                        h
                    )
                },
            }),
            e
        )
    }
    function i(e, t, r, n, o, a, i) {
        try {
            var s = e[a](i),
                c = s.value
        } catch (e) {
            return void r(e)
        }
        s.done ? t(c) : Promise.resolve(c).then(n, o)
    }
    function s(e) {
        return function () {
            var t = this,
                r = arguments
            return new Promise(function (n, o) {
                var a = e.apply(t, r)
                function s(e) {
                    i(a, n, o, s, c, 'next', e)
                }
                function c(e) {
                    i(a, n, o, s, c, 'throw', e)
                }
                s(void 0)
            })
        }
    }
    function c(e, t) {
        if (!(e instanceof t))
            throw new TypeError('Cannot call a class as a function')
    }
    function u(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r]
            ;(n.enumerable = n.enumerable || !1),
                (n.configurable = !0),
                'value' in n && (n.writable = !0),
                Object.defineProperty(
                    e,
                    (void 0,
                    (a = (function (e, t) {
                        if ('object' !== o(e) || null === e) return e
                        var r = e[Symbol.toPrimitive]
                        if (void 0 !== r) {
                            var n = r.call(e, 'string')
                            if ('object' !== o(n)) return n
                            throw new TypeError(
                                '@@toPrimitive must return a primitive value.'
                            )
                        }
                        return String(e)
                    })(n.key)),
                    'symbol' === o(a) ? a : String(a)),
                    n
                )
        }
        var a
    }
    function l(e, t, r) {
        return (
            t && u(e.prototype, t),
            r && u(e, r),
            Object.defineProperty(e, 'prototype', { writable: !1 }),
            e
        )
    }
    function f(e, t) {
        ;(null == t || t > e.length) && (t = e.length)
        for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r]
        return n
    }
    var p = function (e, t) {
            return { tagName: e, tagValue: t }
        },
        h = function () {
            var e = [],
                t = (function () {
                    var e,
                        t,
                        r,
                        n,
                        o,
                        a = navigator.userAgent
                    ;-1 != (n = a.indexOf('YaBrowser'))
                        ? ((e = 'Yandex'), (t = a.substring(n + 10)))
                        : -1 != (n = a.indexOf('SamsungBrowser'))
                          ? ((e = 'Samsung'), (t = a.substring(n + 15)))
                          : -1 != (n = a.indexOf('UCBrowser'))
                            ? ((e = 'UC Browser'), (t = a.substring(n + 10)))
                            : -1 != (n = a.indexOf('OPR'))
                              ? ((e = 'Opera'), (t = a.substring(n + 4)))
                              : -1 != (n = a.indexOf('Opera'))
                                ? ((e = 'Opera'),
                                  (t = a.substring(n + 6)),
                                  -1 != (n = a.indexOf('Version')) &&
                                      (t = a.substring(n + 8)))
                                : -1 != (n = a.indexOf('Edge'))
                                  ? ((e = 'Microsoft Legacy Edge'),
                                    (t = a.substring(n + 5)))
                                  : -1 != (n = a.indexOf('Edg'))
                                    ? ((e = 'Microsoft Edge'),
                                      (t = a.substring(n + 4)))
                                    : -1 != (n = a.indexOf('MSIE'))
                                      ? ((e = 'Microsoft Internet Explorer'),
                                        (t = a.substring(n + 5)))
                                      : -1 != (n = a.indexOf('Chrome'))
                                        ? ((e = 'Chrome'),
                                          (t = a.substring(n + 7)))
                                        : -1 != (n = a.indexOf('Safari'))
                                          ? ((e = 'Safari'),
                                            (t = a.substring(n + 7)),
                                            -1 != (n = a.indexOf('Version')) &&
                                                (t = a.substring(n + 8)))
                                          : -1 != (n = a.indexOf('Firefox'))
                                            ? ((e = 'Firefox'),
                                              (t = a.substring(n + 8)))
                                            : -1 != a.indexOf('Trident/')
                                              ? ((e =
                                                    'Microsoft Internet Explorer'),
                                                (t = a.substring(
                                                    a.indexOf('rv:') + 3
                                                )))
                                              : (r = a.lastIndexOf(' ') + 1) <
                                                    (n = a.lastIndexOf('/')) &&
                                                ((e = a.substring(r, n)),
                                                (t = a.substring(n + 1)),
                                                e.toLowerCase() ==
                                                    e.toUpperCase() &&
                                                    (e = navigator.appName)),
                        -1 != (o = t.indexOf(';')) && (t = t.substring(0, o)),
                        -1 != (o = t.indexOf(' ')) && (t = t.substring(0, o)),
                        -1 != (o = t.indexOf(')')) && (t = t.substring(0, o))
                    var i = /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(a),
                        s = '-',
                        c = [
                            {
                                s: 'Windows 10',
                                r: /(Windows 10.0|Windows NT 10.0)/,
                            },
                            {
                                s: 'Windows 8.1',
                                r: /(Windows 8.1|Windows NT 6.3)/,
                            },
                            { s: 'Windows 8', r: /(Windows 8|Windows NT 6.2)/ },
                            { s: 'Windows 7', r: /(Windows 7|Windows NT 6.1)/ },
                            { s: 'Windows Vista', r: /Windows NT 6.0/ },
                            { s: 'Windows Server 2003', r: /Windows NT 5.2/ },
                            {
                                s: 'Windows XP',
                                r: /(Windows NT 5.1|Windows XP)/,
                            },
                            {
                                s: 'Windows 2000',
                                r: /(Windows NT 5.0|Windows 2000)/,
                            },
                            { s: 'Windows ME', r: /(Win 9x 4.90|Windows ME)/ },
                            { s: 'Windows 98', r: /(Windows 98|Win98)/ },
                            {
                                s: 'Windows 95',
                                r: /(Windows 95|Win95|Windows_95)/,
                            },
                            {
                                s: 'Windows NT 4.0',
                                r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/,
                            },
                            { s: 'Windows CE', r: /Windows CE/ },
                            { s: 'Windows 3.11', r: /Win16/ },
                            { s: 'Android', r: /Android/ },
                            { s: 'Open BSD', r: /OpenBSD/ },
                            { s: 'Sun OS', r: /SunOS/ },
                            { s: 'Chrome OS', r: /CrOS/ },
                            { s: 'Linux', r: /(Linux|X11(?!.*CrOS))/ },
                            { s: 'iOS', r: /(iPhone|iPad|iPod)/ },
                            { s: 'Mac OS X', r: /Mac OS X/ },
                            {
                                s: 'Mac OS',
                                r: /(Mac OS|MacPPC|MacIntel|Mac_PowerPC|Macintosh)/,
                            },
                            { s: 'QNX', r: /QNX/ },
                            { s: 'UNIX', r: /UNIX/ },
                            { s: 'BeOS', r: /BeOS/ },
                            { s: 'OS/2', r: /OS\/2/ },
                            {
                                s: 'Search Bot',
                                r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/,
                            },
                        ]
                    for (var u in c) {
                        var l = c[u]
                        if (l.r.test(a)) {
                            s = l.s
                            break
                        }
                    }
                    var f = '-'
                    switch (
                        (/Windows/.test(s) &&
                            ((f = /Windows (.*)/.exec(s)[1]), (s = 'Windows')),
                        s)
                    ) {
                        case 'Mac OS':
                        case 'Mac OS X':
                        case 'Android':
                            f =
                                /(?:Android|Mac OS|Mac OS X|MacPPC|MacIntel|Mac_PowerPC|Macintosh) ([\.\_\d]+)/.exec(
                                    a
                                )[1]
                            break
                        case 'iOS':
                            f =
                                (f = /OS (\d+)_(\d+)_?(\d+)?/.exec(a))[1] +
                                '.' +
                                f[2] +
                                '.' +
                                (0 | f[3])
                    }
                    return {
                        browser: e,
                        browserVersion: t,
                        mobile: i,
                        os: s,
                        osVersion: f,
                    }
                })(),
                o = Intl.DateTimeFormat().resolvedOptions().timeZone,
                a = o.split('/'),
                i = a[a.length - 1]
            return (
                e.push(p('Timezone', o)),
                e.push(
                    p('OS Version', ''.concat(t.os, ' ').concat(t.osVersion))
                ),
                e.push(p('Device Type', 'WebClient')),
                e.push(
                    p(
                        'Model Name',
                        ''.concat(t.browser, ';').concat(t.browserVersion)
                    )
                ),
                e.push(p('Country', n[i])),
                e.push(p('App Version', r.meta.appVer)),
                e.push(p('Network Carrier', '')),
                e.push(p('Device Brand Name', '')),
                e.push(p('BPID', '')),
                e
            )
        },
        d = function (e, t) {
            return { success: e, message: t }
        },
        v = function (e, t) {
            var r = !0
            return (
                t.forEach(function (t) {
                    Object.prototype.hasOwnProperty.call(e, t) || (r = !1)
                }),
                r
            )
        },
        y = function () {
            return new Promise(function (e, r) {
                try {
                    ;((n = function (e) {
                        function t(e, t) {
                            return (e << t) | (e >>> (32 - t))
                        }
                        function r(e, t) {
                            var r, n, o, a, i
                            return (
                                (o = 2147483648 & e),
                                (a = 2147483648 & t),
                                (i = (1073741823 & e) + (1073741823 & t)),
                                (r = 1073741824 & e) & (n = 1073741824 & t)
                                    ? 2147483648 ^ i ^ o ^ a
                                    : r | n
                                      ? 1073741824 & i
                                          ? 3221225472 ^ i ^ o ^ a
                                          : 1073741824 ^ i ^ o ^ a
                                      : i ^ o ^ a
                            )
                        }
                        function n(e, n, o, a, i, s, c) {
                            return (
                                (e = r(
                                    e,
                                    r(
                                        r(
                                            (function (e, t, r) {
                                                return (e & t) | (~e & r)
                                            })(n, o, a),
                                            i
                                        ),
                                        c
                                    )
                                )),
                                r(t(e, s), n)
                            )
                        }
                        function o(e, n, o, a, i, s, c) {
                            return (
                                (e = r(
                                    e,
                                    r(
                                        r(
                                            (function (e, t, r) {
                                                return (e & r) | (t & ~r)
                                            })(n, o, a),
                                            i
                                        ),
                                        c
                                    )
                                )),
                                r(t(e, s), n)
                            )
                        }
                        function a(e, n, o, a, i, s, c) {
                            return (
                                (e = r(
                                    e,
                                    r(
                                        r(
                                            (function (e, t, r) {
                                                return e ^ t ^ r
                                            })(n, o, a),
                                            i
                                        ),
                                        c
                                    )
                                )),
                                r(t(e, s), n)
                            )
                        }
                        function i(e, n, o, a, i, s, c) {
                            return (
                                (e = r(
                                    e,
                                    r(
                                        r(
                                            (function (e, t, r) {
                                                return t ^ (e | ~r)
                                            })(n, o, a),
                                            i
                                        ),
                                        c
                                    )
                                )),
                                r(t(e, s), n)
                            )
                        }
                        function s(e) {
                            var t,
                                r = '',
                                n = ''
                            for (t = 0; t <= 3; t++)
                                r += (n =
                                    '0' +
                                    ((e >>> (8 * t)) & 255).toString(
                                        16
                                    )).substr(n.length - 2, 2)
                            return r
                        }
                        var c, u, l, f, p, h, d, v, y, g
                        for (
                            e = (function (e) {
                                e = e.replace(/\r\n/g, '\n')
                                for (var t = '', r = 0; r < e.length; r++) {
                                    var n = e.charCodeAt(r)
                                    n < 128
                                        ? (t += String.fromCharCode(n))
                                        : n > 127 && n < 2048
                                          ? ((t += String.fromCharCode(
                                                (n >> 6) | 192
                                            )),
                                            (t += String.fromCharCode(
                                                (63 & n) | 128
                                            )))
                                          : ((t += String.fromCharCode(
                                                (n >> 12) | 224
                                            )),
                                            (t += String.fromCharCode(
                                                ((n >> 6) & 63) | 128
                                            )),
                                            (t += String.fromCharCode(
                                                (63 & n) | 128
                                            )))
                                }
                                return t
                            })(e),
                                c = (function (e) {
                                    for (
                                        var t,
                                            r = e.length,
                                            n = r + 8,
                                            o = 16 * ((n - (n % 64)) / 64 + 1),
                                            a = new Array(o - 1),
                                            i = 0,
                                            s = 0;
                                        s < r;

                                    )
                                        (i = (s % 4) * 8),
                                            (a[(t = (s - (s % 4)) / 4)] =
                                                a[t] | (e.charCodeAt(s) << i)),
                                            s++
                                    return (
                                        (i = (s % 4) * 8),
                                        (a[(t = (s - (s % 4)) / 4)] =
                                            a[t] | (128 << i)),
                                        (a[o - 2] = r << 3),
                                        (a[o - 1] = r >>> 29),
                                        a
                                    )
                                })(e),
                                d = 1732584193,
                                v = 4023233417,
                                y = 2562383102,
                                g = 271733878,
                                u = 0;
                            u < c.length;
                            u += 16
                        )
                            (l = d),
                                (f = v),
                                (p = y),
                                (h = g),
                                (d = n(d, v, y, g, c[u + 0], 7, 3614090360)),
                                (g = n(g, d, v, y, c[u + 1], 12, 3905402710)),
                                (y = n(y, g, d, v, c[u + 2], 17, 606105819)),
                                (v = n(v, y, g, d, c[u + 3], 22, 3250441966)),
                                (d = n(d, v, y, g, c[u + 4], 7, 4118548399)),
                                (g = n(g, d, v, y, c[u + 5], 12, 1200080426)),
                                (y = n(y, g, d, v, c[u + 6], 17, 2821735955)),
                                (v = n(v, y, g, d, c[u + 7], 22, 4249261313)),
                                (d = n(d, v, y, g, c[u + 8], 7, 1770035416)),
                                (g = n(g, d, v, y, c[u + 9], 12, 2336552879)),
                                (y = n(y, g, d, v, c[u + 10], 17, 4294925233)),
                                (v = n(v, y, g, d, c[u + 11], 22, 2304563134)),
                                (d = n(d, v, y, g, c[u + 12], 7, 1804603682)),
                                (g = n(g, d, v, y, c[u + 13], 12, 4254626195)),
                                (y = n(y, g, d, v, c[u + 14], 17, 2792965006)),
                                (d = o(
                                    d,
                                    (v = n(
                                        v,
                                        y,
                                        g,
                                        d,
                                        c[u + 15],
                                        22,
                                        1236535329
                                    )),
                                    y,
                                    g,
                                    c[u + 1],
                                    5,
                                    4129170786
                                )),
                                (g = o(g, d, v, y, c[u + 6], 9, 3225465664)),
                                (y = o(y, g, d, v, c[u + 11], 14, 643717713)),
                                (v = o(v, y, g, d, c[u + 0], 20, 3921069994)),
                                (d = o(d, v, y, g, c[u + 5], 5, 3593408605)),
                                (g = o(g, d, v, y, c[u + 10], 9, 38016083)),
                                (y = o(y, g, d, v, c[u + 15], 14, 3634488961)),
                                (v = o(v, y, g, d, c[u + 4], 20, 3889429448)),
                                (d = o(d, v, y, g, c[u + 9], 5, 568446438)),
                                (g = o(g, d, v, y, c[u + 14], 9, 3275163606)),
                                (y = o(y, g, d, v, c[u + 3], 14, 4107603335)),
                                (v = o(v, y, g, d, c[u + 8], 20, 1163531501)),
                                (d = o(d, v, y, g, c[u + 13], 5, 2850285829)),
                                (g = o(g, d, v, y, c[u + 2], 9, 4243563512)),
                                (y = o(y, g, d, v, c[u + 7], 14, 1735328473)),
                                (d = a(
                                    d,
                                    (v = o(
                                        v,
                                        y,
                                        g,
                                        d,
                                        c[u + 12],
                                        20,
                                        2368359562
                                    )),
                                    y,
                                    g,
                                    c[u + 5],
                                    4,
                                    4294588738
                                )),
                                (g = a(g, d, v, y, c[u + 8], 11, 2272392833)),
                                (y = a(y, g, d, v, c[u + 11], 16, 1839030562)),
                                (v = a(v, y, g, d, c[u + 14], 23, 4259657740)),
                                (d = a(d, v, y, g, c[u + 1], 4, 2763975236)),
                                (g = a(g, d, v, y, c[u + 4], 11, 1272893353)),
                                (y = a(y, g, d, v, c[u + 7], 16, 4139469664)),
                                (v = a(v, y, g, d, c[u + 10], 23, 3200236656)),
                                (d = a(d, v, y, g, c[u + 13], 4, 681279174)),
                                (g = a(g, d, v, y, c[u + 0], 11, 3936430074)),
                                (y = a(y, g, d, v, c[u + 3], 16, 3572445317)),
                                (v = a(v, y, g, d, c[u + 6], 23, 76029189)),
                                (d = a(d, v, y, g, c[u + 9], 4, 3654602809)),
                                (g = a(g, d, v, y, c[u + 12], 11, 3873151461)),
                                (y = a(y, g, d, v, c[u + 15], 16, 530742520)),
                                (d = i(
                                    d,
                                    (v = a(
                                        v,
                                        y,
                                        g,
                                        d,
                                        c[u + 2],
                                        23,
                                        3299628645
                                    )),
                                    y,
                                    g,
                                    c[u + 0],
                                    6,
                                    4096336452
                                )),
                                (g = i(g, d, v, y, c[u + 7], 10, 1126891415)),
                                (y = i(y, g, d, v, c[u + 14], 15, 2878612391)),
                                (v = i(v, y, g, d, c[u + 5], 21, 4237533241)),
                                (d = i(d, v, y, g, c[u + 12], 6, 1700485571)),
                                (g = i(g, d, v, y, c[u + 3], 10, 2399980690)),
                                (y = i(y, g, d, v, c[u + 10], 15, 4293915773)),
                                (v = i(v, y, g, d, c[u + 1], 21, 2240044497)),
                                (d = i(d, v, y, g, c[u + 8], 6, 1873313359)),
                                (g = i(g, d, v, y, c[u + 15], 10, 4264355552)),
                                (y = i(y, g, d, v, c[u + 6], 15, 2734768916)),
                                (v = i(v, y, g, d, c[u + 13], 21, 1309151649)),
                                (d = i(d, v, y, g, c[u + 4], 6, 4149444226)),
                                (g = i(g, d, v, y, c[u + 11], 10, 3174756917)),
                                (y = i(y, g, d, v, c[u + 2], 15, 718787259)),
                                (v = i(v, y, g, d, c[u + 9], 21, 3951481745)),
                                (d = r(d, l)),
                                (v = r(v, f)),
                                (y = r(y, p)),
                                (g = r(g, h))
                        return (s(d) + s(v) + s(y) + s(g)).toLowerCase()
                    }),
                    (o = null),
                    (a = {}),
                    (i = function (e) {
                        if (
                            (t.log(e),
                            'https://mercury.akamaized.net' === e.origin)
                        ) {
                            var r
                            try {
                                r = JSON.parse(e.data)
                            } catch (e) {
                                return
                            }
                            if (
                                'uid-fetcher-res' === r.event &&
                                (t.log('uid fetched: ' + r.args), o)
                            ) {
                                var n =
                                    document.getElementById(
                                        'JioAdsUidGenerator'
                                    )
                                n && n.parentNode.removeChild(n), o(r.args)
                            }
                        }
                    }),
                    {
                        init: function (e) {
                            var r
                            ;(a = e.identifiers),
                                (o = e.uidGenerated),
                                (r =
                                    document.createElement(
                                        'iframe'
                                    )).setAttribute('id', 'JioAdsUidGenerator'),
                                (r.style.width = '100%'),
                                (r.style.height = '100%'),
                                (r.style.display = 'none'),
                                (r.src =
                                    'https://mercury.akamaized.net/jioads/uid/uidgen.html'),
                                (r.onload = function () {
                                    t.log('post message for fetching uid'),
                                        r.contentWindow.postMessage(
                                            JSON.stringify({
                                                event: 'uid-fetcher',
                                                args: a
                                                    ? [n(JSON.stringify(a))]
                                                    : null,
                                            }),
                                            'https://mercury.akamaized.net'
                                        )
                                }),
                                document.body.appendChild(r),
                                window.addEventListener('message', i)
                        },
                        destroy: function () {
                            o = null
                        },
                    }).init({
                        uidGenerated: function (t) {
                            e(t)
                        },
                    })
                } catch (e) {
                    r({
                        message: 'Error while generating Device UUID.',
                        body: e,
                    })
                }
                var n, o, a, i
            })
        },
        g = function () {
            var e = localStorage.getItem('sid') || ''
            if (e) {
                var t = localStorage.getItem('sct')
                return {
                    sid: e,
                    sct: t,
                    sd: new Date().getTime() - parseInt(t),
                }
            }
            return null
        },
        m = function () {
            localStorage.removeItem('sid'), localStorage.removeItem('sct')
        },
        w = function (e, t) {
            var n,
                o = Date.now()
            if ('App Launched' == e || 'App Closed' == e) {
                var a = localStorage.getItem('sid') || ''
                'App Launched' == e &&
                    ((a = (function () {
                        var e = new Date().getTime(),
                            t = ''
                        do {
                            t +=
                                'AaxBbCcqDdEeFfGgHhImJjKkYLsMNnOoPpQrRStTuUvVwWXyzZ'[
                                    Math.ceil((100 * Math.random()) / 2)
                                ]
                        } while (t.length < 7)
                        return ''.concat(t).concat(e)
                    })()),
                    localStorage.setItem('sid', a),
                    localStorage.setItem('sct', o))
                var i = [
                    {
                        propertyName: 'sdkVersion',
                        propertyValue: [''.concat(r.meta.pushVer)],
                    },
                    {
                        propertyName: 'appVersion',
                        propertyValue: [''.concat(r.meta.appVer)],
                    },
                    {
                        propertyName: 'osVersion',
                        propertyValue: [''.concat(r.meta.osVer)],
                    },
                    {
                        propertyName: 'm_session_id',
                        propertyValue: [''.concat(a)],
                    },
                ]
                if (
                    ((t =
                        t && Array.isArray(t)
                            ? [].concat(
                                  (function (e) {
                                      if (Array.isArray(e)) return f(e)
                                  })((n = t)) ||
                                      (function (e) {
                                          if (
                                              ('undefined' != typeof Symbol &&
                                                  null != e[Symbol.iterator]) ||
                                              null != e['@@iterator']
                                          )
                                              return Array.from(e)
                                      })(n) ||
                                      (function (e, t) {
                                          if (e) {
                                              if ('string' == typeof e)
                                                  return f(e, t)
                                              var r = Object.prototype.toString
                                                  .call(e)
                                                  .slice(8, -1)
                                              return (
                                                  'Object' === r &&
                                                      e.constructor &&
                                                      (r = e.constructor.name),
                                                  'Map' === r || 'Set' === r
                                                      ? Array.from(e)
                                                      : 'Arguments' === r ||
                                                          /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(
                                                              r
                                                          )
                                                        ? f(e, t)
                                                        : void 0
                                              )
                                          }
                                      })(n) ||
                                      (function () {
                                          throw new TypeError(
                                              'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
                                          )
                                      })(),
                                  i
                              )
                            : i),
                    'App Closed' == e)
                ) {
                    var s = g()
                    t.push({
                        propertyName: 'sessionDuration',
                        propertyValue: [''.concat(s.sd)],
                    })
                }
                return t
            }
        },
        b = (function () {
            function e() {
                c(this, e)
            }
            var n
            return (
                l(e, [
                    {
                        key: 'Initialize',
                        value: function () {
                            firebase
                                ? (firebase.initializeApp(r.fcm.config),
                                  (r.firebaseMessagingObj =
                                      firebase.messaging()))
                                : t.error('Firebase object is not available.')
                        },
                    },
                    {
                        key: 'getToken',
                        value:
                            ((n = s(
                                a().mark(function e(t) {
                                    var n
                                    return a().wrap(
                                        function (e) {
                                            for (;;)
                                                switch ((e.prev = e.next)) {
                                                    case 0:
                                                        return (
                                                            r.firebaseMessagingObj ||
                                                                this.Initialize(),
                                                            (e.next = 3),
                                                            r.firebaseMessagingObj.getToken(
                                                                {
                                                                    vapidKey:
                                                                        r.fcm
                                                                            .vapid,
                                                                    serviceWorkerRegistration:
                                                                        t,
                                                                }
                                                            )
                                                        )
                                                    case 3:
                                                        return (
                                                            (n = e.sent),
                                                            e.abrupt(
                                                                'return',
                                                                n
                                                            )
                                                        )
                                                    case 5:
                                                    case 'end':
                                                        return e.stop()
                                                }
                                        },
                                        e,
                                        this
                                    )
                                })
                            )),
                            function (e) {
                                return n.apply(this, arguments)
                            }),
                    },
                ]),
                e
            )
        })(),
        x = (function () {
            function e() {
                c(this, e)
            }
            var r
            return (
                l(e, [
                    {
                        key: 'registerServiceWorker',
                        value:
                            ((r = s(
                                a().mark(function e(r) {
                                    var n
                                    return a().wrap(function (e) {
                                        for (;;)
                                            switch ((e.prev = e.next)) {
                                                case 0:
                                                    if (
                                                        !(
                                                            'serviceWorker' in
                                                            navigator
                                                        )
                                                    ) {
                                                        e.next = 7
                                                        break
                                                    }
                                                    return (
                                                        (e.next = 3),
                                                        navigator.serviceWorker.register(
                                                            './ext/jpm-mas/merchant/load-script/sw.js',
                                                            {
                                                                updateViaCache:
                                                                    'none',
                                                            }
                                                        )
                                                    )
                                                case 3:
                                                    return (
                                                        (n = e.sent),
                                                        e.abrupt('return', n)
                                                    )
                                                case 7:
                                                    return (
                                                        t.error(
                                                            'Service workers are not supported by current browser version.'
                                                        ),
                                                        e.abrupt('return', null)
                                                    )
                                                case 9:
                                                case 'end':
                                                    return e.stop()
                                            }
                                    }, e)
                                })
                            )),
                            function (e) {
                                return r.apply(this, arguments)
                            }),
                    },
                    {
                        key: 'registerMessageCallback',
                        value: function (e) {
                            navigator.serviceWorker.addEventListener(
                                'message',
                                function (r) {
                                    t.log(r), e(r)
                                }
                            ),
                                navigator.serviceWorker.startMessages()
                        },
                    },
                    {
                        key: 'postMessageToServiceWorker',
                        value: function (e, r) {
                            e.active.postMessage(JSON.stringify(r)),
                                t.log('Posted message to service worker')
                        },
                    },
                ]),
                e
            )
        })(),
        k = new b(),
        E = new x()
    function S(e) {
        return (
            (S =
                'function' == typeof Symbol &&
                'symbol' == typeof Symbol.iterator
                    ? function (e) {
                          return typeof e
                      }
                    : function (e) {
                          return e &&
                              'function' == typeof Symbol &&
                              e.constructor === Symbol &&
                              e !== Symbol.prototype
                              ? 'symbol'
                              : typeof e
                      }),
            S(e)
        )
    }
    function L(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r]
            ;(n.enumerable = n.enumerable || !1),
                (n.configurable = !0),
                'value' in n && (n.writable = !0),
                Object.defineProperty(
                    e,
                    (void 0,
                    (o = (function (e, t) {
                        if ('object' !== S(e) || null === e) return e
                        var r = e[Symbol.toPrimitive]
                        if (void 0 !== r) {
                            var n = r.call(e, 'string')
                            if ('object' !== S(n)) return n
                            throw new TypeError(
                                '@@toPrimitive must return a primitive value.'
                            )
                        }
                        return String(e)
                    })(n.key)),
                    'symbol' === S(o) ? o : String(o)),
                    n
                )
        }
        var o
    }
    function O(e, t, r) {
        return (
            t && L(e.prototype, t),
            r && L(e, r),
            Object.defineProperty(e, 'prototype', { writable: !1 }),
            e
        )
    }
    function P(e, t) {
        if (!(e instanceof t))
            throw new TypeError('Cannot call a class as a function')
    }
    function C(e, t) {
        if ('function' != typeof t && null !== t)
            throw new TypeError(
                'Super expression must either be null or a function'
            )
        ;(e.prototype = Object.create(t && t.prototype, {
            constructor: { value: e, writable: !0, configurable: !0 },
        })),
            Object.defineProperty(e, 'prototype', { writable: !1 }),
            t && M(e, t)
    }
    function T(e) {
        var t = j()
        return function () {
            var r,
                n = _(e)
            if (t) {
                var o = _(this).constructor
                r = Reflect.construct(n, arguments, o)
            } else r = n.apply(this, arguments)
            return (function (e, t) {
                if (t && ('object' === S(t) || 'function' == typeof t)) return t
                if (void 0 !== t)
                    throw new TypeError(
                        'Derived constructors may only return object or undefined'
                    )
                return (function (e) {
                    if (void 0 === e)
                        throw new ReferenceError(
                            "this hasn't been initialised - super() hasn't been called"
                        )
                    return e
                })(e)
            })(this, r)
        }
    }
    function N(e) {
        var t = 'function' == typeof Map ? new Map() : void 0
        return (
            (N = function (e) {
                if (
                    null === e ||
                    ((r = e),
                    -1 === Function.toString.call(r).indexOf('[native code]'))
                )
                    return e
                var r
                if ('function' != typeof e)
                    throw new TypeError(
                        'Super expression must either be null or a function'
                    )
                if (void 0 !== t) {
                    if (t.has(e)) return t.get(e)
                    t.set(e, n)
                }
                function n() {
                    return I(e, arguments, _(this).constructor)
                }
                return (
                    (n.prototype = Object.create(e.prototype, {
                        constructor: {
                            value: n,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0,
                        },
                    })),
                    M(n, e)
                )
            }),
            N(e)
        )
    }
    function I(e, t, r) {
        return (
            (I = j()
                ? Reflect.construct.bind()
                : function (e, t, r) {
                      var n = [null]
                      n.push.apply(n, t)
                      var o = new (Function.bind.apply(e, n))()
                      return r && M(o, r.prototype), o
                  }),
            I.apply(null, arguments)
        )
    }
    function j() {
        if ('undefined' == typeof Reflect || !Reflect.construct) return !1
        if (Reflect.construct.sham) return !1
        if ('function' == typeof Proxy) return !0
        try {
            return (
                Boolean.prototype.valueOf.call(
                    Reflect.construct(Boolean, [], function () {})
                ),
                !0
            )
        } catch (e) {
            return !1
        }
    }
    function M(e, t) {
        return (
            (M = Object.setPrototypeOf
                ? Object.setPrototypeOf.bind()
                : function (e, t) {
                      return (e.__proto__ = t), e
                  }),
            M(e, t)
        )
    }
    function _(e) {
        return (
            (_ = Object.setPrototypeOf
                ? Object.getPrototypeOf.bind()
                : function (e) {
                      return e.__proto__ || Object.getPrototypeOf(e)
                  }),
            _(e)
        )
    }
    var A = (function (e) {
            C(r, e)
            var t = T(r)
            function r(e, n) {
                var o,
                    a =
                        arguments.length > 2 && void 0 !== arguments[2]
                            ? arguments[2]
                            : null
                return (
                    P(this, r),
                    ((o = t.call(this, e)).url = n),
                    (o.orignalError = a),
                    o
                )
            }
            return O(r)
        })(N(Error)),
        D = (function (e) {
            C(r, e)
            var t = T(r)
            function r(e, n) {
                var o
                return (
                    P(this, r),
                    (o = t.call(this, e)),
                    n &&
                        (o.stack =
                            o.stack +
                            '\n\nThe above error is caused due to\n\n' +
                            n.stack),
                    o
                )
            }
            return O(r)
        })(N(Error)),
        R = (function (e) {
            C(r, e)
            var t = T(r)
            function r(e, n) {
                var o
                return (
                    P(this, r),
                    (o = t.call(this, e)),
                    n &&
                        (o.stack =
                            o.stack +
                            '\n\nThe above error is caused due to\n\n' +
                            n.stack),
                    o
                )
            }
            return O(r)
        })(N(Error))
    function B() {
        B = function () {
            return e
        }
        var e = {},
            t = Object.prototype,
            r = t.hasOwnProperty,
            n =
                Object.defineProperty ||
                function (e, t, r) {
                    e[t] = r.value
                },
            o = 'function' == typeof Symbol ? Symbol : {},
            a = o.iterator || '@@iterator',
            i = o.asyncIterator || '@@asyncIterator',
            s = o.toStringTag || '@@toStringTag'
        function c(e, t, r) {
            return (
                Object.defineProperty(e, t, {
                    value: r,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                }),
                e[t]
            )
        }
        try {
            c({}, '')
        } catch (e) {
            c = function (e, t, r) {
                return (e[t] = r)
            }
        }
        function u(e, t, r, o) {
            var a = t && t.prototype instanceof p ? t : p,
                i = Object.create(a.prototype),
                s = new L(o || [])
            return n(i, '_invoke', { value: x(e, r, s) }), i
        }
        function l(e, t, r) {
            try {
                return { type: 'normal', arg: e.call(t, r) }
            } catch (e) {
                return { type: 'throw', arg: e }
            }
        }
        e.wrap = u
        var f = {}
        function p() {}
        function h() {}
        function d() {}
        var v = {}
        c(v, a, function () {
            return this
        })
        var y = Object.getPrototypeOf,
            g = y && y(y(O([])))
        g && g !== t && r.call(g, a) && (v = g)
        var m = (d.prototype = p.prototype = Object.create(v))
        function w(e) {
            ;['next', 'throw', 'return'].forEach(function (t) {
                c(e, t, function (e) {
                    return this._invoke(t, e)
                })
            })
        }
        function b(e, t) {
            function o(n, a, i, s) {
                var c = l(e[n], e, a)
                if ('throw' !== c.type) {
                    var u = c.arg,
                        f = u.value
                    return f && 'object' == G(f) && r.call(f, '__await')
                        ? t.resolve(f.__await).then(
                              function (e) {
                                  o('next', e, i, s)
                              },
                              function (e) {
                                  o('throw', e, i, s)
                              }
                          )
                        : t.resolve(f).then(
                              function (e) {
                                  ;(u.value = e), i(u)
                              },
                              function (e) {
                                  return o('throw', e, i, s)
                              }
                          )
                }
                s(c.arg)
            }
            var a
            n(this, '_invoke', {
                value: function (e, r) {
                    function n() {
                        return new t(function (t, n) {
                            o(e, r, t, n)
                        })
                    }
                    return (a = a ? a.then(n, n) : n())
                },
            })
        }
        function x(e, t, r) {
            var n = 'suspendedStart'
            return function (o, a) {
                if ('executing' === n)
                    throw new Error('Generator is already running')
                if ('completed' === n) {
                    if ('throw' === o) throw a
                    return { value: void 0, done: !0 }
                }
                for (r.method = o, r.arg = a; ; ) {
                    var i = r.delegate
                    if (i) {
                        var s = k(i, r)
                        if (s) {
                            if (s === f) continue
                            return s
                        }
                    }
                    if ('next' === r.method) r.sent = r._sent = r.arg
                    else if ('throw' === r.method) {
                        if ('suspendedStart' === n)
                            throw ((n = 'completed'), r.arg)
                        r.dispatchException(r.arg)
                    } else 'return' === r.method && r.abrupt('return', r.arg)
                    n = 'executing'
                    var c = l(e, t, r)
                    if ('normal' === c.type) {
                        if (
                            ((n = r.done ? 'completed' : 'suspendedYield'),
                            c.arg === f)
                        )
                            continue
                        return { value: c.arg, done: r.done }
                    }
                    'throw' === c.type &&
                        ((n = 'completed'),
                        (r.method = 'throw'),
                        (r.arg = c.arg))
                }
            }
        }
        function k(e, t) {
            var r = t.method,
                n = e.iterator[r]
            if (void 0 === n)
                return (
                    (t.delegate = null),
                    ('throw' === r &&
                        e.iterator.return &&
                        ((t.method = 'return'),
                        (t.arg = void 0),
                        k(e, t),
                        'throw' === t.method)) ||
                        ('return' !== r &&
                            ((t.method = 'throw'),
                            (t.arg = new TypeError(
                                "The iterator does not provide a '" +
                                    r +
                                    "' method"
                            )))),
                    f
                )
            var o = l(n, e.iterator, t.arg)
            if ('throw' === o.type)
                return (
                    (t.method = 'throw'),
                    (t.arg = o.arg),
                    (t.delegate = null),
                    f
                )
            var a = o.arg
            return a
                ? a.done
                    ? ((t[e.resultName] = a.value),
                      (t.next = e.nextLoc),
                      'return' !== t.method &&
                          ((t.method = 'next'), (t.arg = void 0)),
                      (t.delegate = null),
                      f)
                    : a
                : ((t.method = 'throw'),
                  (t.arg = new TypeError('iterator result is not an object')),
                  (t.delegate = null),
                  f)
        }
        function E(e) {
            var t = { tryLoc: e[0] }
            1 in e && (t.catchLoc = e[1]),
                2 in e && ((t.finallyLoc = e[2]), (t.afterLoc = e[3])),
                this.tryEntries.push(t)
        }
        function S(e) {
            var t = e.completion || {}
            ;(t.type = 'normal'), delete t.arg, (e.completion = t)
        }
        function L(e) {
            ;(this.tryEntries = [{ tryLoc: 'root' }]),
                e.forEach(E, this),
                this.reset(!0)
        }
        function O(e) {
            if (e) {
                var t = e[a]
                if (t) return t.call(e)
                if ('function' == typeof e.next) return e
                if (!isNaN(e.length)) {
                    var n = -1,
                        o = function t() {
                            for (; ++n < e.length; )
                                if (r.call(e, n))
                                    return (t.value = e[n]), (t.done = !1), t
                            return (t.value = void 0), (t.done = !0), t
                        }
                    return (o.next = o)
                }
            }
            return { next: P }
        }
        function P() {
            return { value: void 0, done: !0 }
        }
        return (
            (h.prototype = d),
            n(m, 'constructor', { value: d, configurable: !0 }),
            n(d, 'constructor', { value: h, configurable: !0 }),
            (h.displayName = c(d, s, 'GeneratorFunction')),
            (e.isGeneratorFunction = function (e) {
                var t = 'function' == typeof e && e.constructor
                return (
                    !!t &&
                    (t === h ||
                        'GeneratorFunction' === (t.displayName || t.name))
                )
            }),
            (e.mark = function (e) {
                return (
                    Object.setPrototypeOf
                        ? Object.setPrototypeOf(e, d)
                        : ((e.__proto__ = d), c(e, s, 'GeneratorFunction')),
                    (e.prototype = Object.create(m)),
                    e
                )
            }),
            (e.awrap = function (e) {
                return { __await: e }
            }),
            w(b.prototype),
            c(b.prototype, i, function () {
                return this
            }),
            (e.AsyncIterator = b),
            (e.async = function (t, r, n, o, a) {
                void 0 === a && (a = Promise)
                var i = new b(u(t, r, n, o), a)
                return e.isGeneratorFunction(r)
                    ? i
                    : i.next().then(function (e) {
                          return e.done ? e.value : i.next()
                      })
            }),
            w(m),
            c(m, s, 'Generator'),
            c(m, a, function () {
                return this
            }),
            c(m, 'toString', function () {
                return '[object Generator]'
            }),
            (e.keys = function (e) {
                var t = Object(e),
                    r = []
                for (var n in t) r.push(n)
                return (
                    r.reverse(),
                    function e() {
                        for (; r.length; ) {
                            var n = r.pop()
                            if (n in t) return (e.value = n), (e.done = !1), e
                        }
                        return (e.done = !0), e
                    }
                )
            }),
            (e.values = O),
            (L.prototype = {
                constructor: L,
                reset: function (e) {
                    if (
                        ((this.prev = 0),
                        (this.next = 0),
                        (this.sent = this._sent = void 0),
                        (this.done = !1),
                        (this.delegate = null),
                        (this.method = 'next'),
                        (this.arg = void 0),
                        this.tryEntries.forEach(S),
                        !e)
                    )
                        for (var t in this)
                            't' === t.charAt(0) &&
                                r.call(this, t) &&
                                !isNaN(+t.slice(1)) &&
                                (this[t] = void 0)
                },
                stop: function () {
                    this.done = !0
                    var e = this.tryEntries[0].completion
                    if ('throw' === e.type) throw e.arg
                    return this.rval
                },
                dispatchException: function (e) {
                    if (this.done) throw e
                    var t = this
                    function n(r, n) {
                        return (
                            (i.type = 'throw'),
                            (i.arg = e),
                            (t.next = r),
                            n && ((t.method = 'next'), (t.arg = void 0)),
                            !!n
                        )
                    }
                    for (var o = this.tryEntries.length - 1; o >= 0; --o) {
                        var a = this.tryEntries[o],
                            i = a.completion
                        if ('root' === a.tryLoc) return n('end')
                        if (a.tryLoc <= this.prev) {
                            var s = r.call(a, 'catchLoc'),
                                c = r.call(a, 'finallyLoc')
                            if (s && c) {
                                if (this.prev < a.catchLoc)
                                    return n(a.catchLoc, !0)
                                if (this.prev < a.finallyLoc)
                                    return n(a.finallyLoc)
                            } else if (s) {
                                if (this.prev < a.catchLoc)
                                    return n(a.catchLoc, !0)
                            } else {
                                if (!c)
                                    throw new Error(
                                        'try statement without catch or finally'
                                    )
                                if (this.prev < a.finallyLoc)
                                    return n(a.finallyLoc)
                            }
                        }
                    }
                },
                abrupt: function (e, t) {
                    for (var n = this.tryEntries.length - 1; n >= 0; --n) {
                        var o = this.tryEntries[n]
                        if (
                            o.tryLoc <= this.prev &&
                            r.call(o, 'finallyLoc') &&
                            this.prev < o.finallyLoc
                        ) {
                            var a = o
                            break
                        }
                    }
                    a &&
                        ('break' === e || 'continue' === e) &&
                        a.tryLoc <= t &&
                        t <= a.finallyLoc &&
                        (a = null)
                    var i = a ? a.completion : {}
                    return (
                        (i.type = e),
                        (i.arg = t),
                        a
                            ? ((this.method = 'next'),
                              (this.next = a.finallyLoc),
                              f)
                            : this.complete(i)
                    )
                },
                complete: function (e, t) {
                    if ('throw' === e.type) throw e.arg
                    return (
                        'break' === e.type || 'continue' === e.type
                            ? (this.next = e.arg)
                            : 'return' === e.type
                              ? ((this.rval = this.arg = e.arg),
                                (this.method = 'return'),
                                (this.next = 'end'))
                              : 'normal' === e.type && t && (this.next = t),
                        f
                    )
                },
                finish: function (e) {
                    for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                        var r = this.tryEntries[t]
                        if (r.finallyLoc === e)
                            return (
                                this.complete(r.completion, r.afterLoc), S(r), f
                            )
                    }
                },
                catch: function (e) {
                    for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                        var r = this.tryEntries[t]
                        if (r.tryLoc === e) {
                            var n = r.completion
                            if ('throw' === n.type) {
                                var o = n.arg
                                S(r)
                            }
                            return o
                        }
                    }
                    throw new Error('illegal catch attempt')
                },
                delegateYield: function (e, t, r) {
                    return (
                        (this.delegate = {
                            iterator: O(e),
                            resultName: t,
                            nextLoc: r,
                        }),
                        'next' === this.method && (this.arg = void 0),
                        f
                    )
                },
            }),
            e
        )
    }
    function G(e) {
        return (
            (G =
                'function' == typeof Symbol &&
                'symbol' == typeof Symbol.iterator
                    ? function (e) {
                          return typeof e
                      }
                    : function (e) {
                          return e &&
                              'function' == typeof Symbol &&
                              e.constructor === Symbol &&
                              e !== Symbol.prototype
                              ? 'symbol'
                              : typeof e
                      }),
            G(e)
        )
    }
    function V(e, t, r, n, o, a, i) {
        try {
            var s = e[a](i),
                c = s.value
        } catch (e) {
            return void r(e)
        }
        s.done ? t(c) : Promise.resolve(c).then(n, o)
    }
    function F(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r]
            ;(n.enumerable = n.enumerable || !1),
                (n.configurable = !0),
                'value' in n && (n.writable = !0),
                Object.defineProperty(
                    e,
                    (void 0,
                    (o = (function (e, t) {
                        if ('object' !== G(e) || null === e) return e
                        var r = e[Symbol.toPrimitive]
                        if (void 0 !== r) {
                            var n = r.call(e, 'string')
                            if ('object' !== G(n)) return n
                            throw new TypeError(
                                '@@toPrimitive must return a primitive value.'
                            )
                        }
                        return String(e)
                    })(n.key)),
                    'symbol' === G(o) ? o : String(o)),
                    n
                )
        }
        var o
    }
    var z = new ((function () {
        function e() {
            !(function (e, t) {
                if (!(e instanceof t))
                    throw new TypeError('Cannot call a class as a function')
            })(this, e)
        }
        var t, n, o, a
        return (
            (t = e),
            (n = [
                {
                    key: 'execute',
                    value:
                        ((o = B().mark(function e(t, n, o, a) {
                            var i,
                                s,
                                c,
                                u,
                                l,
                                f,
                                p,
                                h,
                                d,
                                v = this
                            return B().wrap(function (e) {
                                for (;;)
                                    switch ((e.prev = e.next)) {
                                        case 0:
                                            ;(s =
                                                r.retryConfig
                                                    .perAPIcallTimeout),
                                                (c =
                                                    r.retryConfig
                                                        .maxRetryAllowed),
                                                (u =
                                                    r.retryConfig
                                                        .timeBtw2RetryRequest),
                                                (l = c),
                                                (f = null),
                                                (p = {
                                                    method: t.toUpperCase(),
                                                    body: o,
                                                }),
                                                null != a && (p.headers = a),
                                                (h = B().mark(function e() {
                                                    var t, r, o
                                                    return B().wrap(
                                                        function (e) {
                                                            for (;;)
                                                                switch (
                                                                    (e.prev =
                                                                        e.next)
                                                                ) {
                                                                    case 0:
                                                                        return (
                                                                            (e.prev = 0),
                                                                            (t =
                                                                                new AbortController()),
                                                                            (r =
                                                                                setTimeout(
                                                                                    function () {
                                                                                        return t.abort()
                                                                                    },
                                                                                    s
                                                                                )),
                                                                            (p.signal =
                                                                                t.signal),
                                                                            (e.next = 6),
                                                                            fetch(
                                                                                n,
                                                                                p
                                                                            )
                                                                        )
                                                                    case 6:
                                                                        if (
                                                                            !(o =
                                                                                e.sent)
                                                                                .ok &&
                                                                            o.status >
                                                                                400 &&
                                                                            o.status <=
                                                                                599
                                                                        ) {
                                                                            e.next = 18
                                                                            break
                                                                        }
                                                                        return (
                                                                            clearTimeout(
                                                                                r
                                                                            ),
                                                                            (e.t0 =
                                                                                o.status),
                                                                            (e.t1 =
                                                                                o.statusText),
                                                                            (e.next = 13),
                                                                            o.text()
                                                                        )
                                                                    case 13:
                                                                        return (
                                                                            (e.t2 =
                                                                                e.sent),
                                                                            (e.t3 =
                                                                                {
                                                                                    status: e.t0,
                                                                                    message:
                                                                                        e.t1,
                                                                                    body: e.t2,
                                                                                }),
                                                                            e.abrupt(
                                                                                'return',
                                                                                {
                                                                                    v: e.t3,
                                                                                }
                                                                            )
                                                                        )
                                                                    case 18:
                                                                        throw (
                                                                            ((f =
                                                                                o),
                                                                            clearTimeout(
                                                                                r
                                                                            ),
                                                                            Error(
                                                                                'Response Gave a non OK status code'
                                                                            ))
                                                                        )
                                                                    case 21:
                                                                        e.next = 27
                                                                        break
                                                                    case 23:
                                                                        return (
                                                                            (e.prev = 23),
                                                                            (e.t4 =
                                                                                e.catch(
                                                                                    0
                                                                                )),
                                                                            (e.next = 27),
                                                                            v.sleep(
                                                                                u
                                                                            )
                                                                        )
                                                                    case 27:
                                                                        return (
                                                                            (e.prev = 27),
                                                                            (l -= 1),
                                                                            e.finish(
                                                                                27
                                                                            )
                                                                        )
                                                                    case 30:
                                                                    case 'end':
                                                                        return e.stop()
                                                                }
                                                        },
                                                        e,
                                                        null,
                                                        [[0, 23, 27, 30]]
                                                    )
                                                }))
                                        case 8:
                                            if (!(l > 0)) {
                                                e.next = 15
                                                break
                                            }
                                            return e.delegateYield(
                                                h(),
                                                't0',
                                                10
                                            )
                                        case 10:
                                            if ('object' !== G((d = e.t0))) {
                                                e.next = 13
                                                break
                                            }
                                            return e.abrupt('return', d.v)
                                        case 13:
                                            e.next = 8
                                            break
                                        case 15:
                                            throw new A(
                                                'Error in fetching API | Too many retries with status : '.concat(
                                                    null === (i = f) ||
                                                        void 0 === i
                                                        ? void 0
                                                        : i.status
                                                ),
                                                new URL(n).pathname
                                            )
                                        case 16:
                                        case 'end':
                                            return e.stop()
                                    }
                            }, e)
                        })),
                        (a = function () {
                            var e = this,
                                t = arguments
                            return new Promise(function (r, n) {
                                var a = o.apply(e, t)
                                function i(e) {
                                    V(a, r, n, i, s, 'next', e)
                                }
                                function s(e) {
                                    V(a, r, n, i, s, 'throw', e)
                                }
                                i(void 0)
                            })
                        }),
                        function (e, t, r, n) {
                            return a.apply(this, arguments)
                        }),
                },
                {
                    key: 'sleep',
                    value: function (e) {
                        return new Promise(function (t) {
                            return setTimeout(t, e)
                        })
                    },
                },
            ]),
            n && F(t.prototype, n),
            Object.defineProperty(t, 'prototype', { writable: !1 }),
            e
        )
    })())()
    const W = (e, t) => t.some((t) => e instanceof t)
    let U, J
    const K = new WeakMap(),
        q = new WeakMap(),
        Y = new WeakMap(),
        H = new WeakMap(),
        Q = new WeakMap()
    let Z = {
        get(e, t, r) {
            if (e instanceof IDBTransaction) {
                if ('done' === t) return q.get(e)
                if ('objectStoreNames' === t)
                    return e.objectStoreNames || Y.get(e)
                if ('store' === t)
                    return r.objectStoreNames[1]
                        ? void 0
                        : r.objectStore(r.objectStoreNames[0])
            }
            return $(e[t])
        },
        set: (e, t, r) => ((e[t] = r), !0),
        has: (e, t) =>
            (e instanceof IDBTransaction && ('done' === t || 'store' === t)) ||
            t in e,
    }
    function X(e) {
        return 'function' == typeof e
            ? (t = e) !== IDBDatabase.prototype.transaction ||
              'objectStoreNames' in IDBTransaction.prototype
                ? (
                      J ||
                      (J = [
                          IDBCursor.prototype.advance,
                          IDBCursor.prototype.continue,
                          IDBCursor.prototype.continuePrimaryKey,
                      ])
                  ).includes(t)
                    ? function (...e) {
                          return t.apply(ee(this), e), $(K.get(this))
                      }
                    : function (...e) {
                          return $(t.apply(ee(this), e))
                      }
                : function (e, ...r) {
                      const n = t.call(ee(this), e, ...r)
                      return Y.set(n, e.sort ? e.sort() : [e]), $(n)
                  }
            : (e instanceof IDBTransaction &&
                  (function (e) {
                      if (q.has(e)) return
                      const t = new Promise((t, r) => {
                          const n = () => {
                                  e.removeEventListener('complete', o),
                                      e.removeEventListener('error', a),
                                      e.removeEventListener('abort', a)
                              },
                              o = () => {
                                  t(), n()
                              },
                              a = () => {
                                  r(
                                      e.error ||
                                          new DOMException(
                                              'AbortError',
                                              'AbortError'
                                          )
                                  ),
                                      n()
                              }
                          e.addEventListener('complete', o),
                              e.addEventListener('error', a),
                              e.addEventListener('abort', a)
                      })
                      q.set(e, t)
                  })(e),
              W(
                  e,
                  U ||
                      (U = [
                          IDBDatabase,
                          IDBObjectStore,
                          IDBIndex,
                          IDBCursor,
                          IDBTransaction,
                      ])
              )
                  ? new Proxy(e, Z)
                  : e)
        var t
    }
    function $(e) {
        if (e instanceof IDBRequest)
            return (function (e) {
                const t = new Promise((t, r) => {
                    const n = () => {
                            e.removeEventListener('success', o),
                                e.removeEventListener('error', a)
                        },
                        o = () => {
                            t($(e.result)), n()
                        },
                        a = () => {
                            r(e.error), n()
                        }
                    e.addEventListener('success', o),
                        e.addEventListener('error', a)
                })
                return (
                    t
                        .then((t) => {
                            t instanceof IDBCursor && K.set(t, e)
                        })
                        .catch(() => {}),
                    Q.set(t, e),
                    t
                )
            })(e)
        if (H.has(e)) return H.get(e)
        const t = X(e)
        return t !== e && (H.set(e, t), Q.set(t, e)), t
    }
    const ee = (e) => Q.get(e)
    function te(
        e,
        t,
        { blocked: r, upgrade: n, blocking: o, terminated: a } = {}
    ) {
        const i = indexedDB.open(e, t),
            s = $(i)
        return (
            n &&
                i.addEventListener('upgradeneeded', (e) => {
                    n(
                        $(i.result),
                        e.oldVersion,
                        e.newVersion,
                        $(i.transaction),
                        e
                    )
                }),
            r &&
                i.addEventListener('blocked', (e) =>
                    r(e.oldVersion, e.newVersion, e)
                ),
            s
                .then((e) => {
                    a && e.addEventListener('close', () => a()),
                        o &&
                            e.addEventListener('versionchange', (e) =>
                                o(e.oldVersion, e.newVersion, e)
                            )
                })
                .catch(() => {}),
            s
        )
    }
    function re(e, { blocked: t } = {}) {
        const r = indexedDB.deleteDatabase(e)
        return (
            t && r.addEventListener('blocked', (e) => t(e.oldVersion, e)),
            $(r).then(() => {})
        )
    }
    const ne = ['get', 'getKey', 'getAll', 'getAllKeys', 'count'],
        oe = ['put', 'add', 'delete', 'clear'],
        ae = new Map()
    function ie(e, t) {
        if (!(e instanceof IDBDatabase) || t in e || 'string' != typeof t)
            return
        if (ae.get(t)) return ae.get(t)
        const r = t.replace(/FromIndex$/, ''),
            n = t !== r,
            o = oe.includes(r)
        if (
            !(r in (n ? IDBIndex : IDBObjectStore).prototype) ||
            (!o && !ne.includes(r))
        )
            return
        const a = async function (e, ...t) {
            const a = this.transaction(e, o ? 'readwrite' : 'readonly')
            let i = a.store
            return (
                n && (i = i.index(t.shift())),
                (await Promise.all([i[r](...t), o && a.done]))[0]
            )
        }
        return ae.set(t, a), a
    }
    var se
    ;(se = Z),
        (Z = {
            ...se,
            get: (e, t, r) => ie(e, t) || se.get(e, t, r),
            has: (e, t) => !!ie(e, t) || se.has(e, t),
        })
    var ce = 'keyval-store',
        ue = 'keyval',
        le = 'messages',
        fe = 'Events',
        pe = {
            config: 'https://jiojap.akamaized.net/jiopush/web/{env}/{pn}/config.json?ccb='.concat(
                Date.now()
            ),
            cdn: 'https://jiojap.akamaized.net/jiopush/web/{env}/{pn}/cdn.json?ccb='.concat(
                Date.now()
            ),
        },
        he = 'inAppEvents',
        de = 'nativeDisplayEvents',
        ve = 'liveEvents',
        ye = {
            inAppEvent: 'IN_APP_EVENT',
            nativeDisplayEvent: 'NATIVE_DISPLAY_EVENT',
        },
        ge = 'inAppSegment',
        me = 'nativeDisplaySegment',
        we = 'CampaignLimits'
    function be(e) {
        return (
            (be =
                'function' == typeof Symbol &&
                'symbol' == typeof Symbol.iterator
                    ? function (e) {
                          return typeof e
                      }
                    : function (e) {
                          return e &&
                              'function' == typeof Symbol &&
                              e.constructor === Symbol &&
                              e !== Symbol.prototype
                              ? 'symbol'
                              : typeof e
                      }),
            be(e)
        )
    }
    function xe() {
        xe = function () {
            return e
        }
        var e = {},
            t = Object.prototype,
            r = t.hasOwnProperty,
            n =
                Object.defineProperty ||
                function (e, t, r) {
                    e[t] = r.value
                },
            o = 'function' == typeof Symbol ? Symbol : {},
            a = o.iterator || '@@iterator',
            i = o.asyncIterator || '@@asyncIterator',
            s = o.toStringTag || '@@toStringTag'
        function c(e, t, r) {
            return (
                Object.defineProperty(e, t, {
                    value: r,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                }),
                e[t]
            )
        }
        try {
            c({}, '')
        } catch (e) {
            c = function (e, t, r) {
                return (e[t] = r)
            }
        }
        function u(e, t, r, o) {
            var a = t && t.prototype instanceof p ? t : p,
                i = Object.create(a.prototype),
                s = new L(o || [])
            return n(i, '_invoke', { value: x(e, r, s) }), i
        }
        function l(e, t, r) {
            try {
                return { type: 'normal', arg: e.call(t, r) }
            } catch (e) {
                return { type: 'throw', arg: e }
            }
        }
        e.wrap = u
        var f = {}
        function p() {}
        function h() {}
        function d() {}
        var v = {}
        c(v, a, function () {
            return this
        })
        var y = Object.getPrototypeOf,
            g = y && y(y(O([])))
        g && g !== t && r.call(g, a) && (v = g)
        var m = (d.prototype = p.prototype = Object.create(v))
        function w(e) {
            ;['next', 'throw', 'return'].forEach(function (t) {
                c(e, t, function (e) {
                    return this._invoke(t, e)
                })
            })
        }
        function b(e, t) {
            function o(n, a, i, s) {
                var c = l(e[n], e, a)
                if ('throw' !== c.type) {
                    var u = c.arg,
                        f = u.value
                    return f && 'object' == be(f) && r.call(f, '__await')
                        ? t.resolve(f.__await).then(
                              function (e) {
                                  o('next', e, i, s)
                              },
                              function (e) {
                                  o('throw', e, i, s)
                              }
                          )
                        : t.resolve(f).then(
                              function (e) {
                                  ;(u.value = e), i(u)
                              },
                              function (e) {
                                  return o('throw', e, i, s)
                              }
                          )
                }
                s(c.arg)
            }
            var a
            n(this, '_invoke', {
                value: function (e, r) {
                    function n() {
                        return new t(function (t, n) {
                            o(e, r, t, n)
                        })
                    }
                    return (a = a ? a.then(n, n) : n())
                },
            })
        }
        function x(e, t, r) {
            var n = 'suspendedStart'
            return function (o, a) {
                if ('executing' === n)
                    throw new Error('Generator is already running')
                if ('completed' === n) {
                    if ('throw' === o) throw a
                    return { value: void 0, done: !0 }
                }
                for (r.method = o, r.arg = a; ; ) {
                    var i = r.delegate
                    if (i) {
                        var s = k(i, r)
                        if (s) {
                            if (s === f) continue
                            return s
                        }
                    }
                    if ('next' === r.method) r.sent = r._sent = r.arg
                    else if ('throw' === r.method) {
                        if ('suspendedStart' === n)
                            throw ((n = 'completed'), r.arg)
                        r.dispatchException(r.arg)
                    } else 'return' === r.method && r.abrupt('return', r.arg)
                    n = 'executing'
                    var c = l(e, t, r)
                    if ('normal' === c.type) {
                        if (
                            ((n = r.done ? 'completed' : 'suspendedYield'),
                            c.arg === f)
                        )
                            continue
                        return { value: c.arg, done: r.done }
                    }
                    'throw' === c.type &&
                        ((n = 'completed'),
                        (r.method = 'throw'),
                        (r.arg = c.arg))
                }
            }
        }
        function k(e, t) {
            var r = t.method,
                n = e.iterator[r]
            if (void 0 === n)
                return (
                    (t.delegate = null),
                    ('throw' === r &&
                        e.iterator.return &&
                        ((t.method = 'return'),
                        (t.arg = void 0),
                        k(e, t),
                        'throw' === t.method)) ||
                        ('return' !== r &&
                            ((t.method = 'throw'),
                            (t.arg = new TypeError(
                                "The iterator does not provide a '" +
                                    r +
                                    "' method"
                            )))),
                    f
                )
            var o = l(n, e.iterator, t.arg)
            if ('throw' === o.type)
                return (
                    (t.method = 'throw'),
                    (t.arg = o.arg),
                    (t.delegate = null),
                    f
                )
            var a = o.arg
            return a
                ? a.done
                    ? ((t[e.resultName] = a.value),
                      (t.next = e.nextLoc),
                      'return' !== t.method &&
                          ((t.method = 'next'), (t.arg = void 0)),
                      (t.delegate = null),
                      f)
                    : a
                : ((t.method = 'throw'),
                  (t.arg = new TypeError('iterator result is not an object')),
                  (t.delegate = null),
                  f)
        }
        function E(e) {
            var t = { tryLoc: e[0] }
            1 in e && (t.catchLoc = e[1]),
                2 in e && ((t.finallyLoc = e[2]), (t.afterLoc = e[3])),
                this.tryEntries.push(t)
        }
        function S(e) {
            var t = e.completion || {}
            ;(t.type = 'normal'), delete t.arg, (e.completion = t)
        }
        function L(e) {
            ;(this.tryEntries = [{ tryLoc: 'root' }]),
                e.forEach(E, this),
                this.reset(!0)
        }
        function O(e) {
            if (e) {
                var t = e[a]
                if (t) return t.call(e)
                if ('function' == typeof e.next) return e
                if (!isNaN(e.length)) {
                    var n = -1,
                        o = function t() {
                            for (; ++n < e.length; )
                                if (r.call(e, n))
                                    return (t.value = e[n]), (t.done = !1), t
                            return (t.value = void 0), (t.done = !0), t
                        }
                    return (o.next = o)
                }
            }
            return { next: P }
        }
        function P() {
            return { value: void 0, done: !0 }
        }
        return (
            (h.prototype = d),
            n(m, 'constructor', { value: d, configurable: !0 }),
            n(d, 'constructor', { value: h, configurable: !0 }),
            (h.displayName = c(d, s, 'GeneratorFunction')),
            (e.isGeneratorFunction = function (e) {
                var t = 'function' == typeof e && e.constructor
                return (
                    !!t &&
                    (t === h ||
                        'GeneratorFunction' === (t.displayName || t.name))
                )
            }),
            (e.mark = function (e) {
                return (
                    Object.setPrototypeOf
                        ? Object.setPrototypeOf(e, d)
                        : ((e.__proto__ = d), c(e, s, 'GeneratorFunction')),
                    (e.prototype = Object.create(m)),
                    e
                )
            }),
            (e.awrap = function (e) {
                return { __await: e }
            }),
            w(b.prototype),
            c(b.prototype, i, function () {
                return this
            }),
            (e.AsyncIterator = b),
            (e.async = function (t, r, n, o, a) {
                void 0 === a && (a = Promise)
                var i = new b(u(t, r, n, o), a)
                return e.isGeneratorFunction(r)
                    ? i
                    : i.next().then(function (e) {
                          return e.done ? e.value : i.next()
                      })
            }),
            w(m),
            c(m, s, 'Generator'),
            c(m, a, function () {
                return this
            }),
            c(m, 'toString', function () {
                return '[object Generator]'
            }),
            (e.keys = function (e) {
                var t = Object(e),
                    r = []
                for (var n in t) r.push(n)
                return (
                    r.reverse(),
                    function e() {
                        for (; r.length; ) {
                            var n = r.pop()
                            if (n in t) return (e.value = n), (e.done = !1), e
                        }
                        return (e.done = !0), e
                    }
                )
            }),
            (e.values = O),
            (L.prototype = {
                constructor: L,
                reset: function (e) {
                    if (
                        ((this.prev = 0),
                        (this.next = 0),
                        (this.sent = this._sent = void 0),
                        (this.done = !1),
                        (this.delegate = null),
                        (this.method = 'next'),
                        (this.arg = void 0),
                        this.tryEntries.forEach(S),
                        !e)
                    )
                        for (var t in this)
                            't' === t.charAt(0) &&
                                r.call(this, t) &&
                                !isNaN(+t.slice(1)) &&
                                (this[t] = void 0)
                },
                stop: function () {
                    this.done = !0
                    var e = this.tryEntries[0].completion
                    if ('throw' === e.type) throw e.arg
                    return this.rval
                },
                dispatchException: function (e) {
                    if (this.done) throw e
                    var t = this
                    function n(r, n) {
                        return (
                            (i.type = 'throw'),
                            (i.arg = e),
                            (t.next = r),
                            n && ((t.method = 'next'), (t.arg = void 0)),
                            !!n
                        )
                    }
                    for (var o = this.tryEntries.length - 1; o >= 0; --o) {
                        var a = this.tryEntries[o],
                            i = a.completion
                        if ('root' === a.tryLoc) return n('end')
                        if (a.tryLoc <= this.prev) {
                            var s = r.call(a, 'catchLoc'),
                                c = r.call(a, 'finallyLoc')
                            if (s && c) {
                                if (this.prev < a.catchLoc)
                                    return n(a.catchLoc, !0)
                                if (this.prev < a.finallyLoc)
                                    return n(a.finallyLoc)
                            } else if (s) {
                                if (this.prev < a.catchLoc)
                                    return n(a.catchLoc, !0)
                            } else {
                                if (!c)
                                    throw new Error(
                                        'try statement without catch or finally'
                                    )
                                if (this.prev < a.finallyLoc)
                                    return n(a.finallyLoc)
                            }
                        }
                    }
                },
                abrupt: function (e, t) {
                    for (var n = this.tryEntries.length - 1; n >= 0; --n) {
                        var o = this.tryEntries[n]
                        if (
                            o.tryLoc <= this.prev &&
                            r.call(o, 'finallyLoc') &&
                            this.prev < o.finallyLoc
                        ) {
                            var a = o
                            break
                        }
                    }
                    a &&
                        ('break' === e || 'continue' === e) &&
                        a.tryLoc <= t &&
                        t <= a.finallyLoc &&
                        (a = null)
                    var i = a ? a.completion : {}
                    return (
                        (i.type = e),
                        (i.arg = t),
                        a
                            ? ((this.method = 'next'),
                              (this.next = a.finallyLoc),
                              f)
                            : this.complete(i)
                    )
                },
                complete: function (e, t) {
                    if ('throw' === e.type) throw e.arg
                    return (
                        'break' === e.type || 'continue' === e.type
                            ? (this.next = e.arg)
                            : 'return' === e.type
                              ? ((this.rval = this.arg = e.arg),
                                (this.method = 'return'),
                                (this.next = 'end'))
                              : 'normal' === e.type && t && (this.next = t),
                        f
                    )
                },
                finish: function (e) {
                    for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                        var r = this.tryEntries[t]
                        if (r.finallyLoc === e)
                            return (
                                this.complete(r.completion, r.afterLoc), S(r), f
                            )
                    }
                },
                catch: function (e) {
                    for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                        var r = this.tryEntries[t]
                        if (r.tryLoc === e) {
                            var n = r.completion
                            if ('throw' === n.type) {
                                var o = n.arg
                                S(r)
                            }
                            return o
                        }
                    }
                    throw new Error('illegal catch attempt')
                },
                delegateYield: function (e, t, r) {
                    return (
                        (this.delegate = {
                            iterator: O(e),
                            resultName: t,
                            nextLoc: r,
                        }),
                        'next' === this.method && (this.arg = void 0),
                        f
                    )
                },
            }),
            e
        )
    }
    function ke(e, t, r, n, o, a, i) {
        try {
            var s = e[a](i),
                c = s.value
        } catch (e) {
            return void r(e)
        }
        s.done ? t(c) : Promise.resolve(c).then(n, o)
    }
    function Ee(e) {
        return function () {
            var t = this,
                r = arguments
            return new Promise(function (n, o) {
                var a = e.apply(t, r)
                function i(e) {
                    ke(a, n, o, i, s, 'next', e)
                }
                function s(e) {
                    ke(a, n, o, i, s, 'throw', e)
                }
                i(void 0)
            })
        }
    }
    function Se(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r]
            ;(n.enumerable = n.enumerable || !1),
                (n.configurable = !0),
                'value' in n && (n.writable = !0),
                Object.defineProperty(
                    e,
                    (void 0,
                    (o = (function (e, t) {
                        if ('object' !== be(e) || null === e) return e
                        var r = e[Symbol.toPrimitive]
                        if (void 0 !== r) {
                            var n = r.call(e, 'string')
                            if ('object' !== be(n)) return n
                            throw new TypeError(
                                '@@toPrimitive must return a primitive value.'
                            )
                        }
                        return String(e)
                    })(n.key)),
                    'symbol' === be(o) ? o : String(o)),
                    n
                )
        }
        var o
    }
    const Le = new ((function () {
        function e() {
            !(function (e, t) {
                if (!(e instanceof t))
                    throw new TypeError('Cannot call a class as a function')
            })(this, e)
        }
        var t, r, n
        return (
            (t = e),
            (r = [
                {
                    key: 'openIDB',
                    value: function () {
                        return new Promise(function (e, t) {
                            te(ce, 1, {
                                upgrade: function (e) {
                                    e.createObjectStore(ue)
                                },
                            })
                                .then(function (t) {
                                    e(t)
                                })
                                .catch(function (e) {
                                    return t(e)
                                })
                        })
                    },
                },
                {
                    key: 'get',
                    value: function (e) {
                        var t = this,
                            r = new Promise(function (r, n) {
                                t.openIDB()
                                    .then(
                                        (function () {
                                            var t = Ee(
                                                xe().mark(function t(n) {
                                                    var o
                                                    return xe().wrap(function (
                                                        t
                                                    ) {
                                                        for (;;)
                                                            switch (
                                                                (t.prev =
                                                                    t.next)
                                                            ) {
                                                                case 0:
                                                                    return (
                                                                        (t.next = 2),
                                                                        n.get(
                                                                            ue,
                                                                            e
                                                                        )
                                                                    )
                                                                case 2:
                                                                    ;(o =
                                                                        t.sent),
                                                                        r(o)
                                                                case 4:
                                                                case 'end':
                                                                    return t.stop()
                                                            }
                                                    }, t)
                                                })
                                            )
                                            return function (e) {
                                                return t.apply(this, arguments)
                                            }
                                        })()
                                    )
                                    .catch(function (e) {
                                        return n(e)
                                    })
                            })
                        return r
                    },
                },
                {
                    key: 'set',
                    value: function (e, t) {
                        var r = this
                        return new Promise(function (n, o) {
                            r.openIDB()
                                .then(function (r) {
                                    r.put(ue, t, e), n()
                                })
                                .catch(function (e) {
                                    return o(e)
                                })
                        })
                    },
                },
                {
                    key: 'del',
                    value: function (e) {
                        var t = this
                        return new Promise(function (r, n) {
                            t.openIDB()
                                .then(function (t) {
                                    t.delete(ue, e), r()
                                })
                                .catch(function (e) {
                                    return n(e)
                                })
                        })
                    },
                },
                {
                    key: 'clear',
                    value: function () {
                        var e = this
                        return new Promise(function (t, r) {
                            e.openIDB()
                                .then(function (e) {
                                    e.clear(ue), t()
                                })
                                .catch(function (e) {
                                    return r(e)
                                })
                        })
                    },
                },
                {
                    key: 'createResponseObject',
                    value:
                        ((n = Ee(
                            xe().mark(function e(t) {
                                var r, n, o
                                return xe().wrap(
                                    function (e) {
                                        for (;;)
                                            switch ((e.prev = e.next)) {
                                                case 0:
                                                    return (
                                                        (e.next = 2),
                                                        this.get(le)
                                                    )
                                                case 2:
                                                    return (
                                                        (r = e.sent),
                                                        (n = 0),
                                                        (o = 0),
                                                        r &&
                                                            ((r =
                                                                JSON.parse(r)),
                                                            (n = r.length || 0),
                                                            (o =
                                                                r.filter(
                                                                    function (
                                                                        e
                                                                    ) {
                                                                        return (
                                                                            1 ==
                                                                            e
                                                                                .data
                                                                                .c_body
                                                                                .messageMeta
                                                                                .isRead
                                                                        )
                                                                    }
                                                                ).length || 0)),
                                                        e.abrupt('return', {
                                                            result: t,
                                                            totalMessages: n,
                                                            readMessages: o,
                                                        })
                                                    )
                                                case 7:
                                                case 'end':
                                                    return e.stop()
                                            }
                                    },
                                    e,
                                    this
                                )
                            })
                        )),
                        function (e) {
                            return n.apply(this, arguments)
                        }),
                },
            ]),
            r && Se(t.prototype, r),
            Object.defineProperty(t, 'prototype', { writable: !1 }),
            e
        )
    })())()
    function Oe(e, t) {
        var n = self.window ? r : self.Global
        return {
            eventName: e,
            deviceId: n.pushParams.token,
            appName: n.pushParams.an,
            properties: t,
            timestamp: Date.now(),
        }
    }
    function Pe(e) {
        var t = self.window ? r : self.Global,
            n = Date.now()
        return {
            deviceId: t.pushParams.token,
            sourceId: e.messageMeta.sourceId || '',
            longitude: '0.0',
            timestamp: n,
            campaignId:
                e.payload.cid || e.payload.campaignMeta.campaignId || null,
            appName: t.pushParams.an,
            messageType: e.messageMeta.messageType,
            eventCategory: e.type,
            id: n,
            critical: !1,
            latitude: '0.0',
            place: '',
            srcType: e.messageMeta.srcType,
            eventName: e.type,
            type: e.type,
            messageId: e.messageMeta.messageId,
            properties: [
                {
                    propertyName: 'campaignName',
                    propertyValue: [e.messageMeta.sourceId],
                },
            ],
        }
    }
    function Ce(e, t) {
        var n = self.window ? r : self.Global,
            o = Date.now()
        return {
            deviceId: n.pushParams.token,
            timestamp: o,
            appName: n.pushParams.an,
            eventName: e,
            properties: t,
        }
    }
    function Te(e) {
        return (
            (Te =
                'function' == typeof Symbol &&
                'symbol' == typeof Symbol.iterator
                    ? function (e) {
                          return typeof e
                      }
                    : function (e) {
                          return e &&
                              'function' == typeof Symbol &&
                              e.constructor === Symbol &&
                              e !== Symbol.prototype
                              ? 'symbol'
                              : typeof e
                      }),
            Te(e)
        )
    }
    function Ne(e) {
        return (
            (function (e) {
                if (Array.isArray(e)) return Ie(e)
            })(e) ||
            (function (e) {
                if (
                    ('undefined' != typeof Symbol &&
                        null != e[Symbol.iterator]) ||
                    null != e['@@iterator']
                )
                    return Array.from(e)
            })(e) ||
            (function (e, t) {
                if (e) {
                    if ('string' == typeof e) return Ie(e, t)
                    var r = Object.prototype.toString.call(e).slice(8, -1)
                    return (
                        'Object' === r &&
                            e.constructor &&
                            (r = e.constructor.name),
                        'Map' === r || 'Set' === r
                            ? Array.from(e)
                            : 'Arguments' === r ||
                                /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(
                                    r
                                )
                              ? Ie(e, t)
                              : void 0
                    )
                }
            })(e) ||
            (function () {
                throw new TypeError(
                    'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
                )
            })()
        )
    }
    function Ie(e, t) {
        ;(null == t || t > e.length) && (t = e.length)
        for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r]
        return n
    }
    function je() {
        je = function () {
            return e
        }
        var e = {},
            t = Object.prototype,
            r = t.hasOwnProperty,
            n =
                Object.defineProperty ||
                function (e, t, r) {
                    e[t] = r.value
                },
            o = 'function' == typeof Symbol ? Symbol : {},
            a = o.iterator || '@@iterator',
            i = o.asyncIterator || '@@asyncIterator',
            s = o.toStringTag || '@@toStringTag'
        function c(e, t, r) {
            return (
                Object.defineProperty(e, t, {
                    value: r,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                }),
                e[t]
            )
        }
        try {
            c({}, '')
        } catch (e) {
            c = function (e, t, r) {
                return (e[t] = r)
            }
        }
        function u(e, t, r, o) {
            var a = t && t.prototype instanceof p ? t : p,
                i = Object.create(a.prototype),
                s = new L(o || [])
            return n(i, '_invoke', { value: x(e, r, s) }), i
        }
        function l(e, t, r) {
            try {
                return { type: 'normal', arg: e.call(t, r) }
            } catch (e) {
                return { type: 'throw', arg: e }
            }
        }
        e.wrap = u
        var f = {}
        function p() {}
        function h() {}
        function d() {}
        var v = {}
        c(v, a, function () {
            return this
        })
        var y = Object.getPrototypeOf,
            g = y && y(y(O([])))
        g && g !== t && r.call(g, a) && (v = g)
        var m = (d.prototype = p.prototype = Object.create(v))
        function w(e) {
            ;['next', 'throw', 'return'].forEach(function (t) {
                c(e, t, function (e) {
                    return this._invoke(t, e)
                })
            })
        }
        function b(e, t) {
            function o(n, a, i, s) {
                var c = l(e[n], e, a)
                if ('throw' !== c.type) {
                    var u = c.arg,
                        f = u.value
                    return f && 'object' == Te(f) && r.call(f, '__await')
                        ? t.resolve(f.__await).then(
                              function (e) {
                                  o('next', e, i, s)
                              },
                              function (e) {
                                  o('throw', e, i, s)
                              }
                          )
                        : t.resolve(f).then(
                              function (e) {
                                  ;(u.value = e), i(u)
                              },
                              function (e) {
                                  return o('throw', e, i, s)
                              }
                          )
                }
                s(c.arg)
            }
            var a
            n(this, '_invoke', {
                value: function (e, r) {
                    function n() {
                        return new t(function (t, n) {
                            o(e, r, t, n)
                        })
                    }
                    return (a = a ? a.then(n, n) : n())
                },
            })
        }
        function x(e, t, r) {
            var n = 'suspendedStart'
            return function (o, a) {
                if ('executing' === n)
                    throw new Error('Generator is already running')
                if ('completed' === n) {
                    if ('throw' === o) throw a
                    return { value: void 0, done: !0 }
                }
                for (r.method = o, r.arg = a; ; ) {
                    var i = r.delegate
                    if (i) {
                        var s = k(i, r)
                        if (s) {
                            if (s === f) continue
                            return s
                        }
                    }
                    if ('next' === r.method) r.sent = r._sent = r.arg
                    else if ('throw' === r.method) {
                        if ('suspendedStart' === n)
                            throw ((n = 'completed'), r.arg)
                        r.dispatchException(r.arg)
                    } else 'return' === r.method && r.abrupt('return', r.arg)
                    n = 'executing'
                    var c = l(e, t, r)
                    if ('normal' === c.type) {
                        if (
                            ((n = r.done ? 'completed' : 'suspendedYield'),
                            c.arg === f)
                        )
                            continue
                        return { value: c.arg, done: r.done }
                    }
                    'throw' === c.type &&
                        ((n = 'completed'),
                        (r.method = 'throw'),
                        (r.arg = c.arg))
                }
            }
        }
        function k(e, t) {
            var r = t.method,
                n = e.iterator[r]
            if (void 0 === n)
                return (
                    (t.delegate = null),
                    ('throw' === r &&
                        e.iterator.return &&
                        ((t.method = 'return'),
                        (t.arg = void 0),
                        k(e, t),
                        'throw' === t.method)) ||
                        ('return' !== r &&
                            ((t.method = 'throw'),
                            (t.arg = new TypeError(
                                "The iterator does not provide a '" +
                                    r +
                                    "' method"
                            )))),
                    f
                )
            var o = l(n, e.iterator, t.arg)
            if ('throw' === o.type)
                return (
                    (t.method = 'throw'),
                    (t.arg = o.arg),
                    (t.delegate = null),
                    f
                )
            var a = o.arg
            return a
                ? a.done
                    ? ((t[e.resultName] = a.value),
                      (t.next = e.nextLoc),
                      'return' !== t.method &&
                          ((t.method = 'next'), (t.arg = void 0)),
                      (t.delegate = null),
                      f)
                    : a
                : ((t.method = 'throw'),
                  (t.arg = new TypeError('iterator result is not an object')),
                  (t.delegate = null),
                  f)
        }
        function E(e) {
            var t = { tryLoc: e[0] }
            1 in e && (t.catchLoc = e[1]),
                2 in e && ((t.finallyLoc = e[2]), (t.afterLoc = e[3])),
                this.tryEntries.push(t)
        }
        function S(e) {
            var t = e.completion || {}
            ;(t.type = 'normal'), delete t.arg, (e.completion = t)
        }
        function L(e) {
            ;(this.tryEntries = [{ tryLoc: 'root' }]),
                e.forEach(E, this),
                this.reset(!0)
        }
        function O(e) {
            if (e) {
                var t = e[a]
                if (t) return t.call(e)
                if ('function' == typeof e.next) return e
                if (!isNaN(e.length)) {
                    var n = -1,
                        o = function t() {
                            for (; ++n < e.length; )
                                if (r.call(e, n))
                                    return (t.value = e[n]), (t.done = !1), t
                            return (t.value = void 0), (t.done = !0), t
                        }
                    return (o.next = o)
                }
            }
            return { next: P }
        }
        function P() {
            return { value: void 0, done: !0 }
        }
        return (
            (h.prototype = d),
            n(m, 'constructor', { value: d, configurable: !0 }),
            n(d, 'constructor', { value: h, configurable: !0 }),
            (h.displayName = c(d, s, 'GeneratorFunction')),
            (e.isGeneratorFunction = function (e) {
                var t = 'function' == typeof e && e.constructor
                return (
                    !!t &&
                    (t === h ||
                        'GeneratorFunction' === (t.displayName || t.name))
                )
            }),
            (e.mark = function (e) {
                return (
                    Object.setPrototypeOf
                        ? Object.setPrototypeOf(e, d)
                        : ((e.__proto__ = d), c(e, s, 'GeneratorFunction')),
                    (e.prototype = Object.create(m)),
                    e
                )
            }),
            (e.awrap = function (e) {
                return { __await: e }
            }),
            w(b.prototype),
            c(b.prototype, i, function () {
                return this
            }),
            (e.AsyncIterator = b),
            (e.async = function (t, r, n, o, a) {
                void 0 === a && (a = Promise)
                var i = new b(u(t, r, n, o), a)
                return e.isGeneratorFunction(r)
                    ? i
                    : i.next().then(function (e) {
                          return e.done ? e.value : i.next()
                      })
            }),
            w(m),
            c(m, s, 'Generator'),
            c(m, a, function () {
                return this
            }),
            c(m, 'toString', function () {
                return '[object Generator]'
            }),
            (e.keys = function (e) {
                var t = Object(e),
                    r = []
                for (var n in t) r.push(n)
                return (
                    r.reverse(),
                    function e() {
                        for (; r.length; ) {
                            var n = r.pop()
                            if (n in t) return (e.value = n), (e.done = !1), e
                        }
                        return (e.done = !0), e
                    }
                )
            }),
            (e.values = O),
            (L.prototype = {
                constructor: L,
                reset: function (e) {
                    if (
                        ((this.prev = 0),
                        (this.next = 0),
                        (this.sent = this._sent = void 0),
                        (this.done = !1),
                        (this.delegate = null),
                        (this.method = 'next'),
                        (this.arg = void 0),
                        this.tryEntries.forEach(S),
                        !e)
                    )
                        for (var t in this)
                            't' === t.charAt(0) &&
                                r.call(this, t) &&
                                !isNaN(+t.slice(1)) &&
                                (this[t] = void 0)
                },
                stop: function () {
                    this.done = !0
                    var e = this.tryEntries[0].completion
                    if ('throw' === e.type) throw e.arg
                    return this.rval
                },
                dispatchException: function (e) {
                    if (this.done) throw e
                    var t = this
                    function n(r, n) {
                        return (
                            (i.type = 'throw'),
                            (i.arg = e),
                            (t.next = r),
                            n && ((t.method = 'next'), (t.arg = void 0)),
                            !!n
                        )
                    }
                    for (var o = this.tryEntries.length - 1; o >= 0; --o) {
                        var a = this.tryEntries[o],
                            i = a.completion
                        if ('root' === a.tryLoc) return n('end')
                        if (a.tryLoc <= this.prev) {
                            var s = r.call(a, 'catchLoc'),
                                c = r.call(a, 'finallyLoc')
                            if (s && c) {
                                if (this.prev < a.catchLoc)
                                    return n(a.catchLoc, !0)
                                if (this.prev < a.finallyLoc)
                                    return n(a.finallyLoc)
                            } else if (s) {
                                if (this.prev < a.catchLoc)
                                    return n(a.catchLoc, !0)
                            } else {
                                if (!c)
                                    throw new Error(
                                        'try statement without catch or finally'
                                    )
                                if (this.prev < a.finallyLoc)
                                    return n(a.finallyLoc)
                            }
                        }
                    }
                },
                abrupt: function (e, t) {
                    for (var n = this.tryEntries.length - 1; n >= 0; --n) {
                        var o = this.tryEntries[n]
                        if (
                            o.tryLoc <= this.prev &&
                            r.call(o, 'finallyLoc') &&
                            this.prev < o.finallyLoc
                        ) {
                            var a = o
                            break
                        }
                    }
                    a &&
                        ('break' === e || 'continue' === e) &&
                        a.tryLoc <= t &&
                        t <= a.finallyLoc &&
                        (a = null)
                    var i = a ? a.completion : {}
                    return (
                        (i.type = e),
                        (i.arg = t),
                        a
                            ? ((this.method = 'next'),
                              (this.next = a.finallyLoc),
                              f)
                            : this.complete(i)
                    )
                },
                complete: function (e, t) {
                    if ('throw' === e.type) throw e.arg
                    return (
                        'break' === e.type || 'continue' === e.type
                            ? (this.next = e.arg)
                            : 'return' === e.type
                              ? ((this.rval = this.arg = e.arg),
                                (this.method = 'return'),
                                (this.next = 'end'))
                              : 'normal' === e.type && t && (this.next = t),
                        f
                    )
                },
                finish: function (e) {
                    for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                        var r = this.tryEntries[t]
                        if (r.finallyLoc === e)
                            return (
                                this.complete(r.completion, r.afterLoc), S(r), f
                            )
                    }
                },
                catch: function (e) {
                    for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                        var r = this.tryEntries[t]
                        if (r.tryLoc === e) {
                            var n = r.completion
                            if ('throw' === n.type) {
                                var o = n.arg
                                S(r)
                            }
                            return o
                        }
                    }
                    throw new Error('illegal catch attempt')
                },
                delegateYield: function (e, t, r) {
                    return (
                        (this.delegate = {
                            iterator: O(e),
                            resultName: t,
                            nextLoc: r,
                        }),
                        'next' === this.method && (this.arg = void 0),
                        f
                    )
                },
            }),
            e
        )
    }
    function Me(e, t, r, n, o, a, i) {
        try {
            var s = e[a](i),
                c = s.value
        } catch (e) {
            return void r(e)
        }
        s.done ? t(c) : Promise.resolve(c).then(n, o)
    }
    function _e(e) {
        return function () {
            var t = this,
                r = arguments
            return new Promise(function (n, o) {
                var a = e.apply(t, r)
                function i(e) {
                    Me(a, n, o, i, s, 'next', e)
                }
                function s(e) {
                    Me(a, n, o, i, s, 'throw', e)
                }
                i(void 0)
            })
        }
    }
    function Ae(e, n) {
        var o = new Promise(
            (function () {
                var o = _e(
                    je().mark(function o(a) {
                        var i, s
                        return je().wrap(function (o) {
                            for (;;)
                                switch ((o.prev = o.next)) {
                                    case 0:
                                        if (
                                            (i = self.window ? r : self.Global)
                                                .analytics.enableAnalytics
                                        ) {
                                            o.next = 5
                                            break
                                        }
                                        a(), (o.next = 16)
                                        break
                                    case 5:
                                        if (self.window) {
                                            o.next = 9
                                            break
                                        }
                                        ;(o.t0 = self.ep || !1), (o.next = 12)
                                        break
                                    case 9:
                                        return (o.next = 11), Je()
                                    case 11:
                                        o.t0 = o.sent
                                    case 12:
                                        ;(s = o.t0),
                                            t.info('EP: ' + s),
                                            'string' == typeof s &&
                                                (s = 'false' != s),
                                            s
                                                ? (t.info(
                                                      'previous events are getting fired. skipping event firing request.'
                                                  ),
                                                  a())
                                                : Le.get(fe).then(function (r) {
                                                      var o =
                                                          r[
                                                              ''
                                                                  .concat(
                                                                      e.toLowerCase(),
                                                                      '.'
                                                                  )
                                                                  .concat(
                                                                      n.toLowerCase()
                                                                  )
                                                          ]
                                                      if (o) {
                                                          var s = [],
                                                              c = Ge(e, n)
                                                          s.push(
                                                              new Promise(
                                                                  function (e) {
                                                                      setTimeout(
                                                                          function () {
                                                                              e()
                                                                          },
                                                                          1e3
                                                                      )
                                                                  }
                                                              )
                                                          ),
                                                              Object.keys(
                                                                  o
                                                              ).forEach(
                                                                  function (r) {
                                                                      var a =
                                                                          o[r]
                                                                      if (
                                                                          a.length >=
                                                                              i
                                                                                  .analytics
                                                                                  .batchSize[
                                                                                  e.toUpperCase()
                                                                              ] &&
                                                                          i.cdn
                                                                              .analytics
                                                                      ) {
                                                                          self.window
                                                                              ? We(
                                                                                    !0
                                                                                )
                                                                              : (self.ep =
                                                                                    !0)
                                                                          var u
                                                                          ;(u =
                                                                              self.window
                                                                                  ? z
                                                                                        .execute(
                                                                                            'POST',
                                                                                            i
                                                                                                .cdn
                                                                                                .analytics,
                                                                                            Fe(
                                                                                                a,
                                                                                                c,
                                                                                                i
                                                                                                    .analytics
                                                                                                    .compressFormat
                                                                                            ),
                                                                                            ze(
                                                                                                i
                                                                                                    .analytics
                                                                                                    .compressFormat
                                                                                            )
                                                                                        )
                                                                                        .then(
                                                                                            function () {
                                                                                                Ve(
                                                                                                    ''
                                                                                                        .concat(
                                                                                                            e.toLowerCase(),
                                                                                                            '.'
                                                                                                        )
                                                                                                        .concat(
                                                                                                            n.toLowerCase()
                                                                                                        ),
                                                                                                    r
                                                                                                ).then(
                                                                                                    function () {
                                                                                                        t.info(
                                                                                                            ''
                                                                                                                .concat(
                                                                                                                    e,
                                                                                                                    ' Event fired with batch '
                                                                                                                )
                                                                                                                .concat(
                                                                                                                    r
                                                                                                                )
                                                                                                        )
                                                                                                    }
                                                                                                )
                                                                                            }
                                                                                        )
                                                                                        .catch(
                                                                                            function () {
                                                                                                t.error(
                                                                                                    ''
                                                                                                        .concat(
                                                                                                            e,
                                                                                                            ' Error while firing event with batch '
                                                                                                        )
                                                                                                        .concat(
                                                                                                            r
                                                                                                        )
                                                                                                )
                                                                                            }
                                                                                        )
                                                                                  : fetch(
                                                                                        i
                                                                                            .cdn
                                                                                            .analytics,
                                                                                        {
                                                                                            method: 'POST',
                                                                                            headers:
                                                                                                ze(
                                                                                                    i
                                                                                                        .analytics
                                                                                                        .compressFormat
                                                                                                ),
                                                                                            body: Fe(
                                                                                                a,
                                                                                                c,
                                                                                                i
                                                                                                    .analytics
                                                                                                    .compressFormat
                                                                                            ),
                                                                                        }
                                                                                    )
                                                                                        .then(
                                                                                            function () {
                                                                                                Ve(
                                                                                                    ''
                                                                                                        .concat(
                                                                                                            e.toLowerCase(),
                                                                                                            '.'
                                                                                                        )
                                                                                                        .concat(
                                                                                                            n.toLowerCase()
                                                                                                        ),
                                                                                                    r
                                                                                                ).then(
                                                                                                    function () {
                                                                                                        t.info(
                                                                                                            ''
                                                                                                                .concat(
                                                                                                                    e,
                                                                                                                    ' Event fired with batch '
                                                                                                                )
                                                                                                                .concat(
                                                                                                                    r
                                                                                                                )
                                                                                                        )
                                                                                                    }
                                                                                                )
                                                                                            }
                                                                                        )
                                                                                        .catch(
                                                                                            function () {
                                                                                                return t.error(
                                                                                                    ''
                                                                                                        .concat(
                                                                                                            e,
                                                                                                            ' Error from sw while firing event with batch '
                                                                                                        )
                                                                                                        .concat(
                                                                                                            r
                                                                                                        )
                                                                                                )
                                                                                            }
                                                                                        )),
                                                                              s.push(
                                                                                  u
                                                                              )
                                                                      }
                                                                  }
                                                              ),
                                                              Promise.all(s)
                                                                  .then(
                                                                      function () {
                                                                          self.window
                                                                              ? We(
                                                                                    !1
                                                                                )
                                                                              : (self.ep =
                                                                                    !1),
                                                                              a()
                                                                      }
                                                                  )
                                                                  .catch(
                                                                      function () {
                                                                          self.window
                                                                              ? We(
                                                                                    !1
                                                                                )
                                                                              : (self.ep =
                                                                                    !1),
                                                                              a()
                                                                      }
                                                                  )
                                                      } else
                                                          t.info(
                                                              "local key doesn't exists. skipping..."
                                                          ),
                                                              a()
                                                  })
                                    case 16:
                                    case 'end':
                                        return o.stop()
                                }
                        }, o)
                    })
                )
                return function (e) {
                    return o.apply(this, arguments)
                }
            })()
        )
        return o
    }
    function De(e, n, o, a, i) {
        var s = new Promise(
            (function () {
                var s = _e(
                    je().mark(function s(c, u) {
                        var l, f, p
                        return je().wrap(function (s) {
                            for (;;)
                                switch ((s.prev = s.next)) {
                                    case 0:
                                        if (
                                            ((l = self.window ? r : self.Global)
                                                .analytics.enableAnalytics ||
                                                c(),
                                            null !=
                                                l.analytics.batchSize[
                                                    ''.concat(e.toUpperCase())
                                                ])
                                        ) {
                                            s.next = 6
                                            break
                                        }
                                        c(), (s.next = 27)
                                        break
                                    case 6:
                                        if (
                                            ((s.t0 =
                                                !l.analytics.enableBatching),
                                            s.t0)
                                        ) {
                                            s.next = 11
                                            break
                                        }
                                        return (s.next = 10), Re(n)
                                    case 10:
                                        s.t0 = s.sent
                                    case 11:
                                        if (!s.t0) {
                                            s.next = 26
                                            break
                                        }
                                        ;(f = null),
                                            (s.t1 = e.toUpperCase()),
                                            (s.next =
                                                'CUSTOM' === s.t1
                                                    ? 16
                                                    : 'SYSTEM' === s.t1
                                                      ? 18
                                                      : 'APP' === s.t1
                                                        ? 20
                                                        : 22)
                                        break
                                    case 16:
                                        return (
                                            (f = Oe(n, a)),
                                            s.abrupt('break', 22)
                                        )
                                    case 18:
                                        return (
                                            (f = Pe(o)), s.abrupt('break', 22)
                                        )
                                    case 20:
                                        return (
                                            (f = Ce(n, a)),
                                            s.abrupt('break', 22)
                                        )
                                    case 22:
                                        ;(p = Ge(e, i)),
                                            self.window
                                                ? z
                                                      .execute(
                                                          'POST',
                                                          l.cdn.analytics,
                                                          Fe(
                                                              f,
                                                              p,
                                                              l.analytics
                                                                  .compressFormat
                                                          ),
                                                          ze(
                                                              l.analytics
                                                                  .compressFormat
                                                          )
                                                      )
                                                      .then(function () {
                                                          'App Closed' == n &&
                                                              m(),
                                                              t.info(
                                                                  ''.concat(
                                                                      e,
                                                                      ' Event fired'
                                                                  )
                                                              ),
                                                              c()
                                                      })
                                                      .catch(function () {
                                                          t.error(
                                                              ''.concat(
                                                                  e,
                                                                  ' Error while firing event'
                                                              )
                                                          )
                                                      })
                                                : fetch(l.cdn.analytics, {
                                                      method: 'POST',
                                                      headers: ze(
                                                          l.analytics
                                                              .compressFormat
                                                      ),
                                                      body: Fe(
                                                          f,
                                                          p,
                                                          l.analytics
                                                              .compressFormat
                                                      ),
                                                  })
                                                      .then(function () {
                                                          'App Closed' == n &&
                                                              m(),
                                                              t.info(
                                                                  ''.concat(
                                                                      e,
                                                                      ' Event fired.'
                                                                  )
                                                              ),
                                                              c()
                                                      })
                                                      .catch(function () {
                                                          t.error(
                                                              ''.concat(
                                                                  e,
                                                                  ' Error from sw while firing event'
                                                              )
                                                          ),
                                                              u()
                                                      }),
                                            (s.next = 27)
                                        break
                                    case 26:
                                        Le.get(fe).then(function (r) {
                                            var s = ''
                                            if (r) {
                                                var u =
                                                    r[
                                                        ''
                                                            .concat(
                                                                e.toLowerCase(),
                                                                '.'
                                                            )
                                                            .concat(
                                                                i.toLowerCase()
                                                            )
                                                    ]
                                                if (u) {
                                                    var f = Object.keys(u),
                                                        p = (s =
                                                            f.length > 0
                                                                ? f
                                                                      .reverse()
                                                                      .at(0)
                                                                : '')
                                                            ? u[s]
                                                            : null
                                                    if (
                                                        p &&
                                                        p.length >=
                                                            l.analytics
                                                                .batchSize[
                                                                e.toUpperCase()
                                                            ]
                                                    ) {
                                                        var h = s.charAt(
                                                            s.length - 1
                                                        )
                                                        u[
                                                            (s = 'batch'.concat(
                                                                parseInt(h) + 1
                                                            ))
                                                        ] = []
                                                    }
                                                    s || (s = 'batch1')
                                                } else
                                                    (r[
                                                        ''
                                                            .concat(
                                                                e.toLowerCase(),
                                                                '.'
                                                            )
                                                            .concat(
                                                                i.toLowerCase()
                                                            )
                                                    ] = {}),
                                                        (s = 'batch1'),
                                                        (r[
                                                            ''
                                                                .concat(
                                                                    e.toLowerCase(),
                                                                    '.'
                                                                )
                                                                .concat(
                                                                    i.toLowerCase()
                                                                )
                                                        ][s] = [])
                                                var d = null
                                                switch (e.toUpperCase()) {
                                                    case 'CUSTOM':
                                                        d = Oe(n, a)
                                                        break
                                                    case 'SYSTEM':
                                                        d = Pe(o)
                                                }
                                                r[
                                                    ''
                                                        .concat(
                                                            e.toLowerCase(),
                                                            '.'
                                                        )
                                                        .concat(i.toLowerCase())
                                                ][s] ||
                                                    (r[
                                                        ''
                                                            .concat(
                                                                e.toLowerCase(),
                                                                '.'
                                                            )
                                                            .concat(
                                                                i.toLowerCase()
                                                            )
                                                    ][s] = []),
                                                    r[
                                                        ''
                                                            .concat(
                                                                e.toLowerCase(),
                                                                '.'
                                                            )
                                                            .concat(
                                                                i.toLowerCase()
                                                            )
                                                    ][s].push(d),
                                                    t.info(
                                                        'Event List updated: ' +
                                                            r
                                                    ),
                                                    Le.set(fe, r).then(
                                                        function () {
                                                            Ae(e, i).then(
                                                                function () {
                                                                    c()
                                                                }
                                                            )
                                                        }
                                                    )
                                            } else
                                                Le.set(fe, {}).then(
                                                    function () {
                                                        De(e, n, o, a, i).then(
                                                            function () {
                                                                c()
                                                            }
                                                        )
                                                    }
                                                )
                                        })
                                    case 27:
                                    case 'end':
                                        return s.stop()
                                }
                        }, s)
                    })
                )
                return function (e, t) {
                    return s.apply(this, arguments)
                }
            })()
        )
        return s
    }
    function Re(e) {
        return Be.apply(this, arguments)
    }
    function Be() {
        return (Be = _e(
            je().mark(function e(t) {
                var r, n, o, a, i, s
                return je().wrap(function (e) {
                    for (;;)
                        switch ((e.prev = e.next)) {
                            case 0:
                                return (e.next = 2), Le.get(he)
                            case 2:
                                return (r = e.sent), (e.next = 5), Le.get(de)
                            case 5:
                                return (n = e.sent), (e.next = 8), Le.get(ve)
                            case 8:
                                ;(o = e.sent), (a = 0), (i = [r, n, o])
                            case 11:
                                if (!(a < i.length)) {
                                    e.next = 18
                                    break
                                }
                                if (!((s = i[a]) && s.indexOf(t) > -1)) {
                                    e.next = 15
                                    break
                                }
                                return e.abrupt('return', !0)
                            case 15:
                                a++, (e.next = 11)
                                break
                            case 18:
                                return e.abrupt('return', !1)
                            case 19:
                            case 'end':
                                return e.stop()
                        }
                }, e)
            })
        )).apply(this, arguments)
    }
    function Ge(e, t) {
        switch (e) {
            case 'CUSTOM':
                return (function (e) {
                    var t = self.window ? r : self.Global
                    return {
                        deviceType: 'Jio',
                        deviceSubType: t.meta.deviceSubType,
                        eventCategory: e,
                        appVer: t.meta.appVer,
                        appName: t.pushParams.an,
                        subscriberId: t.pushParams.token,
                        eventType: 'CUSTOM',
                        osVer: t.meta.osVer,
                        pushVer: t.meta.pushVer,
                    }
                })(t)
            case 'SYSTEM':
                return (function () {
                    var e =
                            arguments.length > 0 && void 0 !== arguments[0]
                                ? arguments[0]
                                : 'NOTIFICATION',
                        t = self.window ? r : self.Global
                    return {
                        deviceType: 'Jio',
                        deviceSubType: t.meta.deviceSubType,
                        eventCategory: e,
                        appVer: t.meta.appVer,
                        appName: t.pushParams.an,
                        subscriberId: t.pushParams.token,
                        eventType: 'SYSTEM',
                        osVer: t.meta.osVer,
                        pushVer: t.meta.pushVer,
                    }
                })()
            case 'APP':
                return (function () {
                    var e =
                            arguments.length > 0 && void 0 !== arguments[0]
                                ? arguments[0]
                                : 'APP',
                        t = self.window ? r : self.Global
                    return {
                        deviceType: 'Jio',
                        deviceSubType: t.meta.deviceSubType,
                        eventCategory: e,
                        appVer: t.meta.appVer,
                        appName: t.pushParams.an,
                        subscriberId: t.pushParams.token,
                        eventType: 'SYSTEM',
                        osVer: t.meta.osVer,
                        pushVer: t.meta.pushVer,
                    }
                })()
        }
    }
    function Ve(e, t) {
        return new Promise(function (r) {
            Le.get(fe).then(function (n) {
                var o = n[e]
                o &&
                    (t
                        ? Object.prototype.hasOwnProperty.call(o, t) &&
                          delete o[t]
                        : delete n[e],
                    Le.set(fe, n).then(function () {
                        return r()
                    }))
            })
        })
    }
    function Fe(e, n, o) {
        var a = self.window ? r : self.Global,
            i = { events: [], metadata: n }
        Array.isArray(e) ? (i.events = e) : i.events.push(e)
        var s = JSON.stringify(i)
        t.log(s)
        var c = new FormData()
        if (
            (c.append('appName', a.pushParams.an),
            c.append('eventType', n.eventType),
            c.append('eventCategory', n.eventCategory),
            c.append('deviceId', a.pushParams.token),
            o)
        ) {
            var u = unescape(encodeURIComponent(s)),
                l = self.window ? window.pako.gzip(u) : self.pako.gzip(u),
                f = new Array(1)
            f[0] = l.buffer
            var p = new Blob(f, { type: 'gzip' })
            c.append('deviceAnalyticsGZ', p, 'AnalyticsEventData.gz')
        } else {
            c.append('uncompressed', !0), c.append('deviceAnalyticsStr', s)
            var h = {}
            c.forEach(function (e, t) {
                h[t] = e
            }),
                (c = JSON.stringify(h))
        }
        return c
    }
    function ze() {
        var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
            t = self.window ? r : self.Global,
            n = {
                version: 'v2',
                Authorization: 'Bearer '.concat(t.pushParams.aid),
                AuthTokenType: 'FCM_WEBCLIENT',
            }
        return e || (n['Content-Type'] = 'application/json'), n
    }
    function We(e) {
        return Ue.apply(this, arguments)
    }
    function Ue() {
        return (Ue = _e(
            je().mark(function e(t) {
                return je().wrap(function (e) {
                    for (;;)
                        switch ((e.prev = e.next)) {
                            case 0:
                                if (!window.localStorage) {
                                    e.next = 4
                                    break
                                }
                                localStorage.setItem('ep', t), (e.next = 6)
                                break
                            case 4:
                                return (e.next = 6), Le.set('ep', t)
                            case 6:
                            case 'end':
                                return e.stop()
                        }
                }, e)
            })
        )).apply(this, arguments)
    }
    function Je() {
        return Ke.apply(this, arguments)
    }
    function Ke() {
        return (Ke = _e(
            je().mark(function e() {
                var t
                return je().wrap(function (e) {
                    for (;;)
                        switch ((e.prev = e.next)) {
                            case 0:
                                if (((t = ''), !window.localStorage)) {
                                    e.next = 5
                                    break
                                }
                                ;(t = localStorage.getItem('ep')), (e.next = 8)
                                break
                            case 5:
                                return (e.next = 7), Le.get('ep')
                            case 7:
                                t = e.sent
                            case 8:
                                return e.abrupt('return', t)
                            case 9:
                            case 'end':
                                return e.stop()
                        }
                }, e)
            })
        )).apply(this, arguments)
    }
    function qe(e) {
        return (
            (qe =
                'function' == typeof Symbol &&
                'symbol' == typeof Symbol.iterator
                    ? function (e) {
                          return typeof e
                      }
                    : function (e) {
                          return e &&
                              'function' == typeof Symbol &&
                              e.constructor === Symbol &&
                              e !== Symbol.prototype
                              ? 'symbol'
                              : typeof e
                      }),
            qe(e)
        )
    }
    function Ye() {
        Ye = function () {
            return e
        }
        var e = {},
            t = Object.prototype,
            r = t.hasOwnProperty,
            n =
                Object.defineProperty ||
                function (e, t, r) {
                    e[t] = r.value
                },
            o = 'function' == typeof Symbol ? Symbol : {},
            a = o.iterator || '@@iterator',
            i = o.asyncIterator || '@@asyncIterator',
            s = o.toStringTag || '@@toStringTag'
        function c(e, t, r) {
            return (
                Object.defineProperty(e, t, {
                    value: r,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                }),
                e[t]
            )
        }
        try {
            c({}, '')
        } catch (e) {
            c = function (e, t, r) {
                return (e[t] = r)
            }
        }
        function u(e, t, r, o) {
            var a = t && t.prototype instanceof p ? t : p,
                i = Object.create(a.prototype),
                s = new L(o || [])
            return n(i, '_invoke', { value: x(e, r, s) }), i
        }
        function l(e, t, r) {
            try {
                return { type: 'normal', arg: e.call(t, r) }
            } catch (e) {
                return { type: 'throw', arg: e }
            }
        }
        e.wrap = u
        var f = {}
        function p() {}
        function h() {}
        function d() {}
        var v = {}
        c(v, a, function () {
            return this
        })
        var y = Object.getPrototypeOf,
            g = y && y(y(O([])))
        g && g !== t && r.call(g, a) && (v = g)
        var m = (d.prototype = p.prototype = Object.create(v))
        function w(e) {
            ;['next', 'throw', 'return'].forEach(function (t) {
                c(e, t, function (e) {
                    return this._invoke(t, e)
                })
            })
        }
        function b(e, t) {
            function o(n, a, i, s) {
                var c = l(e[n], e, a)
                if ('throw' !== c.type) {
                    var u = c.arg,
                        f = u.value
                    return f && 'object' == qe(f) && r.call(f, '__await')
                        ? t.resolve(f.__await).then(
                              function (e) {
                                  o('next', e, i, s)
                              },
                              function (e) {
                                  o('throw', e, i, s)
                              }
                          )
                        : t.resolve(f).then(
                              function (e) {
                                  ;(u.value = e), i(u)
                              },
                              function (e) {
                                  return o('throw', e, i, s)
                              }
                          )
                }
                s(c.arg)
            }
            var a
            n(this, '_invoke', {
                value: function (e, r) {
                    function n() {
                        return new t(function (t, n) {
                            o(e, r, t, n)
                        })
                    }
                    return (a = a ? a.then(n, n) : n())
                },
            })
        }
        function x(e, t, r) {
            var n = 'suspendedStart'
            return function (o, a) {
                if ('executing' === n)
                    throw new Error('Generator is already running')
                if ('completed' === n) {
                    if ('throw' === o) throw a
                    return { value: void 0, done: !0 }
                }
                for (r.method = o, r.arg = a; ; ) {
                    var i = r.delegate
                    if (i) {
                        var s = k(i, r)
                        if (s) {
                            if (s === f) continue
                            return s
                        }
                    }
                    if ('next' === r.method) r.sent = r._sent = r.arg
                    else if ('throw' === r.method) {
                        if ('suspendedStart' === n)
                            throw ((n = 'completed'), r.arg)
                        r.dispatchException(r.arg)
                    } else 'return' === r.method && r.abrupt('return', r.arg)
                    n = 'executing'
                    var c = l(e, t, r)
                    if ('normal' === c.type) {
                        if (
                            ((n = r.done ? 'completed' : 'suspendedYield'),
                            c.arg === f)
                        )
                            continue
                        return { value: c.arg, done: r.done }
                    }
                    'throw' === c.type &&
                        ((n = 'completed'),
                        (r.method = 'throw'),
                        (r.arg = c.arg))
                }
            }
        }
        function k(e, t) {
            var r = t.method,
                n = e.iterator[r]
            if (void 0 === n)
                return (
                    (t.delegate = null),
                    ('throw' === r &&
                        e.iterator.return &&
                        ((t.method = 'return'),
                        (t.arg = void 0),
                        k(e, t),
                        'throw' === t.method)) ||
                        ('return' !== r &&
                            ((t.method = 'throw'),
                            (t.arg = new TypeError(
                                "The iterator does not provide a '" +
                                    r +
                                    "' method"
                            )))),
                    f
                )
            var o = l(n, e.iterator, t.arg)
            if ('throw' === o.type)
                return (
                    (t.method = 'throw'),
                    (t.arg = o.arg),
                    (t.delegate = null),
                    f
                )
            var a = o.arg
            return a
                ? a.done
                    ? ((t[e.resultName] = a.value),
                      (t.next = e.nextLoc),
                      'return' !== t.method &&
                          ((t.method = 'next'), (t.arg = void 0)),
                      (t.delegate = null),
                      f)
                    : a
                : ((t.method = 'throw'),
                  (t.arg = new TypeError('iterator result is not an object')),
                  (t.delegate = null),
                  f)
        }
        function E(e) {
            var t = { tryLoc: e[0] }
            1 in e && (t.catchLoc = e[1]),
                2 in e && ((t.finallyLoc = e[2]), (t.afterLoc = e[3])),
                this.tryEntries.push(t)
        }
        function S(e) {
            var t = e.completion || {}
            ;(t.type = 'normal'), delete t.arg, (e.completion = t)
        }
        function L(e) {
            ;(this.tryEntries = [{ tryLoc: 'root' }]),
                e.forEach(E, this),
                this.reset(!0)
        }
        function O(e) {
            if (e) {
                var t = e[a]
                if (t) return t.call(e)
                if ('function' == typeof e.next) return e
                if (!isNaN(e.length)) {
                    var n = -1,
                        o = function t() {
                            for (; ++n < e.length; )
                                if (r.call(e, n))
                                    return (t.value = e[n]), (t.done = !1), t
                            return (t.value = void 0), (t.done = !0), t
                        }
                    return (o.next = o)
                }
            }
            return { next: P }
        }
        function P() {
            return { value: void 0, done: !0 }
        }
        return (
            (h.prototype = d),
            n(m, 'constructor', { value: d, configurable: !0 }),
            n(d, 'constructor', { value: h, configurable: !0 }),
            (h.displayName = c(d, s, 'GeneratorFunction')),
            (e.isGeneratorFunction = function (e) {
                var t = 'function' == typeof e && e.constructor
                return (
                    !!t &&
                    (t === h ||
                        'GeneratorFunction' === (t.displayName || t.name))
                )
            }),
            (e.mark = function (e) {
                return (
                    Object.setPrototypeOf
                        ? Object.setPrototypeOf(e, d)
                        : ((e.__proto__ = d), c(e, s, 'GeneratorFunction')),
                    (e.prototype = Object.create(m)),
                    e
                )
            }),
            (e.awrap = function (e) {
                return { __await: e }
            }),
            w(b.prototype),
            c(b.prototype, i, function () {
                return this
            }),
            (e.AsyncIterator = b),
            (e.async = function (t, r, n, o, a) {
                void 0 === a && (a = Promise)
                var i = new b(u(t, r, n, o), a)
                return e.isGeneratorFunction(r)
                    ? i
                    : i.next().then(function (e) {
                          return e.done ? e.value : i.next()
                      })
            }),
            w(m),
            c(m, s, 'Generator'),
            c(m, a, function () {
                return this
            }),
            c(m, 'toString', function () {
                return '[object Generator]'
            }),
            (e.keys = function (e) {
                var t = Object(e),
                    r = []
                for (var n in t) r.push(n)
                return (
                    r.reverse(),
                    function e() {
                        for (; r.length; ) {
                            var n = r.pop()
                            if (n in t) return (e.value = n), (e.done = !1), e
                        }
                        return (e.done = !0), e
                    }
                )
            }),
            (e.values = O),
            (L.prototype = {
                constructor: L,
                reset: function (e) {
                    if (
                        ((this.prev = 0),
                        (this.next = 0),
                        (this.sent = this._sent = void 0),
                        (this.done = !1),
                        (this.delegate = null),
                        (this.method = 'next'),
                        (this.arg = void 0),
                        this.tryEntries.forEach(S),
                        !e)
                    )
                        for (var t in this)
                            't' === t.charAt(0) &&
                                r.call(this, t) &&
                                !isNaN(+t.slice(1)) &&
                                (this[t] = void 0)
                },
                stop: function () {
                    this.done = !0
                    var e = this.tryEntries[0].completion
                    if ('throw' === e.type) throw e.arg
                    return this.rval
                },
                dispatchException: function (e) {
                    if (this.done) throw e
                    var t = this
                    function n(r, n) {
                        return (
                            (i.type = 'throw'),
                            (i.arg = e),
                            (t.next = r),
                            n && ((t.method = 'next'), (t.arg = void 0)),
                            !!n
                        )
                    }
                    for (var o = this.tryEntries.length - 1; o >= 0; --o) {
                        var a = this.tryEntries[o],
                            i = a.completion
                        if ('root' === a.tryLoc) return n('end')
                        if (a.tryLoc <= this.prev) {
                            var s = r.call(a, 'catchLoc'),
                                c = r.call(a, 'finallyLoc')
                            if (s && c) {
                                if (this.prev < a.catchLoc)
                                    return n(a.catchLoc, !0)
                                if (this.prev < a.finallyLoc)
                                    return n(a.finallyLoc)
                            } else if (s) {
                                if (this.prev < a.catchLoc)
                                    return n(a.catchLoc, !0)
                            } else {
                                if (!c)
                                    throw new Error(
                                        'try statement without catch or finally'
                                    )
                                if (this.prev < a.finallyLoc)
                                    return n(a.finallyLoc)
                            }
                        }
                    }
                },
                abrupt: function (e, t) {
                    for (var n = this.tryEntries.length - 1; n >= 0; --n) {
                        var o = this.tryEntries[n]
                        if (
                            o.tryLoc <= this.prev &&
                            r.call(o, 'finallyLoc') &&
                            this.prev < o.finallyLoc
                        ) {
                            var a = o
                            break
                        }
                    }
                    a &&
                        ('break' === e || 'continue' === e) &&
                        a.tryLoc <= t &&
                        t <= a.finallyLoc &&
                        (a = null)
                    var i = a ? a.completion : {}
                    return (
                        (i.type = e),
                        (i.arg = t),
                        a
                            ? ((this.method = 'next'),
                              (this.next = a.finallyLoc),
                              f)
                            : this.complete(i)
                    )
                },
                complete: function (e, t) {
                    if ('throw' === e.type) throw e.arg
                    return (
                        'break' === e.type || 'continue' === e.type
                            ? (this.next = e.arg)
                            : 'return' === e.type
                              ? ((this.rval = this.arg = e.arg),
                                (this.method = 'return'),
                                (this.next = 'end'))
                              : 'normal' === e.type && t && (this.next = t),
                        f
                    )
                },
                finish: function (e) {
                    for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                        var r = this.tryEntries[t]
                        if (r.finallyLoc === e)
                            return (
                                this.complete(r.completion, r.afterLoc), S(r), f
                            )
                    }
                },
                catch: function (e) {
                    for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                        var r = this.tryEntries[t]
                        if (r.tryLoc === e) {
                            var n = r.completion
                            if ('throw' === n.type) {
                                var o = n.arg
                                S(r)
                            }
                            return o
                        }
                    }
                    throw new Error('illegal catch attempt')
                },
                delegateYield: function (e, t, r) {
                    return (
                        (this.delegate = {
                            iterator: O(e),
                            resultName: t,
                            nextLoc: r,
                        }),
                        'next' === this.method && (this.arg = void 0),
                        f
                    )
                },
            }),
            e
        )
    }
    function He(e, t, r, n, o, a, i) {
        try {
            var s = e[a](i),
                c = s.value
        } catch (e) {
            return void r(e)
        }
        s.done ? t(c) : Promise.resolve(c).then(n, o)
    }
    function Qe(e) {
        return function () {
            var t = this,
                r = arguments
            return new Promise(function (n, o) {
                var a = e.apply(t, r)
                function i(e) {
                    He(a, n, o, i, s, 'next', e)
                }
                function s(e) {
                    He(a, n, o, i, s, 'throw', e)
                }
                i(void 0)
            })
        }
    }
    function Ze(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r]
            ;(n.enumerable = n.enumerable || !1),
                (n.configurable = !0),
                'value' in n && (n.writable = !0),
                Object.defineProperty(
                    e,
                    (void 0,
                    (o = (function (e, t) {
                        if ('object' !== qe(e) || null === e) return e
                        var r = e[Symbol.toPrimitive]
                        if (void 0 !== r) {
                            var n = r.call(e, 'string')
                            if ('object' !== qe(n)) return n
                            throw new TypeError(
                                '@@toPrimitive must return a primitive value.'
                            )
                        }
                        return String(e)
                    })(n.key)),
                    'symbol' === qe(o) ? o : String(o)),
                    n
                )
        }
        var o
    }
    const Xe = new ((function () {
        function e() {
            !(function (e, t) {
                if (!(e instanceof t))
                    throw new TypeError('Cannot call a class as a function')
            })(this, e)
        }
        var r, n, o, a, i, s, c, u, l, f, p, h
        return (
            (r = e),
            (n = [
                {
                    key: 'init',
                    value:
                        ((h = Qe(
                            Ye().mark(function e(r) {
                                var n, o
                                return Ye().wrap(function (e) {
                                    for (;;)
                                        switch ((e.prev = e.next)) {
                                            case 0:
                                                return (e.next = 2), Le.get(le)
                                            case 2:
                                                if (!(n = e.sent)) {
                                                    e.next = 9
                                                    break
                                                }
                                                return (
                                                    (n = JSON.parse(n)),
                                                    (o = n.filter(function (e) {
                                                        return (
                                                            Date.now() -
                                                                parseInt(
                                                                    e
                                                                        .messageMeta
                                                                        .receivedDate
                                                                ) <=
                                                            24 * r * 3600 * 1e3
                                                        )
                                                    })),
                                                    (e.next = 8),
                                                    Le.set(
                                                        le,
                                                        JSON.stringify(o)
                                                    )
                                                )
                                            case 8:
                                                t.log(
                                                    'Message Cleanup completed'
                                                )
                                            case 9:
                                            case 'end':
                                                return e.stop()
                                        }
                                }, e)
                            })
                        )),
                        function (e) {
                            return h.apply(this, arguments)
                        }),
                },
                {
                    key: 'storeNotificationMessage',
                    value:
                        ((p = Qe(
                            Ye().mark(function e(r, n) {
                                var o, a, i, s, c, u, l
                                return Ye().wrap(
                                    function (e) {
                                        for (;;)
                                            switch ((e.prev = e.next)) {
                                                case 0:
                                                    return (
                                                        (o = r.data.c_body),
                                                        (e.prev = 1),
                                                        (e.next = 4),
                                                        Le.get(le)
                                                    )
                                                case 4:
                                                    return (
                                                        (a = e.sent)
                                                            ? ((a =
                                                                  JSON.parse(
                                                                      a
                                                                  )),
                                                              (null !==
                                                                  (i = a) &&
                                                                  void 0 !==
                                                                      i &&
                                                                  i.find(
                                                                      function (
                                                                          e
                                                                      ) {
                                                                          return (
                                                                              e
                                                                                  .messageMeta
                                                                                  .messageId ==
                                                                              o
                                                                                  .messageMeta
                                                                                  .messageId
                                                                          )
                                                                      }
                                                                  )) ||
                                                                  a.push(o))
                                                            : (a =
                                                                  new Array()).push(
                                                                  o
                                                              ),
                                                        (e.next = 8),
                                                        Le.set(
                                                            'messages',
                                                            JSON.stringify(a)
                                                        )
                                                    )
                                                case 8:
                                                    return (
                                                        t.log(
                                                            'Message Appended in DB: ',
                                                            r.data.c_body
                                                        ),
                                                        (e.next = 11),
                                                        Le.createResponseObject(
                                                            r.data.c_body
                                                        )
                                                    )
                                                case 11:
                                                    ;(s = e.sent),
                                                        (c = s.result),
                                                        (u = s.totalMessages),
                                                        (l = s.readMessages),
                                                        n({
                                                            result: c,
                                                            totalMessages: u,
                                                            readMessages: l,
                                                        }),
                                                        (e.next = 21)
                                                    break
                                                case 18:
                                                    ;(e.prev = 18),
                                                        (e.t0 = e.catch(1)),
                                                        t.error('Error: ', e.t0)
                                                case 21:
                                                case 'end':
                                                    return e.stop()
                                            }
                                    },
                                    e,
                                    null,
                                    [[1, 18]]
                                )
                            })
                        )),
                        function (e, t) {
                            return p.apply(this, arguments)
                        }),
                },
                {
                    key: 'clearAllNotifications',
                    value:
                        ((f = Qe(
                            Ye().mark(function e(r) {
                                return Ye().wrap(
                                    function (e) {
                                        for (;;)
                                            switch ((e.prev = e.next)) {
                                                case 0:
                                                    return (
                                                        this.logfn &&
                                                            this.logfn(
                                                                'Request to clear all messages'
                                                            ),
                                                        (e.next = 3),
                                                        Le.del(le)
                                                    )
                                                case 3:
                                                    t.log(
                                                        'Message Cleared from DB: '
                                                    ),
                                                        r()
                                                case 5:
                                                case 'end':
                                                    return e.stop()
                                            }
                                    },
                                    e,
                                    this
                                )
                            })
                        )),
                        function (e) {
                            return f.apply(this, arguments)
                        }),
                },
                {
                    key: 'getNotificationMessage',
                    value:
                        ((l = Qe(
                            Ye().mark(function e(r, n) {
                                var o, a, i, s, c, u
                                return Ye().wrap(function (e) {
                                    for (;;)
                                        switch ((e.prev = e.next)) {
                                            case 0:
                                                return (
                                                    t.log(
                                                        'Request to fetch message Id ',
                                                        r,
                                                        ' received'
                                                    ),
                                                    (e.next = 3),
                                                    Le.get(le)
                                                )
                                            case 3:
                                                if (!(o = e.sent)) {
                                                    e.next = 17
                                                    break
                                                }
                                                return (
                                                    (o = JSON.parse(o)),
                                                    (a = o.find(function (e) {
                                                        return (
                                                            e.messageMeta
                                                                .messageId == r
                                                        )
                                                    })),
                                                    t.log(
                                                        'Message fetched from DB: ',
                                                        a
                                                    ),
                                                    (e.next = 10),
                                                    Le.createResponseObject(a)
                                                )
                                            case 10:
                                                ;(i = e.sent),
                                                    (s = i.result),
                                                    (c = i.totalMessages),
                                                    (u = i.readMessages),
                                                    n({
                                                        result: s,
                                                        totalMessages: c,
                                                        readMessages: u,
                                                    }),
                                                    (e.next = 18)
                                                break
                                            case 17:
                                                t.log(
                                                    "Couldn't find message Id ",
                                                    r
                                                )
                                            case 18:
                                            case 'end':
                                                return e.stop()
                                        }
                                }, e)
                            })
                        )),
                        function (e, t) {
                            return l.apply(this, arguments)
                        }),
                },
                {
                    key: 'getAllNotificationMessages',
                    value:
                        ((u = Qe(
                            Ye().mark(function e(r, n, o) {
                                var a, i, s, c, u, l
                                return Ye().wrap(function (e) {
                                    for (;;)
                                        switch ((e.prev = e.next)) {
                                            case 0:
                                                return (
                                                    t.log(
                                                        'Request to fetch messages from start Date ',
                                                        r,
                                                        ' to end Date ',
                                                        n,
                                                        ' Received'
                                                    ),
                                                    (e.next = 3),
                                                    Le.get(le)
                                                )
                                            case 3:
                                                if (!(a = e.sent)) {
                                                    e.next = 17
                                                    break
                                                }
                                                return (
                                                    (a = JSON.parse(a)),
                                                    (i =
                                                        r && n
                                                            ? a.filter(
                                                                  function (e) {
                                                                      return (
                                                                          e
                                                                              .messageMeta
                                                                              .receivedDate >=
                                                                              r &&
                                                                          e
                                                                              .messageMeta
                                                                              .receivedDate <=
                                                                              n
                                                                      )
                                                                  }
                                                              )
                                                            : a),
                                                    t.log(
                                                        'Message fetched from DB: ',
                                                        i
                                                    ),
                                                    (e.next = 10),
                                                    Le.createResponseObject(i)
                                                )
                                            case 10:
                                                ;(s = e.sent),
                                                    (c = s.result),
                                                    (u = s.totalMessages),
                                                    (l = s.readMessages),
                                                    o({
                                                        result: c,
                                                        totalMessages: u,
                                                        readMessages: l,
                                                    }),
                                                    (e.next = 18)
                                                break
                                            case 17:
                                                t.log(
                                                    'No Messages are available in DB'
                                                )
                                            case 18:
                                            case 'end':
                                                return e.stop()
                                        }
                                }, e)
                            })
                        )),
                        function (e, t, r) {
                            return u.apply(this, arguments)
                        }),
                },
                {
                    key: 'getAllReadNotificationMessages',
                    value:
                        ((c = Qe(
                            Ye().mark(function e(r, n, o) {
                                var a, i, s, c, u, l
                                return Ye().wrap(function (e) {
                                    for (;;)
                                        switch ((e.prev = e.next)) {
                                            case 0:
                                                return (
                                                    t.log(
                                                        'Request to fetch read messages from start Date ',
                                                        r,
                                                        ' to end Date ',
                                                        n,
                                                        ' Received'
                                                    ),
                                                    (e.next = 3),
                                                    Le.get(le)
                                                )
                                            case 3:
                                                if (!(a = e.sent)) {
                                                    e.next = 17
                                                    break
                                                }
                                                return (
                                                    (a = JSON.parse(a)),
                                                    (i = a.filter(function (e) {
                                                        return (
                                                            e.messageMeta
                                                                .receivedDate >=
                                                                r &&
                                                            e.messageMeta
                                                                .receivedDate <=
                                                                n &&
                                                            1 ==
                                                                e.messageMeta
                                                                    .isRead
                                                        )
                                                    })),
                                                    t.log(
                                                        'Message fetched from DB: ',
                                                        i
                                                    ),
                                                    (e.next = 10),
                                                    Le.createResponseObject(i)
                                                )
                                            case 10:
                                                ;(s = e.sent),
                                                    (c = s.result),
                                                    (u = s.totalMessages),
                                                    (l = s.readMessages),
                                                    o({
                                                        result: c,
                                                        totalMessages: u,
                                                        readMessages: l,
                                                    }),
                                                    (e.next = 18)
                                                break
                                            case 17:
                                                t.log(
                                                    'No Messages are available in DB'
                                                )
                                            case 18:
                                            case 'end':
                                                return e.stop()
                                        }
                                }, e)
                            })
                        )),
                        function (e, t, r) {
                            return c.apply(this, arguments)
                        }),
                },
                {
                    key: 'getAllUnreadNotificationMessages',
                    value:
                        ((s = Qe(
                            Ye().mark(function e(r, n, o) {
                                var a, i, s, c, u, l
                                return Ye().wrap(function (e) {
                                    for (;;)
                                        switch ((e.prev = e.next)) {
                                            case 0:
                                                return (
                                                    t.log(
                                                        'Request to fetch Unread messages from start Date ',
                                                        r,
                                                        ' to end Date ',
                                                        n,
                                                        ' Received'
                                                    ),
                                                    (e.next = 3),
                                                    Le.get(le)
                                                )
                                            case 3:
                                                if (!(a = e.sent)) {
                                                    e.next = 17
                                                    break
                                                }
                                                return (
                                                    (a = JSON.parse(a)),
                                                    (i = a.filter(function (e) {
                                                        return (
                                                            e.messageMeta
                                                                .receivedDate >=
                                                                r &&
                                                            e.messageMeta
                                                                .receivedDate <=
                                                                n &&
                                                            0 ==
                                                                e.messageMeta
                                                                    .isRead
                                                        )
                                                    })),
                                                    t.log(
                                                        'Message fetched from DB: ',
                                                        i
                                                    ),
                                                    (e.next = 10),
                                                    Le.createResponseObject(i)
                                                )
                                            case 10:
                                                ;(s = e.sent),
                                                    (c = s.result),
                                                    (u = s.totalMessages),
                                                    (l = s.readMessages),
                                                    o({
                                                        result: c,
                                                        totalMessages: u,
                                                        readMessages: l,
                                                    }),
                                                    (e.next = 18)
                                                break
                                            case 17:
                                                t.log(
                                                    'No Messages are available in DB'
                                                )
                                            case 18:
                                            case 'end':
                                                return e.stop()
                                        }
                                }, e)
                            })
                        )),
                        function (e, t, r) {
                            return s.apply(this, arguments)
                        }),
                },
                {
                    key: 'updateNotificationMessage',
                    value:
                        ((i = Qe(
                            Ye().mark(function e(r, n, o) {
                                var a, i, s, c, u, l, f, p, h, d
                                return Ye().wrap(function (e) {
                                    for (;;)
                                        switch ((e.prev = e.next)) {
                                            case 0:
                                                return (
                                                    t.log(
                                                        'Request to update message for messageId ',
                                                        r,
                                                        ' Received'
                                                    ),
                                                    (e.next = 3),
                                                    Le.get(le)
                                                )
                                            case 3:
                                                if (!(a = e.sent)) {
                                                    e.next = 31
                                                    break
                                                }
                                                if (
                                                    ((a = JSON.parse(a)),
                                                    !(i = a.find(function (e) {
                                                        return (
                                                            e.messageMeta
                                                                .messageId == r
                                                        )
                                                    })))
                                                ) {
                                                    e.next = 21
                                                    break
                                                }
                                                return (
                                                    (i.isRead = n),
                                                    (e.next = 11),
                                                    Le.set(
                                                        le,
                                                        JSON.stringify(a)
                                                    )
                                                )
                                            case 11:
                                                return (
                                                    t.log(
                                                        'Message updated in DB: ',
                                                        i
                                                    ),
                                                    (e.next = 14),
                                                    Le.createResponseObject(i)
                                                )
                                            case 14:
                                                ;(s = e.sent),
                                                    (c = s.result),
                                                    (u = s.totalMessages),
                                                    (l = s.readMessages),
                                                    o({
                                                        result: c,
                                                        totalMessages: u,
                                                        readMessages: l,
                                                    }),
                                                    (e.next = 29)
                                                break
                                            case 21:
                                                return (
                                                    t.log(
                                                        'Message of messageid: ',
                                                        r,
                                                        ' Not found'
                                                    ),
                                                    (e.next = 24),
                                                    Le.createResponseObject(
                                                        null
                                                    )
                                                )
                                            case 24:
                                                ;(f = e.sent),
                                                    (p = f.result),
                                                    (h = f.totalMessages),
                                                    (d = f.readMessages),
                                                    o({
                                                        result: p,
                                                        totalMessages: h,
                                                        readMessages: d,
                                                    })
                                            case 29:
                                                e.next = 32
                                                break
                                            case 31:
                                                t.log(
                                                    'No Messages are available in DB'
                                                )
                                            case 32:
                                            case 'end':
                                                return e.stop()
                                        }
                                }, e)
                            })
                        )),
                        function (e, t, r) {
                            return i.apply(this, arguments)
                        }),
                },
                {
                    key: 'deleteNotificationMessage',
                    value:
                        ((a = Qe(
                            Ye().mark(function e(r, n) {
                                var o, a, i, s, c, u, l, f, p, h, d
                                return Ye().wrap(function (e) {
                                    for (;;)
                                        switch ((e.prev = e.next)) {
                                            case 0:
                                                return (
                                                    t.log(
                                                        'Request to delete message for messageId ',
                                                        r,
                                                        ' Received'
                                                    ),
                                                    (e.next = 3),
                                                    Le.get(le)
                                                )
                                            case 3:
                                                if (!(o = e.sent)) {
                                                    e.next = 31
                                                    break
                                                }
                                                if (
                                                    ((o = JSON.parse(o)),
                                                    !(a = o.find(function (e) {
                                                        return (
                                                            e.messageMeta
                                                                .messageId == r
                                                        )
                                                    })))
                                                ) {
                                                    e.next = 21
                                                    break
                                                }
                                                return (
                                                    (i = o.filter(function (e) {
                                                        return (
                                                            e.messageMeta
                                                                .messageId != r
                                                        )
                                                    })),
                                                    (e.next = 11),
                                                    Le.set(
                                                        le,
                                                        JSON.stringify(i)
                                                    )
                                                )
                                            case 11:
                                                return (
                                                    t.log(
                                                        'Message deleted in DB: ',
                                                        a
                                                    ),
                                                    (e.next = 14),
                                                    Le.createResponseObject(a)
                                                )
                                            case 14:
                                                ;(s = e.sent),
                                                    (c = s.result),
                                                    (u = s.totalMessages),
                                                    (l = s.readMessages),
                                                    n({
                                                        result: c,
                                                        totalMessages: u,
                                                        readMessages: l,
                                                    }),
                                                    (e.next = 29)
                                                break
                                            case 21:
                                                return (
                                                    t.log(
                                                        'Message of messageid: ',
                                                        r,
                                                        ' Not found'
                                                    ),
                                                    (e.next = 24),
                                                    Le.createResponseObject(
                                                        null
                                                    )
                                                )
                                            case 24:
                                                ;(f = e.sent),
                                                    (p = f.result),
                                                    (h = f.totalMessages),
                                                    (d = f.readMessages),
                                                    n({
                                                        result: p,
                                                        totalMessages: h,
                                                        readMessages: d,
                                                    })
                                            case 29:
                                                e.next = 32
                                                break
                                            case 31:
                                                t.log(
                                                    'No Messages are available in DB'
                                                )
                                            case 32:
                                            case 'end':
                                                return e.stop()
                                        }
                                }, e)
                            })
                        )),
                        function (e, t) {
                            return a.apply(this, arguments)
                        }),
                },
                {
                    key: 'getNotificationMessagesCount',
                    value:
                        ((o = Qe(
                            Ye().mark(function e(t) {
                                var r, n, o, a
                                return Ye().wrap(function (e) {
                                    for (;;)
                                        switch ((e.prev = e.next)) {
                                            case 0:
                                                return (
                                                    (e.next = 2),
                                                    Le.createResponseObject(
                                                        null
                                                    )
                                                )
                                            case 2:
                                                ;(r = e.sent),
                                                    (n = r.result),
                                                    (o = r.totalMessages),
                                                    (a = r.readMessages),
                                                    t({
                                                        result: n,
                                                        totalMessages: o,
                                                        readMessages: a,
                                                    })
                                            case 7:
                                            case 'end':
                                                return e.stop()
                                        }
                                }, e)
                            })
                        )),
                        function (e) {
                            return o.apply(this, arguments)
                        }),
                },
            ]),
            n && Ze(r.prototype, n),
            Object.defineProperty(r, 'prototype', { writable: !1 }),
            e
        )
    })())()
    function $e(e) {
        return (
            ($e =
                'function' == typeof Symbol &&
                'symbol' == typeof Symbol.iterator
                    ? function (e) {
                          return typeof e
                      }
                    : function (e) {
                          return e &&
                              'function' == typeof Symbol &&
                              e.constructor === Symbol &&
                              e !== Symbol.prototype
                              ? 'symbol'
                              : typeof e
                      }),
            $e(e)
        )
    }
    function et() {
        et = function () {
            return e
        }
        var e = {},
            t = Object.prototype,
            r = t.hasOwnProperty,
            n =
                Object.defineProperty ||
                function (e, t, r) {
                    e[t] = r.value
                },
            o = 'function' == typeof Symbol ? Symbol : {},
            a = o.iterator || '@@iterator',
            i = o.asyncIterator || '@@asyncIterator',
            s = o.toStringTag || '@@toStringTag'
        function c(e, t, r) {
            return (
                Object.defineProperty(e, t, {
                    value: r,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                }),
                e[t]
            )
        }
        try {
            c({}, '')
        } catch (e) {
            c = function (e, t, r) {
                return (e[t] = r)
            }
        }
        function u(e, t, r, o) {
            var a = t && t.prototype instanceof p ? t : p,
                i = Object.create(a.prototype),
                s = new L(o || [])
            return n(i, '_invoke', { value: x(e, r, s) }), i
        }
        function l(e, t, r) {
            try {
                return { type: 'normal', arg: e.call(t, r) }
            } catch (e) {
                return { type: 'throw', arg: e }
            }
        }
        e.wrap = u
        var f = {}
        function p() {}
        function h() {}
        function d() {}
        var v = {}
        c(v, a, function () {
            return this
        })
        var y = Object.getPrototypeOf,
            g = y && y(y(O([])))
        g && g !== t && r.call(g, a) && (v = g)
        var m = (d.prototype = p.prototype = Object.create(v))
        function w(e) {
            ;['next', 'throw', 'return'].forEach(function (t) {
                c(e, t, function (e) {
                    return this._invoke(t, e)
                })
            })
        }
        function b(e, t) {
            function o(n, a, i, s) {
                var c = l(e[n], e, a)
                if ('throw' !== c.type) {
                    var u = c.arg,
                        f = u.value
                    return f && 'object' == $e(f) && r.call(f, '__await')
                        ? t.resolve(f.__await).then(
                              function (e) {
                                  o('next', e, i, s)
                              },
                              function (e) {
                                  o('throw', e, i, s)
                              }
                          )
                        : t.resolve(f).then(
                              function (e) {
                                  ;(u.value = e), i(u)
                              },
                              function (e) {
                                  return o('throw', e, i, s)
                              }
                          )
                }
                s(c.arg)
            }
            var a
            n(this, '_invoke', {
                value: function (e, r) {
                    function n() {
                        return new t(function (t, n) {
                            o(e, r, t, n)
                        })
                    }
                    return (a = a ? a.then(n, n) : n())
                },
            })
        }
        function x(e, t, r) {
            var n = 'suspendedStart'
            return function (o, a) {
                if ('executing' === n)
                    throw new Error('Generator is already running')
                if ('completed' === n) {
                    if ('throw' === o) throw a
                    return { value: void 0, done: !0 }
                }
                for (r.method = o, r.arg = a; ; ) {
                    var i = r.delegate
                    if (i) {
                        var s = k(i, r)
                        if (s) {
                            if (s === f) continue
                            return s
                        }
                    }
                    if ('next' === r.method) r.sent = r._sent = r.arg
                    else if ('throw' === r.method) {
                        if ('suspendedStart' === n)
                            throw ((n = 'completed'), r.arg)
                        r.dispatchException(r.arg)
                    } else 'return' === r.method && r.abrupt('return', r.arg)
                    n = 'executing'
                    var c = l(e, t, r)
                    if ('normal' === c.type) {
                        if (
                            ((n = r.done ? 'completed' : 'suspendedYield'),
                            c.arg === f)
                        )
                            continue
                        return { value: c.arg, done: r.done }
                    }
                    'throw' === c.type &&
                        ((n = 'completed'),
                        (r.method = 'throw'),
                        (r.arg = c.arg))
                }
            }
        }
        function k(e, t) {
            var r = t.method,
                n = e.iterator[r]
            if (void 0 === n)
                return (
                    (t.delegate = null),
                    ('throw' === r &&
                        e.iterator.return &&
                        ((t.method = 'return'),
                        (t.arg = void 0),
                        k(e, t),
                        'throw' === t.method)) ||
                        ('return' !== r &&
                            ((t.method = 'throw'),
                            (t.arg = new TypeError(
                                "The iterator does not provide a '" +
                                    r +
                                    "' method"
                            )))),
                    f
                )
            var o = l(n, e.iterator, t.arg)
            if ('throw' === o.type)
                return (
                    (t.method = 'throw'),
                    (t.arg = o.arg),
                    (t.delegate = null),
                    f
                )
            var a = o.arg
            return a
                ? a.done
                    ? ((t[e.resultName] = a.value),
                      (t.next = e.nextLoc),
                      'return' !== t.method &&
                          ((t.method = 'next'), (t.arg = void 0)),
                      (t.delegate = null),
                      f)
                    : a
                : ((t.method = 'throw'),
                  (t.arg = new TypeError('iterator result is not an object')),
                  (t.delegate = null),
                  f)
        }
        function E(e) {
            var t = { tryLoc: e[0] }
            1 in e && (t.catchLoc = e[1]),
                2 in e && ((t.finallyLoc = e[2]), (t.afterLoc = e[3])),
                this.tryEntries.push(t)
        }
        function S(e) {
            var t = e.completion || {}
            ;(t.type = 'normal'), delete t.arg, (e.completion = t)
        }
        function L(e) {
            ;(this.tryEntries = [{ tryLoc: 'root' }]),
                e.forEach(E, this),
                this.reset(!0)
        }
        function O(e) {
            if (e) {
                var t = e[a]
                if (t) return t.call(e)
                if ('function' == typeof e.next) return e
                if (!isNaN(e.length)) {
                    var n = -1,
                        o = function t() {
                            for (; ++n < e.length; )
                                if (r.call(e, n))
                                    return (t.value = e[n]), (t.done = !1), t
                            return (t.value = void 0), (t.done = !0), t
                        }
                    return (o.next = o)
                }
            }
            return { next: P }
        }
        function P() {
            return { value: void 0, done: !0 }
        }
        return (
            (h.prototype = d),
            n(m, 'constructor', { value: d, configurable: !0 }),
            n(d, 'constructor', { value: h, configurable: !0 }),
            (h.displayName = c(d, s, 'GeneratorFunction')),
            (e.isGeneratorFunction = function (e) {
                var t = 'function' == typeof e && e.constructor
                return (
                    !!t &&
                    (t === h ||
                        'GeneratorFunction' === (t.displayName || t.name))
                )
            }),
            (e.mark = function (e) {
                return (
                    Object.setPrototypeOf
                        ? Object.setPrototypeOf(e, d)
                        : ((e.__proto__ = d), c(e, s, 'GeneratorFunction')),
                    (e.prototype = Object.create(m)),
                    e
                )
            }),
            (e.awrap = function (e) {
                return { __await: e }
            }),
            w(b.prototype),
            c(b.prototype, i, function () {
                return this
            }),
            (e.AsyncIterator = b),
            (e.async = function (t, r, n, o, a) {
                void 0 === a && (a = Promise)
                var i = new b(u(t, r, n, o), a)
                return e.isGeneratorFunction(r)
                    ? i
                    : i.next().then(function (e) {
                          return e.done ? e.value : i.next()
                      })
            }),
            w(m),
            c(m, s, 'Generator'),
            c(m, a, function () {
                return this
            }),
            c(m, 'toString', function () {
                return '[object Generator]'
            }),
            (e.keys = function (e) {
                var t = Object(e),
                    r = []
                for (var n in t) r.push(n)
                return (
                    r.reverse(),
                    function e() {
                        for (; r.length; ) {
                            var n = r.pop()
                            if (n in t) return (e.value = n), (e.done = !1), e
                        }
                        return (e.done = !0), e
                    }
                )
            }),
            (e.values = O),
            (L.prototype = {
                constructor: L,
                reset: function (e) {
                    if (
                        ((this.prev = 0),
                        (this.next = 0),
                        (this.sent = this._sent = void 0),
                        (this.done = !1),
                        (this.delegate = null),
                        (this.method = 'next'),
                        (this.arg = void 0),
                        this.tryEntries.forEach(S),
                        !e)
                    )
                        for (var t in this)
                            't' === t.charAt(0) &&
                                r.call(this, t) &&
                                !isNaN(+t.slice(1)) &&
                                (this[t] = void 0)
                },
                stop: function () {
                    this.done = !0
                    var e = this.tryEntries[0].completion
                    if ('throw' === e.type) throw e.arg
                    return this.rval
                },
                dispatchException: function (e) {
                    if (this.done) throw e
                    var t = this
                    function n(r, n) {
                        return (
                            (i.type = 'throw'),
                            (i.arg = e),
                            (t.next = r),
                            n && ((t.method = 'next'), (t.arg = void 0)),
                            !!n
                        )
                    }
                    for (var o = this.tryEntries.length - 1; o >= 0; --o) {
                        var a = this.tryEntries[o],
                            i = a.completion
                        if ('root' === a.tryLoc) return n('end')
                        if (a.tryLoc <= this.prev) {
                            var s = r.call(a, 'catchLoc'),
                                c = r.call(a, 'finallyLoc')
                            if (s && c) {
                                if (this.prev < a.catchLoc)
                                    return n(a.catchLoc, !0)
                                if (this.prev < a.finallyLoc)
                                    return n(a.finallyLoc)
                            } else if (s) {
                                if (this.prev < a.catchLoc)
                                    return n(a.catchLoc, !0)
                            } else {
                                if (!c)
                                    throw new Error(
                                        'try statement without catch or finally'
                                    )
                                if (this.prev < a.finallyLoc)
                                    return n(a.finallyLoc)
                            }
                        }
                    }
                },
                abrupt: function (e, t) {
                    for (var n = this.tryEntries.length - 1; n >= 0; --n) {
                        var o = this.tryEntries[n]
                        if (
                            o.tryLoc <= this.prev &&
                            r.call(o, 'finallyLoc') &&
                            this.prev < o.finallyLoc
                        ) {
                            var a = o
                            break
                        }
                    }
                    a &&
                        ('break' === e || 'continue' === e) &&
                        a.tryLoc <= t &&
                        t <= a.finallyLoc &&
                        (a = null)
                    var i = a ? a.completion : {}
                    return (
                        (i.type = e),
                        (i.arg = t),
                        a
                            ? ((this.method = 'next'),
                              (this.next = a.finallyLoc),
                              f)
                            : this.complete(i)
                    )
                },
                complete: function (e, t) {
                    if ('throw' === e.type) throw e.arg
                    return (
                        'break' === e.type || 'continue' === e.type
                            ? (this.next = e.arg)
                            : 'return' === e.type
                              ? ((this.rval = this.arg = e.arg),
                                (this.method = 'return'),
                                (this.next = 'end'))
                              : 'normal' === e.type && t && (this.next = t),
                        f
                    )
                },
                finish: function (e) {
                    for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                        var r = this.tryEntries[t]
                        if (r.finallyLoc === e)
                            return (
                                this.complete(r.completion, r.afterLoc), S(r), f
                            )
                    }
                },
                catch: function (e) {
                    for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                        var r = this.tryEntries[t]
                        if (r.tryLoc === e) {
                            var n = r.completion
                            if ('throw' === n.type) {
                                var o = n.arg
                                S(r)
                            }
                            return o
                        }
                    }
                    throw new Error('illegal catch attempt')
                },
                delegateYield: function (e, t, r) {
                    return (
                        (this.delegate = {
                            iterator: O(e),
                            resultName: t,
                            nextLoc: r,
                        }),
                        'next' === this.method && (this.arg = void 0),
                        f
                    )
                },
            }),
            e
        )
    }
    function tt(e, t, r, n, o, a, i) {
        try {
            var s = e[a](i),
                c = s.value
        } catch (e) {
            return void r(e)
        }
        s.done ? t(c) : Promise.resolve(c).then(n, o)
    }
    function rt(e) {
        return function () {
            var t = this,
                r = arguments
            return new Promise(function (n, o) {
                var a = e.apply(t, r)
                function i(e) {
                    tt(a, n, o, i, s, 'next', e)
                }
                function s(e) {
                    tt(a, n, o, i, s, 'throw', e)
                }
                i(void 0)
            })
        }
    }
    function nt(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r]
            ;(n.enumerable = n.enumerable || !1),
                (n.configurable = !0),
                'value' in n && (n.writable = !0),
                Object.defineProperty(
                    e,
                    (void 0,
                    (o = (function (e, t) {
                        if ('object' !== $e(e) || null === e) return e
                        var r = e[Symbol.toPrimitive]
                        if (void 0 !== r) {
                            var n = r.call(e, 'string')
                            if ('object' !== $e(n)) return n
                            throw new TypeError(
                                '@@toPrimitive must return a primitive value.'
                            )
                        }
                        return String(e)
                    })(n.key)),
                    'symbol' === $e(o) ? o : String(o)),
                    n
                )
        }
        var o
    }
    function ot(e, t) {
        it(e, t), t.add(e)
    }
    function at(e, t, r) {
        it(e, t), t.set(e, r)
    }
    function it(e, t) {
        if (t.has(e))
            throw new TypeError(
                'Cannot initialize the same private elements twice on an object'
            )
    }
    function st(e, t) {
        return (function (e, t) {
            return t.get ? t.get.call(e) : t.value
        })(e, lt(e, t, 'get'))
    }
    function ct(e, t, r) {
        if (!t.has(e))
            throw new TypeError(
                'attempted to get private field on non-instance'
            )
        return r
    }
    function ut(e, t, r) {
        return (
            (function (e, t, r) {
                if (t.set) t.set.call(e, r)
                else {
                    if (!t.writable)
                        throw new TypeError(
                            'attempted to set read only private field'
                        )
                    t.value = r
                }
            })(e, lt(e, t, 'set'), r),
            r
        )
    }
    function lt(e, t, r) {
        if (!t.has(e))
            throw new TypeError(
                'attempted to ' + r + ' private field on non-instance'
            )
        return t.get(e)
    }
    var ft = new WeakMap(),
        pt = new WeakMap(),
        ht = new WeakMap(),
        dt = new WeakSet(),
        vt = new WeakSet(),
        yt = new WeakSet(),
        gt = new WeakSet(),
        mt = (function () {
            function e(t) {
                var r = t.logger,
                    n = t.broadcastChannel,
                    o = t.storage
                !(function (e, t) {
                    if (!(e instanceof t))
                        throw new TypeError('Cannot call a class as a function')
                })(this, e),
                    ot(this, gt),
                    ot(this, yt),
                    ot(this, vt),
                    ot(this, dt),
                    at(this, ft, { writable: !0, value: void 0 }),
                    at(this, pt, { writable: !0, value: void 0 }),
                    at(this, ht, { writable: !0, value: void 0 }),
                    ut(this, ft, r),
                    ut(this, pt, n),
                    ut(this, ht, o),
                    (this.perAPIcallTimeout = 1e4),
                    (this.maxRetryAllowed = 3),
                    (this.timeBtw2RetryRequest = 1e4)
            }
            var t, r, n, o
            return (
                (t = e),
                (r = [
                    {
                        key: 'sleep',
                        value: function (e) {
                            return new Promise(function (t) {
                                return setTimeout(t, e)
                            })
                        },
                    },
                    {
                        key: 'getInAppSegment',
                        value:
                            ((o = rt(
                                et().mark(function e() {
                                    var t
                                    return et().wrap(
                                        function (e) {
                                            for (;;)
                                                switch ((e.prev = e.next)) {
                                                    case 0:
                                                        return (
                                                            (e.next = 2),
                                                            st(
                                                                this,
                                                                ht
                                                            ).getItem(ge)
                                                        )
                                                    case 2:
                                                        if (
                                                            null != (t = e.sent)
                                                        ) {
                                                            e.next = 14
                                                            break
                                                        }
                                                        return (
                                                            (e.next = 6),
                                                            ct(
                                                                this,
                                                                vt,
                                                                xt
                                                            ).call(this)
                                                        )
                                                    case 6:
                                                        ;((t =
                                                            e.sent).nextFetchTime =
                                                            Date.now() +
                                                            1e3 *
                                                                t.nextFetchTime),
                                                            (t = ct(
                                                                this,
                                                                gt,
                                                                Lt
                                                            ).call(this, t)),
                                                            st(
                                                                this,
                                                                pt
                                                            ).postMessage(
                                                                'CLEAR_CAMPAIGN_CACHE'
                                                            ),
                                                            st(
                                                                this,
                                                                ht
                                                            ).setItem(ge, t),
                                                            st(
                                                                this,
                                                                ht
                                                            ).setItem(
                                                                he,
                                                                Object.keys(
                                                                    t.eventToCampaign
                                                                )
                                                            ),
                                                            (e.next = 24)
                                                        break
                                                    case 14:
                                                        if (
                                                            !(
                                                                parseInt(
                                                                    t.nextFetchTime
                                                                ) <= Date.now()
                                                            )
                                                        ) {
                                                            e.next = 24
                                                            break
                                                        }
                                                        return (
                                                            st(
                                                                this,
                                                                ht
                                                            ).removeItem(ge),
                                                            st(
                                                                this,
                                                                ht
                                                            ).removeItem(he),
                                                            st(
                                                                this,
                                                                pt
                                                            ).postMessage(
                                                                'CLEAR_CAMPAIGN_CACHE'
                                                            ),
                                                            (e.next = 20),
                                                            ct(
                                                                this,
                                                                vt,
                                                                xt
                                                            ).call(this)
                                                        )
                                                    case 20:
                                                        ;((t =
                                                            e.sent).nextFetchTime =
                                                            Date.now() +
                                                            1e3 *
                                                                t.nextFetchTime),
                                                            st(
                                                                this,
                                                                ht
                                                            ).setItem(ge, t),
                                                            st(
                                                                this,
                                                                ht
                                                            ).setItem(
                                                                he,
                                                                Object.keys(
                                                                    t.eventToCampaign
                                                                )
                                                            )
                                                    case 24:
                                                        return e.abrupt(
                                                            'return',
                                                            t
                                                        )
                                                    case 25:
                                                    case 'end':
                                                        return e.stop()
                                                }
                                        },
                                        e,
                                        this
                                    )
                                })
                            )),
                            function () {
                                return o.apply(this, arguments)
                            }),
                    },
                    {
                        key: 'getNativeDisplaySegment',
                        value:
                            ((n = rt(
                                et().mark(function e() {
                                    var t
                                    return et().wrap(
                                        function (e) {
                                            for (;;)
                                                switch ((e.prev = e.next)) {
                                                    case 0:
                                                        return (
                                                            (e.next = 2),
                                                            st(
                                                                this,
                                                                ht
                                                            ).getItem(me)
                                                        )
                                                    case 2:
                                                        if (
                                                            null != (t = e.sent)
                                                        ) {
                                                            e.next = 14
                                                            break
                                                        }
                                                        return (
                                                            (e.next = 6),
                                                            ct(
                                                                this,
                                                                yt,
                                                                Et
                                                            ).call(this)
                                                        )
                                                    case 6:
                                                        ;((t =
                                                            e.sent).nextFetchTime =
                                                            Date.now() +
                                                            1e3 *
                                                                t.nextFetchTime),
                                                            (t = ct(
                                                                this,
                                                                gt,
                                                                Lt
                                                            ).call(this, t)),
                                                            st(
                                                                this,
                                                                pt
                                                            ).postMessage(
                                                                'CLEAR_CAMPAIGN_CACHE'
                                                            ),
                                                            st(
                                                                this,
                                                                ht
                                                            ).setItem(me, t),
                                                            st(
                                                                this,
                                                                ht
                                                            ).setItem(
                                                                de,
                                                                Object.keys(
                                                                    t.eventToCampaign
                                                                )
                                                            ),
                                                            (e.next = 24)
                                                        break
                                                    case 14:
                                                        if (
                                                            !(
                                                                parseInt(
                                                                    t.nextFetchTime
                                                                ) <= Date.now()
                                                            )
                                                        ) {
                                                            e.next = 24
                                                            break
                                                        }
                                                        return (
                                                            st(
                                                                this,
                                                                ht
                                                            ).removeItem(me),
                                                            st(
                                                                this,
                                                                ht
                                                            ).removeItem(de),
                                                            st(
                                                                this,
                                                                pt
                                                            ).postMessage(
                                                                'CLEAR_CAMPAIGN_CACHE'
                                                            ),
                                                            (e.next = 20),
                                                            ct(
                                                                this,
                                                                yt,
                                                                Et
                                                            ).call(this)
                                                        )
                                                    case 20:
                                                        ;((t =
                                                            e.sent).nextFetchTime =
                                                            Date.now() +
                                                            1e3 *
                                                                t.nextFetchTime),
                                                            st(
                                                                this,
                                                                ht
                                                            ).setItem(me, t),
                                                            st(
                                                                this,
                                                                ht
                                                            ).setItem(
                                                                de,
                                                                Object.keys(
                                                                    t.eventToCampaign
                                                                )
                                                            )
                                                    case 24:
                                                        return e.abrupt(
                                                            'return',
                                                            t
                                                        )
                                                    case 25:
                                                    case 'end':
                                                        return e.stop()
                                                }
                                        },
                                        e,
                                        this
                                    )
                                })
                            )),
                            function () {
                                return n.apply(this, arguments)
                            }),
                    },
                ]),
                r && nt(t.prototype, r),
                Object.defineProperty(t, 'prototype', { writable: !1 }),
                e
            )
        })()
    function wt(e, t) {
        return bt.apply(this, arguments)
    }
    function bt() {
        return (bt = rt(
            et().mark(function e(t, r) {
                var n,
                    o,
                    a,
                    i,
                    s,
                    c,
                    u = this
                return et().wrap(
                    function (e) {
                        for (;;)
                            switch ((e.prev = e.next)) {
                                case 0:
                                    ;(o = this.maxRetryAllowed),
                                        (a = null),
                                        (i = r),
                                        (s = et().mark(function e() {
                                            var n, s, c
                                            return et().wrap(
                                                function (e) {
                                                    for (;;)
                                                        switch (
                                                            (e.prev = e.next)
                                                        ) {
                                                            case 0:
                                                                return (
                                                                    (e.prev = 0),
                                                                    r.signal
                                                                        ? r
                                                                              .signal
                                                                              .aborted &&
                                                                          ((n =
                                                                              new AbortController()),
                                                                          (s =
                                                                              setTimeout(
                                                                                  function () {
                                                                                      return n.abort()
                                                                                  },
                                                                                  u.perAPIcallTimeout
                                                                              )),
                                                                          (i.signal =
                                                                              n.signal))
                                                                        : ((n =
                                                                              new AbortController()),
                                                                          (s =
                                                                              setTimeout(
                                                                                  function () {
                                                                                      return n.abort()
                                                                                  },
                                                                                  u.perAPIcallTimeout
                                                                              )),
                                                                          (i.signal =
                                                                              n.signal)),
                                                                    (e.next = 4),
                                                                    fetch(t, i)
                                                                )
                                                            case 4:
                                                                if (
                                                                    !(c =
                                                                        e.sent)
                                                                        .ok &&
                                                                    c.status >
                                                                        400 &&
                                                                    c.status <=
                                                                        599
                                                                ) {
                                                                    e.next = 10
                                                                    break
                                                                }
                                                                return (
                                                                    clearTimeout(
                                                                        s
                                                                    ),
                                                                    e.abrupt(
                                                                        'return',
                                                                        { v: c }
                                                                    )
                                                                )
                                                            case 10:
                                                                throw (
                                                                    ((a = c),
                                                                    clearTimeout(
                                                                        s
                                                                    ),
                                                                    Error(
                                                                        'Response Gave a non OK status code'
                                                                    ))
                                                                )
                                                            case 13:
                                                                e.next = 19
                                                                break
                                                            case 15:
                                                                return (
                                                                    (e.prev = 15),
                                                                    (e.t0 =
                                                                        e.catch(
                                                                            0
                                                                        )),
                                                                    (e.next = 19),
                                                                    u.sleep(
                                                                        u.timeBtw2RetryRequest
                                                                    )
                                                                )
                                                            case 19:
                                                                return (
                                                                    (e.prev = 19),
                                                                    (o -= 1),
                                                                    e.finish(19)
                                                                )
                                                            case 22:
                                                            case 'end':
                                                                return e.stop()
                                                        }
                                                },
                                                e,
                                                null,
                                                [[0, 15, 19, 22]]
                                            )
                                        }))
                                case 4:
                                    if (!(o > 0)) {
                                        e.next = 11
                                        break
                                    }
                                    return e.delegateYield(s(), 't0', 6)
                                case 6:
                                    if ('object' !== $e((c = e.t0))) {
                                        e.next = 9
                                        break
                                    }
                                    return e.abrupt('return', c.v)
                                case 9:
                                    e.next = 4
                                    break
                                case 11:
                                    throw new A(
                                        'Error in fetching API | Too many retries with status : '.concat(
                                            null === (n = a) || void 0 === n
                                                ? void 0
                                                : n.status
                                        ),
                                        new URL(t).pathname
                                    )
                                case 12:
                                case 'end':
                                    return e.stop()
                            }
                    },
                    e,
                    this
                )
            })
        )).apply(this, arguments)
    }
    function xt() {
        return kt.apply(this, arguments)
    }
    function kt() {
        return (kt = rt(
            et().mark(function e() {
                var t
                return et().wrap(
                    function (e) {
                        for (;;)
                            switch ((e.prev = e.next)) {
                                case 0:
                                    return (
                                        (e.next = 2),
                                        ct(this, dt, wt).call(
                                            this,
                                            r.cdn.getInAppSegments.replace(
                                                '{appName}',
                                                r.pushParams.an
                                            ),
                                            {
                                                method: 'POST',
                                                headers: {
                                                    Authorization:
                                                        'Bearer '.concat(
                                                            r.pushParams.aid
                                                        ),
                                                    AuthTokenType:
                                                        'FCM_WEBCLIENT',
                                                    version: 'v2',
                                                    'Content-Type':
                                                        'application/json',
                                                },
                                                body: JSON.stringify({
                                                    deviceId:
                                                        r.pushParams.token,
                                                }),
                                            }
                                        )
                                    )
                                case 2:
                                    return (
                                        (t = e.sent),
                                        e.abrupt('return', t.json())
                                    )
                                case 4:
                                case 'end':
                                    return e.stop()
                            }
                    },
                    e,
                    this
                )
            })
        )).apply(this, arguments)
    }
    function Et() {
        return St.apply(this, arguments)
    }
    function St() {
        return (St = rt(
            et().mark(function e() {
                var t
                return et().wrap(
                    function (e) {
                        for (;;)
                            switch ((e.prev = e.next)) {
                                case 0:
                                    return (
                                        (e.next = 2),
                                        ct(this, dt, wt).call(
                                            this,
                                            r.cdn.getNativeDisplaySegments.replace(
                                                '{appName}',
                                                r.pushParams.an
                                            ),
                                            {
                                                method: 'POST',
                                                headers: {
                                                    Authorization:
                                                        'Bearer '.concat(
                                                            r.pushParams.aid
                                                        ),
                                                    AuthTokenType:
                                                        'FCM_WEBCLIENT',
                                                    version: 'v2',
                                                    'Content-Type':
                                                        'application/json',
                                                },
                                                body: JSON.stringify({
                                                    deviceId:
                                                        r.pushParams.token,
                                                }),
                                            }
                                        )
                                    )
                                case 2:
                                    return (t = e.sent), (e.next = 5), t.json()
                                case 5:
                                    return e.abrupt('return', e.sent)
                                case 6:
                                case 'end':
                                    return e.stop()
                            }
                    },
                    e,
                    this
                )
            })
        )).apply(this, arguments)
    }
    function Lt(e) {
        return e.serverEventToCampaign &&
            0 != Object.keys(e.serverEventToCampaign).length
            ? ('App Launched' in e.eventToCampaign ||
                  (e.eventToCampaign['App Launched'] = Object.values(
                      e.serverEventToCampaign
                  )[0]),
              e)
            : e
    }
    const Ot = {
        randomUUID:
            'undefined' != typeof crypto &&
            crypto.randomUUID &&
            crypto.randomUUID.bind(crypto),
    }
    let Pt
    const Ct = new Uint8Array(16)
    function Tt() {
        if (
            !Pt &&
            ((Pt =
                'undefined' != typeof crypto &&
                crypto.getRandomValues &&
                crypto.getRandomValues.bind(crypto)),
            !Pt)
        )
            throw new Error(
                'crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported'
            )
        return Pt(Ct)
    }
    const Nt = []
    for (let e = 0; e < 256; ++e) Nt.push((e + 256).toString(16).slice(1))
    const It = function (e, t, r) {
            if (Ot.randomUUID && !t && !e) return Ot.randomUUID()
            const n = (e = e || {}).random || (e.rng || Tt)()
            if (((n[6] = (15 & n[6]) | 64), (n[8] = (63 & n[8]) | 128), t)) {
                r = r || 0
                for (let e = 0; e < 16; ++e) t[r + e] = n[e]
                return t
            }
            return (function (e, t = 0) {
                return (
                    Nt[e[t + 0]] +
                    Nt[e[t + 1]] +
                    Nt[e[t + 2]] +
                    Nt[e[t + 3]] +
                    '-' +
                    Nt[e[t + 4]] +
                    Nt[e[t + 5]] +
                    '-' +
                    Nt[e[t + 6]] +
                    Nt[e[t + 7]] +
                    '-' +
                    Nt[e[t + 8]] +
                    Nt[e[t + 9]] +
                    '-' +
                    Nt[e[t + 10]] +
                    Nt[e[t + 11]] +
                    Nt[e[t + 12]] +
                    Nt[e[t + 13]] +
                    Nt[e[t + 14]] +
                    Nt[e[t + 15]]
                )
            })(n)
        },
        jt =
            'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBVcGxvYWRlZCB0bzogU1ZHIFJlcG8sIHd3dy5zdmdyZXBvLmNvbSwgR2VuZXJhdG9yOiBTVkcgUmVwbyBNaXhlciBUb29scyAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIGZpbGw9IiMwMDAwMDAiIHZlcnNpb249IjEuMSIgaWQ9IkNhcGFfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgDQoJIHdpZHRoPSI4MDBweCIgaGVpZ2h0PSI4MDBweCIgdmlld0JveD0iMCAwIDkzLjkzNCA5My45MzQiDQoJIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPHBhdGggZD0iTTgwLjE3OCwxMy43NTdjLTE4LjM0MS0xOC4zNDItNDguMDgtMTguMzQyLTY2LjQyMSwwYy0xOC4zNDIsMTguMzQxLTE4LjM0Miw0OC4wOCwwLDY2LjQyMQ0KCQljMTguMzQxLDE4LjM0Miw0OC4wOCwxOC4zNDIsNjYuNDIxLDBDOTguNTIsNjEuODM2LDk4LjUyLDMyLjA5OCw4MC4xNzgsMTMuNzU3eiBNNzEuNTc2LDYxLjczN2wtOS44MzgsOS44MzhsLTE0Ljc3MS0xNC43Nw0KCQlsLTE0Ljc3MSwxNC43N2wtOS44MzgtOS44MzhsMTQuNzctMTQuNzcxbC0xNC43Ny0xNC43NzFsOS44MzgtOS44MzhsMTQuNzcxLDE0Ljc3MWwxNC43NzEtMTQuNzcxbDkuODM4LDkuODM4bC0xNC43NywxNC43NzINCgkJTDcxLjU3Niw2MS43Mzd6Ii8+DQo8L2c+DQo8L3N2Zz4='
    function Mt(e) {
        return (
            (Mt =
                'function' == typeof Symbol &&
                'symbol' == typeof Symbol.iterator
                    ? function (e) {
                          return typeof e
                      }
                    : function (e) {
                          return e &&
                              'function' == typeof Symbol &&
                              e.constructor === Symbol &&
                              e !== Symbol.prototype
                              ? 'symbol'
                              : typeof e
                      }),
            Mt(e)
        )
    }
    function _t(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r]
            ;(n.enumerable = n.enumerable || !1),
                (n.configurable = !0),
                'value' in n && (n.writable = !0),
                Object.defineProperty(e, zt(n.key), n)
        }
    }
    function At(e) {
        if (void 0 === e)
            throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
            )
        return e
    }
    function Dt(e) {
        var t = 'function' == typeof Map ? new Map() : void 0
        return (
            (Dt = function (e) {
                if (
                    null === e ||
                    ((r = e),
                    -1 === Function.toString.call(r).indexOf('[native code]'))
                )
                    return e
                var r
                if ('function' != typeof e)
                    throw new TypeError(
                        'Super expression must either be null or a function'
                    )
                if (void 0 !== t) {
                    if (t.has(e)) return t.get(e)
                    t.set(e, n)
                }
                function n() {
                    return Rt(e, arguments, Vt(this).constructor)
                }
                return (
                    (n.prototype = Object.create(e.prototype, {
                        constructor: {
                            value: n,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0,
                        },
                    })),
                    Gt(n, e)
                )
            }),
            Dt(e)
        )
    }
    function Rt(e, t, r) {
        return (
            (Rt = Bt()
                ? Reflect.construct.bind()
                : function (e, t, r) {
                      var n = [null]
                      n.push.apply(n, t)
                      var o = new (Function.bind.apply(e, n))()
                      return r && Gt(o, r.prototype), o
                  }),
            Rt.apply(null, arguments)
        )
    }
    function Bt() {
        if ('undefined' == typeof Reflect || !Reflect.construct) return !1
        if (Reflect.construct.sham) return !1
        if ('function' == typeof Proxy) return !0
        try {
            return (
                Boolean.prototype.valueOf.call(
                    Reflect.construct(Boolean, [], function () {})
                ),
                !0
            )
        } catch (e) {
            return !1
        }
    }
    function Gt(e, t) {
        return (
            (Gt = Object.setPrototypeOf
                ? Object.setPrototypeOf.bind()
                : function (e, t) {
                      return (e.__proto__ = t), e
                  }),
            Gt(e, t)
        )
    }
    function Vt(e) {
        return (
            (Vt = Object.setPrototypeOf
                ? Object.getPrototypeOf.bind()
                : function (e) {
                      return e.__proto__ || Object.getPrototypeOf(e)
                  }),
            Vt(e)
        )
    }
    function Ft(e, t, r) {
        return (
            (t = zt(t)) in e
                ? Object.defineProperty(e, t, {
                      value: r,
                      enumerable: !0,
                      configurable: !0,
                      writable: !0,
                  })
                : (e[t] = r),
            e
        )
    }
    function zt(e) {
        var t = (function (e, t) {
            if ('object' !== Mt(e) || null === e) return e
            var r = e[Symbol.toPrimitive]
            if (void 0 !== r) {
                var n = r.call(e, 'string')
                if ('object' !== Mt(n)) return n
                throw new TypeError(
                    '@@toPrimitive must return a primitive value.'
                )
            }
            return String(e)
        })(e)
        return 'symbol' === Mt(t) ? t : String(t)
    }
    var Wt = (function (e) {
        !(function (e, t) {
            if ('function' != typeof t && null !== t)
                throw new TypeError(
                    'Super expression must either be null or a function'
                )
            ;(e.prototype = Object.create(t && t.prototype, {
                constructor: { value: e, writable: !0, configurable: !0 },
            })),
                Object.defineProperty(e, 'prototype', { writable: !1 }),
                t && Gt(e, t)
        })(i, e)
        var t,
            r,
            n,
            o,
            a =
                ((n = i),
                (o = Bt()),
                function () {
                    var e,
                        t = Vt(n)
                    if (o) {
                        var r = Vt(this).constructor
                        e = Reflect.construct(t, arguments, r)
                    } else e = t.apply(this, arguments)
                    return (function (e, t) {
                        if (t && ('object' === Mt(t) || 'function' == typeof t))
                            return t
                        if (void 0 !== t)
                            throw new TypeError(
                                'Derived constructors may only return object or undefined'
                            )
                        return At(e)
                    })(this, e)
                })
        function i() {
            var e
            return (
                (function (e, t) {
                    if (!(e instanceof t))
                        throw new TypeError('Cannot call a class as a function')
                })(this, i),
                Ft(At((e = a.call(this))), '__campaign_details', null),
                Ft(At(e), 'shadow', null),
                (e.shadow = e.attachShadow({ mode: 'open' })),
                e
            )
        }
        return (
            (t = i),
            (r = [
                {
                    key: 'campaign',
                    set: function (e) {
                        null === this.__campaign_details &&
                            ((this.__campaign_details = e), this.render())
                    },
                },
                {
                    key: 'render',
                    value: function () {
                        var e = this,
                            t = this
                        this.shadow.innerHTML = this.getContent()
                        var r = this.__campaign_details.payload.imgClickUrl,
                            n = this.__campaign_details.payload.imgClickAction
                                ? this.__campaign_details.payload.imgClickAction.toUpperCase()
                                : null,
                            o = this,
                            a = this.shadow.querySelector('.centered-image')
                        if (
                            (n &&
                                ((a.style.cursor = 'pointer'),
                                a.addEventListener('click', function () {
                                    if ('' !== r && 'OPENURL' == n)
                                        window.open(r, '_blank'), o.remove()
                                    else if ('CLOSENOTIFICATION' == n)
                                        o.remove()
                                    else if ('CUSTOMKEYVALUEPAIR' == n) {
                                        var e = new CustomEvent(
                                            'IN_APP_NOTIFICATION_CLICKED_PINC',
                                            {
                                                bubbles: !0,
                                                detail: t.__campaign_details,
                                            }
                                        )
                                        document.dispatchEvent(e), o.remove()
                                    }
                                    window.JioPush.raiseNotificationClicked(
                                        t.__campaign_details
                                    )
                                })),
                            this.__campaign_details.payload.clsIcnEnb)
                        ) {
                            this.positionCloseButton()
                            var i = this.shadow.querySelector('.close-button')
                            i.style.display = 'block'
                            var s = this
                            i.addEventListener('click', function () {
                                s.remove()
                            })
                        }
                        setTimeout(function () {
                            window.JioPush.raiseNotificationViewed(
                                e.__campaign_details
                            )
                        }, 5e3)
                    },
                },
                {
                    key: 'positionCloseButton',
                    value: function () {
                        var e = this,
                            t = e.shadow.querySelector('img'),
                            r = e.shadow.querySelector('.close-button')
                        window.addEventListener('resize', function () {
                            var n = window
                                    .getComputedStyle(t)
                                    .getPropertyValue('object-position')
                                    .split(' '),
                                o = e.getRenderedSize(
                                    !0,
                                    t.width,
                                    t.height,
                                    t.naturalWidth,
                                    t.naturalHeight,
                                    parseInt(n[0])
                                ),
                                a = o.left,
                                i = o.top
                            ;(r.style.top = ''.concat(i, 'px')),
                                (r.style.right = ''.concat(a - 24, 'px'))
                        }),
                            t.addEventListener('load', function () {
                                var n = window
                                        .getComputedStyle(t)
                                        .getPropertyValue('object-position')
                                        .split(' '),
                                    o = e.getRenderedSize(
                                        !0,
                                        t.width,
                                        t.height,
                                        t.naturalWidth,
                                        t.naturalHeight,
                                        parseInt(n[0])
                                    ),
                                    a = o.left,
                                    i = o.top
                                ;(r.style.top = ''.concat(i, 'px')),
                                    (r.style.right = ''.concat(a - 24, 'px'))
                            })
                    },
                },
                {
                    key: 'getRenderedSize',
                    value: function (e, t, r, n, o, a) {
                        var i = {},
                            s = n / o,
                            c = t / r
                        return (
                            (e ? s > c : s < c)
                                ? ((i.width = t), (i.height = t / s))
                                : ((i.width = r * s), (i.height = r)),
                            (i.top = (r - i.height) / 2),
                            (i.left = (t - i.width) * (a / 100)),
                            (i.right = i.width + i.left),
                            i
                        )
                    },
                },
                {
                    key: 'getContent',
                    value: function () {
                        return '\n    <style>\n      .backdrop {\n        position: fixed;\n        top: 0;\n        left: 0;\n        width: 100%;\n        height: 100%;\n        background-color: rgba(0, 0, 0, 0.7);\n        display: flex;\n        justify-content: center;\n        align-items: center;\n        z-index: 9999;\n      }\n\n      .centered-image-container {\n        position: relative;\n        width: 80vw;\n        height: 80vh;\n      }\n\n      .centered-image {\n        width: 80vw;\n        height: 80vh;\n        object-fit: contain;\n        cursor: auto;\n      }\n\n      .close-button {\n        -webkit-mask: url('
                            .concat(
                                jt,
                                ') no-repeat 100% 100%;\n        mask: url('
                            )
                            .concat(
                                jt,
                                ') no-repeat 100% 100%;\n        -webkit-mask-size: cover;\n        mask-size: cover;\n        background-color: white;\n        width: 24px;\n        height: 24px;\n        position: absolute;\n        top: 0px;\n        right: 0px;\n        transform: translate(-50%, -50%);\n        cursor: pointer;\n        z-index: 10000;\n        display: none;\n        position: absolute;\n      }\n    </style>\n    <div class="backdrop">\n      <div class="centered-image-container">\n        <img class="centered-image" src='
                            )
                            .concat(
                                this.__campaign_details.payload.media[0].media,
                                ' alt="Centered Image">\n        <div class="close-button"></div>\n      </div>\n    </div>\n  '
                            )
                    },
                },
            ]) && _t(t.prototype, r),
            Object.defineProperty(t, 'prototype', { writable: !1 }),
            i
        )
    })(Dt(HTMLElement))
    function Ut(e) {
        return (
            (Ut =
                'function' == typeof Symbol &&
                'symbol' == typeof Symbol.iterator
                    ? function (e) {
                          return typeof e
                      }
                    : function (e) {
                          return e &&
                              'function' == typeof Symbol &&
                              e.constructor === Symbol &&
                              e !== Symbol.prototype
                              ? 'symbol'
                              : typeof e
                      }),
            Ut(e)
        )
    }
    function Jt() {
        Jt = function () {
            return e
        }
        var e = {},
            t = Object.prototype,
            r = t.hasOwnProperty,
            n =
                Object.defineProperty ||
                function (e, t, r) {
                    e[t] = r.value
                },
            o = 'function' == typeof Symbol ? Symbol : {},
            a = o.iterator || '@@iterator',
            i = o.asyncIterator || '@@asyncIterator',
            s = o.toStringTag || '@@toStringTag'
        function c(e, t, r) {
            return (
                Object.defineProperty(e, t, {
                    value: r,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                }),
                e[t]
            )
        }
        try {
            c({}, '')
        } catch (e) {
            c = function (e, t, r) {
                return (e[t] = r)
            }
        }
        function u(e, t, r, o) {
            var a = t && t.prototype instanceof p ? t : p,
                i = Object.create(a.prototype),
                s = new L(o || [])
            return n(i, '_invoke', { value: x(e, r, s) }), i
        }
        function l(e, t, r) {
            try {
                return { type: 'normal', arg: e.call(t, r) }
            } catch (e) {
                return { type: 'throw', arg: e }
            }
        }
        e.wrap = u
        var f = {}
        function p() {}
        function h() {}
        function d() {}
        var v = {}
        c(v, a, function () {
            return this
        })
        var y = Object.getPrototypeOf,
            g = y && y(y(O([])))
        g && g !== t && r.call(g, a) && (v = g)
        var m = (d.prototype = p.prototype = Object.create(v))
        function w(e) {
            ;['next', 'throw', 'return'].forEach(function (t) {
                c(e, t, function (e) {
                    return this._invoke(t, e)
                })
            })
        }
        function b(e, t) {
            function o(n, a, i, s) {
                var c = l(e[n], e, a)
                if ('throw' !== c.type) {
                    var u = c.arg,
                        f = u.value
                    return f && 'object' == Ut(f) && r.call(f, '__await')
                        ? t.resolve(f.__await).then(
                              function (e) {
                                  o('next', e, i, s)
                              },
                              function (e) {
                                  o('throw', e, i, s)
                              }
                          )
                        : t.resolve(f).then(
                              function (e) {
                                  ;(u.value = e), i(u)
                              },
                              function (e) {
                                  return o('throw', e, i, s)
                              }
                          )
                }
                s(c.arg)
            }
            var a
            n(this, '_invoke', {
                value: function (e, r) {
                    function n() {
                        return new t(function (t, n) {
                            o(e, r, t, n)
                        })
                    }
                    return (a = a ? a.then(n, n) : n())
                },
            })
        }
        function x(e, t, r) {
            var n = 'suspendedStart'
            return function (o, a) {
                if ('executing' === n)
                    throw new Error('Generator is already running')
                if ('completed' === n) {
                    if ('throw' === o) throw a
                    return { value: void 0, done: !0 }
                }
                for (r.method = o, r.arg = a; ; ) {
                    var i = r.delegate
                    if (i) {
                        var s = k(i, r)
                        if (s) {
                            if (s === f) continue
                            return s
                        }
                    }
                    if ('next' === r.method) r.sent = r._sent = r.arg
                    else if ('throw' === r.method) {
                        if ('suspendedStart' === n)
                            throw ((n = 'completed'), r.arg)
                        r.dispatchException(r.arg)
                    } else 'return' === r.method && r.abrupt('return', r.arg)
                    n = 'executing'
                    var c = l(e, t, r)
                    if ('normal' === c.type) {
                        if (
                            ((n = r.done ? 'completed' : 'suspendedYield'),
                            c.arg === f)
                        )
                            continue
                        return { value: c.arg, done: r.done }
                    }
                    'throw' === c.type &&
                        ((n = 'completed'),
                        (r.method = 'throw'),
                        (r.arg = c.arg))
                }
            }
        }
        function k(e, t) {
            var r = t.method,
                n = e.iterator[r]
            if (void 0 === n)
                return (
                    (t.delegate = null),
                    ('throw' === r &&
                        e.iterator.return &&
                        ((t.method = 'return'),
                        (t.arg = void 0),
                        k(e, t),
                        'throw' === t.method)) ||
                        ('return' !== r &&
                            ((t.method = 'throw'),
                            (t.arg = new TypeError(
                                "The iterator does not provide a '" +
                                    r +
                                    "' method"
                            )))),
                    f
                )
            var o = l(n, e.iterator, t.arg)
            if ('throw' === o.type)
                return (
                    (t.method = 'throw'),
                    (t.arg = o.arg),
                    (t.delegate = null),
                    f
                )
            var a = o.arg
            return a
                ? a.done
                    ? ((t[e.resultName] = a.value),
                      (t.next = e.nextLoc),
                      'return' !== t.method &&
                          ((t.method = 'next'), (t.arg = void 0)),
                      (t.delegate = null),
                      f)
                    : a
                : ((t.method = 'throw'),
                  (t.arg = new TypeError('iterator result is not an object')),
                  (t.delegate = null),
                  f)
        }
        function E(e) {
            var t = { tryLoc: e[0] }
            1 in e && (t.catchLoc = e[1]),
                2 in e && ((t.finallyLoc = e[2]), (t.afterLoc = e[3])),
                this.tryEntries.push(t)
        }
        function S(e) {
            var t = e.completion || {}
            ;(t.type = 'normal'), delete t.arg, (e.completion = t)
        }
        function L(e) {
            ;(this.tryEntries = [{ tryLoc: 'root' }]),
                e.forEach(E, this),
                this.reset(!0)
        }
        function O(e) {
            if (e) {
                var t = e[a]
                if (t) return t.call(e)
                if ('function' == typeof e.next) return e
                if (!isNaN(e.length)) {
                    var n = -1,
                        o = function t() {
                            for (; ++n < e.length; )
                                if (r.call(e, n))
                                    return (t.value = e[n]), (t.done = !1), t
                            return (t.value = void 0), (t.done = !0), t
                        }
                    return (o.next = o)
                }
            }
            return { next: P }
        }
        function P() {
            return { value: void 0, done: !0 }
        }
        return (
            (h.prototype = d),
            n(m, 'constructor', { value: d, configurable: !0 }),
            n(d, 'constructor', { value: h, configurable: !0 }),
            (h.displayName = c(d, s, 'GeneratorFunction')),
            (e.isGeneratorFunction = function (e) {
                var t = 'function' == typeof e && e.constructor
                return (
                    !!t &&
                    (t === h ||
                        'GeneratorFunction' === (t.displayName || t.name))
                )
            }),
            (e.mark = function (e) {
                return (
                    Object.setPrototypeOf
                        ? Object.setPrototypeOf(e, d)
                        : ((e.__proto__ = d), c(e, s, 'GeneratorFunction')),
                    (e.prototype = Object.create(m)),
                    e
                )
            }),
            (e.awrap = function (e) {
                return { __await: e }
            }),
            w(b.prototype),
            c(b.prototype, i, function () {
                return this
            }),
            (e.AsyncIterator = b),
            (e.async = function (t, r, n, o, a) {
                void 0 === a && (a = Promise)
                var i = new b(u(t, r, n, o), a)
                return e.isGeneratorFunction(r)
                    ? i
                    : i.next().then(function (e) {
                          return e.done ? e.value : i.next()
                      })
            }),
            w(m),
            c(m, s, 'Generator'),
            c(m, a, function () {
                return this
            }),
            c(m, 'toString', function () {
                return '[object Generator]'
            }),
            (e.keys = function (e) {
                var t = Object(e),
                    r = []
                for (var n in t) r.push(n)
                return (
                    r.reverse(),
                    function e() {
                        for (; r.length; ) {
                            var n = r.pop()
                            if (n in t) return (e.value = n), (e.done = !1), e
                        }
                        return (e.done = !0), e
                    }
                )
            }),
            (e.values = O),
            (L.prototype = {
                constructor: L,
                reset: function (e) {
                    if (
                        ((this.prev = 0),
                        (this.next = 0),
                        (this.sent = this._sent = void 0),
                        (this.done = !1),
                        (this.delegate = null),
                        (this.method = 'next'),
                        (this.arg = void 0),
                        this.tryEntries.forEach(S),
                        !e)
                    )
                        for (var t in this)
                            't' === t.charAt(0) &&
                                r.call(this, t) &&
                                !isNaN(+t.slice(1)) &&
                                (this[t] = void 0)
                },
                stop: function () {
                    this.done = !0
                    var e = this.tryEntries[0].completion
                    if ('throw' === e.type) throw e.arg
                    return this.rval
                },
                dispatchException: function (e) {
                    if (this.done) throw e
                    var t = this
                    function n(r, n) {
                        return (
                            (i.type = 'throw'),
                            (i.arg = e),
                            (t.next = r),
                            n && ((t.method = 'next'), (t.arg = void 0)),
                            !!n
                        )
                    }
                    for (var o = this.tryEntries.length - 1; o >= 0; --o) {
                        var a = this.tryEntries[o],
                            i = a.completion
                        if ('root' === a.tryLoc) return n('end')
                        if (a.tryLoc <= this.prev) {
                            var s = r.call(a, 'catchLoc'),
                                c = r.call(a, 'finallyLoc')
                            if (s && c) {
                                if (this.prev < a.catchLoc)
                                    return n(a.catchLoc, !0)
                                if (this.prev < a.finallyLoc)
                                    return n(a.finallyLoc)
                            } else if (s) {
                                if (this.prev < a.catchLoc)
                                    return n(a.catchLoc, !0)
                            } else {
                                if (!c)
                                    throw new Error(
                                        'try statement without catch or finally'
                                    )
                                if (this.prev < a.finallyLoc)
                                    return n(a.finallyLoc)
                            }
                        }
                    }
                },
                abrupt: function (e, t) {
                    for (var n = this.tryEntries.length - 1; n >= 0; --n) {
                        var o = this.tryEntries[n]
                        if (
                            o.tryLoc <= this.prev &&
                            r.call(o, 'finallyLoc') &&
                            this.prev < o.finallyLoc
                        ) {
                            var a = o
                            break
                        }
                    }
                    a &&
                        ('break' === e || 'continue' === e) &&
                        a.tryLoc <= t &&
                        t <= a.finallyLoc &&
                        (a = null)
                    var i = a ? a.completion : {}
                    return (
                        (i.type = e),
                        (i.arg = t),
                        a
                            ? ((this.method = 'next'),
                              (this.next = a.finallyLoc),
                              f)
                            : this.complete(i)
                    )
                },
                complete: function (e, t) {
                    if ('throw' === e.type) throw e.arg
                    return (
                        'break' === e.type || 'continue' === e.type
                            ? (this.next = e.arg)
                            : 'return' === e.type
                              ? ((this.rval = this.arg = e.arg),
                                (this.method = 'return'),
                                (this.next = 'end'))
                              : 'normal' === e.type && t && (this.next = t),
                        f
                    )
                },
                finish: function (e) {
                    for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                        var r = this.tryEntries[t]
                        if (r.finallyLoc === e)
                            return (
                                this.complete(r.completion, r.afterLoc), S(r), f
                            )
                    }
                },
                catch: function (e) {
                    for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                        var r = this.tryEntries[t]
                        if (r.tryLoc === e) {
                            var n = r.completion
                            if ('throw' === n.type) {
                                var o = n.arg
                                S(r)
                            }
                            return o
                        }
                    }
                    throw new Error('illegal catch attempt')
                },
                delegateYield: function (e, t, r) {
                    return (
                        (this.delegate = {
                            iterator: O(e),
                            resultName: t,
                            nextLoc: r,
                        }),
                        'next' === this.method && (this.arg = void 0),
                        f
                    )
                },
            }),
            e
        )
    }
    function Kt(e, t) {
        ;(null == t || t > e.length) && (t = e.length)
        for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r]
        return n
    }
    function qt(e, t, r, n, o, a, i) {
        try {
            var s = e[a](i),
                c = s.value
        } catch (e) {
            return void r(e)
        }
        s.done ? t(c) : Promise.resolve(c).then(n, o)
    }
    function Yt(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r]
            ;(n.enumerable = n.enumerable || !1),
                (n.configurable = !0),
                'value' in n && (n.writable = !0),
                Object.defineProperty(e, rr(n.key), n)
        }
    }
    function Ht(e) {
        if (void 0 === e)
            throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
            )
        return e
    }
    function Qt(e) {
        var t = 'function' == typeof Map ? new Map() : void 0
        return (
            (Qt = function (e) {
                if (
                    null === e ||
                    ((r = e),
                    -1 === Function.toString.call(r).indexOf('[native code]'))
                )
                    return e
                var r
                if ('function' != typeof e)
                    throw new TypeError(
                        'Super expression must either be null or a function'
                    )
                if (void 0 !== t) {
                    if (t.has(e)) return t.get(e)
                    t.set(e, n)
                }
                function n() {
                    return Zt(e, arguments, er(this).constructor)
                }
                return (
                    (n.prototype = Object.create(e.prototype, {
                        constructor: {
                            value: n,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0,
                        },
                    })),
                    $t(n, e)
                )
            }),
            Qt(e)
        )
    }
    function Zt(e, t, r) {
        return (
            (Zt = Xt()
                ? Reflect.construct.bind()
                : function (e, t, r) {
                      var n = [null]
                      n.push.apply(n, t)
                      var o = new (Function.bind.apply(e, n))()
                      return r && $t(o, r.prototype), o
                  }),
            Zt.apply(null, arguments)
        )
    }
    function Xt() {
        if ('undefined' == typeof Reflect || !Reflect.construct) return !1
        if (Reflect.construct.sham) return !1
        if ('function' == typeof Proxy) return !0
        try {
            return (
                Boolean.prototype.valueOf.call(
                    Reflect.construct(Boolean, [], function () {})
                ),
                !0
            )
        } catch (e) {
            return !1
        }
    }
    function $t(e, t) {
        return (
            ($t = Object.setPrototypeOf
                ? Object.setPrototypeOf.bind()
                : function (e, t) {
                      return (e.__proto__ = t), e
                  }),
            $t(e, t)
        )
    }
    function er(e) {
        return (
            (er = Object.setPrototypeOf
                ? Object.getPrototypeOf.bind()
                : function (e) {
                      return e.__proto__ || Object.getPrototypeOf(e)
                  }),
            er(e)
        )
    }
    function tr(e, t, r) {
        return (
            (t = rr(t)) in e
                ? Object.defineProperty(e, t, {
                      value: r,
                      enumerable: !0,
                      configurable: !0,
                      writable: !0,
                  })
                : (e[t] = r),
            e
        )
    }
    function rr(e) {
        var t = (function (e, t) {
            if ('object' !== Ut(e) || null === e) return e
            var r = e[Symbol.toPrimitive]
            if (void 0 !== r) {
                var n = r.call(e, 'string')
                if ('object' !== Ut(n)) return n
                throw new TypeError(
                    '@@toPrimitive must return a primitive value.'
                )
            }
            return String(e)
        })(e)
        return 'symbol' === Ut(t) ? t : String(t)
    }
    void 0 === customElements.get('jio-push-interstitial-inapp') &&
        customElements.define('jio-push-interstitial-inapp', Wt)
    var nr = (function (e) {
        !(function (e, t) {
            if ('function' != typeof t && null !== t)
                throw new TypeError(
                    'Super expression must either be null or a function'
                )
            ;(e.prototype = Object.create(t && t.prototype, {
                constructor: { value: e, writable: !0, configurable: !0 },
            })),
                Object.defineProperty(e, 'prototype', { writable: !1 }),
                t && $t(e, t)
        })(i, e)
        var t,
            r,
            n,
            o,
            a =
                ((n = i),
                (o = Xt()),
                function () {
                    var e,
                        t = er(n)
                    if (o) {
                        var r = er(this).constructor
                        e = Reflect.construct(t, arguments, r)
                    } else e = t.apply(this, arguments)
                    return (function (e, t) {
                        if (t && ('object' === Ut(t) || 'function' == typeof t))
                            return t
                        if (void 0 !== t)
                            throw new TypeError(
                                'Derived constructors may only return object or undefined'
                            )
                        return Ht(e)
                    })(this, e)
                })
        function i() {
            var e
            return (
                (function (e, t) {
                    if (!(e instanceof t))
                        throw new TypeError('Cannot call a class as a function')
                })(this, i),
                tr(Ht((e = a.call(this))), '__campaign_details', null),
                tr(Ht(e), 'shadow', null),
                (e.shadow = e.attachShadow({ mode: 'open' })),
                e
            )
        }
        return (
            (t = i),
            (r = [
                {
                    key: 'campaign',
                    set: function (e) {
                        null === this.__campaign_details &&
                            ((this.__campaign_details = e), this.render())
                    },
                },
                {
                    key: 'render',
                    value: function () {
                        var e = this
                        if (
                            ((this.shadow.innerHTML = this.getContent()),
                            this.__campaign_details.payload.clsIcnEnb)
                        ) {
                            var t = this.shadow.querySelector('.close-button')
                            t.style.display = 'block'
                            var r = this
                            t.addEventListener('click', function () {
                                r.remove()
                            })
                        } else {
                            var n = this.shadow.querySelector('.backdrop')
                            n.style.cursor = 'pointer'
                            var o = this
                            n.addEventListener('click', function () {
                                o.remove()
                            })
                        }
                        this.shadow
                            .querySelector('.centered-container iframe')
                            .addEventListener('load', function () {
                                e.registerMessageHandler()
                            }),
                            setTimeout(function () {
                                window.JioPush.raiseNotificationViewed(
                                    e.__campaign_details
                                )
                            }, 5e3)
                    },
                },
                {
                    key: 'registerMessageHandler',
                    value: function () {
                        var e = this,
                            t = this.shadow.querySelector(
                                '.centered-container iframe'
                            ).contentWindow
                        window.addEventListener(
                            'message',
                            (function () {
                                var r,
                                    n =
                                        ((r = Jt().mark(function r(n) {
                                            var o, a, i, s, c, u, l, f
                                            return Jt().wrap(
                                                function (r) {
                                                    for (;;)
                                                        switch (
                                                            (r.prev = r.next)
                                                        ) {
                                                            case 0:
                                                                if (
                                                                    n.source ===
                                                                    t
                                                                ) {
                                                                    r.next = 2
                                                                    break
                                                                }
                                                                return r.abrupt(
                                                                    'return'
                                                                )
                                                            case 2:
                                                                ;(o = n.data),
                                                                    (a =
                                                                        o.type),
                                                                    (i =
                                                                        o.functionCallData),
                                                                    (s =
                                                                        o.requestId),
                                                                    (r.t0 = a),
                                                                    (r.next =
                                                                        'CALL_SDK_FUCNTIONS' ===
                                                                        r.t0
                                                                            ? 6
                                                                            : 'CLOSE_NOTIFICATION' ===
                                                                                r.t0
                                                                              ? 18
                                                                              : 19)
                                                                break
                                                            case 6:
                                                                return (
                                                                    (r.prev = 6),
                                                                    (u =
                                                                        i.functionName),
                                                                    (l =
                                                                        i.args),
                                                                    (r.next = 10),
                                                                    (c =
                                                                        window.JioPush)[
                                                                        u
                                                                    ].apply(
                                                                        c,
                                                                        (function (
                                                                            e
                                                                        ) {
                                                                            if (
                                                                                Array.isArray(
                                                                                    e
                                                                                )
                                                                            )
                                                                                return Kt(
                                                                                    e
                                                                                )
                                                                        })(
                                                                            (p =
                                                                                l)
                                                                        ) ||
                                                                            (function (
                                                                                e
                                                                            ) {
                                                                                if (
                                                                                    ('undefined' !=
                                                                                        typeof Symbol &&
                                                                                        null !=
                                                                                            e[
                                                                                                Symbol
                                                                                                    .iterator
                                                                                            ]) ||
                                                                                    null !=
                                                                                        e[
                                                                                            '@@iterator'
                                                                                        ]
                                                                                )
                                                                                    return Array.from(
                                                                                        e
                                                                                    )
                                                                            })(
                                                                                p
                                                                            ) ||
                                                                            (function (
                                                                                e,
                                                                                t
                                                                            ) {
                                                                                if (
                                                                                    e
                                                                                ) {
                                                                                    if (
                                                                                        'string' ==
                                                                                        typeof e
                                                                                    )
                                                                                        return Kt(
                                                                                            e,
                                                                                            t
                                                                                        )
                                                                                    var r =
                                                                                        Object.prototype.toString
                                                                                            .call(
                                                                                                e
                                                                                            )
                                                                                            .slice(
                                                                                                8,
                                                                                                -1
                                                                                            )
                                                                                    return (
                                                                                        'Object' ===
                                                                                            r &&
                                                                                            e.constructor &&
                                                                                            (r =
                                                                                                e
                                                                                                    .constructor
                                                                                                    .name),
                                                                                        'Map' ===
                                                                                            r ||
                                                                                        'Set' ===
                                                                                            r
                                                                                            ? Array.from(
                                                                                                  e
                                                                                              )
                                                                                            : 'Arguments' ===
                                                                                                    r ||
                                                                                                /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(
                                                                                                    r
                                                                                                )
                                                                                              ? Kt(
                                                                                                    e,
                                                                                                    t
                                                                                                )
                                                                                              : void 0
                                                                                    )
                                                                                }
                                                                            })(
                                                                                p
                                                                            ) ||
                                                                            (function () {
                                                                                throw new TypeError(
                                                                                    'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
                                                                                )
                                                                            })()
                                                                    )
                                                                )
                                                            case 10:
                                                                ;(f = r.sent),
                                                                    n.source.postMessage(
                                                                        {
                                                                            type: 'SDK_RESPONSE',
                                                                            requestId:
                                                                                s,
                                                                            result: f,
                                                                        },
                                                                        n.origin
                                                                    ),
                                                                    (r.next = 17)
                                                                break
                                                            case 14:
                                                                ;(r.prev = 14),
                                                                    (r.t1 =
                                                                        r.catch(
                                                                            6
                                                                        )),
                                                                    n.source.postMessage(
                                                                        {
                                                                            type: 'SDK_RESPONSE',
                                                                            requestId:
                                                                                s,
                                                                            error: r
                                                                                .t1
                                                                                .message,
                                                                        },
                                                                        n.origin
                                                                    )
                                                            case 17:
                                                                return r.abrupt(
                                                                    'break',
                                                                    19
                                                                )
                                                            case 18:
                                                                e.remove()
                                                            case 19:
                                                            case 'end':
                                                                return r.stop()
                                                        }
                                                    var p
                                                },
                                                r,
                                                null,
                                                [[6, 14]]
                                            )
                                        })),
                                        function () {
                                            var e = this,
                                                t = arguments
                                            return new Promise(function (n, o) {
                                                var a = r.apply(e, t)
                                                function i(e) {
                                                    qt(a, n, o, i, s, 'next', e)
                                                }
                                                function s(e) {
                                                    qt(
                                                        a,
                                                        n,
                                                        o,
                                                        i,
                                                        s,
                                                        'throw',
                                                        e
                                                    )
                                                }
                                                i(void 0)
                                            })
                                        })
                                return function (e) {
                                    return n.apply(this, arguments)
                                }
                            })()
                        )
                    },
                },
                {
                    key: 'getContent',
                    value: function () {
                        return "\n    <style>\n      .backdrop {\n        position: fixed;\n        top: 0;\n        left: 0;\n        width: 100%;\n        height: 100%;\n        background-color: rgba(0, 0, 0, 0.7);\n        display: flex;\n        justify-content: center;\n        align-items: center;\n        z-index: 9999;\n      }\n\n      .centered-container {\n        position: relative;\n        width: 80vw;\n        height: 80vh;\n      }\n\n      .close-button {\n        display: none;\n        position: relative;\n        width: 24px;\n        height: 24px;\n        background-color: white;\n        border-radius: 50%;\n        border: 2px solid black;\n        box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);\n        cursor: pointer;\n        z-index: 10000;\n        overflow: hidden;\n        top: 0px;\n        right: -20px;\n      }\n\n      .close-button::before {\n        content: '';\n        position: absolute;\n        top: 0;\n        left: 0;\n        width: 100%;\n        height: 100%;\n        background-color: red;\n        border-radius: 50%;\n        z-index: -1;\n      }\n\n      .close-button::after {\n        content: '';\n        position: absolute;\n        top: 0;\n        left: 0;\n        width: 100%;\n        height: 100%;\n        background-color: white;\n        -webkit-mask: url("
                            .concat(
                                jt,
                                ') no-repeat 100% 100%;\n        mask: url('
                            )
                            .concat(
                                jt,
                                ') no-repeat 100% 100%;\n        -webkit-mask-size: cover;\n        mask-size: cover;\n        border-radius: 50%;\n      }\n\n      .cross-button-container {\n        position: absolute;\n        top: -15px;\n        right: 10px;\n      }\n    </style>\n    <div class="backdrop">\n      <div class="centered-container">\n        <iframe src='
                            )
                            .concat(
                                this.__campaign_details.payload.inAppHTML.url,
                                ' \n                allowtransparency="true"\n                style='
                            )
                            .concat(
                                this.__campaign_details.payload.inAppHTML
                                    .bgColor
                                    ? 'background-color:white;'
                                    : 'background-color:black;',
                                '\n                width="100%" \n                height="100%" \n                scrollable="true" \n                frameborder="0"\n        >\n        </iframe>\n        <div class="cross-button-container">\n          <div class="close-button"></div>\n        </div>\n      </div>\n    </div>\n  '
                            )
                    },
                },
            ]),
            r && Yt(t.prototype, r),
            Object.defineProperty(t, 'prototype', { writable: !1 }),
            i
        )
    })(Qt(HTMLElement))
    function or(e) {
        return (
            (or =
                'function' == typeof Symbol &&
                'symbol' == typeof Symbol.iterator
                    ? function (e) {
                          return typeof e
                      }
                    : function (e) {
                          return e &&
                              'function' == typeof Symbol &&
                              e.constructor === Symbol &&
                              e !== Symbol.prototype
                              ? 'symbol'
                              : typeof e
                      }),
            or(e)
        )
    }
    function ar(e, t) {
        var r = Object.keys(e)
        if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(e)
            t &&
                (n = n.filter(function (t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable
                })),
                r.push.apply(r, n)
        }
        return r
    }
    function ir(e) {
        for (var t = 1; t < arguments.length; t++) {
            var r = null != arguments[t] ? arguments[t] : {}
            t % 2
                ? ar(Object(r), !0).forEach(function (t) {
                      sr(e, t, r[t])
                  })
                : Object.getOwnPropertyDescriptors
                  ? Object.defineProperties(
                        e,
                        Object.getOwnPropertyDescriptors(r)
                    )
                  : ar(Object(r)).forEach(function (t) {
                        Object.defineProperty(
                            e,
                            t,
                            Object.getOwnPropertyDescriptor(r, t)
                        )
                    })
        }
        return e
    }
    function sr(e, t, r) {
        return (
            (t = dr(t)) in e
                ? Object.defineProperty(e, t, {
                      value: r,
                      enumerable: !0,
                      configurable: !0,
                      writable: !0,
                  })
                : (e[t] = r),
            e
        )
    }
    function cr() {
        cr = function (e, t) {
            return new r(e, void 0, t)
        }
        var e = RegExp.prototype,
            t = new WeakMap()
        function r(e, n, o) {
            var a = new RegExp(e, n)
            return t.set(a, o || t.get(e)), ur(a, r.prototype)
        }
        function n(e, r) {
            var n = t.get(r)
            return Object.keys(n).reduce(function (t, r) {
                var o = n[r]
                if ('number' == typeof o) t[r] = e[o]
                else {
                    for (var a = 0; void 0 === e[o[a]] && a + 1 < o.length; )
                        a++
                    t[r] = e[o[a]]
                }
                return t
            }, Object.create(null))
        }
        return (
            (function (e, t) {
                if ('function' != typeof t && null !== t)
                    throw new TypeError(
                        'Super expression must either be null or a function'
                    )
                ;(e.prototype = Object.create(t && t.prototype, {
                    constructor: { value: e, writable: !0, configurable: !0 },
                })),
                    Object.defineProperty(e, 'prototype', { writable: !1 }),
                    t && ur(e, t)
            })(r, RegExp),
            (r.prototype.exec = function (t) {
                var r = e.exec.call(this, t)
                if (r) {
                    r.groups = n(r, this)
                    var o = r.indices
                    o && (o.groups = n(o, this))
                }
                return r
            }),
            (r.prototype[Symbol.replace] = function (r, o) {
                if ('string' == typeof o) {
                    var a = t.get(this)
                    return e[Symbol.replace].call(
                        this,
                        r,
                        o.replace(/\$<([^>]+)>/g, function (e, t) {
                            var r = a[t]
                            return '$' + (Array.isArray(r) ? r.join('$') : r)
                        })
                    )
                }
                if ('function' == typeof o) {
                    var i = this
                    return e[Symbol.replace].call(this, r, function () {
                        var e = arguments
                        return (
                            'object' != or(e[e.length - 1]) &&
                                (e = [].slice.call(e)).push(n(e, i)),
                            o.apply(this, e)
                        )
                    })
                }
                return e[Symbol.replace].call(this, r, o)
            }),
            cr.apply(this, arguments)
        )
    }
    function ur(e, t) {
        return (
            (ur = Object.setPrototypeOf
                ? Object.setPrototypeOf.bind()
                : function (e, t) {
                      return (e.__proto__ = t), e
                  }),
            ur(e, t)
        )
    }
    function lr() {
        lr = function () {
            return e
        }
        var e = {},
            t = Object.prototype,
            r = t.hasOwnProperty,
            n =
                Object.defineProperty ||
                function (e, t, r) {
                    e[t] = r.value
                },
            o = 'function' == typeof Symbol ? Symbol : {},
            a = o.iterator || '@@iterator',
            i = o.asyncIterator || '@@asyncIterator',
            s = o.toStringTag || '@@toStringTag'
        function c(e, t, r) {
            return (
                Object.defineProperty(e, t, {
                    value: r,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                }),
                e[t]
            )
        }
        try {
            c({}, '')
        } catch (e) {
            c = function (e, t, r) {
                return (e[t] = r)
            }
        }
        function u(e, t, r, o) {
            var a = t && t.prototype instanceof p ? t : p,
                i = Object.create(a.prototype),
                s = new L(o || [])
            return n(i, '_invoke', { value: x(e, r, s) }), i
        }
        function l(e, t, r) {
            try {
                return { type: 'normal', arg: e.call(t, r) }
            } catch (e) {
                return { type: 'throw', arg: e }
            }
        }
        e.wrap = u
        var f = {}
        function p() {}
        function h() {}
        function d() {}
        var v = {}
        c(v, a, function () {
            return this
        })
        var y = Object.getPrototypeOf,
            g = y && y(y(O([])))
        g && g !== t && r.call(g, a) && (v = g)
        var m = (d.prototype = p.prototype = Object.create(v))
        function w(e) {
            ;['next', 'throw', 'return'].forEach(function (t) {
                c(e, t, function (e) {
                    return this._invoke(t, e)
                })
            })
        }
        function b(e, t) {
            function o(n, a, i, s) {
                var c = l(e[n], e, a)
                if ('throw' !== c.type) {
                    var u = c.arg,
                        f = u.value
                    return f && 'object' == or(f) && r.call(f, '__await')
                        ? t.resolve(f.__await).then(
                              function (e) {
                                  o('next', e, i, s)
                              },
                              function (e) {
                                  o('throw', e, i, s)
                              }
                          )
                        : t.resolve(f).then(
                              function (e) {
                                  ;(u.value = e), i(u)
                              },
                              function (e) {
                                  return o('throw', e, i, s)
                              }
                          )
                }
                s(c.arg)
            }
            var a
            n(this, '_invoke', {
                value: function (e, r) {
                    function n() {
                        return new t(function (t, n) {
                            o(e, r, t, n)
                        })
                    }
                    return (a = a ? a.then(n, n) : n())
                },
            })
        }
        function x(e, t, r) {
            var n = 'suspendedStart'
            return function (o, a) {
                if ('executing' === n)
                    throw new Error('Generator is already running')
                if ('completed' === n) {
                    if ('throw' === o) throw a
                    return { value: void 0, done: !0 }
                }
                for (r.method = o, r.arg = a; ; ) {
                    var i = r.delegate
                    if (i) {
                        var s = k(i, r)
                        if (s) {
                            if (s === f) continue
                            return s
                        }
                    }
                    if ('next' === r.method) r.sent = r._sent = r.arg
                    else if ('throw' === r.method) {
                        if ('suspendedStart' === n)
                            throw ((n = 'completed'), r.arg)
                        r.dispatchException(r.arg)
                    } else 'return' === r.method && r.abrupt('return', r.arg)
                    n = 'executing'
                    var c = l(e, t, r)
                    if ('normal' === c.type) {
                        if (
                            ((n = r.done ? 'completed' : 'suspendedYield'),
                            c.arg === f)
                        )
                            continue
                        return { value: c.arg, done: r.done }
                    }
                    'throw' === c.type &&
                        ((n = 'completed'),
                        (r.method = 'throw'),
                        (r.arg = c.arg))
                }
            }
        }
        function k(e, t) {
            var r = t.method,
                n = e.iterator[r]
            if (void 0 === n)
                return (
                    (t.delegate = null),
                    ('throw' === r &&
                        e.iterator.return &&
                        ((t.method = 'return'),
                        (t.arg = void 0),
                        k(e, t),
                        'throw' === t.method)) ||
                        ('return' !== r &&
                            ((t.method = 'throw'),
                            (t.arg = new TypeError(
                                "The iterator does not provide a '" +
                                    r +
                                    "' method"
                            )))),
                    f
                )
            var o = l(n, e.iterator, t.arg)
            if ('throw' === o.type)
                return (
                    (t.method = 'throw'),
                    (t.arg = o.arg),
                    (t.delegate = null),
                    f
                )
            var a = o.arg
            return a
                ? a.done
                    ? ((t[e.resultName] = a.value),
                      (t.next = e.nextLoc),
                      'return' !== t.method &&
                          ((t.method = 'next'), (t.arg = void 0)),
                      (t.delegate = null),
                      f)
                    : a
                : ((t.method = 'throw'),
                  (t.arg = new TypeError('iterator result is not an object')),
                  (t.delegate = null),
                  f)
        }
        function E(e) {
            var t = { tryLoc: e[0] }
            1 in e && (t.catchLoc = e[1]),
                2 in e && ((t.finallyLoc = e[2]), (t.afterLoc = e[3])),
                this.tryEntries.push(t)
        }
        function S(e) {
            var t = e.completion || {}
            ;(t.type = 'normal'), delete t.arg, (e.completion = t)
        }
        function L(e) {
            ;(this.tryEntries = [{ tryLoc: 'root' }]),
                e.forEach(E, this),
                this.reset(!0)
        }
        function O(e) {
            if (e) {
                var t = e[a]
                if (t) return t.call(e)
                if ('function' == typeof e.next) return e
                if (!isNaN(e.length)) {
                    var n = -1,
                        o = function t() {
                            for (; ++n < e.length; )
                                if (r.call(e, n))
                                    return (t.value = e[n]), (t.done = !1), t
                            return (t.value = void 0), (t.done = !0), t
                        }
                    return (o.next = o)
                }
            }
            return { next: P }
        }
        function P() {
            return { value: void 0, done: !0 }
        }
        return (
            (h.prototype = d),
            n(m, 'constructor', { value: d, configurable: !0 }),
            n(d, 'constructor', { value: h, configurable: !0 }),
            (h.displayName = c(d, s, 'GeneratorFunction')),
            (e.isGeneratorFunction = function (e) {
                var t = 'function' == typeof e && e.constructor
                return (
                    !!t &&
                    (t === h ||
                        'GeneratorFunction' === (t.displayName || t.name))
                )
            }),
            (e.mark = function (e) {
                return (
                    Object.setPrototypeOf
                        ? Object.setPrototypeOf(e, d)
                        : ((e.__proto__ = d), c(e, s, 'GeneratorFunction')),
                    (e.prototype = Object.create(m)),
                    e
                )
            }),
            (e.awrap = function (e) {
                return { __await: e }
            }),
            w(b.prototype),
            c(b.prototype, i, function () {
                return this
            }),
            (e.AsyncIterator = b),
            (e.async = function (t, r, n, o, a) {
                void 0 === a && (a = Promise)
                var i = new b(u(t, r, n, o), a)
                return e.isGeneratorFunction(r)
                    ? i
                    : i.next().then(function (e) {
                          return e.done ? e.value : i.next()
                      })
            }),
            w(m),
            c(m, s, 'Generator'),
            c(m, a, function () {
                return this
            }),
            c(m, 'toString', function () {
                return '[object Generator]'
            }),
            (e.keys = function (e) {
                var t = Object(e),
                    r = []
                for (var n in t) r.push(n)
                return (
                    r.reverse(),
                    function e() {
                        for (; r.length; ) {
                            var n = r.pop()
                            if (n in t) return (e.value = n), (e.done = !1), e
                        }
                        return (e.done = !0), e
                    }
                )
            }),
            (e.values = O),
            (L.prototype = {
                constructor: L,
                reset: function (e) {
                    if (
                        ((this.prev = 0),
                        (this.next = 0),
                        (this.sent = this._sent = void 0),
                        (this.done = !1),
                        (this.delegate = null),
                        (this.method = 'next'),
                        (this.arg = void 0),
                        this.tryEntries.forEach(S),
                        !e)
                    )
                        for (var t in this)
                            't' === t.charAt(0) &&
                                r.call(this, t) &&
                                !isNaN(+t.slice(1)) &&
                                (this[t] = void 0)
                },
                stop: function () {
                    this.done = !0
                    var e = this.tryEntries[0].completion
                    if ('throw' === e.type) throw e.arg
                    return this.rval
                },
                dispatchException: function (e) {
                    if (this.done) throw e
                    var t = this
                    function n(r, n) {
                        return (
                            (i.type = 'throw'),
                            (i.arg = e),
                            (t.next = r),
                            n && ((t.method = 'next'), (t.arg = void 0)),
                            !!n
                        )
                    }
                    for (var o = this.tryEntries.length - 1; o >= 0; --o) {
                        var a = this.tryEntries[o],
                            i = a.completion
                        if ('root' === a.tryLoc) return n('end')
                        if (a.tryLoc <= this.prev) {
                            var s = r.call(a, 'catchLoc'),
                                c = r.call(a, 'finallyLoc')
                            if (s && c) {
                                if (this.prev < a.catchLoc)
                                    return n(a.catchLoc, !0)
                                if (this.prev < a.finallyLoc)
                                    return n(a.finallyLoc)
                            } else if (s) {
                                if (this.prev < a.catchLoc)
                                    return n(a.catchLoc, !0)
                            } else {
                                if (!c)
                                    throw new Error(
                                        'try statement without catch or finally'
                                    )
                                if (this.prev < a.finallyLoc)
                                    return n(a.finallyLoc)
                            }
                        }
                    }
                },
                abrupt: function (e, t) {
                    for (var n = this.tryEntries.length - 1; n >= 0; --n) {
                        var o = this.tryEntries[n]
                        if (
                            o.tryLoc <= this.prev &&
                            r.call(o, 'finallyLoc') &&
                            this.prev < o.finallyLoc
                        ) {
                            var a = o
                            break
                        }
                    }
                    a &&
                        ('break' === e || 'continue' === e) &&
                        a.tryLoc <= t &&
                        t <= a.finallyLoc &&
                        (a = null)
                    var i = a ? a.completion : {}
                    return (
                        (i.type = e),
                        (i.arg = t),
                        a
                            ? ((this.method = 'next'),
                              (this.next = a.finallyLoc),
                              f)
                            : this.complete(i)
                    )
                },
                complete: function (e, t) {
                    if ('throw' === e.type) throw e.arg
                    return (
                        'break' === e.type || 'continue' === e.type
                            ? (this.next = e.arg)
                            : 'return' === e.type
                              ? ((this.rval = this.arg = e.arg),
                                (this.method = 'return'),
                                (this.next = 'end'))
                              : 'normal' === e.type && t && (this.next = t),
                        f
                    )
                },
                finish: function (e) {
                    for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                        var r = this.tryEntries[t]
                        if (r.finallyLoc === e)
                            return (
                                this.complete(r.completion, r.afterLoc), S(r), f
                            )
                    }
                },
                catch: function (e) {
                    for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                        var r = this.tryEntries[t]
                        if (r.tryLoc === e) {
                            var n = r.completion
                            if ('throw' === n.type) {
                                var o = n.arg
                                S(r)
                            }
                            return o
                        }
                    }
                    throw new Error('illegal catch attempt')
                },
                delegateYield: function (e, t, r) {
                    return (
                        (this.delegate = {
                            iterator: O(e),
                            resultName: t,
                            nextLoc: r,
                        }),
                        'next' === this.method && (this.arg = void 0),
                        f
                    )
                },
            }),
            e
        )
    }
    function fr(e, t, r, n, o, a, i) {
        try {
            var s = e[a](i),
                c = s.value
        } catch (e) {
            return void r(e)
        }
        s.done ? t(c) : Promise.resolve(c).then(n, o)
    }
    function pr(e) {
        return function () {
            var t = this,
                r = arguments
            return new Promise(function (n, o) {
                var a = e.apply(t, r)
                function i(e) {
                    fr(a, n, o, i, s, 'next', e)
                }
                function s(e) {
                    fr(a, n, o, i, s, 'throw', e)
                }
                i(void 0)
            })
        }
    }
    function hr(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r]
            ;(n.enumerable = n.enumerable || !1),
                (n.configurable = !0),
                'value' in n && (n.writable = !0),
                Object.defineProperty(e, dr(n.key), n)
        }
    }
    function dr(e) {
        var t = (function (e, t) {
            if ('object' !== or(e) || null === e) return e
            var r = e[Symbol.toPrimitive]
            if (void 0 !== r) {
                var n = r.call(e, 'string')
                if ('object' !== or(n)) return n
                throw new TypeError(
                    '@@toPrimitive must return a primitive value.'
                )
            }
            return String(e)
        })(e)
        return 'symbol' === or(t) ? t : String(t)
    }
    function vr(e, t) {
        gr(e, t), t.add(e)
    }
    function yr(e, t, r) {
        gr(e, t), t.set(e, r)
    }
    function gr(e, t) {
        if (t.has(e))
            throw new TypeError(
                'Cannot initialize the same private elements twice on an object'
            )
    }
    function mr(e, t) {
        return (function (e, t) {
            return t.get ? t.get.call(e) : t.value
        })(e, xr(e, t, 'get'))
    }
    function wr(e, t, r) {
        if (!t.has(e))
            throw new TypeError(
                'attempted to get private field on non-instance'
            )
        return r
    }
    function br(e, t, r) {
        return (
            (function (e, t, r) {
                if (t.set) t.set.call(e, r)
                else {
                    if (!t.writable)
                        throw new TypeError(
                            'attempted to set read only private field'
                        )
                    t.value = r
                }
            })(e, xr(e, t, 'set'), r),
            r
        )
    }
    function xr(e, t, r) {
        if (!t.has(e))
            throw new TypeError(
                'attempted to ' + r + ' private field on non-instance'
            )
        return t.get(e)
    }
    void 0 === customElements.get('jio-push-customhtml-inapp') &&
        customElements.define('jio-push-customhtml-inapp', nr)
    var kr = new WeakMap(),
        Er = new WeakMap(),
        Sr = new WeakSet(),
        Lr = new WeakSet(),
        Or = (function () {
            function e(t) {
                var r = t.logger,
                    n = t.storage
                !(function (e, t) {
                    if (!(e instanceof t))
                        throw new TypeError('Cannot call a class as a function')
                })(this, e),
                    vr(this, Lr),
                    vr(this, Sr),
                    yr(this, kr, { writable: !0, value: void 0 }),
                    yr(this, Er, { writable: !0, value: void 0 }),
                    br(this, kr, r),
                    br(this, Er, n)
            }
            var t, r, n, o, a, i
            return (
                (t = e),
                (r = [
                    {
                        key: 'handleInAppNotification',
                        value:
                            ((i = pr(
                                lr().mark(function e(t, r) {
                                    var n, o, a
                                    return lr().wrap(
                                        function (e) {
                                            for (;;)
                                                switch ((e.prev = e.next)) {
                                                    case 0:
                                                        return (
                                                            (e.prev = 0),
                                                            r.liquidTags &&
                                                                (r.liquidTags =
                                                                    JSON.parse(
                                                                        r.liquidTags
                                                                    )),
                                                            (e.next = 4),
                                                            wr(
                                                                this,
                                                                Sr,
                                                                Pr
                                                            ).call(
                                                                this,
                                                                t,
                                                                r,
                                                                'inApp'
                                                            )
                                                        )
                                                    case 4:
                                                        if (
                                                            null !==
                                                            (n = e.sent)
                                                        ) {
                                                            e.next = 14
                                                            break
                                                        }
                                                        return (
                                                            mr(this, kr).debug(
                                                                'Campaign with campaign ID: '.concat(
                                                                    r.campaignId,
                                                                    ' is STOPPED'
                                                                )
                                                            ),
                                                            (e.next = 9),
                                                            mr(
                                                                this,
                                                                Er
                                                            ).getItem(he)
                                                        )
                                                    case 9:
                                                        return (
                                                            (o = e.sent).splice(
                                                                o.indexOf(
                                                                    t.eventName
                                                                ),
                                                                1
                                                            ),
                                                            (e.next = 13),
                                                            mr(
                                                                this,
                                                                Er
                                                            ).setItem(he, o)
                                                        )
                                                    case 13:
                                                        return e.abrupt(
                                                            'return'
                                                        )
                                                    case 14:
                                                        return (
                                                            (n.messageId =
                                                                'inapp-' +
                                                                It()),
                                                            (n.eventDetails =
                                                                t),
                                                            (e.next = 18),
                                                            this.renderInAppNotification(
                                                                n,
                                                                r.inAPPNtType
                                                            )
                                                        )
                                                    case 18:
                                                        if (!e.sent) {
                                                            e.next = 23
                                                            break
                                                        }
                                                        window.JioPush.raiseNotificationReceived(
                                                            n
                                                        ),
                                                            (a =
                                                                new CustomEvent(
                                                                    'IN_APP_RENDERED_PIAR',
                                                                    {
                                                                        bubbles:
                                                                            !0,
                                                                        detail: n,
                                                                    }
                                                                )),
                                                            document.dispatchEvent(
                                                                a
                                                            ),
                                                            mr(this, kr).debug(
                                                                'handleInAppNotificationCalled , EVENTOBJ: '
                                                                    .concat(
                                                                        JSON.stringify(
                                                                            t
                                                                        ),
                                                                        ' , CAMPAIGN: '
                                                                    )
                                                                    .concat(
                                                                        JSON.stringify(
                                                                            n
                                                                        )
                                                                    )
                                                            )
                                                    case 23:
                                                        e.next = 28
                                                        break
                                                    case 25:
                                                        throw (
                                                            ((e.prev = 25),
                                                            (e.t0 = e.catch(0)),
                                                            new R(
                                                                'Error in creating InApp Notification',
                                                                e.t0
                                                            ))
                                                        )
                                                    case 28:
                                                    case 'end':
                                                        return e.stop()
                                                }
                                        },
                                        e,
                                        this,
                                        [[0, 25]]
                                    )
                                })
                            )),
                            function (e, t) {
                                return i.apply(this, arguments)
                            }),
                    },
                    {
                        key: 'handleNativeDisplay',
                        value:
                            ((a = pr(
                                lr().mark(function e(t, r) {
                                    var n, o, a
                                    return lr().wrap(
                                        function (e) {
                                            for (;;)
                                                switch ((e.prev = e.next)) {
                                                    case 0:
                                                        return (
                                                            (e.prev = 0),
                                                            r.liquidTags &&
                                                                (r.liquidTags =
                                                                    JSON.parse(
                                                                        r.liquidTags
                                                                    )),
                                                            (e.next = 4),
                                                            wr(
                                                                this,
                                                                Sr,
                                                                Pr
                                                            ).call(
                                                                this,
                                                                t,
                                                                r,
                                                                'nativeDisplay'
                                                            )
                                                        )
                                                    case 4:
                                                        if (
                                                            null !==
                                                            (n = e.sent)
                                                        ) {
                                                            e.next = 14
                                                            break
                                                        }
                                                        return (
                                                            mr(this, kr).debug(
                                                                'Campaign with campaign ID: '.concat(
                                                                    r.campaignId,
                                                                    ' is STOPPED'
                                                                )
                                                            ),
                                                            (e.next = 9),
                                                            mr(
                                                                this,
                                                                Er
                                                            ).getItem(de)
                                                        )
                                                    case 9:
                                                        return (
                                                            (o = e.sent).splice(
                                                                o.indexOf(
                                                                    t.eventName
                                                                ),
                                                                1
                                                            ),
                                                            (e.next = 13),
                                                            mr(
                                                                this,
                                                                Er
                                                            ).setItem(de, o)
                                                        )
                                                    case 13:
                                                        return e.abrupt(
                                                            'return'
                                                        )
                                                    case 14:
                                                        ;(n.messageId =
                                                            'native-' + It()),
                                                            (n.eventDetails =
                                                                t),
                                                            window.JioPush.raiseNotificationReceived(
                                                                n
                                                            ),
                                                            (a =
                                                                new CustomEvent(
                                                                    'NATIVE_DISPLAY_READY_PNDR',
                                                                    {
                                                                        bubbles:
                                                                            !0,
                                                                        detail: n,
                                                                    }
                                                                )),
                                                            document.dispatchEvent(
                                                                a
                                                            ),
                                                            mr(this, kr).debug(
                                                                'handleNativeDisplay , EVENTOBJ: '
                                                                    .concat(
                                                                        JSON.stringify(
                                                                            t
                                                                        ),
                                                                        ' , CAMPAIGN: '
                                                                    )
                                                                    .concat(
                                                                        JSON.stringify(
                                                                            n
                                                                        )
                                                                    )
                                                            ),
                                                            (e.next = 25)
                                                        break
                                                    case 22:
                                                        throw (
                                                            ((e.prev = 22),
                                                            (e.t0 = e.catch(0)),
                                                            new R(
                                                                'Error in sending Native Display Notification',
                                                                e.t0
                                                            ))
                                                        )
                                                    case 25:
                                                    case 'end':
                                                        return e.stop()
                                                }
                                        },
                                        e,
                                        this,
                                        [[0, 22]]
                                    )
                                })
                            )),
                            function (e, t) {
                                return a.apply(this, arguments)
                            }),
                    },
                    {
                        key: 'renderInAppNotification',
                        value:
                            ((o = pr(
                                lr().mark(function e(t, r) {
                                    var n
                                    return lr().wrap(
                                        function (e) {
                                            for (;;)
                                                switch ((e.prev = e.next)) {
                                                    case 0:
                                                        ;(e.t0 = r),
                                                            (e.next =
                                                                0 === e.t0
                                                                    ? 3
                                                                    : 1 === e.t0
                                                                      ? 9
                                                                      : 15)
                                                        break
                                                    case 3:
                                                        return (
                                                            ((n =
                                                                document.createElement(
                                                                    'jio-push-interstitial-inapp'
                                                                )).campaign =
                                                                t),
                                                            (n.messageId =
                                                                t.messageId),
                                                            (n.id =
                                                                t.messageId),
                                                            document.body.appendChild(
                                                                n
                                                            ),
                                                            e.abrupt(
                                                                'return',
                                                                !0
                                                            )
                                                        )
                                                    case 9:
                                                        return (
                                                            ((n =
                                                                document.createElement(
                                                                    'jio-push-customHTML-inapp'
                                                                )).campaign =
                                                                t),
                                                            (n.messageId =
                                                                t.messageId),
                                                            (n.id =
                                                                t.messageId),
                                                            document.body.appendChild(
                                                                n
                                                            ),
                                                            e.abrupt(
                                                                'return',
                                                                !0
                                                            )
                                                        )
                                                    case 15:
                                                        return (
                                                            mr(this, kr).error(
                                                                'Invalid notification type recived for campaign id: '.concat(
                                                                    t.campaignId,
                                                                    ', Not rendering inApp Notification'
                                                                )
                                                            ),
                                                            e.abrupt(
                                                                'return',
                                                                !1
                                                            )
                                                        )
                                                    case 17:
                                                    case 'end':
                                                        return e.stop()
                                                }
                                        },
                                        e,
                                        this
                                    )
                                })
                            )),
                            function (e, t) {
                                return o.apply(this, arguments)
                            }),
                    },
                    {
                        key: 'containsIsStoppedTrue',
                        value: function (e) {
                            return /"isStopped"\s*:\s*true/.test(e)
                        },
                    },
                    {
                        key: 'liquidTagResolver',
                        value:
                            ((n = pr(
                                lr().mark(function e(t) {
                                    var r,
                                        n,
                                        o,
                                        a,
                                        i,
                                        s,
                                        c,
                                        u,
                                        l,
                                        f,
                                        p = arguments
                                    return lr().wrap(
                                        function (e) {
                                            for (;;)
                                                switch ((e.prev = e.next)) {
                                                    case 0:
                                                        if (
                                                            ((r =
                                                                p.length > 1 &&
                                                                void 0 !== p[1]
                                                                    ? p[1]
                                                                    : {}),
                                                            (o = t),
                                                            (a = cr(
                                                                /@([a-zA-Z\s]+) \x2D (.+?) \| Default: [\\]+"([^"]*?)[\\]+"/,
                                                                {
                                                                    propertyType: 1,
                                                                    liquidKey: 2,
                                                                    defaultValue: 3,
                                                                }
                                                            )).test(t))
                                                        )
                                                            for (
                                                                ;
                                                                null !==
                                                                (n = a.exec(o));

                                                            )
                                                                (i =
                                                                    n.groups
                                                                        .propertyType),
                                                                    (s =
                                                                        n.groups
                                                                            .liquidKey),
                                                                    (c =
                                                                        n.groups
                                                                            .defaultValue),
                                                                    (u =
                                                                        r[i] &&
                                                                        s in
                                                                            r[i]
                                                                            ? r[
                                                                                  i
                                                                              ][
                                                                                  s
                                                                              ]
                                                                            : c),
                                                                    (l =
                                                                        '' != u
                                                                            ? n.index
                                                                            : n.index -
                                                                              1),
                                                                    (f =
                                                                        '' != u
                                                                            ? l +
                                                                              n[0]
                                                                                  .length
                                                                            : l +
                                                                              n[0]
                                                                                  .length -
                                                                              1),
                                                                    (o = wr(
                                                                        this,
                                                                        Lr,
                                                                        Tr
                                                                    ).call(
                                                                        this,
                                                                        o,
                                                                        l,
                                                                        f,
                                                                        u
                                                                    )),
                                                                    (a.lastIndex =
                                                                        l +
                                                                        u.length)
                                                        return e.abrupt(
                                                            'return',
                                                            o
                                                        )
                                                    case 5:
                                                    case 'end':
                                                        return e.stop()
                                                }
                                        },
                                        e,
                                        this
                                    )
                                })
                            )),
                            function (e) {
                                return n.apply(this, arguments)
                            }),
                    },
                ]),
                r && hr(t.prototype, r),
                Object.defineProperty(t, 'prototype', { writable: !1 }),
                e
            )
        })()
    function Pr(e, t, r) {
        return Cr.apply(this, arguments)
    }
    function Cr() {
        return (Cr = pr(
            lr().mark(function e(t, n, o) {
                var a, i, s, c, u, l
                return lr().wrap(
                    function (e) {
                        for (;;)
                            switch ((e.prev = e.next)) {
                                case 0:
                                    return (
                                        (e.next = 2),
                                        fetch(
                                            n.cdnPath +
                                                '?ccb='.concat(Date.now())
                                        )
                                    )
                                case 2:
                                    if (
                                        ((a = e.sent),
                                        (i = a.headers.get('jp-fetch-time')
                                            ? a.headers.get('jp-fetch-time')
                                            : Date.now()),
                                        (s =
                                            i +
                                                r.cacheConfig[o]
                                                    .invalidationTime <=
                                            Date.now()),
                                        !a.headers.get('IS-THIS-CACHED') || !s)
                                    ) {
                                        e.next = 9
                                        break
                                    }
                                    return (
                                        (e.next = 8),
                                        fetch(
                                            n.cdnPath +
                                                '?ccb='.concat(
                                                    Date.now(),
                                                    '&orig=true'
                                                )
                                        )
                                    )
                                case 8:
                                    a = e.sent
                                case 9:
                                    return (
                                        delete n.cdnPath,
                                        (e.next = 12),
                                        a.text()
                                    )
                                case 12:
                                    if (
                                        ((n.payload = e.sent),
                                        !this.containsIsStoppedTrue(n.payload))
                                    ) {
                                        e.next = 15
                                        break
                                    }
                                    return e.abrupt('return', null)
                                case 15:
                                    if (
                                        (((c = n.liquidTags) &&
                                            0 != Object.keys(c).length) ||
                                            (c = {}),
                                        (u = {}),
                                        Array.isArray(t.properties))
                                    )
                                        for (
                                            l = 0;
                                            l < t.properties.length;
                                            l++
                                        )
                                            Array.isArray(
                                                t.properties[l].propertyValue
                                            )
                                                ? (u[
                                                      t.properties[
                                                          l
                                                      ].propertyName
                                                  ] =
                                                      t.properties[
                                                          l
                                                      ].propertyValue[0])
                                                : (u[
                                                      t.properties[
                                                          l
                                                      ].propertyName
                                                  ] =
                                                      t.properties[
                                                          l
                                                      ].propertyValue)
                                    else u = t.properties
                                    return (
                                        void 0 === c[''.concat(t.eventName)]
                                            ? (c[''.concat(t.eventName)] = ir(
                                                  ir({}, u),
                                                  {},
                                                  { eventName: t.eventName }
                                              ))
                                            : (c[''.concat(t.eventName)] = ir(
                                                  ir(
                                                      ir(
                                                          {},
                                                          c[
                                                              ''.concat(
                                                                  t.eventName
                                                              )
                                                          ]
                                                      ),
                                                      u
                                                  ),
                                                  {},
                                                  { eventName: t.eventName }
                                              )),
                                        (e.t0 = JSON),
                                        (e.next = 23),
                                        this.liquidTagResolver(n.payload, c)
                                    )
                                case 23:
                                    return (
                                        (e.t1 = e.sent),
                                        (n.payload = e.t0.parse.call(
                                            e.t0,
                                            e.t1
                                        )),
                                        delete n.payload.liquidTags,
                                        delete n.payload.triggerEvent,
                                        n.payload.customKeyValuePairs &&
                                            'string' ==
                                                typeof n.payload
                                                    .customKeyValuePairs &&
                                            (n.payload.customKeyValuePairs =
                                                JSON.parse(
                                                    n.payload
                                                        .customKeyValuePairs
                                                )),
                                        e.abrupt('return', n)
                                    )
                                case 29:
                                case 'end':
                                    return e.stop()
                            }
                    },
                    e,
                    this
                )
            })
        )).apply(this, arguments)
    }
    function Tr(e, t, r, n) {
        return e.substring(0, t) + n + e.substring(r)
    }
    function Nr(e) {
        return (
            (Nr =
                'function' == typeof Symbol &&
                'symbol' == typeof Symbol.iterator
                    ? function (e) {
                          return typeof e
                      }
                    : function (e) {
                          return e &&
                              'function' == typeof Symbol &&
                              e.constructor === Symbol &&
                              e !== Symbol.prototype
                              ? 'symbol'
                              : typeof e
                      }),
            Nr(e)
        )
    }
    function Ir() {
        Ir = function () {
            return e
        }
        var e = {},
            t = Object.prototype,
            r = t.hasOwnProperty,
            n =
                Object.defineProperty ||
                function (e, t, r) {
                    e[t] = r.value
                },
            o = 'function' == typeof Symbol ? Symbol : {},
            a = o.iterator || '@@iterator',
            i = o.asyncIterator || '@@asyncIterator',
            s = o.toStringTag || '@@toStringTag'
        function c(e, t, r) {
            return (
                Object.defineProperty(e, t, {
                    value: r,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                }),
                e[t]
            )
        }
        try {
            c({}, '')
        } catch (e) {
            c = function (e, t, r) {
                return (e[t] = r)
            }
        }
        function u(e, t, r, o) {
            var a = t && t.prototype instanceof p ? t : p,
                i = Object.create(a.prototype),
                s = new L(o || [])
            return n(i, '_invoke', { value: x(e, r, s) }), i
        }
        function l(e, t, r) {
            try {
                return { type: 'normal', arg: e.call(t, r) }
            } catch (e) {
                return { type: 'throw', arg: e }
            }
        }
        e.wrap = u
        var f = {}
        function p() {}
        function h() {}
        function d() {}
        var v = {}
        c(v, a, function () {
            return this
        })
        var y = Object.getPrototypeOf,
            g = y && y(y(O([])))
        g && g !== t && r.call(g, a) && (v = g)
        var m = (d.prototype = p.prototype = Object.create(v))
        function w(e) {
            ;['next', 'throw', 'return'].forEach(function (t) {
                c(e, t, function (e) {
                    return this._invoke(t, e)
                })
            })
        }
        function b(e, t) {
            function o(n, a, i, s) {
                var c = l(e[n], e, a)
                if ('throw' !== c.type) {
                    var u = c.arg,
                        f = u.value
                    return f && 'object' == Nr(f) && r.call(f, '__await')
                        ? t.resolve(f.__await).then(
                              function (e) {
                                  o('next', e, i, s)
                              },
                              function (e) {
                                  o('throw', e, i, s)
                              }
                          )
                        : t.resolve(f).then(
                              function (e) {
                                  ;(u.value = e), i(u)
                              },
                              function (e) {
                                  return o('throw', e, i, s)
                              }
                          )
                }
                s(c.arg)
            }
            var a
            n(this, '_invoke', {
                value: function (e, r) {
                    function n() {
                        return new t(function (t, n) {
                            o(e, r, t, n)
                        })
                    }
                    return (a = a ? a.then(n, n) : n())
                },
            })
        }
        function x(e, t, r) {
            var n = 'suspendedStart'
            return function (o, a) {
                if ('executing' === n)
                    throw new Error('Generator is already running')
                if ('completed' === n) {
                    if ('throw' === o) throw a
                    return { value: void 0, done: !0 }
                }
                for (r.method = o, r.arg = a; ; ) {
                    var i = r.delegate
                    if (i) {
                        var s = k(i, r)
                        if (s) {
                            if (s === f) continue
                            return s
                        }
                    }
                    if ('next' === r.method) r.sent = r._sent = r.arg
                    else if ('throw' === r.method) {
                        if ('suspendedStart' === n)
                            throw ((n = 'completed'), r.arg)
                        r.dispatchException(r.arg)
                    } else 'return' === r.method && r.abrupt('return', r.arg)
                    n = 'executing'
                    var c = l(e, t, r)
                    if ('normal' === c.type) {
                        if (
                            ((n = r.done ? 'completed' : 'suspendedYield'),
                            c.arg === f)
                        )
                            continue
                        return { value: c.arg, done: r.done }
                    }
                    'throw' === c.type &&
                        ((n = 'completed'),
                        (r.method = 'throw'),
                        (r.arg = c.arg))
                }
            }
        }
        function k(e, t) {
            var r = t.method,
                n = e.iterator[r]
            if (void 0 === n)
                return (
                    (t.delegate = null),
                    ('throw' === r &&
                        e.iterator.return &&
                        ((t.method = 'return'),
                        (t.arg = void 0),
                        k(e, t),
                        'throw' === t.method)) ||
                        ('return' !== r &&
                            ((t.method = 'throw'),
                            (t.arg = new TypeError(
                                "The iterator does not provide a '" +
                                    r +
                                    "' method"
                            )))),
                    f
                )
            var o = l(n, e.iterator, t.arg)
            if ('throw' === o.type)
                return (
                    (t.method = 'throw'),
                    (t.arg = o.arg),
                    (t.delegate = null),
                    f
                )
            var a = o.arg
            return a
                ? a.done
                    ? ((t[e.resultName] = a.value),
                      (t.next = e.nextLoc),
                      'return' !== t.method &&
                          ((t.method = 'next'), (t.arg = void 0)),
                      (t.delegate = null),
                      f)
                    : a
                : ((t.method = 'throw'),
                  (t.arg = new TypeError('iterator result is not an object')),
                  (t.delegate = null),
                  f)
        }
        function E(e) {
            var t = { tryLoc: e[0] }
            1 in e && (t.catchLoc = e[1]),
                2 in e && ((t.finallyLoc = e[2]), (t.afterLoc = e[3])),
                this.tryEntries.push(t)
        }
        function S(e) {
            var t = e.completion || {}
            ;(t.type = 'normal'), delete t.arg, (e.completion = t)
        }
        function L(e) {
            ;(this.tryEntries = [{ tryLoc: 'root' }]),
                e.forEach(E, this),
                this.reset(!0)
        }
        function O(e) {
            if (e) {
                var t = e[a]
                if (t) return t.call(e)
                if ('function' == typeof e.next) return e
                if (!isNaN(e.length)) {
                    var n = -1,
                        o = function t() {
                            for (; ++n < e.length; )
                                if (r.call(e, n))
                                    return (t.value = e[n]), (t.done = !1), t
                            return (t.value = void 0), (t.done = !0), t
                        }
                    return (o.next = o)
                }
            }
            return { next: P }
        }
        function P() {
            return { value: void 0, done: !0 }
        }
        return (
            (h.prototype = d),
            n(m, 'constructor', { value: d, configurable: !0 }),
            n(d, 'constructor', { value: h, configurable: !0 }),
            (h.displayName = c(d, s, 'GeneratorFunction')),
            (e.isGeneratorFunction = function (e) {
                var t = 'function' == typeof e && e.constructor
                return (
                    !!t &&
                    (t === h ||
                        'GeneratorFunction' === (t.displayName || t.name))
                )
            }),
            (e.mark = function (e) {
                return (
                    Object.setPrototypeOf
                        ? Object.setPrototypeOf(e, d)
                        : ((e.__proto__ = d), c(e, s, 'GeneratorFunction')),
                    (e.prototype = Object.create(m)),
                    e
                )
            }),
            (e.awrap = function (e) {
                return { __await: e }
            }),
            w(b.prototype),
            c(b.prototype, i, function () {
                return this
            }),
            (e.AsyncIterator = b),
            (e.async = function (t, r, n, o, a) {
                void 0 === a && (a = Promise)
                var i = new b(u(t, r, n, o), a)
                return e.isGeneratorFunction(r)
                    ? i
                    : i.next().then(function (e) {
                          return e.done ? e.value : i.next()
                      })
            }),
            w(m),
            c(m, s, 'Generator'),
            c(m, a, function () {
                return this
            }),
            c(m, 'toString', function () {
                return '[object Generator]'
            }),
            (e.keys = function (e) {
                var t = Object(e),
                    r = []
                for (var n in t) r.push(n)
                return (
                    r.reverse(),
                    function e() {
                        for (; r.length; ) {
                            var n = r.pop()
                            if (n in t) return (e.value = n), (e.done = !1), e
                        }
                        return (e.done = !0), e
                    }
                )
            }),
            (e.values = O),
            (L.prototype = {
                constructor: L,
                reset: function (e) {
                    if (
                        ((this.prev = 0),
                        (this.next = 0),
                        (this.sent = this._sent = void 0),
                        (this.done = !1),
                        (this.delegate = null),
                        (this.method = 'next'),
                        (this.arg = void 0),
                        this.tryEntries.forEach(S),
                        !e)
                    )
                        for (var t in this)
                            't' === t.charAt(0) &&
                                r.call(this, t) &&
                                !isNaN(+t.slice(1)) &&
                                (this[t] = void 0)
                },
                stop: function () {
                    this.done = !0
                    var e = this.tryEntries[0].completion
                    if ('throw' === e.type) throw e.arg
                    return this.rval
                },
                dispatchException: function (e) {
                    if (this.done) throw e
                    var t = this
                    function n(r, n) {
                        return (
                            (i.type = 'throw'),
                            (i.arg = e),
                            (t.next = r),
                            n && ((t.method = 'next'), (t.arg = void 0)),
                            !!n
                        )
                    }
                    for (var o = this.tryEntries.length - 1; o >= 0; --o) {
                        var a = this.tryEntries[o],
                            i = a.completion
                        if ('root' === a.tryLoc) return n('end')
                        if (a.tryLoc <= this.prev) {
                            var s = r.call(a, 'catchLoc'),
                                c = r.call(a, 'finallyLoc')
                            if (s && c) {
                                if (this.prev < a.catchLoc)
                                    return n(a.catchLoc, !0)
                                if (this.prev < a.finallyLoc)
                                    return n(a.finallyLoc)
                            } else if (s) {
                                if (this.prev < a.catchLoc)
                                    return n(a.catchLoc, !0)
                            } else {
                                if (!c)
                                    throw new Error(
                                        'try statement without catch or finally'
                                    )
                                if (this.prev < a.finallyLoc)
                                    return n(a.finallyLoc)
                            }
                        }
                    }
                },
                abrupt: function (e, t) {
                    for (var n = this.tryEntries.length - 1; n >= 0; --n) {
                        var o = this.tryEntries[n]
                        if (
                            o.tryLoc <= this.prev &&
                            r.call(o, 'finallyLoc') &&
                            this.prev < o.finallyLoc
                        ) {
                            var a = o
                            break
                        }
                    }
                    a &&
                        ('break' === e || 'continue' === e) &&
                        a.tryLoc <= t &&
                        t <= a.finallyLoc &&
                        (a = null)
                    var i = a ? a.completion : {}
                    return (
                        (i.type = e),
                        (i.arg = t),
                        a
                            ? ((this.method = 'next'),
                              (this.next = a.finallyLoc),
                              f)
                            : this.complete(i)
                    )
                },
                complete: function (e, t) {
                    if ('throw' === e.type) throw e.arg
                    return (
                        'break' === e.type || 'continue' === e.type
                            ? (this.next = e.arg)
                            : 'return' === e.type
                              ? ((this.rval = this.arg = e.arg),
                                (this.method = 'return'),
                                (this.next = 'end'))
                              : 'normal' === e.type && t && (this.next = t),
                        f
                    )
                },
                finish: function (e) {
                    for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                        var r = this.tryEntries[t]
                        if (r.finallyLoc === e)
                            return (
                                this.complete(r.completion, r.afterLoc), S(r), f
                            )
                    }
                },
                catch: function (e) {
                    for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                        var r = this.tryEntries[t]
                        if (r.tryLoc === e) {
                            var n = r.completion
                            if ('throw' === n.type) {
                                var o = n.arg
                                S(r)
                            }
                            return o
                        }
                    }
                    throw new Error('illegal catch attempt')
                },
                delegateYield: function (e, t, r) {
                    return (
                        (this.delegate = {
                            iterator: O(e),
                            resultName: t,
                            nextLoc: r,
                        }),
                        'next' === this.method && (this.arg = void 0),
                        f
                    )
                },
            }),
            e
        )
    }
    function jr(e, t, r, n, o, a, i) {
        try {
            var s = e[a](i),
                c = s.value
        } catch (e) {
            return void r(e)
        }
        s.done ? t(c) : Promise.resolve(c).then(n, o)
    }
    function Mr(e) {
        return function () {
            var t = this,
                r = arguments
            return new Promise(function (n, o) {
                var a = e.apply(t, r)
                function i(e) {
                    jr(a, n, o, i, s, 'next', e)
                }
                function s(e) {
                    jr(a, n, o, i, s, 'throw', e)
                }
                i(void 0)
            })
        }
    }
    function _r(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r]
            ;(n.enumerable = n.enumerable || !1),
                (n.configurable = !0),
                'value' in n && (n.writable = !0),
                Object.defineProperty(
                    e,
                    (void 0,
                    (o = (function (e, t) {
                        if ('object' !== Nr(e) || null === e) return e
                        var r = e[Symbol.toPrimitive]
                        if (void 0 !== r) {
                            var n = r.call(e, 'string')
                            if ('object' !== Nr(n)) return n
                            throw new TypeError(
                                '@@toPrimitive must return a primitive value.'
                            )
                        }
                        return String(e)
                    })(n.key)),
                    'symbol' === Nr(o) ? o : String(o)),
                    n
                )
        }
        var o
    }
    function Ar(e, t) {
        Rr(e, t), t.add(e)
    }
    function Dr(e, t, r) {
        Rr(e, t), t.set(e, r)
    }
    function Rr(e, t) {
        if (t.has(e))
            throw new TypeError(
                'Cannot initialize the same private elements twice on an object'
            )
    }
    function Br(e, t) {
        return (function (e, t) {
            return t.get ? t.get.call(e) : t.value
        })(e, Fr(e, t, 'get'))
    }
    function Gr(e, t, r) {
        if (!t.has(e))
            throw new TypeError(
                'attempted to get private field on non-instance'
            )
        return r
    }
    function Vr(e, t, r) {
        return (
            (function (e, t, r) {
                if (t.set) t.set.call(e, r)
                else {
                    if (!t.writable)
                        throw new TypeError(
                            'attempted to set read only private field'
                        )
                    t.value = r
                }
            })(e, Fr(e, t, 'set'), r),
            r
        )
    }
    function Fr(e, t, r) {
        if (!t.has(e))
            throw new TypeError(
                'attempted to ' + r + ' private field on non-instance'
            )
        return t.get(e)
    }
    var zr = new WeakMap(),
        Wr = new WeakMap(),
        Ur = new WeakMap(),
        Jr = new WeakMap(),
        Kr = new WeakMap(),
        qr = new WeakMap(),
        Yr = new WeakMap(),
        Hr = new WeakSet(),
        Qr = new WeakSet(),
        Zr = new WeakSet(),
        Xr = new WeakSet(),
        $r = new WeakSet(),
        en = new WeakSet(),
        tn = new WeakSet(),
        rn = new WeakSet(),
        nn = new WeakSet(),
        on = (function () {
            function e(t) {
                var n = t.logger,
                    o = t.storage,
                    a = t.analyticsHandler,
                    i = t.notificationHandler,
                    s = t.APIHandler,
                    c = t.broadcastChannel
                !(function (e, t) {
                    if (!(e instanceof t))
                        throw new TypeError('Cannot call a class as a function')
                })(this, e),
                    Ar(this, nn),
                    Ar(this, rn),
                    Ar(this, tn),
                    Ar(this, en),
                    Ar(this, $r),
                    Ar(this, Xr),
                    Ar(this, Zr),
                    Ar(this, Qr),
                    Ar(this, Hr),
                    Dr(this, zr, { writable: !0, value: void 0 }),
                    Dr(this, Wr, { writable: !0, value: void 0 }),
                    Dr(this, Ur, { writable: !0, value: void 0 }),
                    Dr(this, Jr, { writable: !0, value: void 0 }),
                    Dr(this, Kr, { writable: !0, value: void 0 }),
                    Dr(this, qr, { writable: !0, value: void 0 }),
                    Dr(this, Yr, { writable: !0, value: void 0 }),
                    Vr(this, zr, n),
                    Vr(this, Wr, o),
                    Vr(this, Ur, a),
                    Vr(this, Jr, i),
                    Vr(this, Kr, s),
                    Vr(this, qr, c),
                    Vr(this, Yr, self.window ? r : self.Global)
            }
            var t, n, o
            return (
                (t = e),
                (n = [
                    {
                        key: 'fireEvent',
                        value:
                            ((o = Mr(
                                Ir().mark(function e(t) {
                                    var r, n, o, a, i, s, c, u
                                    return Ir().wrap(
                                        function (e) {
                                            for (;;)
                                                switch ((e.prev = e.next)) {
                                                    case 0:
                                                        if (
                                                            ((r = t.eventName),
                                                            (n =
                                                                t.eventCategory),
                                                            (o = t.eventType),
                                                            (a = t.properties),
                                                            (i =
                                                                void 0 === a
                                                                    ? null
                                                                    : a),
                                                            (s = t.payload),
                                                            (c =
                                                                void 0 === s
                                                                    ? null
                                                                    : s),
                                                            (e.prev = 1),
                                                            null != r)
                                                        ) {
                                                            e.next = 4
                                                            break
                                                        }
                                                        throw new D(
                                                            'Event name is required.'
                                                        )
                                                    case 4:
                                                        if ('CUSTOM' != o) {
                                                            e.next = 9
                                                            break
                                                        }
                                                        if (null != n) {
                                                            e.next = 7
                                                            break
                                                        }
                                                        throw new D(
                                                            'Event catergory is required for custom events.'
                                                        )
                                                    case 7:
                                                        if (null === c) {
                                                            e.next = 9
                                                            break
                                                        }
                                                        throw new D(
                                                            'Payload should not be passed with custom events.'
                                                        )
                                                    case 9:
                                                        if (
                                                            !Gr(
                                                                this,
                                                                nn,
                                                                bn
                                                            ).call(this, o)
                                                        ) {
                                                            e.next = 15
                                                            break
                                                        }
                                                        return (
                                                            (e.next = 12),
                                                            De(o, r, c, i, n)
                                                        )
                                                    case 12:
                                                        Br(this, zr).debug(
                                                            'Event: '.concat(
                                                                r,
                                                                ' logged in DB for analytics.'
                                                            )
                                                        ),
                                                            (e.next = 16)
                                                        break
                                                    case 15:
                                                        Br(this, zr).debug(
                                                            'Event: '.concat(
                                                                r,
                                                                ' NOT logged in DB for analytics. Forbidden from Configuration.'
                                                            )
                                                        )
                                                    case 16:
                                                        return (
                                                            (e.next = 18),
                                                            Gr(
                                                                this,
                                                                Hr,
                                                                an
                                                            ).call(this, r)
                                                        )
                                                    case 18:
                                                        if (
                                                            null != (u = e.sent)
                                                        ) {
                                                            e.next = 22
                                                            break
                                                        }
                                                        return (
                                                            Br(this, zr).debug(
                                                                'Not an inApp or Native Event thus returning.'
                                                            ),
                                                            e.abrupt('return')
                                                        )
                                                    case 22:
                                                        return (
                                                            (u.properties = i),
                                                            (u.category = n),
                                                            (u.eventType = o),
                                                            u.eventClass.includes(
                                                                ye.inAppEvent
                                                            ) &&
                                                                Gr(
                                                                    this,
                                                                    Xr,
                                                                    pn
                                                                ).call(this, u),
                                                            u.eventClass.includes(
                                                                ye.nativeDisplayEvent
                                                            ) &&
                                                                Gr(
                                                                    this,
                                                                    $r,
                                                                    dn
                                                                ).call(this, u),
                                                            e.abrupt('return')
                                                        )
                                                    case 30:
                                                        if (
                                                            ((e.prev = 30),
                                                            (e.t0 = e.catch(1)),
                                                            !(
                                                                e.t0 instanceof
                                                                A
                                                            ))
                                                        ) {
                                                            e.next = 35
                                                            break
                                                        }
                                                        throw (
                                                            (Br(this, zr).error(
                                                                new D(
                                                                    'Cannot handle event: '.concat(
                                                                        r,
                                                                        ' | API ERROR'
                                                                    ),
                                                                    e.t0
                                                                )
                                                            ),
                                                            new D(
                                                                'Cannot handle event: '.concat(
                                                                    r,
                                                                    ' | API ERROR'
                                                                ),
                                                                e.t0
                                                            ))
                                                        )
                                                    case 35:
                                                        throw new D(
                                                            'Cannot handle event: '.concat(
                                                                r
                                                            ),
                                                            e.t0
                                                        )
                                                    case 36:
                                                    case 'end':
                                                        return e.stop()
                                                }
                                        },
                                        e,
                                        this,
                                        [[1, 30]]
                                    )
                                })
                            )),
                            function (e) {
                                return o.apply(this, arguments)
                            }),
                    },
                ]),
                n && _r(t.prototype, n),
                Object.defineProperty(t, 'prototype', { writable: !1 }),
                e
            )
        })()
    function an(e) {
        return sn.apply(this, arguments)
    }
    function sn() {
        return (sn = Mr(
            Ir().mark(function e(t) {
                var r
                return Ir().wrap(
                    function (e) {
                        for (;;)
                            switch ((e.prev = e.next)) {
                                case 0:
                                    return (
                                        (e.next = 2), Br(this, Wr).getItem(he)
                                    )
                                case 2:
                                    return (
                                        (this.inAppEvents = e.sent),
                                        (e.next = 5),
                                        Br(this, Wr).getItem(de)
                                    )
                                case 5:
                                    if (
                                        ((this.nativeDisplayEvents = e.sent),
                                        ((r = {}).eventName = t),
                                        (r.eventClass = []),
                                        this.inAppEvents &&
                                            this.inAppEvents.indexOf(t) > -1 &&
                                            r.eventClass.push(ye.inAppEvent),
                                        this.nativeDisplayEvents &&
                                            this.nativeDisplayEvents.indexOf(
                                                t
                                            ) > -1 &&
                                            r.eventClass.push(
                                                ye.nativeDisplayEvent
                                            ),
                                        0 === r.eventClass.length)
                                    ) {
                                        e.next = 15
                                        break
                                    }
                                    return e.abrupt('return', r)
                                case 15:
                                    return e.abrupt('return', null)
                                case 16:
                                case 'end':
                                    return e.stop()
                            }
                    },
                    e,
                    this
                )
            })
        )).apply(this, arguments)
    }
    function cn(e) {
        return un.apply(this, arguments)
    }
    function un() {
        return (un = Mr(
            Ir().mark(function e(t) {
                var r
                return Ir().wrap(
                    function (e) {
                        for (;;)
                            switch ((e.prev = e.next)) {
                                case 0:
                                    return (
                                        (e.next = 2),
                                        Br(this, Kr).getInAppSegment()
                                    )
                                case 2:
                                    return (
                                        (r = e.sent),
                                        e.abrupt(
                                            'return',
                                            r.eventToCampaign[
                                                ''.concat(t.eventName)
                                            ]
                                        )
                                    )
                                case 4:
                                case 'end':
                                    return e.stop()
                            }
                    },
                    e,
                    this
                )
            })
        )).apply(this, arguments)
    }
    function ln(e) {
        return fn.apply(this, arguments)
    }
    function fn() {
        return (fn = Mr(
            Ir().mark(function e(t) {
                var r
                return Ir().wrap(
                    function (e) {
                        for (;;)
                            switch ((e.prev = e.next)) {
                                case 0:
                                    return (
                                        (e.next = 2),
                                        Br(this, Kr).getNativeDisplaySegment()
                                    )
                                case 2:
                                    return (
                                        (r = e.sent),
                                        e.abrupt(
                                            'return',
                                            r.eventToCampaign[
                                                ''.concat(t.eventName)
                                            ]
                                        )
                                    )
                                case 4:
                                case 'end':
                                    return e.stop()
                            }
                    },
                    e,
                    this
                )
            })
        )).apply(this, arguments)
    }
    function pn(e) {
        return hn.apply(this, arguments)
    }
    function hn() {
        return (hn = Mr(
            Ir().mark(function e(t) {
                var r
                return Ir().wrap(
                    function (e) {
                        for (;;)
                            switch ((e.prev = e.next)) {
                                case 0:
                                    return (
                                        (e.next = 2),
                                        Gr(this, Qr, cn).call(this, t)
                                    )
                                case 2:
                                    if (
                                        ((r = e.sent),
                                        (e.t0 = r.campaignLimitType),
                                        !e.t0)
                                    ) {
                                        e.next = 8
                                        break
                                    }
                                    return (
                                        (e.next = 7),
                                        Gr(this, rn, mn).call(this, r)
                                    )
                                case 7:
                                    e.t0 = e.sent
                                case 8:
                                    if (!e.t0) {
                                        e.next = 11
                                        break
                                    }
                                    return (
                                        Br(this, zr).debug(
                                            'Campaign ('.concat(
                                                null == r
                                                    ? void 0
                                                    : r.campaignId,
                                                ') disqualifed based on campaign limits'
                                            )
                                        ),
                                        e.abrupt('return')
                                    )
                                case 11:
                                    if (
                                        (r.triggerEvent
                                            ? (r.triggerEvent = JSON.parse(
                                                  r.triggerEvent
                                              ))
                                            : (r.triggerEvent = {
                                                  properties: [],
                                              }),
                                        Gr(this, tn, gn).call(
                                            this,
                                            t.properties,
                                            r.triggerEvent.properties
                                        ))
                                    ) {
                                        e.next = 15
                                        break
                                    }
                                    return (
                                        Br(this, zr).debug(
                                            'Campaign ('.concat(
                                                null == r
                                                    ? void 0
                                                    : r.campaignId,
                                                ') disqualifed based on event properties'
                                            )
                                        ),
                                        e.abrupt('return')
                                    )
                                case 15:
                                    if (
                                        !r.triggerEvent.eventCategory ||
                                        !t.category ||
                                        t.category.toLowerCase() ===
                                            r.triggerEvent.eventCategory.toLowerCase()
                                    ) {
                                        e.next = 18
                                        break
                                    }
                                    return (
                                        Br(this, zr).debug(
                                            'Campaign ('.concat(
                                                null == r
                                                    ? void 0
                                                    : r.campaignId,
                                                ') disqualifed based on event category'
                                            )
                                        ),
                                        e.abrupt('return')
                                    )
                                case 18:
                                    if (
                                        !(
                                            (r.endDate &&
                                                r.endDate >= Date.now()) ||
                                            'null' == r.endDate
                                        )
                                    ) {
                                        e.next = 25
                                        break
                                    }
                                    return (
                                        (e.next = 21),
                                        Br(this, Jr).handleInAppNotification(
                                            t,
                                            r
                                        )
                                    )
                                case 21:
                                    return (
                                        Br(this, zr).debug(
                                            'Event detected as IN_APP_EVENT, notificationHandler.handleInAppNotification'
                                        ),
                                        e.abrupt('return')
                                    )
                                case 25:
                                    return (
                                        Br(this, qr).postMessage({
                                            message:
                                                'CLEAR_SPECIFIC_CAMPAIGN_CACHE',
                                            id: r.campaignId,
                                        }),
                                        Br(this, zr).debug(
                                            'Campaign with capmaingId: '.concat(
                                                null == r
                                                    ? void 0
                                                    : r.campaignId,
                                                ' have expired'
                                            )
                                        ),
                                        e.abrupt('return')
                                    )
                                case 28:
                                case 'end':
                                    return e.stop()
                            }
                    },
                    e,
                    this
                )
            })
        )).apply(this, arguments)
    }
    function dn(e) {
        return vn.apply(this, arguments)
    }
    function vn() {
        return (vn = Mr(
            Ir().mark(function e(t) {
                var r
                return Ir().wrap(
                    function (e) {
                        for (;;)
                            switch ((e.prev = e.next)) {
                                case 0:
                                    return (
                                        (e.next = 2),
                                        Gr(this, Zr, ln).call(this, t)
                                    )
                                case 2:
                                    if (
                                        ((r = e.sent).triggerEvent
                                            ? (r.triggerEvent = JSON.parse(
                                                  r.triggerEvent
                                              ))
                                            : (r.triggerEvent = {
                                                  properties: [],
                                              }),
                                        Gr(this, tn, gn).call(
                                            this,
                                            t.properties,
                                            r.triggerEvent.properties
                                        ))
                                    ) {
                                        e.next = 7
                                        break
                                    }
                                    return (
                                        Br(this, zr).debug(
                                            'Campaign ('.concat(
                                                null == r
                                                    ? void 0
                                                    : r.campaignId,
                                                ') disqualifed based on event properties'
                                            )
                                        ),
                                        e.abrupt('return')
                                    )
                                case 7:
                                    if (
                                        !r.triggerEvent.eventCategory ||
                                        !t.category ||
                                        t.category.toLowerCase() ===
                                            r.triggerEvent.eventCategory.toLowerCase()
                                    ) {
                                        e.next = 10
                                        break
                                    }
                                    return (
                                        Br(this, zr).debug(
                                            'Campaign ('.concat(
                                                null == r
                                                    ? void 0
                                                    : r.campaignId,
                                                ') disqualifed based on event category'
                                            )
                                        ),
                                        e.abrupt('return')
                                    )
                                case 10:
                                    if (
                                        !(
                                            (r.endDate &&
                                                r.endDate >= Date.now()) ||
                                            'null' == r.endDate
                                        )
                                    ) {
                                        e.next = 17
                                        break
                                    }
                                    return (
                                        (e.next = 13),
                                        Br(this, Jr).handleNativeDisplay(t, r)
                                    )
                                case 13:
                                    return (
                                        Br(this, zr).debug(
                                            'Event detected as NATIVE_DISPLAY_EVENT, notificationHandler.handleNativeDisplay'
                                        ),
                                        e.abrupt('return')
                                    )
                                case 17:
                                    return (
                                        Br(this, qr).postMessage({
                                            message:
                                                'CLEAR_SPECIFIC_CAMPAIGN_CACHE',
                                            id: r.campaignId,
                                        }),
                                        Br(this, zr).debug(
                                            'Campaign with capmaingId: '.concat(
                                                null == r
                                                    ? void 0
                                                    : r.campaignId,
                                                ' have expired'
                                            )
                                        ),
                                        e.abrupt('return')
                                    )
                                case 20:
                                case 'end':
                                    return e.stop()
                            }
                    },
                    e,
                    this
                )
            })
        )).apply(this, arguments)
    }
    function yn(e) {
        if (!Array.isArray(e) || 0 == e.length) return null
        var t = {}
        return (
            e.forEach(function (e) {
                'propertyName' in e &&
                    'propertyValue' in e &&
                    (t[e.propertyName] = e.propertyValue)
            }),
            t
        )
    }
    function gn(e, t) {
        if (((e = Gr(this, en, yn).call(this, e)), 0 === t.length)) return !0
        if (null == e) return !1
        for (var r = 0; r < t.length; r++) {
            var n = t[r].propertyName,
                o = t[r].propertyValue,
                a = t[r].operator
            if (null == e[n]) return !1
            if ('EQUALS_TO' === a) {
                if (String(e[n]) !== o) return !1
            } else Br(this, zr).debug('Unsupported operator: '.concat(a))
        }
        return !0
    }
    function mn(e) {
        return wn.apply(this, arguments)
    }
    function wn() {
        return (wn = Mr(
            Ir().mark(function e(r) {
                var n, o, a, i, s, c
                return Ir().wrap(
                    function (e) {
                        for (;;)
                            switch ((e.prev = e.next)) {
                                case 0:
                                    if ([1, 2].includes(r.campaignLimitType)) {
                                        e.next = 2
                                        break
                                    }
                                    return e.abrupt('return', !1)
                                case 2:
                                    return (
                                        (n =
                                            null == r
                                                ? void 0
                                                : r.campaignLimitType),
                                        (e.next = 5),
                                        Br(this, Wr).getItem(we)
                                    )
                                case 5:
                                    if (((e.t0 = e.sent), e.t0)) {
                                        e.next = 8
                                        break
                                    }
                                    e.t0 = [{}, {}, {}]
                                case 8:
                                    if (
                                        ((o = e.t0), n && r.campaignId in o[n])
                                    ) {
                                        e.next = 24
                                        break
                                    }
                                    ;(e.t1 = r.campaignLimitType),
                                        (e.next =
                                            0 === e.t1
                                                ? 13
                                                : 1 === e.t1
                                                  ? 14
                                                  : 2 === e.t1
                                                    ? 16
                                                    : 20)
                                    break
                                case 13:
                                    return e.abrupt('break', 22)
                                case 14:
                                    return (
                                        (o[n][''.concat(r.campaignId)] = -1),
                                        e.abrupt('break', 22)
                                    )
                                case 16:
                                    return (
                                        (a = new Date()),
                                        (i = new Date(
                                            a.getFullYear(),
                                            a.getMonth(),
                                            a.getDate(),
                                            23,
                                            59,
                                            59,
                                            999
                                        )),
                                        (o[n][''.concat(r.campaignId)] =
                                            i.getTime()),
                                        e.abrupt('break', 22)
                                    )
                                case 20:
                                    return (
                                        t.warn(
                                            'Other than Per-Session or Per-Day limit found on backend.'
                                        ),
                                        e.abrupt('break', 22)
                                    )
                                case 22:
                                    return (
                                        Br(this, Wr).setItem(we, o),
                                        e.abrupt('return', !1)
                                    )
                                case 24:
                                    if (-1 !== o[n][r.campaignId]) {
                                        e.next = 26
                                        break
                                    }
                                    return e.abrupt('return', !0)
                                case 26:
                                    if (!(o[n][r.campaignId] >= Date.now())) {
                                        e.next = 30
                                        break
                                    }
                                    return e.abrupt('return', !0)
                                case 30:
                                    ;(e.t2 = n),
                                        (e.next =
                                            0 === e.t2
                                                ? 33
                                                : 1 === e.t2
                                                  ? 34
                                                  : 2 === e.t2
                                                    ? 36
                                                    : 40)
                                    break
                                case 33:
                                    return e.abrupt('break', 42)
                                case 34:
                                    return (
                                        (o[n][''.concat(r.campaignId)] = -1),
                                        e.abrupt('break', 42)
                                    )
                                case 36:
                                    return (
                                        (s = new Date()),
                                        (c = new Date(
                                            s.getFullYear(),
                                            s.getMonth(),
                                            s.getDate(),
                                            23,
                                            59,
                                            59,
                                            999
                                        )),
                                        (o[n][''.concat(r.campaignId)] =
                                            c.getTime()),
                                        e.abrupt('break', 42)
                                    )
                                case 40:
                                    return (
                                        t.warn(
                                            'Other than Per-Session or Per-Day limit found on backend.'
                                        ),
                                        e.abrupt('break', 42)
                                    )
                                case 42:
                                    return (
                                        Br(this, Wr).setItem(we, o),
                                        e.abrupt('return', !1)
                                    )
                                case 44:
                                case 'end':
                                    return e.stop()
                            }
                    },
                    e,
                    this
                )
            })
        )).apply(this, arguments)
    }
    function bn(e) {
        return (
            null != Br(this, Yr).analytics.batchSize[''.concat(e.toUpperCase())]
        )
    }
    function xn(e) {
        return (
            (xn =
                'function' == typeof Symbol &&
                'symbol' == typeof Symbol.iterator
                    ? function (e) {
                          return typeof e
                      }
                    : function (e) {
                          return e &&
                              'function' == typeof Symbol &&
                              e.constructor === Symbol &&
                              e !== Symbol.prototype
                              ? 'symbol'
                              : typeof e
                      }),
            xn(e)
        )
    }
    function kn(e, t) {
        !(function (e, t) {
            if (t.has(e))
                throw new TypeError(
                    'Cannot initialize the same private elements twice on an object'
                )
        })(e, t),
            t.add(e)
    }
    function En(e, t, r) {
        if (!t.has(e))
            throw new TypeError(
                'attempted to get private field on non-instance'
            )
        return r
    }
    function Sn() {
        Sn = function () {
            return e
        }
        var e = {},
            t = Object.prototype,
            r = t.hasOwnProperty,
            n =
                Object.defineProperty ||
                function (e, t, r) {
                    e[t] = r.value
                },
            o = 'function' == typeof Symbol ? Symbol : {},
            a = o.iterator || '@@iterator',
            i = o.asyncIterator || '@@asyncIterator',
            s = o.toStringTag || '@@toStringTag'
        function c(e, t, r) {
            return (
                Object.defineProperty(e, t, {
                    value: r,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                }),
                e[t]
            )
        }
        try {
            c({}, '')
        } catch (e) {
            c = function (e, t, r) {
                return (e[t] = r)
            }
        }
        function u(e, t, r, o) {
            var a = t && t.prototype instanceof p ? t : p,
                i = Object.create(a.prototype),
                s = new L(o || [])
            return n(i, '_invoke', { value: x(e, r, s) }), i
        }
        function l(e, t, r) {
            try {
                return { type: 'normal', arg: e.call(t, r) }
            } catch (e) {
                return { type: 'throw', arg: e }
            }
        }
        e.wrap = u
        var f = {}
        function p() {}
        function h() {}
        function d() {}
        var v = {}
        c(v, a, function () {
            return this
        })
        var y = Object.getPrototypeOf,
            g = y && y(y(O([])))
        g && g !== t && r.call(g, a) && (v = g)
        var m = (d.prototype = p.prototype = Object.create(v))
        function w(e) {
            ;['next', 'throw', 'return'].forEach(function (t) {
                c(e, t, function (e) {
                    return this._invoke(t, e)
                })
            })
        }
        function b(e, t) {
            function o(n, a, i, s) {
                var c = l(e[n], e, a)
                if ('throw' !== c.type) {
                    var u = c.arg,
                        f = u.value
                    return f && 'object' == xn(f) && r.call(f, '__await')
                        ? t.resolve(f.__await).then(
                              function (e) {
                                  o('next', e, i, s)
                              },
                              function (e) {
                                  o('throw', e, i, s)
                              }
                          )
                        : t.resolve(f).then(
                              function (e) {
                                  ;(u.value = e), i(u)
                              },
                              function (e) {
                                  return o('throw', e, i, s)
                              }
                          )
                }
                s(c.arg)
            }
            var a
            n(this, '_invoke', {
                value: function (e, r) {
                    function n() {
                        return new t(function (t, n) {
                            o(e, r, t, n)
                        })
                    }
                    return (a = a ? a.then(n, n) : n())
                },
            })
        }
        function x(e, t, r) {
            var n = 'suspendedStart'
            return function (o, a) {
                if ('executing' === n)
                    throw new Error('Generator is already running')
                if ('completed' === n) {
                    if ('throw' === o) throw a
                    return { value: void 0, done: !0 }
                }
                for (r.method = o, r.arg = a; ; ) {
                    var i = r.delegate
                    if (i) {
                        var s = k(i, r)
                        if (s) {
                            if (s === f) continue
                            return s
                        }
                    }
                    if ('next' === r.method) r.sent = r._sent = r.arg
                    else if ('throw' === r.method) {
                        if ('suspendedStart' === n)
                            throw ((n = 'completed'), r.arg)
                        r.dispatchException(r.arg)
                    } else 'return' === r.method && r.abrupt('return', r.arg)
                    n = 'executing'
                    var c = l(e, t, r)
                    if ('normal' === c.type) {
                        if (
                            ((n = r.done ? 'completed' : 'suspendedYield'),
                            c.arg === f)
                        )
                            continue
                        return { value: c.arg, done: r.done }
                    }
                    'throw' === c.type &&
                        ((n = 'completed'),
                        (r.method = 'throw'),
                        (r.arg = c.arg))
                }
            }
        }
        function k(e, t) {
            var r = t.method,
                n = e.iterator[r]
            if (void 0 === n)
                return (
                    (t.delegate = null),
                    ('throw' === r &&
                        e.iterator.return &&
                        ((t.method = 'return'),
                        (t.arg = void 0),
                        k(e, t),
                        'throw' === t.method)) ||
                        ('return' !== r &&
                            ((t.method = 'throw'),
                            (t.arg = new TypeError(
                                "The iterator does not provide a '" +
                                    r +
                                    "' method"
                            )))),
                    f
                )
            var o = l(n, e.iterator, t.arg)
            if ('throw' === o.type)
                return (
                    (t.method = 'throw'),
                    (t.arg = o.arg),
                    (t.delegate = null),
                    f
                )
            var a = o.arg
            return a
                ? a.done
                    ? ((t[e.resultName] = a.value),
                      (t.next = e.nextLoc),
                      'return' !== t.method &&
                          ((t.method = 'next'), (t.arg = void 0)),
                      (t.delegate = null),
                      f)
                    : a
                : ((t.method = 'throw'),
                  (t.arg = new TypeError('iterator result is not an object')),
                  (t.delegate = null),
                  f)
        }
        function E(e) {
            var t = { tryLoc: e[0] }
            1 in e && (t.catchLoc = e[1]),
                2 in e && ((t.finallyLoc = e[2]), (t.afterLoc = e[3])),
                this.tryEntries.push(t)
        }
        function S(e) {
            var t = e.completion || {}
            ;(t.type = 'normal'), delete t.arg, (e.completion = t)
        }
        function L(e) {
            ;(this.tryEntries = [{ tryLoc: 'root' }]),
                e.forEach(E, this),
                this.reset(!0)
        }
        function O(e) {
            if (e) {
                var t = e[a]
                if (t) return t.call(e)
                if ('function' == typeof e.next) return e
                if (!isNaN(e.length)) {
                    var n = -1,
                        o = function t() {
                            for (; ++n < e.length; )
                                if (r.call(e, n))
                                    return (t.value = e[n]), (t.done = !1), t
                            return (t.value = void 0), (t.done = !0), t
                        }
                    return (o.next = o)
                }
            }
            return { next: P }
        }
        function P() {
            return { value: void 0, done: !0 }
        }
        return (
            (h.prototype = d),
            n(m, 'constructor', { value: d, configurable: !0 }),
            n(d, 'constructor', { value: h, configurable: !0 }),
            (h.displayName = c(d, s, 'GeneratorFunction')),
            (e.isGeneratorFunction = function (e) {
                var t = 'function' == typeof e && e.constructor
                return (
                    !!t &&
                    (t === h ||
                        'GeneratorFunction' === (t.displayName || t.name))
                )
            }),
            (e.mark = function (e) {
                return (
                    Object.setPrototypeOf
                        ? Object.setPrototypeOf(e, d)
                        : ((e.__proto__ = d), c(e, s, 'GeneratorFunction')),
                    (e.prototype = Object.create(m)),
                    e
                )
            }),
            (e.awrap = function (e) {
                return { __await: e }
            }),
            w(b.prototype),
            c(b.prototype, i, function () {
                return this
            }),
            (e.AsyncIterator = b),
            (e.async = function (t, r, n, o, a) {
                void 0 === a && (a = Promise)
                var i = new b(u(t, r, n, o), a)
                return e.isGeneratorFunction(r)
                    ? i
                    : i.next().then(function (e) {
                          return e.done ? e.value : i.next()
                      })
            }),
            w(m),
            c(m, s, 'Generator'),
            c(m, a, function () {
                return this
            }),
            c(m, 'toString', function () {
                return '[object Generator]'
            }),
            (e.keys = function (e) {
                var t = Object(e),
                    r = []
                for (var n in t) r.push(n)
                return (
                    r.reverse(),
                    function e() {
                        for (; r.length; ) {
                            var n = r.pop()
                            if (n in t) return (e.value = n), (e.done = !1), e
                        }
                        return (e.done = !0), e
                    }
                )
            }),
            (e.values = O),
            (L.prototype = {
                constructor: L,
                reset: function (e) {
                    if (
                        ((this.prev = 0),
                        (this.next = 0),
                        (this.sent = this._sent = void 0),
                        (this.done = !1),
                        (this.delegate = null),
                        (this.method = 'next'),
                        (this.arg = void 0),
                        this.tryEntries.forEach(S),
                        !e)
                    )
                        for (var t in this)
                            't' === t.charAt(0) &&
                                r.call(this, t) &&
                                !isNaN(+t.slice(1)) &&
                                (this[t] = void 0)
                },
                stop: function () {
                    this.done = !0
                    var e = this.tryEntries[0].completion
                    if ('throw' === e.type) throw e.arg
                    return this.rval
                },
                dispatchException: function (e) {
                    if (this.done) throw e
                    var t = this
                    function n(r, n) {
                        return (
                            (i.type = 'throw'),
                            (i.arg = e),
                            (t.next = r),
                            n && ((t.method = 'next'), (t.arg = void 0)),
                            !!n
                        )
                    }
                    for (var o = this.tryEntries.length - 1; o >= 0; --o) {
                        var a = this.tryEntries[o],
                            i = a.completion
                        if ('root' === a.tryLoc) return n('end')
                        if (a.tryLoc <= this.prev) {
                            var s = r.call(a, 'catchLoc'),
                                c = r.call(a, 'finallyLoc')
                            if (s && c) {
                                if (this.prev < a.catchLoc)
                                    return n(a.catchLoc, !0)
                                if (this.prev < a.finallyLoc)
                                    return n(a.finallyLoc)
                            } else if (s) {
                                if (this.prev < a.catchLoc)
                                    return n(a.catchLoc, !0)
                            } else {
                                if (!c)
                                    throw new Error(
                                        'try statement without catch or finally'
                                    )
                                if (this.prev < a.finallyLoc)
                                    return n(a.finallyLoc)
                            }
                        }
                    }
                },
                abrupt: function (e, t) {
                    for (var n = this.tryEntries.length - 1; n >= 0; --n) {
                        var o = this.tryEntries[n]
                        if (
                            o.tryLoc <= this.prev &&
                            r.call(o, 'finallyLoc') &&
                            this.prev < o.finallyLoc
                        ) {
                            var a = o
                            break
                        }
                    }
                    a &&
                        ('break' === e || 'continue' === e) &&
                        a.tryLoc <= t &&
                        t <= a.finallyLoc &&
                        (a = null)
                    var i = a ? a.completion : {}
                    return (
                        (i.type = e),
                        (i.arg = t),
                        a
                            ? ((this.method = 'next'),
                              (this.next = a.finallyLoc),
                              f)
                            : this.complete(i)
                    )
                },
                complete: function (e, t) {
                    if ('throw' === e.type) throw e.arg
                    return (
                        'break' === e.type || 'continue' === e.type
                            ? (this.next = e.arg)
                            : 'return' === e.type
                              ? ((this.rval = this.arg = e.arg),
                                (this.method = 'return'),
                                (this.next = 'end'))
                              : 'normal' === e.type && t && (this.next = t),
                        f
                    )
                },
                finish: function (e) {
                    for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                        var r = this.tryEntries[t]
                        if (r.finallyLoc === e)
                            return (
                                this.complete(r.completion, r.afterLoc), S(r), f
                            )
                    }
                },
                catch: function (e) {
                    for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                        var r = this.tryEntries[t]
                        if (r.tryLoc === e) {
                            var n = r.completion
                            if ('throw' === n.type) {
                                var o = n.arg
                                S(r)
                            }
                            return o
                        }
                    }
                    throw new Error('illegal catch attempt')
                },
                delegateYield: function (e, t, r) {
                    return (
                        (this.delegate = {
                            iterator: O(e),
                            resultName: t,
                            nextLoc: r,
                        }),
                        'next' === this.method && (this.arg = void 0),
                        f
                    )
                },
            }),
            e
        )
    }
    function Ln(e, t, r, n, o, a, i) {
        try {
            var s = e[a](i),
                c = s.value
        } catch (e) {
            return void r(e)
        }
        s.done ? t(c) : Promise.resolve(c).then(n, o)
    }
    function On(e) {
        return function () {
            var t = this,
                r = arguments
            return new Promise(function (n, o) {
                var a = e.apply(t, r)
                function i(e) {
                    Ln(a, n, o, i, s, 'next', e)
                }
                function s(e) {
                    Ln(a, n, o, i, s, 'throw', e)
                }
                i(void 0)
            })
        }
    }
    function Pn(e, t) {
        if (!(e instanceof t))
            throw new TypeError('Cannot call a class as a function')
    }
    function Cn(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r]
            ;(n.enumerable = n.enumerable || !1),
                (n.configurable = !0),
                'value' in n && (n.writable = !0),
                Object.defineProperty(
                    e,
                    (void 0,
                    (o = (function (e, t) {
                        if ('object' !== xn(e) || null === e) return e
                        var r = e[Symbol.toPrimitive]
                        if (void 0 !== r) {
                            var n = r.call(e, 'string')
                            if ('object' !== xn(n)) return n
                            throw new TypeError(
                                '@@toPrimitive must return a primitive value.'
                            )
                        }
                        return String(e)
                    })(n.key)),
                    'symbol' === xn(o) ? o : String(o)),
                    n
                )
        }
        var o
    }
    function Tn(e, t, r) {
        return (
            t && Cn(e.prototype, t),
            r && Cn(e, r),
            Object.defineProperty(e, 'prototype', { writable: !1 }),
            e
        )
    }
    var Nn = (function () {
            function e(t) {
                Pn(this, e),
                    (this.storeName = t),
                    (this.data = {}),
                    (this.length = 0)
            }
            return (
                Tn(e, [
                    {
                        key: 'getItem',
                        value: function (e) {
                            return e in this.data ? this.data[e] : null
                        },
                    },
                    {
                        key: 'setItem',
                        value: function (e, t) {
                            ;(this.data[e] = t),
                                (this.length = Object.keys(this.data).length)
                        },
                    },
                    {
                        key: 'removeItem',
                        value: function (e) {
                            delete this.data[e],
                                (this.length = Object.keys(this.data).length)
                        },
                    },
                    {
                        key: 'clear',
                        value: function () {
                            ;(this.data = {}), (this.length = 0)
                        },
                    },
                ]),
                e
            )
        })(),
        In = (function () {
            function e(t) {
                var r =
                    arguments.length > 1 && void 0 !== arguments[1]
                        ? arguments[1]
                        : null
                Pn(this, e),
                    (this.storeName = t),
                    (this.DBname = r || ce),
                    (this.dbPromise = te(r, 1, {
                        upgrade: function (e) {
                            e.createObjectStore(t)
                        },
                    }))
            }
            var t, r, n, o, a, i
            return (
                Tn(e, [
                    {
                        key: 'setDB',
                        value:
                            ((i = On(
                                Sn().mark(function e(t, r) {
                                    return Sn().wrap(
                                        function (e) {
                                            for (;;)
                                                switch ((e.prev = e.next)) {
                                                    case 0:
                                                        this.dbPromise = te(
                                                            t,
                                                            1,
                                                            {
                                                                upgrade:
                                                                    function (
                                                                        e
                                                                    ) {
                                                                        e.createObjectStore(
                                                                            r
                                                                        )
                                                                    },
                                                            }
                                                        )
                                                    case 1:
                                                    case 'end':
                                                        return e.stop()
                                                }
                                        },
                                        e,
                                        this
                                    )
                                })
                            )),
                            function (e, t) {
                                return i.apply(this, arguments)
                            }),
                    },
                    {
                        key: 'getItem',
                        value:
                            ((a = On(
                                Sn().mark(function e(t) {
                                    return Sn().wrap(
                                        function (e) {
                                            for (;;)
                                                switch ((e.prev = e.next)) {
                                                    case 0:
                                                        return (
                                                            (e.next = 2),
                                                            this.dbPromise
                                                        )
                                                    case 2:
                                                        if (
                                                            ((e.t0 = e.sent.get(
                                                                this.storeName,
                                                                t
                                                            )),
                                                            e.t0)
                                                        ) {
                                                            e.next = 5
                                                            break
                                                        }
                                                        e.t0 = null
                                                    case 5:
                                                        return e.abrupt(
                                                            'return',
                                                            e.t0
                                                        )
                                                    case 6:
                                                    case 'end':
                                                        return e.stop()
                                                }
                                        },
                                        e,
                                        this
                                    )
                                })
                            )),
                            function (e) {
                                return a.apply(this, arguments)
                            }),
                    },
                    {
                        key: 'setItem',
                        value:
                            ((o = On(
                                Sn().mark(function e(t, r) {
                                    return Sn().wrap(
                                        function (e) {
                                            for (;;)
                                                switch ((e.prev = e.next)) {
                                                    case 0:
                                                        return (
                                                            (e.next = 2),
                                                            this.dbPromise
                                                        )
                                                    case 2:
                                                        return e.abrupt(
                                                            'return',
                                                            e.sent.put(
                                                                this.storeName,
                                                                r,
                                                                t
                                                            )
                                                        )
                                                    case 3:
                                                    case 'end':
                                                        return e.stop()
                                                }
                                        },
                                        e,
                                        this
                                    )
                                })
                            )),
                            function (e, t) {
                                return o.apply(this, arguments)
                            }),
                    },
                    {
                        key: 'removeItem',
                        value:
                            ((n = On(
                                Sn().mark(function e(t) {
                                    return Sn().wrap(
                                        function (e) {
                                            for (;;)
                                                switch ((e.prev = e.next)) {
                                                    case 0:
                                                        return (
                                                            (e.next = 2),
                                                            this.dbPromise
                                                        )
                                                    case 2:
                                                        return e.abrupt(
                                                            'return',
                                                            e.sent.delete(
                                                                this.storeName,
                                                                t
                                                            )
                                                        )
                                                    case 3:
                                                    case 'end':
                                                        return e.stop()
                                                }
                                        },
                                        e,
                                        this
                                    )
                                })
                            )),
                            function (e) {
                                return n.apply(this, arguments)
                            }),
                    },
                    {
                        key: 'clear',
                        value:
                            ((r = On(
                                Sn().mark(function e() {
                                    return Sn().wrap(
                                        function (e) {
                                            for (;;)
                                                switch ((e.prev = e.next)) {
                                                    case 0:
                                                        return (
                                                            (e.next = 2),
                                                            this.dbPromise
                                                        )
                                                    case 2:
                                                        return e.abrupt(
                                                            'return',
                                                            e.sent.clear(
                                                                this.storeName
                                                            )
                                                        )
                                                    case 3:
                                                    case 'end':
                                                        return e.stop()
                                                }
                                        },
                                        e,
                                        this
                                    )
                                })
                            )),
                            function () {
                                return r.apply(this, arguments)
                            }),
                    },
                    {
                        key: 'closeDB',
                        value:
                            ((t = On(
                                Sn().mark(function e() {
                                    return Sn().wrap(
                                        function (e) {
                                            for (;;)
                                                switch ((e.prev = e.next)) {
                                                    case 0:
                                                        return (
                                                            (e.next = 2),
                                                            this.dbPromise
                                                        )
                                                    case 2:
                                                        return e.abrupt(
                                                            'return',
                                                            e.sent.close()
                                                        )
                                                    case 3:
                                                    case 'end':
                                                        return e.stop()
                                                }
                                        },
                                        e,
                                        this
                                    )
                                })
                            )),
                            function () {
                                return t.apply(this, arguments)
                            }),
                    },
                ]),
                e
            )
        })(),
        jn = new WeakSet(),
        Mn = new WeakSet(),
        _n = new WeakSet(),
        An = (function () {
            function e(t, r) {
                var n =
                    arguments.length > 2 && void 0 !== arguments[2]
                        ? arguments[2]
                        : null
                Pn(this, e),
                    kn(this, _n),
                    kn(this, Mn),
                    kn(this, jn),
                    (this.storeName = t),
                    (this.DBName = r),
                    (this.store = null),
                    (this.storageType = n)
            }
            var t, r, n, o, a
            return (
                Tn(e, [
                    {
                        key: 'init',
                        value:
                            ((a = On(
                                Sn().mark(function e() {
                                    return Sn().wrap(
                                        function (e) {
                                            for (;;)
                                                switch ((e.prev = e.next)) {
                                                    case 0:
                                                        if (
                                                            null !=
                                                            this.storageType
                                                        ) {
                                                            e.next = 11
                                                            break
                                                        }
                                                        return (
                                                            (e.next = 3),
                                                            En(
                                                                this,
                                                                jn,
                                                                Dn
                                                            ).call(this)
                                                        )
                                                    case 3:
                                                        if (!e.sent) {
                                                            e.next = 8
                                                            break
                                                        }
                                                        ;(this.store = new In(
                                                            this.storeName ||
                                                                ue,
                                                            this.DBName || ce
                                                        )),
                                                            (this.storageType =
                                                                'INDEXED_DB'),
                                                            (e.next = 9)
                                                        break
                                                    case 8:
                                                        En(this, Mn, Bn).call(
                                                            this
                                                        )
                                                            ? ((this.store =
                                                                  localStorage),
                                                              (this.storageType =
                                                                  'LOCALSTORAGE'))
                                                            : ((this.store =
                                                                  new Nn(
                                                                      this.storeName
                                                                  )),
                                                              (this.storageType =
                                                                  'IN_MEMORY_STORAGE'))
                                                    case 9:
                                                        e.next = 29
                                                        break
                                                    case 11:
                                                        return (
                                                            (e.next = 13),
                                                            En(
                                                                this,
                                                                jn,
                                                                Dn
                                                            ).call(this)
                                                        )
                                                    case 13:
                                                        if (
                                                            ((e.t0 = e.sent),
                                                            !e.t0)
                                                        ) {
                                                            e.next = 16
                                                            break
                                                        }
                                                        e.t0 =
                                                            'INDEXED_DB' ==
                                                            this.storageType
                                                    case 16:
                                                        if (!e.t0) {
                                                            e.next = 20
                                                            break
                                                        }
                                                        ;(this.store = new In(
                                                            this.storeName ||
                                                                ue,
                                                            this.DBName || ce
                                                        )),
                                                            (e.next = 29)
                                                        break
                                                    case 20:
                                                        if (
                                                            !En(
                                                                this,
                                                                Mn,
                                                                Bn
                                                            ).call(this) ||
                                                            'LOCALSTORAGE' !=
                                                                this.storageType
                                                        ) {
                                                            e.next = 24
                                                            break
                                                        }
                                                        ;(this.store =
                                                            localStorage),
                                                            (e.next = 29)
                                                        break
                                                    case 24:
                                                        if (
                                                            'IN_MEMORY_STORAGE' !=
                                                            this.storageType
                                                        ) {
                                                            e.next = 28
                                                            break
                                                        }
                                                        ;(this.store = new Nn(
                                                            this.storeName
                                                        )),
                                                            (e.next = 29)
                                                        break
                                                    case 28:
                                                        throw Error(
                                                            'Only INDEXED_DB, LOCALSTORAGE or IN_MEMORY_STORAGE supported'
                                                        )
                                                    case 29:
                                                        return e.abrupt(
                                                            'return',
                                                            this.store
                                                        )
                                                    case 30:
                                                    case 'end':
                                                        return e.stop()
                                                }
                                        },
                                        e,
                                        this
                                    )
                                })
                            )),
                            function () {
                                return a.apply(this, arguments)
                            }),
                    },
                    {
                        key: 'getItem',
                        value:
                            ((o = On(
                                Sn().mark(function e(t) {
                                    var r, n
                                    return Sn().wrap(
                                        function (e) {
                                            for (;;)
                                                switch ((e.prev = e.next)) {
                                                    case 0:
                                                        if (
                                                            null !== this.store
                                                        ) {
                                                            e.next = 2
                                                            break
                                                        }
                                                        throw Error(
                                                            'Please init the storage first'
                                                        )
                                                    case 2:
                                                        return (
                                                            (e.next = 4),
                                                            this.store.getItem(
                                                                t
                                                            )
                                                        )
                                                    case 4:
                                                        if (
                                                            ((r = e.sent),
                                                            0 !=
                                                                (n = En(
                                                                    this,
                                                                    _n,
                                                                    Gn
                                                                ).call(
                                                                    this,
                                                                    r
                                                                ))[0])
                                                        ) {
                                                            e.next = 10
                                                            break
                                                        }
                                                        return e.abrupt(
                                                            'return',
                                                            r || null
                                                        )
                                                    case 10:
                                                        return e.abrupt(
                                                            'return',
                                                            n[1] || null
                                                        )
                                                    case 11:
                                                    case 'end':
                                                        return e.stop()
                                                }
                                        },
                                        e,
                                        this
                                    )
                                })
                            )),
                            function (e) {
                                return o.apply(this, arguments)
                            }),
                    },
                    {
                        key: 'setItem',
                        value:
                            ((n = On(
                                Sn().mark(function e(t, r) {
                                    return Sn().wrap(
                                        function (e) {
                                            for (;;)
                                                switch ((e.prev = e.next)) {
                                                    case 0:
                                                        if (
                                                            null !== this.store
                                                        ) {
                                                            e.next = 2
                                                            break
                                                        }
                                                        throw Error(
                                                            'Please init the storage first'
                                                        )
                                                    case 2:
                                                        return (
                                                            xn(r) != String &&
                                                                'INDEXED_DB' !=
                                                                    this
                                                                        .storageType &&
                                                                (r =
                                                                    JSON.stringify(
                                                                        r
                                                                    )),
                                                            (e.next = 5),
                                                            this.store.setItem(
                                                                t,
                                                                r
                                                            )
                                                        )
                                                    case 5:
                                                        return e.abrupt(
                                                            'return',
                                                            e.sent
                                                        )
                                                    case 6:
                                                    case 'end':
                                                        return e.stop()
                                                }
                                        },
                                        e,
                                        this
                                    )
                                })
                            )),
                            function (e, t) {
                                return n.apply(this, arguments)
                            }),
                    },
                    {
                        key: 'removeItem',
                        value:
                            ((r = On(
                                Sn().mark(function e(t) {
                                    return Sn().wrap(
                                        function (e) {
                                            for (;;)
                                                switch ((e.prev = e.next)) {
                                                    case 0:
                                                        if (
                                                            null !== this.store
                                                        ) {
                                                            e.next = 2
                                                            break
                                                        }
                                                        throw Error(
                                                            'Please init the storage first'
                                                        )
                                                    case 2:
                                                        return (
                                                            (e.next = 4),
                                                            this.store.removeItem(
                                                                t
                                                            )
                                                        )
                                                    case 4:
                                                        return e.abrupt(
                                                            'return',
                                                            e.sent
                                                        )
                                                    case 5:
                                                    case 'end':
                                                        return e.stop()
                                                }
                                        },
                                        e,
                                        this
                                    )
                                })
                            )),
                            function (e) {
                                return r.apply(this, arguments)
                            }),
                    },
                    {
                        key: 'clear',
                        value:
                            ((t = On(
                                Sn().mark(function e() {
                                    return Sn().wrap(
                                        function (e) {
                                            for (;;)
                                                switch ((e.prev = e.next)) {
                                                    case 0:
                                                        if (
                                                            null !== this.store
                                                        ) {
                                                            e.next = 2
                                                            break
                                                        }
                                                        throw Error(
                                                            'Please init the storage first'
                                                        )
                                                    case 2:
                                                        return (
                                                            (e.next = 4),
                                                            this.store.clear()
                                                        )
                                                    case 4:
                                                        return e.abrupt(
                                                            'return',
                                                            e.sent
                                                        )
                                                    case 5:
                                                    case 'end':
                                                        return e.stop()
                                                }
                                        },
                                        e,
                                        this
                                    )
                                })
                            )),
                            function () {
                                return t.apply(this, arguments)
                            }),
                    },
                ]),
                e
            )
        })()
    function Dn() {
        return Rn.apply(this, arguments)
    }
    function Rn() {
        return (Rn = On(
            Sn().mark(function e() {
                var t
                return Sn().wrap(
                    function (e) {
                        for (;;)
                            switch ((e.prev = e.next)) {
                                case 0:
                                    return (
                                        (t = new In('Test-KeyVal', 'Test-DB')),
                                        (e.prev = 1),
                                        (e.next = 4),
                                        t.setItem('Test-Key', 'Test-Value')
                                    )
                                case 4:
                                    return (e.next = 6), t.getItem('Test-Key')
                                case 6:
                                    if (
                                        ((e.t0 = e.sent), 'Test-Value' !== e.t0)
                                    ) {
                                        e.next = 12
                                        break
                                    }
                                    return (
                                        t.closeDB(), (e.next = 11), re(t.DBname)
                                    )
                                case 11:
                                    return e.abrupt('return', !0)
                                case 12:
                                    e.next = 20
                                    break
                                case 14:
                                    return (
                                        (e.prev = 14),
                                        (e.t1 = e.catch(1)),
                                        t.closeDB(),
                                        (e.next = 19),
                                        re(t.DBname)
                                    )
                                case 19:
                                    return e.abrupt('return', !1)
                                case 20:
                                case 'end':
                                    return e.stop()
                            }
                    },
                    e,
                    null,
                    [[1, 14]]
                )
            })
        )).apply(this, arguments)
    }
    function Bn() {
        try {
            if (
                (localStorage.setItem('Test-Key', 'Test-Value'),
                'Test-Value' === localStorage.getItem('Test-Key'))
            )
                return localStorage.removeItem('Test-Key'), !0
        } catch (e) {
            return localStorage.removeItem('Test-Key'), !1
        }
    }
    function Gn(e) {
        if ('string' != typeof e) return [!1, e]
        try {
            e = JSON.parse(e)
        } catch (e) {
            return [!1, null]
        }
        return ['object' === xn(e) && null !== e, e]
    }
    function Vn(e, t) {
        var r = Object.keys(e)
        if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(e)
            t &&
                (n = n.filter(function (t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable
                })),
                r.push.apply(r, n)
        }
        return r
    }
    function Fn(e) {
        for (var t = 1; t < arguments.length; t++) {
            var r = null != arguments[t] ? arguments[t] : {}
            t % 2
                ? Vn(Object(r), !0).forEach(function (t) {
                      zn(e, t, r[t])
                  })
                : Object.getOwnPropertyDescriptors
                  ? Object.defineProperties(
                        e,
                        Object.getOwnPropertyDescriptors(r)
                    )
                  : Vn(Object(r)).forEach(function (t) {
                        Object.defineProperty(
                            e,
                            t,
                            Object.getOwnPropertyDescriptor(r, t)
                        )
                    })
        }
        return e
    }
    function zn(e, t, r) {
        return (
            (t = Yn(t)) in e
                ? Object.defineProperty(e, t, {
                      value: r,
                      enumerable: !0,
                      configurable: !0,
                      writable: !0,
                  })
                : (e[t] = r),
            e
        )
    }
    function Wn(e) {
        return (
            (Wn =
                'function' == typeof Symbol &&
                'symbol' == typeof Symbol.iterator
                    ? function (e) {
                          return typeof e
                      }
                    : function (e) {
                          return e &&
                              'function' == typeof Symbol &&
                              e.constructor === Symbol &&
                              e !== Symbol.prototype
                              ? 'symbol'
                              : typeof e
                      }),
            Wn(e)
        )
    }
    function Un() {
        Un = function () {
            return e
        }
        var e = {},
            t = Object.prototype,
            r = t.hasOwnProperty,
            n =
                Object.defineProperty ||
                function (e, t, r) {
                    e[t] = r.value
                },
            o = 'function' == typeof Symbol ? Symbol : {},
            a = o.iterator || '@@iterator',
            i = o.asyncIterator || '@@asyncIterator',
            s = o.toStringTag || '@@toStringTag'
        function c(e, t, r) {
            return (
                Object.defineProperty(e, t, {
                    value: r,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                }),
                e[t]
            )
        }
        try {
            c({}, '')
        } catch (e) {
            c = function (e, t, r) {
                return (e[t] = r)
            }
        }
        function u(e, t, r, o) {
            var a = t && t.prototype instanceof p ? t : p,
                i = Object.create(a.prototype),
                s = new L(o || [])
            return n(i, '_invoke', { value: x(e, r, s) }), i
        }
        function l(e, t, r) {
            try {
                return { type: 'normal', arg: e.call(t, r) }
            } catch (e) {
                return { type: 'throw', arg: e }
            }
        }
        e.wrap = u
        var f = {}
        function p() {}
        function h() {}
        function d() {}
        var v = {}
        c(v, a, function () {
            return this
        })
        var y = Object.getPrototypeOf,
            g = y && y(y(O([])))
        g && g !== t && r.call(g, a) && (v = g)
        var m = (d.prototype = p.prototype = Object.create(v))
        function w(e) {
            ;['next', 'throw', 'return'].forEach(function (t) {
                c(e, t, function (e) {
                    return this._invoke(t, e)
                })
            })
        }
        function b(e, t) {
            function o(n, a, i, s) {
                var c = l(e[n], e, a)
                if ('throw' !== c.type) {
                    var u = c.arg,
                        f = u.value
                    return f && 'object' == Wn(f) && r.call(f, '__await')
                        ? t.resolve(f.__await).then(
                              function (e) {
                                  o('next', e, i, s)
                              },
                              function (e) {
                                  o('throw', e, i, s)
                              }
                          )
                        : t.resolve(f).then(
                              function (e) {
                                  ;(u.value = e), i(u)
                              },
                              function (e) {
                                  return o('throw', e, i, s)
                              }
                          )
                }
                s(c.arg)
            }
            var a
            n(this, '_invoke', {
                value: function (e, r) {
                    function n() {
                        return new t(function (t, n) {
                            o(e, r, t, n)
                        })
                    }
                    return (a = a ? a.then(n, n) : n())
                },
            })
        }
        function x(e, t, r) {
            var n = 'suspendedStart'
            return function (o, a) {
                if ('executing' === n)
                    throw new Error('Generator is already running')
                if ('completed' === n) {
                    if ('throw' === o) throw a
                    return { value: void 0, done: !0 }
                }
                for (r.method = o, r.arg = a; ; ) {
                    var i = r.delegate
                    if (i) {
                        var s = k(i, r)
                        if (s) {
                            if (s === f) continue
                            return s
                        }
                    }
                    if ('next' === r.method) r.sent = r._sent = r.arg
                    else if ('throw' === r.method) {
                        if ('suspendedStart' === n)
                            throw ((n = 'completed'), r.arg)
                        r.dispatchException(r.arg)
                    } else 'return' === r.method && r.abrupt('return', r.arg)
                    n = 'executing'
                    var c = l(e, t, r)
                    if ('normal' === c.type) {
                        if (
                            ((n = r.done ? 'completed' : 'suspendedYield'),
                            c.arg === f)
                        )
                            continue
                        return { value: c.arg, done: r.done }
                    }
                    'throw' === c.type &&
                        ((n = 'completed'),
                        (r.method = 'throw'),
                        (r.arg = c.arg))
                }
            }
        }
        function k(e, t) {
            var r = t.method,
                n = e.iterator[r]
            if (void 0 === n)
                return (
                    (t.delegate = null),
                    ('throw' === r &&
                        e.iterator.return &&
                        ((t.method = 'return'),
                        (t.arg = void 0),
                        k(e, t),
                        'throw' === t.method)) ||
                        ('return' !== r &&
                            ((t.method = 'throw'),
                            (t.arg = new TypeError(
                                "The iterator does not provide a '" +
                                    r +
                                    "' method"
                            )))),
                    f
                )
            var o = l(n, e.iterator, t.arg)
            if ('throw' === o.type)
                return (
                    (t.method = 'throw'),
                    (t.arg = o.arg),
                    (t.delegate = null),
                    f
                )
            var a = o.arg
            return a
                ? a.done
                    ? ((t[e.resultName] = a.value),
                      (t.next = e.nextLoc),
                      'return' !== t.method &&
                          ((t.method = 'next'), (t.arg = void 0)),
                      (t.delegate = null),
                      f)
                    : a
                : ((t.method = 'throw'),
                  (t.arg = new TypeError('iterator result is not an object')),
                  (t.delegate = null),
                  f)
        }
        function E(e) {
            var t = { tryLoc: e[0] }
            1 in e && (t.catchLoc = e[1]),
                2 in e && ((t.finallyLoc = e[2]), (t.afterLoc = e[3])),
                this.tryEntries.push(t)
        }
        function S(e) {
            var t = e.completion || {}
            ;(t.type = 'normal'), delete t.arg, (e.completion = t)
        }
        function L(e) {
            ;(this.tryEntries = [{ tryLoc: 'root' }]),
                e.forEach(E, this),
                this.reset(!0)
        }
        function O(e) {
            if (e) {
                var t = e[a]
                if (t) return t.call(e)
                if ('function' == typeof e.next) return e
                if (!isNaN(e.length)) {
                    var n = -1,
                        o = function t() {
                            for (; ++n < e.length; )
                                if (r.call(e, n))
                                    return (t.value = e[n]), (t.done = !1), t
                            return (t.value = void 0), (t.done = !0), t
                        }
                    return (o.next = o)
                }
            }
            return { next: P }
        }
        function P() {
            return { value: void 0, done: !0 }
        }
        return (
            (h.prototype = d),
            n(m, 'constructor', { value: d, configurable: !0 }),
            n(d, 'constructor', { value: h, configurable: !0 }),
            (h.displayName = c(d, s, 'GeneratorFunction')),
            (e.isGeneratorFunction = function (e) {
                var t = 'function' == typeof e && e.constructor
                return (
                    !!t &&
                    (t === h ||
                        'GeneratorFunction' === (t.displayName || t.name))
                )
            }),
            (e.mark = function (e) {
                return (
                    Object.setPrototypeOf
                        ? Object.setPrototypeOf(e, d)
                        : ((e.__proto__ = d), c(e, s, 'GeneratorFunction')),
                    (e.prototype = Object.create(m)),
                    e
                )
            }),
            (e.awrap = function (e) {
                return { __await: e }
            }),
            w(b.prototype),
            c(b.prototype, i, function () {
                return this
            }),
            (e.AsyncIterator = b),
            (e.async = function (t, r, n, o, a) {
                void 0 === a && (a = Promise)
                var i = new b(u(t, r, n, o), a)
                return e.isGeneratorFunction(r)
                    ? i
                    : i.next().then(function (e) {
                          return e.done ? e.value : i.next()
                      })
            }),
            w(m),
            c(m, s, 'Generator'),
            c(m, a, function () {
                return this
            }),
            c(m, 'toString', function () {
                return '[object Generator]'
            }),
            (e.keys = function (e) {
                var t = Object(e),
                    r = []
                for (var n in t) r.push(n)
                return (
                    r.reverse(),
                    function e() {
                        for (; r.length; ) {
                            var n = r.pop()
                            if (n in t) return (e.value = n), (e.done = !1), e
                        }
                        return (e.done = !0), e
                    }
                )
            }),
            (e.values = O),
            (L.prototype = {
                constructor: L,
                reset: function (e) {
                    if (
                        ((this.prev = 0),
                        (this.next = 0),
                        (this.sent = this._sent = void 0),
                        (this.done = !1),
                        (this.delegate = null),
                        (this.method = 'next'),
                        (this.arg = void 0),
                        this.tryEntries.forEach(S),
                        !e)
                    )
                        for (var t in this)
                            't' === t.charAt(0) &&
                                r.call(this, t) &&
                                !isNaN(+t.slice(1)) &&
                                (this[t] = void 0)
                },
                stop: function () {
                    this.done = !0
                    var e = this.tryEntries[0].completion
                    if ('throw' === e.type) throw e.arg
                    return this.rval
                },
                dispatchException: function (e) {
                    if (this.done) throw e
                    var t = this
                    function n(r, n) {
                        return (
                            (i.type = 'throw'),
                            (i.arg = e),
                            (t.next = r),
                            n && ((t.method = 'next'), (t.arg = void 0)),
                            !!n
                        )
                    }
                    for (var o = this.tryEntries.length - 1; o >= 0; --o) {
                        var a = this.tryEntries[o],
                            i = a.completion
                        if ('root' === a.tryLoc) return n('end')
                        if (a.tryLoc <= this.prev) {
                            var s = r.call(a, 'catchLoc'),
                                c = r.call(a, 'finallyLoc')
                            if (s && c) {
                                if (this.prev < a.catchLoc)
                                    return n(a.catchLoc, !0)
                                if (this.prev < a.finallyLoc)
                                    return n(a.finallyLoc)
                            } else if (s) {
                                if (this.prev < a.catchLoc)
                                    return n(a.catchLoc, !0)
                            } else {
                                if (!c)
                                    throw new Error(
                                        'try statement without catch or finally'
                                    )
                                if (this.prev < a.finallyLoc)
                                    return n(a.finallyLoc)
                            }
                        }
                    }
                },
                abrupt: function (e, t) {
                    for (var n = this.tryEntries.length - 1; n >= 0; --n) {
                        var o = this.tryEntries[n]
                        if (
                            o.tryLoc <= this.prev &&
                            r.call(o, 'finallyLoc') &&
                            this.prev < o.finallyLoc
                        ) {
                            var a = o
                            break
                        }
                    }
                    a &&
                        ('break' === e || 'continue' === e) &&
                        a.tryLoc <= t &&
                        t <= a.finallyLoc &&
                        (a = null)
                    var i = a ? a.completion : {}
                    return (
                        (i.type = e),
                        (i.arg = t),
                        a
                            ? ((this.method = 'next'),
                              (this.next = a.finallyLoc),
                              f)
                            : this.complete(i)
                    )
                },
                complete: function (e, t) {
                    if ('throw' === e.type) throw e.arg
                    return (
                        'break' === e.type || 'continue' === e.type
                            ? (this.next = e.arg)
                            : 'return' === e.type
                              ? ((this.rval = this.arg = e.arg),
                                (this.method = 'return'),
                                (this.next = 'end'))
                              : 'normal' === e.type && t && (this.next = t),
                        f
                    )
                },
                finish: function (e) {
                    for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                        var r = this.tryEntries[t]
                        if (r.finallyLoc === e)
                            return (
                                this.complete(r.completion, r.afterLoc), S(r), f
                            )
                    }
                },
                catch: function (e) {
                    for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                        var r = this.tryEntries[t]
                        if (r.tryLoc === e) {
                            var n = r.completion
                            if ('throw' === n.type) {
                                var o = n.arg
                                S(r)
                            }
                            return o
                        }
                    }
                    throw new Error('illegal catch attempt')
                },
                delegateYield: function (e, t, r) {
                    return (
                        (this.delegate = {
                            iterator: O(e),
                            resultName: t,
                            nextLoc: r,
                        }),
                        'next' === this.method && (this.arg = void 0),
                        f
                    )
                },
            }),
            e
        )
    }
    function Jn(e, t, r, n, o, a, i) {
        try {
            var s = e[a](i),
                c = s.value
        } catch (e) {
            return void r(e)
        }
        s.done ? t(c) : Promise.resolve(c).then(n, o)
    }
    function Kn(e) {
        return function () {
            var t = this,
                r = arguments
            return new Promise(function (n, o) {
                var a = e.apply(t, r)
                function i(e) {
                    Jn(a, n, o, i, s, 'next', e)
                }
                function s(e) {
                    Jn(a, n, o, i, s, 'throw', e)
                }
                i(void 0)
            })
        }
    }
    function qn(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r]
            ;(n.enumerable = n.enumerable || !1),
                (n.configurable = !0),
                'value' in n && (n.writable = !0),
                Object.defineProperty(e, Yn(n.key), n)
        }
    }
    function Yn(e) {
        var t = (function (e, t) {
            if ('object' !== Wn(e) || null === e) return e
            var r = e[Symbol.toPrimitive]
            if (void 0 !== r) {
                var n = r.call(e, 'string')
                if ('object' !== Wn(n)) return n
                throw new TypeError(
                    '@@toPrimitive must return a primitive value.'
                )
            }
            return String(e)
        })(e)
        return 'symbol' === Wn(t) ? t : String(t)
    }
    function Hn(e, t) {
        Zn(e, t), t.add(e)
    }
    function Qn(e, t, r) {
        Zn(e, t), t.set(e, r)
    }
    function Zn(e, t) {
        if (t.has(e))
            throw new TypeError(
                'Cannot initialize the same private elements twice on an object'
            )
    }
    function Xn(e, t, r) {
        if (!t.has(e))
            throw new TypeError(
                'attempted to get private field on non-instance'
            )
        return r
    }
    function $n(e, t) {
        return (function (e, t) {
            return t.get ? t.get.call(e) : t.value
        })(e, to(e, t, 'get'))
    }
    function eo(e, t, r) {
        return (
            (function (e, t, r) {
                if (t.set) t.set.call(e, r)
                else {
                    if (!t.writable)
                        throw new TypeError(
                            'attempted to set read only private field'
                        )
                    t.value = r
                }
            })(e, to(e, t, 'set'), r),
            r
        )
    }
    function to(e, t, r) {
        if (!t.has(e))
            throw new TypeError(
                'attempted to ' + r + ' private field on non-instance'
            )
        return t.get(e)
    }
    var ro = new WeakMap(),
        no = new WeakMap(),
        oo = new WeakMap(),
        ao = new WeakMap(),
        io = new WeakMap(),
        so = new WeakMap(),
        co = new WeakSet(),
        uo = new WeakSet()
    function lo() {
        for (
            var e = null, t = document.getElementsByTagName('link'), r = 0;
            r < t.length;
            r++
        )
            ('icon' != t[r].getAttribute('rel') &&
                'shortcut icon' != t[r].getAttribute('rel')) ||
                (e = t[r].href)
        return (
            null == e &&
                (e = ''.concat(window.location.origin, '/favicon.ico')),
            e
        )
    }
    function fo() {
        return po.apply(this, arguments)
    }
    function po() {
        return (po = Kn(
            Un().mark(function e() {
                var t, r
                return Un().wrap(
                    function (e) {
                        for (;;)
                            switch ((e.prev = e.next)) {
                                case 0:
                                    return (
                                        (e.next = 2),
                                        this.createTag([], 'custom', 'DEVICE')
                                    )
                                case 2:
                                    return (
                                        (e.next = 4),
                                        this.createTag([], 'default', 'DEVICE')
                                    )
                                case 4:
                                    return (
                                        (e.next = 6), $n(this, io).getItem(we)
                                    )
                                case 6:
                                    if (((e.t0 = e.sent), e.t0)) {
                                        e.next = 9
                                        break
                                    }
                                    e.t0 = [{}, {}, {}]
                                case 9:
                                    return (
                                        ((t = e.t0)[1] = {}),
                                        (e.next = 13),
                                        $n(this, io).setItem(we, t)
                                    )
                                case 13:
                                    if (
                                        ((r = h()),
                                        localStorage.getItem('systemTags') ===
                                            JSON.stringify(r))
                                    ) {
                                        e.next = 18
                                        break
                                    }
                                    this.createTag(r, 'system', 'DEVICE').then(
                                        function (e) {
                                            e.success &&
                                                localStorage.setItem(
                                                    'systemTags',
                                                    JSON.stringify(r)
                                                )
                                        }
                                    ),
                                        (e.next = 20)
                                    break
                                case 18:
                                    return (
                                        (e.next = 20),
                                        this.createTag([], 'system', 'DEVICE')
                                    )
                                case 20:
                                    return (
                                        (e.prev = 20),
                                        (e.next = 23),
                                        this.flushAllEvents()
                                    )
                                case 23:
                                    e.next = 28
                                    break
                                case 25:
                                    ;(e.prev = 25),
                                        (e.t1 = e.catch(20)),
                                        $n(this, ro).info(
                                            'No Events to flush on launch or Other error.'
                                        )
                                case 28:
                                case 'end':
                                    return e.stop()
                            }
                    },
                    e,
                    this,
                    [[20, 25]]
                )
            })
        )).apply(this, arguments)
    }
    const ho = new ((function () {
        function e() {
            !(function (e, t) {
                if (!(e instanceof t))
                    throw new TypeError('Cannot call a class as a function')
            })(this, e),
                Hn(this, uo),
                Hn(this, co),
                Qn(this, ro, { writable: !0, value: void 0 }),
                Qn(this, no, { writable: !0, value: void 0 }),
                Qn(this, oo, { writable: !0, value: void 0 }),
                Qn(this, ao, { writable: !0, value: void 0 }),
                Qn(this, io, { writable: !0, value: void 0 }),
                Qn(this, so, { writable: !0, value: void 0 }),
                eo(this, ro, t),
                eo(this, io, new An()),
                eo(this, so, new BroadcastChannel('push_brodcast_channel')),
                eo(
                    this,
                    no,
                    new mt({
                        logger: $n(this, ro),
                        broadcastChannel: $n(this, so),
                        storage: $n(this, io),
                    })
                ),
                eo(
                    this,
                    oo,
                    new Or({ logger: $n(this, ro), storage: $n(this, io) })
                ),
                eo(
                    this,
                    ao,
                    new on({
                        logger: $n(this, ro),
                        storage: $n(this, io),
                        analyticsHandler: null,
                        APIHandler: $n(this, no),
                        notificationHandler: $n(this, oo),
                        broadcastChannel: $n(this, so),
                    })
                )
        }
        var n, o, a
        return (
            (n = e),
            (o = [
                {
                    key: 'init',
                    value: function (e, t) {
                        var n = this,
                            o =
                                arguments.length > 2 && void 0 !== arguments[2]
                                    ? arguments[2]
                                    : null,
                            a = new Promise(
                                (function () {
                                    var a = Kn(
                                        Un().mark(function a(i) {
                                            return Un().wrap(function (a) {
                                                for (;;)
                                                    switch ((a.prev = a.next)) {
                                                        case 0:
                                                            return (
                                                                (a.next = 2),
                                                                $n(n, io).init()
                                                            )
                                                        case 2:
                                                            e.logLevel &&
                                                                $n(
                                                                    n,
                                                                    ro
                                                                ).setLogLevel(
                                                                    $n(n, ro)
                                                                        .LOG_LEVEL[
                                                                        ''.concat(
                                                                            e.logLevel.toLowerCase()
                                                                        )
                                                                    ]
                                                                ),
                                                                e.notificationCenter &&
                                                                    (n.NotificationCenter =
                                                                        Xe),
                                                                (n.getConfigCallback =
                                                                    o),
                                                                Object.keys(
                                                                    e
                                                                ).forEach(
                                                                    function (
                                                                        t
                                                                    ) {
                                                                        r.pushParams &&
                                                                            Object.prototype.hasOwnProperty.call(
                                                                                r.pushParams,
                                                                                t
                                                                            ) &&
                                                                            (r.pushParams[
                                                                                t
                                                                            ] =
                                                                                e[
                                                                                    t
                                                                                ])
                                                                    }
                                                                ),
                                                                Object.prototype.hasOwnProperty.call(
                                                                    e,
                                                                    'fcm'
                                                                ) &&
                                                                    (r.fcm =
                                                                        e.fcm),
                                                                t &&
                                                                    (r.meta.deviceSubType =
                                                                        t),
                                                                n
                                                                    .InitConfig()
                                                                    .then(
                                                                        function () {
                                                                            return i()
                                                                        }
                                                                    )
                                                        case 9:
                                                        case 'end':
                                                            return a.stop()
                                                    }
                                            }, a)
                                        })
                                    )
                                    return function (e) {
                                        return a.apply(this, arguments)
                                    }
                                })()
                            )
                        return a
                    },
                },
                {
                    key: 'InitConfig',
                    value:
                        ((a = Kn(
                            Un().mark(function e() {
                                var n,
                                    o = this
                                return Un().wrap(function (e) {
                                    for (;;)
                                        switch ((e.prev = e.next)) {
                                            case 0:
                                                return (
                                                    (n = new Promise(
                                                        (function () {
                                                            var e = Kn(
                                                                Un().mark(
                                                                    function e(
                                                                        n
                                                                    ) {
                                                                        var a,
                                                                            i,
                                                                            s,
                                                                            c,
                                                                            u,
                                                                            l,
                                                                            f
                                                                        return Un().wrap(
                                                                            function (
                                                                                e
                                                                            ) {
                                                                                for (;;)
                                                                                    switch (
                                                                                        (e.prev =
                                                                                            e.next)
                                                                                    ) {
                                                                                        case 0:
                                                                                            if (
                                                                                                !r.fcm
                                                                                            ) {
                                                                                                e.next = 4
                                                                                                break
                                                                                            }
                                                                                            return (
                                                                                                t.info(
                                                                                                    'trying saving FCM data in DB...'
                                                                                                ),
                                                                                                (e.next = 4),
                                                                                                Le.set(
                                                                                                    'FCM',
                                                                                                    JSON.stringify(
                                                                                                        r.fcm
                                                                                                    )
                                                                                                )
                                                                                            )
                                                                                        case 4:
                                                                                            if (
                                                                                                (t.info(
                                                                                                    'Fetching required config...'
                                                                                                ),
                                                                                                !r
                                                                                                    .pushParams
                                                                                                    .env ||
                                                                                                    !r
                                                                                                        .pushParams
                                                                                                        .an)
                                                                                            ) {
                                                                                                e.next = 18
                                                                                                break
                                                                                            }
                                                                                            return (
                                                                                                Le.set(
                                                                                                    'logLevel',
                                                                                                    r
                                                                                                        .pushParams
                                                                                                        .logLevel
                                                                                                ),
                                                                                                Le.set(
                                                                                                    'favicon',
                                                                                                    Xn(
                                                                                                        o,
                                                                                                        co,
                                                                                                        lo
                                                                                                    ).call(
                                                                                                        o
                                                                                                    )
                                                                                                ),
                                                                                                (a =
                                                                                                    pe.config
                                                                                                        .replace(
                                                                                                            '{env}',
                                                                                                            r.pushParams.env.toLowerCase()
                                                                                                        )
                                                                                                        .replace(
                                                                                                            '{pn}',
                                                                                                            r
                                                                                                                .pushParams
                                                                                                                .pn
                                                                                                        )),
                                                                                                (e.next = 11),
                                                                                                z.execute(
                                                                                                    'GET',
                                                                                                    a,
                                                                                                    null,
                                                                                                    null
                                                                                                )
                                                                                            )
                                                                                        case 11:
                                                                                            return (
                                                                                                200 ===
                                                                                                    (i =
                                                                                                        e.sent)
                                                                                                        .status &&
                                                                                                    ((u =
                                                                                                        JSON.parse(
                                                                                                            i.body ||
                                                                                                                ''
                                                                                                        )),
                                                                                                    (r.analytics.batchSize =
                                                                                                        u.batchSize),
                                                                                                    (r.analytics.enableAnalytics =
                                                                                                        u.enableAnalytics),
                                                                                                    (r.analytics.enableBatching =
                                                                                                        u.enableBatching),
                                                                                                    (r.analytics.compressFormat =
                                                                                                        u.compressFormat),
                                                                                                    null !=
                                                                                                        u &&
                                                                                                        u.httpRequestConfig &&
                                                                                                        ((r.retryConfig =
                                                                                                            null ==
                                                                                                            u
                                                                                                                ? void 0
                                                                                                                : u.httpRequestConfig),
                                                                                                        (r.retryConfig.perAPIcallTimeout =
                                                                                                            1e3 *
                                                                                                            r
                                                                                                                .retryConfig
                                                                                                                .perAPIcallTimeout),
                                                                                                        (r.retryConfig.timeBtw2RetryRequest =
                                                                                                            1e3 *
                                                                                                            r
                                                                                                                .retryConfig
                                                                                                                .timeBtw2RetryRequest)),
                                                                                                    null !=
                                                                                                        u &&
                                                                                                        u.cacheConfig &&
                                                                                                        ((r.cacheConfig =
                                                                                                            u.cacheConfig),
                                                                                                        (r.cacheConfig.inApp.invalidationTime =
                                                                                                            60 *
                                                                                                            r
                                                                                                                .cacheConfig
                                                                                                                .inApp
                                                                                                                .invalidationTime *
                                                                                                            1e3),
                                                                                                        (r.cacheConfig.nativeDisplay.invalidationTime =
                                                                                                            60 *
                                                                                                            r
                                                                                                                .cacheConfig
                                                                                                                .inApp
                                                                                                                .invalidationTime *
                                                                                                            1e3)),
                                                                                                    ($n(
                                                                                                        o,
                                                                                                        no
                                                                                                    ).perAPIcallTimeout =
                                                                                                        r.retryConfig.perAPIcallTimeout),
                                                                                                    ($n(
                                                                                                        o,
                                                                                                        no
                                                                                                    ).maxRetryAllowed =
                                                                                                        r.retryConfig.maxRetryAllowed),
                                                                                                    ($n(
                                                                                                        o,
                                                                                                        no
                                                                                                    ).timeBtw2RetryRequest =
                                                                                                        r.retryConfig.timeBtw2RetryRequest),
                                                                                                    null !=
                                                                                                        u &&
                                                                                                        null !==
                                                                                                            (s =
                                                                                                                u.events) &&
                                                                                                        void 0 !==
                                                                                                            s &&
                                                                                                        s.live &&
                                                                                                        (u.events.live.includes(
                                                                                                            'App Launched'
                                                                                                        ) ||
                                                                                                            u.events.live.push(
                                                                                                                'App Launched'
                                                                                                            ),
                                                                                                        u.events.live.includes(
                                                                                                            'App Closed'
                                                                                                        ) ||
                                                                                                            u.events.live.push(
                                                                                                                'App Closed'
                                                                                                            ),
                                                                                                        u.events.live.includes(
                                                                                                            'App Installed'
                                                                                                        ) ||
                                                                                                            u.events.live.push(
                                                                                                                'App Installed'
                                                                                                            )),
                                                                                                    $n(
                                                                                                        o,
                                                                                                        io
                                                                                                    ).setItem(
                                                                                                        ve,
                                                                                                        null ==
                                                                                                            u ||
                                                                                                            null ===
                                                                                                                (c =
                                                                                                                    u.events) ||
                                                                                                            void 0 ===
                                                                                                                c
                                                                                                            ? void 0
                                                                                                            : c.live
                                                                                                    ),
                                                                                                    t.info(
                                                                                                        'Analytics config fetched and parsed...'
                                                                                                    )),
                                                                                                (l =
                                                                                                    pe.cdn
                                                                                                        .replace(
                                                                                                            '{env}',
                                                                                                            r.pushParams.env.toLowerCase()
                                                                                                        )
                                                                                                        .replace(
                                                                                                            '{pn}',
                                                                                                            r
                                                                                                                .pushParams
                                                                                                                .pn
                                                                                                        )),
                                                                                                (e.next = 16),
                                                                                                z.execute(
                                                                                                    'GET',
                                                                                                    l,
                                                                                                    null,
                                                                                                    null
                                                                                                )
                                                                                            )
                                                                                        case 16:
                                                                                            ;(i =
                                                                                                e.sent)
                                                                                                .status &&
                                                                                                ((f =
                                                                                                    JSON.parse(
                                                                                                        i.body ||
                                                                                                            ''
                                                                                                    )),
                                                                                                r
                                                                                                    .analytics
                                                                                                    .compressFormat
                                                                                                    ? (r.cdn.analytics =
                                                                                                          f.analytics)
                                                                                                    : (r.cdn.analytics =
                                                                                                          f[
                                                                                                              'analytics-uncompressed'
                                                                                                          ]),
                                                                                                (r.cdn.register =
                                                                                                    f.register),
                                                                                                (r.cdn.tagregistration =
                                                                                                    f.tagregistration),
                                                                                                (r.cdn.topicregister =
                                                                                                    f.topicregister),
                                                                                                (r.cdn.topicunregister =
                                                                                                    f.topicunregister),
                                                                                                (r.cdn.getInAppSegments =
                                                                                                    f.getInAppSegments),
                                                                                                (r.cdn.getNativeDisplaySegments =
                                                                                                    f.getNativeDisplaySegments),
                                                                                                (r.cdn.getGlimit =
                                                                                                    f.getGlimit),
                                                                                                t.info(
                                                                                                    'CDN config fetched and parsed...'
                                                                                                ))
                                                                                        case 18:
                                                                                            n()
                                                                                        case 19:
                                                                                        case 'end':
                                                                                            return e.stop()
                                                                                    }
                                                                            },
                                                                            e
                                                                        )
                                                                    }
                                                                )
                                                            )
                                                            return function (
                                                                t
                                                            ) {
                                                                return e.apply(
                                                                    this,
                                                                    arguments
                                                                )
                                                            }
                                                        })()
                                                    )),
                                                    e.abrupt('return', n)
                                                )
                                            case 2:
                                            case 'end':
                                                return e.stop()
                                        }
                                }, e)
                            })
                        )),
                        function () {
                            return a.apply(this, arguments)
                        }),
                },
                {
                    key: 'handleServiceWorker',
                    value: function (e, n) {
                        var o = this,
                            a = new Promise(
                                (function () {
                                    var a = Kn(
                                        Un().mark(function a(i) {
                                            var s, c, u, l, f, p, m, b
                                            return Un().wrap(function (a) {
                                                for (;;)
                                                    switch ((a.prev = a.next)) {
                                                        case 0:
                                                            return (
                                                                (a.next = 2),
                                                                k.getToken(e)
                                                            )
                                                        case 2:
                                                            if (
                                                                ((x = s =
                                                                    a.sent),
                                                                void 0,
                                                                void 0,
                                                                (S =
                                                                    localStorage.getItem(
                                                                        'ar'
                                                                    ) || !1),
                                                                (L =
                                                                    localStorage.getItem(
                                                                        'ot'
                                                                    ) || !1),
                                                                S &&
                                                                    L &&
                                                                    L == x)
                                                            ) {
                                                                a.next = 10
                                                                break
                                                            }
                                                            return (
                                                                (a.next = 6),
                                                                y()
                                                            )
                                                        case 6:
                                                            Wn((c = a.sent)) !=
                                                                ('undefined' ==
                                                                typeof Object
                                                                    ? 'undefined'
                                                                    : Wn(
                                                                          Object
                                                                      )) && e
                                                                ? ((r.pushParams.aid =
                                                                      c),
                                                                  E.registerMessageCallback(
                                                                      n
                                                                  ),
                                                                  (r.pushParams.token =
                                                                      s),
                                                                  (u = {}),
                                                                  Object.assign(
                                                                      u,
                                                                      r.pushParams
                                                                  ),
                                                                  Object.prototype.hasOwnProperty.call(
                                                                      u,
                                                                      'dt'
                                                                  ) ||
                                                                      (u.dt =
                                                                          'web'),
                                                                  (u.ed = ''
                                                                      .concat(
                                                                          new Date()
                                                                              .toISOString()
                                                                              .substring(
                                                                                  0,
                                                                                  10
                                                                              ),
                                                                          ' '
                                                                      )
                                                                      .concat(
                                                                          new Date()
                                                                              .toTimeString()
                                                                              .substring(
                                                                                  0,
                                                                                  8
                                                                              )
                                                                      )),
                                                                  v(
                                                                      u,
                                                                      r.valkeys
                                                                  )
                                                                      ? ((l =
                                                                            r
                                                                                .cdn
                                                                                .register ||
                                                                            ''),
                                                                        (f = {
                                                                            'Content-Type':
                                                                                'application/json',
                                                                        }),
                                                                        l
                                                                            ? (Object.prototype.hasOwnProperty.call(
                                                                                  u,
                                                                                  'env'
                                                                              ) &&
                                                                                  delete u.env,
                                                                              z
                                                                                  .execute(
                                                                                      'POST',
                                                                                      l,
                                                                                      JSON.stringify(
                                                                                          u
                                                                                      ),
                                                                                      f
                                                                                  )
                                                                                  .then(
                                                                                      (function () {
                                                                                          var t =
                                                                                              Kn(
                                                                                                  Un().mark(
                                                                                                      function t(
                                                                                                          n
                                                                                                      ) {
                                                                                                          var a
                                                                                                          return Un().wrap(
                                                                                                              function (
                                                                                                                  t
                                                                                                              ) {
                                                                                                                  for (;;)
                                                                                                                      switch (
                                                                                                                          (t.prev =
                                                                                                                              t.next)
                                                                                                                      ) {
                                                                                                                          case 0:
                                                                                                                              return (
                                                                                                                                  localStorage.setItem(
                                                                                                                                      'ar',
                                                                                                                                      !0
                                                                                                                                  ),
                                                                                                                                  localStorage.setItem(
                                                                                                                                      'ot',
                                                                                                                                      s
                                                                                                                                  ),
                                                                                                                                  (r.hostPath =
                                                                                                                                      window.location.href),
                                                                                                                                  E.postMessageToServiceWorker(
                                                                                                                                      e,
                                                                                                                                      r
                                                                                                                                  ),
                                                                                                                                  (a =
                                                                                                                                      h()),
                                                                                                                                  o
                                                                                                                                      .createTag(
                                                                                                                                          a,
                                                                                                                                          'system',
                                                                                                                                          'DEVICE'
                                                                                                                                      )
                                                                                                                                      .then(
                                                                                                                                          function (
                                                                                                                                              e
                                                                                                                                          ) {
                                                                                                                                              e.success &&
                                                                                                                                                  localStorage.setItem(
                                                                                                                                                      'systemTags',
                                                                                                                                                      JSON.stringify(
                                                                                                                                                          a
                                                                                                                                                      )
                                                                                                                                                  )
                                                                                                                                          }
                                                                                                                                      ),
                                                                                                                                  (t.next = 8),
                                                                                                                                  $n(
                                                                                                                                      o,
                                                                                                                                      io
                                                                                                                                  ).setItem(
                                                                                                                                      we,
                                                                                                                                      [
                                                                                                                                          {},
                                                                                                                                          {},
                                                                                                                                          {},
                                                                                                                                      ]
                                                                                                                                  )
                                                                                                                              )
                                                                                                                          case 8:
                                                                                                                              $n(
                                                                                                                                  o,
                                                                                                                                  no
                                                                                                                              )
                                                                                                                                  .getInAppSegment()
                                                                                                                                  .catch(
                                                                                                                                      function () {
                                                                                                                                          $n(
                                                                                                                                              o,
                                                                                                                                              ro
                                                                                                                                          ).error(
                                                                                                                                              'Cannot fetch In App Notification'
                                                                                                                                          )
                                                                                                                                      }
                                                                                                                                  ),
                                                                                                                                  $n(
                                                                                                                                      o,
                                                                                                                                      no
                                                                                                                                  )
                                                                                                                                      .getNativeDisplaySegment()
                                                                                                                                      .catch(
                                                                                                                                          function () {
                                                                                                                                              $n(
                                                                                                                                                  o,
                                                                                                                                                  ro
                                                                                                                                              ).error(
                                                                                                                                                  'Cannot fetch Native Display Notification'
                                                                                                                                              )
                                                                                                                                          }
                                                                                                                                      ),
                                                                                                                                  o
                                                                                                                                      .logEvent(
                                                                                                                                          'APP',
                                                                                                                                          'App Installed',
                                                                                                                                          null,
                                                                                                                                          null
                                                                                                                                      )
                                                                                                                                      .catch(
                                                                                                                                          function (
                                                                                                                                              e
                                                                                                                                          ) {
                                                                                                                                              $n(
                                                                                                                                                  o,
                                                                                                                                                  ro
                                                                                                                                              ).error(
                                                                                                                                                  'Cannot send App install event, because: '.concat(
                                                                                                                                                      e
                                                                                                                                                  )
                                                                                                                                              )
                                                                                                                                          }
                                                                                                                                      ),
                                                                                                                                  window.addEventListener(
                                                                                                                                      'beforeunload',
                                                                                                                                      function () {
                                                                                                                                          window.JioPush.logEvent(
                                                                                                                                              'APP',
                                                                                                                                              'App Closed',
                                                                                                                                              null,
                                                                                                                                              null
                                                                                                                                          )
                                                                                                                                      }
                                                                                                                                  ),
                                                                                                                                  i(
                                                                                                                                      d(
                                                                                                                                          !0,
                                                                                                                                          Fn(
                                                                                                                                              Fn(
                                                                                                                                                  {},
                                                                                                                                                  n
                                                                                                                                              ),
                                                                                                                                              {},
                                                                                                                                              {
                                                                                                                                                  data: {
                                                                                                                                                      uid: r
                                                                                                                                                          .pushParams
                                                                                                                                                          .aid,
                                                                                                                                                      token: r
                                                                                                                                                          .pushParams
                                                                                                                                                          .token,
                                                                                                                                                  },
                                                                                                                                              }
                                                                                                                                          )
                                                                                                                                      )
                                                                                                                                  )
                                                                                                                          case 13:
                                                                                                                          case 'end':
                                                                                                                              return t.stop()
                                                                                                                      }
                                                                                                              },
                                                                                                              t
                                                                                                          )
                                                                                                      }
                                                                                                  )
                                                                                              )
                                                                                          return function (
                                                                                              e
                                                                                          ) {
                                                                                              return t.apply(
                                                                                                  this,
                                                                                                  arguments
                                                                                              )
                                                                                          }
                                                                                      })()
                                                                                  )
                                                                                  .catch(
                                                                                      function (
                                                                                          e
                                                                                      ) {
                                                                                          i(
                                                                                              d(
                                                                                                  !1,
                                                                                                  e
                                                                                              )
                                                                                          )
                                                                                      }
                                                                                  ))
                                                                            : (t.error(
                                                                                  'register url is unknown.'
                                                                              ),
                                                                              i(
                                                                                  d(
                                                                                      !1,
                                                                                      'register url is unknown.'
                                                                                  )
                                                                              )))
                                                                      : (t.error(
                                                                            'Validation on body parameter failed.'
                                                                        ),
                                                                        i(
                                                                            d(
                                                                                !1,
                                                                                'Validation on body parameter failed.'
                                                                            )
                                                                        )))
                                                                : i(d(!1, c)),
                                                                (a.next = 20)
                                                            break
                                                        case 10:
                                                            E.postMessageToServiceWorker(
                                                                e,
                                                                r
                                                            ),
                                                                Xn(
                                                                    o,
                                                                    uo,
                                                                    fo
                                                                ).call(o),
                                                                $n(o, no)
                                                                    .getInAppSegment()
                                                                    .catch(
                                                                        function () {
                                                                            $n(
                                                                                o,
                                                                                ro
                                                                            ).error(
                                                                                'Cannot fetch In App Notification'
                                                                            )
                                                                        }
                                                                    ),
                                                                $n(o, no)
                                                                    .getNativeDisplaySegment()
                                                                    .catch(
                                                                        function () {
                                                                            $n(
                                                                                o,
                                                                                ro
                                                                            ).error(
                                                                                'Cannot fetch Native Display Notification'
                                                                            )
                                                                        }
                                                                    ),
                                                                (p = o),
                                                                g()
                                                                    ? ((m = w(
                                                                          'App Closed',
                                                                          []
                                                                      )),
                                                                      o
                                                                          .logEvent(
                                                                              'APP',
                                                                              'App Closed',
                                                                              m,
                                                                              null
                                                                          )
                                                                          .then(
                                                                              function () {
                                                                                  var e =
                                                                                      w(
                                                                                          'App Launched',
                                                                                          []
                                                                                      )
                                                                                  p.logEvent(
                                                                                      'APP',
                                                                                      'App Launched',
                                                                                      e,
                                                                                      null
                                                                                  ).catch(
                                                                                      function (
                                                                                          e
                                                                                      ) {
                                                                                          $n(
                                                                                              o,
                                                                                              ro
                                                                                          ).error(
                                                                                              'Cannot send App Launch event, because: '.concat(
                                                                                                  e
                                                                                              )
                                                                                          )
                                                                                      }
                                                                                  )
                                                                              }
                                                                          )
                                                                          .catch(
                                                                              function (
                                                                                  e
                                                                              ) {
                                                                                  $n(
                                                                                      o,
                                                                                      ro
                                                                                  ).error(
                                                                                      'Cannot send App Launch event, because: '.concat(
                                                                                          e
                                                                                      )
                                                                                  )
                                                                              }
                                                                          ))
                                                                    : ((b = w(
                                                                          'App Launched',
                                                                          []
                                                                      )),
                                                                      o
                                                                          .logEvent(
                                                                              'APP',
                                                                              'App Launched',
                                                                              b,
                                                                              null
                                                                          )
                                                                          .catch(
                                                                              function (
                                                                                  e
                                                                              ) {
                                                                                  $n(
                                                                                      o,
                                                                                      ro
                                                                                  ).error(
                                                                                      'Cannot send App Launch event, because: '.concat(
                                                                                          e
                                                                                      )
                                                                                  )
                                                                              }
                                                                          )),
                                                                window.addEventListener(
                                                                    'beforeunload',
                                                                    function () {
                                                                        var e =
                                                                            w(
                                                                                'App Closed',
                                                                                []
                                                                            )
                                                                        window.JioPush.logEvent(
                                                                            'APP',
                                                                            'App Closed',
                                                                            e,
                                                                            null
                                                                        )
                                                                    }
                                                                ),
                                                                t.log(
                                                                    'already registered'
                                                                ),
                                                                i(
                                                                    d(!0, {
                                                                        data: {
                                                                            uid: r
                                                                                .pushParams
                                                                                .aid,
                                                                            token: r
                                                                                .pushParams
                                                                                .token,
                                                                        },
                                                                    })
                                                                )
                                                        case 20:
                                                        case 'end':
                                                            return a.stop()
                                                    }
                                                var x, S, L
                                            }, a)
                                        })
                                    )
                                    return function (e) {
                                        return a.apply(this, arguments)
                                    }
                                })()
                            )
                        return a
                    },
                },
                {
                    key: 'RegisterForNotification',
                    value: function (e, r) {
                        var n = this,
                            o = new Promise(
                                (function () {
                                    var o = Kn(
                                        Un().mark(function o(a) {
                                            return Un().wrap(function (o) {
                                                for (;;)
                                                    switch ((o.prev = o.next)) {
                                                        case 0:
                                                            ;(i = e),
                                                                (s = void 0),
                                                                (s =
                                                                    new XMLHttpRequest()).open(
                                                                    'HEAD',
                                                                    i,
                                                                    !1
                                                                ),
                                                                s.send(),
                                                                404 != s.status
                                                                    ? E.registerServiceWorker(
                                                                          e
                                                                      ).then(
                                                                          function (
                                                                              e
                                                                          ) {
                                                                              if (
                                                                                  e.active &&
                                                                                  'activated' ==
                                                                                      e
                                                                                          .active
                                                                                          .state
                                                                              )
                                                                                  n.handleServiceWorker(
                                                                                      e,
                                                                                      r
                                                                                  ).then(
                                                                                      function (
                                                                                          e
                                                                                      ) {
                                                                                          a(
                                                                                              e
                                                                                          )
                                                                                      }
                                                                                  )
                                                                              else {
                                                                                  var o =
                                                                                      e.installing ||
                                                                                      e.active
                                                                                  t.log(
                                                                                      e.installing
                                                                                  ),
                                                                                      t.log(
                                                                                          e.active
                                                                                      ),
                                                                                      o.addEventListener(
                                                                                          'statechange',
                                                                                          Kn(
                                                                                              Un().mark(
                                                                                                  function t() {
                                                                                                      return Un().wrap(
                                                                                                          function (
                                                                                                              t
                                                                                                          ) {
                                                                                                              for (;;)
                                                                                                                  switch (
                                                                                                                      (t.prev =
                                                                                                                          t.next)
                                                                                                                  ) {
                                                                                                                      case 0:
                                                                                                                          'activated' ==
                                                                                                                              o.state &&
                                                                                                                              n
                                                                                                                                  .handleServiceWorker(
                                                                                                                                      e,
                                                                                                                                      r
                                                                                                                                  )
                                                                                                                                  .then(
                                                                                                                                      function (
                                                                                                                                          e
                                                                                                                                      ) {
                                                                                                                                          a(
                                                                                                                                              e
                                                                                                                                          )
                                                                                                                                      }
                                                                                                                                  )
                                                                                                                      case 1:
                                                                                                                      case 'end':
                                                                                                                          return t.stop()
                                                                                                                  }
                                                                                                          },
                                                                                                          t
                                                                                                      )
                                                                                                  }
                                                                                              )
                                                                                          )
                                                                                      )
                                                                              }
                                                                          }
                                                                      )
                                                                    : (t.error(
                                                                          "Service Worker file doesn't exist. Please Keep sw.js on same directory where SDK resides"
                                                                      ),
                                                                      a(
                                                                          d(
                                                                              !1,
                                                                              "Service Worker file doesn't exist. Please Keep sw.js on same directory where SDK resides"
                                                                          )
                                                                      ))
                                                        case 1:
                                                        case 'end':
                                                            return o.stop()
                                                    }
                                                var i, s
                                            }, o)
                                        })
                                    )
                                    return function (e) {
                                        return o.apply(this, arguments)
                                    }
                                })()
                            )
                        return o
                    },
                },
                {
                    key: 'generateUUID',
                    value: function () {
                        return new Promise(function (e) {
                            y()
                                .then(function (t) {
                                    e(d(!0, t))
                                })
                                .catch(function () {
                                    e(
                                        d(
                                            !1,
                                            'Error in generating Device Fingerprint'
                                        )
                                    )
                                })
                        })
                    },
                },
                {
                    key: 'topic',
                    value: function (e, t) {
                        return new Promise(function (n) {
                            if (e && t && r.pushParams) {
                                var o = r.cdn.topicregister || '',
                                    a = {
                                        Authorization: 'bearer '.concat(
                                            r.pushParams.aid
                                        ),
                                        AuthTokenType: 'FCM_WEBCLIENT',
                                        Version: 'v2',
                                        'Content-Type': 'application/json',
                                    },
                                    i = {
                                        appname: r.pushParams.an,
                                        deviceId: r.pushParams.token,
                                        aid: r.pushParams.aid,
                                        deviceType: 'WEBCLIENT',
                                        topics: t.split(','),
                                    }
                                o
                                    ? z
                                          .execute(
                                              'POST',
                                              o,
                                              JSON.stringify(i),
                                              a
                                          )
                                          .then(function (e) {
                                              n(d(!0, e))
                                          })
                                          .catch(function (e) {
                                              n(d(!1, e))
                                          })
                                    : n(
                                          d(
                                              !1,
                                              'topic registration url is unknown.'
                                          )
                                      )
                            } else n(d(!1, 'Internal Error'))
                        })
                    },
                },
                {
                    key: 'createTag',
                    value: function (e, t) {
                        var n = this,
                            o =
                                arguments.length > 2 && void 0 !== arguments[2]
                                    ? arguments[2]
                                    : 'DEVICE',
                            a = new Promise(
                                (function () {
                                    var a = Kn(
                                        Un().mark(function a(i) {
                                            var s, c, u, l, f, p, h
                                            return Un().wrap(function (a) {
                                                for (;;)
                                                    switch ((a.prev = a.next)) {
                                                        case 0:
                                                            return (
                                                                (s = {}),
                                                                (c = []),
                                                                (a.next = 4),
                                                                $n(
                                                                    n,
                                                                    io
                                                                ).getItem(
                                                                    'PendingTags'
                                                                )
                                                            )
                                                        case 4:
                                                            if (
                                                                ((a.t0 =
                                                                    a.sent),
                                                                a.t0)
                                                            ) {
                                                                a.next = 7
                                                                break
                                                            }
                                                            a.t0 = {}
                                                        case 7:
                                                            if (
                                                                ((u = a.t0),
                                                                t in u &&
                                                                    u[t] != [])
                                                            )
                                                                for (l in (u[
                                                                    t
                                                                ].forEach(
                                                                    function (
                                                                        e
                                                                    ) {
                                                                        var t =
                                                                                e.tagName,
                                                                            r =
                                                                                e.tagValue
                                                                        s[t] = r
                                                                    }
                                                                ),
                                                                e.forEach(
                                                                    function (
                                                                        e
                                                                    ) {
                                                                        var t =
                                                                                e.tagName,
                                                                            r =
                                                                                e.tagValue
                                                                        s[t] = r
                                                                    }
                                                                ),
                                                                s))
                                                                    c.push({
                                                                        tagName:
                                                                            l,
                                                                        tagValue:
                                                                            s[
                                                                                l
                                                                            ],
                                                                    })
                                                            else c = e
                                                            if (
                                                                !(
                                                                    t &&
                                                                    r.pushParams &&
                                                                    c.length > 0
                                                                )
                                                            ) {
                                                                a.next = 41
                                                                break
                                                            }
                                                            ;(f =
                                                                r.cdn
                                                                    .tagregistration ||
                                                                ''),
                                                                (p = {
                                                                    Authorization:
                                                                        'bearer '.concat(
                                                                            r
                                                                                .pushParams
                                                                                .aid
                                                                        ),
                                                                    AuthTokenType:
                                                                        'FCM_WEBCLIENT',
                                                                    Version:
                                                                        'v2',
                                                                    'Content-Type':
                                                                        'application/json',
                                                                }),
                                                                (h = {
                                                                    appName:
                                                                        r
                                                                            .pushParams
                                                                            .an,
                                                                    tag: c,
                                                                }),
                                                                (a.t1 = o),
                                                                (a.next =
                                                                    'DEVICE' ===
                                                                    a.t1
                                                                        ? 16
                                                                        : 'SECONDARY' ===
                                                                            a.t1
                                                                          ? 18
                                                                          : 20)
                                                            break
                                                        case 16:
                                                            return (
                                                                (h.deviceId =
                                                                    r.pushParams.token),
                                                                a.abrupt(
                                                                    'break',
                                                                    22
                                                                )
                                                            )
                                                        case 18:
                                                            return (
                                                                (h.customerId =
                                                                    r.pushParams.sid),
                                                                a.abrupt(
                                                                    'break',
                                                                    22
                                                                )
                                                            )
                                                        case 20:
                                                            return (
                                                                i(
                                                                    d(
                                                                        !1,
                                                                        'Only "DEVICE" or "CUSTOMER" are supported values for idType, do you want to send the tag using deviceId or secondaryId?'
                                                                    )
                                                                ),
                                                                a.abrupt(
                                                                    'return'
                                                                )
                                                            )
                                                        case 22:
                                                            ;(a.t2 = t),
                                                                (a.next =
                                                                    'system' ===
                                                                    a.t2
                                                                        ? 25
                                                                        : 'custom' ===
                                                                            a.t2
                                                                          ? 27
                                                                          : 'default' ===
                                                                              a.t2
                                                                            ? 29
                                                                            : 30)
                                                            break
                                                        case 25:
                                                            return (
                                                                (h.isSystemTag =
                                                                    !0),
                                                                a.abrupt(
                                                                    'break',
                                                                    30
                                                                )
                                                            )
                                                        case 27:
                                                            return (
                                                                (h.isSystemTag =
                                                                    !1),
                                                                a.abrupt(
                                                                    'break',
                                                                    30
                                                                )
                                                            )
                                                        case 29:
                                                            return a.abrupt(
                                                                'break',
                                                                30
                                                            )
                                                        case 30:
                                                            if (!f) {
                                                                a.next = 36
                                                                break
                                                            }
                                                            return (
                                                                (a.next = 33),
                                                                $n(
                                                                    n,
                                                                    io
                                                                ).setItem(
                                                                    'PendingTags',
                                                                    Fn(
                                                                        Fn(
                                                                            {},
                                                                            u
                                                                        ),
                                                                        {},
                                                                        zn(
                                                                            {},
                                                                            t,
                                                                            []
                                                                        )
                                                                    )
                                                                )
                                                            )
                                                        case 33:
                                                            z
                                                                .execute(
                                                                    'POST',
                                                                    f,
                                                                    JSON.stringify(
                                                                        h
                                                                    ),
                                                                    p
                                                                )
                                                                .then(
                                                                    (function () {
                                                                        var e =
                                                                            Kn(
                                                                                Un().mark(
                                                                                    function e(
                                                                                        t
                                                                                    ) {
                                                                                        return Un().wrap(
                                                                                            function (
                                                                                                e
                                                                                            ) {
                                                                                                for (;;)
                                                                                                    switch (
                                                                                                        (e.prev =
                                                                                                            e.next)
                                                                                                    ) {
                                                                                                        case 0:
                                                                                                            i(
                                                                                                                d(
                                                                                                                    !0,
                                                                                                                    t
                                                                                                                )
                                                                                                            )
                                                                                                        case 1:
                                                                                                        case 'end':
                                                                                                            return e.stop()
                                                                                                    }
                                                                                            },
                                                                                            e
                                                                                        )
                                                                                    }
                                                                                )
                                                                            )
                                                                        return function (
                                                                            t
                                                                        ) {
                                                                            return e.apply(
                                                                                this,
                                                                                arguments
                                                                            )
                                                                        }
                                                                    })()
                                                                )
                                                                .catch(
                                                                    Kn(
                                                                        Un().mark(
                                                                            function e() {
                                                                                return Un().wrap(
                                                                                    function (
                                                                                        e
                                                                                    ) {
                                                                                        for (;;)
                                                                                            switch (
                                                                                                (e.prev =
                                                                                                    e.next)
                                                                                            ) {
                                                                                                case 0:
                                                                                                    return (
                                                                                                        (e.next = 2),
                                                                                                        $n(
                                                                                                            n,
                                                                                                            io
                                                                                                        ).setItem(
                                                                                                            'PendingTags',
                                                                                                            Fn(
                                                                                                                Fn(
                                                                                                                    {},
                                                                                                                    u
                                                                                                                ),
                                                                                                                {},
                                                                                                                zn(
                                                                                                                    {},
                                                                                                                    t,
                                                                                                                    c
                                                                                                                )
                                                                                                            )
                                                                                                        )
                                                                                                    )
                                                                                                case 2:
                                                                                                    i(
                                                                                                        d(
                                                                                                            !1,
                                                                                                            'Error in sending tags, will retry on next time.'
                                                                                                        )
                                                                                                    )
                                                                                                case 3:
                                                                                                case 'end':
                                                                                                    return e.stop()
                                                                                            }
                                                                                    },
                                                                                    e
                                                                                )
                                                                            }
                                                                        )
                                                                    )
                                                                ),
                                                                (a.next = 39)
                                                            break
                                                        case 36:
                                                            return (
                                                                (a.next = 38),
                                                                $n(
                                                                    n,
                                                                    io
                                                                ).setItem(
                                                                    'PendingTags',
                                                                    Fn(
                                                                        Fn(
                                                                            {},
                                                                            u
                                                                        ),
                                                                        {},
                                                                        zn(
                                                                            {},
                                                                            t,
                                                                            c
                                                                        )
                                                                    )
                                                                )
                                                            )
                                                        case 38:
                                                            i(
                                                                d(
                                                                    !1,
                                                                    'tag registration url is known'
                                                                )
                                                            )
                                                        case 39:
                                                            a.next = 50
                                                            break
                                                        case 41:
                                                            if (0 != c.length) {
                                                                a.next = 47
                                                                break
                                                            }
                                                            return (
                                                                (a.next = 44),
                                                                $n(
                                                                    n,
                                                                    io
                                                                ).setItem(
                                                                    'PendingTags',
                                                                    Fn(
                                                                        Fn(
                                                                            {},
                                                                            u
                                                                        ),
                                                                        {},
                                                                        zn(
                                                                            {},
                                                                            t,
                                                                            c
                                                                        )
                                                                    )
                                                                )
                                                            )
                                                        case 44:
                                                            i(
                                                                d(
                                                                    !0,
                                                                    'No Tags to send, all pending tags already sent!'
                                                                )
                                                            ),
                                                                (a.next = 50)
                                                            break
                                                        case 47:
                                                            return (
                                                                (a.next = 49),
                                                                $n(
                                                                    n,
                                                                    io
                                                                ).setItem(
                                                                    'PendingTags',
                                                                    Fn(
                                                                        Fn(
                                                                            {},
                                                                            u
                                                                        ),
                                                                        {},
                                                                        zn(
                                                                            {},
                                                                            t,
                                                                            c
                                                                        )
                                                                    )
                                                                )
                                                            )
                                                        case 49:
                                                            i(
                                                                d(
                                                                    !1,
                                                                    'Internal Error'
                                                                )
                                                            )
                                                        case 50:
                                                        case 'end':
                                                            return a.stop()
                                                    }
                                            }, a)
                                        })
                                    )
                                    return function (e) {
                                        return a.apply(this, arguments)
                                    }
                                })()
                            )
                        return a
                    },
                },
                {
                    key: 'flushAllEvents',
                    value: function () {
                        return new Promise(function (e, n) {
                            new Promise(function (e, n) {
                                if (
                                    (t.info('started flusing events'),
                                    self.window)
                                ) {
                                    var o = r,
                                        a = [],
                                        i = null
                                    a.push(
                                        new Promise(function (e) {
                                            setTimeout(function () {
                                                e()
                                            }, 1e3)
                                        })
                                    ),
                                        Le.get(fe)
                                            .then(function (r) {
                                                Object.keys(r).forEach(
                                                    function (e) {
                                                        var n = e.split('.')[0],
                                                            s = e.split('.')[1],
                                                            c = Ge(
                                                                n.toUpperCase(),
                                                                s.toUpperCase()
                                                            ),
                                                            u =
                                                                r[
                                                                    ''
                                                                        .concat(
                                                                            n.toLowerCase(),
                                                                            '.'
                                                                        )
                                                                        .concat(
                                                                            s.toLowerCase()
                                                                        )
                                                                ],
                                                            l = []
                                                        Object.keys(u).forEach(
                                                            function (e) {
                                                                l = [].concat(
                                                                    Ne(l),
                                                                    Ne(u[e])
                                                                )
                                                            }
                                                        ),
                                                            l &&
                                                                Array.isArray(
                                                                    l
                                                                ) &&
                                                                l.length > 0 &&
                                                                c &&
                                                                ((i = z
                                                                    .execute(
                                                                        'POST',
                                                                        o.cdn
                                                                            .analytics,
                                                                        Fe(
                                                                            l,
                                                                            c,
                                                                            o
                                                                                .analytics
                                                                                .compressFormat
                                                                        ),
                                                                        ze(
                                                                            o
                                                                                .analytics
                                                                                .compressFormat
                                                                        )
                                                                    )
                                                                    .then(
                                                                        function () {
                                                                            Ve(
                                                                                ''
                                                                                    .concat(
                                                                                        n.toLowerCase(),
                                                                                        '.'
                                                                                    )
                                                                                    .concat(
                                                                                        s.toLowerCase()
                                                                                    ),
                                                                                null
                                                                            ).then(
                                                                                function () {
                                                                                    t.info(
                                                                                        'Events flushed of type '.concat(
                                                                                            n
                                                                                        )
                                                                                    )
                                                                                }
                                                                            )
                                                                        }
                                                                    )
                                                                    .catch(
                                                                        function () {
                                                                            t.error(
                                                                                'Error while flushing events of type '.concat(
                                                                                    n
                                                                                )
                                                                            )
                                                                        }
                                                                    )),
                                                                a.push(i))
                                                    }
                                                ),
                                                    Promise.all(a)
                                                        .then(function () {
                                                            return e()
                                                        })
                                                        .catch(function () {
                                                            return n()
                                                        })
                                            })
                                            .catch(function () {
                                                return n()
                                            })
                                }
                            })
                                .then(function () {
                                    t.info(
                                        'All Events are fired successfully.'
                                    ),
                                        e()
                                })
                                .catch(function () {
                                    t.info('Error while flushing the events.'),
                                        n()
                                })
                        })
                    },
                },
                {
                    key: 'changeLogLevel',
                    value: function (e) {
                        $n(this, ro).setLogLevel(
                            $n(this, ro).LOG_LEVEL[''.concat(e.toLowerCase())]
                        )
                    },
                },
                {
                    key: 'logEvent',
                    value: function () {
                        var e =
                                arguments.length > 0 && void 0 !== arguments[0]
                                    ? arguments[0]
                                    : 'CUSTOM',
                            t = arguments.length > 1 ? arguments[1] : void 0,
                            r = arguments.length > 2 ? arguments[2] : void 0,
                            n = arguments.length > 3 ? arguments[3] : void 0
                        return this.fireEvent({
                            eventName: t,
                            eventType: e,
                            properties: r,
                            eventCategory: n,
                        })
                    },
                },
                {
                    key: 'fireEvent',
                    value: function (e) {
                        var t = e.eventName,
                            r = e.eventCategory,
                            n = e.eventType,
                            o = void 0 === n ? 'CUSTOM' : n,
                            a = e.properties,
                            i = void 0 === a ? null : a
                        return $n(this, ao).fireEvent({
                            eventName: t,
                            eventType: o,
                            properties: i,
                            eventCategory: r,
                        })
                    },
                },
                {
                    key: 'raiseNotificationViewed',
                    value: function (e) {
                        $n(this, ro).log(
                            'Notification Viewed Event Raised '.concat(
                                e.messageId
                            )
                        )
                        var t = {
                            type: 'MessageViewed',
                            messageMeta: {
                                messageId: e.messageId,
                                sourceId: null == e ? void 0 : e.name,
                                messageType: 'DIRECT',
                                srcType: 'campaign',
                            },
                            payload: { cid: null == e ? void 0 : e.name },
                        }
                        return $n(this, ao).fireEvent({
                            eventName: 'MessageViewed',
                            eventType: 'SYSTEM',
                            eventCategory: 'NOTIFICATION',
                            payload: t,
                        })
                    },
                },
                {
                    key: 'raiseNotificationClicked',
                    value: function (e) {
                        $n(this, ro).log(
                            'Notification Clicked Event Raised '.concat(
                                e.messageId
                            )
                        )
                        var t = {
                            type: 'MessageClicked',
                            messageMeta: {
                                messageId: e.messageId,
                                sourceId: e.name,
                                messageType: 'DIRECT',
                                srcType: 'campaign',
                            },
                            payload: { cid: e.name },
                        }
                        return $n(this, ao).fireEvent({
                            eventName: 'MessageClicked',
                            eventType: 'SYSTEM',
                            eventCategory: 'NOTIFICATION',
                            payload: t,
                        })
                    },
                },
                {
                    key: 'raiseNotificationReceived',
                    value: function (e) {
                        $n(this, ro).log(
                            'Notification Recevied Event Raised '.concat(
                                e.messageId
                            )
                        )
                        var t = {
                            type: 'MessageReceived',
                            messageMeta: {
                                messageId: e.messageId,
                                sourceId: e.name,
                                messageType: 'DIRECT',
                                srcType: 'campaign',
                            },
                            payload: { cid: e.name },
                        }
                        return $n(this, ao).fireEvent({
                            eventName: 'MessageReceived',
                            eventType: 'SYSTEM',
                            eventCategory: 'NOTIFICATION',
                            payload: t,
                        })
                    },
                },
            ]),
            o && qn(n.prototype, o),
            Object.defineProperty(n, 'prototype', { writable: !1 }),
            e
        )
    })())()
    window.JioPush = ho
})()
//# sourceMappingURL=jioPush-sdk.js.map
