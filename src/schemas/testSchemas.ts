import joi from "joi"; 

export const testSchema = joi.object({ 
    name: joi.string().pattern(/^[a-zA-Z" ""."]{3,60}$/).required(),
    pdfUrl: joi.string().uri().required(),
    categorie: joi.string().valid("Projeto","Prática","Recuperação").required(), 
    discipline: joi.string().valid("HTML e CSS","JavaScript","React","Humildade","Planejamento","Autoconfiança").required(), 
    instructor: joi.string().valid("Diego Pinho","Bruna Hamori").required()
});
