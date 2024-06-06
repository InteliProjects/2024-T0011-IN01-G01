const gameState = {
    errosQuiz1: 0,
    acertosQuiz1: 0,
    insignia1: false,
    insignia2: false,
    insignia3: false,
    insignia4: false,
    insignia5: false,
    cursoJava: false,
    cursoNuvem: false,
    cursoDados: false,
    cursoProjetos: false,
    esteveNoCorredor: false,
    mute: false,
    idioma: "PT-BR",
    Daltonismo: "0xffffff",
    Acessibilidade: false,
    totem: false
}

// configuração do jogo
const config = {
    type: Phaser.AUTO,
    width: 800, // Resolução 4:3
    height: 600,
    
    scale: { // configuração de responsividade da tela
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    // cenas
    scene: [CenaInicial, Recepcao, Cadastro, Tela03, Tela04, Tela05, Tela05Cadastro, Tela06, Tela07, Tela08, Tela09, Tela10, Tela11, Tela11Preenchido, Tela11Adicionar, Tela12Adicionar2, Tela12Adicionado, Tela13, Tela13Op1, Tela13Op2, Tela13Op3, Tela14, Tela14Preenchido, Tela15, Tela16, Tela16Revisado, Tela17, Tela18, Tela19quiz1, Tela19quiz1Correto, Tela19quiz1Incorreto, Tela20quiz2, Tela20quiz2Correto, Tela20quiz2Incorreto, Tela21quiz3, Tela21quiz3Correto, Tela21quiz3Incorreto, Tela22quiz4, Tela22quiz4Correto, Tela22quiz4Incorreto, Tela23quiz5, Tela23quiz5Correto, Tela23quiz5Incorreto, Tela24quizCerto, Tela24quizErro, Recepcao2, Elevador, CorredorCursos,  CursoJava, CursoNuvem, CursoDados, CursoProjetos, Puzzle, CorredorCursos2, ElevadorFase3, elevadorInicial, elevadorTotem, elevadorPane, elevadorPuzzle, CenaFinal],
    //scene: [elevadorInicial, elevadorTotem, elevadorPane, CorredorCursos, CursoJava, CursoNuvem, CursoDados, CursoProjetos]
};      
// inicio do game
const game = new Phaser.Game(config);


