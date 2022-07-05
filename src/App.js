import React, { useRef, useEffect } from 'react'
import { Grid } from '@material-ui/core'

import useStyles from './styles'

import { SpeechState, useSpeechContext } from '@speechly/react-client'
import { PushToTalkButton, PushToTalkButtonContainer } from '@speechly/react-ui'

import { Details, Main } from './components'

const App = () => {
  const classes = useStyles()
  const { speechState } = useSpeechContext()
  const main = useRef(null)

  const executeScroll = () => main.current.scrollIntoView()

  useEffect(() => {
    if (speechState === SpeechState.Recording) {
      executeScroll()
    }
  }, [speechState])

  return (
    <div>
      <Grid
        className={classes.grid}
        container
        spacing={0}
        alignItems='center'
        justifyContent='center'
        style={{ height: '100vh' }}
      >
        <Grid className={classes.mobile}>
          <Details title='Income' />
        </Grid>
        <Grid ref={main} item xs={12} sm={3} className={classes.main}>
          <Main />
        </Grid>
        <Grid xs={12} sm={4} item className={classes.desktop}>
          <Details title='Income' />
        </Grid>
        <Grid xs={12} sm={4} item className={classes.last}>
          <Details title='Expense' />
        </Grid>
      </Grid>
      <PushToTalkButtonContainer>
        <PushToTalkButton />
      </PushToTalkButtonContainer>
    </div>
  )
}

export default App
