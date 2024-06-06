// criar tela 15
class Tela15 extends Phaser.Scene{
    constructor(){
        super({key: 'Tela15'});
    }
    // variáveis
    telaInicial15;
    botaoSeguir;
    botaoVoltar;
    botaoContrato;
    // carregar imagens
    preload(){
        this.load.image('tela_inicial15', 'assets/cadastro/tela_inicial15.png');
        this.load.image('botao_voltar', 'assets/cadastro/botao_voltar.png');
        this.load.image('botao_seguir', 'assets/cadastro/botao_seguir.png');
        this.load.image('botao_contrato', 'assets/cadastro/botao_contrato.png');

    }
    // adição de elementos e funcionalidades
    create () {

        somClique(this);

        //adicionar tela
        this.telaInicial15 = this.add.image(400, 300, 'tela_inicial15').setScale(0.57);
        //adicionar botao de voltar
        this.botaoVoltar = this.add.image(108.5, 441, 'botao_voltar').setScale(0.07); // botao voltar
        this.botaoVoltar.setDepth(3); 
        this.botaoVoltar.setInteractive();
        //adicionar botao seguir
        this.botaoSeguir = this.add.image(691, 441, 'botao_seguir').setScale(0.07);
        this.botaoSeguir.setDepth(3); 
        this.botaoSeguir.setInteractive(); 
        //adicionar botao contrato
        this.botaoContrato = this.add.image(398, 382, 'botao_contrato').setScale(0.15);
        this.botaoContrato.setDepth(3); 
        this.botaoContrato.setInteractive(); 

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
            
            this.scene.start('Tela14Preenchido');

        });
        //ações quando clica no botão seguir

        this.botaoSeguir.on('pointerover', () => {
            // Reduzir o tamanho do asset
            this.botaoSeguir.setScale(0.06);
        });
    
        // Configurar evento para quando o mouse não está mais sobre o asset
        this.botaoSeguir.on('pointerout', () => {
            // Restaurar o tamanho original do asset
            this.botaoSeguir.setScale(0.07);
        })

        this.botaoSeguir.on('pointerdown', () => { 
            
            this.scene.start('Tela16');

        });
        //ações quando clica no botão contrato

        this.botaoContrato.on('pointerover', () => {
            // Reduzir o tamanho do asset
            this.botaoContrato.setScale(0.14);
        });
    
        // Configurar evento para quando o mouse não está mais sobre o asset
        this.botaoContrato.on('pointerout', () => {
            // Restaurar o tamanho original do asset
            this.botaoContrato.setScale(0.15);
        })

        this.botaoContrato.on('pointerdown', () => { 
            
            window.open('https://academy.oracle.com/pages/legal/membership_agreement/SAMPLE_OA_Institution%20Membership%20Agreement_v082222_BR_POR.pdf', '_blank');

        });
    }


}
