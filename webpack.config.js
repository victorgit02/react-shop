const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
//instanciamos el plugin instalado en la terminal
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./src/index.js",
  //nos va a decir donde esta el punto de entrada de nuestra app
  
  output: {
    path: path.resolve(__dirname, "dist"),
    //donde va a vivir el proyecto una vez que este preparado
    
    filename: "bundle.js",
    //nombre al empaquetado que se va a crear
    publicPath: "/"
  },
  mode:"development",
  resolve: {
    //que extensiones y como voy a trabajar dentro de mi proyecto
    extensions: [".js",".jsx"],
    alias: {
      "@components" : path.resolve(__dirname, "src/components/"),
      "@containers" : path.resolve(__dirname, "src/containers/"),
      "@styles" : path.resolve(__dirname, "src/styles/"),
      "@icons" : path.resolve(__dirname, "src/assets/icons"),
      "@logos" : path.resolve(__dirname, "src/assets/logos/"),

    }
  },
  module: {
    //donde vamos a trabajar las reglas que vamos a crear con nuestros loaders 
    //como los plugins que vamos a estar agregando
    rules: [
        {
            test: /\.(js|jsx)$/,
            //probar cuales van a hacer los elementos que vamos a estar trabajando
            exclude:/node_modules/,
            use: {
                loader: "babel-loader"
            }
        },
        {
            test:/\.html$/,
            use: [
                {
                    loader: "html-loader"
                }
            ]
        },
        {
            test: /\.(css|scss)$/,
            use: [
                "style-loader",
                "css-loader",
                "sass-loader",
            ],
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          type: "asset"
        }
    ]
  },
  plugins: [
    new  HtmlWebpackPlugin({
        //configuramos el plugin instanciado en la parte superior
        template: "./public/index.html",
        //donde esta ese template que vamos a usar
        filename: "./index.html"
        //como se va a llamar una vez que lo preparemos
    }),
    new MiniCssExtractPlugin({
        filename:"[name].css"
    }),
  ],
  devServer: {
    historyApiFallback: true,
  }
};
