var urlResult = [];
async function fetchAndCheckWord(url) {
    try {
        const wordToCheck = 'dp-300';
        const response = await fetch(url);
        const text = await response.text();

        if (text.includes(wordToCheck)) {
            const parser = new DOMParser();
            const doc = parser.parseFromString(text, 'text/html');

            const links = doc.querySelectorAll('a.discussion-link');
            for (let i = 0; i < links.length; i++) {
                const link = links[i];
                if (link.href.includes(wordToCheck)) {
                    urlResult.push(`https://www.examtopics.com${link.getAttribute('href')}`)
                }
            }
        }
    } catch (error) {
        console.error(error);
    }
}


for (let index = 1; index <= 1205; index++) {
    console.log(`page ${index}`);
    await fetchAndCheckWord(`https://www.examtopics.com/discussions/microsoft/${index}`);
}


//sort by topic
const urls = [
    "https://www.examtopics.com//discussions/microsoft/view/48387-exam-dp-300-topic-2-question-18-discussion/",
    "https://www.examtopics.com//discussions/microsoft/view/25248-exam-dp-300-topic-1-question-5-discussion/",
    "https://www.examtopics.com//discussions/microsoft/view/48421-exam-dp-300-topic-6-question-14-discussion/",
    "https://www.examtopics.com//discussions/microsoft/view/36992-exam-dp-300-topic-6-question-7-discussion/",
    "https://www.examtopics.com//discussions/microsoft/view/44487-exam-dp-300-topic-6-question-6-discussion/",
    "https://www.examtopics.com//discussions/microsoft/view/41948-exam-dp-300-topic-1-question-1-discussion/",
    "https://www.examtopics.com//discussions/microsoft/view/65415-exam-dp-300-topic-15-question-2-discussion/",
    "https://www.examtopics.com//discussions/microsoft/view/39365-exam-dp-300-topic-5-question-18-discussion/",
    "https://www.examtopics.com//discussions/microsoft/view/55028-exam-dp-300-topic-4-question-8-discussion/",
    "https://www.examtopics.com//discussions/microsoft/view/62149-exam-dp-300-topic-1-question-31-discussion/",
    "https://www.examtopics.com//discussions/microsoft/view/30607-exam-dp-300-topic-4-question-3-discussion/",
    "https://www.examtopics.com//discussions/microsoft/view/30419-exam-dp-300-topic-2-question-3-discussion/",
    "https://www.examtopics.com//discussions/microsoft/view/62584-exam-dp-300-topic-4-question-14-discussion/",
    "https://www.examtopics.com//discussions/microsoft/view/66162-exam-dp-300-topic-2-question-12-discussion/"
];

// Define a regular expression to match the topic-number and question-number in the URLs
const regex = /topic-(\d+)-question-(\d+)/;

// Map the URLs to objects containing the URL and the extracted topic-number and question-number
const mappedUrls = urls.map(url => {
    const match = url.match(regex);
    return {
        url,
        topic: match[1],
        question: match[2]
    };
});

// Sort the objects based on the topic-number and then by the question-number in ascending order
mappedUrls.sort((a, b) => {
    if (a.topic !== b.topic) {
        return a.topic - b.topic;
    } else {
        return a.question - b.question;
    }
});

// Extract the sorted URLs from the objects and put them in a new array
const sortedUrls = mappedUrls.map(obj => obj.url);

console.log(sortedUrls);
