console.log("Welcome to Spotify");

//Initialize the variables
let songIndex = 0;
let audioElement = new Audio('/songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songTimes = Array.from(document.getElementsByClassName('timestamp')) ;

let songs = [
    { songName: "Dusk Till Dawn - ZAYN, Sia_320", filePath: "/songs/1.mp3", coverPath: "/covers/1.jpg" },
    { songName: "Cheap Thrills", filePath: "/songs/2.mp3", coverPath: "/covers/2.jpg" },
    { songName: "Eastside-Benny-Blanco-Khalid", filePath: "/songs/3.mp3", coverPath: "/covers/3.jpg" },
    { songName: "Faded - Alan Walker", filePath: "/songs/4.mp3", coverPath: "/covers/4.jpg" },
    { songName: "The Nights - Avicii", filePath: "/songs/5.mp3", coverPath: "/covers/5.jpg" },
]

songItems.forEach((element, i) => {
    // console.log("element",element,"  i", i);
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName;

});


// Handle the play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;

        document.getElementById(`${songIndex}`).classList.remove('fa-circle-play');
        document.getElementById(`${songIndex}`).classList.add('fa-circle-pause');
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;

        document.getElementById(`${songIndex}`).classList.remove('fa-circle-pause');
        document.getElementById(`${songIndex}`).classList.add('fa-circle-play');
    }
})


//Listen to Events 
audioElement.addEventListener('timeupdate', () => {
    // console.log('timeupdate');

    // Update SeekBar
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;

    if (progress == 100) {
        document.getElementById('next').click();
    }
})

myProgressBar.addEventListener('change', () => {
    currTime = (myProgressBar.value / 100) * audioElement.duration;
    audioElement.currentTime = currTime;

})


makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        // console.log("element",element)
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        // console.log(e.target);
        makeAllPlays();
        songIndex = parseInt(e.target.id);

        if (masterSongName.innerText != songs[songIndex].songName) {
            audioElement.src = `/songs/${songIndex + 1}.mp3`;
        }

        if (audioElement.paused) {

            audioElement.play();
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
            gif.style.opacity = 1;


            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');


        }
        else {
            audioElement.pause();
            masterPlay.classList.remove('fa-circle-pause');
            masterPlay.classList.add('fa-circle-play');
            gif.style.opacity = 0;


            e.target.classList.remove('fa-circle-pause');
            e.target.classList.add('fa-circle-play');
        }
        masterSongName.innerText = songs[songIndex].songName;
    })
})

document.getElementById('previous').addEventListener('click', () => {
    makeAllPlays();

    songIndex = (songIndex - 1 + 5) % 5;
    audioElement.src = `/songs/${songIndex + 1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    masterSongName.innerText = songs[songIndex].songName;
    gif.style.opacity = 1;

    document.getElementById(`${songIndex}`).classList.remove('fa-circle-play');
    document.getElementById(`${songIndex}`).classList.add('fa-circle-pause');
})

document.getElementById('next').addEventListener('click', () => {
    makeAllPlays();

    songIndex = (songIndex + 1) % 5;
    audioElement.src = `/songs/${songIndex + 1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    masterSongName.innerText = songs[songIndex].songName;
    gif.style.opacity = 1;

    document.getElementById(`${songIndex}`).classList.remove('fa-circle-play');
    document.getElementById(`${songIndex}`).classList.add('fa-circle-pause');
})


