// Variables declarations
const menuBtn = document.getElementById("show-list-btn");
const menu = document.getElementById("menu");
//event
menuBtn.addEventListener("click",function(){
    menu.classList.toggle("small-screen-list");
    console.log("clicked")
})