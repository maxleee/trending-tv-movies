import React, {useState} from 'react'
import styled from 'styled-components'

import {key} from 'Utilities';

const Search = ({setMovies, setCategory, setIsSearch}) => {
    const [query, setQuery] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!query){return}

        const url = `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=${query}&page=1&include_adult=false`;
       const res =  await fetch(url)
       const data = await res.json();
       setMovies(data.results.filter(movie => movie.backdrop_path))
       setIsSearch(true)
       setCategory('movie')
    }
   return ( 
    <SearchForm onSubmit={handleSubmit}>
        <label htmlFor="search" >Search</label>
        <input type="text" name="search" value={query} onChange={e => (setQuery(e.currentTarget.value))} required/>
        <button type="submit">Search</button>
    </SearchForm>
)

}

const SearchForm = styled.form`
display: flex;
align-items: center;
    label {
        font-size: 1rem;
        margin-right: .5rem;
    }
    input {
        padding: .5rem;
    }
    button {
        background-color: white;
        border: none;
        font-size: 1rem;
        border-radius: 5px;
        padding: .5rem 1rem;
        margin: 1rem;
    }
`
export default Search