function $(elid){
    return document.getElementById(elid);
}

let cursor;
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
    let typer = $("typer");
    let typerWrite = from.value;
    
    if (!typerWrite){
        typer.setAttribute("value", nl2br(typerWrite));
    }
}

function moveIt (count, e){
    e = e || window.event;
    let keycode = e.keycode || e.which;
    if(keycode == 37 && parseInt(cursor.style.left) >= (0 - ((count - 1) * 10))) {
        cursor.style.left = parseInt(cursor.style.left) - 10 +"px";
    }
    else if (keycode == 39 && (parseInt(cursor.style.left) + 10) <= 0) {
        cursor.style.left = parseInt(cursor.style.left) + 10 +"px";
    }
}

function alert (text) {
    console.log(text);
}