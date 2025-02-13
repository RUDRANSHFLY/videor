import { listCountries } from "countries-ts";



export const getCountries = () => {
    const countries = listCountries();
    const randomCountries: string[] = [];

    while(randomCountries.length < 10){
        const randomIndex = Math.floor(Math.random() * countries.length);
        const randomCountry = countries[randomIndex].label;

        if(!randomCountries.includes(randomCountry)){
            randomCountries.push(randomCountry);
        }
    }

    for (const country of randomCountries) {
        console.log(country);
    }

    return randomCountries;
    
}


getCountries();