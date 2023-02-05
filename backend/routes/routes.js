const router = require("express").Router();
const ParsingClient = require("sparql-http-client/ParsingClient");

router.route("/").post(async (req, res) => {
  const endpointUrl = "http://dbpedia.org/sparql";
  let club = req.body.club;
  try {
    const query = `
    PREFIX dbo: <http://dbpedia.org/ontology/>
    PREFIX dbr: <http://dbpedia.org/resource/>
    SELECT ?name, ?number
    WHERE {
        dbr:${club} dbp:name ?player.
        ?player dbp:name ?name;
                dbo:number ?number.
    }`;
    const client = new ParsingClient({ endpointUrl });
    const bindings = await client.query.select(query);
    res.status(200).json(bindings);
  } catch (error) {
    res.status(error.status).json(error.message);
  }
});

module.exports = router;
