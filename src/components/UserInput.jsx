import React, { useState } from 'react'

const UserInput = () => {
  const [userInput, setUserInput] = useState({
    initialInvestment: 10000,
    annualInvestment: 1200,
    expectedReturn: 6,
    duration: 10
  })

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

    const hasInvalid = Object.values(userInput).some(value => value <=0);
    if (hasInvalid) {
      setError('Please fill all fields with positive values:');
      return;
    }
    setError('');
    console.log('Form submitted', userInput);
  };

  return (
    <section id='user-input'>
      {error && <p className='text-error'>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className='input-group'>
          <label htmlFor="initialInvestment">Initial Investment</label>
          <input
            type='number' required
            id='initialInvestment'
            value={userInput.initialInvestment}
            onChange={(e) => handleChange('initialInvestment', e.target.value)}
          />
        </div>

        <div className='input-group'>
          <label htmlFor="annualInvestment">Annual Investment</label>
          <input type='number' required
            id='annualInvestment'
            value={userInput.annualInvestment}
            onChange={(e) => handleChange('annualInvestment', e.target.value)}
          />
        </div>

        <div className='input-group'>
          <label htmlFor="expectedReturn">ExpectedReturn</label>
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

        <button type='submit'>Submit</button>
      </form>
    </section>
  );
};

export default UserInput;