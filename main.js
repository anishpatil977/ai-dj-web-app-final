song = "";

leftwristX=0;
leftwristY=0;
rightwristX=0;
rightwristY=0;
scoreleftwrist=0;
scorerightwrist=0;

function preload()
{
	song = loadSound("music.mp3");
}


function setup() {
	canvas =  createCanvas(600, 500);
	canvas.center();

	video = createCapture(VIDEO);
	video.hide();

	poseNet=ml5.poseNet(video,modelLoaded);
	poseNet.on('pose',gotPoses);

}


function modelLoaded(){

console.log('poseNet is initialized ');

}

function gotPoses(results){

if(results.length>0){

console.log(results)

scoreleftwrist=results[0].pose.keypoints[9].score;
scorerightwrist=results[0].pose.keypoints[10].score;
console.log("score right wrist="+ scorerightwrist+"score left wrist=" + scoreleftwrist);
leftwristX=results[0].pose.leftWrist.x;
leftwristy=results[0].pose.leftWrist.y;
console.log("leftwristX="+leftwristX+"leftwristY="+leftwristY);
rightwristX=results[0].pose.rightWrist.x;
rightwristY=results[0].pose.rightWrist.y;
console.log("rightwristX="+rightwristX+"rightwristY="+rightwristY);
console.log("scoreleftwrist="+scoreleftwrist);

}

}


function draw() {
	image(video, 0, 0, 600, 500);
	fill("#f71b1b");
	stroke("#f71b1b");
    if(scorerightwrist>0.2){

 circle(rightwristx,rightwristy,20);
 if(rightwristY>0 && rightwristY<=100){

    document.getElementById("speed").innerHTML="speed=0.5x";
    song.rate(0.5);

 }
 else if(rightwristY>100 && rightwristY<=200){

    document.getElementById("speed").innerHTML="speed=1x";
    song.rate(1);
 }
else if(rightwristY>200 && rihtwristY<=300){

    document.getElementById("speed").innerHTML="speed=1.5x";
    song.rate(1.5);

}
else if(rightwristY>300 && rightwristY<=400){

    document.getElementById("speed").innerHTML="speed=2x";
    song.rate(2);
}
else if(rightwrist>400 ){

    document.getElementById("speed").innerHTML="speed=2.5x";
    song.rate(2.5);

}
    }
	if(scoreleftwrist >0.2)
	{
		circle(leftwristX,leftwristY,20)
		inNumberleftwristY=Number(leftwristY)
		remove_decimal=floor(inNumberleftwristY);
		volume=removedecimals/550;
		document.getElementById("volume").innerHTML="volume="+volume;
		song.setVolume(volume);

	}

}

function play()
{
	song.play();
	song.setVolume(1)
	song.rate(1)
}