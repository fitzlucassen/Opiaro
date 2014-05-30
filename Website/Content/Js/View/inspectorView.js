function InspectorView(){
	// TODO: Récupérer ces données côté PHP ?
	// TODO: Ajouter un attribut content le type
	this.GeneralProperties = [
		{Title: 'Style', properties: [
			{label: 'Largeur', name: 'width', tool: 'sizePicker'},
			{label: 'Hauteur', name: 'height', tool: 'sizePicker'},
			{label: 'Couleur', name: 'color', tool: 'colorPicker'},
			{label: 'Couleur de fond', name: 'background-color', tool: 'colorPicker'},
			{label: 'Police', name: 'font-family', tool: 'fontPicker'},
			{label: 'Taille texte', name: 'font-size', tool: 'sizePicker'}
		]},
		{Title: 'Espacement', properties: [
			{label: 'Marge extérieur', name: 'margin', tool: 'margePicker'},
			{label: 'Marge intérieur', name: 'padding', tool: 'margePicker'},
			{label: 'Bordure', name: 'border', tool: 'borderPicker' },
		]},
		{Title: 'Selecteurs', properties: [
			{label: 'id', name: 'id'},
			{label: 'class', name: 'class'}
		]}
	];
	this.FieldProperties = ['name', 'value', 'placeholder'];
}

// Ajoute un titre pour une catégorie
InspectorView.prototype.appendTitle = function(title){
	$('#properties .propertiesContainer').append(
		'<h3>' + title + '</h3>'
	);
};

// Ajoute une propriété à l'inspecteur
InspectorView.prototype.appendProperty = function(property, element){
	var value = '';

	if(element && element.length > 0){
		var attributes = element.prop('attributes');

		// On parcourt les attributs de l'élément
		for(var attr in attributes){
			// Si l'attribut courant est égale à la propriété qu'on ajoute à l'inspecteur,
			// Alors on remplit la valeur de l'input de la propriété avec la valeur actuel de l'élément
			if(attributes[attr].localName == property.name){
				value = element.attr(attributes[attr].localName);
			}
		}

		// Si il y a un attribut style dans l'élément
		if(element.css(property.name))
			value = this.getStyle(element, property.name);

		if(property.tool == 'colorPicker')
			value = value.toHex();
		if(property.tool == 'fontPicker')
			value = value.replaceAll('\'', '');

		// Et on ajoute la propriété à l'inspecteur
		$('#properties .propertiesContainer').append(
			'<div class="property">' + 
				'<span class="label">' + property.label + '</span>' +
				'<input type="text" data-val="' + element.attr('id') + '" class="propertyInput ' + property.tool + 'Tool" value="' + value + '" name="' + property.name + '" />' +
			'</div>'
		);
	}
};

InspectorView.prototype.getStyle = function(element, property){
	var style;
	var propertyTemp;

	if(property.indexOf('-') >= 0){
		propertyTemp = property.substring(0, property.indexOf('-'));
		propertyTemp += property.substring(property.indexOf('-') + 1, property.length).ucfirst();

	}
	else {
		propertyTemp = property;
	}

	style = element[0].style[propertyTemp];

	if(style == '')
		return element.css(property);
	else
		return style;
}

// Change le style d'un élément
InspectorView.prototype.changeStyle = function(element){

	if(element.hasClass('sizePickerTool')){
		$('#' + element.attr('data-val')).css(
			element.attr('name'), element.val() + element.siblings('select').val()
		);
	}
	else {
		$('#' + element.attr('data-val')).css(
			element.attr('name'), element.val()
		);
	}
};

// Change les identifiants d'un élément
InspectorView.prototype.changeIdentifiers = function(element){
	// Si on change la classe, on utilise la fonction addClass
	if(element.attr('name') == 'class'){
		$('#' + element.attr('data-val')).removeClass().addClass(element.val());
	}
	// Sinon on utilise la fonction attr
	else
		$('#' + element.attr('data-val')).attr(element.attr('name'), element.val());

	// Si on a changé l'id il faut qu'on change le data-val de tous les inputs de l'inspecteur
	// Pour garder le lien entre l'élément de l'inspecteur
	if(element.attr('name') == 'id')
		$('.propertyInput').attr('data-val', element.val());
};