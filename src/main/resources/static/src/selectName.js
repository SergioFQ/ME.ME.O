class SelectName extends Phaser.Scene {
    constructor()//para poder llamar a la escena desde otras escenas
    {
        super({ key: 'SelectName', active: false });
    }
    create(){

        console.log(direccionWeb);
        this.i=document.getElementById("nameInput");
        this.i.style.position="absolute";
        this.i.style.display="block";
        this.i.style.top="300px";
        this.i.style.right="400px";
        this.nombreCreado=false;

       $("#nameInput").on('keyup',function(ele){
            if(ele.key=='Enter'){
                this.nombreJug= $('#nameInput').val();
                this.jugador={
                    nombre: this.nombreJug
                 }

                //this.metodoPost(this.jugador);
            this.metodoGetJugadores();
                
           $('#nameInput').val("");
          // this.nombreJug=null;
            }
        }.bind(this))
    }

    update(){
        console.log(this.nombreCreado);
        if(this.nombreCreado==true){
            this.i.display="none";
            this.metodoPostJugador(this.jugador);
            this.scene.start('SelectApiRest',{ nombre: this.jugador.nombre});
        }
    }
    metodoGetJugadores(){
        $.ajax({
             url: direccionWeb+'chat/jugador'
        }).done(function(data){

            if(data[0]==null || data[1]==null){
                console.log("Entro al if inicial");
                if(data[0]!=null){
                    if(data[0].nombre==this.jugador.nombre){
                        console.log("El plagio es un delito");
                        this.nombreCreado = false;
                    }else{
                        this.nombreCreado = true;
                    }
                }else if(data[1]!=null){
                    if(data[1].nombre==this.jugador.nombre){
                        console.log("El plagio es un delito");
                        this.nombreCreado = false;
                    }else{
                        this.nombreCreado = true;
                    }
                }else{
                    this.nombreCreado = true;
                }
            }else{
                this.nombreCreado =false;
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
        })
    }
}