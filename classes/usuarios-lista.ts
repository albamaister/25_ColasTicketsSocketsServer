import { Usuario } from './usuario';
// Tener centralizado la logica de todos mis usuarios, procesos para agregar, proceosos para mandar un mensaje 

export class UsuariosLista {
    private lista: Usuario[] = [];

    constructor() {}

    // agregar un usuario
    public agregar( usuario: Usuario ) {
        this.lista.push(usuario);
        console.log(this.lista);
        return usuario;
    }

    public actualizarNombre( id: string, nombre: string ) {
        for( let usuario of this.lista ) {
            if ( usuario.id === id ) {
                usuario.nombre = nombre;
                break;
            }
        }
        console.log('==================actualizando usuario================');
        console.log(this.lista);
    }


    // Obtener lista de usuarios
    public getLista() {
        return this.lista;
    }
    

    // Obtener un usuario
    public getUsuario( id: string ) {
        this.lista.find( usuario => {
            return usuario.id === id;
        } );
    }

    // Obtener usuarios en una sala en particular
    public getUsuariosSala( sala: string ) {
        return this.lista.filter( usuario => usuario.sala === sala )
    }

    // Borra un usuario
    public borrarusuario( id: string ) {
        const tempusuario = this.getUsuario(id);

        this.lista = this.lista.filter( usuario => usuario.id !== id );
        // console.log(this.lista);
        return tempusuario;
    }

}

