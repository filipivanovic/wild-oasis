import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteCabin as deleteCabinApi } from '../../services/apiCabins.js'
import toast from 'react-hot-toast'

export const useDeleteCabin = () => {
  const queryClient = useQueryClient()

  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: id => deleteCabinApi(id),
    onSuccess: () => {
      toast.success('Cabin deleted successfully')
      queryClient.invalidateQueries({
        queryKey: ['cabins']
      })
    },
    onError: err => {
      toast.error('Something went wrong. Please try again.')
      console.log(err)
    }
  })
  return { isDeleting, deleteCabin }
}