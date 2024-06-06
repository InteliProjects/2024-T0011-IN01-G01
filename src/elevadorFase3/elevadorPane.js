    class elevadorPane extends Phaser.Scene {
        constructor() {
            super({ key: 'elevadorPane' });
        }

        preload() {
            this.load.image('botao_insignias', 'assets/insignias/botao.png'); // carregamento do botão de insignias
            this.load.image('tela_insignias', 'assets/insignias/telaInsignias.png'); // carregamento da tela de insignias
            this.load.image('botao_fechar', 'assets/cadastro/botao_fechar.png'); // carregamento do botão de fechar
            this.load.image("backgroundInteriorElevador", "assets/elevadorDentro.png");
            this.load.image('caixaForça', 'assets/caixaDeForça.png');
            this.load.spritesheet('botaoElevador', 'assets/painelElevadorAntesCliq.png', { frameWidth: 425, frameHeight: 660, startFrame: 0, endFrame: 1 });
            this.load.image('insignia1', 'assets/insignias/cadastro.png'); // carregamento da insignia1
            this.load.audio('curtoCircuito','assets/ElevadorFase3Som.mp3');
        }

        create() {

            mute(this, gameState.mute);
            opcoes(this);
            somClique(this);

            const camera = this.cameras.main;
            const curto = this.sound.add('curtoCircuito');

            Elevador = this.add.image(400, 300, 'backgroundInteriorElevador')
            this.caixaForça = this.add.image(673, 419, 'caixaForça');
            this.caixaForça.setInteractive();

            // trecho que ADICIONA o retângulo1 atrás do texto1
            this.larguraBalao = 600;
            this.alturaBalao = 400;
            this.balao1 = this.add.rectangle(
                config.width / 2,
                config.height / 2,
                this.larguraBalao, // largura do retângulo
                this.alturaBalao, // altura do retângulo
                0xf1efed, // cor do preenchimento
                0.9 // opacidade
            );

            // balão que ADICIONA e configura o texto1 do balão de fala1
            this.texto1 = this.add.text(
                config.width / 2, // centralizado
                config.height / 2,
                "Macacos me mordam! \n \n \n Parece que energia do elevador acabou, \n vamos ver se conseguimos resolver isso. \n\n Clique na caixa de força para vermos os estragos!",
                {
                    fontFamily: "Oracle Sans Serif, sans-serif",
                    fontSize: 22,
                    align: "center",
                    color: "#312D2A",
                }
            );

            // configurações do balao1 e texto1
            this.balao1.setOrigin(0.5); // Define a origem do retângulo como o centro
            this.balao1.setDepth(6); // balão atrás do texto
            this.balao1.setInteractive(); // define que o balão1 é um objeto interativo
            this.balao1.setVisible(false); // ESSENCIAL: torna o balao1 invisível
            this.texto1.setOrigin(0.5);
            this.texto1.setDepth(7);
            this.texto1.setVisible(false); // ESSENCIAL: torna o texto1 invisível

            this.balao1.on("pointerdown", () => {
                this.balao1.setVisible(false); // torna o balao1 invisível ao clique
                this.texto1.setVisible(false); // torna o texto1 invisível ao clique

                const efeitoCaixaForça = this.caixaForça.postFX.addGlow(0xffffff, 0, 0, false, 0.2, 32);

                this.tweens.add({ //efeito de pulsação do totem
                    targets: efeitoCaixaForça,
                    outerStrength: 3,
                    yoyo: true,
                    loop: -1,
                    ease: 'sine.inout'
                });
            });

            setTimeout(() => {
                camera.postFX.addVignette(0.5, 0.5, 0.7);
                camera.shake(800, 0.005);
                curto.play();
                console.log("Pane Ativado!");

            }, 300);

             // time out para definir que depois de 1,2 segundos o balao1 e texto1 aparecem
            setTimeout(() => {
                this.balao1.setVisible(true); // torna o balao1 visível
                this.texto1.setVisible(true); // torna o texto1 visível
            }, 1000);

            this.caixaForça.on('pointerdown', () => {
                this.scene.start('elevadorPuzzle');
                this.scene.stop('elevadorPane');
            });

        }

        update() {

        }
    }