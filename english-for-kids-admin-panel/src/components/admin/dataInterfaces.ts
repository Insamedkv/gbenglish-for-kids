export interface Category {
  id: string,
  categoryName: string,
}

export interface CardInfo {
  word: string,
  translation: string,
  image: string,
  sound: string,
}

export interface Word {
  id: string,
  idCategory: string,
  word: string,
  translation: string,
  image: string,
  sound: string,
}

export interface CategoryWithWords {
  id: string,
  categoryName: string,
  words: Word[],
}
