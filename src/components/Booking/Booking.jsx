import PropTypes from 'prop-types';
import { Calendar } from 'primereact/calendar';
import { useState } from 'react';
import { MenuItem, Select } from '@mui/material';
import { Search } from '@material-ui/icons';
import SearchAirport from './SearchAirport/SearchAirport';
import PassengersSelector from './PassengersSelector/PassengersSelector';

const Booking = ({ onSearchFlights }) => {
  const [flightType, setFlightType] = useState('One-way');
  const [passengers, setPassengers] = useState({ adults: 1 });
  const [travelClass, setTravelClass] = useState('Economy');
  const [origin, setOrigin] = useState();
  const [destination, setDestination] = useState();
  const [date, setDate] = useState([new Date(), new Date()]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearchFlights({
      flightType,
      travelClass,
      passengers,
      origin,
      destination,
      date,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {/* Title */}
        <h1>Search hundreds of travel sites at once</h1>

        {/* Flight type selector */}
        <Select
          value={flightType}
          label="Flight Type"
          onChange={(event) => {
            setFlightType(event.target.value);
          }}
        >
          <MenuItem value="One-way">One-way</MenuItem>
          <MenuItem value="Round-trip">Round-trip</MenuItem>
        </Select>

        {/* Travel class selector */}
        <Select
          value={travelClass}
          label="Travel Class"
          onChange={(event) => {
            setTravelClass(event.target.value);
          }}
        >
          <MenuItem value="Economy">Economy</MenuItem>
          <MenuItem value="Premium Economy">Premium Economy</MenuItem>
          <MenuItem value="Business">Business</MenuItem>
          <MenuItem value="First">First</MenuItem>
        </Select>

        <PassengersSelector onClose={setPassengers} />

        {/* Origin */}
        <SearchAirport onAirportSelect={setOrigin} placeholder="Origin" />

        {/* Destination */}
        <SearchAirport
          onAirportSelect={setDestination}
          placeholder="Destination"
        />

        {/* Date range */}
        <Calendar
          selectionMode="range"
          numberOfMonths={2}
          dateFormat="dd/mm/yy"
          value={date}
          onChange={(e) => setDate(e.value)}
          readOnlyInput
        />

        <button type="submit">
          <Search />
        </button>
      </form>
    </>
  );
};

export default Booking;

Booking.propTypes = {
  onSearchFlights: PropTypes.func.isRequired,
};
