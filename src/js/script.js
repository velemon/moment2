"use strict";

let courses = [];

//Funktion som körd när sidan laddas
window.onload = () => {
    loadCourses();

    //Händelselyssnare som filtrerar från sök
    document.querySelector("#search").addEventListener("input", filterData);
}

//Funktion för felhantering och hämntning av data
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

function printCourses(data) {

    //Variabler
    const codeEl = document.querySelector("code");
    const courseNameEl = document.querySelector("coursename");
    const progressionEl = document.querySelector("progression");


}