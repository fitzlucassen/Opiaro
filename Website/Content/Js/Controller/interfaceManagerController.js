function InterfaceManagerController(view){
	this.view = view;
	this.Guid = 0;
	this.ChildrenGiud = 0;
}

InterfaceManagerController.prototype.Initialize = function(){
	for(var i in this.view.elements){
		if(this.view.elements[i].element != '' && this.view.elements[i].element != null)
			this.view.appendElements(Base64.encode(this.view.elements[i].element), this.view.elements[i].title);
	}
};

InterfaceManagerController.prototype.draggableFunction = function(event, ui){
	var $this = this;
	var html = event.toElement;
	var draggableDiv = ui.helper;

	// On clone la div draggable
	draggableDiv.parent().prepend(html.outerHTML);
	// On récupère le html sérialisé
	draggableDiv.attr('data-val', draggableDiv.parent().attr('data-val'));

	// Et on bind sur le clone de lla div draggable, le comportement draggable 
	draggableDiv.parent().children('.elementHidden').draggable({
		start: function(event, ui){
			$this.draggableFunction(event, ui);
		}
	});
};

InterfaceManagerController.prototype.droppableFunction = function(event, ui){
	var $this = this;
	var draggableDiv = ui.helper;
	var dataValAttr = draggableDiv.attr('data-val')
	var droppableDiv = $(event.target);

	// On décode le data-val de l'élément draggé qui correspond au html de l'élément encodé en base64
	var htmlInString = Base64.decode(dataValAttr);
	// On crée un ID unique pour cet élément
	htmlInString = this.insertIdAttribut(htmlInString);
	// On ajoute l'élément au DOM
  	droppableDiv.append(htmlInString);
  	// On supprime la div draggé
	draggableDiv.remove();

	// On bind ensuite sur tous les fils de la div droppable la plus proche, le comportement de droppable
	droppableDiv.children().droppable({
		drop: function(event, ui) {
			$this.droppableFunction(event, ui);
  		},
  		tolerance: "pointer",
  		hoverClass: "draghover",
  		greedy: true,
  	});
}

InterfaceManagerController.prototype.insertIdAttribut = function(element){
	elementTmp = element.substr(0, element.indexOf(' '));
	elementTmp += ' ' + 'id="element' + this.Guid + '"';
	elementTmp += ' ' + element.substr(element.indexOf(' '), element.length);
	this.Guid++;

	return elementTmp;
}