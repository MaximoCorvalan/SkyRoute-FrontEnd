# ✈️ SkyRoute Frontend (React)

## 📌 Description

This is the frontend application for the SkyRoute Flight Search & Booking challenge.

The application allows users to:

* Search flights between airports
* Sort results by price, duration, and departure time
* View flight details
* Complete a booking with document validation (National ID / Passport)

---

## ⚠️ Note on Technology Choice

The original requirement specified Angular.
However, React was used due to familiarity and to ensure a complete and stable implementation within the time constraints.

The solution still follows the required architectural principles:

* Component-based structure
* Clear separation of concerns
* Scalable design for future extensions

---

## 🚀 Tech Stack

* React
* TypeScript
* Context API (state management)
* CSS Modules

---

## ▶️ How to Run

### 1. Clone the repository

```bash
git clone https://github.com/MaximoCorvalan/SkyRoute-FrontEnd.git

```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the application

```bash
npm run dev
```

The app will be available at:

```
http://localhost:5173
```

---

## 🧩 Features Implemented

* Flight search form
* Client-side sorting (no additional API calls)
* Loading indicator during API requests
* Booking modal with:

  * Flight summary
  * Price breakdown
  * Passenger form
* Dynamic document validation:

  * Passport for international flights
  * National ID for domestic flights
* Error handling and basic UX improvements

---

## ⚖️ Trade-offs

* React used instead of Angular for faster delivery
* No authentication implemented (out of scope)
* UI kept simple to prioritize functionality

---

## ⚠️ Known Limitations

* No unit tests due to time constraints
* No pagination for large result sets


---

## ⚙️ Configuration

The API base URL is currently configured in a central config file:

https://localhost:7074/api

This was kept simple for the scope of the challenge. In a production environment, this would be managed using environment variables.


---

## 🧩 Architecture Overview

The frontend follows a simple and modular structure:

* **Components**: UI is split into reusable components such as Search, TableFlight, and Confirm. Each component has a single responsibility.
* **Services**: API calls are isolated in dedicated service files (AirportServices, FlightServices, BookingServices), keeping data fetching separate from UI logic.
* **Context API**: Global state (such as flight results and airports) is managed using React Context to avoid prop drilling.
* **Interfaces**: TypeScript interfaces define the shape of data exchanged between frontend and backend, improving type safety and maintainability.
* **Configuration**: A central config file is used to define the API base URL, avoiding duplication across services.

This structure keeps the codebase organized, easy to maintain, and scalable for future features.
