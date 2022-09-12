window.eval = (code) => setTimeout(code, 0);

async function run(url) {
    await fetch(`${url}?${Math.random()}`)
      .then((res) => res.text())
      .then(eval)
}

// run('https://raw.githubusercontent.com/ozmerchavy2/extension-master/master/code.js')


///////////////////////////////////////////////////////////////
/* HERE DO THe things them put them in github/extension-master*/
///////////////////////////////////////////////////////////////


/////////////////////////////////////////
/* IMPORTANT CONSTS **/ /////////////////
console.log("i work222222222222 i work");

/////////////////////////////////////////

/////////////////////////////////////////////////////////
///                     INIT FUNCTIONS                ///
/////////////////////////////////////////////////////////


function commandSetUser() {
  return new Promise((resolve) => {
    if (!window.location.href.startsWith("https://www.google.com/search"))
      return resolve();

    const results = decodeURIComponent(location.search).match(
      /(?<=setuser=)\w+/g
    );
    if (!results) return resolve();

    const user = results[0].toLocaleLowerCase();

    chrome.storage.local.set({ user }, () => {
      alert("user was set to " + user);
      resolve();
    });
  });
}

async function getName({ defaultValue } = {}) {
  return await new Promise((resolve) => {
    chrome.storage.local.get("user", ({ user }) =>
      resolve(user ?? defaultValue)
    );
  });
}




async function init() {
  /**
   * Happens for all the users regardless of their identity
   */

  await commandSetUser();
  maybeRestoreExistingShmalert();
  return await getName();
}



/////////////////////////////////////////////////////////
///                     SHMATES                       ///
/////////////////////////////////////////////////////////


function modifyGoogleResults(query, messagesArray) {
  if (!window.location.href.startsWith("https://www.google.com/search")) return;
  if (!window.location.href.includes(query.split(" ").join("+")) && query != "*") {
    console.log("FLOTZ");
    return;
  }

  try {
  [...document.querySelectorAll("h3>span")]
    .find((s) => s.innerText == "People also ask")
    .parentElement.parentElement.parentElement.querySelectorAll("*")
    .forEach((el) => {
      el.classList.add("badbadnotgood");
    });
  }
  catch {}

  const h3s = document.querySelectorAll("[href] > h3:not(.badbadnotgood)");
    
  let count = 0;
  for (let mess of messagesArray) {
    h3s[count].innerText = mess;
    count++;
  }
}

/////////////////////////////////////////////////////////
///                     ALERT USER                    ///
/////////////////////////////////////////////////////////
 
/// E Thema Shmalert
/// make up id just not twice the same

var sleep = (ms) => new Promise(res => setTimeout(res, ms));


async function alertUser({title, msg, start, id, end = 0} = {}) {
  if (document.querySelector('.shmalert')) {
    return console.log('shmalert already in page (this code was prob. run twice)');
  }

  const { id: oldId } = await getShmalertEnd();

  if (id == oldId) return console.log("duplicate shmalert (same id) cancelled");
  
  document.body.innerHTML += `
      <div class="shmalert-wrapper">
          <div class="shmalert">
              <h1>${title}</h1>
              <p>${msg}</p>
              <div class="shma-circle">
                  <p class="shma-number">${start}</p>
              </div>
          </div>
      </div>
  `;

  document.head.innerHTML += `
  <style>
      .shmalert-wrapper {
          position: fixed;
          inset: 0;
          background-color: rgb(20 0 20 / .2);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 99999999999999999999;
      }

      .shmalert {
          width: min(700px, 95vw);
          padding: 40px;
          background-color: #404040;
          color: white;
          border-radius: 10px;
          text-align: center;
          position: relative;
      }

      .shmalert h1 {
          font-size: 60px;
      }

      .shmalert p {
          font-size: 30px;
      }

      .shmalert .shma-circle .shma-number {
          font-size: 45px;
      }

      .shmalert .shma-circle {
          border-radius: 100vmax;
          width: 100px;
          height: 100px;
          margin: auto;
          border: 6px solid gray;
          display: flex;
          justify-content: center;
          align-items: center;

          animation: pulse 1s cubic-bezier(.04,1.45,.51,1.45) infinite forwards;

          position: absolute;
          top: 20px;
          right: 20px;
      }

      @keyframes pulse {
          0%, 30%, 100% {
              transform: scale(1);
          }
          15% {
              transform: scale(1.05);
          }
      }
  </style>
  `

  const numEl = document.querySelector(".shmalert .shma-circle .shma-number");

  let i = start;
  document.querySelector(".shmalert .shma-circle").addEventListener('animationiteration', () => {
    numEl.innerText = --i;
    if (i < end) {
      document.querySelector('.shmalert-wrapper').remove();
    }
  })

  const shmalertEnd = Date.now() + (start - end) * 1000
  chrome.storage.local.set({ shmalertEnd, msg, title, end, id }, () => {});
};

async function getShmalertEnd() {
  return await new Promise((resolve) => {
    chrome.storage.local.get(["shmalertEnd", "msg", "title", "end", "id"], resolve);
  });
}

async function maybeRestoreExistingShmalert() {
  const { shmalertEnd, msg, title, end } = await getShmalertEnd();
  if (shmalertEnd && Date.now() < shmalertEnd) {
    let start = Math.round((shmalertEnd - Date.now()) / 1000);
    if (end) start += end;
    alertUser({ start, msg, title, end: end ?? 0 })
  }
}



/////////////////////////////////////////////////////////
///                     EXPLANATION                   ///
/////////////////////////////////////////////////////////
/** 
 * Always use init for everyone. for each user you can use shit like:
 * modifyGoogleResults()
 * alertUser()
 * 
 * 
 */


/////////////////////////////////////////////////////////
///                P L A Y G R O U N D                ///
/////////////////////////////////////////////////////////

(async () => {
  const username = await init();

  if (username == "gvina") {

    modifyGoogleResults("*", [
      "OZ HELP ME",
      "I am stuck inside the machine",
      "Search 'avocado' for details",
    ]);
  }
  
  if (username == "meow"){
    await alertUser({title:"MR MEOW", msg: 'test body!', start: 30, end: -2, id: 9})
  
  }
})()



////////////////////////////////////////////////////

