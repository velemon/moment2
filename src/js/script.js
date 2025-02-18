"use strict";

//Variabler
let courses = [];

//Funktion som körd när sidan laddas
window.onload = () => {
    loadCourses();

    //Händelselyssnare som filtrerar och sorterar
    document.querySelector("#search").addEventListener("input", filterData);
    document.querySelector("#code").addEventListener("click", sortCodes);
    document.querySelector("#courseName").addEventListener("click", sortCourses);
    document.querySelector("#progression").addEventListener("click", sortProgressions);
}

//Funktion för felhantering och hämntning av data
async function loadCourses() {
    try {

        //Variabel som lagrar respons när hämtningen är klar
        const response = await fetch("https://webbutveckling.miun.se/files/ramschema_ht24.json");

        //Kollar om hämtningen blir korrekt
        if (!response.ok) {
            throw new Error("Fel vid hämtning av data.")
        }

        //Skriver ut om hämtningen är korrekt
        courses = await response.json();
        printCourses(courses);

        //Ger felmeddelande om det blir fel vid hämtning
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

    //Skrivs ut till DOM
    data.forEach(course => {
        table.innerHTML +=
            `<tr><td>${course.code}</td><td>${course.coursename}</td><td>${course.progression}</td></tr>`;
    });
}

function filterData() {

    //Variabler
    const searchPhrase = document.querySelector("#search").value;
    
    //Funktion att söka efter kurskod, kursnamn eller progression med både stora och små boktäver
    const filteredData = courses.filter(course =>
        course.code.toLowerCase().includes(searchPhrase.toLowerCase()) ||
        course.coursename.toLowerCase().includes(searchPhrase.toLowerCase()) ||
        course.progression.toLowerCase().includes(searchPhrase.toLowerCase())
    );

    //Den filtrerade datan skickas vidare och skrivs ut till DOM
    printCourses(filteredData);
}

