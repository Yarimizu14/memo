(function(w) {

var Memo = function() { 
	this.id = null;
	this.active = false;

	this.title = "";
	this.contents = "";
	this.category = "";

	this.created  = null;
	this.modified  = null;

	//return this.init(arguments);
};
Memo.prototype.init = function(data) {
	this.title    = data[0];
	this.contents = data[1];
	this.category = data[2];
	this.created  = new Date();
	this.modified = new Date();
};

/*****取得*****/
Memo.prototype.getAll = function() {
	return {
		title   : this.title,
		contents: this.contents,
		category: this.category
	};
};
Memo.prototype.getTitle = function() {
	return this.title;
};
Memo.prototype.getContents = function() {
	return this.contents;
};
Memo.prototype.getCategory = function() {
	return this.category;
};
Memo.prototype.getCategory = function() {
	return {
		created: this.created,
		modified: this.modified
	};
};

/*****変更*****/
Memo.prototype.changeTitle = function(data) {
	this.title    = data;
	this.modified = new Date();
};
Memo.prototype.changeContents = function(data) {
	this.contents = data;
	this.modified = new Date();
};
Memo.prototype.changeCategory = function(data) {
	this.category = data;
	this.modified = new Date();
};

var MemoHolder = function() { 
	this.list = [];

	console.log(arguments);
	return this.init(arguments);
};
MemoHolder.prototype.init = function() {
};
MemoHolder.prototype.search = function(id) {
};

w.Memo = Memo;
w.MemoHolder = MemoHolder;

})(window);