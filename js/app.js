const tahta = document.getElementById("tahta")
const bilgi = document.getElementById("bilgi")

function yuvarla(sayi, basamak) {
  const c = Math.pow(10, basamak)
  return Math.round(sayi * c) / c
}

tahta.addEventListener("click", function (e) {
  const k = tahta.getBoundingClientRect()
  const merkez = k.left + k.width / 2
  const x = e.clientX - merkez
  bilgi.textContent = "Konum X: " + yuvarla(x, 1) + " px"
})
