import './App.css'
import { Header } from './shared/components/Header/Header'
import { Search } from './shared/components/Search/Search'
import { Footer } from './shared/components/Footer/Footer'
import { BookingProvider, useBookingContext } from "../src/context/Context";
import { Loader } from './shared/components/Loader/Loader';

function AppContent() {
  const context = useBookingContext();

  if (context.loadingAirports) {
    return <Loader />;
  }

  return (
    <div className='app-container'>
      <Header />
      <Search />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BookingProvider>
      <AppContent />
    </BookingProvider>
  );
}

export default App
