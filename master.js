// select HTML elements!

let track_image = document.querySelector('.musicPlayer>img')
let track_name = document.querySelector('.track-name')
let track_artist = document.querySelector('.track-artist')

let shuffle_btn = document.querySelector('.shuffle')
let prev_track = document.querySelector('.prev-track')
let play_pause_btn = document.querySelector('.play-pause')
let next_track = document.querySelector('.next-track')
let repeat_btn = document.getElementsByClassName('repeat')[0]

let _line = document.querySelector('#line')
let _timer = document.querySelector('#timer')
let crnt_time = document.querySelector('.current-time')
let total_duration = document.querySelector('.total-duration')

let click_play = document.querySelectorAll('.p1')

let crnt_track = document.querySelector('audio')


// *********define a list of tracks


const tracks = [
    'butterfly', 'drunk', 'eyes_closed', 'photograph', 'shape_of_you'
]
const bgs = [
    '_butterfly', 'Drunk', '_eyes_closed', 'Photograph', 'shapeofyou'
]
const artists = [
    'ed sheeran', 'ed sheeran', 'ed sheeran', 'ed sheeran', 'ed sheeran'
]


let is_playing = false     // *************need this flag to know the music is playing or stopped!
let track_index = 0        //**************need this flag to know which musi is playing





// *************shuffle function
let y = 1
let _rand =''
shuffle_btn.addEventListener('click', (e) => {
    if (y % 2) {
        shuffle_btn.classList.add('text-[#2d2961]')
        _rand = Math.floor(Math.random() * tracks.length)
        crnt_track.src = 'audios/' + tracks[_rand] + '.mp3'
        track_image.src = 'imgs/' + bgs[_rand] + '.jpg'
        track_name.innerHTML = tracks[_rand]
        track_artist.innerHTML = artists[_rand]
        _play()
        _total_()   
    }
    else {
        shuffle_btn.classList.remove('text-[#2d2961]')
    }
    y++
})
// ends shuffle func



// it works just for play() not for playing this music it should be corrected
click_play.forEach((val, i) => {
    val.addEventListener('click', () => {
        _play()
        crnt_track.src = 'audios/' + tracks[i] + '.mp3'
        track_image.src = 'imgs/' + bgs[i] + '.jpg'
        track_name.innerHTML = tracks[i]
        track_artist.innerHTML = artists[i]
        _total_()
    })
})






setInterval(() => {
    let x = Number(crnt_track.currentTime)
    let y = Number(crnt_track.duration)

    _timer.style.width = (x*100)/y +"%"
}, 1000);

_line.addEventListener('mousedown', (e) => {
    let time = Number(crnt_track.duration)
        let x = (time / 100)
        let width1 = e.offsetX
        let w = width1 / 3.21
        _timer.style.width = w + '%'
        let t=w*x
        crnt_track.currentTime = t 
        _pause()
})
_line.addEventListener('mouseup', (e) => {
    _play()
    })



// these codes work OK!*****************************************



// *************repeat function
repeat_btn.addEventListener('click', (e) => {
    if (e.target.classList.contains('bi-repeat')) {
        e.target.classList.remove('bi-repeat')
        e.target.classList.add('bi-repeat-1')
        crnt_track.setAttribute('loop', 'true')
    } else {
        e.target.classList.add('bi-repeat')
        e.target.classList.remove('bi-repeat-1')
        crnt_track.removeAttribute('loop')

    }
})
// ends repeat func

setInterval(() => {
    if (crnt_track.ended) {
        _next_track()
    }
}, 1000);

function _play() {
    crnt_track.play()
    is_playing = true
    play_pause_btn.innerHTML = `
    <i class="bi bi-pause-circle-fill text-[1.9vw] text-[#8A81A1] hover:text-[#2d2961] duration-300 cursor-pointer"></i>
    `
    
}
function _pause() {
    crnt_track.pause()
    is_playing = false
    play_pause_btn.innerHTML = `
    <i class="bi bi-play-circle-fill text-[1.9vw] text-[#8A81A1] hover:text-[#2d2961] duration-300 cursor-pointer"></i>
    `
}
function _play_pause(params) {
    if (is_playing == true) {
        _pause()
    } else if (is_playing == false) {
        _play()
    }
}


function _next_track() {
    if (track_index < (tracks.length - 1)) {
        track_index++
        crnt_track.src = 'audios/' + tracks[track_index] + '.mp3'
        track_image.src = 'imgs/' + bgs[track_index] + '.jpg'
        track_name.innerHTML = tracks[track_index]
        track_artist.innerHTML = artists[track_index]
        _total_()
    } else {
        track_index = 0
        crnt_track.src = 'audios/' + tracks[track_index] + '.mp3'
        track_image.src = 'imgs/' + bgs[track_index] + '.jpg'
        track_name.innerHTML = tracks[track_index]
        track_artist.innerHTML = artists[track_index]
        _total_()
    }
    crnt_track.play()
    is_playing = true
    play_pause_btn.innerHTML = `
    <i class="bi bi-pause-circle-fill text-[1.9vw] text-[#8A81A1] hover:text-[#2d2961] duration-300 cursor-pointer"></i>
    `
}

function _prev_track() {
    if (track_index > 0) {
        track_index--
        crnt_track.src = 'audios/' + tracks[track_index] + '.mp3'
        track_image.src = 'imgs/' + bgs[track_index] + '.jpg'
        track_name.innerHTML = tracks[track_index]
        track_artist.innerHTML = artists[track_index]
        _total_()
    } else {
        track_index = (tracks.length - 1)
        crnt_track.src = 'audios/' + tracks[track_index] + '.mp3'
        track_image.src = 'imgs/' + bgs[track_index] + '.jpg'
        track_name.innerHTML = tracks[track_index]
        track_artist.innerHTML = artists[track_index]
        _total_()
    }
    crnt_track.play()
    is_playing = true
    play_pause_btn.innerHTML = `
    <i class="bi bi-pause-circle-fill text-[1.9vw] text-[#8A81A1] hover:text-[#2d2961] duration-300 cursor-pointer"></i>
    `
}


//  setting total duration of the music to the total duration element
function _total_(e) {
    setTimeout(() => {
        let minute = Math.floor((crnt_track.duration) / 60)
        let second = Math.floor((crnt_track.duration) % 60)
        if (second < 10) {
            total_duration.innerHTML = minute + ':' + '0' + second
        } else {
            total_duration.innerHTML = minute + ':' + second
        }
    }, 100);
}
// ends setting total duration of the music to the total duration element
_total_()




// setting current time of the music to the total duration element
setInterval(() => {
    let minute = Math.floor((crnt_track.currentTime) / 60)
    let second = Math.floor((crnt_track.currentTime) % 60)
    if (second < 10) {
        crnt_time.innerHTML = minute + ':' + '0' + second
    } else {
        crnt_time.innerHTML = minute + ':' + second
    }
}, 1000);
// ends setting current time of the music to the total duration element

