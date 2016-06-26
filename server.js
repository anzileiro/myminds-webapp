'use strict'

const   Hapi    =   require('hapi')
    ,   Inert   =   require('inert')
    ,   Path    =   require('path')
    ,   Server  =   new Hapi.Server()

Server.connection({
    host: process.env.WEBAPP_HOST,
    port:  process.env.WEBAPP_PORT
})

Server.register(Inert, (err) => {
    if (err) {
        throw err
    }
})

Server.route({
    method: 'GET',
    path: '/assets/{path*}',
    config: {
        handler: {
            directory: {
                path: Path.join(__dirname, 'public'),
                redirectToSlash: true,
                index: true
            }
        }
    }
})

Server.route({
    method: 'GET',
    path: '/views/{path*}',
    config: {
        handler: {
            directory: {
                path: Path.join(__dirname, 'views'),
                redirectToSlash: true,
                index: true
            }
        }
    }
})

Server.route({
    method: 'GET',
    path: '/',
    handler: (request, reply) => {
        return reply.file('./views/index.html')
    }
})

Server.start((err) => {
    if (err) {
        throw err
    }
    console.log(`Server running at: ${Server.info.uri} on ${process.env.NODE_ENV} mode`)
})