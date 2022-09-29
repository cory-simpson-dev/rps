function SearchBar ({searchState, searchStateSet}) {
   
    return (
        <div className="form-group">
                <label htmlFor="search">Search</label>
                <input name="search" type="text" className="form-control" id="search" value={searchState} onChange={(e) => searchStateSet(e.target.value)} />
        </div>
    )
}

export default SearchBar