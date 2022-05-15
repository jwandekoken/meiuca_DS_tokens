const path = require("path");
const fs = require("fs");

const BRANDS = [
  {
    source: path.resolve("tokens", "globals", "**", "*.json"),
    dest: "",
    filename: "globals",
    brand: "",
    theme: "",
    mode: "",
  },
  {
    source: path.resolve("tokens", "motions", "**", "*.json"),
    dest: "",
    filename: "motions",
    brand: "",
    theme: "",
    mode: "",
  },
];

function getDirectories(dirPath) {
  return fs.readdirSync(path.resolve(__dirname, dirPath)).map((folder) => {
    return folder;
  });
}

/*
// Para sistemas com arquivos ocultos (.DS_Store por exemplo)
  function getDirectories(dirPath){
    // Busca todo o conteúdo do diretório que vem do dirPath e chama o método filter
    return fs.readdirSync(path.resolve(__dirname, dirPath)).filter((folder) => {
      // Defino o meu folderPath baseado nos conteúdos de dirPath
      const folderPath = path.resolve(__dirname, dirPath, folder);
      // Verifico se o folderPath existe e se é um diretório (true/false)
      return (fs.existsSync(folderPath) && fs.lstatSync(folderPath).isDirectory())
      // Se o retorno for true mapeia com o nome do diretório
    }).map((folder) => {
      return folder;
    })
  }
*/

function getBrands() {
  getDirectories(path.resolve("tokens", "brands")).map((brand) => {
    getDirectories(path.resolve("tokens", "brands", brand)).map((theme) => {
      getDirectories(path.resolve("tokens", "brands", brand, theme)).map(
        (mode) => {
          BRANDS.push({
            source: path.resolve(
              "tokens",
              "brands",
              brand,
              theme,
              mode,
              "**",
              "*.json"
            ),
            dest: path.join(brand, theme),
            filename: mode,
            brand: brand,
            theme: theme,
            mode: mode,
          });
        }
      );
    });
  });

  return BRANDS;
}

module.exports = {
  getBrands,
};
