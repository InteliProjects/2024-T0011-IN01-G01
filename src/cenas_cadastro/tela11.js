// criar tela 11
class Tela11 extends Phaser.Scene{
    constructor(){
        super({key: 'Tela11'});
    }
    // variáveis
    telaInicial11;
    botaoPreencher;
    botaoVoltar;
    // carregar imagens
    preload(){
        this.load.image('tela_inicial11', 'assets/cadastro/tela_inicial11.png');
        this.load.image('botao_voltar', 'assets/cadastro/botao_voltar.png');
        this.load.image('botao_preencher', 'assets/cadastro/botao_preencher.png');

    }
    
    // adição de elementos e funcionalidades
    create () {

        somClique(this);

        //adicionar tela
        this.telaInicial11 = this.add.image(400, 300, 'tela_inicial11').setScale(0.57);
        // configuração da tela como interativa
        this.telaInicial11.setInteractive();
        
        //adicionar botao de voltar
        this.botaoVoltar = this.add.image(108.5, 441, 'botao_voltar').setScale(0.07); // botao voltar
        this.botaoVoltar.setDepth(3); 
        this.botaoVoltar.setInteractive();
        //adicionar botao preencher
        this.botaoPreencher = this.add.image(660, 438, 'botao_preencher').setScale(0.08); // botao vermelho
        this.botaoPreencher.setDepth(3);
        this.botaoPreencher.setInteractive();

        //ações quando clica no botão voltar
        
        this.telaInicial11.on('pointerdown', () => {
            // mudar a cena quando clica na tela
            this.scene.start('Tela11Preenchido');
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

        this.botaoVoltar.on('pointerdown', () => { 
            
            this.scene.start('Tela10');

        });
        //ações quando clica no botão preencher
        this.botaoPreencher.on('pointerdown', () => { 
            
            this.scene.start('Tela11Preenchido');

        });

        



    } 

}