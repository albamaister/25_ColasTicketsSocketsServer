import { Socket } from 'socket.io';

// Para la configuracion y las opciones de cada una de las acciones que van a ser disparadas desde el io

export const desconectar = ( cliente: Socket ) => {
    cliente.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
}