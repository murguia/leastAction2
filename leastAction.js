function drawGrid() {

    let theCanvas = document.getElementById('canvas');
	let context = theCanvas.getContext('2d');

    axis_pos = 1;
    can_width = theCanvas.width; // Get the width of the canvas

    // Loop through and draw horizontal/vertical lines at each eighth of the grid
    // All logic below presumes canvas has square dimensions
    for (let i = 0; i <= can_width; i += (can_width) / 8) {
        // if (i == (can_width) / 2) // Special handling for horiz/vert axes
        // {
        //     context.lineWidth = 3; // Axes are thicker...
        //     context.strokeStyle = 'red'; //... and in red
        // }
        // else {
            context.lineWidth = 1;
            context.strokeStyle = 'black';
        // }
        // First draw vertical line
        context.beginPath();
        context.moveTo(i, 0);
        context.lineTo(i, can_width);
        context.stroke();
        context.closePath();
        // Then draw horizontal line
        // context.beginPath();
        // context.moveTo(0, i);
        // context.lineTo(can_width, i);
        // context.stroke();
        // context.closePath();
    }
    // Then add axis number labels
    // context.font = '20px _sans';
    // context.textBaseline = 'top';
    // // Move canvas origin to center of grid
    // context.translate(can_width / 2, can_width / 2);
    // for (i = -3; i <= 3; i++) {
    //     if (i != 0) { // Skip labeling origin
    //         // horizontal label
    //         context.fillText(i, i * (can_width / 8) + 5, 5);
    //         // vertical label
    //         context.fillText(i, 5, -i * (can_width / 8));
    //     }
    // }
    // Add bold-italic x- and y labels on the axes, too
    // context.font = 'italic bold 20px _sans';
    // context.fillText("x", (can_width / 2) - 12, 1);
    // context.fillText("y", 4, -(can_width / 2));
}

drawGrid();

// Set up mouse events for drawing
var drawing = false;
var mousePos = { x:0, y:0 };
var lastPos = mousePos;
canvas.addEventListener("mousedown", function (e) {
    console.log('mousedown',e)
        drawing = true;
  lastPos = getMousePos(canvas, e);
}, false);
canvas.addEventListener("mouseup", function (e) {
  drawing = false;
}, false);
canvas.addEventListener("mousemove", function (e) {
  mousePos = getMousePos(canvas, e);
  console.log('mousePos', mousePos)
}, false);

// Get the position of the mouse relative to the canvas
function getMousePos(canvasDom, mouseEvent) {
  var rect = canvasDom.getBoundingClientRect();
  return {
    x: mouseEvent.clientX - rect.left,
    y: mouseEvent.clientY - rect.top
  };
}

// Get a regular interval for drawing to the screen
window.requestAnimFrame = (function (callback) {
    return window.requestAnimationFrame || 
       window.webkitRequestAnimationFrame ||
       window.mozRequestAnimationFrame ||
       window.oRequestAnimationFrame ||
       window.msRequestAnimaitonFrame ||
       function (callback) {
    window.setTimeout(callback, 1000/60);
       };
})();


// Draw to the canvas
function renderCanvas() {
    if (drawing) {
        let theCanvas = document.getElementById('canvas');
        let context = theCanvas.getContext('2d');
        context.moveTo(lastPos.x, lastPos.y);
        context.lineTo(mousePos.x, mousePos.y);
        context.stroke();
      lastPos = mousePos;
    }
  }
  
  // Allow for animation
  (function drawLoop () {
    requestAnimFrame(drawLoop);
    renderCanvas();
  })();