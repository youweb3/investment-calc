import React, { useState } from 'react'


const MonthlyResult = ({resultData, }) => {
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
        <div>
            <button
                onClick={() => setViewMode(viewMode === 'yearly' ? 'monthly' : 'yearly')}
            >
                {viewMode === 'yearly' ? 'Switch to Monthly' : 'Switch to Yearly'}
            </button>
        </div>
    );
};

export default MonthlyResult;