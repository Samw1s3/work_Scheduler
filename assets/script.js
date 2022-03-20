const timeContainter = $('#time-containter');

// Show current time and date in jumbo
function displayTime() {
var now = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
$("#currentDay").text(now);
console.log("#currentDay");

}
setInterval(displayTime, 1000);

function createRow(time){
    const timestamp =time + ':00';

    const row = $("<div>").attr('class', 'row time-block border');

    const timeCol = $("<div>").attr('class', 'hour row col-2').text(timestamp);

    row.append(timeCol);

    const inputCol = $("<div>").attr('class', 'col-8');

    


    const input = $("<input>").attr('type', 'text').attr('class','input-note textarea');
     
    inputCol.append(input);
    //check if there is existing data
    const existingNote = getNote(time);
    if(existingNote){
        input.val(existingNote);
    }
    row.append(inputCol);

    const buttonCol = $("<div>").attr('class', 'col-2' );

    const button = $("<button>").attr('class', 'saveBtn ').text('Save');

    buttonCol.append(button);

    row.append(buttonCol);

    return row;
}
//create time blocks
for (let time = 9; time < 18; time++) {
    
    const row = createRow(time);
    timeContainter.append(row);
}

function getNote(time) {
    const timestamp = time + ':00';

    return localStorage.getItem(timestamp)
}

function saveNote(note, time) {
    localStorage.setItem(time, note);

}

//user inputs text into time block 
$('.input-note').on('change', document, function(event){

    const inputEl = $(event.target);

    const timestamp = inputEl.parent().prev().text();

    const userInput = inputEl.val();

    saveNote(userInput, timestamp);

})

$('.saveBtn').on("click", document, function(event){
    const inputEl = $(event.target).parent().prev().children()[0]

    const userInput = $(inputEl).val();

    const timeEl = $(event.target).parent().prev().prev();

    const timestamp = timeEl.text();

    saveNote(userInput, timestamp)
});

//colour changes with time
var checkTime = function () {

    //Get Current time
    var currentTime = moment().format('H');

    //get all elements with class "taskarea"
    var timeBlockElements = $(".textarea");
    

    //loop through textarea classes
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