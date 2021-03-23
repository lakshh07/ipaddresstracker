const ip_url = ('https://ipapi.co/json');
const defaultAddress = document.getElementById('ipaddress');
const defaultLocation = document.getElementById('iplocation');
const defaultVersion = document.getElementById('ipversion');
const defaultIsp = document.getElementById('ipisp');
const inputIp = document.getElementById('inputAdd');
const searchBtn = document.getElementById('submit');

const map = L.map('mapid');
    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

function getIPDetails(default_ip) {
    if (default_ip == undefined){
        var ip_url =  `https://ipapi.co/json`;
    } else{
        var ip_url = `https://ipapi.co/${default_ip}/json`
    }
    fetch(ip_url)
    .then(function(response) {
    return response.json();
    })
    .then(function(data) {
        defaultAddress.textContent = data.ip;
        defaultLocation.textContent = data.city +", "+data.country;
        defaultVersion.textContent = data.version;
        defaultIsp.textContent = data.org;
        map.setView([data.latitude , data.longitude], 13);
        L.marker([data.latitude , data.longitude]).addTo(map)
        .bindPopup(`Your public location ${data.country_capital}.`)
        .openPopup();
    })
}

searchBtn.addEventListener('click', e => {
    e.preventDefault()
    if (inputIp.value != '' && inputIp.value != null) {
        getIPDetails(inputIp.value)
        return
    }
    alert("Please enter a valid IP address");
});

document.addEventListener('load', getIPDetails());
