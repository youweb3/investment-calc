import React from 'react'
import {calculateInvestmentResults} from '../util/investments';

const OutputData = ({inputValue, currencySymbol}) => {
    const resultData = calculateInvestmentResults({
        initialInvestment: +inputValue.initialInvestment,
        annualInvestment: +inputValue.annualInvestment,
        expectedReturn: +inputValue.expectedReturn,
        duration: +inputValue.duration
    });

    const maxInterest = Math.max(...resultData.map(data => data.interest));
    console.log('LARGE NUMBER',maxInterest);
    
    return (
        <table>
            <thead>
                <tr>
                    <th>Year</th>
                    <th>Investment Value</th>
                    <th>Interest (Year)</th>
                    <th>Total Interest</th>
                    <th>Invested Capital</th>
                </tr>
            </thead>
            <tbody>
                {resultData.map((yearData, index) => (
                    <tr key={index} className={Number(yearData.interest) === maxInterest ? 'highlight' : ''}>
                        <td>{yearData.year}</td>
                        <td>{currencySymbol()}{yearData.investmentValue.toFixed(2)}</td>
                        <td>{currencySymbol()}{yearData.interest.toFixed(2)}</td>
                        <td>{currencySymbol()}{yearData.totalInterest.toFixed(2)}</td>
                        <td>{currencySymbol()}{yearData.investedCapital.toFixed(2)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default OutputData;
