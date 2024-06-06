// cricao tela 06
class Tela06 extends Phaser.Scene{
    constructor(){
        super({key: 'Tela06'});
    }
    //variaveis
    telaInicial6;
    botaoSeguir;
    botaoVoltar;
    //carregar imagens
    preload(){
        this.load.image('tela_inicial6', 'assets/cadastro/tela_inicial6.png');
        this.load.image('botao_voltar', 'assets/cadastro/botao_voltar.png');
        this.load.image('botao_seguir', 'assets/cadastro/botao_seguir.png');
    }
    // adição de elementos e funcionalidades
    create () {
        somClique(this);

        //adicionar tela
        this.telaInicial6 = this.add.image(400, 300, 'tela_inicial6').setScale(0.57);
        //adicionar botao de voltar
        this.botaoVoltar = this.add.image(108.5, 441, 'botao_voltar').setScale(0.07); // botao voltar
        this.botaoVoltar.setDepth(3); 
        this.botaoVoltar.setInteractive();

        //adicionar botao seguir
        this.botaoSeguir = this.add.image(691, 441, 'botao_seguir').setScale(0.07);
        this.botaoSeguir.setDepth(3); 
        this.botaoSeguir.setInteractive(); 
    
        /* Botão voltar */

        this.botaoVoltar.on('pointerover', () => {
            // Reduzir o tamanho do asset
            this.botaoVoltar.setScale(0.06);
        });
    
        // Configurar evento para quando o mouse não está mais sobre o asset
        this.botaoVoltar.on('pointerout', () => {
            // Restaurar o tamanho original do asset
            this.botaoVoltar.setScale(0.07);
        })
        // ações quando clica no botão voltar
        this.botaoVoltar.on('pointerdown', () => { 
            
            this.scene.start('Tela05Cadastro');

        });

        /* Botão seguir */

        //ações quando clica no botão seguir
        this.botaoSeguir.on('pointerdown', () => { 
            
            this.scene.start('Tela07');

        });

        
        this.botaoSeguir.on('pointerover', () => {
            // Reduzir o tamanho do asset
            this.botaoSeguir.setScale(0.06);
        });
    
        // Configurar evento para quando o mouse não está mais sobre o asset
        this.botaoSeguir.on('pointerout', () => {
            // Restaurar o tamanho original do asset
            this.botaoSeguir.setScale(0.07);
        })
    } 

}