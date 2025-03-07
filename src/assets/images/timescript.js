function showTime() {

    var hours,minute;
    const now = new Date();

    hours = now.getHours();

    minutes = now.getMinutes();

    const seconds = now.getSeconds();


    if (minutes>=0 && minutes<=9) {
minutes = "0" + minutes;
}

    document.getElementById('time').innerHTML = `${hours}:${minutes}`;
}


setInterval(showTime, 500);