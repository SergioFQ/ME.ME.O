class Menu extends Phaser.Scene {
    constructor()//para poder llamar a la escena desde otras escenas
    {
        super({ key: 'Menu', active: false });
    }

    preload() {

    }

    init() {

    }

    create() {
        this.i=document.getElementById("nameInput");
        this.i.style.position="absolute";
        this.i.style.display="none";
        this.i.style.top="300px";
        this.i.style.right="400px";



        this.createBackground();
        this.add.image(400, 300, 'memes');

        this.add.graphics({ x: 0, y: 0 }).fillStyle('0x000000', 1).fillRect(250, 150, 300, 400);

        this.lalaAudio = this.sound.add('lala', { loop: true });
        this.lalaAudio.setVolume(0.02);
        this.updateAudio();

        this.add.image(400, 80, 'titulo');


        //Play Standalone

        this.gameButton = this.add.sprite(400, 300, 'redButton01').setInteractive();
        this.centerButton(this.gameButton, 1);

        this.gameText = this.add.text(0, 0, 'PLAY Local', { fontFamily: 'Berlin Sans FB, "Goudy Bookletter 1911", Times, serif', fontSize: '32px', fill: '#fff' });
        this.centerButtonText(this.gameText, this.gameButton);

        this.gameButton.on('pointerdown', function (pointer) {
            this.cameras.main.fadeOut(500);
            this.cameras.main.once('camerafadeoutcomplete', function (camera) {
                this.lalaAudio.stop();
                this.scene.start('Select');
            }, this);
        }.bind(this));

        this.input.on('pointerover', function (event, gameObjects) {
            gameObjects[0].setTexture('redButton02');
        });

        this.input.on('pointerout', function (event, gameObjects) {
            gameObjects[0].setTexture('redButton01');
        });

        //Play Multi

        this.gameButton = this.add.sprite(650, 300, 'redButton01').setInteractive();
        //this.centerButton(this.gameButton, 1);

        this.gameText = this.add.text(0, 0, 'PLAY Multi', { fontFamily: 'Berlin Sans FB, "Goudy Bookletter 1911", Times, serif', fontSize: '32px', fill: '#fff' });
        this.centerButtonText(this.gameText, this.gameButton);

        this.gameButton.on('pointerdown', function (pointer) {
            this.cameras.main.fadeOut(500);
            this.cameras.main.once('camerafadeoutcomplete', function (camera) {
                this.lalaAudio.stop();
                this.scene.start('SelectName');//AQUI PUEDO PONER API REST AQUIIIIIIIII
            }, this);
        }.bind(this));

        this.input.on('pointerover', function (event, gameObjects) {
            gameObjects[0].setTexture('redButton02');
        });

        this.input.on('pointerout', function (event, gameObjects) {
            gameObjects[0].setTexture('redButton01');
        });

        //Options

        this.optionsButton = this.add.sprite(300, 200, 'redButton01').setInteractive();
        this.centerButton(this.optionsButton, 0);

        this.optionsText = this.add.text(0, 0, 'OPTIONS', { fontFamily: 'Berlin Sans FB, "Goudy Bookletter 1911", Times, serif', fontSize: '32px', fill: '#fff' });
        this.centerButtonText(this.optionsText, this.optionsButton);

        this.optionsButton.on('pointerdown', function (pointer) {
            this.cameras.main.fadeOut(500);
            this.cameras.main.once('camerafadeoutcomplete', function (camera) {
                this.lalaAudio.stop();
                this.scene.start('Options');
            }, this);
        }.bind(this));

        this.controlsButton = this.add.sprite(300, 200, 'redButton01').setInteractive();
        this.centerButton(this.controlsButton, -1);

        this.optionsText = this.add.text(0, 0, 'CONTROLS', { fontFamily: 'Berlin Sans FB, "Goudy Bookletter 1911", Times, serif', fontSize: '32px', fill: '#fff' });
        this.centerButtonText(this.optionsText, this.controlsButton);

        this.controlsButton.on('pointerdown', function (pointer) {
            this.cameras.main.fadeOut(500);
            this.cameras.main.once('camerafadeoutcomplete', function (camera) {
                this.lalaAudio.stop();
                this.scene.start('Controls');
            }, this);
        }.bind(this));

        // Credits
        this.creditsButton = this.add.sprite(300, 200, 'redButton01').setInteractive();
        this.centerButton(this.creditsButton, -2);

        this.creditsText = this.add.text(0, 0, 'CREDITS', { fontFamily: 'Berlin Sans FB, "Goudy Bookletter 1911", Times, serif', fontSize: '32px', fill: '#fff' });
        this.centerButtonText(this.creditsText, this.creditsButton);

        this.creditsButton.on('pointerdown', function (pointer) {
            this.cameras.main.fadeOut(500);
            this.cameras.main.once('camerafadeoutcomplete', function (camera) {
                this.lalaAudio.stop();
                this.scene.start('Credits');
            }, this);
        }.bind(this));

        this.input.on('pointerover', function (event, gameObjects) {
            gameObjects[0].setTexture('redButton02');
        });

        this.input.on('pointerout', function (event, gameObjects) {
            gameObjects[0].setTexture('redButton01');
        });

        this.cameras.main.fadeIn(200);
    }

    updateAudio() {
        if (musicOn === false) {

            this.lalaAudio.stop();

        }
        else {
            this.lalaAudio.play();
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