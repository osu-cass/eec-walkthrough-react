// File: constants.js
// Description: constants that need to be easily referenced

// set the default API address
let API_URL;

if (process.env.NODE_ENV === "development") {
  API_URL = "/api";
} else {
  API_URL = `${process.env.REACT_APP_API_HOST}/api`;
}

// generic constants
module.exports = Object.freeze({
  ROLE: {
    EXTERNAL_USER: 1,
    INTERNAL_USER: 2,
    EXTERNAL_EDITOR: 3,
    INTERNAL_EDITOR: 4,
    ADMIN: 5
  },
  CARD_TYPE: {
    DEFAULT: 1,
    THUMBNAIL: 2,
    INTERNAL_DEFAULT: 11,
    INTERNAL_THUMBNAIL: 12
  },
  MODE: {
    VIEW: 0,
    EDIT: 1,
    MOVE: 2,
    CREATE_TRAINING: 3
  },
  ITEM_TYPE: {
    GENERAL: 1,
    GRAPHIC: 2,
    RESOURCE: 3
  },
  CONTENT_MODE: {
    INTERNAL: 0,
    EXTERNAL: 1,
    INTERNAL_DOWNLOAD: 2,
    EXTERNAL_DOWNLOAD: 3
  },
  API_URL: API_URL,
  MS_PER_SECOND: 1000,
  MS_PER_MINUTE: 60 * 1000,
  MS_PER_HOUR: 60 * 60 * 1000,
  MS_PER_DAY: 24 * 60 * 60 * 1000,
  MS_PER_MONTH: 30 * 24 * 60 * 60 * 1000,
  MS_PER_YEAR: 365 * 24 * 60 * 60 * 1000,
  UPLOAD_TERMS:
		"Before uploading any images you must agree that " +
		"you will only upload images that you have intellectual property rights to use. " +
		"You must also agree to only upload images that are suitable for the general public to view.",
  EEC_HOMEPAGE: "https://eec.oregonstate.edu/",
  DISCLAIMER:
		"The primary objective of the OSU EEC is to promote energy efficiency, " +
		"waste minimization, and productivity in the industrial, commercial, agricultural, and " +
		"residential sectors. A key strategy has included performance of energy and efficiency " +
		"site assessments. This work is intended is to provide background and tools that will be " +
		"helpful in identifying and evaluating potential opportunities.\n\n" +
		"We believe Industrial Walkthrough Checklist & Reference to be a reasonably accurate " +
		"representation of opportunities to reduce energy use, lower waste generation, and make " +
		"production practices more efficient. However, the OSU EEC cannot guarantee the accuracy, " +
		"completeness, or usefulness of the information contained on this website, nor assume any " +
		"liability for damages resulting from the use of any information, equipment, method or " +
		"process disclosed on this website.\n\n" +
		"Pollution prevention recommendations are not intended to deal with the issue of " +
		"compliance with applicable environmental regulations. Questions regarding compliance " +
		"should be addressed to either a reputable consulting engineering firm experienced with " +
		"environmental regulations or to the appropriate regulatory agency. Clients are encouraged " +
		"to develop positive working relationships with regulators so that compliance issues can be " +
		"addressed and resolved.\n\n" +
		"The assumptions and equations used to arrive at energy, waste, productivity, and " +
		"cost savings for the opportunities are presented on this website. We believe the assumptions " +
		"to be conservative. If you would like to revise the assumptions you may follow the calculation " +
		"methodologies presented using adjusted assumptions to develop your own revised estimates of energy, " +
		"waste, productivity, and cost savings.\n\n" +
		"Please feel welcome to contact the OSU EEC if you would like to discuss the content " +
		"of this website or if you have another question about energy use or pollution prevention."
});
