import { useEffect, useState, type FormEvent } from "react";
import "./Confirms.css";
import type { FlightResult } from "../../../interfaces/FlightType";
import { useBookingContext } from "../../../context/Context";
import {createBooking} from "../../../services/BookingServices";
import  type { BookingRequest } from "../../../interfaces/Booking";

type ConfirmsProps = {
  flight: FlightResult;
  onClose: () => void;
};


/**
 * Validates the passenger document number according to the selected document type.
 *
 * @param documentNumber Passenger document number entered in the form.
 * @param typePassaport Document type required for the selected route.
 * @returns Validation state and message.
 */
  const validateDocument = (
  documentNumber: string,
  typePassaport: string
): { isValid: boolean; message: string } => {
  const value = documentNumber.trim();



  if (typePassaport === "Passport") {
    const isValidPassport =
  /^(?=.*[a-zA-Z])[a-zA-Z0-9]+$/.test(value) &&
  value.length >= 6 &&
  value.length <= 9;

    if (!isValidPassport) {
      return {
        isValid: false,
        message: "Invalid Passport Number. It must be alphanumeric and between 6 and 9 characters.",
      };
    }
  } else {
    const isValidDni =
      /^[0-9]+$/.test(value) &&
      value.length >= 7 &&
      value.length <= 8;

    if (!isValidDni) {
      return {
        isValid: false,
        message: "Invalid National ID. It must contain only numbers and have 7 or 8 digits.",
      };
    }
  }

  return {
    isValid: true,
    message: "Document is valid.",
  };
};


const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    currencyDisplay: "code",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);

/**
 * Confirms renders the booking confirmation modal.
 *
 * It displays the selected flight summary, price breakdown and passenger form.
 * It also validates the passenger document according to the route type:
 * Passport for international flights and National ID for domestic flights.
 */
export const Confirms = ({ flight, onClose }: ConfirmsProps) => {
  const { airports } = useBookingContext();
  const [bookingReference, setBookingReference] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [typePassaport, setTypePassaport] = useState("National ID");
  const [errorPass, setErrorPass] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(()=>{
     const AirportOrigin = airports.find((airport) => airport.code === flight.origin);
     const AirportDestination = airports.find((airport) => airport.code === flight.destination);
   //aca valido si es del dni o pasaporte
   if(AirportDestination?.country !== AirportOrigin?.country)
    {
      setTypePassaport("Passport");
    }

  },[])



 const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  setIsSubmitting(true);

  const formData = new FormData(event.currentTarget);

  const documentNumber = formData.get("documentNumber") as string;


  const validation = validateDocument(documentNumber, typePassaport);

  if (!validation.isValid) {
    setErrorMessage(validation.message);
    setErrorPass(true);
    setIsSubmitting(false);
    return;
  }
  setErrorPass(false);
  setErrorMessage("");
  // Si llega hasta acá, el documento es válido y hace el feth al backend

  const bookingRequest: BookingRequest = {
    flightNumber: flight.flightNumber,
    origin: flight.origin,
    destination: flight.destination,
    passengers: flight.passengers,
    fullName: formData.get("fullName") as string,
    emailAddress: formData.get("email") as string,
    documentNumber: documentNumber,
  };
   const bookingResponse = await createBooking(bookingRequest);
  setBookingReference(bookingResponse.bookingReference);
  setIsSubmitting(true);
  // acá seguís con el submit al backend
};

  return (
    <div className="confirm-modal" role="dialog" aria-modal="true">
      <div className="confirm-modal__backdrop" onClick={onClose} />

      <section className="confirm-modal__panel">
        <div className="confirm-modal__header">
          <div>
            <span>Booking summary</span>
            <h2>Confirm your flight</h2>
          </div>

          <button className="confirm-modal__close" type="button" onClick={onClose}>
            X
          </button>
        </div>

        <div className="confirm-modal__summary">
          <div>
            <span>Route</span>
            <strong>
              {flight.origin} to {flight.destination}
            </strong>
          </div>
          <div>
            <span>Provider</span>
            <strong>
              {flight.provider} - {flight.flightNumber}
            </strong>
          </div>
          <div>
            <span>Times</span>
            <strong>
              {flight.departureTime} - {flight.arrivalTime}
            </strong>
          </div>
          <div>
            <span>Cabin</span>
            <strong>{flight.cabinClass}</strong>
          </div>
        </div>

        <div className="confirm-modal__price">
          <div>
            <span>Per-passenger price</span>
            <strong>{formatPrice(flight.pricePerPassenger)}</strong>
          </div>
          <div>
            <span>Passengers</span>
            <strong>{flight.passengers}</strong>
          </div>
          <div>
            <span>Total price</span>
            <strong>{formatPrice(flight.totalPrice)}</strong>
          </div>
        </div>

        <form className="confirm-modal__form" onSubmit={handleSubmit}>
          <label>
            Full name
            <input name="fullName" type="text" placeholder="John Smith" required />
          </label>

          <label>
            Email address
            <input name="email" type="email" placeholder="john@email.com" required />
          </label>

          <label>
            
            {typePassaport}
            <input name="documentNumber" className={errorPass ? "confirm-modal__input--error" : ""} type="text" placeholder={typePassaport === "National ID" ? "12345678" : "A1234567"} required onChange={() => { setErrorPass(false); setErrorMessage(""); }} />
            {errorMessage && <span className="confirm-modal__error-message">{errorMessage}</span>}
          </label>

          <button type="submit" disabled={isSubmitting }>
            {isSubmitting && bookingReference.length === 0 ? "Confirming..." : "Confirm Booking"}
          </button>
        </form>

        {bookingReference && (
          <div className="confirm-modal__reference">
            Booking confirmed: <strong>{bookingReference}</strong>
          </div>
        )}
      </section>
    </div>
  );
};
