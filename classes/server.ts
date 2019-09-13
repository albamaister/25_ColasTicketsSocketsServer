
import express from 'express';
import { SERVER_PORT } from '../global/environment';
import socketIO from 'socket.io';
import http from 'http';

export  default class Server {

    private static _instance: Server;

    public app: express.Application;
    public port: number;

    public io: socketIO.Server; // encargado de los eventos de los sockets
    private httpServer: http.Server; // este es el servidor que se va a levantar y no el app de express


    private constructor() {
        this.app = express();
        this.port = SERVER_PORT;

        this.httpServer = new http.Server( this.app );
        this.io = socketIO( this.httpServer ); // Parte mas importante: configurar el IO 

        this.escucharSockets();

        // socket io necesita recibir la configuracion del servidor que esta corriendo actualmente
        // para esto se usa un intermediario que es http
    }

    public static get instance() {
        return this._instance || (this._instance = new this);
    }

    // metodo para levantar este servidor
    start( callback: Function ) {
        this.httpServer.listen( this.port, callback() );
    }

    private escucharSockets() { // privado porque solo se va a llamar desde la inicializacion de la clase
        // aqui va la configuracion de un par de sockets
        console.log('Escuchando conecciones - sockets');
        // se necesita escuchar cuando un cliente se conecta o cuando una persona se conecta a mi aplicacion mediante sockets 
        this.io.on('connection', cliente => {
            console.log('CLiente conectado');
        }); // on es para escuchar algun evento 
        

    }
}
