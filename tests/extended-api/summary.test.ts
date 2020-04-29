import { clamp, email, erase, lowercase, round, toLower, toUpper, trim, uppercase, url } from '@lib/base-api/extensions';
import { clampBuilder, emailBuilder, eraseBuilder, lowercaseBuilder, roundBuilder, toLowerBuilder, toUpperBuilder, trimBuilder, uppercaseBuilder, urlBuilder } from '@lib/templating-api/extensions';
import { provide, template } from '@lib/templating-api/template';
import { baseCases, baseCasesWithParams } from '@test/utilities';
import { clampCases, eraseCases, lowercaseCases, rightEmails, rightUrls, roundCases, toLowercaseCases, toUppercaseCases, trimCases, uppercaseCases, wrongEmails, wrongUrls } from './cases';

provide([
  [emailBuilder, ['email']],
  [urlBuilder, ['url']],
  [clampBuilder, ['clamp']],
  [eraseBuilder, ['erase']],
  [toLowerBuilder, ['toLower']],
  [toUpperBuilder, ['toUpper']],
  [lowercaseBuilder, ['lowercase']],
  [uppercaseBuilder, ['uppercase']],
  [trimBuilder, ['trim']],
  [roundBuilder, ['round']],
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

  describe('clamp', () =>
    baseCasesWithParams(clamp, clampCases, [])
  );

  describe(`clamp › template`, () =>
    baseCasesWithParams((min, max) => template(`@clamp($0, $1)`)([min, max]), clampCases, [])
  );

  describe('erase', () =>
    baseCasesWithParams(erase, eraseCases, [])
  );

  describe(`erase › template`, () =>
    baseCasesWithParams(() => template(`@erase`)(), eraseCases, [])
  );

  describe('lowercase', () =>
    baseCasesWithParams(lowercase, lowercaseCases, [])
  );

  describe(`lowercase › template`, () =>
    baseCasesWithParams(() => template(`@lowercase`)(), lowercaseCases, [])
  );

  describe('uppercase', () =>
    baseCasesWithParams(uppercase, uppercaseCases, [])
  );

  describe(`uppercase › template`, () =>
    baseCasesWithParams(() => template(`@uppercase`)(), uppercaseCases, [])
  );

  describe('toLower', () =>
    baseCasesWithParams(toLower, toLowercaseCases, [])
  );

  describe(`toLower › template`, () =>
    baseCasesWithParams(() => template(`@toLower`)(), toLowercaseCases, [])
  );

  describe('toUpper', () =>
    baseCasesWithParams(toUpper, toUppercaseCases, [])
  );

  describe(`toUpper › template`, () =>
    baseCasesWithParams(() => template(`@toUpper`)(), toUppercaseCases, [])
  );

  describe('trim', () =>
    baseCasesWithParams(trim, trimCases, [])
  );

  describe(`trim › template`, () =>
    baseCasesWithParams(param => template(`@trim($0)`)([param]), trimCases, [])
  );

  describe('round', () =>
    baseCasesWithParams(round, roundCases, [])
  );

  describe(`round › template`, () =>
    baseCasesWithParams(param => template(`@round($0)`)([param]), roundCases, [])
  );
});