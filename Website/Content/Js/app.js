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

			$(this).parent().parent().animate({right: '-0px'}, 200, function(){
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

	// On donne un callback à la fonction d'initialisation 
	// Afin de binder le comportement draggable lorsque les éléments sont chargés
	InterfaceController.Initialize(function(){
		$('.elementHidden').draggable({
			start: function(event, ui){
				InterfaceController.draggableFunction(event, ui);
			}
		});
	});

	// On bind l'évènement droppable au container preview
	$('#preview').droppable({
		drop: function(event, ui) {
			InterfaceController.droppableFunction(event, ui);
  		},
  		greedy: true
  	});

	// Process the inspect element
  	$('#preview').on('click', '*', function(){
  		$('#properties .propertiesContainer').html('');
  		InspectorController.showInInspector($(this));
  	});

  	// Real time binding modification
  	$('#properties').on('keyup', 'input.propertyInput', function(){
  		InspectorController.modifyElement($(this));
  	});
});