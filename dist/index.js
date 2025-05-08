"use strict";
import { Reader } from "@maxmind/geoip2-node";
let country = "US";
const databasePath = './geoip_dummy_database/GeoIP2-Country-Test.mmdb';
const testIP = "81.2.69.160/27";
const options = {
    cache: { max: 10000 },
    watchForUpdates: true,
    watchForUpdatesNonPersistent: true
};
geoip2_node_1.Reader.open(databasePath, options).then(reader => {
    country = reader.country(testIP);
});
function updateCountryInDOM() {
    const countryContainer = document.getElementById('country2');
    if (countryContainer) {
        countryContainer.textContent = country;
    }
}
updateCountryInDOM();
