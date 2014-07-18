<title>Opiaro - Construisez votre site web</title>

<link type="text/css" rel="stylesheet" href="<?php echo __css_directory__;?>/Base/colorpicker.css" />
<link type="text/css" rel="stylesheet" href="<?php echo __css_directory__;?>/home.css" />
<link type="text/css" rel="stylesheet" href="<?php echo __css_directory__;?>/interface.css" />

<script>
	var url = '<?php echo __image_directory__ ; ?>';
</script>

<script type="text/javascript" src="/<?php echo __js_directory__  ; ?>/Base/colorpicker.js"></script>
<script type="text/javascript" src="/<?php echo __js_directory__  ; ?>/Core/base64Manager.js"></script>
<script type="text/javascript" src="/<?php echo __js_directory__  ; ?>/Core/templateParser.js"></script>
<script type="text/javascript" src="/<?php echo __js_directory__  ; ?>/Core/toolManager.js"></script>
<script type="text/javascript" src="/<?php echo __js_directory__  ; ?>/Core/resizeableManager.js"></script>
<script type="text/javascript" src="/<?php echo __js_directory__  ; ?>/View/interfaceManagerView.js"></script>
<script type="text/javascript" src="/<?php echo __js_directory__  ; ?>/View/inspectorView.js"></script>
<script type="text/javascript" src="/<?php echo __js_directory__  ; ?>/Controller/interfaceManagerController.js"></script>
<script type="text/javascript" src="/<?php echo __js_directory__  ; ?>/Controller/inspectorManagerController.js"></script>
<script type="text/javascript" src="/<?php echo __js_directory__  ; ?>/Controller/eventController.js"></script>
<script type="text/javascript" src="/<?php echo __js_directory__  ; ?>/app.js"></script>
<?php
    // inclure ci-dessus les balises à inclure dans la balise <head> du layout
    $head = $this->RegisterViewHead();
    // START CONTENT
    // Intégrer ci-dessous la vue
?>
<div id="editor">
	<div id="preview">
	</div>
	<div id="selector">
		<div class="corner corner-bottom-right">
		</div>
	</div>
</div>

<div id="right-toolbar">
	<div class="tabs">
		<div class="close rightClose vMiddle">
			<img src="<?php echo __image_directory__ . '/closeRight.png'; ?>" alt="hide">
		</div>

		<div class="tab inlineBlock vMiddle active">
			<h2 class="inlineBlock vMiddle">Inspecteur</h2>
		</div>
	</div>

	<div id="properties">
		<h2>Propriétés</h2>
		<div class="propertiesContainer container"></div>

		<h2>Actions</h2>
		<div class="actionsContainer container"></div>

		<h2>Evenements</h2>
		<div class="eventsContainer container"></div>
	</div>
</div>


<div id="bottom-toolbar">
	<div class="tabs">
		<input class="inlineBlock vMiddle" placeholder="Chercher un bloc"/>
		
		<div class="close vMiddle">
			<img src="<?php echo __image_directory__ . '/close.png'; ?>" alt="hide">
		</div>

		<div class="tab inlineBlock vMiddle active">
			<h2 id="simpleElements">Éléments</h2>
		</div>
		<div class="tab inlineBlock vMiddle">
			<h2 id="complexElements">Éléments complexes</h2>
		</div>

		<div id="tooltipBoard">
		</div>
	</div>

	<div id="elements">
	</div>
</div>

<div id="toolPopinGreyback">
	<div id="toolPopin">
	</div>
</div>