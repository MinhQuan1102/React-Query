import axios from 'axios';
import React, { useState } from 'react'
import { useQuery } from 'react-query';

const fetchColors = (pageNumber: number) => {
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageNumber}`);
}

const PaginatedQueries = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { isLoading, isError, error, data, isFetching } = useQuery(
    ['colors', pageNumber],
    () => fetchColors(pageNumber), 
    {
      keepPreviousData: true,
    }
  );

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  if (isError) {
    return <h2>Error</h2>
  }

  console.log(data)

  return (
    <div>
      <div>
        {data?.data.map((color) => (
          <div key={color.id}>
            <h2>
              {color.label}
            </h2>
          </div>
        ))}
      </div>
      <div>
        <button onClick={() => setPageNumber((page) => page - 1)} disabled={ pageNumber === 1}>Prev page</button>
        <button onClick={() => setPageNumber((page) => page + 1)} disabled={ pageNumber === 4}>Next page</button>
      </div>
      {  isFetching && 'Loading'}
    </div>
  )
}

export default PaginatedQueries