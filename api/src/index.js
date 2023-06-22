const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const chance = require("chance").Chance();
const allPokemon = require("./pokedex.json");

const app = express();
const port = 3000;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let pokemonList = [];
const maxId = 898;

const findPokemon = (id) => {
  return allPokemon.find((pokemon) => pokemon.id === id);
};

let randomIds = [];
while (randomIds.length < 20) {
  let randomNumber = chance.integer({ min: 1, max: maxId });
  if (!randomIds.includes(randomNumber)) {
    randomIds.push(randomNumber);
  }
}

for (let i = 0; i < 20; i++) {
  let id = randomIds.pop();
  let pokemon = findPokemon(id);
  let pokemonAbilities = [];
  pokemon.profile.ability.forEach((ability) => {
    pokemonAbilities.push(ability[0]);
  });
  pokemonList.push({
    id: id,
    name: pokemon.name.english,
    description: pokemon.description,
    species: pokemon.species,
    types: pokemon.type,
    abilities: pokemonAbilities,
    height: pokemon.profile.height,
    weight: pokemon.profile.weight,
    sprite: pokemon.image.thumbnail,
    captured: chance.bool(),
  });
}

const loginUser = {
  tokenId: chance.guid(),
  name: chance.name(),
  lastName: chance.last(),
  email: chance.email({ domain: "pokedexapi.com" }),
  password: chance.string({ length: 10 }),
};

const userInfo = {
  tokenId: loginUser.tokenId,
  name: loginUser.name,
  lastName: loginUser.lastName,
  email: loginUser.email,
  country: chance.country({ full: true }),
  city: chance.city(),
  address: chance.address(),
  phone: chance.phone(),
  avatar: chance.avatar(),
  birthday: chance.birthday({ string: true }),
};

let pokemon = {
  id: null,
  name: null,
  description: null,
  species: null,
  types: null,
  abilities: null,
  height: null,
  weight: null,
  sprite: null,
  captured: null,
};

let response = {
  error: false,
  code: 200,
  message: "",
};

app.get("/", function (req, res) {
  response = {
    error: true,
    code: 200,
    message:
      "API REST working. You can use /login /pokemon or /pokedex endpoints",
  };
  res.send(response);
});
app.route("/login").post(function (req, res) {
  if (
    req.body.email === loginUser.email &&
    req.body.password === loginUser.password
  ) {
    response = {
      error: false,
      code: 200,
      message: "Login success",
      data: {
        email: loginUser.email,
        name: loginUser.name,
        lastName: loginUser.lastName,
        tokenId: loginUser.tokenId,
      },
    };
  } else {
    response = {
      error: true,
      codigo: 401,
      mensaje: "Login failed",
    };
  }
  res.send(response);
});
app.route("/user").get(function (req, res) {
  if (req.headers.authorization === loginUser.tokenId) {
    response = {
      error: false,
      code: 200,
      message: "User info",
      data: userInfo,
    };
  } else {
    response = {
      error: true,
      code: 401,
      message: "Unauthorized",
    };
  }
  res.send(response);
});
app.route("/pokedex").get(function (req, res) {
  if (req.headers.authorization === loginUser.tokenId) {
    response = {
      error: false,
      code: 200,
      message: "Pokemon list",
      data: pokemonList,
    };
  } else {
    response = {
      error: false,
      code: 200,
      message: "Pokemon list",
      data: pokemonList.filter((pokemon) => pokemon.captured === false),
    };
  }
  res.send(response);
});
app
  .route("/pokemon")
  .get(function (req, res) {
    if (req.headers.authorization === loginUser.tokenId) {
      if (!req.query.id) {
        response = {
          error: true,
          code: 400,
          message: "Pokemon id is required",
        };
      } else {
        pokemon = pokemonList.find(
          (pokemon) => pokemon.id === parseInt(req.query.id)
        );
        if (pokemon) {
          response = {
            error: false,
            code: 200,
            message: "Pokemon info",
            data: pokemon,
          };
        } else {
          response = {
            error: true,
            code: 404,
            message: "Pokemon not found",
          };
        }
      }
    } else {
      response = {
        error: true,
        code: 401,
        message: "Unauthorized",
      };
    }
    res.send(response);
  })
  .post(function (req, res) {
    if (req.headers.authorization === loginUser.tokenId) {
      if (
        !req.body.id ||
        !req.body.name ||
        !req.body.species ||
        !req.body.types
      ) {
        response = {
          error: true,
          code: 400,
          message: "Id, name, species, types and captured are required",
        };
      } else {
        pokemon = pokemonList.find((pokemon) => pokemon.id === req.body.id);
        if (pokemon) {
          response = {
            error: true,
            code: 409,
            message: "Pokemon already exists",
          };
        } else {
          pokemon = {
            id: req.body.id,
            name: req.body.name,
            description: req.body.description,
            species: req.body.species,
            types: req.body.types,
            abilities: req.body.abilities,
            height: req.body.height,
            weight: req.body.weight,
            sprite: req.body.sprite,
            captured: req.body.captured,
          };
          pokemonList.push(pokemon);
          response = {
            error: false,
            code: 200,
            message: "Pokemon created",
            data: pokemon,
          };
        }
      }
    } else {
      response = {
        error: true,
        code: 401,
        message: "Unauthorized",
      };
    }
    res.send(response);
  })
  .delete(function (req, res) {
    if (req.headers.authorization === loginUser.tokenId) {
      if (!req.body.id) {
        response = {
          error: true,
          code: 400,
          message: "Id is required",
        };
      } else {
        pokemon = pokemonList.find((pokemon) => pokemon.id === req.body.id);
        if (pokemon) {
          pokemonList = pokemonList.filter(
            (pokemon) => pokemon.id !== req.body.id
          );
          response = {
            error: false,
            code: 200,
            message: "Pokemon deleted",
          };
        } else {
          response = {
            error: true,
            code: 404,
            message: "Pokemon not found",
          };
        }
      }
    } else {
      response = {
        error: true,
        code: 401,
        message: "Unauthorized",
      };
    }
    res.send(response);
  });
app.use(function (req, res) {
  response = {
    error: true,
    codigo: 404,
    mensaje: "URL not found",
  };
  res.status(404).send(response);
});
app.listen(port, () => {
  console.log("Server started. Port 3000");
  console.log("Login user created");
  console.log("email: " + loginUser.email);
  console.log("password: " + loginUser.password);
});
