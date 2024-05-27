const canvas = document.getElementById("myCanvas")
const cx = canvas.getContext("2d")
let backColor = "#ffe17d"
let color = '#97854b'
let text = ""
let fontSize = 50
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
    cx.font = `${fontSize}px FMT`
    cx.fillStyle = color
    let l = value.split("\n")
    cx.save()
    l.forEach(element => {
        cx.fillText(element, x, y)
        cx.translate(0, fontSize)
    });
    cx.restore()
    text = value
}

function changeWidth(value){
    let width = document.getElementById("width")
    let widthNum = document.getElementById("widthNum")
    if (value < 300){
        widthNum.value = 300
        return
    }
    width.value = value
    widthNum.value = value
    canvas.width = value
    updateText(text)
    let X = document.getElementById("x")
    X.max = value
}

function changeHeight(value){
    let height = document.getElementById("height")
    let heightNum = document.getElementById("heightNum")
    if (value < 150){
        heightNum.value = 150
        return
    }
    height.value = value
    heightNum.value = value
    canvas.height = value
    updateText(text)
    let Y = document.getElementById("y")
    Y.max = value
}

function changeSize(value){
    let size = document.getElementById("size")
    let sizeNum = document.getElementById("sizeNum")
    if (value < 10){
        sizeNum.value = 10
        return
    }
    size.value = value
    sizeNum.value = value
    fontSize = value
    updateText(text)
}

function changeX(value){
    document.getElementById("x").value = value
    document.getElementById("xNum").value = value
    x = value
    updateText(text)
}

function changeY(value){
    document.getElementById("y").value = value
    document.getElementById("yNum").value = value
    y = value
    updateText(text)
}

function clearDisplay(value){
    cx.fillStyle = value
    cx.fillRect(0, 0, canvas.width, canvas.height)
}

