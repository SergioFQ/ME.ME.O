class Options extends Phaser.Scene {
    constructor()//para poder llamar a la escena desde otras escenas
    {
        super({ key: 'Options', active: false });
    }

    preload() {

    }

    init() {

    }

    create() {

        this.createBackground();

        this.optionsText = this.add.text(335, 75, 'Options', { fontFamily: 'Berlin Sans FB, "Goudy Bookletter 1911", Times, serif', fontSize: '46px', fill: '#fff' });

        this.musicButton = this.add.image(295, 215, 'checkedBox');
        this.musicText = this.add.text(345, 200, 'Music Enabled', { fontFamily: 'Berlin Sans FB, "Goudy Bookletter 1911", Times, serif', fontSize: '32px', fill: '#fff' });

        this.musicButton.setInteractive();

        this.musicButton.on('pointerdown', function () {
            musicOn = !musicOn;
            this.updateAudio();
        }.bind(this));

        this.backButton = this.add.sprite(400, 300, 'redButton01').setInteractive();
        this.centerButton(this.backButton, -0.5);

        this.backText = this.add.text(0, 0, 'MENU', { fontFamily: 'Berlin Sans FB, "Goudy Bookletter 1911", Times, serif', fontSize: '32px', fill: '#fff' });
        this.centerButtonText(this.backText, this.backButton);

        this.backButton.on('pointerdown', function (pointer) {
            this.cameras.main.fadeOut(500);
            this.cameras.main.once('camerafadeoutcomplete', function (camera) {
                this.optionsAudio.stop();
                this.scene.start('Menu');
            }, this);
        }.bind(this));

        this.input.on('pointerover', () => this.backButton.setTexture('redButton02'));

        this.input.on('pointerout', () => this.backButton.setTexture('redButton01'));

        this.optionsAudio = this.sound.add('options', { loop: true });
        this.optionsAudio.setVolume(0.02);
        this.updateAudio();

        this.cameras.main.fadeIn(200);
    }

    updateAudio() {
        if (musicOn === false) {

            this.optionsAudio.stop();
            this.musicButton.setTexture('box');

        }
        else {

            this.optionsAudio.play();
            this.musicButton.setTexture('checkedBox');
        }
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

    createBackground() {
        this.bg = this.add.graphics({ x: 0, y: 0 });
        this.bg.fillStyle('0x000000', 1);
        this.bg.fillRect(0, 0, 800, 600);
    }

}