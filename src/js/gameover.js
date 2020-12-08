class Gameover extends Phaser.Scene
{
    constructor()//para poder llamar a la escena desde otras escenas
    {
        super({ key: 'Gameover', active: false});
    }

    init()
    {

    }

    preload()
    {
        this.load.audio('lose', '../resources/audio/lose.mp3');
    }

    create()
    {
        this.loseAudio = this.sound.add('lose', { loop: false });
        this.loseAudio.setVolume(0.07);
        this.updateAudio();

        this.createBackground();
        
        this.text = this.add.text(400, 225, 'Player 2 wins', { fontFamily: 'Berlin Sans FB, "Goudy Bookletter 1911", Times, serif', fontSize: '48px', fill: '#fff' });
        this.text.setOrigin(0.5);
        this.text.setColor('#FFFFFF');
        
        /*var button = this.add.bitmapText(370, 300, 'ClickPixel', 'MENU', 32, 'center')
        .setInteractive()
        .on('pointerdown', () => button.setScale( 1.2 ))
        .on('pointerup', () => button.setScale( 1 ) && this.goMenu());*/

        this.backButton = this.add.sprite(400, 300, 'redButton01').setInteractive();
        this.centerButton(this.backButton, -0.5);
 
        this.backText = this.add.text(0, 0, 'MENU', { fontFamily: 'Berlin Sans FB, "Goudy Bookletter 1911", Times, serif', fontSize: '32px', fill: '#fff' });
        this.centerButtonText(this.backText, this.backButton);
 
        this.backButton.on('pointerdown', function (pointer) {
            this.loseAudio.stop();
            this.scene.start('Menu');
        }.bind(this));
 
        this.input.on('pointerover', () => this.backButton.setTexture('redButton02'));
 
        this.input.on('pointerout', () => this.backButton.setTexture('redButton01'));
        
        
    }

    updateAudio() {
        if (musicOn === false) {
          
            this.loseAudio.stop();

        } 
        else 
        {
            this.loseAudio.play();
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
        this.loseAudio.stop();
        this.scene.start('Menu');
    }

    createBackground ()
    {
        this.bg = this.add.graphics({x: 0,y: 0});
        this.bg.fillStyle('0x000000', 1);
        this.bg.fillRect(0, 0, 800, 600);
    }
}