import React from 'react'
// Import Recharts components for the line chart
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';


const InvestmentChart = ({ displayData, viewMode, formatter }) => {


    // Find the maximum investment value for scaling the chart axis
    const maxValue = Math.max(...displayData.map(data => data.investmentValue));

    // Function to scale large numbers to k/M/B format
    const scaleValue = (value) => {
        if (maxValue >= 1_000_000_000) return (value / 1_000_000_000).toFixed(2) + 'B';
        if (maxValue >= 1_000_000) return (value / 1_000_000).toFixed(2) + 'M';
        if (maxValue >= 1_000) return (value / 1_000).toFixed(2) + 'k';
        return value;
    };

    return (
        <div>
            <div className='chart'>
                <LineChart
                    width={600}
                    height={300}
                    data={displayData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={viewMode === 'yearly' ? 'year' : 'month'} />
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

export default InvestmentChart;