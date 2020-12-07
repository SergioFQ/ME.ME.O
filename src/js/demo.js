class DemoScene extends Phaser.Scene
{
    constructor()//para poder llamar a la escena desde otras escenas
    {
        super('DemoScene');
    }

    preload()
    {
        this.load.image('sky','../resources/img/sky.png');
        this.load.image('platform','../resources/img/Plataformas/Plataforma Buena (150x32).png');
        this.load.image('platformDislike','../resources/img/Plataformas/Plataforma Mala (150x32).png');
        this.load.image('platformCaida','../resources/img/platformCaida.png');

        this.load.image('bomb','../resources/img/bomb.png');// ESTE ASSET SERA CAMBIADO POR UNA BALA AHORA SE USA DE TESTEO
        this.load.image('mamado','../resources/img/ez.PNG');
        this.load.image('pepesad','../resources/img/PEPESAD.PNG');
        this.load.spritesheet('dude','../resources/img/dude.png',
        { frameWidth:32, frameHeight: 48});

        this.load.spritesheet('dude2','../resources/img/dude2.png',
        { frameWidth:32, frameHeight: 48});


        this.load.image('fondoVida','../resources/img/fondo vidas.png');//fondo auxiliar hasta que se tenga un fondo mejor
        this.load.image('vidasPrueba','../resources/img/vida.png');//imagen auxiliar de las vidas

        this.load.image('metaTest','../resources/img/metaProvisional.png');


    }

    create()
    {
        this.add.image(400,2700,'sky');
        this.platforms = this.physics.add.staticGroup();
        
        this.platforms.create(400,2968,'platform').setScale(2).refreshBody();
        this.platforms.create(300,2850,'platform');
        this.platforms.create(450,2750,'platform');
        this.platforms.create(500,2650,'platform');
        this.platforms.create(420,2550,'platform');        
        this.platforms.create(420,2450,'platform');        
        this.platforms.create(300,2350,'platform');
        this.player1 = this.physics.add.sprite(400,2900,'dude');
        
        this.player1.setBounce(0);
        this.player1.setCollideWorldBounds(true);
        this.player1.depth=10;//profundidad para aparecer siempre por delante de todo
        this.player1.id = 0;
        this.player2 = this.physics.add.sprite(400,2900,'dude2');
        this.player2.setBounce(0);
        this.player2.setCollideWorldBounds(true);
        this.player2.depth=10;//profundidad para aparecer siempre por delante de todo
        this.player2.id = 1;
        this.createAnimations();

        this.colP1Plat = this.physics.add.collider(this.player1, this.platforms, this.allowJump1, null, this);
        this.colP2Plat = this.physics.add.collider(this.player2, this.platforms, this.allowJump2, null, this);

        this.player1Controls = this.input.keyboard.addKeys('W,A,D');
        this.player2Controls = this.input.keyboard.addKeys('UP,LEFT,RIGHT');
        this.canJump1 = true;
        this.canJump2 = true;
        this.camera = this.cameras.main;//camara de la escena
        this.camera.setScroll(0,2400);//posición inicial de la cámara (podría cambiar)
        this.platformCaida = this.physics.add.sprite(400,3050,'platformCaida').setScale(2).refreshBody().setVisible(false);//plataforma que irá debajo de la camara y matara a los jugadores        
        this.platformCaida.body.setAllowGravity(false);//quitamos la gravedad de la plataforma de caida
        this.platformGeneradora = this.physics.add.sprite(400,2350,'platformCaida').setScale(2).refreshBody().setVisible(false);//plataforma que irá encima de la camara para ir realizando 
                                                                                                             //calculos de como generar el resto de plataformas.
        this.platformGeneradora.body.setAllowGravity(false);
        this.overlapP1Caida = this.physics.add.overlap(this.player1, this.platformCaida, this.muerteCaida1, null, this);//la muerte por caida
        this.overlapP2Caida = this.physics.add.overlap(this.player2, this.platformCaida, this.muerteCaida2, null, this);//la muerte por caida


        this.grupo_balas= this.add.group();// Este grupo lo usare para recorrer todas mis balas de la escena, IMPORTANTE NO LE PONGO FÍSICAS AL GRUPO
       
        this.golpeado=false;
        this.saberPorQueLadoLeHanGolpeado=0;// 0 izq y 1 derecha
        this.tiempo=0;
        this.fin=0;

        this.golpeado2=false;
        this.saberPorQueLadoLeHanGolpeado2=0;// 0 izq y 1 derecha
        this.tiempo2=0;
        this.fin2=0;
       
        this.colBalaP1 = this.physics.add.overlap(this.grupo_balas,this.player1, this.chocarTrue,null,this);
        this.colBalaP2 = this.physics.add.overlap(this.grupo_balas,this.player2, this.chocarTrue2,null,this);
    
        this.MedirCuandoHacerBala=1;
        this.MedirCuandoHacerBala2=1;  
        
        this.grupoPlataformasQueRebotan=this.add.group();//Grupo donde meto todas las plataformas que rebotan

        this.colll=  this.physics.add.collider(this.grupoPlataformasQueRebotan,this.player1,function(grupo,player){// Variable donde guardo las colisiones de las plataformas
        // que rebotan con el jugador1
        this.allowJump1();
        player.body.velocity.x=0;
        grupo.body.setFrictionX(2);
        },null,this);
 
        this.coll=  this.physics.add.collider(this.grupoPlataformasQueRebotan,this.player2,function(grupo,player){// Variable donde guardo las colisiones de las plataformas
        // que rebotan con el jugador2 
        this.allowJump2();
        player.body.velocity.x=0;
        grupo.body.setFrictionX(2);
        },null,this);

        //Emoticonos
        this.jugador1_a_emoteado=0;
        this.jugador1_quitar_emote=0;
        this.player1_emotes = this.input.keyboard.addKeys('T,U');
        this.emote_jug1;
        this.i=0;

        this.jugador2_a_emoteado=0;
        this.jugador2_quitar_emote=0;
        this.player2_emotes = this.input.keyboard.addKeys('B,M');
        this.emote_jug2;
        this.i2=0;


        this.p1Lives = this.p2Lives = 3;
        this.p1Death = this.p2Death = false;
        this.p1Scroll = this.p2Scroll = false; 

        this.fondoVidaP1 = this.add.image(100,50,'fondoVida').setScrollFactor(0,0);
        this.fondoVidaP1.depth=7;
        this.fondoVidaP2 = this.add.image((config.width)-100,50,'fondoVida').setScrollFactor(0,0);
        this.fondoVidaP2.depth=7;

        this.vidasP1 = new Array();
        this.vidasP1[0] = this.add.image(this.fondoVidaP1.x-35,this.fondoVidaP1.y,'vidasPrueba').setScrollFactor(0,0);//cuando los menus esten, poner key dependiendo del personajes y que seea la cara la que aparezca, hasta entonces, cuadrado morados
        this.vidasP1[0].depth = 9;
        this.vidasP1[1] = this.add.image(this.fondoVidaP1.x,this.fondoVidaP1.y,'vidasPrueba').setScrollFactor(0,0);
        this.vidasP1[1].depth = 9;
        this.vidasP1[2] = this.add.image(this.fondoVidaP1.x+35,this.fondoVidaP1.y,'vidasPrueba').setScrollFactor(0,0);
        this.vidasP1[2].depth = 9;

        this.vidasP2 = new Array();
        this.vidasP2[0] = this.add.image(this.fondoVidaP2.x-35,this.fondoVidaP2.y,'vidasPrueba').setScrollFactor(0,0);
        this.vidasP2[0].depth = 9;
        this.vidasP2[1] = this.add.image(this.fondoVidaP2.x,this.fondoVidaP2.y,'vidasPrueba').setScrollFactor(0,0);
        this.vidasP2[1].depth = 9;
        this.vidasP2[2] = this.add.image(this.fondoVidaP2.x+35,this.fondoVidaP2.y,'vidasPrueba').setScrollFactor(0,0);
        this.vidasP2[2].depth = 9;
      


        this.grupoplataformaCae=this.add.group();

        this.colPlats_QueseMueven_Y_QueSeCaen= this.physics.add.collider(this.grupoPlataformasQueRebotan,this.grupoplataformaCae,function(plat1,plat2){
         plat1.body.velocity.x=plat1.body.velocity.x*(-1);
         plat2.body.velocity.x=plat2.body.velocity.x*(-1);
     });// Variable donde guardo las colisiones de las plataformas
        this.colPlats_QueseMueven_Y_QueSeMueven=this.physics.add.collider(this.grupoPlataformasQueRebotan,this.grupoPlataformasQueRebotan,function(plat1,plat2){
        plat1.body.velocity.x=plat1.body.velocity.x*(-1);
    });

        this.colPlats_QueseMueven_Y_QueNoSeMueven= this.physics.add.collider(this.grupoPlataformasQueRebotan,this.platforms,function(plat1,plat2){
        plat1.body.velocity.x=plat1.body.velocity.x*(-1);
        
    });

        this.colPlats_QueSeCaen_Y_QueSeCaen=this.physics.add.collider(this.grupoplataformaCae,this.grupoplataformaCae,function(plat1,plat2){
        plat1.body.velocity.x=plat1.body.velocity.x*(-1);
    });
        this.colPlats_QueseMueven_Y_QueNoSeMueven=this.physics.add.collider(this.grupoplataformaCae,this.platforms,function(plat1,plat2){
        plat1.body.velocity.x=plat1.body.velocity.x*(-1);
    });


        this.colP1PlatqueSeMueve= this.physics.add.collider(this.grupoplataformaCae,this.player1, this.tirarPlat,null,this);
        this.colP2PlatqueSeMueve= this.physics.add.collider(this.grupoplataformaCae,this.player2, this.tirarPlat,null,this);

        this.contadorPlataformasQueCaen=0;//Se usa para saber cunatas plataformas hay que caen en el pool de plataformas y asi  evitar que haya demasiado de este tipo  
        this.alturaBala=Phaser.Math.Between(0,100);
        this.alturaBala_Aux;
        if(this.alturaBala<=20){
            this.alturaBala_Aux=2285;
        }
        else if(this.alturaBala>20&&this.alturaBala<=40){
            this.alturaBala_Aux=2175;
        }
        else if(this.alturaBala>40&&this.alturaBala<=60){
            this.alturaBala_Aux=1975;
        }
        else if(this.alturaBala>60&&this.alturaBala<=80){
            this.alturaBala_Aux=1775;
        }
        else{
            this.alturaBala_Aux=1575;
        }

        this.timedEvent = this.time.addEvent({ delay: 2000, callback: this.generarBalasEnUnSitio, args:[40,this.alturaBala_Aux,300],callbackScope: this, loop: true });
        this.timedEvent2 = this.time.addEvent({ delay: 2000, callback: this.generarBalasEnUnSitio, args:[760,this.alturaBala_Aux-500,-300],callbackScope: this, loop: true });
        this.timedEvent3 = this.time.addEvent({ delay: 2000, callback: this.generarBalasEnUnSitio, args:[40,this.alturaBala_Aux-1000,300],callbackScope: this, loop: true });
        this.timedEvent4 = this.time.addEvent({ delay: 2000, callback: this.generarBalasEnUnSitio, args:[40,this.alturaBala_Aux-1525,300],callbackScope: this, loop: true });
        this.timedEvent5 = this.time.addEvent({ delay: 2000, callback: this.generarBalasEnUnSitio, args:[40,this.alturaBala_Aux-2025,300],callbackScope: this, loop: true });
        
        this.meta = this.physics.add.staticGroup();
        this.meta.create(400,-800,'metaTest').setScale(3).refreshBody();
        this.overlapP1Win = this.physics.add.overlap(this.player1, this.meta, function(){
            console.log("Gana el jugador 1");
        });
        this.overlapP2Win = this.physics.add.overlap(this.player2, this.meta, function() {
            console.log("Gana el jugador 2");
        });

        this.canJump1 = true;
        this.canJump2 = true;
    }

    generarPlatEstatica(posX,posY){
        this.platforms.create(posX,posY,'platform');
    }

      tirarPlat(plat,jug){  
          if(jug.id==0){
            this.allowJump1();
          }else{
              this.allowJump2();
          }
          if(plat.body.velocity.x!=0){// SIGNIFICA QUE SOLO ENTRO EN CASO DE QUE SEA LA PRIMERA VEZ QUE SE PISA
        plat.setVelocity(0,0);
        plat.destruido1=true;
        this.time.delayedCall(2000, this.auxiliar,[plat],this);
          }
        }
        auxiliar(pla){
            pla.setVelocity(0,300);
            pla.body.setImmovable(false);          
             this.grupoplataformaCae.remove(pla);
             this.contadorPlataformasQueCaen= this.contadorPlataformasQueCaen-1;
             this.time.delayedCall(3000, this.destruirPlataforma,[pla], this); 
            
        }
        destruirPlataforma(plat){
            plat.destroy();
        }

    generarBalasEnUnSitio(possX,possY,sentidoYvelocidad){
            this.bal=this.physics.add.sprite(possX,possY,'bomb');
            this.bal.body.setAllowGravity(false);
            this.bal.setVelocity(sentidoYvelocidad,0);
            this.grupo_balas.add(this.bal);
    }
    generarPlataformasQueRebotanYcaen(possX,possY,velocidad){
        this.plataforma11=this.physics.add.sprite(possX,possY,'platformDislike');
        this.plataforma11.body.setAllowGravity(false);
        this.plataforma11.setVelocity(velocidad,0);
        this.plataforma11.setCollideWorldBounds(10,true,false);
        this.plataforma11.setBounce(1);
        this.grupoplataformaCae.add(this.plataforma11);
        this.plataforma11.body.setImmovable(true);
        this.plataforma11.destruido1=false;
      
    }

    generarPlataformasQueRebotan(possX,possY,velocidad){
        this.plataforma1=this.physics.add.sprite(possX,possY,'platform');
        this.plataforma1.body.setAllowGravity(false);
        this.plataforma1.body.setImmovable(true);
        this.plataforma1.setVelocity(velocidad,0);
        this.plataforma1.setCollideWorldBounds(true);
        this.plataforma1.setBounce(1);
        this.grupoPlataformasQueRebotan.add(this.plataforma1);
    }
    
  
    destruirBalasFueraDelMapa(gb){// FUNCION QUE DESTRUYE LAS BALAS QUE SE SALEN DEL MAPA PARA NO SOBRECARGAR EL JUEGO
        for(var j=0;j<gb.getChildren().length;j++){
            if(gb.getChildren()[j].x>config.width-30||gb.getChildren()[j].x<30){
                 gb.getChildren()[j].destroy();
             }
            }
        }

    update(time,delta)
    {
        //Player1 control
    if(this.golpeado==true){

         this.tiempo=time;
         this.fin=this.tiempo+30;
         this.golpeado=false;
     }
        if(this.tiempo!=this.fin){          
            this.tiempo= this.tiempo+1;
            if(this.saberPorQueLadoLeHanGolpeado==1){// ME HAN PEGADO POR LA DERECHA
            this.player1.setVelocityX(-250);
            }
            else{// ME HAN PEGADO POR LA IZQUIERDA            
                this.player1.setVelocityX(250);
            }
        }
         else if(this.player1Controls.A.isDown)
        {
            this.player1.setVelocityX(-160);
            this.player1.anims.play('left',true);
        }
        else if(this.player1Controls.D.isDown)
        {
            this.player1.setVelocityX(160);
            this.player1.anims.play('right',true);
        }
       else
        {
            this.player1.setVelocityX(0);
            this.player1.anims.play('iddle');
        }

        if(this.player1Controls.W.isDown && this.canJump1)
        {
            this.canJump1 = false;
            this.player1.setVelocityY(-400);
        }

        if(this.player1.body.velocity.y > 1)//cayendo
        {
            this.colP1Plat.active = true;
            this.colll.active=true;
            this.colP1PlatqueSeMueve.active=true;

        }else//saltando
        {
            this.colP1Plat.active = false;            
            this.colll.active=false;
            this.colP1PlatqueSeMueve.active=false;

        }

        //Player2 control

        if(this.golpeado2==true){
            this.tiempo2=time;
            this.fin2=this.tiempo2+30;
            this.golpeado2=false;           
        }
        if(this.tiempo2!=this.fin2){          
            this.tiempo2= this.tiempo2+1;
            if(this.saberPorQueLadoLeHanGolpeado2==1){// ME HAN PEGADO POR LA DERECHA
            this.player2.setVelocityX(-250);
            }
            else{// ME HAN PEGADO POR LA IZQUIERDA            
                this.player2.setVelocityX(250);
            }
        }

        else if(this.player2Controls.LEFT.isDown)
        {
            this.player2.setVelocityX(-160);
            this.player2.anims.play('left2',true);
        }
        else if(this.player2Controls.RIGHT.isDown)
        {
            this.player2.setVelocityX(160);
            this.player2.anims.play('right2',true);
        }
        else
        {
            this.player2.setVelocityX(0);
            this.player2.anims.play('iddle2');
        }

        if(this.player2Controls.UP.isDown && this.canJump2)
        {
            this.canJump2 = false;
            this.player2.setVelocityY(-400);
        }

        if(this.player2.body.velocity.y > 1)//cayendo
        {
            this.colP2Plat.active = true;
            this.coll.active=true;
            this.colP2PlatqueSeMueve.active=true;

        }else//saltando
        {
            this.colP2Plat.active = false; 
            this.coll.active=false;
            this.colP2PlatqueSeMueve.active=false;
        }
      if(this.camera.scrollY>-1000)//ponemos un tope cualquiera al scroll de la camara // CON ESTO SE MUEVO
        {      
            this.platformCaida.setVelocity(0,-60*(delta/15));
            this.platformGeneradora.setVelocity(0,-60*(delta/15));
            this.camera.scrollY-=1*(delta/15);
        }else
        {
            this.platformCaida.setVelocity(0,0);// PLATAFORMA QUE MATA
            this.platformGeneradora.setVelocity(0,0);
        }

       this.managePlatforms();
    

       this.destruirBalasFueraDelMapa(this.grupo_balas);
       if(this.player1_emotes.T.isUp==false&&this.i==0){
        this.jugador1_a_emoteado=time;
        this.jugador1_quitar_emote=time+200;
        this.emote_jug1=this.add.sprite(this.player1.x,this.player1.y+20,'mamado');
        this.emote_jug1.depth=10;
        this.i=1;
       }
       else if(this.player1_emotes.U.isUp==false&&this.i==0){
        this.jugador1_a_emoteado=time;
        this.jugador1_quitar_emote=time+200;
        this.emote_jug1=this.add.sprite(this.player1.x,this.player1.y+20,'pepesad');
        this.emote_jug1.depth=10;
        this.i=1;
       }

       if(this.jugador1_a_emoteado != this.jugador1_quitar_emote){
        this.jugador1_a_emoteado=this.jugador1_a_emoteado+1;
        this.emote_jug1.x=this.player1.x;
        this.emote_jug1.y=this.player1.y-20;
        if(  this.jugador1_a_emoteado==this.jugador1_quitar_emote){
        this.emote_jug1.destroy();
        this.i=0;
        }       
        
       }

       if(this.player2_emotes.B.isUp==false&&this.i2==0){
        this.jugador2_a_emoteado=time;
        this.jugador2_quitar_emote=time+200;
        this.emote_jug2=this.add.sprite(this.player1.x,this.player1.y+20,'mamado');
        this.emote_jug2.depth=10;
        this.i2=1;
       }
       else if(this.player2_emotes.M.isUp==false&&this.i2==0){
        this.jugador2_a_emoteado=time;
        this.jugador2_quitar_emote=time+200;
        this.emote_jug2=this.add.sprite(this.player1.x,this.player1.y+20,'pepesad');
        this.emote_jug2.depth=10;
        this.i2=1;
       }

       if(this.jugador2_a_emoteado != this.jugador2_quitar_emote){
        this.jugador2_a_emoteado=this.jugador2_a_emoteado+1;
        this.emote_jug2.x=this.player2.x;
        this.emote_jug2.y=this.player2.y-20;
        if(  this.jugador2_a_emoteado==this.jugador2_quitar_emote){
        this.emote_jug2.destroy();
        this.i2=0;
        }
       }
       //Reapariciones Player1
       if(this.p1Death)
       {  
        this.p1Death = false;
        this.cameraScroll1 = this.camera.scrollY;
        this.p1Scroll = true;      
       }

       if((this.p1Scroll) && ((this.camera.scrollY<=(this.cameraScroll1-250)||this.camera.scrollY<=-1000)))
       {
        this.reaparicion(this.player1);
        this.p1Scroll = false;
       }

       //Reapariciones Player2
       if(this.p2Death)
       {  
        this.p2Death = false;
        this.cameraScroll2 = this.camera.scrollY;
        this.p2Scroll = true;      
       }

       if((this.p2Scroll) && ((this.camera.scrollY<=(this.cameraScroll2-250)||this.camera.scrollY<=-1000)))
       {
        this.reaparicion(this.player2);
        this.p2Scroll = false;
       }
    }

    chocarTrue(gpp,jug){
        this.s=gpp.body.x;
        this.golpeado=true;

        if(this.s<jug.x){           
            this.saberPorQueLadoLeHanGolpeado=0;
        }
       else{
            this.saberPorQueLadoLeHanGolpeado=1;
       }
        gpp.destroy();
    }
    chocarTrue2(gpp,jug){
        this.s=gpp.body.x;
        this.golpeado2=true;

        if(this.s<jug.x){           
            this.saberPorQueLadoLeHanGolpeado2=0;
        }
       else{
            this.saberPorQueLadoLeHanGolpeado2=1;
       }
        gpp.destroy();
    }
    createAnimations()
    {
        //Animaciones Player1
           this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', {start:0, 
                end:3}),
                frameRate: 10,
                repeat: -1
            });
            this.anims.create({
            key: 'iddle',
            frames: [{key: 'dude', frame: 4}],
            frameRate: 20
            });
            this.anims.create({
            key:'right',
            frames: this.anims.generateFrameNumbers('dude', {start: 5, end: 8}),
            frameRate: 10,
            repeat: -1
            });
        //Animaciones Player2
            this.anims.create({
            key: 'left2',
            frames: this.anims.generateFrameNumbers('dude2', {start:0, 
                end:3}),
                frameRate: 10,
                repeat: -1
            });
            this.anims.create({
            key: 'iddle2',
            frames: [{key: 'dude2', frame: 4}],
            frameRate: 20
            });
            this.anims.create({
            key:'right2',
            frames: this.anims.generateFrameNumbers('dude2', {start: 5, end: 8}),
            frameRate: 10,
            repeat: -1
            });
    }

    muerteCaida1() 
    {
        this.p1Lives--;
        this.colP1Plat.active = false;
        this.colll.active = false;
        this.colP1PlatqueSeMueve.active = false;
        this.colBalaP1.active = false;
        if(this.p1Lives>0)
        {
            this.vidasP1[this.p1Lives].setVisible(false);
            this.player1.alpha = 0.5;
            this.player1.body.setAllowGravity(false);
            this.player1.body.setVelocityY(0);
            this.player1.body.position.y = this.platformGeneradora.body.position.y-64;
            this.p1Death = true;
        }
        else
        {
            this.vidasP1[0].setVisible(false);
            //cambiar de escena 
        }
    }
    muerteCaida2() 
    {
        this.p2Lives--;
        this.colP2Plat.active = false;
        this.coll.active = false;
        this.colP2PlatqueSeMueve.active = false;
        this.colBalaP2.active = false;

        if(this.p2Lives>0)
        {
            this.vidasP2[this.p2Lives].setVisible(false);
            this.player2.alpha = 0.5;
            this.player2.body.setAllowGravity(false);            
            this.player2.body.setVelocityY(0);
            this.player2.body.position.y = this.platformGeneradora.body.position.y-64;
            this.p2Death = true;
           
        }
        else
        {
            this.vidasP2[0].setVisible(false);
            //cambiar de escena 
        }

    }
    allowJump1()
    {
        this.canJump1 = true;
    }
    allowJump2()
    {
        this.canJump2 = true;
    }    

    reaparicion(player)
    {
        player.alpha = 1;
        if(player.id == 0){
            this.colP1Plat.active = true;
            this.colll.active = true;
            this.colP1PlatqueSeMueve.active = true;
            this.colBalaP1.active = true;
        }else{
            this.colP2Plat.active = true;
            this.coll.active = true;
            this.colP2PlatqueSeMueve.active = true;
            this.colBalaP2.active = true;
        }
        player.setImmovable(false);
        player.body.setAllowGravity(true);
    }

    managePlatforms(){
        this.destruido=false;
        this.altura;
        this.grupoPlataformasQueRebotan.children.each(function(elem){
            this.platformYMin = Math.min( this.platformYMin, elem.y );
            if( elem.y > this.platformCaida.y) {
                this.destruido=true;
                this.altura=elem.body.y-700;
                elem.destroy();
            }
        },this);

        this.grupoplataformaCae.children.each(function(elem){
            this.platformYMin2 = Math.min( this.platformYMin2, elem.y );
            if( elem.y > this.platformCaida.y&&!elem.destruido1) {
                this.destruido=true;
                this.altura=elem.body.y-700;
                if(!elem.destruido1){
                this.contadorPlataformasQueCaen= this.contadorPlataformasQueCaen-1;    
                elem.destroy();
                }
            }
        },this);

        this.platforms.children.each(function(elem){
            this.platformYMin3 = Math.min( this.platformYMin3, elem.y );
            if( elem.y > this.platformCaida.y) { 
                this.altura=elem.body.y-700;    
                this.destruido=true;
                elem.destroy();
            }
        },this);

       if(this.destruido==true && this.altura>=-700){
           this.platIzq=false;
           this.platDch=false;
           this.generarUnaPlataforma_O_Dos= Phaser.Math.Between(1, 2);
           this.contador=0;
        do{
        do{
        this.plat_A_Generar=  Phaser.Math.Between(0, 9);
        this.seHaGeneradoPlat=false;// Varaible de control para saber si he generado una plataforma, he tenido que añadir esto
        // pq si ya hubiera dos plataformas que se caen y saliera 4 en el numero aleatorio no se generaria ninguna plataforma
        if(this.plat_A_Generar<=5){
            if(this.platIzq==false){
                this.platIzq=true;
                this.generarPlataformasQueRebotan(Phaser.Math.Between(150,300),this.altura,200);
            }
            else{
                this.platDch=true;
                this.generarPlataformasQueRebotan(Phaser.Math.Between(450,650),this.altura,200);
            }
            this.contador=this.contador+1;
            this.seHaGeneradoPlat=true;
        }
        else if((this.plat_A_Generar>=6||this.plat_A_Generar<=8)&&this.contadorPlataformasQueCaen<2&&this.platIzq==true){
                this.contador=this.contador+1;
        
                this.platDch=true;
                this.generarPlataformasQueRebotanYcaen(Phaser.Math.Between(450,650),this.altura,200);
        
        this.contadorPlataformasQueCaen= this.contadorPlataformasQueCaen+1;
        this.seHaGeneradoPlat=true;
        }
        else{
            this.contador=this.contador+1;
            if(this.platIzq==false){
                this.platIzq=true;
                this.generarPlatEstatica(Phaser.Math.Between(150,300),this.altura);
            }
            else{
                this.platDch=true;
                this.generarPlatEstatica(Phaser.Math.Between(450,650),this.altura);
            }
            
            this.seHaGeneradoPlat=true;
        }

    }while( this.seHaGeneradoPlat==false);  
    }while(this.platDch==false&&this.contador<this.generarUnaPlataforma_O_Dos);
        }

    }
}
