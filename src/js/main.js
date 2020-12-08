"use strict";
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity : { y: 700 },
            debug: false,
            checkCollision: {up:false, down: false, left: true, right: true}
        }
    },
    backgroundColor: 0x747474,
    scene: [Boot, Preload, Menu, Controls, Credits, Options, Select, GameScene, Player2Victory, Player1Victory]
};
//En scene ir añadiendo las diferentes escenas que se necesitarán
var game = new Phaser.Game(config);