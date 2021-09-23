import PropTypes from 'prop-types';
import { MenuItem } from '@mui/material';

const PassengerCount = ({
  passengerTitle,
  passengerCount,
  onDecreasePassenger,
  onIncreasePassenger,
}) => (
  <>
    <MenuItem>
      <span>{passengerTitle}</span>
      <button onClick={onDecreasePassenger} type="button">
        -
      </button>
      <span>{passengerCount}</span>
      <button onClick={onIncreasePassenger} type="button">
        +
      </button>
    </MenuItem>
  </>
);

export default PassengerCount;

PassengerCount.propTypes = {
  onDecreasePassenger: PropTypes.func.isRequired,
  onIncreasePassenger: PropTypes.func.isRequired,
  passengerCount: PropTypes.number.isRequired,
  passengerTitle: PropTypes.string.isRequired,
};
