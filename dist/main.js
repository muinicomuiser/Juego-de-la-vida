(function () {
    'use strict';

    /**
     * MÓDULO MATEMÁTICO EN ESPAÑOL
     * Reducido. Contiene solo funciones útiles de números aleatorios.
     */
    class Matematica {
        /**Retorna un número aleatorio entre dos números.*/
        static aleatorio(min, max) {
            let rango = max - min;
            return (Math.random() * rango) + min;
        }
        /**Retorna un número aleatorio entero entre dos números, ambos incluídos.*/
        static aleatorioEntero(min, max) {
            let rango = 1 + max - min;
            return Math.trunc((Math.random() * rango) + min);
        }
    }

    /**MÓDULO DE GEOMETRÍA EN ESPAÑOL
     * Útilitario para mui.js
     * Incluye métodos de conversión de grados y distancia entre puntos.
     */
    class Geometria {
        /**Retorna el doble del valor de PI.*/
        static get DOS_PI() {
            return Math.PI * 2;
        }
        /**Retorna la mitad del valor de PI.*/
        static get PI_MEDIO() {
            return Math.PI / 2;
        }
        //GRADOS  
        /**Transforma grados sexagesimales a radianes.*/
        static gradoARadian(grado) {
            return (grado / 180) * Math.PI;
        }
        /**Transfoma radianes a grados sexagesimales.*/
        static radianAGrado(rad) {
            return (rad / Math.PI) * 180;
        }
        //PITAGÓRICA
        /**Retorna la longitud de la hipotenusa según la longitud de los dos catetos ingresados.*/
        static hipotenusa(cateto1, cateto2) {
            return (cateto1 ** 2 + cateto2 ** 2) ** (1 / 2);
        }
        /**Retorna la longitud de un cateto según la longitud de la hipotenusa y del otro cateto.*/
        static cateto(hipotenusa, cateto) {
            return (hipotenusa ** 2 - cateto ** 2) ** (1 / 2);
        }
        //COORDENADAS
        /**Retorna el valor de la distancia entre dos puntos de un plano cartesiano.*/
        static distanciaEntrePuntos(puntoUno, puntoDos) {
            return this.hipotenusa(puntoDos.x - puntoUno.x, puntoDos.y - puntoUno.y);
        }
        /**Retorna el punto medio entre dos puntos de un plano cartesiano.*/
        static puntoMedio(puntoUno, puntoDos) {
            return { x: (puntoUno.x / 2 + puntoDos.x / 2), y: (puntoUno.y / 2, +puntoDos.y / 2) };
        }
    }

    //POR REVISAR
    class Vector {
        x;
        y;
        origen;
        id;
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.origen = { x: 0, y: 0 };
            this.id = 0;
        }
        get magnitud() {
            return Vector.magnitud(this);
        }
        get angulo() {
            return Vector.angulo(this);
        }
        static magnitud(vector) {
            return (vector.x ** 2 + vector.y ** 2) ** (1 / 2);
        }
        //REVISARRRRRRRRRRRRRRRR
        static angulo(vector) {
            if (vector.x == 0 && vector.y == 0) {
                return 0;
            }
            else if (vector.y > 0 && vector.x == 0) {
                return Geometria.PI_MEDIO;
            }
            else if (vector.y < 0 && vector.x == 0) {
                return (3 / 2) * Math.PI;
            }
            else {
                if (vector.y > 0 && vector.x > 0) {
                    return Math.atan(vector.y / vector.x);
                }
                else if (vector.y > 0 && vector.x < 0) {
                    return Math.acos(vector.x / Vector.magnitud(vector));
                }
                else if (vector.y < 0 && vector.x < 0) {
                    return Math.PI - Math.asin(vector.y / Vector.magnitud(vector));
                }
                return Geometria.DOS_PI - Math.acos(vector.x / Vector.magnitud(vector));
            }
        }
        static cero() {
            return new Vector(0, 0);
        }
        static arriba(escalar) {
            if (escalar) {
                return new Vector(0, -1 * escalar);
            }
            return new Vector(0, -1);
        }
        static abajo(escalar) {
            if (escalar) {
                return new Vector(0, 1 * escalar);
            }
            return new Vector(0, 1);
        }
        static izquierda(escalar) {
            if (escalar) {
                return new Vector(-1 * escalar, 0);
            }
            return new Vector(-1, 0);
        }
        static derecha(escalar) {
            if (escalar) {
                return new Vector(1 * escalar, 0);
            }
            return new Vector(1, 0);
        }
        /**Retorna un vector nuevo a partir de las componentes x e y ingresadas.*/
        static crear(x, y) {
            return new Vector(x, y);
        }
        /**Retorna un vector nuevo que va desde un punto origen a un punto extremo.*/
        static segunPuntos(origen, extremo) {
            let vector = new Vector(extremo.x - origen.x, extremo.y - origen.y);
            return vector;
        }
        /**Retorna una copia del vector.*/
        static clonar(vector) {
            let x = vector.x;
            let y = vector.y;
            return new Vector(x, y);
        }
        /**Retorna la suma de dos vectores como un vector nuevo.*/
        static suma(vectorUno, vectorDos) {
            let vectorSuma = new Vector((vectorUno.x + vectorDos.x), (vectorUno.y + vectorDos.y));
            return vectorSuma;
        }
        /**Retorna la resta de dos vectores como un vector nuevo.*/
        static resta(vectorUno, vectorDos) {
            let vectorResta = new Vector((vectorUno.x - vectorDos.x), (vectorUno.y - vectorDos.y));
            return vectorResta;
        }
        /**Retorna un vector nuevo resultante de multiplicar las componentes de un vector por un escalar.*/
        static escalar(vector, escalar) {
            let vectorEscalado = new Vector((vector.x * escalar), (vector.y * escalar));
            return vectorEscalado;
        }
        /**Retorna una copia del vector ingresado con magnitud 1.*/
        static normalizar(vector) {
            return new Vector(vector.x / vector.magnitud, vector.y / vector.magnitud);
        }
        /**Retorna un vector resultante de invertir la dirección del vector ingresado.*/
        static invertir(vector) {
            return new Vector(-vector.x, -vector.y);
        }
        /**Retorna el vector normal de un segmento formado por dos vectores.
         * El ángulo de la normal va en sentido antihorario según la dirección del primer al segundo vector.
         * (Según la inverción de ejes de las coordenadas de JS, donde los ángulos crecen en sentido horario).
        */
        static normal(vectorUno, vectorDos) {
            let vectorSegmento = Vector.segunPuntos(vectorUno, vectorDos);
            return Vector.rotar(vectorSegmento, -Geometria.PI_MEDIO);
        }
        /**Retorna el producto punto, o escalar, entre dos vectore.*/
        static punto(vectorUno, vectorDos) {
            return (vectorUno.x * vectorDos.x) + (vectorUno.y * vectorDos.y);
        }
        /**Retorna el módulo del producto cruz, o vectorial, entre dos vectores de 2 dimensiones.*/
        static cruz(vectorUno, vectorDos) {
            return vectorUno.x * vectorDos.y - vectorUno.y * vectorDos.x;
        }
        /**Retorna el valor de la proyección de un vector sobre un eje representado por otro vector.*/
        static proyeccion(vectorUno, vectorEje) {
            return (Vector.punto(vectorUno, vectorEje) / Vector.magnitud(vectorEje));
        }
        /**Retorna el valor del ángulo entre dos vectores.*/
        static anguloVectores(vectorUno, vectorDos) {
            let punto = Vector.punto(vectorUno, vectorDos);
            let magnitudes = vectorUno.magnitud * vectorDos.magnitud;
            return Math.acos(punto / magnitudes);
        }
        /**Retorna una copia de un conjunto de vectores.*/
        static clonarConjunto(vectores) {
            let conjuntoCopia = [];
            for (let vector of vectores) {
                conjuntoCopia.push(Vector.clonar(vector));
            }
            return conjuntoCopia;
        }
        /**Retorna un vector nuevo a partir de un vector rotado.*/
        static rotar(vector, angulo) {
            let x = (Math.cos(angulo) * vector.x) - (Math.sin(angulo) * vector.y);
            let y = (Math.sin(angulo) * vector.x) + (Math.cos(angulo) * vector.y);
            return new Vector(x, y);
        }
    }

    var TipoFormas;
    (function (TipoFormas) {
        TipoFormas["circunferencia"] = "circunferencia";
        TipoFormas["poligono"] = "poligono";
        TipoFormas["linea"] = "linea";
        TipoFormas["vector"] = "vector";
    })(TipoFormas || (TipoFormas = {}));

    /**
            =============================================
                     * MÓDULO DE COLISIONES *
            =============================================
            Trabaja usando objetos de tipo Forma.

            Usa el Teorema de ejes de separación (SAT) para detectar colisiones.

     */
    /**MÓDULO DE COLISIONES
     * Trabaja usando objetos de tipo Forma.
     * Usa el Teorema de ejes de separación (SAT) para detectar colisiones.
    */
    class Colision {
        static get iteraciones() {
            return 4;
        }
        /**Detecta colisiones usando el teorema SAT entre formas de tipo circunferencia y/o polígono.
         * Retorna true si detecta una colisión.
         * Retorna false si no detecta colisión.
        */
        static detectar(formaUno, formaDos) {
            //Pondré acá la detección de la distancia límite de colisión
            if (Geometria.distanciaEntrePuntos(formaUno.posicion, formaDos.posicion) <= (formaUno.radio + formaDos.radio) * 1.05) {
                if (formaUno.tipo == TipoFormas.poligono && formaDos.tipo == TipoFormas.poligono) {
                    return Colision.poligonos(formaUno, formaDos);
                }
                else if (formaUno.tipo == TipoFormas.circunferencia && formaDos.tipo == TipoFormas.poligono) {
                    return Colision.circunferenciaPoligono(formaUno, formaDos);
                }
                else if (formaUno.tipo == TipoFormas.poligono && formaDos.tipo == TipoFormas.circunferencia) {
                    return Colision.circunferenciaPoligono(formaDos, formaUno);
                }
                else {
                    return Colision.circunferencias(formaUno, formaDos);
                }
            }
            return false;
        }
        /**Detecta la intersección entre dos circunferencias.
         * Retorna true si hay intersección.
         * Retorna false si no hay intersección.
         * Compara la distancia entre ambos centros con la suma de sus radios.
         */
        static circunferencias(circunferenciaUno, circunferenciaDos) {
            let sumaRadios = circunferenciaUno.radioTransformado + circunferenciaDos.radioTransformado;
            let distanciaCentros = Geometria.distanciaEntrePuntos(circunferenciaUno.posicion, circunferenciaDos.posicion);
            if (distanciaCentros > sumaRadios) {
                return false;
            }
            return true;
        }
        /**Detecta la colisión entre dos polígonos.
         * Retorna true si hay colisión.
         * Retorna false si no hay colisión.
         * Usa el teorema SAT. Proyecta los vértices sobre las normales de las caras de ambos polígonos y busca ejes de separación.
         */
        static poligonos(poligonoUno, poligonoDos) {
            for (let normal of poligonoUno.normales) {
                /**Búsqueda de proyecciones mínimas y máximas de los vértices de los polígonos sobre las normales del polígono uno.*/
                let menorUno = Colision.proyeccionMenor(poligonoUno.verticesTransformados, normal);
                let mayorUno = Colision.proyeccionMayor(poligonoUno.verticesTransformados, normal);
                let menorDos = Colision.proyeccionMenor(poligonoDos.verticesTransformados, normal);
                let mayorDos = Colision.proyeccionMayor(poligonoDos.verticesTransformados, normal);
                /**Comparación. Si se encuentra una separación, retorna false.*/
                if (menorUno > mayorDos || mayorUno < menorDos) {
                    return false;
                }
            }
            for (let normal of poligonoDos.normales) {
                /**Búsqueda de proyecciones mínimas y máximas de los vértices de los polígonos sobre las normales del polígono uno.*/
                let menorUno = Colision.proyeccionMenor(poligonoUno.verticesTransformados, normal);
                let mayorUno = Colision.proyeccionMayor(poligonoUno.verticesTransformados, normal);
                let menorDos = Colision.proyeccionMenor(poligonoDos.verticesTransformados, normal);
                let mayorDos = Colision.proyeccionMayor(poligonoDos.verticesTransformados, normal);
                /**Comparación. Si se encuentra una separación, retorna false.*/
                if (menorUno > mayorDos || mayorUno < menorDos) {
                    return false;
                }
            }
            return true;
        }
        /**Detecta la colisión entre una circunferencia y un polígono.
         * Retorna true si hay colisión.
         * Retorna false si no hay colisión.
         * Usa el teorema SAT. Proyecta los vértices del polígono y dos puntos de la circunferencia sobre las normales de las caras del polígono y busca ejes de separación.
         */
        static circunferenciaPoligono(circunferencia, poligono) {
            for (let normal of poligono.normales) {
                /**Búsqueda de proyecciones mínimas y máximas de los vértices de los polígonos sobre las normales del polígono uno.*/
                let menorPoli = Colision.proyeccionMenor(poligono.verticesTransformados, normal);
                let mayorPoli = Colision.proyeccionMayor(poligono.verticesTransformados, normal);
                let menorCirc = Vector.proyeccion(circunferencia.posicion, normal) - circunferencia.radioTransformado;
                let mayorCirc = Vector.proyeccion(circunferencia.posicion, normal) + circunferencia.radioTransformado;
                /**Comparación. Si se encuentra una separación, retorna false.*/
                if (menorPoli > mayorCirc || mayorPoli < menorCirc) {
                    return false;
                }
            }
            return true;
        }
        /**Retorna el valor menor entre las proyecciones de un conjunto de vértices sobre un eje representado por un vector normal.*/
        static proyeccionMenor(vertices, normal) {
            let menor = Vector.proyeccion(vertices[0], normal);
            /**Búsqueda de proyecciones mínimas de los vértices del polígono uno.*/
            for (let vertice of vertices) {
                if (Vector.proyeccion(vertice, normal) < menor) {
                    menor = Vector.proyeccion(vertice, normal);
                }
            }
            return menor;
        }
        /**Retorna el valor mayor entre las proyecciones de un conjunto de vértices sobre un eje representado por un vector normal.*/
        static proyeccionMayor(vertices, normal) {
            let mayor = Vector.proyeccion(vertices[0], normal);
            /**Búsqueda de proyecciones máximas de los vértices del polígono uno.*/
            for (let vertice of vertices) {
                if (Vector.proyeccion(vertice, normal) > mayor) {
                    mayor = Vector.proyeccion(vertice, normal);
                }
            }
            return mayor;
        }
        /**Retorna un arreglo de dos vectores correspondiente a las normales de las caras de contacto entre dos formas.
         * El primero vector del arreglo corresponde a la normal de la primera forma.
         * El segundo vector del arreglo corresponde a la normal de la segunda forma.
        */
        static normalesContacto(formaUno, formaDos) {
            let normales = [];
            let normalUno;
            let normalDos;
            let vectorUnoADos = Vector.segunPuntos(formaUno.posicion, formaDos.posicion);
            let vectorDosAUno = Vector.segunPuntos(formaDos.posicion, formaUno.posicion);
            if (formaUno.tipo == TipoFormas.circunferencia) {
                normalUno = vectorUnoADos;
            }
            else {
                normalUno = Vector.clonar(formaUno.normales[0]);
                for (let normal of formaUno.normales) {
                    if (Vector.punto(vectorUnoADos, normal) > Vector.punto(vectorUnoADos, normalUno)) {
                        normalUno = Vector.clonar(normal);
                    }
                }
            }
            if (formaDos.tipo == TipoFormas.circunferencia) {
                normalDos = Vector.clonar(vectorDosAUno);
            }
            else {
                normalDos = Vector.clonar(formaDos.normales[0]);
                for (let normal of formaDos.normales) {
                    if (Vector.punto(vectorDosAUno, normal) > Vector.punto(vectorDosAUno, normalDos)) {
                        normalDos = Vector.clonar(normal);
                    }
                }
            }
            normales.push(normalUno);
            normales.push(normalDos);
            return normales;
        }
        /**Detecta la colisión entre una circunferencia y su entorno que la contiene.
         * Retorna el valor de solapamiento.
         * Retorna null si no hay colisión.
         * Usa el teorema SAT. Proyecta los vértices del entorno y dos puntos de la circunferencia sobre las normales de las caras del polígono
         * y verifica si hay proyecciones de la circunferencia mayores a la de los vértices del entorno.
         */
        static circunferenciaEntorno(circunferencia, entorno) {
            let distanciaCicunferenciaCentro = Geometria.distanciaEntrePuntos(circunferencia.posicion, entorno.posicion);
            if (distanciaCicunferenciaCentro + circunferencia.radio * 1.2 > entorno.apotema) {
                for (let normal of entorno.normales) {
                    /**Búsqueda de proyecciones mínimas y máximas de los vértices de los polígonos sobre las normales del polígono uno.*/
                    let menorPoli = Colision.proyeccionMenor(entorno.verticesTransformados, normal);
                    let mayorPoli = Colision.proyeccionMayor(entorno.verticesTransformados, normal);
                    let menorCirc = Vector.proyeccion(circunferencia.posicion, normal) - circunferencia.radioTransformado;
                    let mayorCirc = Vector.proyeccion(circunferencia.posicion, normal) + circunferencia.radioTransformado;
                    /**Comparación. Si se encuentra una separación, retorna true.*/
                    if (menorPoli > menorCirc) {
                        return menorPoli - menorCirc;
                    }
                    if (mayorPoli < mayorCirc) {
                        return mayorCirc - mayorPoli;
                    }
                }
            }
            return null;
        }
        /**Retorna la normal del borde del entorno contra el que ha colisionado una forma.*/
        static normalContactoConEntorno(forma, entorno) {
            let numeroVertices = entorno.verticesTransformados.length;
            let normalEntorno = entorno.normales[numeroVertices - 1];
            let vectorCentroAForma = Vector.segunPuntos(entorno.posicion, forma.posicion);
            for (let i = 0; i < numeroVertices - 1; i++) {
                let vectorCentroAVerticeUno = Vector.segunPuntos(entorno.posicion, entorno.verticesTransformados[i]);
                let vectorCentroAVerticeDos = Vector.segunPuntos(entorno.posicion, entorno.verticesTransformados[i + 1]);
                let anguloVertices = Vector.anguloVectores(vectorCentroAVerticeDos, vectorCentroAVerticeUno);
                if (Vector.anguloVectores(vectorCentroAForma, vectorCentroAVerticeUno) < anguloVertices
                    && Vector.anguloVectores(vectorCentroAForma, vectorCentroAVerticeDos) < anguloVertices) {
                    normalEntorno = entorno.normales[i];
                }
            }
            return normalEntorno;
        }
    }

    //Momento lineal, movimiento acelerado, momento angular, energía cinética y potencial.
    class Cinematica {
        /**Retorna un vector velocidad de un cuerpo que colisiona con una superficie.*/
        static reboteSimple(cuerpo, normal) {
            let vectorRebotado = cuerpo.velocidad;
            if (Vector.anguloVectores(vectorRebotado, normal) > Geometria.PI_MEDIO) {
                vectorRebotado = Vector.invertir(vectorRebotado);
            }
            return Vector.rotar(vectorRebotado, (Vector.angulo(normal) - Vector.angulo(vectorRebotado)) * 2);
        }
        /**Retorna en un arreglo las velocidades finales después de un choque elástico entre dos cuerpos.*/
        static reboteElastico(cuerpoUno, cuerpoDos) {
            return [Cinematica.velocidadUnoFinal(cuerpoUno, cuerpoDos), Cinematica.velocidadDosFinal(cuerpoUno, cuerpoDos)];
        }
        static velocidadUnoFinal(cuerpoUno, cuerpoDos) {
            const velUnoInicial = cuerpoUno.velocidad;
            const divisionMasas = (2 * cuerpoDos.masa) / (cuerpoUno.masa + cuerpoDos.masa);
            const restaVelocidades = Vector.resta(cuerpoDos.velocidad, cuerpoUno.velocidad);
            const restaPosiciones = Vector.resta(cuerpoDos.posicion, cuerpoUno.posicion);
            const puntoVelocidadesPosiciones = Vector.punto(restaVelocidades, restaPosiciones);
            const moduloPosicionesCuadrado = restaPosiciones.magnitud ** 2;
            const velUnoFinal = Vector.suma(velUnoInicial, Vector.escalar(restaPosiciones, divisionMasas * puntoVelocidadesPosiciones / moduloPosicionesCuadrado));
            return velUnoFinal;
        }
        static velocidadDosFinal(cuerpoUno, cuerpoDos) {
            const velDosInicial = cuerpoDos.velocidad;
            const divisionMasas = (2 * cuerpoUno.masa) / (cuerpoUno.masa + cuerpoDos.masa);
            const restaVelocidades = Vector.resta(cuerpoUno.velocidad, cuerpoDos.velocidad);
            const restaPosiciones = Vector.resta(cuerpoUno.posicion, cuerpoDos.posicion);
            const puntoVelocidadesPosiciones = Vector.punto(restaVelocidades, restaPosiciones);
            const moduloPosicionesCuadrado = restaPosiciones.magnitud ** 2;
            const velDosFinal = Vector.suma(velDosInicial, Vector.escalar(restaPosiciones, divisionMasas * puntoVelocidadesPosiciones / moduloPosicionesCuadrado));
            return velDosFinal;
        }
    }

    //Interacciones entre cuerpos.
    class Interaccion {
        static get iteraciones() {
            return 5;
        }
        /**Retorna una copia del conjunto de cuerpos con la resolución de rebote para cuerpos que han colisionado.      */
        static reboteEntreCuerpos(cuerpos) {
            for (let iteracion = 0; iteracion < Interaccion.iteraciones; iteracion++) {
                // let cuerposRebotados: Cuerpo[] = [];
                for (let i = 0; i < cuerpos.length - 1; i++) {
                    for (let j = i + 1; j < cuerpos.length; j++) {
                        if (Colision.detectar(cuerpos[i], cuerpos[j])) {
                            let normales = Colision.normalesContacto(cuerpos[i], cuerpos[j]);
                            let velocidadesFinales = Cinematica.reboteElastico(cuerpos[i], cuerpos[j]);
                            cuerpos[i].velocidad = velocidadesFinales[0];
                            cuerpos[j].velocidad = velocidadesFinales[1];
                            // cuerpos[i].velocidad = Cinematica.reboteSimple(cuerpos[i], normales[1])
                            // cuerpos[j].velocidad = Cinematica.reboteSimple(cuerpos[j], normales[0])
                            if (cuerpos[i].fijo) {
                                cuerpos[j].posicion = Vector.suma(cuerpos[j].posicion, Interaccion.resolverSolapamiento(cuerpos[j], cuerpos[i], normales[0]));
                            }
                            else if (cuerpos[j].fijo) {
                                cuerpos[i].posicion = Vector.suma(cuerpos[i].posicion, Interaccion.resolverSolapamiento(cuerpos[i], cuerpos[j], normales[1]));
                            }
                            else {
                                cuerpos[i].posicion = Vector.suma(cuerpos[i].posicion, Interaccion.resolverSolapamiento(cuerpos[i], cuerpos[j], normales[1]));
                                cuerpos[j].posicion = Vector.suma(cuerpos[j].posicion, Interaccion.resolverSolapamiento(cuerpos[j], cuerpos[i], normales[0]));
                            }
                        }
                    }
                    // cuerposRebotados.push(cuerpos[i])
                }
                // cuerposRebotados.push(cuerpos[cuerpos.length - 1])
            }
            return cuerpos;
            // return cuerposRebotados;
        }
        /**Retorna una copia del conjunto de cuerpos con la resolución de contacto sólido para cuerpos que han colisionado.      */
        static contactoSimple(cuerpos) {
            for (let iteracion = 0; iteracion < Interaccion.iteraciones; iteracion++) {
                // let cuerposRebotados: Cuerpo[] = [];
                for (let i = 0; i < cuerpos.length - 1; i++) {
                    for (let j = i + 1; j < cuerpos.length; j++) {
                        if (Colision.detectar(cuerpos[i], cuerpos[j])) {
                            let normales = Colision.normalesContacto(cuerpos[i], cuerpos[j]);
                            Cinematica.reboteElastico(cuerpos[i], cuerpos[j]);
                            if (cuerpos[i].fijo) {
                                cuerpos[j].posicion = Vector.suma(cuerpos[j].posicion, Interaccion.resolverSolapamiento(cuerpos[j], cuerpos[i], normales[0]));
                            }
                            else if (cuerpos[j].fijo) {
                                cuerpos[i].posicion = Vector.suma(cuerpos[i].posicion, Interaccion.resolverSolapamiento(cuerpos[i], cuerpos[j], normales[1]));
                            }
                            else {
                                cuerpos[i].posicion = Vector.suma(cuerpos[i].posicion, Interaccion.resolverSolapamiento(cuerpos[i], cuerpos[j], normales[1]));
                                cuerpos[j].posicion = Vector.suma(cuerpos[j].posicion, Interaccion.resolverSolapamiento(cuerpos[j], cuerpos[i], normales[0]));
                            }
                        }
                    }
                    // cuerposRebotados.push(cuerpos[i])
                }
                // cuerposRebotados.push(cuerpos[cuerpos.length - 1])
            }
            return cuerpos;
            // return cuerposRebotados;
        }
        static resolverSolapamiento(cuerpoUno, cuerpoDos, normal) {
            let vectorDesplazamiento = Vector.normalizar(normal);
            let solapamiento = (cuerpoDos.radio + cuerpoUno.radio) - Geometria.distanciaEntrePuntos(cuerpoDos.posicion, cuerpoUno.posicion);
            if (cuerpoDos.fijo) {
                vectorDesplazamiento = Vector.escalar(vectorDesplazamiento, solapamiento);
                return vectorDesplazamiento;
            }
            vectorDesplazamiento = Vector.escalar(vectorDesplazamiento, 0.5 * solapamiento);
            return vectorDesplazamiento;
        }
        /**Retorna una copia del conjunto de circunferencias con la resolución de rebote para cuerpos que han colisionado con los bordes de un entorno.      */
        static reboteCircunferenciasConEntorno(circunferencias, entorno) {
            let cuerposRebotados = [];
            for (let i = 0; i < circunferencias.length; i++) {
                let solapamiento = Colision.circunferenciaEntorno(circunferencias[i], entorno);
                if (solapamiento != null) {
                    let normal = Colision.normalContactoConEntorno(circunferencias[i], entorno);
                    let normalInvertida = Vector.invertir(normal);
                    circunferencias[i].velocidad = Cinematica.reboteSimple(circunferencias[i], normalInvertida);
                    circunferencias[i].posicion = Vector.suma(circunferencias[i].posicion, Interaccion.resolverSolapamientoEntorno(normalInvertida, solapamiento));
                }
                cuerposRebotados.push(circunferencias[i]);
            }
            return cuerposRebotados;
        }
        static resolverSolapamientoEntorno(normal, solapamiento) {
            let vectorDesplazamiento = Vector.normalizar(normal);
            vectorDesplazamiento = Vector.escalar(vectorDesplazamiento, 1 * solapamiento);
            return vectorDesplazamiento;
        }
    }

    /**MÓDULO DE DIBUJO
     * Instancia una herramienta dibujante.
     * Métodos para definir colores hsla y rgba, dibujar objetos tipo Forma y escribir.
     */
    class Dibujante {
        colorCelda;
        /**Interfaz de dibujo sobre el canvas. 2D*/
        context;
        // opcionesCelda:
        estiloForma = {
            colorTrazo: 'blue',
            colorRelleno: "skyblue",
            trazada: true,
            rellenada: true,
            grosorTrazo: 1,
            opacidad: 1,
        };
        /**Opciones de color, tamaño, fuente, opacidad y alineación.*/
        estiloTexto = {
            color: "red",
            tamano: 10,
            fuente: "calibri",
            opacidad: 1,
            alineacion: "right"
        };
        estiloVector = {
            color: "red",
            grosorTrazo: 1,
        };
        constructor(context) {
            this.context = context;
            this.colorCelda = "blue";
        }
        /**
         * Retorna un string con el color en formato HSL.
         * (hue) recibe grados entre 0 y 360,
         * (saturation) y (lightness) reciben porcentajes.
         */
        static colorHSL(hue, saturation, lightness) {
            return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        }
        /**
         * Retorna un string con el color en formato HSLA.
         * (hue) recibe grados entre 0 y 360,
         * (saturation) y (lightness) reciben porcentajes, y (alpha)
         * valores entre 0 y 1.
         */
        static colorHSLA(hue, saturation, lightness, alpha) {
            return `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`;
        }
        /**
         * Retorna un string con el color en formato RGB.
         * (red), (green) y (blue) reciben valores entre 0 y 255.
         */
        static colorRGB(red, green, blue) {
            return `rgb(${red}, ${green}, ${blue})`;
        }
        /**
         * Retorna un string con el color en formato RGBA.
         * (red), (green) y (blue) reciben valores entre 0 y 255,
         * y (alpha) valores entre 0 y 1.
         */
        static colorRGBA(red, green, blue, alpha) {
            return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
        }
        recorrerPath(forma) {
            if (forma.tipo == TipoFormas.circunferencia) {
                this.pathCircunferencia(forma);
            }
            else if (forma.tipo == TipoFormas.poligono) {
                this.pathPoligono(forma);
            }
            else if (forma.tipo == TipoFormas.linea || forma.tipo == TipoFormas.vector) {
                this.pathLinea(forma);
            }
        }
        /**Traza en el canvas la forma ingresada como argumento.*/
        trazar(forma) {
            this.recorrerPath(forma);
            if (forma.tipo == TipoFormas.vector) {
                this.context.strokeStyle = this.estiloVector.color;
            }
            else {
                if (forma.colorTrazo) {
                    this.context.strokeStyle = forma.colorTrazo;
                }
                else {
                    this.context.strokeStyle = this.estiloForma.colorTrazo;
                }
                if (forma.opacidad) {
                    this.context.globalAlpha = forma.opacidad;
                }
                else {
                    this.context.globalAlpha = this.estiloForma.opacidad;
                }
                if (forma.grosorTrazo) {
                    this.context.lineWidth = forma.grosorTrazo;
                }
                else {
                    this.context.lineWidth = this.estiloForma.grosorTrazo;
                }
            }
            this.context.stroke();
        }
        /**Rellena en el canvas la forma ingresada como argumento.*/
        rellenar(forma) {
            this.recorrerPath(forma);
            if (forma.opacidad) {
                this.context.globalAlpha = forma.opacidad;
            }
            else {
                this.context.globalAlpha = this.estiloForma.opacidad;
            }
            if (forma.colorRelleno) {
                this.context.fillStyle = forma.colorRelleno;
            }
            else {
                this.context.fillStyle = this.estiloForma.colorRelleno;
            }
            this.context.fill();
        }
        /**Rellena en el canvas la forma ingresada como argumento.*/
        rellenarCelda(celda) {
            this.context.beginPath();
            this.context.clearRect((celda.x - 1) * celda.tamano, (celda.y - 1) * celda.tamano, celda.tamano, celda.tamano);
            this.context.globalAlpha = this.estiloForma.opacidad;
            this.context.fillStyle = this.colorCelda;
            if (celda.color) {
                this.context.fillStyle = celda.color;
            }
            this.context.fillRect((celda.x - 1) * celda.tamano, (celda.y - 1) * celda.tamano, celda.tamano, celda.tamano);
            this.context.globalAlpha = 1;
        }
        /** Traza en el canvas el vector ingresado como argumento.
         * Usa como color el atributo colorVectores.
         */
        trazarVector(vector) {
            let origen = vector.origen;
            let extremo = { x: vector.origen.x + vector.x, y: vector.origen.y + vector.y };
            this.context.beginPath();
            this.context.moveTo(origen.x, origen.y);
            this.context.lineTo(extremo.x, extremo.y);
            this.context.lineWidth = this.estiloVector.grosorTrazo;
            this.context.globalAlpha = this.estiloForma.opacidad;
            this.context.strokeStyle = this.estiloVector.color;
            this.context.stroke();
        }
        /**Rellena un texto en el canvas en la posicion ingresada.*/
        escribir(texto, posicionX, posicionY) {
            this.context.textAlign = this.estiloTexto.alineacion;
            this.context.font = `${this.estiloTexto.tamano}px ${this.estiloTexto.fuente}`;
            // this.context.font = `${this.opcionesTexto.grosor} ${this.opcionesTexto.tamano}px ${this.opcionesTexto.fuente}`;
            this.context.globalAlpha = this.estiloTexto.opacidad;
            this.context.fillStyle = this.estiloTexto.color;
            this.context.fillText(texto, posicionX, posicionY);
        }
        /**Método interno.
        * Crea un recorrido para una forma con id "circunferencia", usando el método .arc de la interfaz context.
        */
        pathCircunferencia(forma) {
            this.context.beginPath();
            this.context.arc(forma.posicion.x, forma.posicion.y, forma.radioTransformado, 0, Geometria.DOS_PI);
        }
        /**Método interno.
        * Crea un recorrido para una forma con id "poligono". Registra líneas entre cada vértice del polígono.
        */
        pathPoligono(forma) {
            this.context.beginPath();
            this.context.moveTo(forma.verticesTransformados[0].x, forma.verticesTransformados[0].y);
            for (let vertice of forma.verticesTransformados) {
                this.context.lineTo(vertice.x, vertice.y);
            }
            this.context.closePath();
        }
        /**Método interno.
        * Crea un recorrido para una forma con id "linea". Registra una línea entre los dos vértices.
        */
        pathLinea(forma) {
            this.context.beginPath();
            this.context.moveTo(forma.verticesTransformados[0].x, forma.verticesTransformados[0].y);
            for (let vertice of forma.verticesTransformados) {
                this.context.lineTo(vertice.x, vertice.y);
            }
        }
    }

    /**MÓDULO DE RENDERIZADO
     * Extiende las funciones de Dibujante.
     * Permite trabajar con conjuntos de formas y sobre el canvas.
     * Se instancia usando el canvas.
     */
    class Renderizado extends Dibujante {
        canvas;
        _anchoCanvas = 500;
        _altoCanvas = 500;
        _colorFondo = 'black';
        constructor(canvas) {
            super(canvas.getContext("2d"));
            this.canvas = canvas;
            this.canvas.style.backgroundColor = this._colorFondo;
            this.canvas.width = this._anchoCanvas;
            this.canvas.height = this._altoCanvas;
        }
        /**Retorna la medida horizontal del canvas.*/
        get anchoCanvas() {
            return this._anchoCanvas;
        }
        /**Retorna la media vertical del canvas. */
        get altoCanvas() {
            return this._altoCanvas;
        }
        /**Retorna un punto ubicado en el centro del canvas.*/
        get centroCanvas() {
            return { x: this.anchoCanvas / 2, y: this.altoCanvas / 2 };
        }
        /**Retorna el color del canvas.*/
        get colorCanvas() {
            return this._colorFondo;
        }
        /**Modifica la medida horizontal del canvas.*/
        set anchoCanvas(ancho) {
            this._anchoCanvas = ancho;
            this.canvas.width = this._anchoCanvas;
        }
        /**Modifica la medida vertical del canvas. */
        set altoCanvas(alto) {
            this._altoCanvas = alto;
            this.canvas.height = this._altoCanvas;
        }
        /**Modifica el color del canvas.*/
        set colorCanvas(color) {
            this._colorFondo = color;
            this.canvas.style.backgroundColor = this._colorFondo;
        }
        /**Retorna una instancia de renderizado usando como parámetro el id de un canvas presente en el documento HTML. */
        static crearPorIdCanvas(idCanvas) {
            const CANVAS = document.getElementById(idCanvas);
            let nuevoRenderizador = new Renderizado(CANVAS);
            return nuevoRenderizador;
        }
        /**Traza un conjunto de formas.*/
        trazarFormas(formas) {
            for (let forma of formas) {
                forma.trazar(this);
            }
        }
        /**Rellena un conjunto de formas.*/
        rellenarFormas(formas) {
            for (let forma of formas) {
                forma.rellenar(this);
            }
        }
        /**Rellena y/o traza, según el caso, un conjunto de formas.*/
        renderizarFormas(formas) {
            for (let forma of formas) {
                if (forma.trazada) {
                    this.trazar(forma);
                    // forma.trazar(this);
                }
                if (forma.rellenada) {
                    this.rellenar(forma);
                    // forma.rellenar(this);
                }
            }
        }
        /**Borra el contenido del canvas.
         * Si se especifica opacidad, pinta el canvas completo usando como color el atributo colorCanvas y con la opacidad especificada.
         */
        limpiarCanvas(opacidad) {
            if (opacidad != undefined) {
                this.context.globalAlpha = opacidad;
                this.context.fillStyle = this._colorFondo;
                this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
                this.context.globalAlpha = this.estiloForma.opacidad;
            }
            else {
                this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            }
        }
        /**Traza las normales de una forma geométrica.*/
        trazarNormales(forma) {
            forma.normales.forEach((normal) => {
                let normalTrazable = Vector.clonar(normal);
                normalTrazable.origen = Vector.suma(forma.posicion, Vector.escalar(Vector.normalizar(normal), forma.apotema));
                this.trazarVector(normalTrazable);
            });
        }
    }

    /**Contador de tiempo, en milisegundos.
     * Su propiedad 'activo' se vuelve false cuando ha transcurrido el tiempo ingresado.
    */
    class Temporizador {
        tiempoInicial = Date.now();
        duracion;
        activo = true;
        constructor(duracionMilisegundos) {
            this.duracion = duracionMilisegundos;
            setTimeout(() => this.activo = false, this.duracion);
        }
        /**Retorna el tiempo, en milisegundos, transcurrido desde la creación del temporizador.*/
        get tiempoTranscurrido() {
            return Date.now() - this.tiempoInicial;
        }
    }

    class Tiempo {
        tiempoInicial;
        tiempoActual;
        temporizadores = [];
        constructor() { }
        /**Retorna el número de temporizadores activos.*/
        get numeroTemporizadores() {
            return this.temporizadores.length;
        }
        /**Ejecuta una función un número determinado de veces por segundo.*/
        iterarPorSegundo(funcion, numeroIteraciones) {
            const periodo = 1000 / numeroIteraciones;
            if (!this.tiempoInicial) {
                this.tiempoInicial = Date.now();
            }
            this.tiempoActual = Date.now();
            if (this.tiempoActual - this.tiempoInicial >= periodo) {
                funcion();
                this.tiempoInicial = this.tiempoActual;
            }
        }
        /**Crea un termporizador nuevo con la duración ingresada y lo agrega a la lista de temporizadores de la composición.*/
        crearTemporizador(tiempoMilisegundos) {
            const temporizador = new Temporizador(tiempoMilisegundos);
            this.temporizadores.push(temporizador);
            return temporizador;
        }
        /**Elimina del registro de temporizadores aquellos que estén inactivos.*/
        actualizarTemporizadores() {
            let indiceInactivo = this.temporizadores.findIndex((temporizador) => temporizador.activo == false);
            if (indiceInactivo != -1) {
                this.temporizadores.splice(indiceInactivo, 1);
            }
        }
    }

    //Junta los cuerpos, interacciones, entorno, casos límite y renderizado.
    //Debería estar acá la creación de canvas y contexto??
    class Composicion {
        /**Herramienta renderizadora.*/
        render;
        /**Conjunto de cuerpos sobre los que trabaja la composición.*/
        cuerpos = [];
        /**Conjunto de formas sobre las que trabaja la composición.*/
        formas = [];
        cuadricula;
        tiempo;
        contenedores = [];
        entorno;
        fps = 60;
        animar = true;
        constructor(idCanvas) {
            this.render = Renderizado.crearPorIdCanvas(idCanvas);
        }
        /**Define el ancho y el alto del canvas, en pixeles. */
        tamanoCanvas(ancho, alto) {
            this.render.anchoCanvas = ancho;
            this.render.altoCanvas = alto;
        }
        /**Agrega cuerpos al conjunto de cuerpos manipulados por la composición. */
        agregarCuerpos(...cuerpos) {
            this.cuerpos.push(...cuerpos);
        }
        /**Actualiza la posición de un conjunto de cuerpos sumando la velocidad instantanea a la posición.*/
        actualizarMovimientoCuerpos() {
            this.cuerpos.forEach((cuerpo) => cuerpo.mover());
        }
        /**Calcula la colisión entre los cuerpos de la composición y resuelve sus choques como choques eslásticos.*/
        reboteElasticoCuerpos() {
            Interaccion.reboteEntreCuerpos(this.cuerpos);
        }
        /**Calcula la colisión entre los cuerpos de la composición y evita que los cuerpos se solapen.*/
        contactoSimpleCuerpos() {
            Interaccion.contactoSimple(this.cuerpos);
        }
        /**Método gráfico. Pinta el interior de los cuerpos de la composición en el canvas.*/
        rellenarCuerpos() {
            this.render.rellenarFormas(this.cuerpos);
        }
        /**Método gráfico. Traza los cuerpos de la composición en el canvas.*/
        trazarCuerpos() {
            this.render.trazarFormas(this.cuerpos);
        }
        /**Método gráfico. Pinta y/o rellena los cuerpos de la composición, según lo definido para cada cuerpo.*/
        renderizarCuerpos() {
            this.render.renderizarFormas(this.cuerpos);
        }
        /**Método gráfico. Pinta y/o rellena las formas de la composición, según lo definido para cada forma.*/
        renderizarFormas() {
            this.render.renderizarFormas(this.formas);
        }
        animacion(funcion) {
            let tiempo = new Tiempo();
            const funcionAnimar = () => {
                let fps = this.fps;
                if (this.animar) {
                    tiempo.iterarPorSegundo(funcion, fps);
                }
                requestAnimationFrame(funcionAnimar);
            };
            funcionAnimar();
        }
    }

    //Tengo que integrar un modo de recibir eventos de hardware
    class ManejadorEventos {
        /**Agrega un eventListener para eventos de teclado. Recibe una función callback y opcionalmente un parámetro si la función lo requiere.*/
        static eventoTeclado(tipoEvento, codigoTecla, manejarEvento, parametro) {
            document.addEventListener(tipoEvento, (evento) => {
                if (evento.code == codigoTecla) {
                    manejarEvento(parametro);
                }
            });
        }
        /**Agrega un eventListener para eventos de teclado tipo keyup. Recibe una función callback y opcionalmente un parámetro si la función lo requiere.*/
        static eventoKeyup(codigoTecla, manejarEvento, parametro) {
            ManejadorEventos.eventoTeclado('keyup', codigoTecla, manejarEvento, parametro);
        }
        /**Agrega un eventListener para eventos de teclado tipo keydown. Recibe una función callback y opcionalmente un parámetro si la función lo requiere.*/
        static eventoKeydown(codigoTecla, manejarEvento, parametro) {
            ManejadorEventos.eventoTeclado('keydown', codigoTecla, manejarEvento, parametro);
        }
        /**Agrega un eventListener para eventos de teclado tipo keypress. Recibe una función callback y opcionalmente un parámetro si la función lo requiere.*/
        static eventoKeypress(codigoTecla, manejarEvento, parametro) {
            ManejadorEventos.eventoTeclado('keypress', codigoTecla, manejarEvento, parametro);
        }
        /**Agrega un eventListener para eventos de mouse y para trabajar con las propiedades del evento.
         * Recibe una función callback y opcionalmente un parámetro si la función lo requiere.*/
        static eventoMouseEnCanvas(tipoEvento, canvas, manejarEvento, parametro) {
            canvas.addEventListener(tipoEvento, (evento) => {
                if (parametro != undefined) {
                    manejarEvento(evento, parametro);
                }
                else {
                    manejarEvento(evento, undefined);
                }
            });
        }
        /**Agrega un eventListener para detectar cambios en el mouse, mas no trabaja con el evento.
         * Recibe una función callback y opcionalmente un parámetro si la función lo requiere.*/
        static mouseEnCanvas(tipoEvento, canvas, manejarEvento, parametro) {
            canvas.addEventListener(tipoEvento, () => {
                if (parametro != undefined) {
                    manejarEvento(parametro);
                }
                else {
                    manejarEvento(undefined);
                }
            });
        }
    }

    class Celda {
        posicion;
        tamano;
        color;
        estado;
        distanciaVecindad = 1;
        posicionVecinos = []; //Podría ser un arreglo de tuplas [vector vecino, distancia];
        constructor(posicionX, posicionY, tamano, estado = 1, color = '') {
            this.posicion = Vector.crear(posicionX, posicionY);
            this.tamano = tamano;
            this.color = color;
            this.estado = estado;
        }
        get x() {
            return this.posicion.x;
        }
        get y() {
            return this.posicion.y;
        }
        /**Retorna un vector con el área de las casillar que comprenden la vecindad de Moore de la celda, según su distancia de vecindad.
         * Ejemplo: el vector (-1, 1) representa a todas las cuadrículas en las posiciones entre (x-1, y-1) y (x+1, y+1) con respecto a la celda.
        */
        get vecindad() {
            return Vector.crear(-this.distanciaVecindad, this.distanciaVecindad);
        }
        determinarVecinos(numColumnas, numFilas) {
            const posicionesVecinos = [];
            for (let col = -this.distanciaVecindad; col <= this.distanciaVecindad; col++) {
                for (let fil = -this.distanciaVecindad; fil <= this.distanciaVecindad; fil++) {
                    if (fil + this.y > 0 && fil + this.y <= numFilas && col + this.x > 0 && col + this.x <= numColumnas && !(col == 0 && fil == 0)) {
                        posicionesVecinos.push(Vector.crear(this.x + col, this.y + fil));
                    }
                }
            }
            this.posicionVecinos = posicionesVecinos;
        }
        rellenar(dibujante) {
            dibujante.rellenarCelda(this);
        }
    }
    // Distancia. Métrica máxima. Distancia vecindad
    // En matemáticas, la distancia de Chebyshov (o métrica máxima, o métrica L∞) es una métrica1​ definida en un espacio
    // vectorial donde la distancia entre dos puntos (representados por sus vectores) es la mayor de sus diferencias a lo
    // largo de cualquiera de sus dimensiones coordenadas.
    // Número de celdas de la vecindad de Moore
    // (2r + 1)2 - 1
    // Siendo r la distancia métrica.

    class Cuadricula {
        filas;
        columnas;
        /**La dimensión del lado de una celda cuadrada.*/
        tamanoCelda;
        celdas = [];
        /**El número de estados posibles que puede adoptar cada celda.*/
        estados;
        _colorCeldas = 'blue';
        constructor(columnas, filas, tamanoCelda, estados) {
            this.filas = filas;
            this.columnas = columnas;
            this.tamanoCelda = tamanoCelda;
            this.celdas = this.crearCeldas();
            this.estados = estados;
        }
        /**Retorna el ancho de la cuadrícula (la multiplicación del número de columnas por el tamaño de cada celda).*/
        get anchoCuadricula() {
            return this.columnas * this.tamanoCelda;
        }
        /**Retorna el alto de la cuadrícula (la multiplicación del número de filas por el tamaño de cada celda).*/
        get altoCuadricula() {
            return this.filas * this.tamanoCelda;
        }
        /**Ajusta el color con que se pintarán las celdas.*/
        set colorCeldas(color) {
            if (this._colorCeldas != color) {
                this._colorCeldas = color;
                this.celdas.forEach((celdas) => { celdas.forEach((celda) => celda.color = color); });
            }
        }
        crearCeldas() {
            let celdasNuevas = [];
            for (let columna = 1; columna <= this.columnas; columna++) {
                celdasNuevas.push([]);
                for (let fila = 1; fila <= this.filas; fila++) {
                    let celda = new Celda(columna, fila, this.tamanoCelda);
                    celda.color = this._colorCeldas;
                    celda.determinarVecinos(this.columnas, this.filas);
                    celdasNuevas[columna - 1].push(celda);
                }
            }
            return celdasNuevas;
        }
        /**Retorna un arreglo de tuplas con el número de vecinos de la celda que están en cada estado posible.
         * [[estado, número de vecinos en ese estado], [estado, número de vecinos en ese estado]...]
         */
        estadosVecinosPorCelda(celda) {
            let vecinos = this.celdas[celda.x - 1][celda.y - 1].posicionVecinos;
            let listaEstados = [];
            for (let estado = 0; estado < this.estados; estado++) {
                listaEstados.push([estado, 0]);
            }
            vecinos.forEach(vecino => {
                listaEstados[this.celdaSegunCoordenada(vecino.x, vecino.y).estado][1]++;
            });
            return listaEstados;
        }
        /**Pinta todas las celdas de la cuadrícula. Asigna la opacidad de acuerdo al estado de cada celda.*/
        rellenarCeldas(dibujante) {
            this.celdas.forEach((celdas) => {
                celdas.forEach((celda) => {
                    dibujante.estiloForma.opacidad = (celda.estado / (this.estados - 1));
                    celda.rellenar(dibujante);
                });
            });
        }
        /**Retorna la celda ubicada en la posicion (columna, fila) respecto a la cuadrícula.*/
        celdaSegunCoordenada(columna, fila) {
            return this.celdas[columna - 1][fila - 1];
        }
        /**Retorna la celda ubicada en la posición del mouse sobre el canvas.*/
        celdaEnPosicionMouse(mouseX, mouseY) {
            let indiceColumna = Math.floor(mouseX / this.tamanoCelda);
            let indiceFila = Math.floor(mouseY / this.tamanoCelda);
            return this.celdas[indiceColumna][indiceFila];
        }
        /**Asigna un estado aleatorio a cada celda de la cuadrícula.*/
        estadosAleatorios() {
            if (this.estados == 1) {
                this.celdas.forEach((celdas) => celdas.forEach((celda) => celda.estado = 1));
            }
            else {
                this.celdas.forEach((celdas) => celdas.forEach((celda) => celda.estado = Matematica.aleatorioEntero(0, this.estados - 1)));
            }
        }
        /**Asigna un estado aleatorio a cada celda de la cuadrícula.*/
        estadosCero() {
            this.celdas.forEach((celdas) => celdas.forEach((celda) => celda.estado = 0));
        }
        /**Asigna un estado aleatorio a cada celda de la cuadrícula.*/
        estadosMaximos() {
            if (this.estados == 1) {
                this.celdas.forEach((celdas) => celdas.forEach((celda) => celda.estado = 1));
            }
            else {
                this.celdas.forEach((celdas) => celdas.forEach((celda) => celda.estado = this.estados - 1));
            }
        }
    }

    const CuadriculaJuego = new Cuadricula(100, 50, 10, 2);
    const COMPO = new Composicion('canvas');
    const Render = COMPO.render;
    Render.colorCanvas = 'black';
    CuadriculaJuego.colorCeldas = 'white';
    COMPO.tamanoCanvas(CuadriculaJuego.anchoCuadricula, CuadriculaJuego.altoCuadricula);
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
    }
    //Solo falta cambiar el modo de pintar la celda.
    //Que su color no se asigne según opacidad por estado, sino luminosidad por estado
    function juegoVida() {
        const arregloEstados = [];
        const celdas = [];
        CuadriculaJuego.celdas.forEach((filas) => filas.forEach(celda => {
            arregloEstados.push(CuadriculaJuego.estadosVecinosPorCelda(celda));
            celdas.push(celda);
        }));
        for (let i = 0; i < celdas.length; i++) {
            if (arregloEstados[i][1][1] > 3 || arregloEstados[i][1][1] < 2) {
                celdas[i].estado = 0;
            }
            else if (celdas[i].estado == 0 && arregloEstados[i][1][1] == 3) {
                celdas[i].estado = 1;
            }
        }
    }
    //Controles:
    //P <- Para pausar y reanudar
    //E <- Para matar todas las células
    //A <- Estados aleatorios
    //Espacio <- Para avanzar un frame
    //Flechas arriba/abajo <- Para aumentar o disminuir los fps
    //Click <- Para cambiar el estado de una célula
    ManejadorEventos.eventoKeyup('KeyP', () => { COMPO.animar = !COMPO.animar; });
    ManejadorEventos.eventoKeyup('KeyA', () => {
        CuadriculaJuego.estadosAleatorios();
        CuadriculaJuego.rellenarCeldas(Render);
    });
    ManejadorEventos.eventoKeyup('KeyE', () => {
        CuadriculaJuego.estadosCero();
        CuadriculaJuego.rellenarCeldas(Render);
    });
    ManejadorEventos.eventoKeyup('Space', () => {
        nuevoFrame();
    });
    ManejadorEventos.eventoKeyup('ArrowDown', () => {
        if (COMPO.fps >= 1) {
            if (COMPO.fps > 40) {
                COMPO.fps -= 5;
            }
            else if (COMPO.fps > 12) {
                COMPO.fps -= 2;
            }
            else {
                COMPO.fps--;
            }
        }
        console.log(COMPO.fps);
    });
    ManejadorEventos.eventoKeyup('ArrowUp', () => {
        if (COMPO.fps < 60) {
            if (COMPO.fps >= 40) {
                COMPO.fps += 5;
            }
            else if (COMPO.fps >= 12) {
                COMPO.fps += 2;
            }
            else {
                COMPO.fps++;
            }
        }
        console.log(COMPO.fps);
    });
    ManejadorEventos.eventoMouseEnCanvas('click', Render.canvas, evento => {
        let mouseX = evento.pageX - Render.canvas.offsetLeft;
        let mouseY = evento.pageY - Render.canvas.offsetTop;
        let celda = CuadriculaJuego.celdaEnPosicionMouse(mouseX, mouseY);
        if (celda.estado == 0) {
            celda.estado = 1;
        }
        else {
            celda.estado = 0;
        }
        Render.estiloForma.opacidad = celda.estado / (CuadriculaJuego.estados - 1);
        celda.rellenar(Render);
    });

})();
