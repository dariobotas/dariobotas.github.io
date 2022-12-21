/**
 * Variables declared
 */
const before = document.getElementById("before");
const liner = document.getElementById("liner");
const command = document.getElementById("command");
const textarea = document.getElementById("terminal_input");
const terminal = document.getElementById("terminal");

let git = 0;
let pw = false;
let pwd = false;
var commands = [];

setTimeout(function(){
    loopLinhas(banner, "", 80);
    textarea.focus();
}, 100);

window.addEventListener("keyup", enterKey);

//init
textarea.setAttribute("value", "");
command.setAttribute("value", "");

function entradaDoTeclado(tecla){
    //validar se o F5 foi premido para fazer reload
    if(tecla.keyCode == 181){
        document.location.reload(true);
    }

    //Validar a senha introduzida ao escolher a opção "secret"
    if (pw) {
        let sec = "*";
        let w = textarea.ariaValueMax.length;

        command.appendChild(sec.repeat(w));

        //Validar se o texto corresponde à senha
        if(textarea.value === password){
            pwd = true;
        }

        //Validar se a senha é correta e se foi clicado enter
        if(pwd && entradaDoTeclado.keyCode == 13){
            loopLinhas(secret, "color2 margin", 120);
            limpaElemento(command);
            textarea.setAttribute("value","");
            pwd = false;
            pw = false;
            liner.classList.remove("password");
        } else if (entradaDoTeclado.keyCode == 13) {
            addLinha("Wrong password", "error", 0);
            limpaElemento(command);
            textarea.setAttribute("value","");
            pw = false;
            liner.classList.remove("password");
        }
    } else {
        if(tecla.keyCode == 13){
            commands.push(command);
            git = commands.length;
            addLinha("visitor@dbotas.com:~$ " + command, "no-animation", 0);
            comandos(command.toLowerCase());
            limpaElemento(command);
            textarea.setAttribute("value", "");
        }
        if(tecla.keyCode == 38 && git != 0) {
            git -= 1;
            if(commands[git] === undefined) {
                textarea.setAttribute("value", "");
            } else {
                textarea.setAttribute("value", commands[git]);
            }
            command.appendChild(textarea.value);
        }
    }
}

function comandos(cmd){
    
}

function loopLinhas(nome, estilo, tempo){
    nome.forEach(
        function (item, index) {
            addLinha(item, estilo, index * tempo);
        }
    );
}

function addLinha(texto, estilo, tempo){
    var t = "";

    for(let i=0; i<texto.length; i++) {
        if (texto.charAt(i) == " " && texto.charAt(i+1) == " "){
            t += "&nbsp;&nbsp;";
            i++;
        }else {
            t += texto.charAt(i);
        }
    }
    setTimeout(function(){
        let next = document.createElement("p");

        next.appendChild(t);
        next.setAttribute("class",estilo);

        before.parentNode.insertBefore(next, before);

        window.scrollTo(0, document.body.offsetHeight);
    }, tempo);
}
function limpaElemento(elementoHTML) {
    while (elementoHTML.firstChild != undefined) {
        elementoHTML.removeChild(elementoHTML.firstChild);
    }
}