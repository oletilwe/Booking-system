document.addEventListener("DOMContentLoaded", function () {
    const bookingsList = document.getElementById("bookingsList");

    const loggedInTrainer = "John Doe"; // Simulating the trainer logged in

    let trainerBookings = [
        { userName: "Samantha", trainerName: "John Doe", bookingStatus: "Pending" },
        { userName: "Pearl", trainerName: "John Doe", bookingStatus: "Pending" },
        { userName: "kevin", trainerName: "John Doe", bookingStatus: "Pending" }
    ];

    function displayBookings() {
        bookingsList.innerHTML = "";

        const filteredBookings = trainerBookings.filter(booking => booking.trainerName === loggedInTrainer);

        filteredBookings.forEach(booking => {
            const bookingDiv = document.createElement("div");
            bookingDiv.classList.add("booking-actions");
            bookingDiv.innerHTML = `
                <h4>Booking from ${booking.userName}</h4>
                <p>Status: ${booking.bookingStatus}</p>
                <button class="accept" data-user="${booking.userName}">Accept</button>
                <button class="reject" data-user="${booking.userName}">Reject</button>
            `;
            bookingsList.appendChild(bookingDiv);

            const acceptBtn = bookingDiv.querySelector(".accept");
            const rejectBtn = bookingDiv.querySelector(".reject");

            acceptBtn.addEventListener("click", function () {
                updateBookingStatus(acceptBtn.dataset.user, "Accepted");
            });

            rejectBtn.addEventListener("click", function () {
                updateBookingStatus(rejectBtn.dataset.user, "Rejected");
            });
        });
    }

    function updateBookingStatus(userName, status) {
        const booking = trainerBookings.find(b => b.userName === userName && b.trainerName === loggedInTrainer);
        if (booking) {
            booking.bookingStatus = status;
            displayBookings();
        }
    }

    displayBookings();
});

