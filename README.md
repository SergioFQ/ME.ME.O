# ME.ME.O
Juego desarrollado para la asignatura de Juegos en Red.

Integrantes:
+ Sergio Fernández Quidiello.
  + Correo universidad: s.fernandezqu.2017@alumnos.urjc.es
  + Github: [SergioFQ](https://github.com/SergioFQ)
  
+ Raúl Fernández Ruíz
  + Correo universidad: r.fernandezru.2018@alumnos.urjc.es
  + Github: [RaulFernandezRuiz](https://github.com/RaulFernandezRuiz)
  
+ Jaime Jiménez Lopez
  + Correo universidad: j.jimenezl.2018@alumnos.urjc.es
  + Github: [jaimejl21](https://github.com/jaimejl21)
  
+ Asier Menéndez Mendoza
  + Correo universidad: a.menendezm.2018@alumnos.urjc.es
  + Github: [OMGitsAsieR](https://github.com/OMGitsAsieR)

# 1.High Concept
ME.ME.O es un juego 2D competitivo de estilo cartoon donde los jugadores buscan ganar la mayor cantidad de puntos posibles para obtener más que el rival.
# 2.Marketing
## 2.1 Público objetivo
ME.ME.O buscará la atención de jugadores de 16 - 25 años que juegan a títulos casual/plataformas y que principalmente les guste jugar con amigos.

ME.ME.O tendrá una clasificación, según el estándar europeo, de PEGI 12, ME.ME.O no mostrará sangre de manera explícita, puede contener un lenguaje soez leve.
## 2.2 Plazos de entrega
![](https://github.com/SergioFQ/ME.ME.O/blob/main/ReadmeImages/PlazosDeEntrega.png)

## 2.3 Competidores
Los competidores de ME.ME.O serían aquellos juegos que guarden cierta similitud en cuanto a género con el famoso Fall Guys. Es decir, juegos que no tienen mecánicas muy complejas, que no necesitan gran compromiso por parte de los jugadores y que están compuestos de varios minijuegos por ejemplo el videojuego Pureya del desarrollador Majorariatto.


![](https://github.com/SergioFQ/ME.ME.O/blob/main/ReadmeImages/pureyaImagen.jpg)

Creemos que los puntos fuertes que tendrá ME.ME.O que lo puede diferenciar de la competencia serán que puede ofrecer diversión en sesiones cortas de juego y sus componentes de humor. Creemos que el humor funcionará en ME.ME.O porque el objetivo del juego  es que los jugadores pasen un buen rato y eso siempre se puede acentuar con humor, como han hecho juegos recientes como Fall Guys o Among Us que han tenido mucho éxito.
## 2.4 Plataforma
Siguiendo las indicaciones de los clientes ME.ME.O será publicado en WebGL para PC, no será un juego con gráficos muy potentes por lo que se podrá jugar en la mayoría de ordenadores.
# 3.Game Design
## 3.1 Características principales
ME.ME.O es un juego que busca entretener al jugador con partidas cortas e intensas. El juego consta de varias pruebas que se irán eligiendo de manera aleatoria a lo largo de la partida. Cada jugador elegirá un personaje y jugarán en pruebas 1vs1.

  + Planteamiento sencillo: juego fácil de entender basado en diferentes pruebas simples.
  + Partidas rápidas y divertidas, con poca duración pero muy entretenidas.
  + Variedad de pruebas y escenarios. 
  + Posibilidad de elegir entre diferentes personajes carismáticos.
  + Elementos humorísticos (los personajes, escenarios, nombres de las pruebas...)

## 3.2 HUD
Habrá algunos elementos que se mantengan constantes como un contador de tiempo en la parte superior central de la pantalla. 
Algunos niveles contarán con elementos específicos como por ejemplo barras de vida (THIS IS AMERICA), porcentajes (PICASSO), barra de progreso del nivel (HASTA ESPAÑA, SUPER EN CUARENTENA).

![](https://github.com/SergioFQ/ME.ME.O/blob/main/ReadmeImages/bocetos_hud.png)


## 3.3 Controles

![](https://github.com/SergioFQ/ME.ME.O/blob/main/ReadmeImages/TECLADO_Definitivo.jpg)

En caso de jugar en standalone los controles usados serán los mostrados en la imagen. En caso de estar jugando online los controles predeterminados serán los rojos.
## 3.4 Diseño de Niveles

Algunas de los diferentes minijuegos que tenemos pensado desarrollar son:

   + **PICASSO:** la prueba consistirá en una sala cerrada donde el suelo se iría pintando del color de cada jugador a medida que se mueven por los bloques, si el jugador rival pasa por un bloque de nuestro color lo pintará del suyo. A lo largo del nivel irán apareciendo botes de pintura, si un jugador pasa por encima de uno de estos pintará el área de bloques que tenga alrededor. 
El ganador será el que tenga más bloques de su color cuando acabe el tiempo.

   + **HASTA ESPAÑA:** los jugadores empezarán a nivel del suelo y deberán ir asciendo por las plataformas repartidas por todo el nivel. A lo largo del nivel habrá diferentes elementos como palancas que deberemos accionar para seguir escalando, plataformas que aparecen y desaparecen periódicamente o  plataformas que te hacen resbalar…
La cámara se irá moviendo de manera ascendente, los jugadores que se queden fuera del plano de la cámara morirán.
 
   + **SUPER EN CUARENTENA:** los jugadores empezarán el la misma posición y deberán atravesar todos los obstáculos y tratar de llegar a la meta, el ganador será el primero en llegar. Encontraremos obstáculos como paredes que nos podrán aplastar, precipicios donde nos podemos caer, proyectiles que pueden golpearnos… Al final del nivel estará la meta representada con un rollo de papel higiénico. La cámara se irá desplazando hacia la derecha y en la parte izquierda habrá una multitud persiguiendo a los personajes.

   + **THIS IS AMERICA:**  los dos jugadores se encontrarán en una sala cerrada, donde habrá diferentes armas. El primer jugador en matar al otro gana. Podremos encontrar armas como una pistola con un daño bajo y rango medio, escopetas de daño alto y rango corto u objetos especiales como granadas.
   
## 3.5 Flujo de Juego

Cuando el juego carga aparece el menú principal con una serie de opciones: Jugar, Ajustes, Salir. (En Ajustes el jugador podrá modificar los controles y el volumen del juego.) Al darle a Jugar el usuario seleccionará el modo que desee: Standalone u Online. 
En caso de seleccionar Standalone se nos llevará a la selección de personajes y una vez seleccionados se podrá empezar a jugar. Si se selecciona modo online se creará una sala con un código para unirse. Una vez los dos jugadores estén en la sala aparecerá la selección de personaje.
Al empezar la partida se nos mostrará un carrusel con las diferentes pruebas que pueden salir y saldrá una de manera aleatoria. 
Antes de empezar cada prueba aparecerá una imagen del nivel y una pequeña descripción con los detalles del mismo.
Tras seleccionar la prueba a jugar aparecerá una cuenta atrás que dará comienzo a la prueba.

![](https://github.com/SergioFQ/ME.ME.O/blob/main/ReadmeImages/flujo_de_juego.PNG)

## 3.6 Condiciones de Victoria

El ganador será el jugador que haya conseguido más puntos en las pruebas que dura una partida. Después de cada prueba se otorgarán puntos a ambos jugadores de la siguiente manera:  

+ **PICASSO:** Los puntos se otorgan en función de los cuadrados del color de cada jugador, representado por un porcentaje. (100% = 100 pts)
+ **HASTA ESPAÑA:** Ambos jugadores obtienen puntos en función de la altura a la que han llegado antes de morir. 
+ **THIS IS AMERICA:** En esta prueba solo obtiene puntos el ganador.
+ **SUPER EN CUARENTENA:** Ambos jugadores obtendrán puntos en función de la distancia recorrida. 

Las condiciones de victoria de cada prueba se mencionan en el Diseño de Niveles (3.4).

## 3.7 Número de Jugadores

Lo podrán jugar dos personas, tanto en Standalone como en online.

## 3.8 Personajes

Los personajes jugables serán:

+ **Vieja gloria:** inspirado en la clásica Troll Face, su nombre viene      de que antes era uno de los memes más conocido y a día de hoy nadie lo usa o recuerda.

![](https://github.com/SergioFQ/ME.ME.O/blob/main/ReadmeImages/trollFace.PNG)
+ **Pepega:** inspirado en la famosa rana

![](https://github.com/SergioFQ/ME.ME.O/blob/main/ReadmeImages/rana.PNG)
+ **Coffin Dancer:** inspirado en el meme del baile del ataúd.

![](https://github.com/SergioFQ/ME.ME.O/blob/main/ReadmeImages/ataud.PNG)
+ **Muerte prematura:** inspirado en un personaje del Fall Guys. Su viene debido a la gran popularidad que consiguió en su lanzamiento y cómo desapareció de golpe con la salida de Among us.

![](https://github.com/SergioFQ/ME.ME.O/blob/main/ReadmeImages/fallGuys.PNG)

# 4.Arte

El estilo de arte de arte del juego es cartoon, con estética similar a series como Rick y Morty o Hora de Aventuras. La idea es que sea un arte divertido y acompañe al “humor” general del juego.

![](https://github.com/SergioFQ/ME.ME.O/blob/main/ReadmeImages/bocetos_personajes.png)

# 5.Bibliografía

+ [Web de información acerca de las etiquetas PEGI](https://pegi.info/es/node/59) 
+ [Web oficial del videojuego *Fall Guys*](https://fallguys.com/)
+ [Web oficial del desarrollador Alva Majo](http://www.majorariatto.com/es)
+ [Web usada para crear línea de tiempo de los plazos de entrega](https://infograph.venngage.com/templates/recommended)
+ [Web utilizada para crear los diagramas del juego](https://app.creately.com/diagram/BsDGlEmqDeT/edit)
