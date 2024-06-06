// criar tela 08
class Tela08 extends Phaser.Scene{
    constructor(){
        super({key: 'Tela08'});
    }
    // variáveis
    telaInicial8;
    botaoVermelho;
    botaoVerde;
    botaoVoltar;
    // carregar imagens
    preload(){
        this.load.image('tela_inicial8', 'assets/cadastro/tela_inicial8.png');
        this.load.image('botao_voltar', 'assets/cadastro/botao_voltar.png');
        this.load.image('botao_verde', 'assets/cadastro/botao_verde.png');
        this.load.image('botao_vermelho', 'assets/cadastro/botao_vermelho.png');
    }
    // adição de elementos e funcionalidades
    create () {

        somClique(this);

        //adicionar tela    
        this.telaInicial8 = this.add.image(400, 300, 'tela_inicial8').setScale(0.57);
        //adicionar botao de voltar
        this.botaoVoltar = this.add.image(108.5, 441, 'botao_voltar').setScale(0.07); // botao voltar
        this.botaoVoltar.setDepth(3); 
        this.botaoVoltar.setInteractive();
        //adicionar botao vermelho
        this.botaoVermelho = this.add.image(361, 380, 'botao_vermelho').setScale(0.05); // botao vermelho
        this.botaoVermelho.setDepth(3);
        this.botaoVermelho.setInteractive();
        //adicionar botao verde
        this.botaoVerde = this.add.image(435, 380, 'botao_verde').setScale(0.05); // botao vermelho
        this.botaoVerde.setDepth(3);
        this.botaoVerde.setInteractive();

        //ações quando clica no botão voltar
        this.botaoVoltar.on('pointerdown', () => { 
            
            this.scene.start('Tela07');

        });

        this.botaoVoltar.on('pointerover', () => {
            // Reduzir o tamanho do asset
            this.botaoVoltar.setScale(0.06);
        });
    
        // Configurar evento para quando o mouse não está mais sobre o asset
        this.botaoVoltar.on('pointerout', () => {
            // Restaurar o tamanho original do asset
            this.botaoVoltar.setScale(0.07);
        })

        /*Botão vermelho */

        this.botaoVermelho.on('pointerover', () => {
            // Reduzir o tamanho do asset
            this.botaoVermelho.setScale(0.04);
        });
    
        // Configurar evento para quando o mouse não está mais sobre o asset
        this.botaoVermelho.on('pointerout', () => {
            // Restaurar o tamanho original do asset
            this.botaoVermelho.setScale(0.05);
        });

        //ações quando clica no botão vermelho
        this.botaoVermelho.on('pointerdown', () => { 
            
            this.scene.start('Tela10');

        /*Botão verde */

        });
        //ações quando clica no botão verde
        this.botaoVerde.on('pointerdown', () => { 
            
            this.scene.start('Tela09');

        });

        this.botaoVerde.on('pointerover', () => {
            // Reduzir o tamanho do asset
            this.botaoVerde.setScale(0.04);
        });
    
        // Configurar evento para quando o mouse não está mais sobre o asset
        this.botaoVerde.on('pointerout', () => {
            // Restaurar o tamanho original do asset
            this.botaoVerde.setScale(0.05);
        });



    } 

}
