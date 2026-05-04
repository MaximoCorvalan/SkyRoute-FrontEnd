import type {
  FlightResult,
  FlightSearchRequest,
} from "../interfaces/FlightType";

const API_BASE_URL = "https://localhost:7074/api/Flights/search";

/**
 * Searches available flights using the backend API.
 *
 * @param searchRequest Search criteria including origin, destination,
 * departure date, number of passengers and cabin class.
 * @returns A list of available flights returned by all airline providers.
 * @throws Error when the backend request fails.
 */
const searchFlights = async (
  searchRequest: FlightSearchRequest
): Promise<FlightResult[]> => {
  try {
    const response = await fetch(API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(searchRequest),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: FlightResult[] = await response.json();

    return data;
  } catch (error) {
    console.error("Error searching flights:", error);
    throw error;
  }
};

export { searchFlights };