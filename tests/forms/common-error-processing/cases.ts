export const cases: Array<any> = [
  [
    [],
    { id: 3, name: 'abc' },
    {
      result: { id: 3, name: 'abc', roles: null, subs: null }, errors: [
        'array:roles:arrayErr',
        'array:subs:arrayErr',
      ]
    }
  ],
  [
    [],
    { id: 3, name: 'abc', roles: ['abc', '10', 'abc'] },
    {
      result: { id: 3, name: 'abc', roles: [null, 10, null], subs: null }, errors: [
        'number:roles.0:numberErr',
        'number:roles.2:numberErr',
        'array:subs:arrayErr',
      ]
    }
  ],
  [
    [],
    {
      id: -1, name: 'abc', subs: [
        { id: 1, name: 'a', subs: [] },
        { id: -1, name: 'abc', roles: [] },
        null
      ]
    },
    {
      result: {
        id: null, name: 'abc', roles: null, subs: [
          { id: 1, name: null, roles: null, subs: [] },
          { id: null, name: 'abc', roles: [], subs: null },
          null
        ]
      }, errors: [
        'gte:id:gteErr',
        'array:roles:arrayErr',
        'minLen:subs.0.name:minLenErr',
        'array:subs.0.roles:arrayErr',
        'gte:subs.1.id:gteErr',
        'array:subs.1.subs:arrayErr',
        'object:subs.2:objectErr',
      ]
    }
  ]
];