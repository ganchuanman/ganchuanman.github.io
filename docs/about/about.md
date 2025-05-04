
## 关于本站：
本站点主要记录个人关于技术，关于阅读，关于生活方方面面的思考和总结。技术方面主要内容聚焦于 Android 以及大前端多一些。

## 站点实现：

### 基于 docsify 构建：
本站点基于 [docsify](https://github.com/docsifyjs/docsify) 构建。
使用到了如下插件：
- [docsify-plantuml](https://github.com/imyelo/docsify-plantuml)：在 markdown 中渲染 plantuml。
  - plantuml 测试
    ```plantuml
    @startuml
    Alice -> Bob: Authentication Request
    Bob --> Alice: Authentication Response

    Alice -> Bob: Another authentication Request
    Alice <-- Bob: another authentication Response
    @enduml
    ```
  - [vscode-markdown-plantuml-preview](https://marketplace.visualstudio.com/items/?itemName=myml.vscode-markdown-plantuml-preview)：可以在 vscode 中编辑 markdown 同步预览 plantuml。
- [docsify-sidebar-collapse](https://github.com/iPeng6/docsify-sidebar-collapse)：用于支持侧边 sidebar 的展开收起。
- [docsify-updated](https://github.com/pfeak/docsify-updated)：用于展示文章的最近更新时间。
- [countable](https://github.com/827652549/docsify-count)：用于统计文章字数以及预计阅读时长。
- [docsify-copy-code](https://github.com/jperasmus/docsify-copy-code)：用于支持代码块复制。
- zoom-image：用于支持图片放大展示。
  - ```xml
  <script src="//cdn.jsdelivr.net/npm/docsify/lib/plugins/zoom-image.min.js"></script>
    ```

同时也对社区的一些插件做了魔改：
- [docsify-toc](https://github.com/mrpotatoes/docsify-toc)：显示 makdown 的目录。
- [docsify-drawio](https://github.com/KonghaYao/docsify-drawio)：支持渲染 drawio绘图。

#### 支持 drawio 渲染：
drawio插件改动：主要是为了支持 drawio 代码快的渲染以及 drawio 文件的渲染。
```javascript
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
```
index.html:
```javascript
markdown: {
  renderer: {
    link: function (token) {
      if (`${token}`.endsWith('.drawio')) {
        // 下面是解析的部分
        return window.remoteDrawioConverter(token)
      }
      return this.origin.link.apply(this, arguments)
    },
    code: function (code, lang) {
      if (lang === 'drawio') {
        if (window.drawioConverter) {
          console.log('drawio 转化中')
          return window.drawioConverter(code)
        } else {
          return `<div class='drawio-code'>${code}</div>`
        }
      } else {
        return this.origin.code.apply(this, arguments);
      }
    }
  }
},
```

drawio 测试

基于独立 drawio 文件的渲染：
[](/About/pics/TestDrawIo.drawio)

基于代码快的drawio 文件渲染：
```xml
<mxfile host="65bd71144e">
  <diagram id="GJAwkbXEC2regrHjeEgt" name="Page-1">
    <mxGraphModel dx="960" dy="855" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="827" pageHeight="1169" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        <mxCell id="2" value="" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#1ba1e2;strokeColor=#006EAF;fontColor=#ffffff;shadow=0;" parent="1" vertex="1">
          <mxGeometry x="160" y="110" width="460" height="290" as="geometry"/>
        </mxCell>
        <mxCell id="3" value="docsify" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#008a00;strokeColor=#005700;shadow=0;glass=0;fontColor=#ffffff;" parent="1" vertex="1">
          <mxGeometry x="170" y="330" width="440" height="60" as="geometry"/>
        </mxCell>
        <mxCell id="4" value="plugins" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#008a00;strokeColor=#005700;shadow=0;glass=0;fontColor=#ffffff;" parent="1" vertex="1">
          <mxGeometry x="170" y="260" width="140" height="60" as="geometry"/>
        </mxCell>
        <mxCell id="5" value="themes" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#008a00;strokeColor=#005700;shadow=0;glass=0;fontColor=#ffffff;" parent="1" vertex="1">
          <mxGeometry x="320" y="260" width="140" height="60" as="geometry"/>
        </mxCell>
        <mxCell id="6" value="custom-styles" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#008a00;strokeColor=#005700;shadow=0;glass=0;fontColor=#ffffff;" parent="1" vertex="1">
          <mxGeometry x="470" y="260" width="140" height="60" as="geometry"/>
        </mxCell>
        <mxCell id="7" value="markdown-content" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#008a00;strokeColor=#005700;shadow=0;glass=0;fontColor=#ffffff;" parent="1" vertex="1">
          <mxGeometry x="170" y="190" width="440" height="60" as="geometry"/>
        </mxCell>
        <mxCell id="8" value="github pages" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#008a00;strokeColor=#005700;shadow=0;glass=0;fontColor=#ffffff;" parent="1" vertex="1">
          <mxGeometry x="170" y="120" width="440" height="60" as="geometry"/>
        </mxCell>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>
```
```drawio
<mxfile host="65bd71144e">
    <diagram id="GJAwkbXEC2regrHjeEgt" name="Page-1">
        <mxGraphModel dx="960" dy="855" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="827" pageHeight="1169" math="0" shadow="0">
            <root>
                <mxCell id="0"/>
                <mxCell id="1" parent="0"/>
                <mxCell id="2" value="" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#1ba1e2;strokeColor=#006EAF;fontColor=#ffffff;shadow=0;" parent="1" vertex="1">
                    <mxGeometry x="160" y="110" width="460" height="290" as="geometry"/>
                </mxCell>
                <mxCell id="3" value="docsify" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#008a00;strokeColor=#005700;shadow=0;glass=0;fontColor=#ffffff;" parent="1" vertex="1">
                    <mxGeometry x="170" y="330" width="440" height="60" as="geometry"/>
                </mxCell>
                <mxCell id="4" value="plugins" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#008a00;strokeColor=#005700;shadow=0;glass=0;fontColor=#ffffff;" parent="1" vertex="1">
                    <mxGeometry x="170" y="260" width="140" height="60" as="geometry"/>
                </mxCell>
                <mxCell id="5" value="themes" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#008a00;strokeColor=#005700;shadow=0;glass=0;fontColor=#ffffff;" parent="1" vertex="1">
                    <mxGeometry x="320" y="260" width="140" height="60" as="geometry"/>
                </mxCell>
                <mxCell id="6" value="custom-styles" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#008a00;strokeColor=#005700;shadow=0;glass=0;fontColor=#ffffff;" parent="1" vertex="1">
                    <mxGeometry x="470" y="260" width="140" height="60" as="geometry"/>
                </mxCell>
                <mxCell id="7" value="markdown-content" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#008a00;strokeColor=#005700;shadow=0;glass=0;fontColor=#ffffff;" parent="1" vertex="1">
                    <mxGeometry x="170" y="190" width="440" height="60" as="geometry"/>
                </mxCell>
                <mxCell id="8" value="github pages" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#008a00;strokeColor=#005700;shadow=0;glass=0;fontColor=#ffffff;" parent="1" vertex="1">
                    <mxGeometry x="170" y="120" width="440" height="60" as="geometry"/>
                </mxCell>
            </root>
        </mxGraphModel>
    </diagram>
</mxfile>
```

### 基于 Github Pages 部署：
[docsify 部署到 Github Pages](https://docsify.js.org/#/zh-cn/deploy?id=github-pages)



## 联系方式：
邮箱：
Aaron_Oh@163.com

微信：
<p><img src="/About/pics/wechat.jpg" width="300"/></p>