import React from 'react'

const isIncome = Math.round(Math.random());

const InfoCard = () => {
    return (
        <div elevation={3} style={{textAlign: 'center', padding: '0 10%'}}>
            Try saying: <br/>
            <span style={{marginTop: '0.3em', backgroundColor: '#FFFBDB', padding: '0.2em'}}>
            Add {isIncome ? 'Income' : 'Expense '}
            for {isIncome ? '$100' : '$50 '}
            in Category {isIncome ? 'Salary' : 'Travel '}
            for {isIncome ? 'Monday' : 'Thursday'}
            </span>
        </div>
    )
}

export default InfoCard
