// Evnet listener for search button click
document.getElementById('search-btn').addEventListener('click', function () {
    loadProcess(12);
});

// Evnet listener for search enter key press
document.getElementById('search-input').addEventListener('keydown', function (event) {
    if (event.key === "Enter") {
        loadProcess(12);
    }
})

// Event listener for show all products button
document.getElementById('show-all-btn').addEventListener('click', function () {
    loadProcess();
})

// Function for limited product data load
const loadProcess = limit => {
    displayLoader(true);
    const searchInput = document.getElementById('search-input').value;
    loadPhones(searchInput, limit);
}

// Function to load products data
const loadPhones = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);
}

// Function to display products
const displayPhones = (phones, dataLimit) => {
    // Clear previous products data after new search
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.innerHTML = '';

    // No products found message condition
    const resultMessage = document.getElementById('result-message')
    if (phones.length === 0) {
        resultMessage.classList.remove('d-none');
    } else {
        resultMessage.classList.add('d-none');
    }

    // Show all button condition
    const showAllBtn = document.getElementById('show-all');
    if (phones.length > 12 && dataLimit) {
        phones = phones.slice(0, 12);
        showAllBtn.classList.remove('d-none');
    } else {
        showAllBtn.classList.add('d-none');
    }

    // Display products
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card">
            <img src="${phone.image}" class="card-img-top pt-4 px-5" alt="...">
            <div class="card-body text-center">
                <h5 class="card-title">${phone.brand}</h5>
                <p class="card-text">${phone.phone_name}</p>
                <button onclick="openPhoneDetailsModal('${phone.slug}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetails">More Details</button>
            </div>
        </div>
        `;
        phonesContainer.appendChild(phoneDiv);
    });
    displayLoader(false);
};

// Function to load phone details
const openPhoneDetailsModal = async (phoneId) => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`
    const res = await fetch(url);
    const data = await res.json();
    showPhoneDetails(data.data);
}

// Function to show phone details
const showPhoneDetails = (phone) => {
    const phoneName = document.getElementById('phone-name');
    const phoneDetails = document.getElementById('phone-details');

    phoneName.innerText = phone.name;
    phoneDetails.innerHTML = `
    <p><span class="fw-bold">Brand :</span> ${phone.brand}</p>
    <p><span class="fw-bold">Release Date :</span> ${phone.releaseDate ? phone.releaseDate : 'No realease date found'}</p>
    <p><span class="fw-bold">Storage & Memory :</span> ${phone.mainFeatures.memory ? phone.mainFeatures.memory : 'No information found'}</p>
    <p><span class="fw-bold">Display :</span> ${phone.mainFeatures.displaySize ? phone.mainFeatures.displaySize : 'No information found'}</p>
    <p><span class="fw-bold">Chipset :</span> ${phone.mainFeatures.chipSet ? phone.mainFeatures.chipSet : 'No information found'}</p>
    <p><span class="fw-bold">Sensors :</span> ${sensorDetails(phone.mainFeatures.sensors)}</p>
    <p><span class="fw-bold">Others :</span><br>${othersDetail(phone.others)}</p>
    `;

    // Function to display sensor details
    function sensorDetails(sensorDetail) {
        if (sensorDetail.length === 0) {
            return 'No sensor found';
        }
        let sensors = '';
        for (let sensor of sensorDetail) {
            sensors += `${sensor}, `
        }
        return sensors;
    }

    // Function to display other details
    function othersDetail(otherDetail) {
        if (otherDetail.length === 0) {
            return 'No other details found';
        }
        let keys = '';
        for (let key in otherDetail) {
            keys += `${key}: ${otherDetail[key]},<br>`;
        }
        return keys;
    }
}

// Function to show loader animation
const displayLoader = (show) => {
    const loader = document.getElementById('loader');
    if (show) {
        loader.classList.remove('d-none');
    } else {
        loader.classList.add('d-none');
    }
}