import React, {useCallback, useEffect, useState} from "react";
import style from './converter.module.scss';

const Converter = ({currency, supportedCurrencies, handleBaseValueSubscribe}) => {
    const [baseSelectValue, setBaseSelectValue] = useState('RUB');
    const [anotherSelectValue, setAnotherSelectValue] = useState('USD');
    const [result, setResult] = useState(0);
    const [inputValue, setInputValue] = useState('')

    const getResult = useCallback(() => {
        // вычисляем значение базовой валюты относительно доллара
        // и умножаем на значение в инпуте
        // Здесь и далее 0-индекс массива = наименование валюты; 1-индекс - значение
        if (currency.length) {
            const baseOnDollars = 1 / currency.find(item => item[0] === baseSelectValue)[1];
            const result = baseOnDollars * currency.find(item => item[0] === anotherSelectValue)[1];
            setResult(result * inputValue);
        }
    }, [anotherSelectValue, baseSelectValue, currency, inputValue]);

    useEffect(() => {
        getResult();
        handleBaseValueSubscribe(baseSelectValue)
    }, [inputValue, baseSelectValue, anotherSelectValue, getResult, handleBaseValueSubscribe]);

    const getIcon = (value) => {
        //находим иконку для соответсвующего значения
        return supportedCurrencies.find(el => el.currencyCode === value).icon;
    };

    if (currency.length && supportedCurrencies.length) {
        return (
            <>
                <div className={style.currencyInputContainer}>
                    <div className={style.inputContainer}>
                        <div className={style.imgContainer}>
                            <img className={style.imgContainer} src={getIcon(baseSelectValue)} alt="..."/>
                        </div>
                        <input
                            value={inputValue}
                            type="text"
                            step={0.01}
                            min={0}
                            placeholder='0.00'
                            autoFocus
                            onChange={(e) => setInputValue((e.target.value).replace(/[^\d.]/g, ''))}
                        />
                    </div>
                    <select
                        className={`${style.currencySelector} ${style.base}`}
                        name="baseCurrency"
                        value={currency.find(el => el[0] === baseSelectValue)[0]}
                        onChange={(e) => setBaseSelectValue(e.target.value)}
                    >
                        {currency.map((item) => {
                            return (
                                <option
                                    key={item[0]}
                                    value={item[0]}
                                    onChange={() => setBaseSelectValue(item[0])}
                                >
                                    {item[0]}
                                </option>
                            )
                        })}
                    </select>
                </div>
                <div className={style.currencyInputContainer}>
                    <div
                        className={style.inputContainer}
                    >
                        <div className={style.imgContainer}>
                            <img className={style.imgContainer} src={getIcon(anotherSelectValue)} alt="..."/>
                        </div>
                        <div>{result.toFixed(2)}</div>
                    </div>

                    <select
                        className={style.currencySelector}
                        name="anotherCurrency"
                        value={currency.find(el => el[0] === anotherSelectValue)[0]}
                        onChange={(e) => setAnotherSelectValue(e.target.value)}
                    >
                        {currency.map((item) => {
                            return (
                                <option
                                    key={item[0]}
                                    value={item[0]}
                                    onChange={() => setAnotherSelectValue(item[0])}
                                >
                                    {item[0]}
                                </option>
                            )
                        })}
                    </select>
                </div>
            </>
        )
    } else return (
        // на этом месте мог быть красивый прелоадер
        // и было бы неплохо добавить фетчинги на запросы
        <div>Loading Currencies....</div>
    )
}

export default (Converter);
