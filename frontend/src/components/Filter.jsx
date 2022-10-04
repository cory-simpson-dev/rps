function Filter ({filterState, filterStateSet, providedFilterOptions}) {
   
    return (
        <div className="form-group">
            <select value={filterState} onChange={(e) => filterStateSet(e.target.value)}>
                {providedFilterOptions.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.text}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default Filter