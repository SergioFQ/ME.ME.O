class Credits extends Phaser.Scene
{
    constructor()//para poder llamar a la escena desde otras escenas
    {
        super({ key: 'Credits', active: false});
    }

    init()
    {

    }

    preload()
    {
        this.load.audio('creditsA', '../resources/audio/credits.mp3');
        this.load.image('credits','../resources/img/Creditos.png');
        this.load.image('smallButton01','../resources/UIpack/PNG/red_button08.png');
        this.load.image('smallButton02','../resources/UIpack/PNG/red_button09.png');
    }

    create()
    {
        this.createBackground();
        
        this.creditsImg = this.add.image(0, 200, 'credits').setOrigin(0, 0);

        this.creditsAudio = this.sound.add('creditsA', { loop: true });
        this.creditsAudio.setVolume(0.07);
        this.creditsAudio.play();

        this.skipButton = this.add.sprite(750, 50, 'smallButton01').setInteractive();
 
        this.backText = this.add.text(0, 0, 'X', { fontSize: '32px', fill: '#fff' });
        this.centerButtonText(this.backText, this.skipButton);
 
        this.skipButton.on('pointerdown', function (pointer) {
            this.creditsAudio.stop();
            this.scene.start('Menu');
        }.bind(this));
 
        this.input.on('pointerover', () => this.skipButton.setTexture('smallButton02'));
 
        this.input.on('pointerout', () => this.skipButton.setTexture('smallButton01'));
    }

    update ()
    {
        this.creditsImg.y--;
        if (this.creditsImg.y < -600)
        {
            this.creditsAudio.stop();
            this.scene.start('Menu');
        }
    }


    centerButtonText (gameText, gameButton) {
        Phaser.Display.Align.In.Center(
            gameText,
            gameButton
        );
    }

    createBackground ()
    {
        this.bg = this.add.graphics({x: 0,y: 0});
        this.bg.fillStyle('0x000000', 1);
        this.bg.fillRect(0, 0, 800, 600);
    }

}