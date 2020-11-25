class Menu extends Phaser.Scene
{
    constructor()//para poder llamar a la escena desde otras escenas
    {
        super({ key: 'Menu', active: false});
    }

    preload()
    {
        this.load.audio('lala', '../resources/audio/lala.mp3');
        this.load.image('redButton01','../resources/UIpack/PNG/red_button01.png');
        this.load.image('redButton02','../resources/UIpack/PNG/red_button02.png');
    }

    init()
    {
        
    }

    goPlay ()
    {
        this.scene.start('Select');
    }

    goCredits()
    {
        this.scene.start('Credits');
    }

    goOptions ()
    {
        this.scene.start('Options');
    }

    create()
    {
        this.lalaAudio = this.sound.add('lala', { loop: true });
        this.lalaAudio.setVolume(0.02);
        this.lalaAudio.play();

        this.createBackground();

        //Play

        this.gameButton = this.add.sprite(400, 300, 'redButton01').setInteractive();
        this.centerButton(this.gameButton, 1);
 
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
        this.centerButton(this.optionsButton);
 
        this.optionsText = this.add.text(0, 0, 'Options', { fontSize: '32px', fill: '#fff' });
        this.centerButtonText(this.optionsText, this.optionsButton);
 
        this.optionsButton.on('pointerdown', function (pointer) {
            this.lalaAudio.stop();
            this.scene.start('Options');
        }.bind(this));
 
        // Credits
        this.creditsButton = this.add.sprite(300, 200, 'redButton01').setInteractive();
        this.centerButton(this.creditsButton, -1);
 
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
            100,
            'ME.ME.O',
            'title',
        );

        //Click to play text
        /*this.click_text = new Text(
            this,
            400,
            350,
            'Click to play',
            'standard',
        );*/

        //Click to play text
        /*this.enter_text = new Text(
            this,
            400,
            300,
            'Press Enter to play',
            'standard',
        );*/

        /*this.local = this.add.bitmapText(250, 300, 'ClickPixel', 'LOCAL', 32, 'center')
        .setInteractive()
        .on('pointerdown', () => this.local.setScale( 1.2 ))
        .on('pointerup', () => this.lalaAudio.stop())
        .on('pointerup', () => this.local.setScale( 1 ) && this.goPlay());

        this.online = this.add.bitmapText(475, 300, 'ClickPixel', 'ONLINE', 32, 'center')
        .setInteractive()
        .on('pointerdown', () => this.online.setScale( 1.2 ))
        .on('pointerup', () => this.lalaAudio.stop())
        .on('pointerup', () => this.online.setScale( 1 ) && this.goPlay());

        this.credits = this.add.bitmapText(475, 375, 'ClickPixel', 'CREDITS', 32, 'center')
        .setInteractive()
        .on('pointerdown', () => this.credits.setScale( 1.2 ))
        .on('pointerup', () => this.lalaAudio.stop())
        .on('pointerup', () => this.credits.setScale( 1 ) && this.goCredits());

        this.options = this.add.bitmapText(250, 375, 'ClickPixel', 'OPTIONS', 32, 'center')
        .setInteractive()
        .on('pointerdown', () => this.options.setScale( 1.2 ))
        .on('pointerup', () => this.lalaAudio.stop())
        .on('pointerup', () => this.options.setScale( 1 ) && this.goOptions());*/

        // Create mouse input
        /*this.input.on('pointerdown', function (pointer) {

            console.log('down');

            this.goPlay();
        }, this);*/

        // Create keyboard input
        //this.playButton = this.input.keyboard.addKeys('Enter');

        
        /*this.text = this.add.text(400, 300, 'Menu');
        this.text.setOrigin(0.5);
        this.text.setColor('#000000')*/
        
        
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

    update()
    {
        /*var pointer = this.input.activePointer;
        
        if(this.playButton.Enter.isDown)
        {
            this.goPlay();
        }*/
    }

    
}