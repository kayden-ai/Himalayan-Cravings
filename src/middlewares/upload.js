import sharp from 'sharp';
import multer from 'multer';

const upload = multer({
  dest: 'uploads/',
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype.startsWith('image/') ||
      file.mimetype.startsWith('video/')
    ) {
      cb(null, true);
    } else {
      const error = new Error('Only images and videos are allowed!');
      error.status = 400;
      cb(error, false);
    }
  },
});

const createThumbnail = async (req, res, next) => {
  if (!req.file) {
    next();
    return;
  }
  try {
    const outputPath = `${req.file.path}_thumb`;
    await sharp(req.file.path).resize(160, 160).png().toFile(outputPath);
    console.log('Thumbnail successfully created at:', outputPath);
    next();
  } catch (error) {
    console.error('Error generating thumbnail:', error);
    next(error);
  }
};

export {upload, createThumbnail};
