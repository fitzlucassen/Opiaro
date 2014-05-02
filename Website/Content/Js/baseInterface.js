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
	var InterfaceController = new InterfaceManagerController(Interface);

	InterfaceController.Initialize();

	$('.elementHidden').draggable({
		start: function(event, ui){
			draggableFunction(event, ui);
		}
	});

	$('#preview').droppable({
		drop: function(event, ui) {
			droppableFunction(event, ui);
  		}
  	});
});

var draggableFunction = function(event, ui){
	var html = event.toElement;
	ui.helper.parent().prepend(html.outerHTML);
	ui.helper.attr('data-val', ui.helper.parent().attr('data-val'));

	ui.helper.parent().children('.elementHidden').draggable({
		start: function(event, ui){
			draggableFunction(event, ui);
		}
	});
}

var droppableFunction = function(event, ui){
	var el = event.toElement.attributes;
	$('#preview').append(Base64.decode(el[1].value));
	ui.helper.remove();
}