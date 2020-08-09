//Global Variables
var monkeyimg,monkey;
var invisibleground,bg,bg_img;
var banana,bananaImage,obstacle,obstacle_img;
var score=0,gamestate=0;

var FoodGroup, bananaImage;
var obstaclesGroup, obstacle_img;



function preload(){
  
  bg_img= loadImage("jungle.jpg");
  monkeyimg = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaimg=loadImage("banana.png");
  obstacleimg=loadImage("stone.png");

}


function setup() {
  createCanvas(800,400);
  
  bg = createSprite(0,0,800,400);
  bg.addImage(bg_img);
  bg.scale=1.5;
  bg.x=bg.width/2;
  bg.velocityX=-4;
  
  monkey = createSprite(100,340,20,50);
  monkey.addAnimation("Running",monkeyimg);
  monkey.scale=0.1;
  
  invisibleground = createSprite(400,350,800,10);
  invisibleground.velocityX=-4;
  invisibleground.x=invisibleground.width/2;
  invisibleground.visible=false;  
  
  
    FoodGroup = new Group();
  obstaclesGroup = new Group();

  score=0;
}


function draw(){
 background(255); 
  
  
  
  if(invisibleground.x<0){
    invisibleground.x=invisibleground.width/2;
  }
                    
  if(bg.x<100){
    bg.x=bg.width/2;
    
  }
   if(FoodGroup.isTouching(monkey)){
      FoodGroup.destroyEach();
    score = score + 2;
    }
    switch(score){
        case 10: monkey.scale=0.12;
                break;
        case 20: monkey.scale=0.14;
                break;
        case 30: monkey.scale=0.16;
                break;
        case 40: monkey.scale=0.18;
                break;
        default: break;
    }
  
  
  if(keyDown("space")){
    monkey.velocityY = -12;
  }
  monkey.velocityY = monkey.velocityY + 0.8;
  
 
    if(obstaclesGroup.isTouching(monkey)){ 
        monkey.scale=0.08;
      score=score-2;
    }
  
 monkey.collide(invisibleground);
  spawnFood();
    spawnObstacles();
  
  drawSprites();
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);
}


function spawnFood() {
  
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -5;
    banana.lifetime = 300;
   monkey.depth = banana.depth + 1;
    
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    var obstacle = createSprite(800,350,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage(obstacle_img);
    
      
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    
    
    obstaclesGroup.add(obstacle);
  }
}


  