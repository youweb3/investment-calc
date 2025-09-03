import React, { useState } from 'react'
// Import utility function to calculate investment results
import { calculateInvestmentResults } from '../util/investments';
import InvestmentChart from './InvestmentChart';
import ResultTable from './ResultTable';

const OutputData = ({ inputValue, formatter }) => {
    // Call the function to calculate investment data based on user input
    const resultData = calculateInvestmentResults({
        initialInvestment: +inputValue.initialInvestment,// Convert string to number
        annualInvestment: +inputValue.annualInvestment,
        expectedReturn: +inputValue.expectedReturn,
        duration: +inputValue.duration
    });

    const [viewMode, setViewMode] = useState('yearly'); // "yearly" | "monthly"

    // Compute monthly data from yearly resultData
    const monthlyData = resultData.flatMap((year) => {
        const monthlyArray = [];
        const monthlyInterest = year.interest / 12;
        const monthlyInvestment = year.investedCapital / 12;

        for (let i = 0; i < 12; i++) {
            monthlyArray.push({
                month: `Year ${year.year} - Month ${i + 1}`,
                investmentValue: year.investmentValue / 12 + monthlyInterest * (i + 1),
                interest: monthlyInterest,
                totalInterest: monthlyInterest * (i + 1),
                investedCapital: monthlyInvestment * (i + 1),
            });
        }
        return monthlyArray;
    });

    // Select data for display based on toggle
    const displayData = viewMode === 'yearly' ? resultData : monthlyData;
    return (
        <div className='output-container'>
            <button className='switch-btn'
                onClick={() => setViewMode(viewMode === 'yearly' ? 'monthly' : 'yearly')}
            >
                {viewMode === 'yearly' ? 'Switch to Monthly' : 'Switch to Yearly'}
            </button>

            <ResultTable
                resultData={resultData}
                viewMode={viewMode}
                displayData={displayData}
                formatter={formatter}
            />

            <InvestmentChart
                displayData={displayData}
                viewMode={viewMode}
                formatter={formatter}
            />
        </div>
    );
};

export default OutputData;