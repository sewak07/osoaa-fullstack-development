import { BusinessSettings } from '../models/BusinessSettings.js';
import { cloudinaryService } from '../services/cloudinary.service.js';

export const getPublicSettings = async (req, res, next) => {
  try {
    let settings = await BusinessSettings.findOne();
    if (!settings) {
      settings = await BusinessSettings.create({});
    }
    res.status(200).json({ success: true, data: settings });
  } catch (error) {
    next(error);
  }
};

export const updateBusinessSettings = async (req, res, next) => {
  try {
    let settings = await BusinessSettings.findOne();
    if (!settings) {
      settings = await BusinessSettings.create({});
    }

    const updates = req.body;

    if (updates.businessName) settings.businessName = updates.businessName;
    if (updates.category) settings.category = updates.category;
    if (updates.tagline) settings.tagline = updates.tagline;

    if (updates.contact) {
      settings.contact = {
        ...settings.contact,
        ...(typeof updates.contact === 'string' ? JSON.parse(updates.contact) : updates.contact)
      };
    }

    if (updates.socialLinks) {
      settings.socialLinks = {
        ...settings.socialLinks,
        ...(typeof updates.socialLinks === 'string' ? JSON.parse(updates.socialLinks) : updates.socialLinks)
      };
    }

    if (updates.deliverySettings) {
      const delivery = typeof updates.deliverySettings === 'string' ? JSON.parse(updates.deliverySettings) : updates.deliverySettings;
      settings.deliverySettings = {
        standardDeliveryFee: Number(delivery.standardDeliveryFee ?? settings.deliverySettings.standardDeliveryFee),
        freeDeliveryThreshold: Number(delivery.freeDeliveryThreshold ?? settings.deliverySettings.freeDeliveryThreshold),
        estimatedDays: delivery.estimatedDays || settings.deliverySettings.estimatedDays,
      };
    }

    if (updates.paymentSettings) {
      const payment = typeof updates.paymentSettings === 'string' ? JSON.parse(updates.paymentSettings) : updates.paymentSettings;
      settings.paymentSettings = {
        codEnabled: payment.codEnabled ?? settings.paymentSettings.codEnabled,
        esewaEnabled: payment.esewaEnabled ?? settings.paymentSettings.esewaEnabled,
      };
    }

    if (updates.dftqcCertification || updates.nablCertification) {
      const certData = updates.dftqcCertification || updates.nablCertification;
      const certObj = typeof certData === 'string' ? JSON.parse(certData) : certData;
      settings.dftqcCertification = {
        ...settings.dftqcCertification,
        ...certObj,
      };
      settings.nablCertification = {
        ...settings.nablCertification,
        ...certObj,
      };
    }

    if (updates.announcementBar) {
      const ann = typeof updates.announcementBar === 'string' ? JSON.parse(updates.announcementBar) : updates.announcementBar;
      settings.announcementBar = {
        ...settings.announcementBar,
        ...ann,
      };
    }

    // Handle logo upload if provided
    if (req.file) {
      if (settings.logo?.publicId) {
        await cloudinaryService.deleteImage(settings.logo.publicId);
      }
      settings.logo = await cloudinaryService.uploadImage(req.file.buffer, 'brand');
    }

    await settings.save();
    res.status(200).json({ success: true, message: 'Settings updated successfully', data: settings });
  } catch (error) {
    next(error);
  }
};
