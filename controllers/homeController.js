import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import cors from "cors";
import CombinedModel from "../models/phd.js";
import PatentModel from "../models/patent.js";
import ConferenceModel from "../models/conference.js";
import StudyLeaveModel from "../models/studyleave.js";
import journalModel from "../models/journal.js";
import tadaModel from "../models/tada.js";
import asyncHandler from "express-async-handler";
import { fileURLToPath } from "url";
import { PDFDocument, rgb } from "pdf-lib";
import { dirname } from "path";
// import journalModel from "../models/journal.js";
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

export const getUser = asyncHandler(async (req, res) => {
  res.send("Hello Cvr");
});

// export const searchdata = asyncHandler(async (req, res) => {
//   try {
//     // console.log('hi');
//     // console.log(req.body.fid);
//     const data = await CombinedModel.find({
//       $or: [
//         { fid: req.body.data },
//         { Genre: req.body.data },
//         { token: req.body.data },
//       ],
//     });
//     if (data.length > 0) {
//       // console.log('Data found:', data);
//       res.status(200).json(data); // Send the data as JSON response
//     } else {
//       res.status(404).json({ message: "Data not found" }); // Send a 404 response if data is not found
//       console.log("Data not found");
//     }
//   } catch (error) {
//     console.error("Error while searching:", error);
//     res.status(500).json({ message: "An error occurred while searching" });
//   }
// });

// export const searchdata = asyncHandler(async (req, res) => {
//   try {
//     const searchData = req.body.data;

//     // Use Promise.all to search data in both models
//     const [combinedData, studyLeaveData, patentData, conferenceDate] =
//       await Promise.all([
//         CombinedModel.find({
//           $or: [
//             { fid: searchData },
//             { Genre: searchData },
//             { token: searchData },
//           ],
//         }),
//         StudyLeaveModel.find({
//           $or: [
//             { fid: searchData },
//             { Genre: searchData },
//             { token: searchData },
//           ],
//         }),
//         PatentModel.find({
//           $or: [
//             { fid: searchData },
//             { Genre: searchData },
//             { token: searchData },
//           ],
//         }),
//         ConferenceModel.find({
//           $or: [
//             { fid: searchData },
//             { Genre: searchData },
//             { token: searchData },
//           ],
//         }),
//       ]);

//     // Combine the search results from both models into a single array
//     const combinedSearchResults = [
//       ...combinedData,
//       ...studyLeaveData,
//       ...patentData,
//       ...conferenceDate,
//     ];

//     if (combinedSearchResults.length > 0) {
//       res.status(200).json(combinedSearchResults); // Send the search results as a JSON response
//     } else {
//       res.status(404).json({ message: "Data not found" }); // Send a 404 response if data is not found
//     }
//   } catch (error) {
//     console.error("Error while searching:", error);
//     res.status(500).json({ message: "An error occurred while searching" });
//   }
// });

export const searchCombinedData = asyncHandler(async (req, res) => {
  try {
    const searchData = req.body.data;

    // Search data in CombinedModel
    const combinedData = await CombinedModel.find({
      $or: [{ fid: searchData }, { Genre: searchData }, { token: searchData }],
    });

    if (combinedData.length > 0) {
      res.status(200).json(combinedData); // Send the search results as a JSON response
    } else {
      res.status(404).json({ message: "CombinedModel data not found" }); // Send a 404 response if data is not found
    }
  } catch (error) {
    console.error("Error while searching CombinedModel:", error);
    res
      .status(500)
      .json({ message: "An error occurred while searching CombinedModel" });
  }
});

// Handler for searching in StudyLeaveModel
export const searchStudyLeaveData = asyncHandler(async (req, res) => {
  try {
    const searchData = req.body.data;

    // Search data in StudyLeaveModel
    const studyLeaveData = await StudyLeaveModel.find({
      $or: [{ fid: searchData }, { Genre: searchData }, { token: searchData }],
    });

    if (studyLeaveData.length > 0) {
      res.status(200).json(studyLeaveData); // Send the search results as a JSON response
    } else {
      res.status(404).json({ message: "StudyLeaveModel data not found" }); // Send a 404 response if data is not found
    }
  } catch (error) {
    console.error("Error while searching StudyLeaveModel:", error);
    res
      .status(500)
      .json({ message: "An error occurred while searching StudyLeaveModel" });
  }
});

// Handler for searching in PatentModel
export const searchPatentData = asyncHandler(async (req, res) => {
  try {
    const searchData = req.body.data;

    // Search data in PatentModel
    const patentData = await PatentModel.find({
      $or: [{ fid: searchData }, { Genre: searchData }, { token: searchData }],
    });

    if (patentData.length > 0) {
      res.status(200).json(patentData); // Send the search results as a JSON response
    } else {
      res.status(404).json({ message: "PatentModel data not found" }); // Send a 404 response if data is not found
    }
  } catch (error) {
    console.error("Error while searching PatentModel:", error);
    res
      .status(500)
      .json({ message: "An error occurred while searching PatentModel" });
  }
});

// Handler for searching in ConferenceModel
export const searchConferenceData = asyncHandler(async (req, res) => {
  try {
    const searchData = req.body.data;

    // Search data in ConferenceModel
    const conferenceData = await ConferenceModel.find({
      $or: [{ fid: searchData }, { Genre: searchData }, { token: searchData }],
    });

    if (conferenceData.length > 0) {
      res.status(200).json(conferenceData); // Send the search results as a JSON response
    } else {
      res.status(404).json({ message: "ConferenceModel data not found" }); // Send a 404 response if data is not found
    }
  } catch (error) {
    console.error("Error while searching ConferenceModel:", error);
    res
      .status(500)
      .json({ message: "An error occurred while searching ConferenceModel" });
  }
});

export const searchJournalData = asyncHandler(async (req, res) => {
  try {
    const searchData = req.body.data;

    // Search data in ConferenceModel
    const conferenceData = await journalModel.find({
      $or: [{ fid: searchData }, { Genre: searchData }, { token: searchData }],
    });

    if (conferenceData.length > 0) {
      res.status(200).json(conferenceData); // Send the search results as a JSON response
    } else {
      res.status(404).json({ message: "ConferenceModel data not found" }); // Send a 404 response if data is not found
    }
  } catch (error) {
    console.error("Error while searching ConferenceModel:", error);
    res
      .status(500)
      .json({ message: "An error occurred while searching ConferenceModel" });
  }
});

export const searchTadaData = asyncHandler(async (req, res) => {
  try {
    const searchData = req.body.data;

    // Search data in ConferenceModel
    const conferenceData = await tadaModel.find({
      $or: [{ fid: searchData }, { Genre: searchData }, { token: searchData }],
    });

    if (conferenceData.length > 0) {
      res.status(200).json(conferenceData); // Send the search results as a JSON response
    } else {
      res.status(404).json({ message: "ConferenceModel data not found" }); // Send a 404 response if data is not found
    }
  } catch (error) {
    console.error("Error while searching ConferenceModel:", error);
    res
      .status(500)
      .json({ message: "An error occurred while searching ConferenceModel" });
  }
});

export const searchingpdf = async (req, res) => {
  try {
    const pdfId = req.params.pdfId;
    // Fetch the PDF document from the database based on the _id
    const pdf = await CombinedModel.findById(pdfId);

    if (!pdf) {
      return res.status(404).json({ error: "PDF not found" });
    }

    // Return the relative path of the PDF
    console.log(pdf.pdf);
    res.sendFile(pdf.pdf);
  } catch (error) {
    console.error("Error fetching PDF path:", error);
    res.status(500).json({ error: "Error fetching PDF path" });
  }
};

export const allpdfphd = asyncHandler(async (req, res) => {
  try {
    // Use Promise.all to fetch data from both models
    const combinedData = await CombinedModel.find();
    res.json(combinedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to fetch PDFs" });
  }
});

export const allpdfpatent = asyncHandler(async (req, res) => {
  try {
    // Use Promise.all to fetch data from both models
    const combinedData = await PatentModel.find();
    res.json(combinedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to fetch PDFs" });
  }
});

export const allpdfstudyleave = asyncHandler(async (req, res) => {
  try {
    // Use Promise.all to fetch data from both models
    const combinedData = await StudyLeaveModel.find();
    res.json(combinedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to fetch PDFs" });
  }
});

export const allpdfconference = asyncHandler(async (req, res) => {
  try {
    // Use Promise.all to fetch data from both models
    const combinedData = await ConferenceModel.find();
    res.json(combinedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to fetch PDFs" });
  }
});

export const allpdftada = asyncHandler(async (req, res) => {
  try {
    // Use Promise.all to fetch data from both models
    const combinedData = await tadaModel.find();
    res.json(combinedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to fetch PDFs" });
  }
});

export const allpdfjournal = asyncHandler(async (req, res) => {
  try {
    // Use Promise.all to fetch data from both models
    const combinedData = await journalModel.find();
    res.json(combinedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to fetch PDFs" });
  }
});

export const adminapprove = async (req, res) => {
  try {
    const { status, id } = req.body.data;
    console.log("hi");
    console.log(req.body); // Log the received state
    console.log(id);
    const document = await CombinedModel.findByIdAndUpdate(
      id,
      { hasapproved: status }, // Use the state variable here
      { new: true } // Return the updated document
    );
    res.status(200).json(document); // Send the updated document as a response
    // console.log(document)
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" }); // Handle errors and send an appropriate response
  }
};

export const pdfwithfirstpage = async (req, res) => {
  try {
    const pdfId = req.params.id;
    console.log("hi");
    const pdf =
      (await CombinedModel.findById(pdfId)) ||
      (await StudyLeaveModel.findById(pdfId)) ||
      (await ConferenceModel.findById(pdfId)) ||
      (await PatentModel.findById(pdfId)) ||
      (await journalModel.findById(pdfId)) ||
      (await tadaModel.findById(pdfId));
    if (!pdf) {
      return res.status(404).json({ error: "PDF not found" });
    }

    // Read the existing PDF content
    const existingPdfBuffer = fs.readFileSync(pdf.pdf);

    // Load the existing PDF document
    const existingPdfDoc = await PDFDocument.load(existingPdfBuffer);

    // Create a new blank page
    const newPage = existingPdfDoc.insertPage(0, [595, 842]); // A4 page size (you can adjust the size as needed)

    // Add content to the new page if desired
    // Example: Add text to the new page
    newPage.drawText(`Faculty ID: ${pdf.fid}`, {
      x: 50,
      y: 670,
      size: 14,
      color: rgb(0, 0, 0),
    });

    newPage.drawText(`Designation: ${pdf.designation}`, {
      x: 50,
      y: 640,
      size: 14,
      color: rgb(0, 0, 0),
    });
    console.log("hello");
    // Serialize the updated PDF document
    const updatedPdfBytes = await existingPdfDoc.save();

    // Create a buffer from the updated PDF bytes
    const updatedPdfBuffer = Buffer.from(updatedPdfBytes);
    console.log("updated   ", updatedPdfBuffer);
    // Send the updated PDF as a response
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'inline; filename="updated-pdf.pdf"');
    res.status(200).send(updatedPdfBuffer);
  } catch (error) {
    console.error("Error generating PDF with a new page:", error);
    res.status(500).json({ error: "Error generating PDF with a new page" });
  }
};

export const pdfwithfirstpagestudyleave = async (req, res) => {
  try {
    const pdfId = req.params.id;
    console.log("hi");
    const pdf = await StudyLeaveModel.findById(pdfId);

    if (!pdf) {
      return res.status(404).json({ error: "PDF not found" });
    }

    // Read the existing PDF content
    const existingPdfBuffer = fs.readFileSync(pdf.pdf);

    // Load the existing PDF document
    const existingPdfDoc = await PDFDocument.load(existingPdfBuffer);

    // Create a new blank page
    const newPage = existingPdfDoc.insertPage(0, [595, 842]); // A4 page size (you can adjust the size as needed)

    // Add content to the new page if desired
    // Example: Add text to the new page
    newPage.drawText(`Faculty ID: ${pdf.fid}`, {
      x: 50,
      y: 670,
      size: 14,
      color: rgb(0, 0, 0),
    });

    newPage.drawText(`Designation: ${pdf.designation}`, {
      x: 50,
      y: 640,
      size: 14,
      color: rgb(0, 0, 0),
    });
    console.log("hello");
    // Serialize the updated PDF document
    const updatedPdfBytes = await existingPdfDoc.save();

    // Create a buffer from the updated PDF bytes
    const updatedPdfBuffer = Buffer.from(updatedPdfBytes);
    console.log("updated   ", updatedPdfBuffer);
    // Send the updated PDF as a response
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'inline; filename="updated-pdf.pdf"');
    res.status(200).send(updatedPdfBuffer);
  } catch (error) {
    console.error("Error generating PDF with a new page:", error);
    res.status(500).json({ error: "Error generating PDF with a new page" });
  }
};

export const pdfwithfirstpagepatent = async (req, res) => {
  try {
    const pdfId = req.params.id;
    console.log("hi");
    const pdf = await PatentModel.findById(pdfId);

    if (!pdf) {
      return res.status(404).json({ error: "PDF not found" });
    }

    // Read the existing PDF content
    const existingPdfBuffer = fs.readFileSync(pdf.pdf);

    // Load the existing PDF document
    const existingPdfDoc = await PDFDocument.load(existingPdfBuffer);

    // Create a new blank page
    const newPage = existingPdfDoc.insertPage(0, [595, 842]); // A4 page size (you can adjust the size as needed)

    // Add content to the new page if desired
    // Example: Add text to the new page
    newPage.drawText(`Faculty ID: ${pdf.fid}`, {
      x: 50,
      y: 670,
      size: 14,
      color: rgb(0, 0, 0),
    });

    newPage.drawText(`Designation: ${pdf.designation}`, {
      x: 50,
      y: 640,
      size: 14,
      color: rgb(0, 0, 0),
    });
    console.log("hello");
    // Serialize the updated PDF document
    const updatedPdfBytes = await existingPdfDoc.save();

    // Create a buffer from the updated PDF bytes
    const updatedPdfBuffer = Buffer.from(updatedPdfBytes);
    console.log("updated   ", updatedPdfBuffer);
    // Send the updated PDF as a response
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'inline; filename="updated-pdf.pdf"');
    res.status(200).send(updatedPdfBuffer);
  } catch (error) {
    console.error("Error generating PDF with a new page:", error);
    res.status(500).json({ error: "Error generating PDF with a new page" });
  }
};

export const pdfwithfirstpageconference = async (req, res) => {
  try {
    const pdfId = req.params.id;
    console.log("hi");
    const pdf = await ConferenceModel.findById(pdfId);

    if (!pdf) {
      return res.status(404).json({ error: "PDF not found" });
    }

    // Read the existing PDF content
    const existingPdfBuffer = fs.readFileSync(pdf.pdf);

    // Load the existing PDF document
    const existingPdfDoc = await PDFDocument.load(existingPdfBuffer);

    // Create a new blank page
    const newPage = existingPdfDoc.insertPage(0, [595, 842]); // A4 page size (you can adjust the size as needed)

    // Add content to the new page if desired
    // Example: Add text to the new page
    newPage.drawText(`Faculty ID: ${pdf.fid}`, {
      x: 50,
      y: 670,
      size: 14,
      color: rgb(0, 0, 0),
    });

    newPage.drawText(`Designation: ${pdf.designation}`, {
      x: 50,
      y: 640,
      size: 14,
      color: rgb(0, 0, 0),
    });
    console.log("hello");
    // Serialize the updated PDF document
    const updatedPdfBytes = await existingPdfDoc.save();

    // Create a buffer from the updated PDF bytes
    const updatedPdfBuffer = Buffer.from(updatedPdfBytes);
    console.log("updated   ", updatedPdfBuffer);
    // Send the updated PDF as a response
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'inline; filename="updated-pdf.pdf"');
    res.status(200).send(updatedPdfBuffer);
  } catch (error) {
    console.error("Error generating PDF with a new page:", error);
    res.status(500).json({ error: "Error generating PDF with a new page" });
  }
};

export const pdfwithfirstpagejournal = async (req, res) => {
  try {
    const pdfId = req.params.id;
    console.log("hi");
    const pdf = await journalModel.findById(pdfId);

    if (!pdf) {
      return res.status(404).json({ error: "PDF not found" });
    }

    // Read the existing PDF content
    const existingPdfBuffer = fs.readFileSync(pdf.pdf);

    // Load the existing PDF document
    const existingPdfDoc = await PDFDocument.load(existingPdfBuffer);

    // Create a new blank page
    const newPage = existingPdfDoc.insertPage(0, [595, 842]); // A4 page size (you can adjust the size as needed)

    // Add content to the new page if desired
    // Example: Add text to the new page
    newPage.drawText(`Faculty ID: ${pdf.fid}`, {
      x: 50,
      y: 670,
      size: 14,
      color: rgb(0, 0, 0),
    });

    newPage.drawText(`Designation: ${pdf.designation}`, {
      x: 50,
      y: 640,
      size: 14,
      color: rgb(0, 0, 0),
    });
    console.log("hello");
    // Serialize the updated PDF document
    const updatedPdfBytes = await existingPdfDoc.save();

    // Create a buffer from the updated PDF bytes
    const updatedPdfBuffer = Buffer.from(updatedPdfBytes);
    console.log("updated   ", updatedPdfBuffer);
    // Send the updated PDF as a response
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'inline; filename="updated-pdf.pdf"');
    res.status(200).send(updatedPdfBuffer);
  } catch (error) {
    console.error("Error generating PDF with a new page:", error);
    res.status(500).json({ error: "Error generating PDF with a new page" });
  }
};

export const pdfwithfirstpagetada = async (req, res) => {
  try {
    const pdfId = req.params.id;
    console.log("hi");
    const pdf = await tadaModel.findById(pdfId);

    if (!pdf) {
      return res.status(404).json({ error: "PDF not found" });
    }

    // Read the existing PDF content
    const existingPdfBuffer = fs.readFileSync(pdf.pdf);

    // Load the existing PDF document
    const existingPdfDoc = await PDFDocument.load(existingPdfBuffer);

    // Create a new blank page
    const newPage = existingPdfDoc.insertPage(0, [595, 842]); // A4 page size (you can adjust the size as needed)

    // Add content to the new page if desired
    // Example: Add text to the new page
    newPage.drawText(`Faculty ID: ${pdf.fid}`, {
      x: 50,
      y: 670,
      size: 14,
      color: rgb(0, 0, 0),
    });

    newPage.drawText(`Designation: ${pdf.designation}`, {
      x: 50,
      y: 640,
      size: 14,
      color: rgb(0, 0, 0),
    });
    console.log("hello");
    // Serialize the updated PDF document
    const updatedPdfBytes = await existingPdfDoc.save();

    // Create a buffer from the updated PDF bytes
    const updatedPdfBuffer = Buffer.from(updatedPdfBytes);
    console.log("updated   ", updatedPdfBuffer);
    // Send the updated PDF as a response
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'inline; filename="updated-pdf.pdf"');
    res.status(200).send(updatedPdfBuffer);
  } catch (error) {
    console.error("Error generating PDF with a new page:", error);
    res.status(500).json({ error: "Error generating PDF with a new page" });
  }
};

export const toggle = async (req, res) => {
  try {
    const { status, id } = req.body.data;

    // Updated code: Use an object to specify the field to update
    const answerCombined = await CombinedModel.findByIdAndUpdate(id, {
      $set: { hasapproved: status },
    });

    // Similarly, update the record in the other table (StudyLeaveModel)
    const answerStudyLeave = await StudyLeaveModel.findByIdAndUpdate(
      id,
      { $set: { hasapproved: status } }
      // { new: true }
    );

    const answerPatent = await PatentModel.findByIdAndUpdate(
      id,
      { $set: { hasapproved: status } }
      // { new: true }
    );
    const answerConference = await ConferenceModel.findByIdAndUpdate(id, {
      $set: { hasapproved: status },
    });
    const answerJournal = await journalModel.findByIdAndUpdate(id, {
      $set: { hasapproved: status },
    });
    const answertada = await tadaModel.findByIdAndUpdate(id, {
      $set: { hasapproved: status },
    });

    if (
      answerCombined ||
      answerStudyLeave ||
      answerPatent ||
      answerConference ||
      answerJournal ||
      answertada
    ) {
      res.sendStatus(200); // Send success status if the update was successful in either table
    } else {
      res.sendStatus(404); // Send a not found status if the document with the given ID/token wasn't found in either table
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500); // Send a server error status if an error occurred
  }
};

export const studyleavesearch = async (req, res) => {
  try {
    // console.log('hi');
    // console.log(req.body.fid);
    const data = await StudyLeaveModel.find({
      $or: [
        { fid: req.body.data },
        { Genre: req.body.data },
        { token: req.body.data },
      ],
    });
    console.log(data);
    if (data.length > 0) {
      // console.log('Data found:', data);
      res.status(200).json(data); // Send the data as JSON response
    } else {
      res.status(404).json({ message: "Data not found" }); // Send a 404 response if data is not found
      console.log("Data not found");
    }
  } catch (error) {
    console.error("Error while searching:", error);
    res.status(500).json({ message: "An error occurred while searching" });
  }
};

export const patentsearch = async (req, res) => {
  try {
    // console.log('hi');
    // console.log(req.body.fid);
    const data = await PatentModel.find({
      $or: [
        { fid: req.body.data },
        { Genre: req.body.data },
        { token: req.body.data },
      ],
    });
    console.log(data);
    if (data.length > 0) {
      // console.log('Data found:', data);
      res.status(200).json(data); // Send the data as JSON response
    } else {
      res.status(404).json({ message: "Data not found" }); // Send a 404 response if data is not found
      console.log("Data not found");
    }
  } catch (error) {
    console.error("Error while searching:", error);
    res.status(500).json({ message: "An error occurred while searching" });
  }
};

export const conferencesearch = async (req, res) => {
  try {
    // console.log('hi');
    // console.log(req.body.fid);
    const data = await ConferenceModel.find({
      $or: [
        { fid: req.body.data },
        { Genre: req.body.data },
        { token: req.body.data },
      ],
    });
    console.log(data);
    if (data.length > 0) {
      // console.log('Data found:', data);
      res.status(200).json(data); // Send the data as JSON response
    } else {
      res.status(404).json({ message: "Data not found" }); // Send a 404 response if data is not found
      console.log("Data not found");
    }
  } catch (error) {
    console.error("Error while searching:", error);
    res.status(500).json({ message: "An error occurred while searching" });
  }
};

export const journalsearch = async (req, res) => {
  try {
    // console.log('hi');
    // console.log(req.body.fid);
    const data = await journalModel.find({
      $or: [
        { fid: req.body.data },
        { Genre: req.body.data },
        { token: req.body.data },
      ],
    });
    console.log(data);
    if (data.length > 0) {
      // console.log('Data found:', data);
      res.status(200).json(data); // Send the data as JSON response
    } else {
      res.status(404).json({ message: "Data not found" }); // Send a 404 response if data is not found
      console.log("Data not found");
    }
  } catch (error) {
    console.error("Error while searching:", error);
    res.status(500).json({ message: "An error occurred while searching" });
  }
};

export const tadasearch = async (req, res) => {
  try {
    // console.log('hi');
    // console.log(req.body.fid);
    const data = await tadaModel.find({
      $or: [
        { fid: req.body.data },
        { Genre: req.body.data },
        { token: req.body.data },
      ],
    });
    console.log(data);
    if (data.length > 0) {
      // console.log('Data found:', data);
      res.status(200).json(data); // Send the data as JSON response
    } else {
      res.status(404).json({ message: "Data not found" }); // Send a 404 response if data is not found
      console.log("Data not found");
    }
  } catch (error) {
    console.error("Error while searching:", error);
    res.status(500).json({ message: "An error occurred while searching" });
  }
};

export const intialstatus = async (req, res) => {
  const { id, status } = req.body.data;

  try {
    // Update the status in your database using Mongoose or your preferred ORM
    await YourModel.findByIdAndUpdate(id, { status });
    res.json({ message: "Status updated successfully" });
  } catch (error) {
    console.error("Error while updating status:", error);
    res.status(500).json({ message: "Error updating status" });
  }
};
export default router;
