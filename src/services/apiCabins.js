import supabase, { supabaseUrl } from './supabase.js'

export const getCabins = async () => {
  const { data, error } = await supabase.from('cabins').select('*')

  if (error) {
    console.error(error)
    throw new Error('Cabins could not be loaded')
  }

  return data
}

export const deleteCabin = async id => {
  const { data, error } = await supabase.from('cabins').delete().eq('id', id)

  if (error) {
    console.error(error)
    throw new Error('Cabin could not be deleted')
  }

  return data
}

export const createEditCabin = async (newCabin, id) => {
  const cabinId = id || newCabin.id
  const isEditing = Boolean(cabinId)

  const hasImagePath = typeof newCabin.image === 'string' && newCabin.image.startsWith(supabaseUrl)
  const imageName = `${Math.random()}-${newCabin.image?.name || ''}`.replaceAll('/', '')
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`

  let query = supabase.from('cabins')

  if (!isEditing) {
    const { id, ...cabinData } = newCabin
    query = query.insert([{ ...cabinData, image: imagePath }])
  } else {
    query = query.update({ ...newCabin, image: imagePath }).eq('id', cabinId)
  }

  const { data, error } = await query.select().single()

  if (error) {
    console.error(error)
    throw new Error(isEditing ? 'Cabin could not be updated' : 'Cabin could not be created')
  }

  if (!hasImagePath) {
    const { error: storageError } = await supabase.storage
      .from('cabin-images')
      .upload(imageName, newCabin.image)

    if (storageError) {
      if (!isEditing) {
        await supabase.from('cabins').delete().eq('id', data.id)
      }
      console.error(storageError)
      throw new Error('Cabin image could not be uploaded')
    }
  }

  return data
}