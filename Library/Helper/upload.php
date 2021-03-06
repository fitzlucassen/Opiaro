<?php
     
    namespace fitzlucassen\FLFramework\Library\Helper;

    /*
      Class : Upload
      Déscription : Permet de gérer les uploads
     */
    class Upload extends Helper {
    	/**
		 * Default directory persmissions (destination dir)
		 */
		const DEFAULT_DIR_PERMISSIONS = 750;

		public $file = array();

		protected $files_post = array();
		protected $destination;
		protected $finfo;
		protected $max_file_size;
		protected $mimes = array();
		protected $external_callback_object;
		protected $external_callback_methods = array();
		protected $tmp_name;
		protected $validation_errors = array();
		protected $filename;


		/**
		 *  Define ROOT constant and set & create destination path
		 * 
		 * @param string $destination 
		 */
		public function __construct($destination) {
			parent::__construct();

			// define document root constant
			define('ROOT', $_SERVER['DOCUMENT_ROOT'] . DIRECTORY_SEPARATOR);

			// set & create destination path
			if (!$this->set_destination($destination)) {

				throw new Exception('Upload: Can\'t create destination.');

			}

			//create finfo object
			$this->finfo = new \finfo();
		}

		/**
		 * Check & Save file
		 * 
		 * Return data about current upload
		 *  
		 * @return array
		 */
		public function upload($filename = '') {
			if ($this->check()) {
				$this->save_file();

				return $this->get_state();
			}

			// return state data
			return $this->get_state();
		}

		/**
		 * Save file on server
		 */
		protected function save_file() {
			//create & set new filename
			if(empty($this->filename)){
				$this->filename = $this->file_post['name'];
			}

			//set filename
			$this->file['filename']	= $this->filename;

			//set full path
			$this->file['full_path'] = $this->destination . $this->filename;

			$cpt = 1;
			while(file_exists($this->file['full_path'])){
				$f =  end(explode('.', $this->file['full_path']));
				$this->file['full_path'] = $this->file['full_path'] . '_' . $cpt . '.' . $f;
				$cpt++;
			}

			$status = move_uploaded_file($this->tmp_name, $this->file['full_path']);

			//checks whether upload successful
			if (!$status) {
				throw new Exception('Upload: Can\'t upload file.');
			}

			//done
			$this->file['status']	= true;
		}

		/**
		 * Set external callback methods
		 * 
		 * @param object $instance_of_callback_object
		 * @param array $callback_methods 
		 */
		public function callbacks($instance_of_callback_object, $callback_methods) {
			if (empty($instance_of_callback_object)) {

				throw new Exception('Upload: $instance_of_callback_object can\'t be empty.');

			}
			if (!is_array($callback_methods)) {

				throw new Exception('Upload: $callback_methods data type need to be array.');

			}
			$this->external_callback_object	 = $instance_of_callback_object;
			$this->external_callback_methods = $callback_methods;
		}


		/**
		 * Execute callbacks
		 */
		protected function validate() {
			//get curent errors
			$errors = $this->get_errors();

			if (empty($errors)) {
				//set data about current file
				$file_size = $this->get_file_size();

				$this->file = array(
					'status'				=> false,
					'destination'			=> $this->destination,
					'size_in_bytes'			=> $file_size,
					'size_in_mb'			=> $this->bytes_to_mb($file_size),
					'mime'					=> $this->get_file_mime(),
					'original_filename'		=> $this->file_post['name'],
					'tmp_name'				=> $this->file_post['tmp_name'],
					'post_data'				=> $this->file_post,
				);

				foreach($this->external_callback_methods as $method) {
					$this->external_callback_object->$method($this);
				}
			}
		}

		/**
		 * Validate file (execute callbacks)
		 * 
		 * Returns TRUE if validation successful
		 * 
		 * @return bool
		 */
		public function check() {
			//execute callbacks (check filesize, mime, also external callbacks
			$this->validate();

			//add error messages
			$this->file['errors'] = $this->get_errors();

			//change file validation status
			$this->file['status'] = empty($this->validation_errors);

			return $this->file['status'];
		}

		/**
		 * Checks whether Files post array is valid
		 * 
		 * @return bool
		 */
		protected function check_file_array($file) {
			return isset($file['error']) 
				&& !empty($file['name']) 
				&& !empty($file['type']) 
				&& !empty($file['tmp_name']) 
				&& !empty($file['size']);
		}

		/**
		 * Set File array to object
		 *  
		 * @param array $file 
		 */
		public function file($file) {
			//checks whether file array is valid
			if (!$this->check_file_array($file)) {

				//file not selected or some bigger problems (broken files array)
				$this->set_error('Please select file.');

			}
			//set file data
			$this->file_post = $file;

			//set tmp path
			$this->tmp_name  = $file['tmp_name'];
		}

		/**
		 * Checks whether destination folder exists
		 * 
		 * @return bool
		 */
		protected function destination_exist() {
			return is_writable($this->destination);
		}

		/**
		 * Create path to destination
		 * 
		 * @param string $dir
		 * @return bool
		 */
		protected function create_destination() {
			return mkdir(ROOT . $this->destination, self::DEFAULT_DIR_PERMISSIONS, true);
		}

		/**
		 * Convert bytes to mb.
		 *  
		 * @param int $bytes
		 * @return int
		 */
		public function bytes_to_mb($bytes) {
			return round(($bytes / 1048576), 2);
		}



		/******************************
		 ********** SETTERS ***********
		 ******************************/



		/**
		 * Set validation error
		 * 
		 * @param string $message 
		 */
		public function set_error($message) {
			$this->validation_errors[] = $message;
		}

		/**
		 * Set destination path (return TRUE on success)
		 * 
		 * @param string $destination
		 * @return bool 
		 */
		protected function set_destination($destination) {
			$this->destination = $destination . DIRECTORY_SEPARATOR;

			return $this->destination_exist() ?: $this->create_destination();
		}



		/******************************
		 ********** GETTERS ***********
		 ******************************/



		/**
		 * Return validation errors
		 * 
		 * @return array
		 */
		public function get_errors() {
			return $this->validation_errors;
		}

		/**
		 * Get current state data
		 * 
		 * @return array
		 */
		protected function get_state() {
			return $this->file;
		}

		/**
		 * Get file mime type
		 * 
		 * @return string
		 */
		protected function get_file_mime() {
			return $this->finfo->file($this->tmp_name, FILEINFO_MIME_TYPE);
		}

		/**
		 * Get file size
		 * 
		 * @return int
		 */
		protected function get_file_size() {
			return filesize($this->tmp_name);
		}
    }