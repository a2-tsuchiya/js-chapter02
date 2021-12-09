import "./styles.css";

/**
 * ルール
 * 元のHTMLを書き換えてはいけません。
 * jQueryその他フレームワークの使用は禁止とします。
 * 多少HTML/CSSの知識が必要です。分からない方は随時質問してください。
 */

/**
 * generate element for display source code
 * @returns {Element}
 */
function sourceHtml() {
  const html = document.body;
  const div = document.createElement("div");
  const pre = document.createElement("pre");
  pre.innerText = html.innerHTML;
  pre.className = "sources-code";
  div.append(pre);
  return div;
}
const sources = document.getElementById("sources");
sources.append(sourceHtml());
