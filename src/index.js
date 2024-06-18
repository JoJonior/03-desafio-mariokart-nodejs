///Players
const player1 = {
    NOME: "Mario",
    VELOCIDADE: 4,
    MANOBILIDADE: 3,
    PODER: 3,
    PONTOS: 0
}

const player2 = {
    NOME: "Luigi",
    VELOCIDADE: 4,
    MANOBILIDADE: 4,
    PODER: 2,
    PONTOS: 0
}
///
async function getRandomBlock(){
    let random = Math.random();
    let result 

    switch (true){

        case random < 0.33:
            result = "RETA"
            break;
        case random > 0.66:
             result = "CURVA"
            break;

        default:
             result = "CONFRONTO"
            break;
    }
    return result

}
async function rollDice(){
    return Math.floor(Math.random() * 6) + 1;
}
async function playRaceEngine(char1, char2){

    for(let round = 1; round <= 5; round++){
        console.log(`🏁 Rodada ${round} `);

        // sortear bloco
        let block = await getRandomBlock();
        console.log(`Bloco: ${block} `)
    
        //rolar dados
        diceResult1 = await rollDice();
        diceResult2 = await rollDice();
        // teste de habilidade (Dado + habilidade = testeskill)
        let testSkill1 =0;
        let testSkill2 =0;
        /// 3 "="  é a forma mais segura de comparar strings
        if(block==="RETA"){
            testSkill1 = diceResult1 + char1.VELOCIDADE;
            testSkill2 = diceResult2 + char2.VELOCIDADE;

            await logRollResult(char1.NOME,"velocidade",diceResult1,char1.VELOCIDADE,testSkill1)
            await logRollResult(char2.NOME,"velocidade",diceResult2,char2.VELOCIDADE,testSkill2)
            
        }else if(block==="CURVA"){
            testSkill1 = diceResult1 + char1.MANOBILIDADE;
            testSkill2 = diceResult2 + char2.MANOBILIDADE;

            await logRollResult(char1.NOME,"mobilidade",diceResult1,char1.MANOBILIDADE,testSkill1)
            await logRollResult(char2.NOME,"mobilidade",diceResult2,char2.MANOBILIDADE,testSkill2)

        }else if(block==="CONFRONTO"){
           let powerResult1 = diceResult1 + char1.PODER;
           let powerResult2 = diceResult2 + char2.PODER;
            
           console.log(`${char1.NOME} confrontou ${char2.NOME} 🥊`)
           await logRollResult(char1.NOME,"poder",diceResult1,char1.PODER,powerResult1)
           await logRollResult(char2.NOME,"poder",diceResult2,char2.PODER,powerResult2)

           char2.PONTOS -= powerResult1>powerResult2 && char2.PONTOS > 0 ? 1 : 0

           char1.PONTOS -= powerResult1>powerResult2 && char1.PONTOS > 0 ? 1 : 0
            
           console.log(
            powerResult1===powerResult2 ? 
            "Confronto empatado! ninguem perde ponto.": 
            powerResult1>powerResult2 ?
             `${char1.NOME} venceu o confronto! ${char2.NOME} perdeu 1 ponto 🐢`:
             `${char2.NOME} venceu o confronto! ${char1.NOME} perdeu 1 ponto 🐢` )

        }
        ///Verificando quem venceu
        if(testSkill1>testSkill2){
            console.log(`${char1.NOME} marcou um ponto!`)
            char1.PONTOS++
        }else if (testSkill1<testSkill2){
            console.log(`${char2.NOME} marcou um ponto!`)
            char2.PONTOS++
        }

        console.log("_____________________________________________________")
    }
    await declareWinner(char1,char2);
        
}

async function declareWinner(char1,char2){
    console.log("Resultado final:\n")
    console.log(`${char1.NOME}: Pontos:${char1.PONTOS} \n${char2.NOME}: Pontos:${char2.PONTOS} `)
    ///console.log(char1.PONTOS>char2.PONTOS ? `${char1.NOME} Venceu a corrida`:`${char2.NOME} Venceu a corrida`)

    if(char1.PONTOS>char2.PONTOS)console.log(`${char1.NOME} Venceu a corrida`)
    else if(char1.PONTOS<char2.PONTOS)console.log(`${char2.NOME} Venceu a corrida`)
    else console.log("A corrida empatou!")
   
}
async function logRollResult(charName, bloco, diceResult, att,testeSkill){
    console.log(`${charName} 🎲 rolou um dado de ${bloco}: ${diceResult} + ${att} = ${testeSkill}`)
}

(async function main(){
    
    console.log(
        `🏁🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando...\n`

    )
    await playRaceEngine(player1,player2);
    
})()

