import { Celda, Composicion, Cuadricula, Renderizado } from "./MUIJS/mui.js";
import { OpcionesJuegoVida } from "./OpcionesJuegoVida.js";

export class JuegoDeLaVida {

    composicion: Composicion;
    cuadricula: Cuadricula;
    render: Renderizado;
    private constructor(composicion: Composicion, cuadricula: Cuadricula) {
        this.composicion = composicion;
        this.cuadricula = cuadricula;
        this.render = this.composicion.render;
        this.cuadricula.estadosCero()
    }

    get animar(): boolean {
        return this.composicion.animar;
    }

    get fps(): number {
        return this.composicion.fps
    }

    set fps(fps: number) {
        this.composicion.fps = fps
    }

    set colorFondo(color: string) {
        this.render.colorCanvas = color;
    }

    set colorCelulas(color: string) {
        this.cuadricula.colorCeldas = color;
    }

    set animar(animar: boolean) {
        this.composicion.animar = animar
    }

    static nuevoJuego(idCanvas: string, opciones: OpcionesJuegoVida): JuegoDeLaVida {
        const composicion: Composicion = new Composicion(idCanvas);
        const cuadricula: Cuadricula = new Cuadricula(opciones.columnas, opciones.filas, opciones.tamanoCelula, opciones.estadosCelula);
        composicion.tamanoCanvas(cuadricula.anchoCuadricula, cuadricula.altoCuadricula);
        cuadricula.bordesInfinitos = opciones.bordesInfinitos;
        return new JuegoDeLaVida(composicion, cuadricula);
    }

    rellenarCeldas() {
        this.cuadricula.rellenarCeldas(this.render)
    }

    private calcularEstados() {
        const arregloEstados: [number, number][][] = []
        const celdas: Celda[] = []
        this.cuadricula.celdas.forEach((filas) =>
            filas.forEach(celda => {
                arregloEstados.push(this.cuadricula.estadosVecinosPorCelda(celda))
                celdas.push(celda)
            })
        )
        for (let i: number = 0; i < celdas.length; i++) {
            if (arregloEstados[i][1][1] > 3 || arregloEstados[i][1][1] < 2) {
                celdas[i].estado = 0;
            }

            else if (celdas[i].estado == 0 && arregloEstados[i][1][1] == 3) {
                celdas[i].estado = 1;
            }
        }
    }

    pintarEstadosSiguiente() {
        // console.log('hola')
        this.render.limpiarCanvas();
        this.calcularEstados()
        this.rellenarCeldas()
    }

    reproducirJuego() {

        this.composicion.animacion(() => this.pintarEstadosSiguiente())
    }

    estadosAleatorios() {
        this.animar = false;
        this.render.limpiarCanvas()
        this.cuadricula.estadosAleatorios()
        this.rellenarCeldas()
    }

    limpiar() {
        this.animar = false;
        this.render.limpiarCanvas()
        this.cuadricula.estadosCero()
        this.rellenarCeldas()
    }

    aumentarFPS() {
        if (this.fps < 60) {
            if (this.fps >= 40) {
                this.fps += 5;
            }
            else if (this.fps >= 12) {
                this.fps += 2
            }
            else {
                this.fps++
            }
        }
    }
    reducirFPS() {
        if (this.fps > 1) {
            if (this.fps > 40) {
                this.fps -= 5;
            }
            else if (this.fps > 12) {
                this.fps -= 2
            }
            else {
                this.fps--
            }
        }
    }

}
