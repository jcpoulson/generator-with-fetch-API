// Variables
const card = document.querySelectorAll('.card');
const modalSection = document.querySelector('.modal-test');
const cardInfo = document.querySelector('.info');
const img = document.querySelector('.img');
const container = document.querySelector('.container');
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`;

//Fetch Request
fetch(urlAPI)
    .then(response => response.json())
    .then(data => data.results)
    .then(people => people.map(person => {
        person.name = person.name.first + ' ' + person.name.last;
        person.address = person.location.street.number + ' ' + person.location.street.name + ' ' + person.location.city + ', ' + person.location.state + ' ' + person.location.postcode;
        let dude = ({name: person.name, email: person.email, city: person.location.city, img: person.picture.large, phone: person.phone, dob: person.dob.date, address: person.address})
        return dude;
    }))
     .then(dude => dude.forEach(generateHTML))
    
    
    

//Functions
function generateHTML(person) {
    //Generates the user cards
    let div = document.createElement('div');
    container.appendChild(div);
    let name = person.name;
    let email = person.email;
    let city = person.city;
    let pic = person.img;
    
    let html = 
`<div class="card"/>
        <div class="img">
            <img src="${pic}">
        </div>
        <div class="info">
            <h1>${name}</h1>
            <p>${email}</p>
            <p>${city}</p>
        </div>
    </div>`
    div.innerHTML = html;


    //Generates the user modals
    let modalHTML = 
    `<div class="overlay hidden">
        <div class="modal">
        <button class="modal-close">X</button>
                <div class="modal-content">
                <img class="avatar" src="${person.img}" />
                <div class="text-container">
                <h2 class="name">${person.name}</h2>
                <p class="email">${person.email}</p>
                <p class="address">${person.city}</p>
                <hr />
                <p>${person.phone}</p>
                <p class="address">${person.address}</p>
                <p>Birthday: ${person.dob}</p>
                </div>
            </div>
        </div>
    </div>`
    let modal = document.createElement('div');
    modal.innerHTML = modalHTML;
    modalSection.appendChild(modal);
}

// Modal Interaction




