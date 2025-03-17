
function searchTrainers() {
    let trainerList = document.getElementById('trainerList');
    let trainerResults = document.getElementById('trainerResults');
    trainerResults.innerHTML = "";

    // List of trainers
    let trainers = [
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

    // Get search query values
    let searchQuery = document.getElementById('searchBox').value.toLowerCase();
    let locationQuery = document.getElementById('locationBox').value.toLowerCase();
    let availabilityQuery = document.getElementById('availabilityBox').value;
    
    // Filter trainers based on search criteria
    let filtered = trainers.filter(t =>
        (t.expertise.toLowerCase().includes(searchQuery) || searchQuery === "") &&
        (t.location.toLowerCase().includes(locationQuery) || locationQuery === "") &&
        (t.availability === availabilityQuery || availabilityQuery === "")
    );
    
    // Display filtered trainers
    if (filtered.length > 0) {
        filtered.forEach(trainer => {
            trainerResults.innerHTML += `
                <div class='facilitator'>
                    <img src="${trainer.image}" class="small-circle">
                    <h3>${trainer.name}</h3>
                    <p>Expertise: ${trainer.expertise}</p>
                    <p>Location: ${trainer.location}</p>
                    <p>Availability: ${trainer.availability}</p>
                    <button onclick='viewProfile("${trainer.name}", "${trainer.expertise}", "${trainer.location}", "${trainer.availability}", "${trainer.rate}", "${trainer.about}", "${trainer.image}")'>View Profile</button>
                </div>
            `;
        });
        trainerList.style.display = 'block';  // Show results section
    } else {
        trainerResults.innerHTML = "<p>No trainers found.</p>";
        trainerList.style.display = 'none';  // Hide list if no results
    }
}

function viewProfile(name, expertise, location, availability, rate, about, image) {
    localStorage.setItem('selectedTrainer', JSON.stringify({ name, expertise, location, availability, rate, about, image }));
    window.location.href = 'trainer.html';  // Redirect to the trainer profile page
}

