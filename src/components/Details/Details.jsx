import { Card, CardHeader, CardContent, Typography } from '@material-ui/core'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import useTransactions from '../../useTransactions'

import useStyles from './styles'

ChartJS.register(ArcElement, Tooltip, Legend);

const DetailsCard = ({title, subheader}) => {
    const {total, chartData} = useTransactions(title)
    const classes = useStyles();

    return (
        <Card className={title === 'Income' ? classes.income : classes.expense}>
            <CardHeader title={title} subheader={subheader} />
            <CardContent>
                <Typography variant="h4" align="center" className={classes.price}>${total}</Typography>
                <Doughnut data={chartData} />
            </CardContent>
        </Card>
    )
}

export default DetailsCard
