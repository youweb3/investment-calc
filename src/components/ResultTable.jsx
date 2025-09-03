import React from 'react'

const ResultTable = ({ resultData, viewMode, displayData, formatter }) => {

    // Find the maximum interest value for highlighting
    const maxInterest = Math.max(...resultData.map(data => data.interest));
    // Total interest: sum of each year's interest
    const totalInterest = resultData.reduce((sum, item) => sum + item.totalInterest, 0);//sum all year together
    // Total invested: sum of each year's invested capital
    // const totalInvest = resultData.reduce((sum, item) => sum + item.investedCapital, 0);

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>{viewMode === 'yearly' ? 'Year' : 'Month'}</th>
                        <th>Investment Value</th>
                        <th>Interest (Year)</th>
                        <th>Total Interest</th>
                        <th>Invested Capital</th>
                    </tr>
                </thead>
                <tbody>
                    {displayData.map((data, index) => (
                        <tr key={index} className={viewMode === 'yearly' && Number(data.interest) === maxInterest ? 'highlight' : ''}>
                            <td>{viewMode === 'yearly' ? data.year : data.month}</td>
                            <td>{formatter.format(data.investmentValue)}</td>
                            <td>{formatter.format(data.interest)}</td>
                            <td>{formatter.format(data.totalInterest)}</td>
                            <td>{formatter.format(data.investedCapital)}</td>
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

        </div>
    );
};

export default ResultTable;

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