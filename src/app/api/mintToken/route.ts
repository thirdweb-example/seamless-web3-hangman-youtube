import { TOKEN_CONTRACT_ADDRESS } from "@/app/constants/constants";
import { NextResponse } from "next/server";

const {
    ENGINE_URL,
    ACCESS_TOKEN,
    BACKEND_WALLET_ADDRESS,
} = process.env;

export async function POST(req: Request) {
    if(
        !ENGINE_URL ||
        !ACCESS_TOKEN ||
        !BACKEND_WALLET_ADDRESS
    ) {
        throw new Error("Missing environment variables");
    }

    const { address } = await req.json();

    const res = await fetch(
        `${ENGINE_URL}/contract/mumbai/${TOKEN_CONTRACT_ADDRESS}/erc20/claim-to`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${ACCESS_TOKEN}`,
                "x-backend-wallet-address": BACKEND_WALLET_ADDRESS,
            },
            body: JSON.stringify({
                recipient: address,
                amount: "10"
            }),
        }
    );
    if(res.ok) {
        console.log("Tokens Claimed", await res.json());
    } else {
        console.log("Failed to claim tokens", await res.text());
    }

    return NextResponse.json({ message: "Tokens Claimed Successfully!"})
};