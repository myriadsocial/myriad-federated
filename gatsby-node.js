exports.onCreateWebpackConfig = ({ getConfig, actions, stage }) => {
  const webpackConfig = getConfig()

  if (stage === "build-javascript") {
    const dependencyRulesIndex = webpackConfig.module.rules.findIndex(
      (rule) => {
        return (
          rule.test &&
          rule.test.toString() === "/\\.(js|mjs)$/" &&
          typeof rule.exclude === "function"
        )
      }
    )

    webpackConfig.module.rules.splice(dependencyRulesIndex, 1)
  }

  actions.replaceWebpackConfig(webpackConfig)
}
