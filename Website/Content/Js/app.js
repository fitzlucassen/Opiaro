$(document).ready(function(){
	// Views
	var Interface = new InterfaceManagerView();
	var Inspector = new InspectorView();

	// Controllers
	var InterfaceManager = new InterfaceManagerController(Interface);
	var InspectorManager = new InspectorManagerController(Inspector);

	// Launch the app
	InterfaceManager.Initialize();

	// Manage events
	var EventManager = new EventController(InterfaceManager, InspectorManager);
	EventManager.InitializeAppEvent();
	EventManager.InitializeInterfaceEvent();
});