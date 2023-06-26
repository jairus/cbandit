import localforage from 'localforage';
import Swal from 'sweetalert2';
import { MD5 } from 'crypto-js';

class Global {
	static data = {};
	static interval = 0;
	static datahash = "";

	/*
	Global.localStorage.getItem("key").then((data) => {

	});
	Global.localStorage.setItem("key", $value).then(() => {

	});
	*/
	static localStorage = localforage.createInstance({
		driver: localforage.LOCALSTORAGE, // Use the Session Storage driver
	});
	
	constructor() {}
	
	static base64Encode(str:any) {
		const encodedString = btoa(str);
 		 return encodedString;
	}

	static base64Decode(str:any) {
		const decodedString = atob(str);
		return decodedString;
	}
	
	static md5(input: string): string {
		const hash = MD5(input);
		return hash;
	}
	
	static watchGlobalData(logging = false){
		clearInterval(Global.interval);
		var hash = Global.stringify(Global.data);
		if(Global.datahash==""){
			Global.datahash = hash;
			//load data from local db
			Global.loadData("Global.data", (data)=>{
			//Global.localStorage.getItem("Global.data").then((data) => {
				if(Global.isset(data)){
					Global.data = data;
					Global.datahash = Global.stringify(Global.data);
					(logging) ? console.log("loaded Global.data", Global.data) : '';
					Global.watchGlobalData();
				}
				else{
					Global.saveData("Global.data", Global.data, ()=>{
					//Global.localStorage.setItem("Global.data", Global.data).then(() => {
						(logging) ? console.log("initial Global.data", Global.data) : '';
						Global.watchGlobalData();
					})
				}
			});
		}
		else{
			if(hash!=Global.datahash){
				//console.log("hash", hash);
				//console.log("Global.datahash", Global.datahash);
				Global.datahash = hash;
				Global.saveData("Global.data", Global.data, ()=>{
				//Global.localStorage.setItem("Global.data", Global.data).then(() => {
					(logging) ? console.log("updated Global.data", Global.data) : '';
					Global.watchGlobalData();
				})
			}
			else{
				Global.interval = setTimeout(()=>{
					//console.log("hash", hash);
					Global.watchGlobalData();
				}, 100)
			}
		}		
	}
	
	static log(...params){
		try{
			console.log(params);
		}
		catch(e){

		}
	}

	static alert(msg){
		Swal.fire({
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

	static success(msg){
		Swal.fire({
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

	static error(msg){
		Swal.fire({
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

	static confirm(msg="", callback=(n)=>{}, confirmtext="", canceltxt=""){
		if(!Global.isset(confirmtext)){
			confirmtext = "Confirm";
		}
		if(!Global.isset(canceltxt)){
			canceltxt = "Cancel";
		}
		Swal.fire({
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
			callback(result.value)
		});
	}

	static isset(v, strict=false){
		//not strict
		if(!strict){
			if(typeof v == "undefined"){
				return false;
			}
			else if(Global.toString(v) == ""){
				return false;
			}
			else if(v == false && typeof v != "string"){
				return false;
			}
			else if(v == 0 && typeof v != "string"){
				return false;
			}
			else if(v == null && typeof v != "string"){
				return false;
			}
			else if(!v && typeof v != "string"){
				return false;
			}
			else{
				return true;
			}
		}
		//strict
		else{
			if(typeof v == "undefined"){
				return false;
			}
			else{
				return true;
			}
		}
	}

	static saveData(key, value, callback=()=>{}) {
		localforage.setItem(key, value, function(error, result) {
			if (error) {
				console.error('Error occurred while setting item:', error);
			} else {
				//console.log('Data Saved:', key, result);
			}
			callback();
		});
	}

	static loadData(key, callback) {
		localforage.getItem(key, function(error, result) {
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

	static stringify(obj){
		var json = "";
		try{
			json = JSON.stringify(obj);
		}
		catch(e){
			json = "";
		}
		return json;
	}

	static parse(json){
		var obj = {};
		try{
			obj = JSON.parse(json);
		}
		catch(e){
			obj = {};
		}
		return obj;
	}

	static toString(str=""){
		if(typeof str != "undefined" && str != null){
			return str+"";
		}
		else{
			return "";
		}
	}
	
	static toInt(n:any){
		if(typeof n != "undefined" && n != null && !isNaN(n)){
			return parseInt(n.toString(), 10);
		}
		else{
			return 0;
		}
	}
	
	static toFloat(n:any){
		if(typeof n != "undefined" && n != null && !isNaN(n)){
			return parseFloat(n.toString());
		}
		else{
			return 0;
		}
	}
	
	static postData(args={url:"", success:(ret)=>{}, error:(error)=>{}, callback:(data)=>{}}) {
		const url = args?.url; // Replace with your API endpoint
		if(!Global.isset(url)){
			var error = "Invalid URL";
			// Handle any errors
			args?.['error']?.(error);
			args?.['callback']?.(error);
			console.error(error);
			return false;
		}
		const data = args?.['data'];
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
				} else {
					throw new Error('POST request failed.');
				}
			})
			.then(ret => {
				// Handle the response ret
				if(Global.isset(ret?.error)){
					var error = ret?.error;
					// Handle any errors
					args?.['error']?.(error);
					args?.['callback']?.(error);
					console.error(error);
				}
				else{
					args?.['success']?.(ret);
					args?.['callback']?.(ret);
				}
			})
			.catch(error => {
				if (!navigator.onLine) {
					error = 'No internet connection.';
				}
				// Handle any errors
				args?.['error']?.(error);
				args?.['callback']?.(error);
				console.error(error);
			});
	}

	static loading(message=""){
		if(!Global.isset(message)){
			message = "Loading...";
		}
		Swal.fire({
			text: message,
			allowOutsideClick: false,
			
			showClass: {
				popup: '', // Remove the pop-out animation
			},
			hideClass: {
				popup: '', // Remove the pop-out animation
			},
			didOpen: () => {
				Swal.showLoading();
			}
		});
	}
	
	static hideLoading(){
		Swal.close();
	}

}
//var Global = new GlobalClass();
//export { Global, GlobalClass };
export default Global;