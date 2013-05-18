(function(w) {

var View = function() {};
View.prototype = {
	_el     : null,
	_parent : null,
	_handlers : [],
	init : function(id) {
		this._el = document.getElementById(id);
	},
	initEvent: function() {},
	create : function() {},
	render : function() {},

	_active : false
};

var MemoTitleView = function() {};
MemoTitleView.prototype = new View();
MemoTitleView.prototype.initEvent = function() {
	this._handlers["click"] = function() {
		this._active = !this._active;
		alert("ok");
	};

	this._el.addEventListener("click", this._handlers["click"], false);

};
MemoTitleView.prototype.create = function() {
	this._el = document.createElement("p");
	this._el = document.setAttribute("class", "each_memo");
};


})(window);