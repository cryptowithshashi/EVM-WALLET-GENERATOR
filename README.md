
# EVM WALLET GENERATOR GUIDE

A secure CLI tool for generating Ethereum Virtual Machine (EVM) compatible wallets directly on your VPS. Perfect for developers needing bulk wallet creation for testing purposes.






## FEATURES



 - Instantly create multiple crypto wallets in one go.

 - Neatly organized wallet details (Address, Private Key, and Secret Phrase).

 - Automatically saves all wallet details in a file for easy access.

## PRE REQUISITES

 - Ensure Git, Node.js, and npm are installed. If not, install them using your VPS distribution's package manager.

```bash
  sudo apt update
```
```bash
  sudo apt install git nodejs npm -y
```

## INSTALLATION GUIDE

Install Dependencies
```bash
  sudo apt update && sudo apt upgrade -y
  sudo apt install -y git nodejs npm
```
Clone Repository
```bash
  git clone https://github.com/cryptowithshashi/EVM-WALLET-GENERATOR.git
```
```bash
  cd EVM-WALLET-GENERATOR
```

Install Packages
```bash
  npm install
```
Execute the code
```bash
  node index.js
```
Use this command to check your wallet's info
```bash
  nano wallets_output.txt
```

- Enter number of wallets when prompted
- Find saved wallets in wallets_output.txt
- DELETE wallets_output.txt from VPS after download
- Store mnemonics in encrypted storage
- Never expose private keys online
- Maintain offline backups

DISCLAIMER -- This tool is provided "as-is" for educational purposes. The developers assume no responsibility for lost funds or security breaches. Always audit generated wallets before mainnet use.


## ABOUT ME

Twitter -- https://x.com/SHASHI522004

Github -- https://github.com/cryptowithshashi

