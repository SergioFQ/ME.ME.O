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
        
        
        this.gameover = new Text(
            this,
            400,
            220,
            'You lose ...',
            'title',
        );
        
        var button = this.add.bitmapText(370, 300, 'ClickPixel', 'MENU', 32, 'center')
        .setInteractive()
        .on('pointerdown', () => button.setScale( 1.2 ))
        .on('pointerup', () => button.setScale( 1 ) && this.goMenu());

        this.loseAudio = this.sound.add('lose', { loop: false });
        this.loseAudio.setVolume(0.07);
        this.loseAudio.play();
        
        
    }

    update()
    {
          
    }

    goMenu ()
    {
        this.loseAudio.stop();
        this.scene.start('Menu');
    }
}