// Variables declarations
const menuBtn = document.getElementById("show-list-btn");
const menu = document.getElementById("menu");
const landingContent = document.querySelector(".content");
const circleArr = document.querySelectorAll(".circle");
let currLandingHeader = 1;

//event
menuBtn.addEventListener("click",function(){
    menu.classList.toggle("small-screen-list");
    console.log("clicked")
})

//conent of landing script
const backgroundTextArr = 
[
    "<h2>Unlock Explosive <br>Growth with Kasper</h2><p>Tired of stagnant marketing results? Kasper is here to help. We create data-driven campaigns that deliver real results, from boosting brand awareness to driving conversions.</p>",
    "<h2>Craft Stories <br> Captivate Audience</h2><p>Kasper helps you craft powerful narratives that resonate with your target audience. We develop engaging content across all channels, from social media to email marketing, to drive meaningful engagement.</p>",
    "<h2>Kasper<br>Creative Powerhouse</h2><p>Kasper's team of creative experts helps you design a unique brand identity that stands out from the competition. From website design to video production, we create stunning visuals that tell your brand story.</p>"
  ];
  
function incrementIndex () {
    currLandingHeader++;
    if(currLandingHeader == backgroundTextArr.length)
        currLandingHeader = 0;
}

function decrementIndex () {
    currLandingHeader--;
    if(currLandingHeader == -1)
    currLandingHeader = backgroundTextArr.length - 1;
}
function displayPrevBakground(){
    toggleActiveCircle();
    decrementIndex();
    toggleActiveCircle();
    updateLandingHeader();
}
function displayNextBakground(){
    toggleActiveCircle();
    incrementIndex();
    toggleActiveCircle();
    updateLandingHeader();
}
function updateLandingHeader() {
    landingContent.innerHTML = backgroundTextArr[currLandingHeader];
}

function toggleActiveCircle() {
    circleArr[currLandingHeader].classList.toggle("active");
}

//bullets events add
circleArr.forEach((circle)=> {
    circle.addEventListener("click",function(){
        //read the clicked circle order
        console.log(parseInt(circle.dataset.circleOrder));
        // untoggle the prev circle
        toggleActiveCircle();
        //update the index
        currLandingHeader = parseInt(circle.dataset.circleOrder);
        // activate the current circle
        toggleActiveCircle();
        // update content of the container
        updateLandingHeader();
    })
})