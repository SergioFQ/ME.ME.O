class Preload extends Phaser.Scene
{
    constructor()//para poder llamar a la escena desde otras escenas
    {
        super({ key: 'Preload', active: false});
    }

    init()
    {
        // Globals
    }

    preload()
    {
        // Creat loading bar
        this.createLoadingBar();
        // Spritesheets
    }

    create()
    {  
        musicOn = true;
        
        this.time.addEvent({
            delay: 2000,
            callback: () => { this.createButton() ;},
            callbackScope: this
        });

        this.logo = this.add.image(400, 150, 'logo').setScale(0.3);
    }

    createLoadingBar()
    {
        // Title
        this.title = new Text(
            this,
            400,
            300,
            'Loading Game',
            'preload',
            0.5
        );

        // Progress text
        this.txt_progress = new Text(
            this,
            400,
            410,
            'Loading ...',
            'preload',
            { x: 0.5, y: 1}
        );

        let x = 10;
        let y = 300;

        // Progress bar
        this.progress = this.add.graphics({x: x, y: y});
        this.border = this.add.graphics({x: x, y: y});

        //Progress callback
        //this.load.on('progress', this.onProgress, this);
        this.time.addEvent({
            delay: 500,
            callback: () => { this.onProgress(Phaser.Math.Between(20, 45)) ;},
            callbackScope: this
        });

        this.time.addEvent({
            delay: 1000,
            callback: () => { this.onProgress(Phaser.Math.Between(55, 80));},
            callbackScope: this
        });

        this.time.addEvent({
            delay: 1500,
            callback: () => { this.onProgress(100) ;},
            callbackScope: this
        });
    }

    onProgress(val)
    {
        let w = 600 - 2 * this.progress.x;
        let h = 18;

        //Width of progress bar
        this.progress.clear();
        this.progress.fillStyle('0x7FDD02', 1);
        this.progress.fillRect(100, 40, w * val/100, h);

        this.border.clear();
        this.border.lineStyle(2, '0x4D6592', 1);
        this.border.strokeRect(100, 40, w * val/100, h);


        //Percentage in progress text
        let perc = val + '%';
        this.txt_progress.setText(perc);

        console.log(this.txt_progress.text);
    }

    createButton ()
    {
        this.nextButton = this.add.sprite(400, 300, 'redButton01').setInteractive();
        this.centerButton(this.nextButton, -1.5);
 
        this.backText = this.add.text(0, 0, 'MENU', { fontFamily: 'Berlin Sans FB, "Goudy Bookletter 1911", Times, serif', fontSize: '32px', fill: '#fff' });
        this.centerButtonText(this.backText, this.nextButton);
 
        this.nextButton.on('pointerdown', function (pointer) {
            this.scene.start('Menu');
        }.bind(this));
 
        this.input.on('pointerover', () => this.nextButton.setTexture('redButton02'));
 
        this.input.on('pointerout', () => this.nextButton.setTexture('redButton01'));
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
}

var musicOn;