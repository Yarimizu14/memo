(function(w) {

var View = function() { };
View.prototype = {
	_el     : null,
	_parent : null,
	_handlers : [],
	init : function(id) {
		this._el = document.getElementById(id);
		return this._el;
	},
	initEvent: function() {},
	create : function() {},
	render : function() {},
};

/**********************/
var ViewHolder = function() { };
ViewHolder.prototype = new View();
ViewHolder.prototype.list = [];
ViewHolder.prototype.appendToList = function(ViewList) {
	this._el.innerHTML = "";
	var fragment = document.createDocumentFragment();
	for(var i=0; i < ViewList.length; i++) {
		fragment.appendChild(ViewList[i]._el);
	};
	this._el.appendChild(fragment);
};
ViewHolder.prototype.renderAsList = function() {
	this._el.innerHTML = "";
	var fragment = document.createDocumentFragment();
	for(var i=0; i < this.list.length; i++) {
		fragment.appendChild(this.list[i]._el);
	};
	this._el.appendChild(fragment);	
};
ViewHolder.prototype.renderAsMemo = function() {};
ViewHolder.prototype.del = function() {
	var arr = [], tmp;

	while((tmp = this.list.pop()) !== undefined && tmp !== null) {
		(tmp._active) ? null : arr.push(tmp);
	};
	this.list = arr;
};


/**********************/
var MemoTitleView = function() { };
MemoTitleView.prototype = new View();
MemoTitleView.prototype._active = false;
MemoTitleView.prototype.initEvent = function() {
	var self = this;
	this._handlers["click"] = function() {
		self._active = !self._active;
		self.render();
		console.log(self._active);
	};

	this._el.addEventListener("click", this._handlers["click"], false);
};
MemoTitleView.prototype.create = function() {
	this._el = document.createElement("li");
	this._el.setAttribute("class", "memo-title");
	this._el.innerText = "test";
	this.render();
	return this._el;
};
MemoTitleView.prototype.render = function() {
	if(this._active) {		
		this._el.style.backgroundColor = "#AABBDD";
		this._el.style.color = "red";
	} else {
		this._el.style.backgroundColor = "";
		this._el.style.color = "black";
	};
};

/**********************/

w.View = View;
w.ViewHolder = ViewHolder;
w.MemoTitleView = MemoTitleView;

})(window);