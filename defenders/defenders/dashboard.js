<script>
const labs = Array.from(document.querySelectorAll('.lab-node'));
let currentIndex = 0;

// Highlight first unlocked lab initially
function highlightLab(index) {
  labs.forEach((lab, i) => {
    lab.style.boxShadow = i === index && lab.dataset.unlocked === "true" 
      ? '0 0 25px #00ffff' 
      : '0 0 0 #000';
  });
}

highlightLab(currentIndex);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if(e.key === "ArrowRight") {
    do {
      currentIndex = (currentIndex + 1) % labs.length;
    } while(labs[currentIndex].dataset.unlocked === "false");
    highlightLab(currentIndex);
  } else if(e.key === "ArrowLeft") {
    do {
      currentIndex = (currentIndex - 1 + labs.length) % labs.length;
    } while(labs[currentIndex].dataset.unlocked === "false");
    highlightLab(currentIndex);
  } else if(e.key === "Enter") {
    const selectedLab = labs[currentIndex];
    if(selectedLab.dataset.unlocked === "true") {
      window.location.href = `lab${selectedLab.dataset.lab}.html`;
    }
  }
});

// Mouse click selection
labs.forEach((lab, i) => {
  lab.addEventListener('click', () => {
    if(lab.dataset.unlocked === "true") {
      window.location.href = `lab${lab.dataset.lab}.html`;
    }
  });
});

// Unlock next lab function (can be called after completing a lab)
function unlockLab(labNumber) {
  const lab = labs.find(l => l.dataset.lab === String(labNumber));
  if(lab) lab.dataset.unlocked = "true";

const surgePopup = document.getElementById("surgePopup");
const closeSurge = document.getElementById("closeSurge");

// Show Surge popup after short delay (feels like a game event)
setTimeout(() => {
  surgePopup.classList.remove("hidden");
}, 3000);

closeSurge.addEventListener("click", () => {
  surgePopup.classList.add("hidden");
});


}
</script>

