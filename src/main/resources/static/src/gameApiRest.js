class GameSceneApi extends Phaser.Scene {
    constructor()//para poder llamar a la escena desde otras escenas
    {
        super({ key: 'GameSceneApi', active: false });
    }

    init(data) {
        this.jugador = data.jugador;
        this.jugadorEnemigo = data.enemigo;
        //console.log(this.jugadorEnemigo.sprite);
        //this.eleccionJ2 = data.eleccion2;

        this.spriteP1;
        this.spriteP2;
        this.keyP1;
        this.keyP2;
        this.keyVidaP1;
        this.keyVidaP2;
        this.keyGifP1;
        this.keyGifP2;
        switch (this.jugador.sprite) {
            case 1:
                this.spriteP1 = 'pepeS';
                this.keyP1 = 'pepeSK';
                this.keyVidaP1 = 'pepe';
                this.keyGifP1 = 'pepe';
                break;
            case 2:
                this.spriteP1 = 'trollfaceS';
                this.keyP1 = 'trollfaceSK';
                this.keyVidaP1 = 'trollface';
                this.keyGifP1 = 'troll';
                break;
            case 3:
                this.spriteP1 = 'coffindancerS';
                this.keyP1 = 'coffindancerSK';
                this.keyVidaP1 = 'coffindancer';
                this.keyGifP1 = 'coffin';
                break;
        }

        switch (this.jugadorEnemigo.sprite) {
            case 1:
                this.spriteP2 = 'pepeS';
                this.keyP2 = 'pepeSK';
                this.keyVidaP2 = 'pepe';
                this.keyGifP2 = 'pepe';
                break;
            case 2:
                this.spriteP2 = 'trollfaceS';
                this.keyP2 = 'trollfaceSK';
                this.keyVidaP2 = 'trollface';
                this.keyGifP2 = 'troll';
                break;
            case 3:
                this.spriteP2 = 'coffindancerS';
                this.keyP2 = 'coffindancerSK';
                this.keyVidaP2 = 'coffindancer';
                this.keyGifP2 = 'coffin';
                break;
        }
    }

    preload() {

    }

    create() {
        this.timeToCorrection = 0;
        this.startScroll = false;
        this.metaCol = false;
        this.timeToSend = 0;
        this.EnemyMoved = false;
        this.cargado = false;        
        this.sceneChanged = false;
        this.connectionLost = false;
        this.fadeEnd = false;
        this.grupo_balas = this.add.group();
        this.grupoPlataformasQueRebotan = this.add.group();//Grupo donde meto todas las plataformas que rebotan
        this.grupoplataformaCae = this.add.group();
        this.golpeado = false;
        this.saberPorQueLadoLeHanGolpeado = 0;// 0 izq y 1 derecha
        this.tiempo = 0;
        this.fin = 0;
        this.contadorMapa = 0;
        this.metodoEstadoJug();
        this.timer1 = this.time.addEvent({ delay: 2000, callback: this.metodoEstadoJug, callbackScope: this, loop: true });

        this.createAnimations(this.spriteP1, this.spriteP2, this.keyP1, this.keyP2);
        this.add.image(400, 1000, 'fondo');
        this.platforms = this.physics.add.staticGroup();

        this.platforms.create(400, 2968, 'origen');
        this.platforms.create(425, 2850, 'platform');
        this.platforms.create(450, 2750, 'platform');
        this.platforms.create(500, 2650, 'platform');
        this.platforms.create(420, 2550, 'platform');
        this.platforms.create(420, 2450, 'platform');
        this.platforms.create(300, 2350, 'platform');
        this.camera = this.cameras.main;//camara de la escena
        this.camera.setScroll(0, 2400);//posición inicial de la cámara (podría cambiar)
        
        this.platformsPinchos = this.physics.add.staticGroup();

        this.numberPlayer;
        this.numberEnemy;
        $.ajax({
            url: 'https'+ urlOnline + 'chat/jugador/pos/' + this.jugador.nombre
        }).done(function (data) {
            if (!this.scene.isActive('GameSceneApi')) {
                return;
            }
            this.numberPlayer = data;
            if (this.numberPlayer == 0) {
                this.numberEnemy = 1;
                this.playerLocal = this.physics.add.sprite(250, 2900, this.spriteP1).setScale(0.5);//cambiar lo de los sprites estos(switch del init)
                this.playerEnemy = this.physics.add.sprite(600, 2900, this.spriteP2).setScale(0.5);
            } else {
                this.numberEnemy = 0;
                this.playerLocal = this.physics.add.sprite(600, 2900, this.spriteP1).setScale(0.5);
                this.playerEnemy = this.physics.add.sprite(250, 2900, this.spriteP2).setScale(0.5);
            }
            this.playerEnemy.body.setAllowGravity(false);
            this.playerLocal.setBounce(0);
            this.playerLocal.setCollideWorldBounds(true);
            this.playerLocal.depth = 10;
            this.colP1Plat = this.physics.add.collider(this.playerLocal, this.platforms, this.allowJump, null, this);//si eso cambiar el nombre a local
            //this.colP1Plat = this.physics.add.collider(this.player1, this.platforms, this.allowJump1, null, this);

            this.playerEnemy.setCollideWorldBounds(true);
            this.playerEnemy.depth = 10;
            this.colP2Plat = this.physics.add.collider(this.playerEnemy, this.platforms);

            this.playerLocalName = this.add.text(this.playerLocal.body.x, this.playerLocal.body.y - 25, this.jugador.nombre, { fontFamily: 'Berlin Sans FB, "Goudy Bookletter 1911", Times, serif', fontSize: '20px', fill: ' #ffF' });
            this.playerLocalName.depth = 9;
            this.playerEnemyName = this.add.text(this.playerEnemy.body.x, this.playerEnemy.body.y - 25, this.jugadorEnemigo.nombre, { fontFamily: 'Berlin Sans FB, "Goudy Bookletter 1911", Times, serif', fontSize: '20px', fill: ' #ffF' });
            this.playerEnemyName.depth = 9;
            this.colBalaLocal = this.physics.add.overlap(this.grupo_balas, this.playerLocal, this.chocarTrue, null, this);
            this.colBalaEnemy = this.physics.add.overlap(this.grupo_balas, this.playerEnemy, this.chocarTrue2, null, this);

       
            this.colll = this.physics.add.collider(this.grupoPlataformasQueRebotan, this.playerLocal, function (grupo, player) {// Variable donde guardo las colisiones de las plataformas
            // que rebotan con el jugador1
            this.allowJump();
            player.body.velocity.x = 0;
            //grupo.body.setFrictionX(2);
            grupo.body.setFrictionX(2);
             }, null, this);
             this.coll = this.physics.add.collider(this.grupoPlataformasQueRebotan, this.playerEnemy, function (grupo, player) {// Variable donde guardo las colisiones de las plataformas
            // que rebotan con el jugador2 
            //this.allowJump();
            player.body.velocity.x = 0;
           // grupo.body.setFrictionX(2);
           grupo.body.setFrictionX(1);
             }, null, this);

            this.colPlats_QueseMueven_Y_QueSeCaen = this.physics.add.collider(this.grupoPlataformasQueRebotan, this.grupoplataformaCae, function (plat1, plat2) {
                plat1.body.velocity.x = plat1.body.velocity.x * (-1);
                plat2.body.velocity.x = plat2.body.velocity.x * (-1);
            });// Variable donde guardo las colisiones de las plataformas
            this.colPlats_QueseMueven_Y_QueSeMueven = this.physics.add.collider(this.grupoPlataformasQueRebotan, this.grupoPlataformasQueRebotan, function (plat1, plat2) {
                plat1.body.velocity.x = plat1.body.velocity.x * (-1);
            });
    
            this.colPlats_QueseMueven_Y_QueNoSeMueven = this.physics.add.collider(this.grupoPlataformasQueRebotan, this.platforms, function (plat1, plat2) {
                plat1.body.velocity.x = plat1.body.velocity.x * (-1);
    
            });
    
            this.colPlats_QueSeCaen_Y_QueSeCaen = this.physics.add.collider(this.grupoplataformaCae, this.grupoplataformaCae, function (plat1, plat2) {
                plat1.body.velocity.x = plat1.body.velocity.x * (-1);
            });
            this.colPlats_QueseMueven_Y_QueNoSeMueven = this.physics.add.collider(this.grupoplataformaCae, this.platforms, function (plat1, plat2) {
                plat1.body.velocity.x = plat1.body.velocity.x * (-1);
            });
    
    
            this.colP1PlatqueSeMueve = this.physics.add.collider(this.grupoplataformaCae, this.playerLocal, this.tirarPlat, null, this);
            this.colP2PlatqueSeMueve = this.physics.add.collider(this.grupoplataformaCae, this.playerEnemy, this.tirarPlatEnemy, null, this);
           
            this.platformCaida = this.physics.add.sprite(400, 3100, 'platformCaida').setScale(2).refreshBody().setVisible(false);//plataforma que irá debajo de la camara y matara a los jugadores        
            this.platformCaida.body.setAllowGravity(false);//quitamos la gravedad de la plataforma de caida
            this.PlayerCaida = this.physics.add.overlap(this.playerLocal, this.platformCaida, this.muerteCaidaOnline, null, this);//la muerte por caida
            /*this.overlapPlatNormalCaida = this.physics.add.collider(this.platforms, this.platformCaida, function(plat1,plat2){          
                plat2.destroy();
            });*/
            /*this.overlapPlatMovibleCaida = this.physics.add.collider(this.grupoPlataformasQueRebotan, this.platformCaida, function(plat1,plat2){
                plat2.destroy();
            });*/
            /*this.overlapPlatCaeCaida = this.physics.add.collider(this.grupoplataformaCae, this.platformCaida, function(plat1,plat2){
                plat2.destroy();
            });*/
            //this.overlapP1Caida = this.physics.add.overlap(this.player1, this.platformCaida, this.muerteCaida1, null, this);//la muerte por caida
            //this.overlapP2Caida = this.physics.add.overlap(this.player2, this.platformCaida, this.muerteCaida2, null, this);//la muerte por caida
            this.meta = this.physics.add.staticGroup();
            this.meta.create(400, -800, 'meta');
            this.overlapPLocalWin = this.physics.add.overlap(this.playerLocal, this.meta, function () {
                if(!this.metaCol){
                    this.metaCol = true;
                    let msg = new Object();
                    msg.event = 'VICTORY';
                    msg.victoryId = {
                    sprite: '',
                    name: '',
                    fallen:false
                    }
                msg.victoryId.sprite = this.keyVidaP1;
                msg.victoryId.name = this.jugador.nombre;
                connection.send(JSON.stringify(msg));
                //this.goToVictory(this.keyVidaP1, this.player1.id);
                }
                
            }, null, this);

            this.pLocalLives = 3;
            this.pEnemyLives = 3;
            this.vidasPLocal = new Array();
            this.vidasPEnemy = new Array();
            if(this.numberPlayer == 0){
                this.vidasPLocal[0] = this.add.image(100 - 35, 50, this.keyVidaP1).setScrollFactor(0, 0);//cuando los menus esten, poner key dependiendo del personajes y que seea la cara la que aparezca, hasta entonces, cuadrado morados
                this.vidasPLocal[0].depth = 12;
                this.vidasPLocal[1] = this.add.image(100, 50, this.keyVidaP1).setScrollFactor(0, 0);
                this.vidasPLocal[1].depth = 12;
                this.vidasPLocal[2] = this.add.image(100 + 35, 50, this.keyVidaP1).setScrollFactor(0, 0);
                this.vidasPLocal[2].depth = 12;

                this.vidasPEnemy[0] = this.add.image((config.width) - 100 - 35, 50, this.keyVidaP2).setScrollFactor(0, 0);//cuando los menus esten, poner key dependiendo del personajes y que seea la cara la que aparezca, hasta entonces, cuadrado morados
                this.vidasPEnemy[0].depth = 12;
                this.vidasPEnemy[1] = this.add.image((config.width) - 100, 50, this.keyVidaP2).setScrollFactor(0, 0);
                this.vidasPEnemy[1].depth = 12;
                this.vidasPEnemy[2] = this.add.image((config.width) - 100 + 35, 50, this.keyVidaP2).setScrollFactor(0, 0);
                this.vidasPEnemy[2].depth = 12;
            }else{
                this.vidasPLocal[0] = this.add.image((config.width) - 100 - 35, 50, this.keyVidaP1).setScrollFactor(0, 0);//cuando los menus esten, poner key dependiendo del personajes y que seea la cara la que aparezca, hasta entonces, cuadrado morados
                this.vidasPLocal[0].depth = 12;
                this.vidasPLocal[1] = this.add.image((config.width) - 100, 50, this.keyVidaP1).setScrollFactor(0, 0);
                this.vidasPLocal[1].depth = 12;
                this.vidasPLocal[2] = this.add.image((config.width) - 100 + 35, 50, this.keyVidaP1).setScrollFactor(0, 0);
                this.vidasPLocal[2].depth = 12;

                this.vidasPEnemy[0] = this.add.image(100 - 35, 50, this.keyVidaP2).setScrollFactor(0, 0);//cuando los menus esten, poner key dependiendo del personajes y que seea la cara la que aparezca, hasta entonces, cuadrado morados
                this.vidasPEnemy[0].depth = 12;
                this.vidasPEnemy[1] = this.add.image(100, 50, this.keyVidaP2).setScrollFactor(0, 0);
                this.vidasPEnemy[1].depth = 12;
                this.vidasPEnemy[2] = this.add.image(100 + 35, 50, this.keyVidaP2).setScrollFactor(0, 0);
                this.vidasPEnemy[2].depth = 12;                
            }
            
            this.gameEnded = false;
            this.platformGeneradora = this.physics.add.sprite(400, 2350, 'platformCaida').setScale(2).refreshBody().setVisible(false);//plataforma que irá encima de la camara para ir realizando 
            this.platformGeneradora.body.setAllowGravity(false);
            //
            this.pLocalScroll = false; //bool usado para la reaparición
            this.pLocalDeath = false;
            //mandar mensaje de que he cargado completamente
            this.colPinchosPlayer = this.physics.add.collider(this.playerLocal, this.platformsPinchos, this.muerteCaidaOnline, null, this);
            let msg = new Object();
            msg.event = 'LOADED';
            connection.send(JSON.stringify(msg));
            this.cargado = true;
        }.bind(this))

        this.estadoJugadores = this.add.text(200, 10, '').setScrollFactor(0, 0);
        this.estadoJugadores2 = this.add.text(450, 10, '').setScrollFactor(0, 0);
        this.estadoJugadores.depth = 12;
        this.estadoJugadores2.depth = 12;
        //this.estadoServidor = this.add.text(300, 10, '').setScrollFactor(0, 0);

        this.metodoGetJugadores();
        this.timer3 = this.time.addEvent({ delay: 3000, callback: this.metodoGetJugadores, callbackScope: this, loop: true });

        this.metodoGet();//Para que el chat aparezca
        this.timer2 = this.time.addEvent({ delay: 2500, callback: this.metodoGet, callbackScope: this, loop: true });

        visibility = true;
        this.testeo = document.addEventListener('visibilitychange', () => {
            if (visibility) {
                if (document.visibilityState == 'visible') {
                    if(!(this.scene.isActive('SelectApiRest') || this.scene.isActive('GameSceneApi'))){
                        return;
                    }
                    if (this.timer2 != null) {
                        if (this.timer2.paused == true) {
                            if(this.connectionLost){
                                return;
                            }
                            $.ajax({
                                url: 'https'+ urlOnline + 'chat/jugador/regreso/' + this.jugador.nombre
                            }, this).done(function (dat) {

                                if (!this.scene.isActive('GameSceneApi')) {
                                    return;
                                }
                                if (!dat) {
                                    if(!this.sceneChanged){
                                    this.sceneChanged = true;
                                    this.trololoAudio.stop();
                                    this.coffinAudio.stop();
                                    connection.close();                                    
                                    this.scene.start('Notificaciones', { valor: 0 });
                                    }
                                } else {
                                    this.timer2.paused = false;
                                    this.timer1.paused = false;
                                    this.timer3.paused = false;
                                    this.metodoEstadoJug();
                                }
                            }.bind(this)).fail(function(){
                                this.connectionLost = true;
                                this.timer2.paused = false;
                                this.timer1.paused = true;
                                this.timer3.paused = true;
                            }.bind(this))
                        }
                    }
                } else {
                    if (this.timer2 != null) {
                        this.timer2.paused = true;
                        this.timer1.paused = true;
                        this.timer3.paused = true;
                    }
                }
            }

        }, this);
        
        
        this.playerControls = this.input.keyboard.addKeys('W,A,D', false);
        this.playerLocal_emotes = this.input.keyboard.addKeys('T,U', false);
        this.jugadorLocal_a_emoteado = 0;
        this.jugadorLoacal_quitar_emote = 0;
        this.emote_jugLocal;
        this.i = 0;//para solo hacer una vez el emoji
        
        this.jugadorEnemy_a_emoteado = 0;
        this.jugadorEnemy_quitar_emote = 0;
        this.emote_jugEnemy;
        this.idEmojiEnemy = -1;
        this.i2 = 0;

        //this.metodoGenerarUnMapa();// Generar un mapa aleatorio
        
        this.canJumpLocal = true;
        
        //this.colBalaP2 = this.physics.add.overlap(this.grupo_balas, this.playerEnemy, this.chocarTrue2, null, this);
        //this.timedEvent = this.time.addEvent({ delay: 2000, callback: this.generarBalasEnUnSitio, args: [40, 2900, 300], callbackScope: this, loop: true });
        connection.onmessage = function(message){
            //console.log('loco');
            if(this.cargado){
            //console.log('mensaje recibido');  
            //console.log(message.data);          
            this.mensaje = JSON.parse(message.data);
            //console.log(this.mensaje);
            switch(this.mensaje.event){
                case 'UPDATE MOVEMENT':
                if(!this.scene.isActive('GameSceneApi')){
                    return;
                }
                /*if(this.EnemyMoved){
                    if(this.mensaje.x>-2 || this.mensaje.x<2){
                        console.log('Recolocacion x: '+this.mensaje.posX+' y: '+this.mensaje.posY);
                        this.EnemyMoved = false;
                        this.playerEnemy.body.position.x = this.mensaje.posX;                        
                        this.playerEnemy.body.position.y = this.mensaje.posY;
                    }
                }else if(this.mensaje.x<-5 || this.mensaje.x>5 || this.mensaje.y<-10){
                    this.EnemyMoved = true;
                }
                
                this.playerEnemy.setVelocityX(this.mensaje.x);
                //console.log('deberia actualizar el valor');
                
                if(this.playerEnemy.body.touching.down && this.mensaje.y<-10){                    
                   this.playerEnemy.setVelocityY(this.mensaje.y);
                }*/
                if(this.cargado){
                    if(/*this.playerEnemy.x - this.mensaje.posX < -2 && */this.mensaje.x>5){
                        this.playerEnemy.anims.play(this.keyP2 + 'right2', true);
                    }else if(/*this.playerEnemy.x - this.mensaje.posX > 2 && */this.mensaje.x<-5){
                        this.playerEnemy.anims.play(this.keyP2 + 'left2', true);
                    }else{
                        this.playerEnemy.anims.play(this.keyP2 + 'iddle2', true);
                    }
                }
                this.playerEnemy.x = this.mensaje.posX;
                /*if(!Math.abs(this.playerEnemy.y - (this.mensaje.posY))<=10){
                    this.playerEnemy.y = this.mensaje.posY;
                    this.colP2Plat.active = false;
                }*/
                this.playerEnemy.y = this.mensaje.posY;
                //este if igual sobra, hay que probar
                if(this.mensaje.y<-10){
                    this.colP2Plat.active = false;
                    //this.grupoplataformaCae.active = false;
                    this.colP2PlatqueSeMueve.active = false;
                }else if(this.mensaje.y>=0){
                    this.colP2Plat.active = true;
                    //this.grupoplataformaCae.active = true;                    
                    this.colP2PlatqueSeMueve.active = true;
                }
                
                //if(this.playerEnemy.body.touching.down && this.mensaje.y<-10){                    
                  //  this.playerEnemy.setVelocityY(this.mensaje.y);
                 //}
                    break;
                case 'EMOJI':
                if(!this.scene.isActive('GameSceneApi')){
                        return;
                    }
                this.idEmojiEnemy = this.mensaje.idEmoji;
                    break;

                case 'BALA':
                    if(!this.scene.isActive('GameSceneApi')){
                        return;
                    }
                    //console.log('bala');
                    this.generarBalasEnUnSitio(40, 2200, 300);
                    this.generarBalasEnUnSitio(40, 1900, 300);
                    this.generarBalasEnUnSitio(760, 1500, -300);
                    this.generarBalasEnUnSitio(40, 1100, 300);
                    this.generarBalasEnUnSitio(760, 700, -300);
                    this.generarBalasEnUnSitio(760, 300, -300);
                    this.generarBalasEnUnSitio(40, -100, 300);
                    this.generarBalasEnUnSitio(760, 1300, -300);
                    this.generarBalasEnUnSitio(40, 100, 300);
                    this.generarBalasEnUnSitio(40, -600, 300);
                    break;
                case 'PLATAFORMAS':
                    if(!this.scene.isActive('GameSceneApi')){
                        return;
                    }
                    //console.log('plataformas a generar');         
                    this.metodoGenerarUnMapa(this.mensaje.randNumberPlat);// Generar un mapa aleatorio
                    //console.log('bala');

                break;
                case 'VICTORY':
                    if(!this.scene.isActive('GameSceneApi')){
                        return;
                    }
                    if(this.mensaje.fallen && this.pLocalLives>0){
                        this.vidasPEnemy[0].setVisible(false);
                    }
                    /*console.log(this.mensaje.idSprite);
                    console.log(this.mensaje.nameVictory);*/
                    this.goToVictoryOnline(this.mensaje.idSprite, this.mensaje.nameVictory);
                break;

                case 'CAIDA ENEMIGO':
                    if(!this.scene.isActive('GameSceneApi')){
                        return;
                    }
                    this.pEnemyLives--;
                    this.colP2Plat.active = false;
                    this.coll.active = false;
                    this.colP2PlatqueSeMueve.active = false;
                    this.colBalaEnemy.active = false;
                    this.vidasPEnemy[this.pEnemyLives].setVisible(false);
                    this.playerEnemy.alpha = 0.5;
                    this.playerEnemy.body.setAllowGravity(false);
                    this.playerEnemy.body.setVelocityY(0);
                break;
                case 'REAPARICION':
                    if(!this.scene.isActive('GameSceneApi')){
                        return;
                    }                    
                    this.playerEnemy.alpha = 1;
                    this.colP2Plat.active = true;
                    this.coll.active = true;
                    this.colP2PlatqueSeMueve.active = true;
                    this.colBalaEnemy.active = true;
                    this.playerEnemy.setImmovable(false);
                    this.playerEnemy.body.setAllowGravity(true);                    
                break;
            }
            //console.log('message: '+message);
            //console.log('mensaje: '+this.mensaje);
            }
        }.bind(this);

        /*if(this.numberPlayer==0){
         this.playerLocal = this.physics.add.sprite(250, 2900, this.spriteP1).setScale(0.5);//cambiar lo de los sprites estos(switch del init)
         this.playerEnemy = this.physics.add.sprite(600, 2900, this.spriteP2).setScale(0.5);
        }else{
            this.playerLocal = this.physics.add.sprite(600, 2900, this.spriteP1).setScale(0.5);
            this.playerEnemy = this.physics.add.sprite(250, 2900, this.spriteP2).setScale(0.5);
        }*/
        //




        /*
        this.player1 = this.physics.add.sprite(250, 2900, this.spriteP1).setScale(0.5);

        this.player1.setBounce(0);
        this.player1.setCollideWorldBounds(true);
        this.player1.depth = 10;//profundidad para aparecer siempre por delante de todo
        this.player1.id = 0;
        this.player2 = this.physics.add.sprite(600, 2900, this.spriteP2).setScale(0.5);
        this.player2.setBounce(0);
        this.player2.setCollideWorldBounds(true);
        this.player2.depth = 10;//profundidad para aparecer siempre por delante de todo
        this.player2.id = 1;
       */

        /*this.colP1Plat = this.physics.add.collider(this.player1, this.platforms, this.allowJump1, null, this);
        this.colP2Plat = this.physics.add.collider(this.player2, this.platforms, this.allowJump2, null, this);

        this.player1Controls = this.input.keyboard.addKeys('W,A,D', false);
        this.player2Controls = this.input.keyboard.addKeys('UP,LEFT,RIGHT', false);

        this.canJump1 = true;
        this.canJump2 = true;
        
        this.platformCaida = this.physics.add.sprite(400, 3050, 'platformCaida').setScale(2).refreshBody().setVisible(false);//plataforma que irá debajo de la camara y matara a los jugadores        
        this.platformCaida.body.setAllowGravity(false);//quitamos la gravedad de la plataforma de caida
        this.platformGeneradora = this.physics.add.sprite(400, 2350, 'platformCaida').setScale(2).refreshBody().setVisible(false);//plataforma que irá encima de la camara para ir realizando 
        //calculos de como generar el resto de plataformas.
        this.platformGeneradora.body.setAllowGravity(false);
        this.overlapP1Caida = this.physics.add.overlap(this.player1, this.platformCaida, this.muerteCaida1, null, this);//la muerte por caida
        this.overlapP2Caida = this.physics.add.overlap(this.player2, this.platformCaida, this.muerteCaida2, null, this);//la muerte por caida


        this.grupo_balas = this.add.group();// Este grupo lo usare para recorrer todas mis balas de la escena, IMPORTANTE NO LE PONGO FÍSICAS AL GRUPO

        this.golpeado = false;
        this.saberPorQueLadoLeHanGolpeado = 0;// 0 izq y 1 derecha
        this.tiempo = 0;
        this.fin = 0;

        this.golpeado2 = false;
        this.saberPorQueLadoLeHanGolpeado2 = 0;// 0 izq y 1 derecha
        this.tiempo2 = 0;
        this.fin2 = 0;

        this.colBalaP1 = this.physics.add.overlap(this.grupo_balas, this.player1, this.chocarTrue, null, this);
        this.colBalaP2 = this.physics.add.overlap(this.grupo_balas, this.player2, this.chocarTrue2, null, this);

        this.MedirCuandoHacerBala = 1;
        this.MedirCuandoHacerBala2 = 1;

        this.grupoPlataformasQueRebotan = this.add.group();//Grupo donde meto todas las plataformas que rebotan

        this.colll = this.physics.add.collider(this.grupoPlataformasQueRebotan, this.playerLocal, function (grupo, player) {// Variable donde guardo las colisiones de las plataformas
            // que rebotan con el jugador1
            this.allowJump1();
            player.body.velocity.x = 0;
            grupo.body.setFrictionX(2);
        }, null, this);

        this.coll = this.physics.add.collider(this.grupoPlataformasQueRebotan, this.playerEnemy, function (grupo, player) {// Variable donde guardo las colisiones de las plataformas
            // que rebotan con el jugador2 
            this.allowJump2();
            player.body.velocity.x = 0;
            grupo.body.setFrictionX(2);
        }, null, this);

        //Emoticonos
        this.jugador1_a_emoteado = 0;
        this.jugador1_quitar_emote = 0;
        this.player1_emotes = this.input.keyboard.addKeys('T,U', false);
        this.emote_jug1;
        this.i = 0;

        this.jugador2_a_emoteado = 0;
        this.jugador2_quitar_emote = 0;
        this.player2_emotes = this.input.keyboard.addKeys('B,M', false);
        this.emote_jug2;
        this.i2 = 0;


        this.p1Lives = this.p2Lives = 3;
        this.p1Death = this.p2Death = false;
        this.p1Scroll = this.p2Scroll = false;

        this.vidasP1 = new Array();
        this.vidasP1[0] = this.add.image(100 - 35, 50, this.keyVidaP1).setScrollFactor(0, 0);//cuando los menus esten, poner key dependiendo del personajes y que seea la cara la que aparezca, hasta entonces, cuadrado morados
        this.vidasP1[0].depth = 12;
        this.vidasP1[1] = this.add.image(100, 50, this.keyVidaP1).setScrollFactor(0, 0);
        this.vidasP1[1].depth = 12;
        this.vidasP1[2] = this.add.image(100 + 35, 50, this.keyVidaP1).setScrollFactor(0, 0);
        this.vidasP1[2].depth = 12;

        this.vidasP2 = new Array();
        this.vidasP2[0] = this.add.image((config.width) - 100 - 35, 50, this.keyVidaP2).setScrollFactor(0, 0);
        this.vidasP2[0].depth = 12;
        this.vidasP2[1] = this.add.image((config.width) - 100, 50, this.keyVidaP2).setScrollFactor(0, 0);
        this.vidasP2[1].depth = 12;
        this.vidasP2[2] = this.add.image((config.width) - 100 + 35, 50, this.keyVidaP2).setScrollFactor(0, 0);
        this.vidasP2[2].depth = 12;



        this.grupoplataformaCae = this.add.group();

        this.colPlats_QueseMueven_Y_QueSeCaen = this.physics.add.collider(this.grupoPlataformasQueRebotan, this.grupoplataformaCae, function (plat1, plat2) {
            plat1.body.velocity.x = plat1.body.velocity.x * (-1);
            plat2.body.velocity.x = plat2.body.velocity.x * (-1);
        });// Variable donde guardo las colisiones de las plataformas
        this.colPlats_QueseMueven_Y_QueSeMueven = this.physics.add.collider(this.grupoPlataformasQueRebotan, this.grupoPlataformasQueRebotan, function (plat1, plat2) {
            plat1.body.velocity.x = plat1.body.velocity.x * (-1);
        });

        this.colPlats_QueseMueven_Y_QueNoSeMueven = this.physics.add.collider(this.grupoPlataformasQueRebotan, this.platforms, function (plat1, plat2) {
            plat1.body.velocity.x = plat1.body.velocity.x * (-1);

        });

        this.colPlats_QueSeCaen_Y_QueSeCaen = this.physics.add.collider(this.grupoplataformaCae, this.grupoplataformaCae, function (plat1, plat2) {
            plat1.body.velocity.x = plat1.body.velocity.x * (-1);
        });
        this.colPlats_QueseMueven_Y_QueNoSeMueven = this.physics.add.collider(this.grupoplataformaCae, this.platforms, function (plat1, plat2) {
            plat1.body.velocity.x = plat1.body.velocity.x * (-1);
        });


        this.colP1PlatqueSeMueve = this.physics.add.collider(this.grupoplataformaCae, this.player1, this.tirarPlat, null, this);
        this.colP2PlatqueSeMueve = this.physics.add.collider(this.grupoplataformaCae, this.player2, this.tirarPlat, null, this);

        this.contadorPlataformasQueCaen = 0;//Se usa para saber cunatas plataformas hay que caen en el pool de plataformas y asi  evitar que haya demasiado de este tipo  
        this.alturaBala = Phaser.Math.Between(0, 100);
        this.alturaBala_Aux;
        if (this.alturaBala <= 20) {
            this.alturaBala_Aux = 2285;
        }
        else if (this.alturaBala > 20 && this.alturaBala <= 40) {
            this.alturaBala_Aux = 2175;
        }
        else if (this.alturaBala > 40 && this.alturaBala <= 60) {
            this.alturaBala_Aux = 1975;
        }
        else if (this.alturaBala > 60 && this.alturaBala <= 80) {
            this.alturaBala_Aux = 1775;
        }
        else {
            this.alturaBala_Aux = 1575;
        }

        this.timedEvent = this.time.addEvent({ delay: 2000, callback: this.generarBalasEnUnSitio, args: [40, this.alturaBala_Aux, 300], callbackScope: this, loop: true });
        this.timedEvent2 = this.time.addEvent({ delay: 2000, callback: this.generarBalasEnUnSitio, args: [760, this.alturaBala_Aux - 500, -300], callbackScope: this, loop: true });
        this.timedEvent3 = this.time.addEvent({ delay: 2000, callback: this.generarBalasEnUnSitio, args: [40, this.alturaBala_Aux - 1000, 300], callbackScope: this, loop: true });
        this.timedEvent4 = this.time.addEvent({ delay: 2000, callback: this.generarBalasEnUnSitio, args: [40, this.alturaBala_Aux - 1525, 300], callbackScope: this, loop: true });
        this.timedEvent5 = this.time.addEvent({ delay: 2000, callback: this.generarBalasEnUnSitio, args: [40, this.alturaBala_Aux - 2025, 300], callbackScope: this, loop: true });

        this.meta = this.physics.add.staticGroup();
        this.meta.create(400, -800, 'meta');
        this.overlapP1Win = this.physics.add.overlap(this.player1, this.meta, function () {
            this.goToVictory(this.keyVidaP1, this.player1.id);
        }, null, this);
        this.overlapP2Win = this.physics.add.overlap(this.player2, this.meta, function () {
            this.goToVictory(this.keyVidaP2, this.player2.id);
        }, null, this);

        this.canJump1 = true;
        this.canJump2 = true;
        */       

        this.trololoAudio = this.sound.add('trololo', { loop: true });
        this.trololoAudio.setVolume(0.02);
        this.coffinAudio = this.sound.add('coffinSound', { loop: true });
        this.coffinAudio.setVolume(0.02);
        this.updateAudio();
        this.menuButton = this.add.sprite(80, 570, 'redButton01').setInteractive().setScrollFactor(0,0).setScale(0.75);
        this.menuButton.depth=12;
        this.menuText = this.add.text(0, 0, 'MENU', { fontFamily: 'Berlin Sans FB, "Goudy Bookletter 1911", Times, serif', fontSize: '32px', fill: '#fff' });
        this.menuText.depth=13;
        this.menuText.setScrollFactor(0,0);
        this.centerButtonText(this.menuText, this.menuButton);
        
        this.menuButton.on('pointerdown', function (pointer) {
            if(!this.sceneChanged){
            this.sceneChanged = true;
            this.metodoDeleteJugador();
            this.cameras.main.fadeOut(500);
            this.cameras.main.once('camerafadeoutcomplete', function (camera) {
                this.trololoAudio.stop();
                this.coffinAudio.stop();
                connection.close();
                this.scene.start('Menu');
            }, this);
        }
        }.bind(this));

        this.input.on('pointerover', () => this.menuButton.setTexture('redButton02'));

        this.input.on('pointerout', () => this.menuButton.setTexture('redButton01'));
        /*this.player1Name = this.add.text(this.player1.body.x, this.player1.body.y - 25, 'Player 1', { fontFamily: 'Berlin Sans FB, "Goudy Bookletter 1911", Times, serif', fontSize: '20px', fill: ' #ffF' });
        this.player1Name.depth = 9;
        this.player2Name = this.add.text(this.player2.body.x, this.player2.body.y - 25, 'Player 2', { fontFamily: 'Berlin Sans FB, "Goudy Bookletter 1911", Times, serif', fontSize: '20px', fill: '#fff' });
        this.player2Name.depth = 9;
        this.cameras.main.fadeIn(200);
        this.cameras.main.once('camerafadeincomplete', function (camera) {
            this.fadeEnd = true;
        }, this);
        this.gameEnded = false;
        this.menuButton = this.add.sprite(80, 570, 'redButton01').setInteractive().setScrollFactor(0,0).setScale(0.75);
        this.menuButton.depth=12;
        this.menuText = this.add.text(0, 0, 'MENU', { fontFamily: 'Berlin Sans FB, "Goudy Bookletter 1911", Times, serif', fontSize: '32px', fill: '#fff' });
        this.menuText.depth=13;
        this.menuText.setScrollFactor(0,0);
        this.centerButtonText(this.menuText, this.menuButton);
        
        this.menuButton.on('pointerdown', function (pointer) {
            this.cameras.main.fadeOut(500);
            this.cameras.main.once('camerafadeoutcomplete', function (camera) {
                this.trololoAudio.stop();
                this.coffinAudio.stop();
                this.scene.start('Menu');
            }, this);
        }.bind(this));

        this.input.on('pointerover', () => this.menuButton.setTexture('redButton02'));

        this.input.on('pointerout', () => this.menuButton.setTexture('redButton01'));*/        
    }

    metodoDeleteJugador() {
        nom_jug = null;
        $.ajax({
            method: 'DELETE',
            url: 'https'+ urlOnline + 'chat/jugador/' + this.jugador.nombre
        }, this).done(function (data) {
            if(!this.scene.isActive('SelectApiRest')){
                return;
            }
         }.bind(this))
    }

    centerButtonText(gameText, gameButton) {
        Phaser.Display.Align.In.Center(
            gameText,
            gameButton
        );
    }

    generarPlatEstatica(posX, posY) {
        this.platforms.create(posX, posY, 'platform');
    }

    tirarPlat(plat, jug) {
        if(jug.body.touching.down && jug.body.velocity.y>=0){
            if (jug.numberPlayer == 0) {
                this.allowJump();
            } else {
                this.allowJump();
            }
            //if (plat.body.velocity.x != 0) {// SIGNIFICA QUE SOLO ENTRO EN CASO DE QUE SEA LA PRIMERA VEZ QUE SE PISA
                plat.setVelocity(0, 0);
                plat.destruido1 = true;
                this.time.delayedCall(2000, this.auxiliar, [plat], this);
            //}
        }
    }

    tirarPlatEnemy(plat, enemy){
        //if(enemy.body.touching.down && enemy.body.velocity.y>=0){
            /*if (enemy.numberPlayer == 0) {
                this.allowJump();
            } else {
                this.allowJump();
            }*/
                plat.setVelocity(0, 0);
                plat.destruido1 = true;
                this.time.delayedCall(2000, this.auxiliar, [plat], this);
        //}        
    }
    
    auxiliar(pla) {
        pla.setVelocity(0, 300);
        pla.body.setImmovable(false);
        this.grupoplataformaCae.remove(pla);
        this.contadorPlataformasQueCaen = this.contadorPlataformasQueCaen - 1;
        this.time.delayedCall(3000, this.destruirPlataforma, [pla], this);

    }
    destruirPlataforma(plat) {
        plat.destroy();
    }

    generarBalasEnUnSitio(possX, possY, sentidoYvelocidad) {
        this.bal = this.physics.add.sprite(possX, possY, 'bomb');
        this.bal.body.setAllowGravity(false);
        this.bal.setVelocity(sentidoYvelocidad, 0);
        this.grupo_balas.add(this.bal);
    }
    generarPlataformasQueRebotanYcaen(possX, possY, velocidad) {
        this.plataforma11 = this.physics.add.sprite(possX, possY, 'platformDislike');
        this.plataforma11.body.setAllowGravity(false);
        //this.plataforma11.setVelocity(velocidad, 0);
        this.plataforma11.setCollideWorldBounds(10, true, false);
        this.plataforma11.setBounce(1);
        this.grupoplataformaCae.add(this.plataforma11);
        this.plataforma11.body.setImmovable(true);
        this.plataforma11.destruido1 = false;

    }

    generarPlataformasQueRebotan(possX, possY, velocidad) {
        this.plataforma1 = this.physics.add.sprite(possX, possY, 'platform');
        this.plataforma1.body.setAllowGravity(false);
        this.plataforma1.body.setImmovable(true);
        //this.plataforma1.setVelocity(velocidad, 0);
        this.plataforma1.setCollideWorldBounds(true);
        this.plataforma1.setBounce(1);
        this.grupoPlataformasQueRebotan.add(this.plataforma1);
    }

    destruirBalasFueraDelMapa(gb) {// FUNCION QUE DESTRUYE LAS BALAS QUE SE SALEN DEL MAPA PARA NO SOBRECARGAR EL JUEGO
        for (var j = 0; j < gb.getChildren().length; j++) {
            if (gb.getChildren()[j].x > config.width - 30 || gb.getChildren()[j].x < 30) {
                gb.getChildren()[j].destroy();
            }
        }
    }

    update(time, delta) {
        let msg = new Object();
        msg.event = 'UPDATE MOVEMENT';
        msg.movement={
            x:0,
            y:0,
            posX:0,
            posY:0
        }
        msg.idEmoji=-1;
        /*if (!this.fadeEnd) {
            return;
        }*/
        if(!this.cargado){
            return;
        }
        if(this.connectionLost){
            if(!this.sceneChanged){
                this.sceneChanged = true;    
                this.trololoAudio.stop();
                this.coffinAudio.stop();
                connection.close();
                this.scene.start('Notificaciones',{ valor: 1});
            }
           
        }
        this.destroyPlatforms();
        this.playerLocalName.x  = this.playerLocal.body.x;
        this.playerLocalName.y  = this.playerLocal.body.y - 25;
        this.playerEnemyName.x  = this.playerEnemy.body.x;
        this.playerEnemyName.y  = this.playerEnemy.body.y - 25;
        if (this.golpeado == true) {

            this.tiempo = time;
            this.fin = this.tiempo + 30;
            this.golpeado = false;
        }
        if (this.tiempo != this.fin) {
            this.tiempo = this.tiempo + 1;
            if (this.saberPorQueLadoLeHanGolpeado == 1) {// ME HAN PEGADO POR LA DERECHA
                this.playerLocal.setVelocityX(-250);
            }
            else {// ME HAN PEGADO POR LA IZQUIERDA            
                this.playerLocal.setVelocityX(250);
            }
        }
        else if (this.playerControls.A.isDown) {
            this.playerLocal.setVelocityX(-160);
            //msg.movement.x = -160;
            //connection.send(JSON.stringify(msg));            
            this.playerLocal.anims.play(this.keyP1 + 'left', true);
        }
        else if (this.playerControls.D.isDown) {
            this.playerLocal.setVelocityX(160);
            //msg.movement.x = 160;
            //connection.send(JSON.stringify(msg));
            this.playerLocal.anims.play(this.keyP1 + 'right', true);
        }
        else {
            this.playerLocal.setVelocityX(0);
            //msg.movement.x = 0;
            //connection.send(JSON.stringify(msg));
            this.playerLocal.anims.play(this.keyP1 + 'iddle');
        }

        if (this.playerControls.W.isDown && (this.canJumpLocal && this.playerLocal.body.touching.down)) {
            this.canJumpLocal = false;
            this.playerLocal.setVelocityY(-400);  
            //msg.movement.y = -400;
            //connection.send(JSON.stringify(msg));
        }

        if (this.playerLocal.body.velocity.y > 1)//cayendo
        {
            this.colP1Plat.active = true;
            this.colPinchosPlayer.active = true;
            //msg.movement.y = 0;
            //connection.send(JSON.stringify(msg));
            this.colll.active = true;
            this.colP1PlatqueSeMueve.active = true;

        } else//saltando
        {
            this.colP1Plat.active = false;
            this.colPinchosPlayer.active = false;
            this.colll.active = false;
            this.colP1PlatqueSeMueve.active = false;

        }
        //if(this.timeToSend>100){
            msg.movement.x = this.playerLocal.body.velocity.x;
            msg.movement.y = this.playerLocal.body.velocity.y;
            msg.movement.posX = this.playerLocal.x;
            msg.movement.posY = this.playerLocal.y;
            connection.send(JSON.stringify(msg));
            //this.timeToSend = 0;
        //}else{
          //  this.timeToSend+=delta;
        //}

        /*if(this.timeToCorrection>1500){
            this.timeToCorrection = 0;
        }else{
            this.timeToCorrection += delta;
        }*/
        /*if(this.playerEnemy.body.velocity.y>1){
            this.colP2Plat.active = true;
            //this.grupoplataformaCae.active = true;            
            this.colP2PlatqueSeMueve.active = true;
        }else{
            this.colP2Plat.active = false;
            //this.grupoplataformaCae.active = false;            
            this.colP2PlatqueSeMueve.active = false;
        }*/

        if (this.playerLocal_emotes.T.isUp == false && this.i == 0) {            
            this.jugadorLocal_a_emoteado = time;
            this.jugadorLoacal_quitar_emote = time + 200;
            this.emote_jugLocal = this.add.sprite(this.playerLocal.x - 5, this.playerLocal.y - 50, this.keyGifP1 + 'Happy').setScale(0.5);
            this.emote_jugLocal.anims.play(this.keyGifP1 + 'HappyGif');
            this.emote_jugLocal.depth = 10;
            this.i = 1;
            msg.idEmoji=0;            
        }
        else if (this.playerLocal_emotes.U.isUp == false && this.i == 0) {            
            this.jugadorLocal_a_emoteado = time;
            this.jugadorLoacal_quitar_emote = time + 200;
            this.emote_jugLocal = this.add.sprite(this.playerLocal.x - 5, this.playerLocal.y - 50, this.keyGifP1 + 'Sad').setScale(0.5);
            this.emote_jugLocal.anims.play(this.keyGifP1 + 'SadGif');
            this.emote_jugLocal.depth = 10;
            this.i = 1;
            msg.idEmoji=1;
        }
        if (this.jugadorLocal_a_emoteado != this.jugadorLoacal_quitar_emote) {
            this.jugadorLocal_a_emoteado = this.jugadorLocal_a_emoteado + 1;
            this.emote_jugLocal.x = this.playerLocal.x - 5;
            this.emote_jugLocal.y = this.playerLocal.y - 50;
            if (this.jugadorLocal_a_emoteado == this.jugadorLoacal_quitar_emote) {
                this.emote_jugLocal.destroy();
                this.i = 0;                
            }

        }
        if(msg.idEmoji!=-1){            
            msg.event='EMOJI';
            connection.send(JSON.stringify(msg));
            msg.idEmoji=-1;    
        }

        //Emojis player enemy
        /*
        this.jugadorEnemy_a_emoteado = 0;
        this.jugadorEnemy_quitar_emote = 0;
        this.emote_jugEnemy;
        this.idEmojiEnemy = -1;
        this.i2 = 0;
        */
        if (this.idEmojiEnemy==0 && this.i2 == 0) {
            this.jugadorEnemy_a_emoteado = time;
            this.jugadorEnemy_quitar_emote = time + 200;
            this.emote_jugEnemy = this.add.sprite(this.playerEnemy.x - 5, this.playerEnemy.y - 50, this.keyGifP2 + 'Happy').setScale(0.5);
            this.emote_jugEnemy.anims.play(this.keyGifP2 + 'HappyGif');
            this.emote_jugEnemy.depth = 10;
            this.i2 = 1;
        }
        else if (this.idEmojiEnemy==1 && this.i2 == 0) {
            this.jugadorEnemy_a_emoteado = time;
            this.jugadorEnemy_quitar_emote = time + 200;
            this.emote_jugEnemy = this.add.sprite(this.playerEnemy.x - 5, this.playerEnemy.y - 50, this.keyGifP2 + 'Sad').setScale(0.5);
            this.emote_jugEnemy.anims.play(this.keyGifP2 + 'SadGif');
            this.emote_jugEnemy.depth = 10;
            this.i2 = 1;
        }

        if (this.jugadorEnemy_a_emoteado != this.jugadorEnemy_quitar_emote) {
            this.jugadorEnemy_a_emoteado = this.jugadorEnemy_a_emoteado + 1;
            this.emote_jugEnemy.x = this.playerEnemy.x - 5;
            this.emote_jugEnemy.y = this.playerEnemy.y - 50;
            if (this.jugadorEnemy_a_emoteado == this.jugadorEnemy_quitar_emote) {
                this.emote_jugEnemy.destroy();
                this.idEmojiEnemy=-1;
                this.i2 = 0;
            }
        }
        
        
        //Player1 control
        /*if (this.golpeado == true) {

            this.tiempo = time;
            this.fin = this.tiempo + 30;
            this.golpeado = false;
        }
        if (this.tiempo != this.fin) {
            this.tiempo = this.tiempo + 1;
            if (this.saberPorQueLadoLeHanGolpeado == 1) {// ME HAN PEGADO POR LA DERECHA
                this.player1.setVelocityX(-250);
            }
            else {// ME HAN PEGADO POR LA IZQUIERDA            
                this.player1.setVelocityX(250);
            }
        }
        else if (this.player1Controls.A.isDown) {
            this.player1.setVelocityX(-160);
            this.player1.anims.play(this.keyP1 + 'left', true);
        }
        else if (this.player1Controls.D.isDown) {
            this.player1.setVelocityX(160);
            this.player1.anims.play(this.keyP1 + 'right', true);
        }
        else {
            this.player1.setVelocityX(0);
            this.player1.anims.play(this.keyP1 + 'iddle');
        }

        if (this.player1Controls.W.isDown && (this.canJump1 && this.player1.body.touching.down)) {
            this.canJump1 = false;
            this.player1.setVelocityY(-400);
        }

        if (this.player1.body.velocity.y > 1)//cayendo
        {
            this.colP1Plat.active = true;
            this.colll.active = true;
            this.colP1PlatqueSeMueve.active = true;

        } else//saltando
        {
            this.colP1Plat.active = false;
            this.colll.active = false;
            this.colP1PlatqueSeMueve.active = false;

        }

        //Player2 control

        if (this.golpeado2 == true) {
            this.tiempo2 = time;
            this.fin2 = this.tiempo2 + 30;
            this.golpeado2 = false;
        }
        if (this.tiempo2 != this.fin2) {
            this.tiempo2 = this.tiempo2 + 1;
            if (this.saberPorQueLadoLeHanGolpeado2 == 1) {// ME HAN PEGADO POR LA DERECHA
                this.player2.setVelocityX(-250);
            }
            else {// ME HAN PEGADO POR LA IZQUIERDA            
                this.player2.setVelocityX(250);
            }
        }

        else if (this.player2Controls.LEFT.isDown) {
            this.player2.setVelocityX(-160);
            this.player2.anims.play(this.keyP2 + 'left2', true);
        }
        else if (this.player2Controls.RIGHT.isDown) {
            this.player2.setVelocityX(160);
            this.player2.anims.play(this.keyP2 + 'right2', true);
        }
        else {
            this.player2.setVelocityX(0);
            this.player2.anims.play(this.keyP2 + 'iddle2');
        }

        if (this.player2Controls.UP.isDown && (this.canJump2 && this.player2.body.touching.down)) {
            this.canJump2 = false;
            this.player2.setVelocityY(-400);
        }

        if (this.player2.body.velocity.y > 1)//cayendo
        {
            this.colP2Plat.active = true;
            this.coll.active = true;
            this.colP2PlatqueSeMueve.active = true;

        } else//saltando
        {
            this.colP2Plat.active = false;
            this.coll.active = false;
            this.colP2PlatqueSeMueve.active = false;
        }
        this.player1Name.x = this.player1.body.x - 15;
        this.player1Name.y = this.player1.body.y - 25;
        this.player2Name.x = this.player2.body.x - 15;
        this.player2Name.y = this.player2.body.y - 25;
*/
            //REAPARICIONES
            if (this.pLocalDeath) {
                this.pLocalDeath = false;
                this.cameraScrollLocal = this.camera.scrollY;
                this.pLocalScroll = true;
            }

            if ((this.pLocalScroll) && ((this.camera.scrollY <= (this.cameraScrollLocal - 250) || this.camera.scrollY <= -1000))) {
                this.reaparicionOnline(this.playerLocal);
                //this.reaparicion(this.player1);
                this.pLocalScroll = false;
            }
            //REAPARICIONES

            if ((this.camera.scrollY > -1000) && this.startScroll)//ponemos un tope cualquiera al scroll de la camara // CON ESTO SE MUEVO
            {
                this.platformCaida.setVelocity(0, -60 * (delta / 15));
                this.platformGeneradora.setVelocity(0, -60 * (delta / 15));
                this.camera.scrollY -= 1 * (delta / 15);
            } else {
                this.platformCaida.setVelocity(0, 0);// PLATAFORMA QUE MATA
                this.platformGeneradora.setVelocity(0, 0);
            }
            this.destruirBalasFueraDelMapa(this.grupo_balas);
        
/*

        this.managePlatforms();


        this.destruirBalasFueraDelMapa(this.grupo_balas);
        if (this.player1_emotes.T.isUp == false && this.i == 0) {
            this.jugador1_a_emoteado = time;
            this.jugador1_quitar_emote = time + 200;
            this.emote_jug1 = this.add.sprite(this.player1.x - 5, this.player1.y - 50, this.keyGifP1 + 'Happy').setScale(0.5);
            this.emote_jug1.anims.play(this.keyGifP1 + 'HappyGif');
            this.emote_jug1.depth = 10;
            this.i = 1;
        }
        else if (this.player1_emotes.U.isUp == false && this.i == 0) {
            this.jugador1_a_emoteado = time;
            this.jugador1_quitar_emote = time + 200;
            this.emote_jug1 = this.add.sprite(this.player1.x - 5, this.player1.y - 50, this.keyGifP1 + 'Sad').setScale(0.5);
            this.emote_jug1.anims.play(this.keyGifP1 + 'SadGif');
            this.emote_jug1.depth = 10;
            this.i = 1;
        }

        if (this.jugador1_a_emoteado != this.jugador1_quitar_emote) {
            this.jugador1_a_emoteado = this.jugador1_a_emoteado + 1;
            this.emote_jug1.x = this.player1.x - 5;
            this.emote_jug1.y = this.player1.y - 50;
            if (this.jugador1_a_emoteado == this.jugador1_quitar_emote) {
                this.emote_jug1.destroy();
                this.i = 0;
            }

        }

        if (this.player2_emotes.B.isUp == false && this.i2 == 0) {
            this.jugador2_a_emoteado = time;
            this.jugador2_quitar_emote = time + 200;
            this.emote_jug2 = this.add.sprite(this.player2.x - 5, this.player2.y - 50, this.keyGifP2 + 'Happy').setScale(0.5);
            this.emote_jug2.anims.play(this.keyGifP2 + 'HappyGif');
            this.emote_jug2.depth = 10;
            this.i2 = 1;
        }
        else if (this.player2_emotes.M.isUp == false && this.i2 == 0) {
            this.jugador2_a_emoteado = time;
            this.jugador2_quitar_emote = time + 200;
            this.emote_jug2 = this.add.sprite(this.player2.x - 5, this.player2.y - 50, this.keyGifP2 + 'Sad').setScale(0.5);
            this.emote_jug2.anims.play(this.keyGifP2 + 'SadGif');
            this.emote_jug2.depth = 10;
            this.i2 = 1;
        }

        if (this.jugador2_a_emoteado != this.jugador2_quitar_emote) {
            this.jugador2_a_emoteado = this.jugador2_a_emoteado + 1;
            this.emote_jug2.x = this.player2.x - 5;
            this.emote_jug2.y = this.player2.y - 50;
            if (this.jugador2_a_emoteado == this.jugador2_quitar_emote) {
                this.emote_jug2.destroy();
                this.i2 = 0;
            }
        }
        //Reapariciones Player1
        if (this.p1Death) {
            this.p1Death = false;
            this.cameraScroll1 = this.camera.scrollY;
            this.p1Scroll = true;
        }

        if ((this.p1Scroll) && ((this.camera.scrollY <= (this.cameraScroll1 - 250) || this.camera.scrollY <= -1000))) {
            this.reaparicion(this.player1);
            this.p1Scroll = false;
        }

        //Reapariciones Player2
        if (this.p2Death) {
            this.p2Death = false;
            this.cameraScroll2 = this.camera.scrollY;
            this.p2Scroll = true;
        }

        if ((this.p2Scroll) && ((this.camera.scrollY <= (this.cameraScroll2 - 250) || this.camera.scrollY <= -1000))) {
            this.reaparicion(this.player2);
            this.p2Scroll = false;
        }*/
    }

    chocarTrue(gpp, jug) {
        this.s = gpp.body.x;
        this.golpeado = true;

        if (this.s < jug.x) {
            this.saberPorQueLadoLeHanGolpeado = 0;
        }
        else {
            this.saberPorQueLadoLeHanGolpeado = 1;
        }
        gpp.destroy();
    }
    chocarTrue2(gpp, jug) {
        /*this.s = gpp.body.x;
        this.golpeado2 = true;

        if (this.s < jug.x) {
            this.saberPorQueLadoLeHanGolpeado2 = 0;
        }
        else {
            this.saberPorQueLadoLeHanGolpeado2 = 1;
        }*/
        gpp.destroy();
    }
    createAnimations(player1sprite, player2sprite, k1, k2) {
        //Animaciones Player1
        this.anims.create({
            key: k1 + 'left',
            frames: this.anims.generateFrameNumbers(player1sprite, {
                start: 0,
                end: 3
            }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: k1 + 'iddle',
            frames: [{ key: player1sprite, frame: 4 }],
            frameRate: 20
        });
        this.anims.create({
            key: k1 + 'right',
            frames: this.anims.generateFrameNumbers(player1sprite, { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
        //Animaciones Player2
        this.anims.create({
            key: k2 + 'left2',
            frames: this.anims.generateFrameNumbers(player2sprite, {
                start: 0,
                end: 3
            }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: k2 + 'iddle2',
            frames: [{ key: player2sprite, frame: 4 }],
            frameRate: 20
        });
        this.anims.create({
            key: k2 + 'right2',
            frames: this.anims.generateFrameNumbers(player2sprite, { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
        //Gif taunt
        //pepeHappy
        this.anims.create({
            key: 'pepeHappyGif',
            frames: this.anims.generateFrameNumbers('pepeHappy', { start: 0, end: 4 }),
            frameRate: 10,
            repeat: -1
        });
        //pepeSad
        this.anims.create({
            key: 'pepeSadGif',
            frames: this.anims.generateFrameNumbers('pepeSad', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1
        });
        //trollHappy
        this.anims.create({
            key: 'trollHappyGif',
            frames: this.anims.generateFrameNumbers('trollHappy', { start: 0, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
        //trollSad
        this.anims.create({
            key: 'trollSadGif',
            frames: this.anims.generateFrameNumbers('trollSad', { start: 0, end: 9 }),
            frameRate: 10,
            repeat: -1
        });
        //coffinHappy
        this.anims.create({
            key: 'coffinHappyGif',
            frames: this.anims.generateFrameNumbers('coffinHappy', { start: 0, end: 16 }),
            frameRate: 10,
            repeat: -1
        });
        //coffinSad
        this.anims.create({
            key: 'coffinSadGif',
            frames: this.anims.generateFrameNumbers('coffinSad', { start: 0, end: 11 }),
            frameRate: 10,
            repeat: -1
        });
    }

    updateAudio() {
        if (musicOn === false) {

            this.trololoAudio.stop();
            this.coffinAudio.stop();
        }
        else {
            if (Phaser.Math.Between(0, 100) >= 50) {
                this.trololoAudio.play();
            } else {
                this.coffinAudio.play();
            }
        }
    }

    reaparicionOnline(player) {
        player.alpha = 1;
        this.colP1Plat.active = true;
        this.colPinchosPlayer.active = true;
        this.colll.active = true;
        this.colP1PlatqueSeMueve.active = true;
        this.colBalaLocal.active = true; 
        /*if (player.id == 0) {
            this.colP1Plat.active = true;
            this.colll.active = true;
            this.colP1PlatqueSeMueve.active = true;
            this.colBalaP1.active = true;
        } else {
            this.colP2Plat.active = true;
            this.coll.active = true;
            this.colP2PlatqueSeMueve.active = true;
            this.colBalaP2.active = true;
        }*/
        player.setImmovable(false);
        player.body.setAllowGravity(true);
        let msg = new Object();
        msg.event = 'REAPARICION';
        connection.send(JSON.stringify(msg));
    }

    muerteCaidaOnline() {
        this.pLocalLives--;
        this.colP1Plat.active = false;
        this.colPinchosPlayer.active = false;
        this.colll.active = false;
        this.colP1PlatqueSeMueve.active = false;
        this.colBalaLocal.active = false;
        this.canJumpLocal = false;
        let msg = new Object();
        if (this.pLocalLives > 0) {
            //this.PlayerCaida.active = false;
            this.overlapPLocalWin.active = false;
            this.vidasPLocal[this.pLocalLives].setVisible(false);
            this.playerLocal.alpha = 0.5;
            this.playerLocal.body.setAllowGravity(false);
            this.playerLocal.body.setVelocityY(0);
            this.playerLocal.body.position.y = this.platformGeneradora.body.position.y - 64;
            this.pLocalDeath = true;
            msg.event = 'CAIDA';
            connection.send(JSON.stringify(msg));
            //mandar ws al enemigo para que me reste una vida y eso
        }
        else {
            this.vidasPLocal[0].setVisible(false);
            msg.event = 'VICTORY';
            msg.victoryId = {
                sprite: '',
                name: '',
                fallen:true
                }
            msg.victoryId.sprite = this.keyVidaP2;
            msg.victoryId.name = this.jugadorEnemigo.nombre;
            connection.send(JSON.stringify(msg));
            //this.goToVictory(this.keyVidaP2, this.player2.id);
            //ver si el victory online serviría o no
        }

        /*this.p1Lives--;
        this.colP1Plat.active = false;
        this.colll.active = false;
        this.colP1PlatqueSeMueve.active = false;
        this.colBalaP1.active = false;
        this.canJump1 = false;
        if (this.p1Lives > 0) {
            this.overlapP1Win.active = false;
            this.vidasP1[this.p1Lives].setVisible(false);
            this.player1.alpha = 0.5;
            this.player1.body.setAllowGravity(false);
            this.player1.body.setVelocityY(0);
            this.player1.body.position.y = this.platformGeneradora.body.position.y - 64;
            this.p1Death = true;
        }
        else {
            this.vidasP1[0].setVisible(false);
            this.goToVictory(this.keyVidaP2, this.player2.id);
        }*/
    }

    muerteCaida1() {
        this.p1Lives--;
        this.colP1Plat.active = false;
        this.colll.active = false;
        this.colP1PlatqueSeMueve.active = false;
        this.colBalaP1.active = false;
        this.canJump1 = false;
        if (this.p1Lives > 0) {
            this.overlapP1Win.active = false;
            this.vidasP1[this.p1Lives].setVisible(false);
            this.player1.alpha = 0.5;
            this.player1.body.setAllowGravity(false);
            this.player1.body.setVelocityY(0);
            this.player1.body.position.y = this.platformGeneradora.body.position.y - 64;
            this.p1Death = true;
        }
        else {
            this.vidasP1[0].setVisible(false);
            this.goToVictory(this.keyVidaP2, this.player2.id);
        }
    }

    muerteCaida2() {
        this.p2Lives--;
        this.colP2Plat.active = false;
        this.coll.active = false;
        this.colP2PlatqueSeMueve.active = false;
        this.colBalaP2.active = false;
        this.canJump2 = false;
        if (this.p2Lives > 0) {
            this.overlapP2Win.active = false;
            this.vidasP2[this.p2Lives].setVisible(false);
            this.player2.alpha = 0.5;
            this.player2.body.setAllowGravity(false);
            this.player2.body.setVelocityY(0);
            this.player2.body.position.y = this.platformGeneradora.body.position.y - 64;
            this.p2Death = true;

        }
        else {
            this.vidasP2[0].setVisible(false);
            this.goToVictory(this.keyVidaP1, this.player1.id);
        }

    }
    allowJump() {
        if (this.overlapPLocalWin.active == false) {
            this.overlapPLocalWin.active = true;
        }
        this.canJumpLocal = true;
    }
    allowJump1() {
     /*   if (this.overlapP1Win.active == false) {
            this.overlapP1Win.active = true;
        }*/
        //console.log("Puedes saltar");
        this.canJump1 = true;
    }
    allowJump2() {
        /*if (this.overlapP2Win.active == false) {
            this.overlapP2Win.active = true;
        }*/
        this.canJump2 = true;
    }

    reaparicion(player) {
        player.alpha = 1;
        if (player.id == 0) {
            this.colP1Plat.active = true;
            this.colll.active = true;
            this.colP1PlatqueSeMueve.active = true;
            this.colBalaP1.active = true;
        } else {
            this.colP2Plat.active = true;
            this.coll.active = true;
            this.colP2PlatqueSeMueve.active = true;
            this.colBalaP2.active = true;
        }
        player.setImmovable(false);
        player.body.setAllowGravity(true);
    }

    goToVictory(keyVida, id) {
        if (!this.gameEnded) {
            this.gameEnded = true;
            this.cameras.main.fadeOut(500);
            this.cameras.main.once('camerafadeoutcomplete', function (camera) {
                this.trololoAudio.stop();
                this.coffinAudio.stop();
                connection.close();
                this.scene.start('PlayerVictory', { keyVida: keyVida, player: id });
            }, this);

        }
    }
    goToVictoryOnline(keyVida, id) {
        if (!this.gameEnded) {
            this.gameEnded = true;
            this.cameras.main.fadeOut(500);
            this.cameras.main.once('camerafadeoutcomplete', function (camera) {
                this.trololoAudio.stop();
                this.coffinAudio.stop();
                connection.close();
                this.scene.start('PlayerVictoryOnline', { keyVida: keyVida, player: id });
            }, this);

        }
    }
    destroyPlatforms(){
        this.grupoPlataformasQueRebotan.children.each(function (elem) {            
            this.platformYMin = Math.min(this.platformYMin, elem.y);
            if (elem.y > this.platformCaida.y) {
                this.destruido = true;
                this.altura = elem.body.y - 700;
                elem.destroy();
                //console.log('destruida rebotan');
            }
        }, this);

        this.grupoplataformaCae.children.each(function (elem) {
            this.platformYMin2 = Math.min(this.platformYMin2, elem.y);
            if (elem.y > this.platformCaida.y && !elem.destruido1) {
                this.destruido = true;
                this.altura = elem.body.y - 700;
                if (!elem.destruido1) {
                    this.contadorPlataformasQueCaen = this.contadorPlataformasQueCaen - 1;
                    elem.destroy();
                    //console.log('destruida caen');
                }
            }
        }, this);

        this.platforms.children.each(function (elem) {
            this.platformYMin3 = Math.min(this.platformYMin3, elem.y);
            if (elem.y > this.platformCaida.y) {
                this.altura = elem.body.y - 700;
                this.destruido = true;
                elem.destroy();
                //console.log('destruida normal');
            }
        }, this);
    }

    managePlatforms() {
        this.destruido = false;
        this.altura;
        this.grupoPlataformasQueRebotan.children.each(function (elem) {
            this.platformYMin = Math.min(this.platformYMin, elem.y);
            if (elem.y > this.platformCaida.y) {
                this.destruido = true;
                this.altura = elem.body.y - 700;
                elem.destroy();
            }
        }, this);

        this.grupoplataformaCae.children.each(function (elem) {
            this.platformYMin2 = Math.min(this.platformYMin2, elem.y);
            if (elem.y > this.platformCaida.y && !elem.destruido1) {
                this.destruido = true;
                this.altura = elem.body.y - 700;
                if (!elem.destruido1) {
                    this.contadorPlataformasQueCaen = this.contadorPlataformasQueCaen - 1;
                    elem.destroy();
                }
            }
        }, this);

        this.platforms.children.each(function (elem) {
            this.platformYMin3 = Math.min(this.platformYMin3, elem.y);
            if (elem.y > this.platformCaida.y) {
                this.altura = elem.body.y - 700;
                this.destruido = true;
                elem.destroy();
            }
        }, this);

        if (this.destruido == true && this.altura >= -700) {
            this.platIzq = false;
            this.platDch = false;
            this.generarUnaPlataforma_O_Dos = Phaser.Math.Between(1, 2);
            this.contador = 0;
            do {
                do {
                    this.plat_A_Generar = Phaser.Math.Between(0, 9);
                    this.seHaGeneradoPlat = false;// Varaible de control para saber si he generado una plataforma, he tenido que añadir esto
                    // pq si ya hubiera dos plataformas que se caen y saliera 4 en el numero aleatorio no se generaria ninguna plataforma
                    if (this.plat_A_Generar <= 5) {
                        if (this.platIzq == false) {
                            this.platIzq = true;
                            this.generarPlataformasQueRebotan(Phaser.Math.Between(150, 300), this.altura, 200);
                        }
                        else {
                            this.platDch = true;
                            this.generarPlataformasQueRebotan(Phaser.Math.Between(450, 650), this.altura, 200);
                        }
                        this.contador = this.contador + 1;
                        this.seHaGeneradoPlat = true;
                    }
                    else if ((this.plat_A_Generar >= 6 || this.plat_A_Generar <= 8) && this.contadorPlataformasQueCaen < 2 && this.platIzq == true) {
                        this.contador = this.contador + 1;

                        this.platDch = true;
                        this.generarPlataformasQueRebotanYcaen(Phaser.Math.Between(450, 650), this.altura, 200);

                        this.contadorPlataformasQueCaen = this.contadorPlataformasQueCaen + 1;
                        this.seHaGeneradoPlat = true;
                    }
                    else {
                        this.contador = this.contador + 1;
                        if (this.platIzq == false) {
                            this.platIzq = true;
                            this.generarPlatEstatica(Phaser.Math.Between(150, 300), this.altura);
                        }
                        else {
                            this.platDch = true;
                            this.generarPlatEstatica(Phaser.Math.Between(450, 650), this.altura);
                        }
                        this.seHaGeneradoPlat = true;
                    }
                } while (this.seHaGeneradoPlat == false);
            } while (this.platDch == false && this.contador < this.generarUnaPlataforma_O_Dos);
        }
    }
    metodoGetJugadores() {
        
        if(this.connectionLost){
            return;
        }
        $.ajax({
            url: 'https'+ urlOnline + 'chat/jugador'

        }).done(function (data) {
            this.badConect=true;
            if (!this.scene.isActive('GameSceneApi')) {
                return;
            }
            if (data[0] == null) {
                this.estadoJugadores.setText('Player 1: Disconnected');
                this.timer2.paused = true;
                if(!this.sceneChanged){
                this.sceneChanged = true;
                this.trololoAudio.stop();
                this.coffinAudio.stop();
                connection.close();
                this.scene.start('Notificaciones', { valor: 2 });
                }
            }
            else {
                if(data[0].nombre == this.jugador.nombre){
                    this.badConect = false;
                }
                this.estadoJugadores.setText('[P1] '+data[0].nombre + ': Online');
            }
            if (data[1] == null) {
                this.estadoJugadores2.setText('Player 2: Disconnected');
                this.timer2.paused = true;
                if(!this.sceneChanged){
                this.sceneChanged = true;
                this.trololoAudio.stop();
                this.coffinAudio.stop();
                connection.close();
                this.scene.start('Notificaciones', { valor: 2 });
                }
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
                    this.trololoAudio.stop();
                    this.coffinAudio.stop();
                    connection.close();
                    this.scene.start('Notificaciones',{ valor: 1});
                }else if(!this.sceneChanged){
                    this.sceneChanged = true;
                    this.trololoAudio.stop();
                    this.coffinAudio.stop();
                    connection.close();
                    this.scene.start('Notificaciones',{ valor: 3});
                }
            }
        }.bind(this)).fail(function(){
            this.connectionLost = true;
            this.timer1.paused = true;            
            this.timer3.paused = true;
        }.bind(this))
    }

    metodoEstadoJug() {
        if(this.connectionLost){
            return;
        }
        $.ajax({
            method: 'POST',
            url: 'https'+ urlOnline + 'chat/jugador/estado',
            data: JSON.stringify(this.jugador),
            processData: false,
            headers: {
                "Content-Type": "application/json"
            }
        }, this).done(function (dat) {

            if (!this.scene.isActive('GameSceneApi')) {
                return;
            }
        }.bind(this)).fail(function(){
            this.connectionLost = true;
            this.timer3.paused=true;            
            this.timer1.paused = true;
        }.bind(this))
    }
    metodoGet() {
        $.ajax({
            url: 'https'+ urlOnline + 'chat'
        }).done(function (data) {

            if (!this.scene.isActive('GameSceneApi')) {
                return;
            }
            //this.estadoServidor.setText('Servidor: Conectado')
        }.bind(this)).fail(function (data) {
            if(this.scene.isActive('GameSceneApi')){                
              //this.estadoServidor.setText('Servidor: No disponible');                
            }
            this.connectionLost = true;
            this.timer2.paused = true;            
        }.bind(this))
    }

    metodoGenerarUnMapa(randNumber){
        randNumber = 0;
    switch(randNumber){
        // 2350
        // this.generarPlataformasQueRebotan(Phaser.Math.Between(150, 300), this.altura, 200);
        // this.generarPlataformasQueRebotanYcaen(Phaser.Math.Between(450, 650), this.altura, 200);
        // this.platforms.create(300, 2350, 'platform');
        case 0:
                this.generarPlataformasQueRebotan(500,2250,200);
                this.generarPlataformasQueRebotan(350,2150,200);
                this.generarPlataformasQueRebotanYcaen(450, 2050, 200);
                this.platforms.create(300, 1950, 'platform');
                this.generarPlataformasQueRebotan(650,1950,200);
                this.platforms.create(400, 1850, 'platform');
                //this.generarPlataformasQueRebotanYcaen(150,1750, 200);
                this.platformsPinchos.create(150, 1750, 'platformPinchos');
                this.generarPlataformasQueRebotan(600,1750,200);
                this.platforms.create(350, 1650, 'platform');
                this.generarPlataformasQueRebotan(600,1550,200);
                this.platforms.create(150, 1450, 'platform');
                this.platforms.create(450, 1450, 'platform');
                this.generarPlataformasQueRebotanYcaen(200, 1350, 200);
                this.generarPlataformasQueRebotanYcaen(450, 1350, 200);
                this.generarPlataformasQueRebotan(200,1250,200);
                this.platforms.create(450, 1150, 'platform');
                this.generarPlataformasQueRebotanYcaen(500, 1050, 200);
                this.generarPlataformasQueRebotan(150,1050,200);
                this.generarPlataformasQueRebotan(300,950,200);
                this.generarPlataformasQueRebotan(500,950,200);
                this.generarPlataformasQueRebotan(200,850,200);
                this.platforms.create(250, 750, 'platform');
                this.generarPlataformasQueRebotanYcaen(500, 750, 200);
                this.platforms.create(150, 650, 'platform');
                this.platforms.create(500, 650, 'platform');
                this.generarPlataformasQueRebotan(200,550,200);
                this.generarPlataformasQueRebotan(550,550,200);
                this.generarPlataformasQueRebotanYcaen(200, 450, 200);
                this.generarPlataformasQueRebotanYcaen(500, 450, 200);
                //this.generarPlataformasQueRebotanYcaen(180, 350, 200);
                this.platforms.create(470, 350, 'platform');
                this.generarPlataformasQueRebotan(300,250,200);
                this.generarPlataformasQueRebotan(150,150,200);
                this.platforms.create(500, 150, 'platform');
                this.generarPlataformasQueRebotanYcaen(200, 50, 200);
                this.platforms.create(550, 50, 'platform');
                this.generarPlataformasQueRebotan(200,-50,200);
                this.generarPlataformasQueRebotan(470,-50,200);
                this.platforms.create(470, -150, 'platform');
                this.platforms.create(170, -150, 'platform');
                this.generarPlataformasQueRebotan(200,-250,200);
                this.platforms.create(190, -350, 'platform');
                this.generarPlataformasQueRebotan(500,-350,200);
                this.generarPlataformasQueRebotanYcaen(200, -450, 200);
                this.platforms.create(490, -450, 'platform');
                this.generarPlataformasQueRebotan(500,-550,200);
                this.platforms.create(359, -650, 'platform');            
            break;
            
            case 1:
                this.generarPlataformasQueRebotan(500,2250,200);
                this.generarPlataformasQueRebotanYcaen(200, 2250, 200);
                this.generarPlataformasQueRebotan(300,2150,300);
                this.platforms.create(280, 2050, 'platform');
                this.generarPlataformasQueRebotanYcaen(500, 2050, 200);
                this.generarPlataformasQueRebotan(180,1950,200);
                this.generarPlataformasQueRebotan(470,1950,200);                
                this.generarPlataformasQueRebotanYcaen(230, 1850, 200);
                this.generarPlataformasQueRebotanYcaen(500, 1850, 200);
                this.generarPlataformasQueRebotan(359,1750,300);
                this.generarPlataformasQueRebotan(230,1650,200);
                this.platforms.create(450, 1650, 'platform');
                this.platforms.create(170, 1550, 'platform');
                this.platforms.create(460, 1550, 'platform');
                this.generarPlataformasQueRebotan(170,1450,300);
                this.generarPlataformasQueRebotanYcaen(500, 1450, 200);
                this.generarPlataformasQueRebotan(230,1350,300);
                this.generarPlataformasQueRebotanYcaen(570, 1350, 200);
                this.generarPlataformasQueRebotan(300,1250,300);
                this.platforms.create(460, 1150, 'platform');
                this.platforms.create(160, 1150, 'platform');
                this.generarPlataformasQueRebotanYcaen(270, 1050, 200);
                this.generarPlataformasQueRebotanYcaen(590, 1050, 200);
                this.generarPlataformasQueRebotan(230,950,200);
                this.generarPlataformasQueRebotan(540,950,200);
                this.platforms.create(230, 850, 'platform');
                this.generarPlataformasQueRebotanYcaen(550, 850, 200);
                this.platforms.create(340, 750, 'platform');
                this.generarPlataformasQueRebotan(490,650,200);
                this.generarPlataformasQueRebotan(210,650,200);
                this.generarPlataformasQueRebotan(200,550,200);
                this.generarPlataformasQueRebotanYcaen(550, 550, 200);
                this.generarPlataformasQueRebotan(200,450,300);
                this.platforms.create(300, 350, 'platform');
                this.generarPlataformasQueRebotan(500,350,300);
                this.generarPlataformasQueRebotanYcaen(200, 250, 200);
                this.platforms.create(470, 250, 'platform');
                this.generarPlataformasQueRebotanYcaen(300, 150, 200);
                this.generarPlataformasQueRebotanYcaen(470, 150, 200);
                this.platforms.create(500, 50, 'platform');
                this.generarPlataformasQueRebotan(200,50,200);
                this.generarPlataformasQueRebotan(510,-50,200);
                this.generarPlataformasQueRebotan(290,-50,200);
                this.generarPlataformasQueRebotan(180,-150,200);
                this.generarPlataformasQueRebotanYcaen(470, -150, 200);
                this.platforms.create(500, -250, 'platform');
                this.platforms.create(190, -250, 'platform');
                this.generarPlataformasQueRebotan(290,-350,300);
                this.generarPlataformasQueRebotan(210,-450,200);
                this.generarPlataformasQueRebotan(490,-450,200);
                this.platforms.create(200, -550, 'platform');
                this.platforms.create(240, -650, 'platform');
                break;                
            case 2:
                    this.generarPlataformasQueRebotan(500,2250,200); 
                    this.platforms.create(240, 2250, 'platform');
                    this.generarPlataformasQueRebotanYcaen(150,2150, 200);
                    this.platforms.create(470, 2150, 'platform');
                    this.generarPlataformasQueRebotan(500,2050,200);
                    this.generarPlataformasQueRebotan(230,2050,200);
                    this.platforms.create(460, 1950, 'platform');
                    this.generarPlataformasQueRebotan(490,1850,200);
                    this.generarPlataformasQueRebotan(230,1850,200);
                    this.generarPlataformasQueRebotanYcaen(250,1750, 200);
                    this.generarPlataformasQueRebotanYcaen(450,1750, 200);
                    this.generarPlataformasQueRebotan(490,1650,200);
                    this.platforms.create(210,1650,'platform');
                    this.generarPlataformasQueRebotan(500,1550,300);
                    this.generarPlataformasQueRebotanYcaen(470,1450, 200);
                    this.platforms.create(230, 1450, 'platform');
                    this.generarPlataformasQueRebotan(500,1350,300);
                    this.generarPlataformasQueRebotanYcaen(200,1350, 200);
                    this.generarPlataformasQueRebotanYcaen(500,1250, 200);
                    this.generarPlataformasQueRebotanYcaen(270,1250, 200);
                    this.platforms.create(450, 1150, 'platform');
                    this.platforms.create(290, 1050, 'platform');
                    this.platforms.create(600, 1050, 'platform');
                    this.generarPlataformasQueRebotan(500,950,300);
                    this.generarPlataformasQueRebotan(500,850,200);
                    this.generarPlataformasQueRebotan(180,850,200);
                    this.generarPlataformasQueRebotan(500,750,200);
                    this.platforms.create(220, 750, 'platform');
                    this.generarPlataformasQueRebotan(270,650,200);
                    this.generarPlataformasQueRebotanYcaen(490,650, 200);
                    this.generarPlataformasQueRebotanYcaen(160,550, 200);
                    this.platforms.create(490, 550, 'platform');
                    this.generarPlataformasQueRebotan(300,450,200);
                    this.generarPlataformasQueRebotan(490,450,200);
                    this.platforms.create(490, 350, 'platform');
                    this.generarPlataformasQueRebotan(250,250,200);
                    this.generarPlataformasQueRebotan(570,250,200);
                    this.generarPlataformasQueRebotan(450,150,200);
                    this.platforms.create(170, 150, 'platform');
                    this.generarPlataformasQueRebotanYcaen(370,50, 200);
                    this.generarPlataformasQueRebotanYcaen(100,50, 200);
                    this.generarPlataformasQueRebotan(450,-50,200);
                    this.platforms.create(210, -50, 'platform');
                    this.generarPlataformasQueRebotanYcaen(200,-150, 200);
                    this.generarPlataformasQueRebotan(450,-150,200);
                    this.generarPlataformasQueRebotan(450,-250,200);
                    this.generarPlataformasQueRebotan(150,-250,200);
                    this.generarPlataformasQueRebotan(300,-350,300);
                    this.platforms.create(200, -450, 'platform');
                    this.platforms.create(400, -450, 'platform');
                    this.platforms.create(330, -550, 'platform');
                    this.platforms.create(310, -650, 'platform');
                    break;
    }
    this.startScroll = true;
    }
}