let timerInterval;

function setCountdown() {
    const dateInput = document.getElementById('date').value;
    const timeInput = document.getElementById('time').value;

    if (!dateInput || !timeInput) {
        document.getElementById('caution-msg').innerText = "Please select both date and time.";
        return;
    }

    document.getElementById('caution-msg').innerText = "";

    const targetDate = new Date(dateInput);
    const targetTime = timeInput.split(':');

    targetDate.setHours(targetTime[0]);
    targetDate.setMinutes(targetTime[1]);

    const targetDateTime = targetDate.getTime();

    timerInterval = setInterval(function () {
        const currentTime = new Date().getTime();
        const timeDifference = targetDateTime - currentTime;

        if (timeDifference <= 0) {
            clearInterval(timerInterval);
            document.getElementById('timer').innerHTML = "Countdown expired!";
            return;
        }

        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        document.getElementById('timer').innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }, 1000);
}

function stopCountdown() {
    clearInterval(timerInterval);
}

function resetCountdown() {
    clearInterval(timerInterval);
    document.getElementById('timer').innerHTML = "";
    document.getElementById('date').value = "";
    document.getElementById('time').value = "";
    document.getElementById('caution-msg').innerText = "";
}
