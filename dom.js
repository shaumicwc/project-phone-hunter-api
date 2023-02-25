const loadPhones = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);
}

const displayPhones = (phones, dataLimit) => {
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.textContent = '';

    // display 9 phones
    const showAll = document.getElementById('show-all');

    if (dataLimit && phones.length > 6) {
        phones = phones.slice(0, 6);
        showAll.classList.remove('d-none');
    }
    else {
        showAll.classList.add('d-none');
    }

    // display no phone found
    const noPhone = document.getElementById('no-found-msg');

    // display all phones
    phones.forEach(phone => {
        // console.log(phone.slug)
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card p-5 bg-secondary d-flex justify-content-center align-items-center">
        <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text"></p>
                <button type="button" onclick="loadPhonesDetails('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetails">
                    Details
                </button>
            </div>
        </div>
        `;
        phonesContainer.appendChild(phoneDiv)
    });
    // stop spinner

    toggleSpinner(false);
}
const searchField = document.getElementById('search-field');
const processSearch = (dataLimit) => {
    toggleSpinner(true);
    const searchText = searchField.value
    loadPhones(searchText, dataLimit)
}
searchField.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        processSearch(6);
    }
});
document.getElementById('btn-search').addEventListener('click', function () {
    // start spinner  
    processSearch(6);
})

const toggleSpinner = isLoading => {
    const spinnerSection = document.getElementById('spinner');
    if (isLoading) {
        spinnerSection.classList.remove('d-none')
    }
    else {
        spinnerSection.classList.add('d-none');
    }
}

document.getElementById('btn-show-all').addEventListener('click', function () {
    processSearch();
})

// display phone details
const loadPhonesDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhonesDetails(data)
}
const displayPhonesDetails = phone => {
    const phoneName = document.getElementById('phoneDetailsName');
    const phoneDetails = document.getElementById('phone-details');
    phoneName.innerText = phone.data.name;
    phoneDetails.innerHTML = `
    <img src="${phone.data.image}" alt="">
    <p>Brand: ${phone.data.brand}</p>
    <p>Release-date: ${phone.data.releaseDate}</p>
    <p>Storage: ${phone.data.mainFeatures.storage}<br>
    Chipset: ${phone.data.mainFeatures.chipSet}<br>
    Memory: ${phone.data.mainFeatures.memory}<br>
    Display-size: ${phone.data.mainFeatures.displaySize}<br>
    Sensors: ${phone.data.mainFeatures.sensors}
    </p>
    `;
}