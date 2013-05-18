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
	request  : function(method, url, callback, params) {

		var xhr = new XMLHttpRequest();
		xhr.addEventListener('readystatechange', function(e) {
			if(xhr.readyState === 4) {
				if (xhr.status === 200) {  	//通信処理が終わったとき
					var res = JSON.parse(xhr.responseText); 		//JSONだった場合。
					console.log("ajax");
					console.log(res);

					(callback === undefined || callback === null) ?  null : callback(res);
				} else if(xhr.status === 400) {
					console.log(xhr.status + " Errorです。");
				}
			};
		}, false);

		xhr.open(method, url);
		
		//4. データの送信
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
		xhr.send(params);
	},

	getAll : function(callback) {
		var url    = "http://cshooljs.dynalogue.com/api/data/?" + this.setParams(this.app);

		this.request("GET", url, callback, null);
	},
	getSingle : function(id, callback) {
		var url    = "http://cshooljs.dynalogue.com/api/data/" + id + "/";

		this.request("GET", url, callback, null);
	},
	create : function(data, callback) {
		var url    = "http://cshooljs.dynalogue.com/api/data/";
		var params = this.setParams(this.app) + "&" + this.setParams(data);

		this.request("POST", url, callback, params);
	},
	change : function(id, data, callback) {
		var url    = "http://cshooljs.dynalogue.com/api/data/";
		var params = "id=" + id + "&" + this.setParams(this.app) + "&" + this.setParams(data);
		console.log(params);

		this.request("PUT", url, callback, params);
	},
	del : function(id, callback) {
		var url    = "http://cshooljs.dynalogue.com/api/data/" + id + "/?" + this.setParams(this.app);;

		this.request("DELETE", url, callback, null);
	}

};

w.utilajax = utilajax;

})(window);
