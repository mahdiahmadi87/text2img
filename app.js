const canvas = document.getElementById("myCanvas");
const cx = canvas.getContext("2d");
let backColor = "#ffe17d";
let color = '#97854b';
let text = "";
let fontSize = 50;
let x = 50; // Default X for LTR start
let y = 50;
let fontName = 'FMT';

// Variables
let backgroundType = 'color';
let backgroundImage = null;
let imageAspectRatio = 1;
let isAspectRatioLocked = false;
let textAlign = 'left'; // Default alignment is now 'left'

// UI Element References
const widthSlider = document.getElementById("width");
const widthNum = document.getElementById("widthNum");
const heightSlider = document.getElementById("height");
const heightNum = document.getElementById("heightNum");
const aspectLockRow = document.getElementById('aspectLockRow');
const aspectLockCheckbox = document.getElementById('aspectLock');
const bgColorRow = document.getElementById('bgColorRow');
const bgImageRow = document.getElementById('bgImageRow');

// --- Functions ---

function handleBackgroundTypeChange(type) {
    backgroundType = type;
    bgColorRow.style.display = (type === 'color') ? 'flex' : 'none';
    bgImageRow.style.display = (type === 'image') ? 'flex' : 'none';
    
    if (type === 'image') {
        if (backgroundImage) aspectLockRow.style.display = 'flex';
    } else {
        aspectLockRow.style.display = 'none';
        isAspectRatioLocked = false;
        aspectLockCheckbox.checked = false;
        changeWidth(widthNum.value);
        changeHeight(heightNum.value);
    }
    updateText(text); 
}

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = new Image();
            img.onload = function() {
                backgroundImage = img;
                imageAspectRatio = img.width / img.height;
                
                canvas.width = img.width;
                canvas.height = img.height;

                widthSlider.value = img.width;
                widthNum.value = img.width;
                heightSlider.value = img.height;
                heightNum.value = img.height;
                document.getElementById('x').max = img.width;
                document.getElementById('y').max = img.height;

                aspectLockRow.style.display = 'flex';
                aspectLockCheckbox.checked = true;
                isAspectRatioLocked = true;
                
                changeTextAlign(textAlign); // Re-apply alignment to set default X
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

function changeTextAlign(align) {
    textAlign = align;
    // Auto-adjust X for a better user experience when changing alignment
    if (align === 'center') {
        x = Math.round(canvas.width / 2);
    } else if (align === 'right') {
        x = canvas.width - 50;
    } else { // left
        x = 50;
    }
    x = Math.max(0, Math.min(canvas.width, x));
    
    document.getElementById('x').value = x;
    document.getElementById('xNum').value = x;

    updateText(text);
}


function toggleAspectRatioLock(isLocked) { isAspectRatioLocked = isLocked; }
function changeFont(value) { fontName = value; updateText(text); }

function changeWidth(value) {
    const newWidth = parseInt(value, 10);
    widthSlider.value = newWidth;
    widthNum.value = newWidth;
    canvas.width = newWidth;
    document.getElementById('x').max = newWidth;

    if (backgroundType === 'image' && isAspectRatioLocked) {
        const newHeight = Math.round(newWidth / imageAspectRatio);
        heightSlider.value = newHeight;
        heightNum.value = newHeight;
        canvas.height = newHeight;
        document.getElementById('y').max = newHeight;
    }
    updateText(text);
}

function changeHeight(value) {
    const newHeight = parseInt(value, 10);
    heightSlider.value = newHeight;
    heightNum.value = newHeight;
    canvas.height = newHeight;
    document.getElementById('y').max = newHeight;

    if (backgroundType === 'image' && isAspectRatioLocked) {
        const newWidth = Math.round(newHeight * imageAspectRatio);
        widthSlider.value = newWidth;
        widthNum.value = newWidth;
        canvas.width = newWidth;
        document.getElementById('x').max = newWidth;
    }
    updateText(text);
}

function updateText(value) {
    text = value; // Keep the raw text
    
    clearDisplay();

    // Set text properties before drawing
    cx.textAlign = textAlign;
    cx.font = `${fontSize}px ${fontName}`;
    cx.fillStyle = color;
    
    const lines = text.split("\n");
    
    cx.save();
    lines.forEach(line => {
        cx.fillText(line, x, y);
        cx.translate(0, parseInt(fontSize, 10));
    });
    cx.restore();
}

function clearDisplay() {
    if (backgroundType === 'image' && backgroundImage) {
        cx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    } else {
        cx.fillStyle = backColor;
        cx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function ChangeBack(value) { backColor = value; if (backgroundType === 'color') updateText(text); }
function ChangeColor(value) { color = value; updateText(text); }
function changeSize(value) { fontSize = value; document.getElementById("size").value = value; document.getElementById("sizeNum").value = value; updateText(text); }
function changeX(value) { x = value; document.getElementById("x").value = value; document.getElementById("xNum").value = value; updateText(text); }
function changeY(value) { y = value; document.getElementById("y").value = value; document.getElementById("yNum").value = value; updateText(text); }

function download() {
    const link = document.createElement('a');
    link.download = 'canvas-image.png';
    link.href = canvas.toDataURL("image/png");
    link.click();
}

document.addEventListener('DOMContentLoaded', () => { updateText(''); });