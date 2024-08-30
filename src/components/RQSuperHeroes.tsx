import React, { useState } from 'react'
import { useAddSuperHeroData, useSuperHeroesData } from '../hooks/useSuperHeroesData.ts';
import { Link } from 'react-router-dom';

const RQSuperHeroes = () => {
  const [name, setName] = useState('');
  const [alterEgo, setAlterEgo] = useState('');
  
  const onSuccess = (data) => {
    
  }

  const onError = () => {

  }

  const { isLoading, data, isError, error, isFetching, refetch } = useSuperHeroesData(onSuccess, onError);

  const { mutate: addHero } = useAddSuperHeroData();
  
  const handleAddHeroClick = () => {
    const hero = { name, alterEgo };
    addHero(hero);
  }

  if (isLoading || isFetching) {
    return <h2>Loading...</h2>
  }

  if (isError) {
    return <h2>Error</h2>
  }

  console.log(data);

  return (
    <div>
      <h2>
        RQ Super Heroes Page
      </h2>
      <div>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="text" value={alterEgo} onChange={(e) => setAlterEgo(e.target.value)} />
        <button onClick={handleAddHeroClick}>Add hero</button>
      </div>
      <button onClick={() => refetch()}>Fetch heroes</button>
      {
        data?.data.map((hero) => {
          return <div key={hero.id}>
            <Link to={`/rq-super-heroes/${hero.id}`}>
              {hero.name}
            </Link>
          </div>
        })
      }
      {/* {
        data.map((hero) => {
          return <div key={hero}>{hero}</div>
        })
      } */}
    </div>
  )
}

export default RQSuperHeroes