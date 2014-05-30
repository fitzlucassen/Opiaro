function InterfaceManagerController(view){
	this.view = view;
	this.Guid = 0;
	this.ChildrenGiud = 0;
}

// Initialise l'application en ajoutant la liste des éléments draggable au DOM
InterfaceManagerController.prototype.Initialize = function(){
	for(var i in this.view.elements){
		if(this.view.elements[i].element != '' && this.view.elements[i].element != null)
			this.view.appendElements(Base64.encode(this.view.elements[i].element), this.view.elements[i].title);
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
		},
		connectWith: '#preview',
		cursor: 'pointer'
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
	// Si l'élément était déjà dans le DOM, on l'ajoute lui et son contenu dans le nouveau conteneur
	// Sinon, on append le dataVal décodé
	if(draggableDiv.hasClass('ui-droppable')){
		this.view.moveDraggableDiv(droppableDiv, draggableDiv);
	} else{
	  	droppableDiv.append(htmlInString);
	  	$('#element' + (this.Guid - 1)).attr('data-val', dataValAttr);
	}
  	// On supprime la div draggé
	draggableDiv.remove();
	// On bind ensuite sur tous les fils de la div droppable la plus proche, le comportement de droppable et sortable
	droppableDiv.children().droppable({
		drop: function(event, ui) {
			$this.droppableFunction(event, ui);
  		},
  		tolerance: "pointer",
  		hoverClass: "draghover",
  		greedy: true
  	}).sortable({
		connectWith: '#preview',
		cursor: 'pointer',
		cancel: 'option',
		start: function(event, ui){
			// Supprime tous les resizehandlers
  			ResizeableManager.deleteAllHandlers();
		}
	});
};

InterfaceManagerController.prototype.appendComplexElements = function(){
	for(var i in this.view.complexElements){
		if(this.view.complexElements[i].elements != '' && this.view.complexElements[i].elements != null)
			this.view.appendElements(Base64.encode(this.getComplexElementHtml(this.view.complexElements[i].elements, '')), this.view.complexElements[i].title);
	}

	var that = this;
	$('.elementHidden').draggable({
		start: function(event, ui){
			that.draggableFunction(event, ui);
		},
		connectWith: '#preview',
	});
};

InterfaceManagerController.prototype.getComplexElementHtml = function(tree) {
	var html = '';
	var $this = this;

	for(var i = 0; i < tree.length; i++){
		var tmp = $this.view.getElementById(tree[i].e).element;
		html += tmp.substring(0, tmp.lastIndexOf(' >') + 2);

		if(tree[i].children.length > 0){
			html += $this.getComplexElementHtml(tree[i].children);
		}

		html += tmp.substring(tmp.lastIndexOf(' >') + 2, tmp.length);
	}
	return html;
};