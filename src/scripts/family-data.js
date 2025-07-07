// Dados detalhados de cada pessoa
const persons = {
  // Dead
  "Edmundo Schultz": {
    hometown: "Russia",
    grave: "Irai - SC/BR: 27°11'22.0\"S 53°15'47.0\"W",
    religion: "Ex: Luterana - IECLB",
    homes: ["Russia: https://maps.app.goo.gl/xiLyjfyg2EmW4i689"],
    profession: ["Agricultor"],
    education: "Ex: 3° Completo",
    hobbies: ["Ex: Caçar e Pescar"],
    events: ["Casamento com Guilhelmina Schultz em 27/03/1948"],
    documents: [],
    spouse: "Guilhermina Schultz",
    nicknames: ["Ex: Ed"],
    quotes: ["Frase de efeito que só voce diria ex: Penso, logo existo"],
    description: "Um breve resumo sobre você por exemplo",
    children: ["Herbert Schultz", "Eduardo Schultz", "Daniel Schultz"]
  },
  // Dead
  "Guilhermina Schultz": {
    spouse: "Edmundo Schultz",
  },
  // Dead
  "Wilhelmina Schultz":{
    hometown: "Russia",
    born: "04/01/1925",
    spouse: "Eduardo Schultz",
    profession:["Domestica"],
    fathers:[
      "Guilherme Reicheste",
      "Maria Reicheste"
    ],
    documents:["https://www.familysearch.org/ark:/61903/3:1:3QHV-P3JS-M9SD-S?view=index&personArk=%2Fark%3A%2F61903%2F1%3A1%3AX9YB-1718&action=view&cc=3741255&lang=pt&groupId="],
    events: ["Casamento com Eduardo Schultz em 31/06/1948"],
    homes: ["Irai - Santa Catarina"],
    singleName: "Wilhelmina Reicheste"
  },
  // ?
  "Eduardo Schultz":{
    hometown: "Russia",
    born: "02/01/1916",
    profession:["Agricultor"],
    spouse: "Wilhelmina Reicheste",
    fathers:[
      "Edmundo Schultz",
      "Wilhelmina Schultz"
    ],
    documents:["https://www.familysearch.org/ark:/61903/3:1:3QHV-P3JS-M9SD-S?view=index&personArk=%2Fark%3A%2F61903%2F1%3A1%3AX9YB-1718&action=view&cc=3741255&lang=pt&groupId="],
    events: ["Casamento com Wilhelmina Reicheste em 31/06/1948"],
    homes: ["Irai - Santa Catarina"],
  },
  // ?
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
  // ?
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
  // Dead
  "Herbert Schultz": {
    born: "16/03/1919",
    death: "18/01/1989",
    photo: "1HgpAAS46JV9ngHOWF6ziBBEdCG-fCSMP",
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
  // Dead
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
  // Aproved
  "Augusto Schultz": {
    born: "25/03/1965",
    hometown: "Capanema - Paraná",
    religion: "Evangelico",
    education: "4° Série",
    photo: "18AoJArWSuqs2NT2ZpXLL8bg9PDDXD8AO",
    profession: ["Agricultor"],
    height: "1,80",
    weight: "76",
    spouse: "Marli Bühring",
    children: ["David Herbert Schultz"]
  },
  // Aproved
  "Marli Bühring": {
    born: "30/06/1974",
    hometown: "Capanema - Paraná",
    religion: "Luterana - IECLB",
    nicknames: ["Polaca"],
    education: "4° Série",
    phone: "46 9 9978-4542",
    photo: "1gZIAdsPPPXf4lPshhy1kIjxG4XSRsg5z",
    homes: ["Flor da Serra - Capanema - PR/BR: 25°36'39.8\"S 53°49'09.3\"W","Flor da Serra - Capanema - PR/BR: 25°36'22.7\"S 53°48'52.2\"W", "Cozinhador Natingui - Ortigueira - PR/BR: 23°56'07.7\"S 50°57'42.5\"W", "Flor da Serra - Capanema - PR/BR: 25°36'44.0\"S 53°49'14.9\"W"],
    children: ["David Herbert Schultz"],
    hometown: "Capanema - PR/BR: 25°40'18.8\"S 53°48'28.4\"W",
    profession: ["Agricultora"],
    spouse: "Augusto Schultz",
    fathers: [
      "Leonilda Bühring",
      "Plinio Brixner Bühring"
    ]
  },
  // Dead
  "Marlene Bühring": {
    profession: ["Agricultora"],
    children: [
      "Marli Bühring Chagas",
      "Marcos Adriano Bühring Chagas",
    ],
  },
  // Alive
  "Noeli Bühring": {
    profession: ["Agricultora"],
    children: [
      "Vanir",
      "Daniele",
      "Keniel",
    ],
  },
  // Alive
  "Noemi Bühring de Paula": {
    born: "29/05/1988",
    photo: "1JL9CxtrJwknhTJ3KpKgBar2PVeJo0BXg",
    spouse: "Boaventura de Paula Neto",
    hometown: "São Leopoldo - RS/BR",
    profession: ["Motorista", "Auxiliar de Serviços Gerais"],
    nicknames: ["Fofa"],
    education: "Ensino Medio Completo",
    weight: "68kg",
    height: "1,63",
    phone: "46 9 9976-0986",
    hobbies: ["Croche"],
    homes: ["Capanema - PR/BR: 25°39'18.2\"S 53°48'38.5\"W"],
    religion: "Luterana - IECLB",
    children: [
      "Ruthy Tonielli",
      "Julia Maykelli",
      "Helloá Antônia",
    ],
  },
  // Alive
  "Boaventura de Paula Neto": {
    spouse: "Noemi Bühring de Paula",
    profession: ["Motorista", "Caminhoneiro"],
    nicknames: ["Tula"],
    children: [
      "Ruthy Tonielli",
      "Julia Maykelli",
      "Helloá Antônia",
    ],
  },
  // Alive
  "Altair Bühring": {
    children: [
      "Wilian",
      "Wilton",
      "Lilian",
    ],
  },
  // Alive
  "Adelir Bühring": {
  },
  // Alive
  "Arno Bühring": {
  },
  // Alive
  "Noemia Bühring": {
    photo: "1GEIQOLz29ESrQNwKN9UfzMGPM0rON9z2",
  },
  // Dead
  "Leonilda Bühring": {
    profession: ["Agricultora"],
    singleName: "Leonilda Müller",
    spouse: "Plinio Brixner Bühring",
    children: [
      "Marli Bühring",
      "Marlene Bühring",
      "Noeli Bühring",
      "Noemia Bühring",
      "Noemi Bühring de Paula",
      "Altair Bühring",
      "Adelir Bühring",
      "Arno Bühring",
    
    ],
  },
  // Dead
  "Plinio Brixner Bühring": {
    profession: ["Agricultor"],
    spouse: "Leonilda Bühring",
    children: [
      "Marli Bühring",
      "Marlene Bühring",
      "Noeli Bühring",
      "Noemia Bühring",
      "Noemi Bühring de Paula",
      "Altair Bühring",
      "Adelir Bühring",
      "Arno Bühring",
    ],
  },

  // Aproved
  "David Herbert Schultz": {
    born: "07/03/1995",
    hometown: "Flor da Serra - Capanema - PR/BR: https://maps.app.goo.gl/YQ1k8qkpC3sipDEz5",
    profession: ["Agricultor"],
    religion: "Luterana - IECLB",
    email: "davidherbertschultz95@hotmail.com",
    hobbies: ["Jogos Eletronicos", "Programação"],
    education: "3º Completo",
    homes: ["Flor da Serra - Capanema - PR/BR: 25°36'22.7\"S 53°48'52.2\"W", "Cozinhador Natingui - Ortigueira - PR/BR: 23°56'07.7\"S 50°57'42.5\"W", "Flor da Serra - Capanema - PR/BR: 25°36'44.0\"S 53°49'14.9\"W"],
    photo: "1Xh6Z3n8uHLjFe2oWuokTs5xYhfYOTi_f",
    fathers:[
      "Marli Bühring",
      "Augusto Schultz"
    ],
  },
  // Alive
  "Maria de Lurdes Correia": {
    singleName: "Maria de Lurdes",
    homes: ["São Cristovão - Capanema PR/BR: 25°39'20.4\"S 53°48'38.4\"W"],
    fathers:[
      "Josefina Lidia Schultz",
      "Herbert Schultz"
    ],
    spouse: "Ivo Correia",
    children: ["Carlos Correia", "Joarez", "Paulo Eder Correia", "Cezar", ]
  },
  // Dead
  "Ivo Correia": {
  },
  // Alive
  "Paulo Eder Correia":{
    born: "10/10/1983",
    conjuge: "Suzana Terezinha Brito",
    hometown: "Foz do Iguaçu: 25°30'59.6\"S 54°35'07.0\"W",
    profession: ["Auxiliar de Produção"],
    religion: "Catóico",
    education: "Ensino Medio Incompleto",
    weight: "95kg",
    height: "1.80",
    phone: "43 991506301",
    email: "pauloederc@gmail.com",
    homes: ["Três Angicos - Capanema PR/BR: 25°39'52.7\"S 53°47'02.9\"W"],
    children: [
      "Weslei Gabriel Correia",
      "Ravi Correia"
    ],
    fathers:[
      "Maria de Lurdes Correia",
      "Ivo Correia"
    ],
  },
  "Suzana Terezinha Brito":{
    born: "14/08/1984",
    conjuge: "Paulo Eder Correia",
    hometown: "Capanema - PR/BR: 25°40'18.8\"S 53°48'28.4\"W",
    homes: ["Três Angicos - Capanema PR/BR: 25°39'52.7\"S 53°47'02.9\"W"],
    profession: ["Auxiliar de Produção"],
    religion: "Católica",
    nicknames: ["Suzi"],
    education: "Ensino Superior Completo",
    weight: "69kg",
    height: "1.56",
    phone: "46 999870997",
    email: "suzanat.brito3@gmail.com",
    homes: ["Três Angicos - Capanema PR/BR: 25°39'52.7\"S 53°47'02.9\"W"],
    children: [
      "Weslei Gabriel Correia",
      "Ravi Correia"
    ],
    fathers:[
      "Clarita B.G. Brito",
      "Adão Ataeibio Correia"
    ],
  },
  "Weslei Gabriel Correia":{
    fathers:[
      "Paulo Eder Correia",
      "Suzana Terezinha Brito"
    ],
  },
  "Ravi Correia":{
    fathers:[
      "Paulo Eder Correia",
      "Suzana Terezinha Brito"
    ],
  },
  // Alive
  "Carlos Correia": {
    born: "12/09/19988",
    hometown: "Capanema PR/BR: 25°40'18.8\"S 53°48'28.4\"W",
    conjuge: "Juliane Camargo",
    profession: ["Auxiliar"],
    religion: "Evangelico",
    nicknames: ["Kau"],
    education: "Ensino Medio",
    weight: "119lkg",
    height: "1.80",
    phone: "46 999744959",
    homes: ["São Cristovão - Capanema PR/BR: 25°39'20.3\"S 53°48'38.8\"W"],
    fathers:[
      "Maria de Lurdes Correia",
      "Ivo Correia"
    ],
  },
  "Juliane Camargo":{
    conjuge: "Carlos Correia",
  },
  // Alive
  "Maria Daloé Correia": {
    born: "09/01/1981",
    hometown: "Foz do Iguaçu: 25°30'59.6\"S 54°35'07.0\"W",
    profession: ["Auxiliar de Produção"],
    nicknames: ["Nega"],
    education: "Ensino Medio",
    weight: "93kg",
    height: "1.60",
    phone: "46 999222199",
    email: "correiamaria499@gmail.com",
    homes: ["São Cristovão Capanema: 25°39'20.2\"S 53°48'39.3\"W"],
    fathers:[
      "Maria de Lurdes Correia",
      "Ivo Correia"
    ],
    children:[
      "Vitória Arieli Correia Lemos",
      "Deivid Riquelme Correia Lemos"
    ]
  },
  // Alive
  "Loreni Schultz": {
    fathers:[
      "Josefina Lidia Schultz",
      "Herbert Schultz"
    ],
  },
  // Alive
  "Ingridi Schultz": {
    photo: "1vC5mZAiyBSlgsPL6MDRy7UqLC6NSdkYL",
    fathers:[
      "Josefina Lidia Schultz",
      "Herbert Schultz"
    ],
  },
  // Alive
  "Marcio Leandro Schultz": {
    fathers:[
      "Josefina Lidia Schultz",
      "Herbert Schultz"
    ],
  },
  // Dead
  "Erni Herbert Schultz": {
    born: "01/01/1968",
    death: "18/01/1989",
    fathers:[
      "Josefina Lidia Schultz",
      "Herbert Schultz"
    ],
  },
  // Alive
  "Marieli Adrinani Bühring Chagas": {
    born: "02/02/2000",
    hometown: "Panambi - RS/BR",
    profession: ["Mecanica", "Eletricista", "(Dona de Casa)"],
    religion: "Luterana - IECLB",
    nicknames: ["Mari"],
    education: "Ensino Fundamental Completo",
    weight: "85kg",
    homes: ["Capanema - PR/BR: 25°39'16.2\"S 53°48'50.7\"W"],
    phone: "46 9 9987-2143",
    email: "buhringmarieli@gmail.com",
    conjuge: "Anderson Junior Guaresma",
    children: [
      "Isabela Victoria Bühring Guaresma",
    ],
    fathers: [
      "Marlene Bühring",
      "Antinio Jairo de borba Chagas"
    ]
  },
  // Alive
  "Anderson Junior Guaresma": {
    conjuge: "Marieli Adrinani Bühring Chagas",
    children: [
      "Isabela Victoria Bühring Guaresma",
    ],
  },
  "Isabela Victoria Bühring Guaresma": {
    born: "04/05/2018",
    fathers: [
      "Anderson Junior Guaresma",
      "Marieli Adrinani Bühring Chagas"
    ]
  },
  "José Pedro Fagundes": {
    children: [
      "Sarassandra Fagundes",
      "Eliziane Fagundes",
      "Elizandra Fagundes",
      "Jonas Dassant Fagundes",
    ],
  },
  // Alive
  "Veranice Fagundes": {
    born: "01/01/1958",
    singleName: "Veranice Schultz",
    homes: ["Canela: 29°21'49.6\"S 50°48'40.4\"W","Capanema: 25°40'18.9\"S 53°48'28.1\"W"],
    fathers:[
      "Josefina Lidia Schultz",
      "Herbert Schultz"
    ],
    children: [
      "Sarassandra Fagundes",
      "Eliziane Fagundes",
      "Elizandra Fagundes",
      "Jonas Dassant Fagundes",
    ],
  },
  "Sarassandra Fagundes": {
    singleName: "Sarassandra Fagundes",
    born: "27/11/1989",
    hometown: "Capanema - PR/BR: 25°40'18.8\"S 53°48'28.4\"W",
    fathers: [
      "Veranice Fagundes",
      "José Pedro Fagundes"
    ],
    children: [
      "Lidia Lorena Rauro"
    ],
    profession: ["Farmacêutica"],
    nicknames: ["Sara"],
    education: "Ensino Superior Completo",
    religion: "Católica",
    height: "1,65",
    weight: "77"
  },
  "Eliziane Fagundes": {
    born: "10/06/1992",
    fathers: [
      "Veranice Fagundes",
      "José Pedro Fagundes"
    ],
  },
  "Elizandra Fagundes": {
    born: "27/11/1989",
    hometown: "Capanema: 25°40'18.9\"S 53°48'28.1\"W",
    conjuge: "Argu Rodrigo de Freitas",
    profession: ["Autonoma"],
    religion: "Católica",
    nicknames: ["Liza"],
    education: "Ensino Medio Completo",
    weight: "64kg",
    height: "1.65",
    phone: "46 999187059",
    homes: ["São Cristovão Capanema PR/BR: 25°40'18.9\"S 53°48'28.1\"W"],
    children:[
      "Livia Lais de Freitas",
      "Melissa Rafaela de Freitas"
    ],
    fathers: [
      "Veranice Fagundes",
      "José Pedro Fagundes"
    ],
  },
  "Argu Rodrigo de Freitas":{
    children:[
      "Livia Lais de Freitas",
      "Melissa Rafaela de Freitas"
    ],
  },
  "Livia Lais de Freitas":{
    fathers:[
      "Elizandra Fagundes",
      "Argu Rodrigo de Freitas"
    ]
  },
  "Melissa Rafaela de Freitas":{
    fathers:[
      "Elizandra Fagundes",
      "Argu Rodrigo de Freitas"
    ]
  },
  "Jonas Dassant Fagundes": {
    born: "06/04/2001",
    hometown: "Capanema: 25°40'18.9\"S 53°48'28.1\"W",
    profession: ["Exercito", "Montador de Móveis", "Eletricista"],
    religion: "Cristão",
    nicknames: ["Nene"],
    weight: "80",
    height: "1.73",
    phone: "45 999849767",
    email: "sddassant859@gmail.com",
    hobbies: ["Futebol", "Vôlei", "Jogos", "Sinuca"],
    homes: ["São Cristovão Capanema: 25°39'19.8\"S 53°48'42.4\"W", "Cascavel: 24°57'15.2\"S 53°28'48.8\"W"],
    fathers: [
      "Veranice Fagundes",
      "José Pedro Fagundes"
    ],
  }
};

// Estrutura da árvore genealógica (referenciando nomes)
const tree = {
  name: "Edmundo Schultz",
  spouse: "Guilhermina Schultz",
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
          name: "Maria de Lurdes Correia",
          spouse: "Ivo Correia",
          children: [
            { name: "Maria Daloé Correia",
              children: [
                { name: "Vitória Arieli Correia Lemos" },
                { name: "Deivid Riquelme Correia Lemos" }
              ]
             },
            { name: "Paulo Eder Correia",
              spouse: "Suzana Terezinha Brito",
              children: [
                { name: "Weslei Gabriel Correia" },
                { name: "Ravi Correia" }
              ]
            },
            { name: "Carlos Correia",
              conjuge: "Juliane Camargo",
             },
            { name: "Cezar Correia" },
            { name: "Joarez Correia" }
          ]
        },
        { 
          name: "Veranice Schultz",
          spouse: "Jé Fagundes",
          children: [
            { name: "Eliziane Fagundes" },
            { name: "Sarassandra Fagundes" },
            { name: "Elizandra Fagundes",
              spouse: "Argu Rodrigo de Freitas",
              children: [
                { name: "Livia Lais de Freitas" },
                { name: "Melissa Rafaela de Freitas" }
              ]
             },
            { name: "Jonas Fagundes" },
          ]
        },
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
  spouse: "Guilhermina Schultz",
  children: [
    {
      name: "Daniel Schultz",
      spouse: "Lilie Reinhard Schultz",
      children: [],
    },
    {
      name: "Eduardo Schultz",
      spouse: "Wilhelmina Schultz",
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
          name: "Maria de Lurdes Correia",
          spouse: "Ivo Correia",
          children: [
            { name: "Maria Daloé Correia",
              children: [
                { name: "Vitória Arieli Correia Lemos" },
                { name: "Deivid Riquelme Correia Lemos" }
              ]
             },
            { name: "Paulo Eder Correia",
              spouse: "Suzana Terezinha Brito",
              children: [
                { name: "Weslei Gabriel Correia" },
                { name: "Ravi Correia" }
              ]
            },
            { name: "Carlos Correia",
              conjuge: "Juliane Camargo",
             },
            { name: "Cezar Correia" },
            { name: "Joarez Correia" }
          ]
        },
        { 
          name: "Veranice Schultz",
          spouse: "Jé Fagundes",
          children: [
            { name: "Eliziane Fagundes" },
            { name: "Sarassandra Fagundes" },
            { name: "Elizandra Fagundes",
              spouse: "Argu Rodrigo de Freitas",
              children: [
                { name: "Livia Lais de Freitas" },
                { name: "Melissa Rafaela de Freitas" }
              ]
             },
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
        { name: "Marcio Leandro Schultz"},
        { name: "Erni Herbert Schultz"}
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
          name: "Maria de Lurdes Correia",
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
  name: "Plinio Brixner Bühring",
  spouse: "Leinilda Bühring",
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
        { name: "Marieli Adrinani Bühring Chagas" },
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
      name: "Noemi Bühring de Paula",
      spouse: "Boaventura de Paula Neto",
      children: [
        { name: "Ruthy Tonielli" },
        { name: "Julia Maykelli" },
        { name: "Helloá Antônia" }
      ]
    },
    {
      name: "Noemia Bühring",
    }
  ]
};