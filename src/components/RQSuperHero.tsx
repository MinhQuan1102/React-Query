import React from 'react'
import { useSuperHeroData } from '../hooks/useSuperHeroData.ts'
import { useParams } from 'react-router-dom'

const RQSuperHero = () => {
  const { heroId } = useParams();
  const { isLoading, data, isError, error } = useSuperHeroData(heroId);

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  if (isError) {
    return <h2>Error</h2>
  }

  return (
    <div>
      {data?.data.name} - {data?.data.alterEgo}
    </div>
  )
}

export default RQSuperHero