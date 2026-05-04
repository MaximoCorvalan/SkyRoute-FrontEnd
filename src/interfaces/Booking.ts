/**
 * Request sent to the backend to create a booking.
 */
export interface BookingRequest {
  /** Selected flight number. Example: GA101. */
  flightNumber: string;

  /** Origin airport code. Example: EZE. */
  origin: string;

  /** Destination airport code. Example: GRU. */
  destination: string;

  /** Number of passengers included in the booking. */
  passengers: number;

  /** Passenger full name. */
  fullName: string;

  /** Passenger email address. */
  emailAddress: string;

  /**
   * Passenger document number.
   * For international flights, this represents the passport number.
   * For domestic flights, this represents the national ID.
   */
  documentNumber: string;
}

/**
 * Response returned by the backend after creating a booking.
 */
export interface BookingResponse {
  /** Generated booking reference code. */
  bookingReference: string;

  /** Response message returned by the backend. */
  message: string;
}