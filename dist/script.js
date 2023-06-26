"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const localforage_1 = __importDefault(require("localforage"));
const sweetalert2_1 = __importDefault(require("sweetalert2"));
const crypto_js_1 = require("crypto-js");
class Global {
    constructor() { }
    static base64Encode(str) {
        const encodedString = btoa(str);
        return encodedString;
    }
    static base64Decode(str) {
        const decodedString = atob(str);
        return decodedString;
    }
    static md5(input) {
        const hash = (0, crypto_js_1.MD5)(input);
        return hash;
    }
    static watchGlobalData(logging = false) {
        clearInterval(Global.interval);
        var hash = Global.stringify(Global.data);
        if (Global.datahash == "") {
            Global.datahash = hash;
            //load data from local db
            Global.loadData("Global.data", (data) => {
                //Global.localStorage.getItem("Global.data").then((data) => {
                if (Global.isset(data)) {
                    Global.data = data;
                    Global.datahash = Global.stringify(Global.data);
                    (logging) ? console.log("loaded Global.data", Global.data) : '';
                    Global.watchGlobalData();
                }
                else {
                    Global.saveData("Global.data", Global.data, () => {
                        //Global.localStorage.setItem("Global.data", Global.data).then(() => {
                        (logging) ? console.log("initial Global.data", Global.data) : '';
                        Global.watchGlobalData();
                    });
                }
            });
        }
        else {
            if (hash != Global.datahash) {
                //console.log("hash", hash);
                //console.log("Global.datahash", Global.datahash);
                Global.datahash = hash;
                Global.saveData("Global.data", Global.data, () => {
                    //Global.localStorage.setItem("Global.data", Global.data).then(() => {
                    (logging) ? console.log("updated Global.data", Global.data) : '';
                    Global.watchGlobalData();
                });
            }
            else {
                Global.interval = setTimeout(() => {
                    //console.log("hash", hash);
                    Global.watchGlobalData();
                }, 100);
            }
        }
    }
    static log(...params) {
        try {
            console.log(params);
        }
        catch (e) {
        }
    }
    static alert(msg) {
        sweetalert2_1.default.fire({
            title: '',
            html: msg,
            icon: 'warning',
            confirmButtonText: 'OK',
            customClass: {
                confirmButton: 'btn btn-primary',
                cancelButton: 'btn btn-danger',
                // Additional button classes if needed
            }
        });
    }
    static success(msg) {
        sweetalert2_1.default.fire({
            title: '',
            html: msg,
            icon: 'success',
            confirmButtonText: 'OK',
            customClass: {
                confirmButton: 'btn btn-primary',
                cancelButton: 'btn btn-danger',
                // Additional button classes if needed
            }
        });
    }
    static error(msg) {
        sweetalert2_1.default.fire({
            title: '',
            html: msg,
            icon: 'error',
            confirmButtonText: 'OK',
            customClass: {
                confirmButton: 'btn btn-primary',
                cancelButton: 'btn btn-danger',
                // Additional button classes if needed
            }
        });
    }
    static confirm(msg = "", callback = (n) => { }, confirmtext = "", canceltxt = "") {
        if (!Global.isset(confirmtext)) {
            confirmtext = "Confirm";
        }
        if (!Global.isset(canceltxt)) {
            canceltxt = "Cancel";
        }
        sweetalert2_1.default.fire({
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
        }).then((result) => {
            callback(result.value);
        });
    }
    static isset(v, strict = false) {
        //not strict
        if (!strict) {
            if (typeof v == "undefined") {
                return false;
            }
            else if (Global.toString(v) == "") {
                return false;
            }
            else if (v == false && typeof v != "string") {
                return false;
            }
            else if (v == 0 && typeof v != "string") {
                return false;
            }
            else if (v == null && typeof v != "string") {
                return false;
            }
            else if (!v && typeof v != "string") {
                return false;
            }
            else {
                return true;
            }
        }
        //strict
        else {
            if (typeof v == "undefined") {
                return false;
            }
            else {
                return true;
            }
        }
    }
    static saveData(key, value, callback = () => { }) {
        localforage_1.default.setItem(key, value, function (error, result) {
            if (error) {
                console.error('Error occurred while setting item:', error);
            }
            else {
                //console.log('Data Saved:', key, result);
            }
            callback();
        });
    }
    static loadData(key, callback) {
        localforage_1.default.getItem(key, function (error, result) {
            if (error) {
                console.error('Error loading data:', error);
                callback(null);
            }
            else {
                if (Global.isset(result)) {
                    //console.log('Data Loaded:', key, result);
                    callback(result);
                }
                else {
                    callback(null);
                }
            }
        });
    }
    static stringify(obj) {
        var json = "";
        try {
            json = JSON.stringify(obj);
        }
        catch (e) {
            json = "";
        }
        return json;
    }
    static parse(json) {
        var obj = {};
        try {
            obj = JSON.parse(json);
        }
        catch (e) {
            obj = {};
        }
        return obj;
    }
    static toString(str = "") {
        if (typeof str != "undefined" && str != null) {
            return str + "";
        }
        else {
            return "";
        }
    }
    static toInt(n) {
        if (typeof n != "undefined" && n != null && !isNaN(n)) {
            return parseInt(n.toString(), 10);
        }
        else {
            return 0;
        }
    }
    static toFloat(n) {
        if (typeof n != "undefined" && n != null && !isNaN(n)) {
            return parseFloat(n.toString());
        }
        else {
            return 0;
        }
    }
    static postData(args = { url: "", success: (ret) => { }, error: (error) => { }, callback: (data) => { } }) {
        var _a, _b;
        const url = args === null || args === void 0 ? void 0 : args.url; // Replace with your API endpoint
        if (!Global.isset(url)) {
            var error = "Invalid URL";
            // Handle any errors
            (_a = args === null || args === void 0 ? void 0 : args['error']) === null || _a === void 0 ? void 0 : _a.call(args, error);
            (_b = args === null || args === void 0 ? void 0 : args['callback']) === null || _b === void 0 ? void 0 : _b.call(args, error);
            console.error(error);
            return false;
        }
        const data = args === null || args === void 0 ? void 0 : args['data'];
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: Global.stringify(data)
        };
        fetch(url, options)
            .then(response => {
            if (!navigator.onLine) {
                throw new Error('No internet connection.');
            }
            if (response.ok) {
                return response.json();
            }
            else {
                throw new Error('POST request failed.');
            }
        })
            .then(ret => {
            var _a, _b, _c, _d;
            // Handle the response ret
            if (Global.isset(ret === null || ret === void 0 ? void 0 : ret.error)) {
                var error = ret === null || ret === void 0 ? void 0 : ret.error;
                // Handle any errors
                (_a = args === null || args === void 0 ? void 0 : args['error']) === null || _a === void 0 ? void 0 : _a.call(args, error);
                (_b = args === null || args === void 0 ? void 0 : args['callback']) === null || _b === void 0 ? void 0 : _b.call(args, error);
                console.error(error);
            }
            else {
                (_c = args === null || args === void 0 ? void 0 : args['success']) === null || _c === void 0 ? void 0 : _c.call(args, ret);
                (_d = args === null || args === void 0 ? void 0 : args['callback']) === null || _d === void 0 ? void 0 : _d.call(args, ret);
            }
        })
            .catch(error => {
            var _a, _b;
            if (!navigator.onLine) {
                error = 'No internet connection.';
            }
            // Handle any errors
            (_a = args === null || args === void 0 ? void 0 : args['error']) === null || _a === void 0 ? void 0 : _a.call(args, error);
            (_b = args === null || args === void 0 ? void 0 : args['callback']) === null || _b === void 0 ? void 0 : _b.call(args, error);
            console.error(error);
        });
    }
    static loading(message = "") {
        if (!Global.isset(message)) {
            message = "Loading...";
        }
        sweetalert2_1.default.fire({
            text: message,
            allowOutsideClick: false,
            showClass: {
                popup: '', // Remove the pop-out animation
            },
            hideClass: {
                popup: '', // Remove the pop-out animation
            },
            didOpen: () => {
                sweetalert2_1.default.showLoading();
            }
        });
    }
    static hideLoading() {
        sweetalert2_1.default.close();
    }
}
Global.data = {};
Global.interval = 0;
Global.datahash = "";
/*
Global.localStorage.getItem("key").then((data) => {

});
Global.localStorage.setItem("key", $value).then(() => {

});
*/
Global.localStorage = localforage_1.default.createInstance({
    driver: localforage_1.default.LOCALSTORAGE, // Use the Session Storage driver
});
//var Global = new GlobalClass();
//export { Global, GlobalClass };
exports.default = Global;
