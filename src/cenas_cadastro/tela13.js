// criacao da tela 13
class Tela13 extends Phaser.Scene{
    constructor(){
        super({key: 'Tela13'});
    }
    // variáveis
    telaInicial13;
    botaoOp1;
    botaoOp2;
    botaoOp3;
    botaoVoltar;
    // carregar imagens
    preload(){
        this.load.image('tela_inicial13', 'assets/cadastro/tela_inicial13.png');
        this.load.image('botao_voltar', 'assets/cadastro/botao_voltar.png');
        this.load.image('botao_op1_cena13', 'assets/cadastro/botao_op1_cena13.png');
        this.load.image('botao_op2_cena13', 'assets/cadastro/botao_op2_cena13.png');
        this.load.image('botao_op3_cena13', 'assets/cadastro/botao_op3_cena13.png');
    
    }
    // adição de elementos e funcionalidades
    create () {

        somClique(this);

        //adicionar tela
        this.telaInicial13 = this.add.image(400, 300, 'tela_inicial13').setScale(0.57);
        //adicionar botao de voltar
        this.botaoVoltar = this.add.image(108.5, 441, 'botao_voltar').setScale(0.07); // botao voltar
        this.botaoVoltar.setDepth(3); 
        this.botaoVoltar.setInteractive();
        //adicionar botao op1
        this.botaoOp1 = this.add.image(400, 270, 'botao_op1_cena13').setScale(0.15); // botao voltar
        this.botaoOp1.setDepth(3); 
        this.botaoOp1.setInteractive();
        //adicionar botao op2
        this.botaoOp2 = this.add.image(400, 315, 'botao_op2_cena13').setScale(0.15); // botao voltar
        this.botaoOp2.setDepth(3); 
        this.botaoOp2.setInteractive();
        //adicionar botao op3
        this.botaoOp3 = this.add.image(400, 360, 'botao_op3_cena13').setScale(0.15); // botao voltar
        this.botaoOp3.setDepth(3); 
        this.botaoOp3.setInteractive();



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
            
            this.scene.start('Tela12Adicionado');

        });
        //ações quando clica no botão op1
        this.botaoOp1.on('pointerdown', () => { 
            
            this.scene.start('Tela13Op1');

        });
        //ações quando clica no botão op2
        this.botaoOp2.on('pointerdown', () => { 
            
            this.scene.start('Tela13Op2');

        });
        //ações quando clica no botão op3
        this.botaoOp3.on('pointerdown', () => { 
            
            this.scene.start('Tela13Op3');

        });
    }


}
