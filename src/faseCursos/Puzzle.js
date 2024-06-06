class Puzzle extends Phaser.Scene {
  constructor() {
    super({ key: "Puzzle" });
    this.picotadoraClicada = false; // Variável de controle para verificar se a picotadora já foi clicada
    this.balaoIntroducaoVisivel = true; // Variável de controle para verificar se o balão de introdução ainda está visível
  }

  backgroundPicotadora;
  picotadora;
  quadroCursos;
  tirasGroup;
  tira1;
  tira2;
  tira3;
  tira4;
  tira5;
  grid;
  posicaoTira1 = false;
  posicaoTira2 = false;
  posicaoTira3 = false;
  posicaoTira4 = false;
  posicaoTira5 = false;
  botaoInsignias;
  telaInsignias;
  botaoFechar;
  seta;

  preload() {
    // load de todos os assets da fase
    this.load.image("backgroundPicotadora", "assets/backgroundPicotadora.png");
    this.load.image("tira1", "assets/puzzlePapelPicotado/tira1.png");
    this.load.image("tira2", "assets/puzzlePapelPicotado/tira2.png");
    this.load.image("tira3", "assets/puzzlePapelPicotado/tira3.png");
    this.load.image("tira4", "assets/puzzlePapelPicotado/tira4.png");
    this.load.image("tira5", "assets/puzzlePapelPicotado/tira5.png");
    this.load.image("grid", "assets/puzzlePapelPicotado/grid.png");
    this.load.image("quadro_cursos", "assets/quadro_cursos.png");
    this.load.image('seta', 'assets/baloes_fase2/seta.png');
    this.load.image("tirasJuntas", 'assets/puzzlePapelPicotado/puzzleCompleto.png');
    this.load.spritesheet("picotadora", "assets/SpritesheetPicotadora.png", {
      frameWidth: 300,
      frameHeight: 476,
      startFrame: 0,
      endFrame: 1
    });
    this.load.image('insignia2', 'assets/insignias/cursos.png');
    this.load.image('botao_insignias', 'assets/insignias/botao.png'); // carregamento do botão de insignias
    this.load.image('tela_insignias', 'assets/insignias/telaInsignias.png'); // carregamento da tela de insignias
    this.load.image('botao_fechar', 'assets/cadastro/botao_fechar.png'); // carregamento do botão de fechar
    this.load.image('insignia1', 'assets/insignias/cadastro.png'); // carregamento da insignia1
    this.load.audio('somPicotadora', 'assets/somPicotadora.mp3');
    this.load.audio('somInsignia', 'assets/somInsignia.mp3');
  }

  create() {

    mute(this, gameState.mute);
    opcoes(this, gameState.opcoes);

    // Adiciona background, picotadora, quadro e tiras
    this.backgroundPicotadora = this.add.image(400, 300, "backgroundPicotadora");
    this.picotadora = this.add.sprite(375, 350, "picotadora").setScale(0.28);
    this.quadroCursos = this.add.image(400, 150, "quadro_cursos").setScale(0.5);
    this.tirasGroup = this.add.group(); // várias tiras no grupo
    
    // grid dos papeis picados
    this.grid = this.add.image(400, 300, "grid").setScale(0.305).setVisible(false);

    // As tiras ficam invisíveis até o jogador clicar na picotadora

    // Adiciona as 5 tiras de cada grupo
    // Define a posição da tira no grupo, isso é usado posteriormente para verificar se a tira está encaixada no lugar correto
    for(let i = 1; i <= 5; i++) {
      this["tira" + i] = this.tirasGroup.create(100 + (i * 75), 200, "tira" + i).setScale(0.3).setVisible(false).setInteractive({ draggable: true });
      this["tira" + i].posicaoTira = i;
    }

    this.picotadora.setInteractive();
    this.picotadora.setFrame(0);
    /*this.picotadora.on("pointerover", () => {
      if (!this.picotadoraClicada && !this.balaoIntroducaoVisivel) { // Verifica se a picotadora ainda não foi clicada
      this.picotadora.setFrame(1);
      this.game.canvas.style.cursor = "pointer";
      }
    });
    this.picotadora.on("pointerout", () => {
      if (!this.picotadoraClicada && !this.balaoIntroducaoVisivel) { // Verifica se a picotadora ainda não foi clicada
      this.picotadora.setFrame(0);
      this.game.canvas.style.cursor = "default";
      }
    });
    this.picotadora.on('pointerdown', () => {
      this.picotadora.setInteractive(false);
      this.picotadora.on("pointerover", () => {
        this.picotadora.setFrame(0);
        this.game.canvas.style.cursor = "default";
      });
      this.picotadoraClique();
    }, this);*/

    // Adiciona o evento pointerdown na picotadora
    this.picotadora.on('pointerdown', () => {
      if (!this.picotadoraClicada && !this.balaoIntroducaoVisivel) {
          this.picotadoraClique(); // Apenas chama a função picotadoraClique se o balão de introdução não estiver visível
      }
  });

  // Adiciona a lógica para alterar os frames da picotadora nos eventos pointerover e pointerout
  this.picotadora.on('pointerover', () => {
      if (!this.picotadoraClicada && !this.balaoIntroducaoVisivel) {
          this.picotadora.setFrame(1);
          this.game.canvas.style.cursor = 'pointer';
      }
  });

  this.picotadora.on('pointerout', () => {
      if (!this.picotadoraClicada && !this.balaoIntroducaoVisivel) {
          this.picotadora.setFrame(0);
          this.game.canvas.style.cursor = 'default';
      }
  });

    // trecho que ADICIONA o retângulo de introdução atrás do texto de introdução
    this.larguraBalao = 600;
    this.alturaBalao = 400;
    this.balaoIntroducao = this.add.rectangle(
      config.width / 2,
      config.height / 2,
      this.larguraBalao, // largura do retângulo
      this.alturaBalao, // altura do retângulo
      0xf1efed, // cor do preenchimento
      0.9 // opacidade
    );

    // balão que ADICIONA e configura o texto1 do balão de fala1
    this.textoIntroducao = this.add.text(
      config.width / 2, // centralizado
      config.height / 2,
      "Opa! Alguém jogou um papel importante na picotadora... \n \n \n Você pode ajudar a recuperá-lo? \n \n \n Clique na picotadora em cima da mesa para começar!",
      {
        fontFamily: "Oracle Sans Serif, sans-serif",
        fontSize: 22,
        align: "center",
        color: "#312D2A",
      }
    );

    // configurações do balão e texto de introdução
    this.balaoIntroducao.setOrigin(0.5); // Define a origem do retângulo como o centro
    this.balaoIntroducao.setDepth(6); // balão atrás do texto de introdução
    this.balaoIntroducao.setInteractive(); // define que o balão de introdução é um objeto interativo
    this.balaoIntroducao.setVisible(false); // ESSENCIAL: torna o balão de introdução invisível
    this.textoIntroducao.setOrigin(0.5);
    this.textoIntroducao.setDepth(7);
    this.textoIntroducao.setVisible(false); // ESSENCIAL: torna o texto de introdução invisível

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
      "Parabéns! Você completou o puzzle! \n \n \n Como recompensa, você ganhou uma nova insígnia! \n \n \n Clique no botão das insígnias para visualizá-la.",
      {
        fontFamily: "Oracle Sans Serif, sans-serif",
        fontSize: 22,
        align: "center",
        color: "#312D2A",
      }
    );

    // configurações do balao1 e texto1
    this.somInsignia = this.sound.add('somInsignia');
    this.balao1.setOrigin(0.5); // Define a origem do retângulo como o centro
    this.balao1.setDepth(6); // balão atrás do texto
    this.balao1.setInteractive(); // define que o balão1 é um objeto interativo
    this.balao1.setVisible(false); // ESSENCIAL: torna o balao1 invisível
    this.texto1.setOrigin(0.5);
    this.texto1.setDepth(7);
    this.texto1.setVisible(false); // ESSENCIAL: torna o texto1 invisível

     // time out para definir que depois de 1,2 segundos o balao1 e texto1 aparecem
     setTimeout(() => {
      this.balaoIntroducao.setVisible(true); // torna o balao1 visível
      this.textoIntroducao.setVisible(true); // torna o texto1 visível
      this.balaoIntroducaoVisivel = false; // Define que o balão de introdução não está mais visível
    }, 1200);

    this.balaoIntroducao.on("pointerdown", () => {
      this.balaoIntroducao.setVisible(false); // torna o balão de introdução invisível ao clique
      this.textoIntroducao.setVisible(false); // torna o texto de introdução invisível ao clique
      this.picotadora.setInteractive(true);
    });
  }

  update() {
    
  }

  shuffleTiras() {
    // Embaralha as tiras
    Phaser.Utils.Array.Shuffle(this.tirasGroup.getChildren());
    // Reposiciona as tiras após o embaralhamento
    this.tirasGroup.children.each((tira, index) => {
      tira.x = 100 + (index * 75); // Reposiciona horizontalmente
      tira.y = 200; // Mantém a posição vertical fixa
    });
  }

  picotadoraClique() {
    if (!this.picotadoraClicada && !this.balaoIntroducaoVisivel) { // Verifica se a picotadora já foi clicada
      this.geraTiras();

      // ao clicar na tira, ela é trazida para cima das demais
      // isso ajuda caso o jogador tenha colocado uma tira em cima de outra
      this.input.on('dragstart', function (pointer, gameObject)
      {
          this.children.bringToTop(gameObject);
      }, this);
    
      this.moveTiras();

      this.checaPosicaoTiras();

    }
  }

  geraTiras() {
    this.picotadora.setFrame(0);
    this.somPicotadora = this.sound.add('somPicotadora');
    this.somPicotadora.play()
    this.somPicotadora.setVolume(0.7);
    // Torna as tiras visíveis quando a picotadora for clicada
    this.tirasGroup.setVisible(true);
    this.grid.setVisible(true);
    // Embaralhar as tiras
    this.shuffleTiras();
    // Define que a picotadora já foi clicada
    this.picotadoraClicada = true;
    // Torna o quadro e a picotadora cinza, para dar destaque à picotadora
    this.backgroundPicotadora.setTint(0x999999);
    this.quadroCursos.setTint(0x999999);
  }

  checaPosicaoTiras() {

    // Aqui, o gameObject é qualquer elemento na cena que esteja sendo arrastado
    // No nosso caso, apenas as tiras são arrastáveis
    this.input.on('dragend', (pointer, gameObject, dropped) => {
      // Pega a posição x e y da atual tira que está sendo arrastada
      const x = gameObject.x;
      const y = gameObject.y;

      // Se for a primeira tira, e ela estiver na posição correta, a variável posicaoTira1 é setada para true
      // e a tira não fica mais interativa
      // Além disso, a função verificaConclusao é chamada para verificar se o todas as tiras estão na posição correta	
      // Essa lógica repete-se para todas as tiras
      if (gameObject.posicaoTira === 1 && x === 280 && y === 300 && !this.posicaoTira1)
      {
        this.posicaoTira1 = true;
        gameObject.disableInteractive();
        this.verificaConclusao();
      }
      if (gameObject.posicaoTira === 2 && x === 340 && y === 300 && !this.posicaoTira2)
      {
        this.posicaoTira2 = true;
        gameObject.disableInteractive();
        this.verificaConclusao();
      }
      if (gameObject.posicaoTira === 3 && x === 400 && y === 300 && !this.posicaoTira3)
      {
        this.posicaoTira3 = true;
        gameObject.disableInteractive();
        this.verificaConclusao();
      }
      if (gameObject.posicaoTira === 4 && x === 460 && y === 300 && !this.posicaoTira4)
      {
        this.posicaoTira4 = true;
        gameObject.disableInteractive();
        this.verificaConclusao();
      }
      if (gameObject.posicaoTira === 5 && x === 520 && y === 300 && !this.posicaoTira5)
      {
        this.posicaoTira5 = true;
        gameObject.disableInteractive();
        this.verificaConclusao();
      }
  }, this);
  }

  moveTiras() {
    // Ao arrastar a tira, ela é movida para a posição mais próxima do grid
    // Isso ajuda o jogador a encaixar as tiras no lugar correto
    // o Phaser.Math.Snap é usado para arredondar a posição da tira para o grid mais próximo
    this.input.on('drag', (pointer, gameObject, dragX, dragY) =>
        {
            dragX = Phaser.Math.Snap.To(dragX, 10);
            dragY = Phaser.Math.Snap.To(dragY, 10);
            gameObject.setPosition(dragX, dragY);
            

        }, this);

        this.balao1.on('pointerdown', () => {
          this.balao1.setVisible(false); // torna o balao1 invisível ao clique
          this.texto1.setVisible(false); // torna o texto1 invisível ao clique

          
          this.seta = this.add.image(740, 350, "seta").setScale(0.5);
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
            this.scene.stop("Puzzle");
            this.scene.start("CorredorCursos2")
          });
          this.tweens.add({
            targets: this.seta,
            scaleX: 0.6, 
            scaleY: 0.6,
            duration: 500,
            yoyo: true,
            repeat: -1
          });

          });
  }

  verificaConclusao() {
    // Verifica se todas as tiras estão na posição correta
    // Se todas estiverem, o puzzle é concluído
    if (this.posicaoTira1 && this.posicaoTira2 && this.posicaoTira3 && this.posicaoTira4 && this.posicaoTira5)
    {
      this.tirasGroup.setVisible(false);
      gameState.insignia2 = true;
      this.grid.setVisible(false);
      this.quadroCursos.setTint(0xffffff);
      this.backgroundPicotadora.setTint(0xffffff);  
      console.log("Parabéns, você concluiu o puzzle!") // Adicionar aqui a lógica a ser executada quando o puzzle for concluído
      this.picotadora.setFrame(0);
      
      setTimeout(() => {
        this.balao1.setVisible(true); // torna o balão de parabenização visível
        this.texto1.setVisible(true); // torna o balão de parabenização visível
        this.somInsignia.play();
        this.somInsignia.setVolume(1.0);
      }, 1100);

      criaTelaInsignias(this);
      
      // algo como um delay, um texto de parabenização, falar da insígnia, etc etc etc
      // após isso, cria uma seta apontando pra esquerda que vai para a próx cena do corredor (a que cecilia ta fazendo)
    }
  }

}