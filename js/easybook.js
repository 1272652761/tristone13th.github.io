/*!
 * EasyBook Jekyll Theme Javascript
 * 
 * http://laobubu.github.io/jekyll-theme-EasyBook
 * https://github.com/laobubu/jekyll-theme-EasyBook
 *
 * This is just a extension for my theme.
 */

function TOCize(toc, content, matchHeightTo) {
    if (!(toc && content && matchHeightTo)) return false

    var cnt = 0;

    var make = function (tag) {
        return document.createElement(tag)
    }

    var aniscroll = {

        // 转移到top
        to: function (top) {
            aniscroll.setTop(top)
        },

        // 得到 文档从顶部开始滚动过的像素值
        getTop: function () {

            // 文档从顶部开始滚动过的像素值/前者的别名/前者的别名
            return window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
        },

        // 滚到该坐标value
        setTop: function (value) {

            // 滚到文档中的某一个坐标
            (window['scrollTo'] && window.scrollTo(window.scrollX, value))
        },
    }

    function scrollToHeader(header, hash, ev) {
        var y = header.getBoundingClientRect().top + aniscroll.getTop();
        if (window.history['pushState']) {
            window.history.pushState({}, header.textContent, "#" + hash);
            aniscroll.to(y);
            ev.preventDefault();
        } else {
            var y2 = aniscroll.getTop();
            setTimeout(function () {
                aniscroll.setTop(y2);
                aniscroll.to(y);
            }, 0);
        }
    }

    var generateLink = function (h) {
        var q = make('a');
        cnt++;
        var hash = h.getAttribute('id');
        if (!hash) {
            hash = ('generated-hash-' + cnt);
            h.setAttribute('id', hash);
        }
        q.textContent = h.textContent;
        q.setAttribute('href', '#' + hash);
        q.addEventListener('click', scrollToHeader.bind(this, h, hash), false);
        return q;
    };

    var hs = content.querySelectorAll('h1, h2, h3, h4, h5, h6');
    var cul = null, plevel = 1;

    // ul：无序列表
    // ol：有序列表
    // li：列表中的项目
    var uls = [make('ul')];

    // 对于选中的每一个标题进行操作，结果为生成一个uls，其中放置结构已完全定义的无序列表
    for (var i = 0; i < hs.length; i++) {

        // 得到该标题的缩进等级
        var level = +hs[i].tagName.substr(1);
        var hi = hs[i];
        var ti = make('li');

        // 根据当前标题生成点击链接
        ti.appendChild(generateLink(hi));
        if (plevel < level) {
            do {
                uls.push(make('ul'));

                // 将这一个无序列表作为上一个无序列表的子列表，直到保存的缩进与当前缩进相等
                uls[uls.length - 2].appendChild(uls[uls.length - 1]);
            } while (++plevel < level);
        } else if (plevel > level) {

            // 当当前缩进大于或者小于保存的缩进时，说明正在执行的这一个已经生成完毕
            do {
                cul = uls.pop();
            } while (--plevel > level);
        }
        cul = uls[uls.length - 1];
        cul.appendChild(ti);
    }

    // 
    while (true) {

        // chs是list类型，用来保存这个无序列表所有的孩子元素
        var chs = uls[0].children;
        if (chs.length == 1 && chs[0].tagName == 'UL')

            // 移除uls的第一个元素
            uls.shift();
        else
            break;
    }

    if (!cnt) return false;

    var scrolldummy = make('div');
    toc.appendChild(scrolldummy);
    toc.appendChild(uls[0]);
    toc.style.display = 'block';

    // 这部分保持sidebar能够也能够移动到特定的位置
    var maxHeightTOC = '';
    var ppc = document.querySelector('.col-main');
    var header_placeholder = document.querySelector('.header-placeholder');
    window.alert(header_placeholder.offsetHeight)
    var s1 = function () {

        // getBoundingClientRect用于获得页面中某个元素的左，上，右和下分别相对浏览器视窗的位置。
        var scrollTop = aniscroll.getTop(), dummyClientTop = scrolldummy.getBoundingClientRect().top - header_placeholder.offsetHeight,
            margin = 10, c, d; // c = dummyHeight, d = TOC.maxHeight (+'px')
        if ((c = -dummyClientTop + margin) < 0) c = 0;
        if (c) {
            var wh = window.innerHeight
                || document.documentElement.clientHeight
                || document.body.clientHeight,
                cbox = matchHeightTo.getBoundingClientRect(),
                vq = cbox.bottom - dummyClientTop - uls[0].offsetHeight;
            if (c > vq) c = vq;
            d = (wh - (margin << 1)) + 'px';
        } else {
            d = "";
        }
        if (d != maxHeightTOC) { //status lock.
            maxHeightTOC = d;
            if (d) {
                uls[0].setAttribute('style', 'max-height:' + d + '; width:' + (toc.offsetWidth - 20) + "px");
            } else {
                uls[0].setAttribute("style", "");
            }
        }
        scrolldummy.style.height = (c + 'px');
    };

    window.addEventListener('scroll', s1, false);
    window.addEventListener('resize', s1, false);
}

function PalmSidebar() {
    var ww = 0; //window width
    var pcw = document.querySelector('.page-content .wrapper');
    var header = document.querySelector('.header');
    var header_placeholder = document.querySelector('.header-placeholder');

    var is_palm_mode = false;

    // do not support old browsers!
    if (typeof window['getComputedStyle'] !== 'function') return;

    function s1() {
        ww = window.innerWidth
            || document.documentElement.clientWidth
            || document.body.clientWidth;
        var h = header.getBoundingClientRect();
        is_palm_mode = getComputedStyle(header).position !== 'static';
        header_placeholder.style.height = is_palm_mode ? (h.bottom - h.top + 'px') : '0px'
    }
    function toggleSidebar(e) {
        if (/expand-sidebar/.test(pcw.className)) {
            pcw.className = pcw.className.replace(/\s*expand-sidebar\s*/, ' ');
            header.className = header.className.replace(/\s*expand-sidebar\s*/, ' ');
        } else {
            pcw.className += " expand-sidebar";
            header.className += " expand-sidebar";
        }
        setTimeout(s1, 200);
    }
    s1();
    document.getElementById('sidebar-toggle').addEventListener('click', toggleSidebar, false);
    window.addEventListener('resize', s1, false);
}

function SelectAllize(selector, tips) {
    if (!window.getSelection) return null;

    var obj = document.querySelectorAll(selector);
    var selection = window.getSelection();
    var z = document.createElement("div");
    z.className = "util-notify1";
    z.textContent = tips;
    document.body.appendChild(z)

    function hide() {
        z.classList.add('hidden')
        z.style.top = '-200px'
    }

    hide();
    z.addEventListener('mouseover', hide, false);

    function clickHandler(e) {
        if (!selection.isCollapsed) return;

        var tt = e.pageY - z.offsetHeight - 15;
        z.setAttribute('style', 'left:' + (e.pageX - z.offsetWidth / 2) + 'px;top:' + (tt + 10) + 'px');
        z.classList.remove('hidden');
        setTimeout(hide, 1000);
    }

    function dblClickHandler(e) {
        selection.selectAllChildren(this);
        hide();
    }

    for (var i = obj.length; i--;) {
        var oi = obj[i];
        oi.addEventListener('click', clickHandler, false);
        oi.addEventListener('dblclick', dblClickHandler, false);
    }

    return true;
}

function RealLoad() {
    TOCize(
        document.querySelector('.post-toc'),
        document.querySelector('.post-content'),
        document.querySelector('.col-main')
    );

    PalmSidebar();
    SelectAllize("pre.highlight", "Dblclick to select all");

    // imgs is a list
    var imgs = document.querySelectorAll('.post-content > p > img');
    for (var i = imgs.length; i--;) {
        if (imgs[i].parentElement.childNodes.length === 1) {
            imgs[i].classList.add('middle-image');
        }
    }

    if (document.querySelector('script[type*="math/tex"]')) {
        var sc = document.createElement('script');
        sc.setAttribute('type', 'text/javascript');
        sc.setAttribute('async', 'true');
        sc.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js?config=TeX-AMS_CHTML');
        document.body.appendChild(sc);
    }
}

RealLoad();
