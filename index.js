let bg = document.querySelector('.image-container')
let greyFox = document.querySelector('.grey-fox')
let count = 18

for (let i = 0; i < count; i++) {
    let glitchBox = document.createElement('div')
    glitchBox.classList.add('box')
    bg.appendChild(glitchBox)
}


// 좌우 방향으로 흔들림
setInterval(() => {
    greyFox.classList.add('transparent')
    greyFox.style.left = '45%' /* 왼쪽으로 5%만큼 이동 */
    setTimeout(() => {
        greyFox.classList.remove('transparent')
        setTimeout(() => {
            greyFox.style.left = '60%' /* 45%에서 60%로 위치가 변하므로 살짝 우측으로 이동함 */
            setTimeout(() => {
                greyFox.style.left = '50%' // 깜빡거리며 왼쪽에서 오른쪽으로 이동했다가 다시 중앙(원위치)으로 돌아옴
            }, 50);

        }, 50)
    }, 60) // 사라졌다가 짧은 시간(60ms) 안에 다시 나타나면 깜빡거리는 효과가 난다
}, 3000)

// 대각선 방향으로 우측 아래로 내려옴
setInterval(() => {
    greyFox.classList.add('transparent')
    greyFox.style.left = '49%' /* 왼쪽으로 1%만큼 이동 */
    greyFox.style.top = '-5%' /* 위쪽으로 5%만큼 이동 */
    setTimeout(() => {
        greyFox.classList.remove('transparent')
        setTimeout(() => {
            greyFox.style.left = '40%' /* 49%에서 40%로 위치가 변하므로 좀 많이 왼쪽으로 이동함 */
            setTimeout(() => {
                greyFox.style.top = '0' // 살짝 아래로 움직임
                greyFox.style.left = '50%' // 깜빡거리며 왼쪽 아래로 이동했다가 다시 중앙(원위치)으로 돌아옴
            }, 50);

        }, 50)
    }, 60) // 사라졌다가 짧은 시간(60ms) 안에 다시 나타나면 깜빡거리는 효과가 난다
}, 4000)

let glitch = document.querySelectorAll('.box')

setInterval(() => {
    for (let i = 0; i < glitch.length; i++) {
        glitch[i].style.left = `${Math.floor(Math.random()*900)}px` // 0~900px 사이에서 오른쪽으로 랜덤하게 위치함
        glitch[i].style.top = `${Math.floor(Math.random()*1000)}px` // 0~1000px 사이에서 아래쪽으로 랜덤하게 위치함
        glitch[i].style.width = `${Math.floor(Math.random()*200)}px` // 0~200px 사이에서 랜덤한 너비로 설정됨
        glitch[i].style.height = `${Math.floor(Math.random()*5)}px` // 0~400px 사이에서 랜덤한 높이로 설정됨
        
    }
}, 100)

let currentTime = document.querySelector('.time')

function addZero(n){
    return n < 10 ? `0${n}` : n
}
function getTime(){
    let cTime = new Date()
    let timeString = `${addZero(cTime.getHours())}:${addZero(cTime.getMinutes())}:${addZero(cTime.getSeconds())}`
    currentTime.innerHTML = timeString
    setTimeout(getTime, 1000)
}

getTime()

let cursor = document.querySelector('.pointer')

document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`
    cursor.style.top = `${e.clientY}px`
})

const gunshot = document.querySelector('.gun-shot')
const soundBar = document.querySelector('.sound-bar')
const ball = document.querySelector('.ball')

soundBar.addEventListener('click', () => {
    ball.classList.toggle('off')
})

document.addEventListener('click', () => {
    if(ball.classList.contains('off')){
        return 
    }
    gunshot.classList.add('active')
    new Audio('./glitch/gunshot.mp3').play()

    setTimeout(() => { // 흰색 화면이 잠깐 나왔다가 사라짐
        gunshot.classList.remove('active')
    }, 50)
})

const weatherLocation = document.querySelector('.location')
const temperature = document.querySelector('.temperature')
const status = document.querySelector('.status')
const weatherSearch = document.querySelector('.weather-search') // input
const search = document.querySelector('.search')

let apiKey = '751d1f11fa11382b1a6c7e845ffaecf0'
let city = 'seoul'

search.addEventListener('click', () => {
    getWeather()
})


function getWeather(){
    weatherSearch.value !== '' ? city = weatherSearch.value : city = 'seoul' 
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

    fetch(url)
    .then((res) => res.json())
    .then(data => {
        console.log(data)
        weatherLocation.innerText = data.name 
        temperature.innerText = Math.floor(data.main.temp - 273.15) + '°C'
        status.innerText = data.weather[0].description
    })

}

getWeather()


