import React, {useEffect, useState} from "react";
import {connect} from 'react-redux';
import {fetchSupportedCurrencies, fetchApiCurrency} from "../../reducers/currencyReducer";
import style from './mainPage.module.scss'
import Converter from "../Converter";
import CurrencyList from "../CurrencyList";

const MainPage = ({fetchSupportedCurrencies, fetchApiCurrency, currency, supportedCurrencies}) => {
    const [activePage, setActivePage] = useState('converter')
    const [baseSelectValue, setBaseSelectValue] = useState('RUB');

    useEffect(() => {
        fetchApiCurrency();
    }, [fetchApiCurrency]);
    useEffect(() => {
        fetchSupportedCurrencies();
    }, [fetchSupportedCurrencies]);

    const baseValueSubscribe = (value) => {
        setBaseSelectValue(value)
    }
    // Изначально открыта страница Конвертера валют
    // Меняем стейт - отображам компонент со списком
    return (
        <div className={style.mainContainer}>
            <div className={style.navContainer}>
                <button
                    className={`${style.navButton} ${activePage === 'converter' ? style.active : ''}`}
                    onClick={() => setActivePage('converter')}
                >
                    Конвертер
                </button>
                <button
                    className={`${style.navButton} ${activePage === 'currencyList' ? style.active : ''}`}
                    onClick={() => setActivePage('currencyList')}
                >
                    Курсы валют к <span>{baseSelectValue}</span>
                </button>
            </div>
            {activePage === 'converter' ? (
                <Converter
                    currency={currency}
                    supportedCurrencies={supportedCurrencies}
                    handleBaseValueSubscribe={baseValueSubscribe}
                />
            ) : (
                <CurrencyList
                    baseSelectValue={baseSelectValue}
                    supportedCurrencies={supportedCurrencies}
                    currency={currency}
                />
            )}

        </div>
    )
}

const mapStateToProps = (state) => ({
    currency: state.currency,
    supportedCurrencies: state.supportedCurrencies
});
const mapDispatchToProps = {
    fetchApiCurrency,
    fetchSupportedCurrencies
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
