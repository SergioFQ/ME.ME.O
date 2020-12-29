class Notificaciones extends Phaser.Scene {
    constructor()//para poder llamar a la escena desde otras escenas
    {
        super({ key: 'Notificaciones', active: false });
    }

    create(data) {
        this.exitButton = this.add.sprite(400, 400, 'redButton01').setInteractive()
            .on('pointerover', () => this.exitButton.setTexture('redButton02'))
            .on('pointerout', () => this.exitButton.setTexture('redButton01'));
        this.backText = this.add.text(0, 0, 'MENU', { fontFamily: 'Berlin Sans FB, "Goudy Bookletter 1911", Times, serif', fontSize: '32px', fill: '#fff' });
        this.centerButtonText(this.backText, this.exitButton);

        this.exitButton.on('pointerdown', function (pointer) {
            this.cameras.main.fadeOut(500);
            this.cameras.main.once('camerafadeoutcomplete', function (camera) {
                this.inactivityText.setVisible(false);
                this.serverOutText.setVisible(false);
                this.enemyDisconnectText.setVisible(false);
                this.scene.start('Menu');
            }, this);
        }.bind(this));

        this.inactivityText = this.add.text(240, 250, 'Kicked out for inactivity', { fontFamily: 'Berlin Sans FB, "Goudy Bookletter 1911", Times, serif', fontSize: '32px', fill: '#fff' });
        this.inactivityText.setVisible(false);
        this.serverOutText = this.add.text(250, 250, 'Server disconnected', { fontFamily: 'Berlin Sans FB, "Goudy Bookletter 1911", Times, serif', fontSize: '32px', fill: '#fff' });
        this.serverOutText.setVisible(false);
        this.enemyDisconnectText = this.add.text(165, 250, 'Opponent disconnected from server', { fontFamily: 'Berlin Sans FB, "Goudy Bookletter 1911", Times, serif', fontSize: '32px', fill: '#fff' });
        this.enemyDisconnectText.setVisible(false);

        switch (data.valor) {
            case 0:
                this.inactivityText.setVisible(true);
                break;
            case 1:
                this.serverOutText.setVisible(true);
                break;
            case 2:
                this.enemyDisconnectText.setVisible(true);
                break;
        }
    }

    update() {

    }

    centerButtonText(gameText, gameButton) {
        Phaser.Display.Align.In.Center(
            gameText,
            gameButton
        );
    }
}