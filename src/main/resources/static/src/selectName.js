class SelectName extends Phaser.Scene {
    constructor()//para poder llamar a la escena desde otras escenas
    {
        super({ key: 'SelectName', active: false });
    }
    create(){        
        this.estadoServidor = this.add.text(325, 10, 'Checking...');
        //this.connectionLost = false;
        inputName.style.display='block';
        this.nombreCreado=false;
        this.huecoSala = true;
        this.cambioScene = true;

        this.text = this.add.text(400, 175, 'Write your name', { fontFamily: 'Berlin Sans FB, "Goudy Bookletter 1911", Times, serif', fontSize: '42px', fill: '#fff' });
        this.text.setOrigin(0.5);
        this.text.setColor('#FFFFFF');
        this.sameNameText = this.add.text(165, 250, 'Name selected by another player\n             Choose another one', { fontFamily: 'Berlin Sans FB, "Goudy Bookletter 1911", Times, serif', fontSize: '32px', fill: '#fff' });
        this.sameNameText.setVisible(false);

        this.fullServerText = this.add.text(150, 250, 'Out of space - Server full of players', { fontFamily: 'Berlin Sans FB, "Goudy Bookletter 1911", Times, serif', fontSize: '32px', fill: '#fff' });
        this.fullServerText.setVisible(false);
        this.emptyNameText = this.add.text(200, 250, 'Empty name is not allowed', { fontFamily: 'Berlin Sans FB, "Goudy Bookletter 1911", Times, serif', fontSize: '32px', fill: '#fff' });
        this.emptyNameText.setVisible(false);
        this.serverOffText = this.add.text(300, 250, 'Server is closed', { fontFamily: 'Berlin Sans FB, "Goudy Bookletter 1911", Times, serif', fontSize: '32px', fill: '#fff' });
        this.serverOffText.setVisible(false);

        this.sendButton = this.add.sprite(387, 450, 'redButton01').setInteractive();
        this.sendText = this.add.text(0, 0, 'DONE', { fontFamily: 'Berlin Sans FB, "Goudy Bookletter 1911", Times, serif', fontSize: '32px', fill: '#fff' });
        this.centerButtonText(this.sendText, this.sendButton);

        this.sendButton.on('pointerover', () => this.sendButton.setTexture('redButton02'));
        this.sendButton.on('pointerout', () => this.sendButton.setTexture('redButton01'));

        this.sendButton.on('pointerdown', function (pointer) {
            if(!$('#nameInput').val().trim()){
                this.sameNameText.setVisible(false);
                this.fullServerText.setVisible(false);
                this.serverOffText.setVisible(false);
                this.emptyNameText.setVisible(true);
            }else{

                this.nombreJug= $('#nameInput').val();
                this.jugador={
                    nombre: this.nombreJug,
                    sprite: -1
                 }

            this.metodoGetJugadores();
            }
            /*
            this.cameras.main.fadeOut(500);
            this.cameras.main.once('camerafadeoutcomplete', function (camera) {  
                $('#nameInput').val('');              
                inputName.style.display='none';
                this.scene.start('Menu');
            }, this);*/
        }.bind(this));

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

       this.valorInput = $('#nameInput').on('keyup',function(ele){
            if(ele.key=='Enter'){
                if(!$('#nameInput').val().trim()){
                    this.sameNameText.setVisible(false);
                    this.fullServerText.setVisible(false);
                    this.serverOffText.setVisible(false);
                    this.emptyNameText.setVisible(true);
                }else{

                    this.nombreJug= $('#nameInput').val();
                    this.jugador={
                        nombre: this.nombreJug,
                        sprite: -1
                     }
    
                this.metodoGetJugadores();
                }
            }
        }.bind(this))
        
        this.checkServerStatus();
        this.timer = this.time.addEvent({ delay: 2000, callback: this.checkServerStatus, callbackScope: this, loop: true });
    }
    checkServerStatus(){
        $.ajax({
            url: 'https'+urlOnline + 'chat'
        }).done(function (data) {

            if (!this.scene.isActive('SelectName')) {
                return;
            }
            this.estadoServidor.setText('Server: Online')
        }.bind(this)).fail(function (data) {
            if(this.scene.isActive('SelectName')){
              this.estadoServidor.setText('Server: Offline');                
            }
            console.log('Server currently closed');
            //this.connectionLost = true;
            //this.timer.paused = true;            
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
             url: 'https'+urlOnline + 'chat/jugador',
             timeout: 2500
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
                this.emptyNameText.setVisible(false);
                this.serverOffText.setVisible(false);             
                this.sameNameText.setVisible(false);
                this.fullServerText.setVisible(true);
            }else if(!this.nombreCreado && this.huecoSala){
                this.emptyNameText.setVisible(false);
                this.serverOffText.setVisible(false); 
                this.fullServerText.setVisible(false);
                this.sameNameText.setVisible(true);
            }
        }.bind(this)).fail(function(){
            this.sameNameText.setVisible(false);
            this.fullServerText.setVisible(false);
            this.emptyNameText.setVisible(false);
            this.serverOffText.setVisible(true);            
            $('#nameInput').val('');
        }.bind(this))
    }

    metodoPostJugador(jugad){
      
        $.ajax({
            method: 'POST',
            url: 'https'+urlOnline + 'chat/jugador',
            data: JSON.stringify(jugad),
            processData: false,
            headers: {
                "Content-Type": "application/json"
            },
            timeout: 2500
        }).done(function(data){
            $('#nameInput').val('');
            this.scene.start('SelectApiRest',{ jugador: this.jugador});
        }.bind(this)).fail(function(){
            this.sameNameText.setVisible(false);
            this.fullServerText.setVisible(false);
            this.emptyNameText.setVisible(false);
            this.serverOffText.setVisible(true);            
            $('#nameInput').val('');
        }.bind(this))
    }

    centerButtonText(gameText, gameButton) {
        Phaser.Display.Align.In.Center(
            gameText,
            gameButton
        );
    }
}