const tahta = document.getElementById("tahta")
const bilgi = document.getElementById("bilgi")
const solEtiket = document.getElementById("solToplam")
const sagEtiket = document.getElementById("sagToplam")
const sifirlaBtn = document.getElementById("sifirla")
const durBtn = document.getElementById("dur")

const ogeler = []
let aci = 0
let hedefAci = 0
let hiz = 0
let durakla = false

const yay = 5
const sonum = 3
const hizSiniri = 90
const merkezYakin = 4
const anahtar = "seesaw"

function yuvarla(sayi, basamak) {
  const c = Math.pow(10, basamak)
  return Math.round(sayi * c) / c
}

function rastgeleKg() {
  return Math.floor(Math.random() * 10) + 1
}

function kiloToplamlari() {
  let sol = 0
  let sag = 0
  for (const o of ogeler) {
    if (o.x < 0) sol += o.kg
    else if (o.x > 0) sag += o.kg
  }
  return { sol, sag }
}

function guncelleKiloYazilari() {
  const { sol, sag } = kiloToplamlari()
  solEtiket.textContent = "Sol: " + sol + " kg"
  sagEtiket.textContent = "Sağ: " + sag + " kg"
}

function torkToplamlari() {
  let solT = 0
  let sagT = 0
  for (const o of ogeler) {
    const d = Math.abs(o.x)
    const t = o.kg * d
    if (o.x < 0) solT += t
    else if (o.x > 0) sagT += t
  }
  return { solT, sagT }
}

function guncelleHedefAciTorkla() {
  const { solT, sagT } = torkToplamlari()
  let ham = (sagT - solT) / 10
  if (ham > 30) ham = 30
  if (ham < -30) ham = -30
  hedefAci = ham
}

function kutuEkle(xBoard, kg) {
  const d = document.createElement("div")
  d.className = "kutu"
  d.textContent = kg + " kg"
  d.style.left = xBoard + "px"
  tahta.appendChild(d)
}

function cizOgeler() {
  const eskiler = tahta.querySelectorAll(".kutu")
  eskiler.forEach(el => el.remove())
  const r = tahta.getBoundingClientRect()
  for (const o of ogeler) {
    const xBoard = o.x + r.width / 2
    kutuEkle(xBoard, o.kg)
  }
}

function kaydet() {
  try { localStorage.setItem(anahtar, JSON.stringify({ ogeler })) } catch (_) {}
}

function yukle() {
  try {
    const s = localStorage.getItem(anahtar)
    if (!s) return
    const veri = JSON.parse(s)
    if (!veri || !Array.isArray(veri.ogeler)) return
    ogeler.length = 0
    for (const o of veri.ogeler) {
      if (typeof o.x === "number" && typeof o.kg === "number") ogeler.push({ x: o.x, kg: o.kg })
    }
    cizOgeler()
    guncelleKiloYazilari()
    guncelleHedefAciTorkla()
  } catch (_) {}
}

tahta.addEventListener("click", function (e) {
  if (durakla) { bilgi.textContent = "Duraklatıldı"; return }
  const k = tahta.getBoundingClientRect()
  const merkez = k.left + k.width / 2
  const x = e.clientX - merkez
  if (Math.abs(x) < merkezYakin) {
    bilgi.textContent = "Konum X: 0 px"
    return
  }
  bilgi.textContent = "Konum X: " + yuvarla(x, 1) + " px"
  const kg = rastgeleKg()
  const sol = e.clientX - k.left
  kutuEkle(sol, kg)
  ogeler.push({ x, kg })
  guncelleKiloYazilari()
  guncelleHedefAciTorkla()
  kaydet()
})

if (sifirlaBtn) {
  sifirlaBtn.addEventListener("click", function () {
    const kutular = tahta.querySelectorAll(".kutu")
    kutular.forEach(el => el.remove())
    ogeler.length = 0
    hedefAci = 0
    bilgi.textContent = "Hazır"
    guncelleKiloYazilari()
    try { localStorage.removeItem(anahtar) } catch (_) {}
  })
}

if (durBtn) {
  durBtn.addEventListener("click", function () {
    durakla = !durakla
    durBtn.textContent = durakla ? "Devam" : "Durdur"
    if (!durakla) bilgi.textContent = "Hazır"
  })
}

let once = performance.now()
function dongu(ts) {
  const dtHam = (ts - once) / 1000
  once = ts
  const dt = Math.min(Math.max(dtHam, 0), 0.033)
  if (!durakla) {
    const hata = hedefAci - aci
    hiz += yay * hata * dt
    hiz *= Math.exp(-sonum * dt)
    if (hiz > hizSiniri) hiz = hizSiniri
    if (hiz < -hizSiniri) hiz = -hizSiniri
    aci += hiz * dt
    tahta.style.transform = "rotate(" + aci + "deg)"
  }
  requestAnimationFrame(dongu)
}

window.addEventListener("resize", function () {
  cizOgeler()
})

yukle()
requestAnimationFrame(dongu)
