class CursoJava extends Phaser.Scene {
    constructor() {
        super('CursoJava');
    }

  cenaPorta;
  macaneta;
  balaoJava;
  botaoFechar;
  portaCenaJava;
  preload() {
    // carregamento de assets
    this.load.image('cenaPorta', 'assets/cena_porta_sem_porta.png');
    this.load.image('portaCenaJava', 'assets/porta_segundo_andar.png');
    this.load.spritesheet('macaneta', 'assets/baloesFase2/macaneta_fase2.png', { frameWidth: 100, frameHeight: 100});
    this.load.image('balaoJava', 'assets/baloesFase2/balaoSalaJava.png');
    this.load.image('botaoFechar', 'assets/baloesFase2/botaoFecharFase2.png');
    this.load.audio('somPortaJava', 'assets/sonsFase2/somPortaJava.mp3');
    this.load.audio('somMacaneta', 'assets/somMacaneta.mp3');
  }


  create() {

    mute(this, gameState.mute);
    opcoes(this, gameState.opcoes);

    // adiciona elementos visuais
    this.cenaPorta = this.add.image(400, 300, 'cenaPorta').setScale(1);
    this.macaneta = this.add.sprite(325, 308, 'macaneta').setScale(0.5).setDepth(1);
    this.portaCenaJava = this.add.image(395, 295, 'portaCenaJava').setScale(0.9);
    this.portaCenaJava.setInteractive();
    // cria a animação da maçaneta APENAS caso ela não tenha sido criada antes
    if (!this.anims.get('abrirMacanetaJava')) {
      this.anims.create({
      key: 'abrirMacanetaJava',
      frames: this.anims.generateFrameNumbers('macaneta', { start: 0, end: 7 }),
      frameRate: 20,
      });
    }


    this.portaCenaJava.on('pointerover', () => {
        this.game.canvas.style.cursor = 'pointer';
    })
    this.portaCenaJava.on('pointerout', () => {
        this.game.canvas.style.cursor = 'default';
    })

    this.somPortaJava = this.sound.add('somPortaJava');

    let portaAberta = false;

    // Ao clicar na porta, troca o som do jogo
    this.portaCenaJava.on('pointerdown', () => {
      if (!portaAberta) {

      this.portaCenaJava.disableInteractive();
      this.somMacaneta = this.sound.add('somMacaneta');
      this.somMacaneta.play();
      this.somMacaneta.setVolume(1.5);
        this.scene.get('CenaInicial').musica.pause();
        this.somPortaJava.setVolume(0.4);
        this.somPortaJava.play()
        this.somPortaJava.loop = true;
        gameState.cursoJava = true; // Significa que o jogador visitou essa porta
        this.macaneta.play('abrirMacanetaJava');
        this.macaneta.on('animationcomplete', () => {
            // ao final da animação, adiciona o balão de texto e o botão de fechar
            this.portaCenaJava.on('pointerover', () => {
                this.game.canvas.style.cursor = 'default';
            })
            this.macaneta.setVisible(false);
            this.portaCenaJava.disableInteractive();
            this.balaoJava = this.add.image(400, 300, 'balaoJava').setScale(1);
            this.botaoFechar = this.add.image(400, 460, 'botaoFechar').setScale(0.03);
            this.botaoFechar.setInteractive();
            this.botaoFechar.on('pointerover', () => {
              this.game.canvas.style.cursor = 'pointer';
          });
          this.botaoFechar.on('pointerout', () => {
            this.game.canvas.style.cursor = 'default';
        });
        // volta pro corredor e para a música da cena
        this.botaoFechar.on('pointerdown', () => {
            this.scene.start('CorredorCursos');
            this.somPortaJava.stop();
            this.scene.get('CenaInicial').musica.play();
        }); 
        }, this);
      // animação maçaneta
      // sons
      // balão de texto do curso
  }});
  }
}