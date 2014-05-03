function InspectorManagerController(view){
	this.view = view;
	this.inspectorContainer = $('#right-toolbar');
}

InspectorManagerController.prototype.showInInspector = function(element){
	var $this = this;

	// On inclue les propriétés communes à tous les éléments
	// Trié par catégorie
	for(var category in this.view.GeneralProperties){
		if(typeof(this.view.GeneralProperties[category]) == 'function')
			continue;

		$this.view.appendTitle(this.view.GeneralProperties[category].Title);

		for(var property in this.view.GeneralProperties[category].properties){
			if(typeof(this.view.GeneralProperties[category].properties[property]) == 'function')
				continue;

			$this.view.appendProperty(this.view.GeneralProperties[category].properties[property], element);
		}
	}

	// Si l'élément sélectionné est un champs, on ajoute les propriétés qui lui sont propres
	if(element.prop('tagName') == 'INPUT'){
		for(var property in this.view.FieldProperties){
			if(typeof(this.view.GeneralProperties[property]) != 'function')
				$this.view.appendProperty(this.view.GeneralProperties[property]);
		}
	}
};

InspectorManagerController.prototype.modifyElement = function(element){
	var category = this.getCategory(element.attr('name'));

	if(category.Title == 'Selecteurs'){
		this.view.changeIdentifiers(element);
	}
	else {
		this.view.changeStyle(element);
	}
};

InspectorManagerController.prototype.getCategory = function(property){
	var category = '';

	for(var c in this.view.GeneralProperties){
		if(typeof(this.view.GeneralProperties[c]) == 'function')
			continue;

		for(var p in this.view.GeneralProperties[c].properties){
			if(typeof(this.view.GeneralProperties[c].properties[p]) == 'function')
				continue;
			if(property == this.view.GeneralProperties[c].properties[p].name){
				category = this.view.GeneralProperties[c];
				break;
			}
		}
	}

	return category;
};