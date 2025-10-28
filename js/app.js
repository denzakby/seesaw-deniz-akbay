const tahta = document.getElementById("tahta")
const bilgi = document.getElementById("bilgi")
const solEtiket = document.getElementById("solToplam")
const sagEtiket = document.getElementById("sagToplam")

const ogeler = []
let aci = 0
let hedefAci = 0
let hiz = 0

const yay = 5
const sonum = 3
const hizSiniri = 90
const olcekDegeri = 3
const merkezYakin = 4

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

function guncelleHedefAciKiloFarkiyla() {
  const { sol, sag } = kiloToplamlari()
  const fark = sag - sol
  let ham = fark * olcekDegeri
  if (ham > 30) ham = 30
  if (ham < -30) ham = -30
  hedefAci = ham
}

tahta.addEventListener("click", function (e) {
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
  const d = document.createElement("div")
  d.className = "kutu"
  d.textContent = kg + " kg"
  d.style.left = sol + "px"
  tahta.appendChild(d)

  ogeler.push({ x, kg })
  guncelleKiloYazilari()
  guncelleHedefAciKiloFarkiyla()
})

let once = performance.now()
function dongu(ts) {
  const dtHam = (ts - once) / 1000
  once = ts
  const dt = Math.min(Math.max(dtHam, 0), 0.033)

  const hata = hedefAci - aci
  hiz += yay * hata * dt
  hiz *= Math.exp(-sonum * dt)
  if (hiz > hizSiniri) hiz = hizSiniri
  if (hiz < -hizSiniri) hiz = -hizSiniri
  aci += hiz * dt

  tahta.style.transform = "rotate(" + aci + "deg)"
  requestAnimationFrame(dongu)
}

guncelleKiloYazilari()
guncelleHedefAciKiloFarkiyla()
requestAnimationFrame(dongu)
