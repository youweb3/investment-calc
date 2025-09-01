import React from 'react'
import {calculateInvestmentResults} from '../util/investments';

const OutputData = ({inputValue}) => {
    const resultData = calculateInvestmentResults({
        initialInvestment: +inputValue.initialInvestment,
        annualInvestment: +inputValue.annualInvestment,
        expectedReturn: +inputValue.expectedReturn,
        duration: +inputValue.duration
    });

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
                    <tr key={index}>
                        <td>{yearData.year}</td>
                        <td>{yearData.investmentValue.toFixed(2)}</td>
                        <td>{yearData.interest.toFixed(2)}</td>
                        <td>{yearData.totalInterest.toFixed(2)}</td>
                        <td>{yearData.investedCapital.toFixed(2)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default OutputData;
