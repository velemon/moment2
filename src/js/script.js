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
        console.log(error);
        document.querySelector(".error").innerHTML = "<p>Fel vid hämtning; prova igen senare!</p>"
    }
}

function printCourses(data) {

    //Variabler
    const table = document.querySelector("#table");

    //Rensar DOM
    table.innerHTML = "";

    //Filtrerar ut kurskod, kursnam & progression och skickar tillbaka data
    const codes = data.map(course => course.code);
    const courseNames = data.map(course => course.coursename);
    const progressions = data.map(course => course.progression);

    //Skrivs ut till DOM
    
}

function filterData() {
    const searchPhrase = document.querySelector("#search").value;

    //Funktion att söka efter kurskod, kursnamn eller progression med både stora och små boktäver
    const filteredData = courses.filter(course =>
        course.code.toLowerCase().includes(searchPhrase.toLowerCase()) ||
        course.coursename.toLowerCase().includes(searchPhrase.toLowerCase()) ||
        course.progression.toLowerCase().includes(searchPhrase.toLowerCase())
    );

    printCourses(filteredData);
}