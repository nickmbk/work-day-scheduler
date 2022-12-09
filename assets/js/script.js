// current day display
var getDay = moment().format("dddd MMMM, Do");
$("#currentDay").append(getDay);

// hour colors
var hourNow = moment().hour();

for (var i = 9; i < 18; i++) {
    $("textarea").each(function() {
        if (i < hourNow) {
            $("textarea").addClass("past");
        } else if (i === hourNow) {
            $("textarea").addClass("present");
        } else if (i > hourNow) {
            $("textarea").addClass("future");
        }
    })
}
