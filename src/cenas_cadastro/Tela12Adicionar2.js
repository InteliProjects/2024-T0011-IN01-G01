// criacao da tela 12 adicionar parte 2
class Tela12Adicionar2 extends Phaser.Scene{
    constructor(){
        super({key: 'Tela12Adicionar2'});
    }
    // variáveis
    telaInicial12Adicionar2;
    botaoAdicionar;
    botaoVoltar;
    // carregar imagens
    preload(){
        this.load.image('tela_inicial12_adicionar2', 'assets/cadastro/tela_inicial12_adicionar2.png');
        this.load.image('botao_voltar', 'assets/cadastro/botao_voltar.png');
        this.load.image('botao_adicionar', 'assets/cadastro/botao_adicionar.png');
    }
    
    // adição de elementos e funcionalidades
    create () {

        somClique(this);

        //adicionar tela
        this.telaInicial12Adicionar2 = this.add.image(400, 300, 'tela_inicial12_adicionar2').setScale(0.57);
        // configuração da tela como interativa
        this.telaInicial12Adicionar2.setInteractive();
        
        //adicionar botao de voltar
        this.botaoVoltar = this.add.image(108.5, 441, 'botao_voltar').setScale(0.07); // botao voltar
        this.botaoVoltar.setDepth(3); 
        this.botaoVoltar.setInteractive();
        //adicionar botao adicionar
        this.botaoAdicionar = this.add.image(660, 438, 'botao_adicionar').setScale(0.08); // botao vermelho
        this.botaoAdicionar.setDepth(3);
        this.botaoAdicionar.setInteractive();

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
            
            this.scene.start('Tela11Adicionar');

        });

        // quando a tela é clicada, muda a cena
        this.telaInicial12Adicionar2.on('pointerdown', () => { 
            
            this.scene.start('Tela12Adicionado');

        });

        //ações quando clica no botão adicionar
        this.botaoAdicionar.on('pointerdown', () => { 
            
            this.scene.start('Tela12Adicionado');

        });

        



    } 

}