import axios from 'axios';
import { LOADING_ERROR, FETCH_DATA, UPDATE_COUNTRY } from './types';

export const fetchData = () => async dispatch => {
    try {
        const res = await axios.get('https://api.covid19api.com/summary');
        dispatch({
            type: FETCH_DATA,
            payload: res.data
        })
    } catch(err) {
        dispatch({
            type: LOADING_ERROR,
            payload: `Error fetching data: ${err.message}`
        })
    }
}

export const selectCountry = (country) => dispatch => {
    dispatch({
        type: UPDATE_COUNTRY,
        payload: country
    })
}