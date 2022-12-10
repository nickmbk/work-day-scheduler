// current day display
var getDay = moment().format("dddd MMMM, Do");
$("#currentDay").append(getDay);

// hour colors
var hourNow = moment().hour();

$(".row").each(function() {
    console.log(this);
    rowHour = $(this).data("hour")
    console.log(rowHour);
    if (rowHour < hourNow) {
        $("textarea[data-hour=" + rowHour + "]").addClass("past");
        console.log("added past");
    }
    if (rowHour === hourNow) {
        $("textarea[data-hour=" + rowHour + "]").addClass("present");
        console.log("added present");
    }
    if (rowHour > hourNow) {
        $("textarea[data-hour=" + rowHour + "]").addClass("future");
        console.log("added future");
    }
});
