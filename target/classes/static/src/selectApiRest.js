class SelectApiRest extends Phaser.Scene {
    constructor()//para poder llamar a la escena desde otras escenas
    {
        super({ key: 'SelectApiRest', active: false });
    }

    init() {

    }

    preload() {
     

    }

    create(data) {
        this.jugador=data.nombre;
        console.log(this.jugador);
        this.next = 0;

        this.selectAudio = this.sound.add('select', { loop: true });
        this.selectAudio.setVolume(0.05);
        this.updateAudio();

        this.exitButton = this.add.sprite(750, 50, 'smallButton01').setInteractive();
        this.backText = this.add.text(0, 0, 'X', { fontFamily: 'Berlin Sans FB, "Goudy Bookletter 1911", Times, serif', fontSize: '32px', fill: '#fff' });
        this.centerButtonText(this.backText, this.exitButton);

        this.exitButton.on('pointerdown', function (pointer) {
            this.metodoDeleteJugador();
            this.i.style.display = "none";
            this.cameras.main.fadeOut(500);
            this.cameras.main.once('camerafadeoutcomplete', function (camera) {
                this.selectAudio.stop();
                this.scene.start('Menu');
            }, this);
            
        }.bind(this));

        this.input.on('pointerover', () => this.exitButton.setTexture('smallButton02'));

        this.input.on('pointerout', () => this.exitButton.setTexture('smallButton01'));

        this.text = this.add.text(400, 100, 'Press to select character', { fontFamily: 'Berlin Sans FB, "Goudy Bookletter 1911", Times, serif', fontSize: '42px', fill: '#fff' });
        this.text.setOrigin(0.5);
        this.text.setColor('#FFFFFF');

        this.text = this.add.text(400, 175, 'Player 1', { fontFamily: 'Berlin Sans FB, "Goudy Bookletter 1911", Times, serif', fontSize: '32px', fill: '#fff' });
        this.text.setOrigin(0.5);
        this.text.setColor('#FFFFFF');

        this.text = this.add.text(400, 325, 'Player 2', { fontFamily: 'Berlin Sans FB, "Goudy Bookletter 1911", Times, serif', fontSize: '32px', fill: '#fff' });
        this.text.setOrigin(0.5);
        this.text.setColor('#FFFFFF');

        this.p1 = this.add.image(200, 250, 'pepe').setInteractive()
            .on('pointerover', () => this.p1.setScale(1.2))
            .on('pointerout', () => this.p1.setScale(1));

        this.p2 = this.add.image(400, 250, 'trollface').setInteractive()
            .on('pointerover', () => this.p2.setScale(1.2))
            .on('pointerout', () => this.p2.setScale(1));

        this.p3 = this.add.image(600, 250, 'coffindancer').setInteractive()
            .on('pointerover', () => this.p3.setScale(1.2))
            .on('pointerout', () => this.p3.setScale(1));

        this.p4 = this.add.image(200, 400, 'pepe').setInteractive()
            .on('pointerover', () => this.p4.setScale(1.2))
            .on('pointerout', () => this.p4.setScale(1));

        this.p5 = this.add.image(400, 400, 'trollface').setInteractive()
            .on('pointerover', () => this.p5.setScale(1.2))
            .on('pointerout', () => this.p5.setScale(1));

        this.p6 = this.add.image(600, 400, 'coffindancer').setInteractive()
            .on('pointerover', () => this.p6.setScale(1.2))
            .on('pointerout', () => this.p6.setScale(1));

        this.eleccion1;
        this.eleccion2;

        this.p1.on('pointerdown', () => this.cambio(this.p1, this.p2, this.p3, 1));
        this.p2.on('pointerdown', () => this.cambio(this.p2, this.p1, this.p3, 2));
        this.p3.on('pointerdown', () => this.cambio(this.p3, this.p1, this.p2, 3));

        this.p4.on('pointerdown', () => this.cambio(this.p4, this.p5, this.p6, 4));
        this.p5.on('pointerdown', () => this.cambio(this.p5, this.p4, this.p6, 5));
        this.p6.on('pointerdown', () => this.cambio(this.p6, this.p4, this.p5, 6));

        this.cameras.main.fadeIn(200);


        //PRUEBAS 
        this.boton = this.add.sprite(100, 300, 'redButton01').setInteractive();
        this.boton.on('pointerdown', function () {
            this.frases={
               id: 1,
               frase: "DE LOCOS"
            }
            this.metodoPost(this.frases);

        }.bind(this))

        this.i=document.getElementById("input");
        this.i.style.position="absolute";
        this.i.style.display="block";
        this.i.style.top="570px";

        this.chat=this.add.text(10,10,"",{
            lineSpacing: 5,
            backgroundColor:"#FFFFFF",
            color:"#000000",
            padding: 10,
            fontStyle:"bold"
        });

        $("#input").on('keydown',function(ele){
            if(ele.key=='Enter'){
                this.frase= $('#input').val();
                this.frasess={
                    id: 1,
                    frase: this.frase
                 }
                this.metodoPost(this.frasess);
                $('#input').val("");
                
           

            }
        }.bind(this))

        this.metodoGet();//Para que el chat aparezca
        this.time.addEvent({ delay: 2500, callback: this.metodoGet, callbackScope: this, loop: true });
        this.estadoServidor=this.add.text(300,10,"");
        
     /*   this.marcelo={
            nombre: 'marcelo'
         }
        this.metodoPostJugador(this.marcelo);//CUANDO ME UNO A LA SALA DE SELECCIONAR, LLAMO AL SERVER(CUANDO SE VUELVE A CONECTAR EL SERVER DEBERIA PONER ESTA LLAMADA TMB)
       */
        this.estadoJugadores=this.add.text(500,10,"");
        this.estadoJugadores2=this.add.text(500,30,"");
        this.metodoGetJugadores();
        this.time.addEvent({ delay: 3000, callback: this.metodoGetJugadores, callbackScope: this, loop: true });
        
        
    }

    update() {
        if (this.next == 2) {
            this.createButton();
        }

    }
    metodoPost(frase){
        $.ajax({
            method: "POST",
            url: direccionWeb+'/chat',
            data: JSON.stringify(frase),
            processData: false,
            headers: {
                "Content-Type": "application/json"
            }
        })
    }
    
    metodoPostJugador(jugad){
      
        $.ajax({
            method: "POST",
            url: direccionWeb+'chat/jugador',
            data: JSON.stringify(jugad),
            processData: false,
            headers: {
                "Content-Type": "application/json"
            }
        })
    }

   metodoGetJugadores(){

        $.ajax({
             url: direccionWeb+'chat/jugador'

        }).done(function(data){

            if(data[0]==null){
                this.estadoJugadores.setText("Jugador 1: Desconectado");
            }
            else{
                this.estadoJugadores.setText("Jugador 1: Conectado");
            }
            if(data[1]==null){
                this.estadoJugadores2.setText("Jugador 2: Desconectado");
            }
            else{
                this.estadoJugadores2.setText("Jugador 2:  Conectado");
                }
        }.bind(this))
    }



    metodoDeleteJugador(){
        console.log("Llamado borrar");
        $.ajax({
            method: "DELETE",
            url: direccionWeb+'chat/jugador/'+this.jugador
        },this).done(function(data){})
    }
    metodoGet(){
        $.ajax({
            url: direccionWeb+'chat'
        }).done(function (data) {
            let textoAmeter=[];
            for(var iter=data.length-1;iter>=0;iter--){
            console.log(data[iter].id+":"+data[iter].frase);
          textoAmeter.push(data[iter].id+":"+data[iter].frase);
            if(textoAmeter.length>5){
                textoAmeter.shift();
            }
            }
            this.chat.setText(textoAmeter);   
            this.estadoServidor.setText("Servidor: Conectado")
        }.bind(this)).fail(function(data){
            this.estadoServidor.setText("Servidor: No disponible");
        }.bind(this))

    }

    

    cambio(p1, p2, p3, num) {

        p1.alpha = 0.5;
        p1.removeInteractive();
        p2.removeInteractive();
        p3.removeInteractive();
        if (num > 3) {
            this.eleccion2 = num - 3
        }
        else {
            this.eleccion1 = num;
        }
        this.next++;
    }
    centerButtonText(gameText, gameButton) {
        Phaser.Display.Align.In.Center(
            gameText,
            gameButton
        );
    }

    centerButton(gameObject, offset = 0) {
        Phaser.Display.Align.In.Center(
            gameObject,
            this.add.zone(800 / 2, 600 / 2 - offset * 100, 800, 600)
        );
    }

    createButton() {
        this.nextButton = this.add.sprite(400, 300, 'redButton01').setInteractive();
        this.centerButton(this.nextButton, -2);

        this.backText = this.add.text(0, 0, 'PLAY', { fontFamily: 'Berlin Sans FB, "Goudy Bookletter 1911", Times, serif', fontSize: '32px', fill: '#fff' });
        this.centerButtonText(this.backText, this.nextButton);

        this.nextButton.on('pointerdown', function (pointer) {
            this.cameras.main.fadeOut(500);
            this.cameras.main.once('camerafadeoutcomplete', function (camera) {
                this.selectAudio.stop();
                this.scene.start('GameScene', { eleccion1: this.eleccion1, eleccion2: this.eleccion2 });
            }, this);
        }.bind(this));

        this.input.on('pointerover', () => this.nextButton.setTexture('redButton02'));

        this.input.on('pointerout', () => this.nextButton.setTexture('redButton01'));
    }

    updateAudio() {
        if (musicOn === false) {

            this.selectAudio.stop();

        }
        else {

            this.selectAudio.play();
        }
    }


}