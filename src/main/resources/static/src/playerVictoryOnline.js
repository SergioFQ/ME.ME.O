class PlayerVictoryOnline extends Phaser.Scene {
    constructor()//para poder llamar a la escena desde otras escenas
    {
        super({ key: 'PlayerVictoryOnline', active: false });
    }

    preload() {

    }

    init(data) {
        this.caras = data.keyVida;
        this.name = data.player;
    }

    create() {
        this.victoryAudio = this.sound.add('victory', { loop: false });
        this.victoryAudio.setVolume(0.01);
        this.updateAudio();

        this.createBackground();
        this.iter = 0;
        this.colores = this.add.image(config.width / 2, config.height / 2, "colores").setScale(3);
        this.colores.alpha = 1;
        this.colores.blendMode = 1;

        this.carasGrupo = this.make.group({
            key: this.caras,
            frameQuantity: 56,
            max: 56
        });

        Phaser.Actions.GridAlign(this.carasGrupo.getChildren(), {
            width: 8,
            height: 9,
            cellWidth: 96,
            cellHeight: 90,
            x: 56,
            y: 50
        });
        this.cara1 = this.add.image(config.width - 150, config.height / 2, this.caras);
        this.cara2 = this.add.image(config.width / 2, config.height / 2, this.caras).setScale(2);
        this.cara3 = this.add.image(config.width / 2 + 50, config.height / 2, this.caras).setScale(2);
        this.cara2.y -= 100;

        this.add.graphics({ x: 0, y: 0 }).fillStyle('0x000000', 1).fillRect(250, 200, 300, 300);

        this.backButton = this.add.sprite(400, 300, 'redButton01').setInteractive();
        this.centerButton(this.backButton, -0.5);

        this.backText = this.add.text(0, 0, 'MENU', { fontFamily: 'Berlin Sans FB, "Goudy Bookletter 1911", Times, serif', fontSize: '32px', fill: '#fff' });
        this.centerButtonText(this.backText, this.backButton);

        this.backButton.on('pointerdown', function (pointer) {
            this.cameras.main.fadeOut(500);
            this.cameras.main.once('camerafadeoutcomplete', function (camera) {                
            this.victoryAudio.stop();
            this.scene.start('Menu');
            }, this);
        }.bind(this));

        this.input.on('pointerover', () => this.backButton.setTexture('redButton02'));

        this.input.on('pointerout', () => this.backButton.setTexture('redButton01'));


        this.text = this.add.text(400, 250, ' ' + this.name + ' wins', { fontFamily: 'Berlin Sans FB, "Goudy Bookletter 1911", Times, serif', fontSize: '48px', fill: '#fff' });
        this.text.setOrigin(0.5);
        this.text.setColor('#FFFFFF');

        this.cameras.main.fadeIn(200);
    }

    update() {
        this.colores.angle += 5;
        //  this.colores.alpha = Math.sin(this.iter * 3);       

        var children = this.carasGrupo.getChildren();
        for (var i = 0; i < children.length; i++) {
            children[i].rotation += 0.1;
        }
        this.cara1.rotation = this.iter;
        this.cara2.x = 90 + Math.sin(this.iter * 10) * 100;

        this.cara1.scaleX = Math.sin(this.iter * 10) * 3;
        this.cara1.scaleY = Math.cos(this.iter * 10) * 3;

        this.cara3.rotation = this.iter * 11;
        this.cara3.y = 140 + Math.sin(this.iter * 10) * 100;

        this.iter += 0.01;

    }

    updateAudio() {
        if (musicOn === false) {

            this.victoryAudio.stop();
        }
        else {
            this.victoryAudio.play();
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