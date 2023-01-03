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