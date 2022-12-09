// current day display
var getDay = moment().format("dddd MMMM, Do");
$("#currentDay").append(getDay);

// hour colors
var getTime = moment()