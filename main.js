scorerightwrist=0
scoreleftwrist=0
rightWristx=0;
rightWristy=0;

leftWristx=0;
leftWristy=0;
song ="";

function preload() 
{
song = loadSound("music.mp3");
}

function setup() {
 canvas= createCanvas(600,500);
 canvas.center();

 video = createCapture(VIDEO);
 video.hide();

 poseNet=ml5.poseNet(video,modelLoaded);
 poseNet.on('pose',gotPoses);
}
function draw() {
    image(video,0,0,600,500);
    fill("red");
    stroke("red");
    if(scoreleftwrist>0.2){
    circle(leftWristx,leftWristy,20);
    cnum=Number(leftWristy);
    rdec=floor(cnum);
    vol=rdec/500;
    document.getElementById("volume").innerHTML="volume = "+vol;
    song.setVolume(vol);

    }
if(scorerightwrist>0.2) {


  circle(rightWristx,rightWristy,20);
  if(rightWristy>0 && rightWristy<=100)
  {
      song.rate(0.5);
      document.getElementById("speed").innerHTML="speed = 0.5x";
  }

  else if(rightWristy>100 && rightWristy<=200)
  {
      song.rate(1);
      document.getElementById("speed").innerHTML="speed = 1x";
  }
  else if(rightWristy>200 && rightWristy<=300)
  {
      song.rate(1.5);
      document.getElementById("speed").innerHTML="speed = 1.5x";
  }
  else if(rightWristy>300 && rightWristy<=400)
  {
      song.rate(2);
      document.getElementById("speed").innerHTML="speed = 2x";
  }
  else if(rightWristy>400 && rightWristy<=500)
  {
      song.rate(2.5);
      document.getElementById("speed").innerHTML="speed = 2.5x";
  }
}
}

function play()
{
    song.play();
    song.setVolume(1)
    song.rate(1)
}
function modelLoaded()  {
    console.log("Model has been #@!%$")
}
function gotPoses(results) {
    if(results.length>0) {
        console.log(results);
        scoreleftwrist=results[0].pose.keypoints[9].score;
        scorerightwrist=results[0].pose.keypoints[10].score;
        leftWristx=results[0].pose.leftWrist.x;
        leftWristy=results[0].pose.leftWrist.y;
        console.log("leftWristx="+leftWristx+"leftWristy="+leftWristy);

        rightWristx=results[0].pose.rightWrist.x;
        rightWristy=results[0].pose.rightWrist.y;
        console.log("rightWristx="+rightWristx+"rightWristy="+rightWristy);
    }

}