// OBJETOS

const player1 ={
  NOME: "Mario",
  VELOCIDADE: 4,
  MANOBRABILIDADE: 3,
  PODER: 3,
  PONTOS: 0,
}

const player2 ={
  NOME: "Luigi",
  VELOCIDADE: 3,
  MANOBRABILIDADE: 4,
  PODER: 4,
  PONTOS: 0,
}

// Ações com ASYNC FUNCTIONS
function esperar(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function rollsDice() {
  console.log("Jogando os dados...");
  const res =  Math.floor(Math.random() * 6) + 1;
  await esperar(2000);  // Aguardar 2 segundos
  // console.log(`O resultado do dados foi ${res}`);
  return res;
}

//Blocos de Corrida
async function getRandomBlock() {
  let random = Math.random();
  let result;

  switch (true) {
    case random < 0.33:
        result = "RETA"
      break;

    case random < 0.66:
        result = "CURVA"
      break;
  
    default:
      result = "CONFRONTO"
      break;
  }
  return result;
}

//função mostra log dos dados
async function logRollResult(playerName, block, diceResult, attribute){
  console.log(`${playerName} rolou um dado 🎲 de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute} `)
}


//função motor da corrida
async function playRaceEngine(player1, player2) {
  //loop das rodadas
  for (let round = 1; round <= 5; round++) {
    console.log("--------------------------------")
    console.log(`🏁 Iniciando ${round} Round:`);
    //sortear um bloco
    let block = await getRandomBlock();
    console.log(`Bloco: ${block}`)

     //rolar os blocos
    let diceResult1 = await rollsDice();
    let diceResult2 = await rollsDice();
    
    //testes de habilidade
    let totalTestSkill1 = 0;
    let totalTestSkill2 = 0;

    if(block == "RETA") {
      totalTestSkill1 = diceResult1 + player1.VELOCIDADE;
      totalTestSkill2 = diceResult2 + player2.VELOCIDADE;
      await logRollResult(player1.NOME,"velocidade",diceResult1,player1.VELOCIDADE)
      await logRollResult(player2.NOME,"velocidade",diceResult1,player2.VELOCIDADE)
    }
    if(block == "CURVA") {
      totalTestSkill1 = diceResult1 + player1.MANOBRABILIDADE;
      totalTestSkill2 = diceResult2 + player2.MANOBRABILIDADE;
      await logRollResult(player1.NOME,"manobrabilidade",diceResult1,player1.MANOBRABILIDADE)
      await logRollResult(player2.NOME,"manobrabilidade",diceResult1,player2.MANOBRABILIDADE)
    }
    if(block == "CONFRONTO") {
      let powerResult1 = diceResult1 + player1.MANOBRABILIDADE;
      let powerResult2 = diceResult2 + player2.MANOBRABILIDADE;
      console.log(`${player1.NOME} confrontou com ${player2.NOME} 🥊`)
      await logRollResult(player1.NOME,"poder",diceResult1,player1.PODER)
      await logRollResult(player2.NOME,"poder",diceResult1,player2.PODER)

      if(player1.PONTOS === 0){
        console.log(`${player1.NOME} sem ponto para perder`);
      } else if (player2.PONTOS === 0) {
        console.log(`${player2.NOME} sem ponto para perder`);
      }

      if(powerResult2 > powerResult1 && player1.PONTOS > 0){
        player1.PONTOS--;
        console.log(`${player1.NOME} perdeu um ponto! 🐢`)
      }
      if(powerResult1 > powerResult2 && player2.PONTOS > 0){
        player2.PONTOS--;
        console.log(`${player2.NOME} perdeu um ponto! 🐢`)
      }
      // player1.PONTOS -= powerResult2 > powerResult1 && player1.PONTOS > 0 ? 1 : 0; 
      // player2.PONTOS -= powerResult1 > powerResult2 && player2.PONTOS > 0 ? 1 : 0; 
    }

    //verificando vencedor
    if (totalTestSkill1 > totalTestSkill2) {
      console.log(`${player1.NOME} marcou um ponto!`)
      player1.PONTOS++;
    } else if (totalTestSkill1 < totalTestSkill2) {
      console.log(`${player2.NOME} marcou um ponto!`)
      player2.PONTOS++;
    }
    

  }
}

async function declareWinner(player1,player2) {
  console.log(`-----------------\nTOTAL PONTOS:\n${player1.NOME} = ${player1.PONTOS}\n${player2.NOME} = ${player2.PONTOS}`);
  if(player2.PONTOS > player1.PONTOS){
    console.log(`${player2.NOME} Venceu!🏆`);
  } else if(player1.PONTOS > player2.PONTOS) {
    console.log(`${player1.NOME} Venceu!🏆`)
  } else {
    console.log("Empate!")  }
}



//função main se auto invoka e vai chamar outras funções
(async function main() {
  console.log(`🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando...`)
  await playRaceEngine(player1, player2);
  await declareWinner(player1,player2);
})();

