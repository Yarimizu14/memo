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
Memo.prototype.register = function(res) {
	//引数resが配列ではない場合はそのまま、配列の場合は最初のデータをdataに入れる
	var data = (res.length == undefined || res.length === 0) ? res : res[0];

	//console.log("*memoに１件登録します。*");
	//console.log(data);

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
Memo.prototype.getDate = function() {
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
var Holder = function(id) {
	this.list = [];
};
Holder.prototype.register = function() { throw new Error("実装が必要です。"); }
Holder.prototype.findById = function(id) {
	for(var i=0; i < this.list.length; i++) {
		if(this.list[i].id === id) {
			console.log(this.list[i]);
			return this.list[i];
		};
	};
	return false;
};
Holder.prototype.findByKey = function(key, value) {
	var selection = [];

	for(var i=0; i < this.list.length; i++) {
		if(this.list[i][key] === value) {
			selection.push(this.list[i]);
		};
	};
	return selection;
};
//idで発見した値をkeyとvalueで書き換える
Holder.prototype.editById = function(id, replace) {
};
Holder.prototype.editByKey = function(key, value, replace) {
};
Holder.prototype.deleteAll = function() {

};


/*
*	MemoHolder
*/
var MemoHolder = function() { 
	this.list = [];

	this.register = this.register.bind(this);
	//return this.init(arguments);
};
MemoHolder.prototype = new Holder();
MemoHolder.prototype.init = function() {
};
MemoHolder.prototype.register = function(dataList) {

	console.log("********holderに全件登録します。********");

	this.list = [];

	for(var i=0; i < dataList.length; i++) {
		var m = new Memo();
		m.register(dataList[i]);
		this.list.push(m);
	};

	console.log("********holderに全件登録終了しました。********");

};


w.Memo = Memo;
w.MemoHolder = MemoHolder;

})(window);