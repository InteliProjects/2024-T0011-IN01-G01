//criar tela 04
class Tela04 extends Phaser.Scene{
    constructor(){
        super({key: 'Tela04'});
    }
    // variáveis
    telaInicial4;
    botaoSim;
    botaoVoltar;
    // carregar imagens
    preload(){
        this.load.image('tela_inicial4', 'assets/cadastro/tela_inicial4_se_responde_verde.png');
        this.load.image('botao_voltar', 'assets/cadastro/botao_voltar.png');
        this.load.image('botao_sim', 'assets/cadastro/botao_sim.png');
    }
    // adição de elementos e funcionalidades
    create () {
        somClique(this);

        // adicionar tela
        this.telaInicial4 = this.add.image(400, 300, 'tela_inicial4').setScale(0.57);
        //adicionar botao de voltar
        this.botaoVoltar = this.add.image(108.5, 441, 'botao_voltar').setScale(0.07); // botao voltar
        this.botaoVoltar.setDepth(3); 
        this.botaoVoltar.setInteractive();
        //adicionar botao sim
        this.botaoSim = this.add.image(400, 420, 'botao_sim').setScale(0.06); // botao vermelho
        this.botaoSim.setDepth(3);
        this.botaoSim.setInteractive();

        /*Botão voltar */

        this.botaoVoltar.on('pointerover', () => {
            // Reduzir o tamanho do asset
            this.botaoVoltar.setScale(0.06);
        });
    
        // Configurar evento para quando o mouse não está mais sobre o asset
        this.botaoVoltar.on('pointerout', () => {
            // Restaurar o tamanho original do asset
            this.botaoVoltar.setScale(0.07);
        });
        this.botaoVoltar.on('pointerdown', () => { 
            
            this.scene.start('Tela03');

        });

        /*Botão sim */

        this.botaoSim.on('pointerdown', () => { 
            
            this.scene.start('Tela05');

        });


    } 

}