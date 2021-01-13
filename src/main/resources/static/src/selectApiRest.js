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
        this.connectionLost = false;
        this.add.graphics({ x: 0, y: 0 }).fillStyle('0xFFFFFF', 1).fillRect(300, 115, 450, 115);
        this.sceneChanged = false;
        inputChat.style.display = 'block';
        this.enemigo = {
            nombre: null,
            sprite: -1
        }

        this.jugador = data.jugador;
        this.next = 0;
        this.pulsadoReady = false;
        this.buttonCreated = false;
        visibility = true;
        this.numberPlayer;
        this.numberEnemy;
        this.testeo= document.addEventListener('visibilitychange', () => {
            if (visibility) {
                if (document.visibilityState == 'visible') {
                    if(!(this.scene.isActive('SelectApiRest') || this.scene.isActive('GameSceneApi'))){
                        return;
                    }
                    if (timer != null) {
                        if (timer.paused == true) {    
                            if(this.connectionLost){
                                return;
                            }                        
                            $.ajax({
                                url: direccionWeb + 'chat/jugador/regreso/' + this.jugador.nombre
                            }, this).done(function (dat) {
                                if(!this.scene.isActive('SelectApiRest')){
                                    return;
                                }
                                if (!dat) {
                                    if(!this.sceneChanged){
                                    this.sceneChanged = true;
                                    this.selectAudio.stop();
                                    $('#input').val('');
                                    inputChat.style.display = 'none';
                                    this.scene.start('Notificaciones',{ valor: 0});
                                    }
                                } else {                                    
                                    timer.paused = false;
                                    this.timer2.paused = false;
                                    this.timer3.paused = false;
                                    this.metodoEstadoJug();
                                }
                            }.bind(this)).fail(function(){
                                this.connectionLost = true;
                                timer.paused = false;
                                this.timer2.paused = true;
                                this.timer3.paused = true;
                            }.bind(this))
                        }
                    }
                } else {
                    if (timer != null) {
                        timer.paused = true;
                        this.timer2.paused = true;
                        this.timer3.paused = true;
                    }
                }
            }

        }, this)
        
        this.selectAudio = this.sound.add('select', { loop: true });
        this.selectAudio.setVolume(0.05);
        this.updateAudio();

        this.exitButton = this.add.sprite(750, 50, 'smallButton01').setInteractive();
        this.backText = this.add.text(0, 0, 'X', { fontFamily: 'Berlin Sans FB, "Goudy Bookletter 1911", Times, serif', fontSize: '32px', fill: '#fff' });
        this.centerButtonText(this.backText, this.exitButton);

        this.exitButton.on('pointerdown', function (pointer) {
            if(!this.sceneChanged){
            this.sceneChanged = true;
            this.metodoDeleteJugador();
            //this.i.style.display = "none";
            inputChat.style.display = 'none';
            this.cameras.main.fadeOut(500);
            this.cameras.main.once('camerafadeoutcomplete', function (camera) {
                this.selectAudio.stop();
                $('#input').val('');
                inputChat.style.display = 'none';
                this.scene.start('Menu');
            }, this);
        }
        }.bind(this));

        this.exitButton.on('pointerover', () => this.exitButton.setTexture('smallButton02'));

        this.exitButton.on('pointerout', () => this.exitButton.setTexture('smallButton01'));

        this.text = this.add.text(400, 290, 'Press to select character', { fontFamily: 'Berlin Sans FB, "Goudy Bookletter 1911", Times, serif', fontSize: '42px', fill: '#fff' });
        this.text.setOrigin(0.5);
        this.text.setColor('#FFFFFF');
        this.chatText = this.add.text(480, 70, 'Chat', { fontFamily: 'Berlin Sans FB, "Goudy Bookletter 1911", Times, serif', fontSize: '38px', fill: '#fff' });
        this.playerNameText = this.add.text(55, 110, 'Name: '+this.jugador.nombre, { fontFamily: 'Berlin Sans FB, "Goudy Bookletter 1911", Times, serif', fontSize: '22px', fill: '#fff' });
        this.sendButton = this.add.sprite(150, 212, 'redButton01').setInteractive();
        this.sendButton.scaleY = 0.75;
        this.sendText = this.add.text(0, 0, 'SEND', { fontFamily: 'Berlin Sans FB, "Goudy Bookletter 1911", Times, serif', fontSize: '28px', fill: '#fff' });
        this.centerButtonText(this.sendText, this.sendButton);

        this.sendButton.on('pointerover', () => this.sendButton.setTexture('redButton02'));
        this.sendButton.on('pointerout', () => this.sendButton.setTexture('redButton01'));

        this.sendButton.on('pointerdown', function (pointer) {
            this.frase = $('#input').val();
            
                if(this.frase.trim()){ 
                this.fecha=new Date();
                new Date().getHours() 
                this.frasess = {
                    id: nom_jug,
                    frase: this.frase,
                    fecha: this.fecha.getHours()+':'+ this.fecha.getMinutes() 
                }                
                this.metodoPost(this.frasess);
            }
                $('#input').val('');
            /*if(!this.sceneChanged){
            this.sceneChanged = true;
            this.metodoDeleteJugador();
            //this.i.style.display = "none";
            inputChat.style.display = 'none';
            this.cameras.main.fadeOut(500);
            this.cameras.main.once('camerafadeoutcomplete', function (camera) {
                this.selectAudio.stop();
                $('#input').val('');
                inputChat.style.display = 'none';
                this.scene.start('Menu');
            }, this);
        }*/
        }.bind(this));

        this.p1 = this.add.image(200, 375, 'pepe').setInteractive()
            .on('pointerover', () => this.p1.setScale(1.5))
            .on('pointerout', () => this.p1.setScale(1));

        this.p2 = this.add.image(400, 375, 'trollface').setInteractive()
            .on('pointerover', () => this.p2.setScale(1.5))
            .on('pointerout', () => this.p2.setScale(1));

        this.p3 = this.add.image(600, 375, 'coffindancer').setInteractive()
            .on('pointerover', () => this.p3.setScale(1.5))
            .on('pointerout', () => this.p3.setScale(1));

        this.eleccion1;
        //this.eleccion2;

        this.p1.on('pointerdown', () => this.cambio(this.p1, this.p2, this.p3, 1));
        this.p2.on('pointerdown', () => this.cambio(this.p2, this.p1, this.p3, 2));
        this.p3.on('pointerdown', () => this.cambio(this.p3, this.p1, this.p2, 3));

        this.cameras.main.fadeIn(200);

        this.chat = this.add.text(300, 115, '', {
            lineSpacing: 5,
            backgroundColor: '#FFFFFF',
            color: '#000000',
            padding: 10,
            fontStyle: 'bold'
        });

        $("#input").on('keydown', function (ele) {
            if (ele.key == 'Enter') {
                this.frase = $('#input').val();
            
                if(this.frase.trim()){ 
                this.fecha=new Date();
                new Date().getHours() 
                this.frasess = {
                    id: nom_jug,
                    frase: this.frase,
                    fecha: this.fecha.getHours()+':'+ this.fecha.getMinutes() 
                }                
                this.metodoPost(this.frasess);
            }
                $('#input').val('');
            }
        }.bind(this))

        this.metodoGet();//Para que el chat aparezca
        timer = this.time.addEvent({ delay: 2500, callback: this.metodoGet, callbackScope: this, loop: true });//CONTADOR
        this.estadoServidor = this.add.text(250, 10, '');

        this.estadoJugadores = this.add.text(50, 10, '');
        this.estadoJugadores2 = this.add.text(500, 10, '');
        this.metodoGetJugadores();
        this.timer2=this.time.addEvent({ delay: 3000, callback: this.metodoGetJugadores, callbackScope: this, loop: true });//CONTADOR
        this.metodoEstadoJug();
        this.timer3=this.time.addEvent({ delay: 2000, callback: this.metodoEstadoJug, callbackScope: this, loop: true });//CONTADOR

    }

    metodoEstadoJug() {
        if(this.connectionLost){
            return;
        }
        $.ajax({
            method: 'POST',
            url: direccionWeb + 'chat/jugador/estado',
            data: JSON.stringify(this.jugador),
            processData: false,
            headers: {
                "Content-Type": "application/json"
            }
        }, this).done(function (dat) {
            if(!this.scene.isActive('SelectApiRest')){
                return;
            }
        }.bind(this)).fail(function(){
            this.connectionLost = true;
            this.timer3.paused=true;            
            this.timer2.paused = true;
        }.bind(this))
    }
    update() {
        if(this.connectionLost){
            if(!this.sceneChanged){
                this.sceneChanged = true;                
                timer.paused=true;
                this.selectAudio.stop();
                $('#input').val('');
                inputChat.style.display = 'none';
                this.scene.start('Notificaciones',{ valor: 1});
            }
        }
        if (this.next == 1 && !this.buttonCreated) {
            this.buttonCreated = true;
            this.createButton();
        }

       
    }
    metodoPost(frase) {
        
        $.ajax({
            method: 'POST',
            url: direccionWeb + '/chat',
            data: JSON.stringify(frase),
            processData: false,
            headers: {
                "Content-Type": "application/json"
            }
        })
    }

    metodoPostJugador(jugad) {
        
        $.ajax({
            method: 'POST',
            url: direccionWeb + 'chat/jugador',
            data: JSON.stringify(jugad),
            processData: false,
            headers: {
                "Content-Type": "application/json"
            }
        })
    }
    metodoGetJugadores() {
        if(this.connectionLost){
            return;
        }
        $.ajax({
            url: direccionWeb + 'chat/jugador'

        }).done(function (data) {
            this.badConect = true;
            if(!this.scene.isActive('SelectApiRest')){
                return;
            }
            if (data[0] == null) {
                this.estadoJugadores.setText('Player 1: Disconnected');
            }
            else {
                if(data[0].nombre == this.jugador.nombre){
                    this.badConect = false;
                }
                this.estadoJugadores.setText('[P1] '+data[0].nombre + ': Online');
            }
            if (data[1] == null) {
                this.estadoJugadores2.setText('Player 2: Disconnected');
            }
            else {
                if(data[1].nombre == this.jugador.nombre){
                    this.badConect = false;
                }
                this.estadoJugadores2.setText('[P2] '+data[1].nombre + ': Online');
            }

            if(this.badConect){
                if(this.connectionLost){
                    this.sceneChanged = true;
                    this.selectAudio.stop();
                    $('#input').val('');
                    inputChat.style.display = 'none';
                    this.scene.start('Notificaciones',{ valor: 1});
                }else if(!this.sceneChanged){
                    this.sceneChanged = true;
                    this.selectAudio.stop();
                    $('#input').val('');
                    inputChat.style.display = 'none';
                    this.scene.start('Notificaciones',{ valor: 3});
                }
            }
            
        }.bind(this)).fail(function(){
            this.connectionLost = true;
            this.timer2.paused = true;            
            this.timer3.paused = true;
        }.bind(this))
    }

    metodoDeleteJugador() {
        
        nom_jug = null;
        $.ajax({
            method: 'DELETE',
            url: direccionWeb + 'chat/jugador/' + this.jugador.nombre
        }, this).done(function (data) {
            if(!this.scene.isActive('SelectApiRest')){
                return;
            }
         }.bind(this))
    }
    metodoGet() {        
        $.ajax({
            url: direccionWeb + 'chat'
        }).done(function (data) {
            if(!this.scene.isActive('SelectApiRest')){
                return;
            }
            let textoAmeter = [];
            let guarro=[];
            let fechaColor;
            for (var iter = data.length - 1; iter >= 0; iter--) {
             //  fechaColor=this.add.text(0,0,data[iter].fecha,{ fontFamily: 'Arial', fontSize: 64, color: '#00ff00' }).setVisible(true);
            // fechaColor=this.add.text(0,0,data[iter].fecha).setColor('green');
                
                textoAmeter.push("["+data[iter].fecha+"]"+data[iter].id+ ':' + data[iter].frase);
                if (textoAmeter.length > 5) {
                    textoAmeter.shift();
                }
            }
            this.chat.setText(textoAmeter);
            //this.estadoServidor.setText('Servidor: Conectado')
        }.bind(this)).fail(function (data) {
            if(this.scene.isActive('SelectApiRest')){                
            //this.estadoServidor.setText('Servidor: No disponible');                
            }
            this.connectionLost = true;
            timer.paused=true;
            //this.selectAudio.stop();
            $('#input').val('');
            inputChat.style.display = 'none';
            /*if(!this.sceneChanged){
                this.sceneChanged = true;
                this.scene.start('Notificaciones',{ valor: 1});
            }*/

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
            this.jugador.sprite = num;
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
        this.nextButton = this.add.sprite(400, 300, 'redButton01').setInteractive()
        .on('pointerover', () => this.nextButton.setTexture('redButton02'))
        .on('pointerout', () => this.nextButton.setTexture('redButton01'));
        this.centerButton(this.nextButton, -2);

        this.nextText = this.add.text(0, 0, 'PLAY', { fontFamily: 'Berlin Sans FB, "Goudy Bookletter 1911", Times, serif', fontSize: '32px', fill: '#fff' });
        this.centerButtonText(this.nextText, this.nextButton);

        this.waitingPlayer = this.add.text(0, 0, 'Waiting for another player...', { fontFamily: 'Berlin Sans FB, "Goudy Bookletter 1911", Times, serif', fontSize: '32px', fill: '#fff' });
        this.centerButtonText(this.waitingPlayer, this.nextButton);
        this.waitingPlayer.setVisible(false);

        this.nextButton.on('pointerdown', function (pointer) {
            
            if (!this.pulsadoReady) {
                this.pulsadoReady = true;
                
                $.ajax({
                    method: 'POST',
                    url: direccionWeb + 'chat/jugador/ready',
                    data: JSON.stringify(this.jugador),
                    processData: false,
                    headers: {
                        "Content-Type": "application/json"
                    }
                }, this).done(function (data) {
                    if(!this.scene.isActive('SelectApiRest')){
                        return;
                    }
                    this.startGameTimer = this.time.addEvent({ delay: 1000, callback: this.getReady, callbackScope: this, loop: true });
                }.bind(this))
                this.nextButton.setVisible(false);
                this.nextText.setVisible(false);
                this.waitingPlayer.setVisible(true);
            }
        }.bind(this));
    }

    getReady() {        
        $.ajax({
            url: direccionWeb + 'chat/jugador/ready'
        }).done(function (data) {
            if(!this.scene.isActive('SelectApiRest')){
                return;
            }
            if (data) {
                this.startGameTimer.paused = true;

                $.ajax({
                    url: direccionWeb + 'chat/jugador/pos/' + this.jugador.nombre
                }).done(function (data) {
                    if(!this.scene.isActive('SelectApiRest')){
                        return;
                    }
                    this.numberPlayer = data;
                    if (this.numberPlayer == 0) {
                        this.numberEnemy = 1;
                    } else {
                        this.numberEnemy = 0;
                    }
                    $.ajax({
                        url: direccionWeb + 'chat/jugador'
                    }).done(function (data) {
                        if(!this.scene.isActive('SelectApiRest')){
                            return;
                        }
                        this.enemigo = data[this.numberEnemy];
                        this.cameras.main.fadeOut(500);
                        if(!this.sceneChanged){
                            this.sceneChanged = true;
                        this.cameras.main.once('camerafadeoutcomplete', function (camera) {
                            this.selectAudio.stop();
                            $('#input').val('');
                            inputChat.style.display = 'none';
                            this.scene.start('GameSceneApi', { jugador: this.jugador, enemigo: this.enemigo });
                        }, this);
                    }
                    }.bind(this))
                }.bind(this))
            }
        }.bind(this))
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

