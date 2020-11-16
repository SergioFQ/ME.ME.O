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
            delay: 2000,
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
            350,
            'Loading ...',
            'preload',
            { x: 0.5, y: 1}
        );

        // Progress bar
        let x = 10;
        let y = 300;
        let w = 800 - 2 * x;
        let h = 18;

        this.progress = this.add.graphics({x: x, y: y});
        this.border = this.add.graphics({x: x, y: y});

        //Progress callback
        this.load.on('progress', this.onProgress, this);
    }

    onProgress(val)
    {
        //Width of progress bar
        this.progress.clear();
        this.progress.fillStyle('0xFFFFFF', 1);
        this.progress.fillRect(0, 0, witdh * val, height);

        this.border.clear();
        this.border.lineStyle(2, '0x4D6592', 1);
        this.border.strokeRect(0, 0, w * val, h);


        //Percentage in progress text
        let perc = Math.round(val * 100) + '%';
        this.txt_progress.setText(perc);

        console.log(this.txt_progress.text);
    }
}