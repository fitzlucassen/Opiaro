function InterfaceManagerView(){
	this.elements = [
		{title: 'Bloc', element: '<div >Votre bloc</div>'},
		{title: 'Haut de page', element: '<header >Votre Header</header>'},
		{title: 'Pied de page', element: '<footer >Votre Footer</footer>'},
		{title: 'Formulaire', element: '<form action="" method="post" enctype="multipart/form-data">Votre formulaire</form>'},

		{title: 'Titre', element: '<h1 >Titre</h1>'},
		{title: 'Sous-titre', element: '<h2 >Sous-titre</h2>'},
		{title: 'Paragraphe', element: '<p >Lorem ipsum dolor sit amet</p>'},

		{title: 'Champs texte', element: '<input type="text" value="value" name="" />'},
		{title: 'Case à cocher', element: '<input type="checkbox" value="value" name="" />'},
		{title: 'Bouton radio', element: '<input type="radio" value="value" name="" />'},
		{title: 'Légende', element: '<label >Votre label</label>'}
	];
}

// Ajoute un élément draggable dans la liste des éléments
InterfaceManagerView.prototype.appendElements = function(dataVal, title){
	// Et on ajoute au DOM
	$('#elements').append(
		'<div class="element" data-val="' + dataVal + '">' +
			'<div class="elementHidden">' + title + '</div>' +
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
	container.children(content).css({position: 'relative', 'top':0, 'left':0});
	$('<div id="tempDiv">').remove();
}

// Ajoute un id unique à un élément draggable
InterfaceManagerView.prototype.insertIdAttribut = function(element, guid){
	elementTmp = element.substr(0, element.indexOf(' '));
	elementTmp += ' ' + 'id="element' + guid + '"';
	elementTmp += ' ' + element.substr(element.indexOf(' '), element.length);

	return elementTmp;
};
