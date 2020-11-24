class Menu extends Phaser.Scene
{
    constructor()//para poder llamar a la escena desde otras escenas
    {
        super({ key: 'Menu', active: false});
    }

    preload()
    {
        this.load.audio('lala', '../resources/audio/lala.mp3');
    }

    init()
    {
        
    }

    goPlay ()
    {
        this.scene.start('Select');
    }

    goCredits()
    {
        this.scene.start('Credits');
    }

    goOptions ()
    {
        this.scene.start('Options');
    }

    create()
    {
        this.lalaAudio = this.sound.add('lala', { loop: true });
        this.lalaAudio.setVolume(0.02);
        this.lalaAudio.play();

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

        this.local = this.add.bitmapText(250, 300, 'ClickPixel', 'LOCAL', 32, 'center')
        .setInteractive()
        .on('pointerdown', () => this.local.setScale( 1.2 ))
        .on('pointerup', () => this.lalaAudio.stop())
        .on('pointerup', () => this.local.setScale( 1 ) && this.goPlay());

        this.online = this.add.bitmapText(475, 300, 'ClickPixel', 'ONLINE', 32, 'center')
        .setInteractive()
        .on('pointerdown', () => this.online.setScale( 1.2 ))
        .on('pointerup', () => this.lalaAudio.stop())
        .on('pointerup', () => this.online.setScale( 1 ) && this.goPlay());

        this.credits = this.add.bitmapText(475, 375, 'ClickPixel', 'CREDITS', 32, 'center')
        .setInteractive()
        .on('pointerdown', () => this.credits.setScale( 1.2 ))
        .on('pointerup', () => this.lalaAudio.stop())
        .on('pointerup', () => this.credits.setScale( 1 ) && this.goCredits());

        this.options = this.add.bitmapText(250, 375, 'ClickPixel', 'OPTIONS', 32, 'center')
        .setInteractive()
        .on('pointerdown', () => this.options.setScale( 1.2 ))
        .on('pointerup', () => this.lalaAudio.stop())
        .on('pointerup', () => this.options.setScale( 1 ) && this.goOptions());

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