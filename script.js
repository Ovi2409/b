
const memories = [
    {
        title: "1st Fantasy ",
        image: "./good.jpg",
        note: "Jan, Ami EVAbe khabo tomar  boro dudu gulo 🥵"
    },
    {
        title: "2nd Fantasy ",
        image: "./yoo.gif",
        note: "Dekho koto shundor dhukteche babu emne  tumio korbe ,,,,,🥵."
    },
    {
        title: "3rd Fantasy ",
        image: "./gu.jpg",
        note: "Jan heel to anchoooooooo 🥵"},
    {
        title: "4th Fantasy ",
        image: "./du.jpg",
        note: "yessssssssssssssssssssssssssssssssssssssss 🥵"
    },
    {
        title: "5th Fantasy ",
        image: "./nu.jpg",
        note: "Asho na amne chuudiiiiiiiiiii...🥵"
    },
    {
        title: "6th Fantasy ",
        image: "./cu.jpg",
        note: "amne khaawaba jan ."
    },
    {
        title: "7th Fantasy ",
        image: "shei.gif",
        note: "needd jannnnnnnnnnnnnnnnnnnnnn,,,,Ahhhhhhhahhhhhhahhhh tmr face ta ufffffff  ."
    },
    {
        title: "Forever Us 💍",
        image: "./tutu.gif",
        note: "Amne chudbo tmk ,,tmr mukhe mal felbo chudeeeeeeeeeeeeeeeeeeeee,,,,,,,,,,, yeaaaaaaaaaaaaa"
    }
];

let currentIndex = 0;

const photoGrid = document.getElementById("photoGrid");
const modal = document.getElementById("photoModal");

// Open Gallery
function openGallery() {
    document.getElementById("cover").style.display = "none";
    document.getElementById("gallery").style.display = "block";
}

// Back to Cover
function backToCover() {
    document.getElementById("gallery").style.display = "none";
    document.getElementById("cover").style.display = "flex";
}

// Display Photos
function displayPhotos() {
    photoGrid.innerHTML = "";

    memories.forEach((memory, index) => {
        const card = document.createElement("div");
        card.className = "photo-card";

        const img = document.createElement("img");
        img.src = memory.image;
        img.alt = memory.title;

        img.onerror = function() {
            this.style.display = "none";
            card.style.background = "#ffe0eb";
            card.style.minHeight = "190px";

            if (!card.querySelector(".placeholder")) {
                const placeholder = document.createElement("div");
                placeholder.className = "placeholder";
                placeholder.textContent = "🌸📷";
                placeholder.style.fontSize = "45px";
                placeholder.style.textAlign = "center";
                placeholder.style.padding = "55px 0";
                card.insertBefore(placeholder, card.firstChild);
            }
        };

        const title = document.createElement("h3");
        title.textContent = memory.title;

        const text = document.createElement("p");
        text.textContent = "Click to open ♡";

        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(text);

        card.addEventListener("click", () => {
            showPhoto(index);
        });

        photoGrid.appendChild(card);
    });
}

// Open Single Photo
function showPhoto(index) {
    currentIndex = index;

    const memory = memories[currentIndex];

    document.getElementById("modalImage").src = memory.image;
    document.getElementById("modalTitle").textContent = memory.title;
    document.getElementById("modalNote").textContent = memory.note;

    modal.classList.add("active");
}

// Next / Previous
function changePhoto(direction) {
    currentIndex += direction;

    if (currentIndex >= memories.length) {
        currentIndex = 0;
    }

    if (currentIndex < 0) {
        currentIndex = memories.length - 1;
    }

    showPhoto(currentIndex);
}

// Close Popup
function closeModal() {
    modal.classList.remove("active");
}

// Click outside to close
modal.addEventListener("click", function(event) {
    if (event.target === modal) {
        closeModal();
    }
});

// Upload Photos
document.getElementById("photoUpload").addEventListener("change", function(event) {
    const files = Array.from(event.target.files);

    if (files.length > 8) {
        alert("Please select maximum 8 photos! ❤️");
        this.value = "";
        return;
    }

    if (files.length === 0) return;

    memories.forEach(memory => {
        if (memory.image.startsWith("blob:")) {
            URL.revokeObjectURL(memory.image);
        }
    });

    files.forEach((file, index) => {
        memories[index].image = URL.createObjectURL(file);
    });

    displayPhotos();

    alert(files.length + " photos added successfully! ❤️");

    this.value = "";
});

// Keyboard Controls
document.addEventListener("keydown", function(event) {
    if (!modal.classList.contains("active")) return;

    if (event.key === "ArrowRight") {
        changePhoto(1);
    }

    if (event.key === "ArrowLeft") {
        changePhoto(-1);
    }

    if (event.key === "Escape") {
        closeModal();
    }
});

// Start
displayPhotos();
