class Graph {
constructor(canvasId, minGraphX, maxGraphX, minGraphY, maxGraphY, color, legend, axisDescription) { // pri konstruktorju moramo podati ID platna, ki ga sicer ustvarimo v html-ju
  this.canvas = document.getElementById(canvasId);
  this.ctx = this.canvas.getContext("2d");
  this.canvasWidth = this.canvas.width; // mind capital W at Width
  this.canvasHeight = this.canvas.height; // mind capital H at Height
  this.x = new Array(); // create new Array x
  this.y = new Array();
  this.rangeX = maxGraphX - minGraphX;
  this.rangeY = maxGraphY - minGraphY;

// create y array (size) according to the color vector (could have multiple rows i.e. 2d)
for( var i=0; i<color.length; i++ ) {
  this.y.push([]); // example of three row array init. would be: this.y = [[],[],[]];
}

  this.minGraphX = minGraphX;
  this.maxGraphX = maxGraphX;
  this.minGraphY = minGraphY;
  this.maxGraphY = maxGraphY;
  this.color = color; // color of the graph

  this.legend = legend;
  this.axisDescription = axisDescription;

// fill x vector; vector y is filled in real-time
for (var i=0; i<this.maxGraphX+1; i++) {
  this.x[i] = i; // values for the x coordinate; 0, 1, 2, ...
  }
}

addValueOrCutAndAdd(yValue) {
if (this.y[0].length == this.maxGraphX+1) { // if canvas size is 10x10 we have 11x11 points (starting with 0 and ending with 10)
for (var i = 0; i < yValue.length; i++) { // v zanki gremo po polju yInput in na mestu 0 eno vrednost odrežemo, na koncu pa eno mesto dodamo - zapišemo novo vrednost yInput
  this.y[i].splice(0, 1); // on the position 0 in the vector y we cut one value
  this.y[i][this.maxGraphX] = yValue[i]; // at the end of the array the new value is added
  }
}

else {
for (var i = 0; i < yValue.length; i++) { // z zanko gremo po vseh vrsticah za matrike y
  this.y[i].push(yValue[i]); // if the array is not yet full, we push the new value in the array / vrednost v oklepaju [] t.j. index je za ena večji; npr., če imamo eno vrednost je indeks [0], length pa 1
    }
  }
}

 plot(yValue) {
  this.addValueOrCutAndAdd(yValue);
  this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight); // clear the canvas

	 
for (var i=0; i < yValue.length; i++) { // zanka, ki gre po vrsticah y matrike
  this.ctx.strokeStyle = this.color[i]; // determine color
  this.ctx.beginPath(); // for the start of the line
for (var j=0; j<this.y[0].length; j++) {
  this.ctx.lineTo(this.x[j]/this.rangeX*this.canvasWidth, (this.canvasHeight - ((this.y[i][j]-this.minGraphY)/this.rangeY) * this.canvasHeight)); // for y values we multiply with canas height, eg. 0.25 * 100 = 25
  }
  this.ctx.stroke();
}

// add legend
for( var i=0; i<this.legend.length; i++ ) { // legend and color should be of the same size
  this.ctx.font = "11px Arial";
  this.ctx.fillText(this.legend[i], 49+i*54, 10);
  this.ctx.strokeStyle = this.color[i];
  this.ctx.beginPath(); // beginning of the short line for the legend
  this.ctx.lineTo(37+i*54, 6);
  this.ctx.lineTo(46+i*54, 6);
  this.ctx.stroke();
}

// add axis descritions
  this.ctx.fillText("<-" + this.axisDescription[0] + "|" + this.axisDescription[1] + "->", 150, 95)
  this.ctx.fillText(this.axisDescription[2], 5, 95);
  this.ctx.fillText(this.axisDescription[3], 5, 11);
	 }
}