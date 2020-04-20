import { runSaga } from 'redux-saga';
import MockAdapter from 'axios-mock-adapter';
import { getTechs } from '../../../store/modules/techs/sagas';
import { getTechsSuccess, getTechsFailure } from "../../../store/modules/techs/actions";
import api from '../../../services/api';

const apiMock = new MockAdapter(api);

describe('Techs Sagas', () => {
  it('should be abel to fetch techs', async() => {

    const dispatch = jest.fn();

    apiMock.onGet('techs').reply(200, ['Node.js']);

    await runSaga({ dispatch }, getTechs).toPromise();

    expect(dispatch).toHaveBeenCalledWith(getTechsSuccess(["Node.js"]));

  });

  it('should fail when api returns errors', async () => {
    const dispatch = jest.fn();

    apiMock.onGet('techs').reply(500);

    await runSaga({ dispatch }, getTechs).toPromise();

    expect(dispatch).toHaveBeenCalledWith(getTechsFailure());
  });
});
