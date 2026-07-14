/*=========================================================
                HMS PRO THEME
=========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    const body = document.body;

    const toggle = document.getElementById("themeToggle");

    if (!toggle) return;

    const icon = toggle.querySelector("i");

    /*=========================================
            LOAD SAVED THEME
    =========================================*/

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {

        body.classList.add("dark");

        if (icon) {

            icon.className = "fa-solid fa-sun";

        }

    } else {

        body.classList.remove("dark");

        if (icon) {

            icon.className = "fa-solid fa-moon";

        }

    }

    /*=========================================
            TOGGLE THEME
    =========================================*/

    toggle.addEventListener("click", () => {

        body.classList.toggle("dark");

        if (body.classList.contains("dark")) {

            localStorage.setItem("theme", "dark");

            if (icon) {

                icon.className = "fa-solid fa-sun";

            }

        } else {

            localStorage.setItem("theme", "light");

            if (icon) {

                icon.className = "fa-solid fa-moon";

            }

        }

    });

});