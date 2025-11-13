import Joi from "joi";

export const formCrearSchema = Joi.object({
    nombre: Joi.string().min(3).required().messages({
        "string.base": "El nombre debe ser un texto",
        "string.empty": "El nombre no puede estar vacio",
        "string.min": "el nombre debe tener al menos {#limit} caracteres",
        "any.required": "El nombre es obligatorio"
    }),
    edad: Joi.number().min(16).max(48).required().messages({
        "number.base": "La edad debe ser un numero",
        "number.min": "La edad debe ser mayor a 15",
        "number.max": "la edad debe ser menor a 48",
        "any.required": "La edad es obligatoria"

    }),
    nacionalidad: Joi.string().min(3).required().messages({
        "string.base": "La nacionalidad debe ser un texto",
        "string.empty": "La nacionalidad no puede estar vacía",
        "string.min": "La nacionalidad debe tener al menos {#limit} caracteres",
        "any.required": "La nacionalidad es obligatoria"
    }),
    posicion: Joi.string().min(2).required().messages({
        "string.base": "La posición debe ser un texto",
        "string.empty": "La posición no puede estar vacía",
        "string.min": "La posición debe tener al menos {#limit} caracteres",
        "any.required": "La posición es obligatoria"
    }),
    habilidadPrincipal: Joi.string().min(3).required().messages({
        "string.base": "La habilidad principal debe ser un texto",
        "string.empty": "La habilidad principal no puede estar vacía",
        "string.min": "La habilidad principal debe tener al menos {#limit} caracteres",
        "any.required": "La habilidad principal es obligatoria"
    }),
    valorDeMercado: Joi.number().min(1).required().messages({
        "number.base": "El valor de mercado debe ser un número",
        "number.min": "El valor de mercado debe ser mayor a 0",
        "any.required": "El valor de mercado es obligatorio"
    }),
    salarioEstimado: Joi.number().min(0).required().messages({
        "number.base": "El salario estimado debe ser un número",
        "number.min": "El salario estimado debe ser mayor a 0",
        "any.required": "El salario estimado es obligatorio"
    }),
})