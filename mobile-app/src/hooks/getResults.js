import {useState, useEffect} from 'react';
import getMarkers from '../api/GetMarkers';

export default () => {

    const [results, setResults] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const findById = async (term) => {
        try { 
            await getMarkers.get('/api/resource' , {
                params : {
                    id : term
                } 
            }).then ( (response) => {
                setResults(response.data);
                setErrorMessage('');    
            }).catch( function (errora)  {
                setErrorMessage('Error while connecting to the server API,---->' + errora);
            });
        } catch (err) {
            setErrorMessage('Error while connecting to the server API, Error-> ' + err);
            console.log(err);
        }
    };

    const findAllByType = async (term) => {
        try { 
            await getMarkers.get('/api/resource' , {
                params : {
                    type : term
                } 
            }).then ( (response) => {
                setResults(response.data);
                setErrorMessage('');    
            }).catch( function (errora)  {
                setErrorMessage('Error while connecting to the server API,---->' + errora);
            });
        } catch (err) {
            setErrorMessage('Error while connecting to the server API, Error-> ' + err);
            console.log(err);
        }
    };
    const findAllByName = async (term) => {
        try { 
            await getMarkers.get('/api/resource' , {
                params : {
                    name : term
                } 
            }).then ( (response) => {
                setResults(response.data);
                setErrorMessage('');    
            }).catch( function (errora)  {
                setErrorMessage('Error while connecting to the server API,---->' + errora);
            });
        } catch (err) {
            setErrorMessage('Error while connecting to the server API, Error-> ' + err);
            console.log(err);
        }
    };

    useEffect ( () => {
        findAllByName('');
    }, []);

    return [findAllByType, findAllByName, findById, results, errorMessage];
}; 