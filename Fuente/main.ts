import { Celda, ManejadorEventos, Renderizado } from "./MUIJS/mui.js";
import { JuegoDeLaVida } from "./JuegoVida.js";
import { OpcionesJuegoVida } from "./OpcionesJuegoVida.js";

//INICIO DEL JUEGO

const OPCIONESJUEGO: OpcionesJuegoVida = {
    columnas: 140,
    filas: 70,
    tamanoCelula: 8,
    estadosCelula: 2
}

const JUEGOVIDA: JuegoDeLaVida = JuegoDeLaVida.nuevoJuego('canvas', OPCIONESJUEGO)
JUEGOVIDA.colorCelulas = Renderizado.colorHSL(0, 0, 90);
JUEGOVIDA.fps = 16;
JUEGOVIDA.animar = false;
JUEGOVIDA.reproducirJuego();


//FPS ESCRITOS EN LA INTERFAZ

const RenderFPS: Renderizado = Renderizado.crearPorIdCanvas('frecuenciaCanvas')
RenderFPS.anchoCanvas = 50
RenderFPS.altoCanvas = 30
function escribirFrecuencia() {
    RenderFPS.limpiarCanvas()
    RenderFPS.estiloTexto = { tamano: 20, color: 'white', alineacion: 'center' }
    RenderFPS.escribir(`X${JUEGOVIDA.fps}`, RenderFPS.centroCanvas.x, RenderFPS.centroCanvas.y + 10)
}
escribirFrecuencia()

//EVENTOS TECLADO

ManejadorEventos.anularAccionPorDefecto('espacio')

ManejadorEventos.eventoKeyup('p', () => {
    JUEGOVIDA.animar = !JUEGOVIDA.animar;
    if (JUEGOVIDA.animar) {
        botonReproducir.value = 'Pausar'
    }
    else {
        botonReproducir.value = 'Reproducir'
    }
});
ManejadorEventos.eventoKeyup('a', () => {
    JUEGOVIDA.estadosAleatorios();
    botonReproducir.value = 'Reproducir'

});
ManejadorEventos.eventoKeyup('l', () => {
    JUEGOVIDA.limpiar();
    botonReproducir.value = 'Reproducir'
});


ManejadorEventos.eventoKeyup('espacio', (evento) => {
    JUEGOVIDA.pintarEstadosSiguiente()
});
ManejadorEventos.eventoKeyup('menos', () => {
    JUEGOVIDA.reducirFPS()
    escribirFrecuencia()
});
ManejadorEventos.eventoKeyup('mas', () => {
    JUEGOVIDA.aumentarFPS()
    escribirFrecuencia()
});


//EVENTO CLICK EN CANVAS

ManejadorEventos.eventoMouseEnCanvas('click', JUEGOVIDA.render.canvas, evento => {
    let mouseX: number = evento.offsetX;
    let mouseY: number = evento.offsetY;
    let celda: Celda = JUEGOVIDA.cuadricula.celdaEnPosicionMouse(mouseX, mouseY);
    if (celda.estado == 0) {
        celda.estado = 1
    }
    else {
        celda.estado = 0
    }
    JUEGOVIDA.render.estiloForma.opacidad = celda.estado / (JUEGOVIDA.cuadricula.estados - 1)
    celda.rellenar(JUEGOVIDA.render)
});


//EVENTOS BOTONES INTERFAZ

const botonLimpiar: HTMLInputElement = <HTMLInputElement>document.getElementById('limpiar')
botonLimpiar.addEventListener('click', () => {
    JUEGOVIDA.limpiar();
    botonReproducir.value = 'Reproducir'
})
const botonAleatorio: HTMLInputElement = <HTMLInputElement>document.getElementById('aleatorio')
botonAleatorio.addEventListener('click', () => {
    JUEGOVIDA.estadosAleatorios();
    botonReproducir.value = 'Reproducir'
})
const botonReproducir: HTMLInputElement = <HTMLInputElement>document.getElementById('play')
botonReproducir.addEventListener('click', () => {
    JUEGOVIDA.animar = !JUEGOVIDA.animar;
    if (JUEGOVIDA.animar) {
        botonReproducir.value = 'Pausar'
    }
    else {
        botonReproducir.value = 'Reproducir'
    }
})
const botonTurno: HTMLButtonElement = <HTMLButtonElement>document.getElementById('turno')
botonTurno.addEventListener('click', () => {
    JUEGOVIDA.pintarEstadosSiguiente()
})
const botonMas: HTMLButtonElement = <HTMLButtonElement>document.getElementById('mas')
botonMas.addEventListener('click', () => {
    JUEGOVIDA.aumentarFPS()
    escribirFrecuencia()
})
const botonMenos: HTMLButtonElement = <HTMLButtonElement>document.getElementById('menos')
botonMenos.addEventListener('click', () => {
    JUEGOVIDA.reducirFPS()
    escribirFrecuencia()
})
