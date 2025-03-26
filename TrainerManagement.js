document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("trainer-form");
    const trainersResults = document.getElementById("trainersResults");
    const bookingsList = document.getElementById("bookingsList");
    const viewBookingsBtn = document.getElementById("viewBookingsBtn");

    if (viewBookingsBtn) {
        viewBookingsBtn.addEventListener("click", function () {
            window.location.href = "YourBookings.html";
        });
    }

    // Simulating a logged-in user (you can replace this with real login logic)
    const loggedInUser = "John Doe"; // Change this as needed to simulate different users

    const trainers = [
        {name: "Jane Smith", expertise: "Lecture", location: "Gauteng", availability: "Available", rate: 1500, about: "With over 10 years experience Jane is an industry expert in her field and has been a Lecture at different institutions, Most of her clients are corporate based but has mentors individuals", image: "images/Jane.jpg"},
        {name: "Charlie Hardson", expertise: "Mathametics lecture", location: "Kwazulu-Natal", availability: "Not Available", rate: 1200, about: "Charlie is an  Applied Mathematician professor who has taught 500+ students", image: "images/Charlie.jpg"},
        {name: "Tshiamo Serrano", expertise: "Networking Online educator", location: "Western Cape", availability: "Available", rate: 1300, about: "A certificate Holder of the CCNA and CCNP, There is alot experience to go around. Former network architecture at SAA.", image: "images/Tshiamo.jpg"},
        {name: "Blessing Bridge", expertise: "SOC Analyst", location: "Mpumalanga", availability: "Available", rate: 1000, about: "His a certificate holder of the CCNP SP which qualifies him to be our cybersecurity facilitator", image: "images/Blessing.jpg"},
        {name: "Drea Mashele", expertise: "CyberSecurity", location: "Limpopo", availability: "Not Available", rate: 900, about: "highly qualified cybersecurity expert, and is vendor certified with compTia", image: "images/drea.jpg"},
        {name: "Noah Lang", expertise: "Leadership and team building trainer", location: "Eastern Cape", availability: "Available", rate: 2000, about: "Has run leadership classes for the likes of ABSA, TELKOM and Microsoft", image: "images/Noah.jpg"},
        {name: "Christina Jacob", expertise: "Web development", location: "Free State", availability: "Available", rate: 1500, about: "5+ years of web development facilitator, lead developer for UnderArmour", image: "images/Christina.jpg"},
        {name: "Cara Sky", expertise: "Career development and leadership mentor", location: "North West", availability: "Available", rate: 1500, about: "mentors young professionals in career development and leadership", image: "images/Cara.jpg"},
        {name: "Jonathen Claus", expertise: "personal growth mentor", location: "Northern Cape", availability: "Not Available", rate: 1100, about: "Dylan provides guidance on personal growth and goal setting. Works with alot of corporate members", image: "images/Jonathen.jpg"}
    ];

    let userBookings = [
        {userName: "John Doe", trainerName: "Bonang Matheba", bookingStatus: "Pending"},
        {userName: "Jane Smith", trainerName: "Kim Englbrecht", bookingStatus: "Pending"},
        {userName: "John Doe", trainerName: "Atandwa Kani", bookingStatus: "Accepted"},
        {userName: "John Doe", trainerName: "Drea Mashel", bookingStatus: "Accepted"},
    ];

    let selectedTrainer = null;

    function displayTrainers() {
        trainersResults.innerHTML = "";
        trainers.forEach(trainer => {
            const trainerDiv = document.createElement('div');
            trainerDiv.classList.add('facilitator');
            trainerDiv.innerHTML = `
                <img src="${trainer.image}" class="small-circle">
                <h3>${trainer.name}</h3>
                <p>Expertise: ${trainer.expertise}</p>
                <p>Location: ${trainer.location}</p>
                <p>Availability: ${trainer.availability}</p>
                <button class="select-trainer-btn">Select</button>
            `;
            trainersResults.appendChild(trainerDiv);

            const selectBtn = trainerDiv.querySelector('.select-trainer-btn');
            selectBtn.addEventListener('click', function() {
                selectTrainer(trainer.name);
            });
        });
    }

    function selectTrainer(name) {
        selectedTrainer = trainers.find(trainer => trainer.name === name);
        if (selectedTrainer) {
            document.getElementById("name").value = selectedTrainer.name;
            document.getElementById("expertise").value = selectedTrainer.expertise;
            document.getElementById("experience").value = selectedTrainer.experience || 0;
            document.getElementById("certifications").value = selectedTrainer.certifications || "";
            document.getElementById("rate").value = selectedTrainer.rate;
            document.getElementById("availability").value = selectedTrainer.availability;
            document.getElementById("previewImage").src = selectedTrainer.image || "";
        }
    }

    const profilePictureInput = document.getElementById("profilePicture");
    profilePictureInput.addEventListener("change", function(event) {
        const file = event.target.files[0];
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const previewImage = document.getElementById("previewImage");
                previewImage.src = e.target.result;
                if (selectedTrainer) {
                    selectedTrainer.image = e.target.result;
                }
            };
            reader.readAsDataURL(file);
        } else {
            alert("Please select a valid image file.");
        }
    });

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        if (selectedTrainer) {
            selectedTrainer.name = document.getElementById("name").value;
            selectedTrainer.expertise = document.getElementById("expertise").value;
            selectedTrainer.experience = document.getElementById("experience").value;
            selectedTrainer.certifications = document.getElementById("certifications").value;
            selectedTrainer.rate = document.getElementById("rate").value;
            selectedTrainer.availability = document.getElementById("availability").value;
            alert('Profile updated successfully!');
            displayTrainers();
        }
    });

    function displayBookings() {
        bookingsList.innerHTML = "";
        const filteredBookings = userBookings.filter(booking => booking.userName === loggedInUser);
        filteredBookings.forEach(booking => {
            const bookingDiv = document.createElement('div');
            bookingDiv.classList.add('booking-actions');
            bookingDiv.innerHTML = `
                <h4>Booking for ${booking.userName} with ${booking.trainerName}</h4>
                <p>Status: ${booking.bookingStatus}</p>
                <button class="accept" data-user="${booking.userName}" data-trainer="${booking.trainerName}">Accept</button>
                <button class="reject" data-user="${booking.userName}" data-trainer="${booking.trainerName}">Reject</button>
            `;
            bookingsList.appendChild(bookingDiv);
        });
    }

    displayTrainers();
    displayBookings();
});