//criar tela 04
class Tela24quizCerto extends Phaser.Scene{
    constructor(){
        super({key: 'Tela24quizCerto'});
    }
    // variáveis
    telaInicial24;
    botaoSim;
    // carregar imagens
    preload(){
        this.load.image('tela_inicial24', 'assets/cadastro/tela_inicial24.png');
        this.load.image('botao_sim', 'assets/cadastro/botao_sim.png');
       
    }

    // adição de elementos e funcionalidades
    create () {

        somClique(this);

        // adicionar tela
        this.telaInicial24 = this.add.image(400, 300, 'tela_inicial24').setScale(0.57);
        
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

        // validação de ganho da insígnia Cadastros
        this.botaoSim.on('pointerdown', () => { 
            gameState.insignia1 = true;
            this.scene.start('Recepcao2');

        });


    } 

}