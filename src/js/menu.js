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
        //this.load.bitmapFont('ClickPixel', '../resources/fonts/click-pixel.png', '../resources/fonts/click-pixel.xml');
    }

    goPlay ()
    {
        this.scene.start('Select');
    }

    goCredits()
    {
        this.scene.start('Credits');
    }

    create()
    {
        this.createBackground();

        //Game title
        this.title = new Text(
            this,
            400,
            220,
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

        var local = this.add.bitmapText(250, 300, 'ClickPixel', 'LOCAL', 32, 'center')
        .setInteractive()
        .on('pointerdown', () => local.setScale( 1.2 ))
        .on('pointerup', () => local.setScale( 1 ) && this.goPlay());

        var online = this.add.bitmapText(475, 300, 'ClickPixel', 'ONLINE', 32, 'center')
        .setInteractive()
        .on('pointerdown', () => online.setScale( 1.2 ))
        .on('pointerup', () => online.setScale( 1 ) && this.goPlay());

        var credits = this.add.bitmapText(475, 375, 'ClickPixel', 'CREDITS', 32, 'center')
        .setInteractive()
        .on('pointerdown', () => credits.setScale( 1.2 ))
        .on('pointerup', () => credits.setScale( 1 ) && this.goCredits());

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

    createBackground ()
    {
        this.bg = this.add.graphics({x: 0,y: 0});
        this.bg.fillStyle('0xF4CCA1', 1);
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