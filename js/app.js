// Variables
//const card = document.querySelectorAll('.card');
const modalSection = document.querySelector('.modal-test');
const cardInfo = document.querySelector('.info');
const img = document.querySelector('.img');
const container = document.querySelector('.container');
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`;
const employees = [];

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
     .then(generateHTML)
    
    
    

//Functions
function generateHTML(person, index) {
    let employees = person;
    
    employees.forEach( (employee, index) => {
        let div = document.createElement('div');
    container.appendChild(div);
    let name = employee.name;
    let email = employee.email;
    let city = employee.city;
    let pic = employee.img;
    
    let html = 
`<div class="card" data-index="${index}" id="card">
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
    })
}

function displayModal(index) {
    let { name, dob, phone, email, location: { city, street, state, postcode
    }, picture } = employees[index];
    
    
    let modalHTML = 
    `<div class="overlay hidden">
        <div class="modal">
        <button class="modal-close">X</button>
                <div class="modal-content">
                <img class="avatar" src="${picture}" />
                <div class="text-container">
                <h2 class="name">${name}</h2>
                <p class="email">${email}</p>
                <p class="address">${city}</p>
                <hr />
                <p>${phone}</p>
                <p class="address">${street}, ${state} ${postcode}</p>
                <p>Birthday: ${dob}</p>
                </div>
            </div>
        </div>
    </div>`
    overlay.classList.remove('hidden');
    modalSection.innerHTML = modalHTML;
}




// Modal Interaction

container.addEventListener('click', function(e) {
    if (e.target !== container) {
        const card = e.target.closest('.card');
        const index = card.getAttribute('data-index');
        displayModal(index);
    }
})

console.log(employees);
