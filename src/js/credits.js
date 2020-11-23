class Credits extends Phaser.Scene
{
    constructor()//para poder llamar a la escena desde otras escenas
    {
        super({ key: 'Credits', active: false});
    }

    init()
    {

    }

    preload()
    {
        this.load.image('credits','../resources/img/Creditos.png');
    }

    create()
    {
        this.createBackground();
        
        this.creditsImg = this.add.image(0, 200, 'credits').setOrigin(0, 0);
    }

    update ()
    {
        this.creditsImg.y--;
        if (this.creditsImg.y < -600)
        {
            this.scene.start('Menu');
        }
    }

    createBackground ()
    {
        this.bg = this.add.graphics({x: 0,y: 0});
        this.bg.fillStyle('0x000000', 1);
        this.bg.fillRect(0, 0, 800, 600);
    }

}