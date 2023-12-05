/*uses global variables to store your game state
uses conditionals in some way to control game outcomes
has one element of user interaction (mouse or keyboard)
the game has a play button to start the game
the game has a replay button to start the game again once the player has finished
*/
//mouse position
let mouseX
let mouseY
let mouseXPos;
let mouseYPos;
let characterX;
let characterY;
let circleX = Math.random() * (570 - 30) + 30;
let circleY = Math.random() * (460 - 140) + 140;
let monsterX;
let monsterY;
let gameStarted = "start"; 
let gameState
let play
let button
let circles = [];
let score = 0
let lifeBarVisible = true;
let gameOver = false;
let img
let music

function preload(){
  img = loadImage("haha.png");
  img1 = loadImage("ma.png");
  music = loadSound("tension.mp3");
  console.log(music);
  pixelDensity(1);
}

function setup() {
    createCanvas(600, 500);
    mouseYPos = mouseY; // Initialize mousePos in setup
    mouseXPos = mouseX;
    characterX = width / 2;
    characterY = height / 2;
    button = createButton('Start Game');
    button.class('start-button');
    button.mousePressed(startGame); 
    monsterX = random(30, 570);
    monsterY = random(140, 460);
    monsterSpeed = 2;
  }

function draw() {
    background('black');
    mouseYPos = mouseY;
    mouseXPos = mouseX;
  //GameName
    noStroke();
    fill(255,100,155);
    textSize(25);
    textFont('Helvetica');
    textStyle(BOLD);
    text('Pac-Man Game',210,50);
  image(img1,500,25,80,85);

  //playFrame
  fill(255,100,155);
  rect(20,110,560,370);
 
  
 
  if (gameState === "play"){
    
    //maze
    fill('black');
    rect(200,100,20,210);
    fill('black');
    rect(200,200,180,20);
    rect(400,360,20,160);
    //movemonster
    moveMonster();
   
    //Lifebar
    noStroke();
    fill(255,100,155);
    textSize(15);
    textFont('Helvetica');
    text('LifeBar:',40,80);
  //Score
    noStroke();
    fill(255,100,155);
    textSize(15);
    textFont('Helvetica');
    text('Score: '+score,415,80);
     //lifebarItem Size12  01
    if (lifeBarVisible) {
        // Draw the life bar
        fill(255, 100, 155);
        beginShape();
        vertex(148, 70);
        bezierVertex(142, 64, 136, 74, 148, 82);
        bezierVertex(160, 74, 154, 64, 148, 70);
        endShape(CLOSE);
    } else if (gameOver) {
        // Display "Game Over" text
        fill('black');
        rect(20,170,560,250);
        fill('white');
        textSize(32);
        text("Game Over", width / 2 - 80, 300);
        textSize(20);
        text('Score: '+score,265,360);
    }
    
   // Character control
    if (keyIsDown(LEFT_ARROW)) {
      characterX -= 4;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      characterX += 4;
    }
    if (keyIsDown(UP_ARROW)) {
      characterY -= 4;
    }
    if (keyIsDown(DOWN_ARROW)) {
      characterY += 4;
    }
      // Display character
    if (characterX >= 30 && characterX <= 570 && characterY >= 110 && characterY <= 470){
    fill('black');
    arc(characterX,characterY,40,40,0,320);
    }
    circle(circleX,circleY,18);
    // Check if Pac-Man collects the circle
        let d = dist(characterX, characterY, circleX, circleY);
        if (d < 18) {
            // Increase the score and generate circle position
            score++;
            circleX = Math.random() * (570 - 30) + 30;
            circleY = Math.random() * (460 - 140) + 140;
        }
  }
  else if (gameState === "start") {
    // Hide the "Start Game" button
    let startButton = select();
    startButton.style("none");
  }
}

function moveMonster() {
    let dx = characterX - monsterX;
    let dy = characterY - monsterY;
    let angle = atan2(dy, dx);

    monsterX += cos(angle) * monsterSpeed;
    monsterY += sin(angle) * monsterSpeed;

    let d = dist(characterX, characterY, monsterX, monsterY);
      if (d < 18) {
      lifeBarVisible = false;
      gameOver = true;
      if(gameOver === true){
        
      }
        monsterX = random(30, 570);
        monsterY = random(140, 460);
    }
    // Monster display
    fill('black'); 
    image(img,monsterX, monsterY, 45, 45);
  
  
}


function startGame() {
  // Change game state to "play" when the "Start" button is clicked
  gameState = "play";
  button.hide();
  score = 0;
  music.loop();
}

    