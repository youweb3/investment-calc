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


    // Total interest: sum of each year's interest
    const totalInterest = resultData.reduce((sum, item) => sum + item.totalInterest, 0);//sum all year together

    // Total invested: sum of each year's invested capital
    // const totalInvest = resultData.reduce((sum, item) => sum + item.investedCapital, 0);




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
                {/* Summary Section */}
                <tfoot>
                    <tr>
                        <th>Summary</th>
                        <td></td>
                        <td></td>
                        {/* {<td>{formatter.format(resultData.reduce((sum, year) => sum + year.interest, 0))}</td>} */}
                        {<td>{formatter.format(totalInterest)}</td>}
                        <td>{formatter.format(resultData[resultData.length - 1].investedCapital)}</td>
                    </tr>
                </tfoot>
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

//summary section:

//<td>{formatter.format(resultData[resultData.length - 1].interest)}</td>
//<td>{formatter.format(resultData[resultData.length - 1].investedCapital)}</td>
//Summary row: shows total invested amount (from last year) and total interest (sum of all years)
//Both methods give similar results, but reduce reads all years and takes slightly more time.
//length - 1 means last elemnt of the array. 
//The resulting number may look very similar to the last row of the table, but the calculation was done with the actual total for each year.

//the calculateInvestmentResults function itself calculates totalInterest and investedCapital
// cumulatively,meaning the last year has the total interest and capital for the entire period.
//So you don't need to reduce again to display the Summary row, because the last year has already done this.

//reduce is only needed when you want to calculate the actual total for each year separately or if you want to do additional work with the data.
//For the table and row Summary → Last year is enough and will show the correct number by itself.