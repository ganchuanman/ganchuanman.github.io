(function () {

    const chatMap = {
      "&": "&amp;",
      "'": "&#x27;",
      "`": "&#x60;",
      '"': "&quot;",
      "<": "&lt;",
      ">": "&gt;",
    };
    const escapeHTML = (string) => {
      if (typeof string !== "string") return string;
      return string.replace(/[&'`"<>]/g, function (match) {
        return chatMap[match];
      });
    };
  
    drawioConverter = function (xml, idx = new Date().getTime()) {
      let mxGraphData = {
        editable: false,
        highlight: "#0000ff",
        nav: false,
        toolbar: null,
        edit: null,
        resize: true,
        lightbox: "open",
        xml,
      };
  
      const json = JSON.stringify(mxGraphData);
      return `<div class="mxgraph" style="max-width: 100%; border: 1px solid transparent" data-mxgraph="${escapeHTML(json)}"></div>`;
    };
  
    remoteDrawioConverter = function (token) {
      const drawIoDivId = 'drawio_' + token;
      fetch(`${token}`)
        .then(response => response.text())
        .then(content => {
          const drawIoDiv = document.getElementById(drawIoDivId);
          drawIoDiv.innerHTML = drawioConverter(content);
        })
        .catch(error => console.error('Error:', error));
      return `<div id=${drawIoDivId}>Drawio绘制中</div>`
    }
  
    // 下面是插件加载部分
    const install = function (hook) {
      hook.doneEach((hook) => {
        try {
          window.GraphViewer.processElements();
        } catch (e) {
          console.log('drawio.js error', e)
        }
      });
    };
    window.$docsify.plugins = [].concat(install, $docsify.plugins);
  })();