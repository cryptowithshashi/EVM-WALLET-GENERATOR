import chalk from 'chalk';
import { Wallet, ethers } from 'ethers';
import { appendFileSync } from 'fs';
import moment from 'moment';
import readlineSync from 'readline-sync';
import { banner } from './banner.js'; // Import the banner

// --- Configuration ---
const WALLET_FILE = './wallets_output.txt'; // Changed filename slightly
const BOX_WIDTH = 85; // Increased slightly just in case, adjust as needed

// --- Helper Functions ---

/**
 * Creates a new random EVM-compatible wallet.
 * @returns {{address: string, privateKey: string, publicKey: string, mnemonic: string}} Wallet details.
 */
function generateNewWallet() {
    const randomWallet = ethers.Wallet.createRandom();
    return {
        address: randomWallet.address,
        privateKey: randomWallet.privateKey,
        publicKey: randomWallet.publicKey, // Usually less needed than address/private key
        mnemonic: randomWallet.mnemonic.phrase,
    };
}

/**
 * Displays wallet details in a formatted box to the console.
 * @param {object} walletData - The wallet data object.
 * @param {number} walletNumber - The sequential number of the wallet generated.
 */
function displayWalletInfoBox(walletData, walletNumber) {
    const topBorder = '┌' + '─'.repeat(BOX_WIDTH - 2) + '┐';
    const bottomBorder = '└' + '─'.repeat(BOX_WIDTH - 2) + '┘';
    const separator = '├' + '─'.repeat(BOX_WIDTH - 2) + '┤';

    // CORRECTED formatLine function
    const formatLine = (label, value, color = chalk.white) => {
        const prefix = `│ ${label}: `;
        const maxContentLength = BOX_WIDTH - 4; // Account for │ prefix and suffix │
        const availableValueWidth = maxContentLength - prefix.length + 2; // +2 for the spaces in prefix

        let displayValue = value;
        // Truncate if the value itself is too long for the available space
        if (value.length > availableValueWidth) {
             displayValue = value.substring(0, availableValueWidth - 3) + '...'; // Add ellipsis
        }

        const lineContent = prefix + displayValue;
         // Ensure padding count is never negative using Math.max
        const paddingCount = Math.max(0, BOX_WIDTH - lineContent.length - 1);
        const padding = ' '.repeat(paddingCount);

        return color(lineContent + padding + '│');
    };


    console.log(chalk.blue(topBorder));
    console.log(formatLine(`Wallet #${walletNumber}`, `(${moment().format('YYYY-MM-DD HH:mm:ss')})`, chalk.blue.bold));
    console.log(chalk.blue(separator));
    console.log(formatLine('Address    ', walletData.address, chalk.green)); // Adjusted spacing for alignment
    console.log(formatLine('Private Key', walletData.privateKey, chalk.red));
    console.log(formatLine('Mnemonic   ', walletData.mnemonic, chalk.magenta));
    console.log(chalk.blue(bottomBorder));
    console.log(''); // Add a blank line for spacing
}

/**
 * Saves wallet details to a file.
 * @param {object} walletData - The wallet data object.
 */
function saveWalletToFile(walletData) {
    const fileContent = `Address: ${walletData.address} | Private Key: ${walletData.privateKey} | Mnemonic: ${walletData.mnemonic}\n`;
    try {
        appendFileSync(WALLET_FILE, fileContent);
    } catch (writeError) {
        console.error(chalk.red(`Error writing to file ${WALLET_FILE}:`), writeError);
        // Decide if you want to stop execution or just log the error
    }
}


// --- Main Execution Logic (Async IIFE) ---
(async () => {
    // 1. Display Banner
    console.log(banner);

    try {
        // 2. Get User Input
        const numberOfWalletsInput = readlineSync.question(
            chalk.yellow('Number of wallets to generate: ') // Changed prompt text
        );
        const requestedCount = parseInt(numberOfWalletsInput, 10);

        if (isNaN(requestedCount) || requestedCount <= 0) {
            console.log(chalk.red('Invalid input. Please enter a positive number.'));
            return; // Exit if input is not a valid positive number
        }

        console.log(chalk.cyan(`\nGenerating ${requestedCount} wallet(s)...`));

        // 3. Generate Wallets in a Loop
        for (let i = 1; i <= requestedCount; i++) {
            const newWallet = generateNewWallet();

            if (newWallet && newWallet.address) {
                // Display details in the console using the box format
                displayWalletInfoBox(newWallet, i);

                // Save details to the file (simple format)
                saveWalletToFile(newWallet);

            } else {
                console.log(chalk.yellow(`[${moment().format('HH:mm:ss')}] Warning: Failed to generate wallet #${i}.`));
            }

            // Optional: Add a small delay to prevent overwhelming the console/system if generating many wallets
            // await new Promise(resolve => setTimeout(resolve, 50)); // e.g., 50ms delay
        }

        // 4. Final Confirmation Message
        console.log(
            chalk.greenBright(
                `\n✅ Success! ${requestedCount} wallet(s) generated.`
            )
        );
        console.log(
            chalk.green(
                `Wallet details (Address, Private Key, Mnemonic) have been saved to ${chalk.bold(WALLET_FILE)}.`
            )
        );
        console.log(chalk.yellow.bold("\n⚠️ IMPORTANT: Securely store your Private Keys and Mnemonic Phrases. Do not share them!"))

    } catch (error) {
        console.error(chalk.red('\n❌ An unexpected error occurred during wallet generation:'));
        console.error(chalk.red(error.message));
        if (error.stack) {
             console.error(chalk.gray(error.stack)); // Log stack trace for debugging if available
        }
    }
})(); // End of IIFE
