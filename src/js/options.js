class Options extends Phaser.Scene
{
    constructor()//para poder llamar a la escena desde otras escenas
    {
        super({ key: 'Options', active: false});
    }

    preload()
    {
        this.load.audio('options', '../resources/audio/options.mp3');
        this.load.image('box','../resources/UIpack/PNG/red_button03.png');
        this.load.image('checkedBox','../resources/UIpack/PNG/red_boxCheckmark.png');
    }

    init()
    {

    }

    create()
    {
        this.createBackground();

        this.optionsAudio = this.sound.add('options', { loop: true });
        this.optionsAudio.setVolume(0.05);
        this.optionsAudio.play();

        this.musicOn = true;
        this.soundOn = true;

        this.text = this.add.text(335, 100, 'Options', { fontSize: 40 });
        this.musicButton = this.add.image(300, 200, 'checkedBox');
        this.musicText = this.add.text(350, 190, 'Music Enabled', { fontSize: 24 });

        this.soundButton = this.add.image(300, 300, 'checkedBox');
        this.soundText = this.add.text(350, 290, 'Sound Enabled', { fontSize: 24 });

        this.musicButton.setInteractive();
        this.soundButton.setInteractive();

        this.musicButton.on('pointerdown', function () {
            this.musicOn = !this.musicOn;
            this.updateAudio();
          }.bind(this));
           
        this.soundButton.on('pointerdown', function () {
            this.soundOn = !this.soundOn;
            if (this.soundOn === false) 
            {
                this.soundButton.setTexture('box');
            } 
            else 
            {
                this.soundButton.setTexture('checkedBox');
            }
            //this.updateAudio();
        }.bind(this));
           
        this.updateAudio();

        this.backButton = this.add.sprite(400, 300, 'redButton01').setInteractive();
        this.centerButton(this.backButton, -1);
 
        this.backText = this.add.text(0, 0, 'Menu', { fontSize: '32px', fill: '#fff' });
        this.centerButtonText(this.backText, this.backButton);
 
        this.backButton.on('pointerdown', function (pointer) {
            this.optionsAudio.stop();
            this.scene.start('Menu');
        }.bind(this));
 
        this.input.on('pointerover', () => this.backButton.setTexture('redButton02'));
 
        this.input.on('pointerout', () => this.backButton.setTexture('redButton01'));

        /*this.back = this.add.bitmapText(400, 400, 'ClickPixel', 'MENU', 32, 'center')
        .setInteractive()
        .on('pointerdown', () => this.back.setScale( 1.2 ))
        .on('pointerup', () => this.optionsAudio.stop())
        .on('pointerup', () => this.back.setScale( 1 ) && this.goMenu());*/
    }

    updateAudio() {
        if (this.musicOn === false) {
          
            this.optionsAudio.stop();
            this.musicButton.setTexture('box');

        } 
        else 
        {

            this.optionsAudio.play();
            this.musicButton.setTexture('checkedBox');
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

    goMenu ()
    {
        this.scene.start('Menu');
    }

    createBackground ()
    {
        this.bg = this.add.graphics({x: 0,y: 0});
        this.bg.fillStyle('0x000000', 1);
        this.bg.fillRect(0, 0, 800, 600);
    }

}