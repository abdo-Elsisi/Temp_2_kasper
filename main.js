// Variables declarations
//header vars
const menuBtn = document.getElementById("show-list-btn");
const menu = document.getElementById("menu");
//landing vars
const landingContent = document.querySelector(".content");
const landingSec = document.querySelector(".landing");
const landingChangeBackgroundBtns = document.querySelectorAll(".change-background");
let landingBackgroundInterval;
const circleArr = document.querySelectorAll(".circle");
let currLandingHeader = 1;
//conent of landing headers
const backgroundTextArr =
    [
        "<h2>Unlock Explosive <br>Growth</h2><p>Tired of stagnant marketing results? Kasper is here to help. We create data-driven campaigns that deliver real results, from boosting brand awareness to driving conversions.</p>",
        "<h2>Craft Stories <br> Captivate Audience</h2><p>Kasper helps you craft powerful narratives that resonate with your target audience. We develop engaging content across all channels, from social media to email marketing, to drive meaningful engagement.</p>",
        "<h2>Kasper<br>Creative Powerhouse</h2><p>Kasper's team of creative experts helps you design a unique brand identity that stands out from the competition. From website design to video production, we create stunning visuals that tell your brand story.</p>"
    ];
//landing background images
const backgroundImageArr = ["landing2.jpg", "landing.jpg", "landing3.jpg"]
//portfolio var
const portfolioImages = document.querySelectorAll(".box");
const portfolioHiddenBlocks = document.querySelectorAll(".hide-element");
const portfolioMoreAnchor = document.querySelector(".more");
const shuffleAnchors = document.querySelectorAll(".shuffle-anchor");
// recommendation section var
const cir = document.querySelectorAll(".cir");
const recommendationContainer = document.querySelector(".recommendation-container");
const recommendations = [
    [
        `<div class="recommendation" signature="Jane Doe, Marketing Manager">
        <img src="imgs/skills-05.jpg" alt="profile pic">
        <p>Kaspers digital marketing strategies have been instrumental in boosting our brand awareness</p></div>
      <div class="recommendation" signature="Peter Smith, CEO">
        <img src="imgs/skills-06.jpg" alt="profile pic">
        <p>Working with Kasper has been a true pleasure. They are professional, responsive.</p>
      </div>`
    ],
    [
        `<div class="recommendation" signature="Maria Garcia, Founder">
        <img src="imgs/skills-01.jpg" alt="profile pic">
        <p>I was initially hesitant to invest in digital marketing, but after working with Kasper.</p>
      </div>
      <div class="recommendation" signature="David Li, Entrepreneur">
        <img src="imgs/skills-02.jpg" alt="profile pic">
        <p>Kasper's data-driven approach to digital marketing is what truly sets them apart.</p>
      </div>`
    ],
    [
        `<div class="recommendation" signature="Sarah Jones, Marketing Director">
        <img src="imgs/skills-03.jpg" alt="profile pic">
        <p>Kasper's ability to think outside the box and come up with innovative solutions is what I value most.</p>
      </div>
      <div class="recommendation" signature="Michael Brown, CEO">
        <img src="imgs/skills-04.jpg" alt="profile pic">
        <p>Kasper's commitment to client satisfaction is truly exceptional. They are always available</p>
      </div>`
    ]
];
//review section var
const progressBars = document.querySelectorAll(".front-bar");

//menu button click event
menuBtn.addEventListener("click", function () {
    menu.classList.toggle("small-screen-list");
    console.log("clicked")
})

//index of current landing background image and text displayed update
function incrementIndex() {
    currLandingHeader++;
    if (currLandingHeader == backgroundTextArr.length)
        currLandingHeader = 0;
}

//index of current landing background image and text displayed update
function decrementIndex() {
    currLandingHeader--;
    if (currLandingHeader == -1)
        currLandingHeader = backgroundTextArr.length - 1;
}

//landing move left clicked
function displayPrevBakground() {
    toggleActiveCircle();
    decrementIndex();
    toggleActiveCircle();
    updateLandingHeader();
    updateLandingImage();
}

//landing move right clicked
function displayNextBakground() {
    toggleActiveCircle();
    incrementIndex();
    toggleActiveCircle();
    updateLandingHeader();
    updateLandingImage();
}

//landing autochange background
function autochangeBackground() {
    landingBackgroundInterval = setInterval(function () {
        //get next background
        displayNextBakground();
    }, 4000);
}
//call the function to start auto changing background
autochangeBackground();
//stop auto changing background
function pauseAutoChange() {
    clearInterval(landingBackgroundInterval);
}
landingChangeBackgroundBtns.forEach((btn) => {
    //stop auto changing background when user hoover over left and right buttons
    btn.addEventListener("mouseover", pauseAutoChange);
    //continue auto changing background when user mouseout left and right buttons
    btn.addEventListener("mouseout", autochangeBackground);
})

//update the header content of landing according to currLandingHeader index value
function updateLandingHeader() {
    landingContent.innerHTML = backgroundTextArr[currLandingHeader];
}

//update the background image of landing according to currLandingHeader index value
function updateLandingImage() {
    landingSec.style.backgroundImage = `url("../imgs/${backgroundImageArr[currLandingHeader]}")`;
}

//toggle activation style class for a bullet in the landing section
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
        updateLandingImage();

    })
})

// portfolio section MORE button was clicked
function toggleView(e) {
    const portfolioNotHiddenBlocks = document.querySelectorAll(".box:not(.hide-element)");
    e.preventDefault();
    //check presesnt blocks
    if ([...portfolioNotHiddenBlocks].length > 8)
        showLess();
    else
        showAll();
    //update the button content
    toggleMoreLess();
}

//portfolio section more button change text MORE~LESS
function toggleMoreLess() {
    if (portfolioMoreAnchor.innerHTML.toLowerCase() == "more")
        portfolioMoreAnchor.innerHTML = "less";
    else
        portfolioMoreAnchor.innerHTML = "more";
}

function showAll() {
    //togle box display
    [...portfolioImages].forEach((box) => {
        box.classList.remove("hide-element");
    });
}

// portfolio shuffling section anchors
shuffleAnchors.forEach(a => {
    a.addEventListener("click", function (event) {
        event.preventDefault();
        activateShuffelAnchor(event.target);
        const attrName = event.target.innerText;
        if (attrName == "All") {
            showAll();
            toggleMoreLess();
            portfolioMoreAnchor.style.display = "block";
        }
        else {
            portfolioMoreAnchor.style.display = "none";
            hideBox(attrName);
        }
    })
});

//style current active filter
function activateShuffelAnchor(e) {
    //unactivate prev element
    const element = document.querySelector('.shuffle-anchor.active');
    element.classList.remove("active");
    //activate the new element
    e.classList.add("active");
}

//portfolio less button was clicked
function showLess() {
    [...portfolioImages].slice(8).forEach((box) => {
        const isHidden = box.classList.contains("hide-element");
        if (!isHidden)
            box.classList.add("hide-element");
        else
            console.log("already hidden");
    });
}

//hide not selected box for portfolio section shuffling
function hideBox(attributeName) {
    const secBoxesToHide = document.querySelectorAll(".box:not([category='" + attributeName + "'])");
    //hide all other elements
    [...secBoxesToHide].forEach(box => {
        box.classList.add("hide-element");
    });
    const filteredBoxes = document.querySelectorAll("[category='" + attributeName + "']");
    [...filteredBoxes].forEach(box => {
        box.classList.remove("hide-element");
    })
}

// recommendation click bullets events.
cir.forEach((bullet, index) => {
    bullet.addEventListener("click", () => {
        recommendationContainer.innerHTML = recommendations[index];

        // Add active class to clicked bullet and remove from others
        cir.forEach(b => b.classList.remove("active"));
        bullet.classList.add("active");
    });
});

//review section progress bars loading animations
// Create an array of objects to store progress bar data
let progressData = [];
// Initialize data for each progress bar
progressBars.forEach((bar, index) => {
    progressData[index] = {
        bar,
        currentWidth: 0,
        percentage: parseInt(bar.getAttribute("percentage")),
        intervalId: null,
    };

    const animate = () => {
        progressData[index].currentWidth += 1; // Increase width by 1% in each step
        //assign new width to the bar
        progressData[index].bar.style.width = `${progressData[index].currentWidth}%`;
        //check if the bar reaced its final value
        if (progressData[index].currentWidth >= progressData[index].percentage) {
            clearInterval(progressData[index].intervalId); // Continue animation until target reached
        }
    };
//animate the bar when user scroll by it
    const handleScroll = () => {
        const rect = bar.getBoundingClientRect(); // Calculate rect on each scroll
        // !progressData[index].intervalId: condition prevent creating infinity interval with each scroll
        if (rect.top >= 0 && rect.bottom <= window.innerHeight && !progressData[index].intervalId) {
            //start animation, time step: 20ms
            progressData[index].intervalId = setInterval(animate, 20);
            //animation for the first time only user scroll over it
            window.removeEventListener("scroll", handleScroll);
        }
    };

    window.addEventListener("scroll", handleScroll);

});