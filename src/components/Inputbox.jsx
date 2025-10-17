import {react, useId} from 'react'


function Inputbox({
    label,
    amount,
    onAmountChange,
    currencyOptions = [],
    selectCurrency= "usd",
    onCurrencyChange,    
    className = "",
}) {
   const inputid = useId();

    return (
        <div className={`bg-white p-3 rounded-lg text-sm flex `}>
            <div className="w-1/2">
                <label htmlFor={inputid} className="text-black/40 mb-2 inline-block">
                    {label}
                </label>
                <input
                    id={inputid}
                    className="outline-none w-full bg-transparent py-1.5"
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => onAmountChange(Number(e.target.value))}
                />
            </div>
            <div className="w-1/2 flex flex-wrap justify-end text-right">
                <p className="text-black/40 mb-2 w-full">Currency Type</p>
                <select
                    value={selectCurrency}
                    onChange={(e) => onCurrencyChange(e.target.value)}
                >
                    {currencyOptions.map((option) => (
                        <option key={option} value={option}>
                            {option.toUpperCase()}
                        </option>
                    ))}

                </select>
            </div>
        </div>
    );
}

export default Inputbox;

