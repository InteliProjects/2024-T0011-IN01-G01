/**
 * Classe que representa a cena do elevador.
 * @class
 * @extends Phaser.Scene
 */
class Elevador extends Phaser.Scene {

    /**
     * Construtor da classe Elevador.
     */
    constructor() {
        super({ key: 'Elevador' });
    }

    /**
     * Imagem de fundo do interior do elevador.
     * @type {Phaser.GameObjects.Image}
     */
    backgroundInteriorElevador;

    /**
     * Botão do elevador.
     * @type {Phaser.GameObjects.Sprite}
     */
    botaoElevador;

    /**
     * Painel do elevador.
     * @type {Phaser.GameObjects.Sprite}
     */
    painelElevador;

    /**
     * Imagem do número 1.
     * @type {Phaser.GameObjects.Image}
     */
    numero1;

    /**
     * Imagem do número 0.
     * @type {Phaser.GameObjects.Image}
     */
    numero0;

    /**
     * Pré-carrega os recursos necessários para a cena.
     */
    preload() {
        this.load.image("backgroundInteriorElevador", 'assets/elevadorDentro.png');        
        this.load.image("painelAberto", 'assets/spritePainelElevador.png', { frameWidth: 500, frameHeight: 650, startFrame: 0, endFrame: 1 });
        this.load.image('numero1', 'assets/elevador_1.png');
        this.load.image('numero0', 'assets/elevador_0.png');
        this.load.spritesheet('botaoElevador', 'assets/painelElevadorAntesCliq.png', { frameWidth: 425, frameHeight: 660, startFrame: 0, endFrame: 1});
        let somElevador =  this.load.audio('somElevador', 'assets/somElevador.mp3')
    }

    /**
     * Cria os elementos da cena.
     */
    create() {

        somClique(this);
        mute(this, gameState.mute);
        opcoes(this, gameState.opcoes);

        // fadein automatico da camera da cena
        this.cameras.main.fadeIn(1000, 0, 0, 0);
        this.cameras.main.setBackgroundColor('#f5f5f5');

        this.backgroundInteriorElevador = this.add.image(400, 300, 'backgroundInteriorElevador').setScale(1);
       

        this.botaoElevador = this.add.sprite(125, 240, 'botaoElevador').setScale(0.2);
        // Frame e posicionamento do botao
        this.botaoElevador.setFrame(0);
        this.botaoElevador.setInteractive();
        this.botaoElevador.rotation = 6.26;
        
        // painel onde se seleciona o andar
        this.painelElevador = this.add.sprite(400, 300, 'painelAberto').setScale(0.5);
        this.painelElevador.setFrame(0);
        this.painelElevador.setInteractive();
        this.painelElevador.setVisible(false);

        // números dos andares
        this.numero0 = this.add.image(400, 381, 'numero0').setScale(0.5).setTint(0xeead2d);
        this.numero0.setVisible(false);

        this.somElevador = this.sound.add("somElevador").setVolume(0.4);

        this.numero1 = this.add.image(400, 336, 'numero1').setScale(0.5);
        this.numero1.setVisible(false);
        this.numero1.on ('pointerover', () => {
            this.numero1.setTint(0x808080);
        });
        this.numero1.on ('pointerout', () => {
            this.numero1.setTint();
        });

        // ao clicar no botão do elevador, coloca o painel no centro da tela e escurece o fundo
        this.botaoElevador.on("pointerdown", () => {
            this.botaoElevador.setFrame(1)
            this.painelElevador.setVisible(true);
            this.numero1.setVisible(true);
            this.numero0.setVisible(true);
            this.backgroundInteriorElevador.setTint(0x393139);
            this.botaoElevador.setTint(0x393139);
        });

        // Muda o ponteiro para aparecer a "maozinha" no hover
        this.botaoElevador.on("pointerover", () => {
            this.botaoElevador.setFrame(1)
            this.input.setDefaultCursor("pointer"); 
        });

        
        this.botaoElevador.on("pointerout", () => {
            this.botaoElevador.setFrame(0)
            this.input.setDefaultCursor("default");
        });

        // Adiciona evento de clique ao numero1
        this.numero1.setInteractive();
        this.numero1.on('pointerover', () => {
            this.input.setDefaultCursor("pointer");
        });
        this.numero1.on('pointerout', () => {
            this.input.setDefaultCursor("default");
        });
        // Apenas primeiro andar pode ser acessado
        // Ao clicar, toca o "plim", indicando que está indo para o prox andar
        // troca de cena
        this.numero1.on('pointerdown', () => {
            // Troca para a próxima cena 
            this.somElevador.play();
            this.numero0.setTint();

            this.numero1.setTint(0xeead2d);
            // Adiciona delay para que a cena não se inicie tão rapidamente
            setTimeout(() => {
                this.scene.start('CorredorCursos');
                console.log("delay de 0.4 segundos até trocar a cena.");
              }, "400");
            
        });
    }

    
    update(){}
}