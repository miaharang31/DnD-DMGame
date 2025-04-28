async function submitCharacter(event: Event) {
    event.preventDefault();
    
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const character = {
        name: formData.get("name"),
        level: Number(formData.get("level")),
        userid: Number(formData.get("userid")),
        abilityScores: {
            strength: Number(formData.get("strength")),
            dexterity: Number(formData.get("dexterity")),
            constitution: Number(formData.get("constitution")),
            intelligence: Number(formData.get("intelligence")),
            wisdom: Number(formData.get("wisdom")),
            charisma: Number(formData.get("charisma")),
        },
        race: formData.get("race"),
        class: formData.get("class"),
        background: formData.get("background"),
        alignment: formData.get("alignment"),
    };

    const response = await fetch("/api/characters", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(character),
    });

    if (response.ok) {
        alert("Character created successfully!");
        form.reset();
    } else {
        alert("Failed to create character.");
    }
}

document.getElementById("characterForm")?.addEventListener("submit", submitCharacter);
