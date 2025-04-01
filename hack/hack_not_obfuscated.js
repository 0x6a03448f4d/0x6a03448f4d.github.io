const output = document.getElementById('output');
const commandInput = document.getElementById('command');
let step = 0;
let password = "password123";
let systemScanned = false;
let secretToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"; // Fake JWT-like token
let finalMessage = "Q29uZ3JhdHVsYXRpb25zISBZb3UgaGF2ZSBzdWNjZXNzZnVsbHkgYnJlYWNoZWQgdGhlIHN5c3RlbSE="; // Base64: "Congratulations! You have successfully breached the system!"

// Utility to print text with delay
function print(text, delay = 0) {
    setTimeout(() => {
        const line = document.createElement('div');
        line.textContent = text;
        output.appendChild(line);
        output.scrollTop = output.scrollHeight;
    }, delay);
}

// Clear input field
function clearInput() {
    commandInput.value = '';
}

// Display a formatted section header with extra spacing
function printSectionHeader(title) {
    print(" ");
    print(" ");
    print(`=== ${title} ===`);
    print(" ");
    print(" ");
}

// Display help based on current step
function printHelp() {
    print(" ");
    print("Available commands:");
    switch (step) {
        case 1:
            print("  - Guess the password (hint: it’s a common one with numbers)");
            break;
        case 2:
            print("  - 'nmap -sV 192.168.1.1' : Scan the system for open ports");
            break;
        case 3:
            print("  - 'curl http://192.168.1.1' : Fetch data from the HTTP server");
            break;
        case 4:
            print("  - 'base64 -d' : Decode the final message");
            break;
        case 5:
            print("  - 'reset' : Start over");
            print("  - 'whoami' : Check your hacker identity");
            print("  - 'exit' : Leave the terminal");
            break;
    }
    print(" ");
}

// Process user commands
function processCommand() {
    const cmd = commandInput.value.trim();
    clearInput();

    // Add spacing before each response
    print(" ");
    print(" ");

    switch (step) {
        case 0:
            printSectionHeader("Welcome to 0x6a03448f4d's Penetration Testing Simulator");
            print("Objective: Breach a mock system and retrieve a hidden message.");
            print(" ");
            print("Let’s start with basic access.");
            print("Step 1: Crack the admin password to log in.");
            print("Hint: It’s a common password with letters (lowercase) and numbers.");
            print(" ");
            print("> Enter password:");
            step++;
            break;

        case 1:
            if (cmd === password) {
                print("Password accepted! Logging in...");
                print(" ", 500);
                print("Welcome to the system, hacker!", 1000);
                printSectionHeader("System Access Granted");
                print("Step 2: Scan the network for vulnerabilities.");
                print("Use a real tool command to proceed (hint: network mapper).");
                print(" ");
                print("> Type your command:");
                step++;
            } else {
                print(`Access denied! Incorrect password: '${cmd}'`);
                print(" ");
                print("Hint: Think of a typical admin password (e.g., ends with '123').");
                print(" ");
                print("> Try again:");
                if (cmd === "help") printHelp();
            }
            break;

        case 2:
            if (cmd === "nmap -sV 192.168.1.1") {
                print("Running network scan...");
                print(" ", 500);
                print("$ nmap -sV 192.168.1.1", 1000);
                print("Starting Nmap 7.94 ( https://nmap.org ) at 2025-04-01", 1500);
                print(" ", 2000);
                print("Nmap scan report for 192.168.1.1", 2500);
                print("PORT   STATE SERVICE  VERSION", 3000);
                print("80/tcp open  http     Apache httpd 2.4.41", 3500);
                print(" ", 4000);
                print("Scan complete. Found an open HTTP port!", 4500);
                printSectionHeader("Vulnerability Detected");
                print("Step 3: Exploit the HTTP service to retrieve a token.");
                print("Hint: Use a simple command to access the web server on port 80.");
                print(" ");
                print("> Type your command:");
                step++;
                systemScanned = true;
            } else if (cmd === "help") {
                printHelp();
            } else {
                print(`Command '${cmd}' not recognized.`);
                print(" ");
                print("Try 'nmap -sV 192.168.1.1' to scan the system.");
                print(" ");
                print("> Type your command:");
            }
            break;

        case 3:
            if (cmd === "curl http://192.168.1.1") {
                print("Fetching data from the server...");
                print(" ", 500);
                print("$ curl http://192.168.1.1", 1000);
                print(" ", 1500);
                print(`Response: ${secretToken}`, 2000);
                print(" ", 2500);
                print("Token retrieved! It looks encoded...", 3000);
                printSectionHeader("Token Acquired");
                print("Step 4: Decode the final message to win.");
                print("The message is: " + finalMessage);
                print("Hint: It’s encoded in a common format used in security.");
                print(" ");
                print("> Type your command:");
                step++;
            } else if (cmd === "help") {
                printHelp();
            } else {
                print(`Command '${cmd}' not recognized.`);
                print(" ");
                print("Try 'curl http://192.168.1.1' to fetch data from the HTTP server.");
                print(" ");
                print("> Type your command:");
            }
            break;

        case 4:
            if (cmd === "base64 -d") {
                print("Decoding the message...");
                print(" ", 500);
                print("$ echo " + finalMessage + " | base64 -d", 1000);
                print(" ", 1500);
                print("Decoded: " + atob(finalMessage), 2000);
                printSectionHeader("System Breached!");
                print("Congratulations! You’ve hacked the system!", 2500);
                print(" ");
                print("Play again or explore more commands.");
                print(" ");
                print("> Type your command:");
                step++;
            } else if (cmd === "help") {
                printHelp();
            } else {
                print(`Command '${cmd}' not recognized.`);
                print(" ");
                print("Try 'base64 -d' to decode the message.");
                print(" ");
                print("> Type your command:");
            }
            break;

        case 5:
            if (cmd === "reset") {
                print("Resetting the terminal...");
                print(" ", 500);
                output.innerHTML = '';
                step = 0;
                systemScanned = false;
                setTimeout(processCommand, 1000);
            } else if (cmd === "whoami") {
                print("You are 0x6a03448f4d, the master hacker!");
            } else if (cmd === "exit") {
                print("Shutting down terminal...");
                print(" ", 500);
                print("Goodbye, hacker!", 1000);
                setTimeout(() => window.close(), 1500);
            } else if (cmd === "help") {
                printHelp();
            } else if (cmd === "nmap --version") {
                print("Nmap version 7.94 ( https://nmap.org )");
            } else if (cmd === "curl --version") {
                print("curl 8.6.0 ( https://curl.se )");
            } else {
                print(`Command '${cmd}' not recognized.`);
                print(" ");
                print("Try 'reset', 'whoami', 'exit', or tool versions.");
                print(" ");
                print("> Type your command:");
            }
            break;
    }
}

// Enter key support
commandInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') processCommand();
});

// Start the terminal
processCommand();