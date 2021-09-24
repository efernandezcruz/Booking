import PropTypes from 'prop-types';
import { Calendar } from 'primereact/calendar';
import { useState } from 'react';
import { MenuItem, Select } from '@mui/material';
import { Search } from '@material-ui/icons';
import SearchAirport from './SearchAirport/SearchAirport';
import PassengersSelector from './PassengersSelector/PassengersSelector';
import classes from './Booking.module.css';

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
      {/* Title */}
      <h1 className={`d-none d-md-block ${classes.Title}`}>
        Search hundreds of travel sites at once
      </h1>
      <form onSubmit={handleSubmit}>
        {/* Flight type selector */}
        <Select
          value={flightType}
          classes={{ root: classes.Select }}
          variant="standard"
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
          classes={{ root: classes.Select }}
          variant="standard"
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

        <div className="row">
          {/* Origin */}
          <div className="col-12 col-md-4 px-1">
            <SearchAirport onAirportSelect={setOrigin} placeholder="Origin" />
          </div>

          {/* Destination */}
          <div className="col-12 col-md-4 px-1">
            <SearchAirport
              onAirportSelect={setDestination}
              placeholder="Destination"
            />
          </div>

          {/* Date range */}
          <div className="col-12 col-md-3 px-1">
            <Calendar
              className={classes.Calendar}
              selectionMode="range"
              numberOfMonths={2}
              dateFormat="dd/mm/yy"
              value={date}
              onChange={(e) => setDate(e.value)}
              readOnlyInput
            />
          </div>

          <div className="col-12 col-md-1 px-1">
            <button type="submit" className={classes.SearchButton}>
              <Search />
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Booking;

Booking.propTypes = {
  onSearchFlights: PropTypes.func.isRequired,
};
