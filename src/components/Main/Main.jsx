import React, { useContext } from 'react'
import { useSpeechContext } from '@speechly/react-client'
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Grid,
  Divider,
} from '@material-ui/core'

import { ExpenseTrackerContext } from '../../context/context'

import Form from './Form/Form'
import List from './List/List'
import InfoCard from '../InfoCard'

import useStyles from './styles'

const ExpenseTracker = () => {
  const classes = useStyles()
  const { balance } = useContext(ExpenseTrackerContext)

  return (
    <Card className={classes.root}>
      <CardHeader
        className={classes.header}
        title='Expense Tracker'
        subheader='Powered by Speechly'
      />
      <CardContent>
        <Typography align='center' variant='h6'>
          Total Balance: <span style={{ fontWeight: 'bold' }}>${balance}</span>
        </Typography>
        <Typography
          variant='subtitle1'
          style={{ lineHeight: '1.5em', marginTop: '20px' }}
        >
          <InfoCard />
        </Typography>
        <Divider className={classes.divider} />
        <Form />
      </CardContent>
      <CardContent className={classes.cartContent}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <List />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default ExpenseTracker
