import { Card, CardContent } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import FormCtrl from 'src/@core/components/form-ctrl'

const Form = () => {
  const router = useRouter()

  return (
    <Card>
      <CardContent>
        <FormCtrl query={router.query} />
      </CardContent>
    </Card>
  )
}

export default Form
