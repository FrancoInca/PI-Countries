import React, {useEffect, useState} from 'react';
import Cards from '../Cards/Cards';
import Styles from './Home.module.css';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import Searchbar from './SearchBar';
import {connect} from 'react-redux';
import {loadCountries} from '../../redux/actions';
import GoToTopButton from '../goToTop/goToTop';

const ITEMS_PER_PAGE = 10;

const Home = (props) => {
  const {page} = useParams();
  const {search} = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(search);
  const countryName = query.get('name');
  const filterURL = query.get('filters');

  const filterCountries = (c) => {
    return filters.includes(c.Activities.length > 0 ? 'Activities' : 'no-match') || filters.includes(c.continent);
  };

  const [mounted, setMounted] = useState(true);
  const [countries, setCountries] = useState([]);
  const [searchInput, setSearchInput] = useState(countryName || '');
  const [errorMessage, setErrorMessage] = useState(false);
  const [filters, setFilters] = useState([]);
  const [showFilters, setShowFilters] = useState({display: 'none', message: 'Show Filters'});
  const filteredCountries = filters.length > 0 ? countries.filter((c) => filterCountries(c)) : countries;
  const items = [...filteredCountries].splice((page - 1) * ITEMS_PER_PAGE, ITEMS_PER_PAGE);
  const continents = [
    'Africa',
    'Antarctica',
    'South America',
    'North America',
    'Asia',
    'Europe',
    'Oceania',
    'Activities',
  ];

  useEffect(() => {
    const countriesToState = async () => {
      try {
        await props.loadCountries(countryName || '');
        let filteredCountries = props.countries;
        if (filters.length > 0) filteredCountries = filteredCountries.filter((c) => filterCountries(c));
        setCountries(filteredCountries);
        setErrorMessage(false);
        setMounted(false);
      } catch (error) {
        setCountries([]);
        setMounted(true);
        setErrorMessage(`The country "${countryName}" doesn't exist.`);
      }
    };
    filterURL ? setFilters(filterURL.split(',')) : setFilters([...filters]);
    countriesToState();
    //eslint-disable-next-line
  }, [mounted]);

  const inputGoTo = (value) => {
    const filtersParam = filters.length > 0 ? `filters=${filters.join(',')}` : '';
    navigate(`/home/1${value ? `?name=${value}` : ''}${value ? '&' : '?'}${filtersParam}`);
    setMounted(!mounted);
  };

  const handleFilterChange = (event) => {
    const filter = event.target.value;
    const searchParams = searchInput ? `?name=${searchInput}` : '';
    let filtersParam;
    let newFilterArray = [];
    if (event.target.checked) {
      newFilterArray = [...filters, filter];
      filtersParam = `filters=${newFilterArray.join(',')}`;
    } else {
      newFilterArray = filters.filter((f) => f !== filter);
      filtersParam = newFilterArray.length > 0 ? `filters=${newFilterArray.join(',')}` : '';
    }
    setFilters(newFilterArray);
    navigate(`/home/1${searchParams}${searchInput ? '&' : '?'}${filtersParam}`);
    setMounted(!mounted);
  };

  const filter_style = {
    display: showFilters.display,
  };

  return (
    <div className={Styles.div_container}>
      <h1>Let's start choosing the country you want to visit!</h1>

      <div className={Styles.div_search}>
        <Searchbar countries={countries.length} />
      </div>

      <div className={Styles.div_filter} style={filter_style}>
        {continents.map((e) => (
          <div key={e}>
            <label htmlFor={e}>{e}</label>
            <input type="checkbox" id={e} value={e} onChange={handleFilterChange} checked={filters.includes(e)} />
          </div>
        ))}

        <button
          onClick={() => {
            if (filters.length > 0) {
              setFilters([]);
              navigate(`/home/1${countryName ? `?search=${countryName}` : ''}`);
              setMounted(!mounted);
            }
          }}>
          Clear filters
        </button>
      </div>

      <button
        className={Styles.button_SH_filters}
        onClick={() => {
          if (showFilters.display === 'none') setShowFilters({display: 'block', message: 'Hide filters'});
          else setShowFilters({display: 'none', message: 'Show filters'});
        }}>
        {showFilters.message}
      </button>

      <form>
        <input
          type="text"
          name="name"
          autoComplete="off"
          placeholder="Country"
          value={searchInput}
          onChange={(event) => {
            setSearchInput(event.target.value);
            inputGoTo(event.target.value);
          }}
        />
      </form>

      <div className={Styles.div_home_cards}>
        <Cards props={items} />
      </div>

      {errorMessage ? <h3 className={Styles.error_message}>{errorMessage}</h3> : null}

      <GoToTopButton />
    </div>
  );
};
export function mapStateToProps(state) {
  return {countries: state.countries};
}
export function mapDispatchToProps(dispatch) {
  return {
    loadCountries: function (name) {
      return dispatch(loadCountries(name));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
