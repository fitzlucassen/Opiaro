$(document).ready(function(){
	// animation toggle toolbar
	$('#global').on('click', '.close', function(){
		if($(this).hasClass('rightClose')){
			$this = $(this);

			$(this).parent().parent().animate({right: '-170px'}, 200, function(){
				$this.children('img').attr('src', url + '/openRight.png');
				$this.addClass('rightOpen').addClass('open');
				$this.removeClass('rightClose').removeClass('close');
			});

			$('#preview').css({
				width: ($('#preview').outerWidth() + 170) + 'px'
			});
		}
		else {
			$this = $(this);

			$(this).parent().parent().animate({height: '27px'}, 200, function(){
				$this.children('img').attr('src', url + '/open.png');
				$this.addClass('open');
				$this.removeClass('close');
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
				$this.addClass('rightClose').addClass('close');
				$this.removeClass('rightOpen').removeClass('open');
			});

			$('#preview').css({
				width: ($('#preview').outerWidth() - 174) + 'px'
			});
		}
		else {
			$this = $(this);

			$(this).parent().parent().animate({height: '112px'}, 200, function(){
				$this.children('img').attr('src', url + '/close.png');
				$this.addClass('close');
				$this.removeClass('open');
			});

			$('#preview').css({
				height: ($('#preview').outerHeight() - 85) + 'px'
			});
		}
	});
	// end animation toggle

	// launch the app
	var Interface = new InterfaceManagerView();
	var Inspector = new InspectorView();
	var InterfaceController = new InterfaceManagerController(Interface);
	var InspectorController = new InspectorManagerController(Inspector);

	InterfaceController.Initialize();

	// Draggable des éléments de base dans la preview
	$('.elementHidden').draggable({
		start: function(event, ui){
			InterfaceController.draggableFunction(event, ui);
		},
		connectWith: '#preview',
	});

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
			InterfaceController.droppableFunction(event, ui);
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

  		$('#properties .propertiesContainer').html('');

  		InspectorController.showInInspector($(this));

  		// Initialisation des outils pour l'inspecteur
  		ToolManager.initialize('properties');

  	}).on('mouseover', '*', function(e){
  		e.preventDefault();
  		e.stopPropagation();

  		if($(this).hasClass('deleteElement') || $(this).children('.deleteElement').length > 0)
  			return false;

  		Interface.appendDeleteButton($(this));
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
  		InspectorController.modifyElement($(this));
  	});

  	// Resize preview
  	var rightToolbarWidth = $('#right-toolbar').css('width').substring(0, $('#right-toolbar').css('width').length - 2);
	var bottomToolbarHeight = $('#bottom-toolbar').css('height').substring(0, $('#bottom-toolbar').css('height').length - 2);

	$('#preview').css({
		width: ($('#preview').css('width').substring(0, $('#preview').css('width').length - 2) - rightToolbarWidth - 13) + 'px',
		height: ($('#preview').css('height').substring(0, $('#preview').css('height').length - 2) - bottomToolbarHeight - 13) + 'px',
	});
});