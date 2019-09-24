import { Marcador } from "./marcador";

// el mapa es el encargado de manejar todas las coordenas y todos los arreglos de marcadores y todo lo que se 
// haga con ellos
export class Mapa {
    public marcadores: Marcador[] = [];

    constructor() {}

    getMarcadores() {
        return this.marcadores;
    }

    agregarMarcador( marcador: Marcador ) {

        this.marcadores.push( marcador );
    }

    borrarMarcador( id: string ) {

        this.marcadores = this.marcadores.filter( mark => mark.id !== id );
        return this.marcadores;
    }

    moverMarcador(marcador: Marcador) {
        for (const i in this.marcadores) {
            if (this.marcadores[i].id === marcador.id) {
                this.marcadores[i].lat = marcador.lat;
                this.marcadores[i].lng = marcador.lng;
                break;
            }
        }
    }

}