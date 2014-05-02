<?php

class Element {

	public $name; // LIKE ModuleName.ElementName

	static public $count = 0;

	public $id; // 

	public $content;

	public function __construct() {
		$this->name = get_class($this);
		$this->id = self::$count;
		self::$count++;

		$this->init();
	}

	public function create($content) {
		$this->content = $content;
	}

	public function render() {
		return '<div id="'.$this->name.'-'.$this->id.'" data-id="'.$this->id.'" data-element="'.$this->name.'" style="position: relative;display: inline;"><div class="OnClick" style="position: absolute;width: 100%;height: 100%;top: 0px;left: 0px;cursor: pointer;"></div>'.$this->content.'</div><input id="'.$this->name.'-'.$this->id.'-data" type="hidden"/><script>$(document).ready(function(){ $(\'#'.$this->name.'-'.$this->id.' .OnClick\').on(\'click\', function() { $(\'#inspector-box > .inspector\').each(function() { $(this).hide() }); $(\'#Inspector-'.$this->name.'\').show(); $(\'#Inspector-'.$this->name.'\').attr(\'data-id\', $(this).parent().attr(\'data-id\')); }); });</script>';
	}



}