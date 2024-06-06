// criar tela 16
class Tela16 extends Phaser.Scene{
    constructor(){
        super({key: 'Tela16'});
    }
    // variáveis
    telaInicial16;
    botaoCinza;
    botaoVoltar;
    // carregar imagens
    preload(){
        this.load.image('tela_inicial16', 'assets/cadastro/tela_inicial16.png');
        this.load.image('botao_voltar', 'assets/cadastro/botao_voltar.png');
        this.load.image('botao_cinza', 'assets/cadastro/botao_cinza.png');
    }
    // adição de elementos e funcionalidades
    create () {

        somClique(this);

        //adicionar tela
        this.telaInicial16 = this.add.image(400, 300, 'tela_inicial16').setScale(0.57);
        //adicionar botao de voltar
        this.botaoVoltar = this.add.image(108.5, 441, 'botao_voltar').setScale(0.07); // botao voltar
        this.botaoVoltar.setDepth(3); 
        this.botaoVoltar.setInteractive();
        //adicionar botao seguir
        this.botaoCinza = this.add.image(400, 411, 'botao_cinza').setScale(0.05); // botao voltar
        this.botaoCinza.setDepth(3); 
        this.botaoCinza.setInteractive();

        //ações quando clica no botão voltar

        this.botaoVoltar.on('pointerover', () => {
            // Reduzir o tamanho do asset
            this.botaoVoltar.setScale(0.06);
        });
    
        // Configurar evento para quando o mouse não está mais sobre o asset
        this.botaoVoltar.on('pointerout', () => {
            // Restaurar o tamanho original do asset
            this.botaoVoltar.setScale(0.07);
        })

        this.botaoVoltar.on('pointerdown', () => { 
            
            this.scene.start('Tela15');

        });
        //ações quando clica no botão cinza

        this.botaoCinza.on('pointerover', () => {
            // Reduzir o tamanho do asset
            this.botaoCinza.setScale(0.04);
        });
    
        // Configurar evento para quando o mouse não está mais sobre o asset
        this.botaoCinza.on('pointerout', () => {
            // Restaurar o tamanho original do asset
            this.botaoCinza.setScale(0.05);
        })

        this.botaoCinza.on('pointerdown', () => { 
            
            this.scene.start('Tela16Revisado');

        });

      
    }


}
