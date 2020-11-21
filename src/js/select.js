class Select extends Phaser.Scene
{
    constructor()//para poder llamar a la escena desde otras escenas
    {
        super({ key: 'Select', active: false});
    }

    init()
    {

    }

    preload()
    {
        this.load.image('pepe','../resources/img/Personajes/Pepe the Frog.png');
        this.load.image('trollface','../resources/img/Personajes/Troll Face.png');
        this.load.image('coffindancer','../resources/img/Personajes/Coffin Dancer.png');
        this.load.image('transp','../resources/img/Personajes/Transparente.png');
    }

    create()
    {

        
        this.text = this.add.text(400, 150, 'Press to select character');
        this.text.setOrigin(0.5);
        this.text.setColor('#FFFFFF');

        this.text = this.add.text(400, 225, 'Player 1');
        this.text.setOrigin(0.5);
        this.text.setColor('#FFFFFF');

        this.text = this.add.text(400, 375, 'Player 2');
        this.text.setOrigin(0.5);
        this.text.setColor('#FFFFFF');

        var p1 = this.add.image(200, 300, 'pepe').setInteractive()
        .on('pointerover', () => p1.setScale( 1.2 ))
        .on('pointerout', () => p1.setScale( 1 ));

        var p2 = this.add.image(400, 300, 'trollface').setInteractive()
        .on('pointerover', () => p2.setScale( 1.2 ))
        .on('pointerout', () => p2.setScale( 1 ));

        var p3 = this.add.image(600, 300, 'coffindancer').setInteractive()
        .on('pointerover', () => p3.setScale( 1.2 ))
        .on('pointerout', () => p3.setScale( 1 ));

        var p4 = this.add.image(200, 450, 'pepe').setInteractive()
        .on('pointerover', () => p4.setScale( 1.2 ))
        .on('pointerout', () => p4.setScale( 1 ));

        var p5 = this.add.image(400, 450, 'trollface').setInteractive()
        .on('pointerover', () => p5.setScale( 1.2 ))
        .on('pointerout', () => p5.setScale( 1 ));

        var p6 = this.add.image(600, 450, 'coffindancer').setInteractive()
        .on('pointerover', () => p6.setScale( 1.2 ))
        .on('pointerout', () => p6.setScale( 1 ));

        var elegidoP1 = false;
        var elegidoP2 = false;
        
        if(elegidoP1 == false)
        {
            p1.on('pointerdown', () => p1.alpha = 0.5, this.elegidoP1 = true);
            p2.on('pointerdown', () => p2.alpha = 0.5, this.elegidoP1 = true);
            p3.on('pointerdown', () => p3.alpha = 0.5, this.elegidoP1 = true);
            
        }

        if(elegidoP2 == false)
        {
            p4.on('pointerdown', () => p4.alpha = 0.5, elegidoP2 = true);
            p5.on('pointerdown', () => p5.alpha = 0.5, elegidoP2 = true);
            p6.on('pointerdown', () => p6.alpha = 0.5, elegidoP2 = true);
            
        }

        /*this.time.addEvent({
            delay: 2000,
            callback: () => { this.scene.start('DemoScene') ;},
            callbackScope: this
        });*/
    }

    update()
    {
        
    }

    
}