// criar tela 14
class Tela14 extends Phaser.Scene{
    constructor(){
        super({key: 'Tela14'});
    }
    // variáveis
    telaInicial14;
    botaoPreencher;
    botaoVoltar;
    // carregar imagens
    preload(){
        this.load.image('tela_inicial14', 'assets/cadastro/tela_inicial14.png');
        this.load.image('botao_voltar', 'assets/cadastro/botao_voltar.png');
        this.load.image('botao_preencher', 'assets/cadastro/botao_preencher.png');
       
    }
    // adição de elementos e funcionalidades
    create () {

        somClique(this);

        //adicionar tela
        this.telaInicial14 = this.add.image(400, 300, 'tela_inicial14').setScale(0.57);
        
        // definição da tela como interativa
        this.telaInicial14.setInteractive();

        //adicionar botao de voltar
        this.botaoVoltar = this.add.image(108.5, 441, 'botao_voltar').setScale(0.07); // botao voltar
        this.botaoVoltar.setDepth(3); 
        this.botaoVoltar.setInteractive();
        //adicionar botao preencher
        this.botaoPreencher = this.add.image(660, 438, 'botao_preencher').setScale(0.08); // botao vermelho
        this.botaoPreencher.setDepth(3);
        this.botaoPreencher.setInteractive();

        //ações quando clica no botão voltar

        this.botaoVoltar.on('pointerout', () => {
            // Restaurar o tamanho original do asset
            this.botaoVoltar.setScale(0.07);
        })

        this.botaoVoltar.on('pointerdown', () => { 
            
            this.scene.start('Tela12Adicionado');

        });
        
        this.botaoVoltar.on('pointerdown', () => { 
            
            this.scene.start('Tela13');

        });
        //ações quando clica no botão preencher
        this.botaoPreencher.on('pointerdown', () => { 
            
            this.scene.start('Tela14Preenchido');

        });

        // quando se clica na tela, muda a cena
        this.telaInicial14.on('pointerdown', () => { 
            
            this.scene.start('Tela14Preenchido');

        });

        



    } 

}