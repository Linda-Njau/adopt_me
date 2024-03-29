import { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Results from "./Results";
import fetchSearch from "./fetchSearch";
import AdoptedPetContext from "./AdoptedPetContext";
import useBreedList from "./useBreedList";
const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  const [adoptedPet] = useContext(AdoptedPetContext);
  const [requestParams, setrequestParams] = useState({
    location:"",
    animal: "",
    breed: "",
  });
  const [animal, setAnimal] = useState("");
  const [breeds] = useBreedList(animal);

  const results = useQuery(["search", requestParams], fetchSearch);
  const pets = results?.data?.pets ?? [];

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const obj = {
            animal:formData.get("animal") ?? "",
            breed: formData.get("breed") ?? "",
            location: formData.get("location") ?? "",
          };
          setrequestParams(obj);
        }}
      >

        {
          adoptedPet ? (
            <div className="pet image-container">
              <img src={adoptedPet.images[0]} alt={adoptedPet.name}/>
            </div>
          ) : null
        }
        <label htmlFor="location">
          Location
          <input
            name="location"
            id="location"
            placeholder="Location"
          />
        </label>
        <label htmlFor="animal">
          animal
          <select
            id="animal"
            name="animal"
            onChange={(e) => {
              setAnimal(e.target.value);
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
          breed
          <select disabled={!breeds.length} id="breed" name="breed"
          >
            <option />
            {breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>
        <button>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};
export default SearchParams;
