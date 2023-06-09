import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import Styles from './Welcome.module.css';
import Cards from '../Cards/Cards';
import {loadSomeCountries, loadActivities} from '../../redux/actions';
import GoToTopButton from '../goToTop/goToTop';
import Detail from '../Details/Detail';
import Activities from '../Activities/Activities';

const Welcome = (props) => {
  const [countries, setCountries] = useState([]);
  const [activites, setActivities] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const countriesToState = async () => {
      await props.loadSomeCountries();
      await props.loadActivities();
      setMounted(true);
    };
    if (!mounted) countriesToState();
    setCountries(props.countriesWelcome);
    setActivities(props.activities);
    //eslint-disable-next-line
  }, [mounted]);
  return (
    <>
      <div className={Styles.header__img}>
        <div className={Styles.wrap}>
          <div className={Styles.box}>
            <h2>Welcome to WikiTravel</h2>
            <p>Ready for your next adventure?</p>
          </div>
        </div>
      </div>
      <GoToTopButton />
      <div className={Styles.containers}>
        <div className={Styles.container}>
          <div className={Styles.flag__container}>
            <Cards props={countries} />
          </div>
          <h1 className={Styles.first__h1}>Choose between all the countries in the world!</h1>
          <div className={Styles.flag__container_phone}>
            <Cards props={countries} />
          </div>
        </div>
        <div className={Styles.container}>
          <h1 className={Styles.second__h1}>Find all the info you need for your next journey</h1>
          <div className={Styles.div__img}>{countries[1] ? <Detail data={countries[1]} /> : null}</div>
        </div>
        <div className={Styles.last_container}>
          <h1 className={Styles.third__h1}>Choose the activities you want!</h1>
        </div>
        <Activities props={activites} />
      </div>
    </>
  );
};
export function mapStateToProps(state) {
  return {countriesWelcome: state.countriesWelcome, activities: state.activities};
}
export function mapDispatchToProps(dispatch) {
  return {
    loadSomeCountries: function () {
      return dispatch(loadSomeCountries());
    },
    loadActivities: function () {
      return dispatch(loadActivities());
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
