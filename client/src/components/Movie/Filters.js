import React, {useContext} from 'react';
import { GlobalState } from '../../GlobalState';



function Filters() {
    const state = useContext(GlobalState)
    const [categories] = state.categoriesAPI.categories

    const [category, setCategory] = state.moviesAPI.category
    const [sort, setSort] = state.moviesAPI.sort
    const [search, setSearch] = state.moviesAPI.search


    const handleCategory = e => {
        setCategory(e.target.value)
        setSearch('')
    }

    return (
        <div className="filter_menu formBody">
            <div className="row1">
                <span>Filters: </span>
                <select name="category" value={category} onChange={handleCategory} >
                    <option value=''>All Movies</option>
                    {
                        categories.map(category => (
                            <option value={"category=" + category._id} key={category._id}>
                                {category.name}
                            </option>
                        ))
                    }
                </select>
            </div>
            
            <input type="text" value={search} placeholder="Enter your search...."
            onChange={e => setSearch(e.target.value.toLowerCase())} />
         
            <div className="row1 sort">
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