import PropTypes from 'prop-types';
import { Autocomplete, CircularProgress } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import debounce from 'lodash.debounce';
import { LocalAirport } from '@material-ui/icons';
import { getAirportsRequest } from '../../../requests/airportRequests';
import classes from './SearchAirport.module.css';

const SearchAirport = ({
  keywordInit,
  onAirportSelect,
  placeholder,
  className,
}) => {
  const [results, setResults] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const debouncedSearch = useMemo(
    () =>
      debounce(async (newKeyword) => {
        try {
          const response = await getAirportsRequest(newKeyword);

          // If theres no valid response return
          if (!response.data.status) {
            setIsLoading(false);
            return;
          }

          // Get relevant fields from response
          const newResults = response.data.airports.map((airport) => ({
            name: airport.name,
            iata: airport.iata,
          }));

          setResults(newResults);
          setIsLoading(false);
          setShowOptions(true);
        } catch (e) {
          setResults([]);
          setIsLoading(false);
        }
      }, 1000),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // Init location from locationInit prop (if its set)
  useEffect(() => {
    if (keywordInit) setKeyword(keywordInit);
  }, [keywordInit]);

  // Manage result selection either by enter or click
  const selectAirportHandler = (_, selected) => {
    setKeyword(selected.name);
    onAirportSelect(selected.iata);
    setShowOptions(false);
  };

  // Manage user input on location input
  const keywordInputChangeHandler = (e) => {
    setKeyword(e.target.value);

    // If the input is empty or less than 3 characters
    // don't run or cancel the request
    if (!e.target.value || e.target.value.length < 3) {
      setShowOptions(false);
      debouncedSearch.cancel();
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    debouncedSearch(e.target.value);
  };

  // Cleanup on component unmount
  useEffect(
    () => () => {
      debouncedSearch.cancel();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <>
      <Autocomplete
        classes={{ root: `${className} ${classes.Root}` }}
        fullWidth
        freeSolo
        open={showOptions}
        options={results}
        getOptionLabel={(option) => option.name}
        onChange={selectAirportHandler}
        // Custom input
        renderInput={(params) => {
          const inputProps = {
            ...params.inputProps,
            type: 'text',
            value: keyword,
            // Manage input changes
            onChange: keywordInputChangeHandler,
            // Hide suggestions on lost of focus
            onBlur: () => {
              setShowOptions(false);
            },
            className: classes.Input,
            // Get placeholder from prop
            placeholder,
          };
          return (
            <div
              /* This ref prop is for popper. Material UI uses
               * popper to show suggestions, and this prop
               * ensures that popper knows how to position
               * suggestions tooltip relative to this wrapping
               * div
               */
              ref={params.InputProps.ref}
              /* Add height to this div so that suggestions
               * flipping works
               */
              // style={{ height: '50px', position: 'relative' }}
              style={{ width: '100%', position: 'relative' }}
            >
              <input {...inputProps} />
              <LocalAirport classes={{ root: classes.Airport }} />
              {isLoading && (
                <CircularProgress
                  color="inherit"
                  size={20}
                  classes={{ root: classes.Spinner }}
                />
              )}
            </div>
          );
        }}
      />
    </>
  );
};

export default SearchAirport;

SearchAirport.propTypes = {
  className: PropTypes.string,
  keywordInit: PropTypes.string,
  onAirportSelect: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
};

SearchAirport.defaultProps = {
  className: '',
  keywordInit: '',
};
