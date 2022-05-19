import React, {createContext, useState, useEffect} from 'react';
import CategoriesAPI from './Api/CategoriesAPI';
import LocationAPI from './Api/LocationApi';
import MoviesAPI from './Api/MoviesAPI';
import TheatersAPI from './Api/TheaterApi';

import UserAPI from './Api/UserAPI';
export const GlobalState = createContext();


export const DataProvider = ({children}) =>{
    const [token, setToken] = useState('');
    
    useEffect(() =>{
        const firstLogin = localStorage.getItem('firstLogin')
        if(firstLogin){
            const token = sessionStorage.getItem('token');
            if (token) {
                setToken(token);
            }
        }
    },[])

  
    const state = {
        token: [token, setToken],
        userAPI: UserAPI(token),
        theatersAPI:TheatersAPI(),
        locationAPI:LocationAPI(),
        categoriesAPI: CategoriesAPI(),
        moviesAPI:MoviesAPI(),
        //ticketAPI:TicketsAPI(),
    }

    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}