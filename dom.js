const loadPhones = async (searchText) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data);


}

const displayPhones = phones => {
    const phonesContainer = document.getElementById('phones-container');
   phonesContainer.textContent = '';
   
   // display 9 phones
   phones = phones.slice(0,9);

   // display no phone found
   const noPhone = document.getElementById('no-found-msg');
   if(phones.length===0){
    noPhone.classList.remove('d-none');
   }
    else{
        noPhone.classList.add('d-none');
   }





   // display all phones
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card p-5">
        <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">"${phone.phone_name}"</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            </div>
        </div>
        `;
        phonesContainer.appendChild(phoneDiv)
    });
    // stop spinner

    toggleSpinner(false);
}



document.getElementById('btn-search').addEventListener('click', function (){
 // start spinner  
 toggleSpinner(true); 
    const searchField = document.getElementById('search-field');
     const searchText = searchField.value
     loadPhones(searchText);
})

const toggleSpinner = isLoading => {
    const spinnerSection = document.getElementById('spinner');
    if(isLoading){
        spinnerSection.classList.remove('d-none')
    }
    else{
        spinnerSection.classList.add('d-none');
    }



}

// loadPhones();


