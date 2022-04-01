/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import PropTypes from 'prop-types';
import { useRef } from 'react';
import { useMemo } from 'react';
import { useEffect, useState } from 'react';

const Autocomplete = (props) => {
    const {
        name,
        label,
        outline,
        inputClass,
        labelClass,
        className,
        error,
        inputBg,
        options,
        valueKey,
        labelKey,
        setValue,
        loading = false,
        defaultValue,
    } = props;

    const colorBg = inputBg
        ? inputBg.split('-').slice(1).join('-')
        : 'gray-300';

    const border = outline
        ? 'border rounded-md'
        : 'border-b rounded-none';
    const borderColor = error
        ? 'border-red-400 focus:border-red-400 hover:border-red-400'
        : `border-${colorBg} focus:border-gray-400 hover:border-gray-400`;

    const uniqueOptions = useMemo(
        () =>
            !Array.isArray(options)
                ? []
                : options.filter(
                      (value, index, self) =>
                          index ===
                          self.findIndex(
                              (t) => t[labelKey] === value[labelKey],
                          ),
                  ),
        [options],
    );

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [lisOption, setLisOption] = useState(uniqueOptions);
    const [inputvalue, setInputvalue] = useState({});
    const [isInputOnBlur, setIsInputOnBlur] = useState(true);

    const handleOnchangeInput = (e) => {
        setInputvalue({
            [labelKey]: e.target.value,
        });
    };

    const waitSetDefaultValueDone = useRef(true);

    useEffect(() => {
        if (defaultValue?.[labelKey] && uniqueOptions) {
            const filtered =
                Array.isArray(uniqueOptions) &&
                uniqueOptions.filter(
                    (item) =>
                        item[labelKey]
                            .toLowerCase()
                            .indexOf(
                                defaultValue[labelKey].toLowerCase(),
                            ) > -1,
                );
            setLisOption(filtered);
            setInputvalue(defaultValue);
        }
    }, [defaultValue, uniqueOptions]);

    useEffect(() => {
        if (waitSetDefaultValueDone.current) {
            waitSetDefaultValueDone.current = false;
            return;
        }
        if (inputvalue?.[labelKey]) {
            const filtered =
                Array.isArray(uniqueOptions) &&
                uniqueOptions.filter(
                    (item) =>
                        item[labelKey]
                            .toLowerCase()
                            .indexOf(
                                inputvalue[labelKey].toLowerCase(),
                            ) > -1,
                );
            setLisOption(filtered);
        } else {
            setLisOption(
                Array.isArray(uniqueOptions) ? uniqueOptions : [],
            );
        }

        if (!inputvalue?.[valueKey] && isInputOnBlur) {
            setValue(null);
            setInputvalue({
                [labelKey]: '',
                [valueKey]: 9999,
            });
        }
        if (inputvalue?.[valueKey] && inputvalue?.[labelKey]) {
            setValue(inputvalue?.[valueKey]);
            setLisOption(
                Array.isArray(uniqueOptions) ? uniqueOptions : [],
            );
        }
    }, [inputvalue, isInputOnBlur]);

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
            <div className="relative">
                <div className="relative">
                    <input
                        value={inputvalue?.[labelKey] ?? ''}
                        onChange={handleOnchangeInput}
                        id={name}
                        className={`h-10 w-full px-2 transition-all outline-none ${borderColor} ${border} ${inputClass} ${inputBg}`}
                        autoComplete="off"
                        onFocus={() => {
                            setIsDropdownOpen(true);
                            setIsInputOnBlur(false);
                        }}
                        onBlur={() =>
                            setTimeout(() => {
                                setIsDropdownOpen(false);
                                setIsInputOnBlur(true);
                            }, 200)
                        }
                    />
                    <button
                        type="button"
                        className="transition-all  absolute inset-y-0 right-0 mx-3 flex items-center cursor-pointer focus:outline-none hover:outline-none outline-none border-none"
                        onClick={() =>
                            setIsDropdownOpen(!isDropdownOpen)
                        }
                    >
                        {isDropdownOpen ? '✕' : '▼'}
                    </button>
                </div>
                <div
                    className={`absolute w-full ${inputBg} border-gray-400 focus:border-gray-400 hover:border-gray-400 ${border} mt-1 transition-all block ${
                        isDropdownOpen
                            ? 'opacity-100 z-1'
                            : 'opacity-0 -z-1'
                    }`}
                >
                    <ul className="max-h-50 overflow-y-auto">
                        {loading ? (
                            <li className="py-1 pl-2 hover:bg-gray-300 cursor-pointer">
                                Loading...
                            </li>
                        ) : lisOption.length > 0 ? (
                            lisOption.map((option, idx) => (
                                <li
                                    key={idx}
                                    value={option[valueKey]}
                                    className={`py-1 pl-2 hover:bg-gray-300 cursor-pointer ${
                                        option[valueKey] ===
                                            inputvalue?.[valueKey] &&
                                        'bg-gray-300'
                                    }`}
                                    onClick={() => {
                                        setInputvalue(option);
                                        setIsDropdownOpen(false);
                                    }}
                                >
                                    {option[labelKey]}
                                </li>
                            ))
                        ) : (
                            <li className="py-1 pl-2 hover:bg-gray-300 cursor-pointer">
                                Not Found
                            </li>
                        )}
                    </ul>
                </div>
            </div>

            {error && (
                <p className="px-1 left-2 transition-all text-red-400 text-sm">
                    {error}
                </p>
            )}
        </div>
    );
};

Autocomplete.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    outline: PropTypes.bool,
    inputClass: PropTypes.string,
    labelClass: PropTypes.string,
    className: PropTypes.string,
    error: PropTypes.string,
    inputBg: PropTypes.string,
    placeholder: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.object).isRequired,
    valueKey: PropTypes.string.isRequired,
    labelKey: PropTypes.string.isRequired,
    setValue: PropTypes.func.isRequired,
    defaultValue: PropTypes.object,
};

export default Autocomplete;
