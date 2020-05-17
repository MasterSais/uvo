import { gte, lte } from '@lib/base-api/validators/is';
import { maxLen, minLen } from '@lib/base-api/validators/length';
import { number } from '@lib/base-api/validators/number';
import { object } from '@lib/base-api/validators/object';
import { object2 } from '@lib/base-api/validators/object2';
import { string } from '@lib/base-api/validators/string';
import { compile } from '@lib/templating-api/template';
import { baseCasesWithParams } from '@test/utilities';
import { cases } from './cases';

describe('base form', () => {
  baseCasesWithParams(() => (
    object({
      id: [number(), gte(0), lte(100)],
      name: [string(), minLen(10), maxLen(100)]
    })
  ), cases, []);
});

describe('base form › advanced', () => {
  baseCasesWithParams(() => (
    object2([
      ['id', number(), gte(0), lte(100)],
      ['name', string(), minLen(10), maxLen(100)]
    ])
  ), cases, []);
});

describe('base form › compile', () => {
  baseCasesWithParams(() => (
    compile(`
      @object(
        id : @number : @compare(>=0) : @compare(<=100),
        name : @string : @length(>=10) : @length(<=100)
      )
    `)()
  ), cases, []);
});

describe('base form › compile › short', () => {
  baseCasesWithParams(() => (
    compile(`
      @o(
        id @n @c(>=0,<=100),
        name @s @l(>=10,<=100)
      )
    `)()
  ), cases, []);
});