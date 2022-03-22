const descriptions: Record<string, string> = {
  "account-balance":
    "This agent monitors the account balances (in Ether) of addresses on the blockchain and creates an alert when the balance falls below a specified threshold value.",
  "address-watch":
    "This agent monitors blockchain transactions for those involving specific addresses, which may be either EOAs or contracts.",
  "admin-events":
    "This agent monitors blockchain transactions for specific events emitted from specific contract addresses.",
  "contract-variable-monitor":
    "This agent monitors contract variables that contain numeric values for specified contract addresses.",
  "gnosis-safe-multisig":
    "This agent monitors a Gnosis-Safe multi-signature contract address for events emitted and any changes in Ether or token balances.",
  governance:
    "This agent monitors governance contracts that use the modular system of Governance contracts available from OpenZeppelin.",
  "monitor-function-calls":
    "This agent monitors blockchain transactions for specific function calls from specific contract addresses, with the option to check the value of an argument against a specified value.",
  "new-contract-interaction":
    "This agent monitors blockchain transactions for new contracts and EOAs with few transactions interacting with specific contract addresses.",
  "tornado-cash-monitor":
    "This agent monitors blockchain transactions for those involving specified addresses and any address that has previously interacted with a known Tornado Cash Proxy.",
  "transaction-failure-count":
    "This agent monitors the number of failed transactions to a specific contract addresses.",
};

export function getDescription(templateName: string): string | undefined {
  return descriptions[templateName];
}
