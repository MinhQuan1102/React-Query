import { useQuery } from 'react-query';
import axios from 'axios';
import React from 'react';

const fetchSuperHeroes = () => {
  return axios.get('http://localhost:4000/superheroes');
}

const fetchFriends = () => {
  return axios.get('http://localhost:4000/friends');
}

const ParallelQueries = () => {
  useQuery('super-heroes', fetchSuperHeroes);
  useQuery('friends', fetchFriends);

  return (
    <div>ParallelQueries</div>
  )
}

export default ParallelQueries