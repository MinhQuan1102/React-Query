import axios from 'axios';
import React from 'react';
import { useQueries } from 'react-query';

const fetchSuperHeroes = (heroId) => {
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
}

const DynamicParallel = ({ heroIds }) => {
  console.log(heroIds)
  const queryResults = useQueries(
    heroIds.map(id => { 
      return {
        queryKey: ['super-hero', id],
        queryFn: () => fetchSuperHeroes(id)
      }
    })
  )
  return (
    <div>DynamicParallel</div>
  )
}

export default DynamicParallel