function InterfaceManagerView(){
	this.elements = [
		{title: 'bloc', element: '<div>Votre bloc</div>'},
		{title: 'paragraphe', element: '<p>Lorem ipsum dolor sit amet</p>'},
		{title: 'titre', element: '<h1>Titre</h1>'},
		{title: 'champs texte', element: '<input type="text" value="value" />'}
	]
}

InterfaceManagerView.prototype.appendElements = function(dataVal, title){
	$('#elements').append(
		'<div class="element" data-val="' + dataVal + '">' + 
			'<div class="elementHidden">' + title + '</div>'
			+ title + 
		'</div>'
	);
}