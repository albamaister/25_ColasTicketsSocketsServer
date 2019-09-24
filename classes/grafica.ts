
export class GraficaData {
    private meses: string[] = [ 'january', 'february', 'march', 'april' ];
    private valores: number[] = [0,0,0,0];

    constructor() {}

    getDataGrafica() {

        return [ { data: this.valores, label: 'Ventas' }]

    }

    incrementarValor(mes: string, valor: number) {
        mes = mes.toLowerCase().trim();
        for (let i in this.meses) {
            if ( this.meses[i] === mes ) {
                this.valores[i] += valor;
            }
        }
        return this.getDataGrafica();
    }
}
