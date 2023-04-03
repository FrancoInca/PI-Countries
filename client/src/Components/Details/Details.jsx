import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {loadCountry} from '../../redux/actions';
import {connect} from 'react-redux';
import Styles from './Details.module.css';
import Detail from './Detail';
import Activities from '../Activities/Activities';

const Details = ({loadCountry, countryData}) => {
  const {cc} = useParams();
  const [data, setData] = useState({});
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const countryToState = async () => {
      await loadCountry(cc);
      setData(countryData);
      setMounted(true);
    };
    countryToState();
    if (!data) setMounted(!mounted);
    //eslint-disable-next-line
  }, [mounted]);
  return (
    <div className={Styles.div_container}>
      <Detail data={data} />

      {data.hasOwnProperty(`Activities`) ? (
        <>
          {data.Activities.length > 0 ? (
            <h1>The activites you can do in {data.name}!</h1>
          ) : (
            <h1>There is no activities for {data.name} right now...</h1>
          )}
          <Activities props={data} />
        </>
      ) : null}
    </div>
  );
};
export function mapStateToProps(state) {
  return {countryData: state.countryData};
}
export function mapDispatchToProps(dispatch) {
  return {
    loadCountry: function (countryCode) {
      return dispatch(loadCountry(countryCode));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Details);
