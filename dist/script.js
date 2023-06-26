"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _localforage = _interopRequireDefault(require("localforage"));
var _sweetalert = _interopRequireDefault(require("sweetalert2"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var Global = /*#__PURE__*/function () {
  function Global() {
    _classCallCheck(this, Global);
  }
  _createClass(Global, null, [{
    key: "watchGlobalData",
    value: function watchGlobalData() {
      var logging = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      clearInterval(Global.interval);
      var hash = Global.stringify(Global.data);
      if (Global.datahash == "") {
        Global.datahash = hash;
        //load data from local db
        Global.loadData("Global.data", function (data) {
          //Global.localStorage.getItem("Global.data").then((data) => {
          if (Global.isset(data)) {
            Global.data = data;
            Global.datahash = Global.stringify(Global.data);
            logging ? console.log("loaded Global.data", Global.data) : '';
            Global.watchGlobalData();
          } else {
            Global.saveData("Global.data", Global.data, function () {
              //Global.localStorage.setItem("Global.data", Global.data).then(() => {
              logging ? console.log("initial Global.data", Global.data) : '';
              Global.watchGlobalData();
            });
          }
        });
      } else {
        if (hash != Global.datahash) {
          //console.log("hash", hash);
          //console.log("Global.datahash", Global.datahash);
          Global.datahash = hash;
          Global.saveData("Global.data", Global.data, function () {
            //Global.localStorage.setItem("Global.data", Global.data).then(() => {
            logging ? console.log("updated Global.data", Global.data) : '';
            Global.watchGlobalData();
          });
        } else {
          Global.interval = setTimeout(function () {
            //console.log("hash", hash);
            Global.watchGlobalData();
          }, 100);
        }
      }
    }
  }, {
    key: "log",
    value: function log() {
      try {
        for (var _len = arguments.length, params = new Array(_len), _key = 0; _key < _len; _key++) {
          params[_key] = arguments[_key];
        }
        console.log(params);
      } catch (e) {}
    }
  }, {
    key: "alert",
    value: function alert(msg) {
      _sweetalert["default"].fire({
        title: '',
        html: msg,
        icon: 'warning',
        confirmButtonText: 'OK',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-danger'
          // Additional button classes if needed
        }
      });
    }
  }, {
    key: "success",
    value: function success(msg) {
      _sweetalert["default"].fire({
        title: '',
        html: msg,
        icon: 'success',
        confirmButtonText: 'OK',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-danger'
          // Additional button classes if needed
        }
      });
    }
  }, {
    key: "error",
    value: function error(msg) {
      _sweetalert["default"].fire({
        title: '',
        html: msg,
        icon: 'error',
        confirmButtonText: 'OK',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-danger'
          // Additional button classes if needed
        }
      });
    }
  }, {
    key: "confirm",
    value: function confirm() {
      var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (n) {};
      var confirmtext = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
      var canceltxt = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";
      if (!Global.isset(confirmtext)) {
        confirmtext = "Confirm";
      }
      if (!Global.isset(canceltxt)) {
        canceltxt = "Cancel";
      }
      _sweetalert["default"].fire({
        title: "",
        html: msg,
        icon: 'warning',
        showCancelButton: true,
        customClass: {
          confirmButton: 'btn btn-primary mr-4 flex-1',
          cancelButton: 'btn btn-secondary flex-1'
        },
        //confirmButtonColor: '#3085d6',
        //cancelButtonColor: '#d33',
        confirmButtonText: confirmtext,
        cancelButtonText: canceltxt
      }).then(function (result) {
        callback(result.value);
      });
    }
  }, {
    key: "isset",
    value: function isset(v) {
      var strict = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      //not strict
      if (!strict) {
        if (typeof v == "undefined") {
          return false;
        } else if (Global.toString(v) == "") {
          return false;
        } else if (v == false && typeof v != "string") {
          return false;
        } else if (v == 0 && typeof v != "string") {
          return false;
        } else if (v == null && typeof v != "string") {
          return false;
        } else if (!v && typeof v != "string") {
          return false;
        } else {
          return true;
        }
      }
      //strict
      else {
        if (typeof v == "undefined") {
          return false;
        } else {
          return true;
        }
      }
    }
  }, {
    key: "saveData",
    value: function saveData(key, value) {
      var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};
      _localforage["default"].setItem(key, value, function (error, result) {
        if (error) {
          console.error('Error occurred while setting item:', error);
        } else {
          //console.log('Data Saved:', key, result);
        }
        callback();
      });
    }
  }, {
    key: "loadData",
    value: function loadData(key, callback) {
      _localforage["default"].getItem(key, function (error, result) {
        if (error) {
          console.error('Error loading data:', error);
          callback(null);
        } else {
          if (Global.isset(result)) {
            //console.log('Data Loaded:', key, result);
            callback(result);
          } else {
            callback(null);
          }
        }
      });
    }
  }, {
    key: "stringify",
    value: function stringify(obj) {
      var json = "";
      try {
        json = JSON.stringify(obj);
      } catch (e) {
        json = "";
      }
      return json;
    }
  }, {
    key: "parse",
    value: function parse(json) {
      var obj = {};
      try {
        obj = JSON.parse(json);
      } catch (e) {
        obj = {};
      }
      return obj;
    }
  }, {
    key: "toString",
    value: function toString() {
      var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      if (typeof str != "undefined" && str != null) {
        return str + "";
      } else {
        return "";
      }
    }
  }, {
    key: "toInt",
    value: function toInt() {
      var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      if (typeof n != "undefined" && n != null && !isNaN(n)) {
        return parseInt(n);
      } else {
        return 0;
      }
    }
  }, {
    key: "toFloat",
    value: function toFloat() {
      var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      if (typeof n != "undefined" && n != null && !isNaN(n)) {
        return parseFloat(n);
      } else {
        return 0;
      }
    }
  }, {
    key: "postData",
    value: function postData() {
      var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        url: "",
        success: function success(ret) {},
        error: function error(_error) {},
        callback: function callback(data) {}
      };
      var url = args === null || args === void 0 ? void 0 : args.url; // Replace with your API endpoint
      if (!Global.isset(url)) {
        var _args$error, _args$callback;
        var error = "Invalid URL";
        // Handle any errors
        args === null || args === void 0 ? void 0 : (_args$error = args['error']) === null || _args$error === void 0 ? void 0 : _args$error.call(args, error);
        args === null || args === void 0 ? void 0 : (_args$callback = args['callback']) === null || _args$callback === void 0 ? void 0 : _args$callback.call(args, error);
        console.error(error);
        return false;
      }
      var data = args === null || args === void 0 ? void 0 : args['data'];
      var options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: Global.stringify(data)
      };
      fetch(url, options).then(function (response) {
        if (!navigator.onLine) {
          throw new Error('No internet connection.');
        }
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('POST request failed.');
        }
      }).then(function (ret) {
        // Handle the response ret
        if (Global.isset(ret === null || ret === void 0 ? void 0 : ret.error)) {
          var _args$error2, _args$callback2;
          var error = ret === null || ret === void 0 ? void 0 : ret.error;
          // Handle any errors
          args === null || args === void 0 ? void 0 : (_args$error2 = args['error']) === null || _args$error2 === void 0 ? void 0 : _args$error2.call(args, error);
          args === null || args === void 0 ? void 0 : (_args$callback2 = args['callback']) === null || _args$callback2 === void 0 ? void 0 : _args$callback2.call(args, error);
          console.error(error);
        } else {
          var _args$success, _args$callback3;
          args === null || args === void 0 ? void 0 : (_args$success = args['success']) === null || _args$success === void 0 ? void 0 : _args$success.call(args, ret);
          args === null || args === void 0 ? void 0 : (_args$callback3 = args['callback']) === null || _args$callback3 === void 0 ? void 0 : _args$callback3.call(args, ret);
        }
      })["catch"](function (error) {
        var _args$error3, _args$callback4;
        if (!navigator.onLine) {
          error = 'No internet connection.';
        }
        // Handle any errors
        args === null || args === void 0 ? void 0 : (_args$error3 = args['error']) === null || _args$error3 === void 0 ? void 0 : _args$error3.call(args, error);
        args === null || args === void 0 ? void 0 : (_args$callback4 = args['callback']) === null || _args$callback4 === void 0 ? void 0 : _args$callback4.call(args, error);
        console.error(error);
      });
    }
  }, {
    key: "loading",
    value: function loading() {
      var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      if (!Global.isset(message)) {
        message = "Loading...";
      }
      _sweetalert["default"].fire({
        text: message,
        allowOutsideClick: false,
        showClass: {
          popup: '' // Remove the pop-out animation
        },

        hideClass: {
          popup: '' // Remove the pop-out animation
        },

        didOpen: function didOpen() {
          _sweetalert["default"].showLoading();
        }
      });
    }
  }, {
    key: "hideLoading",
    value: function hideLoading() {
      _sweetalert["default"].close();
    }
  }]);
  return Global;
}(); //var Global = new GlobalClass();
//export { Global, GlobalClass };
_defineProperty(Global, "data", {});
_defineProperty(Global, "interval", 0);
_defineProperty(Global, "datahash", "");
/*
Global.localStorage.getItem("key").then((data) => {

});
Global.localStorage.setItem("key", $value).then(() => {

});
*/
_defineProperty(Global, "localStorage", _localforage["default"].createInstance({
  driver: _localforage["default"].LOCALSTORAGE // Use the Session Storage driver
}));
_defineProperty(Global, "md5", function () {
  function e(e, t) {
    var o = e[0],
      u = e[1],
      a = e[2],
      f = e[3];
    o = n(o, u, a, f, t[0], 7, -680876936);
    f = n(f, o, u, a, t[1], 12, -389564586);
    a = n(a, f, o, u, t[2], 17, 606105819);
    u = n(u, a, f, o, t[3], 22, -1044525330);
    o = n(o, u, a, f, t[4], 7, -176418897);
    f = n(f, o, u, a, t[5], 12, 1200080426);
    a = n(a, f, o, u, t[6], 17, -1473231341);
    u = n(u, a, f, o, t[7], 22, -45705983);
    o = n(o, u, a, f, t[8], 7, 1770035416);
    f = n(f, o, u, a, t[9], 12, -1958414417);
    a = n(a, f, o, u, t[10], 17, -42063);
    u = n(u, a, f, o, t[11], 22, -1990404162);
    o = n(o, u, a, f, t[12], 7, 1804603682);
    f = n(f, o, u, a, t[13], 12, -40341101);
    a = n(a, f, o, u, t[14], 17, -1502002290);
    u = n(u, a, f, o, t[15], 22, 1236535329);
    o = r(o, u, a, f, t[1], 5, -165796510);
    f = r(f, o, u, a, t[6], 9, -1069501632);
    a = r(a, f, o, u, t[11], 14, 643717713);
    u = r(u, a, f, o, t[0], 20, -373897302);
    o = r(o, u, a, f, t[5], 5, -701558691);
    f = r(f, o, u, a, t[10], 9, 38016083);
    a = r(a, f, o, u, t[15], 14, -660478335);
    u = r(u, a, f, o, t[4], 20, -405537848);
    o = r(o, u, a, f, t[9], 5, 568446438);
    f = r(f, o, u, a, t[14], 9, -1019803690);
    a = r(a, f, o, u, t[3], 14, -187363961);
    u = r(u, a, f, o, t[8], 20, 1163531501);
    o = r(o, u, a, f, t[13], 5, -1444681467);
    f = r(f, o, u, a, t[2], 9, -51403784);
    a = r(a, f, o, u, t[7], 14, 1735328473);
    u = r(u, a, f, o, t[12], 20, -1926607734);
    o = i(o, u, a, f, t[5], 4, -378558);
    f = i(f, o, u, a, t[8], 11, -2022574463);
    a = i(a, f, o, u, t[11], 16, 1839030562);
    u = i(u, a, f, o, t[14], 23, -35309556);
    o = i(o, u, a, f, t[1], 4, -1530992060);
    f = i(f, o, u, a, t[4], 11, 1272893353);
    a = i(a, f, o, u, t[7], 16, -155497632);
    u = i(u, a, f, o, t[10], 23, -1094730640);
    o = i(o, u, a, f, t[13], 4, 681279174);
    f = i(f, o, u, a, t[0], 11, -358537222);
    a = i(a, f, o, u, t[3], 16, -722521979);
    u = i(u, a, f, o, t[6], 23, 76029189);
    o = i(o, u, a, f, t[9], 4, -640364487);
    f = i(f, o, u, a, t[12], 11, -421815835);
    a = i(a, f, o, u, t[15], 16, 530742520);
    u = i(u, a, f, o, t[2], 23, -995338651);
    o = s(o, u, a, f, t[0], 6, -198630844);
    f = s(f, o, u, a, t[7], 10, 1126891415);
    a = s(a, f, o, u, t[14], 15, -1416354905);
    u = s(u, a, f, o, t[5], 21, -57434055);
    o = s(o, u, a, f, t[12], 6, 1700485571);
    f = s(f, o, u, a, t[3], 10, -1894986606);
    a = s(a, f, o, u, t[10], 15, -1051523);
    u = s(u, a, f, o, t[1], 21, -2054922799);
    o = s(o, u, a, f, t[8], 6, 1873313359);
    f = s(f, o, u, a, t[15], 10, -30611744);
    a = s(a, f, o, u, t[6], 15, -1560198380);
    u = s(u, a, f, o, t[13], 21, 1309151649);
    o = s(o, u, a, f, t[4], 6, -145523070);
    f = s(f, o, u, a, t[11], 10, -1120210379);
    a = s(a, f, o, u, t[2], 15, 718787259);
    u = s(u, a, f, o, t[9], 21, -343485551);
    e[0] = m(o, e[0]);
    e[1] = m(u, e[1]);
    e[2] = m(a, e[2]);
    e[3] = m(f, e[3]);
  }
  function t(e, t, n, r, i, s) {
    t = m(m(t, e), m(r, s));
    return m(t << i | t >>> 32 - i, n);
  }
  function n(e, n, r, i, s, o, u) {
    return t(n & r | ~n & i, e, n, s, o, u);
  }
  function r(e, n, r, i, s, o, u) {
    return t(n & i | r & ~i, e, n, s, o, u);
  }
  function i(e, n, r, i, s, o, u) {
    return t(n ^ r ^ i, e, n, s, o, u);
  }
  function s(e, n, r, i, s, o, u) {
    return t(r ^ (n | ~i), e, n, s, o, u);
  }
  function o(t) {
    var n = t.length,
      r = [1732584193, -271733879, -1732584194, 271733878],
      i;
    for (i = 64; i <= t.length; i += 64) {
      e(r, u(t.substring(i - 64, i)));
    }
    t = t.substring(i - 64);
    var s = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (i = 0; i < t.length; i++) s[i >> 2] |= t.charCodeAt(i) << (i % 4 << 3);
    s[i >> 2] |= 128 << (i % 4 << 3);
    if (i > 55) {
      e(r, s);
      for (i = 0; i < 16; i++) s[i] = 0;
    }
    s[14] = n * 8;
    e(r, s);
    return r;
  }
  function u(e) {
    var t = [],
      n;
    for (n = 0; n < 64; n += 4) {
      t[n >> 2] = e.charCodeAt(n) + (e.charCodeAt(n + 1) << 8) + (e.charCodeAt(n + 2) << 16) + (e.charCodeAt(n + 3) << 24);
    }
    return t;
  }
  function c(e) {
    var t = "",
      n = 0;
    for (; n < 4; n++) t += a[e >> n * 8 + 4 & 15] + a[e >> n * 8 & 15];
    return t;
  }
  function h(e) {
    for (var t = 0; t < e.length; t++) e[t] = c(e[t]);
    return e.join("");
  }
  function d(e) {
    return h(o(unescape(encodeURIComponent(e))));
  }
  function m(e, t) {
    return e + t & 4294967295;
  }
  var a = "0123456789abcdef".split("");
  return d;
}());
var _default = Global;
exports["default"] = _default;