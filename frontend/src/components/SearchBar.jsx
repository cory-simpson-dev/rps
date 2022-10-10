function SearchBar ({searchState, searchStateSet}) {
    return (
        <div className="w-full">
                <label htmlFor="search" className="sr-only">Search</label>
                <input name="search" type="text" className="w-full border rounded-md" id="search" placeholder="Search" value={searchState} onChange={(e) => searchStateSet(e.target.value)} />
        </div>
    )
}

export default SearchBar