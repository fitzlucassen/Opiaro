function InterfaceManagerController(view){
	this.view = view;
}

InterfaceManagerController.prototype.Initialize = function(){
	for(var i in this.view.elements){
		if(this.view.elements[i].element != '' && this.view.elements[i].element != null)
			this.view.appendElements(Base64.encode(this.view.elements[i].element), this.view.elements[i].title);
	}
}