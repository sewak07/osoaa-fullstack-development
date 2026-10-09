import mongoose from 'mongoose';

const businessSettingsSchema = new mongoose.Schema({
  businessName: {
    type: String,
    default: 'OSOAA',
    required: true,
  },
  category: {
    type: String,
    default: 'Welliness & Nutrition',
    required: true,
  },
  tagline: {
    type: String,
    default: 'A Journey of Wellness',
  },
  logo: {
    url: { type: String, default: '' },
    publicId: { type: String, default: '' },
  },
  favicon: {
    url: { type: String, default: '' },
  },
  contact: {
    email: { type: String, default: 'support@osoaa.com' },
    phone: { type: String, default: '+977-9800000000' },
    secondaryPhone: { type: String, default: '+977-01-4000000' },
    address: { type: String, default: 'Kathmandu, Nepal' },
    mapsUrl: { type: String, default: '' },
  },
  socialLinks: {
    facebook: { type: String, default: 'https://facebook.com' },
    instagram: { type: String, default: 'https://instagram.com' },
    tiktok: { type: String, default: 'https://tiktok.com' },
    youtube: { type: String, default: 'https://youtube.com' },
  },
  deliverySettings: {
    standardDeliveryFee: { type: Number, default: 150 }, // in NPR
    freeDeliveryThreshold: { type: Number, default: 3500 }, // Free over Rs 3500
    estimatedDays: { type: String, default: '2-4 Business Days' },
  },
  paymentSettings: {
    codEnabled: { type: Boolean, default: true },
    esewaEnabled: { type: Boolean, default: true },
  },
  dftqcCertification: {
    enabled: { type: Boolean, default: true },
    certificationName: { type: String, default: 'DFTQC Quality Standards & Compliance' },
    laboratoryName: { type: String, default: 'DFTQC Compliant Quality Testing Standards' },
    certificateNumber: { type: String, default: '' },
    accreditationScope: { type: String, default: 'Nutritional Analysis, Purity Verification & Heavy Metals Testing' },
    validFrom: { type: Date, default: null },
    validUntil: { type: Date, default: null },
    certificateDocUrl: { type: String, default: '' },
    certificateLogoUrl: { type: String, default: '' },
    shortDescription: {
      type: String,
      default: 'OSOAA products follow strict quality testing guidelines aligned with Nepal\'s Department of Food Technology and Quality Control (DFTQC) standards for authentic protein concentration, absence of heavy metals, and pure nutrition.',
    },
    trustBadges: {
      type: [String],
      default: [
        'DFTQC Food Quality Standards Aligned',
        '100% Authentic Supplements',
        'Direct Sourcing & Genuine Batches',
        'Zero Banned Substances Tested',
        'Secure Payments with eSewa & COD'
      ]
    }
  },
  nablCertification: {
    enabled: { type: Boolean, default: true },
    certificationName: { type: String, default: 'DFTQC Quality Standards & Compliance' },
    laboratoryName: { type: String, default: 'DFTQC Compliant Quality Testing Standards' },
    certificateNumber: { type: String, default: '' },
    accreditationScope: { type: String, default: 'Nutritional Analysis, Purity Verification & Heavy Metals Testing' },
    validFrom: { type: Date, default: null },
    validUntil: { type: Date, default: null },
    certificateDocUrl: { type: String, default: '' },
    certificateLogoUrl: { type: String, default: '' },
    shortDescription: {
      type: String,
      default: 'OSOAA products follow strict quality testing guidelines aligned with Nepal\'s Department of Food Technology and Quality Control (DFTQC) standards for authentic protein concentration, absence of heavy metals, and pure nutrition.',
    },
    trustBadges: {
      type: [String],
      default: [
        'DFTQC Food Quality Standards Aligned',
        '100% Authentic Supplements',
        'Direct Sourcing & Genuine Batches',
        'Zero Banned Substances Tested',
        'Secure Payments with eSewa & COD'
      ]
    }
  },
  announcementBar: {
    enabled: { type: Boolean, default: true },
    text: { type: String, default: '⚡ Free Nationwide Delivery on Orders Over Rs. 3,500 | 100% Authentic Wellness & Nutrition' },
    link: { type: String, default: '/shop' }
  }
}, {
  timestamps: true,
});

export const BusinessSettings = mongoose.model('BusinessSettings', businessSettingsSchema);
