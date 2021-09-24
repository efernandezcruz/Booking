import Booking from './components/Booking/Booking';

const App = () => (
  <div className="container mt-5">
    <Booking
      onSearchFlights={(params) => {
        console.log(params);
      }}
    />
  </div>
);
export default App;
