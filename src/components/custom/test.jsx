import { State, City } from "country-state-city";

const Test = () => {
    // Get all states of India (Country code: IN)
    const states = State.getStatesOfCountry("IN");

    // Get all cities of all states in India
    let allCitiesInIndia = [];

    states.forEach((state) => {
        const cities = City.getCitiesOfState("IN", state.isoCode);
        allCitiesInIndia = [...allCitiesInIndia, ...cities];
    });

    // Display the city names
    allCitiesInIndia.forEach((city) => {
        console.log(city.name);
    });

    return <div>test</div>;
};

export default Test;
