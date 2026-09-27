/* =========================================
   XV PILU
   31 · 10 · 2026
========================================= */


/* =========================================
   1. CUENTA REGRESIVA
   Evento: 31/10/2026 - 21:00
   Hora de Uruguay
========================================= */

const eventDate = new Date("2026-10-31T21:00:00-03:00");

const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");

function updateCountdown() {

    const now = new Date();
    const difference = eventDate.getTime() - now.getTime();

    if (difference <= 0) {

        daysElement.textContent = "00";
        hoursElement.textContent = "00";
        minutesElement.textContent = "00";
        secondsElement.textContent = "00";

        const countdown = document.getElementById("countdown");

        countdown.innerHTML = `
            <div class="event-arrived">
                ✦ ¡Llegó el gran día! ✦
            </div>
        `;

        clearInterval(countdownInterval);
        return;
    }

    const days = Math.floor(
        difference / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (difference / (1000 * 60 * 60)) % 24
    );

    const minutes = Math.floor(
        (difference / (1000 * 60)) % 60
    );

    const seconds = Math.floor(
        (difference / 1000) % 60
    );

    daysElement.textContent =
        String(days).padStart(2, "0");

    hoursElement.textContent =
        String(hours).padStart(2, "0");

    minutesElement.textContent =
        String(minutes).padStart(2, "0");

    secondsElement.textContent =
        String(seconds).padStart(2, "0");
}

updateCountdown();

const countdownInterval =
    setInterval(updateCountdown, 1000);



/* =========================================
   2. RESTRICCIÓN ALIMENTICIA
========================================= */

const restrictionSelect =
    document.getElementById("restriccion");

const otherContainer =
    document.getElementById("otraContainer");

const otherInput =
    document.getElementById("otra");

restrictionSelect.addEventListener(
    "change",
    function () {

        if (this.value === "Otra") {

            otherContainer.classList.remove("hidden");
            otherInput.required = true;

        } else {

            otherContainer.classList.add("hidden");
            otherInput.required = false;
            otherInput.value = "";

        }

    }
);



/* =========================================
   3. RSVP
========================================= */

const rsvpForm =
    document.getElementById("rsvpForm");

const formMessage =
    document.getElementById("formMessage");

const submitButton =
    rsvpForm.querySelector('button[type="submit"]');


rsvpForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();

        submitButton.disabled = true;
        submitButton.textContent =
            "ENVIANDO...";

        formMessage.textContent =
            "Estamos registrando tu respuesta...";

        const formData =
            new FormData(rsvpForm);

        try {

            await fetch(
                "https://script.google.com/macros/s/AKfycbzPbLCxwDEjCRsXXB1ijcsSZRIH9dIlyNwt13Sc2UNu9EBy3vZU-1PKnXSDDvzo3Hup/exec",
                {
                    method: "POST",
                    body: formData,
                    mode: "no-cors"
                }
            );

            formMessage.textContent =
                "✓ ¡Gracias! Tu confirmación fue enviada.";

            rsvpForm.reset();

            otherContainer.classList.add("hidden");
            otherInput.required = false;

        } catch (error) {

            console.error(
                "Error enviando RSVP:",
                error
            );

            formMessage.textContent =
                "No pudimos enviar la confirmación. Intentá nuevamente.";

        } finally {

            submitButton.disabled = false;
            submitButton.textContent =
                "CONFIRMAR ASISTENCIA";

        }

    }
);



/* =========================================
   4. COPIAR NÚMERO PREX
========================================= */

const copyPrexButton =
    document.getElementById("copyPrex");

const copyMessage =
    document.getElementById("copyMessage");

const prexNumber = "21100169";


copyPrexButton.addEventListener(
    "click",
    async function () {

        try {

            await navigator.clipboard.writeText(
                prexNumber
            );

            copyMessage.textContent =
                "✓ Número copiado";

            setTimeout(
                function () {
                    copyMessage.textContent = "";
                },
                2500
            );

        } catch (error) {

            copyMessage.textContent =
                "Número Prex: " + prexNumber;

        }

    }
);



/* =========================================
   5. SPOTIFY
========================================= */

const spotifyButton =
    document.getElementById("spotifyButton");

spotifyButton.addEventListener(
    "click",
    function (event) {

        const spotifyLink =
            spotifyButton.getAttribute("href");

        if (
            spotifyLink === "#" ||
            spotifyLink === ""
        ) {

            event.preventDefault();

            alert(
                "La playlist de Pilu estará disponible muy pronto 🎵"
            );

        }

    }
);