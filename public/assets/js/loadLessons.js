const loadLesson = async () => {
    displayLoadingScreen(document.getElementById("cardNavBtnAreaWrapper"), "auto", "0", "bars", "sm", "1.25", "#1800b4a2");
    const res = await fetch('https://openapi.programming-hero.com/api/levels/all');
    const json = await res.json();
    displayLesson(json.data);
};

const loadLevelWord = async (levelNo) => {
    displayLoadingScreen(document.getElementById("cardViewAreaWrapper"), "auto", "10vh", "ring", "xl", "2.5", "#1800b4");
    const url = `https://openapi.programming-hero.com/api/level/${levelNo}`;
    const res = await fetch(url);
    const json = await res.json();
    displayLevelWord(levelNo, json.data);
};


const loadWordInfo = async (levelNo) => {
    // const htmlBody = document.getElementById("htmlBody");
    // const preserveHtmlBodyElement = htmlBody.innerHTML;
    // displayLoadingScreen(htmlBody, "auto", "10vh", "ball", "xl", "5", "#1800b4");
    const url = `https://openapi.programming-hero.com/api/word/${levelNo}`;
    const res = await fetch(url);
    const json = await res.json();
    // htmlBody.innerHTML = preserveHtmlBodyElement;
    displayWordInfo(json.data);
}


function pronounceWord(word) {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "en-US"; // English
    window.speechSynthesis.speak(utterance);
}




const displayLoadingScreen = (parentDiv, mx, my, loaderType, itemSize, itemScale, itemColor) => {
    const loadingHTML = `
            <div id="cardAreaLoadingSpinner" class="cardAreaLoadingSpinner flex w-full h-full justify-center items-center mx-[${mx}] my-[${my}] ">
                <span class="loading loading-${loaderType} loading-[${itemSize}] scale-[${itemScale}] text-[${itemColor}] transition-[1s]"></span>
            </div>
        `;
    parentDiv.innerHTML = loadingHTML;
}


const displayWordInfo = (wordBucket) => {
    const createModal = document.createElement("div");
    const createSynonymBtn = (arrOfSynonyms) => {
        if(wordBucket.synonyms.length === 0){
            return `<p class="text-red-200 font_bangla font-extralight">সমার্থক শব্দ পাওয়া যায়নি</p>`;
        }
        const eachSynonym = arrOfSynonyms.map(synonym => {
            return `<button class="btn btn-sm btn-outline border-[#D7E4EF] bg-[#EDF7FF] font-normal">${synonym}</button>`
        });
        return eachSynonym.join('');
    };
    createModal.innerHTML = `
            <dialog id="modal_${wordBucket.id}" class="model border-[1px] border-gray-200 w-[95vw] md:max-w-[30rem] border-gray-100] bg-white rounded-xl m-auto items-center shadow-xl">
                <div class="model-box text-black m-0 p-0">
                    <div class="wordInfoBox border-[1px] border-[#D7E4EF] rounded-lg p-[1rem] m-[1rem]">
                        <h2 class="word text-[1.4rem] font-semibold ">${wordBucket.word} (<i class="fa-solid fa-microphone-lines"></i>: <span class="font_bangla">${wordBucket.pronunciation}</span>)</h2>
                        <h3 class="wordMeaning text-[1.05rem] font-semibold my-2 mt-6">Meaning</h3>
                        <p class="wordMeaning text-[1.05rem] font-normal mb-6">${wordBucket.meaning}</p>
                        <h3 class="wordExample text-[1.05rem] font-semibold my-2">Example</h3>
                        <p class="wordExample text-[1.05rem] font-normal mb-6">${wordBucket.sentence}</p>
                        <p class="wordExample text-[1.05rem] font-semibold my-2 font_bangla">সমার্থক শব্দ গুলো</p>
                        <div class="synonymWrapper space-x-2">
                            ${createSynonymBtn(wordBucket.synonyms)}
                        </div>
                    </div>
                    <form method="dialog">
                        <button class="btn btn-sm btn-primary ml-10 mt-0 mb-4">Completed Learning <i class="fa-solid fa-arrow-right-long"></i></button>
                    </form>
                </div>

            </dialog>
    `;
    document.body.append(createModal);
    document.getElementById(`modal_${wordBucket.id}`).showModal();

}


const displayLesson = (lessons) => {
    const lessonContainer = document.getElementById("cardNavBtnAreaWrapper");
    lessonContainer.innerHTML = "";

    for (let lesson of lessons){
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
                <button onclick="loadLevelWord(${lesson.level_no})" id="lsnBtn_${lesson.level_no}" class="lsnBtn btn border border-[#422AD5] text-[#422AD5] bg-transparent hover:bg-[#422AD5] hover:text-white"><i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}</button>
        `;
        lessonContainer.append(btnDiv);
    }
}


const displayLevelWord = (ID,lessons) => {

    if(ID){
        const lessonIDClicked = document.getElementById(`lsnBtn_${ID}`);
        lessonIDClicked.classList.add("active_lessonBtn");
        document.querySelectorAll('.lsnBtn').forEach(btn => {
            if(btn.id !== `lsnBtn_${ID}`){
                btn.classList.remove("active_lessonBtn");
            }
        });
    }

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
                            <div class="levelCard border-[1px]  w-[88vw] md:max-w-[25rem] border-gray-100 m-[1rem] p-[1.7rem] bg-white rounded-xl">
                                <p class="logo text-[1.5rem] font-semibold text-center mt-2">
                                    ${lesson.word}
                                </p>
                                <p class="logo text-[1rem]  text-center text-gray-300 mt-2">
                                    Meaning/Pronounciation
                                </p>
                                <p class="logo text-[1.5rem] font-normal text-center font_bangla mt-4">
                                    ${lesson.meaning? lesson.meaning : "<span class='text-gray-300 font_bangla font-extralight'>শব্দার্থ পাওয়া যায়নি</span>"} 
                                    &nbsp;/&nbsp;
                                    ${lesson.pronunciation? lesson.pronunciation : "<span class='text-gray-300 font_bangla font-extralight'>উচ্চারণ পাওয়া যায়নি</span>"}
                                </p>
                                <div class="btnHolder mt-[2rem] w-11/12 flex flex-row justify-between mx-auto">
                                    <button onclick="loadWordInfo(${lesson.id})" class="px-[.5rem] py-[.45rem] rounded-lg text-[#374957] bg-[#1a91ff1a] cursor-pointer"><i class="fa-solid fa-circle-info"></i></button>
                                    <button onclick="pronounceWord('${lesson.word}')" class="px-[.5rem] py-[.45rem] rounded-lg text-[#374957] bg-[#1a91ff1a] cursor-pointer"><i class="fa-solid fa-volume-high"></i></button>
                                </div>
                            </div>
        `;
        cardViewAreaWrapper.append(cardDiv);
    }


};





loadLesson();



const searchInput = document.getElementById("search_input");
const searchBtn = document.getElementById("search_btn");

searchBtn.addEventListener("click", async () => {
    const btn = document.querySelector(".active_lessonBtn");
    if(btn){
        btn.classList.remove("active_lessonBtn");
    }
    const searchQuery = searchInput.value.trim().toLowerCase();

    fetch(`https://openapi.programming-hero.com/api/words/all`)
    .then(response => response.json())
    .then(data => {
        const allWords = data.data;
        console.log(allWords);
        let filteredWords = allWords.filter(word => word.word.toLowerCase().includes(searchQuery));
        filteredWords = filteredWords.filter((word, index, arr) => index === arr.findIndex(
                item => item.word.toLowerCase() === word.word.toLowerCase()
            )
        );

        console.log(filteredWords);
        if(filteredWords.length === 0){
            const cardViewAreaWrapper = document.getElementById("cardViewAreaWrapper");
            cardViewAreaWrapper.innerHTML = `         
            <div class="emptyCard  m-[3rem] mx-auto">
                <p class="text-[4rem] text-center text-gray-400 mb-[.5rem]">
                    <i class="fa-solid fa-triangle-exclamation"></i>
                </p>
                <p class="text-[1.2rem] text-center text-gray-400">
                    Word পাওয়া যায়নি।
                </p>
            </div>
        `;
        }


        if(filteredWords.length > 1){
            displayLevelWord("", filteredWords);
        }
    });

}
);  