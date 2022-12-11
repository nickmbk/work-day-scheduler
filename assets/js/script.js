// CURRENT DAY DISPLAY
// variable stores the day and date using moment.js
var getDay = moment().format("dddd MMMM, Do");
// append the day and date to the document
$("#currentDay").append(getDay);

// HOUR COLORS
// use moment to get the current hour
var hourNow = moment().hour();
// use the jQuery each loop
$(".row").each(function() {
    // get the hour from our data attribute from the row that is being focused on in the each loop
    rowHour = $(this).data("hour")
    // if the row data-hour attribute is less than the hourNow variable, set the class of the textarea to past so it colors the textarea grey
    if (rowHour < hourNow) {
        $("textarea[data-hour=" + rowHour + "]").addClass("past");
    }
    // if the current row being checked is the same hour as hourNow, set the class as present to color the textarea red
    if (rowHour === hourNow) {
        $("textarea[data-hour=" + rowHour + "]").addClass("present");
    }
    // if the row hour is more than hourNow then add the class of future to color it green
    if (rowHour > hourNow) {
        $("textarea[data-hour=" + rowHour + "]").addClass("future");
    }
});

// RETRIEVE SAVED DATA FROM LOCAL STORAGE
// get the data from localStorage and store in variable plannerString
var plannerString = localStorage.getItem("planner");
// parse the plannerString into the variable plannerItems, converting it to an array of objects
var plannerItems = JSON.parse(plannerString) ?? [];
// loop throught the plannerItems array
for (var i = 0; i < plannerItems.length; i++) {
    // use the data stored in the current index to re-populate the work schedule planner, so all tasks show in their correct time blocks as the user left it 
    $("textarea[data-hour=" + plannerItems[i].timeBlock + "]").val(plannerItems[i].activity);
}

// this function runs when the user clicks the save button
function savePlanner (event) {
    // reset the variables timeBlock and activity
    var timeBlock = 0;
    var activity = "";
    // update the timeBlock variable with the data-hour attribute in the html from the save button the user clicked
    timeBlock = $(this).data("hour");
    // get the contents of the textarea with the same data-hour attribute, that the user has entered
    activity = $("textarea[data-hour=" + timeBlock + "]").val();
    // take out any extra white space from the activity variable, in case the user has just entered spaces
    activity.trim();
    // get the plannerString from local storage again
    plannerString = localStorage.getItem("planner");
    // parse it into an array of objects
    plannerItems = JSON.parse(plannerString) ?? [];
    // if the user clicked save and the textarea wasn't empty
    if (activity !== "") {
        // had trouble finding the index of the plannerItems array when checking if a time already exists in the localStorage to overwrite it, found this article which helped
        // https://bobbyhadz.com/blog/javascript-array-find-index-of-object-by-property
        // check if the time the user has clicked to save already exists and store the index in the variable checkTimeExists
        var checkTimeExists = plannerItems.map(object => object.timeBlock).indexOf(timeBlock);
        // check if checkTimeExists hasn't returned -1 (that the time doesn't exist), so if the time does exist
        if (checkTimeExists !== -1) {
            // delete the entry, using splice, from the array
            plannerItems.splice(checkTimeExists, 1);
        }
        // add the timeBlock and activity variables to the newTask variable as an object
        var newTask = { timeBlock, activity };
        // push newTask to the plannerItems array
        plannerItems.push(newTask);
        // sort the array so they are in time order
        plannerItems.sort((a, b) => a.timeBlock - b.timeBlock);
        // save the array back to local storage
        localStorage.setItem("planner", JSON.stringify(plannerItems));
    // if the user has deleted the text in the textarea or it is empty
    } else {
        // check if the time is already saved and find the index
        var checkTimeExists = plannerItems.map(object => object.timeBlock).indexOf(timeBlock);
        // if the time already exists, delete it
        if (checkTimeExists !== -1) {
            // remove the entry from localStorage
            plannerItems.splice(checkTimeExists, 1);
            // update the localStorage
            localStorage.setItem("planner", JSON.stringify(plannerItems));
        }
        // this also stops anything being saved if the textarea is empty
    }
}

// event listener for when a user clicks on a save button
$(".saveBtn").on("click", savePlanner);