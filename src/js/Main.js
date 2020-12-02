var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity : { y: 700 },
            debug: false
        }
    },
    backgroundColor: 0x747474,
    scene: [Boot, Preload, Menu, Credits, Options, Select, DemoScene, Gameover, Win]
};
//En scene ir añadiendo las diferentes escenas que se necesitarán
var game = new Phaser.Game(config);