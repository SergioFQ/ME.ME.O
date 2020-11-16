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
        this.time.addEvent({
            delay: 4000,
            callback: () => { this.scene.start('Menu') ;},
            callbackScope: this
        });
    }

    createLoadingBar()
    {
        // Title
        this.title = new Text(
            this,
            400,
            250,
            'Loading Game',
            'preload',
            0.5
        );

        // Progress text
        this.txt_progress = new Text(
            this,
            400,
            325,
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
            delay: 1000,
            callback: () => { this.onProgress(Phaser.Math.Between(20, 45)) ;},
            callbackScope: this
        });

        this.time.addEvent({
            delay: 2000,
            callback: () => { this.onProgress(Phaser.Math.Between(55, 80));},
            callbackScope: this
        });

        this.time.addEvent({
            delay: 3000,
            callback: () => { this.onProgress(100) ;},
            callbackScope: this
        });
    }

    onProgress(val)
    {
        console.log('this.txt_progress.text');
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
}