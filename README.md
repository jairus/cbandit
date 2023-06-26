# cbandit

Common Bandit. Utility functions. Global

## Installation

```javascript
npm install cbandit
```

## Import

```javascript
import Global from 'cbandit'
```

## Data Handling
```javascript

var someitem = {somekey:"somevalue"};

//safely convert data to json 
var json = Global.stringify(item);

//safely parse a json string
var item = Global.parse(json);

//safely check if data has value
if(Global.isset(item)){
	console.log("item", item);
}

//to md5 hash a string
var hash = Global.parse(json);

//typecast to string
var str = Global.toString(123);

//typecast to integer
var n = Global.toInt("123");

//typecast to float
var num = Global.toInt("123.4");


```
## Loader, Alert, Confirm dialog
```javascript
//to show loader
Global.loading();

//to hide loader
Global.hideLoading();

//alert
Global.alert("Hello World!");

//success alert
Global.success("Success! Hello World!");

//error alert
Global.error("Success! Hello World!");

//confirm dialog
Global.error("Confirm?", (n)=>{
	if(n){
		Global.success("Confirmed!");
	}
});
```

## Posting data using fetch
```javascript
Global.loading();
Global.postData({
	url: 'https://nmg.ph/_endpoint.php',
	data: data,
	success: (ret) => { //called on success
		console.log("ret", ret);
		var json = Global.stringify(ret);
		Global.success("response: "+json);
	},
	error: (error) => { //called on error
		var json = Global.stringify(error);
		Global.error("error: "+json);
	},
	callback: () => { //this will be called wether success of error
		Global.hideloading();
	}
});
```


## License

This project is licensed under the [MIT License](LICENSE).
