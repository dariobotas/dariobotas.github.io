/**
 * Variables declared
 */
var before = document.getElementById("before");
var liner = document.getElementById("liner");
var typer = document.getElementById("typer");
var textarea = document.getElementById("terminal_input");
var terminal = document.getElementById("terminal");

var git = 0;
var pw = false;
let pwd = false;
var commands = [];

beginTerminal("begin",500);

window.addEventListener("keyup", enterKey);

//init
textarea.setAttribute("value", "");
typer.appendChild("value", "");
//typer.innerHTML = textarea.value;

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
        
        if(e.keyCode == 38 && git != 0) {
            git -= 1;
            textarea.setAttribute("value", commands[git]);
            //textarea.value = commands[git];
            typer.appendChild(textarea.value);
            //typer.innerHTML = textarea.value;
        }
        
        if (e.keyCode == 40 && git != commands.length){
            git += 1;
            if(commands[git] === undefined) {
                textarea.setAttribute("value", "");
                //textarea.value = "";
            } else {
                textarea.setAttribute("value", commands[git]);
                //textarea.value = commands[git];
            }
            typer.appendChild(textarea.value);
            //typer.append(textarea.value);
            //typer.innerHTML = textarea.value;
        }
    }
}

function comandos(cmd){
    switch (cmd.toLowerCase()){
        case "banner0":
            loopLinhas(banner0, "", 80);
            break;
        case "banner1":
            loopLinhas(banner1, "", 80);
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
            break;
        case "help":
            loopLinhas(help, "color2 margin", 80);
            break;
        case "languages":
            loopLinhas(languages, "color2 margin", 80);
            break;
        case "whois":
            loopLinhas(whois, "color2 margin", 80);
            break;
        case "whoami":
            loopLinhas(whoami, "color2 margin", 80);
            break;
        case "projects":
            loopLinhas(projects, "color2 margin", 80);
            break;
        case "reload":
            beginTerminal(reload, 0);
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
    terminal.innerHTML = '<a id="before"></a>';
    before = document.getElementById("before");
}

function begin(){
    const rndInt = randomIntFromInterval(0, 1);
    if (rndInt == 0){
        loopLinhas(banner0, "", 80);
    } else {
        loopLinhas(banner1, "", 80);
    }
    textarea.focus();
}
