import { email } from '@lib/base-api/extensions/validators/email';
import { url } from '@lib/base-api/extensions/validators/url';
import { emailBuilder } from '@lib/templating-api/extensions/email';
import { urlBuilder } from '@lib/templating-api/extensions/url';
import { provide, template } from '@lib/templating-api/template';
import { baseCases } from '@test/utilities';
import { rightEmails, wrongEmails, rightUrls, wrongUrls } from './cases';

provide([
  [emailBuilder, ['email']],
  [urlBuilder, ['url']]
]);

describe(`extended api`, () => {
  describe(`email`, () =>
    baseCases(email, [], rightEmails, wrongEmails)
  );

  describe(`email › template`, () =>
    baseCases(() => template(`@email`)(), [], rightEmails, wrongEmails)
  );

  describe(`url`, () =>
    baseCases(url, [], rightUrls, wrongUrls)
  );

   describe(`url › template`, () =>
    baseCases(() => template(`@url`)(), [], rightUrls, wrongUrls)
  );
});