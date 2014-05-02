<?php 

class Select extends Element {

	use ElementTrait;

	public function init() {

		$option = new Option();

		$this->create('<select name="youhou">'.$option->render().'</select>');

		self::$inspector = new Inspector(__CLASS__);
		self::$inspector
			->add('addOption', Inspector::$Submit, 'inspector.find(\'.Options\').append(inspector.find(\'.Options\').find(\'.source-inspector\').html());', 'click')
			->addSub('Options');

		self::$inspector->getSub('Options')
			->setElementName('Option');
		

	}

}