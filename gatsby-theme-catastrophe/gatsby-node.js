const fs = require("fs")

exports.onPreBootstrap = ({ reporter }, options) => {
  const fontsPath = "src/fonts"

  if (!fs.existsSync(fontsPath)) {
    reporter.info(`creating the ${fontsPath} directory`)
    fs.mkdirSync(fontsPath)
  }

  const stylesPath = "src/styles"

  if (!fs.existsSync(stylesPath)) {
    reporter.info(`creating the ${stylesPath} directory`)
    fs.mkdirSync(stylesPath)
  }
}
