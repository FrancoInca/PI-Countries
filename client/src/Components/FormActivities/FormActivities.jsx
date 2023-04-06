import React, {useEffect, useState} from 'react';
import {loadCountries} from '../../redux/actions';
import {connect} from 'react-redux';
import Styles from './FormActivities.module.css';
import {addActivity} from '../../redux/actions';

const FormActivites = ({countries, loadCountries, addActivity}) => {
  const [countriesAdded, setCountries] = useState({id: [], name: []});
  const [submitMessage, setSubmitMessage] = useState('');
  const [activityName, setActivityName] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [errorList, setErrorList] = useState({});
  const [mounted, setMounted] = useState(false);
  const [season, setSeason] = useState('');
  const [page, setPage] = useState(0);

  useEffect(() => {
    const getCountries = async () => {
      await loadCountries();
    };
    if (!countries.length) getCountries();
    //eslint-disable-next-line
  }, [mounted]);

  const totalCountries = searchInput ? [...countries].filter((e) => e.name.includes(searchInput)) : [...countries];
  const items = [...totalCountries].splice(page * 5, 5);
  const seasons = ['Summer', 'Autumn', 'Winter', 'Spring'];

  const nextPage = () => {
    if ((page + 1) * 5 < countries.length) setPage(page + 1);
  };
  const prevPage = () => {
    if (page !== 0) setPage(page - 1);
  };

  const handleAddCountries = (id, name) => {
    if (countriesAdded.id.some((c) => c === id)) {
      const newCountriesId = countriesAdded.id.filter((c) => c !== id);
      const newCountriesName = countriesAdded.name.filter((c) => c !== name);
      return setCountries({id: newCountriesId, name: newCountriesName});
    }
    setCountries({id: [...countriesAdded.id, id], name: [...countriesAdded.name, name]});
  };

  const validate = (values) => {
    const errors = {};
    if (!values.name) errors.name = 'Activity must have a name';
    if (1 > values.difficulty || values.difficulty > 5 || !values.difficulty)
      errors.difficulty = 'Activity must have a difficulty between 1 and 5';
    if (!values.season) errors.season = 'Activity must have a season';
    if (!values.CountryID) errors.CountryID = 'Activity must have at least one country';
    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const activity = {
      name: activityName,
      difficulty: difficulty,
      season: season,
      CountryID: countriesAdded.id.join(','),
    };
    const result = validate(activity);
    if (Object.keys(result).length) {
      setErrorList(result);
      setMounted(!mounted);
      return;
    }
    try {
      await addActivity(activity);
      setErrorList({});
      setMounted(!mounted);
      setSubmitMessage('The activity has been added');
    } catch (err) {
      console.log(err.response.status);
      console.log(err.response.data);
      setErrorList({});
      if (err.response.status === 409) setSubmitMessage(`The activity "${activity.name}" already exist.`);
      setMounted(!mounted);
    }
  };

  return (
    <div className={Styles.container}>
      <div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <p>Introduce the name of the activity:</p>
          <input
            type="text"
            name="name"
            id="name"
            value={activityName}
            onChange={(e) => setActivityName(e.target.value)}
            className={Styles.text_input}
            placeholder="Activity Name"
          />

          {errorList.name && <p style={{color: 'red', fontSize: '15px'}}>{errorList.name}</p>}

          <p>Choose the difficulty:</p>

          <input
            type="number"
            name="difficulty"
            id="difficulty"
            value={difficulty}
            onChange={(e) => {
              setDifficulty(e.target.value);
              if (0 > e.target.value) setDifficulty(0);
              if (e.target.value > 5) setDifficulty(5);
            }}
            style={{width: '50px'}}
            className={Styles.text_input}
            placeholder="1"
          />

          {errorList.difficulty && <p style={{color: 'red', fontSize: '15px'}}>{errorList.difficulty}</p>}

          <p>Choose the season:</p>
          <ul>
            {seasons.map((e) => (
              <li key={e}>
                <input type="radio" id={e} name="season" value={e} onChange={(ev) => setSeason(ev.target.value)} />
                <label htmlFor={e}>{e}</label>
              </li>
            ))}
          </ul>

          {errorList.season && <p style={{color: 'red', fontSize: '15px'}}>{errorList.season}</p>}
          <p>Choose the Countries:</p>
          <div className={Styles.change_page}>
            <div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  prevPage();
                }}>
                {'<'}
              </button>
              <p>{page + 1}</p>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  nextPage();
                }}>
                {'>'}
              </button>
            </div>
            <input
              type="text"
              className={Styles.text_input}
              style={{width: '200px', height: '20px'}}
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
                setPage(0);
              }}
            />
            <button type="submit" className={Styles.submit}>
              Submit
            </button>
          </div>

          {errorList.countries && <p style={{color: 'red', fontSize: '15px'}}>{errorList.countries}</p>}

          {countriesAdded.id.length !== 0 && <p>Countries you are adding: {countriesAdded.name.join(', ')}</p>}

          <div className={Styles.countries_container}>
            {items.map((e) => (
              <div key={e.id}>
                <button
                  onClick={(event) => {
                    event.preventDefault();
                    handleAddCountries(e.id, e.name);
                  }}>
                  <div>
                    <p>{e.name}</p>
                  </div>
                  <img src={e.flag} alt={e.name} />
                </button>
              </div>
            ))}
          </div>
        </form>

        {submitMessage && <h1 style={{marginBottom: '40px', color: '#98b871'}}>{submitMessage}</h1>}
      </div>
    </div>
  );
};
export function mapStateToProps(state) {
  return {
    countries: state.countries,
  };
}
export function mapDispatchToProps(dispatch) {
  return {
    loadCountries: function () {
      return dispatch(loadCountries());
    },
    addActivity: function (data) {
      return dispatch(addActivity(data));
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(FormActivites);
