<?php

class Input extends Element {

	use ElementTrait;

	public function init() {

		$this->create('<label></label><input/>');

		self::$inspector = $inspector = new Inspector(__CLASS__);
		self::$inspector->add('Placeholder', Inspector::$Text, 'element.find(\'input\').attr(\'placeholder\', field.val());', 'keyup')
			->add('Value', Inspector::$Text, 'element.find(\'input\').attr(\'value\', field.val());', 'keyup')
			->add('Type', Inspector::$Text, 'element.find(\'input\').attr(\'type\', field.val());', 'keyup')
			->add('Style', Inspector::$Textarea, 'element.find(\'input\').attr(\'style\', field.val());')
			->add('AddLabel', Inspector::$Text, 'element.find(\'select\').html(field.val());', 'keyup');

	}

}