class elevadorPuzzle extends Phaser.Scene {
    constructor() {
        super({ key: 'elevadorPuzzle' });
        this.sequence = [];
        this.playerSequence = [];
        this.sequenceIndex = 0;
        this.canInput = false;
        this.repetitions = 0;
        this.maxRepetitions = 3;
        this.startButton = null;
    }

    preload() {
        // Carregar a imagem do quebra-cabeça e as spritesheets das luzes dos botões
        this.load.image('painelPuzzle', 'assets/fase3/painelPuzzle-semBotoes.png');

        // Carregar as spritesheets das luzes dos botões
        this.load.image('spriteSheetLuzVerm', 'assets/fase3/ledVm.png');
        this.load.image('spriteSheetLuzAz', 'assets/fase3/ledAz.png');
        this.load.image('spriteSheetLuzAm', 'assets/fase3/ledAm.png');

        // Carregar a imagem do botão de start
        this.load.image('startButton', 'assets/fase3/plataforma.png');

        // Carregar as imagens dos botões clicáveis
        this.load.image('botaoVermelho', 'assets/fase3/botaoVermelho.png');
        this.load.image('botaoAzul', 'assets/fase3/botaoAzul.png');
        this.load.image('botaoAmarelo', 'assets/fase3/botaoAmarelo.png');

        // Carregar a spritesheet do botão de sequência
        this.load.spritesheet('botaoSequencia', 'assets/botaosequencia.png', { frameWidth: 181.8, frameHeight: 35 });

        this.load.audio('somAcerto', 'assets/somAcertoSimonSays.mp3');
        this.load.audio('somErro', 'assets/somErroSimonSays.mp3');
        this.load.audio('somBotao1', 'assets/somBotao1.mp3');
        this.load.audio('somBotao2', 'assets/somBotao3.mp3');
        this.load.audio('somBotao3', 'assets/somBotao5.mp3');
    }

    create() {

        // Adicionar a imagem do quebra-cabeça
        this.add.image(400, 300, 'painelPuzzle');

        // Adicionar a spritesheet do botão de sequência no canto superior da tela
        this.botaoSequencia = this.add.sprite(122, 50, 'botaoSequencia').setOrigin(-0.3, 0.5).setScale(2);

        // Definir a animação do botão de sequência
        this.anims.create({
            key: 'sequeciaAnimada',
            frames: this.anims.generateFrameNumbers('botaoSequencia', { start: 0, end: 0 }), // Começa e termina no frame 0
            frameRate: 1,
            repeat: 0
        });

        // Iniciar a animação do botão de sequência com as bolinhas desligadas
        this.botaoSequencia.anims.play('sequeciaAnimada');

        // Adicionar o botão centralizado e grande na tela
        this.startButton = this.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY, 'startButton').setInteractive().setDepth(8);
        this.startButton.setScale(1.5);
        this.startButton.on('pointerdown', () => {
            this.startButton.setVisible(false);
            this.botaoSequencia.setFrame(1); // Mudar rapidamente para o frame 1
            this.startGame();
        });

        // Adicionar as sprites das luzes dos botões sem torná-las interativas
        this.spriteVermelho = this.add.image(275, 420, 'spriteSheetLuzVerm').setScale(0.18);
        this.spriteAzul = this.add.image(272, 295, 'spriteSheetLuzAz').setScale(0.19);
        this.spriteAmarelo = this.add.image(275, 180, 'spriteSheetLuzAm').setScale(0.19);

        // muda cor dos leds
        this.spriteVermelho.setTint(false);
        this.spriteAzul.setTint(false);
        this.spriteAmarelo.setTint(false);

        // Adicionar os botões de imagem e torná-los interativos
        const botaoVermelho = this.add.image(535, 430, 'botaoVermelho').setScale(0.19).setInteractive();
        const botaoAzul = this.add.image(535, 300, 'botaoAzul').setScale(0.19).setInteractive();
        const botaoAmarelo = this.add.image(535, 185, 'botaoAmarelo').setScale(0.19).setInteractive();

        //define cor inicial dos botões
        botaoVermelho.setTint(0x32E09E);
        botaoAzul.setTint(0x1B15E5);
        botaoAmarelo.setTint(0xF0DC48);

        // Configurar interação com os botões de imagem
        botaoVermelho.on('pointerdown', () => {
            this.buttonClicked(0);
            botaoVermelho.setTint(0x32E09E);
        });

        botaoAzul.on('pointerdown', () => {
            this.buttonClicked(1);
            botaoAzul.setTint(0x1B15E5);

        });

        botaoAmarelo.on('pointerdown', () => {
            this.buttonClicked(2);
            botaoAmarelo.setTint(0xF0DC48);
        });
        
        //configuração da responsividade dos botões

        botaoVermelho.on('pointerup', () => {
            botaoVermelho.setTint(0x42E09E);
        });

        botaoAzul.on('pointerup', () => {
            botaoAzul.setTint(0x2B15E5);

        });

        botaoAmarelo.on('pointerup', () => {
            botaoAmarelo.setTint(0xF1DC48);
        });
    }

    startGame() {
        let lastButton = -1;
        do {
            let nextButton;
            do {
                nextButton = Math.floor(Math.random() * 3);
            } while (nextButton === lastButton); // Garante que o próximo botão não seja igual ao último
            this.sequence.push(nextButton);
            lastButton = nextButton;
        } while (this.sequence.length < this.maxRepetitions);
    
        // Verifica se a última cor na sequência é igual à penúltima
        // Se for, troca a última cor até ser diferente
        while (this.sequence[this.sequence.length - 1] === this.sequence[this.sequence.length - 2]) {
            let newButton;
            do {
                newButton = Math.floor(Math.random() * 3);
            } while (newButton === this.sequence[this.sequence.length - 2]);
            this.sequence[this.sequence.length - 1] = newButton;
        }
    
        // Reproduz a sequência para o jogador
        this.playSequence();
    }
    

    playSequence() {
        this.canInput = false;
        this.sequenceIndex = 0;
        this.time.delayedCall(500, () => {
            this.nextButton();
        }, null, this);
    }

    nextButton() {
        if (this.sequenceIndex < this.sequence.length) {
            let buttonIndex = this.sequence[this.sequenceIndex];
            this.lightButton(buttonIndex);
            this.sequenceIndex++;
            this.time.delayedCall(1000, () => {
                this.unlightButton(buttonIndex);
                this.nextButton();
            }, null, this);
        } else {
            // Permite que o jogador clique nos botões após a reprodução da sequência
            this.canInput = true;
        }
    }

    buttonClicked(index) {
        if (this.canInput) {
            this.unlightButton(index);
            this.lightButton(index);
            this.time.delayedCall(500, () => {
                this.unlightButton(index);
                this.playerSequence.push(index);
                if (this.playerSequence.length === this.sequence.length) {
                    this.checkSequence();
                }
            }, null, this);
        } 
    }

    lightButton(index) {
        switch (index) {
            case 0:
                this.spriteVermelho.setTint(0x32E09E);
                this.somBotao1 = this.sound.add ('somBotao1');
                this.somBotao1.play();
                break;
            case 1:
                this.spriteAzul.setTint(0x1B15E5);
                this.somBotao2 = this.sound.add ('somBotao2');
                this.somBotao2.play();
                break;
            case 2:
                this.spriteAmarelo.setTint(0xF0DC48);
                this.somBotao3 = this.sound.add ('somBotao3');
                this.somBotao3.play();
                break;
        }
    }

    unlightButton(index) {
        switch (index) {
            case 0:
                this.spriteVermelho.setTint(false);
                break;
            case 1:
                this.spriteAzul.setTint(false);
                break;
            case 2:
                this.spriteAmarelo.setTint(false);
                break;
        }
    }

    checkSequence() {
        let sequenceMatch = true;
        for (let i = 0; i < this.sequence.length; i++) {
            if (this.sequence[i] !== this.playerSequence[i]) {
                sequenceMatch = false;
                break;
            }
        }
        if (sequenceMatch) {
            console.log("Sequência correta!");
            this.somAcerto = this.sound.add ('somAcerto');
            this.somAcerto.play();
            this.playerSequence = [];
            this.repetitions++;
            if (this.repetitions >= this.maxRepetitions) {
                console.log("Parabéns, você completou o jogo!");
                // Altere o frame do botão de sequência para 6 quando o jogo for completado
                this.botaoSequencia.setFrame(4);

                // lógica para encerrar o jogo e iniciar próxima fase
                gameState.totem = true; //indica que o totem já foi visto pelo jogador

                setTimeout(() => {
                    this.scene.start('elevadorInicial');
                    this.scene.stop('elevadorPuzzle');
                }, 2000);

            } else {
                this.startGame();
                // Avançar para o próximo frame do botão de sequência após a sequência ser concluída
                this.advanceSequenceFrame();
            }
        } else {
            this.somErro = this.sound.add ('somErro');
            this.somErro.play();
            console.log("Sequência incorreta! Reiniciando...");
            this.restartScene();
        }
    }
    
    // Identificar a área que faz com que o próximo botão seja ativado
    advanceSequenceFrame() {
        // Armazene as coordenadas x e y atuais do botão de sequência
        const currentX = this.botaoSequencia.x;
        const currentY = this.botaoSequencia.y;
    
        // Obtenha o próximo frame do botão de sequência
        let nextFrame = (this.botaoSequencia.frame.name === '4') ? 2 : parseInt(this.botaoSequencia.frame.name) + 1;
        
        // Defina o próximo frame
        this.botaoSequencia.setFrame(nextFrame.toString());
    
        // Restaure as coordenadas x e y do botão de sequência
        this.botaoSequencia.setPosition(currentX, currentY);
    }
    
    restartScene() {
        this.sequence = [];
        this.playerSequence = [];
        this.repetitions = 0;
        this.startButton.setVisible(true); // Tornar o botão de start visível novamente
        this.botaoSequencia.setFrame(0); // Retornar o botão de sequência ao frame 0
    }
}