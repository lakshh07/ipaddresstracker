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
        var ip_url =  `https://geo.ipify.org/api/v1?apiKey=at_MgfhgdKioeGMxFUHKvd9GSdvCEX7l&ipAddress`;
    } else{
        var ip_url = `https://geo.ipify.org/api/v1?apiKey=at_MgfhgdKioeGMxFUHKvd9GSdvCEX7l&ipAddress=${default_ip}`
    }
    $(function() {
        $.getJSON(ip_url,
        function(json) {
            defaultAddress.textContent = json.ip;
            defaultLocation.textContent = json.location.region +", "+json.location.country;
            defaultVersion.textContent = json.location.timezone;
            defaultIsp.textContent = json.isp;
            if (json.location.lat == String || json.location.lng == String){
                map.setView([0,0], 13);
                L.marker([0.0]).addTo(map)
                .bindPopup(`Couldn't find your geolocation.`)
                .openPopup();
            } else {
                map.setView([json.location.lat , json.location.lng], 13);
                L.marker([json.location.lat , json.location.lng]).addTo(map)
                .bindPopup(`Your public location is ${json.location.city}.`)
                .openPopup();
            }
        }
        );
    });
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

  