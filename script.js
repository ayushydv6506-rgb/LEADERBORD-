let oldRanks = JSON.parse(localStorage.getItem("ranks")) || {};

let players = [
  { name: "ayushi ", uid: "2590394042", match: 00, kill: 00 },
  { name: "amaira ", uid: "124534478", match: 00, kill: 00 },
  { name: "ATG GAMING? ", uid: "3728664580", match: 1, kill: 00 },
  { name: "Draco ", uid: "1923775742", match: 1, kill: 00 },
  { name: "Spy cosmic ", uid: "1413442309", match: 1, kill: 1 },
  { name: "Mr ADI ff ", uid: "2910579969", match: 1, kill: 4 },
  { name: "DSG YT ", uid: "2033761543", match: 1, kill: 5 },
  { name: "appu,firepla ", uid: "5682810292", match: 1, kill: 1 },
  { name: "RED X ", uid: "774849973", match: 1, kill: 00 },
  { name: "xt BRUZZ ", uid: "2080156930", match: 1, kill: 1 },
  { name: "ZytraX ", uid: "9793966590", match: 1, kill: 00 },
 { name: "AFM.GOKU ", uid: "1853617010", match: 1, kill: 1 },
   { name: "ALIS_PATEL ", uid: "682784631", match: 1, kill: 00 },
   { name: "JETHALAL ", uid: "1585376913", match: 1, kill: 00 },
   { name: "BABURAW ", uid: "1994185859", match: 1, kill: 00 },
   { name: "ARYAN ", uid: "2047025180", match: 1, kill: 4 },
   { name: "KRISH ", uid: "2577483873", match: 1, kill: 00 },
   { name: "X-MN-GOKU ", uid: "3519349307", match: 1, kill: 00 },
    { name: "X-MN-KRISHANA ", uid: "6300153695", match: 1, kill: 00 },
    { name: "VIP SOYEB ", uid: "1309573077", match: 1, kill: 00 },
    { name: "PRIMEZIX ", uid: "2344280550", match: 1, kill: 00 },
    { name: "BOOS ACE ", uid: "2427525293", match: 1, kill: 00 },
    { name: "ZG ABA ", uid: "2724611100", match: 1, kill: 00 },
    { name: "rabisah5930b ", uid: "920869158", match: 1, kill: 1 },
    { name: "fearexx", uid: "728573013", match: 1, kill: 1 },
    { name: "ARMAN ", uid: "12567291872", match: 1, kill: 00 },
    { name: "SHIVAM ", uid: "11918428075", match: 1, kill: 1 },
    { name: "PRAJYOT ", uid: "10412948101", match: 1, kill: 00 },
    { name: "JAYES ", uid: "2973008926", match: 1, kill: 00 },
    { name: "wl tejas ", uid: "2346189379", match: 1, kill: 1 },
    { name: "2077 pranshu ", uid: "2286714822", match: 1, kill: 00 },
    { name: "ALONE GIRL 2 ", uid: "1645490928", match: 1, kill: 00 },
    { name: "inosuken ", uid: "3815244155", match: 1, kill: 00 },
    { name: "GAMERFURQUAN ", uid: "8507554961", match: 1, kill: 00 },
    { name: "LEVI ", uid: "12972466773", match: 1, kill: 2 },
    { name: "4BXFLUXO ", uid: "", match: 1, kill: 00 },
    { name: " ", uid: "", match: 00, kill: 00 },
    { name: " ", uid: "", match: 00, kill: 00 },
      
  
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
