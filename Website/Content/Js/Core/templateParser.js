var TemplateParser = {
	_template: '',

	loadTemplate: function(name){

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