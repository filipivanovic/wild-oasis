import { useQuery } from '@tanstack/react-query'
import { getCabins } from '../../services/apiCabins.js'

export const useCabins = () => {
  const {
    isLoading,
    data: cabins,
    error
  } = useQuery({
    queryKey: ['cabins'],
    queryFn: getCabins
  })

  return { cabins, isLoading, error }
}