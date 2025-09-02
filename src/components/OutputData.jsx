import React from 'react'
// Import utility function to calculate investment results
import { calculateInvestmentResults } from '../util/investments';
// Import Recharts components for the line chart
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const OutputData = ({ inputValue, formatter }) => {
     // Call the function to calculate investment data based on user input
    const resultData = calculateInvestmentResults({
        initialInvestment: +inputValue.initialInvestment,// Convert string to number
        annualInvestment: +inputValue.annualInvestment,
        expectedReturn: +inputValue.expectedReturn,
        duration: +inputValue.duration
    });

     // Find the maximum interest value for highlighting
    const maxInterest = Math.max(...resultData.map(data => data.interest));

     // Find the maximum investment value for scaling the chart axis
    const maxValue = Math.max(...resultData.map(data => data.investmentValue));
    
    // Function to scale large numbers to k/M/B format
    const scaleValue = (value) => {
        if (maxValue >= 1_000_000_000) return (value / 1_000_000_000).toFixed(2) + 'B';
        if (maxValue >= 1_000_000) return (value / 1_000_000).toFixed(2) + 'M';
        if (maxValue >= 1_000) return (value / 1_000).toFixed(2) + 'k';
        return value;
    };

    return (
        <div className='output-container'>
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
                            <td>{formatter.format(yearData.investmentValue)}</td>
                            <td>{formatter.format(yearData.interest)}</td>
                            <td>{formatter.format(yearData.totalInterest)}</td>
                            <td>{formatter.format(yearData.investedCapital)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className='chart'>
                <LineChart
                    width={600}
                    height={300}
                    data={resultData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis tickFormatter={scaleValue} tickCount={6}
                        // label={{ value: 'Investment', angle: -90, position: 'insideLeft' }}
                    />
                    <Tooltip formatter={(value) => formatter.format(value)} />
                    <Line type="monotone" dataKey="investmentValue" stroke="#8884d8" />
                </LineChart>
            </div>
        </div>
    );
};

export default OutputData;
