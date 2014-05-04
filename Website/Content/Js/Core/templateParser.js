var TemplateParser = {
	_url: '/JSTemplate/',
	_template: '',

	loadTemplate: function(name, callback){
		var $this = this;
		var $callback = callback;

		$.ajax({
		  type: "GET",
		  url: this._url + name,
		  dataType: 'html',
		  async: false
		}).done(function( data ) {
	    	$this._template = data;

	    	$callback();
	  	});
	},

	replaceTemplate: function(array){
		for(var pattern in array){
			if(typeof(array[pattern]) == 'function')
				continue;
			this._template = this._template.replace('[[' + array[pattern].name + ']]', array[pattern].value);
		}
	},

	getTemplate: function(){
		return this._template;
	}
};