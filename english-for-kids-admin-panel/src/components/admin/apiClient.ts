import { Category, CategoryWithWords, Word } from './dataInterfaces';

const CATEGORIES = 'categories';
const WORD = 'word';
const url = (endpoint: string) => `/api/${endpoint}`;

export const getCategories = (): Promise<Category[]> => fetch(url(CATEGORIES)).then((res) => res.json());

export const getCategoryById = (categoryId: string): Promise<Category> => fetch(
  url(`${CATEGORIES}/${categoryId}`),
).then((res) => res.json());

export const createCategory = (categoryName: string): Promise<Category> => fetch(url(CATEGORIES), {
  method: 'POST',
  mode: 'cors',
  credentials: 'include',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ categoryName }),
}).then((res) => res.json());

export const deleteCategory = (categoryId: string): Promise<Response> => fetch(
  url(`${CATEGORIES}/${categoryId}`),
  { method: 'DELETE', credentials: 'include' },
);

export const updateCategory = (categoryName: string, categoryId: string): Promise<Response> => fetch(url(`${CATEGORIES}/${categoryId}`), {
  method: 'PUT',
  mode: 'cors',
  credentials: 'include',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ categoryName }),
});

// Words in categories methods  /:id/word

export const getCategoryWords = (categoryId: string): Promise<Word[]> => fetch(
  url(`${CATEGORIES}/${categoryId}/${WORD}`),
).then((res) => res.json());

export const getCategoryWordById = (categoryId: string, wordId: string): Promise<Word[]> => fetch(
  url(`${CATEGORIES}/${categoryId}/${WORD}/${wordId}`),
).then((res) => res.json());

export const deleteWord = (categoryId: string, wordId: string): Promise<Response> => fetch(
  url(`${CATEGORIES}/${categoryId}/${WORD}/${wordId}`),
  {
    method: 'DELETE',
    credentials: 'include',
  },
);

export const createWord = (categoryId: string, data: FormData): Promise<Response> => fetch(url(`${CATEGORIES}/${categoryId}/word`), {
  method: 'POST',
  mode: 'cors',
  credentials: 'include',
  body: data,
});

export const updateWord = (
  categoryId: string, wordId: string, data: FormData,
): Promise<Response> => fetch(url(`${CATEGORIES}/${categoryId}/word/${wordId}`), {
  method: 'PUT',
  mode: 'cors',
  credentials: 'include',
  body: data,
});

export const getCategoriesAndWords = async (): Promise<CategoryWithWords[]> => {
  const categories = await getCategories();

  return Promise.all(categories.map(async (category) => {
    const words = await getCategoryWords(category.id);
    const categoryAndWords = {
      ...category,
      words,
    };
    return categoryAndWords;
  }));
};

export const auth = async (
  username: string, password: string,
): Promise<Response> => fetch(url('auth'), {
  method: 'POST',
  mode: 'cors',
  credentials: 'include',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username, password }),
});

export const isAuth = async (): Promise<{ status: boolean }> => fetch(url('isAuth'), {
  method: 'GET',
  mode: 'cors',
  credentials: 'include',
  headers: { 'Content-Type': 'application/json' },
}).then((res) => res.json());

export const logout = async (): Promise<Response> => fetch(url('logout'), {
  method: 'GET',
  mode: 'cors',
  redirect: 'manual',
  credentials: 'include',
});
