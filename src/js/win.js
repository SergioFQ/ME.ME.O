class Win extends Phaser.Scene
{
    constructor()//para poder llamar a la escena desde otras escenas
    {
        super({ key: 'Win', active: false});
    }

    init()
    {

    }

    preload()
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
          
    }

    update()
    {
          
    }

    goMenu ()
    {
        this.scene.start('Menu');
    }
}