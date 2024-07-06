document.getElementById("show-ai").addEventListener("click", function () {
    loadData();
});

const loadData = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/ai/tools");
    const data = await res.json();
    const aiTools = data.data.tools;
    displayAiTools(aiTools);
}

const displayAiTools = (aiTools) => {

    // showing limited cards
    if (aiTools.length > 6) {
        const showAllContainer = document.getElementById("show-all-container");
        showAllContainer.classList.remove("hidden");
    } else {
        const showAllContainer = document.getElementById("show-all-container");
        showAllContainer.classList.add("hidden");
    }
    aiTools = aiTools.slice(0, 6);

    const aiContainer = document.getElementById("ai-container");
    for (const ai of aiTools) {
        const div = document.createElement("div");
        // handling features
        const features = [];
        for (let i = 0; i < ai.features.length; i++) {
            features.push(i + 1 + ". " + ai.features[i]);
        }

        div.innerHTML = `
            <figure class="px-7 pt-7">
                <img
                src="${ai.image}"
                alt="AI"
                class="rounded-xl" />
            </figure>

            <div class="card-body">
                <h2 class="card-title">${ai.name}</h2>
                <hr>
                <div>
                    <h3 class="text-lg font-semibold">Features</h3>
                    <div id="features-container">
                        ${features}
                    </div>
                </div>
                <div class="card-actions">
                    <button class="btn btn-primary">Buy Now</button>
                </div>
            </div>
        `;
        div.classList = "card bg-base-100 w-96 shadow-xl";

        aiContainer.appendChild(div);
    }
}