// Variables declarations
const menuBtn = document.getElementById("show-list-btn");
const menu = document.getElementById("menu");
const landingContent = document.querySelector(".content");
const circleArr = document.querySelectorAll(".circle");
let currLandingHeader = 1;
const portfolioImages = document.querySelectorAll(".box");
const portfolioHiddenBlocks = document.querySelectorAll(".hide-element");
const portfolioMoreAnchor = document.querySelector(".more");
const shuffleAnchors = document.querySelectorAll(".shuffle-anchor");

//event
menuBtn.addEventListener("click", function () {
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

function incrementIndex() {
    currLandingHeader++;
    if (currLandingHeader == backgroundTextArr.length)
        currLandingHeader = 0;
}

function decrementIndex() {
    currLandingHeader--;
    if (currLandingHeader == -1)
        currLandingHeader = backgroundTextArr.length - 1;
}
function displayPrevBakground() {
    toggleActiveCircle();
    decrementIndex();
    toggleActiveCircle();
    updateLandingHeader();
}
function displayNextBakground() {
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
circleArr.forEach((circle) => {
    circle.addEventListener("click", function () {
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
/////////////////////////////////////////////////////////////////////////////////
// portfolio and filtering section
function toggleView(e) {
    const portfolioNotHiddenBlocks = document.querySelectorAll(".box:not(.hide-element)");
    e.preventDefault();
    //check presesnt blocks
    if([...portfolioNotHiddenBlocks].length > 8)
        showLess();
    else
        showAll();
    //update the button content
    toggleMoreLess();
}

function toggleMoreLess() {
    if(portfolioMoreAnchor.innerHTML.toLowerCase() == "more")
        portfolioMoreAnchor.innerHTML = "less";
    else
        portfolioMoreAnchor.innerHTML = "more";
}

function showAll() {
    //togle box display
    [...portfolioImages].forEach((box) => {
        box.classList.remove("hide-element");
    });
    //hide below elements
    // showLess();
}
// portfolio shuffling section anchors
shuffleAnchors.forEach(a => {
    a.addEventListener("click", function (event) {
        event.preventDefault();
        activateShuffelAnchor(event.target);
        const attrName = event.target.innerText;
        if(attrName == "All") {
            showAll();
            toggleMoreLess();
            portfolioMoreAnchor.style.display ="block";
        }
        else{
            portfolioMoreAnchor.style.display ="none";
            hideBox(attrName);
        }
    })
});

function activateShuffelAnchor(e) {
    //unactivate prev element
    const element = document.querySelector('.shuffle-anchor.active');
    element.classList.remove("active");
    //activate the new element
    e.classList.add("active");
}

function showLess() {
    [...portfolioImages].slice(8).forEach((box) => {
        const isHidden = box.classList.contains("hide-element");
        if(!isHidden)
            box.classList.add("hide-element");
        else
            console.log("already hidden");
    });
}

function hideBox(attributeName) {
    // console.log("att:"+attributeName);
    const secBoxesToHide = document.querySelectorAll(".box:not([category='"+attributeName+"'])");
    //hide all other elements
    [...secBoxesToHide].forEach(box => {
        box.classList.add("hide-element");
    });
    const filteredBoxes = document.querySelectorAll("[category='"+attributeName+"']");
    [...filteredBoxes].forEach(box => {
        box.classList.remove("hide-element");
    })
}