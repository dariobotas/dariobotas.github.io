//"use strict";
function enterKey(e) {
  //validar se o F5 foi premido para fazer reload
  if (e.keyCode === 181) {
    document.location.reload(true);
  }

  //Validar a senha introduzida ao escolher a opção "secret"
  if (pw) {
    let sec = "*";
    let w = textarea.value.length;

    //typer.appendChild(sec.repeat(w));
    typer.innerHTML = sec.repeat(w);

    //Validar se o texto corresponde à senha
    if (textarea.value === password) {
      pwd = true;
    }

    //Validar se a senha é correta e se foi clicado enter
    if (pwd && e.keyCode === 13) {
      loopLinhas(secret, "color2 margin", 120);
      typer.innerHTML = "";
      textarea.value = "";
      pwd = false;
      pw = false;
      liner.classList.remove("password");
    } else if (e.keyCode === 13) {
      addLinha("Wrong password", "error", 0);
      limpaElemento(typer);
      textarea.value = "";
      pw = false;
      liner.classList.remove("password");
    }
  } else {
    if (e.keyCode === 13) {
      historyCommands.push(typer.innerHTML);
      git = historyCommands.length;
      addLinha(
        "visitor@dbotas.github.io:~$ " + typer.innerHTML,
        "no-animation",
        0
      );
      comandos(typer.innerHTML.toLowerCase());
      limpaElemento(typer);
      textarea.value = "";
    }

    if (e.keyCode === 38 && (git !== 0 || git !== historyCommands.length)) {
      git -= 1;
      if (historyCommands[git] === undefined) {
        textarea.value = "";
      } else {
        textarea.value = historyCommands[git];
      }
      typer.innerHTML = textarea.value;
    }

    if (e.keyCode === 40 && git !== historyCommands.length) {
      git += 1;
      if (historyCommands[git] === undefined) {
        textarea.value = "";
      } else {
        textarea.value = historyCommands[git];
      }
      typer.innerHTML = textarea.value;
    }
  }
}

function comandos(cmd) {
  let comd = cmd.toLowerCase();
  let command = comd.replace(/\s+/g, "");
  let argumentsCommand = command.split("%",3);
  
  const commandAndParameter = argumentsCommand[0];
  const commandSplitted = commandAndParameter.split("--", 2);
  const mainCommand = commandSplitted[0];
  
  //Filtrar o comando com base no escrito
  const todosComandos = Help.defaultEn.commands;
  const comandosFiltrados = todosComandos
    .map((e) => e.name)
    .indexOf(mainCommand);

  if (comandosFiltrados !== -1) {
    //Filtrar o parâmetro com base no comando
    const parameter = commandSplitted[1];
    const parametrosDoComando = todosComandos[comandosFiltrados].parameters;
    const parametrosDoComandoFiltrado = parametrosDoComando
      .map((e) => e.name)
      .indexOf(parameter);
      
    if (parametrosDoComandoFiltrado !== -1){
      return parametrosDoComando[parametrosDoComandoFiltrado].description(argumentsCommand);
    } else if (parameter === undefined){
      return todosComandos[comandosFiltrados].description(argumentsCommand);
    } else {
      return addLinha(
        '<span class="inherit">Wrong parameter. For a list of parameters, type <span class="command">\''+todosComandos[comandosFiltrados].name+' --h\'</span>.</span>',
        "error",
        100
      );
    }
  } else {
    return addLinha(
      '<span class="inherit">Command not found. For a list of commands, type <span class="command">\'help\'</span>.</span>',
      "error",
      100
    );
  }
}

function beginTerminal(br, tempo) {
  setTimeout(() => {
    if (br == "begin") {
      loopLinhas(startTerminal, "", 0);
    } else {
      loopLinhas(reloadTerminal, "", 0);
    }
    setTimeout(() => {
      clearEverything();
      banner.description();
      textarea.focus();
    }, 2500);
  }, tempo);
}

window.onload = (function () {
  cursor = $("cursor");
  cursor.style.left = "0px";

  beginTerminal("begin", 500);

  window.addEventListener("keyup", enterKey);

  //init
  textarea.setAttribute("value", "");
  typer.innerHTML = textarea.value;
})();
