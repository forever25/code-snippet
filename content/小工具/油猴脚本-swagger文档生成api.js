// ==UserScript==
// @name         通过swagger 生成api
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        *://*/swagger-ui.html*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bing.com
// @grant        none
// ==/UserScript==


(function () {
  'use strict';
  let $;
  function GM_wait() {
    if (typeof window.jQuery == 'undefined') {
      window.setTimeout(GM_wait, 100);
    } else {
      $ = window.jQuery.noConflict(true);
      letsJQuery();
    }
  }

  // 引入jQuery
  (function () {
    if (typeof window.jQuery == 'undefined') {
      var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
        GM_JQ = document.createElement('script');
      GM_JQ.src = '//code.jquery.com/jquery-1.12.4.min.js';
      GM_JQ.type = 'text/javascript';
      GM_JQ.async = true;
      GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
    }
    GM_wait();
  })();
  // 需要执行的代码逻辑
  function letsJQuery() {
    createButton();
    window.copy13a = copy13a;
  }
  function copy13a() {
    const tarDom = $('.opblock-tag-section.is-open')
    // const tarDom = $('.opblock-tag-section .markdown')
    let str = '';
    tarDom.each(it => {
      const item = $(tarDom[it]);
      const prefixDom = item.find('.markdown');
      if (/[a-zA-Z]+\s+[a-zA-Z]+/.test(prefixDom.text())) {
        let preText = prefixDom.text().replace(' Controller', '');

        str += getCurDomData(item, preText)
      } else {
        let prefixDom = item.find('.nostyle')
        let preText = prefixDom.text().replace(' Controller', '')
        str += getCurDomData(item, preText)
      }
    })

    copyToClip(str)
  }

  function getCurDomData(curDom, prefix) {
    let str = '';
    prefix = prefix.toLocaleLowerCase()
    const dom = curDom.find('.opblock-summary')
    dom.each(index => {
      const item = $(dom[index]);
      const pathStr = item.find('.opblock-summary-path span').text()
      str += `
      //  ${item.find('.opblock-summary-method').text()}
      '${prefix}_${pathStr.split('/').at(-1)}': '${pathStr.substr(1)}', // ${item.find('.opblock-summary-description').text()}`
    })
    return str;
  }
  // 创建按钮
  function createButton() {
    const html = `
      <div
      style="position: fixed;right:10px;top:10px;width:40px;height:20px;background:#fff;cursor:pointer;text-align:center;line-height:20px;user-select:none;"
      onclick="copy13a()"
      >
        生成
      </div>
      <input class="form-copy" />
    `
    $('<div/>').html(html).appendTo(document.body);
  }
  /**
   * 复制多行内容到粘贴板
   * contentArray: 需要复制的内容（传一个字符串数组）
   * message : 复制完后的提示，不传则默认提示"复制成功"
   */
  function copyToClip(contents, message) {
    const textarea = document.createElement('textarea');
    textarea.value = contents;
    document.body.appendChild(textarea);
    textarea.select();
    if (document.execCommand('copy')) {
      document.execCommand('copy');
    }
    console.log(contents);
    document.body.removeChild(textarea);
    if (message == null) {
      alert("复制成功");
    } else {
      alert(message);
    }
  }

})();


