1)Inter-Contract Execution:
    SwapTokens Contract calls TokenA and TokenB functions by importing them (aka dependency injection).


2) Inheritance and Interfaces: 
        TokenA and TokenB contracts are ERC20 tokens, they inherit from @openzeppelin/contracts/token/ERC20/ERC20.sol contract.

3) Access Control Design Patterns: 
    SwapTokens contract uses Ownable access control.

