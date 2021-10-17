
exports.createPages = async ({ actions: { createPage }, graphql, reporter }) => {

    const poolers = require("./src/data/poolers.json")
    
    poolers.data.forEach(pooler => {
      createPage({
        path: `/pooler/${pooler.Id}/`,
        component: require.resolve("./src/templates/pooler.js"),
        context: {
          nom: pooler.Nom,
          Id: pooler.Id,
          Equipe: pooler.\u00c9quipe,
          Abbr: pooler.Abbr\u00e9viation,
          Score: pooler.Score,
        },
      })
      createPage({
        path: `/pooler/${pooler.Id}/picks`,
        component: require.resolve("./src/templates/draftpicks.js"),
        context: {
          nom: pooler.Nom,
          Id: pooler.Id,
          Equipe: pooler.\u00c9quipe,
        },
      })
    })

    // "Id":"gab",
    // "Nom":"Gabriel",
    // "\u00c9quipe":"Tropics",
    // "Abbr\u00e9viation":"TRO",
    // "Score":3

    const joueurs = require("./src/data/joueurs.json")
    
    joueurs.data.forEach(joueur => {
      createPage({
        path: `/joueur/${joueur.idNHL}/`,
        component: require.resolve("./src/templates/joueur.js"),
        context: {
          nom: joueur.prenomJoueur + " " + joueur.nomJoueur,
          idNHL: joueur.idNHL,
          idHockeyRef: joueur.idHockeyRef,
          position: joueur.position,
          salaireActuel: joueur.salaireActuel,
        },
      })
    })

    const docTemplate = require.resolve(`./src/templates/doc.js`)

    const result = await graphql(`
      {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          limit: 1000
        ) {
          edges {
            node {
              frontmatter {
                slug
              }
            }
          }
        }
      }
    `)

    // Handle errors
    if (result.errors) {
      reporter.panicOnBuild(`Error while running GraphQL query.`)
      return
    }

    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.slug,
        component: docTemplate,
        context: {
          // additional data can be passed via context
          slug: node.frontmatter.slug,
        },
      })
    })
  }
