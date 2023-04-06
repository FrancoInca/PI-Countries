import {useLocation, useNavigate, useParams} from 'react-router-dom';
import {loadCountries, loadActivities} from '../../redux/actions';
import CheckBoxList from './filters/CheckBoxList';
import React, {useEffect, useState} from 'react';
import GoToTopButton from '../goToTop/goToTop';
import Styles from './Home.module.css';
import Searchbar from './SearchBar';
import {connect} from 'react-redux';
import Cards from '../Cards/Cards';

const ITEMS_PER_PAGE = 10;

const Home = (props) => {
  //Constants

  const navigate = useNavigate();
  const {search} = useLocation();
  const {page} = useParams();

  const query = new URLSearchParams(search);
  const filterURL = query.get('filters');
  const countryName = query.get('name');

  const [showFilters, setShowFilters] = useState({display: 'none', message: 'Show Filters'});
  const [searchInput, setSearchInput] = useState(countryName || '');
  const [inputCache, setInputCache] = useState(countryName || '');
  const [activitiesList, setActivitesList] = useState([]);
  const [countries, setCountries] = useState([]);
  const [mounted, setMounted] = useState(true);
  const [filters, setFilters] = useState([]);

  const continents = ['Africa', 'Antarctica', 'South America', 'North America', 'Asia', 'Europe', 'Oceania'];
  const allActivitiesName = props.activities.map((e) => e.name);
  const items = [...countries].splice((page - 1) * ITEMS_PER_PAGE, ITEMS_PER_PAGE);
  const filter_style = {
    display: showFilters.display,
  };
  const hasActivities = filters.some((activities) => allActivitiesName.includes(activities));
  const hasContinent = filters.some((continent) => continents.includes(continent));

  //Functions

  const inputGoTo = (value) => {
    const filtersParam = filters.length > 0 ? `filters=${filters.join(',')}` : '';
    navigate(`/home/1${value ? `?name=${value}` : ''}${value ? '&' : '?'}${filtersParam}`);
    setMounted(!mounted);
  };

  const filterCountries = (c) => {
    const activitiesName = c.Activities.map((e) => e.name);
    if (hasActivities && hasContinent)
      return filters.some((activities) => activitiesName.includes(activities)) && filters.includes(c.continent);
    if (hasActivities) return filters.some((activities) => activitiesName.includes(activities));
    return filters.includes(c.continent);
  };

  const handleFilterChange = (event) => {
    const value = event.target.value;
    const searchParams = searchInput ? `?name=${searchInput}` : '';
    let filtersParam;
    let newFilterArray = [];
    if (event.target.checked) {
      newFilterArray = [...filters, value];
      filtersParam = `filters=${newFilterArray.join(',')}`;
    } else {
      newFilterArray = filters.filter((f) => f !== value);
      filtersParam = newFilterArray.length ? `filters=${newFilterArray.join(',')}` : '';
    }
    setFilters(newFilterArray);
    navigate(`/home/1${searchParams ? `${searchParams}&` : '?'}${filtersParam}`);
    setMounted(!mounted);
  };
  const showHideFilters = () => {
    if (showFilters.display === 'none') setShowFilters({display: 'block', message: 'Hide filters'});
    else setShowFilters({display: 'none', message: 'Show filters'});
  };
  const clearFilters = () => {
    if (filters.length) {
      setFilters([]);
      navigate(`/home/1${countryName ? `?search=${countryName}` : ''}`);
      setMounted(!mounted);
    }
  };

  useEffect(() => {
    const countriesToState = async () => {
      try {
        await props.loadCountries(countryName || '');
        if (!props.countries.length || inputCache !== searchInput) {
          setInputCache(searchInput);
        }
        if (!activitiesList.length) {
          await props.loadActivities();
          setActivitesList(props.activities);
        }
        let filteredCountries = props.countries;
        if (filters.length) filteredCountries = filteredCountries.filter((c) => filterCountries(c));
        setCountries(filteredCountries);
        setMounted(false);
      } catch (error) {
        console.log(error.message);
        setCountries([]);
        setMounted(true);
      }
    };
    if (filterURL) setFilters(filterURL.split(','));
    countriesToState();
    //eslint-disable-next-line
  }, [mounted]);

  return (
    <div className={Styles.div_container}>
      <h1>Let's start choosing the country you want to visit!</h1>
      <div className={Styles.div_search}>
        <Searchbar countries={countries.length} />
      </div>
      <div className={Styles.div_filter} style={filter_style}>
        <div className={Styles.checkbox}>
          <CheckBoxList
            continents={continents}
            functionHandle={handleFilterChange}
            filters={filters}
            name={'Continents'}
          />
          <CheckBoxList
            continents={allActivitiesName}
            functionHandle={handleFilterChange}
            filters={filters}
            name={'Activities'}
          />
        </div>
        <button onClick={() => clearFilters()}>Clear filters</button>
      </div>
      <button className={Styles.button_SH_filters} onClick={() => showHideFilters()}>
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
      {!countries.length && <h3 className={Styles.error_message}>The country {countryName} doesn't exist.</h3>}
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
