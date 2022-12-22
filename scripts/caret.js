function $(elid){
    return document.getElementById(elid);
}

var cursor;
window.onload = init;

function init() {
    cursor = $("cursor");
    cursor.style.left = "0px";
}

function nl2br(text) {
    return text.replace(/\n/g, '');
}

function typeIt(from, e){
    e = e || window.event;
    var typer = $("typer");
    var typerWrite = from.value;
    

    if (!pw){
        //typer.setAttribute("value", nl2br(typerWrite));
        typer.innerHTML = nl2br(typerWrite);
        //typer.style.display=nl2br(typerWrite);
        //typer.appendChild(document.createTextNode(typerWrite.replace(/\n/g, '')));
        
    }
}

function moveIt(count, e){
    e = e || window.event;
    var keycode = e.keycode || e.which;
    if(keycode == 37 && parseInt(cursor.style.left) >= (0 - ((count - 1) * 10))) {
        cursor.style.left = parseInt(cursor.style.left) - 10 +"px";
    }
    else if (keycode == 39 && (parseInt(cursor.style.left) + 10) <= 0) {
        cursor.style.left = parseInt(cursor.style.left) + 10 +"px";
    }
}

function alert(text) {
    console.log(text);
}