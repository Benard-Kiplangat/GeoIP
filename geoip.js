async function getVisitorCountry() {
    const API_KEY = "ira_18RZXmbI2Sp6aiOAmb120D812vRt5b0dEr";
    const DEFAULT_COUNTRY = "US";
    let countryOnLocalStorage = "";

    // Check local storage for saved data
    const savedVisitorCountry = localStorage.getItem(countryOnLocalStorage);
    if (savedVisitorCountry) {
        const parsedVisitorCountry = JSON.parse(savedVisitorCountry);
        const savedDate = new Date(parsedVisitorCountry.date);
        const today = new Date();

        // If the saved data is from today, use it
        if (savedDate.toDateString() === today.toDateString()) {
            // Returning ensures we do not fetch the visitor's country again when the fuction is called repeatedly during the day
            return parsedVisitorCountry.country;
        }
    }

    try {
        // Query the API and parse the response to JSON
        const response = await fetch(`https://api.ipregistry.co/?key=${API_KEY}`);
        if (!response.ok) {
            throw new Error(`Http error! Status: ${response.status}`);
        }
        const data = await response.json();
        const country = data.location.country.name;

        // Save the country and current date to local storage
        const today = new Date();
        localStorage.setItem(countryOnLocalStorage, JSON.stringify({
            country: country,
            date: today.toISOString()
        }));

        return country;
    } catch (error) {
        console.error('Error fetching data:', error);

        // Return the default country on error
        return DEFAULT_COUNTRY;
    }
}

async function updateCountryInDOM (country) {
    const countryContainer = document.getElementById('country');
    if (countryContainer) {
        countryContainer.textContent = await getVisitorCountry();
    }
}

updateCountryInDOM(country);