//https://github.com/desmondmorris/node-tesseract
var tesseract = require('node-tesseract');

const defaultOptions = {
	l: 'deu',
	psm: 6,
	binary: '/usr/local/bin/tesseract'
};



class Vision {
  constructor(path, options) {
  	this.options = options || defaultOptions;
    this.path = path;
  }
  
  getPrintTag() {
    tesseract.process( this.path , this.options, function(err, text) {
		if(err) {
			console.error(err);
			return err;
		} else {
			console.log(text);
			return text;
		}
	});
  }

}

export default Vision;


