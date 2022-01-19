import React, { useState, useContext, useEffect } from 'react'

import { TextField, Typography, Grid, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { incomeCategories, expenseCategories } from '../../../constants/categories'

import useStyles from './styles';
import Snackbar from '../../Snackbar/Snackbar';
import formatDate from '../../../utils/formDate'

import { ExpenseTrackerContext } from '../../../context/context';
import { useSpeechContext } from '@speechly/react-client'
import { v4 as uuidv4 } from 'uuid'

const initialState = {
    amount: '',
    category: '',
    type: 'Income',
    date: formatDate(new Date())
}

const NewTransactionForm = () => {

    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const {addTransaction} = useContext(ExpenseTrackerContext)
    const {segment} = useSpeechContext();
    const [formData, setFormData] = useState(initialState);

    const createTransaction = () => {
        if(Number.isNaN(Number(formData.amount)) || !formData.date.includes('-')) return;

        if(incomeCategories.map((iC) => iC.type).includes(formData.category)){
            setFormData({...formData, type: 'Income'})    
        }else if (expenseCategories.map((eC) => eC.type).includes(formData.category)){
            setFormData({...formData, type: 'Expense'})
        }

        setOpen(true);
        addTransaction({...formData, amount: Number(formData.amount), id: uuidv4()})
        setFormData(initialState)
    }

    useEffect(() => {
        console.log(segment)
        if(segment){
            if(segment.intent.intent === 'add_expense'){
                setFormData({...formData, type: 'Expense'})
            } else if (segment.intent.intent === 'add_income'){
                setFormData({...formData, type: 'Income'})
            } else if (segment.isFinal && segment.intent.intent === 'create_transaction'){
                return createTransaction()
            } else if (segment.isFinal && segment.intent.intent === 'cancel_transaction'){
                return setFormData(initialState)
            }

            segment.entities.forEach((s) => {
                const category = `${s.value.charAt(0)}${s.value.slice(1).toLowerCase()}}`

                switch(s.type){
                    case 'amount':
                        setFormData({...formData, amount: s.amount})
                        break;
                    case 'category':
                        if(incomeCategories.map((iC) => iC.type).includes(category)){
                            setFormData({...formData, type: 'Income', category})
                        } else if (expenseCategories.map((eC) => eC.type).includes(category)){
                            setFormData({...formData, type: 'Expense', category})
                        }
                        break;
                    case 'date':
                        setFormData({...formData, date: s.value})
                        break;
                    default:
                        break;
                }
            });

            if (segment.isFinal && formData.amount && formData.type && formData.category && formData.date){
                createTransaction();
            }
        }
    }, [segment])

    const selectedCategories = formData.type === 'Income' ? incomeCategories : expenseCategories;

    return (
        <Grid container spacing={2}>
            <Snackbar open={open} setOpen={setOpen} />
            <Grid item xs={12}>
                <Typography align="center" variant="subtitle2" gutterBottom>
                    {segment ? (
                        <div className="segment">
                            {segment.words.map((w) => w.value).join(" ")}
                        </div>
                    ) : null}
                    
                </Typography>
            </Grid> 

            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>Type</InputLabel>
                    <Select value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})}>
                        <MenuItem value="Income">Income</MenuItem>
                        <MenuItem value="Expense">Expense</MenuItem>
                    </Select>
                </FormControl>
            </Grid>

            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
                        {selectedCategories.map((c) => <MenuItem key={c.type} value={c.type}>{c.type}</MenuItem>)}
                    </Select>
                </FormControl>
            </Grid>

            <Grid item xs={6}>
                <TextField type="number" label="Amount" value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})} fullWidth />
            </Grid>
            <Grid item xs={6}>
                <TextField type="date" label="Date" value={formData.date} onChange={(e) => setFormData({...formData, date: formatDate(e.target.value)})} fullWidth />
            </Grid>
            <Button className={classes.button} variant="outlined" color="primary" onClick={createTransaction} fullWidth>Create</Button>
        </Grid>
    )
}

export default NewTransactionForm
