import { Router } from "express";
import { loginValidation, offerValidation, rateValidation, registerValidation } from "../middlewares/validators.middleware";
import { ValidationMiddleware } from "../middlewares/validation.middleware";
import { OfferController } from "../controllers/offer.controller";
import { isAuthenticate } from "../middlewares/auth.middleware";
import { isAdmin } from "../middlewares/isAdmin.middleware";

const router = Router();

// Listar todas las ofertas - solo admin
router.get('/', isAuthenticate, isAdmin, OfferController.getAll);

// Ver una oferta por id - solo admin
router.get('/:id', isAuthenticate, isAdmin, OfferController.getById);

// Crear un nuevo pedido/oferta - usuarios autenticados (user o admin)
router.post('/', isAuthenticate, offerValidation, ValidationMiddleware, OfferController.create);

// Borrar una oferta - solo admin
router.delete('/:id', isAuthenticate, isAdmin, OfferController.delete);

// Modificar una oferta - solo admin
router.put('/:id', isAuthenticate, isAdmin, offerValidation, ValidationMiddleware, OfferController.update);

// Rutas para valorar - usuarios autenticados
router.post('/:id/rate/', isAuthenticate, rateValidation, OfferController.rate);
router.get('/:id/rate/', isAuthenticate, OfferController.getRate);
router.get('/:id/myRate/', isAuthenticate, OfferController.getMyRate);

export default router;
