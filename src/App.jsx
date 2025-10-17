import { useState, useEffect, useCallback } from 'react'

import InputBox from './components/Inputbox.jsx'
import useCurrencyInfo from './hooks/usecurrencyinfo.js'


function App() {
    const [amount, setAmount] = useState(1);
    const [fromCurrency, setFromCurrency] = useState("usd");
    const [toCurrency, setToCurrency] = useState("inr");
    const [convertedAmount, setConvertedAmount] = useState(0);

    const currencyInfo = useCurrencyInfo(fromCurrency);
    const options = currencyInfo ? Object.keys(currencyInfo) : [];

    const swap = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
        // Swap amounts for a more intuitive experience
        setConvertedAmount(amount);
        setAmount(convertedAmount);
    };

    const convertCurrency = useCallback(() => {
        if (currencyInfo && currencyInfo[toCurrency]) {
            const result = amount * currencyInfo[toCurrency];
            setConvertedAmount(parseFloat(result.toFixed(4)));
        }
    }, [amount, currencyInfo, toCurrency]);

    useEffect(() => {
        convertCurrency();
    }, [amount, fromCurrency, toCurrency, currencyInfo, convertCurrency]);


    return (
        <div
            className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat p-4"
            style={{
                backgroundImage: `url('https://images.pexels.com/photos/1629236/pexels-photo-1629236.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
            }}
        >
            <div className="w-full max-w-lg">
                <div className="w-full mx-auto border border-gray-200 rounded-2xl p-6 backdrop-blur-md bg-white/40 shadow-xl">
                    <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Currency Converter</h1>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            convertCurrency();
                        }}
                    >
                        <div className="w-full mb-2">
                            <InputBox
                                label="From"
                                amount={amount}
                                currencyOptions={options}
                                onCurrencyChange={setFromCurrency}
                                selectCurrency={fromCurrency}
                                onAmountChange={(newAmount) => setAmount(newAmount >= 0 ? newAmount : 0)}
                            />
                        </div>
                        <div className="relative w-full h-2 my-2">
                            <button
                                type="button"
                                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-full bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-transform transform hover:scale-105 shadow-lg"
                                onClick={swap}
                            >
                                Swap
                            </button>
                        </div>
                        <div className="w-full mt-2 mb-6">
                            <InputBox
                                label="To"
                                amount={convertedAmount}
                                currencyOptions={options}
                                onCurrencyChange={setToCurrency}
                                selectCurrency={toCurrency}
                                amountDisable // Disable the "To" amount input
                            />
                        </div>
                        <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-xl hover:bg-blue-700 transition-colors font-semibold text-lg shadow-md">
                            Convert {fromCurrency.toUpperCase()} to {toCurrency.toUpperCase()}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default App;

