import Heading from '../ui/Heading'
import Row from '../ui/Row'
import { useEffect } from 'react'
import { getCabins } from '../services/apiCabins.js'

function Cabins() {
  useEffect(() => {
    getCabins().then(res => console.log(res))
  }, [])

  return (
    <Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
      <img
        src="https://gxgjesglnrpqkakhmnqp.storage.supabase.co/v1/object/public/cabin-images//cabin-001.jpg"
        alt=""
      />
      <p>TEST</p>
    </Row>
  )
}

export default Cabins