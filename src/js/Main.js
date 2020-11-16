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
    backgroundColor: 0xB37878,
    scene: [Boot, Preload, Menu, DemoScene]
};
//En scene ir añadiendo las diferentes escenas que se necesitarán
var game = new Phaser.Game(config);