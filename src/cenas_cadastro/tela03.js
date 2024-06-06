// classe da tela03
class Tela03 extends Phaser.Scene{
    constructor(){
        super({key: 'Tela03'});
    }

    // variáveis
    telaInicial3;
    botaoVerde;
    botaoVermelho;
    botaoVoltar;
    preload(){
        this.load.image('tela_inicial3', 'assets/cadastro/tela_inicial3.png');
        this.load.image('botao_voltar', 'assets/cadastro/botao_voltar.png');
        this.load.image('botao_verde', 'assets/cadastro/botao_verde.png');
        this.load.image('botao_vermelho', 'assets/cadastro/botao_vermelho.png');
    
    }

    // adição de elementos e funcionalidades
    create () {
        somClique(this);


        // adicionar tela
        this.telaInicial3 = this.add.image(400, 300, 'tela_inicial3').setScale(0.57);

        //adicionar botao de voltar
        this.botaoVoltar = this.add.image(108.5, 441, 'botao_voltar').setScale(0.07); // botao voltar
        this.botaoVoltar.setDepth(3); 
        this.botaoVoltar.setInteractive();

        //adicionar botao vermelho
        this.botaoVermelho = this.add.image(363, 333, 'botao_vermelho').setScale(0.05); // botao vermelho
        this.botaoVermelho.setDepth(3);
        this.botaoVermelho.setInteractive();

        //adicionar botao verde
        this.botaoVerde = this.add.image(437, 333, 'botao_verde').setScale(0.05); // botao vermelho
        this.botaoVerde.setDepth(3);
        this.botaoVerde.setInteractive();

        /*Botão voltar */
        
        this.botaoVoltar.on('pointerdown', () => { 
            
            this.scene.start('Cadastro');

        });

        this.botaoVoltar.on('pointerover', () => {
            // Reduzir o tamanho do asset
            this.botaoVoltar.setScale(0.06);
        });
    
        // Configurar evento para quando o mouse não está mais sobre o asset
        this.botaoVoltar.on('pointerout', () => {
            // Restaurar o tamanho original do asset
            this.botaoVoltar.setScale(0.07);
        });

        /*Botão vermelho */

        this.botaoVermelho.on('pointerdown', () => { 
            
            this.scene.start('Tela05');

        });

        this.botaoVermelho.on('pointerover', () => {
            // Reduzir o tamanho do asset
            this.botaoVermelho.setScale(0.04);
        });
    
        // Configurar evento para quando o mouse não está mais sobre o asset
        this.botaoVermelho.on('pointerout', () => {
            // Restaurar o tamanho original do asset
            this.botaoVermelho.setScale(0.05);
        });

        /*Botão verde */

        this.botaoVerde.on('pointerdown', () => { 
            
            this.scene.start('Tela04');

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
