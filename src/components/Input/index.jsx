import PropTypes from 'prop-types';

const Input = (props) => {
    const {
        name,
        label,
        outline,
        inputClass,
        labelClass,
        className,
        error,
        inputBg,
        disabled = false,
        ...rest
    } = props;

    const colorBg = inputBg
        ? inputBg.split('-').slice(1).join('-')
        : 'gray-300';

    const border = outline
        ? 'border rounded-md'
        : 'border-b rounded-none';

    const borderColor = error
        ? `border-red-400 focus:border-red-400  ${
              !disabled && 'hover:border-red-400 '
          }`
        : `border-${colorBg} focus:border-gray-400 ${
              !disabled && 'hover:border-gray-400'
          } `;

    return (
        <div className={`${className}`}>
            <label
                htmlFor={name}
                className={`left-2 transition-all px-1 ${labelClass} ${
                    error ? 'text-red-400' : 'black'
                }`}
            >
                {label}
            </label>
            <input
                disabled={disabled}
                {...rest}
                id={name}
                className={`h-10 w-full px-2 transition-all outline-none ${borderColor} ${border} ${inputClass} ${
                    disabled ? 'bg-gray-100' : inputBg
                }`}
            />
            {error && (
                <p className="px-1 left-2 transition-all text-red-400 text-sm">
                    {error}
                </p>
            )}
        </div>
    );
};

Input.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    outline: PropTypes.bool,
    inputClass: PropTypes.string,
    labelClass: PropTypes.string,
    className: PropTypes.string,
    error: PropTypes.string,
    inputBg: PropTypes.string,
    placeholder: PropTypes.string,
};

export default Input;
