import React from "react";
import style from './currencyList.module.scss'

const CurrencyList = ({baseSelectValue, currency, supportedCurrencies}) => {
    const getIcon = (value) => {
        return supportedCurrencies.find(el => el.currencyCode === value).icon;
    };
    const oneBaseToValue = (value) => {
        // считаем базовую валюту от доллара и умножаем на значение отображаемой чтобы получить корректный результат
        const baseOnDollars = 1 / currency.find(item => item[0] === baseSelectValue)[1];
        return baseOnDollars * value
    }
    return (
        <div className={style.mainContainer}>
            <div className={style.label}>1 {baseSelectValue} =</div>
            {currency.map((item) => {
                return (
                    <div
                        key={item[0]}
                        className={style.itemContainer}
                    >
                        <img src={getIcon(item[0])} alt="..."/>
                        <div>{item[0]} <span>{oneBaseToValue(item[1]).toFixed(2)}</span></div>
                    </div>
                )
            })}
        </div>
    )
}
export default CurrencyList
