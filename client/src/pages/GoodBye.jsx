import React, { useEffect } from 'react'
import { Card, CardContent, Typography } from '@mui/material'
import ReactGA from 'react-ga4'

const GoodBye = () => {
  useEffect(() => {
    // Send pageview with a custom path
    ReactGA.send({
      hitType: 'pageview',
      page: `/goodbye`,
      title: 'goodbye',
    })
  }, [])

  return (
    <Card
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <CardContent>
        <Typography variant="h2">Gracias!</Typography>
      </CardContent>
      <CardContent>
        <Typography variant="caption">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat non
          labore ex quaerat facilis aut, quasi pariatur adipisci atque, dolorem
          quos cupiditate dolor? Repellat rem recusandae similique sit odit
          harum!
        </Typography>
      </CardContent>
      <CardContent>
        {' '}
        <Typography variant="overline">www.loremipsum.com</Typography>
      </CardContent>
    </Card>
  )
}

export default GoodBye
