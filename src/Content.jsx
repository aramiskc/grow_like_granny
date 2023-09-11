import { useEffect, useState } from "react";
import axios from "axios";

export function Content() {
  const [plants, setPlants] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [wateringStartDate, setWateringStartDate] = useState(null);
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      axios.get("http://localhost:3000/plants").then((response) => {
        setPlants(response.data);
      });
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      axios.get("http://localhost:3000/schedules").then((response) => {
        setSchedules(response.data);
      });
    }
  }, [isLoggedIn]);

  const handlePlantChange = (event) => {
    setSelectedPlant(event.target.value);
  };

  const handleDateChange = (event) => {
    setWateringStartDate(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post("http://localhost:3000/schedules", {
      plant_id: selectedPlant,
      watering_start_date: wateringStartDate,
    });
  };

  return (
    <div>
      <h1>Grannys Plant Care Info</h1>
      {isLoggedIn ? (
        <>
          {plants.map((plant, index) => (
            <div key={index}>
              <h2>{plant.name}</h2>
              <p>{plant.description}</p>
              <p>Amount of Sun: {plant.amount_of_sun}</p>
              <p>Days to Water: {plant.days_to_water}</p>
            </div>
          ))}
          {schedules.map((schedule, index) => (
            <div key={index}>
              <h2>{schedule.plant_name}</h2>
              <p>Watering Start Date: {schedule.watering_start_date}</p>
            </div>
          ))}
          <form onSubmit={handleSubmit}>
            <label>
              Select a plant:
              <select value={selectedPlant} onChange={handlePlantChange}>
                {plants.map((plant, index) => (
                  <option key={index} value={plant.id}>
                    {plant.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Set a watering start date:
              <input type="date" value={wateringStartDate} onChange={handleDateChange} />
            </label>
            <input type="submit" value="Save" />
          </form>
        </>
      ) : (
        <p>Granny really needs you to login to see all the plants, deary.</p>
      )}
    </div>
  );
}
