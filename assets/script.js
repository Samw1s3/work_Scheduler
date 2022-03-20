const timeContainter = $('#time-containter');
const clearBtn = $('.clearBtn');

$('.clearBtn').on("click", document, function(event){
    localStorage.clear();
    window.location.reload();
})

//getNote();

// Show current time and date in jumbo
function displayTime() {
var now = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
$("#currentDay").text(now);
console.log("#currentDay");

}
setInterval(displayTime, 1000);



function saveNote(note, time) {
    localStorage.setItem(time, note);

}
// function getNote(time) {
//     const timestamp = time + ':00';

//     return localStorage.getItem(timestamp);
// }

// const existingNote = getNote(time);

// if(existingNote){
//     input.val(existingNote);
// }
//user inputs text into time block 

$('.saveBtn').on("click", document, function(event){
    const inputEl = $(event.target).siblings('.textarea');
    console.log(inputEl);

    const userInput = $(inputEl).val();

    const timeEl = $(event.target).prev().prev();

    const timestamp = timeEl.text();

    saveNote(userInput, timestamp);
});






//colour changes with time
var checkTime = function () {

    //Get Current time
    var currentTime = moment().format('H');

    //get all elements with class "textarea"
    var timeBlockElements = $(".textarea");
    

    //loop through taskarea classes
    for (var i = 0 ; i < timeBlockElements.length ; i++) {

        //Get element i's ID as a string
        var elementID = timeBlockElements[i].id;

        //get element by ID
        var manipID = document.getElementById(timeBlockElements[i].id)
        
        //remove any old classes from element
        $(timeBlockElements[i].id).removeClass(".present .past .future");

        // apply new class if task is present/past/future
        if (elementID < currentTime) {
            $(manipID).addClass("past");
        } else if (elementID > currentTime) {
            $(manipID).addClass("future");
        } else {
            $(manipID).addClass("present");
        }
    }
}

// checkTime every 5 minutes
setInterval(checkTime(), (1000 * 60) * 5);