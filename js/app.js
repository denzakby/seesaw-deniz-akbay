const tahta = document.getElementById("tahta")
const bilgi = document.getElementById("bilgi")
const solEtiket = document.getElementById("solToplam")
const sagEtiket = document.getElementById("sagToplam")

const ogeler = []

function yuvarla(sayi, basamak) {
  const c = Math.pow(10, basamak)
  return Math.round(sayi * c) / c
}

function rastgeleKg() {
  return Math.floor(Math.random() * 10) + 1
}

function guncelleToplam() {
  let sol = 0
  let sag = 0
  for (const o of ogeler) {
    if (o.x < 0) sol += o.kg
    else if (o.x > 0) sag += o.kg
  }
  solEtiket.textContent = "Sol: " + sol + " kg"
  sagEtiket.textContent = "Sağ: " + sag + " kg"
}

tahta.addEventListener("click", function (e) {
  const k = tahta.getBoundingClientRect()
  const merkez = k.left + k.width / 2
  const x = e.clientX - merkez
  bilgi.textContent = "Konum X: " + yuvarla(x, 1) + " px"

  const kg = rastgeleKg()
  const sol = e.clientX - k.left
  const d = document.createElement("div")
  d.className = "kutu"
  d.textContent = kg + " kg"
  d.style.left = sol + "px"
  tahta.appendChild(d)

  ogeler.push({ x, kg })
  guncelleToplam()
})

guncelleToplam()
