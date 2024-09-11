import { Celda, Composicion, Cuadricula, Grabador, ManejadorEventos, Renderizado } from "./MUIJS/mui.js";

const CuadriculaJuego: Cuadricula = new Cuadricula(120, 80, 8, 2);
const COMPO: Composicion = new Composicion('canvas');
const Render: Renderizado = COMPO.render;
// Render.colorCanvas = 'white';
CuadriculaJuego.colorCeldas = Renderizado.colorHSL(0, 0, 80);
COMPO.tamanoCanvas(CuadriculaJuego.anchoCuadricula, CuadriculaJuego.altoCuadricula)

CuadriculaJuego.estadosCero();

COMPO.fps = 16;
COMPO.animar = false;
CuadriculaJuego.rellenarCeldas(Render);

// Grabador.grabarCanvas(Render.canvas, 100000, 60, 'descarga');
COMPO.animacion(nuevoFrame);

const RenderFrecuencia: Renderizado = Renderizado.crearPorIdCanvas('frecuenciaCanvas')
RenderFrecuencia.anchoCanvas = 40
RenderFrecuencia.altoCanvas = 30
function escribirFrecuencia() {
    RenderFrecuencia.limpiarCanvas()
    RenderFrecuencia.estiloTexto = { tamano: 20, color: 'white', alineacion: 'center' }
    RenderFrecuencia.escribir(`X${COMPO.fps}`, RenderFrecuencia.centroCanvas.x, RenderFrecuencia.centroCanvas.y + 5)
}

escribirFrecuencia()
function nuevoFrame() {
    Render.limpiarCanvas();
    juegoVida();
    CuadriculaJuego.rellenarCeldas(Render);
};

function juegoVida(): void {
    const arregloEstados: [number, number][][] = []
    const celdas: Celda[] = []
    CuadriculaJuego.celdas.forEach((filas) =>
        filas.forEach(celda => {
            arregloEstados.push(CuadriculaJuego.estadosVecinosPorCelda(celda))
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
};

//Controles:
//P <- Para pausar y reanudar
//E <- Para matar todas las células
//A <- Estados aleatorios
//Espacio <- Para avanzar un frame
//Flechas arriba/abajo <- Para aumentar o disminuir los fps
//Click <- Para cambiar el estado de una célula

ManejadorEventos.eventoKeyup('KeyP', () => { COMPO.animar = !COMPO.animar });
ManejadorEventos.eventoKeyup('KeyA', () => {
    CuadriculaJuego.estadosAleatorios()
    CuadriculaJuego.rellenarCeldas(Render)

});
ManejadorEventos.eventoKeyup('KeyL', () => {
    COMPO.animar = false;
    CuadriculaJuego.estadosCero()
    CuadriculaJuego.rellenarCeldas(Render)
});
ManejadorEventos.eventoKeyup('Space', () => {
    nuevoFrame()
});
ManejadorEventos.eventoKeyup('ArrowDown', () => {
    if (COMPO.fps > 1) {
        if (COMPO.fps > 40) {
            COMPO.fps -= 5;
        }
        else if (COMPO.fps > 12) {
            COMPO.fps -= 2
        }
        else {
            COMPO.fps--
        }
    }
    escribirFrecuencia()
});
ManejadorEventos.eventoKeyup('ArrowUp', () => {
    if (COMPO.fps < 60) {
        if (COMPO.fps >= 40) {
            COMPO.fps += 5;
        }
        else if (COMPO.fps >= 12) {
            COMPO.fps += 2
        }
        else {
            COMPO.fps++
        }
    }
    escribirFrecuencia()
});
ManejadorEventos.eventoMouseEnCanvas('click', Render.canvas, evento => {
    let mouseX: number = evento.pageX - Render.canvas.offsetLeft;
    let mouseY: number = evento.pageY - Render.canvas.offsetTop;
    let celda: Celda = CuadriculaJuego.celdaEnPosicionMouse(mouseX, mouseY);
    if (celda.estado == 0) {
        celda.estado = 1
    }
    else {
        celda.estado = 0
    }
    Render.estiloForma.opacidad = celda.estado / (CuadriculaJuego.estados - 1)
    celda.rellenar(Render)
});

//Botones

const botonLimpiar: HTMLInputElement = <HTMLInputElement>document.getElementById('limpiar')
botonLimpiar.addEventListener('click', () => {
    COMPO.animar = false;
    CuadriculaJuego.estadosCero()
    CuadriculaJuego.rellenarCeldas(Render)
    botonReproducir.value = 'Reproducir'
})
const botonAleatorio: HTMLInputElement = <HTMLInputElement>document.getElementById('aleatorio')
botonAleatorio.addEventListener('click', () => {
    COMPO.animar = false;
    CuadriculaJuego.estadosAleatorios()
    CuadriculaJuego.rellenarCeldas(Render)
    botonReproducir.value = 'Reproducir'
})
const botonReproducir: HTMLInputElement = <HTMLInputElement>document.getElementById('play')
botonReproducir.addEventListener('click', () => {
    COMPO.animar = !COMPO.animar;
    if (COMPO.animar) {
        botonReproducir.value = 'Pausar'
    }
    else {
        botonReproducir.value = 'Reproducir'
    }
})
const botonTurno: HTMLButtonElement = <HTMLButtonElement>document.getElementById('turno')
botonTurno.addEventListener('click', () => {
    nuevoFrame()
})
const botonMas: HTMLButtonElement = <HTMLButtonElement>document.getElementById('mas')
botonMas.addEventListener('click', () => {
    if (COMPO.fps < 60) {
        if (COMPO.fps >= 40) {
            COMPO.fps += 5;
        }
        else if (COMPO.fps >= 12) {
            COMPO.fps += 2
        }
        else {
            COMPO.fps++
        }
    }
    escribirFrecuencia()
    console.log(COMPO.fps)
})
const botonMenos: HTMLButtonElement = <HTMLButtonElement>document.getElementById('menos')
botonMenos.addEventListener('click', () => {
    if (COMPO.fps > 1) {
        if (COMPO.fps > 40) {
            COMPO.fps -= 5;
        }
        else if (COMPO.fps > 12) {
            COMPO.fps -= 2
        }
        else {
            COMPO.fps--
        }
    }
    escribirFrecuencia()
    console.log(COMPO.fps)
})
