class Boot extends Phaser.Scene {
    constructor()//para poder llamar a la escena desde otras escenas
    {
        super({ key: 'Boot', active: true });
    }

    init() {

    }

    preload() {
        this.load.bitmapFont('ClickPixel', '../resources/fonts/click-pixel.png', '../resources/fonts/click-pixel.xml');
        this.load.image('redButton01', '../resources/UIpack/PNG/red_button01.png');
        this.load.image('redButton02', '../resources/UIpack/PNG/red_button02.png');
        this.load.image('logo', '../resources/img/PretoriansLogo.png');
    }

    create() {
        this.scene.start('Preload');
    }

    update() {

    }
}