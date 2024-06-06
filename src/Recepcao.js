class Recepcao extends Phaser.Scene {
  constructor() {
    super({ key: "Recepcao" });
  }

  larguraBalao;
  alturaBalao;
  balao1;
  texto1;
  balao2;
  texto2;
  backgroundRecepcao;
  elevador;
  mesa;

  preload() {
    this.load.image("bg_recepcao", "assets/salaRecepção_semElevaeMesa.png"); // carregamento da imagem do fundo sem computador e mesa

    this.load.spritesheet(
      "elevador",
      "assets/elevadorExternoSpritesheet.png",
      { frameWidth: 593, frameHeight: 683, startFrame: 0, endFrame: 13 }
    ); // carregamento da imagem do elevador

    this.load.spritesheet("desk", "assets/sprite_mesa.png", {
      frameWidth: 260,
      frameHeight: 180,
    }); // carregamento da imagem da escrivaninha

    //Botao de som
    this.load.spritesheet("botaoSom", "assets/spriteSheetSom.png", {
      frameWidth: 180,
      frameHeight: 180,
      startFrame: 0,
      endFrame: 1,
    });
  }

  create() {

    mute(this, gameState.mute);
    opcoes(this, gameState.opcoes);
    somClique(this);

    this.cameras.main.fadeIn(1000, 0, 0, 0); // fade in para o início da cena *trocar para um retângulo diminuindo, como no contrário da cena inicial

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
      "Olá, que bom ter você aqui! \n \n \n A sua jornada para conhecer todos os benefícios \n da Oracle Academy começa agora. \n \n \n Vamos nessa? \n \n \n Clique para continuar!",
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
      "Essa é a sala da recepção! \n É aqui que você vai se identificar \n para então poder explorar todos os recursos \n dessa jornada. \n \n \n (Para começar, clique no computador da recepção, \n no canto esquerdo da tela.)",
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

    // Background da recepção
    this.backgroundRecepcao = this.add
      .image(325, 300, "bg_recepcao")
      .setScale(1.2);

    // Sprite do elevador
    this.elevador = this.add.sprite(510, 312, "elevador").setScale(0.4);

    // Escrivaninha
    this.mesa = this.add.sprite(243, 421, "desk").setScale(1.1);
    this.mesa.setFrame(0); // define que a mesa inicia no frame 0

    this.mesa.on("pointerover", () => {
      this.mesa.setFrame(1); // define que a mesa muda para o frame 1 quando o mouse está sobre ela
      this.mesa.setScale(1.2);
      this.input.setDefaultCursor("pointer"); //define que o cursor muda para a mãozinha quando o mouse está sobre ela
    });

    this.mesa.on("pointerout", () => {
      this.mesa.setFrame(0); // define que a mesa muda para o frame 0 quando o mouse não está sobre ela
      this.mesa.setScale(1.1);
      this.input.setDefaultCursor("default"); //restaure o cursor para padrao quando o mouse nao está sobre ela
    });

    this.balao1.on("pointerdown", () => {
      this.balao1.setVisible(false); // torna o balao1 invisível ao clique
      this.texto1.setVisible(false); // torna o texto1 invisível ao clique
      this.texto2.setVisible(true); // torna o texto2 visível ao clique
      this.balao2.setVisible(true); // torna o balao2 visível ao clique
    });

    this.balao2.on("pointerdown", () => {
      this.balao2.setVisible(false); // torna o balao2 invisível após clique
      this.texto2.setVisible(false); // torna o texto2 invisível após clique
      this.mesa.setInteractive(); // define que a mesa é um objeto interativo só depois dos balões de fala desaparecerem
    });

    //ao se clicar na mesa, a cena muda para a cena da Recepcao
    this.mesa.on("pointerdown", () => {
      this.scene.stop("Recepcao");
      this.scene.start("Cadastro");
    });
  }

  update() {}
}
