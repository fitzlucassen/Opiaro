<?php

    namespace fitzlucassen\FLFramework\Website\MVC\Controller;
    
    use fitzlucassen\FLFramework\Website\MVC\Model as models;
    use fitzlucassen\FLFramework\Library\Helper as helpers;
    
     /*
		Class : JSTemplateController
     */
    class JSTemplateController extends Controller {
		public function __construct($action, $manager) {
		    parent::__construct("JSTemplate", $action, $manager);
		}
		
		public function InspectorTitle(){
		    $Model = new models\HomeModel($this->_repositoryManager);
		    		 
		    $this->setLayout(null);

		    $this->_view->ViewCompact($Model);
		}

		public function InspectorProperty(){
		    $Model = new models\HomeModel($this->_repositoryManager);
		    		    
		    $this->setLayout(null);

		    $this->_view->ViewCompact($Model);
		}

		public function ElementsElement(){
		    $Model = new models\HomeModel($this->_repositoryManager);
		    		   
		    $this->setLayout(null);

		    $this->_view->ViewCompact($Model);
		}
    }