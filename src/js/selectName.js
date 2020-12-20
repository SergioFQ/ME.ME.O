class SelectName extends Phaser.Scene {
    constructor()//para poder llamar a la escena desde otras escenas
    {
        super({ key: 'SelectName', active: false });
    }
    create(){

        this.i=document.getElementById("nameInput");
        this.i.style.position="absolute";
        this.i.style.display="block";
        this.i.style.top="570px";

        $("#nameInput").on('keydown',function(ele){
            if(ele.key=='Enter'){
                this.frase= $('#input').val();
                this.frasess={
                    id: 1,
                    frase: this.frase
                 }
                this.metodoPost(this.frasess);
                $('#input').val("");
    
    
    
            }
        }.bind(this))
    }
}