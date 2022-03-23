const descriptions: Record<string, string> = {
  "account-balance": "Alerts when an account balance falls below a threshold",
  "address-watch": "Alerts when a specified address is involved in a transaction",
  "admin-events": "Alerts when specified events are emitted",
  "contract-variable-monitor": "Alerts when numeric contract variables change by some percentage",
  "gnosis-safe-multisig": "Alerts when a Gnosis-Safe multi-sig emits events or has balance changes",
  "governance": "Alerts when OpenZeppelin Governance events are emitted",
  "monitor-function-calls": "Alerts when specified functions are invoked",
  "new-contract-interaction": "Alerts when a newly created address interacts with a specified contract",
  "tornado-cash-monitor": "Alerts on addresses that have recently interacted with Tornado Cash",
  "transaction-failure-count": "Alerts when there is a high number of failed transactions to a contract",
};

export function getDescription(templateName: string): string | undefined {
  return descriptions[templateName];
}
