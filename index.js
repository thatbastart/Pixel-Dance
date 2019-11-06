let canvas = undefined;
let hue=0, hueC=0;
let mX=0,mY=0;
let mic,fft;

function setup() {
  canvas = createCanvas(1000, 1000);
  canvas.parent("sketch");
  colorMode(HSB,360,100,100,100)
  frameRate(15);
  fft = new p5.FFT();
  mic=new p5.AudioIn();
  mic.start();
  fft.setInput(mic);
}

function draw() {
  //frameRate(map(lvl,0.0,1.0,5,30));
  
  /*
  mX=mouseX;
  mY=mouseY;
  if (mouseX>width) mX=width;
  if (mouseY>height) mY=height;
  if (mouseX<0) mX=0;
  if (mouseY<0) mY=0;
  */

  let en,tmp;
  fft.analyze();
  en=fft.getEnergy("treble");
  tmp=map(en,125,150,0,width);
  if (tmp<0) tmp=0;
  if(tmp>width) tmp=width;
  mX=tmp;
  
  en=fft.getEnergy("bass");
  tmp=map(en,240,255,0,height);
  if (tmp<0) tmp=0;
  if(tmp>height) tmp=height;
  mY=tmp;
  
  //simulates moving mouse around canvas edges clockwise
  /*
  let speed=22.2;
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
  let rW=map(mX,0,width,0,amt);
  let margin = map(mY,0,height,0,amt/2);
  let pts=[], ptsCnt=0;
  clear();
  background(255);
  rectMode(CENTER);
  for(let x = amt/2; x < width; x += amt){
    for(let y = amt/2; y < height; y += amt){
      hue=hueOverflow(hue);
      hue+=amt/2500;
      noStroke();
      fill(hueOverflow(hue+y/20),random(50,100),random(50,100));
      let off;
      if (rW>=amt){
        off=0
      } else {
        off=random(10);
      }
      
      rect(x,y,rW+off,rW+off);
      hueC=hue+180;
      hueC=hueOverflow(hueC);
      let xp,yp;
      for (let i=0; i<amt/5;i++){
        stroke(hueOverflow(hueC+y/20),random(50,100),random(50,100));
        strokeWeight(random(3,amt/6));
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
  strokeWeight(1);
  for (let a=0; a<random(2,5);a++){
    fill(0,0,random(50,100),random(15, 60));
    beginShape();
    for (let c=0; c<3; c++){
      let r1=Math.round(random(pts.length-1));
      let r2=Math.round(random(pts.length-1));
      //line(pts[r1][0],pts[r1][1],pts[r2][0],pts[r2][1]);
      vertex(pts[r1][0],pts[r1][1]);
    }
    endShape(CLOSE);
  }
  /*
  exportCanvas();
  if(frameCount==180){
    remove();
  }
  */

 
}

function hueOverflow(h){
  if (h>=360){
    h-=360;
  }
  return h;
}

function keyPressed() {
  if (key === "e" || key === "E") {
    exportCanvas();
  }
}

function exportCanvas(){
  if (canvas === undefined) {
    throw new Error("Could not find your canvas");
  }
    saveCanvas(canvas, "sketch_"+frameCount, "png");
}