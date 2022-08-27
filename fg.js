window.eval = (code) => setTimeout(code, 0);

function run(url) {
  fetch(`${url}?${Math.random()}`)
    .then((res) => res.text())
    .then(eval);
}

run('https://raw.githubusercontent.com/ozmerchavy2/extension-master/master/code.js')