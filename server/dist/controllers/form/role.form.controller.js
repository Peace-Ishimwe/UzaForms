"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateFormAndRole = exports.getFormAndRoleById = exports.getFormAndRoles = exports.createFormAndRole = void 0;
const role_form_model_1 = __importDefault(require("../../models/form/role.form.model"));
const form_name_model_1 = __importDefault(require("../../models/form/form.name.model"));
const role_model_1 = __importDefault(require("../../models/role.model"));
const createFormAndRole = async (req, res) => {
    try {
        const { formNameId, roleId } = req.body;
        const existingformAndRole = await role_form_model_1.default.findOne({ formNameId, roleId });
        if (existingformAndRole) {
            return res.status(400).json({ message: 'form and role combination already exists' });
        }
        const newformAndRole = new role_form_model_1.default({
            formNameId,
            roleId
        });
        await newformAndRole.save();
        return res.status(201).json({ success: true, message: 'form and role created successfully' });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'form and role creation failed' });
    }
};
exports.createFormAndRole = createFormAndRole;
const getFormAndRoles = async (req, res) => {
    try {
        // Retrieve all formAndRole documents
        const formAndRoles = await role_form_model_1.default.find();
        // Retrieve form and role details for each formAndRole
        const response = await Promise.all(formAndRoles.map(async (gr) => {
            const form = await form_name_model_1.default.findById(gr.formNameId);
            const role = await role_model_1.default.findById(gr.roleId);
            if (!form || !role) {
                return null;
            }
            return {
                _id: gr._id,
                formNameId: gr.formNameId,
                roleId: gr.roleId,
                formName: form.formName,
                roleName: role.roleName,
                status: gr.status,
                createdAt: gr.createdAt,
                updatedAt: gr.updatedAt
            };
        }));
        const filteredResponse = response.filter(item => item !== null);
        return res.status(200).json({ success: true, data: filteredResponse });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Failed to retrieve form and roles' });
    }
};
exports.getFormAndRoles = getFormAndRoles;
const getFormAndRoleById = async (req, res) => {
    try {
        const formAndRole = await role_form_model_1.default.findById(req.params.id);
        if (!formAndRole) {
            return res.status(404).json({ message: 'form and role not found' });
        }
        return res.status(200).json(formAndRole);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Failed to retrieve form and role' });
    }
};
exports.getFormAndRoleById = getFormAndRoleById;
const updateFormAndRole = async (req, res) => {
    try {
        const { status } = req.body;
        const formAndRole = await role_form_model_1.default.findById(req.params.id);
        if (!formAndRole) {
            return res.status(404).json({ message: 'form and role not found' });
        }
        formAndRole.status = status || formAndRole.status;
        formAndRole.updatedAt = new Date();
        await formAndRole.save();
        return res.status(200).json({ success: true, message: 'form and role updated successfully', formAndRole });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'form and role update failed' });
    }
};
exports.updateFormAndRole = updateFormAndRole;
//# sourceMappingURL=role.form.controller.js.map