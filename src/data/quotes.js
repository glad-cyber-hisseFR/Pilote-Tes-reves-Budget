// Citations inspirantes pour motiver les utilisateurs
export const inspirationalQuotes = [
  "Chaque petite économie vous rapproche de vos rêves",
  "La discipline d'aujourd'hui est la liberté de demain",
  "Vos rêves méritent votre engagement",
  "Un budget maîtrisé est un pas vers la liberté financière",
  "L'épargne n'est pas une privation, c'est un investissement en vous-même",
  "Chaque euro économisé est un euro vers votre avenir",
  "Vos objectifs financiers reflètent vos priorités de vie",
  "La patience et la persévérance transforment les rêves en réalité",
  "Un petit pas chaque jour mène à de grandes réalisations",
  "Votre futur vous remerciera pour les efforts d'aujourd'hui",
  "Les grandes choses commencent par de petites décisions",
  "Investir en soi-même, c'est le meilleur investissement",
  "La richesse, c'est d'abord une discipline, pas une chance",
  "Chaque sacrifice d'aujourd'hui construit le confort de demain",
  "Vos rêves sont à portée de main, un budget à la fois",
  "La maîtrise de soi mène à la maîtrise de sa vie",
  "Construisez votre avenir pierre par pierre",
  "Le succès financier est une habitude, pas un accident",
  "Votre détermination est votre plus grande richesse",
  "Chaque jour est une opportunité d'avancer vers vos objectifs"
];

// Obtenir une citation aléatoire
export const getRandomQuote = () => {
  const index = Math.floor(Math.random() * inspirationalQuotes.length);
  return inspirationalQuotes[index];
};

// Obtenir une citation basée sur l'index (pour rotation)
export const getQuoteByIndex = (index) => {
  return inspirationalQuotes[index % inspirationalQuotes.length];
};
