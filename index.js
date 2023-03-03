import new_template from "./templates.js";
import socket from "./socket.js";
import { game, log, clear, prompt, sleep } from "./game.js";

// game.players = [
//     {
//         name: "Henrique",
//         cash: 100,
//         bet: 10,
//         cards: [
//             {
//                 suit: game.suits.spades,
//                 number: "K"
//             },
//             {
//                 suit: game.suits.clubs,
//                 number: 7
//             },
//             {
//                 suit: game.suits.clubs,
//                 number: 2
//             }
//         ]
//     },
//     {
//         name: "Isabelle",
//         cash: 100,
//         bet: 10,
//         cards: [            
//             {
//                 suit: game.suits.spades,
//                 number: "J"
//             },
//             {
//                 suit: game.suits.clubs,
//                 number: 3
//             }
//         ]
//     },
//     {
//         name: "Vidal",
//         cash: 100,
//         bet: 10,
//         cards: [            
//             {
//                 suit: game.suits.spades,
//                 number: 8
//             },
//             {
//                 suit: game.suits.clubs,
//                 number: "A"
//             },         
//             {
//                 suit: game.suits.spades,
//                 number: 8
//             },
//             {
//                 suit: game.suits.clubs,
//                 number: "A"
//             }
//         ]
//     },
//     {
//         name: "Mayumi",
//         cash: 100,
//         bet: 10,
//         cards: [            
//             {
//                 suit: game.suits.spades,
//                 number: "Q"
//             },
//             {
//                 suit: game.suits.clubs,
//                 number: 9
//             }
//         ]
//     }
// ];

const tools = {
    login: async () => {
        log("connected to server");
        clear();
    
        log(game.colors.green, "BlackJack 21's");
        const player = { 
            name: await tools.player_menu(), 
            id: socket.id,
            cards: [],
            cash: 100,
        };

        clear();
        tools.main_game(player);
    },
    main_game: async (player) => {
        const option = await tools.main_menu();
        // log(player.name, option);
        
        if (option === "Novo jogo") {
            player.active = true;
            const new_match = {
                id: (Date.now()+'').slice(-4),
                players: [player]
            };    
        
            socket.emit("new_match", { player, new_match });
            log(`Novo jogo criado, código: ${new_match.id}\nAguardando jogadores...`);

            // await sleep(1000);    
            // await tools.start_game(new_match);
        
        } else if (option === "Entrar em jogo") {
            const { match_id } = await prompt([
                {
                    message: "Código do jogo:",
                    name: "match_id",
                    type: "input"
                }
            ]);
            socket.emit("join_match", { player, match_id });
        } else if (option === "Sair") {
            process.exit(1);
        };
    },
    joined_to_game: ({ player, match_id }) => {
        if (!match_id) {
            log("Jogo não encontrado.");
            return tools.main_game(player);
        };
        log(`Conectado a partida '${match_id}', aguardando outros jogadores...`);
    },
    main_menu: async () => {
        const { option } = await prompt([ 
            { 
                message: "BlackJack 21's",
                name: "option",
                type: "list",
                choices: [
                    "Novo jogo",
                    "Entrar em jogo",
                    "Sair",
                ]
            }
        ]);
        return option;
    },
    player_menu: async () => {
        const { answer } = await prompt([ 
            { 
                message: "Qual seu nome?",
                name: "answer",
                type: "input"
            }
        ]);
        return answer;
    },
    show_board: (match) => {
        clear();
        log("─────────────────────────────────────────────────────────────────────────────────────────────────────────────");
        match.players.map((player, i)=> {
            // log(
            //     i%2? game.colors.green : game.colors.yellow, 
            //     `${player.name} - $${player.bet}\n${new_template(player.cards)}`
            // );
            log(game.colors.green, `${player.name} - $${player.cash}`);
            log((!game.sum_cards(player).can_continue? game.colors.red : game.colors.yellow), new_template(player.cards));
        });
        log("─────────────────────────────────────────────────────────────────────────────────────────────────────────────");
    },
    ask_to_player: async ({ match, player }) => {
        let answer;
        const response = game.sum_cards(player);
        if (response.value === 21 || match.players.filter(e=> e.id !== player.id && game.sum_cards(e).value > 21).length === (match.players.length-1)) {
            match.ended = true;
            answer = "Sim";
        } else if (response.can_continue) {
            ({ answer } = await prompt([{ 
                message: `\nDealer: ${player.name}, você está com ${response.value} pontos, mais uma carta?`, 
                name: "answer",
                type: "list", 
                default: "Não",
                choices: ["Sim", "Não"] 
            }]));
        } else {
            answer = "Não";
        };
        socket.emit("answer", { match, player, answer });
    },
    disconnect: () => {
        clear();
        log("O servidor caiu.");
        process.exit(1);
    }
};

socket.on("log", log);
socket.on("connect", tools.login);
socket.on("show_board", tools.show_board);
socket.on("ask_to_player", tools.ask_to_player);
socket.on("joined_to_game", tools.joined_to_game);
socket.on("disconnect", tools.disconnect);