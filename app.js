const song = document.getElementById("song");
const playBtn = document.querySelector(".play");
const Btnback = document.querySelector(".play-back");
const Btnforward = document.querySelector(".play-forward");
const durationTime = document.querySelector(".duration");
const remainningTime = document.querySelector(".remainning");
const rangeBar = document.querySelector(".range");
const musics = ["AiNo1.mp3", "CuoiThoi.mp3", "DeVuong.mp3", "DoToc2.mp3"];
let isPlaying = true;
let indexSong = 0;

displayTimer();
let Timer;
song.setAttribute("src", `./music/${musics[indexSong]}`);

Btnforward.addEventListener("click", function(){
    changeSong(1);
});

Btnback.addEventListener("click", function(){
    changeSong(-1);
});

song.addEventListener("ended",handleEndedSong);
function handleEndedSong(){
    changeSong(1);
}
function changeSong(dir){
    if( dir == 1 ){
    // next song
    indexSong++;
    
    if(indexSong >= musics.length){
        indexSong = 0;
    }

    isPlaying = true;

    }else if( dir == -1){
        //prev song
        indexSong--;
        if(indexSong < 0){
            indexSong = musics.length-1;
        }
        isPlaying = true;
    }
    song.setAttribute("src", `./music/${musics[indexSong]}`);
    playPause();
}

playBtn.addEventListener("click", playPause);
function playPause(){
    if(isPlaying){
         song.play();
         isPlaying = false;
        playBtn.innerHTML = '<ion-icon name="pause-outline"></ion-icon>';  
        Timer = setInterval(displayTimer, 500);     
    }else{
        song.pause();
        isPlaying = true;
        playBtn.innerHTML = '<ion-icon name="play-outline"></ion-icon>';
        clearInterval(Timer);
    }
   
}

function displayTimer(){
    const { duration, currentTime } = song;
    rangeBar.max = duration;
    rangeBar.value = currentTime;
    remainningTime.textContent = formatTimer(currentTime);
    if(!duration){
        durationTime.textContent = "00:00";
    }else{
        durationTime.textContent = formatTimer(duration);
    }
}

function formatTimer(number){
    const minutes = Math.floor(number/60);
    const seconds = Math.floor(number - minutes * 60);
    return `${minutes < 10 ? "0" + minutes:minutes}:${seconds < 10 ? + "0" + seconds:seconds}`;
}

rangeBar.addEventListener("change", handlerangeBar);
function handlerangeBar() {
    song.currentTime = rangeBar.value;
}
