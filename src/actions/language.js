import {
  SET_LANGUAGE
} from './actionTypes'

export const setLanguage = (currentLang, prevLang) => {
  return { type: SET_LANGUAGE, currentLang, prevLang };
}
