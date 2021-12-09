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

/**
 * Question1: 要素の取得
 * カルーセル表示されている画像のファイル名を全て、配列に格納する関数を作ってください。
 * 簡単すぎるので、取得するのはファイル名です。URLではありません。。
 * string.split(splitter)というメソッドで、stringをsplitterで分割した配列を取得することができます。
 * 結果はコンソール表示させてみましょう。
 * @returns {string[]} result
 */
function getImageFiles() {
  const result = [];
  const images = document.querySelectorAll(
    "#carouselExampleControls .carousel-item img"
  );
  for (let i = 0; i < images.length; i++) {
    const url = images[i].src;
    const paths = url.split("/");
    result.push(paths[paths.length - 1]);
  }
  return result;
}

/**
 * Question2: 要素の取得のめんどくさいバージョン
 * tableのFirstName, LastName, Emailをプロパティにもつuserオブジェクトを作り、
 * それらを配列に格納する関数を作ってください。テーブルの１行＝１オブジェクトになります。
 * テーブル要素の取得が一番大変だと思うので、これが出来れば大抵のことは出来ます（多分、おそらく）
 * こちらも結果はコンソール表示させましょう。
 * @returns {object} result
 */
function getTableData() {
  const result = [];
  const user = {
    firstName: "",
    lastName: "",
    email: ""
  };
  const trList = document.querySelectorAll("#table-container tbody tr");

  for (let i = 0; i < trList.length; i++) {
    const tr = trList[i];
    const tdList = tr.querySelectorAll("td");
    /**
     * td.length=3のとき
     * 0番目＝FirstName, 1番目＝LastName, 2番目＝Email
     * td.length=2のとき
     * 0番目＝FirstName, 1番目=Email
     */
    if (tdList.length === 3) {
      const _user = { ...user };
      _user.firstName = tdList[0].innerText;
      _user.lastName = tdList[1].innerText;
      _user.email = tdList[2].innerText;
      result.push(_user);
    } else if (tdList.length === 2) {
      const _user = { ...user };
      _user.firstName = tdList[0].innerText;
      _user.email = tdList[1].innerText;
      result.push(_user);
    } else {
      throw new Error("invalid value");
    }
  }
  return result;
}

/**
 * Question3: イベントの設置、要素の変更
 * OKボタンを押したらアカウントを、アドレスとリポジトリに転記する関数を作ってください。
 * よくあるやつですね。アカウントがブランクだった場合はアラートを出してあげましょう。
 * イベント置くとJavaScriptっぽいですよね。。
 * @returns null
 */
function copyAccountName() {
  const button = document.getElementById("button-enter");
  const account = document.querySelector("input[aria-label='Your Account']");
  const email = document.querySelector("input[aria-label='Your Address']");
  const repository = document.querySelector(
    "input[aria-label='Your Repository']"
  );
  button.addEventListener("click", function () {
    if (!account.value) {
      window.alert("Please enter your account");
      return;
    }
    email.value = account.value;
    repository.value = account.value;
    return;
  });
}

/**
 * Question4: イベントの設置
 * チェックボックスの変更を検知する関数を作ってください。
 * どのチェックボックスのチェックが付いたのかもしくは外れたのかをコンソール表示させましょう。
 * ループで各チェックボックスにイベントを設置する典型的なパターンですね。。
 * @returns null
 */
function watchCheckbox() {
  const result = document.getElementById("view-checked");
  const checkboxes = document.querySelectorAll(
    "#checkbox-container .form-check-input"
  );
  for (let i = 0; i < checkboxes.length; i++) {
    const checkbox = checkboxes[i];
    checkbox.addEventListener("change", function () {
      if (checkbox.checked) {
        result.innerText = `${checkbox.value} checked`;
      } else {
        result.innerText = `${checkbox.value} unchecked`;
      }
    });
  }
}

/**
 * Question5: 要素の変更
 * 引数に#(index)を受け取り、受け取った行の背景色を変更する関数を作ってください。
 * 色は自由です。範囲外のindexが指定された場合はアラートを表示させるとおしゃれです。
 * 今更簡単じゃね？と思った方、安心してください。この関数は後ほど使います。。
 * @param {number} index テーブル行のインデックス
 * @returns null
 */
function changeBackgroundColor(index = 0) {
  const colorCode = "#9ec5fe";
  const trList = document.querySelectorAll("#table-container tbody tr");
  if (index > trList.length - 1) {
    window.alert("invalid index number!");
    return;
  }
  trList[index].style.backgroundColor = colorCode;
}
// changeBackgroundColor();

/**
 * Question6: 要素の設置
 * テーブル行のインデックスを選択するセレクトボックスを設置する関数を作ってください。
 * select要素のクラスに「form-select」を、「aria-label」属性に「Rows select」という値を設定してください。
 * option要素をselect要素に挿入するために、table要素を取得してくるのがポイントですね。
 * @returns {element} select element
 */
function createSelectbox() {
  const select = document.createElement("select");
  select.id = "row-select";
  select.classList.add("form-select");
  select.setAttribute("aria-label", "Rows select");

  const trList = document.querySelectorAll("#table-container tbody tr");
  for (let i = 0; i < trList.length; i++) {
    const option = document.createElement("option");
    option.value = i + 1;
    option.innerText = `#${i + 1} Row select`;
    if (i === 0) {
      option.selected = true;
    }
    select.append(option);
  }
  return select;
}

/**
 * Question7: 要素の設置、イベントの設置
 * ボタンを設置し、クリックするとセレクトボックスで選択されたテーブル行の背景色を変更する関数を作ってください。
 * button要素には「btn btn-primary」の二つのクラスを付けてください（スタイル用）
 * 先ほど作った要素を取得し、同じく先ほど作った関数をイベントに仕込む、という複合課題になります。
 * 最終問題に相応しいですね。。かなり実戦に近い内容だと思います。
 * 余裕があれば、背景色を元に戻す処理も作ってみてください。
 * @returns {Element} button element
 */
function createEventButton() {
  const button = document.createElement("button");
  button.classList.add("btn", "btn-primary");
  button.innerHTML = "Do Event";
  button.style.margin = "1rem 0";

  button.addEventListener("click", function () {
    const select = document.getElementById("row-select");
    changeBackgroundColor(select.selectedIndex);
  });
  return button;
}

/**
 * render elements
 * 作った関数は最後にまとめて実行する、という書き方がスマートです。
 * （宣言型プログラミングという書き方です）
 */
const sources = document.getElementById("sources");
sources.append(sourceHtml());

const fileNames = getImageFiles();
console.log(fileNames);

const users = getTableData();
console.log(users);

const container = document.getElementById("container");

container.append(createSelectbox());
container.append(createEventButton());

copyAccountName();
watchCheckbox();
