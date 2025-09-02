import React, { useState } from 'react';
import Header from './components/Header.jsx'
import UserInput from './components/UserInput.jsx'
import OutputData from './components/OutputData.jsx';

const initialValues = {
  initialInvestment: 10000,
  annualInvestment: 1200,
  expectedReturn: 6,
  duration: 10
};

function App() {
  const [userInput, setUserInput] = useState(initialValues);
  const [currency, setCurrency] = useState('USD')
  const [error, setError] = useState('');

  const handleChange = (inputIdentifier, newValue) => {
    setUserInput(prev => ({
      ...prev, [inputIdentifier]: +newValue
    }));

    if (error) {
      setError('');
    }
  };


  const handleReset = () => {
    setUserInput(initialValues);
    setCurrency('USD');
    setError('');
  }

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const currencySymbol = () => {
    switch (currency) {
      case 'EUR':
        return '€';
      case 'GBP':
        return '£';
      default: return '$';
    }
  };

  return (
    <>
      <Header title='Ivestment Managment' />
      <UserInput
        userInput={userInput}
        setUserInput={setUserInput}
        handleChange={handleChange}
        currency={currency}
        setCurrency={setCurrency}
        initialValues={initialValues}
        error={error}
        setError={setError}
        handleReset={handleReset}
        currencySymbol={currencySymbol}
      />
      <OutputData inputValue={userInput} formatter={formatter} />
    </>
  );
};

export default App;
