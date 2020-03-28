import { cloneDeep, isEmpty } from 'lodash';
import { createIntl, createIntlCache } from 'react-intl';
import { cookie } from '../util';

import {
  SET_LANGUAGE,
} from '../actions/actionTypes';
import initialState from './initialState';

import messages_en from '../translations/en.json';
import messages_kn_IN from '../translations/kn_IN.json';
import messages_hi_IN from '../translations/hi_IN.json';
import messages_mr_IN from '../translations/mr_IN.json';
import messages_ta_IN from '../translations/ta_IN.json';
import messages_ml_IN from '../translations/ml_IN.json';
import messages_te_IN from '../translations/te_IN.json';
import messages_gu_IN from '../translations/gu_IN.json';
import messages_bn_IN from '../translations/bn_IN.json';
import messages_or_IN from '../translations/or_IN.json';

const messages = {
  'en': messages_en,
  'kn': messages_kn_IN,
  'hi': messages_hi_IN,
  'mr': messages_mr_IN,
  'ta': messages_ta_IN,
  'ml': messages_ml_IN,
  'te': messages_te_IN,
  'gu': messages_gu_IN,
  'bn': messages_bn_IN,
  'or': messages_or_IN,
}

const cache = createIntlCache()

export default function language(state = initialState.language, action) {
  switch (action.type) {
    case SET_LANGUAGE: {
      const newState = cloneDeep(state);
      cookie.setCookie('lng', action.currentLang);
      action.prevLang && (newState[action.prevLang].show = false);
      newState[action.currentLang].show = true;
      newState.intl = {...createIntl({
        locale: action.currentLang,
        messages: messages[action.currentLang],
      }, cache)};
      return newState;
    }


    default: {
      if (!isEmpty(state.intl)) {
        return state;
      }
      // get the preferred language from the user
      let prefLng = cookie.getCookie('lng');
      let newState = cloneDeep(state);
      newState.en.show = true;
      action.prevLang && (newState[action.prevLang].show = false);

      if (prefLng !== 'en' && prefLng !== '') {
        cookie.setCookie('lng', prefLng);
        newState.intl = createIntl({
          locale: prefLng,
          messages: messages[prefLng],
        }, cache);
        return newState
      }
      cookie.setCookie('lng', 'en');
      newState.intl = createIntl({
        locale: 'en',
        messages: messages['en'],
      }, cache);
      return newState;
    }
  }
}
