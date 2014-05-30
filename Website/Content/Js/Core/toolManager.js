var ToolManager = {
	initialize: function(parentID){
		$('#' + parentID).on('click', '.colorPickerTool', function(){
			var $this = $(this);

			ToolManager.colorPicker($(this));
		});

		$('.sizePickerTool').each(function(){
			ToolManager.sizePicker($(this));
		});
		$('.fontPickerTool').each(function(){
			ToolManager.fontPicker($(this));
		});
	},

	colorPicker: function(sender){
		// Ouvre la popin
		$('#toolPopinGreyback').fadeIn('slow');
		// Bind l'event de fermeture de popin
		$('#toolPopinGreyback, #toolPopin').click(function(e){
			e.stopPropagation();

			if($(this).attr('id') == 'toolPopin')
				return;

			$(this).fadeOut('slow');
		});
		// Remplit la popin avec le colorPicker
		$('#toolPopin').html(
			'<h3>Choisir votre couleur</h3>' +
			'<div id="colorPicker" style="margin: auto;width: 358px;"></div>'
		);
		// Applique le colorPicker
		$('#colorPicker').ColorPicker({
			flat: true,
			onSubmit: function(hsb, hex, rgb, el) {
				sender.val('#' + hex);
				$('#toolPopinGreyback').fadeOut('slow');

				sender.trigger('keyup');
			}
		});
	},

	fontPicker: function(sender){
		sender.autocomplete({
	      	source: [
	      		"Verdana",
	      		"Helvetica",
	      		"Arial",
	      		"Times New Roman",
	      		"Georgia",
	      		"Monospace",
	      		"Sans-serif",
	      		"Comic Sans MS",
	      		"Courier New",
	      		"Impact",
	      		"Lucida Console",
	      		"Trebuchet MS",
	      		"MS Sans Serif",
	      		"Tahoma"
	     	]
	    });
	},

	sizePicker: function(sender){
		// On redimenssionne l'input
		sender.css('width', '32%');
		// On ajoute le select des types de taille
		sender.parent().append(
			'<select class="sizeType">' +
				'<option value="px">px</option>' +
				'<option value="em">em</option>' +
				'<option value="pt">pt</option>' +
				'<option value="%">%</option>' +
			'</select>'
		);

		// On récupère le type actuel pour le mettre en selection dans le select
		var sizeType = sender.val().substring(sender.val().length - 2, sender.val().length);
		// On modifie la value pour enlever le type
		sender.val(sender.val().substring(0, sender.val().length - 2));
		// On modifie la value du select
		sender.siblings('select').val(sizeType);
		// On bind l'event pour la modification en temps réel
		sender.siblings('select').change(function(){
			sender.trigger('keyup');
		});

		// On modifie en type friendly
		sender.attr('type', 'number');
		// On bind l'event
		sender.change(function(){
			$(this).trigger('keyup');
		});
	},

	margePicker: function(){

	},

	borderPicker: function(){

	},
};