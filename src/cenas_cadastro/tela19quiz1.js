// criar cena 18
class Tela19quiz1 extends Phaser.Scene{
    constructor(){
        super({key: 'Tela19quiz1'});
    }
    // variáveis
    telaInicial19;
    botaoSim;
    botaoNao;
    // carregar imagens
    preload(){
        this.load.image('tela_inicial19', 'assets/cadastro/tela_inicial19.png');
        this.load.image('botao_voltar', 'assets/cadastro/botao_voltar.png');
        this.load.image('botao_sim', 'assets/cadastro/botao_sim.png');
        this.load.image('botao_nao', 'assets/cadastro/botao_nao.png');
    
    }
   // adição de elementos e funcionalidades
    create () {

        somClique(this);

        //adicionar tela
        this.telaInicial19 = this.add.image(400, 300, 'tela_inicial19').setScale(0.57);
        

        //adicionar botao sim
        this.botaoSim = this.add.image(310, 378, 'botao_sim').setScale(0.06); // botao vermelho
        this.botaoSim.setDepth(3);
        this.botaoSim.setInteractive();
       
        //adicionar botao não
        this.botaoNao = this.add.image(490, 378, 'botao_nao').setScale(0.06); // botao vermelho
        this.botaoNao.setDepth(3);
        this.botaoNao.setInteractive();

        //ações quando clica no botão não
        this.botaoNao.on('pointerover', () => {
            // Reduzir o tamanho do asset
            this.botaoNao.setScale(0.05);
        });
    
        // Configurar evento para quando o mouse não está mais sobre o asset
        this.botaoNao.on('pointerout', () => {
            // Restaurar o tamanho original do asset
            this.botaoNao.setScale(0.06);
        }) 
        this.botaoNao.on('pointerdown', () => {
            gameState.errosQuiz1 ++;
            this.scene.start('Tela19quiz1Incorreto');
        });

        //ações quando clica no botão sim

        this.botaoSim.on('pointerover', () => {
            // Reduzir o tamanho do asset
            this.botaoSim.setScale(0.05);
        });
    
        // Configurar evento para quando o mouse não está mais sobre o asset
        this.botaoSim.on('pointerout', () => {
            // Restaurar o tamanho original do asset
            this.botaoSim.setScale(0.06);
        })            

        this.botaoSim.on('pointerdown', () => {
            gameState.acertosQuiz1 ++;
            this.scene.start('Tela19quiz1Correto');
        });

        


    } 

}