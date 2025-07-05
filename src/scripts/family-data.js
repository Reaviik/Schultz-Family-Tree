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
    events: ["Casamento com Guilhelmina Schultz em 27/03/1948"],
    documents: [],
    nicknames: ["Ed"],
    quotes: ["Tudo oque o frio tóca fica mais bonito. Informação desverdadeira criada apenas para complementar"],
    description: "Pessoa dedicada à família, gostava de música e jardinagem. Informação desverdadeira criada apenas para complementar",
    children: ["Herbert Schultz", "Eduardo Schultz", "Daniel Schultz"]
  },
  "Guilhelmina Schultz": {
    education: "Desconhecido",
    hobbies: ["Desconhecido"],
    events: [],
    documents: [],
    nicknames: [],
    quotes: [],
    description: "",
  },
  "Wilhelmina Schultz":{
    hometown: "Russia",
    born: "04/01/1925",
    spouse: "Eduardo Schultz",
    profession:"Domestica",
    fathers:[
      "Guilherme Reicheste",
      "Maria Reicheste"
    ],
    documents:["https://www.familysearch.org/ark:/61903/3:1:3QHV-P3JS-M9SD-S?view=index&personArk=%2Fark%3A%2F61903%2F1%3A1%3AX9YB-1718&action=view&cc=3741255&lang=pt&groupId="],
    events: ["Casamento com Eduardo Schultz em 31/06/1948"],
    homes: ["Irai - Santa Catarina"],
    singleName: "Wilhelmina Reicheste"
  },
  "Eduardo Schultz":{
    hometown: "Russia",
    born: "02/01/1916",
    profession:"Agricultor",
    spouse: "Wilhelmina Reicheste",
    fathers:[
      "Edmundo Schultz",
      "Guilhermina Schultz"
    ],
    documents:["https://www.familysearch.org/ark:/61903/3:1:3QHV-P3JS-M9SD-S?view=index&personArk=%2Fark%3A%2F61903%2F1%3A1%3AX9YB-1718&action=view&cc=3741255&lang=pt&groupId="],
    events: ["Casamento com Wilhelmina Reicheste em 31/06/1948"],
    homes: ["Irai - Santa Catarina"],
  },
  "Daniel Schultz": {
    hometown: "Russia",
    born: "02/06/1921",
    profession: ["Agricultor"],
    documents: ["https://www.familysearch.org/ark:/61903/3:1:3QHV-L3JS-M9MV-Y?view=index&personArk=%2Fark%3A%2F61903%2F1%3A1%3AX9Y1-KX2W&action=view&cc=3741255&lang=pt&groupId="],
    children: [
    ],
    homes: ["Irai - Santa Catarina"],
    spouse: "Lilie Reinhard Schultz",
    fathers:[
      "Edmundo Schultz",
      "Guilhermina Schultz"
    ],
    events: ["Casou-se com Lidie Reinhard Köck em 27/07/1942"]
  },
  "Lilie Reinhard Schultz": {
    hometown: "Irai - Santa Catarina",
    born: "24/04/1931",
    spouse: "Daniel Schultz",
    homes: ["Irai - Santa Catarina"],
    documents: ["https://www.familysearch.org/ark:/61903/3:1:3QHV-L3JS-M9MV-Y?view=index&personArk=%2Fark%3A%2F61903%2F1%3A1%3AX9Y1-KX2W&action=view&cc=3741255&lang=pt&groupId="],
    singleName: "Lidie Reinhard Kock",
    events: ["Casou-se com Daniel Schultz em 27/07/1942"],
    fathers:[
      "Francisco Köck",
      "Lucinda Köck"
    ],
  },
  "Herbert Schultz": {
    born: "16/03/1919",
    death: "18/01/1989",
    hometown: "Santa Catarina: https://maps.app.goo.gl/xiLyjfyg2EmW4i689",
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
    events: ["Casou-se com Josefina Lidia köch em 27/03/1948"],
    documents: ["https://www.familysearch.org/ark:/61903/3:1:3QHV-P3JS-M9SC-6?view=index&personArk=%2Fark%3A%2F61903%2F1%3A1%3AX9Y1-KL34&action=view&cc=3741255&lang=pt&groupId="],
    fathers:[
      "Augusto Köch",
      "Terreza Köck"
    ],
  },
  "Augusto Köch":{
    children: [
      "Josefina Lidia Schultz",
    ],
  },
  "Terreza Köck":{
    children: [
      "Josefina Lidia Schultz",
    ],
  },
  "Josefina Lidia Schultz": {
    born: "01/01/1955",
    hometown: "Santa Catarina",
    profession: ["Agricultora"],
    events: ["Casou-se com Herbert Schultz em 27/03/1948"],
    documents: ["https://www.familysearch.org/ark:/61903/3:1:3QHV-P3JS-M9SC-6?view=index&personArk=%2Fark%3A%2F61903%2F1%3A1%3AX9Y1-KL34&action=view&cc=3741255&lang=pt&groupId="],
    spouse: "Herbert Schultz",
    singleName: "Josefina Lidia köch",
    children: [
      "Augusto Schultz",
      "Maria de Lurdes",
      "Veranice Schultz",
      "Loreni Schultz",
      "Ingridi Schultz",
      "Marcio Leandro Schultz",
      "Erni Herbert Schultz"
    ],
    fathers: [
      "Augusto Köch",
      "Terreza Köck"
    ]
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
    children: ["David Herbert Schultz"],
    hometown: "Capanema - Paraná",
    profession: ["Agricultora"],
    spouse: "Augusto Schultz",
    fathers: [
      "Plinio Bühring"
    ]
  },
  "Plinio Bühring": {
    profession: ["Agricultor"],
    children: [
      "Marli Bühring",
    ],
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
    fathers:[
      "Josefina Lidia Schultz",
      "Herbert Schultz"
    ],
    spouse: "Ivo Correia",
    children: ["Carlos Correia", "Joarez", "Paulo Eder Correia", "Cezar", ]
  },
  "Ivo Correia": {
    born: "01/01/1982"
  },
  "Carlos Correia": {
    fathers:[
      "Maria de Lurdes",
      "Ivo Correia"
    ],
  },
  "Veranice Schultz": {
    born: "01/01/1958",
    fathers:[
      "Josefina Lidia Schultz",
      "Herbert Schultz"
    ],
  },
  "Loreni Schultz": {
    fathers:[
      "Josefina Lidia Schultz",
      "Herbert Schultz"
    ],
  },
  "Ingridi Schultz": {
    fathers:[
      "Josefina Lidia Schultz",
      "Herbert Schultz"
    ],
  },
  "Marcio Leandro Schultz": {
    fathers:[
      "Josefina Lidia Schultz",
      "Herbert Schultz"
    ],
  },
  "Erni Herbert Schultz": {
    born: "01/01/1968",
    death: "18/01/1989",
    fathers:[
      "Josefina Lidia Schultz",
      "Herbert Schultz"
    ],
  }
};

// Estrutura da árvore genealógica (referenciando nomes)
const tree = {
  name: "Edmundo Schultz",
  spouse: "Vilhermina Schultz",
  children: [
    {
      name: "Daniel Schultz",
      spouse: "Lilie Reinhard Schultz",
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

// Estrutura da árvore Schultz (mesma que a original)
const treeSchultz = {
  name: "Edmundo Schultz",
  spouse: "Vilhermina Schultz",
  children: [
    {
      name: "Daniel Schultz",
      spouse: "Lilie Reinhard Schultz",
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
            { name: "Carlos Correia" },
            { name: "Cezar Correia" },
            { name: "Joarez Correia" }
          ]
        },
        { 
          name: "Veranice Schultz",
          spouse: "Jé Fagundes",
          children: [
            { name: "Eliziane" },
            { name: "Sarasandra Fagundes" },
            { name: "Elizandra Fagundes" },
            { name: "Jonas Fagundes" },
          ]
        },
        { name: "Loreni Schultz",
          spouse: "Oscar",
          children: [
            { name: "Fábia" },
            { name: "Marcia" }
          ]
        },
        { name: "Ingridi Schultz" },
        { name: "Marcio Leandro Schultz" },
        { name: "Erni Herbert Schultz" }
      ]
    }
  ]
};

// Estrutura alternativa mostrando os pais de Josefina como ramificação principal
const treeKoch = {
  name: "Augusto Köch",
  spouse: "Terreza Köck",
  children: [
    {
      name: "Josefina Lidia Schultz",
      spouse: "Herbert Schultz",
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
            { name: "Carlos Correia" },
            { name: "Cezar Correia" },
            { name: "Joarez Correia" }
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

// Estrutura alternativa mostrando os pais de Marli como ramificação principal
const treeBuhring = {
  name: "Plinio Bühring",
  spouse: "Maria Bühring",
  children: [
    {
      name: "Marli Bühring",
      spouse: "Augusto Schultz",
      children: [
        { name: "David Herbert Schultz" }
      ]
    },
    {
      name: "Marlene Bühring",
      spouse: "",
      children: [
        { name: "Mariele Bühring Chagas" },
        { name: "Marcos Adriano Bühring Chagas" }
      ]
    },
    {
      name: "Altair Bühring",
      spouse: "",
      children: [
      ]
    },
    {
      name: "Adelir Bühring",
      spouse: "",
      children: [
      ]
    },
    {
      name: "Arno Bühring",
      spouse: "",
      children: [
      ]
    },
    {
      name: "Noeli Bühring",
      spouse: "",
      children: [
        { name: "Daniele" },
        { name: "Keniel" }
      ]
    },
    {
      name: "Noemi Bühring",
      spouse: "",
      children: [
        { name: "Ruth Tonieli" },
        { name: "Julia de Paula" },
        { name: "Eloa" }
      ]
    }
  ]
};