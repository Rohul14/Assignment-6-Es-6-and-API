const adoptPet = (adoptId) => {
    console.log(adoptId);
    const adoptSuccess = document.getElementById('adopt');
    const bgAdopt = document.getElementById('bgAdopt');
    
    // Disable adopt button after first click
    document.getElementById(`btn-${adoptId}`).setAttribute('disabled', true);//

    // Ensure visibility by forcing a repaint
    bgAdopt.classList.remove('hidden');
    void bgAdopt.offsetWidth; // Force browser reflow/repaint
    bgAdopt.classList.add('opacity-60');

    adoptSuccess.classList.remove('hidden');

    adoptSuccess.innerHTML = `
        <div class="text-center p-20">
            <img class="w-24 mx-auto" src="images/hand-shake.png" alt="">
            <h1 class="text-2xl font-black font-mono">Congrats</h1>
            <p>Adoption Process Is Start For Your Pet</p>
            <p id="time" class="text-4xl font-black">3</p>
        </div>
    `;

    // Countdown timer
    const time = document.getElementById('time');
    let num = 3;
    const id = setInterval(() => {
        num--;
        time.innerText = `${num}`;
        if (num === 1) {
            clearInterval(id);
        }
    }, 1000);

    // Hide modal after completion
    modalHidden();
};

const modalHidden = () => {
    const adoptSuccess = document.getElementById('adopt');
    const bgAdopt = document.getElementById('bgAdopt');
    setTimeout(() => {
        bgAdopt.classList.add('hidden');
        adoptSuccess.classList.add('hidden');
    }, 3000);
};
