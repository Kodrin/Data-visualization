// GET THE DATE
var utc = new Date().toJSON().slice(0,10).replace(/-/g,'.');
document.getElementById('todaysdate').innerHTML = "D-" + utc;


// GET THE TIME
function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('todaystime').innerHTML =
    "T-" + h + "." + m + "." + s;
    var t = setTimeout(startTime, 500);
}

function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}
