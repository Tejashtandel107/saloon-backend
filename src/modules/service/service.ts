export {};

const Service = require("./schema");
const AppError = require("../../middleware/appError");

class ServiceService {
    async create(data: any) {
        const existing = await Service.findOne({ name: data.name });
        if (existing) throw new AppError("Service with this name already exists", 400);

        return await Service.create(data);
    }

    async getAll(query: any) {
        const page = parseInt(query.page) || 1;
        const limit = Math.min(parseInt(query.limit) || 10, 100);
        const skip = (page - 1) * limit;

        const Services = await Service.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean();
        const total = await Service.countDocuments();

        return {
            data: Services,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        };
    }

    // get single Service
    async getById(id: string) {
        const service = await Service.findById(id).lean();
        if (!service) {
            throw new AppError("Service not found", 400);
        }

        return Service;
    }

    async update(id: string, data: any) {
        const service = await Service.findByIdAndUpdate(
            id,
            data,
            { new: true }
        );

        if (!service) {
            throw new AppError("Service not found", 400);
        }

        return service;
    }

    async delete(id: string) {
        const service = await Service.findByIdAndDelete(id);

        if (!service) {
            throw new AppError("Service not found", 400);
        }

        return true;
    }
}

module.exports = ServiceService;