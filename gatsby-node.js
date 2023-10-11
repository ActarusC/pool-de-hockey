
exports.createPages = async ({ actions: { createPage }, graphql, reporter }) => {

    const poolers = require("./src/data/poolers.json")
    
    poolers.data.forEach(pooler => {
      createPage({
        path: `/pooler/${pooler.Id}/`,
        component: require.resolve("./src/templates/pooler.js"),
        context: {
          nom: pooler.nom,
          Id: pooler.id,
          Equipe: pooler.equipe,
          Abbr: pooler.abbr,
          score: pooler.score,
        },
      })
      createPage({
        path: `/pooler/${pooler.Id}/picks`,
        component: require.resolve("./src/templates/draftpicks.js"),
        context: {
          nom: pooler.nom,
          Id: pooler.id,
          Equipe: pooler.equipe,
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
          nom: joueur.prenomjoueur + " " + joueur.nomjoueur,
          idNHL: joueur.idnhl,
          idHockeyRef: joueur.idhockeyref,
          position: joueur.position,
          salaireActuel: joueur.salaireactuel,
        },
      })
    })

    const docTemplate = require.resolve(`./src/templates/doc.js`)

    const result = await graphql(`
      {
        allMarkdownRemark(sort: {frontmatter: {date: DESC}}, limit: 1000) {
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
