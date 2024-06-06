class CorredorCursos extends Phaser.Scene {
    constructor() {
      super({ key: "CorredorCursos" });
    }
  
    sala;
    portaJava;
    portaNuvem;
    portaDados;
    portaProjetos;
    seta;
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
      this.load.image('seta', 'assets/baloesFase2/seta.png');
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

      this.cameras.main.fadeIn(1000, 0, 0, 0); // fade in para o início da cena *trocar para um retângulo diminuindo, como no contrário da cena inicial

      // Verifica se o jogador já esteve na fase
      // Se falso, exibe um balão de texto de boas vindas
      if (gameState.esteveNoCorredor == false) {
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
          "Olá, que bom ver que você passou de nível! \n \n \n Esperamos que tenha gostando de conhecer \n o nosso processo de Cadastro. \n \n \n Vamos para mais? \n \n \n Clique para continuar!",
          {
            fontFamily: "Oracle Sans Serif, sans-serif",
            fontSize: 22,
            align: "center",
            color: "#312D2A",
          }
        );

          // trecho que ADICIONA o retângulo2 atrás do texto2
          this.larguraBalao = 600;
          this.alturaBalao = 400;
          this.balao2 = this.add.rectangle(
            config.width / 2,
            config.height / 2,
            this.larguraBalao, // largura do retângulo
            this.alturaBalao, // altura do retângulo
            0xf1efed, // cor do preenchimento
            0.9 // opacidade
          );

          // balão que ADICIONA e configura o texto2
          this.texto2 = this.add.text(
            config.width / 2, // centralizado
            config.height / 2,
            "Esse é o corredor de cursos! \n\n É aqui que você vai se identificar,\n explorando cada um dos nossos\n  currículos e suas variedade \n de conteúdos. \n \n \n (Para começar, clique em uma porta da sua escolha!)",
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

          // configurações do balao2 e texto2
          this.balao2.setOrigin(0.5); // Define a origem do retângulo como o centro
          this.balao2.setDepth(6); // balão atrás do texto
          this.balao2.setInteractive(); // define que o balão1 é um objeto interativo
          this.balao2.setVisible(false); // ESSENCIAL: torna o balao1 invisível
          this.texto2.setOrigin(0.5);
          this.texto2.setDepth(7);
          this.texto2.setVisible(false); // ESSENCIAL: torna o texto1 invisível

        // time out para definir que depois de 1,2 segundos o balao1 e texto1 aparecem
          setTimeout(() => {
            this.balao1.setVisible(true); // torna o balao1 visível
            this.texto1.setVisible(true); // torna o texto1 visível
          }, 1200);
          this.balao1.on("pointerdown", () => {
            this.balao1.setVisible(false); // torna o balao1 invisível ao clique
            this.texto1.setVisible(false); // torna o texto1 invisível ao clique
            this.texto2.setVisible(true); // torna o texto2 visível ao clique
            this.balao2.setVisible(true); // torna o balao2 visível ao clique
          });

          this.balao2.on("pointerdown", () => {
            this.balao2.setVisible(false); // torna o balao2 invisível após clique
            this.texto2.setVisible(false); // torna o texto2 invisível após clique
          });
      
          this.portaJava.setInteractive();
          this.portaNuvem.setInteractive();
          this.portaDados.setInteractive();
          this.portaProjetos.setInteractive();
          gameState.esteveNoCorredor = true;

      }
      // Após passar pelos baloes de texto, volta a deixar as portas interativas
      this.portaJava.setInteractive();
      this.portaNuvem.setInteractive();
      this.portaDados.setInteractive();
      this.portaProjetos.setInteractive();
  
      // Checa se o jogador ja passou por todas as portas
      // se sim, libera a seta que leva pro segundo cenário
      if (
        gameState.cursoJava &&
        gameState.cursoNuvem &&
        gameState.cursoDados &&
        gameState.cursoProjetos
      ) {
        this.seta = this.add.image(50, 350, "seta").setScale(0.5).setFlip(true, false);
        console.log("Visitou todas as salas");
        this.seta.setInteractive();
        this.seta.on("pointerover", () => {
          //this.seta.setScale(0.6);
          this.game.canvas.style.cursor = "pointer";
        });
        this.seta.on("pointerout", () => {
          //this.seta.setScale(0.5);
          this.game.canvas.style.cursor = "default";
        });
        this.seta.on("pointerdown", () => {
          this.scene.stop("CorredorCursos");
          this.scene.start("Puzzle")
        });
        this.tweens.add({
          targets: this.seta,
          scaleX: 0.6, 
          scaleY: 0.6,
          duration: 500,
          yoyo: true,
          repeat: -1
      });
      }
    }
    
    // método para verificar se o mouse está sobre
    // alguma das portas
    // Se estiver, troca-se o cursor do mouse e o frame do spritesheet
    // A troca de frame do spritesheet é responsável pelo contorno que 
    // as portas recebem durante o estado de pointerover
    verificaHover() {
      this.portaJava.on("pointerover", () => {
        this.portaJava.setFrame(1);
        this.game.canvas.style.cursor = "pointer"; // troca o ponteiro do mouse para a "mãozinha"
      });
      this.portaJava.on("pointerout", () => {
        this.portaJava.setFrame(0);
        this.game.canvas.style.cursor = "default"; // volta o ponteiro do mouse para default
      });
      this.portaJava.on("pointerdown", () => {
        this.scene.start("CursoJava");
      });
  
      this.portaNuvem.on("pointerover", () => {
        this.portaNuvem.setFrame(1);
        this.game.canvas.style.cursor = "pointer";
      });
      this.portaNuvem.on("pointerout", () => {
        this.portaNuvem.setFrame(0);
        this.game.canvas.style.cursor = "default";
      });
      this.portaNuvem.on("pointerdown", () => {
        this.scene.start("CursoNuvem");
      });
  
      this.portaDados.on("pointerover", () => {
        this.portaDados.setFrame(1);
        this.game.canvas.style.cursor = "pointer";
      });
      this.portaDados.on("pointerout", () => {
        this.portaDados.setFrame(0);
        this.game.canvas.style.cursor = "default";
      });
      this.portaDados.on("pointerdown", () => {
        this.scene.start("CursoDados");
      });
  
      this.portaProjetos.on("pointerover", () => {
        this.portaProjetos.setFrame(1);
        this.game.canvas.style.cursor = "pointer";
      });
      this.portaProjetos.on("pointerout", () => {
        this.portaProjetos.setFrame(0);
        this.game.canvas.style.cursor = "default";
      });
      this.portaProjetos.on("pointerdown", () => {
        this.scene.start("CursoProjetos");
      });
    }
  
    update() {
      // durante todo o jogo, verifica se o mouse está em cima de alguma porta
      this.verificaHover();
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
  