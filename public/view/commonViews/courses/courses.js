let userCoursesList = [];

// Function to print courses
function printCourses() {
    let cardsBlock = document.getElementById('courses');
    cardsBlock.innerHTML = ''; // Clear previous content

    coursesList.forEach(element => {
        // Create a message indicating work done percentage
        let workDoneMessage = `${element.porcent} ${element.workDone}`;
        
        // Create card div
        let cardDiv = document.createElement('div');
        cardDiv.className = "card"; // Use className instead of id for repeated elements
        cardDiv.id = element.id; // Unique identifier for the card
        cardDiv.addEventListener('click', clickCard); // Attach click event
        cardsBlock.appendChild(cardDiv); // Append card to the container

        // Create card image
        let cardImg = document.createElement('img');
        cardImg.src = element.image; // Set image source
        cardImg.alt = element.title; // Provide alt text for accessibility
        cardDiv.appendChild(cardImg); // Append image to the card

        // Create card title
        let cardTitle = document.createElement('h1');
        cardTitle.className = "card__title"; // Change from id to className for multiple elements
        cardTitle.innerHTML = element.title; // Set title text
        cardDiv.appendChild(cardTitle); // Append title to the card

        // Create card text
        let cardText = document.createElement('p');
        cardText.className = "card__text"; // Change from id to className for multiple elements
        cardText.innerHTML = workDoneMessage; // Set text for work done message
        cardDiv.appendChild(cardText); // Append text to the card
    });

    // Store the list of courses for later use
    userCoursesList = coursesList;
}

// Function to handle card click events
function clickCard(event) {
    const id = event.currentTarget.id; // Get the ID of the clicked card

    // Find the course that matches the clicked card's ID
    userCoursesList.forEach(element => {
        if (element.id === id) { // Use strict equality
            // Store selected course in session storage
            sessionStorage.setItem("course", JSON.stringify(element));
            // Redirect to the course tasks page
            window.location.href = "/public/view/commonViews/coursesTasks/coursesTask.html";
        }
    });
}
