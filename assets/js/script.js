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

function savePlanner (event) {
    var timeBlock = $(this).data("hour");
    var activity = $("textarea[data-hour=" + timeBlock + "]").val();

    plannerString = localStorage.getItem("planner");
    plannerItems = JSON.parse(plannerString) ?? [];
    // https://bobbyhadz.com/blog/javascript-array-find-index-of-object-by-property
    var checkTimeExists = plannerItems.map(object => object.timeBlock).indexOf(timeBlock);
    console.log(checkTimeExists);
    if (checkTimeExists !== -1) {
        plannerItems.splice(checkTimeExists, 1);
    }
    var newTask = { timeBlock, activity };
    plannerItems.push(newTask);
    plannerItems.sort((a, b) => a.timeBlock - b.timeBlock);
    localStorage.setItem("planner", JSON.stringify(plannerItems));
}

var plannerString = localStorage.getItem("planner");
var plannerItems = JSON.parse(plannerString) ?? [];
for (var i = 0; i < plannerItems.length; i++) {
    $("textarea[data-hour=" + plannerItems[i].timeBlock + "]").val(plannerItems[i].activity);
    console.log("timeblock = " + plannerItems[i].timeBlock);
    console.log("activity " + plannerItems[i].activity);
}


// var highScoresString = localStorage.getItem("highScores");
// // convert the high scores string retreived from localStoarge and convert it to an array, if there are no scores return an empty array
// var highScores = JSON.parse(highScoresString) ?? [];

// // perform a for loop to populate the li entries in the ordered list of all the scores that were stored in local storage
// for (var i = 0; i < highScores.length; i++) {
//   // create the current li element to display each score
//   var scoresLi = document.createElement("li");
//   // add content from the high scores array to the li
//   scoresLi.textContent = highScores[i].initials + " - " + highScores[i].score;
//   // append the li so it will show in the html
//   scoresOl.append(scoresLi);

$(".saveBtn").on("click", savePlanner);