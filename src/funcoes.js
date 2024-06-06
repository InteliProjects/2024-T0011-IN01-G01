function opcoes(cena) {

    // Adiciona o botão de configurações e define seus eventos
    cena.botaoConfig = cena.add
    .image(695, 50, "botaoConfig")
    .setScale(0.2)
    .setDepth(2);
    cena.botaoConfig.setInteractive();

    if (gameState.Acessibilidade) {
      cena.corSolid = cena.add.rectangle(400, 300, 800, 600, gameState.Daltonismo, 0.2).setDepth(13);
    }

    cena.botaoConfig.on("pointerdown", () => {
    // Verifica se o menu já está aberto
    if (!cena.menuOpcoes) {
      // Cria um retângulo para o menu
      cena.menuOpcoes = cena.add.image(400, 300, "menuOpcoes").setScale(0.3).setDepth(9)
      cena.botaoAcessibilidade = cena.add.sprite(230, 370, "botaoAcessibilidade").setScale(0.08).setDepth(10)
      cena.botaoIdioma = cena.add.sprite(230, 275, "botaoIdioma").setScale(0.08).setDepth(10)
      cena.botaoIdiomaText = cena.add.text(295, 265, gameState.idioma, { fontSize: "20px", fill: "#ffffff" }).setDepth(10)

      // Impede que os eventos sejam propagados para elementos abaixo do menu
      cena.menuOpcoes.setInteractive({ pixelPerfect: true, useHandCursor: true });
      cena.botaoAcessibilidade.setInteractive();
      cena.botaoIdioma.setInteractive();

      cena.menuOpcoes.on("pointerover", () => {
      cena.input.setDefaultCursor("default");
      });
      cena.menuOpcoes.on("pointerout", () => {
      cena.input.setDefaultCursor("auto");
      });
      
      // Define o evento de clique do botão de acessibilidade
      cena.botaoAcessibilidade.on("pointerdown", () => {
        gameState.Acessibilidade = true;

        // Verifica se a cor sólida já foi criada
        if (!cena.corSolid && gameState.Daltonismo !== 0x0000ff) {
          // Cria um retângulo colorido para simular a acessibilidade
          cena.corSolid = cena.add.rectangle(400, 300, 800, 600, 0xffff00, 0.2).setDepth(13);
          gameState.Daltonismo = 0xffff00;
        } else if (cena.corSolid.fillColor === 0xffff00) {
          // Altera a cor do retângulo para outra opção de acessibilidade
          cena.corSolid.setFillStyle(0x0000ff, 0.2);
          gameState.Daltonismo = 0x0000ff;
        } else {
          // Remove o retângulo de acessibilidade
          cena.corSolid.destroy();
          cena.corSolid = null;
          gameState.Daltonismo = false;
        }

        // Altera o frame do botão de acessibilidade
        cena.botaoAcessibilidade.setFrame(1);
      });
    
      cena.botaoIdioma.on("pointerdown", () => {
      cena.botaoIdioma.setFrame(1);
      if (cena.botaoIdiomaText.text === "PT-BR") {
        cena.botaoIdiomaText.text = "EN-US";
        gameState.idioma = "EN-US";
      } else {
        cena.botaoIdiomaText.text = "PT-BR";
        gameState.idioma = "PT-BR";
      }
      });
    
      cena.botaoAcessibilidade.on("pointerup", () => {
      cena.botaoAcessibilidade.setFrame(0);
        });
    
      cena.botaoIdioma.on("pointerup", () => {
      cena.botaoIdioma.setFrame(0);
        });

    } else {
      // Remove o menu
      cena.menuOpcoes.destroy();
      // Remove o botao "Acessibilidade" 
      cena.botaoAcessibilidade.destroy();
      // Remove o botao "Idioma" 
      cena.botaoIdioma.destroy();
      // Remove o texto do botao "Idioma"
      cena.botaoIdiomaText.destroy();


      cena.menuOpcoes = null;

    }
    });

  cena.botaoConfig.on("pointerover", () => {
    cena.input.setDefaultCursor("pointer");
  });

  cena.botaoConfig.on("pointerout", () => {
    cena.input.setDefaultCursor("auto");
  });


}

function mute(cena) {

  cena.botaoSom = cena.add
  .sprite(750, 50, "botaoSom")
  .setScale(0.2)
  .setDepth(3);
  
cena.botaoSom.setInteractive(); //define que o botaoSom é um objeto interativo
//coloca o botao do som para comecar no primeiro frame
if (game.sound.mute === false) {
  console.log(0)
  cena.botaoSom.setFrame(0);
} else if(game.sound.mute === true){
  console.log(1)
  cena.botaoSom.setFrame(1);
}
//tira o audio do jogo quando clica no botao de som
cena.botaoSom.on("pointerdown", () => {
  game.sound.mute = !game.sound.mute;
  //ajeitar essa parte do codigo (o frame nao muda no primeiro click)
  if (game.sound.mute === true) {
    cena.botaoSom.setFrame(0);
    gameState.mute = true;
  } else if(game.sound.mute === false){
    cena.botaoSom.setFrame(1);
    gameState.mute = false;
  }
});

//coloca o cursor com a maozinha quando passa por cima do botao
cena.botaoSom.on("pointerover", () => {
  cena.input.setDefaultCursor("pointer");
});

// Restaure o cursor padrão quando não estiver sobre o sprite clicável
cena.botaoSom.on("pointerout", () => {
  cena.input.setDefaultCursor("auto");
});

}

function addMusica(cena) {
    cena.musica = cena.sound.add("musica");
    cena.musica.volume = 0.1;
    cena.musica.loop = true;
    cena.musica.play();

}

function somClique(cena) {
  cena.input.on("pointerdown", () => {
    const clique = cena.sound.add("clique");
    clique.play({ volume: 0.08 });
  });
}

function criaTelaInsignias (cena) {
      //botaoInsignias;
      //telaInsignias;
      //botaoFechar;
      //cena.load.image('botao_insignias', '../assets/insignias/botao.png'); // carregamento do botão de insignias
      //cena.load.image('tela_insignias', '../assets/insignias/telaInsignias.png'); // carregamento da tela de insignias
      //cena.load.image('botao_fechar', '../assets/cadastro/botao_fechar.png'); // carregamento do botão de fechar
    
      cena.botaoInsignias = cena.add.image(50, 50, 'botao_insignias').setScale(0.2); // botão de insignias
      cena.botaoInsignias.setDepth(5);
      cena.botaoInsignias.setInteractive(); // define que o botão de insignias é um objeto interativo
      cena.botaoInsignias.on('pointerover', () => {
          cena.input.setDefaultCursor("pointer");
          cena.botaoInsignias.setScale(0.18)
    
      })
      cena.botaoInsignias.on('pointerout', () => {
          cena.input.setDefaultCursor("default");
          cena.botaoInsignias.setScale(0.2);
      })

      let telaAberta = false;

      cena.botaoInsignias.on('pointerdown', () => { // ao clicar no botão de insignias, a cena muda para a cena de insignias  
        if (!telaAberta) {
          
          cena.botaoInsignias.disableInteractive();

          cena.telaInsignias = cena.add.image(400, 300, 'tela_insignias').setScale(0.8); // tela de insignias
          cena.botaoFechar = cena.add.image(550, 210, 'botao_fechar').setScale(0.025); // botão de fechar
          cena.botaoFechar.setInteractive(); // define que o botão de fechar é um objeto interativo
          cena.telaInsignias.setInteractive({ pixelPerfect: true });

          if (cena.elevadorContorno) {
            cena.elevadorContorno.disableInteractive (true);
          }

          if (cena.portaDados) {
            cena.portaDados.disableInteractive (true);
          }

          if (cena.portaJava) {
            cena.portaJava.disableInteractive (true);
          }

          if (cena.portaProjetos) {
            cena.portaProjetos.disableInteractive (true);
          }

          if (cena.portaNuvem) {
            cena.portaNuvem.disableInteractive (true);
          }

          cena.botaoFechar.on('pointerover', () => {
              cena.input.setDefaultCursor("pointer");
          })
    
          cena.botaoFechar.on('pointerout', () => {
              cena.input.setDefaultCursor("default");
          })
    
          cena.botaoFechar.on('pointerdown', () => { // ao clicar no botão de fechar, a tela de insignias some
            cena.telaInsignias.setVisible(false); // torna a tela de insignias invisível
            cena.botaoFechar.setVisible(false); // torna o botão de fechar invisível
            cena.botaoInsignias.setInteractive(true); // deixa o botão de insígnias clicável novamente
            // Verifica se a insígnia 1 está carregada antes de tentar ocultá-la
            if (cena.insignia1) {
              cena.insignia1.setVisible(false);
            }
            // Verifica se a insígnia 2 está carregada antes de tentar ocultá-la
            if (cena.insignia2) {
              cena.insignia2.setVisible(false);
            }
            if (cena.elevadorContorno) {
              cena.elevadorContorno.setInteractive (true);
            }
            if (cena.portaDados) {
              cena.portaDados.setInteractive (true);
            }
  
            if (cena.portaJava) {
              cena.portaJava.setInteractive (true);
            }
  
            if (cena.portaProjetos) {
              cena.portaProjetos.setInteractive (true);
            }
  
            if (cena.portaNuvem) {
              cena.portaNuvem.setInteractive (true);
            }
        })};
    
          if (gameState.insignia1 == true) {
              cena.insignia1 = cena.add.image(255, 300, 'insignia1').setScale(0.25); // adiciona a insignia1 na tela de insignias
          }
          if (gameState.insignia2 == true) {
              cena.insignia2 = cena.add.image(325, 300, 'insignia2').setScale(0.25);
    
    /*      cena.botaoFechar.on('pointerdown', () => { // ao clicar no botão de fechar, a tela de insignias some
              cena.telaInsignias.setVisible(false); // torna a tela de insignias invisível
              cena.botaoFechar.setVisible(false); // torna o botão de fechar invisível
              cena.insignia1.setVisible(false); // torna a insignia1 invisível
              cena.insignia2.setVisible(false); // torna a insignia2 invisível
          }, cena);*/
    }})

}
