const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/config');

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        //paths
        this.authPath = '/api/login';
        this.userPath = '/api/user';
        this.pokemonPath = '/api/pokemon';

        //db
        this.connection();

        //methods
        this.middlewares();
        this.routes();
    }

    async connection(){
        await dbConnection();
    }

    middlewares(){
        this.app.use( express.json() );
        this.app.use( cors() );
    }

    routes(){
        this.app.use( this.userPath, require('../routes/user.route') );
        this.app.use( this.pokemonPath, require('../routes/pokemon.route') );
    }

    listen(){
        this.app.listen( this.port );       
    }

}

module.exports = Server;