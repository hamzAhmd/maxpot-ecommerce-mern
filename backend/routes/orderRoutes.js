import express from 'express';
const router = express.Router();
import {
  addOrderItems,
  getOrderByID,
  updateOrderToPaid,
  updateOrderToDelieverd,
  getMyOrders,
  getOrders,
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders);
router.route('/myorders').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderByID);
router.route('/:id/deliver').put(protect, admin, updateOrderToDelieverd);
router.route('/:id/pay').put(protect, admin, updateOrderToPaid);

export default router;
