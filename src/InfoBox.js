import { Card, CardContent, Typography } from '@mui/material'
import React from 'react'
import numeral from 'numeral'
import './InfoBox.css'
function InfoBox({title,cases,isRed,active,total, ...props}) {
  return (
    <Card className={`infoBox ${active && 'infoBox--selected'} ${isRed && 'infoBox-red'}`}
      onClick={props.onClick}
    >
        <CardContent>
            <Typography color='textSecondary' className='infoBox__title' >{title}</Typography>
            <h2 className='infoBox__cases' > +{numeral(cases).format('0,0') } </h2>
            <Typography color='textSecondary' className='infoBox__total' >
                {numeral(total).format('0,0')} Total
            </Typography>
        </CardContent>
    </Card>
  )
}

export default InfoBox