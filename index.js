let isPlay = false;
let playButton = document.querySelector('.play-btn');
let playNum = 0;
let audioFiles = ['./assets/audio/Rammstein-DEUTSCHLAND.mp3', './assets/audio/rammstein-ich_will.mp3']
let audio = document.querySelector('audio');
let prevButton = document.querySelector('.prev-btn');
let nextButton = document.querySelector('.next-btn');
let background = document.querySelector('.bkg-image');
let playerBkg = document.querySelector('.player-pic');
let songName = document.querySelector('.song');
let durationOfSong = document.querySelector('.duration');
let currentPos = document.querySelector('.currentTime');
let progressBar = document.querySelector('.scroll');


playButton.addEventListener('click', playAudio);
function playAudio(event){
    if (!isPlay){
        // playButton.src = './assets/svg/pause.png';
        toggleButton();
        audio.play();
        playerBkg.style.width = '115%';
        playerBkg.style.transition = '1s';
    } else {
        // playButton.src = './assets/svg/play.png';
        toggleButton();
        audio.pause();
        playerBkg.style.width = '105%';
        playerBkg.style.transition = '1s';
    }
  }
  function toggleButton(event){
      if(!isPlay){
        playButton.src = './assets/svg/pause.png';
        isPlay = true;
      } else {
        playButton.src = './assets/svg/play.png';
        isPlay = false;
      }
  }

prevButton.addEventListener('click', playPrev);
function playPrev(event){
    playNum = playNum - 1;
    if (playNum < 0){
        playNum = audioFiles.length - 1;
        audio.src = audioFiles[playNum];
        background.src = './assets/img/Ich_will.jpg';
        playerBkg.src = './assets/img/Ich_will.jpg';
        songName.innerHTML = 'Ich Will';
        audio.play();
    } else {
        audio.src = audioFiles[playNum];
        background.src = './assets/img/Deutchland.jpg';
        playerBkg.src = './assets/img/Deutchland.jpg';
        songName.innerHTML = 'Deutschland';
        audio.play();
    }
}

nextButton.addEventListener('click', playNext);
function playNext(event){
    playNum = playNum + 1;
    if (playNum >= audioFiles.length){
        playNum = 0;
        audio.src = audioFiles[0];
        background.src = './assets/img/Deutchland.jpg';
        playerBkg.src = './assets/img/Deutchland.jpg';
        songName.innerHTML = 'Deutschland';
        audio.play();
    } else {
        playNum = 1;
        audio.src = audioFiles[playNum];
        background.src = './assets/img/Ich_will.jpg';
        playerBkg.src = './assets/img/Ich_will.jpg';
        songName.innerHTML = 'Ich Will';
        audio.play();
    }
}

progressBar.addEventListener('input', progressChange);
function progressChange(event){
    let newTime = audio.duration * (progressBar.value / 100);
    audio.currentTime = progressBar.value;
}

let currentTime = function(){
    let minutes = Math.floor(audio.currentTime / 60);
    let seconds = Math.floor(audio.currentTime - minutes * 60);
    let durMin = Math.floor(audio.duration / 60);
    let durSec = Math.floor(audio.duration - durMin * 60);
    currentPos.innerHTML = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    durationOfSong.innerHTML = `${durMin}:${durSec < 10 ? '0' + durSec : durSec}`
}
progressBar.addEventListener('input', currentTime);
audio.addEventListener('timeupdate', currentTime);

audio.addEventListener('timeupdate', inputChange);
function inputChange(event){
    progressBar.value = audio.currentTime;
    progressBar.max = audio.duration;
    if (audio.ended){
        playNum = playNum + 1;
    if (playNum >= audioFiles.length){
        playNum = 0;
        audio.src = audioFiles[0];
        background.src = './assets/img/Deutchland.jpg';
        playerBkg.src = './assets/img/Deutchland.jpg';
        songName.innerHTML = 'Deutschland';
        audio.play();
    } else {
        playNum = 1;
        audio.src = audioFiles[playNum];
        background.src = './assets/img/Ich_will.jpg';
        playerBkg.src = './assets/img/Ich_will.jpg';
        songName.innerHTML = 'Ich Will';
        audio.play();
    }
    }
}

console.log(`
Вёрстка +10\n
Кнопка Play/Pause +10\n
При кликах по кнопкам "Вперёд" и "Назад" переключается проигрываемый аудиотрек. Аудиотреки пролистываются по кругу - после последнего идёт первый +10\n
При смене аудиотрека меняется изображение - обложка аудиотрека +10\n
Прогресс-бар отображает прогресс проигрывания текущего аудиотрека. При перемещении ползунка вручную меняется текущее время проигрывания аудиотрека +10\n
Отображается продолжительность аудиотрека и его текущее время проигрывания +10\n
    Total score: 60/70`);