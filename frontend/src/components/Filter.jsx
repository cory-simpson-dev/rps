function Filter ({filterState, filterStateSet, providedFilterOptions}) {
   
    return (
        <select value={filterState} onChange={(e) => filterStateSet(e.target.value)}>
            {providedFilterOptions.map(option => (
                <option key={option.value} value={option.value}>
                    {option.text}
                </option>
            ))}
        </select>
    )
}

export default Filter