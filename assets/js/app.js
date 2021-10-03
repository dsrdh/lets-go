const minUp = document.getElementById("min-up");
const minField = document.getElementById("min");
const minDown = document.getElementById("min-down");

const secUp = document.getElementById("sec-up");
const secField = document.getElementById("sec");
const secDown = document.getElementById("sec-down");

const startBtn = document.getElementById("start-box");
const resetBtn = document.getElementById("reset-box");

let countdown = 600, min, sec;    // defalt countdown for 10 mins
let longPress = false, running = false;
let interval, timer;

window.addEventListener("load", function() {
    updateTime();
    permission = Notification.requestPermission();
});

resetBtn.addEventListener("click", function() {
    countdown = 600;
    updateTime();
    startBtn.innerHTML = "<i class='uil uil-play-circle'></i><h3 i class='btn'>START</h3>";
});

secUp.addEventListener("mousedown", function() {
    interval = setInterval(function() {
        countdown++;
        updateTime();
        longPress = true;
    }, 150);
});

secUp.addEventListener("click", function() {
    if(longPress) {
        longPress = false;
        return;
    }
    countdown++;
    updateTime();
});

secUp.addEventListener("mouseup", function() {
    clearInterval(interval);
});

secDown.addEventListener("mousedown", function() {
    interval = setInterval(function() {
        countdown--;
        updateTime();
        longPress = true;
    }, 150);
});

secDown.addEventListener("click", function() {
    if(longPress) {
        longPress = false;
        return;
    }
    countdown--;
    updateTime();
});

secDown.addEventListener("mouseup", function() {
    clearInterval(interval);
});


secUp.addEventListener("mouseup", function() {
    clearInterval(interval);
});

minUp.addEventListener("mousedown", function() {
    interval = setInterval(function() {
        countdown+=60;
        updateTime();
        longPress = true;
    }, 150);
});

minUp.addEventListener("click", function() {
    if(longPress) {
        longPress = false;
        return;
    }
    countdown+=60;
    updateTime();
});

minDown.addEventListener("mouseup", function() {
    clearInterval(interval);
});

minDown.addEventListener("mousedown", function() {
    interval = setInterval(function() {
        countdown-=60;
        updateTime();
        longPress = true;
    }, 150);
});

minDown.addEventListener("click", function() {
    if(longPress) {
        longPress = false;
        return;
    }
    countdown-=60;
    updateTime();
});

minUp.addEventListener("mouseup", function() {
    clearInterval(interval);
});

startBtn.addEventListener("dblclick", function() {
    if(running) {
        clearInterval(timer);
        countdown = 0;
        startBtn.click();
        startBtn.innerHTML = "<i class='uil uil-play-circle'></i><h3 class='btn'>START</h3>";
    }
});

startBtn.addEventListener("click", function() {
    if(running) {
        clearInterval(timer);
        showAll();
        startBtn.innerHTML = "<i class='uil uil-play-circle'></i><h3 class='btn'>RESUME</h3>";
        resetBtn.style.visibility = 'visible';
        running = false;
    } else if(countdown > 0){
        countdown--;
        updateTime();
        timer = setInterval(function() {
            if(countdown <= 0) {
                startBtn.click();
                startBtn.innerHTML = "<i class='uil uil-play-circle'></i><h3 i class='btn'>START</h3>";
                sendNotificaion();
                return;
            }
            countdown--;
            updateTime();
        }, 1000);
        hideAll();
        startBtn.innerHTML = "<i class='uil uil-pause-circle'></i><h3 class='btn'>PAUSE</h3>";
        resetBtn.style.visibility = 'hidden';
        running = true;
    }

});

function updateTime() {
    countdown = Math.max(countdown, 0);
    min   = Math.floor(countdown / 60);
    sec = countdown%60;
    
    if (min< 10) min = "0" + min;
    if (sec < 10) sec = "0" + sec;

    minField.innerText = min;
    secField.innerText = sec;
}

function hideAll() {
    minDown.style.visibility = minUp.style.visibility = secDown.style.visibility = secUp.style.visibility = "hidden";
}

function showAll() {
    minDown.style.visibility = minUp.style.visibility = secDown.style.visibility = secUp.style.visibility = "visible";

}

function sendNotificaion() {
    if(permission == 'granted') {
        const greeting = new Notification('Your 10 minutes timer is completed.',{
            body: 'Time\'s up',
            icon: '/assets/img/check.png'
        });
    }
}