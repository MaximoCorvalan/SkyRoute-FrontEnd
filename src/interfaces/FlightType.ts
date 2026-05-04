/**
 * Request sent to the backend to search available flights.
 */
interface FlightSearchRequest {
  /** Origin airport code. Example: EZE. */
  Origin: string;

  /** Destination airport code. Example: GRU. */
  Destination: string;

  /** Departure date in ISO string format. */
  DepartureDate: string;

  /** Number of passengers included in the search. Allowed range: 1 to 9. */
  Passengers: number;

  /** Selected cabin class. Example: Economy, Business or First. */
  CabinClass: string;
}

/**
 * Flight result returned by the backend after applying provider pricing rules.
 */
interface FlightResult {
  /** Airline provider name. Example: GlobalAir or BudgetWings. */
  provider: string;

  /** Flight number assigned by the provider. Example: GA101. */
  flightNumber: string;

  /** Origin airport code. Example: EZE. */
  origin: string;

  /** Destination airport code. Example: GRU. */
  destination: string;

  /** Departure date of the flight. */
  departureDate: string;

  /** Departure time in HH:mm format. */
  departureTime: string;

  /** Arrival time in HH:mm format. */
  arrivalTime: string;

  /** Number of passengers included in the result. */
  passengers: number;

  /** Flight duration expressed in minutes. */
  durationMinutes: number;

  /** Cabin class selected for the flight. Example: Economy, Business or First. */
  cabinClass: string;

  /** Final price per passenger after applying the provider pricing rule. */
  pricePerPassenger: number;

  /** Total price for all passengers combined. */
  totalPrice: number;
}

export type { FlightSearchRequest, FlightResult };