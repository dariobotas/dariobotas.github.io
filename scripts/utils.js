//"use strict";

/**
 * Variables declared
 */
const youtube = "https://";
const facebook = "https://www.facebook.com/dario.botas/";
const linkedin = "www.linkedin.com/in/dbotas";
const github = "https://github.com/dariobotas";
const bitbucket = "https://bitbucket.org/dabotas/";
const email = "mailto:darioabotas@gmail.com";
const password = "dbotas";
const year = new Date().getFullYear().toString();
const startTerminal = ['<span class="color2">Starting terminal...</span>'];
const reloadTerminal = ['<span class="color2">Restarting terminal...</span>'];

var git = 0;
var pw = false;
let pwd = false;
var historyCommands = [];

function $(elid){
    return document.getElementById(elid);
}

var before = $("before");
var cursor;
var liner = $("liner");
var typer = $("typer");
var textarea = $("terminal_input");
var terminal = $("terminal");

function differenceDatesInDays(date1, date2) {
    return (date2.getTime() - date1.getTime()) / (1000 * 3600 * 24);
}

const howOld = (age, monthBirth, dayBirth) => {

    // var ageDifMs = Date.now() - birthday.getTime();
    // var ageDate = new Date(ageDifMs);
    // return ageDate.getUTCFullYear() - 1970;
    //var birthday = +new Date(dateString);
    //return ~~((Date.now() - birthday) / (31557600000));
}

const getAge = (year, month, day) => {
    const birth = new Date(year, month - 1, day)
    const now = new Date()
    const diff = new Date(now.valueOf() - birth.valueOf())
    return (diff.getFullYear() - 1970)
}

/**
 * Usefull functions
 */
function newTab(link){
    setTimeout(function(){
        window.open(link, "_blank");
    }, 500);
}

function addLinha(texto, estilo, tempo){
    var t = "";

    for(let i=0; i<texto.length; i++) {
        if (texto.charAt(i) == " " && texto.charAt(i + 1) == " "){
            t += "&nbsp;&nbsp;";
            i++;
        }else {
            t += texto.charAt(i);
        }
    }

    setTimeout(function(){
        var next = document.createElement("p");

        next.innerHTML = t;
        next.setAttribute("class",estilo);

        before.parentNode.insertBefore(next, before);

        window.scrollTo(0, document.body.offsetHeight);
    }, tempo);
}


function loopLinhas(nome, estilo, tempo){
    nome.forEach(function(item, index) {
            addLinha(item, estilo, index * tempo);
        }
    );
}

function limpaElemento(elementoHTML) {
    while (elementoHTML.firstChild != undefined) {
        elementoHTML.removeChild(elementoHTML.firstChild);
    }
}

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function clearEverything (){
    limpaElemento(terminal);
    let a = document.createElement("a");
    a.id = "before";
    terminal.appendChild(a);
    before = $("before");
}

function displayFullYear(){
    const year = new Date().getFullYear();
    let spanYear = document.getElementsByClassName("yearb2");
    spanYear.appendChild(document.createTextNode(year));
}

function alert(text) {
    console.log(text);
}

function nl2br(text) {
    return text.replace(/\n/g, '');
}

function typeIt(from, e) {
    e = e || window.event;
    var typer = $("typer");
    var typerWrite = from.value;
  
    if (!pw) {
      typer.innerHTML = nl2br(typerWrite);
    }
  }
  
  function moveIt(count, e) {
    e = e || window.event;
    var keycode = e.keycode || e.which;
    if (keycode == 37 && parseInt(cursor.style.left) >= 0 - (count - 1) * 10) {
      cursor.style.left = parseInt(cursor.style.left) - 10 + "px";
    } else if (keycode == 39 && parseInt(cursor.style.left) + 10 <= 0) {
      cursor.style.left = parseInt(cursor.style.left) + 10 + "px";
    }
  }