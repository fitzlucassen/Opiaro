function InterfaceManagerView(){
	this.elements = [
		{title: 'Bloc', element: '<div >Votre bloc</div>'},
		{title: 'Paragraphe', element: '<p >Lorem ipsum dolor sit amet</p>'},
		{title: 'Titre', element: '<h1 >Titre</h1>'},
		{title: 'Champs texte', element: '<input type="text" value="value" />'}
	];
}

InterfaceManagerView.prototype.appendElements = function(dataVal, title){
	$('#elements').append(
		'<div class="element" data-val="' + dataVal + '">' + 
			'<div class="elementHidden">' + title + '</div>'
			+ title + 
		'</div>'
	);
}

InterfaceManagerView.prototype.insertIdAttribut = function(element, guid){
	elementTmp = element.substr(0, element.indexOf(' '));
	elementTmp += ' ' + 'id="element' + guid + '"';
	elementTmp += ' ' + element.substr(element.indexOf(' '), element.length);

	return elementTmp;
}