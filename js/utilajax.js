(function(w) {

var utilajax = {
	app: {
		app_name: "yarimizu"	
	},
	setParams: function(data) {
		params = "";

		for(var key in data) {
			params += key + "=" + data[key] + "&";
		};
		params = params.slice(0, -1);

		return params;
	},
	request  : function(method, url, callback) {

		var xhr = new XMLHttpRequest();
		xhr.addEventListener('readystatechange', function(e) {
			if(xhr.readyState === 4) {
				if (xhr.status === 200) {  	//通信処理が終わったとき
					var res = JSON.parse(xhr.responseText); 		//JSONだった場合。
					console.log(res);
					callback(res);
				}
			};
		}, false);

		//xhr.open("GET", "http://cshooljs.dynalogue.com/api/data/?app_name=yarimizu");
		xhr.open(method, url);
		
		//4. データの送信
		xhr.send(null);
	},

	getAll : function(callback) {
		var url    = "http://cshooljs.dynalogue.com/api/data/?" + this.setParams(this.app);

		this.request("GET", url, callback);
	},
	getSingle : function() {

	},
	create : function() {

	},
	change : function() {

	},
	del : function() {

	}

};

w.utilajax = utilajax;

})(window);
