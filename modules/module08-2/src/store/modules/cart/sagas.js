import { call, select, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '../../../services/api';
import history from '../../../services/history';
import { formatPrice } from '../../../util/format';
import { addToCartSuccess, updateAmountSuccess } from './actions';

function* addToCart({ id }) {
  const existent = yield select((state) => state.cart.find((p) => p.id === id));

  const stock = yield call(api.get, `/stock/${id}`);

  const current = stock.data.amount;

  const reserve = existent ? existent.amount + 1 : 1;

  if (reserve > current) {
    toast.error('Quantidade solicitada fora de estoque');
    return;
  }

  if (existent) {
    yield put(updateAmountSuccess(id, existent.amount + 1));
  } else {
    const response = yield call(api.get, `/products/${id}`);

    const data = {
      ...response.data,
      amount: 1,
      priceFormatted: formatPrice(response.data.price),
    };

    yield put(addToCartSuccess(data));
    history.push('/cart');
  }
}

function* updateAmount({ id, amount }) {
  if (amount <= 0) {
    return;
  }

  const stock = yield call(api.get, `stock/${id}`);

  if (amount > stock.data.amount) {
    toast.error('Quantidade solicitada fora de estoque');
    return;
  }

  yield put(updateAmountSuccess(id, amount));
}

export default all([
  takeLatest('@cart/ADD_REQUEST', addToCart),
  takeLatest('@cart/UPDATE_AMOUNT_REQUEST', updateAmount),
]);
