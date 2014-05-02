<?php

class Inspector {

	static public $Text = 'inputText';
	static public $Textarea = 'textarea';
	static public $Submit = 'submit';

	public $content = [];

	public $elementName;
	public $id;

	public function __construct($elementName) {
		$this->elementName = $elementName;
	}

	public function render() {
		$string = '';
		foreach ($this->content as $key => $value) {
			$type = 'render'.ucfirst($value['type']);
			$field = $this->$type($value['label']);
			$string .= '<br /><label>'.$value['label'].'</label> : '.$field.'<script> $(document).ready(function(){ $(\'#Inspector-'.$this->elementName.' .'.$value['label'].'\').on(\''.$value['event'].'\', function () { var element = $(\'#'.$this->elementName.'-\' + $(\'#Inspector-'.$this->elementName.'\').attr(\'data-id\')); var field = $(this); '.$value['javascript'].' }); }); </script>';
		}
		return '<div id="Inspector-'.$this->elementName.'" style="display: none;" class="inspector" data-id="">'.$string.'</div>';
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

	public function add($label, $type, $javascript = null, $event = 'change', $position = null) {
		($position === null) ? $this->content[] = compact('label', 'type', 'javascript', 'event') : $this->content[$position] = compact('label', 'type', 'javascript', 'event');
		return $this;
	}

}