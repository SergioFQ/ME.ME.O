class Options extends Phaser.Scene
{
    constructor()//para poder llamar a la escena desde otras escenas
    {
        super({ key: 'Options', active: false});
    }

    preload()
    {
        this.load.audio('options', '../resources/audio/options.mp3');
        this.load.image('box','../resources/UIpack/PNG/red_button03.png');
        this.load.image('checkedBox','../resources/UIpack/PNG/red_boxCheckmark.png');

        this.load.image('wad','../resources/img/wasd.png');
        this.load.image('flechas','../resources/img/flechas.png');
        this.load.image('emotes1','../resources/img/emotes1.png');
        this.load.image('emotes2','../resources/img/emotes2.png');
    }

    init()
    {

    }

    create()
    {
        
        this.createBackground();

        this.add.image(150, 200, 'wad').setScale(0.75);
        this.add.image(650, 200, 'flechas').setScale(0.75);
        this.add.image(325, 200, 'emotes1').setScale(0.75);
        this.add.image(475, 200, 'emotes2').setScale(0.75);

        this.controlsText = this.add.text(335, 50, 'Controls', { fontFamily: 'Berlin Sans FB, "Goudy Bookletter 1911", Times, serif', fontSize: '46px', fill: '#fff'  });
        this.optionsText = this.add.text(335, 350, 'Options', { fontFamily: 'Berlin Sans FB, "Goudy Bookletter 1911", Times, serif', fontSize: '46px', fill: '#fff'  });
        this.emotesp1Text = this.add.text(270, 260, 'Emotes P1', { fontFamily: 'Berlin Sans FB, "Goudy Bookletter 1911", Times, serif', fontSize: '28px', fill: '#fff'  });
        this.emotesp2Text = this.add.text(415, 260, 'Emotes P2', { fontFamily: 'Berlin Sans FB, "Goudy Bookletter 1911", Times, serif', fontSize: '28px', fill: '#fff'  });
        this.movementp1Text = this.add.text(65, 290, 'Movement P1', { fontFamily: 'Berlin Sans FB, "Goudy Bookletter 1911", Times, serif', fontSize: '28px', fill: '#fff'  });
        this.movementp2Text = this.add.text(570, 290, 'Movement P2', { fontFamily: 'Berlin Sans FB, "Goudy Bookletter 1911", Times, serif', fontSize: '28px', fill: '#fff'  });
        this.musicButton = this.add.image(295, 445, 'checkedBox');
        this.musicText = this.add.text(345, 430, 'Music Enabled', { fontFamily: 'Berlin Sans FB, "Goudy Bookletter 1911", Times, serif', fontSize: '32px', fill: '#fff'  });

        this.musicButton.setInteractive();

        this.musicButton.on('pointerdown', function () {
            musicOn = !musicOn;
            this.updateAudio();
          }.bind(this));

        this.backButton = this.add.sprite(400, 300, 'redButton01').setInteractive();
        this.centerButton(this.backButton, -2.25);
 
        this.backText = this.add.text(0, 0, 'MENU', { fontFamily: 'Berlin Sans FB, "Goudy Bookletter 1911", Times, serif', fontSize: '32px', fill: '#fff' });
        this.centerButtonText(this.backText, this.backButton);
 
        this.backButton.on('pointerdown', function (pointer) {
            this.optionsAudio.stop();
            this.scene.start('Menu');
        }.bind(this));
 
        this.input.on('pointerover', () => this.backButton.setTexture('redButton02'));
 
        this.input.on('pointerout', () => this.backButton.setTexture('redButton01'));

        this.optionsAudio = this.sound.add('options', { loop: true });
        this.optionsAudio.setVolume(0.05);
        this.updateAudio();
    }

    updateAudio() {
        if (musicOn === false) {
          
            this.optionsAudio.stop();
            this.musicButton.setTexture('box');

        } 
        else 
        {

            this.optionsAudio.play();
            this.musicButton.setTexture('checkedBox');
        }
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

    goMenu ()
    {
        this.scene.start('Menu');
    }

    createBackground ()
    {
        this.bg = this.add.graphics({x: 0,y: 0});
        this.bg.fillStyle('0x000000', 1);
        this.bg.fillRect(0, 0, 800, 600);
    }

}