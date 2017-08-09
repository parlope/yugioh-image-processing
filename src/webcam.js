// https://github.com/chuckfairy/node-webcam
var NodeWebcam = require( "node-webcam" );

const defaultOptions = {
	width: 1280,
    height: 720,
    quality: 100,
    delay: 0,
    saveShots: true,
    output: "jpeg",
    device: 'false',
    callbackReturn: "location",
    verbose: false
};



class WebCam {
  constructor( options) {
  	this.options = options || defaultOptions;
  }
  
  createWebcam() {
  	console.log("Webcam Created!");
  	return NodeWebcam.create( this.options );
  }


}

export default WebCam;



//Creates webcam instance
// var Webcam = NodeWebcam.create( opts );
// Webcam.capture( "test_picture", function( err, data ) {} );


// Webcam.list( function( list ) {

//     //Use another device
 
//     console.log(list);
//     var anotherCam = NodeWebcam.create( { 
//           width: 1280,
//         height: 720,
//         quality: 100,
//         delay: 0,
//         saveShots: true,
//         output: "jpeg",
//         callbackReturn: "location",
//         verbose: true,
//         device: 'Mobius'
//     } );
//     anotherCam.capture( "test_picture", function( err, data ) {
//             console.log(err);

//     } );
//     // console.log("here");

// });