import { clampBuilder } from '@lib/templating-api/extensions/processors/clamp';
import { eraseBuilder } from '@lib/templating-api/extensions/processors/erase';
import { repeatBuilder } from '@lib/templating-api/extensions/processors/repeat';
import { roundBuilder } from '@lib/templating-api/extensions/processors/round';
import { toLowerBuilder } from '@lib/templating-api/extensions/processors/to-lower';
import { toUpperBuilder } from '@lib/templating-api/extensions/processors/to-upper';
import { trimBuilder } from '@lib/templating-api/extensions/processors/trim';
import { alphaBuilder } from '@lib/templating-api/extensions/validators/alpha';
import { alphanumBuilder } from '@lib/templating-api/extensions/validators/alphanum';
import { binBuilder } from '@lib/templating-api/extensions/validators/bin';
import { boolBuilder } from '@lib/templating-api/extensions/validators/bool';
import { containsBuilder } from '@lib/templating-api/extensions/validators/contains';
import { dateBuilder } from '@lib/templating-api/extensions/validators/date';
import { emailBuilder } from '@lib/templating-api/extensions/validators/email';
import { fastEmailBuilder } from '@lib/templating-api/extensions/validators/email-fast';
import { evenBuilder } from '@lib/templating-api/extensions/validators/even';
import { floatBuilder } from '@lib/templating-api/extensions/validators/float';
import { hexBuilder } from '@lib/templating-api/extensions/validators/hex';
import { integerBuilder } from '@lib/templating-api/extensions/validators/integer';
import { lowercaseBuilder } from '@lib/templating-api/extensions/validators/lowercase';
import { negativeBuilder } from '@lib/templating-api/extensions/validators/negative';
import { notContainsBuilder } from '@lib/templating-api/extensions/validators/not-contains';
import { numberBuilder } from '@lib/templating-api/extensions/validators/number';
import { octBuilder } from '@lib/templating-api/extensions/validators/oct';
import { positiveBuilder } from '@lib/templating-api/extensions/validators/positive';
import { stringBuilder } from '@lib/templating-api/extensions/validators/string';
import { uniqueBuilder } from '@lib/templating-api/extensions/validators/unique';
import { uppercaseBuilder } from '@lib/templating-api/extensions/validators/uppercase';
import { urlBuilder } from '@lib/templating-api/extensions/validators/url';
import { uuidBuilder } from '@lib/templating-api/extensions/validators/uuid';

export const all = [
  [clampBuilder, ['clamp']],
  [eraseBuilder, ['erase']],
  [repeatBuilder, ['repeat']],
  [roundBuilder, ['round']],
  [toLowerBuilder, ['toLower']],
  [toUpperBuilder, ['toUpper']],
  [trimBuilder, ['trim']],
  [alphaBuilder, ['alpha']],
  [alphanumBuilder, ['alphanum']],
  [binBuilder, ['bin']],
  [boolBuilder, ['bool']],
  [containsBuilder, ['contains']],
  [dateBuilder, ['date']],
  [emailBuilder, ['email']],
  [fastEmailBuilder, ['fastEmail']],
  [evenBuilder, ['even']],
  [floatBuilder, ['float']],
  [hexBuilder, ['hex']],
  [integerBuilder, ['integer']],
  [lowercaseBuilder, ['lowercase']],
  [negativeBuilder, ['negative']],
  [notContainsBuilder, ['notContains']],
  [numberBuilder, ['number']],
  [octBuilder, ['oct']],
  [positiveBuilder, ['positive']],
  [stringBuilder, ['string']],
  [uniqueBuilder, ['unique']],
  [uppercaseBuilder, ['uppercase']],
  [urlBuilder, ['url']],
  [uuidBuilder, ['uuid']]
];