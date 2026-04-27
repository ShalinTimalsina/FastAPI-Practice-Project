function TextField({
    label,
    value,
    onChange,
    placeholder,
    disabled = false,
    className,
}) {
    return (
        <label className={className ? `textfield ${className}` : "textfield"}>
            <span className="textfield__label">{label}</span>
            <input
                className="textfield__control"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                disabled={disabled}
            />
        </label>
    );
}

export default TextField;
