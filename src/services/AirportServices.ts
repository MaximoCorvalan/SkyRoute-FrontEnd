import type { Airport } from "../interfaces/AirportType";

const URL = "https://localhost:7074/api/Airports";

/**
 * Retrieves the list of available airports from the backend API.
 *
 * @returns A list of airports available.
 */
const getAirports = async (): Promise<Airport[]> => {
  try {
    const response = await fetch(URL);

    if (!response.ok) {
      throw new Error("Failed to fetch airports");
    }

    const data: Airport[] = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching airports:", error);
    return [];
  }
};

export { getAirports };