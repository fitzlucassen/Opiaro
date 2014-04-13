<?php
	
	echo '<script src="//code.jquery.com/jquery-1.11.0.min.js"></script>';

	foreach (glob('Classes/*') as $file) {
		require $file;
	}


	$input = New Input();
	$select = New Select();


?>
	<h3>Page</h3>
	<div style="border: 1px solid #ccc;padding: 20px;">
		<?= $input->render(); ?>
		<?= $select->render(); ?>
	</div>

	<h3>Inspector</h3>
	<div id="inspector-box" style="border: 1px solid #ccc;padding: 20px;">
		<?= Input::getInspector()->render(); ?>
		<?= Select::getInspector()->render(); ?>
	</div>





