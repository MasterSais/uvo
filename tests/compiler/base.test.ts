import { template } from '@lib/compiler';
import { baseCasesWithParams } from '@test/utilities';

describe('base', () => {
  const validator = template(
    `
      [object( 
        [id : number : compare(>0)]
        [name : string : length(>=10)]
      )]
    `
  );

  baseCasesWithParams(
    () => validator,
    [
      [[], { id: 1, name: 'MasterSais' }],
      [[], { id: 100, name: 'MasterSais' }],
      [[], { id: 0, name: 'MasterSais' }, { id: null, name: 'MasterSais' }],
      [[], { id: 'abc', name: 'Master' }, { id: null, name: null }],
      [[], { id: -1, name: {} }, { id: null, name: null }]
    ],
    []
  );
});