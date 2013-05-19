(function(w) {

var View = function() { };
View.prototype = {
	_el     : null,
	_parent : null,
	_handlers : [],
	_active : null,
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
ViewHolder.prototype.initEvent = function() {
	var self = this;

	this._handlers["click"] = function(e) {
		var memo_id = e.target.getAttribute("data-num");
		self.focus(memo_id);
		self.renderAsList();
	};

	this._el.addEventListener("click", this._handlers["click"], false);
	this._el.addEventListener("touchstart", this._handlers["click"], false);
};

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
		this.list[i].setId(i);
		this.list[i].render();
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
ViewHolder.prototype.focus = function(id) {
	var isFlag = false;
	for (var i=0; i < this.list.length; i++) {
		if(!isFlag && this.list[i].getId() === id) {
			this.list[i]._active = true;
			isFlag = true;
		} else {
			this.list[i]._active = false;
		};
	};
};

/**********************/
var inputTextView = function() {};
inputTextView.prototype = new View();
inputTextView.prototype._inputEl = null;
inputTextView.prototype.init = function(id, inputId) {
	this._el = document.getElementById(id);
	this._inputEl = document.getElementById(inputId);
	return this._el;
};
inputTextView.prototype.initEvent = function() {
	var self = this;

	this._handlers["click"] = function(e) {
		self._inputEl.value = self._el.innerText;
		self.replace(self._inputEl, self._el);
	};

	this._handlers["blur"] = function(e) {
		if(self.validate(self._inputEl.value)) {
			self._el.innerText = self._inputEl.value;
			self.replace(self._el, self._inputEl);
		} else {
			alert("入力が正しくありません。");
		};
	};

	this._el.addEventListener("click", this._handlers["click"], false);
	this._inputEl.addEventListener("blur", this._handlers["blur"], false);
};
inputTextView.prototype.replace = function(replaceEl, targetEl) {
	replaceEl.style.display = "block";
	targetEl.parentNode.insertBefore(replaceEl, targetEl);
	targetEl.style.display = "none";
};
inputTextView.prototype.validate = function(txt) {
	//(txt.length <= 0) return false : return true;
	if(txt.length <= 0) {
		return false;
	};
	return true;
}

/**********************/
var MemoTitleView = function() { };
MemoTitleView.prototype = new View();
MemoTitleView.prototype._active = false;
MemoTitleView.prototype.initEvent = function() {
	/*
	var self = this;

	this._handlers["click"] = function() {
		self._active = !self._active;
		self.render();
		console.log(self._active);
	};
	
	this._el.addEventListener("click", this._handlers["click"], false);
	*/
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
	return this._el;
};
MemoTitleView.prototype.setId = function(id) {
	this._el.setAttribute("data-num", id);
}
MemoTitleView.prototype.getId = function() {
	return this._el.getAttribute("data-num");
}

/**********************/

w.View = View;
w.ViewHolder = ViewHolder;
w.inputTextView = inputTextView;
w.MemoTitleView = MemoTitleView;

})(window);