const key = "AIzaSyBIeJXhS73HQ5flqksB-_SGnKND9iKmhUw";
const proxyUrl = `https://corsproxy.io/?`;

const output = document.querySelector("#distance");

document.querySelector("form").addEventListener("submit", getDistance);

async function getDistance(e) {
    e.preventDefault();

    output.innerText = "Hämtar...";

    const origin = e.target.elements.origin.value;
    const destination = e.target.elements.destination.value;

    if (!origin) {
        output.innerText = "Välj från!";
        return;
    }

    if (!destination) {
        output.innerText = "Välj till!";
        return;
    }

    const mapsUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=${key}`;

    const response = await fetch(proxyUrl + mapsUrl);
    const data = await response.json();

    if (response.ok) {
        output.innerText =
            "Från: " +
            (data.origin_addresses[0] || "-") +
            "\n" +
            "Till: " +
            (data.destination_addresses[0] || "-") +
            "\n" +
            "Status: " +
            data.rows[0].elements[0].status +
            "\n" +
            "Avstånd (m): " +
            data.rows[0].elements[0].distance?.value;
    } else {
        output.innerText = data;
    }
}
