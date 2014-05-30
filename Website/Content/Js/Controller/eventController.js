function EventController(controller, iController){
	this.interfaceController = controller;
	this.inspectorController = iController;
}

EventController.prototype.InitializeInterfaceEvent = function() {
	var that = this;

	// animation toggle toolbar
	$('#global').on('click', '.close', function(){
		if($(this).hasClass('rightClose')){
			$this = $(this);

			$(this).parent().parent().animate({right: '-170px'}, 200, function(){
				$this.children('img').attr('src', url + '/openRight.png');
				$this.addClass('rightOpen').addClass('open').removeClass('rightClose').removeClass('close');
			});

			$('#preview').css({
				width: ($('#preview').outerWidth() + 170) + 'px'
			});
		}
		else {
			$this = $(this);

			$(this).parent().parent().animate({height: '27px'}, 200, function(){
				$this.children('img').attr('src', url + '/open.png');
				$this.addClass('open').removeClass('close');
			});

			$('#preview').css({
				height: ($('#preview').outerHeight() + 80) + 'px'
			});
		}
	});

	$('#global').on('click', '.open', function(){
		if($(this).hasClass('rightOpen')){
			$this = $(this);

			$(this).parent().parent().animate({right: '-0px'}, 200, function(){
				$this.children('img').attr('src', url + '/closeRight.png');
				$this.addClass('rightClose').addClass('close').removeClass('rightOpen').removeClass('open');
			});

			$('#preview').css({
				width: ($('#preview').outerWidth() - 174) + 'px'
			});
		}
		else {
			$this = $(this);

			$(this).parent().parent().animate({height: '112px'}, 200, function(){
				$this.children('img').attr('src', url + '/close.png');
				$this.addClass('close').removeClass('open');
			});

			$('#preview').css({
				height: ($('#preview').outerHeight() - 85) + 'px'
			});
		}
	});
	// end animation toggle

	// Resize preview
  	var rightToolbarWidth = $('#right-toolbar').css('width').substring(0, $('#right-toolbar').css('width').length - 2);
	var bottomToolbarHeight = $('#bottom-toolbar').css('height').substring(0, $('#bottom-toolbar').css('height').length - 2);

	$('#preview').css({
		width: ($('#preview').css('width').substring(0, $('#preview').css('width').length - 2) - rightToolbarWidth - 13) + 'px',
		height: ($('#preview').css('height').substring(0, $('#preview').css('height').length - 2) - bottomToolbarHeight - 13) + 'px',
	});

	$('#bottom-toolbar').on('click', '.categoryOfElement, .categoryOfElementComplex', function(){

		if($('#tooltipBoard').css('display') == 'none'){
			$('#tooltipBoard').html('');

			if($(this).hasClass('categoryOfElementComplex'))
				that.interfaceController.appendComplexElements($(this).attr('data-category'));
			else
				that.interfaceController.appendElements($(this).attr('data-category'));

			$('#tooltipBoard').fadeIn(500);
			$('#tooltipBoard').css({top: '-170px'});

			// Draggable des éléments de base dans la preview
			$('.elementHidden').draggable({
				start: function(event, ui){
					that.interfaceController.draggableFunction(event, ui);
				},
				connectWith: '#preview',
			});
		}
		else {
			$('#tooltipBoard').fadeOut(500);
		}
	});
};


EventController.prototype.InitializeAppEvent = function(){
	var that = this;

	// Re-Draggable des éléments déjà en place dans la preview
	$('#preview').sortable({
		placeholder: "ui-state-highlight",
		connectWith: '#preview',
		cursor: 'pointer',
		cancel: 'option'
	});

	// On bind l'évènement droppable au container preview
	$('#preview').droppable({
		drop: function(event, ui) {
			that.interfaceController.droppableFunction(event, ui);
			$('#tooltipBoard').fadeOut(500);
  		},
  		greedy: true,
  		accept: '.elementHidden',
  	});

  	// On lance l'inspecteur d'élément au click sur un élément
	// Sauf si l'élément cliqué est le bouton de suppression
	// On bind le hover sur les éléments pour ajouter le bouton de suppression
  	$('#preview').on('click', '*', function(e){
  		if($(this).hasClass('deleteElement')){
  			$(this).parent().remove();
  			return false;
  		}

  		e.preventDefault();
  		e.stopPropagation();
  		// Vide l'inspecteur au cas où il serait déjà remplit
  		$('#properties .propertiesContainer').html('');
  		// Decleche l'inspection d'élément
  		that.inspectorController.showInInspector($(this));
  		// Initialisation des outils pour l'inspecteur
  		ToolManager.initialize('properties');
  		// Supprime tous les resizehandlers
  		ResizeableManager.deleteAllHandlers();
  		// Ajoute le handler sur l'élément sélectionné
  		ResizeableManager.appendHanlders($(this));
  	}).on('mouseover', '*', function(e){
  		e.preventDefault();
  		e.stopPropagation();

  		if($(this).hasClass('deleteElement') || $(this).children('.deleteElement').length > 0 || $(this).hasClass('ui-resizable-handle'))
  			return false;

  		that.interfaceController.view.appendDeleteButton($(this));
  	}).on('mouseleave', '*', function(e){
  		e.preventDefault();
  		e.stopPropagation();

  		if($(this).hasClass('deleteElement'))
  			$(this).remove();
  		else 
  			$(this).children('.deleteElement').remove();
  	});

  	// Real time binding modification
  	$('#properties').on('keyup', 'input.propertyInput', function(){
  		that.inspectorController.modifyElement($(this));
  	});

  	// Tabs manager
	$('#complexElements').click(function(){
		that.interfaceController.view.goToComplexElements();
		that.interfaceController.InitializeComplex();
	});
	$('#simpleElements').click(function(){
		that.interfaceController.view.goToSimpleElements();
		that.interfaceController.Initialize();

		// Draggable des éléments de base dans la preview
		$('.elementHidden').draggable({
			start: function(event, ui){
				that.interfaceController.draggableFunction(event, ui);
			},
			connectWith: '#preview',
		});
	});

};