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


let crnt_track = document.querySelector('audio')


let is_playing = false     // *************need this flag to know the music is playing or stopped!





// ***********************fetcing data***********************
let _music_info = document.querySelector('.musicInfo')
async function fetchData() {
    let x = await fetch('https://mocki.io/v1/e4e4567f-dc78-43e8-863e-b3ab8e2f859c')
    let y = await x.json()


    y.map((val, index) => {
        const _music = document.createElement("div")


        _music.innerHTML = `
        <div id="${val.id}" class="p1 cursor-pointer flex border-b-2 py-2">
        <img src="${val.track_image}" alt="" class="w-1/2 rounded-xl h-[100px]">
        <div class="w-1/2 ms-1">
        <p class="text-[#161515] text-base font-medium capitalize ">${val.track_name}</p>
        <p class="text-[#959B9B] text-sm">${val.track_artist}</p>
        </div>
        `

        _music_info.appendChild(_music)

    })

    let click_play = document.querySelectorAll('.p1')
    track_name.innerHTML = y[0].track_name
    track_artist.innerHTML = y[0].track_artist
    crnt_track.src = y[0].track
    crnt_track.setAttribute('data-id', '0')
    track_image.src = y[0].track_image
    _total_()

    // it works just for play() not for playing this music it should be corrected
    click_play.forEach((item, i) => {
        item.addEventListener('click', () => {
            // console.log(item);
            let id = (item.getAttribute('id'));
            crnt_track.src = y[id - 1].track
            crnt_track.setAttribute('data-id', id - 1)
            track_image.src = y[id - 1].track_image
            track_name.innerHTML = y[id - 1].track_name
            track_artist.innerHTML = y[id - 1].track_artist
            _play()
            _total_()
        })
    })


    // *************shuffle function
    let z = 1
    let _rand = ''
    shuffle_btn.addEventListener('click', (e) => {
        if (z % 2) {
            shuffle_btn.classList.add('text-[#2d2961]')
            _rand = Math.floor(Math.random() * y.length)
            crnt_track.src = y[_rand].track
            crnt_track.setAttribute('data-id', _rand)
            track_image.src = y[_rand].track_image
            track_name.innerHTML = y[_rand].track_name
            track_artist.innerHTML = y[_rand].track_artist
            _play()
            _total_()
        }
        else {
            shuffle_btn.classList.remove('text-[#2d2961]')
        }
        z++
    })
    // ends shuffle func

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


    next_track.addEventListener('click', () => {
        let id = crnt_track.getAttribute('data-id')
        if (id < 9) {
            id++
        } else {
            id = 0
        }
        crnt_track.src = y[id].track
        crnt_track.setAttribute('data-id', id)
        track_image.src = y[id].track_image
        track_name.innerHTML = y[id].track_name
        track_artist.innerHTML = y[id].track_artist
        _play()
        _total_()

    })

    setInterval(() => {
        if (crnt_track.ended) {
            let id = crnt_track.getAttribute('data-id')
            if (id < 9) {
                id++
            } else {
                id = 0
            }
            crnt_track.src = y[id].track
            crnt_track.setAttribute('data-id', id)
            track_image.src = y[id].track_image
            track_name.innerHTML = y[id].track_name
            track_artist.innerHTML = y[id].track_artist
            _play()
            _total_()
        }
    }, 1000);

    prev_track.addEventListener('click', () => {
        let id = crnt_track.getAttribute('data-id')
        if (id > 0) {
            id--
        } else {
            id = y.length - 1
        }
        crnt_track.src = y[id].track
        crnt_track.setAttribute('data-id', id)
        track_image.src = y[id].track_image
        track_name.innerHTML = y[id].track_name
        track_artist.innerHTML = y[id].track_artist
        _play()
        _total_()

    })
    let musicLast = JSON.parse(localStorage.getItem("musics"))
    console.log(musicLast);
    console.log(musicLast[(musicLast.length - 1)]);
    crnt_track.src = y[musicLast[(musicLast.length - 1)]].track
    crnt_track.setAttribute('data-id', musicLast[(musicLast.length - 1)])
    track_image.src = y[musicLast[(musicLast.length - 1)]].track_image
    track_name.innerHTML = y[musicLast[(musicLast.length - 1)]].track_name
    track_artist.innerHTML = y[musicLast[(musicLast.length - 1)]].track_artist
    _total_()

}

fetchData()
const db = []
function _play() {
    crnt_track.play()
    is_playing = true
    play_pause_btn.innerHTML = `
    <i class="bi bi-pause-circle-fill text-[1.9vw] text-[#8A81A1] hover:text-[#2d2961] duration-300 cursor-pointer"></i>
    `
    let storageID = crnt_track.getAttribute('data-id')
    db.push(storageID)
    console.log(db);
    localStorage.setItem('musics', JSON.stringify(db))
}

function _pause() {
    crnt_track.pause()
    is_playing = false
    play_pause_btn.innerHTML = `
    <i class="bi bi-play-circle-fill text-[1.9vw] text-[#8A81A1] hover:text-[#2d2961] duration-300 cursor-pointer"></i>
    `
}
function _play_pause() {
    if (is_playing == true) {
        _pause()
    } else if (is_playing == false) {
        _play()
    }
}



function _total_(e){
    const minute = Math.floor(crnt_track.duration / 60);
    const second = Math.floor(crnt_track.duration % 60);
    return `${minute}:${second < 10 ? '0' : ''}${second}`;
}

crnt_track.addEventListener('loadedmetadata', () => {
    const duration = crnt_track.duration;
    if (!isNaN(duration) && duration > 0) {
        total_duration.textContent = _total_(duration);
    } else {
        total_duration.textContent = "00:00";
    }
});





// //  setting total duration of the music to the total duration element
// function _total_(e) {
//     setTimeout(() => {
//         let minute = Math.floor((crnt_track.duration) / 60)
//         let second = Math.floor((crnt_track.duration) % 60)
//         if (second < 10) {
//             total_duration.innerHTML = minute + ':' + '0' + second
//         } else {
//             total_duration.innerHTML = minute + ':' + second
//         }
//     }, 100);
// }
// // ends setting total duration of the music to the total duration element
// _total_()



// setting current time of the music to the current time element
setInterval(() => {
    let minute = Math.floor((crnt_track.currentTime) / 60)
    let second = Math.floor((crnt_track.currentTime) % 60)
    if (second < 10) {
        crnt_time.innerHTML = minute + ':' + '0' + second
    } else {
        crnt_time.innerHTML = minute + ':' + second
    }
}, 1000);
// ends setting current time of the music to the current time element



// ************line Options
setInterval(() => {
    let x = Number(crnt_track.currentTime)
    let y = Number(crnt_track.duration)

    _timer.style.width = (x * 100) / y + "%"
}, 500);

_line.addEventListener('mousedown', (e) => {
    let time = Number(crnt_track.duration)
    let x = (time / 100)
    let width1 = e.offsetX
    let w = width1 / 3.21
    _timer.style.width = w + '%'
    let t = w * x
    crnt_track.currentTime = t
    _pause()
})
_line.addEventListener('mouseup', (e) => {
    _play()
})