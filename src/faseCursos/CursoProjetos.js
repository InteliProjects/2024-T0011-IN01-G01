class CursoProjetos extends Phaser.Scene {
    constructor() {
        super('CursoProjetos');
    }

  cenaPorta;
  macaneta;
  balaoProjetos;
  botaoFechar;
  portaCenaProjetos;
  preload() {
    // carregamento de assets
    this.load.image('cenaPorta', 'assets/cena_porta_sem_porta.png');
    this.load.image('portaCenaProjetos', 'assets/porta_segundo_andar.png');
    this.load.spritesheet('macaneta', 'assets/baloesFase2/macaneta_fase2.png', { frameWidth: 100, frameHeight: 100});
    this.load.image('balaoProjetos', 'assets/baloesFase2/balaoSalaProjetos.png');
    this.load.image('botaoFechar', 'assets/baloesFase2/botaoFecharFase2.png');
    this.load.audio('somPortaProjetos', 'assets/sonsFase2/somPortaProjetos.mp3');
    this.load.audio('somMacaneta', 'assets/somMacaneta.mp3');
  }


  create() {

    mute(this, gameState.mute);
    opcoes(this, gameState.opcoes);

    // adiciona elementos visuais
    this.cenaPorta = this.add.image(400, 300, 'cenaPorta').setScale(1);
    this.macaneta = this.add.sprite(325, 308, 'macaneta').setScale(0.5).setDepth(1);
    this.portaCenaProjetos = this.add.image(395, 295, 'portaCenaProjetos').setScale(0.9);
    this.portaCenaProjetos.setInteractive();
    // cria a animação da maçaneta APENAS caso ela não tenha sido criada antes
    if (!this.anims.get('abrirMacanetaProjetos')) {
      this.anims.create({
      key: 'abrirMacanetaProjetos',
      frames: this.anims.generateFrameNumbers('macaneta', { start: 0, end: 7 }),
      frameRate: 20,
      });
    }

    this.portaCenaProjetos.on('pointerover', () => {
        this.game.canvas.style.cursor = 'pointer';
    })
    this.portaCenaProjetos.on('pointerout', () => {
        this.game.canvas.style.cursor = 'default';
    })


    this.cenaPorta.setInteractive();

    let portaAberta = false;

    // Ao clicar na porta, troca o som do jogo
    this.portaCenaProjetos.on('pointerdown', () => {
      if (!portaAberta) {

      this.portaCenaProjetos.disableInteractive();
      this.somMacaneta = this.sound.add('somMacaneta');
      this.somMacaneta.play();
      this.somMacaneta.setVolume(1.5);
        this.somPortaProjetos = this.sound.add('somPortaProjetos');
        this.scene.get('CenaInicial').musica.pause();
        this.somPortaProjetos.play()
        this.somPortaProjetos.setVolume(1.8);
        gameState.cursoProjetos = true;
        this.macaneta.play('abrirMacanetaProjetos');
        this.macaneta.on('animationcomplete', () => {
            // ao final da animação, adiciona o balão de texto e o botão de fechar
            this.portaCenaProjetos.on('pointerover', () => {
                this.game.canvas.style.cursor = 'default';
            })
            this.portaCenaProjetos.disableInteractive();
            this.macaneta.setVisible(false);
            this.balaoProjetos = this.add.image(400, 300, 'balaoProjetos').setScale(1);
            this.botaoFechar = this.add.image(400, 455, 'botaoFechar').setScale(0.03);
            this.botaoFechar.setInteractive();
            this.botaoFechar.on('pointerover', () => {
              this.game.canvas.style.cursor = 'pointer';
          });
            this.botaoFechar.on('pointerout', () => {
              this.game.canvas.style.cursor = 'default';
        });
        // ao clicar no botão de fechar, volta para o corredor de cursos
        this.botaoFechar.on('pointerdown', () => {
            this.somPortaProjetos.stop();
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