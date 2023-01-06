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

function createCalendar(elem, year, month) {

    let mon = month - 1; // months in JS are 0..11, not 1..12
    let dateYearMonth = new Date(year, mon);
    const dayWeekMonday = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
    const dayWeekSunday = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    let calendarioMensal = [];

    function criarElementoLinhaTabela(tipo, props){
      var tr = document.createElement('tr');
      for(var i=0; i<props.length; i++){
        var celula = document.createElement(tipo);
        var texto = document.createTextNode(props[i]);
        celula.appendChild(texto);
        tr.appendChild(celula);
      }
      return tr;
    }

    function criarElementoCabecalho(props){
      var thead = document.createElement('thead');
      var th = criarElementoLinhaTabela('th', props);

      thead.appendChild(th);

      return thead;
    }

    function criarElementoTabela(textoCaption){
      var table = document.createElement('table');

      if(textoCaption){
        var caption = document.createElement('caption');
        var texto = document.createTextNode(textoCaption);
        caption.appendChild(texto);
        table.appendChild(caption);
      }
      return table;
    }

    /**
     * 
     * @param {daysofMonth} daysOfMonth Dias do mês
     * @returns {Array} a linha da tabela dentro dum array.
     */
    function criarCorpoCalendario(daysOfMonth){
      var tbody = document.createElement('tbody');
      var semanaDias = daysOfMonth;

      for(var semana in semanaDias){
        var tr = criarElementoLinhaTabela('td', semana);
        tbody.appendChild(tr);
      }
      return tbody;
    }
        
    function criarCalendario (name, startDayWeek, daysOfMonth) {
      var calendar = criarElementoTabela(name);
      
      var calendarThead = criarElementoCabecalho(startDayWeek);
      calendar.appendChild(calendarThead);

      var calendarTbody = criarCorpoCalendario(daysOfMonth);
      calendar.appendChild(calendarTbody);

      return calendar;
    }
    
    
    switch(elem){
      case "s":
        return criarCalendario("Sunday start calendar", dayWeekSunday)
      case "m":
        return criarCalendario("Monday start calendar", dayWeekMonday);
      default:
        return ["Invalid arguments.Please type arguments as %YYYY-MM %m for the arguments.","%m as start week at Monday.", "%s as start week at Sunday."]
    }

    function arrayOfDaysStartsSunday(yearMonth, month){
      var dateYearMonth = yearMonth;
      var arrayDays = [];

          // spaces for the first row
    // from Monday till the first day of the month
    // * * * 1  2  3  4
      for (let i = 0; i < getDay(dateYearMonth); i++) {
        arrayDays.push('');
      }

        // <td> with actual dates
      while (dateYearMonth.getMonth() == month) {
          arrayDays.push(dateYearMonth.getDate());
    
          if (getDay(dateYearMonth) % 7 == 6) { // sunday, last day of week - newline
            return arrayDays;
          }
    
          dateYearMonth.setDate(dateYearMonth.getDate() + 1);
        }
    
        // add spaces after last days of month for the last row
        // 29 30 31 * * * *
        if (getDay(dateYearMonth) != 0) {
          for (let i = getDay(dateYearMonth); i < 7; i++) {
            arrayDays.push('');
          }
        }

    }
  }

  function getDay(date) { // get day number from 0 (monday) to 6 (sunday)
    let day = date.getDay();
    if (day == 0) day = 7; // make Sunday (0) the last day
    return day - 1;
  }

  //createCalendar(calendar, 2012, 9);

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