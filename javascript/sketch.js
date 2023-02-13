


let breakfast;

function setup() {
  createCanvas(500, 500);

  //no animation / interaction chart
  noLoop();

  fetch("./json/breakfast.json").then(function(response) {
    return response.json();
  }).then(function(data) {

    console.log(data);
    
    breakfast = data.breakfast;

    //using no Loop? you can just call your function once the data is loaded
    drawChart();
  
  }).catch(function(err) {
    console.log(`Something went wrong: ${err}`);
  });

}

function draw() {
  background(204, 204, 255);

}

function drawChart(){

  let total = 0; 
  for (let i= 0 ; i<breakfast.length; i++) {
    total += breakfast[i].amount;
  }

  let centreX = width/2;
  let centreY = height/2; 
  let diam = 300;
  let angleStart = TWO_PI*0.75; 

  for (let i=0; i<breakfast.length; i++) {

    let item = breakfast[i];

    let itemFraction = item.amount/total;
    let itemAngle = itemFraction * TWO_PI; 
    let angleEnd = angleStart + itemAngle;

    //normal pie
    fill(item.color);
    stroke(0, 0, 0); 
    strokeWeight(1); 
    strokeJoin(ROUND); 
    arc(centreX, centreY, diam, diam, angleStart, angleEnd, PIE); //PIE creates closed slices the the center


    noStroke();
    fill(0); 
    push();
    translate(centreX, centreY); 
    rotate(angleEnd); 
    textAlign(RIGHT, BOTTOM); 
    //normal pie
    text(item.ingredient, diam/2 - 20, -8); 

    pop();

    //update the angle start before the next iteration
    angleStart += itemAngle;
  }

}