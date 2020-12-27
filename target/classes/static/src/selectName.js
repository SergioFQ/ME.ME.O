class SelectName extends Phaser.Scene {
    constructor()//para poder llamar a la escena desde otras escenas
    {
        super({ key: 'SelectName', active: false });
    }
    create(){

       //console.log(direccionWeb);
        /*this.i=document.getElementById("nameInput");
        this.i.style.position="absolute";
        this.i.style.display="block";
        this.i.style.top="300px";
        this.i.style.right="400px";*/
        inputName.style.display='block';
        this.nombreCreado=false;
        this.huecoSala = true;
        this.cambioScene = true;

        this.text = this.add.text(400, 175, 'Write your name', { fontFamily: 'Berlin Sans FB, "Goudy Bookletter 1911", Times, serif', fontSize: '42px', fill: '#fff' });
        this.text.setOrigin(0.5);
        this.text.setColor('#FFFFFF');
        this.sameNameText = this.add.text(150, 250, 'Name selected by another player\n             Choose another one', { fontFamily: 'Berlin Sans FB, "Goudy Bookletter 1911", Times, serif', fontSize: '32px', fill: '#fff' });
        this.sameNameText.setVisible(false);

        this.fullServerText = this.add.text(150, 250, 'Out of space - Server full of players', { fontFamily: 'Berlin Sans FB, "Goudy Bookletter 1911", Times, serif', fontSize: '32px', fill: '#fff' });
        this.fullServerText.setVisible(false);
        this.emptyNameText = this.add.text(200, 250, 'Empty name is not allowed', { fontFamily: 'Berlin Sans FB, "Goudy Bookletter 1911", Times, serif', fontSize: '32px', fill: '#fff' });
        this.emptyNameText.setVisible(false);

        this.exitButton = this.add.sprite(750, 50, 'smallButton01').setInteractive();
        this.backText = this.add.text(0, 0, 'X', { fontFamily: 'Berlin Sans FB, "Goudy Bookletter 1911", Times, serif', fontSize: '32px', fill: '#fff' });
        this.centerButtonText(this.backText, this.exitButton);

        this.exitButton.on('pointerdown', function (pointer) {
            this.cameras.main.fadeOut(500);
            this.cameras.main.once('camerafadeoutcomplete', function (camera) {  
                $('#nameInput').val('');              
                inputName.style.display='none';
                this.scene.start('Menu');
            }, this);
        }.bind(this));

        this.exitButton.on('pointerover', () => this.exitButton.setTexture('smallButton02'));

        this.exitButton.on('pointerout', () => this.exitButton.setTexture('smallButton01'));

       this.valorInput = $("#nameInput").on('keyup',function(ele){
            if(ele.key=='Enter'){
                if(!$('#nameInput').val().trim()){
                    this.sameNameText.setVisible(false);
                    this.fullServerText.setVisible(false);
                    this.emptyNameText.setVisible(true);
                }else{

                    this.nombreJug= $('#nameInput').val();
                    this.jugador={
                        nombre: this.nombreJug,
                        sprite: -1
                     }
    
                    //this.metodoPost(this.jugador);
                this.metodoGetJugadores();
                    
               //$('#nameInput').val('');
              // this.nombreJug=null;
                }
            }
        }.bind(this))
    }

    update(){
        if(this.nombreCreado==true && this.cambioScene == true){
            this.cambioScene = false;
            this.valorInput = null;
            inputName.style.display='none';
            this.metodoPostJugador(this.jugador);
            nom_jug=this.jugador.nombre;
        }
    }
    metodoGetJugadores(){
        $.ajax({
             url: direccionWeb+'chat/jugador'
        }).done(function(data){

            if(data[0]==null || data[1]==null){
                this.huecoSala = true;
                if(data[0]!=null){
                    if(data[0].nombre==this.jugador.nombre){
                        this.nombreCreado = false;
                    }else{
                        this.nombreCreado = true;
                    }
                }else if(data[1]!=null){
                    if(data[1].nombre==this.jugador.nombre){
                        this.nombreCreado = false;
                    }else{
                        this.nombreCreado = true;
                    }
                }else{
                    this.nombreCreado = true;
                }
            }else{
                this.nombreCreado =false;
                this.huecoSala = false;
            }
            if(!this.nombreCreado && !this.huecoSala){                
                this.sameNameText.setVisible(false);
                this.fullServerText.setVisible(true);
            }else if(!this.nombreCreado && this.huecoSala){
                this.fullServerText.setVisible(false);
                this.sameNameText.setVisible(true);
            }
        }.bind(this))
    }

    metodoPostJugador(jugad){
      
        $.ajax({
            method: "POST",
            url: direccionWeb + 'chat/jugador',
            data: JSON.stringify(jugad),
            processData: false,
            headers: {
                "Content-Type": "application/json"
            }
        }).done(function(data){
            $('#nameInput').val('');
            this.scene.start('SelectApiRest',{ jugador: this.jugador});
        }.bind(this))
    }

    centerButtonText(gameText, gameButton) {
        Phaser.Display.Align.In.Center(
            gameText,
            gameButton
        );
    }
}