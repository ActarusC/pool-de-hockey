exports.createPages = ({ actions: { createPage } }) => {

    const poolers = require("./src/data/poolers.json")
    
    poolers.data.forEach(pooler => {
      createPage({
        path: `/pooler/${pooler.Id}/`,
        component: require.resolve("./src/templates/pooler.js"),
        context: {
          nom: pooler.Nom,
        },
      })
    })


    createPage(
    {
        path: "/page-with-context/",
        component: require.resolve("./src/templates/with-context.js"),
        context: {
          title: "We Don’t Need No Stinkin’ GraphQL",
          content: "<p>This is page content.</p><p>No GraphQL required!</p>",
        },
    })

    createPage({
        path: "/no-data/",
        component: require.resolve("./src/templates/no-data.js"),
      })
  }