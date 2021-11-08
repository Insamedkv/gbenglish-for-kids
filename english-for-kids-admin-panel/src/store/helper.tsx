import { getCategoriesAndWords } from '../components/admin/apiClient';
import { setCategoriesWithWords } from './reducers/categoryReducer';
import { store } from './store';

export const updateStore = async (): Promise<void> => {
  store.dispatch(setCategoriesWithWords(await getCategoriesAndWords()));
};
