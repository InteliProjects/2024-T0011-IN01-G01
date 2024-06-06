/**
 * Classe que representa a cena do elevador inicial.
 * @class
 * @extends Phaser.Scene
 */
class elevadorInicial extends Phaser.Scene {
    /**
     * Construtor da classe.
     */
    constructor() {
        super({ key:'elevadorInicial' });
    }

    /**
     * Imagens e spritesheets que serão carregados antes da criação da cena.
     */
    preload() {
        this.load.image('backgroundInteriorElevador', 'assets/elevadorDentro.png');        
        this.load.spritesheet('botaoElevador', 'assets/painelElevadorAntesCliq.png', { frameWidth: 425, frameHeight: 660, startFrame: 0, endFrame: 1});
        this.load.image('caixaForça', 'assets/caixaDeForça.png');
        this.load.image('totemElevador', 'assets/totemElevador.png');

        this.load.spritesheet("botaoSom", "assets/spriteSheetSom.png", {
            frameWidth: 180,
            frameHeight: 180,
            startFrame: 0,
            endFrame: 1,
        });

        this.load.spritesheet("botaoConfig", "assets/spriteSheetConfig.png", {
            frameWidth: 180,
            frameHeight: 180,
            startFrame: 0,
        });
    }

    /**
     * Criação dos elementos da cena.
     */
    create() {
        mute(this, gameState.mute);
        opcoes(this);
        somClique(this);

        this.larguraBalao = 600;
        this.alturaBalao = 400;
        this.balao1 = this.add.rectangle(
            config.width / 2,
            config.height / 2,
            this.larguraBalao,
            this.alturaBalao,
            0xf1efed,
            0.9
        );
        if (gameState.totem === false){
            this.texto1 = this.add.text(
                config.width / 2,
                config.height / 2,
                "Que bom que chegou até aqui! \n Parece que existem informações importantes no totem. \n \n Clique no totem para continuar!",
                {
                    fontFamily: "Oracle Sans Serif, sans-serif",
                    fontSize: 22,
                    align: "center",
                    color: "#312D2A",
                }
            );
        } else {
            this.texto1 = this.add.text(
                config.width / 2,
                config.height / 2,
                "Ufa! \n Que bom que você consertou o elevador! \n \n Problemas técnicos acontecem, \n agora clique no totem e continue a leitura.",
                {
                    fontFamily: "Oracle Sans Serif, sans-serif",
                    fontSize: 22,
                    align: "center",
                    color: "#312D2A",
                }
            );
        }

        this.balao1.setOrigin(0.5);
        this.balao1.setDepth(6);
        this.balao1.setInteractive();
        this.balao1.setVisible(false);
        this.texto1.setOrigin(0.5);
        this.texto1.setDepth(7);
        this.texto1.setVisible(false);

        setTimeout(() => {
            this.balao1.setVisible(true);
            this.texto1.setVisible(true);
        }, 600);

        this.Elevador = this.add.image(400, 300,'backgroundInteriorElevador')
        this.totemElevador = this.add.image(681, 172, 'totemElevador');
        this.caixaForça = this.add.image(673, 419, 'caixaForça');

        this.totemElevador.setInteractive();

        this.balao1.on("pointerdown", () => {
            this.balao1.setVisible(false);
            this.texto1.setVisible(false);
            this.totemElevador.setInteractive();
        });

        this.totemElevador.on('pointerout', () => {
            this.input.setDefaultCursor("default");
        });

        this.totemElevador.on('pointerover', () => {
            this.input.setDefaultCursor("pointer");
        });

        this.totemElevador.on('pointerdown', () => {
            efeitoTotem.destroy();    
            this.cameras.main.fadeOut(1000, 0, 0, 0);
            setTimeout(() => {
                this.scene.start('elevadorTotem');
            }, 1000);
        });

        const efeitoTotem = this.totemElevador.postFX.addGlow(0xffffff, 0, 0, false, 0.2, 32);

        this.tweens.add({
            targets: efeitoTotem,
            outerStrength: 3,
            yoyo: true,
            loop: -1,
            ease: 'sine.inout'
        });
    }

    /**
     * Atualização da cena.
     */
    update() {

    }
}
