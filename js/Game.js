class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  
 
  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();

      car1=createSprite(100,200);
      car2=createSprite(300,200);
      car3=createSprite(500,200);
      car4=createSprite(700,200);
      cars=[car1,car2,car3,car4];
      car1.addImage(car1_Img);
      car2.addImage(car2_Img);
      car3.addImage(car3_Img);
      car4.addImage(car4_Img);
      
    }
  }

  play(){
    form.hide();
    textSize(30);
    text("Game Start", 120, 100)
    Player.getPlayerInfo();
    player.getFinishedPlayers();
    // console.log(mouseX,mouseY);
     //console.log(allPlayers);
    if(allPlayers !== undefined){
      background(rgb(198,135,103));
      image(track_Img,0,-displayHeight*4,displayWidth,displayHeight*5);
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 220;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        //use plr to loop through the allPlayers array
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          cars[index - 1].shapeColor = "red";
          stroke(10);
          fill("red");
          ellipse(x,y,60);
          
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y;
        }

        console.log(player.name);
        textSize(25);
        text(allPlayers[plr].name,cars[index-1].x,cars[index-1].y+70);
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null && passedFinish===false){
      player.distance +=10 
      player.update();
    }
    if(player.distance > 4220 && passedFinish==false){
    
    Player.updateFinishedPlayers();
    player.rank=finishedPlayers;
    player.update();
    console.log(finishedPlayers);
    console.log(player.rank);
    passedFinish=true;
    gameState=2;
    }

    drawSprites();
  }
  
  end(){
    console.log("GAME ENDED");
  }

  displayRanks(){

    console.log("Displaying the ranks");
    camera.position.x=0;
    camera.position.y=0;
    imageMode(CENTER);
    Player.getPlayerInfo();
     image(bronze_Img, displayWidth/-4, -100 + displayHeight/9, 200, 240);
    image(silver_Img, displayWidth/4, -100 + displayHeight/10, 225, 270);
    image(gold_Img, 0, -100, 250, 300);

    textAlign(CENTER);
    textSize(50);
    
    for(var plr in allPlayers){
      if(allPlayers[plr].rank==1){
        text("1st: "+allPlayers[plr].name, 0, 85);
      }
      
      if(allPlayers[plr].rank==2){
        text("2nd: "+allPlayers[plr].name,-350,175);
      }

      if(allPlayers[plr].rank==3){
        text("3rd: "+allPlayers[plr].name,350,175);

      }
      else
      {
        text("4th: ",allPlayers[plr].name,0,200);
      }
    }
  }
}