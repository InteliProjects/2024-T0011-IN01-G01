// criacao de tela 05
class Tela05 extends Phaser.Scene{
    constructor(){
        super({key: 'Tela05'});
    }
    //variaveis
    telaInicial5;
    botaoCadastrar;
    botaoVoltar;
    //carregar imagens
    preload(){
        this.load.image('tela_inicial5', 'assets/cadastro/tela_inicial5.png');
        this.load.image('botao_voltar', 'assets/cadastro/botao_voltar.png');
        this.load.image('botao_cadastrar', 'assets/cadastro/botao_cadastrar.png');
    }
    // adição de elementos e funcionalidades
    create () {
        somClique(this);

        // Adição do background que tem a tela do computador
        this.telaInicial5 = this.add.image(400, 300, 'tela_inicial5').setScale(0.57);
        
        // Definição do background como interativo, pois assim o jogador pode clicar livremente nos campos de texto
        this.telaInicial5.setInteractive();

        //adicionar botao de voltar
        this.botaoVoltar = this.add.image(108.5, 441, 'botao_voltar').setScale(0.07); // botao voltar
        this.botaoVoltar.setDepth(3); 
        this.botaoVoltar.setInteractive();

        //adicionar botao cadastrar
        this.botaoCadastrar = this.add.image(651, 438, 'botao_cadastrar').setScale(0.08); // botao vermelho
        this.botaoCadastrar.setDepth(3);
        this.botaoCadastrar.setInteractive();

        /* Botão voltar  */


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
            
            this.scene.start('Tela03');

        });

        this.telaInicial5.on('pointerdown', () => { 
            
            this.scene.start('Tela05Cadastro');

        });

        /* Botão Cadastrar  */
        //ações quando clica no botão cadastrar
        this.botaoCadastrar.on('pointerdown', () => { 
            
            this.scene.start('Tela05Cadastro');

        });

        



    } 

}