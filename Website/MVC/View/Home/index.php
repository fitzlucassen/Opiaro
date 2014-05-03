<title>Opiaro - Construisez votre site web</title>

<link type="text/css" rel="stylesheet" href="<?php echo __css_directory__;?>/home.css" />
<link type="text/css" rel="stylesheet" href="<?php echo __css_directory__;?>/interface.css" />

<script>
	var url = '<?php echo __image_directory__ ; ?>';
</script>

<script type="text/javascript" src="/<?php echo __js_directory__  ; ?>/Core/base64Manager.js"></script>
<script type="text/javascript" src="/<?php echo __js_directory__  ; ?>/View/interfaceManagerView.js"></script>
<script type="text/javascript" src="/<?php echo __js_directory__  ; ?>/View/inspectorView.js"></script>
<script type="text/javascript" src="/<?php echo __js_directory__  ; ?>/Controller/interfaceManagerController.js"></script>
<script type="text/javascript" src="/<?php echo __js_directory__  ; ?>/Controller/inspectorManagerController.js"></script>
<script type="text/javascript" src="/<?php echo __js_directory__  ; ?>/app.js"></script>
<?php
    // inclure ci-dessus les balises à inclure dans la balise <head> du layout
    $head = $this->RegisterViewHead();
    // START CONTENT
    // Intégrer ci-dessous la vue
?>

<div id="preview">
</div>


<div id="right-toolbar">
	<div class="close rightClose vMiddle">
		<img src="<?php echo __image_directory__ . '/closeRight.png'; ?>" alt="hide">
	</div>

	<h2 class="inlineBlock vMiddle">Propriétés</h2>

	<div id="properties">	
		<div class="propertiesContainer"></div>
	</div>
</div>


<div id="bottom-toolbar">
	<div class="close vMiddle">
		<img src="<?php echo __image_directory__ . '/close.png'; ?>" alt="hide">
	</div>

	<h2 class="inlineBlock vMiddle">Éléments</h2>

	<div id="elements">
	</div>
</div>