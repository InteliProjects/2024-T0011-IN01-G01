class Recepcao2 extends Phaser.Scene {
    constructor () {
        super ({key: 'Recepcao2'});
    }

    fundo;
    mesa;
    elevadorContorno;
    elevadorAbrindo;
    botaoInsignias;
    telaInsignias;
    botaoFechar;
    insignia1;

    preload () {
        this.load.image('botao_insignias', 'assets/insignias/botao.png'); // carregamento do botão de insignias
        this.load.image('tela_insignias', 'assets/insignias/telaInsignias.png'); // carregamento da tela de insignias
        this.load.image('botao_fechar', 'assets/cadastro/botao_fechar.png'); // carregamento do botão de fechar
        this.load.image('insignia1', 'assets/insignias/cadastro.png'); // carregamento da insignia1
        this.load.image('insignia2', 'assets/insignias/cursos.png'); // carregamento da insignia2

        // preload do fundo
        this.load.image ('backgroundRecepcao2', 'assets/salaRecepção_semElevaeMesa.png');
        
        // preload do spritesheet do elevador com contorno 
        this.load.spritesheet ('elevadorContorno', 'assets/spritesheetElevadorContorno.png', {frameWidth: 595, frameHeight:683, startFrame: 0, endFrame: 1});
        // preload do spritesheet da porta do elevador se abrindo
        this.load.spritesheet('elevadorAbrindo', 'assets/elevadorExternoSpritesheet.png', {frameWidth:593, frameHeight:683});
        // preload da mesa
        this.load.spritesheet('desk', 'assets/sprite_mesa.png', {frameWidth: 260, frameHeight: 180}); 
        this.load.audio('somElevadorAbrindo', 'assets/somElevadorAbrindo.mp3');
        this.load.audio('somInsignia', 'assets/somInsignia.mp3');
    }
    
    create () {

        somClique(this); // chama a função somClique
        mute(this, gameState.mute);
        opcoes(this, gameState.opcoes);

        this.input.setDefaultCursor("default");
        this.cameras.main.fadeIn(1000, 0, 0, 0); // inicialização da cena com efeito de fadeIn

        // fundo
        this.fundo = this.add.image (325, 300, 'backgroundRecepcao2').setScale(1.2);// a imagem de fundo é criada no canva
       
        // mesa
        this.mesa = this.add.sprite(243, 421, 'desk').setScale(1.1); // adiciona mesa no canvas
        this.mesa.setFrame(0); // adiciona mesa no frame inicial 

        // spritesheet do elevador abrindo
        this.elevadorAbrindo = this.add.sprite(510, 312, 'elevadorAbrindo').setScale(0.4); // o spritesheet do elevador é criado no canva

        // spritesheet do elevador com o contorno
        this.elevadorContorno = this.add.sprite(510, 312, 'elevadorContorno').setScale(0.4); // adiciona a imagem inicial do elevador e a imagem com contorno
        this.elevadorContorno.setInteractive (); // aciona a interação com o elevador

        // ações do mouse sobre o elevador
        this.elevadorContorno.on('pointerover', () => {// quando o mouse estiver sobre o elevador, o sprite dará display no frame 1
            this.elevadorContorno.setFrame(1); 
            this.input.setDefaultCursor("pointer");
        });
        this.elevadorContorno.on('pointerout', () => {// quando o mouse não estiver sobre o elevador, o sprite dará display no frame 0
            this.elevadorContorno.setFrame(0);
            this.input.setDefaultCursor("default");
        })
        this.elevadorContorno.on("pointerdown", this.entrarNoElevador, this); // ao clicar no elevador, o método .entrarNoElevador será chamado
    
        criaTelaInsignias(this); // chama a função telaInsignias

        //criação da animação do elevador abrindo
        this.anims.create ({
            key:'elevadorAbre',
            frames: this.anims.generateFrameNumbers('elevadorAbrindo', { start: 0, end: 13 }),
            frameRate: 8, 
            repeat: 0,
        })

         // trecho que ADICIONA o retângulo1 atrás do texto1
        
 
         // balão que ADICIONA e configura o texto1 do balão de fala1
         if (gameState.insignia1 == true) {
            this.somInsignia = this.sound.add('somInsignia');
            this.larguraBalao = 600;
            this.alturaBalao = 400; 
            this.balao1 = this.add.rectangle(
                config.width / 2, 
                config.height / 2, 
                this.larguraBalao, // largura do retângulo
                this.alturaBalao, // altura do retângulo
                0xF1EFED, // cor do preenchimento
                0.9 // opacidade
            );
            this.texto1 = this.add.text(
                config.width / 2, // centralizado
                config.height / 2, 
                "Parabéns!! \n \n \n Você conseguiu concluir a fase 1 \n Como recompensa, você ganhou uma insígnia \n Acesse-a clicando no botão no canto superior esquerdo \n \n \n Clique para continuar!",
                {
                    fontFamily: 'Oracle Sans Serif, sans-serif',
                    fontSize: 22,
                    align: 'center',
                    color: '#312D2A'
                },
            );
            this.elevadorContorno.disableInteractive(); // desabilita a interatividade do elevador

                    // configurações do balao1 e texto1
            this.balao1.setOrigin(0.5); // Define a origem do retângulo como o centro
            this.balao1.setDepth(6); // balão atrás do texto
            this.balao1.setInteractive(); // define que o balão1 é um objeto interativo
            this.balao1.setVisible(false); // ESSENCIAL: torna o balao1 invisível
            this.texto1.setOrigin(0.5);
            this.texto1.setDepth(7);
            this.texto1.setVisible(false); // ESSENCIAL: torna o texto1 invisível

            setTimeout(() => {
                this.balao1.setVisible(true); // torna o balao1 visível
                this.texto1.setVisible(true); // torna o texto1 visível
                this.somInsignia.play();
                this.somInsignia.setVolume(1.0);
            }, 1200);

            this.balao1.on('pointerdown', () => {
                this.balao1.setVisible(false); // torna o balao1 invisível ao clique
                this.texto1.setVisible(false); // torna o texto1 invisível ao clique
                this.elevadorContorno.setInteractive(); // define que o elevador é um objeto interativo
            });
            
        }

         
    
    }
    
    update () {
        
    }
    
    entrarNoElevador(){ // ao clicar no elevador, as seguintes ações são feitas:
        this.somElevadorAbrindo = this.sound.add ('somElevadorAbrindo');
        this.somElevadorAbrindo.play();
        this.somElevadorAbrindo.setVolume(1.0);
        this.elevadorContorno.setVisible(false); // o spritesheet do elevador com contorno some
        this.elevadorAbrindo.setVisible(true); // o spritesheet do elevador abrindo aparece
        this.elevadorAbrindo.anims.play('elevadorAbre', true); // começa a animação do elevador abrindo
        this.elevadorAbrindo.on('animationcomplete', () => {
             // ao completar a animação do elevador abrindo, há mudança de cena para o Elevador
            setTimeout(() => {
                this.scene.start('Elevador');
            }, 750);
        }, this);
    }
}