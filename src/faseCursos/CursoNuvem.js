class CursoNuvem extends Phaser.Scene {
    constructor() {
        super('CursoNuvem');
    }

  cenaPorta;
  macaneta;
  balaoNuvem;
  botaoFechar;
  portaCenaNuvem;
  preload() {
    // carregamento de assets
    this.load.image('cenaPorta', 'assets/cena_porta_sem_porta.png');
    this.load.image('portaCenaNuvem', 'assets/porta_segundo_andar.png');
    this.load.spritesheet('macaneta', 'assets/baloesFase2/macaneta_fase2.png', { frameWidth: 100, frameHeight: 100});
    this.load.image('balaoNuvem', 'assets/baloesFase2/balaoSalaNuvem.png');
    this.load.image('botaoFechar', 'assets/baloesFase2/botaoFecharFase2.png');
    this.load.audio('somPortaNuvem', 'assets/sonsFase2/somPortaNuvem.mp3');
    this.load.audio('somMacaneta', 'assets/somMacaneta.mp3');
  }


  create() {

    mute(this, gameState.mute);
    opcoes(this, gameState.opcoes);

    // adiciona elementos visuais
    this.cenaPorta = this.add.image(400, 300, 'cenaPorta').setScale(1);
    this.macaneta = this.add.sprite(325, 308, 'macaneta').setScale(0.5).setDepth(1);
    this.portaCenaNuvem = this.add.image(395, 295, 'portaCenaNuvem').setScale(0.9);
    this.portaCenaNuvem.setInteractive();
    // cria a animação da maçaneta APENAS caso ela não tenha sido criada antes
    if (!this.anims.get('abrirMacanetaNuvem')) {
      this.anims.create({
      key: 'abrirMacanetaNuvem',
      frames: this.anims.generateFrameNumbers('macaneta', { start: 0, end: 7 }),
      frameRate: 20,
      });
    }

    this.portaCenaNuvem.on('pointerover', () => { 
        this.game.canvas.style.cursor = 'pointer';
    })
    this.portaCenaNuvem.on('pointerout', () => {
        this.game.canvas.style.cursor = 'default';
    })

    let portaAberta = false;

    this.cenaPorta.setInteractive();
    // Ao clicar na porta, troca o som do jogo
    this.portaCenaNuvem.on('pointerdown', () => {

      if (!portaAberta) {

      this.portaCenaNuvem.disableInteractive();
      this.somMacaneta = this.sound.add('somMacaneta');
      this.somMacaneta.play();
      this.somMacaneta.setVolume(1.5);
        this.somPortaNuvem = this.sound.add('somPortaNuvem');
        this.scene.get('CenaInicial').musica.pause();
        this.somPortaNuvem.play()
        this.somPortaNuvem.setVolume(0.8);
        this.somPortaNuvem.loop = true;
        gameState.cursoNuvem = true;
        this.macaneta.play('abrirMacanetaNuvem');
        this.macaneta.on('animationcomplete', () => {
            // ao final da animação, adiciona o balão de texto e o botão de fechar
            this.portaCenaNuvem.on('pointerover', () => {
                this.game.canvas.style.cursor = 'default';
            })
            this.portaCenaNuvem.disableInteractive();
            this.macaneta.setVisible(false);
            this.balaoNuvem = this.add.image(400, 300, 'balaoNuvem').setScale(1);
            this.botaoFechar = this.add.image(400, 465, 'botaoFechar').setScale(0.03);
            this.botaoFechar.setInteractive();
            this.botaoFechar.on('pointerover', () => {
              this.game.canvas.style.cursor = 'pointer';
          });
          this.botaoFechar.on('pointerout', () => {
            this.game.canvas.style.cursor = 'default';
        });
        // ao clicar no botão de fechar, volta para o corredor de cursos
        this.botaoFechar.on('pointerdown', () => {
            this.somPortaNuvem.stop();
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