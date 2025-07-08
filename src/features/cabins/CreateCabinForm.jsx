import Input from '../../ui/Input'
import Form from '../../ui/Form.jsx'
import Button from '../../ui/Button.jsx'
import FileInput from '../../ui/FileInput.jsx'
import Textarea from '../../ui/Textarea.jsx'
import { useForm } from 'react-hook-form'
import { createCabin } from '../../services/apiCabins.js'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import FormRow from '../../ui/FormRow.jsx'

function CreateCabinForm() {
  const { register, handleSubmit, reset, getValues, formState } = useForm()

  const { errors } = formState

  const queryClient = useQueryClient()

  const { isLoading: isCreating, mutate } = useMutation(createCabin, {
    // mutationFn: newCabin => createCabin(newCabin)
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success('Cabin created successfully')
      queryClient.invalidateQueries({ queryKey: ['cabins'] })
      reset()
    },
    onError: err => {
      console.log(err)
      toast.error('Something went wrong. Please try again.')
    }
  })

  const onSubmit = data => {
    console.log(data)
    mutate({
      ...data,
      image: data.image[0]
    })
  }
  const onError = errors => {
    console.log('Error: ', errors)
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow error={errors?.name?.message} label={'Cabin name'} disabled={isCreating}>
        <Input
          type="text"
          id="name"
          {...register('name', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow
        error={errors?.maxCapacity?.message}
        label={'Maximum capacity'}
        disabled={isCreating}
      >
        <Input
          type="number"
          id="maxCapacity"
          {...register('maxCapacity', {
            required: 'This field is required',
            min: { value: 1, message: 'Capacity must be at least 1 guest' }
          })}
        />
      </FormRow>

      <FormRow error={errors?.regularPrice?.message} label={'Regular price'} disabled={isCreating}>
        <Input
          type="number"
          id="regularPrice"
          {...register('regularPrice', {
            required: 'This field is required',
            min: { value: 1, message: 'Minimum capacity is 1 guest' }
          })}
        />
      </FormRow>

      <FormRow error={errors?.discount?.message} label={'Discount'} disable={isCreating}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register('discount', {
            required: 'This field is required',
            validate: value =>
              Number(value) <= Number(getValues().regularPrice) ||
              'Discount should be less than regular price'
          })}
        />
      </FormRow>

      <FormRow error={errors?.description?.message} label={'Description'} disabled={isCreating}>
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register('description', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow label={'Cabin photo'}>
        <FileInput
          id="image"
          accept="image/*"
          {...register('image', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>Add cabin</Button>
      </FormRow>
    </Form>
  )
}

export default CreateCabinForm