import { useEffect, useState } from "react";

function usecurrencyInfo(currency) {
    const [currencyInfo, setcurrencyInfo] = useState(null);
    useEffect(()=>{
        fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`)
        .then((res)=>res.json())
        .then((res)=>{
            setcurrencyInfo(res[currency])
        })

    },[currency])
    return currencyInfo;
}
export default usecurrencyInfo;