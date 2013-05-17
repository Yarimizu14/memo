(function(w) {

/*
*	Memo
*/
var Memo = function() { 
	this.id = null;
	this.active = false;

	this.title = "";
	this.contents = "";
	this.category = "";

	this.created  = null;
	this.modified  = null;

	this.register = this.register.bind(this);
	//return this.register(arguments);
};
Memo.prototype.init = function() {};
Memo.prototype.register = function(dataList) {
	var data = (dataList.length == undefined ||dataList.length === 0) ? dataList : dataList[0];

	console.log(data);

	this.id       = data["id"];
	this.title    = data["title"];
	this.contents = data["body"];
	this.category = data["category"];
	this.created  = data["created"];
	this.modified = data["modified"];
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

/*
*	Holder
*/
var Holder = function() { };

/*
*	MemoHolder
*/
var MemoHolder = function() { 
	this.memos = [];

	this.register = this.register.bind(this);
	//return this.init(arguments);
};
MemoHolder.prototype = new Holder();
MemoHolder.prototype.init = function() {
};
MemoHolder.prototype.register = function(dataList) {
	console.log(dataList);

	for(var i=0; i < dataList.length; i++) {
		var m = new Memo();
		m.register(dataList[i]);
		this.memos.push(m);
	};

	console.log("holderに登録しました。");
};
MemoHolder.prototype.search = function(id) {
};

w.Memo = Memo;
w.MemoHolder = MemoHolder;

})(window);