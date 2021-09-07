
const RECEIVE_CURRENCY = 'receiveCurrency';
const RECEIVE_SUPPORTED_CURRENCIES = 'receiveSupportedCurrencies';

export const fetchApiCurrency = () => {
    // Оказалось что хитрое апи дает данные по иной базовой валюте только на платных тарифных планах
    // Светлую идею о красивых данных на основе выбранной валюты придется похоронить и считать костылями
    return function (dispatch) {
        // fetch(`https://api.currencyfreaks.com/latest?apikey=0853a988ad7d48de8839e1ed14540dd6&base=${base}`)
        fetch(`https://api.currencyfreaks.com/latest?apikey=0853a988ad7d48de8839e1ed14540dd6`)
            .then(res => res.json())
            .then(result => dispatch(receiveCurrency(result)));
    }
}
function receiveCurrency (res) {
    return {
        type: RECEIVE_CURRENCY,
        payload: res
    };
}
export const fetchSupportedCurrencies = () => {
    return function (dispatch) {
        fetch(`https://api.currencyfreaks.com/supported-currencies`)
            .then(res => res.json())
            .then(result => dispatch(receiveSupportedCurrencies(result)));
    }
}
function receiveSupportedCurrencies (res) {
    return {
        type: RECEIVE_SUPPORTED_CURRENCIES,
        payload: res
    };
}

export const actions = {
    fetchApiCurrency,
    fetchSupportedCurrencies,
    receiveCurrency,
    receiveSupportedCurrencies,
};

const ACTION_HANDLERS = {
    [RECEIVE_CURRENCY]: (state, action) => {
        return ({ ...state, currency: Object.entries(action.payload.rates) });
    },
    [RECEIVE_SUPPORTED_CURRENCIES]: (state, action) => {
        return ({ ...state, supportedCurrencies: action.payload });
    }
}

const initialState = {
    currency: {},
    supportedCurrencies: {}
};

export default function currencyReducer(state = initialState, action) {
    state = Object.assign({}, initialState, state);
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
}
