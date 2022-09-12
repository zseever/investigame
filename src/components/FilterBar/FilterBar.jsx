export default function FilterBar({ options, filterOptions, setFilterOptions }) {
    let filter = options.filter;

    function handleChange(evt) {
        if (options.filter === 'metacritic') {
            let metaVal = 0;
            if (evt.target.value > 100) {
                metaVal = 100;
            } else if (evt.target.value < 0) {
                metaVal = 0;
            } else {
                metaVal = evt.target.value;
            }
            setFilterOptions({
                ...filterOptions,
                [filter]: metaVal
            })
        } else {
            setFilterOptions({
                ...filterOptions,
                [filter]: evt.target.value.split(' ').join('-').toLowerCase(),
            })
        }
    }

    return (
        <div className="filter-cont">
            <label>{options.label}</label>
            {options.filter === 'metacritic' ?
                <input onChange={(evt) => handleChange(evt)} type="number" min="0" max="100" autocomplete="off"></input>
                :
                <select onChange={(evt) => handleChange(evt)}>
                    {options.filter === 'genres' ?
                        options.values.map(x => <option value={x} selected={x === 'All' ? true : false} autocomplete="off">{x}</option>)
                        :
                        options.searchValues.map((x,idx) => <option value={x} selected={x === 'All' ? true : false} autocomplete="off">{options.values[idx]}</option> )
                    }
                </select>
            }
        </div>
    )
}