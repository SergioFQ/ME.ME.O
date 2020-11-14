class DemoScene extends Phaser.Scene
{
    constructor()//para poder llamar a la escena desde otras escenas
    {
        super('DemoScene');
    }

    preload()
    {
        this.load.image('sky','../resources/img/sky.png');
        this.load.image('platform','../resources/img/platform.png');
        this.load.image('platformCaida','../resources/img/platformCaida.png');

        this.load.spritesheet('dude','../resources/img/dude.png',
        { frameWidth:32, frameHeight: 48});

        this.load.spritesheet('dude2','../resources/img/dude2.png',
        { frameWidth:32, frameHeight: 48});
    }

    create()
    {
        this.add.image(400,300,'sky');
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400,568,'platform').setScale(2).refreshBody();
        this.platforms.create(300,450,'platform');
        this.platforms.create(450,350,'platform');
        this.platforms.create(300,-100,'platform');
        
        this.player1 = this.physics.add.sprite(100,450,'dude');
        this.player1.setBounce(0);
        this.player1.setCollideWorldBounds(true);

        this.player2 = this.physics.add.sprite(150,450,'dude2');
        this.player2.setBounce(0);
        this.player2.setCollideWorldBounds(true);

        this.createAnimations();

        this.colP1Plat = this.physics.add.collider(this.player1, this.platforms, this.allowJump1,null,this);
        this.colP2Plat = this.physics.add.collider(this.player2, this.platforms, this.allowJump2,null,this);

        this.player1Controls = this.input.keyboard.addKeys('W,A,D');
        this.player2Controls = this.input.keyboard.addKeys('UP,LEFT,RIGHT');
        this.canJump1 = true;
        this.canJump2 = true;
        this.camera = this.cameras.main;//camara de la escena
        this.platformCaida = this.physics.add.sprite(400,650,'platformCaida').setScale(2).refreshBody();//plataforma que irá debajo de la camara y matara a los jugadores
        this.platformCaida.body.setAllowGravity(false);//quitamos la gravedad de la plataforma de caida
        this.overlapP1Caida = this.physics.add.overlap(this.player1, this.platformCaida, this.muerteCaida1, null, this);//la muerte por caida
        this.overlapP2Caida = this.physics.add.overlap(this.player2, this.platformCaida, this.muerteCaida2, null, this);//la muerte por caida
        this.alreadyDead = false;//si hay algún muerto ya
    }

    update()
    {
        this.platformCaida.setVelocity(0,-60);
        //Player1 control
        if(this.player1Controls.A.isDown)
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

        if(this.player1Controls.W.isDown && /*this.player1.body.touching.down*/this.canJump1)
        {
            this.player1.setVelocityY(-400);
            this.canJump1 = false;
        }

        if(this.player1.body.velocity.y > 1)//cayendo
        {
            this.colP1Plat.active = true;
        }else//saltando
        {
            this.colP1Plat.active = false;            
        }

        //Player2 control
        if(this.player2Controls.LEFT.isDown)
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

        if(this.player2Controls.UP.isDown && /*this.player2.body.touching.down*/this.canJump2)
        {
            this.player2.setVelocityY(-400);
            this.canJump2 = false;
        }

        if(this.player2.body.velocity.y > 1)//cayendo
        {
            this.colP2Plat.active = true;
        }else//saltando
        {
            this.colP2Plat.active = false;            
        }
        if(this.camera.scrollY>-1000)//ponemos un tope cualquiera al scroll de la camara
        {
            this.camera.scrollY-=1;
        }
       // console.log(this.platformCaida.y);
       this.managePlatforms();
       
        //console.log(this.camera.scrollY);//debug para scroll camara
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
        if(!this.alreadyDead)
        {
            console.log('p1 muerto');
            this.player1.body.moves = false;
            this.player1Controls.active = false;
            this.alreadyDead = true;
        }
    }
    muerteCaida2() 
    {
        if(!this.alreadyDead)
        {
            console.log('p2 muerto');
            this.player2.body.moves = false;            
            this.player2Controls.active = false;
            this.alreadyDead = true;
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
    
    managePlatforms()
    {
       this.platforms.children.each(function(elem ) {
           this.platformYMin = Math.min( this.platformYMin, elem.y );
           if( elem.y > this.platformCaida.y && (elem!=this.player1 && elem!=this.player2)) {
            if((this.player1.body.x>-400)||(this.player2.body.x>-400))
            {
              this.platforms.create(300,elem.body.y-700,'platform');
            }  
             elem.destroy();
           }
        }, this );
    }
}