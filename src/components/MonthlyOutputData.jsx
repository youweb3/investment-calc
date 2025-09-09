import React, { useState } from 'react'

const MonthlyOutputData = ({resultData, setViewMode, viewMode }) => {
    const monthlyData = resultData.flatMap((year) => {
        const monthlyInterest = year.interest / 12;
        const monthlyInvestment = year.investedCapital / 12;
        const monthlyArray = [];
        for (let i = 0; i < 12; i++) {
            monthlyArray.push({
                month: `Year ${year.year} - Month ${i + 1}`,
                investmentValue: year.investmentValue / 12 + monthlyInterest * (i + 1),
                totalInterest: monthlyInterest * (i + 1),
                investedCapital: monthlyInvestment * (i + 1),
            });
        }
        return monthlyArray
    });

    const displayData = viewMode === 'yearly' ? resultData : monthlyData;

    return (
        <div>
            <button onClick={() => setViewMode(viewMode === 'yearly' ? 'monthly' : 'yearly')}
            >
                {viewMode === 'yearly' ? 'Switch to Monthly' : 'Switch to Yearly'}

            </button>
        </div>
    );
};

export default MonthlyOutputData;