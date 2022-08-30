document.getElementById('search-btn').addEventListener('click', function () {
    const searchInput = document.getElementById('search-input').value;
    displayLoader(true);
    loadPhones(searchInput);
});

const loadPhones = async (searchText) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data);
}

const displayPhones = (phones) => {
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.innerHTML = '';

    const resultMessage = document.getElementById('result-message')
    if (phones.length === 0) {
        resultMessage.classList.remove('d-none');
    } else {
        resultMessage.classList.add('d-none');
    }

    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card">
            <img src="${phone.image}" class="card-img-top pt-4 px-5" alt="...">
            <div class="card-body text-center">
                <h5 class="card-title">${phone.brand}</h5>
                <p class="card-text">${phone.phone_name}</p>
                <button onclick="openPhoneDetailsModal('${phone.slug}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetails">Details</button>
            </div>
        </div>
        `;
        phonesContainer.appendChild(phoneDiv);
    });
    displayLoader(false);
};

const openPhoneDetailsModal = async (phoneId) => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`
    const res = await fetch(url);
    const data = await res.json();
    showPhoneDetails(data.data);
}

const showPhoneDetails = (phone) => {
    const phoneName = document.getElementById('phone-name');
    const phoneDetails = document.getElementById('phone-details');

    phoneName.innerText = phone.name;
    phoneDetails.innerHTML = `
    <p>Brand: ${phone.brand}</p>
    <p>Release Date: ${phone.releaseDate ? phone.releaseDate : 'No realease date found'}</p>
    <p>Storage & Memory: ${phone.mainFeatures.memory ? phone.mainFeatures.memory : 'No information found'}</p>
    <p>Display: ${phone.mainFeatures.displaySize ? phone.mainFeatures.displaySize : 'No information found'}</p>
    <p>Chipset: ${phone.mainFeatures.chipSet ? phone.mainFeatures.chipSet : 'No information found'}</p>
    <p>Sensors: ${sensorDetails(phone.mainFeatures.sensors)}</p>
    <p>Others:<br>${othersDetail(phone.others)}</p>
    `;

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

const displayLoader = (show) => {
    const loader = document.getElementById('loader');
    if (show) {
        loader.classList.remove('d-none');
    } else {
        loader.classList.add('d-none');
    }
}