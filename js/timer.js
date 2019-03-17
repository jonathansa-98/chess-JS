String.prototype.toHHMMSS = function () {
    var seconds = parseInt(this, 10); // don't forget the second param
    var hours = Math.floor(seconds / 3600);
    var minutes = Math.floor((seconds - (hours * 3600)) / 60);
    var seconds = seconds - (hours * 3600) - (minutes * 60);

    if (hours < 10) {
        hours = "0" + hours;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    var time = hours + ':' + minutes + ':' + seconds;
    return time;
};

String.prototype.zeroPad = function (max) {
    return this.length < max ? ("0" + this).zeroPad(max) : this;
};

String.prototype.formatedMilliseconds = function () {
    var s = parseInt(this);
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;
    return {
        hms: hrs.toString().zeroPad(2) + ':' + mins.toString().zeroPad(2) + ':' + secs.toString().zeroPad(2),
        ms: ms.toString().zeroPad(3),
        sec: secs
    };
};
String.prototype.timeToMill = function () {
    var timerArr = this.split(":");
    var m = parseInt(timerArr[0]);
    var s = parseInt(timerArr[1]);
    var mill = (s + m * 60) * 1000;
    return mill;
};

function algo(params) {
    // Set the date we're counting down to
    var countDownDate = new Date("Jan 3 2020 15:59:25").getTime();

    // Update the count down every 1 second
    var x = setInterval(function () {

        // Get todays date and time
        var now = new Date().getTime();

        // Find the distance between now and the count down date
        var distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Output the result in an element with id="demo"
        document.getElementById("demo").innerHTML = minutes + "m " + seconds + "s ";

        // If the count down is over, write some text
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("demo").innerHTML = "EXPIRED";
        }
    }, 1000);
}