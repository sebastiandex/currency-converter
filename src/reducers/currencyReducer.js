
const RECEIVE_CURRENCY = 'receiveCurrency';
const RECEIVE_ALL_CURRENCIES = 'receiveallCurrencies';

export const fetchApiCurrency = (base) => {
    // console.log('BASE', base)
    // Оказалось что хитрое апи дает данные по базовой валюте только на платных тарифных планах
    // Светлую идею о красивых данных на основе выбранной валюты придется похоронить и считать костылями
    return function (dispatch) {
        // fetch(`https://api.currencyfreaks.com/latest?apikey=0853a988ad7d48de8839e1ed14540dd6&base=${base}`)
        fetch(`https://api.currencyfreaks.com/latest?apikey=0853a988ad7d48de8839e1ed14540dd6`)
            .then(res => res.json())
            // .then(result => console.log(11111, result));
            .then(result => dispatch(receiveCurrency(result)));
    }
}
function receiveCurrency (res) {
    console.log('res', res)
    return {
        type: RECEIVE_CURRENCY,
        payload: res
    };
}
export const fetchAllCurrencies = () => {
    return function (dispatch) {
        fetch(`https://api.currencyfreaks.com/supported-currencies`)
            .then(res => res.json())
            // .then(result => console.log(11111, result));
            .then(result => dispatch(receiveallCurrencies(result)));
    }
}
function receiveallCurrencies (res) {
    console.log('res', res)
    return {
        type: RECEIVE_ALL_CURRENCIES,
        payload: res
    };
}

export const actions = {
    fetchApiCurrency,
    receiveCurrency,
    fetchAllCurrencies
};

const ACTION_HANDLERS = {
    [RECEIVE_CURRENCY]: (state, action) => {
        return ({ ...state, currency: action.payload.rates });
    },
    [RECEIVE_ALL_CURRENCIES]: (state, action) => {
        return ({ ...state, allCurrencies: action.payload });
    }
}

const initialState = {
    currency: {},
    allCurrencies: {},
    fetching: false
};

export default function currencyReducer(state = initialState, action) {
    state = Object.assign({}, initialState, state);
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
}
