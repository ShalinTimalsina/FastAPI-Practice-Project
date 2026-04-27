function Select({
    label,
    value,
    onChange,
    options,
    disabled = false,
    className,
}) {
    return (
        <label className={className ? `select ${className}` : "select"}>
            <span className="select__label">{label}</span>
            <select
                className="select__control"
                value={value}
                onChange={onChange}
                disabled={disabled}
            >
                {options.map((o) => (
                    <option key={o.value} value={o.value}>
                        {o.label}
                    </option>
                ))}
            </select>
        </label>
    );
}

export default Select;
