import Cryptr from "cryptr";

export async function encrypt(infoDescrypt: string): Promise<string> { 
    const cryptr: Cryptr = new Cryptr('myTotallySecretKey');
    const encrypt: string = await cryptr.encrypt(infoDescrypt);

    return encrypt;
}