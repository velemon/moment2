"use strict";

let courses = [];

window.onload = () => {
    loadCourses();

    //Händelselyssnare som filtrerar från sök
    document.querySelector("#search").addEventListener("input", filterData);
}

async function loadCourses() {
    try {
        const response = await fetch("https://webbutveckling.miun.se/files/ramschema_ht24.json");

        if (!response.ok) {
            throw new Error("Fel vid hämtning av data.")
        }
        courses = await response.json();
        printCourses(courses);

    } catch (error) {
        document.querySelector("error").innerHTML = "<p>Fel vid hämtning; prova igen senare!</p>"
    }
}