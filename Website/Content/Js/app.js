$(document).ready(function(){
	// animation toggle toolbar
	$('#global').on('click', '.close', function(){
		if($(this).hasClass('rightClose')){
			$this = $(this);

			$(this).parent().parent().animate({width: '27px'}, 200, function(){
				$this.children('img').attr('src', url + '/openRight.png');
				$this.addClass('rightOpen').addClass('open');
				$this.removeClass('rightClose').removeClass('close');
			});
		}
		else {
			$this = $(this);

			$(this).parent().parent().animate({height: '27px'}, 200, function(){
				$this.children('img').attr('src', url + '/open.png');
				$this.addClass('open');
				$this.removeClass('close');
			});
		}
	});

	$('#global').on('click', '.open', function(){
		if($(this).hasClass('rightOpen')){
			$this = $(this);

			$(this).parent().parent().animate({width: '112px'}, 200, function(){
				$this.children('img').attr('src', url + '/closeRight.png');
				$this.addClass('rightClose').addClass('close');
				$this.removeClass('rightOpen').removeClass('open');
			});
		}
		else {
			$this = $(this);

			$(this).parent().parent().animate({height: '112px'}, 200, function(){
				$this.children('img').attr('src', url + '/close.png');
				$this.addClass('close');
				$this.removeClass('open');
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

	// Drag des éléments de base dans la preview
	$('.elementHidden').draggable({
		start: function(event, ui){
			InterfaceController.draggableFunction(event, ui);
		},
		connectWith: '#preview',
	});

	// Re-Drag des éléments déjà en place dans la preview
	$('#preview').sortable({
		placeholder: "ui-state-highlight",
		connectWith: '#preview',
		cursor: 'pointer'
	});

	// Les éléments présent dans la preview doivent pouvoir être droppable
	$('#preview').droppable({
		drop: function(event, ui) {
			InterfaceController.droppableFunction(event, ui);
  		},
  		greedy: true,
  		accept: '.elementHidden',
  	});

	// Process the inspect element
  	$('#preview').on('click', '*', function(e){
  		e.preventDefault();
  		e.stopPropagation();

  		$('#properties .propertiesContainer').html('');
  		InspectorController.showInInspector($(this));
  	});

  	// Real time binding modification
  	$('#properties').on('keyup', 'input.propertyInput', function(){
  		InspectorController.modifyElement($(this));
  	});
});