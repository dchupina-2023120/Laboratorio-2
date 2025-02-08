//Rutas de autenticación
import { Router } from "express";
import { 
    login,
    register, 
    test 
} from "./auth.controller.js";
import { validateJwt } from "../../middlewares/validate.jwt.js";
import { registerValidator } from "../../middlewares/validators.js";
import { uploadProflePicture } from "../../middlewares/multer.uploads.js";
import { deleteFileOnError } from "../../middlewares/delete.file.on.errors.js";

const api = Router()

// Rutas públicas (No requieren autenticación)
                      //Middlewares
api.post('/register', 
    [
        uploadProflePicture.single("profilePicture"),
        //Validador de errores!!!
        registerValidator,
        //Ejecutar la validación de errores (delete.file.on.errors.js)
        deleteFileOnError        
    ], register)
api.post('/login', login)


api.get('/test', validateJwt, test)

// Exportamos rutas
export default api