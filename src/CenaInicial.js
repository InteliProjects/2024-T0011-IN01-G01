class CenaInicial extends Phaser.Scene {
  constructor() {
    super({ key: "CenaInicial" });

    
  }

  //variáveis
  fundo;
  predio;
  porta;
  nuvem1;
  nuvem2;
  passaro1;
  passaro2;
  logo;
  export;
  telaBranca;
  texto;
  mensagem;
  indexMensagem;
  botaoConfig;

  preload() {
    this.load.image("fundo", "assets/ceu_e_chao.png");
    this.load.image("predio", "assets/predio_sem_porta.png");
    this.load.spritesheet("porta_abrindo", "assets/spritesheetPorta.png", {
      frameWidth: 1080,
      frameHeight: 1080,
    }); // aqui vamos trocar pela imagem da animação da porta, mas com a animação no frame 0 ainda

    this.load.image("logo", "assets/logoFinal.png");

    // Nuvens
    this.load.image("nuvem1", "assets/nuvem1.png");
    this.load.image("retangulo_fade", "assets/retangulo_fade.png");
    this.load.image("nuvem2", "assets/nuvem2.png");
    // this.load.image('nuvem3', '../assets/nuvem3.png'); // Utilizamos apenas 2/4 das nuvens para que o céu não ficasse
    // this.load.image('nuvem4', '../assets/nuvem4.png'); // extremamente cheio

    // Passaro
    this.load.spritesheet("passaro", "assets/BirdSpritesheet.png", {
      frameWidth: 81,
      frameHeight: 76,
    });

    // Musica
    let musica = this.load.audio("musica", "assets/the-process.mp3");
    let clique = this.load.audio("clique", "assets/click.mp3");
    
    

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

    //menu de configuracao
    this.load.spritesheet("botaoAcessibilidade", "assets/botaoAcessibilidade.png", {
      frameWidth: 846,
      frameHeight: 846,
      startFrame: 0,
      endFrame: 1
    });
    this.load.spritesheet("botaoIdioma", "assets/botaoIdioma.png", {
      frameWidth: 846,
      frameHeight: 846,
      startFrame: 0,
      endFrame: 1
    });

    this.load.image("menuOpcoes", "assets/menuOpcoes.png");
    this.load.image('botaoFechar', 'assets/cadastro/botao_fechar.png');

  }

  create() {

    somClique(this);
    addMusica(this);
    mute(this, gameState.mute);
    opcoes(this, gameState.opcoes);

    this.larguraBalao = 200;
    this.alturaBalao = 500;
    this.telaClique = this.add.rectangle(
      config.width / 2,
      200,
      this.larguraBalao, // largura do retângulo
      this.alturaBalao, // altura do retângulo
    );

    this.telaClique.setOrigin(0.5); // Define a origem do retângulo como o centro
    this.telaClique.setDepth(7); // balão atrás do texto
    this.telaClique.setInteractive(); // define que o balão1 é um objeto interativo
    this.telaClique.setVisible(true); // ESSENCIAL: torna o tela que será clicada invisível

    this.retanguloFinal = this.add.image(
      config.width / 2,
      395,
      "retangulo_fade"
    );
    this.fundo = this.add.image(400, 300, "fundo").setScale(0.6);
    this.predio = this.add.image(395, 270, "predio").setScale(0.4);
    this.porta = this.add.sprite(395, 420, "porta_abrindo").setScale(0.15); // Separamos a porta do prédio para que ela possa ser animada
    this.logo = this.add.image(400, 200, "logo").setScale(0.35);
    this.logo.setAlpha(0); // Deixa o logo invisível para fazer o efeito fade in
    this.nuvem1 = this.add.image(640, 240, "nuvem1").setScale(0.35);
    this.nuvem2 = this.add.image(200, 80, "nuvem2").setScale(0.22);
    // var nuvem3 = this.add.image(400, 250, 'nuvem3').setScale(0.3);
    // var nuvem4 = this.add.image(600, 300, 'nuvem4').setScale(0.3);

    // Adicione um texto para exibir a mensagem de início
    this.mensagem = "Clique no prédio para iniciar!";
    this.indexMensagem = 0;
    this.texto = this.add.text(260, 565, "", {
      fontFamily: "Trebuchet MS",
      fontSize: 20,
      color: "#ffffff",
    });

    // Adicione um retângulo branco para fazer o fade in da tela toda
    this.telaBranca = this.add.rectangle(
      0,
      0,
      config.width,
      config.height,
      0xffffff
    );
    this.telaBranca.setOrigin(0, 0);

    // Método tweens faz animações, tais como o fade in e o bounce da logo
    this.tweens.add({
      delay: 300,
      targets: this.telaBranca,
      alpha: 0, // Defina o valor final de opacidade desejado (0 para totalmente transparente)
      duration: 3000, // Duração em milissegundos
      onComplete: () => {
        // Código a ser executado após o fade in ser concluído
        this.telaBranca.destroy(); // Remova o retângulo preto se necessário
      },
    });

    // Efeito de digitação das letras na tela
    // É feito, basicamente, com um cronômetro que adiciona uma letra da variavel mensagem à
    // variável texto a cada 100ms
    this.time.addEvent({
      delay: 4000, // Atraso em milissegundos antes de começar
      callback: () => {
        // Use outro cronômetro para adicionar letras ao texto ao longo do tempo
        this.time.addEvent({
          delay: 100, // Tempo em milissegundos entre cada letra
          repeat: this.mensagem.length - 1,
          callback: () => {
            this.texto.text += this.mensagem[this.indexMensagem];
            this.indexMensagem++;
          },
        });
      },
      callbackScope: this,
    });

    // Animações dos pássaros
    // Foram feitos dois pássaros para que um ficasse com o frameRate mais rápido que o outro, dando a impressão
    // de que estão voando em velocidades diferentes
    this.passaro1 = this.add.sprite(100, 300, "passaro").setScale(0.8);
    this.passaro2 = this.add.sprite(600, 150, "passaro").setScale(0.4);
    this.anims.create({
      key: "fly1",
      frames: this.anims.generateFrameNumbers("passaro", { start: 0, end: 1 }),
      frameRate: 3,
      repeat: -1,
    });
    this.anims.create({
      key: "fly2",
      frames: this.anims.generateFrameNumbers("passaro", { start: 0, end: 1 }),
      frameRate: 2,
      repeat: -1,
    });

    this.anims.create({
      key: "porta_abrindo",
      frames: this.anims.generateFrameNumbers("porta_abrindo", {
        start: 0,
        end: 6,
      }),
      frameRate: 7,
      repeat: 0,
    }); // define que não vai haver a animação da porta primeiramente

    //porta.anims.play('porta_abrindo', true);
    this.passaro1.anims.play("fly1", true);
    this.passaro2.anims.play("fly2", true);

    // Definindo a profundidade dos elementos, o que cria o efeito
    // de que alguns elementos estão na frente de outros. Ex.: A nuvem passando por trás do prédio
    this.predio.setDepth(2);
    this.porta.setDepth(3);
    this.nuvem1.setDepth(1);
    this.nuvem2.setDepth(1);
    this.passaro1.setDepth(3);
    this.logo.setDepth(3);
    this.telaBranca.setDepth(5);
    this.botaoConfig.setDepth(5);
    this.botaoSom.setDepth(5);
    // nuvem3.setDepth(1);
    // nuvem4.setDepth(1);

    // Efeito de bounce da logo
    this.tweens.add({
      targets: this.logo,
      y: "+=40",
      duration: 3000,
      delay: 4000,
      ease: "Bounce",
      alpha: 1,
    });

    this.telaClique.on(
      "pointerover", () => {
        this.input.setDefaultCursor("pointer");
      }
    );

    this.telaClique.on(
      "pointerout", () => {
        this.input.setDefaultCursor("auto");
      }
    );

    this.telaClique.on(
      "pointerdown",
      function () {
        setTimeout(() => {
          // Reprodução da animação da porta abrindo
          this.porta.anims.play("porta_abrindo", true);

          this.porta.on(
            "animationcomplete",
            function () {
              this.retanguloFinal.setScale(0);
              this.retanguloFinal.setDepth(70);
              this.tweens.add({
                targets: this.retanguloFinal,
                scaleX: 2, // Fator de escala horizontal
                scaleY: 2, // Fator de escala vertical
                duration: 1500, // Duração da animação em milissegundos (2 segundos)
                ease: "Linear", // Tipo de transição linear
                onComplete: () => {
                  this.scene.start("Recepcao");
                },
              });
            },
            this
          );
        }, 250); // 1500 milissegundos = 1,5 segundos
      },
      this
    );
    
  }

  update() {
    // Movimento da nuvens
    this.nuvem2.x += 0.6;
    this.nuvem1.x -= 1;
    if (this.nuvem1.x < -230) {
      this.nuvem1.x = 1020;
    }
    if (this.nuvem2.x > 900) {
      this.nuvem2.x = -120;
    }

    // Movimento do passaro
    this.passaro1.x += 1.5;
    this.passaro1.y -= 0.6;
    this.passaro2.x -= 0.7;
    if (this.passaro1.x > 1300) {
      this.passaro1.x = -100;
      this.passaro1.y = 500;
    }
    if (this.passaro2.x < -100) {
      this.passaro2.x = 900;
    }
  }
}
