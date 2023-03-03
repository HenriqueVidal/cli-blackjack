import inquirer from "inquirer";
export const prompt = inquirer.createPromptModule();
export const log = console.log.bind(console);
export const clear = console.clear.bind(console);
export const game = {
    colors: {
        red: '\x1b[31m%s\x1b[0m',    
        green: '\x1b[32m%s\x1b[0m',    
        yellow: '\x1b[33m%s\x1b[0m',    
        blue: '\x1b[34m%s\x1b[0m',    
        magenta: '\x1b[35m%s\x1b[0m',    
        cyan: '\x1b[36m%s\x1b[0m'
    },
    suits: {
        clubs: "♣", 
        spades: "♠", 
        hearts: "♥",
        diamonds: "♦"
    },
    cards: ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"],
    gen_deck: function () {
        const deck = [];
            for (let s = 0; s < Object.keys(this.suits).length; s++) {
                for (let v = 0; v < this.cards.length; v++) {
                    const number = this.cards[v];
                    const suit = Object.keys(this.suits)[s];
                    deck.push({ suit: this.suits[suit], number });
                };
            };
        return deck;
    },
    get_cards: function (deck, num) {
        const cards = [];
        for (let i = 0; i < num; i++) {
            const rand = Math.floor(Math.random() * (deck.length - 0 + 1) + 0);
            const card = deck.splice(rand, 1);
            cards.push(...card);
        };
        return cards;
    },
    sum_cards: (player) => {
        const { cards } = player;
        const sum = cards?.reduce((prev, curr)=> {
            let num = isNaN(Number(curr.number)) ? 10 : Number(curr.number);
            if (curr.number === "A") {
                const is_blackjack = (prev + 1) === 21 ? true : ((prev + 11) === 21 ? true : false);
                if (is_blackjack) return 21;
                num = 1;
            };
            return prev + num;
        }, 0);

        const res = { can_continue: (sum > 21 ? false : true), value: sum};
        if (!res.can_continue) {
            player.lose = true;
        };
        return res; 
    }
};
export const sleep = (ms) => {
    return new Promise(resolve=> setTimeout(()=>resolve(), ms));
};

// match.players = [
//     player,
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
//         lose: true,
//         cash: 100,
//         bet: 0,
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