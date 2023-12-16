import { Request, Response } from "express";
import orders from "../models/Order.js";
import medicine, { Imedicine } from "../models/medicine.js";
import { HydratedDocument } from "mongoose";
import Patient from "../models/Patient.js";
import Order from "../models/Order.js";

const viewOrders = async (req: Request, res: Response) => {
  const patientId = req.params.patientId;
  try {
    const patientOrders = await orders.find({ patient: patientId });
    res.status(200).json(patientOrders);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const viewSales = async (req: Request, res: Response) => {
  const date = new Date(req.query.date as string);

  const filterByDate = req.query.filter === "true";

  let report: { [index: string]: number } = {};

  if (!filterByDate) {
    await orders
      .aggregate([
        {
          $match: {
            $or: [{ status: "shipped" }, { status: "delivered" }],
          },
        },
        {
          $match: {
            $expr: {
              $eq: [{ $month: "$date" }, date.getUTCMonth() + 1],
            },
          },
        },
      ])
      .then((result) => {
        result.map((order) => {
          order.medicines.map((orderMedicine: any) => {
            const medTotal = orderMedicine.medPrice * orderMedicine.medQuantity;
            typeof report[orderMedicine.medName] === "undefined"
              ? (report[orderMedicine.medName] = medTotal)
              : (report[orderMedicine.medName] += medTotal);
          });
        });
        console.warn(report);
      })
      .catch((err) => {
        console.warn(err);
        return res.status(500).json({ message: "Internal Server Error" });
      });
  } else {
    await orders
      .aggregate([
        {
          $match: {
            $or: [{ status: "shipped" }, { status: "delivered" }],
          },
        },
        {
          $match: {
            $and: [
              {
                $expr: {
                  $eq: [{ $dayOfMonth: "$date" }, date.getDate()],
                },
              },
              {
                $expr: {
                  $eq: [{ $month: "$date" }, date.getUTCMonth() + 1],
                },
              },
              {
                $expr: {
                  $eq: [{ $year: "$date" }, date.getUTCFullYear()],
                },
              },
            ],
          },
        },
      ])
      .then((result) => {
        result.map((order) => {
          order.medicines.map((orderMedicine: any) => {
            const medTotal = orderMedicine.medPrice * orderMedicine.medQuantity;
            typeof report[orderMedicine.medName] === "undefined"
              ? (report[orderMedicine.medName] = medTotal)
              : (report[orderMedicine.medName] += medTotal);
          });
        });
        console.warn(report);
      })
      .catch((err) => {
        console.warn(err);
        return res.status(500).json({ message: "Internal Server Error" });
      });
  }

  const out = Object.keys(report).map((key) => {
    return { name: key, sales: report[key] };
  });
  return res.status(200).json(out);
};

const addOrder = async (req: Request, res: Response) => {
  const { medicines, total, address, paymentMethod } = req.body;
  const patientId = req.params.patientId;
  console.log("HII");
  console.log(medicines, total, address, paymentMethod, patientId);
  try {
    for (const med of medicines) {
      const med2: HydratedDocument<Imedicine> | null = await medicine.findOne({
        name: med.medName,
      });
      if (!med2) {
        return res.status(404).send("medicine not found");
      }
      med2.availableQuantity -= med.medQuantity; //TODO names
      await med2.save();
    }
    const order = new orders({
      patient: patientId,
      status: "pending",
      date: new Date(),
      total: total,
      address: address,
      paymentMethod: paymentMethod,
      medicines: medicines,
    });

    await order.save();
    res.status(200).json({ message: "Order created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const cancelOrder = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const updatedOrder = await orders.findByIdAndUpdate(
      orderId,
      { status: "canceled" },
      { new: true },
    );
    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    for (const med of updatedOrder.medicines) {
      const med2: HydratedDocument<Imedicine> | null = await medicine.findOne({
        name: med.medName,
      });
      if (!med2) {
        return res.status(404).send("medicine not found");
      }
      med2.availableQuantity += med.medQuantity.valueOf(); //TODO names
      await med2.save();
    }
    const order = (await Order.findById(orderId));
    if(order?.paymentMethod!=="cash on delivery") await Patient.findByIdAndUpdate(order?.patient,   { $inc: { wallet: order?.total } },{ new: true });

    res.json({ message: "Order cancelled successfully", updatedOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default {
  viewOrders,
  viewSales,
  addOrder,
  cancelOrder,
};
