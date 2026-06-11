const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("keyup", () => {

    const value = searchInput.value.toLowerCase();

    const cards = document.querySelectorAll(".employee-card");

    cards.forEach(card => {

        const text = card.textContent.toLowerCase();

        if(text.includes(value)){
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }

    });

});