export const weatherConsumerABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: 'router', internalType: 'address', type: 'address' },
      { name: '_donId', internalType: 'bytes32', type: 'bytes32' },
      { name: '_source', internalType: 'string', type: 'string' },
      { name: '_subscriptionId', internalType: 'uint64', type: 'uint64' },
      { name: '_gasLimit', internalType: 'uint32', type: 'uint32' },
    ],
  },
  { type: 'error', inputs: [], name: 'EmptyArgs' },
  { type: 'error', inputs: [], name: 'EmptySource' },
  { type: 'error', inputs: [], name: 'NoInlineSecrets' },
  { type: 'error', inputs: [], name: 'OnlyRouterCanFulfill' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'OwnershipTransferRequested',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'error', internalType: 'bytes', type: 'bytes', indexed: false },
    ],
    name: 'RequestFailed',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'id', internalType: 'bytes32', type: 'bytes32', indexed: true },
    ],
    name: 'RequestFulfilled',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'id', internalType: 'bytes32', type: 'bytes32', indexed: true },
    ],
    name: 'RequestSent',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'requestId',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'temperature',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
      {
        name: 'timestamp',
        internalType: 'uint64',
        type: 'uint64',
        indexed: false,
      },
    ],
    name: 'WeatherInfoReceived',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'requestId',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      { name: 'lat', internalType: 'string', type: 'string', indexed: false },
      { name: 'long', internalType: 'string', type: 'string', indexed: false },
    ],
    name: 'WeatherInfoRequested',
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'acceptOwnership',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'donId',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'requestId', internalType: 'bytes32', type: 'bytes32' },
      { name: 'response', internalType: 'bytes', type: 'bytes' },
      { name: 'err', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'handleOracleFulfillment',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'lat', internalType: 'string', type: 'string' },
      { name: 'long', internalType: 'string', type: 'string' },
    ],
    name: 'requestWeatherInfo',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    name: 'requests',
    outputs: [
      { name: 'lat', internalType: 'string', type: 'string' },
      { name: 'long', internalType: 'string', type: 'string' },
      { name: 'temperature', internalType: 'string', type: 'string' },
      { name: 'timestamp', internalType: 'uint64', type: 'uint64' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newDonId', internalType: 'bytes32', type: 'bytes32' }],
    name: 'setDonId',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'to', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
  },
] as const
