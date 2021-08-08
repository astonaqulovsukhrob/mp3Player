// Button
const musicPlayer = document.getElementById('music-container')
const playBtn = document.getElementById('play')
const prevBtn = document.getElementById('prev')
const nextBtn = document.getElementById('next')

// selector
const audio = document.getElementById('audio')
const progress = document.getElementById('progress')
const progressContainer = document.getElementById('progress-container')
const title = document.getElementById('title')
const cover = document.getElementById('cover')
const body = document.querySelector('body')
const musicInfo = document.getElementById('music-info')
const start = document.getElementById('start')
const end = document.getElementById('end')

// song titles
let songs = [
  'Ты и Я',
  'Ты беспощадна',
  'Jony (cover)',
  'holimga qara',
  'yurak',
  'Layli',
  'Nafis gulim',
  'Misty Omuzumda'
]

// keep track of song
let songIndex = 0

loadSong(songs[songIndex])

// Update song details 
function loadSong(song) {
  title.innerText = song
  audio.src = `audio/${song}.mp3`
  cover.src = `images/${song}.jpg`
}

// playSong
function playSong() {
  musicPlayer.classList.add('play')
  playBtn.querySelector('i.fas').classList.remove('fa-play')
  playBtn.querySelector('i.fas').classList.add('fa-pause')

  audio.play()
}

// pauseSong 
function pauseSong() {
  musicPlayer.classList.remove('play')
  playBtn.querySelector('i.fas').classList.add('fa-play')
  playBtn.querySelector('i.fas').classList.remove('fa-pause')

  audio.pause()
  setColor()
}

// prevSong
function prevSong() {
  songIndex--

  if (songIndex < 0) {
    songIndex = songs.length - 1
  }

  loadSong(songs[songIndex])

  playSong()
  setColor()
}


// nextSong
function nextSong() {
  songIndex++

  if (songIndex > songs.length - 1) {
    songIndex = 0
  }

  loadSong(songs[songIndex])

  playSong()
  setColor()
}

// updateProgress
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement
  const progressPercent = (currentTime / duration) * 100
  progress.style.width = `${progressPercent}%`

  let minutes = Math.floor(duration / 60)
  let secods = Math.floor(duration % 60)
  end.textContent = `${minutes}:${secods = secods < 10 ? '0' + secods : secods}`

  let currentMinutes = Math.floor(currentTime / 60)
  let currentSecods = Math.floor(currentTime % 60)
  start.textContent = `${currentMinutes}:${currentSecods = currentSecods < 10 ? '0' + currentSecods : currentSecods}`
}

// setProgress
function setProgress(e) {
  const width = this.clientWidth
  const clickX = e.offsetX
  const duration = audio.duration

  audio.currentTime = (clickX / width) * duration
}

playBtn.addEventListener('click', function () {
  const isPlaying = musicPlayer.classList.contains('play')

  if (isPlaying) {
    pauseSong()
  } else {
    playSong()
  }
  setColor()
})

prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)
audio.addEventListener('timeupdate', updateProgress)
progressContainer.addEventListener('click', setProgress)
audio.addEventListener('ended', nextSong)

setColor()
function setColor() {
  const colors = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
  ]


  function randomColor() {
    let color = '#'
    let randomNum = Math.floor(Math.random() * colors.length)

    for (let i = 0; i < 6; i++) {
      let randomNum = Math.floor(Math.random() * colors.length)
      color += colors[randomNum]
    }

    return color
  }

  const color1 = randomColor()
  const color2 = randomColor()


  const randomDeg = Math.floor(Math.random() * 360)

  body.style.background = `linear-gradient( ${randomDeg}deg, ${color1}, ${color2})`
}