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
const cv1 = "cv_style1.html"
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

const howOld = (birthday) => {

     var ageDifMs = Date.now() - birthday.getTime();
     var ageDate = new Date(ageDifMs);
     return ageDate.getUTCFullYear() - 1970;
    //var birthday = +new Date(dateString);
    //return ~~((Date.now() - birthday) / (31557600000));
}

const getAge = (year, month, day) => {
    const birth = new Date(year, month - 1, day);
    const now = new Date();
    const diff = new Date(now.valueOf() - birth.valueOf());
    return diff.getUTCFullYear() - 1970;
}

/**
 * Usefull functions
 */
function newTab(link){
    setTimeout(function(){
        window.open(link, "_blank");
    }, 500);
}

function sameTab(link){
    setTimeout(function(){
        window.open(link, "_self");
    }, 500);
}

function addLinha(texto, estilo, tempo){
    var t = "";

    for(let i=0; i<texto.length; i++) {
        if (texto.charAt(i) === " " && texto.charAt(i + 1) === " "){
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


function getDay(date) { // get day number from 0 (monday) to 6 (sunday)
  let day = date.getDay();
  if (day == 0) day = 7; // make Sunday (0) the last day
  return day - 1;
}

function createArrayCalendar(year, month, week){
  let mon = month - 1;
  let date = new Date(year, mon);
  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const dayWeekSunday = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const dayWeekMonday = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
  var arrayCalendar = [];
  var weekDays = [];
  let weekDayText = "";

  function createArrayTextCalendarSunday(daysOfTheWeek){
    arrayCalendar.push("<br>"+"<p><span class=\"color3\">"+months[mon]+" "+year+"</span></p>");
    
    for(let dayWeek in daysOfTheWeek){
      weekDayText += daysOfTheWeek[dayWeek]+ " ";
    }

    arrayCalendar.push(weekDayText)

    for(let i = 0; i < date.getDay(); i++){
        weekDays.push(" ");
    }
  
    while(date.getMonth() == mon){
      weekDays.push(date.getDate());
  
      if(date.getDay() == 6){
        weekDayText = "";
        for(let dayWeek in weekDays){
          if(weekDays[dayWeek] <= 9){
            weekDayText += weekDays[dayWeek] + "  ";
          } else {
            weekDayText += weekDays[dayWeek] + " ";
          }
        }
        arrayCalendar.push(weekDayText);
        weekDays = [];
      }
      date.setDate(date.getDate() + 1);
    }
  
      if(date.getDay() != 0){
          for(let i=date.getDay(); i < 7; i++){
              weekDays.push("");
          }
          weekDayText = "";
          for(let dayWeek in weekDays){
            weekDayText += weekDays[dayWeek] + " ";
          }
          arrayCalendar.push(weekDayText);
          arrayCalendar.push("<br>");
      }
     return arrayCalendar;  
  }

  function createArrayTextCalendarMonday(daysOfTheWeek){
    arrayCalendar.push("<br>"+"<p><span class=\"color3\">"+months[mon]+" "+year+"</span></p>");

    for(let dayWeek in daysOfTheWeek){
      weekDayText += daysOfTheWeek[dayWeek]+ " ";
    }

    arrayCalendar.push(weekDayText)

    for(let i = 0; i < getDay(date); i++){
        weekDays.push(" ");
    }
  
    while(date.getMonth() == mon){
      weekDays.push(date.getDate());
  
      if(getDay(date) % 7 == 6){
        weekDayText = "";
        for(let dayWeek in weekDays){
          if(weekDays[dayWeek] <= 9){
            weekDayText += weekDays[dayWeek] + "  ";
          } else {
            weekDayText += weekDays[dayWeek] + " ";
          }
        }
        arrayCalendar.push(weekDayText);
        weekDays = [];
      }
      date.setDate(date.getDate() + 1);
    }
  
      if(getDay(date) != 0){
          for(let i=getDay(date); i < 7; i++){
              weekDays.push("");
          }
          weekDayText = "";
          for(let dayWeek in weekDays){
            weekDayText += weekDays[dayWeek] + " ";
          }
          arrayCalendar.push(weekDayText);
          arrayCalendar.push("<br>");
      }
     return arrayCalendar;  
  }

  switch(week){
      case "s":
        return createArrayTextCalendarSunday(dayWeekSunday);
      case "m":
        return createArrayTextCalendarMonday(dayWeekMonday);
      default:
        return ["Invalid arguments. Please type arguments as %YYYY-MM %m for the arguments.","%m as start week at Monday.", "%s as start week at Sunday."]
    }
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