import Booking from './components/Booking/Booking';

const App = () => (
  <>
    <Booking
      onSearchFlights={(params) => {
        console.log(params);
      }}
    />
  </>
);
export default App;
