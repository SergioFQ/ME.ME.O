class Boot extends Phaser.Scene
{
    constructor()//para poder llamar a la escena desde otras escenas
    {
        super({ key: 'Boot', active: true});
    }

    init()
    {

    }

    preload()
    {
        this.load.bitmapFont('ClickPixel', '../resources/fonts/click-pixel.png', '../resources/fonts/click-pixel.xml');
    }

    create()
    {
        this.scene.start('Preload');
    }

    update()
    {
          
    }
}