// criar cena 18
class Tela22quiz4 extends Phaser.Scene{
    constructor(){
        super({key: 'Tela22quiz4'});
    }

    // variáveis
    telaInicial22;
    botaoVerdadeiro;
    botaoFalso;
    // carregar imagens
    preload(){
        this.load.image('tela_inicial22', 'assets/cadastro/tela_inicial22.png');
        this.load.image('botao_verdadeiro', 'assets/cadastro/botao_verdadeiro.png');
        this.load.image('botao_falso', 'assets/cadastro/botão_falso.png');

    }
    
    // adição de elementos e funcionalidades
    create () {

        somClique(this);

        //adicionar tela
        this.telaInicial22 = this.add.image(400, 300, 'tela_inicial22').setScale(0.57);
      

        //adicionar botao verdadeiro
        this.botaoVerdadeiro = this.add.image(310, 378, 'botao_verdadeiro').setScale(0.1); // botao vermelho
        this.botaoVerdadeiro.setDepth(3);
        this.botaoVerdadeiro.setInteractive();

        //adicionar botao falso
        this.botaoFalso = this.add.image(490, 378, 'botao_falso').setScale(0.1); // botao vermelho
        this.botaoFalso.setDepth(3);
        this.botaoFalso.setInteractive();
        this.botaoFalso.on('pointerover', () => {
            // Reduzir o tamanho do asset
            this.botaoFalso.setScale(0.09);
        });
        // Configurar evento para quando o mouse não está mais sobre o asset
        this.botaoFalso.on('pointerout', () => {
            // Restaurar o tamanho original do asset
            this.botaoFalso.setScale(0.1);
        }) 
        this.botaoFalso.on('pointerdown', () => {
            gameState.errosQuiz1 ++;
            this.scene.start('Tela22quiz4Incorreto');
        });
        
        //ações quando clica no botão sim

        this.botaoVerdadeiro.on('pointerover', () => {
            // Reduzir o tamanho do asset
            this.botaoVerdadeiro.setScale(0.09);
        });
    
        // Configurar evento para quando o mouse não está mais sobre o asset
        this.botaoVerdadeiro.on('pointerout', () => {
            // Restaurar o tamanho original do asset
            this.botaoVerdadeiro.setScale(0.1);
        })            

        this.botaoVerdadeiro.on('pointerdown', () => {
            gameState.acertosQuiz1 ++;
            this.scene.start('Tela22quiz4Correto');
        });

        

        
        


    } 
    

    update(){
    }
}