class Select extends Phaser.Scene
{
    constructor()//para poder llamar a la escena desde otras escenas
    {
        super({ key: 'Select', active: false});
    }

    init()
    {

    }

    preload()
    {
        
    }

    create()
    {

        
        this.text = this.add.text(400, 300, 'Select Character');
        this.text.setOrigin(0.5);
        this.text.setColor('#FFFFFF')
        
        this.time.addEvent({
            delay: 2000,
            callback: () => { this.scene.start('DemoScene') ;},
            callbackScope: this
        });
    }

    update()
    {
        
    }

    
}