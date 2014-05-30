var ResizeableManager = {
	appendHanlders: function(element){
		element.css({
			'position': 'relative',
			'top': 0,
			'left': 0
		});

		// Ajoute les handler du resize
		element.append(
			'<div class="ui-resizable-handle ui-resizable-nw" id="nwgrip"></div>' +
		    '<div class="ui-resizable-handle ui-resizable-ne" id="negrip"></div>' +
		    '<div class="ui-resizable-handle ui-resizable-sw" id="swgrip"></div>' +
		    '<div class="ui-resizable-handle ui-resizable-se" id="segrip"></div>' +
		    '<div class="ui-resizable-handle ui-resizable-n" id="ngrip"></div>' +
		    '<div class="ui-resizable-handle ui-resizable-s" id="sgrip"></div>' +
		    '<div class="ui-resizable-handle ui-resizable-e" id="egrip"></div>' +
		    '<div class="ui-resizable-handle ui-resizable-w" id="wgrip"></div>'
		);

		// Bind l'event du resize sur la cible
		element.resizable({
		    handles: {
		        'nw': '#nwgrip',
		        'ne': '#negrip',
		        'sw': '#swgrip',
		        'se': '#segrip',
		        'n': '#ngrip',
		        'e': '#egrip',
		        's': '#sgrip',
		        'w': '#wgrip'
		    },
		    resize: function(event, ui){
		    	// Dès qu'on resize on met à jour les données dans l'inspecteur
		    	width = element.outerWidth();
		    	height = element.outerHeight();

		    	$('.property input.sizePickerTool').each(function(){
		    		if($(this).attr('name') == 'width'){
		    			$(this).val(width);
		    			$(this).siblings('select').val('px');
		    		}
		    		else if($(this).attr('name') == 'height'){
		    			$(this).val(height);
		    			$(this).siblings('select').val('px');
		    		}
		    	});
		    },
		    stop: function(event, ui){
		    	element.css({
		    		'position':'relative',
		    		'top':0,
		    		'left':0
		    	})
		    }
		});

		// Lorsqu'on resize on ne sort plus
		element.sortable();
		element.sortable( "destroy" );

		// Si on clique ailleurs on vire tout les resize handlers
		$('body').click(function(e){
			if(e.target.id != element.attr('id')){
				ResizeableManager.deleteAllHandlers();
			}
		});
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