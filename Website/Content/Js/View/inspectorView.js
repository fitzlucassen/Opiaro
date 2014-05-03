function InspectorView(){
	this.GeneralProperties = [
		{Title: 'Selecteurs', properties: [
			{label: 'id', name: 'id'},
			{label: 'class', name: 'class'}
		]}, 
		{Title: 'Style', properties: [
			{label: 'couleur', name: 'color'},
			{label: 'couleur de fond', name: 'background-color'},
			{label: 'police', name: 'font-family'},
			{label: 'taille texte', name: 'font-size'},
			{label: 'texte', name: 'text'}
		]},
		{Title: 'Espacement', properties: [
			{label: 'marge extérieur', name: 'margin'},
			{label: 'marge intérieur', name: 'padding'},
			{label: 'bodure', name: 'border'},
		]}
	];
	this.FieldProperties = ['name', 'value', 'placeholder'];
}

InspectorView.prototype.appendTitle = function(title){
	$('#properties .propertiesContainer').append(
		'<h3>' + title + '</h3>'
	);
};

InspectorView.prototype.appendProperty = function(property, element){
	var value = '';
	var attributes = element.prop('attributes');

	for(var attr in attributes){
		if(attributes[attr].localName == property.name){
			value = element.attr(attributes[attr].localName);
		}
		else if(attributes.getNamedItem('style')){
			var val = attributes.getNamedItem('style').value.trim();
			var key = val.split(':').first();
			var keyValue = val.split(':').last();

			if(key == property.name){
				value = keyValue.substr(0, keyValue.length - 1);
			}
		}
	}

	$('#properties .propertiesContainer').append(
		'<div class="property">' + 
			'<span class="label">' + property.label + '</span>' +
			'<input type="text" data-val="' + element.attr('id') + '" class="propertyInput" value="' + value + '" name="' + property.name + '" />' +
		'</div>'
	);
};


InspectorView.prototype.changeStyle = function(element){
	$('#' + element.attr('data-val')).css(
		element.attr('name'), element.val()
	);
};

InspectorView.prototype.changeIdentifiers = function(element){
	if(element.attr('name') == 'class'){
		$('#' + element.attr('data-val')).removeClass().addClass(element.val());
	}
	else
		$('#' + element.attr('data-val')).attr(element.attr('name'), element.val());

	if(element.attr('name') == 'id')
		$('.propertyInput').attr('data-val', element.val());
};