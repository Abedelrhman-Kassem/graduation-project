import express from "express";
import Modules from "../models/Module.js";
import validateFields from "../helper/validateFields.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const modules = await Modules.findAll({
      order: [["order", "ASC"]],
    });

    res.json(modules);
  } catch (error) {
    console.error("Error fetching modules:", error);
    res.status(500).json({ error: error });
  }
});

router.post("/", validateFields(["name", "order"]), async (req, res) => {
  try {
    const { name, order } = req.body;

    const existingModule = await Modules.findOne({ where: { order } });
    if (existingModule) {
      return res
        .status(400)
        .json({ error: "A module with this order already exists." });
    }

    const module = await Modules.create({ name, order });

    res.status(201).json({
      success: true,
      message: "Module created successfully.",
      module,
    });
  } catch (error) {
    console.error("Error creating module:", error);
    res.status(500).json({
      error: "An error occurred while creating the module.",
    });
  }
});

export default router;
