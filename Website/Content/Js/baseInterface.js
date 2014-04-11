$(document).ready(function(){
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

			$(this).parent().animate({height: '100px'}, 200, function(){
				$this.children('img').attr('src', url + '/close.png');
				$this.addClass('close');
				$this.removeClass('open');
			});
		}
	});

	var Interface = new InterfaceManagerView();

	for(var i in Interface.elements){
		$('#elements').append(
			'<div class="element">' + Interface.elements[i].title + '</div>'
		);
	}
});