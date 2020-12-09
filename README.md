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

# Cambios respecto a la fase anterior
Respecto a la fase 1 del desarrollo del juego, este ha sufrido ciertos cambios. El cambio más importante ha sido en el contenido de juego ya que, en la fase anterior queríamos realizar hasta tres minijuegos diferentes pero al final nos decantamos por desarrollar únicamente uno.

# High Concept
ME.ME.O es un juego 2D competitivo de estilo cartoon donde los jugadores buscan ganar a su rival en una carrera de escalada.

# Marketing
## Público objetivo
ME.ME.O buscará la atención de jugadores de 16 - 25 años que juegan a títulos casual/plataformas y que principalmente les guste jugar con amigos.

ME.ME.O tendrá una clasificación, según el estándar europeo, de PEGI 12, ME.ME.O no mostrará sangre de manera explícita, puede contener un lenguaje soez leve.

## Plazos de entrega
+ Fase 1: Desarrollo del GDD
  + Fecha: 22/10/2020
+ Fase 2: Desarrollo del juego en standalone
  + Fecha: 10/12/2020
+ Fase 3: Extensión del juego incluyendo un back-end que utilice tecnología REST
  + Fecha: 14/01/2021
+ Fase 4: Extensión del juego utilizando REST y WebSockets
  + Fecha: 02/02/2021
+ Fase 5: Mejoras finales y publicación del juego
  + Fecha: 02/02/2021

## Competidores
Los competidores de ME.ME.O serían aquellos juegos que guarden cierta similitud en cuanto a género con el famoso Doodle Jump. Este título consiste en un personaje que tendrá que trepar constantemente para obtener una puntuación.


![](https://github.com/SergioFQ/ME.ME.O/blob/main/ReadmeImages/Doodle%20Jump.PNG)

Creemos que los puntos fuertes que tendrá ME.ME.O que lo puede diferenciar de la competencia serán que puede ofrecer diversión en sesiones cortas de juego y sus componentes de humor. Creemos que el humor funcionará en ME.ME.O porque el objetivo del juego  es que los jugadores pasen un buen rato y eso siempre se puede acentuar con humor absurdo proporcionado por la inclusión de memes.

## Plataforma
Siguiendo las indicaciones de los clientes ME.ME.O será publicado en WebGL para PC, no será un juego con gráficos muy potentes por lo que se podrá jugar en la mayoría de ordenadores.

# Game Design
## Características principales
ME.ME.O es un juego que busca entretener al jugador con partidas cortas e intensas. El juego consta de un nivel en el cual los jugadores se enfrentarán a una carrera por llegar a la cima antes que su rival. Vencerá el primero que gane o el que sobreviva a su rival.

  + Planteamiento sencillo: juego fácil de entender.
  + Partidas rápidas y divertidas, con poca duración pero muy entretenidas. 
  + Posibilidad de elegir entre diferentes personajes carismáticos.
  + Elementos humorísticos (los personajes, sistema taunt...)

## HUD
El HUD del juego es un HUD bastante sencillo donde son visibles 3 elementos. Por un lado, tenemos un botón que nos llevará al menú principal, si así lo desean los jugadores. Este botón se encuentra en la esquina inferior izquierda de la pantalla. Por otro lado nos encontramos con las vidas de los jugadores, estando las del jugador 1 en la esquina superior izquierda y las del jugador 2 en la esquina superior derecha.

![](https://github.com/SergioFQ/ME.ME.O/blob/main/ReadmeImages/explicacion_ui.png)


## Controles
Los controles de ambos jugadores son los que se muestran en la foto a continuación.

![](https://github.com/SergioFQ/ME.ME.O/blob/main/ReadmeImages/controles_solo.png)

## Diseño del Nivel
Los jugadores empezarán a nivel del suelo y deberán ir asciendo por las plataformas repartidas por todo el nivel. A lo largo del nivel habrá diferentes tipos de plataformas como plataformas estáticas, plataformas movibles y plataformas que caen al pisarse. Saltando en estas, los jugadores podrán ir ascendiendo poco a poco por el nivel. Para impedir que que consigan su objetivo, se disponen de varias zonas en las que son disparadas balas las cuales, al impactar en el jugador, le empujarán.

La cámara se irá moviendo de manera ascendente, los jugadores que se queden fuera del plano de la cámara morirán y perderán una vida (disponen de 3 en total). Cada vez que un jugador pierda una de sus vidas, aparecerá en la parte superior de la cámara sin gravedad para darle facilidades a la hora de recolocarse y no caer nada mas reaparecer. Para hacer notar al jugador que su personaje no se encuentra en un estado "normal", este aparecerá semitransparente hasta pasado un cierto tiempo que aparcerá opaco de nuevo y con su gravedad normal.
   
## Flujo de Juego
Como vemos podemos navegar desde el menú principal hasta la pestaña de controles, creditos, opciones y selección de personaje (botón PLAY) (y volver desde estas al menú principal, tal como indicia el sentido de las flechas). Desde la selección de personajes pasaríamos a empezar la partida, desde aquí también podemos volver al menú del juego desde una opción de salir de la partida. En caso de terminar la partida pasaremos a la pantalla de victoria y desde aquí volveremos al menú principal. A continuación se muestra una imagen con el flujo de juego e imágenes de las respectivas escenas con una breve descripción.

![](https://github.com/SergioFQ/ME.ME.O/blob/main/ReadmeImages/diagrama.png)

+ **Escena de carga**: En esta escena podremos ver el logo del estudio y una barra de carga. Una vez haya cargado todo el juego, aparecerá un botón con el que iremos al menú principal del juego.

![](https://github.com/SergioFQ/ME.ME.O/blob/main/ReadmeImages/loading_escena.png)

+ **Escena de menú principal**: Esta escena nos ofrecerá la posibilidad de ir a diversas escenas mediante botones. Las escenas a las que podemos acceder son: **Selección de personajes**(botón play), **Opciones**(botón options), **Controles**(botón controls) y **Créditos**(botón credits)

![](https://github.com/SergioFQ/ME.ME.O/blob/main/ReadmeImages/menu_principal.png)

+ **Escena de créditos**: En esta escena los jugadores podrán ver a los distintos desarrolladores del juego. Desde esta escena se podrá ir hasta la escena de menú principal mediante el botón con una "X" o esperando a que se vea la escena entera.

![](https://github.com/SergioFQ/ME.ME.O/blob/main/ReadmeImages/creditos.png)

+ **Escena de controles**: Esta escena ayuda a los jugadores a conocer los diferentes controles que deben usar en la partida y el objetivo de la misma. Desde esta escena se podrá ir hasta la escena de menú principal mediante el botón "MENU".

![](https://github.com/SergioFQ/ME.ME.O/blob/main/ReadmeImages/controles.png)

+ **Escena de opciones**: Esta escena da a los jugadores la opción de desactvar la música si así lo desean. Desde esta escena se podrá ir hasta la escena de menú principal mediante el botón "MENU".

![](https://github.com/SergioFQ/ME.ME.O/blob/main/ReadmeImages/opciones.png)

+ **Escena de selección de personajes**: En esta escena los jugadores elegirán los personajes que desean utilizar en la partida. Se dispone de 3 posibles personajes para cada uno. Una vez hayan elegido personajes, aparecerá el botón "PLAY" mediante el que irán a la escena de juego. Además, en la esquina superior derecha aparece un botón "X" mediante el cual se puede volver al menú principal.

![](https://github.com/SergioFQ/ME.ME.O/blob/main/ReadmeImages/seleccion_personaje.png)

+ **Escena de partida**: Escena principal del juego. Esta será la escena de partida de juego. En ella los jugadores correrán por llegar a la meta. En esta escena veremos las vidas de los personajes, las plataformas, balas los personajes, la meta (a una altura determinada) y un botón "MENU" en la esquina inferior izquierda. Mediante este botón se podrá ir de nuevo a la escena del menú principal. Si uno de los jugadores sale victorios se irá directamente a la escena de victoria.

![](https://github.com/SergioFQ/ME.ME.O/blob/main/ReadmeImages/escena_partida.png)

+ **Escena de victoria**: Escena final del juego. En esta escena podemos ver el nombre del vencedor (Player 1 o Player 2) y un efecto cómico hecho con la cabeza del vencedor. Desde esta escena se puede ir a la escena del menú principal mediante el botón "MENU"

![](https://github.com/SergioFQ/ME.ME.O/blob/main/ReadmeImages/escena_victoria.png)

## Condiciones de Victoria
El vencedor será aquel jugador que escale hasta la meta del juego o sea quien sobreviva al rival. En caso de que el rival pierda sus tres vidas por caída, ganará el jugador que aún conserva sus vidas.

## Número de Jugadores
Lo podrán jugar dos personas, tanto en Standalone como en online.

## Personajes
Los personajes jugables serán:

+ **Vieja gloria:** inspirado en la clásica Troll Face, su nombre viene de que antes era uno de los memes más conocido y a día de hoy nadie lo usa o recuerda.

![](https://github.com/SergioFQ/ME.ME.O/blob/main/ReadmeImages/trollFace.PNG)

![](https://github.com/SergioFQ/ME.ME.O/blob/main/resources/img/SpriteSheets/TrollFace%20SpriteSheet.png)
+ **Pepe the frog:** inspirado en la famosa rana

![](https://github.com/SergioFQ/ME.ME.O/blob/main/ReadmeImages/rana.PNG)

![](https://github.com/SergioFQ/ME.ME.O/blob/main/resources/img/SpriteSheets/Pepe%20the%20Frog%20SpriteSheet.png)
+ **Coffin Dancer:** inspirado en el meme del baile del ataúd.

![](https://github.com/SergioFQ/ME.ME.O/blob/main/ReadmeImages/ataud.PNG)

![](https://github.com/SergioFQ/ME.ME.O/blob/main/resources/img/SpriteSheets/Coffin%20Dancer%20SpriteSheet.png)

# Arte
El estilo de arte de arte del juego es cartoon, con estética similar a series como Rick y Morty o Hora de Aventuras. La idea es que sea un arte divertido y acompañe al “humor” general del juego.

![](https://github.com/SergioFQ/ME.ME.O/blob/main/ReadmeImages/bocetos_personajes.png)


# Música
Puesto que el estilo del juego es cómico centrado en memes famosos, la música también estará centrada en música usadas en memes. Toda la música utilizada en el juego ha sido descargada de la página [Myinstants](https://www.myinstants.com/index/es/). Las diferentes canciones usadas son:
+ [Canción del menú principal](https://www.myinstants.com/instant/lalalalala/)
+ [Canción menú de controles](https://www.myinstants.com/instant/deja-vuuuuu-40052/)
+ [Canción menú de opciones](https://www.myinstants.com/instant/running-in-the-90s/)
+ [Canción escena de créditos](https://www.myinstants.com/instant/oh-yeah/)
+ [Canción selección de personaje](https://www.myinstants.com/instant/sexy-sax/)
+ [Canción de partida 1](https://www.myinstants.com/instant/trololo/)
+ [Canción de partida 2](https://www.myinstants.com/instant/african-death-dance-85336/)
+ [Canción de victoria](https://www.myinstants.com/instant/final-fantasy-victory-fanfare/)

# Bibliografía
+ [Web de información acerca de las etiquetas PEGI](https://pegi.info/es/node/59) 
+ [Web utilizada para crear los diagramas del juego](https://app.creately.com/diagram/BsDGlEmqDeT/edit)
+ [Web de Myinstants](https://www.myinstants.com/index/es/)
+ [Tutorial utilizado para la creación de menús](https://gamedevacademy.org/creating-a-phaser-3-template-part-1/)
+ [Tutorial utilizado para la pantalla de carga](https://www.youtube.com/watch?v=PPT-pvrWzp0)
+ [Código utilizado para el efecto de cabezas de la pantalla de victoria](https://github.com/ansimuz/getting-started-with-phaser/blob/master/Part%203%20-%20Images%20Crazy%20Example/Scene2.js)
