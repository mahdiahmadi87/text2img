const canvas = document.getElementById("myCanvas")
const cx = canvas.getContext("2d")
let backColor = "#ffe17d"
let color = '#97854b'
let text = ""
let size = 50
let x = 50
let y = 50


function ChangeBack(value){
    backColor = value
    updateText(text)
}

function ChangeColor(value){
    color = value
    updateText(text)
}

function updateText(value){
    clearDisplay(backColor)
    cx.font = `${size}px Arial`
    cx.fillStyle = color
    cx.fillText(value, x, y)
    text = value
}

function changeWidth(value){
    canvas.width = value
    updateText(text)
    let X = document.getElementById("x")
    X.max = value
}

function changeHeight(value){
    canvas.height = value
    updateText(text)
    let Y = document.getElementById("y")
    Y.max = value
}

function changeSize(value){
    size = value
    updateText(text)
}

function changeX(value){
    x = value
    updateText(text)
}

function changeY(value){
    y = value
    updateText(text)
}

function clearDisplay(value){
    cx.fillStyle = value
    cx.fillRect(0, 0, canvas.width, canvas.height)
}



