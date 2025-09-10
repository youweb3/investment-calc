
const MonthlyResult = ({viewMode, setViewMode }) => {

    return (
        <div>
            <button className="switch-btn"
                onClick={() => setViewMode(viewMode === 'yearly' ? 'monthly' : 'yearly')}
            >
                {viewMode === 'yearly' ? 'Switch to Monthly' : 'Switch to Yearly'}
            </button>
        </div>
    );
};

export default MonthlyResult;