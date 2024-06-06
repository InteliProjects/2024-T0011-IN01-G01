class CorredorCursos2 extends Phaser.Scene {
    constructor() {
      super({ key: "CorredorCursos2" });
    }
  
    sala;
    portaJava;
    portaNuvem;
    portaDados;
    portaProjetos;
    setaElevador;
    fundoJanela;
    botaoInsignias;
    telaInsignias;
    botaoFechar;
  
    preload() {
      // Carrega todos os assets
      this.load.image('fundoJanela', 'assets/fundo.png');
      this.load.image('sala', 'assets/Sala_2_andar_comPlantas.png');
      this.load.spritesheet('portaJava', 'assets/spritesheetPortaJava.png', { frameWidth: 74, frameHeight: 358 });
      this.load.spritesheet('portaNuvem', 'assets/spritesheetPortaNuvem.png', { frameWidth: 80, frameHeight: 359 });
      this.load.spritesheet('portaDados', 'assets/spritesheetPortaDados.png', { frameWidth: 35, frameHeight: 235 });
      this.load.spritesheet('portaProjetos', 'assets/spritesheetPortaProjetos.png', { frameWidth: 34, frameHeight: 236 });
      this.load.image('setaElevador', 'assets/baloesFase2/seta.png');
      this.load.image('insignia2', 'assets/insignias/cursos.png');
      this.load.image('botaoConfig', 'caminho/para/botaoConfig.png'); // Certifique-se de adicionar o caminho correto
      this.load.image('botaoSom', 'caminho/para/botaoSom.png'); // Certifique-se de adicionar o caminho correto
      this.load.image('botao_insignias', 'assets/insignias/botao.png'); // carregamento do botão de insignias
      this.load.image('tela_insignias', 'assets/insignias/telaInsignias.png'); // carregamento da tela de insignias
      this.load.image('botao_fechar', 'assets/cadastro/botao_fechar.png'); // carregamento do botão de fechar
      this.load.image('insignia1', 'assets/insignias/cadastro.png'); // carregamento da insignia1
      // preload do fundo
    }
  
    create() {
      // Adiciona os elementos visuais, como fundo, corredor e portas
      this.fundoJanela = this.add.image(410, 288, "fundoJanela").setScale(0.35);
      this.fundoJanela.setTint(0xcccccc);
      this.sala = this.add.sprite(400, 300, "sala").setScale(1);
      this.portaJava = this.add.sprite(140, 345, "portaJava").setScale(1);
      this.portaNuvem = this.add.sprite(630, 345, "portaNuvem").setScale(1);
      this.portaDados = this.add.sprite(215, 345, "portaDados").setScale(1);
      this.portaProjetos = this.add.sprite(555, 345, "portaProjetos").setScale(1);
  
      // funções que criam na tela os botões de opção e som
      opcoes(this);
      mute(this);
      criaTelaInsignias(this);
      // Adiciona interatividade com a seta
      this.setaElevador = this.add.image(740, 350, "setaElevador").setScale(0.5);
      this.setaElevador.setInteractive();
      this.setaElevador.on("pointerover", () => {
        //this.setaElevador.setScale(0.6);
        this.game.canvas.style.cursor = "pointer";
        });
      this.setaElevador.on("pointerout", () => {
        //this.setaElevador.setScale(0.5);
        this.game.canvas.style.cursor = "default";
        });
      this.setaElevador.on("pointerdown", () => {
        this.scene.stop("CorredorCursos");
        this.scene.start("ElevadorFase3")
        });

      this.tweens.add({
          targets: this.setaElevador,
          scaleX: 0.6, 
          scaleY: 0.6,
          duration: 500,
          yoyo: true,
          repeat: -1
      });
  
    }


    
  
    update() {
      // durante todo o jogo, verifica se o mouse está em cima de alguma porta
      
    }
  
    // Adiciona o menu de insígnias na tela
    criaTelaInsignias() {
      this.botaoInsignias = this.add.image(50, 50, 'botao_insignias').setScale(0.2);
      this.botaoInsignias.setDepth(5);
      this.botaoInsignias.setInteractive();
      this.botaoInsignias.on('pointerover', () => {
        this.input.setDefaultCursor("pointer");
      });
      this.botaoInsignias.on('pointerout', () => {
        this.input.setDefaultCursor("default");
      });
      this.botaoInsignias.on('pointerdown', () => {
        this.botaoInsignias.disableInteractive();
        this.telaInsignias = this.add.image(400, 300, 'tela_insignias').setScale(0.8);
        this.botaoFechar = this.add.image(550, 210, 'botao_fechar').setScale(0.025);
        this.botaoFechar.setInteractive();
        this.portaJava.disableInteractive();
        this.portaNuvem.disableInteractive();
        this.portaDados.disableInteractive();
        this.portaProjetos.disableInteractive();
  
        // Verifica se o jogador possui as insignias
        // Se possuir, mostra na tela
        // Se não, o menu de insignias fica vazio
        if (gameState.insignia1 == true) {
          this.insignia1 = this.add.image(255, 300, 'insignia1').setScale(0.25);
        }
        if (gameState.insignia2 == true) {
          this.insignia2 = this.add.image(325, 300, 'insignia2').setScale(0.25);
        }
  
        this.botaoFechar.on('pointerdown', () => {
          this.telaInsignias.setVisible(false);
          this.botaoFechar.setVisible(false);
          this.insignia1.setVisible(false);
          this.insignia2.setVisible(false);
          this.botaoInsignias.setInteractive();
          this.portaJava.setInteractive();
          this.portaNuvem.setInteractive();
          this.portaDados.setInteractive();
          this.portaProjetos.setInteractive();
        }, this);
      }, this);
    }
  }