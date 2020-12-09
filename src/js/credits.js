class Credits extends Phaser.Scene {
    constructor()//para poder llamar a la escena desde otras escenas
    {
        super({ key: 'Credits', active: false });
    }

    init() {

    }

    preload() {
    }

    create() {
        this.createBackground();

        this.creditsImg = this.add.image(0, 200, 'credits').setOrigin(0, 0);

        this.creditsAudio = this.sound.add('creditsA', { loop: true });
        this.creditsAudio.setVolume(0.07);
        this.updateAudio();

        this.skipButton = this.add.sprite(750, 50, 'smallButton01').setInteractive();

        this.backText = this.add.text(0, 0, 'X', { fontFamily: 'Berlin Sans FB, "Goudy Bookletter 1911", Times, serif', fontSize: '32px', fill: '#fff' });
        this.centerButtonText(this.backText, this.skipButton);

        this.skipButton.on('pointerdown', function (pointer) {
            this.cameras.main.fadeOut(500);
            this.cameras.main.once('camerafadeoutcomplete', function (camera) {
                this.creditsAudio.stop();
                this.scene.start('Menu');
            }, this);
        }.bind(this));

        this.input.on('pointerover', () => this.skipButton.setTexture('smallButton02'));

        this.input.on('pointerout', () => this.skipButton.setTexture('smallButton01'));

        this.cameras.main.fadeIn(200);
    }

    update() {
        this.creditsImg.y--;
        if (this.creditsImg.y < -800) {
            this.creditsAudio.stop();
            //this.cameras.main.fadeOut(500);
            //this.cameras.main.once('camerafadeoutcomplete', function (camera) {
            this.scene.start('Menu');
            //}, this);
        }
    }

    updateAudio() {
        if (musicOn === false) {

            this.creditsAudio.stop();

        }
        else {

            this.creditsAudio.play();
        }
    }


    centerButtonText(gameText, gameButton) {
        Phaser.Display.Align.In.Center(
            gameText,
            gameButton
        );
    }

    createBackground() {
        this.bg = this.add.graphics({ x: 0, y: 0 });
        this.bg.fillStyle('0x000000', 1);
        this.bg.fillRect(0, 0, 800, 600);
    }

}