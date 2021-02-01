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

# Vídeo explicativo
[![Alt text](https://img.youtube.com/vi/VhZ10VmOlA0/0.jpg)](https://www.youtube.com/watch?v=VhZ10VmOlA0&feature=youtu.be)

# Cambios respecto a la fase anterior
Respecto a la fase 3 del desarrollo del juego, hemos implementado Websockets para así poder tener el juego online completamente funcional. Esta implementación servirá que los clientes entren a la partida a la vez.

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

Creemos que los puntos fuertes que tendrá ME.ME.O y que lo diferenciarán de la competencia, son que puede ofrecer diversión en sesiones cortas de juego y sus componentes de humor. Creemos que el humor funcionará en ME.ME.O porque el objetivo del juego  es que los jugadores pasen un buen rato y eso siempre se puede acentuar con humor absurdo proporcionado por la inclusión de memes.

## Plataforma
Siguiendo las indicaciones de los clientes ME.ME.O será publicado en WebGL para PC, no será un juego con gráficos muy potentes por lo que se podrá jugar en la mayoría de ordenadores.

# Game Design
## Características principales
ME.ME.O es un juego que busca entretener al jugador con partidas cortas e intensas. El juego consta de un nivel en el cual los jugadores se enfrentarán en una carrera por llegar a la cima antes que su rival. Vencerá el primero que llegue o el que sobreviva a su rival.

  + Planteamiento sencillo: juego fácil de entender.
  + Partidas rápidas y divertidas, con poca duración pero muy entretenidas. 
  + Posibilidad de elegir entre diferentes personajes carismáticos.
  + Elementos humorísticos (los personajes, sistema taunt...)

## HUD
El HUD del juego es un HUD bastante sencillo donde son visibles 3 elementos. Por un lado, tenemos un botón que nos llevará al menú principal, si así lo desean los jugadores. Este botón se encuentra en la esquina inferior izquierda de la pantalla. Por otro lado nos encontramos con las vidas de los jugadores. Las del jugador 1 en la esquina superior izquierda y las del jugador 2 en la esquina superior derecha.

![](https://github.com/SergioFQ/ME.ME.O/blob/main/ReadmeImages/explicacion_ui.png)


## Controles
Los controles de ambos jugadores son los que se muestran en la foto a continuación.

![](https://github.com/SergioFQ/ME.ME.O/blob/main/ReadmeImages/controles_solo.png)

## Diseño del Nivel
Los jugadores empezarán a nivel del suelo y deberán ir ascendiendo por las plataformas repartidas por todo el nivel. A lo largo del mismo habrá diferentes tipos de plataformas: estáticas, movibles y plataformas que caen al pisarse. Saltando en ellas, los jugadores podrán ir ascendiendo poco a poco por el nivel. Para impedir que los jugadores consigan su objetivo, hay zonas en las que se disparan balas y al impactar en el jugador, le empujarán.

La cámara se irá moviendo de manera ascendente, los jugadores que se queden fuera del plano de la cámara morirán y perderán una vida (disponen de 3 en total). Cada vez que un jugador pierda una de sus vidas, aparecerá en la parte superior de la cámara sin gravedad para darle facilidades a la hora de recolocarse y no caer nada más reaparecer. Para que el jugador sepa que su personaje no se encuentra en un estado "normal", éste aparecerá semitransparente durante un tiempo, después volvera a su color y gravedad normal.
   
## Flujo de Juego
Como vemos, podemos navegar desde el menú principal hasta la pestaña de controles, créditos, opciones, selección de personaje local(botón LOCAL) y selección de nombre (botón ONLINE). Desde todas estas escenas se podrá volver al menú principal mediante un botón (tal como indica el sentido de las flechas). Desde la selección de personajes empezaríamos la partida en standalone, desde aquí se podrá volver al menú del juego con una opción de salir de la partida. En caso de terminar la partida pasaremos a la pantalla de victoria y desde aquí volveremos al menú principal. En caso de querer jugar online, seleccionaríamos el botón de ONLINE y llegaríamos a la escena de seleccionar nombre. Una vez hayamos seleccionado un nombre adecuado (se explicará posteriormente), pasaremos a una escena de selección de personaje donde podremos escribirnos con nuestro rival en un chat. Una vez ambos jugadores hayan elegido personajes se pasará a la esecena de juego online donde podrán competir por intentar llegar a la meta o aguantar más tiempo vivo. Finalmente cuando uno de los jugadores gana, ambos irán a la escena de victory donde se indicará quien es el vencedor. A continuación se muestra una imagen con el flujo de juego e imágenes de las respectivas escenas con una breve descripción.

![](https://github.com/SergioFQ/ME.ME.O/blob/main/ReadmeImages/Diagrama_de_flujo.png)

+ **Escena de carga**: En esta escena podremos ver el logo del estudio y una barra de carga. Una vez haya cargado todo el juego, aparecerá un botón con el que iremos al menú principal del juego.

![](https://github.com/SergioFQ/ME.ME.O/blob/main/ReadmeImages/loading_escena.png)

+ **Escena de menú principal**: nos ofrecerá la posibilidad de ir a diversas escenas mediante botones. Las escenas a las que podemos acceder son: **Selección de personajes**(botón local), **Selección de nombre**(botón online) **Opciones**(botón options), **Controles**(botón controls) y **Créditos**(botón credits)

![](https://github.com/SergioFQ/ME.ME.O/blob/main/ReadmeImages/mainMenu_nuevo.PNG)

+ **Escena de créditos**:  los jugadores podrán ver a los distintos desarrolladores del juego. Desde esta escena se podrá ir hasta la escena de menú principal mediante el botón con una "X" o esperando a que se vea la escena entera.

![](https://github.com/SergioFQ/ME.ME.O/blob/main/ReadmeImages/creditos.png)

+ **Escena de controles**: Esta escena ayuda a los jugadores a conocer los diferentes controles que deben usar en la partida y el objetivo de la misma. Desde esta escena se podrá ir hasta el menú principal mediante el botón "MENU".

![](https://github.com/SergioFQ/ME.ME.O/blob/main/ReadmeImages/controles.png)

+ **Escena de opciones**: Esta escena da a los jugadores la opción de desactvar la música si así lo desean. Se podrá ir hasta el menú principal mediante el botón "MENU".

![](https://github.com/SergioFQ/ME.ME.O/blob/main/ReadmeImages/opciones.png)

+ **Escena de selección de personajes**: los jugadores elegirán los personajes que desean utilizar en la partida. Se dispone de 3 posibles personajes para cada uno. Una vez hayan elegido, aparecerá el botón "PLAY" que les llevará a la escena de juego. Además, en la esquina superior derecha aparece un botón "X" mediante el cual se puede volver al menú principal.

![](https://github.com/SergioFQ/ME.ME.O/blob/main/ReadmeImages/seleccion_personaje.png)

+ **Escena de partida**: Escena principal del juego. Esta será la escena de partida de juego. En ella los jugadores correrán por llegar a la meta. Aquí veremos las vidas de los personajes, las plataformas, balas, personajes, la meta (a una altura determinada) y un botón "MENU" en la esquina inferior izquierda. Mediante este botón se podrá ir de nuevo a la escena del menú principal. Si uno de los jugadores sale victorioso se irá directamente a la escena de victoria.

![](https://github.com/SergioFQ/ME.ME.O/blob/main/ReadmeImages/escena_partida.png)

+ **Escena de victoria**: Escena final del juego. En ella podemos ver el nombre del vencedor (Player 1 o Player 2) y un efecto cómico hecho con la cabeza del vencedor. Desde aquí se puede ir al menú principal mediante el botón "MENU". A continuación se muestra una imagen de victoria en partida local donde el nombre de los jugadores es predeterminado y no puede elegirse otro y, seguidamente, una imagen de victoria en partida online donde el nombre si es elegido por los jugadores

![](https://github.com/SergioFQ/ME.ME.O/blob/main/ReadmeImages/escena_victoria.png)
![](https://github.com/SergioFQ/ME.ME.O/blob/main/ReadmeImages/victoryOnline.PNG)

+ **Selección de nombre**: En esta escena los jugadores encontrarán un texto en la parte superior indicando el estado del servidor (conectado o no conectado), un cuadro de texto donde indicarán su nombre y un botón de enviar (además con este botón, podrán enviar su nombre con la tecla 'enter'). Además de estos elementos, los usuarios encontrarán un botón con una X en la parte superior derecha de la pantalla con el que volver al menú principal. Aparecerán también algunos textos para informar al usuario sobre el estado del servidor o sobre su nombre cuando éste intente mandar su nombre elegido. Los mensajes que pueden aparecer son: 'Name selected by another player'(mensaje que aparece al elegir el mismo nombre que otro jugador en el servidor), 'Out of space - Server full of players' (mensaje indicando que el servidor está lleno, es decir, hay 2 jugadores ya dentro), 'Empty name is not allowed' (avisa al jugador de que no puede tener un nombre vacío) y 'Server is closed' (al igual que el texto en la parte superior de la pantalla, indicará que el servidor no se encuentra disponible en ese momento). A continuación se muestra una imagen de la escena normal y una imagen de la escena con uno de los avisos indicados anteriormente.

![](https://github.com/SergioFQ/ME.ME.O/blob/main/ReadmeImages/seleccionarNombre.PNG)

![](https://github.com/SergioFQ/ME.ME.O/blob/main/ReadmeImages/emptyNameSeleccionarNombre.PNG)

+ **Selección de personajes Online**: En esta escena los usuarios se encontrarán ya conectados al servidor que tendrá capacidad para máximo 2 jugadores. Aquí se encontrarán con un chat para hablar con su rival (podrán mandar el mensaje con la tecla 'enter' y con el botón 'Send'), textos en la parte superior indicando el nombre de los jugadores y su estado (conectado o no conectado) y los personajes disponibles para jugar. Una vez que el jugador haya elegido su personaje, tendrán que esperar a que su rival elija al suyo y puedan entrar a la escena de partida. Desde esta escena se puede llegar también a la escena de notificaciones cuando suceda alguna exepción como cuando el servidor se desconecta.

![](https://github.com/SergioFQ/ME.ME.O/blob/main/ReadmeImages/selectPlayerOnline.PNG)

- **Escena partida Online**: los jugadores se encontrarán con la escena de juego teniendo ya funcionalidad a diferencia de la fase anterior. Se verán los personajes seleccionados, los emojis puestos por cada jugador, el estado de ellos y las vidas de cada uno en la parte superior de la pantalla. Además, podrán ver el nombre elegido por el rival. En caso de que los jugadores lo deseen, podrán volver al menú principal haciendo click en el botón de Menu en la esquina inferior izquierda. Asimismo, se podrá ir a la escena notificaciones cuando el servidor se cierre, el rival se vaya (debido a la naturaleza del juego, no tendría sentido quedarse solo uno en partida), cuando estuviese AFK el jugador o cuando el ping fuese demasiado alto. En esta escena es donde se encuentran la mayoria de los mensajes Websocket, estos se utilizan para que el servidor les mande el mensaje de iniciar la escena al mismo tiempo, para saber si ambos han entrado y cargar el scroll vertical y el escenario que deben cargar, el movimiento de los personajes, la generación de balas, el sistema de emojis y toda la lógica relacionada con las caídas de los personajes y sus victorias.

![](https://github.com/SergioFQ/ME.ME.O/blob/main/ReadmeImages/inGameOnline.png)

- **Escena notificaciones**: los jugadores llegarán a ella desde la escena de selección de personajes Online o desde la escena de partida Online. A esta escena se llega cuando se cumpla alguna de las siguientes condiciones: Desconexión del servidor, Desconexión del rival (sólo en la escena de juego online), detección de inactividad del servidor (cuando el jugador está en otra aplicación o ventana del navegador durante un cierto tiempo) y cuando el ping del jugador es demasiado grande. Una vez que el jugador se encuentre en esta escena podrán volver al menú principal desde el botón situado en mitad de la pantalla. A continuación se muestran algunas de las posbiles excepciones que pueden aparecer en esta escena.

![](https://github.com/SergioFQ/ME.ME.O/blob/main/ReadmeImages/notificaciones.PNG)

![](https://github.com/SergioFQ/ME.ME.O/blob/main/ReadmeImages/notificaciones2.PNG)

## Implementación con Websockets
Para el desarrollo de esta fase, fue necesaria la implementación de Websockets para poder tener el juego online completamente operativo, ya que en la fase anterior teníamos la escena de partida sin ninguna funcionalidad. Para este desarrollo, hemos llevado a cabo un diseño de Websocket donde los clientes al mandar mensajes al servidor, siempre mandan un mensaje con un atributo común a modo de identificador mediante el que el servidor comprueba de que tipo es el mensaje y, en función de ello, realizará una u otra acción. Los tipos de mensaje son **UPDATE MOVEMENT** (para mandar la posición de los clientes al rival), **VICTORY** (para indicar que un jugador ha llegado a la meta o que el otro se ha perdido sus vidas), **EMOJI** (para decirle al rival que emoji está utilizando el otro cliente), **RREADY** (enviado desde la escena de selección de personajes para que el servidor sea consciente de que  clientes están listos), **CAIDA** (para indicar que un jugador se ha caido y así dar a conocer al otro cliente que el rival ha perdido una vida), **REAPARICIÓN** (esté mensaje va de la mano con el anterior, este se manda una vez el jugador haya reaparecido en la partida) y **LOADED** (para indicar que los jugadores han cargado la escena y empiece así el scroll vertical y la generación del mapa elegido por el servidor). Aparte de estos mensajes que envían los clientes, el servidor responde a la mayoría de estos en cuanto los recibe eviando la información a ambos clientes (como en el caso de la victoria) o solo al otro cliente (como en el caso de la actualización de movimiento). Sin embargo, otros mensajes no los envía el servidor en cuanto recibe uno de los clientes, en el caso del mensaje de tipo READY, el servidor no realizará acción hasta que sepa que los dos han enviado ese mensaje. Los mismo sucedería con el mensaje de tipo LOADED. Además de estos, el servidor cuenta con un temporizador mediante el que manda mensajes a ambos clientes para crear los diferentes proyectiles de la partida.

## Condiciones de Victoria
El vencedor será aquel jugador que escale hasta la meta del juego o sobreviva al rival. En caso de que el rival pierda sus tres vidas por caída, ganará el jugador que aún conserva sus vidas.

## Diagrama de clases
En cuanto al siguiente diagrama de clases encontramos la clase Application, donde se encontraría el main. Respecto al ChatControlador implementa varias funcionalidades como leer y escribir en los ficheros txt, y gestión del chat, además usa la clase frase que nos permite almacenar las frases del chat (id del jugador, frase y hora del mensaje). JugadorController se encarga de añadir jugadores al servidor o eliminarlos, usa la clase Jugador que nos permite guardar el personaje seleccionado y su nombre. La clase Web se encarga de toda la lógica de los Websoscket. Aquí el servidor recibe mensajes, comprueba de que tipo es el mensaje y, en función de ello, mandará mensajes a los clientes.

![](https://github.com/SergioFQ/ME.ME.O/blob/main/ReadmeImages/Patron.png)

## Instrucciones de ejecución
Será necesario descargar el release de la fase 4. Una vez tengamos este zip descargado lo descomprimimos. Posteriormente abriremos la carpeta del proyecto, seleccionamos el archivo **Memeo-0.0.1-SNAPSHOT.jar** y lo abrimos (será necesario tener Java 8 o superior). Para saber que este archivo se ha abierto, es necesario abrir el administrador de tareas y ver que ha aparecido un nuevo proceso de Java (a la hora de querer cerrar el servidor será necesario parar ese proceso). Una vez este proceso haya aparecido, sólo será necesario abrir el navegador (preferiblemente Firefox) y escribir en la URL **localhost:8080**. Tras escribir esta URL aparecerá el juego y podrá jugarse. Para jugar de forma completamente online será necesario que el otro jugador (sin necesidad de descargar nada) acceda al puerto 8080 del jugador que tenga el servidor, para ello puede hacerse port forwarding con la ip pública o usando programas como Ngrok o Portmap para agilizar el proceso. Además sería necesario cambiar la dirección URL del Websocket en el frontend.

## Chat
Todo lo escrito por los jugadores en el chat del juego quedará guardado en un .txt llamado "chat.txt" en la carpeta principal del proyecto junto con el archivo .jar. Si el usuario quiere, podrá abrir el archivo del chat para ver todo lo que se ha escrito. Sin embargo, este chat sólo guardará como máximo 100 mensajes. A pesar de poder abrir este archivo y ver su contenido, es recomendable no modificarlo directamente pues podría hacer que el juego tuviese problemas al no poder leer correctamente los mensajes (si varía el formato en el que están escritos los mensajes guardados).

## Diferencias entre navegadores
Este proyecto ha sido creado y probado en su mayoría en el navegador Firefox, es por ello que, aunque se hayan tenido en cuenta ciertas características de Google Chrome, el juego puede tener algunos elementos diferentes al cambiar de navegador. Debido a como tramitan estos navegadores sus elementos, algunos elementos de la interfaz de las escenas pueden estar algo movidos. También hay que destacar que en caso de abrir la consola del navegador en Chrome, si el servidor se cierra o se cae aparecerán ciertos "errores" que son de Chrome cuando no consigue comunicarse con el servidor. Estos errores están comprobados y tramitados, sin embargo en Chrome seguirán apareciendo aunque no entorpecen el funcionamiento del juego. Además, se han tramitado mejor estas excepciones para conseguir que salgan el menor número de estos "errores" cuando aparecen. En Firefox estos fallos no aparecen ya que, como se ha dicho ya, no son como tal fallos del programa.

Es necesario destacar también que como este proyecto ha sido probado en Firefox mayormente, es posible que ciertas excepciones se hayan tenido en cuenta dadas las peculiaridades de este navegador sin fijarse tanto en las del resto (también se ha usado Chrome en menor medida). Debido a esto, es necesario comentar que en Firefox, al cambiar de pestaña, algunos de los procesos del juego dejarán de llevarse a cabo, por ello, y para evitar problemas con el juego, se ha decidido que si el jugador pasa un tiempo en otra pantalla (aproximadamente 3-4 segundos) será expulsado del servidor y aparecerá en la escena de notificaciones con el mensaje "Kicked out for inactivity". Una vez en esa escena, el jugador podrá volver al menú principal y, si el servidor sigue teniendo hueco, podrá volver a entrar.

## Número de Jugadores
Lo podrán jugar dos personas, tanto en Standalone como en Online.

## Personajes
Los personajes jugables serán:

+ **Vieja gloria:** inspirado en la clásica Troll Face, su nombre viene de que antes era uno de los memes más conocidos y a día de hoy nadie lo usa o recuerda.

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
