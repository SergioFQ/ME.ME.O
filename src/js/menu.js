class Menu extends Phaser.Scene
{
    constructor()//para poder llamar a la escena desde otras escenas
    {
        super({ key: 'Menu', active: false});
    }

    preload()
    {
        console.log("menu preload");
        this.load.audio('lala', '../resources/audio/lala.mp3');
        this.load.image('titulo','../resources/img/titulo.png');
        this.load.image('memes','../resources/img/memes.png');
    }

    init()
    {
        
    }

    create()
    {
        
        this.createBackground();
        this.add.image(400, 300, 'memes');

        this.add.graphics({x: 0,y: 0}).fillStyle('0x000000', 1).fillRect(250, 200, 300, 300);
        
        this.lalaAudio = this.sound.add('lala', { loop: true });
        this.lalaAudio.setVolume(0.02);
        this.updateAudio();

        this.add.image(400, 125, 'titulo');


        //Play

        this.gameButton = this.add.sprite(400, 300, 'redButton01').setInteractive();
        this.centerButton(this.gameButton, 0.5);
 
        this.gameText = this.add.text(0, 0, 'PLAY', { fontFamily: 'Berlin Sans FB, "Goudy Bookletter 1911", Times, serif', fontSize: '32px', fill: '#fff' });
        this.centerButtonText(this.gameText, this.gameButton);
 
        this.gameButton.on('pointerdown', function (pointer) {
            this.lalaAudio.stop();
            this.scene.start('Select');
        }.bind(this));
 
        this.input.on('pointerover', function (event, gameObjects) {
        gameObjects[0].setTexture('redButton02');
        });
 
        this.input.on('pointerout', function (event, gameObjects) {
        gameObjects[0].setTexture('redButton01');
        });

        //Options

        this.optionsButton = this.add.sprite(300, 200, 'redButton01').setInteractive();
        this.centerButton(this.optionsButton, -0.5);
 
        this.optionsText = this.add.text(0, 0, 'OPTIONS', { fontFamily: 'Berlin Sans FB, "Goudy Bookletter 1911", Times, serif', fontSize: '32px', fill: '#fff' });
        this.centerButtonText(this.optionsText, this.optionsButton);
 
        this.optionsButton.on('pointerdown', function (pointer) {
            this.lalaAudio.stop();
            this.scene.start('Options');
        }.bind(this));
 
        // Credits
        this.creditsButton = this.add.sprite(300, 200, 'redButton01').setInteractive();
        this.centerButton(this.creditsButton, -1.5);
 
        this.creditsText = this.add.text(0, 0, 'CREDITS', { fontFamily: 'Berlin Sans FB, "Goudy Bookletter 1911", Times, serif', fontSize: '32px', fill: '#fff' });
        this.centerButtonText(this.creditsText, this.creditsButton);
 
        this.creditsButton.on('pointerdown', function (pointer) {
            this.lalaAudio.stop();
            this.scene.start('Credits');
        }.bind(this));
 
        this.input.on('pointerover', function (event, gameObjects) {
        gameObjects[0].setTexture('redButton02');
        });
 
        this.input.on('pointerout', function (event, gameObjects) {
        gameObjects[0].setTexture('redButton01');
        });
    }

    updateAudio() {
        if (musicOn === false) {
          
            this.lalaAudio.stop();

        } 
        else 
        {
            this.lalaAudio.play();
        }
    }

    centerButtonText (gameText, gameButton) {
        Phaser.Display.Align.In.Center(
            gameText,
            gameButton
        );
    }

    centerButton (gameObject, offset = 0) {
        Phaser.Display.Align.In.Center(
        gameObject,
        this.add.zone(800/2, 600/2 - offset * 100, 800, 600)
        );
    }

    createBackground ()
    {
        this.bg = this.add.graphics({x: 0,y: 0});
        this.bg.fillStyle('0x000000', 1);
        this.bg.fillRect(0, 0, 800, 600);
    }    
}