import React, {useEffect, useState} from 'react';
import Cards from '../Cards/Cards';
import Styles from './Home.module.css';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import Searchbar from './SearchBar';
import {connect} from 'react-redux';
import {loadCountries, loadActivities} from '../../redux/actions';
import GoToTopButton from '../goToTop/goToTop';

const ITEMS_PER_PAGE = 10;

const Home = (props) => {
  const {page} = useParams();
  const {search} = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(search);
  const countryName = query.get('name');
  const filterURL = query.get('filters');

  const [showFilters, setShowFilters] = useState({display: 'none', message: 'Show Filters'});
  const [searchInput, setSearchInput] = useState(countryName || '');
  const [inputCache, setInputCache] = useState(countryName || '');
  const [activitiesList, setActivitesList] = useState([]);
  const [countries, setCountries] = useState([]);
  const [filters, setFilters] = useState([]);
  const [mounted, setMounted] = useState(true);
  const continents = ['Africa', 'Antarctica', 'South America', 'North America', 'Asia', 'Europe', 'Oceania'];

  const inputGoTo = (value) => {
    const filtersParam = filters.length > 0 ? `filters=${filters.join(',')}` : '';
    navigate(`/home/1${value ? `?name=${value}` : ''}${value ? '&' : '?'}${filtersParam}`);
    setMounted(!mounted);
  };
  const filterCountries = (c, array = [...activitiesList]) => {
    const activitiesName = c.Activities.map((e) => e.name);
    const allActivities = array.map((e) => e.name);
    const filterActivities = [...filters];
    const hasActivities = filterActivities.some((activities) => allActivities.includes(activities));
    const hasContinent = filterActivities.some((continent) => continents.includes(continent));
    if (hasActivities && hasContinent)
      return (
        filterActivities.some((activities) => activitiesName.includes(activities)) && filters.includes(c.continent)
      );
    if (hasActivities) return filterActivities.some((activities) => activitiesName.includes(activities));
    if (hasContinent) return filters.includes(c.continent);
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

  useEffect(() => {
    const countriesToState = async () => {
      try {
        if (countries.length === 0 || inputCache !== searchInput) {
          await props.loadCountries(countryName || '');
          setInputCache(searchInput);
        }
        let filteredCountries = props.countries;
        if (activitiesList.length === 0) {
          await props.loadActivities();
          setActivitesList(props.activities);
        }
        let activities = props.activities;
        if (filters.length > 0) filteredCountries = filteredCountries.filter((c) => filterCountries(c, activities));
        setCountries(filteredCountries);
        setMounted(false);
      } catch (error) {
        console.log(error.message);
        setCountries([]);
        setMounted(true);
      }
    };
    filterURL ? setFilters(filterURL.split(',')) : setFilters([...filters]);
    countriesToState();
    //eslint-disable-next-line
  }, [mounted]);

  const filteredCountries = filters.length > 0 ? countries.filter((c) => filterCountries(c)) : countries;
  const items = [...filteredCountries].splice((page - 1) * ITEMS_PER_PAGE, ITEMS_PER_PAGE);
  const filter_style = {
    display: showFilters.display,
  };
  const activityFilterStyle = {
    display: activitiesList.length > 0 ? 'inline-block' : 'none',
  };

  return (
    <div className={Styles.div_container}>
      <h1>Let's start choosing the country you want to visit!</h1>
      <div className={Styles.div_search}>
        <Searchbar countries={countries.length} />
      </div>

      <div className={Styles.div_filter} style={filter_style}>
        <div className={Styles.checkbox}>
          <div className={Styles.checkbox_container}>
            <h3>Continents</h3>
            <div className={Styles.list}>
              {continents.map((e) => (
                <div key={e}>
                  <label htmlFor={e}>{e}</label>
                  <input type="checkbox" id={e} value={e} onChange={handleFilterChange} checked={filters.includes(e)} />
                </div>
              ))}
            </div>
          </div>

          <div className={Styles.checkbox_container} style={activityFilterStyle}>
            <h3>Activities</h3>
            <div className={Styles.list}>
              {activitiesList.map((e) => (
                <div key={e.name}>
                  <label htmlFor={e.name}>{e.name}</label>
                  <input
                    type="checkbox"
                    id={e.name}
                    value={e.name}
                    onChange={handleFilterChange}
                    checked={filters.includes(e.name)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
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

      {!countries.length ? <h3 className={Styles.error_message}>The country {countryName} doesn't exist.</h3> : null}

      <GoToTopButton />
    </div>
  );
};
export function mapStateToProps(state) {
  return {countries: state.countries, activities: state.activities};
}
export function mapDispatchToProps(dispatch) {
  return {
    loadCountries: function (name) {
      return dispatch(loadCountries(name));
    },
    loadActivities: function () {
      return dispatch(loadActivities());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
