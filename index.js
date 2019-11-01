let canvas = undefined;
let hue=0, hueC=0;
let mX=0,mY=0;

function setup() {
  canvas = createCanvas(1000, 1000);
  canvas.parent("sketch");
  colorMode(HSB,360,100,100)
  frameRate(10);
}

function draw() {
  mX=mouseX;
  mY=mouseY;
  if (mouseX>width) mX=width;
  if (mouseY>height) mY=height;
  if (mouseX<0) mX=0;
  if (mouseY<0) mY=0;
  
  //simulates moving mouse around canvas edges clockwise
  /*
  let speed=50;
  if (mX<width && mY<=0){
    mX+=speed;
  } else if (mY<height && mX>=width){
    mY+=speed;
  } else if (mY>=height && mX>0) {
    mX-=speed;
  } else if (mX<=0 && mY>0) {
    mY-=speed;
  }
  */

  let amt=100;
  let rW=map(mX,0,width,5,amt);
  let margin = map(mY,0,height,0,amt/2);
  let pts=[], ptsCnt=0;
  clear();
  rectMode(CENTER);
  for(let x = amt/2; x < width; x += amt){
    for(let y = amt/2; y < height; y += amt){
      if (hue>=360){
        hue=0;
      }
      hue+=0.01;
      noStroke();
      fill(hue,random(50,100),random(50,100));
      let off;
      if (rW>=amt){
        off=0
      } else {
        off=random(10);
      }
      
      rect(x,y,rW+off,rW+off);
      hueC=hue+180;
      if (hueC>=360){
        hueC-=360;
      }
      let xp,yp;
      for (let i=0; i<amt/5;i++){
        stroke(hueC,random(50,100),random(50,100));
        strokeWeight(random(2,amt/10));
        xp=random(x + margin, x + rW - margin)-rW/2;
        yp=random(y + margin, y + rW - margin)-rW/2;
        let k=1;
        if (random(4)<1 && k<=4){
          pts[ptsCnt]=[];
          pts[ptsCnt][0]=xp;
          pts[ptsCnt][1]=yp;
          ptsCnt++;
          k++;
        }
        point(xp,yp);
      }
      
    } 
  }
  stroke(map(mX,0,width,0,100));
  strokeWeight(2);
  for (let c=0; c<=random(4,25); c++){
    let r1=Math.round(random(pts.length-1));
    let r2=Math.round(random(pts.length-1));
    line(pts[r1][0],pts[r1][1],pts[r2][0],pts[r2][1]);
  }
}

function keyPressed() {
  if (key === "e" || key === "E") {
    if (canvas === undefined) {
      throw new Error("Could not find your canvas");
    }
    saveCanvas(canvas, "sketch_" + eCnt, "png");
    eCnt += 1;
  } 
}
