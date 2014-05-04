function InterfaceManagerController(view){
	this.view = view;
	this.Guid = 0;
	this.ChildrenGiud = 0;
}

// Initialise l'application en ajoutant la liste des éléments draggable au DOM
InterfaceManagerController.prototype.Initialize = function(callback){
	for(var i in this.view.elements){
		if(this.view.elements[i].element != '' && this.view.elements[i].element != null)
			this.view.appendElements(Base64.encode(this.view.elements[i].element), this.view.elements[i].title, callback);
	}
};

// S'exécute au début de chaque drag
InterfaceManagerController.prototype.draggableFunction = function(event, ui){
	var $this = this;
	var html = event.toElement;
	var draggableDiv = ui.helper;

	// On clone la div draggable
	draggableDiv.parent().prepend(html.outerHTML);
	// On récupère le html sérialisé
	draggableDiv.attr('data-val', draggableDiv.parent().attr('data-val'));

	// Et on bind sur le clone de la div draggable, le comportement draggable 
	draggableDiv.parent().children('.elementHidden').draggable({
		start: function(event, ui){
			$this.draggableFunction(event, ui);
		}
	});
};

// S'exécute à chaque drop
InterfaceManagerController.prototype.droppableFunction = function(event, ui){
	var $this = this;
	var draggableDiv = ui.helper;
	var dataValAttr = draggableDiv.attr('data-val')
	var droppableDiv = $(event.target);

	// On décode le data-val de l'élément draggé qui correspond au html de l'élément encodé en base64
	var htmlInString = Base64.decode(dataValAttr);
	// On crée un ID unique pour cet élément
	htmlInString = this.view.insertIdAttribut(htmlInString, this.Guid);
	this.Guid++;
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