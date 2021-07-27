// Задание 1
const delay = ms => {
    const promise = new Promise(resolve => {
        setTimeout(() => {
            resolve(ms);
        }, ms);
    });

    return promise;
};

const logger = time => console.log(`Fulfilled after ${time}ms`);

// Tests
delay(2000).then(logger); // Fulfilled after 2000ms
delay(1000).then(logger); // Fulfilled after 1000ms
delay(1500).then(logger); // Fulfilled after 1500ms

// Задание 2
const users = [
    { name: 'Mango', active: true },
    { name: 'Poly', active: false },
    { name: 'Ajax', active: false },
];

const toggleUserState = (allUsers, username) => {
    const promise = new Promise(resolve => {
        resolve(
            allUsers.map(user => (user.name === username ? {...user, active: !user.active } : user)),
        );
    });

    return promise;
};

toggleUserState(users, 'Mango').then(console.table);
toggleUserState(users, 'Ajax').then(console.table);

// Задание 3
const randomIntegerFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

const makeTransaction = transaction => {
    const delay = randomIntegerFromInterval(200, 500);

    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            const canProcess = Math.random() > 0.3;
            if (canProcess) {
                resolve({ id: transaction.id, time: delay });
            } else {
                reject(transaction.id);
            }
        }, delay);
    });

    return promise;
};

const logSuccess = ({ id, time }) => {
    console.log(`Transaction ${id} processed in ${time}ms`);
};

const logError = id => {
    console.warn(`Error processing transaction ${id}. Please try again later.`);
};

makeTransaction({ id: 70, amount: 150 }).then(logSuccess).catch(logError);
makeTransaction({ id: 71, amount: 230 }).then(logSuccess).catch(logError);