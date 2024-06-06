class Tela23quiz5Correto extends Phaser.Scene {
    constructor(){ 
        super({key: 'Tela23quiz5Correto'});
    }
    
    preload () {
        // Carregamento de assets
        this.load.image ("tela23Correto", 'assets/cadastro/respostaCerta23.png');
        this.load.image ("botaoAvancar", 'assets/cadastro/botao_avançar.png');
    }

    // adição de elementos e funcionalidades
    create () {

        somClique(this);

         // adição de fundo e botão
        this.add.image (400, 300, "tela23Correto").setScale(0.57);
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

        // evento de clique do botão, com uma validação de erros e acertos nas questões do quiz. Se o jogador acerta 3 questões ou mais, ele é direcionado para a tela de parabéns, caso contrário, ele é direcionado para a tela de erro. 
        this.botaoAvancar.on('pointerdown', () => {
            if (gameState.errosQuiz1 >= 3){
                this.scene.start('Tela24quizErro'); // Maior número de erros
            } else {
                this.scene.start('Tela24quizCerto'); // Maior número de acertos
            }
        });
    }
}