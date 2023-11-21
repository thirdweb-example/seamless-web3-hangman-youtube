import { ConnectWallet, EmbeddedWallet, useAddress, useContract, useDisconnect, useTokenBalance, useWallet } from "@thirdweb-dev/react";
import { useState } from "react";
import { TOKEN_CONTRACT_ADDRESS } from "../constants/constants";

export default function Navbar() {
    const address = useAddress();
    const wallet = useWallet();
    const disconnect = useDisconnect();
    const [userEmail, setEmail] = useState<string | undefined>("");

    if (wallet instanceof EmbeddedWallet) {
        wallet.getEmail().then(email => {
            setEmail(email);
        })
    }

    const { contract } = useContract(TOKEN_CONTRACT_ADDRESS);
    const { data: tokenBalance } = useTokenBalance(contract, address);

    return (
        <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "1rem",
            borderBottom: "1px solid #ccc"
        }}>
            <h3>Web3 Hangman</h3>
            {!address ? (
                <ConnectWallet 
                    btnTitle="Sign In"
                    style={{
                        border: "1px solid #ccc",
                        padding: "0.5rem 1rem",
                        borderRadius: "4px",
                        fontSize: "0.8rem",
                        cursor: "pointer"
                    }}
                />
            ) : (
                <div style={{
                    display: "flex",
                    alignItems: "center"
                }}>
                    <p style={{ marginRight: "20px" }}>Balance: {tokenBalance?.displayValue}</p>
                    <p style={{ 
                        marginRight: "20px",
                        border: "1px solid #ccc",
                        padding: "0.5rem 1rem",
                        borderRadius: "20px",
                        fontSize: "0.8rem"
                    }}>{userEmail}</p>
                    <button 
                        style={{
                            border: "1px solid #ccc",
                            padding: "0.5rem 1rem",
                            borderRadius: "4px",
                            fontSize: "0.8rem",
                            cursor: "pointer"
                        }}
                        onClick={() => disconnect()}
                    >Sign Out</button>
                </div>
            )}
            
        </div>
    )
}