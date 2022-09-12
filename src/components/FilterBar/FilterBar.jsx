export default function FilterBar({ options }) {
    return (
        <div className="filter-cont">
            <label>{options.label}</label>
            <select>
                {options.values.map(x => <option value={x}>{x}</option>)}
            </select>
        </div>
    )
}