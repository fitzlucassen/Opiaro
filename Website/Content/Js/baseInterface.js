$(document).ready(function(){
	// animation toggle toolbar
	$('#global').on('click', '.close', function(){
		if($(this).hasClass('rightClose')){
			$this = $(this);

			$(this).parent().animate({width: '34px'}, 200, function(){
				$this.children('img').attr('src', url + '/openRight.png');
				$this.addClass('rightOpen').addClass('open');
				$this.removeClass('rightClose').removeClass('close');
			});
		}
		else {
			$this = $(this);

			$(this).parent().animate({height: '34px'}, 200, function(){
				$this.children('img').attr('src', url + '/open.png');
				$this.addClass('open');
				$this.removeClass('close');
			});
		}
	});

	$('#global').on('click', '.open', function(){
		if($(this).hasClass('rightOpen')){
			$this = $(this);

			$(this).parent().animate({width: '200px'}, 200, function(){
				$this.children('img').attr('src', url + '/closeRight.png');
				$this.addClass('rightClose').addClass('close');
				$this.removeClass('rightOpen').removeClass('open');
			});
		}
		else {
			$this = $(this);

			$(this).parent().animate({height: '200px'}, 200, function(){
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

	$('.elementHidden').draggable({
		start: function(event, ui){
			InterfaceController.draggableFunction(event, ui);
		}
	});

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
  	$('#properties').on('blur', 'input.propertyInput', function(){
  		
  	});
});