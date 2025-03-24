document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("trainer-form");
    const trainersResults = document.getElementById("trainersResults");
    const bookingsList = document.getElementById("bookingsList");

    // Simulating a logged-in user (you can replace this with real login logic)
    const loggedInUser = "John Doe"; // Change this as needed to simulate different users

    const trainers = [
        {name: "Bonang Matheba", expertise: "Lecture", location: "Gauteng", availability: "Available", rate: 1500, about: "Bonang is an expert in public speaking and lectures on business communication. She has 10 years of experience.", image: "images/bonang.jpg"},
        {name: "Pearl Thusi", expertise: "Online Educator", location: "Kwazulu-Natal", availability: "Not Available", rate: 1200, about: "Pearl specializes in online education for mathematics and has taught over 500 students.", image: "images/pearl.jpg"},
        {name: "Kim Englbrecht", expertise: "Online Educator", location: "Western Cape", availability: "Available", rate: 1300, about: "Kim focuses on digital learning and has created numerous online courses.", image: "images/kim.jpg"},
        {name: "Hungani Ndlovu", expertise: "Teacher", location: "Mpumalanga", availability: "Available", rate: 1000, about: "Hungani is a certified teacher with a passion for science and technology.", image: "images/hungani.jpg"},
        {name: "Thuso Mbedu", expertise: "Teacher", location: "Limpopo", availability: "Not Available", rate: 900, about: "Thuso specializes in early childhood education and has worked with special needs children.", image: "images/thuso.jpg"},
        {name: "Atandwa Kani", expertise: "Corporate Trainer", location: "Eastern Cape", availability: "Available", rate: 2000, about: "Athandwa provides corporate training on leadership and team building.", image: "images/athandwa.jpg"},
        {name: "Drea Mashel", expertise: "Tutor", location: "Free State", availability: "Available", rate: 800, about: "Drea is a language tutor specializing in all South African languages.", image: "images/drea.jpg"},
        {name: "Charlise Theron", expertise: "Mentor", location: "North West", availability: "Available", rate: 1500, about: "Charlise mentors young professionals in career development and leadership.", image: "images/charlise.jpg"},
        {name: "Dylan Efron", expertise: "Mentor", location: "Northern Cape", availability: "Not Available", rate: 1100, about: "Dylan provides guidance on personal growth and goal setting.", image: "images/dylan.jpg"}
    ];

    // This should contain the bookings made by all users
    let userBookings = [
        {userName: "John Doe", trainerName: "Bonang Matheba", bookingStatus: "Pending"},
        {userName: "Jane Smith", trainerName: "Kim Englbrecht", bookingStatus: "Pending"},
        {userName: "John Doe", trainerName: "Atandwa Kani", bookingStatus: "Accepted"},
        {userName: "John Doe", trainerName: "Drea Mashel", bookingStatus: "Accepted"},
    ];

    let selectedTrainer = null; // Variable to store selected trainer for profile update

    // Display trainers (Only Available ones)
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

            // Add event listener for Select button
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

            // Show current profile picture
            document.getElementById("previewImage").src = selectedTrainer.image || "";
        }
    }

    // Handle profile picture upload
    const profilePictureInput = document.getElementById("profilePicture");
    profilePictureInput.addEventListener("change", function(event) {
        const file = event.target.files[0];
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const previewImage = document.getElementById("previewImage");
                previewImage.src = e.target.result;
                if (selectedTrainer) {
                    selectedTrainer.image = e.target.result; // Update the selected trainer's image
                }
            };
            reader.readAsDataURL(file);
        } else {
            alert("Please select a valid image file.");
        }
    });

    // Form submission handling to update the profile
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent the form from reloading the page

        if (selectedTrainer) {
            // Update the selected trainer's data with the form input values
            selectedTrainer.name = document.getElementById("name").value;
            selectedTrainer.expertise = document.getElementById("expertise").value;
            selectedTrainer.experience = document.getElementById("experience").value;
            selectedTrainer.certifications = document.getElementById("certifications").value;
            selectedTrainer.rate = document.getElementById("rate").value;
            selectedTrainer.availability = document.getElementById("availability").value;

            // Show a success message
            alert('Profile updated successfully!');

            // Update the trainer display to reflect the changes
            displayTrainers();
        }
    });

    // Display the bookings for the logged-in user only
    function displayBookings() {
        bookingsList.innerHTML = "";

        // Filter bookings to show only the ones made by the logged-in user
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

            // Add event listeners for Accept and Reject buttons
            const acceptBtn = bookingDiv.querySelector('.accept');
            const rejectBtn = bookingDiv.querySelector('.reject');
            acceptBtn.addEventListener('click', function() {
                updateBookingStatus(acceptBtn.dataset.user, acceptBtn.dataset.trainer, 'Accepted');
            });
            rejectBtn.addEventListener('click', function() {
                updateBookingStatus(rejectBtn.dataset.user, rejectBtn.dataset.trainer, 'Rejected');
            });
        });
    }

    function updateBookingStatus(userName, trainerName, status) {
        const booking = userBookings.find(b => b.userName === userName && b.trainerName === trainerName);
        if (booking) {
            booking.bookingStatus = status;
            displayBookings();
        }
    }

    // Display the trainers and the bookings (for the logged-in user)
    displayTrainers();
    displayBookings();
});
