import "./SearchFilter.css";
import { useBookingContext } from "../../../context/Context";
import type { FlightSearchRequest } from "../../../interfaces/FlightType";
import { useState} from "react";
import { searchFlights } from "../../../services/FlightServices";
import { Loader } from "../Loader/Loader";
type FormErrors = {
  origin?: boolean;
  destination?: boolean;
  departureDate?: boolean;
  passengers?: boolean;
  cabinClass?: boolean;
};

/**
 * SearchFilter renders the flight search form.
 *
 * It allows the user to select origin, destination, departure date,
 * number of passengers and cabin class. When the form is submitted,
 * it validates the input data, sends the search request to the backend
 * and stores the returned flight results in the booking context.
 */
export const SearchFilter = () => {
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const bookingContext = useBookingContext();
  const [searching, setSearching] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  
  const formData = new FormData(e.currentTarget);
  
  const origin = formData.get("origin") as string;
  const destination = formData.get("destination") as string;
  const departureDate = formData.get("departureDate") as string;
  const passengers = Number(formData.get("passengers"));
  const cabinClass = formData.get("cabinClass") as string;
  
  const errors: FormErrors = {
    origin: !origin,
    destination: !destination,
    departureDate: !departureDate || new Date(departureDate) < new Date(),
    passengers: !passengers,
    cabinClass: !cabinClass,
  };
  
  if (origin && destination && origin === destination) {
    errors.origin = true;
    errors.destination = true;
  }
  
  setFormErrors(errors);
  
  const hasErrors = Object.values(errors).some((value) => value === true);
  
  if (hasErrors) {
    return;
  }
  
  setSearching(true);
  const searchRequest: FlightSearchRequest = {
    Origin: origin,
    Destination: destination,
    DepartureDate: new Date(departureDate).toISOString(),
    Passengers: passengers,
    CabinClass: cabinClass,
  };

  try {
    const flights = await searchFlights(searchRequest);

    bookingContext.setFlightResult(flights);

  } catch (error) {
    console.error("Error searching flights:", error);
  }
  finally {
    setSearching(false);
  }
};

  return (

    <section className="search-filter">

      {searching? <Loader></Loader>:null}


      <form className="search-filter__form" onSubmit={handleSubmit}>
        <div className="search-filter__field">
          <label htmlFor="origin">Origin</label>

          <select
            id="origin"
            name="origin"
            className={formErrors.origin ? "input-error" : ""}
            onChange={() =>
              setFormErrors((prev) => ({ ...prev, origin: false }))
            }
          >
            <option value="">Select origin</option>

            {bookingContext.airports.map((airport) => (
              <option key={airport.code} value={airport.code}>
                {airport.code} - {airport.name} - {airport.country}
              </option>
            ))}
          </select>
        </div>

        <div className="search-filter__field">
          <label htmlFor="destination">Destination</label>

          <select
            id="destination"
            name="destination"
            className={formErrors.destination ? "input-error" : ""}
            onChange={() =>
              setFormErrors((prev) => ({ ...prev, destination: false }))
            }
          >
            <option value="">Select destination</option>

            {bookingContext.airports.map((airport) => (
              <option key={airport.code} value={airport.code}>
                {airport.code} - {airport.name} - {airport.country}
              </option>
            ))}
          </select>
        </div>

        <div className="search-filter__field">
          <label htmlFor="departureDate">Departure date</label>

          <input
            id="departureDate"
            name="departureDate"
            type="date"
            min={new Date().toISOString().split('T')[0]}
            className={formErrors.departureDate ? "input-error" : ""}
            onChange={() =>
              setFormErrors((prev) => ({ ...prev, departureDate: false }))
            }
          />
        </div>

        <div className="search-filter__field">
          <label htmlFor="passengers">Passengers</label>

          <input
            id="passengers"
            name="passengers"
            type="number"
            min="1"
            max="9"
            defaultValue="1"
           
            onChange={() =>
              setFormErrors((prev) => ({ ...prev, passengers: false }))
            }
          />
        </div>

        <div className="search-filter__field">
          <label htmlFor="cabinClass">Cabin class</label>

          <select
            id="cabinClass"
            name="cabinClass"
            defaultValue="Economy"
            className={formErrors.cabinClass ? "input-error" : ""}
            onChange={() =>
              setFormErrors((prev) => ({ ...prev, cabinClass: false }))
            }
          >
            <option value="Economy">Economy</option>
            <option value="Business">Business</option>
            <option value="First Class">First Class</option>
          </select>
        </div>

        <button className="search-filter__button" type="submit">
          Search flights
        </button>
      </form>
    </section>
  );
};