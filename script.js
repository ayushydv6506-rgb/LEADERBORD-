let oldRanks = JSON.parse(localStorage.getItem("ranks")) || {};

let players = [
  { name: "Team ", uid: "0000000", match: 00, kill: 00 },
  { name: "Team ", uid: "0000000", match: 00, kill: 00 },
  { name: "Team ", uid: "0000000", match: 00, kill: 00 },
  { name: "Team ", uid: "0000000", match: 00, kill: 00 },
  { name: "Team ", uid: "0000000", match: 00, kill: 00 },
  { name: "Team ", uid: "0000000", match: 00, kill: 00 },
  { name: "Team ", uid: "0000000", match: 00, kill: 00 },
  { name: "Team ", uid: "0000000", match: 00, kill: 00 },

];

document.getElementById("count").innerText =
"Total Players: " + players.length;

// 🔥 SORT (highest kill first)
players.sort((a,b)=>{
  if(b.kill === a.kill){
    return b.match - a.match;
  }
  return b.kill - a.kill;
});

// 🏆 TOP 3 (box me)
let top3 = document.getElementById("top3");
top3.innerHTML = "";

let medal = ["🥇","🥈","🥉"];

players.slice(0,3).forEach((p,i)=>{
  top3.innerHTML += `
    <div class="mvp">
      <h2>${medal[i] || "#"+(i+1)}</h2>
      <img src="p${i+1}.jpg">
      <p><b>Name:</b> ${p.name}</p>
      <p><b>UID:</b> ${p.uid}</p>
      <p><b>Total Match:</b> ${p.match}</p>
      <p><b>Total Kill:</b> ${p.kill}</p>
    </div>
  `;
});

// 📊 TABLE (4 se aage sab)
let table = document.getElementById("table");

table.innerHTML = `
<tr>
  <th>S.No</th>
  <th>Name</th>
  <th>UID</th>
  <th>Match</th>
  <th>Total Kill</th>
</tr>`;

// 👉 yaha se 4th se sab add hoga
players.slice(3).forEach((p,i)=>{
  table.innerHTML += `
    <tr>
      <td>
  ${i+4}
  ${
    oldRanks[p.uid] > (i+4)
      ? "<span class='up'> ▲</span>"
      : oldRanks[p.uid] < (i+4)
      ? "<span class='down'> 🔻</span>"
      : ""
  }
      </td>

      <td>${p.name}</td>

      <td onclick="copyUID('${p.uid}')" style="cursor:pointer;">
        ${p.uid} 📋
      </td>

      <td>${p.match}</td>
      <td>${p.kill}</td>
    </tr>
  `;
});

function searchPlayer() {
  let input = document.getElementById("search").value.toLowerCase();
  let rows = document.querySelectorAll("#table tr");
  let found = false;

  rows.forEach((row, index) => {
    if (index === 0) return;

    let text = row.innerText.toLowerCase();

    // reset highlight
    row.innerHTML = row.innerHTML.replace(/<span class="highlight">(.*?)<\/span>/g, "$1");

    if (text.includes(input)) {
      row.style.display = "";
      found = true;

      // highlight
      let cells = row.querySelectorAll("td");
      cells.forEach(cell => {
        let val = cell.innerText;
        let lower = val.toLowerCase();

        if (lower.includes(input) && input !== "") {
          let regex = new RegExp(`(${input})`, "gi");
          cell.innerHTML = val.replace(regex, `<span class="highlight">$1</span>`);
        }
      });

    } else {
      row.style.display = "none";
    }
  });

  // no result
  document.getElementById("noResult").style.display = found ? "none" : "block";
}

function copyUID(uid){
  navigator.clipboard.writeText(uid);
  alert("UID copied: " + uid);
}

let newRanks = {};

players.forEach((p,i)=>{
  newRanks[p.uid] = i+1;
});

localStorage.setItem("ranks", JSON.stringify(newRanks));
