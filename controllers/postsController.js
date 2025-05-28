//importo il database
const connection = require("../data/db.js");

// INDEX
function index(req, res) {
  // variabile per la query
  const sql = "SELECT * FROM posts";

  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({
      error: "DB query failed"
    })
    res.json(results)
  })
}

// SHOW
function show(req, res) {
  // definisco una variabile integer e le assegno il valore dell'id immesso nella richiesta
  const id = parseInt(req.params.id);

  const sql = "SELECT * FROM posts WHERE id = ?";

  const tagsSql = `
  SELECT T.* 
  FROM tags T 
  JOIN post_tag PT 
  ON T.id = PT.tag_id 
  WHERE PT.post_id = ?
  `

  // query per il post con id richiesto
  connection.query(sql, [id], (err, postsResult) => {
    if (err) { return res.status(500).json({ error: "Query failed: " + err }) };
    if (postsResult.length === 0) {
      return res.status(404).json({ error: "Post not Found" });
    };

    const post = postsResult[0];

    // query per la join dei tag del post con id richiesto
    connection.query(tagsSql, [id], (err, tagsResult) => {
      if (err) { return res.status(500).json({ error: "Query failed: " + err }) };

      post.tags = tagsResult;
      res.json(post)
    })
  })
}

// DESTROY
function destroy(req, res) {
  const id = parseInt(req.params.id);

  const sql = "DELETE FROM posts WHERE id = ?";

  connection.query(sql, [id], (err) => {
    if (err) {
      res.status(500).json({
        error: "DB query failed: " + err
      })
    }

    res.sendStatus(204);
  })
}

// esporto un oggetto contentente le funzioni 
module.exports = { index, show, destroy }