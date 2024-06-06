class CursoDados extends Phaser.Scene {
    constructor() {
        super('CursoDados');
    }

  cenaPorta;
  macaneta;
  balaoDados;
  botaoFechar;
  portaCenaDados;
  somPortaDados;
  preload() {
    // carregamento de assets
    this.load.image('cenaPorta', 'assets/cena_porta_sem_porta.png');
    this.load.image('portaCenaDados', 'assets/porta_segundo_andar.png');
    this.load.spritesheet('macaneta', 'assets/baloesFase2/macaneta_fase2.png', { frameWidth: 100, frameHeight: 100});
    this.load.image('balaoDados', 'assets/baloesFase2/balaoSalaDatabase.png');
    this.load.image('botaoFechar', 'assets/baloesFase2/botaoFecharFase2.png');
    this.load.audio('somPortaDados', 'assets/sonsFase2/somPortaDados.mp3');
    this.load.audio('somMacaneta', 'assets/somMacaneta.mp3')
  }


  create() {

    mute(this, gameState.mute);
    opcoes(this, gameState.opcoes);

    // adiciona elementos visuais
    this.cenaPorta = this.add.image(400, 300, 'cenaPorta').setScale(1);
    this.macaneta = this.add.sprite(325, 308, 'macaneta').setScale(0.5).setDepth(1);
    this.portaCenaDados = this.add.image(395, 295, 'portaCenaDados').setScale(0.9);
    this.portaCenaDados.setInteractive();
    // cria a animação da maçaneta APENAS caso ela não tenha sido criada antes
    // caso tenha sido criada antes, a animação pode ser reutilizada sem ter que ser criada novamente
    if (!this.anims.get('abrirMacanetaDados')) {
      this.anims.create({
      key: 'abrirMacanetaDados',
      frames: this.anims.generateFrameNumbers('macaneta', { start: 0, end: 7 }),
      frameRate: 20,
      });
    }

    
    // torna a cena interativa
    this.cenaPorta.setInteractive();

    // Ao passar o mouse sobre a porta, o cursor muda para indicar que é interativo
    this.portaCenaDados.on('pointerover', () => {
        this.game.canvas.style.cursor = 'pointer';
    }
    )
    this.portaCenaDados.on('pointerout', () => {
        this.game.canvas.style.cursor = 'default';
    }
    )

    let portaAberta = false;
    
    // Ao clicar na porta, troca o som do jogo
    this.portaCenaDados.on('pointerdown', () => {
      if (!portaAberta) {

      this.portaCenaDados.disableInteractive();
      this.somMacaneta = this.sound.add('somMacaneta');
      this.somMacaneta.play();
      this.somMacaneta.setVolume(1.5);
        this.somPortaDados = this.sound.add('somPortaDados')
        this.somPortaDados.setVolume(1.5);
        this.scene.get('CenaInicial').musica.pause(); // pausa a musica que vem da tela inicial
        this.somPortaDados.play();
        this.somPortaDados.loop = true;
        gameState.cursoDados = true; // Significa que o jogador visitou essa porta
        this.macaneta.play('abrirMacanetaDados');
        this.macaneta.on('animationcomplete', () => {
            this.portaCenaDados.on('pointerover', () => {
              this.game.canvas.style.cursor = 'default';
            })
            this.macaneta.setVisible(false);
            this.portaCenaDados.disableInteractive();
            this.balaoDados = this.add.image(400, 300, 'balaoDados').setScale(1); // texto explicativo sobre o curso
            this.botaoFechar = this.add.image(400, 455, 'botaoFechar').setScale(0.03);
            this.botaoFechar.setInteractive();
            this.botaoFechar.on('pointerover', () => {
              this.game.canvas.style.cursor = 'pointer';
          });
            this.botaoFechar.on('pointerout', () => {
              this.game.canvas.style.cursor = 'default';
        });
        // Volta para o corredor, para a musica da cena e volta a musica inicial
        this.botaoFechar.on('pointerdown', () => {
            this.somPortaDados.stop();
            this.scene.start('CorredorCursos');
            this.scene.get('CenaInicial').musica.play();
        }); 

        }, this);
      // animação maçaneta
      // sons
      // balão de texto do curso
  }});
  }
}