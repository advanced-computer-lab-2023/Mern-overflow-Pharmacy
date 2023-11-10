import { Request, Response } from "express";
import orders from "../models/Order.js";

const viewOrders = async (req: Request, res: Response) => {
    const patientId = req.params.patientId;
    try {
        const patientOrders = await orders.find({ patient: patientId });
        res.status(200).json(patientOrders);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const addOrder = async (req: Request, res: Response) => {
    const { medicines, total, address, paymentMethod } = req.body;
    const patientId = req.params.patientId;
    try {
        const order = new orders({
            patient: patientId,
            status: 'pending',
            date: new Date(),
            total: total,
            address: address,
            paymentMethod: paymentMethod,
            medicines: medicines
        });

        await order.save();
        res.status(200).json({ message: 'Order created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const cancelOrder = async (req: Request, res: Response) => {
    try {
        const { orderId } = req.params;
        const updatedOrder = await orders.findByIdAndUpdate(
            orderId,
            { status: 'canceled' },
            { new: true }
        );
        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json({ message: 'Order cancelled successfully', updatedOrder });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export default {
    viewOrders,
    addOrder,
    cancelOrder
};