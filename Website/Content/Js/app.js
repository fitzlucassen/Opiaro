$(document).ready(function(){
	
	// launch the app
	var Interface = new InterfaceManagerView();
	var Inspector = new InspectorView();

	var InterfaceManager = new InterfaceManagerController(Interface);
	var InspectorManager = new InspectorManagerController(Inspector);

	InterfaceManager.Initialize();

	var EventManager = new EventController(InterfaceManager, InspectorManager);
	EventManager.InitializeAppEvent();
	EventManager.InitializeInterfaceEvent();
});