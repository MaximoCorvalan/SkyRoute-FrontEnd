import { useMemo, useState } from "react";
import { Confirms } from "../Confirm/Confirms";
import "./TableFlight.css";
import { useBookingContext } from "../../../context/Context";
import type { FlightResult } from "../../../interfaces/FlightType";
type SortOption = "price-asc" | "price-desc" | "duration-asc" | "departure-asc";




const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    currencyDisplay: "code",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);

const timeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};


/**
 * TableFlight displays the available flight results.
 *
 * It reads the flight results from the booking context, allows the user
 * to sort them by price, duration or departure time, and opens the booking
 * confirmation modal when a flight is selected.
 */
export const TableFlight = () => {
  const context = useBookingContext();
  const [sortOption, setSortOption] = useState<SortOption>("price-asc");
  const [selectedFlight, setSelectedFlight] = useState<FlightResult | null>(null);
  /**
   * Returns the flight results sorted according to the selected sort option.
   *
   * Sorting is handled on the frontend without making another backend request.
   */
  const sortedFlights = useMemo(() => {
    return [...context.FlightResult].sort((firstFlight, secondFlight) => {
      if (sortOption === "price-asc") {
        return (
          firstFlight.pricePerPassenger * firstFlight.passengers -
          secondFlight.pricePerPassenger * secondFlight.passengers
        );
      }

      if (sortOption === "price-desc") {
        return (
          secondFlight.pricePerPassenger * secondFlight.passengers -
          firstFlight.pricePerPassenger * firstFlight.passengers
        );
      }

      if (sortOption === "duration-asc") {
        return firstFlight.durationMinutes - secondFlight.durationMinutes;
      }

      return (
        timeToMinutes(firstFlight.departureTime) -
        timeToMinutes(secondFlight.departureTime)
      );
    });
  }, [sortOption, context.FlightResult]);

  return (
    <>
      <section className="table-flight">
        <div className="table-flight__header">
          <div>
            <h2>Available flights</h2>
            <span>{sortedFlights.length} results</span>
          </div>

          <label className="table-flight__sort">
            Sort by
            <select
              value={sortOption}
              onChange={(event) => setSortOption(event.target.value as SortOption)}
            >
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
              <option value="duration-asc">Duration: shortest first</option>
              <option value="departure-asc">Departure time</option>
            </select>
          </label>
        </div>

        <div className="table-flight__wrapper">
          <table>
            <thead>
              <tr>
                <th>Airline provider</th>
                <th>Flight number</th>
                <th>Departure</th>
                <th>Arrival</th>
                <th>Duration</th>
                <th>Cabin class</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {sortedFlights.map((flight) => (
                <tr key={flight.flightNumber}>
                  <td>{flight.provider}</td>
                  <td>{flight.flightNumber}</td>
                  <td>{flight.departureTime}</td>
                  <td>{flight.arrivalTime}</td>
                  <td>{flight.durationMinutes} min</td>
                  <td>{flight.cabinClass}</td>
                  <td className="table-flight__price">
                    <strong>
                      {formatPrice(flight.totalPrice)} total
                    </strong>
                    <span>
                      {formatPrice(flight.pricePerPassenger)} per person
                    </span>
                  </td>
                  <td>
                    <button
                      className="table-flight__reserve"
                      type="button"
                      onClick={() => setSelectedFlight(flight)}
                    >
                      Reserve
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {selectedFlight && (
        <Confirms flight={selectedFlight} onClose={() => setSelectedFlight(null)} />
      )}
    </>
  );
};
