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

        this.load.spritesheet('dude','../resources/img/dude.png',
        { frameWidth:32, frameHeight: 48});

        this.load.spritesheet('dude2','../resources/img/dude2.png',
        { frameWidth:32, frameHeight: 48});

        this.load.spritesheet('pepeS','../resources/img/SpriteSheets/Pepe the Frog SpriteSheet.png',
        { frameWidth:61, frameHeight: 96});

        this.load.spritesheet('trollfaceS','../resources/img/SpriteSheets/Trollface SpriteSheet.png',
        { frameWidth:61, frameHeight: 96});

        this.load.spritesheet('coffindancerS','../resources/img/SpriteSheets/Coffin Dancer SpriteSheet.png',
        { frameWidth:61, frameHeight: 96});
    }

    init (data)
    {
        this.eleccionJ1 = data.eleccion1;
        console.log(this.eleccionJ1);

        this.eleccionJ2 = data.eleccion2;
        console.log(this.eleccionJ2);

        this.spriteP1;
        this.spriteP2;
        this.keyP1;
        this.keyP2;
        
        switch(this.eleccionJ1){
            case 1:
                this.spriteP1 = 'pepeS';
                this.keyP1 = 'pepeSK';
                break;
            case 2:
                this.spriteP1 = 'trollfaceS';
                this.keyP1 = 'trollfaceSK';
                break;
            case 3:
                this.spriteP1 = 'coffindancerS';
                this.keyP1 = 'coffindancerSK';
                break;
            
        }

        switch(this.eleccionJ2){
            case 1:
                this.spriteP2 = 'pepeS';
                this.keyP2 = 'pepeSK';
                break;
            case 2:
                this.spriteP2 = 'trollfaceS';
                this.keyP2 = 'trollfaceSK';
                break;
            case 3:
                this.spriteP2 = 'coffindancerS';
                this.keyP2 = 'coffindancerSK';
                break;
            
        }
    }

    create()
    {

        this.add.image(400,300,'sky');
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400,568,'platform').setScale(2).refreshBody();
        this.platforms.create(300,450,'platform');
        this.platforms.create(450,350,'platform');

        

        this.player1 = this.physics.add.sprite(100,450,this.spriteP1).setScale(0.5);
        this.player1.setBounce(0);
        this.player1.setCollideWorldBounds(true);

        this.player2 = this.physics.add.sprite(150,450, this.spriteP2).setScale(0.5);
        this.player2.setBounce(0);
        this.player2.setCollideWorldBounds(true);

        console.log(this.spriteP1, this.spriteP2);

        this.createAnimations(this.spriteP1, this.spriteP2, this.keyP1, this.keyP2);

        this.colP1Plat = this.physics.add.collider(this.player1, this.platforms);
        this.colP2Plat = this.physics.add.collider(this.player2, this.platforms);

        this.player1Controls = this.input.keyboard.addKeys('W,A,D');
        this.player2Controls = this.input.keyboard.addKeys('UP,LEFT,RIGHT');

        this.winOrDeath = this.input.keyboard.addKeys('K, L');
        
        //this.camera = this.cameras.main;

    }

    update()
    {
        //Player1 control
        if(this.player1Controls.A.isDown)
        {
            this.player1.setVelocityX(-160);
            this.player1.anims.play(this.keyP1 + 'left',true);
        }
        else if(this.player1Controls.D.isDown)
        {
            this.player1.setVelocityX(160);
            this.player1.anims.play(this.keyP1 + 'right',true);
        }
        else
        {
            this.player1.setVelocityX(0);
            this.player1.anims.play(this.keyP1 + 'iddle');
        }

        if(this.player1Controls.W.isDown && this.player1.body.touching.down)
        {
            this.player1.setVelocityY(-400);
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
            this.player2.anims.play(this.keyP2 + 'left2',true);
        }
        else if(this.player2Controls.RIGHT.isDown)
        {
            this.player2.setVelocityX(160);
            this.player2.anims.play(this.keyP2 + 'right2',true);
        }
        else
        {
            this.player2.setVelocityX(0);
            this.player2.anims.play(this.keyP2 + 'iddle2');
        }

        if(this.player2Controls.UP.isDown && this.player2.body.touching.down)
        {
            this.player2.setVelocityY(-400);
        }

        if(this.player2.body.velocity.y > 1)//cayendo
        {
            this.colP2Plat.active = true;
        }else//saltando
        {
            this.colP2Plat.active = false;            
        }
        //this.camera.scrollY-=1; 
        
        if(this.winOrDeath.K.isDown)
        {
            this.scene.start('Gameover');
        }

        if(this.winOrDeath.L.isDown)
        {
            this.scene.start('Win');
        }
    }

    createAnimations(player1sprite, player2sprite, k1, k2)
    {
        //Animaciones Player1
           this.anims.create({
            key: k1 + 'left',
            frames: this.anims.generateFrameNumbers(player1sprite, {start:0, 
                end:3}),
                frameRate: 10,
                repeat: -1
            });
            this.anims.create({
            key: k1 + 'iddle',
            frames: [{key: player1sprite, frame: 4}],
            frameRate: 20
            });
            this.anims.create({
            key:k1 + 'right',
            frames: this.anims.generateFrameNumbers(player1sprite, {start: 5, end: 8}),
            frameRate: 10,
            repeat: -1
            });
        //Animaciones Player2
            this.anims.create({
            key: k2 + 'left2',
            frames: this.anims.generateFrameNumbers(player2sprite, {start:0, 
                end:3}),
                frameRate: 10,
                repeat: -1
            });
            this.anims.create({
            key: k2 + 'iddle2',
            frames: [{key: player2sprite, frame: 4}],
            frameRate: 20
            });
            this.anims.create({
            key:k2 + 'right2',
            frames: this.anims.generateFrameNumbers(player2sprite, {start: 5, end: 8}),
            frameRate: 10,
            repeat: -1
            });
    }
}