<?php

class Option extends Element {

	use ElementTrait;

	public function init() {

		$this->create('<option value="test">Test</option>');

		self::$inspector = new Inspector(__CLASS__);
		self::$inspector->add('Value', Inspector::$Text, 'element.find(\'option\').val($field.val());');
		self::$inspector->add('Default', Inspector::$Checkbox, 'element.find(\'option\').val($field.val());');
		

	}

}