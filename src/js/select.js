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
        //this.load.audio('select', '../resources/audio/select.mp3');
        
        this.load.image('pepe','../resources/img/Personajes/Pepe the Frog.png');
        this.load.image('trollface','../resources/img/Personajes/Troll Face.png');
        this.load.image('coffindancer','../resources/img/Personajes/Coffin Dancer.png');
    }

    create()
    {
        this.next = 0;
        
        /*this.selectAudio = this.sound.add('select', { loop: true });
        this.selectAudio.setVolume(0.05);
        this.selectAudio.play();*/
        
        this.text = this.add.text(400, 150, 'Press to select character');
        this.text.setOrigin(0.5);
        this.text.setColor('#FFFFFF');

        this.text = this.add.text(400, 225, 'Player 1');
        this.text.setOrigin(0.5);
        this.text.setColor('#FFFFFF');

        this.text = this.add.text(400, 375, 'Player 2');
        this.text.setOrigin(0.5);
        this.text.setColor('#FFFFFF');

        this.p1 = this.add.image(200, 300, 'pepe').setInteractive()
        .on('pointerover', () => this.p1.setScale( 1.2 ))
        .on('pointerout', () => this.p1.setScale( 1 ));

        this.p2 = this.add.image(400, 300, 'trollface').setInteractive()
        .on('pointerover', () => this.p2.setScale( 1.2 ))
        .on('pointerout', () => this.p2.setScale( 1 ));

        this.p3 = this.add.image(600, 300, 'coffindancer').setInteractive()
        .on('pointerover', () => this.p3.setScale( 1.2 ))
        .on('pointerout', () => this.p3.setScale( 1 ));

        this.p4 = this.add.image(200, 450, 'pepe').setInteractive()
        .on('pointerover', () => this.p4.setScale( 1.2 ))
        .on('pointerout', () => this.p4.setScale( 1 ));

        this.p5 = this.add.image(400, 450, 'trollface').setInteractive()
        .on('pointerover', () => this.p5.setScale( 1.2 ))
        .on('pointerout', () => this.p5.setScale( 1 ));

        this.p6 = this.add.image(600, 450, 'coffindancer').setInteractive()
        .on('pointerover', () => this.p6.setScale( 1.2 ))
        .on('pointerout', () => this.p6.setScale( 1 ));

        this.eleccion1;
        this.eleccion2;

        this.p1.on('pointerdown', () => this.cambio(this.p1, this.p2, this.p3, 1));
        this.p2.on('pointerdown', () => this.cambio(this.p2, this.p1, this.p3, 2));
        this.p3.on('pointerdown', () => this.cambio(this.p3, this.p1, this.p2, 3));

        this.p4.on('pointerdown', () => this.cambio(this.p4, this.p5, this.p6, 4));
        this.p5.on('pointerdown', () => this.cambio(this.p5, this.p4, this.p6, 5));
        this.p6.on('pointerdown', () => this.cambio(this.p6, this.p4, this.p5, 6));
        
        /*this.time.addEvent({
            delay: 3000,
            callback: () => { this.scene.start('DemoScene') ;},
            callbackScope: this
        });*/
    }

    update()
    {
        if (this.next == 2)
        {
            //this.selectAudio.stop();
            this.scene.restart('DemoScene');
            this.scene.start('DemoScene', {eleccion1: this.eleccion1, eleccion2: this.eleccion2});

        }

    }

    cambio (p1, p2, p3, num)
    {

        p1.alpha = 0.5;
        p1.removeInteractive();
        p2.removeInteractive();
        p3.removeInteractive();
        if (num > 3)
        {
            this.eleccion2 = num - 3
        }
        else
        {
            this.eleccion1 = num;
        }
        this.next++;
    }

    
}