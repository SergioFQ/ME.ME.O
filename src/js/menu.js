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
    }

    init()
    {
        
    }

    create()
    {
        
        this.createBackground();
        
        this.lalaAudio = this.sound.add('lala', { loop: true });
        this.lalaAudio.setVolume(0.02);
        this.lalaAudio.play();
        this.lalaAudio.resume();


        //Play

        this.gameButton = this.add.sprite(400, 300, 'redButton01').setInteractive();
        this.centerButton(this.gameButton, 0.5);
 
        this.gameText = this.add.text(0, 0, 'Play', { fontSize: '32px', fill: '#fff' });
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
 
        this.optionsText = this.add.text(0, 0, 'Options', { fontSize: '32px', fill: '#fff' });
        this.centerButtonText(this.optionsText, this.optionsButton);
 
        this.optionsButton.on('pointerdown', function (pointer) {
            this.lalaAudio.stop();
            this.scene.start('Options');
        }.bind(this));
 
        // Credits
        this.creditsButton = this.add.sprite(300, 200, 'redButton01').setInteractive();
        this.centerButton(this.creditsButton, -1.5);
 
        this.creditsText = this.add.text(0, 0, 'Credits', { fontSize: '32px', fill: '#fff' });
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

        //Game title
        this.title = new Text(
            this,
            400,
            125,
            'ME.ME.O',
            'title',
        );

        this.aux = 0;
    }

    update ()
    {
        if (this.aux == 0)
        {
            console.log('entra');
            this.lalaAudio.play();
            this.aux = 1;
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