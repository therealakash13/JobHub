import { Company } from "../models/company.model.js";

//Register Company
export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      return res
        .status(400)
        .json({ message: "Company Name is required", success: false });
    }

    let company = await Company.findOne({ name: companyName });
    if (company) {
      return res.status(400).json({
        message: "Company already exists with this name",
        success: false,
      });
    }

    company = await Company.create({
      name: companyName,
      description: req.body.description,
      website: req.body.website,
      location: req.body.location,
      userId: req.id,
    });

    return res.status(201).json({
      message: "Company Registered Successfully",
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error", success: false });
  }
};

//Get User Companies
export const getCompany = async (req, res) => {
  try {
    const userId = req.id;
    const companies = await Company.find({ userId });
    if (!companies) {
      return res
        .status(404)
        .json({ message: "No Companies found", success: false });
    }

    return res.status(200).json({ companies, success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error", success: false });
  }
};

//Get Companies by Id
export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    if (!company) {
      return res
        .status(404)
        .json({ message: "Company not found", success: false });
    }

    return res.status(200).json({ company, success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error", success: false });
  }
};

//Update Company
export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const file = req.file;

    //Cloudinary Service

    const updateData = { name, description, website, location };

    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!company) {
      return res
        .status(404)
        .json({ message: "Company not found", success: false });
    }

    return res.status(200).json({
      message: "Company Information Updated Successfully",
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error", success: false });
  }
};
