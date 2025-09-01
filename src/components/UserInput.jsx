import React, { useState } from 'react'

const initialValues = {
  initialInvestment: 10000,
  annualInvestment: 1200,
  expectedReturn: 6,
  duration: 10
};

const UserInput = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const hasInvalid = Object.values(userInput).some(value => value <= 0);
    if (hasInvalid) {
      setError('Please fill all fields with positive values:');
      return;
    }
    setError('');
    console.log('Form submitted', { ...userInput, currency });

    setCurrency('USD');
  };

  const handleReset = () => {
    setUserInput(initialValues);
    setError('')
  };

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
    <section id='user-input'>
      {error && <p className='text-error'>{error}</p>}

      <div className='input-currency'>
        <label htmlFor='currency'>Currency</label>
        <select id='currency'
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          <option value='USD'>USD ($)</option>
          <option value='EUR'>EUR (€)</option>
          <option value='GBP'>GBP (£)</option>
        </select>
      </div>

      <form onSubmit={handleSubmit}>
        <div className='input-group'>
          <label htmlFor="initialInvestment">Initial Investment ({currencySymbol()})</label>
          <input
            type='number' required
            id='initialInvestment'
            value={userInput.initialInvestment}
            onChange={(e) => handleChange('initialInvestment', e.target.value)}
          />
        </div>

        <div className='input-group'>
          <label htmlFor="annualInvestment">Annual Investment ({currencySymbol()})</label>
          <input type='number' required
            id='annualInvestment'
            value={userInput.annualInvestment}
            onChange={(e) => handleChange('annualInvestment', e.target.value)}
          />
        </div>

        <div className='input-group'>
          <label htmlFor="expectedReturn">Expected Return</label>
          <input type='number' required
            id='expectedReturn'
            value={userInput.expectedReturn}
            onChange={(e) => handleChange('expectedReturn', e.target.value)}
          />
        </div>

        <div className='input-group'>
          <label htmlFor="duration">Duration</label>
          <input type='number' required
            id='duration'
            value={userInput.duration}
            onChange={(e) => handleChange('duration', e.target.value)}
          />
        </div>

        <button type='submit' className='form-btn'>Submit</button>
        <button type='button' className='form-btn' onClick={handleReset}>Reset</button>
      </form>
    </section>
  );
};

export default UserInput;