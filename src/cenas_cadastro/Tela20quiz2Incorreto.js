class Tela20quiz2Incorreto extends Phaser.Scene {
    constructor(){ 
        super({key: 'Tela20quiz2Incorreto'});
    }
    
    preload () {
         // Carregamento de assets
        this.load.image ("tela20Incorreto", 'assets/cadastro/respostaErrada20.png');
        this.load.spritesheet ("botaoAvancar", 'assets/cadastro/botao_avançar.png');
    }

    // adição de elementos e funcionalidades
    create () {

        somClique(this);

         // adição de fundo e botão
        this.add.image (400, 300, "tela20Incorreto").setScale(0.57);
        this.botaoAvancar = this.add.image (400, 379, "botaoAvancar").setScale(0.09);
        this.botaoAvancar.setInteractive(); // botão interativo

        // Efeito de crescimento do botão quando o mouse está por cima dele
        this.botaoAvancar.on('pointerover', () => {
            this.botaoAvancar.setScale(0.08);
        });
    
        // Configurar evento para quando o mouse não está mais sobre o asset
        this.botaoAvancar.on('pointerout', () => {
            this.botaoAvancar.setScale(0.09);
        })

         // Configurar evento de clique do botão
        this.botaoAvancar.on('pointerdown', () => {
            this.scene.start('Tela21quiz3'); // Vai para a próxima questão
        });
    }
}