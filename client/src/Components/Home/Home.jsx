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
  const {search} = useLocation();
  const {page} = useParams();
  const navigate = useNavigate();

  const query = new URLSearchParams(search);
  const countryName = query.get('name');

  const [mounted, setMounted] = useState(true);
  const [countries, setCountries] = useState([]);
  const [searchInput, setSearchInput] = useState(countryName || '');
  const [errorMessage, setErrorMessage] = useState(false);
  const items = [...countries].splice((page - 1) * ITEMS_PER_PAGE, ITEMS_PER_PAGE);

  useEffect(() => {
    const countriesToState = async () => {
      try {
        await props.loadCountries(countryName || '');
        setCountries(props.countries);
        setErrorMessage(false);
        setMounted(false);
      } catch (error) {
        setCountries([]);
        setMounted(true);
        setErrorMessage(`The country "${countryName}" doesn't exist.`);
      }
    };
    countriesToState();
    //eslint-disable-next-line
  }, [mounted]);

  const inputGoTo = (value) => {
    navigate(`/home/1${value ? `?name=${value}` : ''}`);
    setMounted(!mounted);
  };

  return (
    <div className={Styles.div_container}>
      <h1>Let's start choosing the country you want to visit!</h1>
      <div className={Styles.div_search}>
        <Searchbar countries={countries.length} />
      </div>
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
