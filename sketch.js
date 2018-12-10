/*
PixelCanvas is a small pixel art maker using P5.js.
It utilizes an matrix of information about each pixel at 
any given time based on the "current color" selected to draw with 
and the mouse's position on a grid. Each "pixel" is actually 8 pixels wide, 
so we call 8px == 1 unit in the code to make it easily scalable up and down.

This project taught me an important lesson on both the mathematics of keeping an
array of information as well as how to lock something to a grid when there is a free moving cursor.
I imagine that this will be very helpful in game dev as lots of games run on a grid system.

While this version is glitchy, I would like to add more features in the final project, such as:
    - a paint bucket tool,
    - Polygonal drawing tools (square, circle, etc.)
    - symmetrical drawing (horizontal and vertical)
    - undo (maybe pixelHistory for each pixel?)
        - use keyCode to get CTRL+Z
    - other small features I probably havent thought of yet. 

This program also does not have an eraser tool, so I included the background color
in the swatches for a simulated eraser effect. 
Can probably use hex codes, but I already type out the RBG ints.
*/

var pixelCanvas =[];
// easiest way i could think of to store a variable list of 32 colors
// based on the context I use it in. 
var colorSwatches = [
    [0,0,0],
    [34, 32, 52],
    [69, 40, 60],
    [102, 57, 49],
    [143, 86, 59],
    [223, 113, 38],
    [217, 160, 102],
    [238, 195, 154],
    [251, 242, 54],
    [153, 229, 80],
    [106, 190, 48],
    [55, 148, 110],
    [75, 105, 47],
    [82, 75, 36],
    [50, 60, 57],
    [63, 63, 116],
    [48, 96, 130],
    [91, 110, 225],
    [99, 155, 255],
    [95, 205, 228],
    [203, 219, 252],
    [255, 255, 255],
    [220, 220, 220],
    [132, 126, 135],
    [105, 106, 106],
    [89, 86, 82],
    [118, 66, 138],
    [172, 50, 50],
    [217, 87, 99],
    [215, 123, 186],
    [143, 151, 74],
    [138, 111, 48]
];
var unit = 8; // 8 pixels per "unit" of the pixelcanvas
var currentColor = [255, 255, 255]; // start off with white as our color
function setup() {
    createCanvas(385, 257);
    noStroke();
    for (var i = 0; i < 32; i++) {
        pixelCanvas.push([]);
        for (var j = 0; j < 32; j++){ 
            pixelCanvas[i].push([Math.floor((j*unit) / unit) * unit, Math.floor((i*unit)/unit) * unit, unit, unit, [220,220,220]]);
            rect(unit * i, unit * j, unit, unit);
        }
    }
    

}

function draw() {
    background(220);
    noFill();
    stroke(0);
        
    // ACTUAL CANVAS
    for (var i = 0; i < 32; i++) {
        for (var j = 0; j < 32; j++) {
            var pixel = pixelCanvas[i][j];
            var colorList = pixelCanvas[i][j][4];
            var c = color(colorList[0], colorList[1], colorList[2]);
            push();
                noStroke();
                fill(c);
                rect(pixel[0], pixel[1], pixel[2], pixel[3]);
            pop();
            
        }
    }
    
    // GRID LINES
    push();
        stroke(200);
        for (var a = 1; a < unit; a++) {
            //VERTICAL CANVAS LINE
            line(unit * a * unit, 0, unit * a * unit, 256);
            //HORIZ. CANVAS LINE
            line(0, unit * a * unit, 255, unit * a *  unit);
        }
    pop();
    
    //COLOR SWATCHES
    push();
        //two for loops that make each rect and a 32 length array of all the color values.
        var count = 0;
        for (var y = 0; y < 8; y++) {
            for (var x = 0; x < 4; x++) {
                var c = color(colorSwatches[count][0], colorSwatches[count][1], colorSwatches[count][2]);
                push();
                    fill(c);
                    rect(((unit*4) * x) + 256, (unit*4) * y, unit * 4, unit * 4);
                pop();
                count ++;
            }
        }
    pop();
    
    // our "cursor", moves on a grid
    
    rect(Math.floor((mouseX) / unit) * unit, Math.floor((mouseY)/unit) * unit, unit, unit);
    if (mouseIsPressed && mouseX < 256 && mouseY  < 256) {
        // this formula seen other places in the code "locks" the mouse to the grid when drawing new rectangles.
        pixelCanvas[Math.floor((mouseY) / unit)][Math.floor((mouseX)/unit)][4] = [currentColor[0], currentColor[1], currentColor[2]]
    }
    // color grabber code
    else if (mouseIsPressed && mouseX >= 256 && mouseX <= 384 && mouseY < 256){
        if (mouseY % 8 == 0) {
            currentColor = get(mouseX, mouseY + 2);
        }
        else if (mouseX % 8 == 0) {
            currentColor = get(mouseX + 2, mouseY);
        }
        else {
            currentColor = get(mouseX, mouseY);
            console.log(currentColor);
        }
    }
    
}