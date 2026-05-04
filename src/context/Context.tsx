import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Airport } from "../interfaces/AirportType";
import { getAirports } from "../services/AirportServices";
import type { FlightResult } from "../interfaces/FlightType";
type BookingContextType = {
  bookingReference: string | null;
  setBookingReference: (value: string | null) => void;
  airports: Airport[];
  FlightResult: FlightResult[];
  setFlightResult: (flights: FlightResult[]) => void;
  loadingAirports: boolean;
  setLoadingAirports: (value: boolean) => void;

};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

type BookingProviderProps = {
  children: ReactNode;
};

export const BookingProvider = ({ children }: BookingProviderProps) => {
  const [bookingReference, setBookingReference] = useState<string | null>(null);
  const [FlightResult, setFlightResult] = useState<FlightResult[]>([]);
  const [airports, setAirports] = useState<Airport[]>([]);
  const [loadingAirports, setLoadingAirports] = useState(true);

  const fetchAirports = async () => {
    const data = await getAirports();
    setAirports(data);
    setLoadingAirports(false);
  }


  useEffect(()=>
    {
        fetchAirports();


    },[])
  return (
    <BookingContext.Provider
      value={{
        bookingReference,
        setBookingReference,
        airports,
        FlightResult,
        setFlightResult,
        loadingAirports,
        setLoadingAirports
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBookingContext = () => {
  const context = useContext(BookingContext);

  if (!context) {
    throw new Error("useBookingContext must be used inside BookingProvider");
  }

  return context;
};