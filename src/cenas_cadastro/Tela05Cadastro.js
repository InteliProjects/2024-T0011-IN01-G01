//criacao tela 05 cadastro
class Tela05Cadastro extends Phaser.Scene{
    constructor(){
        super({key: 'Tela05Cadastro'});
    }

    //variaveis
    telaInicial5Cadastro;
    botaoSeguir;
    botaoVoltar;

    //carregar imagens
    preload(){
        this.load.image('tela_inicial5_cadastro', 'assets/cadastro/tela_inicial5_cadastro.png');
        this.load.image('botao_voltar', 'assets/cadastro/botao_voltar.png');
        this.load.image('botao_seguir', 'assets/cadastro/botao_seguir.png');
    }
    // adição de elementos e funcionalidades
    create () {
        somClique(this);

        this.telaInicial5Cadastro = this.add.image(400, 300, 'tela_inicial5_cadastro').setScale(0.57);
        //adicionar botao de voltar
        this.botaoVoltar = this.add.image(108.5, 441, 'botao_voltar').setScale(0.07); // botao voltar
        this.botaoVoltar.setDepth(3); 
        this.botaoVoltar.setInteractive();

        //adicionar botao seguir
        this.botaoSeguir = this.add.image(691, 441, 'botao_seguir').setScale(0.07);
        this.botaoSeguir.setDepth(3); 
        this.botaoSeguir.setInteractive();

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
            
            this.scene.start('Tela05');

        });

        /*Botão seguir */

        this.botaoSeguir.on('pointerover', () => {
            // Reduzir o tamanho do asset
            this.botaoSeguir.setScale(0.06);
        });
    
        // Configurar evento para quando o mouse não está mais sobre o asset
        this.botaoSeguir.on('pointerout', () => {
            // Restaurar o tamanho original do asset
            this.botaoSeguir.setScale(0.07);
        });

        this.botaoSeguir.on('pointerdown', () => { 
            
            this.scene.start('Tela06');

        });

        



    } 

}