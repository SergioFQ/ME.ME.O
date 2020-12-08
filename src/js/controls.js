class Controls extends Phaser.Scene
{
    constructor()//para poder llamar a la escena desde otras escenas
    {
        super({ key: 'Controls', active: false});
    }

    preload()
    {

    }

    init()
    {

    }

    create()
    {
        this.controlsAudio = this.sound.add('controls', { loop: true });
        this.controlsAudio.setVolume(0.03);
        this.updateAudio();

        this.createBackground();

        this.add.image(150, 155, 'wad').setScale(0.75);
        this.add.image(650, 155, 'flechas').setScale(0.75);
        this.add.image(325, 155, 'emotes1').setScale(0.75);
        this.add.image(475, 155, 'emotes2').setScale(0.75);

        this.add.image(250, 295, 'pb');
        this.add.image(560, 295, 'pm');

        this.add.image(300, 425, 'haters');

        this.controlsText = this.add.text(325, 30, 'Controls', { fontFamily: 'Berlin Sans FB, "Goudy Bookletter 1911", Times, serif', fontSize: '46px', fill: '#fff'  });

        this.emotesp1Text = this.add.text(270, 210, 'Emotes P1', { fontFamily: 'Berlin Sans FB, "Goudy Bookletter 1911", Times, serif', fontSize: '28px', fill: '#fff'  });
        this.emotesp2Text = this.add.text(415, 210, 'Emotes P2', { fontFamily: 'Berlin Sans FB, "Goudy Bookletter 1911", Times, serif', fontSize: '28px', fill: '#fff'  });
        this.movementp1Text = this.add.text(65, 235, 'Movement P1', { fontFamily: 'Berlin Sans FB, "Goudy Bookletter 1911", Times, serif', fontSize: '28px', fill: '#fff'  });
        this.movementp2Text = this.add.text(570, 235, 'Movement P2', { fontFamily: 'Berlin Sans FB, "Goudy Bookletter 1911", Times, serif', fontSize: '28px', fill: '#fff'  });

        this.pbText = this.add.text(60, 320, 'Static and moving platforms', { fontFamily: 'Berlin Sans FB, "Goudy Bookletter 1911", Times, serif', fontSize: '28px', fill: '#fff'  });
        this.pmText = this.add.text(460, 320, 'Falling platforms', { fontFamily: 'Berlin Sans FB, "Goudy Bookletter 1911", Times, serif', fontSize: '28px', fill: '#fff'  });

        this.info1Text = this.add.text(60, 370, 'Climb jumping on likes platforms, dodging the dislikes ones,'
        , { fontFamily: 'Berlin Sans FB, "Goudy Bookletter 1911", Times, serif', fontSize: '28px', fill: '#fff'  });
        this.info2Text = this.add.text(50, 410, 'avoiding the haters        and defeat your opponent to become'
        , { fontFamily: 'Berlin Sans FB, "Goudy Bookletter 1911", Times, serif', fontSize: '28px', fill: '#fff'  });
        this.info3Text = this.add.text(250, 450, 'THE BEST MEME !!'
        , { fontFamily: 'Berlin Sans FB, "Goudy Bookletter 1911", Times, serif', fontSize: '38px', fill: '#fff'  });

        this.backButton = this.add.sprite(400, 300, 'redButton01').setInteractive();
        this.centerButton(this.backButton, -2.35);
 
        this.backText = this.add.text(0, 0, 'MENU', { fontFamily: 'Berlin Sans FB, "Goudy Bookletter 1911", Times, serif', fontSize: '32px', fill: '#fff' });
        this.centerButtonText(this.backText, this.backButton);
 
        this.backButton.on('pointerdown', function (pointer) {
            this.controlsAudio.stop();
            this.scene.start('Menu');
        }.bind(this));
 
        this.input.on('pointerover', () => this.backButton.setTexture('redButton02'));
 
        this.input.on('pointerout', () => this.backButton.setTexture('redButton01'));
        
        
    }

    update()
    {
          
    }

    updateAudio() {
        if (musicOn === false) {
          
            this.controlsAudio.stop();
        } 
        else 
        {
            this.controlsAudio.play();
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

    createBackground ()
    {
        this.bg = this.add.graphics({x: 0,y: 0});
        this.bg.fillStyle('0x000000', 1);
        this.bg.fillRect(0, 0, 800, 600);
    }
}