import axios from 'axios';
import React, { Fragment, useState } from 'react'
import { useInfiniteQuery } from 'react-query';

const fetchColors = ({ pageParam = 1}) => {
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageParam}`);
}

const InfiniteQueries = () => {
  const { isLoading, isError, error, data, isFetching, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ['colors'], fetchColors,
    {
      getNextPageParam: (_lastPage, pages) => {
        if (pages.length < 4) {
          return pages.length + 1;
        } else {
          return undefined;
        }
      } 
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
        {data?.pages.map((group, index) => (
          <Fragment key={ index }>
            {
              group.data.map((color) => (
                <h2 key={color.id}>{color.id}. {color.label}</h2>
              ))
            }
          </Fragment>
        ))}
      </div>
      <div>
        <button disabled={!hasNextPage} onClick={() => fetchNextPage()}>Load more</button>
      </div>
      <div>{ isFetching && !isFetchingNextPage ? 'Fetching' : null }</div>
    </div>
  )
}

export default InfiniteQueries