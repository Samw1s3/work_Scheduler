// Show current time and date in jumbo
function displayTime() {
var now = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
$("#currentDay").text(now);
console.log("#currentDay");

}
setInterval(displayTime, 1000);