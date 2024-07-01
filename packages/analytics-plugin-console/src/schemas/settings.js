const schema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    endpoint: { type: 'string' },
    token: { type: 'string' },
    apiKey: { type: 'string' },
    writeKey: { type: 'string' },

    app: {
      type: 'object',
      properties: {
        service: { type: 'string' },
        profile: { type: 'string', default: 'local' },
        version: { type: 'string' },
      },
      required: [ 'service', 'version' ],
    },

    rum: {
      type: 'object',
      properties: {
        denyResourceOrigins: { type: 'array', items: { type: 'string' } },
      },
    },
  },

  oneOf: [
    { required: [ 'id', 'app', 'token' ] },
    { required: [ 'id', 'app', 'apiKey' ] },
    { required: [ 'id', 'app', 'writeKey' ] },
  ],

  alias: { apiKey: 'token', writeKey: 'token' },

  additionalProperties: false,
};


export default schema;
