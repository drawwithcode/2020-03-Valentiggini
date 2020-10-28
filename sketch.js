let myImage;
let mySong;
let analyzer;
let r1, r2, r3, r4;

function preload(){
    mySong = loadSound ("Miami.mp3");
    myImage = loadImage ("astrologia2.jpg")
}

function setup() {

  mySong.loop();
  analyzer = new p5.Amplitude();  //from 0 to 1
  analyzer.setInput(mySong);

  createCanvas(windowWidth, windowHeight);
  fill(255, 90, 51);
  noStroke();
  r1 = new Linee(1, 134.0, 2, 0.1 * height, 10.0, 350); //60
  r2 = new Linee(2, 44.0, 0.166, 0.3 * height, 5.0, 50.0); //50
  r3 = new Linee(2, 58.0, 0.332, 0.4 * height, 10.0, 35.0); //35
  r4 = new Linee(1, 120.0, 0.0498, 0.9 * height, 15.0, 60.0); //60 e piatta

}

function draw() {
  // image

  background(0);
  imageMode(CENTER);
  image(myImage, width/2, height/2, myImage.width, myImage.height);

  //text

  var myText = "click to start the music - move to dance in the space - click to start the music - move to dance in the space - click to start the music - move to dance in the space - click to start the music - move to dance in the space - click to start the music - move to dance in the space - click to start the music - move to dance in the space - click to start the music - move to dance in the space - click to start the music - move to dance in the space - click to start the music - move to dance in the space - click to start the music - move to dance in the space - click to start the music - move to dance in the space - click to start the music - move to dance in the space - click to start the music - move to dance in the space - click to start the music - move to dance in the space - ";

  textFont("Turret Road");
  textAlign(CENTER);
  textSize(12);
  fill(255, 90, 51);
  text(myText, width/2, 22);

  //music

  var volume = 0;
  volume = analyzer.getLevel();
  volume = map(volume, 0, 1, 1, 5);

  r1.display();
  r2.display();
  r3.display();
  r4.display();

  r1.move((mouseX - width / volume), (mouseY)*volume + height * 0.1, 30); //erano30
  r2.move((mouseX + width * 0.05) % width, (mouseY)*volume + height * 0.05, 20); //height*0.025;
  r3.move((mouseX / 4), (mouseY)*volume - height * 0.025, 40);
  r4.move((mouseX*volume/2 - width / 2), height - (mouseY)*volume, 50);

}

function mouseClicked() {

      mySong.play();

}

class Linee {
  constructor(iw, ixp, ih, iyp, id, it) {
    this.w = iw; // single bar width
    this.xpos = ixp; // rect xposition
    this.h = ih; // rect height
    this.ypos = iyp; // rect yposition
    this.d = id; // single bar distance
    this.t = it; // number of bars
  }

  move(posX, posY, damping) {
    let dif = this.ypos - posY;
    if (abs(dif) > 1) {
      this.ypos -= dif / damping;
    }
    dif = this.xpos - posX;
    if (abs(dif) > 1) {
      this.xpos -= dif / damping;
    }
  }

  display() {
    for (let i = 0; i < this.t; i++) {
      rect(
        this.xpos + i * (this.d + this.w),
        this.ypos,
        this.w,
        height * this.h
      );
    }
  }
}
