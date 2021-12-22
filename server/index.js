const server = require('fastify')({ logger: false })

server
	.register(require('fastify-cors'))
	.register(require('fastify-http-proxy'), { // https://github.com/fastify/fastify-http-proxy
		upstream: 'https://api.binance.com/api/v3/', //redirect to binance
		prefix: '/', 
		http2: true 
	})

server.listen(3000, (err, address) => {
	if (err) throw err
	console.log(`Server ready at ${address}`)
})

