import type { BookingRequest, BookingResponse } from "../interfaces/Booking";

const URL = "https://localhost:7074/api/Bookings";

/**
 * Creates a booking using the backend API.
 *
 * @param bookingRequest Booking information including selected flight,
 * passenger details and document number.
 * @returns A booking confirmation with the generated booking reference.
 * @throws Error when the backend request fails.
 */
const createBooking = async (
  bookingRequest: BookingRequest
): Promise<BookingResponse> => {
  try {
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingRequest),
    });

    if (!response.ok) {
      throw new Error(`Error creating booking. Status: ${response.status}`);
    }

    const data: BookingResponse = await response.json();

    return data;
  } catch (error) {
    console.error("Error creating booking:", error);
    throw error;
  }
};

export { createBooking };