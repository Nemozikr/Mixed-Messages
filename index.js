const words = ['a', 'an', 'apple', 'banana', 'boom', 'cucumber', 'commander', 'delta', 'delicious', 'ecstatic', 'ecosystem', 'fun', 'function', 'facts', 'greasy', 'girlie', 'Himalayas', 'hermit', 'haram', 'halal', 'hello', 'hi', 'hippopotomonstrosesquippedaliophobia', 'hippo', 'huge', 'hehe', 'her', 'his', 'him', 'hersheys', 'invoice', 'invitation', 'invoke', 'illegal', 'irregular', 'Instagram', 'Joker', 'joke', 'jazz',  'jungle', 'key', 'kitten', 'kebab', 'kick', 'kaleidoscopical', 'L', 'loser', 'lacking', 'labour', 'labouriousnessess', 'lobotomy', 'lobotomisations', 'my', 'me', 'mad', 'man', 'macaron', 'madman', 'maggot', 'macrolinguistic', 'no', 'Nero', 'nerd', 'nap', 'naan', 'nachos', 'narrow', 'nasty', 'names', 'name', 'naive', 'oh', 'of', 'oak', 'oath', 'oat', 'oasis', 'object', 'obliviousness', 'omg', /*p*/ 'play', 'pluck', 'packing', 'packs', /*t*/'turrets' /*p*/, 'pneumonoultramicroscopicsilicovolcanoconiosis'];
const starts = ['a', 'an', 'and', 'is', 'the', 'of', 'it', 'what'];
const punct = [".", ",", "!", "?", "!?"];
const vowels = ['a', 'e', 'i', 'o', 'u'];
let message = [];
let savedMixedMessages = [];
sentence = '';

const paragraph = document.getElementById('mixMessageInput');
const savedMessageField = document.getElementById('savedMessages');
const saveButton = document.getElementById('saveMessage');
const clearButton = document.getElementById('clearSaved');

function updateHTML() {
    paragraph.innerHTML = sentence;
}

function randomSize(max = 10, min = 1) {
    return  Math.floor(Math.random() * max) + min;
}

function randomArr(arr) {
    return  Math.floor(Math.random() * arr.length);
}

function randomConnective() {
    return starts[randomArr(starts)];
}

function randomPunct() {
    return punct[randomArr(punct)];
}

function randomWord() {
    return words[randomArr(words)];
}

function makePhrase(num = randomSize()) {
    sentence = (`${randomConnective()} ${makeMessage(num)}${randomPunct()}`);
    //console.log(sentence);
    sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1);
    updateHTML();
    return sentence;
}

function makeMessage(count) {
    while(message.length < count) {
        let word = randomWord();
        if (message.indexOf(word) === -1) {
            message.push(word);
        }
    }
    return message.join(" ");
}

function grammarCheck() {
    let temp = sentence.split(' ');
    let i = 0;
    //console.log(temp[1]) // second word
    temp.forEach((word) => {
        //console.log(`words in sentence: ${word}`)
        if (word === 'A' || word === 'An')
        {
            //console.log(`A or An at index ${i}`)
            vowels.forEach(vowel => {
                //console.log(temp);
                let firstLetterOfSecondWord = temp[i + 1].charAt(0);
                //console.log(`first letter of 2nd word: ${firstLetterOfSecondWord}`);
                if (firstLetterOfSecondWord.toLowerCase() === vowel) {
                    temp[i] = 'An';
                    //console.log(`The letter is a vowel!`);
                } else if (firstLetterOfSecondWord.toLowerCase() !== vowel) {
                    temp[i] = 'A';
                    //console.log(`The letter is not a vowel.`);
                } else {
                    throw Error("Error at grammar check on vowels, what did you do?");
                }
            })
        }
        i++;
    })
    //console.log(temp)
    sentence = temp.join(" ");
    updateHTML();
    return sentence;
}
makePhrase();
grammarCheck();

//browser functionality down there


function retrieveSaved() {
    console.log('retrieveSaved() is invoked');

    // Retrieve and parse the data from localStorage
    savedMixedMessages = JSON.parse(localStorage.getItem('mixed')) || [];

    // Ensure it's a flat array
    if (!Array.isArray(savedMixedMessages)) {
        console.warn('Invalid data in localStorage, resetting to an empty array.');
        savedMixedMessages = [];
    }

    // Create a string with sentences separated by newlines
    let displayText = savedMixedMessages.join('<br>');

    // Display the text in the desired field
    savedMessageField.innerHTML = displayText;

    // Log each sentence for debugging
    savedMixedMessages.forEach((part, index) => {
        console.log(`Sentence ${index + 1}: ${part}`);
    });
}

function saveMessages() {
    console.log('saveMessages() is invoked');
    if (!sentence) {
        console.log('No sentence to save');
        return;
    }

    if (savedMixedMessages.length > 0) {
        console.log('Mixed messages exist locally');

        // Check for duplicates
        if (savedMixedMessages.includes(sentence)) {
            console.log('It already exists');
            return 'It already exists';
        } else {
            console.log('Sentence added!');
            savedMixedMessages.push(sentence);
        }
    } else {
        console.log('First sentence added!');
        savedMixedMessages.push(sentence);
        console.log(savedMixedMessages);
    }

    // Save updated messages to localStorage
    localStorage.setItem('mixed', JSON.stringify(savedMixedMessages));
    retrieveSaved();
}

function clearSavedMessages() {
    console.log('clearSavedMessages() is invoked');

    // Remove the data from localStorage
    localStorage.removeItem('mixed');

    // Reset the UI
    savedMixedMessages = [];
    savedMessageField.textContent = '';

    console.log('All saved messages cleared.');
}

// Event Listeners
saveButton.addEventListener('click', saveMessages);
clearButton.addEventListener('click', clearSavedMessages);

// Initial Load
retrieveSaved();
