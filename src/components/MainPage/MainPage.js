import React, {useEffect, useState} from "react";
import style from './mainPage.module.scss';
import {connect} from 'react-redux';

import {fetchAllCurrencies, fetchApiCurrency} from "../../reducers/currencyReducer";

const MainPage = ({fetchApiCurrency, fetchAllCurrencies, currency, allCurrencies, fetching}) => {
    const [currentCurrency, setCurrentCurrency] = useState(currency);
    const [baseSelectValue, setBaseSelectValue] = useState('RUB');
    const [anotherSelectValue, setAnotherSelectValue] = useState('USD');
    const [result, setResult] = useState(0)

    useEffect(() => {
        fetchApiCurrency();
    }, [fetchApiCurrency])

    const getNewNumber = (value) => {
        const baseOnDollars = 1 / currency[baseSelectValue];
        const result = baseOnDollars * currency[anotherSelectValue];
        setResult(result * value) ;
    }
if (currency) {
    const currArr = Object.entries(currency);
    console.log(currArr)
    if (currency && currency.rates) {

    }
    return (
        <div className={style.mainContainer}>
            <div className={style.currencyInputContainer}>
                <input
                    type={'number'}
                    className={style.inputContainer}
                    onChange={(e) => getNewNumber(e.target.value)}
                />
                <select
                    className={style.currencySelector}
                    name="baseCurrency"
                    onChange={(e) => setBaseSelectValue(e.target.value)}
                >
                    {currArr.map((item) => {
                        return (

                            <option
                                key={item[0]}
                                value={item[0]}
                                onChange={() => setBaseSelectValue(item[0])}
                                selected={item[0] === baseSelectValue}
                            >
                                {item[0]}
                            </option>
                        )
                    })}
                </select>
            </div>
            <div className={style.currencyInputContainer}>
                <div
                    className={style.resultContainer}
                >
                    {result}
                </div>
                <select
                    className={style.currencySelector}
                    name="anotherCurrency"
                    onChange={(e) => setAnotherSelectValue(e.target.value)}
                >
                    {currArr.map((item) => {
                        return (
                            <option
                                key={item[0]}
                                value={item[0]}
                                onChange={() => setAnotherSelectValue(item[0])}
                                selected={item[0] === anotherSelectValue}
                            >
                                {item[0]}
                            </option>
                        )
                    })}
                </select>
            </div>
            <button>Курсы валют</button>

        </div>
    )
} else return (
    <div>Loading Currencies....</div>
)

}
const mapStateToProps = (state) => ({
    currency: state.currency,
    fetching: state.fetching,
    allCurrencies: state.allCurrencies
});
const mapDispatchToProps = {
    fetchApiCurrency,
    fetchAllCurrencies
};

export default connect (mapStateToProps, mapDispatchToProps)(MainPage);
