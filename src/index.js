import Vision from './vision';
import WebCam from './webcam';

var filePath = __dirname + '/../resources/test.jpg';

var webcamClass = new WebCam(filePath);
var webcam = webcamClass.createWebcam();

webcam.capture( "test_picture", function( err, data ) {
    console.log(err);
});

var vision = new Vision(filePath);
vision.getPrintTag();


// https://community.risingstack.com/opencv-tutorial-computer-vision-with-node-js/