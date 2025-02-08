let currentAudio = null; // Global variable to track current audio

function insertSongs() {
    const songs = [
        {
            name: "Kasturi - Amar Prem Ki Prem Kahani",
            path: "./songs/arijit/Kasturi - Amar Prem Ki Prem Kahani 320 Kbps.mp3"
        }
        // Add more songs here as needed
    ];

    const gaaneDiv = document.querySelector('.gaane');

    songs.forEach((song, index) => {
        const songCard = document.createElement('div');
        songCard.className = 'song-card';
    
        songCard.innerHTML = `
            <div class="song-info">
                <img src="./icons/music.svg" alt="music" class="song-thumbnail">
                <span class="song-title">${song.name}</span>
            </div>
            <button class="play-btn song-play-btn" data-song-index="${index}">
                <img src="./icons/play.svg" alt="play" class="play-icon">
            </button>
        `;
    
        gaaneDiv.appendChild(songCard);
    });

    // Add click event listeners to all play buttons
    const playButtons = document.querySelectorAll('.song-play-btn');
    playButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            if (currentAudio) {
                currentAudio.pause();
            }
        
            currentAudio = new Audio(songs[index].path);
            currentAudio.addEventListener('timeupdate', updateProgressBar);
            currentAudio.volume = document.getElementById('volume').value / 100;
            currentAudio.play().catch(error => {
                console.error('Error playing audio:', error);
            });
        
            let playbar = document.querySelector('.playbar');
            playbar.classList.add('visible');
            document.getElementById('play_img').src = './icons/pause.svg';
        
            // Update song name in playbar
            document.querySelector('.song-name').textContent = songs[index].name;
        });
    });
}

function updateProgressBar() {
    if (currentAudio) {
        const progress = document.getElementById('progress');
        const currentTimeSpan = document.getElementById('current-time');
        const durationSpan = document.getElementById('duration');
        
        // Update progress bar value
        const percentage = (currentAudio.currentTime / currentAudio.duration) * 100;
        progress.value = percentage;
        
        // Update time displays
        const currentMinutes = Math.floor(currentAudio.currentTime / 60);
        const currentSeconds = Math.floor(currentAudio.currentTime % 60);
        const durationMinutes = Math.floor(currentAudio.duration / 60);
        const durationSeconds = Math.floor(currentAudio.duration % 60);
        
        currentTimeSpan.textContent = `${currentMinutes}:${currentSeconds.toString().padStart(2, '0')}`;
        durationSpan.textContent = `${durationMinutes}:${durationSeconds.toString().padStart(2, '0')}`;
    }
}

function playSongOnClick(btn_class) {
    let btn = document.getElementsByClassName(btn_class);
    let playImg = document.getElementById('play_img');

    for (let i = 0; i < btn.length; i++) {
        btn[i].addEventListener('click', function () {
            if (currentAudio) {
                currentAudio.pause();
            }

            currentAudio = new Audio('./songs/arijit/Kasturi - Amar Prem Ki Prem Kahani 320 Kbps.mp3');
            currentAudio.addEventListener('timeupdate', updateProgressBar);
            currentAudio.volume = document.getElementById('volume').value / 100;
            currentAudio.play().catch(error => {
                console.error('Error playing audio:', error);
            });
            
            let playbar = document.querySelector('.playbar');
            playbar.classList.add('visible');
            playImg.src = './icons/pause.svg';                
        });
    }
}

function playPause(btn_id) {
    let btn = document.getElementById(btn_id);
    let playImg = document.getElementById('play_img');

    btn.addEventListener('click', function () {
        if (currentAudio) {
            if (currentAudio.paused) {
                currentAudio.play();
                playImg.src = './icons/pause.svg';
            } else {
                currentAudio.pause();
                playImg.src = './icons/play.svg';
            }
        }
    });
}

// Add progress bar click handling
const progressBar = document.getElementById('progress');
progressBar.addEventListener('input', function() {
    if (currentAudio) {
        const time = (progressBar.value / 100) * currentAudio.duration;
        currentAudio.currentTime = time;
    }
});

// Add volume control handling
const volumeControl = document.getElementById('volume');
const volumeIcon = document.getElementById('volume-icon');
volumeControl.addEventListener('input', function() {
    if (currentAudio) {
        currentAudio.volume = volumeControl.value / 100;
        if (volumeControl.value == 0) {
            volumeIcon.src = './icons/mute.svg';
        } else if (volumeControl.value <= 30) {
            volumeIcon.src = './icons/volume-low.svg';
        } else if (volumeControl.value <= 70) {
            volumeIcon.src = './icons/volume-medium.svg';
        } else {
            volumeIcon.src = './icons/volume.svg';
        }
    }
});

insertSongs()
playSongOnClick('artist');
playPause('play_btn');