
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score

function preload(){
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}

function setup() {
  createCanvas(600, 600);
  //creating monkey
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite (400,350,900,10);
  ground.velocityX = -4
  ground.x = ground.width/2
  console.log(ground.x);
  
  FoodGroup = new Group();
  obstacleGroup = new Group();
  
  //create invisible ground
  invisibleGround = createSprite(400,350,900,10);
  invisibleGround.visible = false;
 
}


function draw() {
  background("white")
  //call food and obstacle functions.
 
  food ();
  Obstacles ();
   
  drawSprites();

  if(keyDown("space")) {
        monkey.velocityY = -10;
  }
  
    //add gravity
  monkey.velocityY = monkey.velocityY + 0.4;
   
  if (ground.x < 0){
      ground.x = ground.width/2;
  }
  
  //stop monkey from falling down
  monkey.collide(invisibleGround);
}

function food (){
  if(World.frameCount%80===0){
     banana = createSprite (400,200,20,20);
     banana.scale=0.1 ;
     banana.addImage (bananaImage); 
     r=Math.round(random(1,4));
     banana.y=Math.round(random(120,200));
     banana.velocityX= -7;
     banana.setLifetime = 80;
     FoodGroup.add(banana);
  }
}

//function for obstacles
function Obstacles(){
 if (World.frameCount % 300 === 0){
   var obstacle = createSprite(600,165,10,40);
   
    //generate obstacles
   obstacle.scale = 0.5;
   obstacle.addImage(obstacleImage);
      
    //assign scale and lifetime to the obstacle           
   obstacle.lifetime = 300;
   obstacle.velocityX = -(6 + score/100); 
  //add each obstacle to the group
   obstacleGroup.add(obstacle);
   
  //set lifetime of the game objects so that they are never destroyed
    obstacleGroup.setLifetimeEach(-1);
    obstacleGroup.setVelocityXEach(0);
 }
}