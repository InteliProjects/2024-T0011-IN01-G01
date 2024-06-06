// criacao da classe cadastro
class Cadastro extends Phaser.Scene{
    constructor(){
        super({key: 'Cadastro'});
    }
    //variáveis
    telaInicial2;
    botaoSeguir;

    //carregar imagens
    preload(){
        this.load.image('tela_inicial2', 'assets/cadastro/tela_inicial2.png');
        this.load.image('botao_seguir', 'assets/cadastro/botao_seguir.png');
    }

     // adição de elementos e funcionalidades
    create () {
        somClique(this);

        // Adição da tela inicial e do botão de Seguir
        this.telaInicial2 = this.add.image(400, 300, 'tela_inicial2').setScale(0.57);
        this.botaoSeguir = this.add.image(691, 441, 'botao_seguir').setScale(0.07);
        this.botaoSeguir.setDepth(3); // aqui você define em que camada fica o elemento, qunato maior o número, mais em cima a camada
        this.botaoSeguir.setInteractive(); // aqui você define que o botão é interativo, para você poder clicar nele

        /*Botão seguir */
        this.botaoSeguir.on('pointerover', () => {
            // Reduzir o tamanho do asset
            this.botaoSeguir.setScale(0.06);
            this.input.setDefaultCursor('pointer');
        });
    
        // Configurar evento para quando o mouse não está mais sobre o asset
        this.botaoSeguir.on('pointerout', () => {
            // Restaurar o tamanho original do asset
            this.botaoSeguir.setScale(0.07);
            this.input.setDefaultCursor('auto');

        });

          // ações para quando clica no botão de seguir
        this.botaoSeguir.on('pointerdown', () => { // ações quando clica no botão
            this.scene.start('Tela03');
        
        });
    }

}