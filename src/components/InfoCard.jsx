import React from 'react'

const isIncome = Math.round(Math.random())

const InfoCard = () => {
  return (
    <div
      elevation={3}
      style={{ textAlign: 'center', padding: '0 10%', boxShadow: 'none' }}
    >
      <small>
        Try saying: <br />
      </small>
      <span
        style={{
          marginTop: '0.8em',
          backgroundColor: '#FFFBDB',
          padding: '0.4em',
        }}
      >
        Add {isIncome ? 'Income' : 'Expense '}
        for {isIncome ? '$100' : '$50 '}
        in Category {isIncome ? 'Salary' : 'Travel '}
        for {isIncome ? 'Monday' : 'Thursday'}
      </span>
    </div>
  )
}

export default InfoCard
