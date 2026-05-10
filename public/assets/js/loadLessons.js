const loadLesson = () => {
    fetch('https://openapi.programming-hero.com/api/levels/all')
        .then((res) => res.json())
        .then((json) => displayLesson(json.data));
};

const loadLevelWord = (levelNo) => {
    const url = `https://openapi.programming-hero.com/api/level/${levelNo}`;
    fetch(url)
        .then((res) => res.json())
        .then((json) => displayLevelWord(levelNo, json.data));
        
}


const displayLesson = (lessons) => {
    const lessonContainer = document.getElementById("cardNavBtnAreaWrapper");
    lessonContainer.innerHTML = "";

    for (let lesson of lessons){
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
                <button onclick="loadLevelWord(${lesson.level_no})" id="lsnBtn${lesson.level_no}" class="btn border border-[#422AD5] text-[#422AD5] bg-transparent hover:bg-[#422AD5] hover:text-white"><i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}</button>
        `;
        lessonContainer.append(btnDiv);
    }
}

const displayLevelWord = (ID,lessons) => {
    const lessonIDClicked = document.getElementById(`lsnBtn${ID}`);
    lessonIDClicked.style.backgroundColor = '#422AD5';
    lessonIDClicked.style.color = 'white';
    document.querySelectorAll('.btn').forEach(btn => {
        if(btn.id !== `lsnBtn${ID}`){
            btn.style.backgroundColor = 'transparent';
            btn.style.color = '#422AD5';
        }
    });
    const cardViewAreaWrapper = document.getElementById("cardViewAreaWrapper");
    cardViewAreaWrapper.innerHTML = "";

    if(lessons.length === 0){
        cardViewAreaWrapper.innerHTML = `
            <div class="emptyCard  m-[3rem] mx-auto">
                <p class="text-[4rem] text-center text-gray-400 mb-[.5rem]">
                    <i class="fa-solid fa-triangle-exclamation"></i>
                </p>
                <p class="text-[1.2rem] text-center text-gray-400">
                    এই Lesson এ কোন Vocabulary যুক্ত করা হয়নি।
                </p>
            </div>
        `;
    }

    for (let lesson of lessons){
        const cardDiv = document.createElement("div");
        cardDiv.innerHTML = `
                            <div class="levelCard border-[1px]  w-[90vw] md:max-w-[25rem] border-gray-100 m-[1rem] p-[1.7rem] bg-white rounded-xl">
                                <p class="logo text-[1.5rem] font-semibold text-center mt-2">
                                    ${lesson.word}
                                </p>
                                <p class="logo text-[1.1rem]  text-center text-gray-300">
                                    Meaning /Pronounciation
                                </p>
                                <p class="logo text-[1.5rem] font-semibold text-center font_bangla mt-4">
                                    "${lesson.meaning} / ${lesson.pronunciation}"
                                </p>
                                <div class="btnHolder mt-[2rem] w-11/12 flex flex-row justify-between mx-auto">
                                    <button class="px-[.5rem] py-[.45rem] rounded-lg text-[#374957] bg-[#1a91ff1a] cursor-pointer"><i class="fa-solid fa-circle-info"></i></button>
                                    <button class="px-[.5rem] py-[.45rem] rounded-lg text-[#374957] bg-[#1a91ff1a] cursor-pointer"><i class="fa-solid fa-volume-high"></i></button>
                                </div>
                            </div>
        `;
        cardViewAreaWrapper.append(cardDiv);
    }
};


loadLesson();