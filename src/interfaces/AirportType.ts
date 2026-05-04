/**
 * Represents an airport available for flight search.
 */
interface Airport {
  /** Airport code. Example: EZE. */
  code: string;

  /** Airport name. Example: Ministro Pistarini International Airport. */
  name: string;

  /** City where the airport is located. Example: Buenos Aires. */
  city: string;

  /** Country where the airport is located. Example: Argentina. */
  country: string;
}

export type { Airport };