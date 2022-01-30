import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  income: {
    borderBottom: '10px solid rgba(0, 255, 0, 0.5)',
    textAlign: 'center',
    
  },
  expense: {
    borderBottom: '10px solid rgba(255, 0, 0, 0.5)',
    textAlign: 'center'
  },
  priceIncome: {
    color: '#218D28',
    fontWeight: 'bold',
    marginBottom: '0.2em'
  },
  priceExpense: {
    color: '#AD2C2C',
    fontWeight: 'bold',
    marginBottom: '0.2em'
  }
}));