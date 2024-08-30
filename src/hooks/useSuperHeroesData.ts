import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { request } from "../utils/axios.util.ts";

const fetchSuperHeroes = () => {
  return axios.get('http://localhost:4000/superheroes');
  // return request({ url: '/superheroes' });
}

const addSuperHero = (hero) => {
  return axios.post('http://localhost:4000/superheroes', hero);
  // return request({ url: '/superheroes', method: 'post', data: hero });
}

export const useSuperHeroesData = (onSuccess, onError) => {
  return useQuery(
    'super-heroes',
    fetchSuperHeroes,
    {
      onSuccess,
      onError,
      // select: (data) => {
      //   const superHeroNames = data.data.map((hero) => hero.name);
      //   return superHeroNames;
      // },
    }
    // {
    //   cacheTime: 50000,
    //   refetchOnMount: true,
    //   refetchOnWindowFocus: true,
    //   refetchInterval: 2000, // refetch every 2 seconds
    //   refetchIntervalInBackground: true // refetch even if window is not focused
    // }
  );
}

export const useAddSuperHeroData = () => {
  const queryClient = useQueryClient();
  return useMutation(addSuperHero, {
    // onSuccess: (data) => {
    //   // queryClient.invalidateQueries('super-heroes');
    //   queryClient.setQueryData('super-heroes', (oldQueryData) => {
    //     return {
    //       ...oldQueryData, 
    //       data: [...oldQueryData.data, data.data],
    //     }
    //   });
    // }
    onMutate: async (newHero) => {
      await queryClient.cancelQueries('super-heroes');
      const previousHeroData = queryClient.getQueryData('super-heroes');
      queryClient.setQueryData('super-heroes', (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [
            ...oldQueryData.data,
            { id: oldQueryData?.data?.length + 1, ...newHero }
          ]
        }
      });
      return {
        previousHeroData
      }
    }, 
    onError: (_error, _hero, context) => {
      queryClient.setQueryData('super-heroes', context?.previousHeroData);
    },
    onSettled: () => {
      queryClient.invalidateQueries('super-heroes');
    }
  });
}