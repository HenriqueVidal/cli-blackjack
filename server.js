import { createServer } from "http";
import { Server } from "socket.io";
import { game, sleep } from "./game.js";
import "dotenv/config";

const { PORT } = process.env; 
const server = createServer();
const io = new Server(server, { pingTimeout: 15000, cors: { origin: ["*"] } });
const log = (id, msg) => io.to(id).emit("log", msg);
const matches = [];

const tools = {
    new_match: async ({ socket, player, new_match }) => {
        socket.join(new_match.id);
        matches.push(new_match);
    },
    join_match: ({ socket, player, match_id }) => {
        const match = matches.find(e=> e.id === match_id);
        if (match) {
            match.players.push(player);
            log(match_id, `${player.name} entrou na partida.`);
            socket.join(match.id);
            io.to(player.id).emit("joined_to_game", { match_id, player });

            if (match.players.length === 3) {
                tools.start_match({ match });
            };
        } else {
            io.to(player.id).emit("joined_to_game", { player });
        };
    },
    start_match: ({ match }) => {
        match.deck = game.gen_deck();
        match.players.forEach(player=> {
            player.cards = game.get_cards(match.deck, 2);
            // [            
            //     {
            //         suit: game.suits.spades,
            //         number: "J"
            //     },
            //     {
            //         suit: game.suits.clubs,
            //         number: 3
            //     }
            // ];
        });

        log(match.id, "\nIniciando jogo...\n");
        io.to(match.id).emit("show_board", match);
        return tools.dealer({ match, player: match.players[0] });
    },
    dealer: async ({ match, player, answer }) => {
        let idx = match.players.findIndex(e=> e.id === player.id);
        

        if (answer && !match.ended) {

            if (answer !== "Sim" && idx === (match.players.length-1)) {
                idx = 0;
                match.ended = true;
                console.log("end")
                tools.finish_turn({ match, idx });
                return
            };

            if (answer === "Sim") {
                match.players[idx].cards.push(...game.get_cards(match.deck, 1));
                const response = game.sum_cards(player);
                io.to(match.id).emit("show_board", match);
                if (response.value === 21) {
                    log(match.id, `${match.players[idx].name} fez um BlackJack e venceu a rodada!`);
                    match.ended = true;
                    return;
                };
                if (!response.can_continue) {
                    log(match.players[idx].id, `Você perdeu, fez ${response.value} pontos!`);
                    player.lose = true;
                    console.log("!response.can_continue")
                };
                io.to(match.players[idx].id).emit("ask_to_player", { match, player: match.players[idx] });
            } else {
                idx++;
                io.to(match.id).emit("show_board", match);
                io.to(match.players[idx].id).emit("ask_to_player", { match, player: match.players[idx] });
            };
            
        } else if (!answer && !match.ended) {
            io.to(player.id).emit("ask_to_player", { match, player: match.players[idx] });
        } else if (match.ended) {
            tools.finish_turn({ match, idx });
        };
        
        // while (!match.ended || idx === (match.players.length-1)) {
            // console.log("vai perguntar")
            // io.to(player.id).emit("ask_to_player", { match, player: match.players[idx] });
            // const answer = await tools.ask_to_player({ match, player: match.players[idx] });
            // console.log("perguntou", answer)
            // if (answer) {
            //     match.players[idx].cards.push({
            //         suit: game.suits.diamonds,
            //         number: 5
            //     });
            // } else {
            //     idx++;
            // };
        // };
    },
    finish_turn: async ({ match, idx }) => {
            // const winner = match.players.sort((a,b)=> game.sum_cards(a).value-game.sum_cards(b).value).pop();
            const winner = match.players.map(e => {
                const res = game.sum_cards(e);
                e.total = res.value > 21 ? false : res.value;
                return e;
            }).filter(e=> e.total).sort((a,b)=> a.total-b.total).pop();

            // const {value} = game.sum_cards(winner);
            
            if (winner.total === 21) {
                log(match.id, `${match.players[idx].name} fez um BlackJack e venceu a rodada!`);
            } else {
                log(match.id, `${winner.name} venceu com ${winner.total} pontos.`);
            };

            await sleep(3000);
            match.ended = false;
            match.deck = game.gen_deck();
            match.players.forEach(e=> {
                if (e.id === winner.id) {
                    e.cash += 10;
                } else { 
                    e.cash -= 10; 
                };
                e.cards = game.get_cards(match.deck, 2);
                e.total = 0;
            });    
            io.to(match.id).emit("show_board", match);
            tools.dealer({ match, player: match.players[0] });
    },
    manage_game: () => {

    }
};

io.on("connection", (socket) => {
  console.dir("a user connected...");

  socket.on("new_match", ({ player, new_match }) => tools.new_match({ socket, player, new_match }));
  socket.on("join_match", ({ player, match_id }) => tools.join_match({ socket, player, match_id }));
  socket.on("start_match", ({ match }) => tools.start_match({ socket, match }));
  socket.on("answer", tools.dealer);
});

server.listen(PORT, ()=> console.dir(`Blackjack 21's server running on port: ${PORT}`));