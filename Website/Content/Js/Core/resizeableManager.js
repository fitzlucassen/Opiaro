var ResizeableManager = {
	element : undefined,
	onMouseSizeState : false,
	init : function() {
		$(document).on("mouseup", function(e) {
	        	console.log("mouseup");
	        	if(ResizeableManager.onMouseSizeState) {
	            	$(document).unbind('mousemove');
			        onMouseSizeState = false;
			        ResizeableManager.element.css('opacity', '1');
			        $('#selector').find('.size').hide();
	        	}
	        });
		$('#selector .corner-bottom-right').on('mousedown', function(e) {
	        e.stopPropagation();
	        ResizeableManager.element.css('opacity', '0.6');
	        $('#selector').find('.size').show();
	        console.log('goone');
	        
	        $(document).on( "mousemove", function( event ) {
	        	console.log('mouve');
	            ResizeableManager.onMouseSizeState = true;
	            var oldSizeWidth = ResizeableManager.element.css('width');
	            var oldSizeHeight = ResizeableManager.element.css('height');
	            ResizeableManager.element.css('width', event.pageX-parseInt(ResizeableManager.element.offset().left + 7) - parseInt(ResizeableManager.element.css('padding-right')) - parseInt(ResizeableManager.element.css('padding-left')) - parseInt(ResizeableManager.element.css('border-right')) - parseInt(ResizeableManager.element.css('border-right')))
	                    .css('height', event.pageY-parseInt(ResizeableManager.element.offset().top + 7) - parseInt(ResizeableManager.element.css('padding-top')) - parseInt(ResizeableManager.element.css('padding-bottom')) - parseInt(ResizeableManager.element.css('border-top')) - parseInt(ResizeableManager.element.css('border-bottom')));    
	            
	            // update
	            var offset = ResizeableManager.element.offset(),
		            top = offset.top -5 - 2,
		            left = offset.left -2,
		            width = ResizeableManager.element.css('width'),
		            height = ResizeableManager.element.css('height');

				$('#selector').show()
		            .css('top', top)
		            .css('left', left)
		            .css('width', ResizeableManager.element.outerWidth())
		            .css('height', ResizeableManager.element.outerHeight())
		            .find('.size').text(width + ' * ' + height);
		        ResizeableManager.element.css('position', 'relative')
		            .css('z-index', '1000');
		        $('#selector').css('z-index', '900');
	        });
	    });
	},
	appendHanlders: function(element){

		if(ResizeableManager.element !== undefined) {
			ResizeableManager.element.css('z-index', '');
		}
		
		ResizeableManager.element = element;
		

		var offset = element.offset(),
            top = offset.top -5 - 2,
            left = offset.left -2,
            width = element.css('width'),
            height = element.css('height');

		$('#selector').show()
            .css('top', top)
            .css('left', left)
            .css('width', element.outerWidth())
            .css('height', element.outerHeight())
            .find('.size').text(width + ' * ' + height);
        element.css('position', 'relative')
            .css('z-index', '1000');
        $('#selector').css('z-index', '900');

   		// A partir du document car l'utilisateur peut arreter de "glisser" alors que le .bottom-right n'est pas encore à jour
    	

        

        // element.css({
		// 	'position': 'relative',
		// 	'top': 0,
		// 	'left': 0
		// });

		// Ajoute les handler du resize
		// element.append(
		// 	'<div class="ui-resizable-handle ui-resizable-nw" id="nwgrip"></div>' +
		//     '<div class="ui-resizable-handle ui-resizable-ne" id="negrip"></div>' +
		//     '<div class="ui-resizable-handle ui-resizable-sw" id="swgrip"></div>' +
		//     '<div class="ui-resizable-handle ui-resizable-se" id="segrip"></div>' +
		//     '<div class="ui-resizable-handle ui-resizable-n" id="ngrip"></div>' +
		//     '<div class="ui-resizable-handle ui-resizable-s" id="sgrip"></div>' +
		//     '<div class="ui-resizable-handle ui-resizable-e" id="egrip"></div>' +
		//     '<div class="ui-resizable-handle ui-resizable-w" id="wgrip"></div>'
		// );

		// // Bind l'event du resize sur la cible
		// element.resizable({
		//     handles: {
		//         'nw': '#nwgrip',
		//         'ne': '#negrip',
		//         'sw': '#swgrip',
		//         'se': '#segrip',
		//         'n': '#ngrip',
		//         'e': '#egrip',
		//         's': '#sgrip',
		//         'w': '#wgrip'
		//     },
		//     resize: function(event, ui){
		//     	// Dès qu'on resize on met à jour les données dans l'inspecteur
		//     	width = element.outerWidth();
		//     	height = element.outerHeight();

		//     	$('.property input.sizePickerTool').each(function(){
		//     		if($(this).attr('name') == 'width'){
		//     			$(this).val(width);
		//     			$(this).siblings('select').val('px');
		//     		}
		//     		else if($(this).attr('name') == 'height'){
		//     			$(this).val(height);
		//     			$(this).siblings('select').val('px');
		//     		}
		//     	});
		//     },
		//     stop: function(event, ui){
		//     	element.css({
		//     		'position':'relative',
		//     		'top':0,
		//     		'left':0
		//     	})
		//     }
		// });

		// Lorsqu'on resize on ne sort plus
		element.sortable();
		element.sortable( "destroy" );

		// Si on clique ailleurs on vire tout les resize handlers
		// $('body').click(function(e){
		// 	if(e.target.id != element.attr('id')){
		// 		ResizeableManager.deleteAllHandlers();
		// 	}
		// });
	},

	deleteHandlers: function(element){
		element.resizable();
		element.resizable( "destroy" );
		element.sortable({
			placeholder: "ui-state-highlight",
			connectWith: '#preview',
			cursor: 'pointer',
			cancel: 'option'
		});
		element.children('.ui-resizable-handle').remove();
	},

	deleteAllHandlers: function(){
		$('.ui-resizable').each(function(){
			ResizeableManager.deleteHandlers($(this));	
		});
	}
};