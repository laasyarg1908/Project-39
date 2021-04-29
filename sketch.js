var roadImg, road;
var cop, carImg;
var prisoner, prisonerImg;
var fuel, fuelImg;
var fuelGroup;
var fuelAmount = 5;
var danger, screwImg;
var screwGroup;
var gameState = "play";
var score = 0;

function preload()
{
  //loading all images
  roadImg = loadImage("road.png");
  carImg = loadImage("Cops.png");
  prisonerImg = loadImage("prisoner.png");
  fuelImg = loadImage("fuel.png"); 
  screwImg = loadImage("screw.png");
}

function setup() 
{
  createCanvas(windowWidth - 20, windowHeight);
  
  //creating road and applying image
  road = createSprite(windowWidth/2, windowHeight/5);
  road.addImage(roadImg);
  road.scale = 2.5;
  road.velocityY = 2;
  
  //creating cop and applying image
  cop = createSprite(windowWidth/2, 700);
  cop.addImage(carImg);
  cop.scale = 0.35;
  
  //creating prisoner and adding image
  prisoner = createSprite(windowWidth/2, 450, 10, 50);
  prisoner.addImage(prisonerImg);
  prisoner.scale = 0.28;

  //creating screw and fuel groups
  screwGroup = new Group();
  fuelGroup = new Group();
 
}

function draw() 
{
  
   background("black");

    //camera focused of prisoner
    camera.position.x = displayWidth/2;
    camera.position.y = prisoner.y;

    fill("yellow");
    textSize(20);
    text("Use arrow keys to move!", 70, 300);

    fill("yellow");
    textSize(20);
    text("Avoid screws, Collect fuel!", 70, 320);

    fill("yellow");
    textSize(20);
    text("Remember, don't cross the road limits.", 1150, 300);


      //displaying fuel amount
    fill("red");
    textSize(20);
    text("Fuel Amount:" + fuelAmount, 100, 150);
    
    //displaying score
    fill("blue");
    textSize(20);
    text("Score:" + score,  1300, 150);

   if (gameState === "play")
   {

    //infinite road
      if (road.y > 500)
      {
        road.y = windowHeight/2;
      }

      //moving prisoner right when arrow key pressed 
      if(keyDown("right_arrow"))
      {
        prisoner.x = prisoner.x + 10;
      }
 
      //moving prisoner left when arrow key pressed 
      if(keyDown("left_arrow"))
      {
        prisoner.x = prisoner.x - 10;
      }

      //moving prisoner down when arrow key pressed 
      if (keyDown("down_arrow"))
      {
        prisoner.y += 10;
      }

      //moving prisoner up when arrow key pressed 
      if (keyDown("up_arrow"))
      {
        prisoner.y = prisoner.y - 10;
      }

         //increasing score evry 60 frames
         if (frameCount % 60 === 0)
         {
           score = score + 1;
         }

      fuelSpawn();
      screws();

      //reducing fuel amount every 180 frames
      if (frameCount % 180 === 0)
      {
        fuelAmount = fuelAmount - 1;
      }
    
      //increasing fuel by 1 if is touched and destroying fuel
      if (fuelGroup.isTouching(prisoner))
      {
        fuelAmount = fuelAmount +1;
        fuelGroup.destroyEach();
      }
    
      //gamestate is end if touching screw, fuel becomes 0, crosses the road limits
      if (screwGroup.isTouching(prisoner) || (fuelAmount === 0) || (prisoner.x > 1200) || (prisoner.x < 400))
      {  
        gameState = "end";
      }
  
  }

    //different text when game ends according to its reason
      if (gameState === "end" && (screwGroup.isTouching(prisoner)))
      {  
        screwGroup.destroyEach();
        fuelGroup.destroyEach();
        cop.destroy();
        prisoner.destroy();
        road.destroy();
        
        fill("yellow");
        textSize(25);
        text("GAME OVER!" + score, 700,500);
      } 
    
      if (gameState === "end" && (prisoner.isTouching(cop)))
      {  
        screwGroup.destroyEach();
        fuelGroup.destroyEach();
        cop.destroy();
        prisoner.destroy();
        road.destroy();
        
        fill("yellow");
        textSize(25);
        text("GAME OVER!" + score, 700,500);
      } 

      //different text when game ends according to its reason
      if (gameState === "end" && (fuelAmount === 0))
      {
        screwGroup.destroyEach();
        fuelGroup.destroyEach();
        cop.destroy();
        prisoner.destroy();
        road.destroy();
 
        fill("yellow");
        textSize(25);
        text("FUEL OVER, YOU LOST", 700,500); 
      }

     
      //different text when game ends according to its reason
      if (gameState === "end" && (prisoner.x > 1200))
      {
        screwGroup.destroyEach();
        fuelGroup.destroyEach();
        cop.destroy();
        prisoner.destroy();
        road.destroy();
 
        fill("yellow");
        textSize(25);
        text("YOU FELL OFF THE ROAD", 700,500);
      }

      //different text when game ends according to its reason
      if (gameState === "end" && (prisoner.x < 400))
      {
        screwGroup.destroyEach();
        fuelGroup.destroyEach();
        cop.destroy();
        prisoner.destroy();
        road.destroy();
     
        fill("yellow");
        textSize(25);
        text("YOU FELL OFF THE ROAD", 700,500);
      }

    

  
  
     drawSprites();


}

function fuelSpawn()
{

  //creating fuel every 150 frames
  if (frameCount % 150 === 0)
  {
    fuel = createSprite(random(400, 1200), random(0, 300));
    fuel.velocityY = 3;
    fuel.lifetime = 300;
    fuel.addImage(fuelImg);
    fuel.scale = 0.1;
    fuelGroup.add(fuel);
  }
}

function screws()
{
  //creating screws every 100 frames
  if (frameCount % 100 === 0)
  {
    danger = createSprite(random(400, 800), random(0, 400));
    danger.velocityY = 3;
    danger.lifetime = 300;
    danger.addImage(screwImg);
    danger.scale = 0.15;
    screwGroup.add(danger);
  }
}
