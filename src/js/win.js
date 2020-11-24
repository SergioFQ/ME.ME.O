class Win extends Phaser.Scene
{
    constructor()//para poder llamar a la escena desde otras escenas
    {
        super({ key: 'Win', active: false});
    }

    preload()
    {
        this.load.audio('victory', '../resources/audio/victory.mp3');
    }

    init()
    {

    }

    create()
    {
        this.win = new Text(
            this,
            400,
            220,
            'You win !!',
            'title',
        );
        
        var button = this.add.bitmapText(370, 300, 'ClickPixel', 'MENU', 32, 'center')
        .setInteractive()
        .on('pointerdown', () => button.setScale( 1.2 ))
        .on('pointerup', () => button.setScale( 1 ) && this.goMenu());

        this.victoryAudio = this.sound.add('victory', { loop: false });
        this.victoryAudio.setVolume(0.05);
        this.victoryAudio.play();
          
    }

    update()
    {
          
    }

    goMenu ()
    {
        this.victoryAudio.stop();
        this.scene.start('Menu');
    }
}