export const MixCards = ( cards ) => {
    //Algoritmo para barajar
    return cards
      .map((card) => ({ ...card, random: Math.random() }))
      .sort((a, b) => a.random - b.random)
      .map(({ random, ...card }) => card);
}