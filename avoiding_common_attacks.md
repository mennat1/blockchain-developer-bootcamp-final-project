# Contract security measures

1) Floating Pragma: SWC-103	
   Using specific compiler pragma 0.8.3 in contracts to avoid accidental bug inclusion through outdated compiler versions.


2) Requirement Violation: SWC-123	
    Using Require in SwapTokens Contract to check ETH and tokens balance before any transfer and using Revert to revert back ETH of invalid txns.
