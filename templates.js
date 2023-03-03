const new_template = (player_cards) => {
    const num = player_cards.length;
    let cards;
    if (num === 2) {
        cards = (
`┌───────┐  ┌───────┐
| ${player_cards[0].suit}     |  | ${player_cards[1].suit}     |
|       |  |       |
|  ${player_cards[0].number!=="10"?(" "+player_cards[0].number):player_cards[0].number}   |  |  ${player_cards[1].number!=="10"?(" "+player_cards[1].number):player_cards[1].number}   |
|       |  |       |
|     ${player_cards[0].suit} |  |     ${player_cards[1].suit} |
└───────┘  └───────┘`
        );
    } else if (num === 3) {
        cards = (
`┌───────┐  ┌───────┐  ┌───────┐
| ${player_cards[0].suit}     |  | ${player_cards[1].suit}     |  | ${player_cards[2].suit}     |
|       |  |       |  |       |
|  ${player_cards[0].number!=="10"?(" "+player_cards[0].number):player_cards[0].number}   |  |  ${player_cards[1].number!=="10"?(" "+player_cards[1].number):player_cards[1].number}   |  |  ${player_cards[2].number!=="10"?(" "+player_cards[2].number):player_cards[2].number}   |
|       |  |       |  |       |
|     ${player_cards[0].suit} |  |     ${player_cards[1].suit} |  |     ${player_cards[2].suit} |
└───────┘  └───────┘  └───────┘`
        );
    } else if (num === 4) {
        cards = (
`┌───────┐  ┌───────┐  ┌───────┐  ┌───────┐
| ${player_cards[0].suit}     |  | ${player_cards[1].suit}     |  | ${player_cards[2].suit}     |  | ${player_cards[3].suit}     |
|       |  |       |  |       |  |       |
|  ${player_cards[0].number!=="10"?(" "+player_cards[0].number):player_cards[0].number}   |  |  ${player_cards[1].number!=="10"?(" "+player_cards[1].number):player_cards[1].number}   |  |  ${player_cards[2].number!=="10"?(" "+player_cards[2].number):player_cards[2].number}   |  |  ${player_cards[3].number!=="10"?(" "+player_cards[3].number):player_cards[3].number}   |
|       |  |       |  |       |  |       |
|     ${player_cards[0].suit} |  |     ${player_cards[1].suit} |  |     ${player_cards[2].suit} |  |     ${player_cards[3].suit} |
└───────┘  └───────┘  └───────┘  └───────┘`
        );
    } else if (num === 5) {
      cards = (
`┌───────┐  ┌───────┐  ┌───────┐  ┌───────┐  ┌───────┐
| ${player_cards[0].suit}     |  | ${player_cards[1].suit}     |  | ${player_cards[2].suit}     |  | ${player_cards[3].suit}     |  | ${player_cards[4].suit}     |
|       |  |       |  |       |  |       |  |       |
|  ${player_cards[0].number!=="10"?(" "+player_cards[0].number):player_cards[0].number}   |  |  ${player_cards[1].number!=="10"?(" "+player_cards[1].number):player_cards[1].number}   |  |  ${player_cards[2].number!=="10"?(" "+player_cards[2].number):player_cards[2].number}   |  |  ${player_cards[3].number!=="10"?(" "+player_cards[3].number):player_cards[3].number}   |  |  ${player_cards[4].number!=="10"?(" "+player_cards[4].number):player_cards[4].number}   |
|       |  |       |  |       |  |       |  |       |
|     ${player_cards[0].suit} |  |     ${player_cards[1].suit} |  |     ${player_cards[2].suit} |  |     ${player_cards[3].suit} |  |     ${player_cards[4].suit} |
└───────┘  └───────┘  └───────┘  └───────┘  └───────┘`
                );
    } else if (num === 6) {
        `
        ┌───────┐  ┌───────┐  ┌───────┐  ┌───────┐  ┌───────┐  ┌───────┐  ┌───────┐  ┌───────┐  ┌───────┐  ┌───────┐  ┌───────┐  ┌───────┐
        | ♣     |  | ♦     |  | ♣     |  | ♦     |  | ♣     |  | ♦     |  | ♣     |  | ♦     |  | ♣     |  | ♦     |  | ♣     |  | ♦     |
        |       |  |       |  |       |  |       |  |       |  |       |  |       |  |       |  |       |  |       |  |       |  |       |
        |   3   |  |   7   |  |   3   |  |   7   |  |   3   |  |   7   |  |   3   |  |   7   |  |   3   |  |   7   |  |   3   |  |   7   |
        |       |  |       |  |       |  |       |  |       |  |       |  |       |  |       |  |       |  |       |  |       |  |       |
        |     ♣ |  |     ♦ |  |     ♣ |  |     ♦ |  |     ♣ |  |     ♦ |  |     ♣ |  |     ♦ |  |     ♣ |  |     ♦ |  |     ♣ |  |     ♦ |
        └───────┘  └───────┘  └───────┘  └───────┘  └───────┘  └───────┘  └───────┘  └───────┘  └───────┘  └───────┘  └───────┘  └───────┘
      `
    } else if (num === 7) {
        `
        ┌───────┐  ┌───────┐  ┌───────┐  ┌───────┐  ┌───────┐  ┌───────┐  ┌───────┐  ┌───────┐  ┌───────┐  ┌───────┐  ┌───────┐  ┌───────┐
        | ♣     |  | ♦     |  | ♣     |  | ♦     |  | ♣     |  | ♦     |  | ♣     |  | ♦     |  | ♣     |  | ♦     |  | ♣     |  | ♦     |
        |       |  |       |  |       |  |       |  |       |  |       |  |       |  |       |  |       |  |       |  |       |  |       |
        |   3   |  |   7   |  |   3   |  |   7   |  |   3   |  |   7   |  |   3   |  |   7   |  |   3   |  |   7   |  |   3   |  |   7   |
        |       |  |       |  |       |  |       |  |       |  |       |  |       |  |       |  |       |  |       |  |       |  |       |
        |     ♣ |  |     ♦ |  |     ♣ |  |     ♦ |  |     ♣ |  |     ♦ |  |     ♣ |  |     ♦ |  |     ♣ |  |     ♦ |  |     ♣ |  |     ♦ |
        └───────┘  └───────┘  └───────┘  └───────┘  └───────┘  └───────┘  └───────┘  └───────┘  └───────┘  └───────┘  └───────┘  └───────┘
      `
    };
    return cards;
};
export default new_template;

const cards = (
  `
    ┌───────┐  ┌───────┐  ┌───────┐  ┌───────┐  ┌───────┐  ┌───────┐  ┌───────┐  ┌───────┐  ┌───────┐  ┌───────┐  ┌───────┐  ┌───────┐
    | ♣     |  | ♦     |  | ♣     |  | ♦     |  | ♣     |  | ♦     |  | ♣     |  | ♦     |  | ♣     |  | ♦     |  | ♣     |  | ♦     |
    |       |  |       |  |       |  |       |  |       |  |       |  |       |  |       |  |       |  |       |  |       |  |       |
    |   3   |  |   7   |  |   3   |  |   7   |  |   3   |  |   7   |  |   3   |  |   7   |  |   3   |  |   7   |  |   3   |  |   7   |
    |       |  |       |  |       |  |       |  |       |  |       |  |       |  |       |  |       |  |       |  |       |  |       |
    |     ♣ |  |     ♦ |  |     ♣ |  |     ♦ |  |     ♣ |  |     ♦ |  |     ♣ |  |     ♦ |  |     ♣ |  |     ♦ |  |     ♣ |  |     ♦ |
    └───────┘  └───────┘  └───────┘  └───────┘  └───────┘  └───────┘  └───────┘  └───────┘  └───────┘  └───────┘  └───────┘  └───────┘
  `
  );

  // const board = (
  // `
  // ${player1.name}     ${player2.name}     ${player3.name}    
  // ${player1.cards[0]}  ${player2.cards[0]}  ${player3.cards[0]} 
  // ${player1.cards[1]}  ${player2.cards[1]}  ${player3.cards[1]} 
  // `
  // ); 
  // const board = game.players.map((player, i)=> {
  //     console.log(
  //         i%2? game.colors.green : game.colors.yellow, 
  //         `${player.name} - $${player.bet}\n${new_template(player.cards)}`
  //     );
  // });