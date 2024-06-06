/**
 * Classe que representa a cena do elevador totem.
 * @class
 * @extends Phaser.Scene
 */
class elevadorTotem extends Phaser.Scene {
    /**
     * Construtor da classe elevadorTotem.
     * @constructor
     */
    constructor() {
        super({ key: 'elevadorTotem' });
    }

    /**
     * Pré-carrega os recursos necessários para a cena.
     * @method
     */
    preload() {
        this.load.image('Totem', 'assets/elevadorTotem.png');
        this.load.image('imagemTotem', 'assets/fase3/img_totem.png');
        //Botao de som
        this.load.spritesheet("botaoSom", "assets/spriteSheetSom.png", {
            frameWidth: 180,
            frameHeight: 180,
            startFrame: 0,
            endFrame: 1,
        });

        //Botao de configuracao
        this.load.spritesheet("botaoConfig", "assets/spriteSheetConfig.png", {
            frameWidth: 180,
            frameHeight: 180,
            startFrame: 0,
        });
    }

    /**
     * Cria os elementos da cena.
     * @method
     */
    create() {
        mute(this, gameState.mute);
        opcoes(this);
        somClique(this);

        let balaoX = 170
        let Balaoy = 80
        // trecho que ADICIONA o retângulo1 atrás do texto1
        this.larguraBalao = 250;
        this.alturaBalao = 100;
        this.balao1 = this.add.rectangle(
            balaoX,
            Balaoy,
            this.larguraBalao, // largura do retângulo
            this.alturaBalao, // altura do retângulo
            0xf1efed, // cor do preenchimento
            0.9 // opacidade
        );

        // balão que ADICIONA e configura o texto1 do balão de fala1
        this.texto1 = this.add.text(
            balaoX, // centralizado
            Balaoy,
            "Utilize: \n o Scroll do mouse \n para navegar!",
            {
                fontFamily: "Oracle Sans Serif, sans-serif",
                fontSize: 15,
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

        // time out para definir que depois de 1,2 segundos o balao1 e texto1 aparecem
        setTimeout(() => {
            this.balao1.setVisible(true); // torna o balao1 visível
            this.texto1.setVisible(true); // torna o texto1 visível
        }, 600);

        this.balao1.on("pointerdown", () => {
            this.balao1.setVisible(false); // torna o balao1 invisível ao clique
            this.texto1.setVisible(false); // torna o texto1 invisível ao clique
        });

        this.Totem = this.add.image(400, 300, 'Totem').setDepth(1);
        this.imagemTotem = this.add.image(1150, 285, 'imagemTotem').setDepth(0).setScale(0.5);
        console.log('ta abrindo')

        this.imagemTotem.setScrollFactor(0);
        this.cameras.main.startFollow(this.Totem);

        this.input.on('wheel', function (pointer, gameObjects, deltaX, deltaY, deltaZ) {
            if (deltaY > 0) {
                // Scroll para cima, mova o tilemap para a esquerda
                this.imagemTotem.x += 50; // Mova 50 pixels para a esquerda
                console.log(this.imagemTotem.x)
            } else if (deltaY < 0) {
                // Scroll para baixo, mova o tilemap para a direita
                this.imagemTotem.x -= 50;
                console.log(this.imagemTotem.x) // Mova 50 pixels para a direita
            }

            if (this.imagemTotem.x > 1150) {
                this.imagemTotem.x = 1150;
            }

            if (this.imagemTotem.x < -450) {
                this.imagemTotem.x = -450;
            }

            if (!gameState.totem && this.imagemTotem.x === -300) {
                this.imagemTotem.setVisible(false);
                setTimeout(() => {
                    this.scene.start('elevadorPane');
                    this.scene.stop('elevadorTotem');
                }, 1500);
            } else if (gameState.totem && this.imagemTotem.x === -350) {
                console.log('inicia a próxima cena')
                setTimeout(() => {
                this.scene.start('CenaFinal');
                this.scene.stop('elevadorTotem');
                }, 6000);
            }

        }, this); // Passando 'this' como contexto para manter a referência correta
    };


    update() {
    }
}
