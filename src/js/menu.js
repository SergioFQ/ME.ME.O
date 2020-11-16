class Menu extends Phaser.Scene
{
    constructor()//para poder llamar a la escena desde otras escenas
    {
        super({ key: 'Menu', active: false});
    }

    init()
    {

    }

    preload()
    {
        
    }

    create()
    {
        this.scene.start('DemoScene');
    }

    update()
    {
          
    }
}