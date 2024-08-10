import express from "express";
import {
  // searchdata,
  searchCombinedData,
  searchStudyLeaveData,
  searchPatentData,
  searchConferenceData,
  studyleavesearch,
  allpdfphd,
  allpdfpatent,
  allpdfstudyleave,
  pdfwithfirstpage,
  toggle,
  pdfwithfirstpagestudyleave,
  pdfwithfirstpagepatent,
  patentsearch,
  conferencesearch,
  pdfwithfirstpageconference,
  allpdfconference,
  pdfwithfirstpagejournal,
  journalsearch,
  searchJournalData,
  allpdfjournal,
  tadasearch,
  pdfwithfirstpagetada,
  searchTadaData,
  allpdftada,
  intialstatus,
} from "../controllers/homeController.js";
import multer from "multer";
import path from "path";
import fs from "fs";
import CombinedModel from "../models/phd.js";
import StudyLeaveModel from "../models/studyleave.js";
import patentModel from "../models/patent.js";
import conferenceModel from "../models/conference.js";
import journalModel from "../models/journal.js";
import tadaModel from "../models/tada.js";
import { fileURLToPath } from "url";
import { PDFDocument } from "pdf-lib";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

const generatedTokens = new Set(); // To store generated tokens and check for uniqueness

function generateUniqueToken(length = 10) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let token;

  do {
    token = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      token += characters.charAt(randomIndex);
    }
  } while (generatedTokens.has(token)); // Check for uniqueness

  generatedTokens.add(token); // Add the generated token to the set of used tokens
  return token;
}

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const targetDirectory = path.join(__dirname, "uploads");

if (!fs.existsSync(targetDirectory)) {
  fs.mkdirSync(targetDirectory);
}

router.post("/inserting", upload.array("pdfFiles"), async (req, res) => {
  try {
    const unid = generateUniqueToken();
    const {
      fid,
      designation,
      Organisation,
      location,
      date,
      Genre,
      department,
    } = req.body;

    // Check if the user has a previous submission not approved
    const previousSubmission = await CombinedModel.findOne({
      fid: fid.toLowerCase(),
      Genre: Genre,
      hasapproved: { $in: ["pending", "Approved"] },
      // insertion: { $lt: new Date() }, // Assuming you want to check submissions before the current date
    });

    if (previousSubmission) {
      return res.status(400).json({
        message: "Already submitted please wait from the response of admin",
      });
    }

    let pdfDoc;
    let combinedPdfPath;

    // Create a new PDF document
    pdfDoc = await PDFDocument.create();

    for (const file of req.files) {
      const pdfBytes = file.buffer;
      const pdf = await PDFDocument.load(pdfBytes);
      const copiedPages = await pdfDoc.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => {
        pdfDoc.addPage(page);
      });
    }

    // Generate a unique file name for the combined PDF
    combinedPdfPath = path.join(targetDirectory, unid);

    // Save the combined PDF file to the server
    const combinedPdfBytes = await pdfDoc.save();
    fs.writeFileSync(combinedPdfPath, combinedPdfBytes);
    // Insert additional attributes into the database
    const currentdate = new Date();
    const savedPdf = new CombinedModel({
      fid: fid.toLowerCase(),
      designation,
      Organisation,
      location,
      date,
      Genre,
      pdf: combinedPdfPath,
      token: "TID" + unid,
      hasapproved: "pending",
      department,
      insertion: currentdate,
    });
    console.log("helloooo ", savedPdf);
    await savedPdf.save();

    res
      .status(200)
      .json({ message: "PDFs merged and saved successfully", savedPdf });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error combining and saving PDFs" });
  }
});

router.post("/apply", upload.array("pdfFiles"), async (req, res) => {
  try {
    console.log("hiiii");
    const unid = generateUniqueToken();
    const {
      fid,
      designation,
      department,
      phdtitle,
      organisation,
      place,
      phdprogress,
      previousStudyLeave,
      startDate,
      endDate,
      Genre,
    } = req.body;
    let pdfDoc;
    let combinedPdfPath;
    const previousSubmission = await StudyLeaveModel.findOne({
      fid: fid.toLowerCase(),
      Genre: Genre,
      hasapproved: { $in: ["pending", "Approved"] },
      // insertion: { $lt: new Date() }, // Assuming you want to check submissions before the current date
    });

    if (previousSubmission) {
      return res.status(400).json({
        message: "Already submitted please wait from the response of admin",
      });
    }
    // Create a new PDF document
    pdfDoc = await PDFDocument.create();

    for (const file of req.files) {
      const pdfBytes = file.buffer;
      const pdf = await PDFDocument.load(pdfBytes);
      const copiedPages = await pdfDoc.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => {
        pdfDoc.addPage(page);
      });
    }

    // Generate a unique file name for the combined PDF
    combinedPdfPath = path.join(targetDirectory, unid + ".pdf");

    // Save the combined PDF file to the server
    const combinedPdfBytes = await pdfDoc.save();
    fs.writeFileSync(combinedPdfPath, combinedPdfBytes);
    const currentdate = new Date();
    const studyLeaveApplication = new StudyLeaveModel({
      token: "TID" + unid,
      fid: fid.toLowerCase(),
      phdtitle,
      organisation,
      place,
      phdprogress,
      designation,
      department,
      startDate,
      endDate,
      previousStudyLeave,
      pdf: combinedPdfPath,
      Genre,
      insertion: currentdate,
    });

    await studyLeaveApplication.save();
    console.log("oreyyy");
    res.status(200).json({
      message: "PDFs merged and saved successfully",
      studyLeaveApplication,
    });
  } catch (error) {
    console.error("Error while submitting study leave application:", error);
    res
      .status(500)
      .json({ error: "An error occurred while submitting the application" });
  }
  console.log("hiii");
});

router.post("/patent/insert", upload.array("pdfFiles"), async (req, res) => {
  try {
    console.log("hii", req.body);
    const {
      fid,
      designation,
      department,
      patentTitle,
      patentId,
      Genre,
      patentDate,
      // additionalFields,
    } = req.body;
    const uid = generateUniqueToken();
    const currentdate = new Date();
    let pdfDoc;
    let combinedPdfPath;
    // Create a new PDF document
    const previousSubmission = await patentModel.findOne({
      fid: fid.toLowerCase(),
      Genre: Genre,
      hasapproved: { $in: ["pending", "Approved"] },
      // insertion: { $lt: new Date() }, // Assuming you want to check submissions before the current date
    });

    if (previousSubmission) {
      return res.status(400).json({
        message: "Already submitted please wait from the response of admin",
      });
    }
    pdfDoc = await PDFDocument.create();

    const authors = [];
    for (let i = 1; i <= 6; i++) {
      if (req.body[`author${i}`]) {
        authors.push(req.body[`author${i}`]);
      }
    }

    for (const file of req.files) {
      const pdfBytes = file.buffer;
      const pdf = await PDFDocument.load(pdfBytes);
      const copiedPages = await pdfDoc.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => {
        pdfDoc.addPage(page);
      });
    }

    // Generate a unique file name for the combined PDF
    combinedPdfPath = path.join(targetDirectory, uid + ".pdf");

    // Save the combined PDF file to the server
    const combinedPdfBytes = await pdfDoc.save();
    fs.writeFileSync(combinedPdfPath, combinedPdfBytes);

    const patentApplication = new patentModel({
      token: "TID" + uid,
      fid,
      designation,
      department,
      patentTitle,
      patentId,
      patentDate,
      Genre,
      hasapproved: "pending",
      pdf: combinedPdfPath,
      insertion: currentdate,
      authors,
    });

    await patentApplication.save();
    res.status(200).json({
      message: "PDFs merged and saved successfully",
      patentApplication,
    });
  } catch (error) {
    console.error("Error while submitting patent application:", error);
    res
      .status(500)
      .json({ error: "An error occurred while submitting the application" });
  }
});

router.post(
  "/conference/insert",
  upload.array("pdfFiles"),
  async (req, res) => {
    // Handle the form submission and file uploads here
    try {
      console.log(req.body);
      const {
        fid,
        designation,
        department,
        paperTitle,
        firstAuthor,
        conferenceName,
        publisherName,
        Genre,
        link,
      } = req.body;
      const uid = generateUniqueToken();
      const currentdate = new Date();
      let pdfDoc;
      let combinedPdfPath;
      const previousSubmission = await conferenceModel.findOne({
        fid: fid.toLowerCase(),
        Genre: Genre,
        hasapproved: { $in: ["pending", "Approved"] },
        // insertion: { $lt: new Date() }, // Assuming you want to check submissions before the current date
      });

      if (previousSubmission) {
        return res.status(400).json({
          message: "Already submitted please wait from the response of admin",
        });
      }
      // Create a new PDF document
      pdfDoc = await PDFDocument.create();

      for (const file of req.files) {
        const pdfBytes = file.buffer;
        const pdf = await PDFDocument.load(pdfBytes);
        const copiedPages = await pdfDoc.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => {
          pdfDoc.addPage(page);
        });
      }

      // Generate a unique file name for the combined PDF
      combinedPdfPath = path.join(targetDirectory, uid + ".pdf");

      // Save the combined PDF file to the server
      const combinedPdfBytes = await pdfDoc.save();
      fs.writeFileSync(combinedPdfPath, combinedPdfBytes);
      // Save form data and file details to your database or storage
      const conferenceApplication = new conferenceModel({
        token: "TID" + uid,
        fid,
        designation,
        department,
        paperTitle,
        firstAuthor,
        conferenceName,
        publisherName,
        hasapproved: "pending",
        Genre,
        pdf: combinedPdfPath,
        insertion: currentdate,
        link,
      });
      // console.log(conferenceApplication);
      // console.log("success");
      await conferenceApplication.save();
      res.status(200).json({
        message: "PDFs merged and saved successfully",
        conferenceApplication,
      });
    } catch (error) {
      res.status(401).send(error);
    }
  }
);

router.post("/journal/insert", upload.array("pdfFiles"), async (req, res) => {
  // Handle the form submission and file uploads here
  try {
    const {
      fid,
      designation,
      department,
      paperTitle,
      firstAuthor,
      link,
      Genre,
    } = req.body;
    const uid = generateUniqueToken();
    const currentdate = new Date();
    let pdfDoc;
    let combinedPdfPath;
    const previousSubmission = await journalModel.findOne({
      fid: fid.toLowerCase(),
      Genre: Genre,
      hasapproved: { $in: ["pending", "Approved"] },
      // insertion: { $lt: new Date() }, // Assuming you want to check submissions before the current date
    });

    if (previousSubmission) {
      return res.status(400).json({
        message: "Already submitted please wait from the response of admin",
      });
    }
    // Create a new PDF document
    pdfDoc = await PDFDocument.create();

    for (const file of req.files) {
      const pdfBytes = file.buffer;
      const pdf = await PDFDocument.load(pdfBytes);
      const copiedPages = await pdfDoc.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => {
        pdfDoc.addPage(page);
      });
    }

    // Generate a unique file name for the combined PDF
    combinedPdfPath = path.join(targetDirectory, uid + ".pdf");

    // Save the combined PDF file to the server
    const combinedPdfBytes = await pdfDoc.save();
    fs.writeFileSync(combinedPdfPath, combinedPdfBytes);
    // Save form data and file details to your database or storage
    const journalApplication = new journalModel({
      token: "TID" + uid,
      fid,
      designation,
      department,
      paperTitle,
      firstAuthor,
      link,
      hasapproved: "pending",
      Genre,
      pdf: combinedPdfPath,
      insertion: currentdate,
    });
    // console.log(conferenceApplication);
    // console.log("success");
    await journalApplication.save();
    res.status(200).json({
      message: "PDFs merged and saved successfully",
      journalApplication,
    });
  } catch (error) {
    res.status(401).send(error);
  }
});

router.post("/tada/insert", upload.array("pdfFiles"), async (req, res) => {
  // Handle the form submission and file uploads here
  try {
    const {
      fid,
      designation,
      department,
      paperTitle,
      conferenceName,
      place,
      presenter,
      Genre,
      tada,
    } = req.body;
    const uid = generateUniqueToken();
    const currentdate = new Date();
    let pdfDoc;
    let combinedPdfPath;
    const previousSubmission = await tadaModel.findOne({
      fid: fid.toLowerCase(),
      Genre: Genre,
      hasapproved: { $in: ["pending", "Approved"] },
      // insertion: { $lt: new Date() }, // Assuming you want to check submissions before the current date
    });

    if (previousSubmission) {
      return res.status(400).json({
        message: "Already submitted please wait from the response of admin",
      });
    }
    // Create a new PDF document
    pdfDoc = await PDFDocument.create();

    for (const file of req.files) {
      const pdfBytes = file.buffer;
      const pdf = await PDFDocument.load(pdfBytes);
      const copiedPages = await pdfDoc.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => {
        pdfDoc.addPage(page);
      });
    }

    // Generate a unique file name for the combined PDF
    combinedPdfPath = path.join(targetDirectory, uid + ".pdf");

    // Save the combined PDF file to the server
    const combinedPdfBytes = await pdfDoc.save();
    fs.writeFileSync(combinedPdfPath, combinedPdfBytes);
    // Save form data and file details to your database or storage
    const tadaApplication = new tadaModel({
      token: "TID" + uid,
      fid,
      designation,
      department,
      paperTitle,
      conferenceName,
      place,
      presenter,
      hasapproved: "pending",
      Genre,
      pdf: combinedPdfPath,
      insertion: currentdate,
      tada,
    });
    // console.log(conferenceApplication);
    // console.log("success");
    await tadaApplication.save();
    res.status(200).json({
      message: "PDFs merged and saved successfully",
      tadaApplication,
    });
  } catch (error) {
    res.status(401).send(error);
  }
});

router.post("/admin/searchphd", searchCombinedData);
router.post("/admin/searchstudy", searchStudyLeaveData);
router.post("/admin/searchconference", searchConferenceData);
router.post("/admin/searchjournal", searchJournalData);
router.post("/admin/searchpatent", searchPatentData);
router.post("/admin/searchtada", searchTadaData);
router.post("/admin/searchtada/:id", intialstatus);
router.post("/find/studyleave", studyleavesearch);
router.post("/find/patent", patentsearch);
router.post("/find/conference", conferencesearch);
router.post("/find/journal", journalsearch);
router.post("/find/tada", tadasearch);
router.get("/pdfs/phd", allpdfphd);
router.get("/pdfs/patent", allpdfpatent);
router.get("/pdfs/studyleave", allpdfstudyleave);
router.get("/pdfs/conference", allpdfconference);
router.get("/pdfs/journal", allpdfjournal);
router.get("/pdfs/tada", allpdftada);
router.get("/pdfwithfirstpagestudyleave/:id", pdfwithfirstpagestudyleave);
router.get("/pdfwithfirstpagepatent/:id", pdfwithfirstpagepatent);
router.get("/pdfwithfirstpageconference/:id", pdfwithfirstpageconference);
router.get("/pdfwithfirstpagejournal/:id", pdfwithfirstpagejournal);
router.get("/pdfwithfirstpagetada/:id", pdfwithfirstpagetada);
router.get("/get-pdf-with-new-page/:id", pdfwithfirstpage);
router.post("/admin/toggle", toggle);

export default router;
