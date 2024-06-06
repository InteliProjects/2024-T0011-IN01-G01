// criacao tela 11 adicionar
class Tela11Adicionar extends Phaser.Scene{
    constructor(){
        super({key: 'Tela11Adicionar'});
    }
    // variáveis
    Tela11Adicionar;
    botaoAdicionarInst;
    botaoVoltar;
    // carregar imagens
    preload(){
        this.load.image('tela_inicial11_adicionar', 'assets/cadastro/tela_inicial11_adicionar.png');
        this.load.image('botao_voltar', 'assets/cadastro/botao_voltar.png');
        this.load.image('botao_adicionar_inst', 'assets/cadastro/botao_adicionar_inst.png');
    }
    // adição de elementos e funcionalidades
    create () {

        somClique(this);

        //adicionar tela
        this.Tela11Adicionar = this.add.image(400, 300, 'tela_inicial11_adicionar').setScale(0.57);
        // configuração da tela como interativa
        this.Tela11Adicionar.setInteractive();

        //adicionar botao de voltar
        this.botaoVoltar = this.add.image(108.5, 441, 'botao_voltar').setScale(0.07); // botao voltar
        this.botaoVoltar.setDepth(3); 
        this.botaoVoltar.setInteractive();

        //adicionar botao adicionar
        this.botaoAdicionarInst = this.add.image(405, 328, 'botao_adicionar_inst').setScale(0.13); // botao vermelho
        this.botaoAdicionarInst.setDepth(3);
        this.botaoAdicionarInst.setInteractive();
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

        // quando a tela é clicada, muda a cena
        this.Tela11Adicionar.on('pointerdown', () => { 
            
            this.scene.start('Tela12Adicionar2');

        });

        this.botaoVoltar.on('pointerdown', () => { 
            
            this.scene.start('Tela11Preenchido');

        });
        //ações quando clica no botão adicionar
        
        this.botaoAdicionarInst.on('pointerdown', () => { 
            
            this.scene.start('Tela12Adicionar2');

        });

        



    } 

}