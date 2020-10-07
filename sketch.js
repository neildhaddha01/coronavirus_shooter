
var play = 1;
var end = 0;

var gamestate = play;

var player, disinfectant, corona;
var infection = 0;
var score = 0;

var backgroundImg, backgroundImg2, disinfectantImg, injectionImg, coronaImg;

var reset;

function preload(){
 backgroundImg = loadImage("corona_backdrop2.png");
 backgroundImg2 = loadImage("corona_bg.png")
 disinfectantImg = loadImage("vitaminC.png");
 injectionImg = loadImage("syringe.png");
 coronaImg = loadImage("corona.png");
}

function setup(){
    canvas = createCanvas(800,500);
    corona = createSprite(850, random(100,350), 50, 50);
    corona.addImage(coronaImg);
    corona.scale = 0.2
    player = createSprite(390,430,50,50);
    player.addImage(injectionImg);
    player.scale = 0.225
    disinfectant = createSprite(390, 450, 10, 10);
    disinfectant.addImage(disinfectantImg);
    disinfectant.scale = 0.1
    //corona.debug = true;
    corona.setCollider("circle", 0, 0, 150);
   // disinfectant.debug = true;
    disinfectant.setCollider("circle", 0, 0, 10)
    reset = createButton('Restart');
    reset.position(725,15,10,10);;
}

function draw(){
    //disinfectant.x = player.x-1
    //disinfectant.debug = true
    if (gamestate === play) {
        background(backgroundImg);
        console.log("infection", infection);
        fill("black");
        textSize(20);
        text("Infected People = "+ infection, 50, 375);
        text("Score: "+score, 650, 375);
        fill("black");
        textSize(18)
        text("Kill The Virus Before It Infects The Population", 230,200);
        text("Press space to shoot and use left and right arrow keys to move", 150,25);
       if (keyDown(LEFT_ARROW)) {
           player.x = player.x-5
       }
       if (keyDown(RIGHT_ARROW)) {
        player.x = player.x+5
       }
       if (keyDown(UP_ARROW)) {
        player.velocityX=0
       }
       if (keyDown("space")) {
           disinfectant.velocityY = -15
           player.velocityX = 0
        }
        if (disinfectant.y<0) {
            disinfectant.y = 450
            disinfectant.velocityY = 0
            disinfectant.x = player.x
       }
       if (disinfectant.velocityY===0) {
           disinfectant.x = player.x
       }
       if (frameCount%20===0) {
        infection = infection+500
       }
       if (frameCount%12===0) {
           corona.velocityX=-10
       }
       if (corona.x<0) {
           corona.x = 850
           corona.y = random(100,250)
       }
       if (corona.isTouching(disinfectant))  {
           disinfectant.y = 450
           disinfectant.velocityY = 0
           corona.x = 850
           corona.y = random(100,250)
           score = score + 1
           infection = infection - 1000
        }
        if (score>12 || infection>30000) {
                corona.velocityX=-16
        }
       if (infection>60000 || score>=25) {
        gamestate = end;
       }
        disinfectant.display();
        player.display();  
        corona.display();
    }
    if (gamestate===end) {
        player.velocityX = 0
        corona.velocityX = 0
        disinfectant.velocityX = 0
        disinfectant.velocityY = 0
        background(backgroundImg2);
        fill("darkblue");
        textSize(45);
        text("Game Over", 300, 230);
        if (score>=25) {
            fill("darkblue");
            textSize(45);
            text(":)YOU WIN!!!",260,275);
        } else{
            fill("darkblue");
            textSize(45);
            text("YOU LOSE, better luck next time!!!",45,275);
        }
    }
    
    //if (reset.mousePressed()) {
       // restart();
    //}
    reset.mousePressed(()=>{
       gamestate = play;
       score = 0;
       infection = 0;
       player.x = 390;
       player.y = 430;
       corona.x = 850;
       corona.y = random(100,350);
    });
}   

//function restart(){
    
//}