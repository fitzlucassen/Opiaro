<?php 

class Select extends Element {

	use ElementTrait;

	public function init() {

		$this->create('<select name="youhou"><option value="test">Test</option></select>');

		self::$inspector = new Inspector(__CLASS__);
		self::$inspector->add('addOption', Inspector::$Submit, 'element.find(\'select\').append(\'<option value="test2">Test2</option>\');', 'click');
		

	}

}