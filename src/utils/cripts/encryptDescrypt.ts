import Cryptr from "cryptr";
import bcrypt from "bcrypt";

export async function encryptByCrypt(infoDescrypt: string): Promise<string> { 
    const cryptr: Cryptr = new Cryptr('myTotallySecretKey');
    const encrypt: string = await cryptr.encrypt(infoDescrypt);

    return encrypt;
}

export async function descriptByCrypt(infoEncrypt: string): Promise<string> { 
    const cryptr: Cryptr = new Cryptr('myTotallySecretKey');
    const descrypt: string = await cryptr.decrypt(infoEncrypt); 

    return descrypt;
} 

export async function encriptByBcrypt(infoDescrypt: string): Promise<string> {
    const encrypt = await bcrypt.hashSync(infoDescrypt, 10); 

    return encrypt; 
}  

export async function descriptByBcrypt(infoEncrypt: string, password: string): Promise<boolean> {
    const encrypt = await bcrypt.compareSync(password,infoEncrypt); 

    return encrypt; 
} 