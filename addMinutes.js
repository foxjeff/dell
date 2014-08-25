// this file has one exported function: addMinutes
// it takes 2 arguments,
//   The first argument is a string of the format "[H]H:MM {AM|PM}" 
//   The second argument is an integer, the number of minutes to add to the time string
// To test addMinutes function:
//   In the browser: just fill in the fields and press <return> or click the button
//   In a node.js command line:
//    addMinutes = require ('./addMinutes');
//   then:
//    addMinutes("9:13 AM", 10)
// will return:
//    9:23 AM
// other examples:
//    addMinutes("8:59 PM", -12)
//    => 8:47 PM
//    addMinutes("8:59 PM", -1200)
//    => 0:59 PM
//    addMinutes("8:59 PM", -1260)
//    => 11:59 PM
//    addMinutes("8:59 PM", 1260)
//    => 5:59 PM

function getHoursToAdd (delta, minutes) {
  return Math.floor((delta + minutes - 60)/ 60) + 1;
}
function getNewMinutes (delta, minutes) {
  var newMinutes = (delta + minutes) % 60;
  if (newMinutes < 0) newMinutes = 60 + newMinutes;
  return  newMinutes;
}
function getNewHours (hoursToAdd, oldHours, oldAMPM) {
  var hours24 = oldHours;
  if (oldAMPM == "PM") {
    if (oldHours != 12) {
      hours24 = oldHours + 12;
     }
  }
  else { // AM
    if (oldHours == 12)
      hours24 = oldHours - 12;
  }
  hours24 = hours24 + hoursToAdd;
  if (hours24 <= -24 || hours24 >= 24) hours24 = hours24 % 24;
  if (hours24 < 0) hours24 = hours24 + 24;
  return hours24;
}
var addMinutes = function (_inputTime, _deltaMinutes){
  var timeMatcher = /^(\d+):(\d{2}) ([AP]M)$/;
  // exit on bad input string or bad time values
  var errorStatus = 500;
  var successStatus = 200;

  var deltaMinutes = parseInt(_deltaMinutes);
  if (deltaMinutes === null || (!deltaMinutes && deltaMinutes !== 0))
		    return {status: errorStatus, message: "Delta minutes is not a number"};

  var inputTime = _inputTime;
  var timeArr = inputTime.match(timeMatcher);
  if (!timeArr) {
    console.log("Error in time string.");
    console.log("Try for example: '9:13 AM'");
    return {status: errorStatus, message: "Problem with time string"};
  }
  var minutes = parseInt(timeArr[2]);
  if (minutes < 0 || minutes > 59) {
    console.log("Minutes must be between 0 and 59");
    return {status: errorStatus, message: "Minutes must be between 0 and 59"};
  }
  var hours = parseInt(timeArr[1]);
  if (hours < 1 || hours > 12) {
    console.log("Hours must be between 1 and 12");
    return {status: errorStatus, message: "Hours must be between 1 and 12"};
  }
  var amPM = timeArr[3];
  
 var newMinutes = getNewMinutes(deltaMinutes, minutes);
  var hoursToAdd = getHoursToAdd(deltaMinutes, minutes);
  // getNewHours returns the new hours, but in 24hr format, for AM/PM calculation
  var hours24    = getNewHours(hoursToAdd, hours, amPM);
  
  var newAMPM;
  if (hours24 >= 12) newAMPM = "PM"; else newAMPM = "AM";

  // convert 24hour time to 1-12 time
  var newHours;
  if (hours24 > 12)
    newHours = hours24 - 12; 
  else
    newHours = hours24;
  if (hours24 === 0) 
    newHours = 12; // for midnight

  var newTime = newHours + ":" + ((newMinutes < 10) ? "0" + newMinutes : "" + newMinutes) + " " + newAMPM;
  return {status: successStatus, message: newTime};
};

module.exports = addMinutes;
