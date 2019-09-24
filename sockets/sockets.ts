import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { UsuariosLista } from '../classes/usuarios-lista';
import { Usuario } from '../classes/usuario';
import { mapa } from '../routes/router';
import { TicketArrayRepository } from '../repositories/ticketArrayRepository';


/**
 * 
 * @param client 
 * @param io 
 */
export const colas = (client: Socket, io: socketIO.Server) => {
    const ticketRepository = TicketArrayRepository.instance;
    io.to(client.id).emit('last-ticket', ticketRepository.last());
  };


// Mapas
export const marcadorNuevo = ( cliente: Socket ) => {
cliente.on('marcador-nuevo', (marcador) => {

   mapa.agregarMarcador(marcador);

    cliente.broadcast.emit('marcador-nuevo', marcador); // Bradcast emite a todos menos a el mismo
})
}

export const marcadorBorrar = ( cliente: Socket ) => {
    cliente.on('marcador-borrar', (id: string) => {
    
       mapa.borrarMarcador(id);
    
        cliente.broadcast.emit('marcador-borrar', id); // Bradcast emite a todos menos a el mismo
    })
    }

    export const marcadorMover = ( cliente: Socket ) => {
        cliente.on('marcador-mover', (marcador) => {
        
           mapa.moverMarcador(marcador);
        
            cliente.broadcast.emit('marcador-mover', marcador); // Bradcast emite a todos menos a el mismo
        })
        }




export const usuariosConectados = new UsuariosLista();

export const conectarCliente = ( cliente: Socket, io: socketIO.Server ) => {

    const usuario = new Usuario( cliente.id );
    usuariosConectados.agregar( usuario );

}

// Para la configuracion y las opciones de cada una de las acciones que van a ser disparadas desde el io

export const desconectar = ( cliente: Socket, io: socketIO.Server ) => {
    cliente.on('disconnect', () => {
        console.log('Cliente desconectado');
        usuariosConectados.borrarusuario(cliente.id);
        io.emit('usuarios-activos', usuariosConectados.getLista());

    });
}


// Escuchar mensajes
export const mensaje = ( cliente: Socket, io: socketIO.Server ) => {
    cliente.on('mensaje', ( payload: { de: string, cuerpo: string } ) => {

        console.log('Mensaje recibido', payload);
        io.emit('mensaje-nuevo', payload);

    });
}

// Configurar usuario
export const configurarUsuario = ( cliente: Socket, io: socketIO.Server ) => {
    cliente.on('configurar-usuario', ( payload: { nombre: string }, callback: Function ) => {

        usuariosConectados.actualizarNombre(cliente.id, payload.nombre);
        io.emit('usuarios-activos', usuariosConectados.getLista());
        // io.emit('mensaje-nuevo', payload);
        callback({
            ok: true,
            mensaje: `Usuario ${ payload.nombre }, configurado`
        });

    });
}

// Obtener Usuarios

export const obtenerUsuarios = ( cliente: Socket, io: socketIO.Server ) => {
    cliente.on('obtener-usuarios', () => {

        io.to(cliente.id).emit('usuarios-activos', usuariosConectados.getLista());
        // io.emit('mensaje-nuevo', payload);

    });
}




