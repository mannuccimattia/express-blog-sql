// importo express
const express = require("express");
// inizializzo express
const app = express();
// definisco il numero di porta
const port = 3000;

// importo il middleware notFound
const notFound = require("./middlewares/notFound.js");
// importo il middleware errorsHandler
const errorsHandler = require("./middlewares/errorsHandler.js");

// utilizzo il parser
app.use(express.json());

// importo il router
const postsRouter = require("./routers/posts.js");

// utilizzo il router
app.use("/posts", postsRouter);

// definisco l'entry point
app.get("/", (req, res) => {
  res.send("Entry point");
})

// utilizzo i middlewares
app.use(notFound);
app.use(errorsHandler);

// lascio il server in ascolto 
app.listen(port, () => {
  console.log(`Listening on port ${port}..`);
})