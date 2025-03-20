import { Router } from "express";
import { QuejaController } from "../controllers/queja.controller";
import { isAuthenticate } from "../middlewares/auth.middleware";
import { isAdmin } from "../middlewares/isAdmin.middleware";
import { quejaValidation } from "../middlewares/validators.middleware";
import { ValidationMiddleware } from "../middlewares/validation.middleware";

const router = Router();

// Obtener todas las quejas (requiere autenticación)
router.get("/", isAuthenticate, QuejaController.getAll);

// Obtener una queja por ID (requiere autenticación)
router.get("/:id", isAuthenticate, QuejaController.getById);

// Crear una nueva queja (requiere autenticación y validación)
router.post("/", isAuthenticate, quejaValidation, ValidationMiddleware, QuejaController.create);

// Actualizar una queja (requiere autenticación y rol de administrador)
router.put("/:id", isAuthenticate, isAdmin, quejaValidation, ValidationMiddleware, QuejaController.update);

// Eliminar una queja (requiere autenticación y rol de administrador)
router.delete("/:id", isAuthenticate, isAdmin, QuejaController.delete);

export default router;
