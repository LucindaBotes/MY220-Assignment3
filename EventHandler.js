import {
  events
} from './script.js';

function EventHandler (_events){
  this.events = _events;
}

function isWithinRange(givenStart, eventStart, givenEnd, eventEnd){
  let eventStartDate = new Date(givenStart);
  let givenStartDate = new Date(eventStart);
  let givenEndDate = new Date(givenEnd);
  let eventEndDate = new Date(eventEnd);

  if(eventStartDate.valueOf() >= givenStartDate.valueOf() || eventEndDate.valueOf() <= givenEndDate.valueOf()){
    return true;
  }
  else{
    return false;
  }
}

function isWithinMonth(month , eventMonth){
  let eventMonthDate = new Date(eventMonth);
  if(eventMonthDate.getMonth() === (month - 1)){
    return true;
  }
  else{
    return false;
  }
}

function summariseEvents(events){
  if(events.dateStart === events.dateEnd){
    return "On " + events.dateStart + ": " + events.name + " (" + events.description + ")";
  }
  else{
    return "From " + events.dateStart + " to " + events.dateEnd +  ": " + events.name + " (" + events.description + ")";
  }
}

EventHandler.prototype.getEventsBetweenDates= function(start, end){
  return this.events.filter( event => isWithinRange(start, event.dateStart, end, event.dateEnd) === true);
}

EventHandler.prototype.getEventsByMonth= function(month){
  return this.events.filter(event => isWithinMonth(month, event.dateStart) === true);
}

EventHandler.prototype.getUniqueDateAndSort = function(){
  return this.events
    .reduce((previous, current) => {
      if(previous?.filter?.(event => event.dateStart === current.dateStart)?.length > 0){
        return previous;
      }
      return [...previous, current];
    }, [])
    .sort((a, b) => {
      const aMonth = new Date(a.dateStart).getMonth();
      const bMonth = new Date(b.dateStart).getMonth();
      return aMonth - bMonth;
    });
}

EventHandler.prototype.getSummary = function(...params){
  if (params?.[0]?.constructor === Array){
    return params[0].map(event => summariseEvents(event));
  }
  else if (!params?.[0]){
    return this.events.map(event => summariseEvents(event));
  }
  return params.map(event => event.map( e => summariseEvents(e)));
}

const eventHandler = new EventHandler(events);
eventHandler.getEventsBetweenDates("2022/02/01", "2022/02/14");
eventHandler.getEventsByMonth(2);
eventHandler.getUniqueDateAndSort();
eventHandler.getSummary();

// git repo url: https://github.com/LucindaBotes/MY220-Assignment3