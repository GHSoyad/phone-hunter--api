const phonesContainer = document.getElementById('phones-container');

document.getElementById('search-btn').addEventListener('click', function () {
    phonesContainer.innerHTML = '';
    displayLoader(true);
    loadPhones('apple');
});

const loadPhones = async (searchText) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data);
}

const displayPhones = (data) => {
    data.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card">
            <img src="${phone.image}" class="card-img-top pt-4 px-5" alt="...">
            <div class="card-body text-center">
                <h5 class="card-title">${phone.brand}</h5>
                <p class="card-text">${phone.phone_name}</p>
                <button class="btn btn-primary">Details</button>
            </div>
        </div>
        `;
        phonesContainer.appendChild(phoneDiv);
    });
    displayLoader(false);
};

const displayLoader = (show) => {
    const loader = document.getElementById('loader');
    if (show) {
        loader.classList.remove('d-none');
    } else {
        loader.classList.add('d-none');
    }
}