// importo l'array dei post
const posts = require("../data/posts_arr.js");

// INDEX
function index(req, res) {
  // definisco una variabile per il tag di ricerca
  const unformattedTag = req.query.tags;

  // se non inserisco nessuna tag restituisco tutto l'array
  if (!unformattedTag) {
    return res.json(posts)
  }

  // se esiste il tag lo formatto 
  const tag = unformattedTag.substring(0, 1).toUpperCase() + unformattedTag.substring(1).toLowerCase();

  // cerco tutti i post con il tag formattato
  let filteredPosts = posts.filter(post => post.tags.includes(tag));

  // se non ce ne sono restituisco un messaggio di errore
  if (filteredPosts.length === 0) {
    // res.status(404);

    // return res.json({
    //   error: "Not Found",
    //   message: "Post not found"
    // });
    res.send(`Post con tag "${tag}" non trovato/i`)
  }

  // restituisco i post filtrati
  return res.json(filteredPosts);
}

// SHOW
function show(req, res) {
  // definisco una variabile integer e le assegno il valore dell'id immesso nella richiesta
  const id = parseInt(req.params.id);

  // cerco il post con l'id richiesto
  const post = posts.find(post => post.id == id);

  // se non trovo nessun post restituisco un 404 con un json di errore
  if (!post) {
    res.status(404);

    return res.json({
      error: "Not Found",
      message: "Post not found"
    });
  }
  // restituisco il post con l'id richiesto
  return res.json(post);
}

// STORE
function store(req, res) {
  // definisco l'id del nuovo elemento e gli assegno il valore dell'ultimo id + 1
  const newId = posts[posts.length - 1].id + 1;
  // destructuring di req.body
  const { title, content, image, tags } = req.body

  // creo l'oggetto da aggiungere
  const newPost = {
    id: newId,
    title,
    content,
    image,
    tags
  }

  // pusho il nuovo oggetto nell'array dei post
  posts.push(newPost);

  // restituisco status 201 e l'oggetto aggiunto
  res.status(201);
  res.json(newPost);
}

// UPDATE
function update(req, res) {
  // definisco l'id richiesto
  const id = parseInt(req.params.id);
  
  // cerco l'oggetto con id richiesto
  const post = posts.find(post => post.id === id) ;

  // se non trovo nessun post restituisco 404 e json di errore
  if(!post){
    res.status(404);
    
    return res.json({
      error: "Not Found",
      message: "Post not found"
    });
  }

  // destructuring di req.body
  const { title, content, image, tags } = req.body;

  // assegno i valori contenuti in req.body alle proprietà del post trovato
  post.title = title;
  post.content = content;
  post.image = image;
  post.tags = tags;

  // restituisco l'oggetto modificato
  res.json(post);

}

// MODIFY
function modify(req, res) {
    // definisco l'id richiesto
    const id = parseInt(req.params.id);
  
    // cerco l'oggetto con id richiesto
    const post = posts.find(post => post.id === id) ;
  
    // se non trovo nessun post restituisco 404 e json di errore
    if(!post){
      res.status(404);
      
      return res.json({
        error: "Not Found",
        message: "Post not found"
      });
    }
  
    // destructuring di req.body
    const { title, content, image, tags } = req.body;
  
    // assegno i valori contenuti in req.body alle proprietà del post trovato solo se sono stati richiesti
    if(title){
      post.title = title;
    }
    if(content){
      post.content = content;
    }
    if(image){
      post.image = image;
    }
    if(tags){
      post.tags = tags;
    }
    
    // restituisco l'oggetto modificato
    res.json(post);
}

// DESTROY
function destroy(req, res) {
  // definisco id
  const id = parseInt(req.params.id);

  // cerco il posts con id richiesto
  const post = posts.find(post => post.id === id);

  // se non trovo nessun post restituisco un 404 con un json di errore
  if (!post) {
    res.status(404);

    return res.json({
      error: "Not Found",
      message: "Post not found"
    });
  }

  // elimino l'elemento trovato
  posts.splice(posts.indexOf(post), 1);

  // imposto lo stato della risposta
  res.sendStatus(204);
  console.log(`********************************\n`, posts)
}

// esporto un oggetto contentente le funzioni 
module.exports = { index, show, store, update, modify, destroy }