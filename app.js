const canvas = document.getElementById("myCanvas")
const cx = canvas.getContext("2d")
let color = "white"
let text = ""
let size = 50
let x = 50
let y = 50

canvas.style=`border:1px solid grey; background-color: ${color};`


function ChangeColor(value){
    color = value
    updateText(text)
}

function updateText(value){
    clearDisplay(color)
    cx.font = `${size}px Arial`
    cx.fillStyle = "blue"
    cx.fillText(value, x, y)
    text = value
}

function changeWidth(value){
    canvas.width = value
    updateText(text)
}

function changeHeight(value){
    canvas.height = value
    updateText(text)
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



