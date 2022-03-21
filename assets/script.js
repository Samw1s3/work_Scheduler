const timeContainter = $('#time-containter');

const clearBtn = $('.clearBtn');
// button to reset local storage
$('.clearBtn').on("click", document, function (event) {
    localStorage.clear();
    window.location.reload();
})


// Show current time and date in jumbo
function displayTime() {
    var now = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
    $("#currentDay").text(now);
    console.log("#currentDay");

}
setInterval(displayTime, 1000);

function createRow(time) {
    var objDate = new Date();
    var currentHour = objDate.getHours();
    
    console.log(currentHour);
    console.log(time);
 
    


    const timestamp = time + ':00';

    const row = $("<div>").attr('class', 'row time-block border').attr('id',`${time}-row`);

    //check time vs current hour

    if (time === currentHour) {
        $(row).addClass('present')
    }
    else if (time < currentHour) {
        $(row).addClass('past')
    }
    else { 
        $(row).addClass('future')
    }
  

    const timeCol = $("<div>").attr('class', 'hour row col-1 timesection').text(timestamp);

    row.append(timeCol);

    const inputCol = $("<div>").attr('class', 'col-10');

    const input = $("<textarea>").attr('type', 'text').attr('class', 'input-note textarea');

    inputCol.append(input);
    //check if there is existing data
    const existingNote = getNote(time);
    if (existingNote) {
        input.val(existingNote);
    }
    row.append(inputCol);

    const buttonCol = $("<div>").attr('class', 'col-1');

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
$('.input-note').on('change', document, function (event) {

    const inputEl = $(event.target);

    const timestamp = inputEl.parent().prev().text();

    const userInput = inputEl.val();

    saveNote(userInput, timestamp);

})

$('.saveBtn').on("click", document, function (event) {
    const inputEl = $(event.target).parent().prev().children()[0]

    const userInput = $(inputEl).val();

    const timeEl = $(event.target).parent().prev().prev();

    const timestamp = timeEl.text();

    saveNote(userInput, timestamp)
});

// checkbackGround every 5 minutes
setInterval(setBackgroundColor(), (1000 * 60) * 5);