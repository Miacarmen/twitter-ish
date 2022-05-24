const usernames = [
    'KingofHearts',
    'QueenofHearts',
    'JackofHearts',
    'KingofSpades',
    'QueenofSpades',
    'JackofSpades',
    'KingofDiamonds',
    'QueenofDiamonds',
    'JackofDiamonds',
    'KingofClubs',
    'QueenofClubs',
    'JackofClubs',
    'Joker'
];

const emails = [
    'kingofhearts@hotmail.com',
    'queenofhearts@hotmail.com',
    'jackofhearts@hotmail.com',
    'kingofspades@yahoo.com',
    'queenofspades@yahoo.com',
    'jackofspades@yahoo.com',
    'kingofdiamonds@gmail.com',
    'queenofdiamonds@gmail.com',
    'jackofdiamonds@gmail.com',
    'kingofclubs@comcast.com',
    'queenofclubs@comcast.com',
    'jackofclubs@comcast.com',
    'joker@joking.com'
];

const thoughts = [
    'Not trying to brag or anything, but I can wake up without an alarm clock now simply due to my crippling and overwhelming anxiety, so...',
    ' I only have two emotions: exhaustion and stress. And I’m somehow always feeling both simultaneously.',
    'I scare people a lot because I walk very softly and they don\'t hear me enter rooms. So when they turn around, I\'m just kind of there and their fear fuels me.',
    'I just found out that humans are capable of fitting a light bulb into their mouth with ease but can’t take it out without shattering it, and now I have to physically restrain myself from putting a light bulb in my mouth',
    'Well, needless to say. Uh-oh Spaghetti-os.',
    'I’m sorry, I really flew off the handle back there. It was like the handle was a bald guy going really fast, and I was his toupée.',
    'Well, well, well, if it isn\'t the consequences of my actions.',
    'What can therapy do for me that screaming in my car for 30 minutes can\'t?',
    'Forgive me Father, for I have sinny-sin-sinned.',
    'I would do anything for money.',
    'Arson? Oh, you mean "crime brûlée".',
    'I don’t think the therapist is supposed to say ‘wow’ that many times during their first session with a client, but here we are.',
    '"What are you into?" is such a broad question, like do I reply with a TV series or choking?',
    'I was born for politics. I have great hair and I love lying.'
];

const reactions = [
    'Wow!',
    'Cool!',
    'Nice!',
    'Dope!',
    'Rad!',
    'Smart!',
    'Totally!',
    'Agreed!',
    'So true!',
    'IDK about that...',
    'IDK...',
    'Yikes...',
    'Tell me more!',
    'Me too!',
    'Gonna have to disagree.',
    'Too funny!',
    'Wow you so pretty! Be my wife'
];

// get a random array item
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// get a random thought from thoughts array
const getRandomThought = () => `${getRandomArrItem(thoughts)}`;

// get a random reaction from reactions array to add to reaction obj
const getRandomReaction = (int) => {
    const results = [];
    for(let i = 0; i < int; i++) {
        results.push({
            reactionBody: getRandomArrItem(reactions)
        });
    }
    return results;
}

// export functions to use in seed.js
module.exports = { getRandomThought, getRandomReaction };