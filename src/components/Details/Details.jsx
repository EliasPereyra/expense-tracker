import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import SaveAltIcon from '@material-ui/icons/SaveAlt'
import PublishIcon from '@material-ui/icons/Publish'
import { Card, CardHeader, CardContent, Typography } from '@material-ui/core'

import useTransactions from '../../hooks/useTransactions'
import useStyles from './styles'

ChartJS.register(ArcElement, Tooltip, Legend)

const DetailsCard = ({ title, subheader }) => {
  const { total, chartData } = useTransactions(title)
  const classes = useStyles()
  const Icons = ({ title }) => {
    return title === 'Income' ? <SaveAltIcon /> : <PublishIcon />
  }

  return (
    <Card className={title === 'Income' ? classes.income : classes.expense}>
      <CardHeader title={title} subheader={subheader} />
      <Icons title={title} />
      <CardContent>
        <Typography
          variant='h4'
          align='center'
          className={
            title === 'Income' ? classes.priceIncome : classes.priceExpense
          }
        >
          ${total}
        </Typography>
        <Doughnut data={chartData} />
      </CardContent>
    </Card>
  )
}

export default DetailsCard
