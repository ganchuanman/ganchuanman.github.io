let defaultDocsifyUpdatedOptions = { text: "> Last Modify: {docsify-updated}", formatUpdated: "{YYYY}/{MM}/{DD}", whereToPlace: "bottom" };
function plugin(t, d) {
  let o = d.config.timeUpdater.text;
  let i = String(d.config.timeUpdater.whereToPlace).toLowerCase();
  t.beforeEach(function (t) {
    return "top" !== i ? t + "\n\n" + o : o + "\n\n" + t;
  });
}
(window.$docsify = window.$docsify || {});
(window.$docsify.formatUpdated = (window.$docsify.timeUpdater || defaultDocsifyUpdatedOptions).formatUpdated);
(window.$docsify.timeUpdater = Object.assign(defaultDocsifyUpdatedOptions, window.$docsify.timeUpdater));
(window.$docsify.plugins = (window.$docsify.plugins || []).concat(plugin));
