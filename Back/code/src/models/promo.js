/* eslint-disable no-param-reassign */
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const jwt = require('../utils/middleware/jwt');

const constants = require('./constants');



const promoSchema = new mongoose.Schema(
  {
    uuid: {
      required: true,
      type: String,
      unique: true,
    },
    promoImageUrl: {
      required: true,
      type: String,
    },
    prizeImageUrl: {
        required: true,
        type: String,
      },
    prizeTitle: {
        required: true,
        type: String,
        unique: true,
      },
      
    prizeDescription: {
      required: true,
      type: String,
      unique: true,
    },
    uuidCampaign: {
      required: true,
      type: "ObjectId",
      unique: true,
      ref: "campaigns"
    
    },
    startDate: {
      type: Date,
      required: true,
    },
    finishDate: {
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
      default: constants.PROMO_STATUS.DRAFT,
    },
    pdfUrl: {
        required: true,
        type: String,

      },
   
    sorteo: {    
        winner: {
            type: String,
        },
        participante: [{
            uuidParticipante: {
                type: "ObjectId",
                ref: "users"
            },
            numeroAlearorio: {
                required: true,
                type: Number,
            },  
        }], participante: {
            uuidParticipante: {
                type: "ObjectId",
                ref: "users"
            },
        },

        numeroGanador :{
            required: true,
            type: Number,
        },  

    },
    regaloDirecto: {
        
        type: String,
        default: '',
      },
      regaloSupervisado: {
       
        type: String,
        default: '',
      },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret._id;
      },
    },
  },
);

schema.methods.validPassword = function (pass) {
  return bcrypt.compareSync(pass, this.password);
};
schema.methods.toAuthJSON = function () {
  const user = this.toJSON();
  user.token = jwt.generateJWT({
    uuid: user.uuid,
    type: 'user',
  });
  delete user.password;
  return user;
};

schema.pre('save', function (next) {
  const user = this;
  user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
  return next();
});

module.exports = promoSchema;
