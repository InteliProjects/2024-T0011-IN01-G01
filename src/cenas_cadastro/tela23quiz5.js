// criar cena 18
class Tela23quiz5 extends Phaser.Scene{
    constructor(){
        super({key: 'Tela23quiz5'});
    }

    // variáveis
    telaInicial23;
    botaoQualquer;
    botaoFechar;
    botaoRepLegal;
    botaoFundador;
    // carregar imagens
    preload(){
        this.load.image('tela_inicial23', 'assets/cadastro/tela_inicial23.png');
        this.load.image('botao_qualquer', 'assets/cadastro/botao_op1_cena23.png');
        this.load.image('botao_rep_legal', 'assets/cadastro/botao_op2_cena23.png');
        this.load.image('botao_fundador', 'assets/cadastro/botao_op3_cena23.png');
    }
    
    // adição de elementos e funcionalidades
    create () {

        somClique(this);

        //adicionar tela
        this.telaInicial23 = this.add.image(400, 300, 'tela_inicial23').setScale(0.57);

        this.botaoQualquer = this.add.image(400, 332, 'botao_qualquer').setScale(0.15); 
        this.botaoQualquer.setDepth(3);
        this.botaoQualquer.setInteractive();

        this.botaoFundador = this.add.image(400, 415, 'botao_fundador').setScale(0.20);
        this.botaoFundador.setDepth(3);
        this.botaoFundador.setInteractive();

        this.botaoRepLegal = this.add.image(400, 375, 'botao_rep_legal').setScale(0.23);
        this.botaoRepLegal.setDepth(3);
        this.botaoRepLegal.setInteractive();


        this.botaoRepLegal.on('pointerover', () => {
            // Reduzir o tamanho do asset
            this.botaoRepLegal.setScale(0.22);
        });
    
        // Configurar evento para quando o mouse não está mais sobre o asset
        this.botaoRepLegal.on('pointerout', () => {
            // Restaurar o tamanho original do asset
            this.botaoRepLegal.setScale(0.23);
        })

        this.botaoRepLegal.on('pointerdown', () => {
            gameState.acertosQuiz1 ++;
            this.scene.start('Tela23quiz5Correto');
        }); 

        this.botaoQualquer.on('pointerover', () => {
            // Reduzir o tamanho do asset
            this.botaoQualquer.setScale(0.14);
        });
    
        // Configurar evento para quando o mouse não está mais sobre o asset
        this.botaoQualquer.on('pointerout', () => {
            // Restaurar o tamanho original do asset
            this.botaoQualquer.setScale(0.15);
        })

        this.botaoQualquer.on('pointerdown', () => {
            gameState.errosQuiz1 ++;
            this.scene.start('Tela23quiz5Incorreto');
        });

        this.botaoFundador.on('pointerover', () => {
            // Reduzir o tamanho do asset
            this.botaoFundador.setScale(0.19);
        });
    
        // Configurar evento para quando o mouse não está mais sobre o asset
        this.botaoFundador.on('pointerout', () => {
            // Restaurar o tamanho original do asset
            this.botaoFundador.setScale(0.20);
        })

        this.botaoFundador.on('pointerdown', () => {
            gameState.acertosQuiz1 ++;
            this.scene.start('Tela23quiz5Incorreto');
        });



    } 
    

    update(){
    }
}