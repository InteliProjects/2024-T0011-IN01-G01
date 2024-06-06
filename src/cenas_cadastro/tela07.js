// criacao tela 07
class Tela07 extends Phaser.Scene{
    constructor(){
        super({key: 'Tela07'});
    }

    //variaveis
    telaInicial7;
    botaoSim;
    botaoVoltar;
    //carregar imagens
    preload(){
        this.load.image('tela_inicial7', 'assets/cadastro/tela_inicial7.png');
        this.load.image('botao_voltar', 'assets/cadastro/botao_voltar.png');
        this.load.image('botao_sim', 'assets/cadastro/botao_sim.png');
    }

    // adição de elementos e funcionalidades
    create () {
        somClique(this);

        //adicionar tela
        this.telaInicial7 = this.add.image(400, 300, 'tela_inicial7').setScale(0.57);

        //adicionar botao de voltar
        this.botaoVoltar = this.add.image(108.5, 441, 'botao_voltar').setScale(0.07); // botao voltar
        this.botaoVoltar.setDepth(3); 
        this.botaoVoltar.setInteractive();

        //adicionar botao sim
        this.botaoSim = this.add.image(400, 420, 'botao_sim').setScale(0.06); // botao vermelho
        this.botaoSim.setDepth(3);
        this.botaoSim.setInteractive();
        
        // ações quando clica no botão voltar
        this.botaoVoltar.on('pointerdown', () => { 
            
            this.scene.start('Tela06');

        });

        /*Botão voltar */

        this.botaoVoltar.on('pointerover', () => {
            // Reduzir o tamanho do asset
            this.botaoVoltar.setScale(0.06);
        });
    
        // Configurar evento para quando o mouse não está mais sobre o asset
        this.botaoVoltar.on('pointerout', () => {
            // Restaurar o tamanho original do asset
            this.botaoVoltar.setScale(0.07);
        })

        /*Botão sim */
        //ações quando clica no botão sim
        this.botaoSim.on('pointerdown', () => { 
            
            this.scene.start('Tela08');

        });
    } 

}