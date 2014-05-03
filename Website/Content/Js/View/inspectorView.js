function InspectorView(){
	// TODO: Récupérer ces données côté PHP ?
	// TODO: Ajouter un attribut content le type
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

// Ajoute un titre pour une catégorie
InspectorView.prototype.appendTitle = function(title){
	$('#properties .propertiesContainer').append(
		'<h3>' + title + '</h3>'
	);
};

// Ajoute une propriété à l'inspecteur
InspectorView.prototype.appendProperty = function(property, element){
	var value = '';
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
		value = element.css(property.name);

	// Et on ajoute la propriété à l'inspecteur
	$('#properties .propertiesContainer').append(
		'<div class="property">' + 
			'<span class="label">' + property.label + '</span>' +
			'<input type="text" data-val="' + element.attr('id') + '" class="propertyInput" value="' + value + '" name="' + property.name + '" />' +
		'</div>'
	);
};

// Change le style d'un élément
InspectorView.prototype.changeStyle = function(element){
	$('#' + element.attr('data-val')).css(
		element.attr('name'), element.val()
	);
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