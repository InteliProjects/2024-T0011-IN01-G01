class CenaFinal extends Phaser.Scene {
    constructor() {
      super({ key: "CenaFinal" });
  
      
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
    fim;
    creditos;
    transparencia;
    
  
    preload() {
      this.load.image("fundo", "assets/ceu_e_chao.png");
      this.load.image("predio", "assets/predio_sem_porta.png");
      // Nuvens
      this.load.image("nuvem1", "assets/nuvem1.png");
      this.load.image("nuvem2", "assets/nuvem2.png");
      // Créditos
      this.load.image("creditos", "assets/creditos.png");
      // Fim
      this.load.image("fim", "assets/fim.png");
      // Efeito de transparência
      this.load.image("transparencia", "assets/efeitoTransparencia.png");

  
      // Passaro
      this.load.spritesheet("passaro", "assets/BirdSpritesheet.png", {
        frameWidth: 81,
        frameHeight: 76,
      });
      
      
  
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
    }
  
    create() {
      // adiciona as funções
      mute(this, gameState.mute);
      opcoes(this);
      
      
      // Adiciona os elementos na tela
      this.fundo = this.add.image(400, 300, "fundo").setScale(0.6);
      this.predio = this.add.image(395, 270, "predio").setScale(0.4);
      this.porta = this.add.sprite(395, 420, "porta_abrindo").setScale(0.15); // Separamos a porta do prédio para que ela possa ser animada
      this.nuvem1 = this.add.image(640, 240, "nuvem1").setScale(0.35);
      this.nuvem2 = this.add.image(200, 80, "nuvem2").setScale(0.22);
      this.transparencia = this.add.image(400, 300, "transparencia");
      
      // Adicione um retângulo branco para fazer o fade in da tela toda
      this.telaBranca = this.add.rectangle(
        0,
        0,
        config.width,
        config.height,
        0xffffff
      );
      this.telaBranca.setOrigin(0, 0);
  
      // Método tweens faz animações da tela branca
      this.tweens.add({
        delay: 300,
        targets: this.telaBranca,
        alpha: 0, // Defina o valor final de opacidade desejado (0 para totalmente transparente)
        duration: 3000, // Duração em milissegundos
        onComplete: () => {
          // Código a ser executado após o fade in ser concluído
          this.telaBranca.destroy(); 
        },
      });
  
      
  
      // Animações dos pássaros
      // Foram feitos dois pássaros para que um ficasse com o frameRate mais rápido que o outro, dando a impressão
      // de que estão voando em velocidades diferentes
      this.passaro1 = this.add.sprite(100, 300, "passaro").setScale(0.8);
      this.passaro2 = this.add.sprite(600, 150, "passaro").setScale(0.4);
  
      //porta.anims.play('porta_abrindo', true);
      this.passaro1.anims.play("fly1", true);
      this.passaro2.anims.play("fly2", true);

      //adicionando créditos
      var creditos = this.add.image(400, 1000, "creditos").setScale(0.6).setOrigin(0.5).setDepth(4);
      
      // criando animação dos créditos
      this.tweens.add({
        targets: creditos,
        y: -570, // 600 pixels para cima
        duration: 20000, // 20 segundos para subir
        ease: 'Linear',
        onComplete: () => { // quando os créditos acabarem, adiciona "fim"
          var fim = this.add.image(400, 300, "fim").setScale(0.7).setOrigin(0.5).setDepth(4);
          fim.setAlpha(0);
          this.tweens.add({ // faz o efeito de fade in
            targets: fim,
            alpha: 1,
            duration: 1000, // Tempo em milissegundos para o efeito de fade in
            ease: 'Linear',
            delay: 0, // Tempo de espera antes do início do tween
            callbackScope: this
          });
        },
        callbackScope: this
      });
  
      // Definindo a profundidade dos elementos, o que cria o efeito
      // de que alguns elementos estão na frente de outros. Ex.: A nuvem passando por trás do prédio
      this.predio.setDepth(2);
      this.porta.setDepth(3);
      this.nuvem1.setDepth(1);
      this.nuvem2.setDepth(1);
      this.passaro1.setDepth(3);
      this.telaBranca.setDepth(5);
      this.botaoConfig.setDepth(5);
      this.botaoSom.setDepth(5);
      this.transparencia.setDepth(4);
      

      
    
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
  