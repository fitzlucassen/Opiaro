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

	for(var i in Interface.elements){
		if(Interface.elements[i].element != '' && Interface.elements[i].element != null)
			$('#elements').append(
				'<div class="element" data-val="' + Base64.encode(Interface.elements[i].element) + '">' + 
				'<div class="elementHidden">' + 
					Interface.elements[i].title + 
				'</div></div>'
			);
	}

	$('.element').draggable({
		start: function(event, ui){
			var html = event.toElement;
			$('#elements').append(html.outerHTML);

		}
	});

	$('#preview').droppable({
		drop: function(event, ui) {
			var el = event.toElement.attributes;
			$('#preview').append(Base64.decode(el[1].value));
  		}
  	});
});