class Select extends Phaser.Scene {
    constructor()//para poder llamar a la escena desde otras escenas
    {
        super({ key: 'Select', active: false });
    }

    init() {

    }

    preload() {

    }

    create() {
        this.next = 0;

        this.selectAudio = this.sound.add('select', { loop: true });
        this.selectAudio.setVolume(0.05);
        this.updateAudio();

        this.text = this.add.text(400, 100, 'Press to select character', { fontFamily: 'Berlin Sans FB, "Goudy Bookletter 1911", Times, serif', fontSize: '42px', fill: '#fff' });
        this.text.setOrigin(0.5);
        this.text.setColor('#FFFFFF');

        this.text = this.add.text(400, 175, 'Player 1', { fontFamily: 'Berlin Sans FB, "Goudy Bookletter 1911", Times, serif', fontSize: '32px', fill: '#fff' });
        this.text.setOrigin(0.5);
        this.text.setColor('#FFFFFF');

        this.text = this.add.text(400, 325, 'Player 2', { fontFamily: 'Berlin Sans FB, "Goudy Bookletter 1911", Times, serif', fontSize: '32px', fill: '#fff' });
        this.text.setOrigin(0.5);
        this.text.setColor('#FFFFFF');

        this.p1 = this.add.image(200, 250, 'pepe').setInteractive()
            .on('pointerover', () => this.p1.setScale(1.2))
            .on('pointerout', () => this.p1.setScale(1));

        this.p2 = this.add.image(400, 250, 'trollface').setInteractive()
            .on('pointerover', () => this.p2.setScale(1.2))
            .on('pointerout', () => this.p2.setScale(1));

        this.p3 = this.add.image(600, 250, 'coffindancer').setInteractive()
            .on('pointerover', () => this.p3.setScale(1.2))
            .on('pointerout', () => this.p3.setScale(1));

        this.p4 = this.add.image(200, 400, 'pepe').setInteractive()
            .on('pointerover', () => this.p4.setScale(1.2))
            .on('pointerout', () => this.p4.setScale(1));

        this.p5 = this.add.image(400, 400, 'trollface').setInteractive()
            .on('pointerover', () => this.p5.setScale(1.2))
            .on('pointerout', () => this.p5.setScale(1));

        this.p6 = this.add.image(600, 400, 'coffindancer').setInteractive()
            .on('pointerover', () => this.p6.setScale(1.2))
            .on('pointerout', () => this.p6.setScale(1));

        this.eleccion1;
        this.eleccion2;

        this.p1.on('pointerdown', () => this.cambio(this.p1, this.p2, this.p3, 1));
        this.p2.on('pointerdown', () => this.cambio(this.p2, this.p1, this.p3, 2));
        this.p3.on('pointerdown', () => this.cambio(this.p3, this.p1, this.p2, 3));

        this.p4.on('pointerdown', () => this.cambio(this.p4, this.p5, this.p6, 4));
        this.p5.on('pointerdown', () => this.cambio(this.p5, this.p4, this.p6, 5));
        this.p6.on('pointerdown', () => this.cambio(this.p6, this.p4, this.p5, 6));

        this.cameras.main.fadeIn(200);
    }

    update() {
        if (this.next == 2) {
            this.createButton();
        }

    }

    cambio(p1, p2, p3, num) {

        p1.alpha = 0.5;
        p1.removeInteractive();
        p2.removeInteractive();
        p3.removeInteractive();
        if (num > 3) {
            this.eleccion2 = num - 3
        }
        else {
            this.eleccion1 = num;
        }
        this.next++;
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

    createButton() {
        this.nextButton = this.add.sprite(400, 300, 'redButton01').setInteractive();
        this.centerButton(this.nextButton, -2);

        this.backText = this.add.text(0, 0, 'PLAY', { fontFamily: 'Berlin Sans FB, "Goudy Bookletter 1911", Times, serif', fontSize: '32px', fill: '#fff' });
        this.centerButtonText(this.backText, this.nextButton);

        this.nextButton.on('pointerdown', function (pointer) {
            this.cameras.main.fadeOut(500);
            this.cameras.main.once('camerafadeoutcomplete', function (camera) {
                this.selectAudio.stop();
                this.scene.start('GameScene', { eleccion1: this.eleccion1, eleccion2: this.eleccion2 });
            }, this);
        }.bind(this));

        this.input.on('pointerover', () => this.nextButton.setTexture('redButton02'));

        this.input.on('pointerout', () => this.nextButton.setTexture('redButton01'));
    }

    updateAudio() {
        if (musicOn === false) {

            this.selectAudio.stop();

        }
        else {

            this.selectAudio.play();
        }
    }


}