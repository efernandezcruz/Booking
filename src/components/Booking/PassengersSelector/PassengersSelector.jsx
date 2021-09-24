import PropTypes from 'prop-types';
import { Button, Menu } from '@mui/material';
import { useState } from 'react';
import PassengerCount from './PassengerCount/PassengerCount';
import classes from './PassengerSelector.module.css';

const PassengersSelector = ({ onClose }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [adults, setAdults] = useState(1);
  const [child, setChild] = useState(0);
  const [seniors, setSeniors] = useState(0);
  const open = Boolean(anchorEl);

  const total = adults + child + seniors;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    onClose({ adults, child, seniors });
  };

  return (
    <>
      <Button onClick={handleClick} classes={{ root: classes.Button }}>
        {`${total} ${total > 1 ? 'travelers' : 'adult'}`}
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <PassengerCount
          passengerTitle="Adults"
          passengerCount={adults}
          onDecreasePassenger={() => {
            if (adults <= 1) return;
            setAdults(adults - 1);
          }}
          onIncreasePassenger={() => {
            setAdults(adults + 1);
          }}
        />
        <PassengerCount
          passengerTitle="Seniors"
          passengerCount={seniors}
          onDecreasePassenger={() => {
            if (seniors <= 0) return;
            setSeniors(seniors - 1);
          }}
          onIncreasePassenger={() => {
            setSeniors(seniors + 1);
          }}
        />
        <PassengerCount
          passengerTitle="Child"
          passengerCount={child}
          onDecreasePassenger={() => {
            if (child <= 0) return;
            setChild(child - 1);
          }}
          onIncreasePassenger={() => {
            setChild(child + 1);
          }}
        />
      </Menu>
    </>
  );
};

export default PassengersSelector;

PassengersSelector.propTypes = {
  onClose: PropTypes.func.isRequired,
};
