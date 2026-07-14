/*=============================================
        SIDEBAR
=============================================*/

const sidebar=document.querySelector(".sidebar");

const main=document.querySelector(".main");

const toggle=document.getElementById("toggleSidebar");

const overlay=document.querySelector(".sidebar-overlay");

/*=============================================
        TOGGLE
=============================================*/

toggle.addEventListener("click",()=>{

if(window.innerWidth<=768){

sidebar.classList.toggle("mobile-open");

overlay.classList.toggle("active");

}

else{

sidebar.classList.toggle("collapsed");

main.classList.toggle("expanded");

}

});

/*=============================================
        CLOSE MOBILE
=============================================*/

overlay.addEventListener("click",()=>{

sidebar.classList.remove("mobile-open");

overlay.classList.remove("active");

});

/*=============================================
        RESIZE
=============================================*/

window.addEventListener("resize",()=>{

if(window.innerWidth>768){

sidebar.classList.remove("mobile-open");

overlay.classList.remove("active");

}

});