export interface signUp {
    email: string;
    password: string; 
    confirmPassword: string;
} 

export interface createTest { 
    name: string; 
    pdfUrl: string; 
    categorie: string; 
    discipline: string;
    instructor: string; 
} 

export interface test { 
    discipline: [ 
        id: number, 
        name: string, 
        period: number,
    ]
}