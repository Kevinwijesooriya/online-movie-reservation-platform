import React, {useContext} from 'react';
import { GlobalState } from '../../GlobalState';

import './theater.css';

function Filters() {
    const state = useContext(GlobalState)
    const [locations] = state.locationAPI.locations

    const [location, setLocation] = state.theatersAPI.location
    const [sort, setSort] = state.theatersAPI.sort
    const [search, setSearch] = state.theatersAPI.search


    const handleLoaction = e => {
        setLocation(e.target.value)
        setSearch('')
    }

    return (
        <div className="filter_menu">
            <div className="row1">
                <span>Filters: </span>
                <select name="location" value={location} onChange={handleLoaction} >
                    <option value=''>All Locations</option>
                    {
                        locations.map(location => (
                            <option value={"location=" + location._id} key={location._id}>
                                {location.location}
                            </option>
                        ))
                    }
                </select>
            </div>

            <input type="text" value={search} placeholder="Enter your search!"
            onChange={e => setSearch(e.target.value.toLowerCase())} />

            <div className="row sort">
                <span>Sort By: </span>
                <select value={sort} onChange={e => setSort(e.target.value)} >
                    <option value=''>Newest</option>
                    <option value='sort=oldest'>Oldest</option>
                </select>
            </div>
        </div>
    )
}

export default Filters;