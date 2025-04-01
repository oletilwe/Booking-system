
function searchTrainers() {
    let trainerList = document.getElementById('trainerList');
    let trainerResults = document.getElementById('trainerResults');
    trainerResults.innerHTML = "";

    let trainers = [
        {name: "Jane Smith", expertise: "Lecture", location: "Gauteng", availability: "Available", rate: 1500, about: "With over 10 years experience Jane is an industry expert in her field and has been a Lecture at different institutions, Most of her clients are corporate based but has mentors individuals", image: "images/Jane.jpg"},
        {name: "Charlie Hudson", expertise: "Mathametics lecture", location: "Kwazulu-Natal", availability: "Not Available", rate: 1200, about: "Charlie is an  Applied Mathematician professor who has taught 500+ students", image: "images/Charlie.jpg"},
        {name: "Tshiamo Serrano", expertise: "Networking Online educator", location: "Western Cape", availability: "Available", rate: 1300, about: "A certificate Holder of the CCNA and CCNP, There is alot experience to go around. Former network architecture at SAA.", image: "images/Tshiamo.jpg"},
        {name: "Blessing Bridge", expertise: "SOC Analyst", location: "Mpumalanga", availability: "Available", rate: 1000, about: "His a certificate holder of the CCNP SP which qualifies him to be our cybersecurity facilitator", image: "images/Blessing.jpg"},
        {name: "Drea Mashele", expertise: "CyberSecurity", location: "Limpopo", availability: "Not Available", rate: 900, about: "highly qualified cybersecurity expert, and is vendor certified with compTia", image: "images/drea.jpg"},
        {name: "Noah Lang", expertise: "Leadership and team building trainer", location: "Eastern Cape", availability: "Available", rate: 2000, about: "Has run leadership classes for the likes of ABSA, TELKOM and Microsoft", image: "images/Noah.jpg"},
        {name: "Christina Jacob", expertise: "Web development", location: "Free State", availability: "Available", rate: 1500, about: "5+ years of web development facilitator, lead developer for UnderArmour", image: "images/Christina.jpg"},
        {name: "Cara Sky", expertise: "Career development and leadership mentor", location: "North West", availability: "Available", rate: 1500, about: "mentors young professionals in career development and leadership", image: "images/Cara.jpg"},
        {name: "Jonathen Claus", expertise: "personal growth mentor", location: "Northern Cape", availability: "Not Available", rate: 1100, about: "Dylan provides guidance on personal growth and goal setting. Works with alot of corporate members", image: "images/Jonathen.jpg"}
    ];

    let searchQuery = document.getElementById('searchBox').value.toLowerCase();
    let locationQuery = document.getElementById('locationBox').value.toLowerCase();
    let availabilityQuery = document.getElementById('availabilityBox').value;
    
    let filtered = trainers.filter(t =>
        (t.expertise.toLowerCase().includes(searchQuery) || searchQuery === "") &&
        (t.location.toLowerCase().includes(locationQuery) || locationQuery === "") &&
        (t.availability === availabilityQuery || availabilityQuery === "")
    );
    
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
        trainerList.style.display = 'block';
    } else {
        trainerResults.innerHTML = "<p>No trainers found.</p>";

        trainerList.style.display = 'block';

        trainerList.style.display = 'block';  // Hide list if no results

    }
}

function viewProfile(name, expertise, location, availability, rate, about, image) {
    localStorage.setItem('selectedTrainer', JSON.stringify({ name, expertise, location, availability, rate, about, image }));
    window.location.href = 'trainer.html';
}


