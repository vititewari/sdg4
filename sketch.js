var trackI, track;
var robberI, robber;
var coinI, coin;
var energyI, energy;
var laserI, laser;
var coinGroup;
var laserGroup;
var energyGroup;
var score = 0 ;
var gameState = 1;
var gameOver, Restart;
var gameOverI, RestartI;
var dieSound, coinCollect, winner, energyBoost;

//load all images and sounds
function preload(){
robberI = loadAnimation("images/robber 1.png", "images/robber 2.png", "images/robber 3.png");
coinI = loadAnimation("images/coin 1.png","images/coin 2.png","images/coin 3.png","images/coin 4.png","images/coin 5.png","images/coin 6.png");
energyI = loadImage("images/energy drinks.png");
laserI = loadImage("images/laser.png");
trackI = loadImage("images/track.png");
robberOver = loadImage("images/robber 1.png");
gameOverI = loadImage("images/game oevr.png");
RestartI = loadImage("images/restart.png");
coinCollect = loadSound("sounds/coin.wav");
dieSound = loadSound("sounds/die.mp3");
winner = loadSound("sounds/winning.mp3");




}

  

function setup() {

  // creates canvas
  createCanvas(400, 800);
  
  // creates track
  track = createSprite(110,100,400,800);
  track.addImage("track",trackI);
  track.scale = 1;
  
  track.velocityY = 12;
  
  // creates groups
  coinGroup = new Group();
  laserGroup = new Group();
  energyGroup = new Group();

  // creates sprites
  robber = createSprite(200,700,20,50);
  robber.addAnimation("running",robberI);
  robber.setCollider("rectangle",0,0,80,90)

  gameOver = createSprite(220,300,0,0)
  Restart = createSprite(200,500,0,0)

  gameOver.addImage("over1", gameOverI);
  Restart.addImage("over1", RestartI);

  // dont appear
  gameOver.visible = false;
  Restart.visible = false;

  gameOver.scale = 0.5
  Restart.scale = 0.25

  


  
}

function draw() {
  robber.debug = true
  background(220);
  

  track.velocityY = 12;

  
        // only occur is gameState is 1
        if(gameState === 1 ){
        //track movement
          if (track.y > 1000 ){
            track.y = 200;
          }

                //robber movement
                if(keyDown(39)&& robber.x < 390 ){
                  robber.x = robber.x + 10
                }

                if (keyDown(37)&& robber.x > 10  ){
                  robber.x = robber.x - 10
                }
          
          // score tally 
          for (var i = 0; i < coinGroup.length; i++) {

            // touching coin
          if(coinGroup.get(i).isTouching(robber)){
            coinCollect.play();
            coinGroup.get(i).remove()
            score =score+1;
        }
        }
        
          //laser group touching robber
          if(laserGroup.isTouching(robber)){
            console.log("touched")

            //looser sound
            dieSound.play();
            gameState = 0
          }

          
          
if(score === 30){
//play winner sound
winner.play();

//change gameState
gameState = 3
}
        




spawnCoins();
spawnLaser();
spawnEnergy();
}

          if(gameState === 0){
              

              //make them appear
              gameOver.visible = true;
              Restart.visible= true;

              //change velocity to 0
              track.velocityY = 0;
              robber.velocityY = 0;
              coinGroup.setVelocityYEach(0);
              laserGroup.setVelocityYEach(0);
              energyGroup.setVelocityYEach(0);
              
              
              
              //start new game
              if(mousePressedOver(Restart)) {
                reset();
              }
            }

  
  // winner ending
  if (gameState === 3){
    Restart.visible = true;
    track.velocityY = 0;
    robber.velocityY = 0;
    coinGroup.setVelocityYEach(0);
    laserGroup.setVelocityYEach(0);
    energyGroup.setVelocityYEach(0);

    if(mousePressedOver(Restart)) {
      reset();
    }
  }  
    
  
// increase speed when energy group is touching
  if (robber.isTouching(energyGroup)){
    track.velocityY =  20
  }

  //
  if (track.velocityY === 20){
    if(frameCount % 1600 === 0){
      track.velocityY = 12;
      
    }
  }
    
drawSprites();

//text display
fill ("white")
textSize(24)
strokeWeight(4)

// text display during game
if(gameState === 1){
text("Score:" + score, 300 ,50)
}

// text in the end
if(gameState === 0){
  text("you collected $" + score, 125,425)
}

// finished game
textSize(20)
if(gameState === 3){
  text(" WELL DONE you collected all the money", 25,425)
}
}



function spawnCoins(){
  if (frameCount % 60 === 0){

  // create sprite
  coin = createSprite(random(50,350),100,0,0)

  //add coin properties
  coin.addAnimation("rotating",coinI)
  coin.scale = 0.5
  coin.velocityY = 12;
  coin.lifetime = 110;
  
  // add coin to group/array
  coinGroup.add(coin);

  }
}

function spawnLaser(){
  if (frameCount % 80 === 0){

    // create laser
    laser = createSprite(random(50,350),100,0,0)

    // adding laser properties
    laser.addImage(laserI)
    laser.scale = 0.15;
  
    laser.lifetime = 110;
    laser.velocityY = 24;
  
    // adding to group or array
    laserGroup.add(laser);
  
    }
  }

  function spawnEnergy(){
    if (frameCount % 100 === 0){

    // create sprite of energy
    energy = createSprite(random(50,350),100,0,0)

    // add properties of energy
    energy.addAnimation("energy",energyI)
    energy.scale = 0.25;
    energy.velocityY = 12;
    energy.lifetime = 110;
  
    // adding to group or array
    energyGroup.add(energy);
  
    }
  }
  

function reset(){
  gameState = 1;
  gameOver.visible = false;
  Restart.visible = false;
  
  coinGroup.destroyEach();
  laserGroup.destroyEach();
  energyGroup.destroyEach();

  score = 0;
}



  