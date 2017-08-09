import Vision from './vision';
import WebCam from './webcam';

var filePath = __dirname + '/../resources/test.jpg';

var webcamClass = new WebCam(filePath);
var webcam = webcamClass.createWebcam();

// webcam.capture( "test_picture", function( err, data ) {
//     console.log(err);
// });

var vision = new Vision(filePath);
vision.getPrintTag();



// https://github.com/peterbraden/node-opencv
// https://community.risingstack.com/opencv-tutorial-computer-vision-with-node-js/


const cv = require('opencv');


var lowThresh = 0;
var highThresh = 100;
var nIters = 2;
var maxArea = 2500;

var GREEN = [0, 255, 0]; // B, G, R
var WHITE = [255, 255, 255]; // B, G, R
var RED   = [0, 0, 255]; // B, G, R

cv.readImage(__dirname + '/../resources/card2.jpg', function(err, im) {
  if (err) throw err;
  var width = im.width();
  var height = im.height();
  if (width < 1 || height < 1) throw new Error('Image has no size');

  var big = new cv.Matrix(height, width);
  var all = new cv.Matrix(height, width);

  var im_canny = im.copy();
  im_canny.convertGrayscale();

  im_canny.canny(lowThresh, highThresh);
  im_canny.dilate(nIters);

  var contours = im_canny.findContours();
  const lineType = 8;
  const maxLevel = 0;
  const thickness = 1;
  var maxArea = 1;

  var i = 0;
  for(i = 0; i < contours.size(); i++) {
    if(contours.area(i) > maxArea) {
      var moments = contours.moments(i);
      var cgx = Math.round(moments.m10 / moments.m00);
      var cgy = Math.round(moments.m01 / moments.m00);
      big.drawContour(contours, i, GREEN, thickness, lineType, maxLevel, [0, 0]);
      big.line([cgx - 5, cgy], [cgx + 5, cgy], RED);
      big.line([cgx, cgy - 5], [cgx, cgy + 5], RED);
    }
  }

  all.drawAllContours(contours, WHITE);

  big.save(__dirname + '/../resources/leafb.jpg');
  all.save(__dirname + '/../resources/leafa.jpg');
  console.log('Image saved to ./tmp/big.png && ./tmp/all.png');


  var shape = new cv.Matrix(height, width);
  im_canny = im.copy();

  im_canny.canny(lowThresh, highThresh);
  im_canny.dilate(nIters);

 contours = im_canny.findContours();

   let largestArea = 0;
  let largestAreaIndex;

  var i = 0;
  for(i = 0; i < contours.size(); i++) {
    if(contours.area(i) > largestArea) {
      largestArea = contours.area(i);
      largestAreaIndex = i;
    }
  }
      shape.drawContour(contours, largestAreaIndex, GREEN, thickness, lineType, maxLevel, [0, 0]);

      let bound = contours.boundingRect(largestAreaIndex);  

      shape.rectangle([bound.x, bound.y], [bound.width, bound.height], WHITE, 2)

    shape.save(__dirname + '/../resources/leafS.jpg');

    im.rectangle([bound.x, bound.y], [bound.width, bound.height], RED, 2)

    im.rectangle([bound.x + (bound.width * .7), bound.y + ((bound.height/6) * 4)], [bound.width/5, bound.height/10], GREEN, 2)

    im.save(__dirname + '/../resources/lenafFi.jpg');

});
