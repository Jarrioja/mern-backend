import multer from 'multer';
import fs from 'fs';

// Función para determinar la carpeta según el tipo de archivo
const getDestination = (req, file, cb) => {
  if (!fs.existsSync(`uploads`)) fs.mkdirSync(`uploads`);
  if (!fs.existsSync(`uploads/products`)) fs.mkdirSync(`uploads/products`);
  if (!fs.existsSync(`uploads/documents`)) fs.mkdirSync(`uploads/documents`);
  if (!fs.existsSync(`uploads/profiles`)) fs.mkdirSync(`uploads/profiles`);

  let folder = 'products';
  const endpointParts = req.path.split('/');
  if (endpointParts.includes('documents')) {
    if (file.mimetype.includes('image')) folder = 'profiles';
    else {
      folder = 'documents';
    }
  }
  cb(null, `uploads/${folder}`);
};

const storage = multer.diskStorage({
  destination: getDestination,
  filename: (req, file, cb) => {
    const uniqueFileName = `${file.originalname}`;
    cb(null, uniqueFileName);
  },
});

const upload = multer({ storage });

export default upload;
