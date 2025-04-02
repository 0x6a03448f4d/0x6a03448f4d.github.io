const output = document.getElementById('output');
const commandInput = document.getElementById('command');
let step = 0;
const password = "admin"; 
const target = "evilcorp.com"; 
const secretFile = "flag.txt";
const memeLeak = [
    "dank_meme_01.jpg - 'CEO crying in binary'",
    "evil_laugh.gif - 'When the firewall fails'",
    "hackerman.png - 'Me right now'"
]; 

function print(text, delay = 0) {
    setTimeout(() => {
        const line = document.createElement('div');
        line.textContent = text;
        output.appendChild(line);
        output.scrollTop = output.scrollHeight;
    }, delay);
}

function clearInput() {
    commandInput.value = '';
}

function printSectionHeader(title) {
    print(' ');
    print('=== ' + title + ' ===');
    print(' ');
}

function printHelp() {
    print(' ');
    print('Available commands:');
    switch (step) {
        case 0:
            print('  - Type "admin" to log in.');
            break;
        case 1:
            print('  - "whoami" : Check who you are.');
            break;
        case 2:
            print('  - "ping evilcorp.com" : Breach their network!');
            break;
        case 3:
            print('  - "cat flag.txt" : Leak their secret memes!');
            break;
    }
    print('  - "help" : Show this help.');
    print(' ');
}

function processCommand() {
    const command = commandInput.value.trim().toLowerCase();
    clearInput();
    print(' ');
    print('> ' + command);

    switch (step) {
        case 0: //  login
            printSectionHeader('System Login');
            print('Objective: Break into the Evil Corp system.');
            print('Hint: The password is "admin" (they’re not very clever).');
            print(' ');
            print('> Enter password:');
            step++;
            break;

        case 1: // check password
            if (command === password) {
                print('Password accepted! Logging in...');
                print('Welcome, sneaky hacker!', 500);
                printSectionHeader('User Check');
                print('Let’s see who’s behind this operation.');
                print('Try this real command: "whoami"');
                print(' ');
                step++;
            } else {
                print('Wrong password: "' + command + '"');
                print('Hint: It’s "admin" – top secret stuff!');
                print(' ');
                if (command === 'help') printHelp();
            }
            break;

        case 2: // breaching the network
            if (command === 'ping evilcorp.com') {
                print('Pinging ' + target + '...');
                print('[64 bytes] Reply from 192.168.1.1: time=42ms', 500);
                print('[64 bytes] Reply from 192.168.1.1: time=39ms', 750);
                print('Ping successful! Firewall down!', 1000);
                print('You’re in the Evil Corp network!', 1500);
                printSectionHeader('Network Breached');
                print('Now, grab their secret stash.');
                print('Try this real command: "cat flag.txt"');
                print(' ');
                step++;
            } else if (command === 'help') {
                printHelp();
            } else {
                print('Command "' + command + '" not recognized.');
                print('Try "ping evilcorp.com" to breach the network.');
                print(' ');
            }
            break;

        case 3: // leak memes
            if (command === 'cat flag.txt') {
                print('Accessing ' + secretFile + '...');
                print('Dumping Evil Corp’s secret meme vault:', 500);
                memeLeak.forEach((meme, index) => {
                    print('  - ' + meme, 1000 + index * 500);
                });
                print('Leak complete! Evil Corp is doomed! ', 2500);
                printSectionHeader('Mission Complete');
                print('You’ve hacked Evil Corp and leaked their memes!');
                print('Type "reset" to play again.');
                print(' ');
            } else if (command === 'reset') {
                print('Resetting terminal...');
                output.innerHTML = '';
                step = 0;
                setTimeout(processCommand, 1000);
            } else if (command === 'help') {
                printHelp();
            } else {
                print('Command "' + command + '" not recognized.');
                print('Try "cat flag.txt" to leak the memes!');
                print(' ');
            }
            break;
    }
}

commandInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') processCommand();
});

processCommand();