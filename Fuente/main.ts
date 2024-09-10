import { Celda, Composicion, Cuadricula, Grabador, ManejadorEventos, Renderizado, Tiempo, Vector } from "./MUIJS/mui.js";

const CuadriculaJuego: Cuadricula = new Cuadricula(100, 50, 10, 2);
const COMPO: Composicion = new Composicion('canvas');
const Render: Renderizado = COMPO.render;
Render.colorCanvas = 'black';
CuadriculaJuego.colorCeldas = 'white';
COMPO.tamanoCanvas(CuadriculaJuego.anchoCuadricula, CuadriculaJuego.altoCuadricula)

CuadriculaJuego.estadosCero();
// CuadriculaJuego.estadosAleatorios();

COMPO.fps = 16;
COMPO.animar = false;
CuadriculaJuego.rellenarCeldas(Render);

// Grabador.grabarCanvas(Render.canvas, 100000, 60, 'descarga');
COMPO.animacion(nuevoFrame);

function nuevoFrame() {
    Render.limpiarCanvas();
    juegoVida();
    CuadriculaJuego.rellenarCeldas(Render);
};

//Solo falta cambiar el modo de pintar la celda.
//Que su color no se asigne según opacidad por estado, sino luminosidad por estado
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
ManejadorEventos.eventoKeyup('KeyE', () => {
    CuadriculaJuego.estadosCero()
    CuadriculaJuego.rellenarCeldas(Render)
});
ManejadorEventos.eventoKeyup('Space', () => {
    nuevoFrame()
});
ManejadorEventos.eventoKeyup('ArrowDown', () => {
    if (COMPO.fps >= 1) {
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
    console.log(COMPO.fps)
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
    console.log(COMPO.fps)
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