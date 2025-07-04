// Dados detalhados de cada pessoa
const persons = {
  "Edmundo Schultz": {
    hometown: "Russia",
    grave: "Russia: https://maps.app.goo.gl/xiLyjfyg2EmW4i689",
    religion: "Desconhecido",
    homes: ["Russia: https://maps.app.goo.gl/xiLyjfyg2EmW4i689"],
    profession: ["Agricultor"],
    education: "Desconhecido",
    hobbies: ["Desconhecido"],
    events: ["Casamento com Vilhermina em ----"],
    documents: [],
    nicknames: ["Ed"],
    quotes: ["Tudo oque o frio tóca fica mais bonito. Informação desverdadeira criada apenas para complementar"],
    description: "Pessoa dedicada à família, gostava de música e jardinagem. Informação desverdadeira criada apenas para complementar",
    children: ["Herbert Schultz", "Daniel Schultz"]
  },
  "Vilhermina Schultz": {
    education: "Desconhecido",
    hobbies: ["Desconhecido"],
    events: [],
    documents: [],
    nicknames: [],
    quotes: [],
    description: "",
  },
  "Daniel Schultz": {
    born: "02/06/1921",
    profession: ["Agricultor"],
    documents: ["https://www.familysearch.org/ark:/61903/3:1:3QHV-L3JS-M9MV-Y?view=index&personArk=%2Fark%3A%2F61903%2F1%3A1%3AX9Y1-KX2W&action=view&cc=3741255&lang=pt&groupId="],
    children: [
      "Augusto Schultz",
      "Maria de Lurdes",
      "Veranice Schultz",
      "Loreni Schultz",
      "Ingridi Schultz",
      "Marcio Leandro Schultz",
      "Erni Herbert Schultz"
    ],
    spouse: "Lidie Reinhard??? Kock, Lilie Rossilda Schultz",
    fathers:[
      "Edmundo Schultz",
      "Vilhermina Schultz"
    ],
    education: "Desconhecido",
    hobbies: ["Desconhecido"],
    events: ["Ca com Lidie Rossilda Kock em 27/07/1942"]
  },
  "Herbert Schultz": {
    born: "13/03/1919",
    death: "18/01/1989",
    hometown: "https://maps.app.goo.gl/xiLyjfyg2EmW4i689",
    grave: "https://maps.app.goo.gl/xiLyjfyg2EmW4i689",
    children: [
      "Augusto Schultz",
      "Maria de Lurdes",
      "Veranice Schultz",
      "Loreni Schultz",
      "Ingridi Schultz",
      "Marcio Leandro Schultz",
      "Erni Herbert Schultz"
    ],
    spouse: "Josefina Lidia Schultz",
    fathers:[
      "Edmundo Schultz",
      "Vilhermina Schultz"
    ],
    education: "Desconhecido",
    hobbies: ["Desconhecido"],
    events: [],
    documents: [],
    nicknames: [],
    quotes: [],
    description: "",
  },
  "Josefina Lidia Schultz": {
    born: "01/01/1955"
  },
  "Augusto Schultz": {
    born: "01/01/1950",
    photo: "imagens/Augusto Schultz.jpg",
    spouse: "Marli Bühring",
    children: ["David Herbert Schultz"]
  },
  "Marli Bühring": {
    born: "01/01/1955",
    photo: "imagens/Marli Bühring.jpg",
    children: ["David Herbert Schultz"]
  },
  "David Herbert Schultz": {
    born: "07/03/1995",
    hometown: "Flor da Serra - Capanema - PR/BR: https://maps.app.goo.gl/YQ1k8qkpC3sipDEz5",
    profession: "Agricultor",
    religion: "Luterana - IECLB",
    email: "davidherbertschultz95@hotmail.com",
    hobbies: ["Jogos Eletronicos", "Programação"],
    education: "3º Completo",
    homes: ["Flor da Serra - Capanema - PR/BR: https://maps.app.goo.gl/TMUALutbMyujvwpu7", "Cozinhador Natingui - Ortigueira - PR/BR: https://maps.app.goo.gl/Wb9wJG9kDA6vcDLK9"],
    photo: "imagens/David Herbert Schultz.jpg",
    fathers:[
      "Marli Bühring",
      "Augusto Schultz"
    ],
  },
  "Maria de Lurdes": {
    born: "01/01/1955",
    spouse: "Ivo Correia",
    children: ["Carlos Correia"]
  },
  "Ivo Correia": {
    born: "01/01/1982"
  },
  "Carlos Correia": {
    born: "01/01/2010"
  },
  "Veranice Schultz": {
    born: "01/01/1958"
  },
  "Loreni Schultz": {
    born: "01/01/1960"
  },
  "Ingridi Schultz": {
    born: "01/01/1962"
  },
  "Marcio Leandro Schultz": {
    born: "01/01/1965"
  },
  "Erni Herbert Schultz": {
    born: "01/01/1968",
    death: "18/01/1989"
  }
};

// Estrutura da árvore genealógica (referenciando nomes)
const tree = {
  name: "Edmundo Schultz",
  spouse: "Vilhermina Schultz",
  children: [
    {
      name: "Daniel Schultz",
      spouse: "Lilie Rossilda Schultz",
      children: [],
    },
    {
      name: "Herbert Schultz",
      spouse: "Josefina Lidia Schultz",
      children: [
        {
          name: "Augusto Schultz",
          spouse: "Marli Bühring",
          children: [
            { name: "David Herbert Schultz" }
          ]
        },
        {
          name: "Maria de Lurdes",
          spouse: "Ivo Correia",
          children: [
            { name: "Carlos Correia" }
          ]
        },
        { name: "Veranice Schultz" },
        { name: "Loreni Schultz" },
        { name: "Ingridi Schultz" },
        { name: "Marcio Leandro Schultz" },
        { name: "Erni Herbert Schultz" }
      ]
    }
  ]
};