"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateFormName = exports.getFormNameById = exports.getAllFormNames = exports.createFormName = void 0;
const form_name_model_1 = __importDefault(require("../../models/form/form.name.model"));
const role_form_model_1 = __importDefault(require("../../models/form/role.form.model"));
const user_model_1 = __importDefault(require("../../models/user/user.model"));
const group_names_model_1 = __importDefault(require("../../models/group/group.names.model"));
// Create a new form Name
const createFormName = async (req, res) => {
    try {
        const { formName, status, createdBy, roles, groupNameId } = req.body;
        // Check if the form name already exists
        const existingformName = await form_name_model_1.default.findOne({ formName });
        if (existingformName) {
            return res.status(400).json({ success: false, message: 'form name already exists' });
        }
        // Create new form Name entry
        const newformName = new form_name_model_1.default({ formName, status, createdBy, groupNameId });
        await newformName.save();
        // Create entries in FormAndRoleModel for each role
        const roleEntries = roles.map((roleId) => ({
            formNameId: newformName._id,
            roleId,
            status,
            createdAt: new Date(),
            updatedAt: new Date()
        }));
        await role_form_model_1.default.insertMany(roleEntries);
        return res.status(201).json({
            success: true,
            message: 'form name and roles created successfully',
            newformName,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Creating form name failed' });
    }
};
exports.createFormName = createFormName;
const getAllFormNames = async (req, res) => {
    try {
        // Retrieve all formName documents
        const formNames = await form_name_model_1.default.find();
        // Retrieve user details for each form
        const response = await Promise.all(formNames.map(async (form) => {
            const user = await user_model_1.default.findById(form.createdBy);
            const group = await group_names_model_1.default.findById(form.groupNameId);
            if (!user) {
                return {
                    _id: form._id,
                    formName: form.formName,
                    status: form.status,
                    groupName: group?.groupName,
                    createdBy: null,
                    createdAt: form.createdAt,
                    updatedAt: form.updatedAt
                };
            }
            return {
                _id: form._id,
                formName: form.formName,
                status: form.status,
                createdBy: {
                    firstName: user.firstName,
                    lastName: user.lastName
                },
                groupName: group?.groupName,
                createdAt: form.createdAt,
                updatedAt: form.updatedAt
            };
        }));
        return res.status(200).json({ success: true, data: response });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Fetching form names failed' });
    }
};
exports.getAllFormNames = getAllFormNames;
// Get a single form Name by ID
const getFormNameById = async (req, res) => {
    try {
        const formName = await form_name_model_1.default.findById(req.params.id);
        if (!formName) {
            return res.status(404).json({ success: false, message: 'form name not found' });
        }
        return res.status(200).json({ success: true, data: formName });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Fetching form name failed' });
    }
};
exports.getFormNameById = getFormNameById;
// Update a form Name
const updateFormName = async (req, res) => {
    try {
        const { formName, status } = req.body;
        const formNameDoc = await form_name_model_1.default.findById(req.params.id);
        if (!formNameDoc) {
            return res.status(404).json({ success: false, message: 'form name not found' });
        }
        formNameDoc.formName = formName ?? formNameDoc.formName;
        formNameDoc.status = status ?? formNameDoc.status;
        formNameDoc.updatedAt = new Date();
        await formNameDoc.save();
        return res.status(200).json({ success: true, message: 'form name updated successfully', formNameDoc });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Updating form name failed' });
    }
};
exports.updateFormName = updateFormName;
//# sourceMappingURL=form.name.controller.js.map