



fastify.listen(3000, (err, address) => {
  if (err) {
    console.error(err)
    return
  }
  console.log(fastify.routes)
  /* will output a Map with entries:
  {
    '/hello': {
      get: {
        method: 'GET',
        url: '/hello',
        schema: Object,
        handler: <Function>,
        prefix: <String>,
        logLevel: <String>,
        bodyLimit: <Number>
      }
    }
  }
  */
})

const opts = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          hello: { type: 'string' }
        }
      }
    }
  }
}
fastify.get('/', opts, (request, reply) => {
  reply.send({ hello: 'world' })
})


fastify.listen(3000, (error) => {
  if (error) throw error;
});