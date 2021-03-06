function InterfaceManagerView(){
	this.elements = [
		{category: 'Conteneurs', elements: [
			{id: 1, title: 'Bloc', element: '<div ></div>'},
			{id: 2, title: 'Haut de page', element: '<header ></header>'},
			{id: 3, title: 'Pied de page', element: '<footer ></footer>'},
			{id: 4, title: 'Formulaire', element: '<form action="" method="post" enctype="multipart/form-data" ></form>'}
		]},
		{category: 'Élément de formulaire', elements: [
			{id: 8, title: 'Champs texte', element: '<input type="text" value="value" name="" />'},
			{id: 13, title: 'Champs mot de passe', element: '<input type="password" value="value" name="" />'},
			{id: 14, title: 'Champs e-mail', element: '<input type="email" value="value" name="" />'},
			{id: 15, title: 'Espace texte', element: '<textarea name="" rows="4" cols="20"></textarea>'},
			{id: 9, title: 'Case à cocher', element: '<input type="checkbox" value="value" name="" />'},
			{id: 10, title: 'Bouton radio', element: '<input type="radio" value="value" name="" />'},
			{id: 11, title: 'Légende', element: '<label >Votre label</label>'},
			{id: 12, title: 'Bouton', element: '<input type="submit" value="Ok" name="" />'}
		]},
		{category: 'Élément de contenu', elements: [
			{id: 5, title: 'Titre', element: '<h1 >Titre</h1>'},
			{id: 6, title: 'Sous-titre', element: '<h2 >Sous-titre</h2>'},
			{id: 7, title: 'Paragraphe', element: '<p >Lorem ipsum dolor sit amet</p>'}
		]}
	];

	this.complexElements = [
		{category: 'Type de formulaires', elements: [
			{title: 'Formulaire de connexion', elements: [
				{e: 1, children: [
					{e: 4, children: [
						{e: 11, children: []},
						{e: 8, children: []},
						{e: 11, children: []},
						{e: 13, children: []},
						{e: 12, children: []}
					]}
				]}
			]},
			{title: 'Formulaire de contact', elements: [
				{e: 1, children: [
					{e: 4, children: [
						{e: 11, children: []},
						{e: 8, children: []},
						{e: 11, children: []},
						{e: 14, children: []},
						{e: 11, children: []},
						{e: 15, children: []},
						{e: 12, children: []}
					]}
				]}
			]}
		]}
	];
}

InterfaceManagerView.prototype.goToComplexElements = function(){
	$('#elements').html('');
	$('#simpleElements').parent().removeClass('active');
	$('#complexElements').parent().addClass('active');
}

InterfaceManagerView.prototype.goToSimpleElements = function(){
	$('#elements').html('');
	$('#simpleElements').parent().addClass('active');
	$('#complexElements').parent().removeClass('active');
}

// Ajoute un élément draggable dans la liste des éléments
InterfaceManagerView.prototype.appendElements = function(dataVal, title){
	// Et on ajoute au DOM
	$('#tooltipBoard').append(
		'<div class="element" data-val="' + dataVal + '">' +
			'<div class="elementHidden">' + title + '</div>' +
		'</div>'
	);
};

// Ajoute un élément draggable dans la liste des éléments
InterfaceManagerView.prototype.appendCategory = function(title, isComplex){
	// Et on ajoute au DOM
	$('#elements').append(
		'<div class="categoryOfElement' + (isComplex ? ' categoryOfElementComplex' : '') + '" data-category="' + title + '">' +
			title +
		'</div>'
	);
};

// Ajoute à un élément droppé, le bouton de suppression
InterfaceManagerView.prototype.appendDeleteButton = function(context){
	// Et on ajoute au DOM
	context.prepend('<div class="deleteElement">X</div>');
};

// Change de place un élément déjà présent dans la preview
InterfaceManagerView.prototype.moveDraggableDiv = function(container, content){
	container.append($('<div id="tempDiv">').append(content).html());
	container.children(content).each(function(){
		if(!$(this).hasClass('ui-resizable-handle')){
			$(this).css({position: 'relative', 'top':0, 'left':0});
		}
	});
	$('<div id="tempDiv">').remove();
}

// Ajoute un id unique à un élément draggable
InterfaceManagerView.prototype.insertIdAttribut = function(element, guid){
	elementTmp = element.substr(0, element.indexOf(' '));
	elementTmp += ' ' + 'id="element' + guid + '"';
	elementTmp += ' ' + element.substr(element.indexOf(' '), element.length);

	return elementTmp;
};

InterfaceManagerView.prototype.insertLoremIpsum = function(element){
	elementTmp = element.substr(0, element.indexOf('><') + 1);
	elementTmp += 'LOREM IPSUM';
	elementTmp += element.substr(element.indexOf('><') + 1, element.length);

	return elementTmp;
};

InterfaceManagerView.prototype.getElementById = function(id) {
	var found = false;
	var cpt = 0;
	var cpt2 = 0;

	while(!found && cpt < this.elements.length){
		cpt2 = 0;

		while(!found && cpt2 < this.elements[cpt].elements.length){
			found = this.elements[cpt].elements[cpt2].id == id;
			cpt2++;
		}
		cpt++;
	}

	if(found)
		return this.elements[cpt-1].elements[cpt2-1];
	else
		return null;
};

InterfaceManagerView.prototype.getElementsByCategory = function(title) {
	var found = false;
	var cpt = 0;

	while(!found && cpt < this.elements.length){
		found = this.elements[cpt].category == title;
		cpt++;
	}

	if(found)
		return this.elements[cpt-1];
	else
		return null;
};

InterfaceManagerView.prototype.getComplexElementsByCategory = function(title) {
	var found = false;
	var cpt = 0;

	while(!found && cpt < this.complexElements.length){
		found = this.complexElements[cpt].category == title;
		cpt++;
	}

	if(found)
		return this.complexElements[cpt-1];
	else
		return null;
};