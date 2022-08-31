document.getElementById('search-btn').addEventListener('click', function () {
    loadProcess(12);
});

document.getElementById('search-input').addEventListener('keydown', function (event) {
    if (event.key === "Enter") {
        loadProcess(12);
    }
})

document.getElementById('show-all-btn').addEventListener('click', function () {
    loadProcess();
})

const loadProcess = limit => {
    displayLoader(true);
    const searchInput = document.getElementById('search-input').value;
    loadPhones(searchInput, limit);
}

const loadPhones = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);
}

const displayPhones = (phones, dataLimit) => {
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.innerHTML = '';

    const resultMessage = document.getElementById('result-message')
    if (phones.length === 0) {
        resultMessage.classList.remove('d-none');
    } else {
        resultMessage.classList.add('d-none');
    }

    const showAllBtn = document.getElementById('show-all');
    if (phones.length > 12 && dataLimit) {
        phones = phones.slice(0, 12);
        showAllBtn.classList.remove('d-none');
    } else {
        showAllBtn.classList.add('d-none');
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
    <p><span class="fw-bold">Brand :</span> ${phone.brand}</p>
    <p><span class="fw-bold">Release Date :</span> ${phone.releaseDate ? phone.releaseDate : 'No realease date found'}</p>
    <p><span class="fw-bold">Storage & Memory :</span> ${phone.mainFeatures.memory ? phone.mainFeatures.memory : 'No information found'}</p>
    <p><span class="fw-bold">Display :</span> ${phone.mainFeatures.displaySize ? phone.mainFeatures.displaySize : 'No information found'}</p>
    <p><span class="fw-bold">Chipset :</span> ${phone.mainFeatures.chipSet ? phone.mainFeatures.chipSet : 'No information found'}</p>
    <p><span class="fw-bold">Sensors :</span> ${sensorDetails(phone.mainFeatures.sensors)}</p>
    <p><span class="fw-bold">Others :</span><br>${othersDetail(phone.others)}</p>
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