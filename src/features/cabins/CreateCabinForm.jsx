import { useForm } from 'react-hook-form'
import { createEditCabin } from '../../services/apiCabins.js'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import Input from '../../ui/Input'
import Form from '../../ui/Form.jsx'
import Button from '../../ui/Button.jsx'
import FileInput from '../../ui/FileInput.jsx'
import Textarea from '../../ui/Textarea.jsx'
import FormRow from '../../ui/FormRow.jsx'

function CreateCabinForm({ cabinToEdit = {} }) {
  const { id: editId, ...editValues } = cabinToEdit
  const isEditSession = Boolean(editId)

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors }
  } = useForm({
    defaultValues: isEditSession ? editValues : {}
  })

  const queryClient = useQueryClient()

  const { isLoading: isWorking, mutate } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success(isEditSession ? 'Cabin updated successfully' : 'Cabin created successfully')
      queryClient.invalidateQueries({ queryKey: ['cabins'] })
      reset()
    },
    onError: err => {
      console.error(err)
      toast.error('Something went wrong. Please try again.')
    }
  })

  const onSubmit = data => {
    const image = typeof data.image === 'string' ? data.image : data.image?.[0]

    const cabinData = {
      ...data,
      image
    }

    if (isEditSession) {
      mutate({ ...cabinData, id: editId })
    } else {
      mutate(cabinData)
    }
  }

  const onError = errors => {
    console.log('Form validation errors:', errors)
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow error={errors?.name?.message} label="Cabin name" disabled={isWorking}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register('name', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow error={errors?.maxCapacity?.message} label="Maximum capacity" disabled={isWorking}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register('maxCapacity', {
            required: 'This field is required',
            min: { value: 1, message: 'Capacity must be at least 1 guest' }
          })}
        />
      </FormRow>

      <FormRow error={errors?.regularPrice?.message} label="Regular price" disabled={isWorking}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register('regularPrice', {
            required: 'This field is required',
            min: { value: 1, message: 'Price must be at least 1' }
          })}
        />
      </FormRow>

      <FormRow error={errors?.discount?.message} label="Discount" disabled={isWorking}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={isWorking}
          {...register('discount', {
            required: 'This field is required',
            validate: value =>
              Number(value) <= Number(getValues().regularPrice) ||
              'Discount should be less than regular price'
          })}
        />
      </FormRow>

      <FormRow error={errors?.description?.message} label="Description" disabled={isWorking}>
        <Textarea
          id="description"
          defaultValue=""
          disabled={isWorking}
          {...register('description', {
            required: 'This field is required'
          })}
        />
      </FormRow>

      <FormRow error={errors?.image?.message} label="Cabin photo" disabled={isWorking}>
        <FileInput
          id="image"
          accept="image/*"
          disabled={isWorking}
          {...register('image', {
            required: isEditSession ? false : 'This field is required'
          })}
        />
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset" disabled={isWorking}>
          Cancel
        </Button>
        <Button disabled={isWorking}>{isEditSession ? 'Edit cabin' : 'Create new cabin'}</Button>
      </FormRow>
    </Form>
  )
}

export default CreateCabinForm