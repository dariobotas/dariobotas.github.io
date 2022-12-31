"use strict";
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
        case "banner":
            loopLinhas(banner.description()/*randomBanner()*/, "", 80);
            break;
        case "banner0":
            loopLinhas(Help.defaultEn.commands[2].parameters[0].description/* banner0 */, "", 80);
            //displayFullYear();
            break;
        case "banner1":
            loopLinhas(Help.defaultEn.commands[2].parameters[1].description/* banner1 */, "", 80);
            //displayFullYear();
            break;
        case "banner2":
            loopLinhas(Help.defaultEn.commands[2].parameters[2].description/* banner2 */, "", 80);
            //displayFullYear();
            break;
        case "banner3":
            loopLinhas(Help.defaultEn.commands[2].parameters[3].description/* banner3 */, "", 80);
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
            loopLinhas(Help.defaultEn.listCommands()/*help*/, "color2 margin", 80);
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

function begin(){
    //console.log(banner.description);
    loopLinhas(banner.description(),"",80);
    textarea.focus();
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
        },2500);
    }, tempo);
}

window.onload = (function () {
    cursor = $("cursor");
    cursor.style.left = "0px";

    beginTerminal("begin",500);

    window.addEventListener("keyup", enterKey);

    //init
    textarea.setAttribute("value", "");
    //typer.appendChild("value", "");
    typer.innerHTML = textarea.value;
} ());