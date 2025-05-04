var defaultOptions = {
  headings: 'h1, h2',
  scope: '.markdown-section',

  // To make work
  title: 'Contents',
  listType: 'ul',
}

var createATag = function (realHTag) {
  var a = document.createElement('a');
  var content = realHTag.firstChild.innerHTML;
  // Use this to clip text w/ HTML in it.
  // https://github.com/arendjr/text-clipper
  a.innerHTML = content;
  a.href = realHTag.firstChild.href;
  a.onclick = (e) => {
    activeATag(e.target.parentNode)
  }


  // In order to remove this gotta fix the styles.
  a.setAttribute('class', 'anchor');

  return a
};

var activeATag = function (aTag) {
  var divs = document.querySelectorAll('.page_toc .active');
  // Remove the previous classes
  [].forEach.call(divs, function (div) {
    div.setAttribute('class', 'anchor')
  });
  // Make sure this is attached to the parent not itself
  aTag.setAttribute('class', 'active')
};


var createList = function (wrapper, count) {
  while (count--) {
    wrapper = wrapper.appendChild(
      document.createElement('ul')
    );

    if (count) {
      wrapper = wrapper.appendChild(
        document.createElement('li')
      );
    }
  }

  return wrapper;
};

//------------------------------------------------------------------------

var getHeaders = function (selector) {
  var headings2 = document.querySelectorAll(selector);
  var ret = [];

  [].forEach.call(headings2, function (heading) {
    ret = ret.concat(heading);
  });

  return ret;
};

var getLevel = function (header) {
  var decs = header.match(/\d/g);

  return decs ? Math.min.apply(null, decs) : 1;
};

var jumpBack = function (currentWrapper, offset) {
  while (offset--) {
    currentWrapper = currentWrapper.parentElement;
  }

  return currentWrapper;
};

var buildTOC = function (routerPath, options) {
  var ret = document.createElement('ul');
  var wrapper = ret;
  var lastLi = null;
  var selector = options.scope + ' ' + options.headings
  const headers = getHeaders(selector)

  headers.reduce(function (prev, curr, index) {
    // 将 path 和 index 拼接，作为标题唯一的 id，这样和 toc 了；
    const tocId = `${routerPath}_${index}`
    curr.__toc_id = tocId

    var currentLevel = getLevel(curr.tagName);
    var offset = currentLevel - prev;

    wrapper = (offset > 0)
      ? createList(lastLi, offset)
      : jumpBack(wrapper, -offset * 2)

    wrapper = wrapper || ret;

    var li = document.createElement('li');
    const aTag = createATag(curr)
    aTag.id = tocId
    wrapper.appendChild(li).appendChild(aTag);

    lastLi = li;

    return currentLevel;
  }, getLevel(options.headings));

  ret.id = '__toc_root_ul'
  return ret;
};

// Docsify plugin functions
function plugin(hook, vm) {
  var userOptions = vm.config.toc

  hook.mounted(function () {
    var content = window.Docsify.dom.find(".content");
    if (content) {
      var nav = window.Docsify.dom.create("aside", "");
      window.Docsify.dom.toggleClass(nav, "add", "nav");
      window.Docsify.dom.before(content, nav);
    }
  });

  hook.doneEach(function () {
    var nav = document.querySelectorAll('.nav')[0]
    if (!nav) {
      return;
    }
    const currentRoutePath = vm.route.path

    const toc = buildTOC(currentRoutePath, userOptions);

    // Just unset it for now.
    if (!toc.innerHTML) {
      nav.innerHTML = null
      return;
    }

    var container = document.createElement('div');
    container.setAttribute('class', 'page_toc');
    container.appendChild(toc);

    // Existing TOC
    var tocChild = document.querySelectorAll('.nav .page_toc');

    if (tocChild.length > 0) {
      tocChild[0].parentNode.removeChild(tocChild[0]);
    }
    nav.appendChild(container);
  });

  // 支持滚动联动
  hook.init(function () {
    console.log("hook init of toc.js")
    let timer = 0;
    window.addEventListener('scroll', () => {
      const tocRootUl = document.getElementById('__toc_root_ul')
      if (!tocRootUl) {
        return;
      }
      const tocRootUlChildren = tocRootUl.children;
      if (!tocRootUlChildren || tocRootUlChildren.length == 0) {
        return
      }
      if (timer > 0) {
        clearTimeout(timer)
      }

      timer = setTimeout(() => {
        var selector = userOptions.scope + ' ' + userOptions.headings
        const headers = getHeaders(selector)

        let currentHeader = null;
        // 反向遍历找到第一个出现在视口的标题
        for (let i = headers.length - 1; i >= 0; i--) {
          const rect = headers[i].getBoundingClientRect();
          if (rect.top <= 40) { // 距离顶部100px时视为激活
            currentHeader = headers[i];
            break;
          }
        }
        // 极端 case，找了一圈发现没有找到符合条件的，拿第一个标题顶上
        if (!currentHeader) {
          currentHeader = headers[0];
        }
        if (currentHeader) {
          currentATag = document.getElementById(currentHeader.__toc_id)
          activeATag(currentATag)
        }
      }, 500)
    })

  })
}

// Docsify plugin options
window.$docsify['toc'] = Object.assign(defaultOptions, window.$docsify['toc']);
window.$docsify.plugins = [].concat(plugin, window.$docsify.plugins);