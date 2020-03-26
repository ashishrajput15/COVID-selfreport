import { createIntl, createIntlCache } from 'react-intl'

import messages_en from '../translations/en.json';
import messages_kn_IN from '../translations/kn_IN.json';
// This is optional but highly recommended
// since it prevents memory leak
const cache = createIntlCache()

export default (language) => {
  switch(language) {
    case 'kn_IN': {
      return createIntl({
        locale: 'kn_IN',
        messages: messages_kn_IN,
      }, cache);
    }
    default: {
      return createIntl({
        locale: 'en',
        messages: messages_en,
      }, cache);
    }
  }
}

