/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');
const { DRAFT } = require('..');

const promotionSchema = new mongoose.Schema(
  {
    uuid: {
      required: true,
      type: String,
      unique: true,
    },
    promotion_image_url: {
      required: true,
      type: String,
    },
    prize_image_url: {
      required: true,
      type: String,
    },
    prize_title: {
      required: true,
      type: String,
      unique: true,
    },
    prize_description: {
      required: true,
      type: String,
      unique: true,
    },
    campaign_uuid: {
      required: true,
      type: String,
    },
    start_date: {
      type: Date,
      required: true,
    },
    end_date: {
      required: true,
      type: Date,
    },
    active: {
      required: true,
      type: Boolean,
      default: true,
    },
    status: {
      required: true,
      type: String,
      default: DRAFT,
    },
    participation_rules_url: {
      required: true,
      type: String,
    },
    max_number_participants: {
      type: Number,
      default: -1,
    },
    type: {
      type: String,
      required: true,
    },
    additional_information: {
      type: Object,
    },
    uuid_participants: {
      type: [String],
    },
    promotion_history_uuid: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret._id;
      },
    },
  },
);

module.exports = promotionSchema;
