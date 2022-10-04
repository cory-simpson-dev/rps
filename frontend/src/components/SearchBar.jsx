function SearchBar ({searchState, searchStateSet}) {
    return (
        <div className="form-group">
                <label htmlFor="search" className="sr-only">Search</label>
                <input name="search" type="text" className="form-control" id="search" placeholder="Search for a post" value={searchState} onChange={(e) => searchStateSet(e.target.value)} />
        </div>
    )
}

export default SearchBar