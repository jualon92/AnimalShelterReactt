import { useState, useEffect, useContext } from "react";
import Pet from "./Pet";
import Results from "./Results";
import useBreedList from "./useBreedList";
import ThemeContext from "./ThemeContext";
import client from "./helpers/utility"

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  const [location, setLocation] = useState("");
  const [animal, setAnimal] = useState("");
  const [breed, setBreed] = useState("");
  const [pets, setPets] = useState([]);
  const [breeds] = useBreedList(animal);
  const [theme, setTheme] = useContext(ThemeContext);

  useEffect(() => {
    fetchPets()
  }, []);

  const fetchPets = async () => {
    const resp = await client.animal.search()
    const animals = resp.data.animals
    console.log(animals)
    setPets(animals);
  };

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetchPets();
        }}
      >
        <label htmlFor="location">
          Location
          <input
            id="location"
            //  value={location} //valor linkeado a get location
            placeholder="Location"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
              console.log(location);
            }}
            //   onChange={(e) => setLocation(e.target.value)}
            // al poner input, cambia estado location mediante set location,
            //consecuencia => trigerea re render,y location es diferente
          />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={animal}
            onChange={(e) => {
              setAnimal(e.target.value);
              console.log(e.target.value);
            }}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select
            disabled={!breeds.length} // breeds es null
            id="breed"
            value={breed}
            onChange={(e) => {
              setBreed(e.target.value);
              console.log(breed);
            }}
          >
            <option />
            {breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="theme">
          Theme
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            onBlur={(e) => setTheme(e.target.value)}
          >
            <option value="peru">Peru</option>
            <option value="darkblue">Dark Blue</option>
            <option value="chartreuse">Chartreuse</option>
            <option value="mediumorchid">Medium Orchid</option>
          </select>
        </label>
        <button style={{ backgroundColor: theme }}>Submit</button>
        {/*<div>Dato ingresado: {location}</div>*/}
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
