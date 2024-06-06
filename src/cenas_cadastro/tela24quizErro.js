//criar tela 04
class Tela24quizErro extends Phaser.Scene{
    constructor(){
        super({key: 'Tela24quizErro'});
    }
    // variáveis
    telaInicial24;
    botaoSim;
    // carregar imagens
    preload(){
        this.load.image('tela_inicial24_erro', 'assets/cadastro/tela_inicial25_se_errar.png');
        this.load.image('botao_sim', 'assets/cadastro/botao_sim.png');
    }
    
    // adição de elementos e funcionalidades
    create () {

        somClique(this);

        // adicionar tela
        this.telaInicial24 = this.add.image(400, 300, 'tela_inicial24_erro').setScale(0.57);
        
        //adicionar botao sim
        this.botaoSim = this.add.image(400, 420, 'botao_sim').setScale(0.06); // botao vermelho
        this.botaoSim.setDepth(3);
        this.botaoSim.setInteractive();


        /*Botão sim */

        this.botaoSim.on('pointerover', () => {
            // Reduzir o tamanho do asset
            this.botaoSim.setScale(0.05);
        });
    
        // Configurar evento para quando o mouse não está mais sobre o asset
        this.botaoSim.on('pointerout', () => {
            // Restaurar o tamanho original do asset
            this.botaoSim.setScale(0.06);
        })

        // trecho que reinicia o quiz, e retorna para a pergunta inicial
        this.botaoSim.on('pointerdown', () => { 
            gameState.errosQuiz1 = 0;
            gameState.acertosQuiz1 = 0;
            this.scene.start('Tela19quiz1');

        });


    } 

}