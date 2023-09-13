import { useEffect, useState } from "react";
import axios from "axios";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Button } from "react-bootstrap";

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
      axios.get("http://localhost:3000/schedules/").then((response) => {
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
            <Card key={index} style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>{plant.name}</Card.Title>
                <Card.Text>
                  {plant.description}
                  {`\nAmount of Sun: ${plant.amount_of_sun}`}
                  {`\nDays to Water: ${plant.days_to_water}`}
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          ))}
          {schedules.map((schedule, index) => (
            <Card key={index} style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>{schedule.plant_name}</Card.Title>
                <Card.Text>Watering Start Date: {schedule.watering_start_date}</Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          ))}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>
                Select a plant:
                <select className="form-control" value={selectedPlant} onChange={handlePlantChange}>
                  {plants.map((plant, index) => (
                    <option key={index} value={plant.id}>
                      {plant.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="form-group">
              <label>
                Set a watering start date:
                <input type="date" className="form-control" value={wateringStartDate} onChange={handleDateChange} />
              </label>
            </div>
            <input type="submit" className="btn btn-primary" value="Save" />
          </form>
        </>
      ) : (
        <p>Granny really needs you to login to see all the plants, deary.</p>
      )}
    </div>
  );
}
