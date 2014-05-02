<?php

class SubInspector {

	public $elementName;

	public function setElementName($elementName) {
		$this->elementName = $elementName;
		return $this;
	}

	public function getElementName() {
		return $this->elementName;
	}

}