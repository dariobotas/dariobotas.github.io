/**
 * Variables declared
 */
var before = $("before");
var cursor;
var liner = $("liner");
var typer = $("typer");
var textarea = $("terminal_input");
var terminal = $("terminal");

var git = 0;
var pw = false;
let pwd = false;
var commands = [];

function enterKey(e){
    //validar se o F5 foi premido para fazer reload
    if(e.keyCode == 181){
        document.location.reload(true);
    }

    //Validar a senha introduzida ao escolher a opção "secret"
    if (pw) {
        let sec = "*";
        let w = textarea.value.length;

        //typer.appendChild(sec.repeat(w));
        typer.innerHTML = sec.repeat(w);

        //Validar se o texto corresponde à senha
        if(textarea.value === password){
            pwd = true;
        }

        //Validar se a senha é correta e se foi clicado enter
        if(pwd && e.keyCode == 13){
            loopLinhas(secret, "color2 margin", 120);
            //limpaElemento(typer);
            typer.innerHTML = "";
            //textarea.setAttribute("value","");
            textarea.value = "";
            pwd = false;
            pw = false;
            liner.classList.remove("password");
        } else if (e.keyCode == 13) {
            addLinha("Wrong password", "error", 0);
            limpaElemento(typer);
            //typer.innerHTML = "";
            //textarea.setAttribute("value","");
            textarea.value = "";
            pw = false;
            liner.classList.remove("password");
        }
    } else {
        if(e.keyCode == 13){
            commands.push(typer.innerHTML);
            git = commands.length;
            addLinha("visitor@dbotas.github.io:~$ " + typer.innerHTML, "no-animation", 0);
            comandos(typer.innerHTML.toLowerCase());
            limpaElemento(typer);
            //typer.innerHTML = "";
            //textarea.setAttribute("value", "");
            textarea.value = "";
        }
        
        if(e.keyCode == 38 && (git != 0 || git != commands.length)) {
            git -= 1;
            if(commands[git] === undefined) {
                //textarea.setAttribute("value", "");
                textarea.value = "";
            } else {
                //textarea.setAttribute("value", commands[git]);
                textarea.value = commands[git];
            }
            //typer.appendChild(textarea.value);
            typer.innerHTML = textarea.value;
        }
        
        if (e.keyCode == 40 && git != commands.length){
            git += 1;
            if(commands[git] === undefined) {
                //textarea.setAttribute("value", "");
                textarea.value = "";
            } else {
                //textarea.setAttribute("value", commands[git]);
                textarea.value = commands[git];
            }
            //typer.appendChild(textarea.value);
            //typer.append(textarea.value);
            typer.innerHTML = textarea.value;
        }
    }
}

function comandos(cmd){
    switch (cmd.toLowerCase()){
        case "banner0":
            loopLinhas(banner0, "", 80);
            //displayFullYear();
            break;
        case "banner1":
            loopLinhas(banner1, "", 80);
            //displayFullYear();
            break;
        case "banner2":
            loopLinhas(banner2, "", 80);
            //displayFullYear();
            break;
        case "clear":
            setTimeout(function() {
                clearEverything();
            }, 1);
            break;
        case "clear -b":
            setTimeout(function(){
                clearEverything();
                begin();
            }, 100);
            //beginTerminal("begin", 100);
            break;
        case "help":
            loopLinhas(help, "color2 margin", 80);
            break;
        case "history":
            addLinha("<br>", "", 0);
            loopLinhas(commands, "color3", 80);
            addLinha("<br>", "command", 80 * commands.length + 50);
            break;
        case "languages":
            loopLinhas(languages, "color2 margin", 80);
            break;
        case "projects":
            loopLinhas(projects, "color2 margin", 80);
            break;
        case "reload":
            commands = [];
            beginTerminal(reload, 0);
            break;
        case "secret":
            liner.classList.add("password");
            pw = true;
            break;
        case "whois":
            loopLinhas(whois, "color2 margin", 80);
            break;
        case "whoami":
            loopLinhas(whoami, "color2 margin", 80);
            break;
        default:
            addLinha("<span class=\"inherit\">Command not found. For a list of commands, type <span class=\"command\">'help'</span>.</span>", "error", 100);
            break;
    }
}

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

        //next.appendChild(t);
        next.innerHTML = t;
        //next.setAttribute("class",estilo);
        next.className = estilo

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

function beginTerminal(br, tempo){
    setTimeout(()=> {
        if(br == "begin"){
            loopLinhas(startTerminal, "", 0);
        } else {
            loopLinhas(reload, "", 0);
        }
        setTimeout(()=>{
            clearEverything();
            begin();
            init(); 
        },2500);
    }, tempo);
}

function clearEverything (){
    //terminal.innerHTML = '<a id="before"></a>';
    limpaElemento(terminal);
    a = document.createElement("a");
    a.id = "before";
    terminal.appendChild(a);
    before = $("before");
}

function displayFullYear(){
    const year = new Date().getFullYear();
    let spanYear = document.getElementsByClassName("yearb2");
    spanYear.appendChild(document.createTextNode(year));
}

function begin(){
    const rndInt = randomIntFromInterval(0, 2);
    if (rndInt == 0){
        loopLinhas(banner0, "", 80);
    } else if (rndInt ==1){
        loopLinhas(banner1, "", 80);
    } else {
        loopLinhas(banner2, "", 80);
        //displayFullYear();
    }
    textarea.focus();
}

function $(elid){
    return document.getElementById(elid);
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

window.onload = function () {
    cursor = $("cursor");
    cursor.style.left = "0px";

    beginTerminal("begin",500);

window.addEventListener("keyup", enterKey);

//init
textarea.setAttribute("value", "");
//typer.appendChild("value", "");
typer.innerHTML = textarea.value;
}