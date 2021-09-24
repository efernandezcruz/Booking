import PropTypes from 'prop-types';
import { MenuItem } from '@mui/material';
import classes from './PassengerCount.module.css';

const PassengerCount = ({
  passengerTitle,
  passengerCount,
  onDecreasePassenger,
  onIncreasePassenger,
}) => (
  <>
    <MenuItem classes={{ root: classes.Item }}>
      <span>{passengerTitle}</span>
      <div className={classes.ButtonGroup}>
        <button
          className={classes.Button}
          onClick={onDecreasePassenger}
          type="button"
        >
          -
        </button>
        <span className={classes.Count}>{passengerCount}</span>
        <button
          className={classes.Button}
          onClick={onIncreasePassenger}
          type="button"
        >
          +
        </button>
      </div>
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
