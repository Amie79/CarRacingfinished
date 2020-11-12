var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;
var car1_Img,car2_Img,car3_Img,car4_Img;
var track_Img;
var car1,car2,car3,car4;
var cars=[];
var finishedPlayers=0;
var passedFinish=false;
var bronze_Img,gold_Img,silver_Img;


function preload(){

car1_Img=loadImage("images/car1.png");
car2_Img=loadImage("images/car2.png");
car3_Img=loadImage("images/car3.png");
car4_Img=loadImage("images/car4.png");

track_Img=loadImage("images/track.jpg");
bronze_Img=loadImage("images/bronze.png");
gold_Img=loadImage("images/gold.png");
silver_Img=loadImage("images/silver.png");

}


function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  //linking code to the database on the firebase
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();

  
}


function draw(){
  if(playerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }

  if(gameState===2){

   // game.end();
   console.log("updating game state to 2");
    game.update(2);
  }

  if(gameState===2 && finishedPlayers==4){

    game.displayRanks();

  }
}
