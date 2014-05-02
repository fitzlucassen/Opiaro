<?php

class Inspector {

	static public $Text = 'inputText';
	static public $Textarea = 'textarea';
	static public $Submit = 'submit';
	static public $Checkbox = 'checkbox';

	public $content = [];
	public $subs = [];

	public $elementName;
	public $id;

	public function __construct($elementName) {
		$this->elementName = $elementName;
	}

	public function render($display = false) {
		$string = '';
		foreach ($this->content as $key => $value) {
			$type = 'render'.ucfirst($value['type']);
			$field = $this->$type($value['label']);
			$string .= '<br /><label>'.$value['label'].'</label> : '.$field.'<script> $(document).ready(function(){ $(\'#Inspector-'.$this->elementName.' .'.$value['label'].'\').on(\''.$value['event'].'\', function () { var inspector = $(this).parent(\'.inspector\'); var element = $(\'#'.$this->elementName.'-\' + $(\'#Inspector-'.$this->elementName.'\').attr(\'data-id\')); var field = $(this); '.$value['javascript'].' }); }); </script>';
		}

		foreach ($this->subs as $label => $value) {
			$elementName = $value->getElementName();
			$string .= '<div style="border:1px solid #ccc;padding: 4px;" class="'.$label.'">'.$label.' <br /><div class="source-inspector" style="display: none;">'.$elementName::getInspector()->render(true).'</div></div>';
		}

		$displayString = ($display) ? 'style="display: block;"' : 'style="display: none;"';
		return '<div id="Inspector-'.$this->elementName.'" '.$displayString.' class="inspector" data-id="">'.$string.'</div>';
	}

	private function renderInputText($label) {
		return '<input class="'.$label.'" type="text"/>';
	}

	private function renderTextarea($label) {
		return '<textarea class="'.$label.'"></textarea>';
	}

	private function renderSubmit($label) {
		return '<input type="submit" class="'.$label.'" value="'.$label.'"/>';
	}
	private function renderCheckbox($label) {
		return '<input type="checkbox" class="'.$label.'" value="'.$label.'"/>';
	}

	public function add($label, $type, $javascript = null, $event = 'change', $position = null) {
		($position === null) ? $this->content[] = compact('label', 'type', 'javascript', 'event') : $this->content[$position] = compact('label', 'type', 'javascript', 'event');
		return $this;
	}

	public function addSub($label) {
		$this->subs[$label] = new SubInspector();
		return $this;
	}

	public function getSub($label) {
		return $this->subs[$label];
	}

}