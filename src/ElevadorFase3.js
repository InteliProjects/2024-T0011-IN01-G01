
/**
 * Classe que representa a cena do elevador na fase 3 do jogo.
 * Extende a classe Phaser.Scene.
 * @class
 * @extends Phaser.Scene
 */
class ElevadorFase3 extends Phaser.Scene {
    /**
     * Construtor da classe ElevadorFase3.
     * @constructor
     */
    constructor() {
        super({ key: "ElevadorFase3" });
    }

    /**
     * Variáveis da classe ElevadorFase3.
     */
    ElevadorFase3;
    Elevador;
    elevadorContorno;
    elevadorAbrindo;
    Quadro1;
    Quadro2;
    Placa;
    Prof1;
    Prof2;
    BotaoFechar;

    /**
     * Pré-carrega os recursos necessários para a cena.
     */
    preload(){
        // preload da imagem do elevador sem a porta
        this.load.image("ElevadorFase3", 'assets/cena_porta_sem_porta.png');
        // preload do spritesheet do elevador com contorno 
        this.load.spritesheet ('elevadorContorno', 'assets/spritesheetElevadorContorno.png', {frameWidth: 595, frameHeight:683, startFrame: 0, endFrame: 1});
        // preload do spritesheet do quadro 1
        this.load.spritesheet('quadro1_anime', 'assets/historiasSucesso/spritsheetquadro1.png', {frameWidth:345, frameHeight:198, startFrame: 0, endFrame: 1});
        // preload do spritesheet do quadro 2
        this.load.spritesheet('quadro2_anime', 'assets/historiasSucesso/spritsheetquadro2.png', {frameWidth:345, frameHeight:198, startFrame: 0, endFrame: 1});
        // preload do spritesheet da porta do elevador se abrindo
        this.load.spritesheet('elevadorAbrindo', 'assets/elevadorExternoSpritesheet.png', {frameWidth:593, frameHeight:683});
        // preload do botão de insignias
        this.load.image('botao_insignias', 'assets/insignias/botao.png'); // carregamento do botão de insignias
        // preload da tela de insignias
        this.load.image('tela_insignias', 'assets/insignias/telaInsignias.png'); // carregamento da tela de insignias
        // preload do botão de fechar
        this.load.image('botao_fechar', 'assets/cadastro/botao_fechar.png'); // carregamento do botão de fechar
        // preload da placa
        this.load.image('placa', 'assets/historiasSucesso/placa_historias.png');
        // preload dos professores
        this.load.image('prof1', 'assets/historiasSucesso/prof_AB.png');
        this.load.image('prof2', 'assets/historiasSucesso/prof_AL.png'); 
    }   

    /**
     * Cria os elementos da cena.
     */
    create(){

        mute(this, gameState.mute);
        opcoes(this, gameState.opcoes);

        // criação do background do elevador
        this.ElevadorFase3 = this.add.image(400, 300, 'ElevadorFase3').setScale(1);
        //criação da placa
        this.Placa = this.add.image(140, 164, 'placa').setScale(0.5);

        // spritesheet do elevador abrindo
        this.elevadorAbrindo = this.add.sprite(475, 303, 'elevadorAbrindo').setScale(0.6); // o spritesheet do elevador é criado no canva
        // spritsheet do quadro 1
        this.quadro1_anime = this.add.sprite(140, 250, 'quadro1_anime').setScale(0.5);
        this.quadro1_anime.setFrame(0);
        this.quadro1_anime.setInteractive();
        this.quadro1_anime.on('pointerover', () => {
            this.quadro1_anime.setFrame(1);
            this.game.canvas.style.cursor = 'pointer';
        })
        this.quadro1_anime.on('pointerout', () => {
            this.quadro1_anime.setFrame(0);
            this.game.canvas.style.cursor = 'default';
        })
        this.quadro1_anime.on('pointerdown', () => {
            // ao clicar no quadro 1, o elevador com contorno some, o professor 1 aparece e o botão de fechar tem suas interações  
            this.elevadorContorno.setVisible(false);
            this.Prof1 = this.add.image(400, 300, 'prof1').setScale(0.9);
            this.BotaoFechar = this.add.image(127, 156, 'botao_fechar').setScale(0.02);
            this.BotaoFechar.setInteractive();
            this.BotaoFechar.on('pointerover', () => {
                this.game.canvas.style.cursor = 'pointer';
            })
            this.BotaoFechar.on('pointerout', () => {
                this.game.canvas.style.cursor = 'default';
            })
            this.BotaoFechar.on('pointerdown', () => {
                this.Prof1.setVisible(false);
                this.BotaoFechar.setVisible(false);
                this.elevadorContorno.setVisible(true);
            })
        })

        // spritsheet do quadro 2
        this.quadro2_anime = this.add.sprite(140, 370, 'quadro2_anime').setScale(0.5);
        this.quadro2_anime.setFrame(0);
        this.quadro2_anime.setInteractive();
        this.quadro2_anime.on('pointerover', () => {
            this.quadro2_anime.setFrame(1);
            this.game.canvas.style.cursor = 'pointer';
        })
        this.quadro2_anime.on('pointerout', () => {
            this.quadro2_anime.setFrame(0);
            this.game.canvas.style.cursor = 'default';
        })
        this.quadro2_anime.on('pointerdown', () => {
            // ao clicar no quadro 2, o elevador com contorno some, o professor 2 aparece e o botão de fechar tem suas interações
            this.elevadorContorno.setVisible(false);
            this.quadro1_anime.setVisible(false);
            this.quadro2_anime.setVisible(false);
            this.Prof2 = this.add.image(400, 300, 'prof2').setScale(0.93);
            this.BotaoFechar = this.add.image(123, 153, 'botao_fechar').setScale(0.02);
            this.BotaoFechar.setInteractive();
            this.BotaoFechar.on('pointerover', () => {
                this.game.canvas.style.cursor = 'pointer';
            })
            this.BotaoFechar.on('pointerout', () => {
                this.game.canvas.style.cursor = 'default';
            })
            this.BotaoFechar.on('pointerdown', () => {
                this.Prof2.setVisible(false);
                this.BotaoFechar.setVisible(false);
                this.elevadorContorno.setVisible(true);
                this.quadro1_anime.setVisible(true);
                this.quadro2_anime.setVisible(true);
            })
        })

        // spritesheet do elevador com o contorno
        this.elevadorContorno = this.add.sprite(475, 303, 'elevadorContorno').setScale(0.6); // adiciona a imagem inicial do elevador e a imagem com contorno
        this.elevadorContorno.setInteractive (); // aciona a interação com o elevador
 
        // ações do mouse sobre o elevador
        this.elevadorContorno.on('pointerover', () => {// quando o mouse estiver sobre o elevador, o sprite dará display no frame 1
            this.elevadorContorno.setFrame(1); 
            this.input.setDefaultCursor("pointer");
        });
        this.elevadorContorno.on('pointerout', () => {// quando o mouse não estiver sobre o elevador, o sprite dará display no frame 0
            this.elevadorContorno.setFrame(0);
            this.input.setDefaultCursor("default");
        })
        this.elevadorContorno.on("pointerdown", this.entrarNoElevador, this); // ao clicar no elevador, o método .entrarNoElevador será chamado

        //chamando funções
        criaTelaInsignias(this); // chama a função telaInsignias
        opcoes(this);
        mute(this);
        somClique(this);
 
    }

    /**
     * Atualiza a cena.
     */
    update(){
    }

    /**
     * Método chamado ao clicar no elevador.
     * Realiza as ações de entrar no elevador.
     */
    entrarNoElevador(){ // ao clicar no elevador, as seguintes ações são feitas:
        this.somElevadorAbrindo = this.sound.add ('somElevadorAbrindo');
        this.somElevadorAbrindo.play();
        this.somElevadorAbrindo.setVolume(1.0);
        this.elevadorContorno.setVisible(false); // o spritesheet do elevador com contorno some
        this.elevadorAbrindo.setVisible(true); // o spritesheet do elevador abrindo aparece
        this.elevadorAbrindo.anims.play('elevadorAbre', true); // começa a animação do elevador abrindo
        this.elevadorAbrindo.on('animationcomplete', () => {
             // ao completar a animação do elevador abrindo, há mudança de cena para o Elevador
            setTimeout(() => {
                this.scene.start('elevadorInicial');
            }, 750);
        }, this);
    }
}