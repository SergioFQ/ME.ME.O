class Preload extends Phaser.Scene {
    constructor()//para poder llamar a la escena desde otras escenas
    {
        super({ key: 'Preload', active: false });
    }

    init() {

    }

    preload() {
        this.createLoadingBar();

        this.load.on('progress', function (value) {
            this.onProgress(parseInt(value * 100));
        }, this);

        this.load.on('complete', function () {
            this.createButton();
        }, this);

        this.load.image('platform', '../resources/img/Plataformas/Plataforma Buena (150x32).png');
        this.load.image('origen', '../resources/img/Plataformas/Plataforma Buena (800x64).png');
        this.load.image('platformDislike', '../resources/img/Plataformas/Plataforma Mala (150x32).png');
        this.load.image('platformCaida', '../resources/img/platformCaida.png');

        this.load.image('bomb', '../resources/img/Balas.png');

        this.load.spritesheet('pepeS', '../resources/img/SpriteSheets/Pepe the Frog SpriteSheet.png',
            { frameWidth: 64.44, frameHeight: 100 });

        this.load.spritesheet('trollfaceS', '../resources/img/SpriteSheets/Trollface SpriteSheet.png',
            { frameWidth: 64.44, frameHeight: 100 });

        this.load.spritesheet('coffindancerS', '../resources/img/SpriteSheets/Coffin Dancer SpriteSheet.png',
            { frameWidth: 64.44, frameHeight: 100 });

        this.load.audio('trololo', '../resources/audio/trololo.mp3');
        this.load.audio('coffinSound', '../resources/audio/coffinSound.mp3');
        this.load.audio('victory', '../resources/audio/victory.mp3');

        this.load.image('meta', '../resources/img/Meta.png');

        this.load.image('fondo', '../resources/img/Fondo.png');
        this.load.spritesheet('pepeHappy', '../resources/img/SpriteSheets/pepeHit.png',
            { frameWidth: 111, frameHeight: 112 });
        this.load.spritesheet('pepeSad', '../resources/img/SpriteSheets/pepeSad.png',
            { frameWidth: 111, frameHeight: 112 });
        this.load.spritesheet('trollHappy', '../resources/img/SpriteSheets/trollHappy.png',
            { frameWidth: 117, frameHeight: 111 });
        this.load.spritesheet('trollSad', '../resources/img/SpriteSheets/trollSad.png',
            { frameWidth: 128, frameHeight: 112 });
        this.load.spritesheet('coffinHappy', '../resources/img/SpriteSheets/coffin1.png',
            { frameWidth: 112, frameHeight: 112 });
        this.load.spritesheet('coffinSad', '../resources/img/SpriteSheets/coffin2.png',
            { frameWidth: 179, frameHeight: 112 });

        this.load.audio('controls', '../resources/audio/controls.mp3');

        this.load.image('wad', '../resources/img/wasd.png');
        this.load.image('flechas', '../resources/img/flechas.png');
        this.load.image('emotes1', '../resources/img/emotes1.png');
        this.load.image('emotes2', '../resources/img/emotes2.png');

        this.load.image('pb', '../resources/img/Plataformas/Plataforma Buena (150x32).png');
        this.load.image('pm', '../resources/img/Plataformas/Plataforma Mala (150x32).png');

        this.load.image('haters', '../resources/img/Balas.png');

        this.load.audio('creditsA', '../resources/audio/credits.mp3');
        this.load.image('credits', '../resources/img/Creditos.png');
        this.load.image('smallButton01', '../resources/UIpack/PNG/red_button08.png');
        this.load.image('smallButton02', '../resources/UIpack/PNG/red_button09.png');

        this.load.audio('lala', '../resources/audio/lala.mp3');
        this.load.image('titulo', '../resources/img/titulo.png');
        this.load.image('memes', '../resources/img/memes.png');

        this.load.audio('options', '../resources/audio/options.mp3');
        this.load.image('box', '../resources/UIpack/PNG/red_button03.png');
        this.load.image('checkedBox', '../resources/UIpack/PNG/red_boxCheckmark.png');

        this.load.audio('select', '../resources/audio/select.mp3');

        this.load.image('pepe', '../resources/img/Personajes/Pepe the Frog.png');
        this.load.image('trollface', '../resources/img/Personajes/Troll Face.png');
        this.load.image('coffindancer', '../resources/img/Personajes/Coffin Dancer.png');

        this.load.image('colores', '../resources/img/colors.png');
    }

    create() {
        musicOn = true;
    }

    createLoadingBar() {
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
            { x: 0.5, y: 1 }
        );

        let x = 10;
        let y = 300;

        // Progress bar
        this.progress = this.add.graphics({ x: x, y: y });
        this.border = this.add.graphics({ x: x, y: y });
        this.logo = this.add.image(400, 150, 'logo').setScale(0.3);
    }

    onProgress(val) {
        let w = 600 - 2 * this.progress.x;
        let h = 18;

        //Width of progress bar
        this.progress.clear();
        this.progress.fillStyle('0x7FDD02', 1);
        this.progress.fillRect(100, 40, w * val / 100, h);

        this.border.clear();
        this.border.lineStyle(2, '0x4D6592', 1);
        this.border.strokeRect(100, 40, w * val / 100, h);


        //Percentage in progress text
        let perc = val + '%';
        this.txt_progress.setText(perc);

    }

    createButton() {
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

    centerButtonText(gameText, gameButton) {
        Phaser.Display.Align.In.Center(
            gameText,
            gameButton
        );
    }

    centerButton(gameObject, offset = 0) {
        Phaser.Display.Align.In.Center(
            gameObject,
            this.add.zone(800 / 2, 600 / 2 - offset * 100, 800, 600)
        );
    }
}

var musicOn;